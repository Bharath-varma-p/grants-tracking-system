class DetailSummary {
  constructor(_recordType, _container, _options) {
    if (!_recordType) {
      console.error("Please provide summary record type. Exp: incident , daily_log");
      return;
    }
    if (!_container) {
      console.error("Please provide the container element for the tabs");
      return;
    }

    //Offense-Noncriminal => "incident"
    //Daily logs => "daily_log";
    this.recordType = _recordType;

    //The html element that contains the tabs.
    this.container = $(_container);

    this.options = { refresh_all: true, ..._options };

    //For ensuring unique id for html elements. To prevent mixing event handlers if there are multiple detail summary object in the same page.
    this.id = Math.floor(Math.random() * 1000000000);

    //To prevent extra ajax request when subsequent clicking to tabs
    this.loadedTabs = new Set();

    //to detect custom scripts for this recordType if loaded
    this.ready = false;

    (async () => {
      //Dynamically importing default options for this record type.
      // [recordType]_summary.js file have to be created for every record type
      const { detailSummaryTabs, tableColumns, eventHandlers, getApprovalData, relatedPrivilege } = await import(
        `../detail-summary/${_recordType}_summary.js`
      );

      //To be displayed tabs array
      this.tabs = detailSummaryTabs;

      //Default table columns for every tabs
      this.tableColumns = tableColumns;

      //Default event handler handler for table buttons (edit,view,delete etc.)
      this.eventHandlers = eventHandlers || {};

      //Attaching tab events and table button events to DOM.
      this.attachEventHandlers();

      this.container.on("click", ".datatable tbody tr", (e) => {
        const row = $(e.currentTarget);
        const table = row.closest('.datatable').DataTable(); 
        const rowData = table.row(row).data(); 
        const { source, data } = getSummaryRowData(e);
        if(source == "V24" || source =="V28"){
          fetchV24HistoricalData(rowData, source);
        }
      });

      //Returns approval data for selected row. So we can calculate lock , unlock , waiting_approval, progress buttons status by this data.
      this.getApprovalData = getApprovalData;

      ////Related privilege name for the record type. Read,write,delete and seal permissions will be decided regarding this privilege name.
      this.privilegeName = relatedPrivilege;

      this.ready = true;
    })();
  }

  //The row data of master table to which detail summary object is bound.
  get rowData() {
    return this._rowData;
  }

  //for ensuring update approvalData whenever rowData is changes.
  set rowData(row_data) {
    this._rowData = row_data;

    this.approvalData = (this.getApprovalData && this.getApprovalData(row_data)) || {};
  }

  //To detect whether custom script has been loaded and our object is ready to be used.
  onReady = () => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.ready) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  //If master table reload is required after some detail buttons action, then we can use this.master property to access master table object.
  //Before using this.master, we should call this method after the initialization of master table.
  setMasterTable(masterTable) {
    this.master = masterTable;
  }

  //Attaching tab events and table button events to DOM.
  attachEventHandlers = () => {
    if (!this.container) return;

    //Handling tab clicks
    this.container
      .off("click", ".detail-summary-tabs a[data-tab]")
      .on("click", ".detail-summary-tabs a[data-tab]", (e) => {
        const tabName = $(e.target).attr("data-tab");

        if (this.activeTab !== tabName) {
          this.activeTab = tabName;

          //If the tab data has already been fetched, we don't need to fetch data over and over.
          if (!this.loadedTabs.has(tabName)) this.loadTabData(tabName);
        }
      });



    //Attaching table buttons (view, edit, delete etc.) event handlers to DOM
    this.attachTableButtonEvents(this);
  };

  //Default table options to be used for every tabs.
  //To change table options for spesific tab =>  this.tabs.arrest.tableOptions = { fnDrawCallback : () => {} }. This will only override fnDrawCallback not other options.
  defaultTableOptions = {
    destroy: true,
    responsive: true,
    lengthMenu: [
      [7, 25, 50, 100],
      [7, 25, 50, 100],
    ],
    order: [[0, "desc"]],
    oLanguage: {
      oPaginate: {
        sFirst: "",
        sPrevious: "",
        sNext: "",
        sLast: "",
      },
      sLengthMenu: "Records per page: _MENU_",
      sInfo: "Total of _TOTAL_ records (showing _START_ to _END_)",
      sInfoFiltered: "(filtered from _MAX_ total records)",
    },
    deferRender: true,
    fnDrawCallback: function (oSettings) {
      $('[data-toggle="tooltip"]').tooltip();
      const table = $("#" + oSettings.sTableId).DataTable();
      //To ensure responsive plugin to work properly.
      if (table.responsive) table.responsive.recalc();
    },
  };

  //Loading and filling tab data.
  loadTabData(tabName) {
    this.activeTab = tabName;

    const tabInfo = this.tabs[tabName];

    const tableName = `summary_table_${tabName}`;

    if (!tabInfo.customRender) {
      //It there is specific colums options for the tabs, those columns will be applied otherwise the default columns.
      const tableColums = tabInfo?.tableOptions?.columns || this.tableColumns[tabName] || [];

      if (tableColums.length == 0) {
        console.error("Detail Summary: No column list specified for dataTable");
        return;
      }

      //If table was not created before
      if ($("." + tableName, this.container).length == 0) {
        const summaryTab = $("." + "summary_" + tabName, this.container).eq(0);
        summaryTab.append(`
        <table class="datatable ${tableName}" data-source="${tabName}" data-page="${this.recordType}">
          <thead>
            <tr class="header">
              ${tableColums
                .map(
                  (col) =>
                    `<th class="header" style="display:${col.visible ? "initial" : "none"}"> ${col.title || ""}</th>`
                )
                .join("")}
            </tr>
          </thead>
        </table>
        <div class="clearfix"></div>
      `);
      }

      //last tableOptions. If spesific options exists for the tabs, these options override the default options.
      const tableOptions = {
        ...this.defaultTableOptions,
        ...tabInfo.tableOptions,
      };

      const rowCallback = tableOptions.fnRowCallback && tableOptions.fnRowCallback.bind(null);

      const fnRowCallback = async (nRow, aData) => {
        //if fnRowCallback option is supplied, then firstly running that function.
        if (rowCallback) rowCallback.call(null, nRow, aData, this);

        //To highlight under 18, detail record should have age, dob, person_name fields.
        //If the record contains person information, ensure all these fields. Otherwise highlighting under 18 wont work.
        if (aData.age < 18 && aData.dob) {
          $("td", nRow).addClass("unknown");

          var isUnknown = aData.person_name && aData.person_name.includes("Unknown");

          if (isUnknown && aData.age_range && aData.age_range.split("-")[0] < 18) {
            $("td", nRow).addClass("unknown");
          }
        }

        //#region Default fnRowCallback code for every dataTable

        //Handling approval data to determine to show or hide approval, locked, unlock , hourglass , progress, edit ,delete buttons.
        //Please check createApprovalDataForDetailRecord method
        const detailApprovalData = this.createApprovalDataForDetailRecord(aData);

        //If the master table record or detail record is locked, we lock the detail record.
        if ((this.approvalData && this.approvalData.locked) || (detailApprovalData && detailApprovalData.locked)) {
          $(".summary-locked-btn", nRow).removeClass("d-none");
          //$(".write-permission",nRow).hide();
          $(".summary-edit-btn", nRow).hide();
          $(".summary-delete-btn", nRow).hide();
          $(".summary-approve-btn", nRow).hide();
          $(".summary-crash-submission-btn", nRow).hide();

          if (detailApprovalData && detailApprovalData.locked) {
            if (await userCanUnlock(detailApprovalData)) {
              $(".summary-locked-btn", nRow).hide();
              $(".summary-unlock-btn", nRow).removeClass("d-none");
            }
          }
          //$(".summary-seal-btn", nRow).hide();
          //$(".summary-court-management-btn", nRow).hide();
        } else {
          //If the master table record and detail record is not locked

          if (await shouldShowSaveProgressButton(detailApprovalData)) {
            $(".summary-progress-btn", nRow).removeClass("d-none");
            $(".summary-approve-btn", nRow).hide();
          }

          //If the master table record or detail record is waiting approval, we show hourglass button only.
          if ((await shouldShowHourglassIcon(this.approvalData)) || (await shouldShowHourglassIcon(detailApprovalData)))
            $(".summary-hourglass-btn", nRow).removeClass("d-none");

          //If the user has not access to edit or delete master table record or detail record, we hide those buttons.
          if (!(await userCanModify(this.approvalData)) || !(await userCanModify(detailApprovalData))) {
            $(".write-permission", nRow).hide();
            $(".delete-permission", nRow).hide();
          }
        }

        if (!globalVariables.isPowerAdmin && !globalVariables.isSupervisor)
          $(".summary-not-reviewed-btn", nRow).remove();

        if (aData.master_name_id) createMasterNameLink(aData.master_name_id, nRow);
        if (aData.vehicle_id) createMasterVehicleLink(aData.vehicle_id, nRow);

        if (aData.expungement) {
          $(".write-permission", nRow).hide();
          $(".delete-permission", nRow).hide();
          $(".seal-permission", nRow).hide();
          $(".unseal-permission", nRow).removeClass("d-none");
        }

        //Handling privileges. If you want to hide a table button when read permission doesn't exist, then simply add read-permission class to the button.
        if (!this.checkPrivileges("read", tabInfo.privilege)) $(".read-permission", nRow).remove();
        if (!this.checkPrivileges("write", tabInfo.privilege)) $(".write-permission", nRow).remove();
        if (!this.checkPrivileges("write", tabInfo.privilege, "delete")) $(".delete-permission", nRow).remove();
        if (!this.checkPrivileges("write", tabInfo.privilege, "seal")) $(".seal-permission", nRow).remove();

        if (this.recordType == "master_name" || this.recordType == "master_vehicle") {
          if ("department" in aData && aData.department !== globalVariables.department_name) {
            $('button[class*="summary-"]', nRow).not(".summary-view-btn").remove();
            $(".select_summary", nRow).remove();
          }
        }

        //#endregion Default fnRowCallback code for every dataTable

        return nRow;
      };

      tableOptions.columns = tableColums;
      tableOptions.fnRowCallback = fnRowCallback;

      if (!$.fn.dataTable.fnIsDataTable($("." + tableName, this.container).get(0))) {
        $(`.${tableName}`, this.container).DataTable(tableOptions);
      }
    }
    let postData;
    switch (this.recordType) {
      case "incident":
        //Default post data for getting incident tabs data
        postData = {
          SubscriberId: this.postData.SubscriberId,
        };
        //For customizing post data
        //if (tabName == "arrest") postData = { incident_id: this.postData.id, some_param : "test" }
        break;
      case "daily_log":
        postData = {
          incident_id: this.postData.id,
          created_date: this.postData.created_date,
        };

        break;
      case "master_name":
        postData = {
          master_name_id: this.postData.id,
        };
        break;
      case "master_vehicle":
        postData = {
          vehicle_id: this.postData.id,
        };
        break;
      case "traffic_crash":
        postData = {
          incident_id: this.postData.id,
          incident_no: this.postData.incident_no,
        };
        break;
      case "traffic_citation":
        postData = {
          incident_id: this.postData.id,
          incident_no: this.postData.incident_no,
        };
        break;
      case "warrant_citation_arrest":
        postData = {
          incident_id: this.postData.id,
          incident_no: this.postData.incident_no,
        };
        break;
      case "fir":
        postData = {
          incident_id: this.postData.id,
          SubscriberId: this.postData.SubscriberId
        };
        break;
      case "permit":
        postData = {
          permit_id: this.postData.id,
        };
        break;
      case "vacation_watch":
        postData = {
          incident_id: this.postData.id,
          incident_no: this.postData.watch_no,
        };
        break;
    }

    if (postData) {
      //creating final post data
      //All the post parameters have to be properly handled in the summary_table_data route ( controller/detailSummary.js)
      postData = {
        ...postData,
        type: this.recordType,
        tabName,
        sourcePage: globalVariables.sourcePage,
      };
      $.post("/" + globalVariables.routLink + "summary_table_data", postData)
        .done((rows) => {

          if (rows.length === 0) {
            $(`#summary_${tabName}_li_${this.id}`).remove();
            this.findFirstTab();
            return;
          }

          if (!tabInfo.doNotWriteCount) {
            $(`[data-tab="${tabName}"]`, this.container).text(`${tabInfo.title} (${rows.length})`);
          }

          if (tabInfo.customRender) {
            tabInfo.customRender(rows, $(".summary_" + tabName, this.container), this.id);
          } else {
            const dt = $("." + tableName, this.container).DataTable();
            dt.clear();
            dt.rows.add(rows);
            dt.draw();
          }

          //Marking tab data loaded. No need to fetch again for every coming back to tab.
          this.loadedTabs.add(tabName);
        })
        .fail(console.error)
        .always(() => $("#loading-screen").hide());
    }
    $("#loading-screen").hide();
  }

  findFirstTab = () => {
    const firstTab = $("[data-tab]", this.container).first();

    if (firstTab) {
      const firstTabName = firstTab.attr("data-tab");

      if (!this.loadedTabs.has(firstTabName)) {
        this.loadTabData(firstTabName);
      } else {
        this.activeTab = firstTabName;
      }

      $(`#summary_${this.activeTab}_link_${this.id}`).tab("show");
    } else {
      this.container.html(`<h2 style="text-align:center" class="no-data-summary">No Data to Display</h2>`);
    }
  };

  //Initializing detail summary for the first time when table row clicked
  loadDetailSummary = (postData, rowData) => {
    //Checking this function runs the first time for the selected row. If not, we call refresh to update tabs, not resetting to first display.
    if (_.isEqual(this.postData, postData)) {
      this.rowData = rowData;
      this.refresh();
      return;
    }
    this.postData = postData;

    this.rowData = rowData;

    $("#loading-screen").show();
    //Getting tab statistics
    $.post("/" + globalVariables.routLink + "summary_statistics", {
      ...postData,
      type: this.recordType,
      sourcePage: globalVariables.sourcePage,
    })
      .done((statistics) => {
        this.approvalData.SaveProgress = statistics.saveProgress;
        //Clearing old content for newly selected row.
        this.container.empty();

        //Clearing loadedTabs for newly selected row.
        this.loadedTabs = new Set();

        //Reset currently updated tab for newly selected row.
        this.updatedTab = null;

        //Creating tabs and tab contents.
        const tabList = $(`<ul class="nav nav-tabs responsive detail-summary-tabs"></ul>`);
        const tabContents = $(`<div class="tab-content responsive detail-summary-tab-content"></div>`);

        this.container.append(tabList);
        this.container.append(tabContents);

        let activeTabFound = false;
        let hasDetails = false;
        for (const tabName in this.tabs) {
          const count = statistics[tabName];

          const tabInfo = this.tabs[tabName];
          //If count 0 and not always show, we hide the tab.
          if (!count && !tabInfo.alwaysShow) continue;

          hasDetails = true;

          if (!activeTabFound) {
            activeTabFound = true;
            this.activeTab = tabName;
          }

          let countText = `(${count || "Click to query"})`;

          if (tabInfo.doNotWriteCount) countText = "";

          tabList.append(`
          <li id="summary_${tabName}_li_${this.id}">
            <a data-toggle="tab" 
              href="#summary_${tabName}_${this.id}" 
              id="summary_${tabName}_link_${this.id}" 
              data-tab="${tabName}">
              ${tabInfo.title} ${countText}
            </a>
          </li>
        `);

          const tabContent = $(
            `<div id="summary_${tabName}_${this.id}" class="tablePanelBorder fade summary_${tabName}"></div>`
          );

          tabContents.append(tabContent);

          if (this.activeTab === tabName) {
            //If the tab is active, we fill the table.

            this.loadTabData(tabName);

            //Showing active tab
            $(`#summary_${this.activeTab}_link_${this.id}`).tab("show");
          }
        }

        if (!hasDetails)
          this.container.html(`<h2 style="text-align:center" class="no-data-summary">No Data to Display</h2>`);
      })
      .always(() => $("#loading-screen").hide());
  };

  //Updating tabs after first initialization
  refreshStatistics = () => {
    $("#loading-screen").show();
    $.post("/" + globalVariables.routLink + "summary_statistics", {
      ...this.postData,
      type: this.recordType,
      sourcePage: globalVariables.sourcePage,
    })
      .done((statistics) => {
        this.approvalData.SaveProgress = statistics.saveProgress;

        //If the active tab has no longer data, we will set activeTab null. First tab will be active.
        if (this.activeTab && statistics[this.activeTab] == 0) {
          this.activeTab = null;
        }

        $(".no-data-summary", this.container).remove();

        //Clearing loadedTabs for updated row.
        this.loadedTabs = new Set();

        let hasDetails = false;
        let newTabList = [];

        for (const tabName in this.tabs) {
          const tabInfo = this.tabs[tabName];

          const count = statistics[tabName];

          if (count || tabInfo.alwaysShow) {
            // If tabs has records
            hasDetails = true;

            if (!this.activeTab) this.activeTab = tabName;

            //Focusing on last updated tab
            if (this.updatedTab == tabName) {
              this.activeTab = tabName;
              this.updatedTab = null;
            }

            //If the tabs doesn't exist before, it means new record was added
            //We create tab and tab content for new tab.
            if ($(".summary_" + tabName, this.container).length == 0) {
              //We set the tab as active. Because new record was added. Therefore we are focusing on the new tab.
              this.activeTab = tabName;

              let tabList = this.container.find(".detail-summary-tabs");

              if (tabList.length == 0) {
                tabList = $(`<ul class="nav nav-tabs responsive detail-summary-tabs"></ul>`);

                this.container.append(tabList);
              }

              let tabContents = $(".detail-summary-tab-content", this.container);

              if (tabContents.length == 0) {
                tabContents = $(`<div class="tab-content responsive detail-summary-tab-content"></div>`);

                this.container.append(tabContents);
              }

              tabContents.append(`
              <div id="summary_${tabName}_${this.id}" class="tablePanelBorder fade summary_${tabName}"></div>`);
            }

            //To preserve tab order, we create all tab list element again. Otherwise newly added tab will be added to last. It might be confusing changes of the order for user experience.
            newTabList.push(`
            <li id="summary_${tabName}_li_${this.id}">
              <a data-toggle="tab" 
                href="#summary_${tabName}_${this.id}" 
                id="summary_${tabName}_link_${this.id}" 
                data-tab="${tabName}">
                ${tabInfo.title} (${count})
              </a>
            </li>
          `);

            $(`#summary_${tabName}_link_${this.id}`).text(`${tabInfo.title} (${count})`);
          } else {
            //If tab has not records, we removw the tab.
            $(`#summary_${tabName}_li_${this.id}`).remove();
            $(`#summary_${tabName}_${this.id}`).remove();

            //We remove the removed tab from loadedTabs. Otherwise when adding new records to the tab, it won't be shown.
            this.loadedTabs.delete(tabName);
          }

          if (this.activeTab === tabName) {
            this.loadTabData(tabName);
          }
        }

        if (newTabList.length > 0) {
          const detailSummaryTabs = this.container.find(".detail-summary-tabs").eq(0);
          detailSummaryTabs.empty();

          for (const newTab of newTabList) {
            detailSummaryTabs.append(newTab);
          }
        }

        if (this.activeTab) $(`#summary_${this.activeTab}_link_${this.id}`).tab("show");

        if (!hasDetails)
          this.container.html(`<h2 style="text-align:center" class="no-data-summary">No Data to Display</h2>`);
      })
      .always(() => $("#loading-screen").hide());
  };

  refresh = () => {
    if (this.options.refresh_all === true) {
      this.refreshStatistics();
    } else {
      this.loadTabData(this.activeTab);
    }
  };

  //Returned object will be considered when determining to show or hide approval button, locked, unlock, hourglass button, edit, delete buttons
  createApprovalDataForDetailRecord = (rowData) => {
    // user_approved
    // supervisor_approved
    // user
    // approveRequestOfficerID  usually user_id in tables
    // reports_to
    // saveProgress

    //If the rowData has not standart fields like above, approval settings like showing-hiding approval button, hourglass button, edit, delete buttons wont properly function.
    //Please ensure that these fields are properly set in detail query.
    //If the record doesn't have approval process, user_approved, supervisor_approved, approveRequestOfficerID, reports_to fields are not required.
    //user field is considered to determine whether the current user has access to edit or delete.
    //If user field is missing, all user can edit,delete. Otherwise only the owner of the record can edit or delete unless approval settings is set as all user can edit.

    if (
      "user_approved" in rowData ||
      "supervisor_approved" in rowData ||
      "approveRequestOfficerID" in rowData ||
      "reports_to" in rowData
    ) {
      if ("user_approved" in rowData === false) console.error("Detail Summary: user_approved field is missing");
      if ("supervisor_approved" in rowData === false)
        console.error("Detail Summary: supervisor_approved field is missing");
      if ("approveRequestOfficerID" in rowData === false)
        console.error("Detail Summary: approveRequestOfficerID field is missing");
      if ("reports_to" in rowData === false) console.error("Detail Summary: reports_to field is missing");
      if ("user" in rowData === false) console.error("Detail Summary: user field is missing");
      if ("saveProgress" in rowData === false) console.error("Detail Summary: saveProgress field is missing");
    }

    let userApproved = rowData.user_approved,
      supervisorApproved = rowData.supervisor_approved,
      theUser = rowData.user,
      approveRequestOfficerID = rowData.approveRequestOfficerID,
      reports_to = rowData.reports_to,
      SaveProgress = rowData.saveProgress == "1",
      locked = true,
      ownCase = false,
      ownApproval = false;

    if (theUser == globalVariables.user) ownCase = true;
    if (approveRequestOfficerID == globalVariables.user_id) ownApproval = true;
    if (!supervisorApproved) locked = false;

    return {
      ownCase,
      ownApproval,
      userApproved,
      supervisorApproved,
      isSupervisor: globalVariables.isSupervisor,
      isPowerAdmin: globalVariables.isPowerAdmin,
      hasUserRole: globalVariables.hasUserRole,
      reports_to,
      employee_id: globalVariables.user_id,
      locked,
      SaveProgress,
      theUser,
    };
  };

  //Function for attaching table buttons event handlers to DOM
  attachTableButtonEvents = () => {

    this.container.on("click", ".summary-edit-btn", (e) => {
      const { source, data } = getSummaryRowData(e);

      var rowElement = $(e.currentTarget).closest('tr'); 
      if (source == "arrest") this.handleEvent(this.eventHandlers.arrestEditHandler, data, "arrestEditHandler");
      else if (source == "suspect") this.handleEvent(this.eventHandlers.suspectEditHandler, data, "suspectEditHandler");
      else if (source == "victim") this.handleEvent(this.eventHandlers.victimEditHandler, data, "victimEditHandler");
      else if (source == "reportee")
        this.handleEvent(this.eventHandlers.reporteeEditHandler, data, "reporteeEditHandler");
      else if (source == "involved_individual")
        this.handleEvent(this.eventHandlers.involvedIndividualEditHandler, data, "involvedIndividualEditHandler");
      else if (source == "business")
        this.handleEvent(this.eventHandlers.businessEditHandler, data, "businessEditHandler");
      else if (source == "witness") this.handleEvent(this.eventHandlers.witnessEditHandler, data, "witnessEditHandler");
      else if (source == "uof_subject")
        this.handleEvent(this.eventHandlers.uofSubjectEditHandler, data, "uofSubjectEditHandler");
      else if (source == "uof_officer")
        this.handleEvent(this.eventHandlers.uofOfficerEditHandler, data, "uofOfficerEditHandler");
      else if (source == "evidence")
        this.handleEvent(this.eventHandlers.evidenceEditHandler, data, "evidenceEditHandler");
      else if (source == "property")
        this.handleEvent(this.eventHandlers.propertyEditHandler, data, "propertyEditHandler");
      else if (source == "incident_vehicle")
        this.handleEvent(this.eventHandlers.incidentVehicleEditHandler, data, "incidentVehicleEditHandler");
      else if (source == "vehicle") this.handleEvent(this.eventHandlers.vehicleEditHandler, data, "vehicleEditHandler");
      else if (source == "attachment")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "arrest_attachment")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "incident_attachment")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "property_attachment")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "narrative") {
        this.handleEvent(this.eventHandlers.narrativeEditHandler, data, "narrativeEditHandler");
      } else if (source == "court_management")
        this.handleEvent(this.eventHandlers.courtManagementEditHandler, data, "courtManagementEditHandler");
      else if (source == "daily_log")
        this.handleEvent(this.eventHandlers.dailyActivityEditHandler, data, "dailyActivityEditHandler");
      else if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashEditHandler, data, "trafficCrashEditHandler");
      else if (source == "traffic")
        this.handleEvent(this.eventHandlers.trafficCrashEditHandler, data, "trafficCrashEditHandler");
      else if (source == "traffic_person")
        this.handleEvent(this.eventHandlers.trafficPersonEditHandler, data, "trafficPersonEditHandler");
      else if (source == "traffic_unit")
        this.handleEvent(this.eventHandlers.trafficUnitEditHandler, data, "trafficUnitEditHandler");
      else if (source == "traffic_attachments")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "traffic_citation_attachments")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "permit_attachments")
        this.handleEvent(this.eventHandlers.attachmentEditHandler, data, "attachmentEditHandler");
      else if (source == "traffic_narrative")
        this.handleEvent(this.eventHandlers.narrativeEditHandler, data, "narrativeEditHandler");
      else if (source == "traffic_citation_narrative")
        this.handleEvent(this.eventHandlers.narrativeEditHandler, data, "narrativeEditHandler");
      else if (source == "traffic_citation" || source == "traffic_citations")
        this.handleEvent(this.eventHandlers.trafficCitationEditHandler, data, "trafficCitationEditHandler");
      else if (source == "traffic_citation_witness")
        this.handleEvent(
          this.eventHandlers.trafficCitationWitnessEditHandler,
          data,
          "trafficCitationWitnessEditHandler"
        );
      else if (source == "warrant_citation_arrest" || source == "arrest_non")
        this.handleEvent(this.eventHandlers.warrantCitationArrestEditHandler, data, "warrantCitationArrestEditHandler");
      else if (source == "V24") {
        this.handleEvent(this.eventHandlers.firEditHandler, data, "firEditHandler",rowElement);
      }
      else if (source == "V28") {
        this.handleEvent(this.eventHandlers.firEditHandler, data, "firEditHandler",rowElement);
      }
      else if (source == "call_management")
        this.handleEvent(this.eventHandlers.callManagementEditHandler, data, "callManagementEditHandler");
      else if (source == "cad_unit")
        this.handleEvent(this.eventHandlers.callManagementUnitEditHandler, data, "callManagementUnitEditHandler");
      else if (source == "cad_comment")
        this.handleEvent(this.eventHandlers.callManagementCommentEditHandler, data, "callManagementCommentEditHandler");
      else if (source == "linked_incident")
        this.handleEvent(this.eventHandlers.linkedIncidentEditHandler, "linkedIncidentEditHandler");
      else if (source == "permit") this.handleEvent(this.eventHandlers.permitEditHandler, data, "permitEditHandler");
      else if (source == "permit_person")
        this.handleEvent(this.eventHandlers.permitPersonEditHandler, data, "permitPersonEditHandler");
      else if (source == "permit_vehicle")
        this.handleEvent(this.eventHandlers.permitVehicleEditHandler, data, "permitVehicleEditHandler");
      else if (source == "permit_business")
        this.handleEvent(this.eventHandlers.permitBusinessEditHandler, data, "permitBusinessEditHandler");
      else if (source == "vacation_watch_check_logs")
        this.handleEvent(
          this.eventHandlers.vacationWatchCheckLogsEditHandler,
          data,
          "vacationWatchCheckLogsEditHandler"
        );
      else if (source == "permit_person")
        this.handleEvent(this.eventHandlers.permitPersonEditHandler, data, "permitPersonEditHandler");
      else if (source == "permit_vehicle")
        this.handleEvent(this.eventHandlers.permitVehicleEditHandler, data, "permitVehicleEditHandler");
      else if (source == "permit_business")
        this.handleEvent(this.eventHandlers.permitBusinessEditHandler, data, "permitBusinessEditHandler");
      else if (source == "vacation_watch_check_logs")
        this.handleEvent(
          this.eventHandlers.vacationWatchCheckLogsEditHandler,
          data,
          "vacationWatchCheckLogsEditHandler"
        );
      else if (source == "vacation_watch_person")
        this.handleEvent(this.eventHandlers.vacationWatchPersonEditHandler, data, "vacationWatchPersonEditHandler");
      else if (source == "vacation_watch_vehicle")
        this.handleEvent(this.eventHandlers.vacationWatchVehicleEditHandler, data, "vacationWatchVehicleEditHandler");
    });

    this.container.on("click", ".summary-view-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "arrest") this.handleEvent(this.eventHandlers.arrestViewHandler, data, "arrestViewHandler");
      else if (source == "suspect") this.handleEvent(this.eventHandlers.suspectViewHandler, data, "suspectViewHandler");
      else if (source == "victim") this.handleEvent(this.eventHandlers.victimViewHandler, data, "victimViewHandler");
      else if (source == "reportee")
        this.handleEvent(this.eventHandlers.reporteeViewHandler, data, "reporteeViewHandler");
      else if (source == "involved_individual")
        this.handleEvent(this.eventHandlers.involvedIndividualViewHandler, data, "involvedIndividualViewHandler");
      else if (source == "business")
        this.handleEvent(this.eventHandlers.businessViewHandler, data, "businessViewHandler");
      else if (source == "witness") this.handleEvent(this.eventHandlers.witnessViewHandler, data, "witnessViewHandler");
      else if (source == "uof_subject")
        this.handleEvent(this.eventHandlers.uofSubjectViewHandler, data, "uofSubjectViewHandler");
      else if (source == "uof_officer")
        this.handleEvent(this.eventHandlers.uofOfficerViewHandler, data, "uofOfficerViewHandler");
      else if (source == "evidence")
        this.handleEvent(this.eventHandlers.evidenceViewHandler, data, "evidenceViewHandler");
      else if (source == "property")
        this.handleEvent(this.eventHandlers.propertyViewHandler, data, "propertyViewHandler");
      else if (source == "incident_vehicle")
        this.handleEvent(this.eventHandlers.incidentVehicleViewHandler, data, "incidentVehicleViewHandler");
      else if (source == "vehicle") this.handleEvent(this.eventHandlers.vehicleViewHandler, data, "vehicleViewHandler");
      else if (source == "attachment")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "arrest_attachment")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "incident_attachment")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "property_attachment")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "permit_attachments")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "narrative")
        this.handleEvent(this.eventHandlers.narrativeViewHandler, data, "narrativeViewHandler");
      else if (source == "court_management")
        this.handleEvent(this.eventHandlers.courtManagementViewHandler, data, "courtManagementViewHandler");
      else if (source == "daily_log")
        this.handleEvent(this.eventHandlers.dailyActivityViewHandler, data, "dailyActivityViewHandler");
      else if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashViewHandler, data, "trafficCrashViewHandler");
      else if (source == "traffic")
        this.handleEvent(this.eventHandlers.trafficCrashViewHandler, data, "trafficCrashViewHandler");
      else if (source == "court_attachments")
        this.handleEvent(this.eventHandlers.courtAttachmentsViewHandler, data, "courtAttachmentsViewHandler");
      else if (source == "traffic_person")
        this.handleEvent(this.eventHandlers.trafficPersonViewHandler, data, "trafficPersonViewHandler");
      else if (source == "traffic_person")
        this.handleEvent(this.eventHandlers.trafficPersonViewHandler, data, "trafficPersonViewHandler");
      else if (source == "traffic_unit")
        this.handleEvent(this.eventHandlers.trafficUnitViewHandler, data, "trafficUnitViewHandler");
      else if (source == "traffic_attachments")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "traffic_citation_attachments")
        this.handleEvent(this.eventHandlers.attachmentViewHandler, data, "attachmentViewHandler");
      else if (source == "traffic_narrative")
        this.handleEvent(this.eventHandlers.narrativeViewHandler, data, "narrativeViewHandler");
      else if (source == "traffic_citation_narrative")
        this.handleEvent(this.eventHandlers.narrativeViewHandler, data, "narrativeViewHandler");
      else if (source == "traffic_citation" || source == "traffic_citations")
        this.handleEvent(this.eventHandlers.trafficCitationViewHandler, data, "trafficCitationViewHandler");
      else if (source == "traffic_citation_witness")
        this.handleEvent(
          this.eventHandlers.trafficCitationWitnessViewHandler,
          data,
          "trafficCitationWitnessViewHandler"
        );
      else if (source == "warrant_citation_arrest")
        this.handleEvent(this.eventHandlers.warrantCitationArrestViewHandler, data, "warrantCitationArrestViewHandler");
      else if (source == "arrest_non")
        this.handleEvent(this.eventHandlers.warrantCitationArrestViewHandler, data, "warrantCitationArrestViewHandler");
      else if (source == "V24") this.handleEvent(this.eventHandlers.firViewHandler, data, "firViewHandler");
      else if (source == "call_management")
        this.handleEvent(this.eventHandlers.callManagementViewHandler, data, "callManagementViewHandler");
      else if (source == "cad_unit")
        this.handleEvent(this.eventHandlers.callManagementUnitViewHandler, data, "callManagementUnitViewHandler");
      else if (source == "linked_incident")
        this.handleEvent(this.eventHandlers.linkedIncidentViewHandler, data, "linkedIncidentViewHandler");
      else if (source == "print_out")
        this.handleEvent(this.eventHandlers.printOutViewHandler, data, "printOutViewHandler");
      else if (source == "print_out_attachments")
        this.handleEvent(this.eventHandlers.printOutViewHandler, data, "printOutViewHandler");
      else if (source == "permit") this.handleEvent(this.eventHandlers.permitViewHandler, data, "permitViewHandler");
      else if (source == "all_history")
        this.handleEvent(this.eventHandlers.allHistoryViewHandler, data, "allHistoryViewHandler");
      else if (source == "permit_person")
        this.handleEvent(this.eventHandlers.permitPersonViewHandler, data, "permitPersonViewHandler");
      else if (source == "permit_vehicle")
        this.handleEvent(this.eventHandlers.permitVehicleViewHandler, data, "permitVehicleViewHandler");
      else if (source == "permit_business")
        this.handleEvent(this.eventHandlers.permitBusinessViewHandler, data, "permitBusinessViewHandler");
      else if (source == "vacation_watch_check_logs")
        this.handleEvent(
          this.eventHandlers.vacationWatchCheckLogsViewHandler,
          data,
          "vacationWatchCheckLogsViewHandler"
        );
      else if (source == "vacation_watch_person")
        this.handleEvent(this.eventHandlers.vacationWatchPersonViewHandler, data, "vacationWatchPersonViewHandler");
      else if (source == "vacation_watch_vehicle")
        this.handleEvent(this.eventHandlers.vacationWatchVehicleViewHandler, data, "vacationWatchVehicleViewHandler");
    });

    this.container.on("click", ".summary-delete-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "arrest") this.handleEvent(this.eventHandlers.arrestDeleteHandler, data, "arrestDeleteHandler");
      else if (source == "suspect")
        this.handleEvent(this.eventHandlers.suspectDeleteHandler, data, "suspectDeleteHandler");
      else if (source == "victim")
        this.handleEvent(this.eventHandlers.victimDeleteHandler, data, "victimDeleteHandler");
      else if (source == "reportee")
        this.handleEvent(this.eventHandlers.reporteeDeleteHandler, data, "reporteeDeleteHandler");
      else if (source == "involved_individual")
        this.handleEvent(this.eventHandlers.involvedIndividualDeleteHandler, data, "involvedIndividualDeleteHandler");
      else if (source == "business")
        this.handleEvent(this.eventHandlers.businessDeleteHandler, data, "businessDeleteHandler");
      else if (source == "witness")
        this.handleEvent(this.eventHandlers.witnessDeleteHandler, data, "witnessDeleteHandler");
      else if (source == "uof_subject")
        this.handleEvent(this.eventHandlers.uofSubjectDeleteHandler, data, "uofSubjectDeleteHandler");
      else if (source == "uof_officer")
        this.handleEvent(this.eventHandlers.uofOfficerDeleteHandler, data, "uofOfficerDeleteHandler");
      else if (source == "evidence")
        this.handleEvent(this.eventHandlers.evidenceDeleteHandler, data, "evidenceDeleteHandler");
      else if (source == "property")
        this.handleEvent(this.eventHandlers.propertyDeleteHandler, data, "propertyDeleteHandler");
      else if (source == "incident_vehicle")
        this.handleEvent(this.eventHandlers.incidentVehicleDeleteHandler, data, "incidentVehicleDeleteHandler");
      else if (source == "vehicle")
        this.handleEvent(this.eventHandlers.vehicleDeleteHandler, data, "vehicleDeleteHandler");
      else if (source == "narrative")
        this.handleEvent(this.eventHandlers.narrativeDeleteHandler, data, "narrativeDeleteHandler");
      else if (source == "attachment")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "arrest_attachment")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "incident_attachment")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "property_attachment")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "permit_attachments")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "court_management")
        this.handleEvent(this.eventHandlers.courtManagementDeleteHandler, data, "courtManagementDeleteHandler");
      else if (source == "daily_log")
        this.handleEvent(this.eventHandlers.dailyActivityDeleteHandler, data, "dailyActivityDeleteHandler");
      else if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashDeleteHandler, data, "trafficCrashDeleteHandler");
      else if (source == "traffic")
        this.handleEvent(this.eventHandlers.trafficCrashDeleteHandler, data, "trafficCrashDeleteHandler");
      else if (source == "traffic_person")
        this.handleEvent(this.eventHandlers.trafficPersonDeleteHandler, data, "trafficPersonDeleteHandler");
      else if (source == "traffic_unit")
        this.handleEvent(this.eventHandlers.trafficUnitDeleteHandler, data, "trafficUnitDeleteHandler");
      else if (source == "traffic_attachments")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "traffic_citation_attachments")
        this.handleEvent(this.eventHandlers.attachmentDeleteHandler, data, "attachmentDeleteHandler");
      else if (source == "traffic_narrative")
        this.handleEvent(this.eventHandlers.narrativeDeleteHandler, data, "narrativeDeleteHandler");
      else if (source == "traffic_citation_narrative")
        this.handleEvent(this.eventHandlers.narrativeDeleteHandler, data, "narrativeDeleteHandler");
      else if (source == "traffic_citation" || source == "traffic_citations")
        this.handleEvent(this.eventHandlers.trafficCitationDeleteHandler, data, "trafficCitationDeleteHandler");
      else if (source == "traffic_citation_witness")
        this.handleEvent(
          this.eventHandlers.trafficCitationWitnessDeleteHandler,
          data,
          "trafficCitationWitnessDeleteHandler"
        );
      else if (source == "warrant_citation_arrest")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestDeleteHandler,
          data,
          "warrantCitationArrestDeleteHandler"
        );
      else if (source == "traffic_citation_arrest")
        this.handleEvent(
          this.eventHandlers.trafficCitationArrestDeleteHandler,
          data,
          "trafficCitationArrestDeleteHandler"
        );
      else if (source == "arrest_non")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestDeleteHandler,
          data,
          "warrantCitationArrestDeleteHandler"
        );
      else if (source == "fir") this.handleEvent(this.eventHandlers.firDeleteHandler, data, "firDeleteHandler");
      else if (source == "call_management")
        this.handleEvent(this.eventHandlers.callManagementDeleteHandler, data, "callManagementDeleteHandler");
      else if (source == "cad_unit")
        this.handleEvent(this.eventHandlers.callManagementUnitDeleteHandler, data, "callManagementUnitDeleteHandler");
      else if (source == "cad_comment")
        this.handleEvent(
          this.eventHandlers.callManagementCommentDeleteHandler,
          data,
          "callManagementCommentDeleteHandler"
        );
      else if (source == "linked_incident")
        this.handleEvent(this.eventHandlers.linkedIncidentDeleteHandler, data, "linkedIncidentDeleteHandler");
      else if (source == "permit")
        this.handleEvent(this.eventHandlers.permitDeleteHandler, data, "permitDeleteHandler");
      else if (source == "permit_person")
        this.handleEvent(this.eventHandlers.permitPersonDeleteHandler, data, "permitPersonDeleteHandler");
      else if (source == "permit_vehicle")
        this.handleEvent(this.eventHandlers.permitVehicleDeleteHandler, data, "permitVehicleDeleteHandler");
      else if (source == "permit_business")
        this.handleEvent(this.eventHandlers.permitBusinessDeleteHandler, data, "permitBusinessDeleteHandler");
      else if (source == "vacation_watch_check_logs")
        this.handleEvent(
          this.eventHandlers.vacationWatchCheckLogsDeleteHandler,
          data,
          "vacationWatchCheckLogsDeleteHandler"
        );
      else if (source == "vacation_watch_person")
        this.handleEvent(this.eventHandlers.vacationWatchPersonDeleteHandler, data, "vacationWatchPersonDeleteHandler");
      else if (source == "vacation_watch_vehicle")
        this.handleEvent(
          this.eventHandlers.vacationWatchVehicleDeleteHandler,
          data,
          "vacationWatchVehicleDeleteHandler"
        );
    });

    this.container.on("click", ".summary-court-management-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "arrest")
        this.handleEvent(this.eventHandlers.arrestCourtManagementHandler, data, "arrestCourtManagementHandler");
      else if (source == "suspect")
        this.handleEvent(this.eventHandlers.suspectCourtManagementHandler, data, "suspectCourtManagementHandler");
      else if (source == "victim")
        this.handleEvent(this.eventHandlers.victimCourtManagementHandler, data, "victimCourtManagementHandler");
      else if (source == "reportee")
        this.handleEvent(this.eventHandlers.reporteeCourtManagementHandler, data, "reporteeCourtManagementHandler");
      else if (source == "witness")
        this.handleEvent(this.eventHandlers.witnessCourtManagementHandler, data, "witnessCourtManagementHandler");
      else if (source == "traffic_citation")
        this.handleEvent(
          this.eventHandlers.trafficCitationCourtManagementHandler,
          data,
          "trafficCitationCourtManagementHandler"
        );
      else if (source == "arrest_non")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestCourtManagementHandler,
          data,
          "warrantCitationArrestCourtManagementHandler"
        );
      else if (source == "warrant_citation_arrest")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestCourtManagementHandler,
          data,
          "warrantCitationArrestCourtManagementHandler"
        );
    });

    this.container.on("click", ".summary-seal-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "arrest") this.handleEvent(this.eventHandlers.arrestSealHandler, data, "arrestSealHandler");
      else if (source == "suspect") this.handleEvent(this.eventHandlers.suspectSealHandler, data, "suspectSealHandler");
      else if (source == "victim") this.handleEvent(this.eventHandlers.victimSealHandler, data, "victimSealHandler");
      else if (source == "uof_subject")
        this.handleEvent(this.eventHandlers.uofSubjectSealHandler, data, "uofSubjectSealHandler");
      else if (source == "warrant_citation_arrest")
        this.handleEvent(this.eventHandlers.warrantCitationArrestSealHandler, data, "warrantCitationArrestSealHandler");
      else if (source == "arrest_non")
        this.handleEvent(this.eventHandlers.warrantCitationArrestSealHandler, data, "warrantCitationArrestSealHandler");
      else if (source == "traffic_citation")
        this.handleEvent(this.eventHandlers.trafficCitationSealHandler, data, "trafficCitationSealHandler");
    });

    this.container.on("click", ".summary-unseal-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "arrest") this.handleEvent(this.eventHandlers.arrestUnsealHandler, data, "arrestUnsealHandler");
      else if (source == "suspect")
        this.handleEvent(this.eventHandlers.suspectUnsealHandler, data, "suspectUnsealHandler");
      else if (source == "victim")
        this.handleEvent(this.eventHandlers.victimUnsealHandler, data, "victimUnsealHandler");
      else if (source == "uof_subject")
        this.handleEvent(this.eventHandlers.uofSubjectUnsealHandler, data, "uofSubjectUnsealHandler");
      else if (source == "warrant_citation_arrest")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestUnsealHandler,
          data,
          "warrantCitationArrestUnsealHandler"
        );
      else if (source == "traffic_citation")
        this.handleEvent(this.eventHandlers.trafficCitationUnsealHandler, data, "trafficCitationUnsealHandler");
    });

    this.container.on("click", ".summary-check-out-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "evidence")
        this.handleEvent(this.eventHandlers.evidenceCheckoutHandler, data, "evidenceCheckoutHandler");
    });

    this.container.on("click", ".summary-dispose-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      var rowElement = $(e.currentTarget).closest('tr'); 
      if (source == "evidence")
        this.handleEvent(this.eventHandlers.evidenceDisposeHandler, data, "evidenceDisposeHandler");
      else if (source == "V24") {
        this.handleEvent(this.eventHandlers.firDisposeHandler, data, "firDisposeHandler",rowElement);
      }
    });

    this.container.on("click", ".summary-restore-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "evidence")
        this.handleEvent(this.eventHandlers.evidenceRestoreHandler, data, "evidenceRestoreHandler");
    });

    this.container.on("click", ".summary-move-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "evidence") this.handleEvent(this.eventHandlers.evidenceMoveHandler, data, "evidenceMoveHandler");
    });

    this.container.on("click", ".summary-save-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      var rowElement = $(e.currentTarget).closest('tr');
      if (source == "V24") this.handleEvent(this.eventHandlers.firSaveHandler, data, "firSaveHandler", rowElement, source);
      else if (source == "V28") this.handleEvent(this.eventHandlers.firSaveHandler, data, "firSaveHandler", rowElement, source);
    });


    this.container.on("click", ".summary-not-reviewed-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "narrative")
        this.handleEvent(this.eventHandlers.narrativeReviewHandler, data, "narrativeReviewHandler");
    });

    this.container.on("click", ".summary-payment-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "court_management")
        this.handleEvent(this.eventHandlers.courtManagementPaymentHandler, data, "courtManagementPaymentHandler");
    });

    this.container.on("click", ".summary-approve-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashApproveHandler, data, "trafficCrashApproveHandler");
      if (source == "traffic")
        this.handleEvent(this.eventHandlers.trafficCrashApproveHandler, data, "trafficCrashApproveHandler");
      else if (source == "traffic_citation")
        this.handleEvent(this.eventHandlers.trafficCitationApproveHandler, data, "trafficCitationApproveHandler");
      else if (source == "warrant_citation_arrest")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestApproveHandler,
          data,
          "warrantCitationArrestApproveHandler"
        );
      else if (source == "arrest_non")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestApproveHandler,
          data,
          "warrantCitationArrestApproveHandler"
        );
      else if (source == "fir") this.handleEvent(this.eventHandlers.firApproveHandler, data);
      else if (source == "linked_incident")
        this.handleEvent(this.eventHandlers.linkedIncidentApproveHandler, data, "linkedIncidentApproveHandler");
    });

    this.container.on("click", ".summary-crash-submission-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashSubmissionHandler, data, "trafficCrashSubmissionHandler");
      if (source == "traffic")
        this.handleEvent(this.eventHandlers.trafficCrashSubmissionHandler, data, "trafficCrashSubmissionHandler");
    });

    this.container.on("click", ".summary-print-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashPrintHandler, data, "trafficCrashPrintHandler");
      else if (source == "attachment")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "arrest_attachment")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "incident_attachment")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "property_attachment")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "traffic_attachments")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "traffic_citation_attachments")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "permit_attachments")
        this.handleEvent(this.eventHandlers.attachmentPrintHandler, data, "attachmentPrintHandler");
      else if (source == "traffic_narrative")
        this.handleEvent(this.eventHandlers.narrativePrintHandler, data, "narrativePrintHandler");
      else if (source == "traffic_citation_narrative")
        this.handleEvent(this.eventHandlers.narrativePrintHandler, data, "narrativePrintHandler");
    });

    this.container.on("click", ".summary-unlock-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashUnlockHandler, data, "trafficCrashUnlockHandler");
      else if (source == "traffic_citation")
        this.handleEvent(this.eventHandlers.trafficCitationUnlockHandler, data, "trafficCitationUnlockHandler");
      else if (source == "warrant_citation_arrest")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestUnlockHandler,
          data,
          "warrantCitationArrestUnlockHandler"
        );
      else if (source == "fir") this.handleEvent(this.eventHandlers.firUnlockHandler, data, "firUnlockHandler");
      else if (source == "linked_incident")
        this.handleEvent(this.eventHandlers.linkedIncidentUnlockHandler, data, "linkedIncidentUnlockHandler");
    });

    this.container.on("click", ".summary-hourglass-btn", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "traffic_crash")
        this.handleEvent(this.eventHandlers.trafficCrashCancelApproveHandler, data, "trafficCrashCancelApproveHandler");
      else if (source == "traffic_citation")
        this.handleEvent(
          this.eventHandlers.trafficCitationCancelApproveHandler,
          data,
          "trafficCitationCancelApproveHandler"
        );
      else if (source == "warrant_citation_arrest")
        this.handleEvent(
          this.eventHandlers.warrantCitationArrestCancelApproveHandler,
          data,
          "warrantCitationArrestCancelApproveHandler"
        );
      else if (source == "fir")
        this.handleEvent(this.eventHandlers.firCancelApproveHandler, data, "firCancelApproveHandler");
      else if (source == "linked_incident")
        this.handleEvent(
          this.eventHandlers.linkedIncidentCancelApproveHandler,
          data,
          "linkedIncidentCancelApproveHandler"
        );
    });

    this.container.on("click", ".summary-go-to-source", (e) => {
      const { source, data } = getSummaryRowData(e);
      if (source == "property")
        this.handleEvent(this.eventHandlers.propertyGoToEvidenceHandler, data, "propertyGoToEvidenceHandler");
    });

    this.container.on("change", ".select_summary", (e) => {
      const { source, data } = getSummaryRowData(e);
      const val = $(e.target).val();
      if (source === "court_management") {
        if (val === "attachment")
          this.handleEvent(
            this.eventHandlers.courtManagementAttachmentHandler,
            data,
            "courtManagementAttachmentHandler"
          );
        else if (val === "seal")
          this.handleEvent(this.eventHandlers.courtManagementSealHandler, data, "courtManagementSealHandler");
        else if (val === "unseal")
          this.handleEvent(this.eventHandlers.courtManagementUnsealHandler, data, "courtManagementUnsealHandler");
        else if (val === "view_source")
          this.handleEvent(
            this.eventHandlers.courtManagementViewSourceHandler,
            data,
            "courtManagementViewSourceHandler"
          );
      }

      $(e.target).val("");
    });
  };

  //To run event handler code without errors. If the event handler is not provided, it wont throw error.
  handleEvent = (eventHandler, data, name, rowElement, source) => {
    if (!eventHandler) {
      console.error(`DetailSummary : ${name} event handler is not set`);
      return;
    }

    eventHandler(data ,rowElement, source);
  };

  checkPrivileges = (permissionType, extraPrevilegeToCheck, extraPrivilegePermissionType) => {
    if (this.privilegeName) {
      if (!globalVariables[this.privilegeName] || !globalVariables[this.privilegeName][permissionType]) return false;
    }

    if (extraPrevilegeToCheck) {
      const permissionTypeToCheck = extraPrivilegePermissionType || permissionType;
      if (!globalVariables[extraPrevilegeToCheck] || !globalVariables[extraPrevilegeToCheck][permissionTypeToCheck])
        return false;
    }

    return true;
  };

  //To trigger updating tab for all detail summary objects.
  static refresh(recordType, source, masterTableCallback) {
    if (typeof window._detailSummaryInstances !== "undefined") {
      for (const detailSummaryObject of window._detailSummaryInstances.values()) {
        if (detailSummaryObject.recordType === recordType) {
          if (source) detailSummaryObject.updatedTab = source;

          //If the masterTableCallback is provided, it means we should reload master table.
          if (masterTableCallback && detailSummaryObject.master) {
            //Reloading master table from detail summary object
            setTimeout(() => detailSummaryObject.master.ajax.reload(masterTableCallback, false), 300);
          } else {
            detailSummaryObject.refresh();
          }
        }
      }
    }
  }
}

