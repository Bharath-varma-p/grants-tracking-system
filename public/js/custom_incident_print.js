function customIncidentPrint(options) {
  /** Checks whether page is overflown */
  function checkOverFlow() {
    return $(".blueash-table-wrapper:last").overflown();
  }

  /**
   * Checks whether page is overflown,if page is overflown then it creates new page and moves the element to new page.
   * @param {*} element the element to be moved to new page
   */
  function checkAndMoveAnotherPage(element) {
    if (checkOverFlow()) {
      $(".blueash-page:last").clone().appendTo("#content");
      $(".blueash-content:last tbody").empty();

      if (element) {
        element.appendTo(".blueash-content:last tbody");
      }
    }
  }

  const {
    custom_print_name,
    departmentName,
    department_address1,
    department_address2,
    department_phone,
    department_logo,
    filters,
  } = options;

  if (custom_print_name == "incident") {
    var blueash_content_div = $("#content");
    const attachmentContainers = $(".attachment-container");
    blueash_content_div.empty().attr("contenteditable", "true");
    // ADDING CSS RULES
    $("<style>")
      .text(
        `
          .blueash-incident-page * {
              font-family: Arial, Helvetica, sans-serif;
          }
  
          .blueash-table {
              width: 100%;
              border: 3px solid black;
              min-height: 60px;
              margin: 0.5rem 0;
          }
  
          .blueash-table>thead>tr>th,
          .blueash-table>tbody>tr>td {
              padding: 5px 10px;
          }
  
          .blueash-table.associated-persons td, 
          .blueash-table.arrest-offenses td,
          .blueash-table.ibr-offenses td,
          .blueash-table.ibr-clearence td
          {
              border-bottom:2px dotted #ccc;
          }
  
          .blueash-table-header
          {
              background-color: #ccc !important;
              width: 100%;
              text-align: left;
              padding:5px 0;
          }
  
          .blueash-header
          {
              height: 125px;
              margin: 20px 0;
              display:flex;
              justify-content:space-between;
          }
  
          .blueash-page
          {
              height: 38.5cm;
              padding: 0;
              margin: 0 auto;
              display:flex;
              flex-direction: column;
          }

          .blueash-footer > table {
            width:100%;
          }
  
          .blueash-table-wrapper
          {
              overflow-y: hidden;
              flex:1;
          }
  
          .blueash-footer td{
              font-size: smaller;
              border-bottom:  4px dashed #ccc;
          }
  
          .narrative-header
          {
              background-color: #ccc !important;
              width: 100%;
              text-align: left;
              border: 2px solid black;
          }
  
          .narrative-tr > td, .call-management-comments-tr > td
          {
              padding-top:20px;
          }
  
          .blueash-table tbody::after
          {
              content: none;
          }
  
          .call-management-comments-table > tbody > tr > td
          {
              border-bottom: 1px dashed #888;
          } 

          @page {
            size: letter;
          }
          
  
          @media print
          {
              .blueash-page:not(:first-of-type)
              {
                  page-break-before: always;
              }
  
              .blueash-footer td{
                  border-bottom:  none;
              }
  
              .blueash-table-wrapper
              {
                  overflow:hidden;
              }
        
          }
          `
      )
      .appendTo(blueash_content_div);

    blueash_content_div.append(`
          <div class="blueash-page">
              <div class="blueash-header">
                      <div
                      id="department_title"
                      style="font-size: 14px; text-align: left; font-weight:bold; line-height:${
                        departmentName.includes("Woodlawn") ? "1.5rem" : "2rem"
                      }">
                      ${departmentName}<br />
                      ${department_address1}<br />
                      ${department_address2}<br />
                      Phone: ${department_phone}
                      </div>
                      <div
                      style="text-align: center">
                      <img
                          class="logo ui-droppable"
                          src="${department_logo}"
                          style="height: 125px; width: 125px"
                      />
                      </div>
                      <div
                      style="font-size: 14px; text-align: right; font-weight:bold; line-height:${
                        departmentName.includes("Woodlawn") ? "1.5rem" : "1.5rem"
                      }">
                          Incident Number: ${incident_data[0].incident_no}
                          <br/>
                          Print Date: ${monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()}
                      </div>

              </div>
              <div class="blueash-table-wrapper">
                  <table cellpadding="1" cellspacing="1" style="width: 100%" class="blueash-content">
                  <tbody>
                  <tr>
                      <td class="ui-droppable" colspan="12" contenteditable="true">
                      <table class="blueash-table ibr-offenses d-none">
                          <thead>
                          <tr>
                              <th colspan="24">
                              <div class="blueash-table-header">
                                  IBR/UCR OFFENSES
                              </div>
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr style="text-decoration: underline">
                              <td class="ui-droppable" colspan="12">Offense</td>
                              <td class="ui-droppable" colspan="8">Section Number</td>
                              <td class="ui-droppable" colspan="4">A/C</td>
                          </tr>
                          </tbody>
                      </table>
                      <table class="blueash-table ibr-clearence d-none">
                          <thead>
                          <tr>
                              <th colspan="24">
                              <div class="blueash-table-header">
                                  CASE CLEARANCE STATUS
                              </div>
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr style="text-decoration: underline">
                              <td class="ui-droppable" colspan="12">Case Clearances</td>
                              <td class="ui-droppable" colspan="8">Clearance Date</td>
                              <td class="ui-droppable" colspan="4">Cleared By</td>
                          </tr>
                          </tbody>
                      </table>
                      <table class="blueash-table incident-types d-none">
                      <thead>
                      <tr>
                          <th colspan="24">
                          <div class="blueash-table-header">
                              NON CRIMINAL INCIDENT TYPES
                          </div>
                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr style="text-decoration: underline">
                          <td class="ui-droppable" colspan="24">Incident Type</td>
                      </tr>
                      </tbody>
                  </table>
                      </td>
                  </tr>
                  <tr>
                      <td class="ui-droppable" colspan="12" contenteditable="true">
                      <table class="blueash-table">
                          <thead>
                          <tr>
                              <th colspan="24">
                              <div class="blueash-table-header">
                                  INCIDENT INFORMATION
                              </div>
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td colspan="2" style="text-decoration: underline">
                              Occurred On/From
                              </td>
                              <td colspan="2" class="ui-droppable occurred-on-weekday"></td>
                              <td colspan="2" class="ui-droppable occurred-on-date">Occurred Date</td>
                              <td colspan="2" style="border-right: 2px solid" class="ui-droppable occurred-on-time">
                              </td>
                              <td colspan="2" style="text-decoration: underline">
                              Occurred To
                              </td>
                              <td colspan="2" class="ui-droppable occurred-to-weekday"></td>
                              <td colspan="2" class="ui-droppable occurred-to-date"></td>
                              <td colspan="2" style="border-right: 2px solid" class="ui-droppable occurred-to-time">
                              </td>
                              <td colspan="4" style="text-decoration: underline">
                              Reported On
                              </td>
                              <td colspan="2" class="ui-droppable reported-date">Reported Date</td>
                              <td colspan="2" style="border-right: 2px solid" class="ui-droppable reported-time">
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" style="text-decoration: underline">
                              Business Name
                              </td>
                              <td colspan="16" style="text-decoration: underline">
                              Incident Address
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" class="ui-droppable business-name">
                              Business Name
                              </td>
                              <td colspan="16" class="ui-droppable incident-address">
                              </td>
                          </tr>
                          </tbody>
                      </table>
                      </td>
                  </tr>
                  </tbody>
                  </table>
              </div>
              <div class="blueash-footer">
                  <table>
                      <tr>
                          <td class="col-sm-4" style="text-align:left">${incident_data[0].incident_no}</td>
                          <td class="col-sm-4 page-number" style="text-align:center"></td>
                          <td class="col-sm-4" style="text-align:right">${
                            d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
                          }</td>
                      </tr>
                  </table>
              </div>
          </div>
          `);

    let isOffense = true;
    for (let offense of all_offenses) {
      if (offense.isOffense) {
        $(".ibr-offenses tbody").append(`
                      <tr>
                          <td class="ui-droppable" colspan="12">${offense.offense_name}</td>
                          <td class="ui-droppable" colspan="8">${offense.orc_no}</td>
                          <td class="ui-droppable" colspan="4">${offense.attempted_completed}</td>
                      </tr>
                  `);
        $(".ibr-clearence tbody").append(`
              <tr>
                  <td class="ui-droppable" colspan="12">${incident_data[0].case_clearences}</td>
                  <td class="ui-droppable" colspan="8">${moment(incident_data[0].clearence_date).format(
                    "MM/DD/YYYY"
                  )}</td>
                  <td class="ui-droppable" colspan="4">${incident_data[0].cleared_by}</td>
              </tr>
          `);
      } else {
        isOffense = false;

        $(".incident-types tbody").append(`
                      <tr>
                          <td class="ui-droppable" colspan="24" >${offense.offense_name}</td>
                      </tr>
                  `);
      }
    }

    if (isOffense) $(".ibr-offenses").removeClass("d-none");
    if (isOffense) $(".ibr-clearence").removeClass("d-none");
    else $(".incident-types").removeClass("d-none");

    var occurred_on = moment(incident_data[0].occurred_from);
    $(".occurred-on-weekday").text(occurred_on.format("ddd"));
    $(".occurred-on-date").text(occurred_on.format("MM/DD/YYYY"));
    $(".occurred-on-time").text(occurred_on.format("hh:mm:ssA"));

    var occurred_to = moment(incident_data[0].occurred_to);
    $(".occurred-to-weekday").text(occurred_to.format("ddd"));
    $(".occurred-to-date").text(occurred_to.format("MM/DD/YYYY"));
    $(".occurred-to-time").text(occurred_to.format("hh:mm:ssA"));

    var report_date_time = moment(incident_data[0].date_time);
    $(".reported-date").text(report_date_time.format("MM/DD/YYYY"));
    $(".reported-time").text(report_date_time.format("hh:mm:ssA"));

    $(".incident-address").text(incident_data[0].address);

    const victimBusinessNames = victim_data
      .filter((victim) => victim.business_name && victim.victim_type == "B")
      .map((victim) => victim.business_name)
      .join("<br/>");

    const incidentBusinessNames = incident_data
      .filter((incident) => incident.business_name)
      .reduce((result, obj) => {
        if (!result.some((item) => item === obj.business_name)) {
          result.push(obj.business_name);
        }
        return result;
      }, [])
      .join("<br/>");

    const businessNames =
      incidentBusinessNames + (incidentBusinessNames.length > 0 ? "<br/>" + victimBusinessNames : victimBusinessNames);

    $(".business-name").html(businessNames);

    var all_persons = [];
    var all_businesses = [];

    if (filters.arrest) {
      for (var arrest of arrest_data) {
        all_persons.push({
          type: "Arrested" + (arrest.expungement ? " (Sealed)" : ""),
          juvenile: arrest.age > 0 && arrest.age < 18 ? "Y" : "N",
          name: arrest.arrest_last + "," + arrest.arrest_first + " " + arrest.arrest_middle,
          date_of_birth: arrest.arrest_dob,
          gender: arrest.arrest_sex,
          cell_phone: arrest.arrestee_cell_phone,
          work_phone: arrest.arrestee_work_tel,
          other_phone: arrest.arresstee_other_cell,
          address: arrest.arrestee_address,
          employer_phone: arrest.employer_phone,
          age: arrest.age,
        });
      }
    }

    if (filters.suspect) {
      for (var suspect of suspect_data) {
        all_persons.push({
          type: "Suspect" + (suspect.expungement ? " (Sealed)" : ""),
          juvenile: suspect.age > 0 && suspect.age < 18 ? "Y" : "N",
          name: suspect.suspect_last + "," + suspect.suspect_first + " " + suspect.suspect_middle,
          date_of_birth: suspect.suspect_dob,
          gender: suspect.suspect_sex,
          cell_phone: suspect.suspect_cell_phone,
          work_phone: suspect.work_tel,
          other_phone: suspect.suspect_other_phone,
          employer_phone: suspect.employer_phone,
          address: suspect.suspect_address,
          age: suspect.age,
        });
      }
    }

    if (filters.victim) {
      for (var victim of victim_data) {
        if (victim.victim_type == "I" || victim.victim_type == "P") {
          all_persons.push({
            type: "Victim" + (victim.expungement ? " (Sealed)" : ""),
            juvenile: !victim.business_name && victim.age > 0 && victim.age < 18 ? "Y" : "N",
            name: victim.victim_last + "," + victim.victim_first + " " + victim.victim_middle,
            date_of_birth: victim.victim_dob,
            gender: victim.victim_sex,
            cell_phone: victim.cell_phone,
            work_phone: victim.work_tel,
            other_phone: victim.other_tel,
            employer_phone: victim.employer_phone,
            address: victim.victim_address,
            age: victim.age,
          });
        } else {
          all_businesses.push({
            type: isOffense ? "Victim" : "Business",
            juvenile: "N",
            name: victim.business_name,
            date_of_birth: victim.victim_dob,
            gender: victim.victim_sex,
            primary_phone: victim.business_primary_phone,
            secondary_phone: victim.business_secondary_phone,
          });
        }
      }
    }

    if (filters.witness) {
      for (var witness of witness_data) {
        all_persons.push({
          type: "Witness",
          juvenile: witness.witness_age > 0 && witness.witness_age < 18 ? "Y" : "N",
          name: witness.witness_last_name + "," + witness.witness_first_name + " " + witness.witness_middle_name,
          date_of_birth: witness.witness_dob,
          gender: witness.witness_sex,
          cell_phone: witness.witness_phone,
          work_phone: witness.work_tel,
          other_phone: witness.other_tel,
          employer_phone: witness.employer_phone,
          address: witness.witness_address,
          age: witness.witness_age,
        });
      }
    }

    if (filters.reportee) {
      for (var reportee of reportee_data) {
        all_persons.push({
          type: reportee.individual_type,
          juvenile: reportee.reportee_age > 0 && reportee.reportee_age < 18 ? "Y" : "N",
          name: reportee.reportee_last_name + "," + reportee.reportee_first_name + " " + reportee.reportee_middle_name,
          date_of_birth: reportee.reportee_dob,
          gender: reportee.reportee_sex,
          cell_phone: reportee.reportee_phone,
          work_phone: reportee.work_tel,
          other_phone: reportee.other_tel,
          employer_phone: reportee.employer_phone,
          address: reportee.reportee_address,
          age: reportee.reportee_age,
        });
      }
    }

    if (all_persons.length > 0) {
      $(".blueash-content:last > tbody").append(`
              <tr class="associated-persons-tr">
                  <td class="ui-droppable" colspan="12" contenteditable="true">
                  <table class="blueash-table associated-persons">
                      <thead>
                      <tr>
                          <th colspan="24">
                          <div class="blueash-table-header">
                              ASSOCIATED PERSONS
                          </div>
                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td colspan="3" style="text-decoration: underline">Type</td>
                          <td colspan="1" style="text-decoration: underline">Juv</td>
                          <td colspan="5" style="text-decoration: underline">
                          Name(Last,First,MI)
                          </td>
                          <td colspan="2" style="text-decoration: underline">
                          Date of Birth
                          </td>
                          <td colspan="2" style="text-decoration: underline">
                          Age
                          </td>
                          <td colspan="2" style="text-decoration: underline">Sex</td>
                          <td colspan="3" style="text-decoration: underline">
                          Cell Phone #
                          </td>
                          <td colspan="3" style="text-decoration: underline">
                          Work Phone #
                          </td>
                          <td colspan="3" style="text-decoration: underline">
                          Other Phone #
                          </td>
                      </tr>
                      </tbody>
                  </table>
                  </td>
              </tr>
          `);

      for (let associated_person of all_persons) {
        $(".associated-persons tbody").append(`
                  <tr>
                      <td colspan="3" class="ui-droppable">${associated_person.type}</td>
                      <td colspan="1" class="ui-droppable">${associated_person.juvenile}</td>
                      <td colspan="5" class="ui-droppable">
                      ${associated_person.name}
                      ${associated_person.address ? `<br/>${associated_person.address}` : ""}
                      </td>
                      <td colspan="2" class="ui-droppable">
                      ${associated_person.date_of_birth}
                      </td>
                      <td colspan="2" class="ui-droppable">
                      ${associated_person.age}
                      </td>
                      <td colspan="2" class="ui-droppable">${associated_person.gender}</td>
                      <td colspan="3" class="ui-droppable">
                      ${associated_person.cell_phone || "N/A"}
                      </td>
                      <td colspan="3" class="ui-droppable">
                      ${associated_person.work_phone || associated_person.employer_phone || "N/A"}
                      </td>
                      <td colspan="3" class="ui-droppable">
                      ${associated_person.other_phone || "N/A"}
                      </td>
                  </tr>
              `);
      }
    }

    checkAndMoveAnotherPage($(".associated-persons-tr"));

    if (all_businesses.length > 0) {
      $(".blueash-content:last > tbody").append(`
              <tr class="associated-businesses-tr">
                  <td class="ui-droppable" colspan="12" contenteditable="true">
                  <table class="blueash-table associated-businesses">
                      <thead>
                      <tr>
                          <th colspan="24">
                          <div class="blueash-table-header">
                              ASSOCIATED BUSINESS
                          </div>
                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td colspan="4" style="text-decoration: underline">Type</td>
                          <td colspan="16" style="text-decoration: underline">
                          Name
                          </td>
                          <td colspan="2" style="text-decoration: underline">
                          Primary Phone #
                          </td>
                          <td colspan="2" style="text-decoration: underline">
                          Secondary Phone #
                          </td>
                      </tr>
                      </tbody>
                  </table>
                  </td>
              </tr>
          `);

      for (let associated_business of all_businesses) {
        $(".associated-businesses tbody").append(`
                  <tr>
                      <td colspan="4">${associated_business.type}</td>
                      <td colspan="16">
                      ${associated_business.name}
                      </td>
                      <td colspan="2">
                      ${associated_business.primary_phone || "N/A"}
                      </td>
                      <td colspan="2">
                      ${associated_business.secondary_phone || "N/A"}
                      </td>
                  </tr>
              `);
      }
    }

    checkAndMoveAnotherPage($(".associated-businesses-tr"));

    var arrest_seq_num = 1,
      arrest_seq_num2 = 1;

    if (filters.arrest) {
      if (arrest_data.length > 0) {
        $(".blueash-content:last > tbody").append(`
                      <tr class="arrest-offenses-tr">
                          <td class="ui-droppable" colspan="12" contenteditable="true">
                          <table class="blueash-table arrest-offenses">
                              <thead>
                              <tr>
                                  <th colspan="24">
                                  <div class="blueash-table-header">
                                      ARREST OFFENSES
                                  </div>
                                  </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td colspan="1" style="text-decoration: underline">
                                  Seq #
                                  </td>
                                  <td colspan="2" style="text-decoration: underline">
                                  Section
                                  </td>
                                  <td colspan="5" style="text-decoration: underline">
                                  Name(Last,First,MI)
                                  </td>
                                  <td colspan="16" style="text-decoration: underline">
                                  Description of Offense
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                          </td>
                      </tr>
                  `);

        for (let i = 0; i < arrest_data.length; i++) {
          for (let orc_detail of all_data.orc_details) {
            var splits = orc_detail.orcDescription.split("-");

            var orc_description = splits.slice(1).join(" ");

            if (splits[0] == i + 1) {
              var orc_no = orc_detail.orc_no.split("-")[1];

              $(".arrest-offenses tbody").append(`
                <tr>
                    <td colspan="1" class="ui-droppable">
                    ${arrest_seq_num2}
                    </td>
                    <td colspan="2" class="ui-droppable">
                    ${orc_no}
                    </td>
                    <td colspan="5" class="ui-droppable">
                    ${
                      arrest_data[i].arrest_last +
                      "," +
                      arrest_data[i].arrest_first +
                      " " +
                      arrest_data[i].arrest_middle
                    }
                    </td>
                    <td colspan="16" class="ui-droppable">
                    ${orc_description}
                    </td>
                </tr>
            `);

              arrest_seq_num2++;
            }
          }
        }

        checkAndMoveAnotherPage($(".arrest-offenses-tr"));
      }
    }

    /*
          $(".blueash-content:last > tbody").append(`
              <tr class="complaint-charges-tr">
                  <td class="ui-droppable" colspan="12" contenteditable="true">
                  <table class="blueash-table">
                      <thead>
                      <tr>
                          <th colspan="24">
                          <div class="blueash-table-header">
                              COMPLAINT CHARGES
                          </div>
                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td colspan="1" style="text-decoration: underline">
                          Seq #
                          </td>
                          <td colspan="2" style="text-decoration: underline">
                          Section
                          </td>
                          <td colspan="5" style="text-decoration: underline">
                          Name(Last,First,MI)
                          </td>
                          <td colspan="16" style="text-decoration: underline">
                          Description of Offense
                          </td>
                      </tr>
                      <tr>
                          <td colspan="1" style="text-decoration: underline">
                          Seq #
                          </td>
                          <td colspan="2" style="text-decoration: underline">
                          Section
                          </td>
                          <td colspan="5" style="text-decoration: underline">
                          Name(Last,First,MI)
                          </td>
                          <td colspan="16" style="text-decoration: underline">
                          Description of Offense
                          </td>
                      </tr>
                      </tbody>
                  </table>
                  </td>
              </tr>
          `);
  
          checkAndMoveAnotherPage( $(".complaint-charges-tr") );
  
          */

    if (filters.arrest) {
      if (arrest_data.length > 0) {
        for (let i = 0; i < arrest_data.length; i++) {
          $(".blueash-content:last > tbody").append(`
                  <tr class="arrestee-table-tr">
                      <td class="ui-droppable" colspan="12" contenteditable="true">
                      <table class="blueash-table arrestee-table">
                          <thead>
                          <tr>
                              <th colspan="24">
                              <div class="arrestee-seq-no blueash-table-header">
                                  ARRESTEE #1
                              </div>
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td colspan="5" style="text-decoration: underline">
                              Suspect Type
                              </td>
                              <td colspan="5" style="text-decoration: underline">
                              Suspect Name
                              </td>
                              <td colspan="5" style="text-decoration: underline">
                              Alias(Nickname)
                              </td>
                              <td colspan="5" style="text-decoration: underline">
                              Occupation
                              </td>
                              <td colspan="4" style="text-decoration: underline">SSN</td>
                          </tr>
                          <tr>
                              <td colspan="5" class="arrestee-suspect-type">Suspect Type</td>
                              <td colspan="5" class="arrestee-suspect-name">Suspect Name</td>
                              <td colspan="5" class="arrestee-alias">Alias(Nickname)</td>
                              <td colspan="5" class="arrestee-occupation">Occupation</td>
                              <td colspan="4" class="arrestee-ssn">SSN</td>
                          </tr>
                          <tr>
                              <td colspan="24" style="padding:0">&nbsp;</td>
                          </tr>
                          <tr>
                              <td colspan="4" style="text-decoration: underline">
                              Date of Birth
                              </td>
                              <td colspan="2" style="text-decoration: underline">Age</td>
                              <td colspan="2" style="text-decoration: underline">Sex</td>
                              <td colspan="4" style="text-decoration: underline">Race</td>
                              <td colspan="4" style="text-decoration: underline">
                              Control Number
                              </td>
                              <td colspan="2" style="text-decoration: underline">
                              Height
                              </td>
                              <td colspan="2" style="text-decoration: underline">
                              Weight
                              </td>
                              <td colspan="2" style="text-decoration: underline">
                              Eye Color
                              </td>
                              <td colspan="2" style="text-decoration: underline">
                              Hair Color
                              </td>
                          </tr>
                          <tr>
                              <td colspan="4" class="arrestee-date-of-birth">Date of Birth</td>
                              <td colspan="2" class="arrestee-age">Age</td>
                              <td colspan="2" class="arrestee-sex">Sex</td>
                              <td colspan="4" class="arrestee-race">Race</td>
                              <td colspan="4" class="arrestee-control-number">Control Number</td>
                              <td colspan="2" class="arrestee-height">Height</td>
                              <td colspan="2" class="arrestee-weight">Weight</td>
                              <td colspan="2" class="arrestee-eye-color">Eye Color</td>
                              <td colspan="2" class="arrestee-hair-color">Hair Color</td>
                          </tr>
                          <tr>
                              <td colspan="24" style="padding:0">
                              &nbsp;
                              </td>
                          </tr>
                          <tr>
                              <td colspan="24">
                              Scars / Marks / Tattoos / Other Physical Characteristics:
                              </td>
                          </tr>
                          <tr>
                              <td colspan="24" class="arrestee-physical-characteristics">
                              Scars / Marks / Tattoos / Other Physical Characteristics:
                              </td>
                          </tr>
                          </tbody>
                      </table>
                      </td>
                  </tr>
                  `);

          var arrestee_table = $(".arrestee-table:last");

          $(".arrestee-seq-no", arrestee_table).text("ARRESTEE #" + arrest_seq_num);
          $(".arrestee-suspect-type", arrestee_table).text("Named");
          $(".arrestee-suspect-name", arrestee_table).text(
            arrest_data[i].arrest_last + "," + arrest_data[i].arrest_first + " " + arrest_data[i].arrest_middle
          );
          $(".arrestee-alias", arrestee_table).text(arrest_data[i].alias);
          $(".arrestee-occupation", arrestee_table).text(arrest_data[i].occupation);
          $(".arrestee-ssn", arrestee_table).text(arrest_data[i].ssn + " (Last 4 digits)");
          $(".arrestee-date-of-birth", arrestee_table).text(arrest_data[i].arrest_dob);
          $(".arrestee-age", arrestee_table).text(arrest_data[i].age);
          $(".arrestee-sex", arrestee_table).text(arrest_data[i].arrest_sex2);
          $(".arrestee-race", arrestee_table).text(arrest_data[i].arrest_race2);
          $(".arrestee-control-number", arrestee_table).text(arrest_data[i].control_no);
          $(".arrestee-height", arrestee_table).text(
            arrest_data[i].height.substring(0, 1) + "' " + arrest_data[i].height.substring(1, 3) + '"'
          );
          $(".arrestee-weight", arrestee_table).text(arrest_data[i].weight);
          $(".arrestee-eye-color", arrestee_table).text(arrest_data[i].eye_color);
          $(".arrestee-hair-color", arrestee_table).text(arrest_data[i].hair_color);
          $(".arrestee-physical-characteristics", arrestee_table).text(
            arrest_data[i].scars_marks || "No Physical Characteristic Data Reported"
          );

          arrest_seq_num++;

          checkAndMoveAnotherPage(arrestee_table.parents(".arrestee-table-tr").eq(0));
        }
      }
    }

    let vehicleNum = 1;
    for (let i = 0; i < vehicle_data.length; i++) {
      $(".blueash-content:last > tbody").append(`
                <tr class="vehicle-table-tr">
                    <td class="ui-droppable" colspan="12" contenteditable="true">
                    <table class="blueash-table vehicle-table">
                        <thead>
                        <tr>
                            <th colspan="24">
                            <div class="vehicle-seq-no blueash-table-header">
                                VEHICLE #1
                            </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colspan="4" style="text-decoration: underline">
                            Plate Number
                            </td>
                            <td colspan="5" style="text-decoration: underline">
                            VIN
                            </td>
                            <td colspan="4" style="text-decoration: underline">
                            Make
                            </td>
                            <td colspan="4" style="text-decoration: underline">
                            Model
                            </td>
                            <td colspan="4" style="text-decoration: underline">
                            Year
                            </td>
                            <td colspan="3" style="text-decoration: underline">
                            Color
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="ui-droppable vehicle-lp-plate-number">Plate Number</td>
                            <td colspan="5" class="ui-droppable vehicle-vin">VIN</td>
                            <td colspan="4" class="ui-droppable vehicle-make">Make</td>
                            <td colspan="4" class="ui-droppable vehicle-model">Model</td>
                            <td colspan="4" class="ui-droppable vehicle-year">Year</td>
                            <td colspan="3" class="ui-droppable vehicle-color">Color</td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
      `);

      var vehicleTable = $(".vehicle-table:last");

      $(".vehicle-seq-no", vehicleTable).text("VEHICLE #" + vehicleNum);

      $(".vehicle-lp-plate-number", vehicleTable).text(vehicle_data[i].lp_plate_number || "N/A");

      $(".vehicle-vin", vehicleTable).text(vehicle_data[i].lp_VIN || "N/A");

      $(".vehicle-make", vehicleTable).text(vehicle_data[i].vehicle_make);

      $(".vehicle-model", vehicleTable).text(vehicle_data[i].vehicle_model);

      $(".vehicle-year", vehicleTable).text(vehicle_data[i].vehicle_year || "N/A");

      $(".vehicle-color", vehicleTable).text(vehicle_data[i].vehicle_color || "N/A");

      vehicleNum++;

      checkAndMoveAnotherPage(vehicleTable.parents(".vehicle-table-tr").eq(0));
    }

    if (filters.property) {
      var all_properties = [];

      for (let evidence of evidence_data) {
        all_properties.push({
          ...evidence,
          type: "Evidence",
        });
      }

      property_data
        .filter((property) => property.optin != "1")
        .forEach((property) => {
          all_properties.push({
            ...property,
            type: "Other",
          });
        });

      var property_seq_num = 1;

      for (let i = 0; i < all_properties.length; i++) {
        $(".blueash-content:last > tbody").append(`
                  <tr class="property-table-tr">
                      <td class="ui-droppable" colspan="12" contenteditable="true">
                      <table class="blueash-table property-table">
                          <thead>
                          <tr>
                              <th colspan="24">
                              <div class="property-seq-no blueash-table-header">
                                  PROPERTY #1
                              </div>
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td colspan="3" class="property-number-title" style="text-decoration: underline">
                              Property Number
                              </td>
                              <td colspan="4" style="text-decoration: underline">
                              Category Desc.
                              </td>
                              <td colspan="4" class="loss-description-title" style="text-decoration: underline">
                              Loss Desc.
                              </td>
                              <td colspan="6" style="text-decoration: underline">
                              Property Description
                              </td>
                              <td colspan="3" style="text-decoration: underline">
                              Serial Number
                              </td>
                              <td colspan="4" style="text-decoration: underline">
                              Orig. Est. Value
                              </td>
                          </tr>
                          <tr>
                              <td colspan="3" class="ui-droppable property-number">Property Number</td>
                              <td colspan="4" class="ui-droppable property-category">Category Desc.</td>
                              <td colspan="4" class="ui-droppable property-loss-description">Loss Desc.</td>
                              <td colspan="6" class="ui-droppable property-description">Property Description</td>
                              <td colspan="3" class="ui-droppable property-serial-number">Serial Number</td>
                              <td colspan="4" class="ui-droppable property-estimated-value">Orig. Est. Value</td>
                          </tr>
                          <tr>
                              <td colspan="24" style="padding:0">&nbsp;</td>
                          </tr>
                          <tr>
                              <td colspan="3" style="text-decoration: underline">
                              Vehicle VIN
                              </td>
                              <td colspan="4" style="text-decoration: underline">
                              Drug Type
                              </td>
                              <td colspan="2" style="text-decoration: underline">
                              Weight
                              </td>
                              <td colspan="2" style="text-decoration: underline">Qty</td>
                              <td colspan="4" style="text-decoration: underline">
                              Unit of Measure
                              </td>
                              <td colspan="2" style="text-decoration: underline">Year</td>
                              <td colspan="3" style="text-decoration: underline">Make</td>
                              <td colspan="4" style="text-decoration: underline">
                              Model
                              </td>
                          </tr>
                          <tr>
                              <td colspan="3" class="ui-droppable property-vehicle-ref">Vehicle Ref.</td>
                              <td colspan="4" class="ui-droppable property-drug-type">Drug Type</td>
                              <td colspan="2" class="ui-droppable property-weight">Weight</td>
                              <td colspan="2" class="ui-droppable property-qty">Qty</td>
                              <td colspan="4" class="ui-droppable property-unit-of-measure">Unit of Measure</td>
                              <td colspan="2" class="ui-droppable property-year">Year</td>
                              <td colspan="3" class="ui-droppable property-make">Make</td>
                              <td colspan="4" class="ui-droppable property-model">Model</td>
                          </tr>
                          </tbody>
                      </table>
                      </td>
                  </tr>
                  `);

        var property_table = $(".property-table:last");

        if (all_properties[i].type == "Evidence") {
          $(".loss-description-title", property_table).text("How Recovered");
          $(".property-number-title", property_table).text("Evidence No");
        }

        $(".property-seq-no", property_table).text("PROPERTY #" + property_seq_num);
        $(".property-number", property_table).text(all_properties[i].property_number || "N/A");
        $(".property-category", property_table).text(all_properties[i].type || "N/A");
        $(".property-loss-description", property_table).text(all_properties[i].loss_description);
        $(".property-description", property_table).text(all_properties[i].ad_desc);
        $(".property-serial-number", property_table).text(all_properties[i].serial_no || "N/A");
        $(".property-estimated-value", property_table).text(
          all_properties[i].prop_value ? "$" + all_properties[i].prop_value : "N/A"
        );

        $(".property-vehicle-ref", property_table).text(all_properties[i].vehicle_VIN || "N/A");

        var drug_type = drug_data.find((p) => p.value == all_properties[i].drug_type);
        $(".property-drug-type", property_table).text(drug_type ? drug_type.label : "N/A");
        $(".property-weight", property_table).text(all_properties[i].drug_quantity || "N/A");
        $(".property-caliber", property_table).text("");
        $(".property-qty", property_table).text(all_properties[i].quantity);

        var drug_measure = drug_quantity.find((p) => p.value == all_properties[i].drug_measure);
        $(".property-unit-of-measure", property_table).text(drug_measure ? drug_measure.label : "N/A");
        $(".property-year", property_table).text(all_properties[i].vehicle_year || "N/A");
        $(".property-make", property_table).text(all_properties[i].make || "N/A");
        $(".property-model", property_table).text(all_properties[i].model || "N/A");

        property_seq_num++;

        checkAndMoveAnotherPage(property_table.parents(".property-table-tr").eq(0));
      }
    }

    if (involved_officers.length > 0) {
      $(".blueash-content:last > tbody").append(`
              <tr class="involved-officers-tr">
                  <td class="ui-droppable" colspan="12" contenteditable="true">
                  <table class="blueash-table involved-officers-table">
                      <thead>
                      <tr>
                          <th colspan="24">
                          <div class="blueash-table-header">
                              INVOLVED OFFICERS
                          </div>
                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td colspan="8" style="text-decoration: underline">
                          Officer Type
                          </td>
                          <td colspan="8" style="text-decoration: underline">
                          Officer Name
                          </td>
                          <td colspan="8" style="text-decoration: underline">
                          Division
                          </td>
                      </tr>
                      </tbody>
                  </table>
                  </td>
              </tr>
            `);

      for (let involved_officer of involved_officers) {
        $(".involved-officers-table tbody").append(`
                  <tr>
                      <td colspan="8" class="ui-droppable">${involved_officer.type}</td>
                      <td colspan="8" class="ui-droppable">${involved_officer.name}</td>
                      <td colspan="8" class="ui-droppable">${involved_officer.division || ""}</td>
                  </tr>
              `);
      }

      checkAndMoveAnotherPage($(".involved-officers-tr"));
    }

    var filtered_narratives = all_narratives.slice();

    if (!filters.narrative) {
      filtered_narratives = filtered_narratives.filter((p) => p.type != "");
    }

    if (!filters.investigative_narrative) {
      filtered_narratives = filtered_narratives.filter((p) => p.type == "" || p.type == "Arrest Narrative");
    }

    if (!filters.arrest_narrative) {
      filtered_narratives = filtered_narratives.filter((p) => p.type !== "Arrest Narrative");
    }

    if (filtered_narratives.length > 0) {
      //$(".blueash-page:last").clone().appendTo("#content");
      //$(".blueash-content:last tbody").empty();

      for (const narrative of filtered_narratives) {
        if (!narrative.narrative) continue;

        $(".blueash-content:last > tbody").append(`
              <tr class="narrative-tr">
                  <td colspan="24" style="padding-bottom:0">
                  <table style="width: 100%; margin:0">
                      <tbody>
                      <tr>
                          <td colspan="24">
                          <div class="narrative-header">
                              Narrative by: ${narrative.user}
                          </div>
                          </td>
                      </tr>
                      <tr>
                          <td colspan="4" style="text-decoration: underline">
                          Date & Time
                          </td>
                          <td colspan="4" style="text-decoration: underline">
                          Narrative Description
                          </td>
                          <td colspan="4" style="text-decoration: underline">
                          Entered by
                          </td>
                          <td colspan="4" style="text-decoration: underline">
                          Status
                          </td>
                          <td colspan="4" style="text-decoration: underline">
                          Reviewed by
                          </td>
                          <td colspan="4" style="text-decoration: underline">
                          Last Edit Date
                          </td>
                      </tr>
                      <tr>
                          <td colspan="4" class="ui-droppable">${narrative.date}</td>
                          <td colspan="4" class="ui-droppable">${narrative.type}</td>
                          <td colspan="4" class="ui-droppable">${narrative.user}</td>
                          <td colspan="4" class="ui-droppable">${incident_data[0].status}</td>
                          <td colspan="4" class="ui-droppable">${
                            incident_data[0].reviewed_by || incident_data[0].supervisor_name
                          }</td>
                          <td colspan="4" class="ui-droppable">${narrative.last_edit_date}</td>
                      </tr>
                      <tr>
                          <td colspan="24">&nbsp;</td>
                      </tr>
                      <tr>
                          <td colspan="24" class="ui-droppable narrative-content" style="padding-bottom:0"></td>
                      </tr>
                      </tbody>
                  </table>
                  </td>
              </tr>
              `);

        $(".narrative-content:last").html(narrative.narrative);

        checkAndMoveAnotherPage($(".narrative-tr:last"));

        while ($(".blueash-table-wrapper:last").overflown()) {
          const lastTable = $(".blueash-table-wrapper:last");

          const lastNarrativeContent = $(".narrative-content:last");

          $(".blueash-page:last").clone().appendTo("#content");
          $(".blueash-page:last .narrative-tr").not(":last").remove();
          $(".narrative-content:last").empty();

          const lastNarrativeTitle = $(".narrative-header:last").last().text();
          if (!lastNarrativeTitle.includes("Continued")) {
            $(".narrative-header:last").text(lastNarrativeTitle + " (Continued)");
          }

          while (lastTable.overflown()) {
            const lastNarrativeContentChilds = lastNarrativeContent.get(0).childNodes;

            const lastElement = lastNarrativeContentChilds[lastNarrativeContentChilds.length - 1];

            if (!lastElement) break;

            if (lastElement.clientHeight > lastTable.get(0).clientHeight) {
              const lastElementContainer = $(lastElement).clone().empty();
              $(".narrative-content:last").prepend(lastElementContainer);

              while (lastTable.overflown()) {
                const lastChildNode = lastElement.childNodes[lastElement.childNodes.length - 1];
                if (!lastChildNode) break;
                lastElementContainer.prepend(lastChildNode);
              }
            } else {
              $(".narrative-content:last").prepend(lastElement);
            }
          }
        }
      }
    }

    if (filters.call_management_comments) {
      if (call_management_comments.length > 0) {
        $(".blueash-content:last > tbody").append(`
                  <tr class="call-management-comments-tr">
                          <td class="ui-droppable" colspan="12" contenteditable="true">
                          <table class="blueash-table call-management-comments-table">
                              <thead>
                              <tr>
                                  <th colspan="24">
                                  <div class="blueash-table-header call-management-comments-header">
                                      INCIDENT DISPATCHER REMARKS
                                  </div>
                                  </th>
                              </tr>
                              </thead>
                              <tbody>
                              </tbody>
                          </table>
                          </td>
                      </tr>
                  `);

        checkAndMoveAnotherPage($(".call-management-comments-tr"));

        for (let call_management_comment of call_management_comments) {
          $(".call-management-comments-table:last tbody").append(`
                          <tr>
                              <td colspan="24" class="ui-droppable">${call_management_comment.comment}</td>
                          </tr>
                      `);

          if (checkOverFlow()) {
            $(".blueash-page:last").clone().appendTo("#content");
            $(".blueash-content:last tbody").empty();
            $(".call-management-comments-tr:last").clone().appendTo(".blueash-content:last tbody");

            $(".call-management-comments-table:last tbody").empty();
            $(".call-management-comments-header:last").text("INCIDENT DISPATCHER REMARKS (continued)");
          }
        }
      }
    }

    const pageCount = $(".page-number").length;

    $(".page-number").each(function (i, elem) {
      $(elem).text(`Page ${i + 1} of ${pageCount}`);
    });

    blueash_content_div.append(attachmentContainers);
  }
}
