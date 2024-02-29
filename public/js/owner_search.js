//Define Search Business Engine
var movies_business = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    dataType: "jsonp",
    url: "../search_business?key=%QUERY",
    filter: function (movies_business) {
      // Map the remote source JSON array to a JavaScript object array
      return $.map(movies_business, function (movie_business) {
        return {
          value: movie_business.business_name2 + ", " + movie_business.Address2,
          values: [
            {
              business_name: movie_business.business_name2,
              primary_phone: movie_business.primary_phone,
              Address2: movie_business.Address2,
              Address: movie_business.Address,
              additional_descriptions: movie_business.additional_descriptions,
              master_business_id: movie_business.master_business_id,
              business_city: movie_business.city,
              business_zip_code: movie_business.zip_code,
              business_state: movie_business.state,
              pointx: movie_business.PointX,
              pointy: movie_business.PointY,
            },
          ],
          values2: movies_business,
        };
      });
    },
  },
});

// Initialize the Bloodhound suggestion engine
movies_business.initialize();

// Instantiate the Typeahead UI
$("#name_search2 .typeahead").typeahead(null, {
  displayKey: "value",
  source: movies_business.ttAdapter(),
});

$("#search_input2").on("keyup", function () {
  var name_check2 = $("#search_input2").val();
  if (name_check2.length <= 1) {
    $("#search_input2").removeClass("selected highlight");
    $("#business_name").val("");
    $("#master_business_id").val("");
    $("#business_id").val("");
    $("#business_city").val("");
    $("#business_state").val("");
    $("#business_zip_code").val("");
    $("#interviewed_adress").val("");
  }
});

$("#name_search2 .typeahead").on("typeahead:selected", function (e, datum) {
  //alert(datum[0].primary_phone)
  $("#business_name").val(datum.values[0].business_name);
  $("#master_business_id").val(datum.values[0].master_business_id);
  $("#commercial_carrier").val(datum.values[0].business_name);
  $("#interviewed_adress").val(datum.values[0].Address);
  $("#commercial_phone").val(datum.values[0].primary_phone);
  $("#business_address").val(datum.values[0].Address);
  $("#business_id").val(datum.values[0].master_business_id);
  $("#business_city").val(datum.values[0].business_city);
  $("#business_state").val(datum.values[0].business_state);
  $("#business_zip_code").val(datum.values[0].business_zip_code);
  $("#lat2").val(datum.values[0].pointy);
  $("#lng2").val(datum.values[0].pointx);
  $("#business_name_div").show();

  var name_check = document.getElementById("business_name").value;
  data_pass = true;
  if (name_check.length >= 1) {
    $("#search_input2").addClass("selected highlight");
    $("#name_search2").show();
  } else {
    $("#name_search2").hide();

    $("#business_name").val("");
  }
});

$("#master_name2").on("click", function () {
  myPopupWin("../business_name/addMaster_", function () {
    setTimeout(function () {
      $.ajax({
        url: "../business_name_append",
        type: "get",
        //dataType: 'json',
        success: function (data) {
          if (!data) return;

          search_input_valid = true;

          $("#business_name_div").show();
          setFormDirty();
          $("#commercial_carrier").val(data[0].business_name);
          $("#commercial_phone").val(data[0].primary_phone);
          $("#business_name").val(data[0].business_name);
          $("#master_business_id").val(data[0].master_business_id);
          $("#interviewed_adress").val(data[0].Address);
          $("#business_address").val(data[0].Address);
          $("#business_id").val(data[0].master_business_id);
          $("#business_city").val(data[0].City);
          $("#business_state").val(data[0].State);
          $("#business_zip_code").val(data[0].zip_code);
          $("#lat2").val(data[0].PointY);
          $("#lng2").val(data[0].PointX);
          $("#business_name_div").show();

          $("#search_input2").val(data[0].business_name + " " + data[0].Address2);
        },
      });
    }, 750);
    var timesRun = 0;
    var interval = setInterval(function () {
      timesRun += 1;
      if (timesRun === 1) {
        clearInterval(interval);
      }
    }, 100);
  });
});
