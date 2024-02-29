var color_code = [
  { value: "AME", label: "Amethyst (Purple)" },
  { value: "BGE", label: "Beige" },
  { value: "BLK", label: "Black" },
  { value: "BLU", label: "Blue" },
  { value: "BRO", label: "Brown" },
  { value: "BRZ", label: "Bronze" },
  { value: "CAM", label: "Camouflage" },
  { value: "COM", label: "Chrome" },
  { value: "CPR", label: "Copper" },
  { value: "CRM", label: "Cream" },
  { value: "DBL", label: "Blue, Dark" },
  { value: "DGR", label: "Green, Dark" },
  { value: "GLD", label: "Gold" },
  { value: "GRN", label: "Green" },
  { value: "GRY", label: "Gray" },
  { value: "LAV", label: "Lavender (Purple)" },
  { value: "LBL", label: "Blue, Light" },
  { value: "LGR", label: "Green, Light" },
  { value: "MAR", label: "Burgundy (Purple)" },
  { value: "MUL", label: "Multicolored" },
  { value: "MVE", label: "Mauve (Purple)" },
  { value: "ONG", label: "Orange" },
  { value: "PLE", label: "Purple" },
  { value: "PNK", label: "Pink" },
  { value: "RED", label: "Red" },
  { value: "SIL", label: "Silver" },
  { value: "TAN", label: "Tan" },
  { value: "TEA", label: "Teal (Green)" },
  { value: "TPE", label: "Taupe (Brown)" },
  { value: "TRQ", label: "Turquoise (Blue)" },
  { value: "UNK", label: "Unknown" },
  { value: "WHI", label: "White" },
  { value: "YEL", label: "Yellow" },
];

var color_a = $("#color");
//a.append(' <option class="option" value="" style="margin-top: 0px;">Unknown</option>');
for (iw = 0; iw < color_code.length; iw++) {
  color_a.append('<option class="option25" value="' + color_code[iw].value + '">' + color_code[iw].label + "</option>");
}
$(".selectpicker").selectpicker();

