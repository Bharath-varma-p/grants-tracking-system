var approvalSettingsPromise = null;

async function userCanModify(parameters) {
  const {
    ownCase,
    ownApproval,
    userApproved,
    supervisorApproved,
    isSupervisor,
    isPowerAdmin,
    reports_to,
    employee_id,
    theUser,
    sealed,
  } = parameters;

  let result = false;

  if (sealed) return false;

  let locked = true;
  var anySupervisor = true;
  var liste = [];

  if (reports_to) {
    liste = reports_to.split(",");

    if (liste.indexOf("") > -1) {
      anySupervisor = true;
    } else {
      anySupervisor = false;
    }
  }

  if (!supervisorApproved) locked = false;

  if (!locked) {
    // UNLOCKED & USER APPROVED
    if (userApproved) {
      if (ownApproval) {
        result = false;
      } else {
        if (anySupervisor == true && (isSupervisor || isPowerAdmin)) {
          result = true;
        }

        if (liste.indexOf(employee_id.toString()) > -1) result = true;
      }
    }
    // UNLOCKED & NO APPROVAL
    else {
      if (typeof approvalSettings === "undefined" || approvalSettings == null) {
        if (!approvalSettingsPromise) {
          approvalSettingsPromise = $.post("/" + globalVariables.routLink + "approval_design_data");
        }

        approvalSettings = await approvalSettingsPromise;
      }

      if (
        ownCase ||
        !theUser ||
        approvalSettings.all_user_can_edit == 1 ||
        (approvalSettings.supervisor_can_approve_before_user == 1 && (isSupervisor || isPowerAdmin))
      ) {
        result = true;
      }
    }
  }

  return result;
}

async function userCanUnlock(parameters) {
  const { supervisorApproved, isSupervisor, isPowerAdmin, hasUserRole, sealed } = parameters;

  let result = false;

  if (sealed) return false;

  let locked = true;

  if (!supervisorApproved) locked = false;

  if (locked) {
    if (typeof approvalSettings === "undefined" || approvalSettings == null) {
      if (!approvalSettingsPromise) {
        approvalSettingsPromise = $.post("/" + globalVariables.routLink + "approval_design_data");
      }

      approvalSettings = await approvalSettingsPromise;
    }

    if (
      (approvalSettings.user_can_unlock_after_approval == 1 && hasUserRole) ||
      (approvalSettings.supervisor_can_unlock_after_approval == 1 && isSupervisor) ||
      (approvalSettings.power_user_can_unlock_after_approval == 1 && isPowerAdmin)
    )
      result = true;
  }

  return result;
}

async function shouldEnableSelectInputs(parameters) {
  const {
    ownCase,
    ownApproval,
    userApproved,
    supervisorApproved,
    isSupervisor,
    isPowerAdmin,
    reports_to,
    employee_id,
    theUser,
    sealed,
  } = parameters;

  let result = false;

  if (sealed) return false;

  let locked = true;
  var anySupervisor = true;
  var liste = [];

  if (reports_to) {
    liste = reports_to.split(",");

    if (liste.indexOf("") > -1) {
      anySupervisor = true;
    } else {
      anySupervisor = false;
    }
  }

  if (!supervisorApproved) locked = false;

  if (typeof approvalSettings === "undefined" || approvalSettings == null) {
    if (!approvalSettingsPromise) {
      approvalSettingsPromise = $.post("/" + globalVariables.routLink + "approval_design_data");
    }

    approvalSettings = await approvalSettingsPromise;
  }

  if (locked) {
    if (approvalSettings.all_user_can_add == 1) result = true;
  } else {
    // UNLOCKED & USER APPROVED
    if (userApproved) {
      if (ownApproval) {
        result = true;
      } else {
        if (anySupervisor == true && (isSupervisor || isPowerAdmin)) {
          result = true;
        }

        if (liste.indexOf(employee_id.toString()) > -1) result = true;
      }
    }
    // UNLOCKED & NO APPROVAL
    else {
      if (
        ownCase ||
        !theUser ||
        approvalSettings.all_user_can_edit == 1 ||
        (approvalSettings.supervisor_can_approve_before_user == 1 && (isSupervisor || isPowerAdmin))
      ) {
        result = true;
      }
    }
  }

  return result;
}

async function shouldShowSaveProgressButton(parameters) {
  const {
    ownCase,
    ownApproval,
    userApproved,
    supervisorApproved,
    isSupervisor,
    isPowerAdmin,
    reports_to,
    employee_id,
    SaveProgress,
    theUser,
    sealed,
  } = parameters;

  let result = false;

  if (sealed) return false;

  let locked = true;
  var anySupervisor = true;
  var liste = [];

  if (reports_to) {
    liste = reports_to.split(",");

    if (liste.indexOf("") > -1) {
      anySupervisor = true;
    } else {
      anySupervisor = false;
    }
  }

  if (!supervisorApproved) locked = false;

  if (!locked) {
    // UNLOCKED & USER APPROVED
    if (userApproved) {
      if (ownApproval) {
        result = false;
      } else {
        if (SaveProgress) {
          if (anySupervisor == true && (isSupervisor || isPowerAdmin)) result = true;

          if (liste.indexOf(employee_id.toString()) > -1) result = true;
        }
      }
    }
    // UNLOCKED & NO APPROVAL
    else {
      if (SaveProgress) {
        if (typeof approvalSettings === "undefined" || approvalSettings == null) {
          if (!approvalSettingsPromise) {
            approvalSettingsPromise = $.post("/" + globalVariables.routLink + "approval_design_data");
          }

          approvalSettings = await approvalSettingsPromise;
        }

        if (
          ownCase ||
          !theUser ||
          approvalSettings.all_user_can_edit == 1 ||
          (approvalSettings.supervisor_can_approve_before_user == 1 && (isSupervisor || isPowerAdmin))
        ) {
          result = true;
        }
      }
    }
  }

  return result;
}

