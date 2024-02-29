var movies = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    dataType: "jsonp",
    url: "../search2?key=%QUERY",
    rateLimitWait: "1000",
    filter: function (movies) {
      // Map the remote source JSON array to a JavaScript object array
      return $.map(movies, function (movie) {
        return {
          value:
            movie.first_name +
            " " +
            (movie.middle_name ? movie.middle_name + " " : "") +
            movie.last_name +
            ", " +
            movie.date_of_birth +
            ", " +
            movie.Address2,
          values: [
            {
              first_name: movie.first_name,
              last_name: movie.last_name,
              date_of_birth: movie.date_of_birth2,
              Address2: movie.Address2,
              middle_name: movie.middle_name,
              sex: movie.sex,
              race: movie.race,
              ethnicity: movie.ethnicity,
              cell_phone: movie.cell_phone,
              work_tel: movie.work_tel,
              employer: movie.employer,
              employer_address: movie.employer_address,
              resident_status: movie.resident_status,
              victim_lat: movie.PointY,
              victim_lng: movie.PointX,
              birth_place: movie.birth_place,
              birth_state: movie.birth_state,
              marital_status: movie.marital_status,
              occupation_school: movie.occupation_school,
              additional_descriptions: movie.additional_descriptives,
              employer_phone: movie.employer_phone,
              fbi: movie.fbi_no,
              control: movie.control_no,
              gang_affiliation: movie.gang_affiliation,
              ssn: movie.ssn,
              other_tel: movie.other_tell,
              cell_phone: movie.cell_phone,
              email: movie.email,
              scars_marks: movie.scars_marks,
              eye: movie.eye_color,
              hair: movie.hair_color,
              height: movie.height,
              weight: movie.weight,
              master_name_id: movie.master_name_id,
              alias1: movie.alias1,
              alias2: movie.alias2,
              alias3: movie.alias3,
              Address: movie.Address,
              Neighborhood: movie.Neighborhood,
              City: movie.City,
              County: movie.County,
              State: movie.State,
              zip_code: movie.zip_code,
              Country: movie.Country,
              PointX: movie.PointX,
              PointY: movie.PointY,
              apt_no: movie.apt_no,
              suffix: movie.suffix,
              driving_lic_no: movie.driving_lic_no,
              issued_date: movie.issued_date,
              expiration_date: movie.expiration_date,
              issue_state: movie.issue_state,
              driver_license_class: movie.driver_license_class,
              violent_crime: movie.violent_crime,
              cautious: movie.cautious,
              cautious_notes: movie.cautious_notes,
              email_notes: movie.email_notes,
            },
          ],
          values2: movies,
        };
      });
    },
  },
  limit: 50,
});

// Initialize the Bloodhound suggestion engine
movies.initialize();

// Instantiate the Typeahead UI
$("#name_search .typeahead").typeahead(
  {
    hint: true,
    highlight: true,
    minLength: 3,
  },
  {
    displayKey: "value",
    source: movies.ttAdapter(),
  }
);
//Control the Divs Based on Search Input Length
$("#search_input").on("keyup", function () {
  name_check2 = $("#search_input").val();
  if (name_check2.length <= 1) {
    $("#search_input").removeClass("selected highlight");
    $("#accordion2").hide();
    $("#accordion3").hide();
    $("#accordion4").hide();
    $("#accordion5").hide();
    $("#accordion_photo").hide();
    $("#accordion_n").hide();
    $("#accordion_m").hide();
    $("#accordion_narro").hide();
    $("#gonder").hide();
    $("#first_name_div").hide();
    $("#middle_name_div").hide();
    $("#last_name_div").hide();
    $("#alias1_div").hide();
    $("#alias2_div").hide();
    $("#sakla_beni").hide();
    $("#alias3_div").hide();
    $("#dob_div").hide();
    $("#race_div").hide();
    $("#ethnicity_div").hide();
    $("#sex_div").hide();
    $("#suffix").val("");
    $("#marital_status_div").hide();
    $("#birth_place_div").hide();
    $("#birth_state_div").hide();
    $("#hair_div").hide();
    $("#eye_div").hide();
    $("#height_div").hide();
    $("#weight_div").hide();
    $("#scars_div").hide();
    $("#gang_affiliation_div").hide();
    $("#ssn_div").hide();
    $("#fbi_div").hide();
    $("#control_div").hide();
    $("#interviewed_adress_div").hide();
    $("#scars_div").hide();
    $("#occupation_school_div").hide();
    $("#cell_div").hide();
    $("#other_tell_div").hide();
    $("#email_div").hide();
    $("#suspected_of_using_div").hide();
    $("#additional_descriptions_div").hide();
    $("#resident_div").hide();
    $("#employer_phone_div").hide();
    $("#employer_address_div").hide();
    $("#employer_div").hide();

    $("#master_name_id").val("");
    $("#search_input").removeData("unknown-selected").valid();
    $("#first_name").val("");
    $("#middle_name").val("");
    $("#last_name").val("");
    $("#dob").val("");
    $("#race").selectpicker("val", "");
    $("#ethnicity").selectpicker("val", "");
    $("#sex").selectpicker("val", "");
    $("#apt_no").val("");

    $("#marital_status").selectpicker("val", "");
    $("#driving_license_no").val("");
    $("#issue_state").selectpicker("val", "");
    $("#driver_license_class, #class1").selectpicker("val", "");
    $("#birth_place").val("");
    $("#birth_state").selectpicker("val", "");
    $("#hair").selectpicker("val", "");
    $("#eye").selectpicker("val", "");
    $("#height").val("");
    $("#weight").val("");
    $("#scars").val("");
    $("#gang_affiliation").val("");
    $("#ssn").val("");
    $("#fbi").val("");
    $("#control").val("");
    $("#interviewed_adress").val("").removeData("selected-val");
    $("#scars").val("");
    $("#occupation_school").val("");
    $("#cell").val("");
    $("#other_tel").val("");
    $("#email").val("");
    $("#suspected_of_using").selectpicker("val", "");
    $("#additional_descriptions").val("");
    $("#resident").selectpicker("val", "");
    $("#employer_phone").val("");
    $("#employer_address").val("").removeData("selected-val");
    $("#employer").val("");
    $("#ageRange").val("");
    $("#ageRangeDiv").hide();
    $("#dobDiv").show();
  } else {
    if (name_check2.toLowerCase() === "unknown") {
      if ($("#unknown_name").length > 0) {
        $.alert("Warning: If your person is unknown, please click on the unknown button");
      }
    }
  }
});