//#region jquery extension methods
$(document).ready(() => {
  //Initializing detail summary or returning created instance.
  $.fn.detailSummary = function (recordType, options) {
    //Iterating over every selected element. Selected elements will be the containers for tabs.
    $.each(this, function (index, elem) {
      //window._detailSummaryInstances holds all detail summary objects in Map as global variable.
      //We need to access these instances from everywhere. Therefore global window._detailSummaryInstances will be created.
      if (typeof window._detailSummaryInstances === "undefined") {
        window._detailSummaryInstances = new Map();
      }

      //If the element wasn't initialized before and recordType is provided, we create new detail summary object related to that container.
      if (!window._detailSummaryInstances.has(elem) && recordType) {
        const detailSummary = new DetailSummary(recordType, elem, options);

        window._detailSummaryInstances.set(elem, detailSummary);
      }
    });

    //We return newly created or existing detail summary object for first of selected elements.
    if (this.length) return window._detailSummaryInstances.get(this[0]);

    return null;
  };

  //loading detail summary when master table clicked row changes.
  //$("#detail").loadDetailSummary(...);
  $.fn.loadDetailSummary = function () {
    if (typeof window._detailSummaryInstances === "undefined") return;

    const args = arguments;

    $.each(this, function (index, elem) {
      const detailSummary = window._detailSummaryInstances.get(elem);

      if (detailSummary) detailSummary.loadDetailSummary.apply(detailSummary, args);
    });
  };

  //Setting master table for being able to reload from detail summary.
  //Call this method in the master page after master table initialized if needed. It is optional.
  $.fn.setMasterTable = function (masterTable) {
    if (typeof window._detailSummaryInstances === "undefined") return;

    $.each(this, function (index, elem) {
      const detailSummary = window._detailSummaryInstances.get(elem);

      if (detailSummary) detailSummary.setMasterTable(masterTable);
    });
  };
});
//#endregion jquery extension methods
function createAndPopulateDetailsTable(dataArray) {

  let $detailsTableContainer = $('#detailsTableContainer');
  if ($detailsTableContainer.length === 0) {
    $detailsTableContainer = $('<div id="detailsTableContainer" class="tableBorder"></div>');
    $('body').append($detailsTableContainer);
  } else {
    $detailsTableContainer.empty();
  }

  var tableHtml = `<table class="datatable display nowrap" style="width:100%" id="detailsTable">
                     <thead>
                       <tr>
                         <th>DiagnosisCode</th>
                         <th>ServiceDate</th>
                       </tr>
                     </thead>
                     <tbody>`;

  dataArray.forEach(function(dataItem) {
    tableHtml += `<tr>
                    <td>${dataItem.DiagnosisCode}</td>
                    <td>${dataItem.serviceDate}</td>
                  </tr>`;
  });

  tableHtml += `</tbody>
                </table>`;

  $detailsTableContainer.html(tableHtml);

  $('#detailsTable').DataTable({
    destroy: true,
    responsive: true,
    lengthMenu: [[7, 25, 50, 100], [7, 25, 50, 100]],
    order: [[0, "desc"]],
    oLanguage: {
      oPaginate: {
        sFirst: "",
        sPrevious: "",
        sNext: "",
        sLast: "",
      },
    },
    sLengthMenu: "Records per page: _MENU_",
    sInfo: "Total of _TOTAL_ records (showing _START_ to _END_)",
    sInfoFiltered: "(filtered from _MAX_ total records)",
    deferRender: true,
    fnDrawCallback: function () {
      $('[data-toggle="tooltip"]').tooltip();
      if (this.api().responsive) {
        this.api().responsive.recalc();
      }
    },
  });
}