$("#master_name_vehicle").click(function () {
  const link = generateLink("master_vehicle", "add");
  myPopupWin(link, function () {
    setTimeout(function () {
      $.ajax({
        url: "../master_vehicle_append",
        type: "get",
        success: function (datum) {
          search_input_valid = true;
          $("#search_input_vehicle").addClass("selected highlight");
          $("#vehicle_id").val(datum[0].vehicle_id);
          $("#search_input_vehicle")
            .val(
              datum[0].lp_plate_number +
                "--" +
                datum[0].lp_VIN +
                " -- " +
                datum[0].vehicle_year +
                " " +
                datum[0].vehicle_make +
                " " +
                datum[0].vehicle_model +
                " " +
                datum[0].vehicle_color
            )
            .removeData("unknown-selected")
            .valid();
          $("#name_hide_vehicle").show();
          $("#lp_state").selectpicker("val", datum[0].lp_state);
          $("#reg_state").selectpicker("val", datum[0].lp_state);
          $("#lp_no").val(datum[0].lp_plate_number);
          $("#plate").val(datum[0].lp_plate_number);
          $("#vin").val(datum[0].lp_VIN);
          $("#vehicle_VIN").val(datum[0].lp_VIN);
          $("#reg_year").val(datum[0].register_year);
          $("#veh_year").val(datum[0].vehicle_year);
          if ($("#veh_make").hasClass("do-not-fill-from-vehicle-search") == false)
            $("#veh_make").val(datum[0].vehicle_make);
          $("#make").val(datum[0].vehicle_make);
          if ($("#veh_model").hasClass("do-not-fill-from-vehicle-search") == false)
            $("#veh_model").val(datum[0].vehicle_model);
          $("#model").val(datum[0].vehicle_model);
          $("#color").val(datum[0].vehicle_color);
          $("#color.selectpicker").selectpicker("refresh");
          $("#insurance").selectpicker("val", datum[0].insurance_verified);
          $("#in_company").val(datum[0].insurance_company);
          $("#in_number").val(datum[0].insurance_policy_no);
          $("#type_use").selectpicker("val", datum[0].type_of_use);
          $("#us_dot").val(datum[0].US_DOT_no);
          $("#veh_weight").selectpicker("val", datum[0].vehicle_weight);
          $("#towed_by").val(datum[0].towed_by);
          $("#towed_address").val(datum[0].towed_address).data("selected-val", datum[0].towed_address);
          if ($("#towed_address").length > 0) {
            $("#towed_address").valid();
          }
          $("#interlock").selectpicker("val", datum[0].interlock_equipped_device);
          $("#hazardous").selectpicker("val", datum[0].hazadous_material);
          $("#class1").val(datum[0].class_no);
          $("#class1.selectpicker").selectpicker("refresh");
          $("#placard").val(datum[0].placard_id);
          $("#unit_type_1").selectpicker("val", datum[0].unit_type);
          $("#trailing").val(datum[0].number_of_trailing_units);
          $("#special").selectpicker("val", datum[0].special_function_level);
          $("#cargo").val(datum[0].cargo_body_type);
          $("#veh_defects").selectpicker("val", datum[0].vehicle_defects);

          $("#cautious2").empty();
          $("#search_input_car").val("");

          if (datum.values[0].cautious == "yes") {
            $("#cautious2").append(
              '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
                datum[0].cautious_notes +
                '" data-target="#edit" data-title"">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Cautioun Indicator</button>'
            );

            $.ajax({
              type: "POST",
              url: "../cautious_email_vehicle",
              data: {
                email: datum[0].email_notes,
                plate_no: datum[0].lp_plate_number,
                vin_no: datum[0].lp_VIN,
                make: datum[0].vehicle_make,
                model: datum[0].vehicle_model,
                year: datum[0].vehicle_year,
                color: datum[0].vehicle_color,
              },
              success: function (data) {},
            });
          }

          var name_check_vehicle = document.getElementById("veh_year").value;
          if (name_check_vehicle.length >= 1) {
            $("#search_input_vehicle").addClass("selected highlight");
            $("#name_hide_vehicle").show();
          } else {
            $("name_hide_vehicle").hide();
          }
        },
      });
    }, 1200);

    var timesRun = 0;
    var interval = setInterval(function () {
      timesRun += 1;
      if (timesRun === 1) {
        clearInterval(interval);
      }
    }, 100);
  });
});