$("#name_search .typeahead").on("typeahead:selected", function (e, datum) {
  if (
    datum.values[0].first_name &&
    datum.values[0].first_name.toLowerCase() === "unknown" &&
    datum.values[0].last_name &&
    datum.values[0].last_name.toLowerCase() === "unknown"
  ) {
    $.alert("Warning: If your person is unknown, please click on the unknown button");
    return;
  }

  setFormDirty();
  $("#first_name").val(datum.values[0].first_name);
  $("#last_name").val(datum.values[0].last_name);
  $("#middle_name").val(datum.values[0].middle_name);
  $("#dob").val(datum.values[0].date_of_birth);
  $("#first_name_check").val(datum.values[0].first_name);
  $("#last_name_check").val(datum.values[0].last_name);
  $("#middle_name_check").val(datum.values[0].middle_name);
  $("#dob_check").val(datum.values[0].date_of_birth);
  $("#interviewed_adress_check").val(datum.values[0].Address2);
  $("#cell_check").val(datum.values[0].cell_phone);
  $("#other_tel_check").val(datum.values[0].other_tel);
  $("#email_check").val(datum.values[0].email);
  $("#control_check").val(datum.values[0].control);
  $("#fbi_check").val(datum.values[0].fbi);
  $("#ssn_check").val(datum.values[0].ssn);
  $("#suffix").val(datum.values[0].suffix);
  $("#apt_no").val(datum.values[0].apt_no);
  $("#sex.selectpicker").selectpicker("val", datum.values[0].sex);
  $("#race.selectpicker").selectpicker("val", datum.values[0].race);
  $("#ethnicity").selectpicker("val", datum.values[0].ethnicity);
  $("#interviewed_adress").val(datum.values[0].Address2).data("selected-val", datum.values[0].Address2);
  $("#lng2").val(datum.values[0].victim_lng);
  $("#lat2").val(datum.values[0].victim_lat);
  $("#addrs2").val(datum.values[0].Address);
  $("#nghbd2").val(datum.values[0].Neighborhood);
  $("#city2").val(datum.values[0].City);
  $("#county2").val(datum.values[0].County);
  $("#state2").val(datum.values[0].State);
  $("#zip2").val(datum.values[0].zip_code);
  $("#country2").val(datum.values[0].Country);
  $("#scars").val(datum.values[0].scars_marks);
  $("#fbi").val(datum.values[0].fbi);
  $("#control").val(datum.values[0].control);
  $("#ssn").val(datum.values[0].ssn);
  $("#gang_affiliation").val(datum.values[0].gang_affiliation);
  $("#other_tel").val(datum.values[0].other_tel);
  $("#cell").val(datum.values[0].cell_phone);
  $("#email").val(datum.values[0].email);
  $("#eye").selectpicker("val", datum.values[0].eye);
  $("#hair").selectpicker("val", datum.values[0].hair);

  if (datum.values[0].height) {
    $("#height1").val(datum.values[0].height.substring(0, 1));
    $("#height2").val(datum.values[0].height.substring(1, 3));

    if ($("#height1").hasClass("selectpicker")) {
      $("#height1").selectpicker("refresh");
    }

    if ($("#height2").hasClass("selectpicker")) {
      $("#height2").selectpicker("refresh");
    }
  }
  $("#weight").val(datum.values[0].weight);
  $("#master_name_id").val(datum.values[0].master_name_id);
  $("#alias1").val(datum.values[0].alias1);
  $("#alias2").val(datum.values[0].alias2);
  $("#alias3").val(datum.values[0].alias3);
  $("#owner_address").val(datum.values[0].Address2);
  $("#owner_phone").val(datum.values[0].cell_phone);
  $("#owner_lng").val(datum.values[0].victim_lng);
  $("#owner_lat").val(datum.values[0].victim_lat);

  //From Traffic Citation
  $("#driving_license_no").val(datum.values[0].driving_lic_no);
  $("#driving_license_no_check").val(datum.values[0].driving_lic_no);
  $("#driving_no").val(datum.values[0].driving_lic_no);
  $("#issue_state").selectpicker("val", datum.values[0].issue_state);
  $("#driver_license_class").selectpicker("val", datum.values[0].driver_license_class);
  fillDriverLicenseClassInput("#class1", datum.values[0].driver_license_class);
  //From traffic Unit
  $("#first_name_check").val(datum.values[0].first_name);
  $("#last_name_check").val(datum.values[0].last_name);
  $("#middle_name_check").val(datum.values[0].middle_name);
  $("#dob_check").val(datum.values[0].date_of_birth);
  $("#victim_address_check").val(datum.values[0].Address2);
  $("#victim_phone_check").val(datum.values[0].cell_phone);
  $("#owner_address").val(datum.values[0].Address2);
  $("#owner_phone").val(datum.values[0].cell_phone);
  $("#owner_lng").val(datum.values[0].victim_lng);
  $("#owner_lat").val(datum.values[0].victim_lat);
  //$('#lp_no').val(datum.values[0].license_number);
  $("#lp_state").selectpicker("val", datum.values[0].issue_state);
  $("#issue_date").val(datum.values[0].issued_date);
  $("#expire").val(datum.values[0].expiration_date);

  $("#employer").val(datum.values[0].employer);
  $("#employer_address").val(datum.values[0].employer_address).data("selected-val", datum.values[0].employer_address);
  $("#employer_phone").val(datum.values[0].employer_phone);
  $("#resident").selectpicker("val", datum.values[0].resident_status);
  $("#birth_place").val(datum.values[0].birth_place);
  $("#birth_state").selectpicker("val", datum.values[0].birth_state);
  $("#marital_status").selectpicker("val", datum.values[0].marital_status);
  $("#occupation_school").val(datum.values[0].occupation_school);

  $("#lp_state").change();
  //setTimeout(function(){
  $("#cautious").empty();
  //$.each($(this).
  var addi;
  var opt_add = 0;
  $("#additional_descriptions").each(function () {
    addi = $(this).text();
  });

  var additional_parse = datum.values[0].additional_descriptions;
  if (additional_parse) {
    var additional_parse = "[" + addi + "]";
    additional_parse2 = datum.values[0].additional_descriptions.split(",");
    for (j = 0; j < additional_parse2.length; j++) {
      if (!additional_parse.includes(additional_parse2[j])) {
        opt_add++;
        if (opt_add == 1) {
          $("#additional_descriptions").append(
            '<optgroup class="heading_style" label="From Other Departments"><option class="option25" style="background:orange" value="' +
              additional_parse2[j] +
              '">' +
              additional_parse2[j] +
              "</option>"
          );
        }
        if (opt_add >= 2) {
          $("#additional_descriptions").append(
            '<option class="option25" style="background:orange" value="' +
              additional_parse2[j] +
              '">' +
              additional_parse2[j] +
              "</option>"
          );
        }
      }
      if (j == additional_parse2.length - 1) {
        $("#additional_descriptions").append("</optgroup>");
        $("#additional_descriptions").selectpicker("val", additional_parse2);
      }
    }

    additional_parse2.forEach(function (d) {
      $("#cautious").append(
        '</button><button class="btn btn-primary" type="button">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  ' +
          d +
          "</button>"
      );
    });
  }
  //},3000);
  if (datum.values[0].violent_crime == "yes") {
    $("#cautious").append(
      '<button class="btn btn-danger" type="button" id="violent_crime_notification">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Violent Crime</button>'
    );
  }

  $("#violent_crime_notification").click(function () {
    $.ajax({
      type: "POST",
      url: "../general_search_mug_violent",
      data: { master_name_id: datum.values[0].master_name_id },
      success: function (data) {
        $("body")
          .append(`<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog"  aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document" style="width:1100px;">
                <div class="modal-content">
                    <div class="modal-header d-none">
                       
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="modelim2">		
		<table id="bana_ekle" width="100%" border="1">
</table>

 </div>
					
                    <div class="modal-footer d-none">
        <button id="printme2" type="button" class="btn btn-primary">Print</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
   
                </div>
            </div>
        </div>`);

        $("#bana_ekle").empty();

        for (var i = 0; i < data.length; i++) {
          if (i & 1) {
            color = "td3";
          } else {
            color = "td5";
          }

          $("#bana_ekle").append(
            '<tbody id="hey"><td style="border-top:dotted black" class="' +
              color +
              ' yazma2" width="20%"><u><strong>Incident No</strong></u></td> ' +
              '<td style="border-top:dotted black" class="' +
              color +
              ' yazma2" width="20%"><u><strong>Rec Date/Time</strong></u></td> ' +
              '<td style="border-top:dotted black" class="' +
              color +
              ' yazma2" width="20%"><u><strong>Reported As</strong></u></td> ' +
              '<td style="border-top:dotted black" class="' +
              color +
              ' yazma2" width="20%"><u><strong>Event Type</strong></u></td> ' +
              '<td style="border-top:dotted black" class="' +
              color +
              ' yazma2" width="20%"><u><strong>ORC#</strong></u></td> ' +
              "</tr> " +
              "<tr> " +
              '<td class="' +
              color +
              ' yazma" id="inc_no' +
              i +
              '">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="inc_time' +
              i +
              '">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="report_type' +
              i +
              '">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="event_type' +
              i +
              '">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="status' +
              i +
              '">&nbsp;</td> ' +
              "</tr> " +
              "<tr> " +
              '<td class="' +
              color +
              ' yazma" colspan="2"><u><strong>Location</strong></u></td> ' +
              '<td class="' +
              color +
              ' yazma"><u><strong>Police Department</strong></u></td> ' +
              '<td class="' +
              color +
              ' yazma"><u><strong></strong></u></td> ' +
              '<td class="' +
              color +
              ' yazma"><u><strong></strong></u></td> ' +
              "</tr> " +
              '<tr id="nerede_kaldik' +
              i +
              '"> ' +
              '<td class="' +
              color +
              ' yazma" id="incident_address' +
              i +
              '" colspan="2">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="approving' +
              i +
              '">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="supervising' +
              i +
              '">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="assigned_officer' +
              i +
              '">&nbsp;</td> ' +
              "</tr> " +
              '<tr id="nerede_kaldik2' +
              i +
              '"> ' +
              '<td class="' +
              color +
              ' yazma" colspan="2"><u><strong>Involved Person Name</strong></u></td> ' +
              '<td class="' +
              color +
              ' yazma"><u><strong>DOB</strong></u></td> ' +
              '<td class="' +
              color +
              ' yazma"><u><strong>Involvement Type</strong></u></td> ' +
              '<td class="' +
              color +
              ' yazma"><u><strong>Event Type</strong></u></td> ' +
              "</tr> " +
              "<tr> " +
              '<td class="' +
              color +
              ' yazma" colspan="5"><u><strong>Narrative</strong></u></td> ' +
              "</tr> " +
              "<tr> " +
              '<td class="' +
              color +
              ' yazma3" id="narrative_normal' +
              i +
              '" colspan="5" style="border-bottom:dotted black">&nbsp;</td> ' +
              "</tbody>"
          );

          //if(data.length){
          //data.forEach(function(d,j){
          $("#nerede_kaldik2" + i).after(
            "<tr>" +
              '<td class="' +
              color +
              ' yazma" id="person_name' +
              data[i].incident_no +
              i +
              'reportee" colspan="2">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="person_dob' +
              data[i].incident_no +
              i +
              'reportee">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="person_involvement' +
              data[i].incident_no +
              i +
              'reportee">&nbsp;</td> ' +
              '<td class="' +
              color +
              ' yazma" id="event_type2' +
              data[i].incident_no +
              i +
              'reportee">&nbsp;</td> ' +
              "</tr> "
          );
          if (data[i].data_source == "view") {
            var data_source2 = "Arrest/Suspect";
            var reported_as = "Incident";
          } else {
            var data_source2 = "Arrest Non-NIBRS";
            var reported_as = "Arrest Non-NIBRS";
          }
          var incident_no = data[i].incident_no;
          $("#inc_no" + i).text(incident_no);
          $("#report_type" + i).text(reported_as);
          $("#event_type" + i).text(data[i].crime_name);
          $("#inc_time" + i).text(data[i].date_time);
          $("#status" + i).text(data[i].orc_no);
          $("#incident_address" + i).text(data[i].Address2);
          $("#approving" + i).text(data[i].department + " Police Department");
          $("#narrative_normal" + i).html(htmlToText(data[i].narrative));

          $("#person_name" + data[i].incident_no + i + "reportee").text(data[i].person_name);
          $("#person_dob" + data[i].incident_no + i + "reportee").text(data[i].person_dob);
          $("#person_involvement" + data[i].incident_no + i + "reportee").text(data_source2);
          $("#event_type2" + data[i].incident_no + i + "reportee").text(data[i].crime_name);

          //})
          //}
        } // end of for loop

        $("#exampleModal2").modal("show");
      },
    }); // end of ajax call
  });

  if (datum.values[0].cautious == "yes") {
    $("#cautious").append(
      '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
        datum.values[0].cautious_notes +
        '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
    );
    $.ajax({
      type: "POST",
      url: "../cautious_email",
      data: {
        email: datum.values[0].email_notes,
        first_name: datum.values[0].first_name,
        last_name: datum.values[0].last_name,
        date_of_birth: datum.values[0].date_of_birth,
      },
      success: function (data) {},
    });
  }

  var name_check = "";
  if (document.getElementById("first_name")) {
    name_check = document.getElementById("first_name").value;
  }
  if (name_check.length >= 1) {
    $("#search_input").addClass("selected highlight").removeData("unknown-selected").valid();
    $("#accordion2").show();
    $("#accordion3").show();
    $("#accordion4").show();
    $("#accordion5").show();
    $("#accordion_photo").show();
    $("#accordion_n").show();
    $("#accordion_m").show();
    $("#accordion_narro").show();
    $("#gonder").show();
    $("#first_name_div").show();
    $("#middle_name_div").show();
    $("#last_name_div").show();
    $("#alias1_div").show();
    $("#alias2_div").show();
    $("#alias3_div").show();
    $("#dob_div").show();
    $("#race_div").show();
    $("#ethnicity_div").show();
    $("#sex_div").show();
    $("#sakla_beni").show();
    $("#marital_status_div").show();
    $("#birth_place_div").show();
    $("#birth_state_div").show();
    $("#hair_div").show();
    $("#eye_div").show();
    $("#height_div").show();
    $("#weight_div").show();
    $("#scars_div").show();
    $("#gang_affiliation_div").show();
    $("#ssn_div").show();
    $("#fbi_div").show();
    $("#control_div").show();
    $("#interviewed_adress_div").show();
    $("#scars_div").show();
    $("#occupation_school_div").show();
    $("#cell_div").show();
    $("#other_tell_div").show();
    $("#email_div").show();
    $("#suspected_of_using_div").show();
    $("#additional_descriptions_div").show();
    $("#resident_div").show();
    $("#employer_phone_div").show();
    $("#employer_address_div").show();
    $("#employer_div").show();
  } else {
    $("#first_name_div").hide();
    $("#middle_name_div").hide();
    $("#last_name_div").hide();
    $("#alias1").hide();
    $("#alias2").hide();
    $("#alias3").hide();
    $("#dob_div").hide();
    $("#race_div").hide();
    $("#ethnicity_div").hide();
    $("#sex_div").hide();
    $("#sakla_beni").hide();
    $("#marital_status_div").hide();
    $("#birth_place_div").hide();
    $("#birth_state_div").hide();
    $("#hair_div").hide();
    $("#eye_div").hide();
    $("#height_div").hide();
    $("#weight_div").hide();
    $("#scars_div").hide();
    $("#gang_affiliation_div").hide();
    $("#ssn_div").hide();
    $("#fbi_div").hide();
    $("#control_div").hide();
    $("#interviewed_adress_div").hide();
    $("#scars_div").hide();
    $("#occupation_school_div").hide();
    $("#cell_div").hide();
    $("#other_tell_div").hide();
    $("#email_div").hide();
    $("#suspected_of_using_div").hide();
    $("#additional_descriptions_div").hide();
    $("#resident_div").hide();
    $("#employer_phone_div").hide();
    $("#employer_address_div").hide();
    $("#employer_div").hide();
  }
});