async function shouldShowHourglassIcon(parameters) {
  const {
    ownCase,
    ownApproval,
    userApproved,
    supervisorApproved,
    isSupervisor,
    isPowerAdmin,
    reports_to,
    employee_id,
    sealed,
  } = parameters;

  if (sealed) return false;

  let result = false;

  let locked = true;
  var anySupervisor = true;
  var liste = [];

  if (reports_to) {
    liste = reports_to.split(",");

    if (liste.indexOf("") > -1) {
      anySupervisor = true;
    } else {
      anySupervisor = false;
    }
  }

  if (!supervisorApproved) locked = false;

  if (typeof approvalSettings === "undefined" || approvalSettings == null) {
    if (!approvalSettingsPromise) {
      approvalSettingsPromise = $.post("/" + globalVariables.routLink + "approval_design_data");
    }

    approvalSettings = await approvalSettingsPromise;
  }

  if (!locked) {
    result = true;
    // UNLOCKED & USER APPROVED
    if (userApproved) {
      if (!ownApproval) {
        if (anySupervisor == true && (isSupervisor || isPowerAdmin)) {
          result = false;
        }

        if (liste.indexOf(employee_id.toString()) > -1) result = false;
      }
    }
    // UNLOCKED & NO APPROVAL
    else {
      result = false;
      // if (
      //     ownCase
      //     ||
      //     (
      //         approvalSettings.all_user_can_edit == 1
      //     )
      //     ||
      //     (
      //         approvalSettings.supervisor_can_approve_before_user == 1
      //         &&
      //         (isSupervisor || isPowerAdmin)
      //     )
      // ) {
      //     result = false;
      // }
    }
  }

  return result;
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function htmlToText(input, separator = "<br/>") {
  var doc = new DOMParser().parseFromString(input, "text/html");
  let result = "";

  if (!doc.body || doc.body.childNodes.length === 0) return input;
  for (const child of doc.body.childNodes) {
    if (["DIV", "TABLE", "P", "OL", "UL"].includes(child.tagName)) {
      if (["OL", "UL"].includes(child.tagName)) {
        for (const child2 of child.children) {
          result += child2.textContent + separator;
        }
      } else if (child.tagName === "TABLE") {
        for (const tr of child.querySelectorAll("tr")) {
          for (const td of tr.querySelectorAll("td")) {
            result += td.textContent + " ";
          }
          result += separator;
        }
      } else {
        result += child.textContent + separator;
      }
    } else {
      result += child.textContent;

      if (child.tagName === "BR") {
        result += separator;
      }
    }
  }
  return result;
}

//To get selected row data from dataTable tables.
function getSummaryRowData(e) {
  const table = $(e.target).parents("table[data-source]").eq(0);
  const source = table.attr("data-source");
  const data = table.DataTable().row($(e.target).parents("tr")).data();
  const row = table.DataTable().row($(e.target).parents("tr"));

  return { source, data, row };
}

//To create buttons for dataTables.
//If the button requires write permission, just add write-permission class to button.
//If the button requires read permission, just add read-permission class to button etc.
//If the button is not visible as default, add style="display:none"
function getSummaryButtonHtml(buttonType) {
  switch (buttonType) {
    case "view":
      return `<button type="button" class="btn btn-xs btn-default summary-view-btn read-permission" data-toggle="tooltip" data-placement="top" title="View"><i class="glyphicon glyphicon-eye-open"></i></button>`;
    case "edit":
      return `<button type="button" class="btn btn-xs btn-default summary-edit-btn write-permission" data-toggle="tooltip" data-placement="top" title="Edit"><i class="glyphicon glyphicon-pencil"></i></button>`;
    case "delete":
      return `<button type="button" class="btn btn-xs btn-danger summary-delete-btn delete-permission" data-toggle="tooltip" data-placement="top" title="Delete"><i class="glyphicon glyphicon-trash"></i></button>`;
    case "print":
      return `<button type="button" class="btn btn-primary btn-xs summary-print-btn read-permission" data-toggle="tooltip" data-placement="top" title="Print"><span class="glyphicon glyphicon-print"></span></button>`;
    case "court_management":
      return `<button type="button" class="btn btn-basic btn-xs summary-court-management-btn write-permission" data-toggle="tooltip" data-placement="top" title="Court Management"><span class="glyphicon glyphicon-book"></span></button>`;
    case "seal":
      return `<button type="button" class="btn btn-info btn-xs summary-seal-btn seal-permission" data-toggle="tooltip" data-placement="top" title="Seal Case"><span class="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span></button>`;
    case "unseal":
      return `<button type="button" class="btn btn-default btn-xs summary-unseal-btn d-none unseal-permission" data-toggle="tooltip" data-placement="top" title="Unseal" style="background-color:gray; color:white"><span class="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span></button>`;
    case "locked":
      return `<button type="button" class="btn btn-basic btn-xs summary-locked-btn d-none" data-toggle="tooltip" data-placement="top" title="Locked"><span class="glyphicon glyphicon-lock"></span></button>`;
    case "unlock":
      return `<button type="button" class="btn btn-basic btn-xs summary-unlock-btn d-none" data-toggle="tooltip" data-placement="top" title="Unlock Case"><span><i class="fa fa-unlock" aria-hidden="true"></i></span></button>`;
    case "progress":
      return `<button type="button" class="btn btn-warning btn-xs summary-progress-btn d-none" data-toggle="tooltip" data-placement="top" title="Save Progress"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span></button>`;
    case "hourglass":
      return `<button type="button" class="btn btn-default btn-xs summary-hourglass-btn d-none" data-toggle="tooltip" data-placement="top" title="Waiting for Supervisor Approval. Click to cancel the user approval"><span class="glyphicon glyphicon-hourglass" aria-hidden="true"></span></button>`;
    case "check-out":
      return `<button type="button" class="btn btn-xs summary-check-out-btn btn-warning write-permission"  data-toggle="tooltip" data-placement="top" title="Check-out"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></button>`;
    case "checked-out":
      return `<button type="button" class="btn btn-default btn-xs summary-checked-out-btn"  data-toggle="tooltip" data-placement="top" title="Checked-out">checked - out</button>`;
    case "dispose":
      return `<button type="button" class="btn btn-xs btn-danger summary-dispose-btn write-permission"  data-toggle="tooltip" data-placement="top" title="Dispose"><span class="glyphicon glyphicon-remove"></span></button>`;
    case "disposed":
      return `<button type="button" class="btn btn-default btn-xs summary-disposed-btn"  data-toggle="tooltip" data-placement="top" title="Disposed">D i s p o s e d</button>`;
    case "restore":
      return `<button type="button" class="btn btn-xs summary-restore-btn btn-success write-permission d-none"  data-toggle="tooltip" data-placement="top" title="Restore Evidence"><span class="glyphicon glyphicon-leaf"></span></button>`;
    case "move":
      return `<button type="button" class="btn btn-xs summary-move-btn btn-primary write-permission"  data-toggle="tooltip" data-placement="top" title="Change Room Location"><span class="glyphicon glyphicon-resize-small"></span></button>`;
    case "reviewed":
      return `<button type="button" class="btn btn-xs summary-reviewed-btn btn-success d-none"  data-toggle="tooltip" data-placement="top" title="Reviewed"><span class="glyphicon glyphicon-thumbs-up"></span></button>`;
    case "not_reviewed":
      return `<button type="button" class="btn btn-xs summary-not-reviewed-btn btn-danger write-permission d-none"  data-toggle="tooltip" data-placement="top" title="Not Reviewed Yet"><span class="glyphicon glyphicon-thumbs-down"></span></button>`;
    case "payment":
      return `<button type="button" class="btn btn-success btn-xs summary-payment-btn write-permission"  data-toggle="tooltip" data-placement="top" title="Payment"><span class="glyphicon glyphicon-usd"></span></button>`;
    case "approve":
      return `<button type="button" class="btn btn-success btn-xs summary-approve-btn write-permission"  data-toggle="tooltip" data-placement="top" title="Send For Supervisor Approval"><span class="glyphicon glyphicon-ok"></span></button>`;
    case "crash_submission":
      return `<button type="button" class="btn btn-primary btn-xs summary-crash-submission-btn write-permission"  data-toggle="tooltip" data-placement="top" title="Validate OH-1"><span class="glyphicon glyphicon-export"></span></button>`;
    case "crash_submitted":
      return `<button type="button" class="btn btn-success btn-xs summary-traffic-submit-btn d-none"  data-toggle="tooltip" data-placement="top" title="Submitted to the State"><span class="glyphicon glyphicon-export"></span></button>`;
    case "go_to_source":
      return `<button type="button" class="btn btn-default btn-xs summary-go-to-source d-none"  data-toggle="tooltip" data-placement="top" title="Go to Source"><span class="glyphicon glyphicon-new-window"></span></button>`;
    case "check_box":
      return `<label class="check-box-btn checkbox-container"><input class="checkbox" type="checkbox"><span class="checkbox-checkmark"></span></label>`;
  }

  return "";
}

function createSummaryButtons(buttons) {
  if (!Array.isArray(buttons)) return "";
  return buttons.map((buttonType) => getSummaryButtonHtml(buttonType)).join("");
}

function transformLinesToBr(val) {
  if (!val) return "";
  return val.replace(/\r\n|\r|\n/g, "<br />");
}

function showConfirm(title, content, windowLocation, data, callback) {
  if (typeof $.confirm === "undefined") {
    console.error("confirm library is missing");
    return;
  }

  $.confirm({
    title: title,
    content: content,
    buttons: {
      confirm: function () {
        if (!windowLocation) {
          if (callback) callback();
          return;
        }

        $.ajax({
          type: "POST",
          url: windowLocation,
          data: data,
          success: function (data) {
            if (callback) callback();
          },
        });
      },
      cancel: function () {},
    },
  });
}

function sealConfirm(windowLocation, data, callback) {
  showConfirm(
    "Seal the Case?",
    "You will seal the case and any related records in Peel9 with this action!",
    windowLocation,
    data,
    callback
  );
}

function deletePopup(windowLocation, data, callback) {
  showConfirm("Permanently delete?", "You will not be able to bring back the data!", windowLocation, data, callback);
}

function resetListPopup(windowLocation, data, callback) {
  showConfirm(
    "Reset List?",
    "This action will remove the checkmarks for all list items.",
    windowLocation,
    data,
    callback
  );
}

function getType(file) {
  if (file) {
    let extention = file.split(".").slice(-1)[0];
    switch (extention) {
      case "ai":
      case "bmp":
      case "gif":
      case "ico":
      case "jpeg":
      case "JPEG":
      case "jpg":
      case "JPG":
      case "png":
      case "PNG":
      case "ps":
      case "psd":
      case "svg":
      case "tiff":
      case "tif":
      case "jfif":
        return "image";
      case "htm":
      case "html":
        return "html";
      case "txt":
      case "rtf":
      case "rwpd":
      case "odt":
      case "csv":
        return "text";
      case "doc":
      case "docx":
      case "pptx":
      case "ppt":
      case "xls":
      case "xlsx":
        return "office";
      case "pdf":
      case "PDF":
        return "pdf";
      case "gdoc":
        return "gdocs";
      case "3g2":
      case "3gp":
      case "avi":
      case "h264":
      case "m4v":
      case "mkv":
      case "mov":
      case "mp4":
      case "mpg":
      case "mpeg":
      case "rm":
      case "vob":
      case "wmv":
      case "flv":
      case "swf":
      case "MP4":
      case "mp4":
        return "video";
      case "aif":
      case "cda":
      case "mid":
      case "midi":
      case "mp3":
      case "mpa":
      case "ogg":
      case "wav":
      case "wma":
      case "wpl":
        return "audio";
      default:
        return "other";
    }
  }
}

function getStates() {
  return [
    { code: "AL", state: "Alabama" },
    { code: "AK", state: "Alaska" },
    { code: "AB", state: "Alberta, CN" },
    { code: "AZ", state: "Arizona" },
    { code: "AR", state: "Arkansas" },
    { code: "BC", state: "British Columbia, CN" },
    { code: "CA", state: "California" },
    { code: "CO", state: "Colorado" },
    { code: "CT", state: "Connecticut" },
    { code: "DE", state: "Delaware" },
    { code: "DC", state: "District Of Columbia" },
    { code: "FL", state: "Florida" },
    { code: "GA", state: "Georgia" },
    { code: "HI", state: "Hawaii" },
    { code: "ID", state: "Idaho" },
    { code: "IL", state: "Illinois" },
    { code: "IN", state: "Indiana" },
    { code: "IA", state: "Iowa" },
    { code: "KS", state: "Kansas" },
    { code: "KY", state: "Kentucky" },
    { code: "LA", state: "Louisiana" },
    { code: "ME", state: "Maine" },
    { code: "MD", state: "Maryland" },
    { code: "MA", state: "Massachusetts" },
    { code: "MI", state: "Michigan" },
    { code: "MN", state: "Minnesota" },
    { code: "MS", state: "Mississippi" },
    { code: "MO", state: "Missouri" },
    { code: "MT", state: "Montana" },
    { code: "MX", state: "Mexico (all States)" },
    { code: "NE", state: "Nebraska" },
    { code: "NV", state: "Nevada" },
    { code: "NH", state: "New Hampshire" },
    { code: "NJ", state: "New Jersey" },
    { code: "NM", state: "New Mexico" },
    { code: "NY", state: "New York" },
    { code: "NB", state: "New Brunswick, CN" },
    { code: "NF", state: "NewFoundland, CN" },
    { code: "NC", state: "North Carolina" },
    { code: "ND", state: "North Dakota" },
    { code: "NS", state: "Nova Scotia, CN" },
    { code: "NU", state: "Northwest Territory, CN" },
    { code: "OH", state: "Ohio" },
    { code: "OK", state: "Oklahoma" },
    { code: "OR", state: "Oregon" },
    { code: "PA", state: "Pennsylvania" },
    { code: "PE", state: "Prince Edward Island, CN" },
    { code: "QC", state: "Quebec, CN" },
    { code: "RI", state: "Rhode Island" },
    { code: "SK", state: "Saskatchewan, CN" },
    { code: "SC", state: "South Carolina" },
    { code: "SD", state: "South Dakota" },
    { code: "TN", state: "Tennessee" },
    { code: "TX", state: "Texas" },
    { code: "UT", state: "Utah" },
    { code: "VT", state: "Vermont" },
    { code: "VA", state: "Virginia" },
    { code: "WA", state: "Washington" },
    { code: "WV", state: "West Virginia" },
    { code: "WI", state: "Wisconsin" },
    { code: "WY", state: "Wyoming" },
    { code: "YT", state: "Yukon Territory, CN" },
    { code: "Unk", state: "Unknown" },
  ];
}

function getStateCode(state) {
  if (!state) return null;

  let stateLowercase = state.toLowerCase();

  const foundState = getStates().find(
    (stateObj) =>
      stateObj.state.split(",")[0].trim().toLowerCase() === stateLowercase ||
      stateObj.code.toLowerCase() === stateLowercase
  );

  if (foundState) return foundState.code;

  return null;
}

function conditionallyLoadScript(instance, url) {
  const prom = new Promise((resolve, reject) => {
    if (typeof instance === "undefined") {
      $.getScript(url, resolve);
    } else resolve();
  });

  return prom;
}

function hasPermission(privilege_name) {
  return globalVariables[privilege_name] && globalVariables[privilege_name].hasPermission;
}

function hasReadPermission(privilege_name) {
  return globalVariables[privilege_name] && globalVariables[privilege_name].read;
}

function hasWritePermission(privilege_name) {
  return globalVariables[privilege_name] && globalVariables[privilege_name].write;
}

function hasDeletePermission(privilege_name) {
  return globalVariables[privilege_name] && globalVariables[privilege_name].delete;
}

function hasSealPermission(privilege_name) {
  return globalVariables[privilege_name] && globalVariables[privilege_name].seal;
}

function insertSourcePage(link) {
  if (!link) return link;

  const sourcePage = globalVariables.sourcePage;

  if (!sourcePage) return link;

  const url = new URL(link, location.origin);
  const searchParams = new URLSearchParams(url.searchParams);

  searchParams.append("source_page", sourcePage);

  const queryString = searchParams.toString();
  return url.origin + url.pathname + "?" + queryString;
}

function popupImage(href) {
  $.colorbox({ href, maxWidth: "95%", maxHeight: "95%" });
}

function imageErrorHandler(img, thumbnail, file_name) {
  if (img.src === thumbnail) {
    img.src = file_name;
    return;
  }
  if (img.src === file_name) img.src = "/img/image-not-found.png";
}

function createMasterNameLink(master_name_id, container) {
  if (hasReadPermission("PRIVILEGE_MASTER_NAMES")) {
    $(".master-name-detail", container)
      .not("th")
      .wrapInner(
        `<a href="#" class="master-name-detail-anchor" data-master-name-id="${master_name_id}">${$(this).text()}</a>`
      );
  }
}

function createMasterVehicleLink(vehicle_id, container) {
  if (hasReadPermission("PRIVILEGE_MASTER_VEHICLES")) {
    $(".master-vehicle-detail", container)
      .not("th")
      .wrapInner(
        `<a href="#" class="master-vehicle-detail-anchor" data-vehicle-id="${vehicle_id}">${$(this).text()}</a>`
      );
  }
}

function getLinkToSource(incidentNo, dataSource) {
  let route;
  switch (dataSource) {
    case "incident":
      route = "view";
      break;
    case "evidence":
      route = "evidence_database";
      break;
    case "traffic_crash":
      route = "traffic_database";
      break;
    case "traffic_citation":
      route = "traffic_citation_database";
      break;
    case "warrant_citation_arrest":
      route = "arrest_database2";
      break;
    case "fir":
      route = "fir_database";
      break;
    case "daily_activity":
      route = "daily_logs_database";
      break;
    case "call_management":
      route = "callManagement_database";
      break;
  }

  if (!route) return "#";

  return `/${globalVariables.routLink}${route}?search=${incidentNo}`;
}

function addLinkToSource({ incidentNo, dataSource, container, privilege, append }) {
  if (hasPermission(privilege)) {
    if (append) {
      $(container).append(
        `<a href="${getLinkToSource(incidentNo, dataSource)}" target="_blank">&nbsp;#${incidentNo}</a>`
      );
    } else {
      $(container).html(`<a href="${getLinkToSource(incidentNo, dataSource)}" target="_blank">${incidentNo}</a>`);
    }
  }
}

function createErrorMessageForOibrsValidation(incidentValidationResult, uofValidationResult) {
  let failed = false,
    hasWarning = false;
  let message = "";

  if (incidentValidationResult) {
    const errors = [],
      warnings = [];
    if (!incidentValidationResult.status) {
      failed = true;

      if (!incidentValidationResult.error.data || "incidentIsValid" in incidentValidationResult.error.data === false) {
        if (incidentValidationResult.error.errors) {
          if (incidentValidationResult.error.errors.status) {
            errors.push(...incidentValidationResult.error.errors.status);
          }
        } else if (incidentValidationResult.error.message) {
          errors.push(incidentValidationResult.error.message);
        }
      }

      if (incidentValidationResult.error.errors) {
        errors.push(...incidentValidationResult.error.errors.validation);
      }

      if (incidentValidationResult.error.message) {
        errors.push(incidentValidationResult.error.message);
      }

      if (
        incidentValidationResult.error.dataQualityWarnings &&
        incidentValidationResult.error.dataQualityWarnings.warning.length > 0
      ) {
        hasWarning = true;
        warnings.push(...incidentValidationResult.error.dataQualityWarnings.warning);
      }
    } else {
      if (incidentValidationResult.data.dataQualityWarnings.warning.length > 0) {
        hasWarning = true;
        warnings.push(...incidentValidationResult.data.dataQualityWarnings.warning);
      }
    }

    if (errors.length > 0 || warnings.length > 0) {
      message += "<h4>Incident Validation</h4>";

      if (errors.length > 0) {
        message += '  <br><strong class="text-danger">Errors:</strong><br>';
        errors.forEach((error, i) => {
          message += `        <br>${i + 1} - ${error}<br>`;
        });
      }

      if (warnings.length > 0) {
        message += '  <br><strong class="text-warning">Data Quality Warnings:</strong><br>';
        warnings.forEach((warning, i) => {
          message += `        <br>${i + 1} - ${warning}<br>`;
        });
      }
    }
  }

  if (uofValidationResult) {
    const errors = [],
      warnings = [];
    if (!uofValidationResult.status) {
      failed = true;

      if (!uofValidationResult.error.data || "incidentIsValid" in uofValidationResult.error.data === false) {
        if (uofValidationResult.error.errors) {
          if (uofValidationResult.error.errors.status) {
            errors.push(...uofValidationResult.error.errors.status);
          }
        } else if (uofValidationResult.error.message) {
          errors.push(uofValidationResult.error.message);
        }
      }

      if (uofValidationResult.error.errors) {
        errors.push(...uofValidationResult.error.errors.validation);
      }

      if (uofValidationResult.error.message) {
        errors.push(uofValidationResult.error.message);
      }

      if (
        uofValidationResult.error.dataQualityWarnings &&
        uofValidationResult.error.dataQualityWarnings.warning.length > 0
      ) {
        hasWarning = true;
        warnings.push(...uofValidationResult.error.dataQualityWarnings.warning);
      }
    } else {
      if (uofValidationResult.data.dataQualityWarnings.warning.length > 0) {
        hasWarning = true;
        warnings.push(...uofValidationResult.data.dataQualityWarnings.warning);
      }
    }

    if (errors.length > 0 || warnings.length > 0) {
      message += "<h4><br>Uof Validation</h4>";

      if (errors.length > 0) {
        message += '  <br><strong class="text-danger">Errors:</strong><br>';
        errors.forEach((error, i) => {
          message += `        <br>${i + 1} - ${error}<br>`;
        });
      }

      if (warnings.length > 0) {
        message += '  <br><strong class="text-warning">Data Quality Warnings:</strong><br>';
        warnings.forEach((warning, i) => {
          message += `        <br>${i + 1} - ${warning}<br>`;
        });
      }
    }
  }

  return {
    failed,
    hasWarning,
    message,
  };
}

function fillOffenseCodes(selector) {
  return new Promise((resolve, reject) => {
    $.get(`/${globalVariables.routLink}api/oibrs`)
      .done(function (data) {
        const select = $(selector);

        var options = [];

        options.push(' <option class="option" "></option>');

        const groups = data.reduce((acc, cur) => {
          if (!acc.hasOwnProperty(cur.heading_title)) {
            acc[cur.heading_title] = [];
          }

          acc[cur.heading_title].push(cur);

          return acc;
        }, {});

        Object.entries(groups).forEach(([groupName, groupOffenses]) => {
          options.push(`<optgroup class="heading_style" label="${groupName}">`);

          for (const offense of groupOffenses) {
            options.push(`
                <option 
                class="option25" 
                ics_offense="${offense.ics_offense}" 
                local_code="${offense.local_code}" 
                group1="${offense.violent}" 
                value="${offense.orc}">
                  ${offense.orc}  -  ${offense.label}    (Local Code: ${offense.local_code})
                </option>`);
          }

          options.push("</optgroup>");
        });

        select.html(options.join("")).selectpicker("refresh");
        resolve();
      })
      .fail(reject);
  });
}

function showResubmitDialog(incidentNo, message, cb) {
  return Swal.fire({
    title: "Please confirm",
    text: message,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      return sendValidationRequest(incidentNo, cb);
    }
  });
}

