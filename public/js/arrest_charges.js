var larceny_checking;
$("#bir_div .selectpicker").change(function () {
  larceny_checking = 0;
  var targets = [];
  $.each($(this).find("option:selected"), function () {
    targets.push($(this).val());
  });
  document.getElementById("charge_list").value = targets;

  targets.forEach(function (d) {
    if (d.startsWith("2913.02")) {
      larceny_checking = 1;
    }
  });
  if (larceny_checking == 1) {
    $("#theft_codes_div").show();
  }
  if (larceny_checking == 0) {
    $("#theft_codes_div").hide();
    $("#theft_codes").val("").selectpicker("refresh");
  }
});

$("#arrestee_type_div .selectpicker").change(function () {
  if ($("#arrestee_type").val() == 2) {
    $("#accordion_k").show();
    $("#sekiz").show();
    $("#sekiz").removeClass("skip_step");
  } else {
    $("#accordion_k").hide();
    $("#sekiz").hide();
    $("#sekiz").addClass("skip_step");
  }

  if ($("#arrestee_type").val() == 3) {
    $("#accordion_p").show();
    $("#dokuz").show();
    $("#dokuz").removeClass("skip_step");
  } else {
    $("#accordion_p").hide();
    $("#dokuz").hide();
    $("#dokuz").addClass("skip_step");
  }

  if ($("#arrestee_type").val() == 4) {
    $("#accordion_p").show();
    $("#dokuz").show();
  }

  if ($("#arrestee_type").val() == 5) {
    $("#name_search").hide();
    $("#sakla_beni").hide();
    $("#search_input").val("").removeClass("selected highlight");
    $("#business_div").show();
    $("#alti").addClass("skip_step");
    $("#onbir").addClass("skip_step");

    $("#employer_div").hide();
    $("#resident_div").hide();
    $("#employer_phone_div").hide();
    $("#google_search_employer").hide();
    $("#occupation_school_div").hide();
    $("#cell_div").hide();
    $("#other_tell_div").hide();
    $("#email_div").hide();

    $("#ssn_div").hide();
    $("#fbi_div").hide();
    $("#control_div").hide();
    $("#gang_affiliation_div").hide();
  } else {
    $("#name_search").show();
    $("#business_div").hide();
    $("#business_name_div").hide();
    $("#search_input2").val("").removeClass("selected highlight");
    $("#alti").removeClass("skip_step");
    $("#onbir").removeClass("skip_step");

    $("#ssn_div").show();
    $("#fbi_div").show();
    $("#control_div").show();
    $("#gang_affiliation_div").show();
  }
});

$("#contact_div .selectpicker").change(function () {
  if ($("#contact").val() == "01" || $("#contact").val() == "02") {
    $("#response_div").show();
  } else {
    $("#response_div").hide();
    $("#response").selectpicker("val", "");
  }
});