//Adding Names to the Master Name Table
$("#master_name").click(function () {
  const addMasterNameLink = generateLink("master_name", "add");
  myPopupWin(addMasterNameLink, function () {
    setFormDirty();
    $.ajax({
      url: "../master_name_append",
      type: "POST",
      //dataType: 'json',
      success: function (data) {
        search_input_valid = true;

        $("#victim_specs").show();
        setFormDirty();
        $("#search_input").val(data[0].first_name + " " + data[0].last_name);
        $("#first_name").val(data[0].first_name);
        $("#last_name").val(data[0].last_name);
        $("#middle_name").val(data[0].middle_name);
        $("#dob").val(data[0].date_of_birth);
        $("#sex.selectpicker").selectpicker("val", data[0].sex);
        $("#race.selectpicker").selectpicker("val", data[0].race);
        $("#ethnicity").selectpicker("val", data[0].ethnicity);
        $("#interviewed_adress").val(data[0].Address2).data("selected-val", data[0].Address2);

        //From Traffic Citation
        $("#driving_license_no").val(data[0].driving_lic_no);

        //From traffic Unit
        $("#first_name_check").val(data[0].first_name);
        $("#last_name_check").val(data[0].last_name);
        $("#middle_name_check").val(data[0].middle_name);
        $("#dob_check").val(data[0].date_of_birth);
        $("#victim_address_check").val(data[0].Address2);
        $("#victim_phone_check").val(data[0].cell_phone);

        $("#interviewed_adress_check").val(data[0].Address2);
        $("#cell_check").val(data[0].cell_phone);
        $("#other_tel_check").val(data[0].other_tell);
        $("#email_check").val(data[0].email);
        $("#control_check").val(data[0].control_no);
        $("#fbi_check").val(data[0].fbi_no);
        $("#ssn_check").val(data[0].ssn);

        $("#owner_address").val(data[0].Address2);
        $("#owner_phone").val(data[0].cell_phone);
        $("#owner_lng").val(data[0].victim_lng);
        $("#owner_lat").val(data[0].victim_lat);
        //$('#lp_no').val(data[0].license_number);
        $("#lp_state").selectpicker("val", data[0].issue_state);
        $("#issue_date").val(data[0].issued_date);
        $("#issue_state").selectpicker("val", data[0].issue_state);
        $("#driver_license_class").selectpicker("val", data[0].driver_license_class);
        fillDriverLicenseClassInput("#class1", data[0].driver_license_class);
        $("#expire").val(data[0].expiration_date);

        $("#lng2").val(data[0].PointX);
        $("#lat2").val(data[0].PointY);
        $("#addrs2").val(data[0].Address);
        $("#nghbd2").val(data[0].Neighborhood);
        $("#city2").val(data[0].City);
        $("#county2").val(data[0].County);
        $("#state2").val(data[0].State);
        $("#zip2").val(data[0].zip_code);
        $("#country2").val(data[0].Country);
        $("#alias1").val(data[0].alias1);
        $("#alias2").val(data[0].alias2);
        $("#alias3").val(data[0].alias3);
        $("#apt_no").val(data[0].apt_no);

        $("#scars").val(data[0].scars_marks);
        $("#fbi").val(data[0].fbi);
        $("#control").val(data[0].control_no);
        $("#fbi").val(data[0].fbi_no);
        $("#ssn").val(data[0].ssn);
        $("#gang_affiliation").val(data[0].gang_affiliation);
        $("#other_tel").val(data[0].other_tell);
        $("#cell").val(data[0].cell_phone);
        $("#email").val(data[0].email);
        $("#eye").selectpicker("val", data[0].eye_color);
        $("#hair").selectpicker("val", data[0].hair_color);
        if (data[0].height) {
          $("#height1").val(data[0].height.substring(0, 1));
          $("#height2").val(data[0].height.substring(1, 3));

          if ($("#height1").hasClass("selectpicker")) {
            $("#height1").selectpicker("refresh");
          }

          if ($("#height2").hasClass("selectpicker")) {
            $("#height2").selectpicker("refresh");
          }
        }
        $("#weight").val(data[0].weight);

        //From Traffic Person
        $("#driving_no").val(data[0].driving_lic_no);
        $("#lp_state").change();

        var additional_parse = data[0].additional_descriptives;
        if (additional_parse) {
          additional_parse2 = data[0].additional_descriptives.split(",");
          $("#additional_descriptions").selectpicker("val", additional_parse2);
        }

        $("#employer").val(data[0].employer);
        $("#employer_address").val(data[0].employer_address).data("selected-val", data[0].employer_address);
        $("#employer_phone").val(data[0].employer_phone);
        $("#resident").selectpicker("val", data[0].resident_status);
        $("#birth_place").val(data[0].birth_place);
        $("#birth_state").selectpicker("val", data[0].birth_state);
        $("#marital_status").selectpicker("val", data[0].marital_status);
        $("#occupation_school").val(data[0].occupation_school);
        $("#master_name_id").val(data[0].master_name_id);
        $("#search_input").addClass("selected highlight").removeData("unknown-selected").valid();
        $("#suffix").val(data[0].suffix);
        show_divs();
        $("#ageRangeDiv").hide();
        $("#ageRange").val("");
        $("#dobDiv").show();
      },
    });
  });
});