//////Define Vehicle Search
$("#unknown_vehicle").click(function () {
  $("#vehicle_id").val("unknown");
  $("#search_input_vehicle").removeAttr("required").data("unknown-selected", true).valid();

  $("#color").removeAttr("required");
  $("#lp_state").removeAttr("required");
  $("#name_hide_vehicle").show();
  $("#lp_state").selectpicker("val", "none");
  $("#lp_no").val("Unknown");
  $("#search_input_vehicle").val("Unknown");
  $("#search_input_car").val("Unknown");
  $("#veh_year").val("Unknown");
  $("#veh_make").val("unknown");
  $("#veh_model").val("unknown");
  $("#color").val("Unknown");
  $("#color").val("Unk");
  $("#color.selectpicker").selectpicker("refresh");
  $("#vin").val("unknown");
  $("#lp_state").selectpicker("val", "Unk");
  $("#vehicle_defects").selectpicker("val", "");
});
//Define Search Engine
var movies_vehicle = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    dataType: "jsonp",
    url: "../search_vehicle?key=%QUERY",
    filter: function (movies_vehicle) {
      return $.map(movies_vehicle, function (movie) {
        return {
          value:
            movie.lp_plate_number +
            "--" +
            movie.lp_VIN +
            " -- " +
            movie.vehicle_year +
            " " +
            movie.vehicle_make +
            " " +
            movie.vehicle_model +
            " " +
            movie.vehicle_color,
          values: [
            {
              first_name: movie.owner_first_name,
              last_name: movie.owner_last_name,
              date_of_birth: movie.owner_dob,
              Address2: movie.owner_address,
              middle_name: movie.owner_middle_name,
              sex: movie.owner_sex,
              race: movie.owner_race,
              cell_phone: movie.owner_phone,
              work_tel: movie.commercial_phone,
              employer: movie.commercial_carrier,
              owner_lat: movie.owner_lat,
              owner_lng: movie.owner_lng,
              lp_state: movie.lp_state,
              lp_plate_number: movie.lp_plate_number,
              lp_VIN: movie.lp_VIN,
              vehicle_year: movie.vehicle_year,
              vehicle_make: movie.vehicle_make,
              insurance_verified: movie.insurance_verified,
              insurance_company: movie.insurance_company,
              insurance_policy_no: movie.insurance_policy_no,
              vehicle_color: movie.vehicle_color,
              vehicle_model: movie.vehicle_model,
              type_of_use: movie.type_of_use,
              US_DOT_no: movie.US_DOT_no,
              vehicle_weight: movie.vehicle_weight,
              towed_by: movie.towed_by,
              towed_address: movie.towed_address,
              interlock_equipped_device: movie.interlock_equipped_device,
              hazadous_material: movie.hazadous_material,
              class_no: movie.class_no,
              placard_id: movie.placard_id,
              cargo_body_type: movie.cargo_body_type,
              vehicle_defects: movie.vehicle_defects,
              vehicle_id: movie.vehicle_id,
              unit_type: movie.unit_type,
              number_of_trailing_units: movie.number_of_trailing_units,
              special_function_level: movie.special_function_level,
              register_year: movie.register_year,
              cautious: movie.cautious,
              cautious_notes: movie.cautious_notes,
              email_notes: movie.email_notes,
            },
          ],
          values2: movies_vehicle,
        };
      });
    },
  },
  limit: 20,
});

// Initialize the Bloodhound suggestion engine
movies_vehicle.initialize();

// Instantiate the Typeahead UI
$("#name_search_vehicle .typeahead").typeahead(null, {
  displayKey: "value",
  source: movies_vehicle.ttAdapter(),
});

//Control the Divs Based on Search Input Length
$("#search_input_vehicle").on("keyup", function () {
  name_check2 = $("#search_input_vehicle").val();
  if (name_check2.length <= 1) {
    $("#vehicle_id").val("");
    $("#search_input_vehicle").removeClass("selected highlight").removeData("unknown-selected").valid();
    $("#name_hide_vehicle").hide();

    //$('#commercial_carrier').val("");
    //$('#commercial_phone').val("");
    $("#lp_state").val("");
    $("#lp_no").val("");
    $("#vin").val("");
    $("#veh_year").val("");
    $("#veh_make").val("");
    $("#veh_model").val("");
    $("#color").val("");
    $("#insurance").val("");
    $("#in_company").val("");
    $("#in_number").val("");
    $("#plate").val("");
    $("#type_use").val("");
    $("#us_dot").val("");
    $("#veh_weight").val("");
    $("#towed_by").val("");
    $("#towed_address").val("").removeData("selected-val");
    $("#interlock").val("");
    $("#hazardous").val("");
    $("#class1").val("");
    $("#placard").val("");
    $("#unit_type_1").val("");
    $("#trailing").val("");
    $("#special").val("");
    $("#cargo").val("");
    $("#veh_defects").val("");

    $("#search_input_car").val("");
  } else {
    if (name_check2.toLowerCase() === "unknown") {
      if ($("#unknown_vehicle").length > 0) {
        $.alert("Warning: If the vehicle is unknown, please click on the unknown button");
      }
    }
  }
});