function sendValidationRequest(incidentNo, callback = () => {}) {
  $("#loading-screen").show();
  $("#loading_peel9").show();
  return $.post("/" + globalVariables.routLink + "oibrs_validation", { incidentNo, save: true })
    .complete(() => {
      $("#loading-screen").hide();
      $("#loading_peel9").hide();
    })
    .done(({ incidentValidationResult, uofValidationResult }) => {
      let { failed, hasWarning, message } = createErrorMessageForOibrsValidation(
        incidentValidationResult,
        uofValidationResult
      );

      if (failed || hasWarning) {
        message = '<div style="text-align:left">' + message + "</div>";

        Swal.fire({
          title: failed ? "Oibrs Submission Failed" : "Oibrs Submission is Succesful With Warnings",
          html: message,
          icon: failed ? "error" : "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire(
          "Oibrs Submission is Succesful",
          "The incident has been validated and submitted to state",
          "success"
        ).then(callback);
      }
    });
}

function transformDriverLicenseClassForTrafficPerson(driverLicenseClass) {
  switch (driverLicenseClass) {
    case "A":
      return "1";
    case "B":
      return "2";
    case "C":
      return "3";
    case "D":
      return "4";
    default:
      return "";
  }
}

let attachmentsState = {};

function handlePrintAttachments(incidentNo, checkbox, source, title, container, filterFn) {
  if ($(checkbox).is(":checked")) {
    if (!attachmentsState[source]) {
      $.post(`/${globalVariables.routLink}/get_printable_attachments`, {
        incidentNo: incidentNo,
        database: source,
        sourcePage: globalVariables.sourcePage,
      })
        .done((attachments) => {
          let filteredAttachments = attachments;
          if (filterFn) {
            filteredAttachments = attachments.filter(filterFn);
          }
          renderAttachmentsForPrintPage(filteredAttachments, source, title, container);
          attachmentsState[source] = true;
        })
        .fail((err) => console.log(err));
    } else {
      $(`[data-source=${source}]`).show();
    }
  } else {
    $(`[data-source=${source}]`).hide();
  }
}

function renderAttachmentsForPrintPage(attachments, source, title, container) {
  if (!Array.isArray(attachments) || attachments.length === 0) return;

  $(container).append(`
  <div data-source="${source}" style="background:white; border:1px solid #ccc; margin:1rem 0; padding-bottom:1rem" class="attachment-container">
      <h3 style="text-align:center">${title}</h3>
      <div style="display:flex; justify-content:center; flex-wrap:wrap">
        ${attachments
          .map(
            (attach) => `
            <figure>
              <img src="${attach.full_path}" style="max-width:100%; height:auto" />
              <figcaption style="text-align:center; padding: 1rem">${attach.orginal_name}</figcaption>
            </figure>`
          )
          .join("")}

      </div>
   </div>
  `);
}

function parseCoordinateValue(pointx, pointy) {
  const parsedPointX = Number(pointx);
  const parsedPointY = Number(pointy);

  if (!parsedPointX || !parsedPointY) {
    return {
      pointx: 1,
      pointy: 1,
    };
  }

  return {
    pointx: parsedPointX,
    pointy: parsedPointY,
  };
}

function generateQueryString(queryData) {
  let queryString = "";

  if (!queryData) return "";

  for (const key in queryData) {
    queryString += queryString.length > 0 ? "&" : "";
    queryString += key + "=" + encodeURIComponent(queryData[key]);
  }
  return queryString;
}

/**
 *
 * @param {string} type (required) module type
 * @param {string} action (required) module's action type
 * @param {object} data (optional) parameters must be send (either request query or request
 * parameter data) with this way so that it can be easily seen in future developments by checking
 * generateLink function
 * @param {object?} additionalQueryData (optional) request data must be send this way so it will directly
 * passed request's query object
 * @returns {string} string generated link
 */

function generateLink(type, action, data = {}, additionalQueryData) {
  const { id, incident_no, incident_id, master_name_id, status_type } = data;
  if (!type) return null;
  console.log("inside generateLink method");

  let link = "",
    queryString = "";
  let queryData = {};
  switch (type) {
    case "incident":
      switch (action) {
        case "add":
          link = `incident/add`;
          break;
        case "edit":
          queryData = { id };
          link = `incident/edit`;
          break;
        case "view":
          queryData = { id };
          link = `incident/view`;
          break;
        case "fromCFS": {
          queryData = { id };
          link = `incident/fromCFS`;
          break;
        }
        case "fromIncident": {
          queryData = { id };
          link = `incident/fromIncident`;
          break;
        }
        case "incidentFail": {
          link = `incident/incidentFail`;
          break;
        }
        case "viewIncidentPamet": {
          queryData = { id };
          link = `incident/viewIncidentPamet`;
          break;
        }
        case "delete":
          link = `delete/${id}`;
          break;
        case "unlock":
          queryData = { user: globalVariables.user, incident_no: incident_no };

          link = `unlock_case/${id}`;
          break;
        case "approve":
          link = `approve_incident/${id}`;
          break;
        case "print":
          link = `incident_print/${incident_no}`;
          break;
        case "print_out":
          link = `incident_printView/${id}`;
          break;
        case "cancel_user_approve":
          link = `cancel_user_approval/${id}`;
          break;
        case "validate":
          link = `oibrs_verify/${incident_no}`;
          break;
      }
      break;
    case "arrest":
      switch (action) {
        case "add":
          queryData = {
            routeName: "add",
            incident_no: data.incident_no,
            date: data.date,
            address: data.address,
            orc_no: data.orc_no,
          };
          link = `arrest/${id}`;
          break;
        case "edit":
          queryData = { routeName: "edit", incident_id: data.incident_id };
          link = `arrest/${id}`;
          break;
        case "view":
          queryData = { routeName: "view" };
          link = `arrest/${id}`;
          break;
        case "delete":
          queryData = { incident_id: data.incident_id };
          link = `arrest_delete/${id}`;
          break;
        case "print":
          queryData = { master_name_id: data.master_name_id };

          link = `arrest_print/${incident_no}`;
          break;
        case "print_out":
          link = `arrest_printView/${id}`;
          break;
      }
      break;
    case "suspect":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addSuspect",
            incId: incident_no,
            date: data.date,
            address: data.address,
            orcNo: data.orc_no,
          };
          link = `suspect/${id}`;
          break;
        case "edit":
          queryData = { routeName: "editSuspect", incId: id };
          link = `suspect/${incident_id}`;
          break;
        case "view":
          queryData = { routeName: "viewSuspect", incId: id };
          link = `suspect/${incident_id}`;
          break;
        case "delete":
          queryData = { incident_id };
          link = `suspect_delete/${id}`;
          break;
        case "print":
          queryData = { master_name_id };
          link = `suspect_print/${incident_no}`;
          break;
        case "print_out":
          link = `suspect_printView/${id}`;
          break;
      }
      break;
    case "victim":
      const isBusiness = data.victim_type === "Business";
      switch (action) {
        case "add":
          queryData = {
            routeName: isBusiness ? "addBusiness" : "addVictim",
            date: data.date,
            address: data.address,
            orcNo: data.orc_no,
            weaponType: data.weaponType,
            criminal_activity: data.criminal_activity,
            id,
          };
          link = `victim/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: isBusiness ? "editBusiness" : "editVictim",
            id: incident_id,
          };
          link = `victim/${id}`;
          break;
        case "view":
          queryData = {
            routeName: isBusiness ? "viewBusiness" : "viewVictim",
            id: incident_id,
          };
          link = `victim/${id}`;
          break;
        case "delete":
          queryData = {
            incident_id,
          };
          link = `victim_delete/${id}`;
          break;
      }
      break;
    case "reportee":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addReportee",
            incId: incident_no,
            date: data.date,
            address: data.address,
            orcNo: data.orc_no,
            involvedIndividual: data.type,
          };
          link = `reportee/${id}`;
          break;
        case "edit":
          queryData = {
            routeName: "editReportee",
            incId: id,
          };
          link = `reportee/${incident_id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewReportee",
            incId: id,
          };
          link = `reportee/${incident_id}`;
          break;
        case "delete":
          link = `reportee_delete/${id}`;
          break;
      }
      break;
    case "witness":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addWitness",
            date: data.date,
            address: data.address,
            orcNo: data.orc_no,
            id,
          };
          link = `witness/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editWitness",
            id: incident_id,
          };
          link = `witness/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewWitness",
            id: incident_id,
          };
          link = `witness/${id}`;
          break;
        case "delete":
          link = `witness_delete/${id}`;
          break;
      }
      break;
    case "uof_subject":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addUOF",
            date: data.date,
            address: data.address,
            orcNo: data.orc_no,
            incident_id: id,
          };
          link = `uof/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editUOF",
            incident_no,
            incident_id,
          };
          link = `uof/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewUOF",
            incident_no,
            incident_id,
          };
          link = `uof/${id}`;
          break;
        case "delete":
          link = `uof_delete/${id}`;
          break;
        case "print_out":
          link = `uof_printView/${id}`;
          break;
      }
      break;
    case "uof_officer":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addUOF",
            date: data.date,
            address: data.address,
            orcNo: data.orc_no,
            incident_id: id,
          };
          link = `uof_officer/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editUOF",
            incident_no,
            incident_id,
          };
          link = `uof_officer/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewUOF",
            incident_no,
            incident_id,
          };
          link = `uof_officer/${id}`;
          break;
        case "delete":
          link = `uof_officer_delete/${id}`;
          break;
      }
      break;
    case "evidence":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addEvidence",
          };
          link = `evidence/${id}`;
          break;
        case "edit":
          queryData = { routeName: "editEvidence" };
          link = `evidence/${id}`;
          break;
        case "view":
          queryData = { routeName: "viewEvidence" };
          link = `evidence/${id}`;
          break;
        case "delete":
          link = `evidence_delete`;
          break;
        case "checkout":
          queryData = {
            evidenceNo: data.evidence_no,
            roomLocation: data.room_location,
            select_bucket: data.bucket || "",
          };
          link = `evidence_check_out/${id}`;
          break;
        case "checkin":
          queryData = {
            evidenceNo: data.evidence_no,
            roomLocation: data.new_location,
          };
          link = `evidence_check_in/${data.check_out_id}`;
          break;
        case "dispose":
          queryData = {
            evidenceNo: data.evidence_no,
            roomLocation: data.room_location,
            selectBucket: data.bucket || "",
          };
          link = `evidence_dispose/${id}`;
          break;
        case "restore":
          link = `evidence_restore`;
          break;
        case "move":
          queryData = {
            evidenceNo: data.evidence_no,
            roomLocation: data.room_location,
            selectBucket: data.bucket || "",
          };
          link = `evidence_move/${id}`;
          break;
        case "print":
          link = `evidence_check_out_print/${id}`;
          break;
      }
      break;
    case "property":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addProperty",
            attemptedCompleted: data.attempted_completed,
            larcenyType: data.larceny_type,
            id,
          };
          link = `property/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editProperty",
            id: incident_id,
          };
          link = `property/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewProperty",
            id: incident_id,
          };
          link = `property/${id}`;
          break;
        case "delete":
          link = `property_delete/${id}`;
          break;
      }
      break;
    case "vehicle":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addVehicle",
          };
          link = `add_vehicle/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editVehicle",
          };
          link = `add_vehicle/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewVehicle",
          };
          link = `add_vehicle/${id}`;
          break;
        case "delete":
          link = `add_vehicle_delete/${id}`;
          break;
      }
      break;
    case "master_name":
      switch (action) {
        case "add":
          link = `master_name/addMaster`;
          break;
        case "edit":
          queryData = {
            id,
          };
          link = `master_name/editMaster`;
          break;
        case "view":
          queryData = {
            id,
          };
          link = `master_name/viewMaster`;
          break;
        case "detail":
          link = `master_name_detail/${master_name_id}`;
          break;
        case "print":
          link = `master_name_print/${master_name_id}`;
          break;
      }
      break;
    case "master_name_solve_search":
      switch (action) {
        case "detail":
          link = `solve_search_person_detail/${id}`;
          break;
        case "print":
          link = `solve_search_person_print/${id}`;
          break;
      }
      break;
    case "master_vehicle":
      switch (action) {
        case "add":
          link = `vehicle_master/addMaster`;
          break;
        case "edit":
          queryData = {
            id,
          };
          link = `vehicle_master/editMaster`;
          break;
        case "view":
          queryData = {
            id,
          };
          link = `vehicle_master/viewMaster`;
          break;
        case "delete":
          link = `vehicle_master_delete/${id}`;
          break;
        case "detail":
          link = `master_vehicle_detail/${data.vehicle_id}`;
          break;
      }
      break;
    case "narrative":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addLog",
          };
          link = `narrative/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editLog",
          };
          link = `narrative/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewLog",
          };
          link = `narrative/${id}`;
          break;
        case "delete":
          link = `narrative_delete/${id}`;
          break;
        case "print":
          queryData = {
            incident_no,
          };
          link = `narrative_print/${id}`;
          break;
        case "review":
          link = `narrativeReview`;
          break;
        case "confidential":
          link = `narrative_confidential`;
          break;
      }
      break;
    case "attachment":
      switch (action) {
        case "edit":
          queryData = {
            database: data.database,
          };
          link = `attachments_edit/${incident_no}`;
          break;
        case "view":
          queryData = {
            database: data.database,
          };
          link = `attachments_edit_locked/${incident_no}`;
          break;
        case "delete":
          queryData = {
            database: data.database,
          };
          link = `attachments_delete/${incident_no}`;
          break;
        case "confidential":
          link = `attachment_confidential`;
          break;
        case "move_to_folder":
          link = `attachment_move_to_folder`;
          break;
      }
      break;
    case "traffic_crash":
      switch (action) {
        case "add":
          link = `traffic/add`;
          break;
        case "edit":
          queryData = {
            crashId: id,
          };
          link = `traffic/edit`;
          break;
        case "view":
          queryData = {
            crashId: id,
          };
          link = `traffic/view`;
          break;
        case "fromCFS":
          queryData = {
            crashId: id,
          };
          link = `traffic/fromCFS`;
          break;
        case "fromOffense":
          queryData = {
            crashId: id,
          };
          link = `traffic/fromOffense`;
          break;
        case "fromCitation":
          queryData = {
            crashId: id,
          };
          link = `traffic/fromCitation`;
          break;
        case "incidentFail":
          link = `traffic/incidentFail`;
          break;
        case "delete":
          link = `traffic_delete/${id}`;
          break;
        case "approve":
          link = `approve_traffic/${data.crash_no}`;
          break;
        case "unlock":
          queryData = {
            incidentNo: data.crash_no,
            username: globalVariables.user,
          };
          link = `unlock_traffic/${id}`;
          break;
        case "submit":
          queryData = {
            supervisorApproved: data.supervisor_approved,
            crash_diagram: data.crash_diagram_id,
          };
          link = `traffic_verify/${data.crash_no}`;
          break;
        case "print":
          queryData = {
            crash_diagram: data.crash_diagram_id,
          };
          link = `traffic_print/${data.crash_no}`;
          break;
        case "cancel_user_approve":
          link = `cancel_user_approval/${id}`;
          break;
        case "print_narrative":
          link = `traffic_crash_print_narrative/${id}`;
          break;
        case "add_narrative":
          queryData = {
            routeName: "add",
          };
          link = `traffic_narrative/${id}`;
          break;
        case "edit_narrative":
          queryData = {
            routeName: "edit",
          };
          link = `traffic_narrative/${id}`;
          break;
        case "view_narrative":
          queryData = {
            routeName: "view",
          };
          link = `traffic_narrative/${id}`;
          break;
        case "delete_narrative":
          link = `traffic_narrative_delete/${id}`;
          break;
      }
      break;
    case "traffic_person":
      switch (action) {
        case "add":
          queryData = {
            routeName: "add",
            address: data.address,
            date: data.date,
          };
          link = `traffic_person/${data.crash_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "edit",
          };
          link = `traffic_person/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "view",
          };
          link = `traffic_person/${id}`;
          break;
        case "delete":
          queryData = {
            incidentNo: data.crash_no,
          };
          link = `traffic_person_delete/${id}`;
          break;
      }
      break;
    case "traffic_unit":
      switch (action) {
        case "add":
          queryData = {
            routeName: "add",
            date: data.date,
            address: data.address,
          };
          link = `traffic_unit/${data.crash_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "edit",
          };
          link = `traffic_unit/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "view",
          };
          link = `traffic_unit/${id}`;
          break;
        case "delete":
          queryData = {
            crash_no: data.crash_no,
          };
          link = `traffic_unit_delete/${id}`;
          break;
      }
      break;
    case "traffic_citation":
      switch (action) {
        case "add":
          link = `traffic_citations/addCitation`;
          break;
        case "edit":
          queryData = {
            incId: id,
          };
          link = `traffic_citations/editCitation`;
          break;
        case "view":
          queryData = {
            incId: id,
          };
          link = `traffic_citations/viewCitation`;
          break;
        case "fromCFS":
          queryData = {
            incId: id,
          };
          link = "traffic_citations/fromCFS";
          break;
        case "fromOffense":
          queryData = {
            incId: id,
          };
          link = "traffic_citations/fromOffense";
          break;
        case "fromDailyActivity":
          queryData = {
            incId: id,
          };
          link = "traffic_citations/fromDailyActivity";
          break;
        case "fromCrash":
          queryData = {
            incId: id,
          };
          link = "traffic_citations/fromCrash";
          break;
        case "delete":
          link = `traffic_citation_delete/${id}`;
          break;
        case "approve":
          link = `approve_traffic_citation/${data.citation_no}`;
          break;
        case "unlock":
          queryData = {
            username: globalVariables.user,
            incidentNo: data.citation_no,
          };
          link = `unlock_traffic_citation/${id}`;
          break;
        case "print":
          link = `traffic_citation_print/${data.citation_no}`;
          break;
        case "cancel_user_approve":
          link = `cancel_user_approval/${id}`;
          break;
        case "print_narrative":
          link = `traffic_citation_print_narrative/${id}`;
          break;
        case "add_narrative":
          queryData = {
            routeName: "addLog",
          };
          link = `traffic_citation_narrative/${id}`;
          break;
        case "edit_narrative":
          queryData = {
            routeName: "editLog",
          };
          link = `traffic_citation_narrative/${id}`;
          break;
        case "view_narrative":
          queryData = {
            routeName: "viewLog",
          };
          link = `traffic_citation_narrative/${id}`;
          break;
        case "delete_narrative":
          link = `traffic_citation_narrative_delete/${id}`;
          break;
        case "print_out":
          link = `traffic_citation_printView/${id}`;
          break;
      }
      break;
    case "traffic_citation_witness":
      switch (action) {
        case "add":
          queryData = {
            routeName: "addWitness",
          };
          link = `traffic_citation_witness/${incident_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "editWitness",
          };
          link = `traffic_citation_witness/${id}`;
          break;
        case "view":
          queryData = {
            routeName: "viewWitness",
          };
          link = `traffic_citation_witness/${id}`;
          break;
        case "delete":
          link = `traffic_citation_witness_delete/${id}`;
          break;
      }
      break;
    case "warrant_citation_arrest":
      switch (action) {
        case "add":
          link = `arrest_non/addArrest`;
          break;
        case "edit":
          queryData = {
            incId: id,
          };
          link = `arrest_non/editArrest`;
          break;
        case "view":
          queryData = {
            incId: id,
          };
          link = `arrest_non/viewArrest`;
          break;
        case "fromCFS":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromCFS`;
          break;
        case "fromIncident":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromIncident`;
          break;
        case "fromCrash":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromCrash`;
          break;
        case "fromArrest":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromArrest`;
          break;
        case "fromCitation":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromCitation`;
          break;
        case "fromFIR":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromFIR`;
          break;
        case "fromDailyActivity":
          queryData = {
            incId: id,
          };
          link = `arrest_non/fromDailyActivity`;
          break;
        case "incidentFail":
          queryData = {
            incId: id,
          };
          link = `arrest_non/incidentFail`;
          break;
        case "delete":
          link = `arrest_non_delete/${id}`;
          break;
        case "approve":
          link = `approve_arrest_non/${incident_no}`;
          break;
        case "unlock":
          queryData = {
            incidentNo: incident_no,
            username: globalVariables.user,
          };
          link = `unlock_arrest_non/${id}`;
          break;
        case "print":
          queryData = {
            masterNameId: master_name_id,
            id,
          };
          link = `arrest_non_print/${incident_no}`;
          if (data.master_business_id) queryData["master_business_id"] = data.master_business_id;
          break;
        case "cancel_user_approve":
          link = `cancel_user_approval/${id}`;
          break;
        case "print_out":
          link = `arrest_non_printView/${id}`;
          break;
        case "add_narrative":
          queryData = {
            routeName: "addLog",
          };
          link = `warrant_citation_arrest_narrative/${id}`;
          break;
        case "edit_narrative":
          queryData = {
            routeName: "editLog",
          };
          link = `warrant_citation_arrest_narrative/${id}`;
          break;
        case "view_narrative":
          queryData = {
            routeName: "viewLog",
          };
          link = `warrant_citation_arrest_narrative/${id}`;
          break;
        case "delete_narrative":
          link = `warrant_citation_arrest_narrative_delete/${id}`;
          break;
        case "print_narrative":
          link = `warrant_citation_arrest_print_narrative/${id}`;
          break;
      }
      break;
    case "fir":
      switch (action) {
        case "add":
          link = `fir/addFIR`;
          break;
        case "edit":
          queryData = {
            incId: id,
          };
          link = `fir/editFIR`;
          break;
        case "view":
          queryData = {
            incId: id,
          };
          link = `fir/viewFIR`;
          break;
        case "fromCFS":
          queryData = {
            incId: id,
          };
          link = `fir/fromCFS`;
          break;
        case "fromOffense":
          queryData = {
            incId: id,
          };
          link = `fir/fromOffense`;
          break;
        case "fromDailyActivity":
          queryData = {
            incId: id,
          };
          link = `fir/fromDailyActivity`;
          break;
        case "fromFIR":
          queryData = {
            incId: id,
          };
          link = `fir/fromFIR`;
          break;
        case "incidentFail":
          queryData = {
            incId: id,
          };
          link = `fir/incidentFail`;
          break;
        case "fromCitation":
          queryData = {
            incId: id,
          };
          link = `fir/fromCitation`;
          break;
        case "fromArrest":
          queryData = {
            incId: id,
          };
          link = `fir/fromWarrantCitationArrest`;
          break;
        case "delete":
          link = `fir_delete/${id}`;
          break;
        case "approve":
          link = `approve_fir/${incident_no}`;
          break;
        case "unlock":
          queryData = {
            incidentNo: incident_no,
            username: globalVariables.user,
          };
          link = `unlock_fir/${id}`;
          break;
        case "print":
          link = `fir_print/${incident_no}`;
          break;
        case "cancel_user_approve":
          link = `cancel_user_approval/${id}`;
          break;
        case "edit_narrative":
          link = `fir_narrative/editLog_${id}`;
          break;
        case "view_narrative":
          link = `fir_narrative/viewLog_${id}`;
          break;
        case "delete_narrative":
          link = `fir_narrative_delete/${id}`;
          break;
        case "print_narrative":
          link = `fir_print_narrative/${id}`;
          break;
      }
      break;
    case "daily_log":
      switch (action) {
        case "add":
          link = `daily_logs/addLog`;
          break;
        case "edit":
          queryData = {
            incidentId: id,
          };
          link = `daily_logs/editLog`;
          break;
        case "view":
          queryData = {
            incidentId: id,
          };
          link = `daily_logs/viewLog`;
          break;
        case "fromCFS":
          queryData = {
            incidentId: id,
          };
          link = `daily_logs/fromCFS`;
          break;
        case "delete":
          link = `daily_logs_delete/${id}`;
          break;
        case "add_person":
          queryData = {
            incId: id,
          };
          link = `daily_logs_person/addPerson`;
          break;
        case "add_business":
          queryData = {
            incId: id,
          };
          link = `daily_logs_business/addBusiness`;
          break;
        case "add_vehicle":
          queryData = {
            incId: id,
          };
          link = `daily_logs_vehicle/addVehicle`;
          break;
        case "view_business":
          queryData = {
            incId: id,
          };
          link = `daily_logs_business/viewBusiness`;
          break;
        case "view_vehicle":
          queryData = {
            incId: id,
          };
          link = `daily_logs_vehicle/viewVehicle`;
          break;
        case "view_involved_individual":
          queryData = {
            incId: id,
          };
          link = `daily_logs_person/viewPerson`;
          break;
        case "edit_involved_individual":
          queryData = {
            incId: id,
          };
          link = `daily_logs_person/editPerson`;
          break;
        case "edit_vehicle":
          queryData = {
            incId: id,
          };
          link = `daily_logs_vehicle/editVehicle`;
          break;
        case "edit_business":
          queryData = {
            incId: id,
          };
          link = `daily_logs_business/editBusiness`;
          break;
        case "delete_involved_individual":
          link = `daily_logs_person_delete/${id}`;
          break;
        case "delete_business":
          link = `daily_logs_business_delete/${id}`;
          break;
        case "delete_vehicle":
          link = `daily_logs_vehicle_delete/${id}`;
          break;
        case "print":
          link = `daily_logs_print/${id}`;
          break;
        case "add_narrative":
          queryData = {
            route_name: "addLog",
          };
          link = `daily_logs_narrative/${id}`;
          break;
        case "edit_narrative":
          queryData = {
            route_name: "editLog",
          };
          link = `daily_logs_narrative/${id}`;
          break;
        case "view_narrative":
          queryData = {
            route_name: "viewLog",
          };
          link = `daily_logs_narrative/${id}`;
          break;
        case "delete_narrative":
          link = `daily_logs_narrative_delete/${id}`;
          break;
        case "print_narrative":
          link = `daily_log_print_narrative/${id}`;
          break;
      }
      break;
    case "permit":
      switch (action) {
        case "add":
          link = `permits/addLog`;
          break;
        case "edit":
          queryData = {
            permitId: id,
          };
          link = `permits/editLog`;
          break;
        case "view":
          queryData = {
            permitId: id,
          };
          link = `permits/viewLog`;
          break;
        case "delete":
          link = `permit_delete/${id}`;
          break;
        case "person_add":
          queryData = {
            route_name: "addPerson",
          };
          link = `permit_person/${id}`;
          break;
        case "person_view":
          queryData = {
            route_name: "viewPerson",
          };
          link = `permit_person/${id}`;
          break;
        case "person_edit":
          queryData = {
            route_name: "editPerson",
          };
          link = `permit_person/${id}`;
          break;
        case "person_delete":
          link = `permit_person_delete/${id}`;
          break;
        case "vehicle_add":
          queryData = {
            routeName: "addVehicle",
          };
          link = `permit_vehicle/${id}`;
          break;
        case "vehicle_view":
          queryData = {
            routeName: "viewVehicle",
          };
          link = `permit_vehicle/${id}`;
          break;
        case "vehicle_edit":
          queryData = {
            routeName: "editVehicle",
          };
          link = `permit_vehicle/${id}`;
          break;
        case "vehicle_delete":
          link = `permit_vehicle_delete/${id}`;
          break;
        case "business_add":
          queryData = {
            route_name: "addBusiness",
          };
          link = `permit_business/${id}`;
          break;
        case "business_view":
          queryData = {
            route_name: "viewBusiness",
          };
          link = `permit_business/${id}`;
          break;
        case "business_edit":
          queryData = {
            route_name: "editBusiness",
          };
          link = `permit_business/${id}`;
          break;
        case "business_delete":
          link = `permit_business_delete/${id}`;
          break;
      }
      break;
    case "call_management":
      switch (action) {
        case "add":
          link = `callManagement/addCFS`;
          break;
        case "edit":
          queryData = {
            incId: id,
            fromWhich: data.cfs_no,
          };
          link = `callManagement/editCFS`;
          break;
        case "view":
          queryData = {
            incId: id,
          };
          link = `callManagement/viewCFS`;
          break;
        case "delete":
          link = `call_delete/${data.cfs_no}`;
          break;
        case "unit_add":
          queryData = {
            incId: id,
          };
          link = `callManagement_unit/addUnit`;
          break;
        case "unit_edit":
          queryData = {
            incId: id,
          };
          link = `callManagement_unit/editUnit`;
          break;
        case "unit_view":
          queryData = {
            incId: id,
          };
          link = `callManagement_unit/viewUnit`;
          break;
        case "unit_more":
          queryData = {
            incId: id,
            master_id: data.master_id,
          };
          link = `callManagement_unit/moreUnit`;
          break;
        case "unit_delete":
          link = `callManagement_unit_delete`;
          break;
        case "comment_add":
          queryData = {
            incId: id,
            masterIncidentId: "commentCFS",
          };
          link = `callManagement_comment/addComment`;
          break;
        case "edit_custom_comment":
          queryData = {
            incId: id,
            masterIncidentId: data.master_id,
          };
          link = `callManagement_comment/editComment`;
          break;
        case "comment_edit":
          queryData = {
            incId: id,
          };
          link = `callManagement/editComment`;
          break;
        case "comment_delete":
          link = `call_management_comment_delete/${id}`;
          break;
      }
      break;
    case "court_management":
      switch (action) {
        case "edit":
          link = `traffic_citation_court_edit/${id}`;
          break;
        case "delete":
          link = `traffic_citation_court_delete/${id}`;
          break;
        case "seal":
          queryData = {
            dataSource: data.source,
            masterName_id: master_name_id,
            id,
            masterBusinessId: data.master_business_id,
          };
          link = `traffic_citation_court_expunge/${incident_no}`;
          break;
        case "unseal":
          queryData = {
            dataSource: data.source,
            masterNameId: master_name_id,
            id,
            masterBusinessId: data.master_business_id,
          };
          link = `traffic_citation_court_remove_expunge/${incident_no}`;
          break;
        case "send":
          queryData = {
            caseNo: incident_no,
            masterNameId: master_name_id,
            fullName: data.person_name,
            dob: data.dob2,
            source: data.source,
            ticket_no: data.ticket_no || "",
            court_date: data.court_date || "",
            insurance: data.insurance_verified || "",
            masterBusinessId: data.master_business_id || "",
          };
          link = `traffic_citation_court/${id}`;
          break;
        case "view_source":
          const linked_data_id = data.linked_data_id;
          const linked_incident_id = data.linked_incident_id || " ";
          if (data.source == "FIR") generateLink("fir", "view", { id: linked_data_id });
          if (data.source == "Traffic Crash")
            link = generateLink("traffic_crash", "view", {
              id: linked_data_id,
            });
          if (data.source == "Traffic Citation" || data.source == "Trafffic Citation")
            link = generateLink("traffic_citation", "view", {
              id: linked_data_id,
            });
          if (data.source == "Warrant-Citation Arrest" || data.source == "Non-NIBRS Arrest")
            link = generateLink("warrant_citation_arrest", "view", {
              id: linked_data_id,
            });
          if (data.source == "Arrest")
            link = generateLink(
              "arrest",
              "view",
              {
                id: linked_data_id,
              },
              { incident_id: linked_incident_id }
            );
          if (data.source == "Suspect")
            link = generateLink("suspect", "view", {
              id: linked_data_id,
              incident_id: linked_incident_id,
            });
          if (data.source == "Victim")
            link = generateLink("victim", "view", {
              id: linked_data_id,
              incident_id: linked_incident_id,
            });
          if (data.source == "Reportee")
            link = generateLink("reportee", "view", {
              id: linked_data_id,
              incident_id: linked_incident_id,
            });
          if (data.source == "Witness")
            link = generateLink("witness", "view", {
              id: linked_data_id,
              incident_id: linked_incident_id,
            });
          break;
        case "payment":
          const defendantName = htmlDecode(data.person_name);

          queryData = {
            defendantName,
            masterNameId: master_name_id,
            customerId: data.customer_id,
            grand_total: data.grand_total_fine,
            paid_amount: data.payload_amount,
            case_no: incident_no,
            masterBusinessId: data.master_business_id,
          };
          link = `payload/${id}`;
          break;
      }
      break;
    case "seal":
      queryData = {
        dataSource: data.source,
        masterNameId: master_name_id,
        id,
      };
      link = `seal/${incident_no}`;
      break;
    case "unseal":
      queryData = {
        dataSource: data.source,
        masterNameId: master_name_id,
        id,
      };
      link = `unseal/${incident_no}`;
      break;
    case "case_management":
      switch (action) {
        case "view":
          link = `view_case/${id}`;
          break;
      }
      break;
    case "edit_view_request":
      queryData = {
        incidentId: incident_no,
        pageName: data.data_source,
        otherDepartmentName: data.department,
      };
      link = `edit_view_request/${id}`;
      break;
    case "training":
      switch (action) {
        case "print":
          link = `training_print/${id}`;
          break;
      }
      break;
    case "employees":
      switch (action) {
        case "print":
          link = `employees_print/${id}`;
          break;
      }
      break;
    case "tow":
      switch (action) {
        case "add":
          link = `tow/addTow`;
          break;
        case "view":
          queryData = {
            id,
          };
          link = `tow/viewTow`;
          break;
        case "delete":
          link = `tow_delete/${id}`;
          break;
        case "edit":
          queryData = {
            id,
          };
          link = `tow/editTow`;
          break;
        case "statusUpdate":
          queryData = {
            id,
          };
          link = `tow/statusUpdate`;
          break;
        case "viewStatusUpdate":
          queryData = {
            id,
            status_type,
          };
          link = `tow/viewStatusUpdate`;
          break;
        case "editStatusUpdate":
          queryData = {
            id,
            status_type,
          };
          link = `tow/editStatusUpdate`;
          break;
      }
      break;
    case "vacation_watch":
      switch (action) {
        case "add":
          link = `vacation_watch/add`;
          break;
        case "view":
          queryData = { incidentId: id };
          link = `vacation_watch/view`;
          break;
        case "edit":
          queryData = { incidentId: id };
          link = `vacation_watch/edit`;
          break;
        case "duplicate":
          queryData = { incidentId: id };
          link = `vacation_watch/duplicate`;
          break;
        case "delete":
          link = `vacation_watch_delete/${id}`;
          break;
        case "print":
          link = `vacation_watch_print/${id}`;
          break;
      }
      break;
    case "vacation_watch_check_logs":
      switch (action) {
        case "view":
          queryData = {
            watchNo: data.watch_no,
            watchId: id,
          };
          link = `vacation_watch_check_log/view`;
          break;
        case "edit":
          queryData = {
            watchNo: data.watch_no,
            watchId: id,
          };
          link = `vacation_watch_check_log/edit`;
          break;
        case "delete":
          queryData = {
            logId: id,
          };
          link = `vacation_watch_check_logs_delete/${data.watch_no}`;
          break;
        case "add":
          queryData = {
            watchNo: id,
          };
          link = `vacation_watch_check_log/newLog`;
          break;
        case "print":
          queryData = {
            watchNo: data.watch_no,
          };
          link = `vacation_watch_print_check_log/${id}`;
          break;
      }
      break;
    case "vacation_watch_check_list":
      switch (action) {
        case "save":
          link = `vacation_watch_save_check_list/`;
          break;
        case "delete":
          link = `vacation_watch_check_list_item_delete/${id}`;
          break;
        case "reset":
          link = `vacation_watch_check_list_reset/${data.watch_id}`;
          break;
      }
      break;
    case "vacation_watch_person":
      switch (action) {
        case "view":
          queryData = {
            routeName: "view",
          };
          link = `vacation_watch_person/${id}`;
          break;
        case "edit":
          queryData = {
            routeName: "edit",
          };
          link = `vacation_watch_person/${id}`;
          break;
        case "delete":
          link = `vacation_watch_person_delete/${id}`;
          break;
        case "add":
          queryData = {
            routeName: "add",
          };
          link = `vacation_watch_person/${id}`;
          break;
      }
      break;
    case "vacation_watch_vehicle":
      switch (action) {
        case "view":
          queryData = {
            routeName: "view",
          };
          link = `vacation_watch_vehicle/${id}`;
          break;
        case "edit":
          queryData = {
            routeName: "edit",
          };
          link = `vacation_watch_vehicle/${id}`;
          break;
        case "delete":
          link = `vacation_watch_vehicle_delete/${id}`;
          break;
        case "add":
          queryData = {
            routeName: "add",
          };
          link = `vacation_watch_vehicle/${id}`;
          break;
      }
      break;
    case "vacation_watch_business":
      switch (action) {
        case "view":
          queryData = {
            routeName: "view",
            checkLogId: id,
          };
          link = `vacation_watch_business/${data.watch_no}`;
          break;
        case "edit":
          queryData = {
            routeName: "edit",
            checkLogId: id,
          };
          link = `vacation_watch_business/${data.watch_no}`;
          break;
        case "delete":
          link = `vacation_watch_business_delete/${id}`;
          break;
        case "add":
          queryData = {
            routeName: "add",
          };
          link = `vacation_watch_business/${data.watch_no}`;
          break;
      }
      break;
    case "audit-logs": {
      switch (action) {
        case "detail":
          link = `audit-log-detail/${id}`;
          break;

        default:
          break;
      }
    }
    case "patient": {
      switch (action) {
        case "unlock":
          link = `unlock_case_rafvue/${id}`;
          queryData = { user: globalVariables.user };
          console.debug("inside patient->unlock");
          break;
      }
      break;
    }
    default:
      return null;
  }

  const slashIndex = link.lastIndexOf("/");

  if (slashIndex > -1) {
    const afterLastSlash = link.substring(slashIndex + 1);

    if (afterLastSlash) link = link.substr(0, slashIndex + 1) + encodeURIComponent(afterLastSlash);
  }

  queryData = { ...queryData, ...additionalQueryData };
  queryString = generateQueryString(queryData);

  if (queryString) link += "?" + queryString;

  if (link && !link.startsWith("/" + globalVariables.routLink)) {
    link = "/" + globalVariables.routLink + link;
  }

  console.debug("inside generate link: ", link);

  return link;
}