//Unknown Names Fillings
$("#unknown_name").click(function () {
  show_divs();
  $("#search_input").val("unknown");
  $("#search_input").removeAttr("required");
  $("#cautious").empty();
  $("#accordion_p").show();
  $("#accordion_k").show();
  $("#accordion_photo").show();
  $("#accordion_n").show();
  $("#accordion_m").show();
  $("#accordion2").show();
  $("#accordion3").show();
  $("#accordion4").show();
  $("#accordion5").show();
  $("#accordion_narro").show();
  $("#gonder").show();
  $("#first_name_div").show();
  $("#middle_name_div").show();
  $("#last_name_div").show();
  $("#alias1_div").show();
  $("#alias2_div").show();
  $("#alias3_div").show();
  $("#dob_div").show();
  $("#race_div").show();
  $("#ethnicity_div").show();
  $("#sex_div").show();

  $("#marital_status_div").show();
  $("#birth_place_div").show();
  $("#birth_state_div").show();
  $("#hair_div").show();
  $("#eye_div").show();
  $("#height_div").show();
  $("#weight_div").show();
  $("#scars_div").show();
  $("#gang_affiliation_div").show();
  $("#ssn_div").show();
  $("#fbi_div").show();
  $("#control_div").show();
  $("#interviewed_adress_div").show();
  $("#scars_div").show();
  $("#occupation_school_div").show();
  $("#cell_div").show();
  $("#other_tell_div").show();
  $("#email_div").show();
  $("#suspected_of_using_div").show();
  $("#additional_descriptions_div").show();
  $("#resident_div").show();
  $("#employer_phone_div").show();
  $("#employer_address_div").show();
  $("#employer_div").show();

  $("#first_name").val("Unknown");
  $("#last_name").val("Unknown");
  $("#middle_name").val("Unknown");
  $("#dob").removeAttr("required");
  $("#dob").val("");
  $("#sex").selectpicker("val", "U");
  $("#race").selectpicker("val", "U");
  $("#ethnicity").selectpicker("val", "U");
  $("#resident").selectpicker("val", "U");
  $("#interviewed_adress").val("United States").data("selected-val", "United States");

  $("#notified").selectpicker("val", "");
  $("#date_notified").val("");
  $("#notified_by").val("");
  $("#parent_address").selectpicker("val", "");
  $("#parent_relationship").selectpicker("val", "");
  $("#parent_phone").val("");
  $("#parent_address_1").val("");
  $("#parent_relationship_1").val("");
  $("#parent_phone_1").val("");
  $("#parent_phone_1").val("");
  $("#master_name_id").val("");
  $("#search_input").data("unknown-selected", true).valid();

  $("#previous_run").selectpicker("val", "");
  $("#date_last_contact").val("");
  $("#date_emancipation").val("");
  $("#ncic_number").selectpicker("val", "");
  $("#date_entered").selectpicker("val", "");
  $("#last_wearing").val("");

  $("#marital_status").selectpicker("val", "");
  $("#birth_place").val("");
  $("#birth_state").selectpicker("val", "");
  $("#hair").selectpicker("val", "");
  $("#eye").selectpicker("val", "");
  $("#height").val("");

  if ($("#height1").hasClass("selectpicker")) {
    $("#height1").selectpicker("val", "");
  }

  if ($("#height2").hasClass("selectpicker")) {
    $("#height2").selectpicker("val", "");
  }

  $("#weight").val("");
  $("#scars").val("");
  $("#gang_affiliation").val("");
  $("#ssn").val("");
  $("#fbi").val("");
  $("#control").val("");

  $("#occupation_school").val("");
  $("#cell").val("");
  $("#other_tel").val("");
  $("#email").selectpicker("val", "");
  $("#suspected_of_using").selectpicker("val", "");
  $("#additional_descriptions").selectpicker("val", "");

  $("#employer_phone").val("");
  $("#employer_address").val("").removeData("selected-val");
  $("#employer").val("");
  $("#suspect_link").selectpicker("val", "");

  $("#ageRangeDiv").show();
  $("#dobDiv").hide();
});

