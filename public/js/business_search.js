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
          value:
            (movie_business.business_name2 ? movie_business.business_name2 + ", " : "") +
            (movie_business.Address2 ? movie_business.Address2 + " " : ""),
          values: [
            {
              business_name: movie_business.business_name2,
              primary_phone: movie_business.primary_phone,
              Address2: movie_business.Address2,
              additional_descriptions: movie_business.additional_descriptions,
              master_business_id: movie_business.master_business_id,
            },
          ],
          values2: movies_business,
        };
      });
    },
  },
  limit: 20,
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
    $("#business_name").val("");
    $("#master_business_id").val("");
    $("#search_input2").removeClass("selected highlight").valid();
    $("#business_name_div").hide();
  }
});

$("#name_search2 .typeahead").on("typeahead:selected", function (e, datum) {
  $("#business_name").val(datum.values[0].business_name);
  $("#master_business_id").val(datum.values[0].master_business_id);
  $("#business_address").val(datum.values[0].Address2);
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
  $("#search_input2").valid();
});

$("#master_name2").click(function () {
  //function business_search() {

  myPopupWin("../business_name/addMaster_", function () {
    setTimeout(function () {
      $.ajax({
        url: "../business_name_append",
        type: "get",
        //dataType: 'json',
        success: function (data) {
          search_input_valid = true;

          $("#business_name_div").show();
          setFormDirty();
          $("#business_name").val(data[0].business_name);
          $("#business_address").val(data[0].Address2);
          $("#master_business_id").val(data[0].master_business_id);
          $("#search_input2")
            .val(data[0].business_name + " " + data[0].Address2)
            .valid();
        },
      });
    }, 750);
  });
});

/*

$("#name_search2").click(function () {
  business_search();
});
*/