$("#name_search_vehicle .typeahead").on("typeahead:selected", function (e, datum) {
  $("#vehicle_id").val(datum.values[0].vehicle_id);
  $("#search_input_vehicle")
    .val(
      datum.values[0].lp_plate_number +
        "--" +
        datum.values[0].lp_VIN +
        " -- " +
        datum.values[0].vehicle_year +
        " " +
        datum.values[0].vehicle_make +
        " " +
        datum.values[0].vehicle_model +
        " " +
        datum.values[0].vehicle_color
    )
    .removeData("unknown-selected")
    .valid();
  $("#name_hide_vehicle").show();
  $("#lp_state").selectpicker("val", datum.values[0].lp_state);
  $("#reg_state").selectpicker("val", datum.values[0].lp_state);
  $("#lp_no").val(datum.values[0].lp_plate_number);
  $("#plate").val(datum.values[0].lp_plate_number);
  $("#vin").val(datum.values[0].lp_VIN);
  $("#vehicle_VIN").val(datum.values[0].lp_VIN);
  $("#reg_year").val(datum.values[0].register_year);
  $("#veh_year").val(datum.values[0].vehicle_year);
  if ($("#veh_make").hasClass("do-not-fill-from-vehicle-search") == false)
    $("#veh_make").val(datum.values[0].vehicle_make);
  $("#make").val(datum.values[0].vehicle_make);
  if ($("#veh_model").hasClass("do-not-fill-from-vehicle-search") == false)
    $("#veh_model").val(datum.values[0].vehicle_model);
  $("#model").val(datum.values[0].vehicle_model);
  $("#color").val(datum.values[0].vehicle_color);
  $("#color.selectpicker").selectpicker("refresh");
  $("#insurance").selectpicker("val", datum.values[0].insurance_verified);
  $("#in_company").val(datum.values[0].insurance_company);
  $("#in_number").val(datum.values[0].insurance_policy_no);
  $("#type_use").selectpicker("val", datum.values[0].type_of_use);
  $("#us_dot").val(datum.values[0].US_DOT_no);
  $("#veh_weight").selectpicker("val", datum.values[0].vehicle_weight);
  $("#towed_by").val(datum.values[0].towed_by);
  $("#towed_address").val(datum.values[0].towed_address).data("selected-val", datum.values[0].towed_address);
  if ($("#towed_address").length > 0) {
    $("#towed_address").valid();
  }
  $("#interlock").selectpicker("val", datum.values[0].interlock_equipped_device);
  $("#hazardous").selectpicker("val", datum.values[0].hazadous_material);
  $("#class1").val(datum.values[0].class_no);
  $("#class1.selectpicker").selectpicker("refresh");
  $("#placard").val(datum.values[0].placard_id);
  $("#unit_type_1").selectpicker("val", datum.values[0].unit_type);
  $("#trailing").val(datum.values[0].number_of_trailing_units);
  $("#special").selectpicker("val", datum.values[0].special_function_level);
  $("#cargo").val(datum.values[0].cargo_body_type);
  $("#veh_defects").selectpicker("val", datum.values[0].vehicle_defects);

  $("#cautious2").empty();
  $("#search_input_car").val("");

  if (datum.values[0].cautious == "yes") {
    $("#cautious2").append(
      '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
        datum.values[0].cautious_notes +
        '" data-target="#edit" data-title"">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Cautioun Indicator</button>'
    );

    $.ajax({
      type: "POST",
      url: "../cautious_email_vehicle",
      data: {
        email: datum.values[0].email_notes,
        plate_no: datum.values[0].lp_plate_number,
        vin_no: datum.values[0].lp_VIN,
        make: datum.values[0].vehicle_make,
        model: datum.values[0].vehicle_model,
        year: datum.values[0].vehicle_year,
        color: datum.values[0].vehicle_color,
      },
      success: function (data) {},
    });
  }

  var name_check_vehicle = document.getElementById("veh_year").value;
  if (name_check_vehicle.length >= 1) {
    $("#search_input_vehicle").addClass("selected highlight");
    $("#name_hide_vehicle").show();
  } else {
    $("name_hide_vehicle").hide();
  }
});