//Define Search Engine
$("#arrestee_type_div .selectpicker").change(function () {
  if ($("#arrestee_type").val() == 1) {
    $("#accordion_k").hide();
    $("#accordion_p").hide();
    $("#dokuz").addClass("skip_step");
    $("#sekiz").addClass("skip_step");
    $("#notified").selectpicker("val", "");
    $("#notified_by").val("");
    $("#date_notified").val("");
    $("#parent_address").val("");
    $("#parent_relationship").val("");
    $("#parent_phone").val("");
    $("#parent_address_1").val("");
    $("#parent_relationship_1").val("");
    $("#parent_name").val("");
    $("#parent_name2").val("");
    $("#parent_phone_1").val("");
    $("#juv_disposition").selectpicker("val", "");
    $("#previous_run").selectpicker("val", "");
    $("#date_last_contact").val("");
    $("#date_emancipation").val("");
    $("#ncic_number").val("");
    $("#date_entered").val("");
    $("#last_wearing").val("");
  } else {
    $("#accordion_p").hide();
    $("#dokuz").addClass("skip_step");
  }
  if ($("#arrestee_type").val() == 2) {
    $("#accordion_k").show();
    $("#sekiz").removeClass("skip_step");
  } else {
    $("#accordion_k").hide();
    $("#sekiz").addClass("skip_step");
  }
  if ($("#arrestee_type").val() == 3) {
    $("#accordion_p").show();
    $("#dokuz").removeClass("skip_step");
  } else {
    $("#accordion_p").hide();
    $("#dokuz").addClass("skip_step");
  }
  if ($("#arrestee_type").val() == 4) {
    $("#accordion_p").show();
    $("#dokuz").removeClass("skip_step");
  }
});