function fetchV24HistoricalData(data, source){
  const subscriberId = data.subscriber_id;
  const diagnosisCode = data.DiagnosisCode;
  const serviceDate = data.serviceDate;
  $.ajax({
    url: './fetch_historical_data', 
    type: 'GET',
    data: { 
      subscriber_id: subscriberId,
      diagnosisCode: diagnosisCode,
      serviceDate: serviceDate,
      source: source,
    },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(response) {
      createAndPopulateDetailsTable(response)       
    },
    error: function(xhr, status, error) {
      console.error('Error saving data', error);
    }
  });
}



//#region Shared Tabs
function getSharedTab(tabName, page) {
  if (tabName === "evidence") {
    return getEvidenceTab(page);
  }

  if (tabName === "traffic_crash") {
    return getTrafficCrashTab(page);
  }

  if (tabName === "traffic_citation") {
    return getTrafficCitationTab(page);
  }

  if (tabName === "warrant_citation_arrest") {
    return getWarrantCitationArrestTab(page);
  }

  if (tabName === "fir") {
    return getFirTab(page);
  }

  if (
    [
      "attachment",
      "arrest_attachment",
      "incident_attachment",
      "property_attachment",
      "traffic_citation_attachments",
      "traffic_attachments",
      "permit_attachments",
    ].includes(tabName)
  ) {
    return getAttachmentTab(page, tabName);
  }

  if (tabName === "print_out") {
    return getPrintOutTab(page);
  }

  if (tabName === "call_management") {
    return getCallManagementTab(page);
  }

  if (tabName === "cad_unit") {
    return getCallManagementUnitTab(page);
  }

  if (tabName === "cad_comment") {
    return getCallManagementCommentTab(page);
  }

  if (tabName === "narrative") {
    return getNarrativeTab(page);
  }
}

function getEvidenceTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region EVIDENCE BUTTONS HANDLER
  function evidenceEditHandler(data) {
    const link = generateLink("evidence", "edit", data);
    myPopupWin(link, () => callbackRefreshSummary("evidence"));
  }

  function evidenceViewHandler(data) {
    let link;
    if (data.department === globalVariables.department_name) link = generateLink("evidence", "view", data);
    else link = generateLink("edit_view_request", null, data);

    myPopupWin(link);
  }

  function evidenceDeleteHandler(data) {
    const link = generateLink("evidence", "delete", data);
    deletePopup(link, { id: data.id }, () => callbackRefreshSummary("evidence"));
  }

  function evidenceCheckoutHandler(data) {
    const link = generateLink("evidence", "checkout", data);
    myPopupWin(link, () => callbackRefreshSummary("evidence"));
  }

  function evidenceDisposeHandler(data) {
    const link = generateLink("evidence", "dispose", data);
    myPopupWin(link, () => callbackRefreshSummary("evidence"));
  }

  function evidenceRestoreHandler(data) {
    const link = generateLink("evidence", "restore", data);
    showConfirm("Restore the Evidence?", "This action will restore the data", link, { id: data.id }, () =>
      callbackRefreshSummary("evidence")
    );
  }

  function evidenceMoveHandler(data) {
    const link = generateLink("evidence", "move", data);
    myPopupWin(link, () => callbackRefreshSummary("evidence"));
  }

  //#endregion EVIDENCE BUTTONS HANDLER

  const evidenceRowCallback = (nRow, aData) => {
    if (aData.checked_out == 1) {
      $(".summary-check-out-btn", nRow).hide();
      $(".summary-dispose-btn", nRow).hide();
      $(".summary-checked-out-btn", nRow).removeClass("d-none");
      if (aData.out_to_place) {
        $(".summary-checked-out-btn", nRow).text(aData.out_to_place);
      }
      $(".summary-edit-btn", nRow).hide();
    } else {
      $(".summary-check-out-btn", nRow).removeClass("d-none");
      $(".summary-dispose-btn", nRow).removeClass("d-none");
      $(".summary-checked-out-btn", nRow).hide();
    }

    if (aData.disposed == 1) {
      $(".summary-disposed-btn", nRow).removeClass("d-none");
      $(".summary-restore-btn", nRow).removeClass("d-none");
      $(".summary-check-out-btn", nRow).hide();
      $(".summary-checked-out-btn", nRow).hide();
      $(".summary-dispose-btn", nRow).hide();
      $(".summary-edit-btn", nRow).hide();
    } else {
      $(".summary-restore-btn", nRow).hide();
      $(".summary-disposed-btn", nRow).hide();
    }

    addLinkToSource({
      incidentNo: aData.evidence_no,
      dataSource: "evidence",
      privilege: "PRIVILEGE_EVIDENCE_PROPERTY",
      container: $(".go-to-source", nRow),
    });
  };

  const privilege = "PRIVILEGE_EVIDENCE_PROPERTY";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    {
      data: "incident_no",
      title: "INCIDENT#",
      data: (d) => d,
      render: evidenceIncidentNoRender,
    },
    {
      data: "evidence_no",
      title: "EVIDENCE#",
      data: (d) => d,
      render: incidentLinkRender,
    },
    { data: "date_recovered", title: "DATE RECOVERED" },
    { data: "recovery_type", title: "RECOVERY TYPE" },
    { data: "evidence_type", title: "EVIDENCE TYPE" },
    { data: "description", title: "DESCRIPTION" },
    { data: "room_location", title: "ROOM LOCATION" },
    { data: "submitted_by", title: "SUBMITTED BY" },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      class: "dt-nowrap",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "print",
        "check-out",
        "checked-out",
        "dispose",
        "disposed",
        "restore",
        "move",
        "hourglass",
        "locked",
        "progress",
        "delete",
      ]),
      responsivePriority: 0,
    },
  ];

  if (page !== "master_name" && page !== "master_vehicle") {
    columns = columns.filter((col) => ["INCIDENT#", "DEPARTMENT"].includes(col.title) === false);
  }

  return {
    title: "Evidence",
    eventHandlers: {
      evidenceEditHandler,
      evidenceViewHandler,
      evidenceDeleteHandler,
      evidenceCheckoutHandler,
      evidenceDisposeHandler,
      evidenceRestoreHandler,
      evidenceMoveHandler,
    },
    tableOptions: {
      fnRowCallback: evidenceRowCallback,
      columns,
    },
    privilege,
  };
}

function getTrafficCrashTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region TRAFFIC CRASH BUTTONS HANDLER
  function trafficCrashEditHandler(data) {
    const link = generateLink("traffic_crash", "edit", data);
    myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
  }

  function trafficCrashViewHandler(data) {
    const link = generateLink("traffic_crash", "view", data);
    myPopupWin(link);
  }

  function trafficCrashDeleteHandler(data) {
    const link = generateLink("traffic_crash", "delete", data);
    deletePopup(link, null, () => callbackRefreshSummary("traffic_crash"));
  }

  function trafficCrashApproveHandler(data) {
    const link = generateLink("traffic_crash", "approve", data);
    myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
  }

  async function trafficCrashSubmissionHandler(data) {
    const isCustomFips = globalVariables.custom_fips;
    const fipsCode = data.fips_code;

    if (isCustomFips && !fipsCode) {
      $.alert("Please enter a FIPS code at traffic crash edit page");

      return;
    }

    const diagramCount = data.diagram_count;

    let crash_diagram_id = "";

    if (diagramCount > 1) {
      try {
        crash_diagram_id = await showCrashDiagramSelectModal(data.crash_no);
      } catch {
        return;
      }
    }

    const link = generateLink("traffic_crash", "submit", {
      ...data,
      crash_diagram_id,
    });
    myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
  }

  async function trafficCrashPrintHandler(data) {
    const diagramCount = data.diagram_count;

    let crash_diagram_id = "";

    if (diagramCount > 1) {
      try {
        crash_diagram_id = await showCrashDiagramSelectModal(data.crash_no);
      } catch {
        return;
      }
    }

    const link = generateLink("traffic_crash", "print", {
      ...data,
      crash_diagram_id,
    });
    myPopupWin(link);
  }

  function trafficCrashUnlockHandler(data) {
    const link = generateLink("traffic_crash", "unlock", data);
    myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
  }

  function trafficCrashCancelApproveHandler(data) {
    const link = generateLink("traffic_crash", "cancel_user_approve", data);

    $.confirm({
      title: "Cancel User Approval",
      content: "Confirm to continue!",
      content: ``,
      buttons: {
        confirm: function (ev) {
          $.post(link, { type: "traffic_crash" }).done(() => {
            $.alert("The user approval has been succesfully cancelled");
            callbackRefreshSummary("traffic_crash");
          });
        },
        cancel: function () {
          //  $.alert('Canceled!');
        },
      },
    });
  }

  //#endregion TRAFFIC CRASH BUTTONS HANDLER
  const privilege = "PRIVILEGE_TRAFFIC_CRASH";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "crash_no", title: "CRASH NO", responsivePriority: 1 },
    { data: "crash_date", title: "CRASH DATE", responsivePriority: 1 },
    { data: "Address", title: "ADDRESS", responsivePriority: 2 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "approve",
        "crash_submission",
        "crash_submitted",
        "hourglass",
        "unlock",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ];

  const trafficCrashRowCallback = (nRow, aData) => {
    if (aData.report_items) {
      const isPrivateProperty = aData.report_items.split(",").some((p) => p == "PP");
      if (isPrivateProperty) $("#state_submission", nRow).hide();
    } else {
      $("#state_submission", nRow).removeClass("d-none");
    }

    if (aData.oh1_submission == 1) {
      if (globalVariables.crash_submission == "yes") {
        $("#state_submission2", nRow).removeClass("d-none");
        $("#state_submission", nRow).hide();
      }
    }
  };

  return {
    title: "Traffic Crash",
    eventHandlers: {
      trafficCrashEditHandler,
      trafficCrashViewHandler,
      trafficCrashDeleteHandler,
      trafficCrashApproveHandler,
      trafficCrashSubmissionHandler,
      trafficCrashPrintHandler,
      trafficCrashUnlockHandler,
      trafficCrashCancelApproveHandler,
    },
    tableOptions: {
      fnRowCallback: trafficCrashRowCallback,
      columns,
    },
    privilege,
  };
}

function getTrafficCitationTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region TRAFFIC CITATION BUTTONS HANDLER
  function trafficCitationEditHandler(data) {
    const link = generateLink("traffic_citation", "edit", data);
    myPopupWin(link, () => callbackRefreshSummary("traffic_citation"));
  }

  function trafficCitationViewHandler(data) {
    let link;
    if (data.department === globalVariables.department_name) link = generateLink("traffic_citation", "view", data);
    else link = generateLink("edit_view_request", null, data);

    myPopupWin(link);
  }

  function trafficCitationDeleteHandler(data) {
    const link = generateLink("traffic_citation", "delete", data);
    deletePopup(link, null, () => callbackRefreshSummary("traffic_citation"));
  }

  function trafficCitationApproveHandler(data) {
    const link = generateLink("traffic_citation", "approve", data);
    myPopupWin(link, () => callbackRefreshSummary("traffic_citation"));
  }

  function trafficCitationUnlockHandler(data) {
    const link = generateLink("traffic_citation", "unlock", data);
    myPopupWin(link, () => callbackRefreshSummary("traffic_citation"));
  }

  function trafficCitationCourtManagementHandler(data) {
    const link = generateLink("court_management", "send", {
      ...data,
      incident_no: data.citation_no,
      source: "Traffic Citation",
    });
    myPopupWin(link);
  }

  function trafficCitationCancelApproveHandler(data) {
    const link = generateLink("traffic_citation", "cancel_user_approve", data);

    $.confirm({
      title: "Cancel User Approval",
      content: "Confirm to continue!",
      content: ``,
      buttons: {
        confirm: function (ev) {
          $.post(link, { type: "traffic_citation" }).done(() => {
            $.alert("The user approval has been succesfully cancelled");
            callbackRefreshSummary("traffic_citation");
          });
        },
        cancel: function () {
          //  $.alert('Canceled!');
        },
      },
    });
  }

  function trafficCitationSealHandler(data) {
    const link = generateLink("seal", null, {
      ...data,
      incident_no: data.citation_no,
      source: "citation",
    });
    sealConfirm(link, null, () => callbackRefreshSummary("traffic_citation"));
  }

  function trafficCitationUnsealHandler(data) {
    const link = generateLink("unseal", null, {
      ...data,
      incident_no: data.citation_no,
      source: "citation",
    });
    showConfirm(
      "Unseal the Case?",
      "You will unseal the case and any related records in viparlink with this action!",
      link,
      null,
      () => callbackRefreshSummary("traffic_citation")
    );
  }
  //#endregion TRAFFIC CITATION BUTTONS HANDLER

  const privilege = "PRIVILEGE_TRAFFIC_CITATION_WARNING";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "citation_no", title: "CITATION NO", responsivePriority: 1 },
    {
      data: "person_name",
      title: "DEFENDANT",
      responsivePriority: 1,
      class: "master-name-detail",
    },
    { data: "citation_date", title: "DATE", responsivePriority: 1 },
    { data: "Address", title: "ADDRESS", responsivePriority: 2 },
    { data: "Violation", title: "CHARGE", responsivePriority: 2 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "approve",
        "court_management",
        "hourglass",
        "unlock",
        "locked",
        "progress",
        "seal",
        "unseal",
      ]),
      responsivePriority: 0,
    },
  ];

  if (page !== "master_name" && page !== "master_vehicle") {
    columns = columns.filter((col) => ["DEPARTMENT"].includes(col.title) === false);
  }

  if (page === "master_name") {
    columns = columns.filter((col) => ["DEFENDANT"].includes(col.title) === false);
  }

  return {
    title: "Traffic Citation",
    eventHandlers: {
      trafficCitationEditHandler,
      trafficCitationViewHandler,
      trafficCitationDeleteHandler,
      trafficCitationApproveHandler,
      trafficCitationUnlockHandler,
      trafficCitationCourtManagementHandler,
      trafficCitationCancelApproveHandler,
      trafficCitationSealHandler,
      trafficCitationUnsealHandler,
    },
    tableOptions: {
      fnRowCallback: null,
      columns,
    },
    privilege,
  };
}

function getWarrantCitationArrestTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region WARRANT CITATION ARREST BUTTONS HANDLER
  function warrantCitationArrestEditHandler(data) {
    const link = generateLink("warrant_citation_arrest", "edit", data);
    myPopupWin(link, () => callbackRefreshSummary("warrant_citation_arrest"));
  }

  function warrantCitationArrestViewHandler(data) {
    let link;
    if (data.department === globalVariables.department_name)
      link = generateLink("warrant_citation_arrest", "view", data);
    else link = generateLink("edit_view_request", null, data);

    myPopupWin(link);
  }

  function warrantCitationArrestDeleteHandler(data) {
    const link = generateLink("warrant_citation_arrest", "delete", data);
    deletePopup(link, null, () => callbackRefreshSummary("warrant_citation_arrest"));
  }

  function warrantCitationArrestApproveHandler(data) {
    const link = generateLink("warrant_citation_arrest", "approve", data);
    myPopupWin(link, () => callbackRefreshSummary("warrant_citation_arrest"));
  }

  function warrantCitationArrestUnlockHandler(data) {
    const link = generateLink("warrant_citation_arrest", "unlock", data);
    myPopupWin(link, () => callbackRefreshSummary("warrant_citation_arrest"));
  }

  function warrantCitationArrestCourtManagementHandler(data) {
    const link = generateLink("court_management", "send", {
      ...data,
      source: "Warrant-Citation Arrest",
    });
    myPopupWin(link);
  }

  function warrantCitationArrestSealHandler(data) {
    const link = generateLink("seal", null, {
      ...data,
      source: "Warrant-Citation Arrest",
    });
    sealConfirm(link, null, () => callbackRefreshSummary("warrant_citation_arrest"));
  }

  function warrantCitationArrestUnsealHandler(data) {
    const link = generateLink("unseal", null, {
      ...data,
      source: "Warrant-Citation Arrest",
    });
    showConfirm(
      "Unseal the Case?",
      "You will unseal the case and any related records in viparlink with this action!",
      link,
      null,
      () => callbackRefreshSummary("warrant_citation_arrest")
    );
  }

  function warrantCitationArrestCancelApproveHandler(data) {
    const link = generateLink("warrant_citation_arrest", "cancel_user_approve", data);

    $.confirm({
      title: "Cancel User Approval",
      content: "Confirm to continue!",
      content: ``,
      buttons: {
        confirm: function (ev) {
          $.post(link, { type: "warrant_citation_arrest" }).done(() => {
            $.alert("The user approval has been succesfully cancelled");
            callbackRefreshSummary("warrant_citation_arrest");
          });
        },
        cancel: function () {
          //  $.alert('Canceled!');
        },
      },
    });
  }

  //#endregion WARRANT CITATION ARREST BUTTONS HANDLER

  const privilege = "PRIVILEGE_WARRANT_CITATION_ARREST";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    {
      data: "incident_no",
      title: "ARREST NO",
      responsivePriority: 1,
      data: (d) => d,
      render: incidentLinkRender,
    },
    {
      data: "person_name",
      title: "PERSON",
      responsivePriority: 1,
      class: "master-name-detail",
    },
    { data: "address", title: "ARREST LOCATION", responsivePriority: 1 },
    { data: "arrest_date", title: "ARREST DATE", responsivePriority: 1 },
    { data: "charge", title: "CHARGE", responsivePriority: 2 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "approve",
        "court_management",
        "seal",
        "unseal",
        "hourglass",
        "unlock",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ];

  if (page !== "master_name" && page !== "master_vehicle") {
    columns = columns.filter((col) => ["department"].includes(col.data) === false);
  }

  if (page === "master_name") {
    columns = columns.filter((col) => ["person_name"].includes(col.data) === false);
  }

  return {
    title: "Warrant Citation Arrest",
    eventHandlers: {
      warrantCitationArrestEditHandler,
      warrantCitationArrestViewHandler,
      warrantCitationArrestDeleteHandler,
      warrantCitationArrestApproveHandler,
      warrantCitationArrestUnlockHandler,
      warrantCitationArrestCourtManagementHandler,
      warrantCitationArrestSealHandler,
      warrantCitationArrestCancelApproveHandler,
      warrantCitationArrestUnsealHandler,
    },
    tableOptions: {
      fnRowCallback: null,
      columns,
    },
    privilege,
  };
}

function getFirTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }
  

  function firEditHandler(data,rowElement) {
    enableInlineEditing(rowElement);
  }

  function enableInlineEditing(row) {
    if (row.hasClass('editing')) {
      revertInlineEdits(row);
    } else {
      $('.editing').each(function() {
        revertInlineEdits($(this));
      });
  
      row.find('td').each(function() {
        if (!$(this).find('.summary-edit-btn, .summary-dispose-btn').length) {
          var cellData = $(this).text();
          $(this).html('<input type="text" value="' + cellData + '" style="width: 100%; border: 1px solid #000; padding: 4px;">');
        }
      });
      row.addClass('editing');
    }
  }
  
  function revertInlineEdits(row) {
    row.find('td').each(function() {
      if (!$(this).hasClass('edit-controls')) {
        var originalText = $(this).find('input').attr('value');
        if (originalText !== undefined) {
          $(this).text(originalText);
        }
      }
    });
    row.removeClass('editing');
  }
  
  
  function firDisposeHandler(rowElement) {
    revertInlineEdits(rowElement);
  }
  
  function firViewHandler(data) {
    let link;
    if (data.department === globalVariables.department_name) link = generateLink("fir", "view", data);
    else link = generateLink("edit_view_request", null, data);

    myPopupWin(link);
  }

  function firDeleteHandler(data) {
    const link = generateLink("fir", "delete", data);
    deletePopup(link, null, () => callbackRefreshSummary("fir"));
  }

  function firSaveHandler(data, rowElement, source) {
    var updatedData = {};
    var changesMade = false;
  
    var originalData = $(rowElement).closest('table').DataTable().row(rowElement).data();
    updatedData.subscriber_id = originalData.subscriber_id;
    updatedData.originalDiagnosisCode = originalData.DiagnosisCode;
    updatedData.source = source;
  
    $(rowElement).find('td').each(function() {
      var cellKey = $(this).data('cell-key');
      if (cellKey) {
        var cellData = $(this).find('input').length > 0 ? $(this).find('input').val() : $(this).text();
        
        var normalizedOriginalData = originalData[cellKey] === null ? '' : originalData[cellKey];
        var normalizedCellData = cellData === null ? '' : cellData;
  
        updatedData[cellKey] = cellData;
  
        if (normalizedOriginalData != normalizedCellData) {
          console.log(`Original cell data: ${normalizedOriginalData}`);
          console.log(`New cell data: ${normalizedCellData}`);
          changesMade = true;
        }
      }
    });
  
    if (changesMade) {
      $.ajax({
        url: './fir_save',
        type: 'POST',
        data: JSON.stringify(updatedData),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response) {
          if (source === "V24") {
            callbackRefreshSummary("V24");
          } else if (source === "V28") {
            callbackRefreshSummary("V28");
          }
        },
        error: function(xhr, status, error) {
          console.error('Error saving data', error);
        }
      });
    } 
  }
  

  
  function firApproveHandler(data) {
    const link = generateLink("fir", "approve", data);
    myPopupWin(link, () => callbackRefreshSummary("fir"));
  }

  function firUnlockHandler(data) {
    const link = generateLink("fir", "unlock", data);
    myPopupWin(link, () => callbackRefreshSummary("fir"));
  }

  function firCancelApproveHandler(data) {
    const link = generateLink("fir", "cancel_user_approve", data);

    $.confirm({
      title: "Cancel User Approval",
      content: "Confirm to continue!",
      content: ``,
      buttons: {
        confirm: function (ev) {
          $.post(link, { type: "fir" }).done(() => {
            $.alert("The user approval has been succesfully cancelled");
            callbackRefreshSummary("fir");
          });
        },
        cancel: function () {
          //  $.alert('Canceled!');
        },
      },
    });
  }

  //#endregion FIR BUTTONS HANDLER

  const privilege = "PRIVILEGE_FIR";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    {
      data: "incident_no",
      title: "INTERVIEW NO",
      responsivePriority: 1,
      data: (d) => d,
      render: incidentLinkRender,
    },
    {
      data: "person_name",
      title: "PERSON",
      responsivePriority: 1,
      class: "master-name-detail",
    },
    { data: "address", title: "FIR LOCATION", responsivePriority: 1 },
    { data: "interview_date", title: "INTERVIEW DATE", responsivePriority: 1 },
    { data: "dob", title: "DOB", responsivePriority: 3 },
    { data: "race", title: "RACE", responsivePriority: 3 },
    { data: "sex", title: "SEX", responsivePriority: 3 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "approve",
        "hourglass",
        "unlock",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ];

  if (page !== "master_name" && page !== "master_vehicle") {
    columns = columns.filter((col) => ["department"].includes(col.data) === false);
  }

  if (page === "master_name") {
    columns = columns.filter((col) => ["person_name"].includes(col.data) === false);
  }

  return {
    title: "FIR",
    eventHandlers: {
      firEditHandler,
      firViewHandler,
      firDeleteHandler,
      firApproveHandler,
      firUnlockHandler,
      firCancelApproveHandler,
      firDisposeHandler,
      firSaveHandler
    },
    tableOptions: {
      fnRowCallback: null,
      columns,
    },
    privilege,
  };
}

function getAttachmentTab(page, tabName) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region ATTACHMENT BUTTONS HANDLER

  function attachmentViewHandler(data) {
    const link = data.full_path;
    if (data.type == "image") popupImage(link);
    else myPopupWin(link);
  }

  function attachmentEditHandler(data) {
    const link = generateLink("attachment", "edit", data);
    myPopupWin(link, () => callbackRefreshSummary(tabName));
  }

  async function attachmentPrintHandler(data) {
    //If not PrintJS loaded , dynamically load
    await conditionallyLoadScript(window.printJS, "/js/print.min.js");

    if (getType(data.orginal_name) == "image") {
      printJS({
        printable: `${globalVariables.departmentBucketFullURL}/${data.file_name}`,
        type: "image",
        header: data.orginal_name,
      });
    } else if (getType(data.orginal_name) == "pdf") {
      printJS({
        printable: `${globalVariables.departmentBucketFullURL}/${data.file_name}`,
        type: "pdf",
        header: data.orginal_name,
        showModal: true,
      });
    }
  }

  function attachmentDeleteHandler(data) {
    const link = generateLink("attachment", "delete", data);
    deletePopup(link, { key: data.file_name }, () => callbackRefreshSummary(tabName));
  }

  function attachmentConfidentialHandler(data) {
    const link = generateLink("attachment", "confidential", data);
    showConfirm(
      "Are you sure?",
      "This action will change the confidentiality of attachment",
      link,
      {
        idim: data.id,
        isChecked: data.isChecked,
        database: data.database,
      },
      () => callbackRefreshSummary(tabName)
    );
  }

  $(document)
    .off("click", ".attachment-confidential")
    .on("click", ".attachment-confidential", function (e) {
      e.preventDefault();
      const { data } = getSummaryRowData(e);
      const isChecked = $(this).is(":checked");
      data.isChecked = isChecked;
      attachmentConfidentialHandler(data);
    });

  //#endregion ATTACHMENT BUTTONS HANDLER

  const attachmentsRowCallback = (nRow, aData) => {
    if (getType(aData.orginal_name) !== "image" && getType(aData.orginal_name) !== "pdf") {
      $(".summary-print-btn", nRow).remove();
    }
  };

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    {
      data: (d) => d,
      title: "ATTACHMENT",
      class: "w-100",
      render: attachmentRender,
    },
    { data: "date", title: "DATE" },
    {
      data: "confidential",
      title: "CONFIDENTIAL",
      class: "align-center",
      visible: false,
      render: attachmentConfidentialRender,
    },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "print", "delete", "hourglass", "locked", "progress"]),
      responsivePriority: 0,
    },
  ];

  return {
    title: "Attachment",
    eventHandlers: {
      attachmentViewHandler,
      attachmentEditHandler,
      attachmentPrintHandler,
      attachmentDeleteHandler,
    },
    tableOptions: {
      fnRowCallback: attachmentsRowCallback,
      columns,
    },
  };
}

function getPrintOutTab(page, tabName) {
  //#region PRINT OUTS BUTTONS HANDLER

  function printOutViewHandler(data) {
    let link;

    if (data.thumbnail === "Incident") {
      link = generateLink("incident", "print_out", data);
    }

    if (data.thumbnail === "Arrest") {
      link = generateLink("arrest", "print_out", data);
    }

    if (data.thumbnail === "Suspect") {
      link = generateLink("suspect", "print_out", data);
    }

    if (data.thumbnail === "Warrant-Citation Arrest") {
      link = generateLink("warrant_citation_arrest", "print_out", data);
    }

    if (data.thumbnail === "UOF") {
      link = generateLink("uof_subject", "print_out", data);
    }

    if (data.thumbnail === "Traffic Citation") {
      link = generateLink("traffic_citation", "print_out", data);
    }

    myPopupWin(link);
  }
  //#endregion PRINT OUTS BUTTONS HANDLER

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "orginal_name", title: "PRINTED BY", responsivePriority: 1 },
  ];

  return {
    title: "Print Out",
    eventHandlers: {
      printOutViewHandler,
    },
    tableOptions: {
      fnRowCallback: null,
      columns,
    },
  };
}

function getCallManagementTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region CALL MANAGEMENT BUTTONS HANDLER
  function callManagementEditHandler(data) {
    const link = generateLink("call_management", "edit", data);
    myPopupWin(link, () => callbackRefreshSummary("call_management"));
  }

  function callManagementViewHandler(data) {
    const link = generateLink("call_management", "view", data);
    myPopupWin(link);
  }

  function callManagementDeleteHandler(data) {
    const link = generateLink("call_management", "delete", data);
    deletePopup(link, null, () => callbackRefreshSummary("call_management"));
  }

  //#endregion CALL MANAGEMENT  BUTTONS HANDLER

  const privilege = "PRIVILEGE_CALL_MANAGEMENT";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "cfs_no", title: "CFS NO", responsivePriority: 1 },
    { data: "ResponseDate", title: "DATE", responsivePriority: 1 },
    {
      data: "FinalProblemDescription",
      title: "CFS TYPE",
      responsivePriority: 1,
    },
    { data: "CallerName", title: "CALLER NAME", responsivePriority: 1 },
    { data: "CallerPhone", title: "CALLER PHONE", responsivePriority: 3 },
    { data: "Address", title: "ADDRESS", responsivePriority: 3 },
    { data: "PrimaryOfficer", title: "OFFICER", responsivePriority: 3 },
    { data: "comment", title: "COMMENT", responsivePriority: 4 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete"]),
      responsivePriority: 0,
    },
  ];

  return {
    title: "Call Management",
    eventHandlers: {
      callManagementEditHandler,
      callManagementViewHandler,
      callManagementDeleteHandler,
    },
    tableOptions: {
      fnRowCallback: null,
      columns,
    },
    privilege,
  };
}

function getCallManagementUnitTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region CALL MANAGEMENT UNIT BUTTONS HANDLER
  function callManagementUnitEditHandler(data) {
    const link = generateLink("call_management", "unit_edit", data);
    myPopupWin(link, () => callbackRefreshSummary("cad_unit"));
  }

  function callManagementUnitViewHandler(data) {
    const link = generateLink("call_management", "unit_view", data);
    myPopupWin(link);
  }

  function callManagementUnitDeleteHandler(data) {
    const link = generateLink("call_management", "unit_delete", data);
    deletePopup(link, data, () => callbackRefreshSummary("cad_unit"));
  }

  //#endregion CALL MANAGEMENT BUTTONS HANDLER

  const privilege = "PRIVILEGE_CALL_MANAGEMENT";

  let columns = [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "cfs_no", title: "CFS NO", responsivePriority: 1 },
    {
      data: "radio_officer_name",
      title: "RADIO / OFFICER NAME",
      responsivePriority: 1,
    },
    { data: "time_assigned", title: "TIME ASSIGNED", responsivePriority: 1 },
    { data: "time_arrived", title: "TIME ARRIVED", responsivePriority: 1 },
    { data: "time_cleared", title: "TIME CLEARED", responsivePriority: 3 },
    { data: "unit_type", title: "UNIT TYPE", responsivePriority: 1 },
    { data: "comment", title: "COMMENT", responsivePriority: 4 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete"]),
      responsivePriority: 0,
    },
  ];

  return {
    title: "CAD Unit",
    eventHandlers: {
      callManagementUnitEditHandler,
      callManagementUnitViewHandler,
      callManagementUnitDeleteHandler,
    },
    tableOptions: {
      fnRowCallback: null,
      columns,
      order: [[0, "asc"]],
    },
    privilege,
  };
}

function getCallManagementCommentTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region CALL MANAGEMENT COMMENT BUTTONS HANDLER
  function callManagementCommentEditHandler(data) {
    const link = generateLink("call_management", "comment_edit", data);
    myPopupWin(link, () => callbackRefreshSummary("cad_comment"));
  }

  function callManagementCommentDeleteHandler(data) {
    const link = generateLink("call_management", "comment_delete", data);
    deletePopup(link, null, () => callbackRefreshSummary("cad_comment"));
  }

  //#endregion CALL MANAGEMENT  BUTTONS HANDLER

  const privilege = "PRIVILEGE_CALL_MANAGEMENT";

  const cadCommentRowCallback = (nRow, aData) => {
    if (aData.comment_type !== "CFS Comment") {
      $(".summary-delete-btn", nRow).remove();
      $(".summary-edit-btn", nRow).remove();
      return;
    }
  };

  let columns = [
    { data: "id", visible: false, title: "" },
    { data: "comment", title: "COMMENT" },
    { data: "comment_type", title: "TYPE" },
  ];

  return {
    title: "CAD Comment",
    eventHandlers: {
      callManagementCommentEditHandler,
      callManagementCommentDeleteHandler,
    },
    tableOptions: {
      fnRowCallback: cadCommentRowCallback,
      columns,
      order: [[0, "asc"]],
    },
    privilege,
  };
}

function getNarrativeTab(page) {
  function callbackRefreshSummary(source, reloadMasterTable) {
    callbackRefreshSummaryBase(page, source, reloadMasterTable);
  }

  //#region NARRATIVE BUTTONS HANDLER
  function narrativeEditHandler(data) {
    let link;

    if (data.custom_narrative === 1) {
      if (page === "incident") {
        link = generateLink("narrative", "edit", data);
      }

      if (page === "daily_log") {
        link = generateLink("daily_log", "edit_narrative", data);
      }

      if (page === "traffic_crash") {
        link = generateLink("traffic_crash", "edit_narrative", data);
      }

      if (page === "traffic_citation") {
        link = generateLink("traffic_citation", "edit_narrative", data);
      }

      if (page === "fir") {
        link = generateLink("fir", "edit_narrative", data);
      }

      if (page === "warrant_citation_arrest") {
        link = generateLink("warrant_citation_arrest", "edit_narrative", data);
      }
    }

    if (data.custom_narrative === 0) {
      switch (data.type) {
        case "Incident Narrative":
          link = generateLink("incident", "edit", data);
          break;
        case "UOF Narrative":
          link = generateLink("uof_officer", "edit", data);
          break;
        case "Arrest Narrative":
          link = generateLink("arrest", "edit", data);
          break;
        case "Daily Log Narrative":
          link = generateLink("daily_log", "edit", data);
          break;
        case "Traffic Crash Narrative":
          link = generateLink("traffic_crash", "edit", data);
          break;
        case "Citation Narrative":
          link = generateLink("traffic_citation", "edit", data);
          break;
        case "Fir Narrative":
          link = generateLink("fir", "edit", data);
          break;
        case "Warrant Citation Narrative":
          link = generateLink("warrant_citation_arrest", "edit", data);
          break;
      }
    }

    myPopupWin(link, () => callbackRefreshSummary("narrative"));
  }

  function narrativeViewHandler(data) {
    let link;

    if (data.custom_narrative === 1) {
      if (page === "incident") {
        link = generateLink("narrative", "view", data);
      }

      if (page === "daily_log") {
        link = generateLink("daily_log", "view_narrative", data);
      }

      if (page === "traffic_crash") {
        link = generateLink("traffic_crash", "view_narrative", data);
      }

      if (page === "traffic_citation") {
        link = generateLink("traffic_citation", "view_narrative", data);
      }
      if (page === "fir") {
        link = generateLink("fir", "view_narrative", data);
      }
      if (page === "warrant_citation_arrest") {
        link = generateLink("warrant_citation_arrest", "view_narrative", data);
      }
    }

    if (data.custom_narrative === 0) {
      switch (data.type) {
        case "Incident Narrative":
          link = generateLink("incident", "view", data);
          break;
        case "UOF Narrative":
          link = generateLink("uof_officer", "view", data);
          break;
        case "Arrest Narrative":
          link = generateLink("arrest", "view", data);
          break;
        case "Daily Log Narrative":
          link = generateLink("daily_log", "view", data);
          break;
        case "Traffic Crash Narrative":
          link = generateLink("traffic_crash", "view", data);
          break;
        case "Citation Narrative":
          link = generateLink("traffic_citation", "view", data);
          break;
        case "Fir Narrative":
          link = generateLink("fir", "view", data);
          break;
        case "Warrant Citation Narrative":
          link = generateLink("warrant_citation_arrest", "view", data);
          break;
      }
    }

    myPopupWin(link);
  }

  function narrativeDeleteHandler(data) {
    let link;
    if (page === "incident") {
      link = generateLink("narrative", "delete", data);
    }

    if (page === "daily_log") {
      link = generateLink("daily_log", "delete_narrative", data);
    }

    if (page === "traffic_crash") {
      link = generateLink("traffic_crash", "delete_narrative", data);
    }

    if (page === "traffic_citation") {
      link = generateLink("traffic_citation", "delete_narrative", data);
    }
    if (page === "fir") {
      link = generateLink("fir", "delete_narrative", data);
    }

    if (page === "warrant_citation_arrest") {
      link = generateLink("warrant_citation_arrest", "delete_narrative", data);
    }

    deletePopup(link, null, () => callbackRefreshSummary("narrative"));
  }

  function narrativeReviewHandler(data) {
    const link = generateLink("narrative", "review", data);
    showConfirm("Review", "This action will mark the narrative as 'Reviewed'", link, { idim: data.id }, () =>
      callbackRefreshSummary("narrative")
    );
  }

  function narrativeConfidentialHandler(data) {
    const link = generateLink("narrative", "confidential", data);
    showConfirm(
      "Are you sure?",
      "This action will change the confidentiality of narrative",
      link,
      { idim: data.id, isChecked: data.isChecked },
      () => callbackRefreshSummary("narrative")
    );
  }

  $(document)
    .off("click", ".narrative-confidential")
    .on("click", ".narrative-confidential", function (e) {
      e.preventDefault();
      const { data } = getSummaryRowData(e);
      const isChecked = $(this).is(":checked");
      data.isChecked = isChecked;
      narrativeConfidentialHandler(data);
    });

  //#endregion NARRATIVE BUTTONS HANDLER

  const narrativeRowCallback = (nRow, aData, detailSummaryObject) => {
    if (aData.custom_narrative !== 1) {
      $(".summary-delete-btn", nRow).remove();
      $(".summary-print-btn", nRow).remove();
      $(".narrative-confidential", nRow).remove();
      return;
    }

    if (page === "incident") {
      $(".narrative-confidential", nRow).removeClass("d-none");

      const approved_date = detailSummaryObject.rowData[25];

      if (aData.reviewed_by) {
        $(".summary-reviewed-btn", nRow).attr("title", "Reviewed by " + aData.reviewed_by);
      }

      const narrative_approved = aData.reviewed_on && moment(new Date(aData.reviewed_on)).format("YYYY-MM-DD HH:mm");

      if (!approved_date) {
        if (aData.reviewed_by) {
          $(".summary-reviewed-btn", nRow).removeClass("d-none");
        } else {
          $(".summary-not-reviewed-btn", nRow).removeClass("d-none");
        }
      }

      if (approved_date) {
        if (narrative_approved) {
          if (moment(narrative_approved).isAfter(approved_date, "minute") && !aData.reviewed_by) {
            $(".summary-not-reviewed-btn", nRow).removeClass("d-none");
          } else {
            $(".summary-edit-btn", nRow).hide();
            $(".summary-delete-btn", nRow).hide();
            $(".summary-reviewed-btn", nRow).removeClass("d-none");
          }
        } else {
          if (new Date(aData.created_date) > new Date(approved_date)) {
            $(".summary-not-reviewed-btn", nRow).removeClass("d-none");
          }
        }
      }
    }
  };

  let columns = [
    { data: "created_date", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view", "reviewed", "not_reviewed"]),
      responsivePriority: 0,
    },
    {
      data: (data) => data,
      render: (data) =>
        data.type + (data.expungement ? " (Sealed)" : "") + (data.person_name ? `<br/>(${data.person_name})` : ""),
      title: "TYPE",
    },
    {
      data: "narrative",
      title: "NARRATIVE",
      class: "wrapok w-100 detail-narrative",
      render: (data) => transformLinesToBr(data),
    },
    {
      data: "confidential",
      title: "CONFIDENTIAL",
      class: "align-center",
      visible: false,
      render: narrativeConfidentialRender,
    },
    { data: "user", title: "OFFICER" },
    { data: "date", title: "DATE" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "print", "delete", "hourglass", "locked", "progress"]),
      responsivePriority: 0,
    },
  ];

  return {
    title: "Narrative",
    eventHandlers: {
      narrativeEditHandler,
      narrativeViewHandler,
      narrativeDeleteHandler,
      narrativeReviewHandler,
    },
    tableOptions: {
      fnRowCallback: narrativeRowCallback,
      columns,
      order: [[0, "asc"]],
    },
  };
}
//#endregion

function checkPrivilege(privilegeName, permissionType) {
  return globalVariables[privilegeName] && globalVariables[privilegeName][permissionType];
}

function callbackRefreshSummaryBase(page, source, reloadMasterTable) {
  DetailSummary.refresh(page, source, reloadMasterTable ? highlightClickedRow : null);
}

function evidenceIncidentNoRender(data, type, row, meta) {
  var link;

  var incident_no = data.incident_no;

  if (data.department !== globalVariables.department_name) return incident_no || "";

  if (incident_no) {
    if (incident_no.substring(4, 5) == "A") {
      link = `./arrest_database2?search=${incident_no.substring(0, 12)}`;
    } else if (incident_no.substring(4, 5) == "T") {
      link = `./traffic_citation_database?search=${incident_no.substring(0, 12)}`;
    } else if (incident_no.substring(4, 5) == "C") {
      link = `./traffic_database?search=${incident_no.substring(0, 12)}`;
    } else if (incident_no.substring(4, 5) == "F") {
      link = `./fir_database?search=${incident_no.substring(0, 12)}`;
    } else if (data.linked_source == "Daily Logs") {
      link = `.//daily_logs_database?search=${incident_no.split("-")[0]}`;
    } else {
      link = `./view?search=${incident_no.substring(0, 12)}`;
    }
  }

  return '<a  href="' + link + '" target="_blank">' + incident_no + "</a>";
}

function incidentLinkRender(data) {
  let incident_no = data.incident_no;

  if (data.evidence_no) incident_no = data.evidence_no;

  if (data.department !== globalVariables.department_name)
    return (incident_no || "") + (data.expungement ? " (Sealed)" : "");

  if (data.search_link)
    return `<a  href="${data.search_link}?search=${incident_no}" target="_blank">${incident_no}${
      data.expungement ? " (Sealed)" : ""
    }</a>`;

  return (data.incident_no || "") + (data.expungement ? " (Sealed)" : "");
}

function attachmentRender(data) {
  if (data.type == "image") {
    return `
      <div class="attachment-image-container">
        <img src="${data.thumbnail || data.full_path}" data-url="${data.full_path}"
          class="img-responsive attachment-image" />
          <br />
          ${data.orginal_name}
      </div>
    `;
  } else if (data.type == "video") {
    return `
    <div class="attachment-video-container">
      <video controls width="300">
        <source src="${data.full_path}">
        <div class="text-center">
          <i class="fa fa-video" style="font-size: 80px;"></i><br />
          ${data.orginal_name}
          <br />
          <a href="${data.full_path}" target="_blank">Download</a>
        </div>
      </video>
      <br />
      ${data.orginal_name}
    </div>
    `;
  } else if (data.type == "audio") {
    return `
    <div class="attachment-audio-container">
      <audio controls style="width:100%">
        <source src="${data.full_path}">
        <div class="text-center">
          <i class="fa fa-audio" style="font-size: 80px;"></i><br />
          ${data.orginal_name}
          <br />
          <a href="${data.full_path}" target="_blank">Download</a>
        </div>
      </audio>
      <br />
      ${data.orginal_name}
    </div>
    `;
  }
  return data.orginal_name;
}

function attachmentConfidentialRender(data) {
  return `
    <input type="checkbox" class="attachment-confidential large-checkbox" ${data == "Yes" ? "checked" : ""}>
  `;
}

function narrativeConfidentialRender(data) {
  return `
      <input type="checkbox" class="narrative-confidential d-none large-checkbox" ${data == "Yes" ? "checked" : ""}>
    `;
}