///Use of Force Behaviors
$("#force_div .selectpicker").change(function () {
  if ($("#force").val() == "Y") {
    $("#accordion_uof").show();
    $("#response_div").hide();
    $("#dort1").show();
    $("#dort1").removeClass("skip_step");
  } else {
    $("#accordion_uof").hide();
    $("#dort1").hide();
    $("#dort1").addClass("skip_step");
    $("#other_ori1").selectpicker("val", "");
    $("#other_ori2").selectpicker("val", "");
    $("#other_ori3").selectpicker("val", "");
    $("#other_ori4").selectpicker("val", "");
    $("#outside_force").selectpicker("val", "");
    $("#approach").selectpicker("val", "");
    $("#ambush").selectpicker("val", "{");
    $("#contact").selectpicker("val", "");
    $("#response").selectpicker("val", "");
    $("#report").selectpicker("val", "");
    $("#consult").selectpicker("val", "");
    $("#force").selectpicker("refresh");
  }
});

var directionsDisplay, directionsService, map;
function initMapEditView() {
  var placeSearch, autocomplete;
  var componentForm = {
    street_number: "short_name",
    route: "long_name",
    neighborhood: "short_name",
    locality: "long_name",
    administrative_area_level_2: "short_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
  };
  var lati = parseFloat($("#lat").val());
  var lngi = parseFloat($("#lng").val());
  latlng = { lat: lati, lng: lngi };

  var map = new google.maps.Map(document.getElementById("map_asil"), {
    center: latlng,
    zoom: 12,
  });

  var input = document.getElementById("uc");

  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
    position: latlng,
  });

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", function () {
    marker.setVisible(false);
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    document.getElementById("lat").value = place.geometry.location.lat();
    document.getElementById("lng").value = place.geometry.location.lng();
    document.getElementById("neighborhood").value = "";

    var results2 = [];
    results2.push(JSON.stringify(place.address_components));

    var street_no;
    var route_name;
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }

    document.getElementById("addrs").value =
      document.getElementById("street_number").value + " " + document.getElementById("route").value;
    if (!document.getElementById("street_number").value) {
      document.getElementById("addrs").value = document.getElementById("uc").value;
    } else {
      document.getElementById("addrs").value =
        document.getElementById("street_number").value + " " + document.getElementById("route").value;
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    $.ajax({
      type: "POST",
      url: "../cautionPlaces",
      data: {
        pointx: place.geometry.location.lng(),
        pointy: place.geometry.location.lat(),
        check: "yes",
        adress: document.getElementById("addrs").value,
      },
      success: function (data) {
        if (data[0]) {
          $("#address_alert").empty();
          $("#address_alert").append(
            '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
              data[0].reasonFor +
              '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
          );
        }
      },
    });
  });
}

function initMap() {
  var placeSearch, autocomplete;
  var componentForm = {
    street_number: "short_name",
    route: "long_name",
    neighborhood: "short_name",
    locality: "long_name",
    administrative_area_level_2: "short_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
  };
  var latlng = new google.maps.LatLng(39.605, -84.617);
  var map = new google.maps.Map(document.getElementById("map_asil"), {
    center: latlng,
    zoom: 12,
  });

  var input = document.getElementById("uc");

  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    marker.setVisible(false);
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    document.getElementById("lat").value = place.geometry.location.lat();
    document.getElementById("lng").value = place.geometry.location.lng();
    document.getElementById("neighborhood").value = "";

    var results2 = [];
    results2.push(JSON.stringify(place.address_components));

    var street_no;
    var route_name;
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }

    if (!document.getElementById("street_number").value) {
      document.getElementById("addrs").value = document.getElementById("uc").value;
    } else {
      document.getElementById("addrs").value =
        document.getElementById("street_number").value + " " + document.getElementById("route").value;
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    $.ajax({
      type: "POST",
      url: "../cautionPlaces",
      data: {
        pointx: place.geometry.location.lng(),
        pointy: place.geometry.location.lat(),
        check: "yes",
        adress: document.getElementById("addrs").value,
      },
      success: function (data) {
        if (data[0]) {
          $("#address_alert").empty();
          $("#address_alert").append(
            '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
              data[0].reasonFor +
              '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
          );
        }
      },
    });
  });
}

function initMap_employer() {
  var placeSearch, autocomplete;

  var input = document.getElementById("employer_address");

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    $.ajax({
      type: "POST",
      url: "../cautionPlaces",
      data: {
        pointx: place.geometry.location.lng(),
        pointy: place.geometry.location.lat(),
        check: "yes",
        adress: document.getElementById("employer_address").value,
      },
      success: function (data) {
        if (data[0]) {
          $("#address_alert_employer").empty();
          $("#address_alert_employer").append(
            '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
              data[0].reasonFor +
              '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
          );
        }
      },
    });
  });
}

function initMap_suspect() {
  var placeSearch, autocomplete;
  var input = document.getElementById("interviewed_adress");

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    document.getElementById("lat2").value = place.geometry.location.lat();
    document.getElementById("lng2").value = place.geometry.location.lng();
    document.getElementById("nghbd2").value = "";

    var results3 = place.address_components;

    var street_no;
    var route_name;

    results3.map(function (e) {
      if (e.types.indexOf("locality") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("city2").value = e.long_name;
      }

      if (e.types.indexOf("neighborhood") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("nghbd2").value = e.long_name;
      }
      if (e.types.indexOf("street_number") !== -1) {
        street_no = e.long_name;
      } else if (e.types.indexOf("route") !== -1) {
        route_name = e.long_name;
        document.getElementById("addrs2").value = street_no + " " + route_name;
      }
      if (e.types.indexOf("administrative_area_level_2") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("county2").value = e.long_name;
      }
      if (e.types.indexOf("administrative_area_level_1") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("state2").value = e.short_name;
      }
      if (e.types.indexOf("country") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("country2").value = e.short_name;
      }
      if (e.types.indexOf("postal_code") !== -1) {
        document.getElementById("zip2").value = e.long_name;
      }
      $.ajax({
        type: "POST",
        url: "../cautionPlaces",
        data: {
          pointx: place.geometry.location.lng(),
          pointy: place.geometry.location.lat(),
          check: "yes",
          adress: document.getElementById("addrs2").value,
        },
        success: function (data) {
          if (data[0]) {
            $("#address_alert_addrs2").empty();
            $("#address_alert_addrs2").append(
              '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
                data[0].reasonFor +
                '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
            );
          }
        },
      });
    });
  });
}

function initMap_suspect2() {
  var placeSearch, autocomplete;
  var input = document.getElementById("interviewed_adress");

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    document.getElementById("lat21").value = place.geometry.location.lat();
    document.getElementById("lng21").value = place.geometry.location.lng();
    document.getElementById("nghbd21").value = "";

    var results3 = place.address_components;

    var street_no;
    var route_name;

    results3.map(function (e) {
      if (e.types.indexOf("locality") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("city21").value = e.long_name;
      }

      if (e.types.indexOf("neighborhood") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("nghbd21").value = e.long_name;
      }
      if (e.types.indexOf("street_number") !== -1) {
        street_no = e.long_name;
      } else if (e.types.indexOf("route") !== -1) {
        route_name = e.long_name;
        document.getElementById("addrs21").value = street_no + " " + route_name;
      }
      if (e.types.indexOf("administrative_area_level_2") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("county21").value = e.long_name;
      }
      if (e.types.indexOf("administrative_area_level_1") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("state21").value = e.short_name;
      }
      if (e.types.indexOf("country") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("country21").value = e.short_name;
      }
      if (e.types.indexOf("postal_code") !== -1) {
        document.getElementById("zip21").value = e.long_name;
      }
      $.ajax({
        type: "POST",
        url: "../cautionPlaces",
        data: {
          pointx: place.geometry.location.lng(),
          pointy: place.geometry.location.lat(),
          check: "yes",
          adress: document.getElementById("addrs21").value,
        },
        success: function (data) {
          if (data[0]) {
            $("#address_alert21").empty();
            $("#address_alert21").append(
              '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
                data[0].reasonFor +
                '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
            );
          }
        },
      });
    });
  });
}

function initMap2() {
  var placeSearch, autocomplete;

  var input = document.getElementById("owner_address");

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    document.getElementById("lat2").value = place.geometry.location.lat();
    document.getElementById("lng2").value = place.geometry.location.lng();
    document.getElementById("nghbd2").value = "";

    var street_no;
    var route_name;

    place.address_components.map(function (e) {
      if (e.types.indexOf("locality") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("city2").value = e.long_name;
      }

      if (e.types.indexOf("neighborhood") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("nghbd2").value = e.long_name;
      }
      if (e.types.indexOf("street_number") !== -1) {
        street_no = e.long_name;
      } else if (e.types.indexOf("route") !== -1) {
        route_name = e.long_name;
        document.getElementById("addrs2").value = street_no + " " + route_name;
      }
      if (e.types.indexOf("administrative_area_level_2") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("county2").value = e.long_name;
      }
      if (e.types.indexOf("administrative_area_level_1") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("state2").value = e.short_name;
      }
      if (e.types.indexOf("country") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("country2").value = e.short_name;
      }
      if (e.types.indexOf("postal_code") !== -1) {
        document.getElementById("zip2").value = e.long_name;
      }
      $.ajax({
        type: "POST",
        url: "../cautionPlaces",
        data: {
          pointx: place.geometry.location.lng(),
          pointy: place.geometry.location.lat(),
          check: "yes",
          adress: document.getElementById("addrs2").value,
        },
        success: function (data) {
          if (data[0]) {
            $("#address_alert_addrs2").empty();
            $("#address_alert_addrs2").append(
              '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
                data[0].reasonFor +
                '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
            );
          }
        },
      });
    });
  });
}

function initMap3() {
  var placeSearch, autocomplete;

  var input = document.getElementById("owner_address_log");

  if (typeof google === "undefined") return console.warn("Google Address Search library is missing");

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("Please enter a valid address");
      return;
    }
    document.getElementById("lat22").value = place.geometry.location.lat();
    document.getElementById("lng22").value = place.geometry.location.lng();
    document.getElementById("nghbd22").value = "";

    var street_no;
    var route_name;

    place.address_components.map(function (e) {
      if (e.types.indexOf("locality") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("city22").value = e.long_name;
      }

      if (e.types.indexOf("neighborhood") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("nghbd22").value = e.long_name;
      }
      if (e.types.indexOf("street_number") !== -1) {
        street_no = e.long_name;
      } else if (e.types.indexOf("route") !== -1) {
        route_name = e.long_name;
        document.getElementById("addrs22").value = street_no + " " + route_name;
      }
      if (e.types.indexOf("administrative_area_level_2") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("county22").value = e.long_name;
      }
      if (e.types.indexOf("administrative_area_level_1") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("state22").value = e.short_name;
      }
      if (e.types.indexOf("country") !== -1 && e.types.indexOf("political") !== -1) {
        document.getElementById("country22").value = e.short_name;
      }
      if (e.types.indexOf("postal_code") !== -1) {
        document.getElementById("zip22").value = e.long_name;
      }
      $.ajax({
        type: "POST",
        url: "../cautionPlaces",
        data: {
          pointx: place.geometry.location.lng(),
          pointy: place.geometry.location.lat(),
          check: "yes",
          adress: document.getElementById("addrs22").value,
        },
        success: function (data) {
          if (data[0]) {
            $("#address_alert_addrs22").empty();
            $("#address_alert_addrs22").append(
              '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
                data[0].reasonFor +
                '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
            );
          }
        },
      });
    });
  });
}

$("#victim_form").validate({
  //ignore: "input[type='text']:hidden",

  rules: {
    arrest_type: {
      required: true,
    },
    arm_codes_2: {
      required: true,
    },
    arrestee_type: {
      required: true,
    },
    victim_type: {
      required: true,
    },
    circums_officer: {
      required: true,
    },
    assingment_type: {
      required: true,
    },
    date_time: {
      required: true,
    },
    force: {
      required: true,
    },
    first_name: {
      required: true,
    },
    last_name: {
      required: true,
    },

    bir_uc: {
      required: true,
    },
    theft_codes_2: {
      required: true,
    },
    uc: {
      required: true,
    },
    race: {
      required: true,
    },
    outside_force: {
      required: true,
    },
    approach: {
      required: true,
    },
    interviewed_adress: {
      required: true,
    },
    injury_type: {
      required: true,
    },
    ambush: {
      required: true,
    },
    report: {
      required: true,
    },
    relation: {
      required: true,
    },
    contact: {
      required: true,
    },
    response: {
      required: true,
    },
    suspect_link: {
      required: true,
    },
    suspected_of_using: {
      required: true,
    },
    consult: {
      required: true,
    },
  },
});

$(".selectpicker")
  .selectpicker()
  .change(function () {
    $(this).valid();
  });

function show_divs() {
  $("#accordion2").show();
  $("#accordion_p").show();
  $("#accordion3").show();
  $("#accordion4").show();
  $("#accordion5").show();
  $("#accordion_photo").show();
  $("#accordion_n").show();
  $("#accordion_m").show();
  $("#accordion_narro").show();
  $("#gonder").show();
  $("#first_name_div").show();
  $("#middle_name_div").show();
  $("#last_name_div").show();
  $("#sakla_beni").show();
  $("#alias1_div").show();
  $("#alias2_div").show();
  $("#alias3_div").show();
  $("#dob_div").show();
  $("#race_div").show();
  $("#ethnicity_div").show();
  $("#sex_div").show();
  $("#marital_status_div").show();
  $("#birth_place_div").show();
  $("#birth_state_div").show();
  $("#hair_div").show();
  $("#eye_div").show();
  $("#height_div").show();
  $("#weight_div").show();
  $("#scars_div").show();
  $("#gang_affiliation_div").show();
  $("#ssn_div").show();
  $("#fbi_div").show();
  $("#control_div").show();
  $("#interviewed_adress_div").show();
  $("#scars_div").show();
  $("#occupation_school_div").show();
  $("#cell_div").show();
  $("#other_tell_div").show();
  $("#email_div").show();
  $("#suspected_of_using_div").show();
  $("#additional_descriptions_div").show();
  $("#resident_div").show();
  $("#employer_phone_div").show();
  $("#employer_address_div").show();
  $("#employer_div").show();
}

function fillDriverLicenseClassInput(id, classType) {
  const isInTrafficPerson = $(`${id} option[value="1"]`).length > 0;

  if (isInTrafficPerson) {
    $(id).selectpicker("val", transformDriverLicenseClassForTrafficPerson(classType) || $(id).val());
  } else {
    $(id).selectpicker("val", classType);
  }
}
