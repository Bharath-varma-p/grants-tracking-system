//Define Search Engine
var movies_car = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    dataType: "jsonp",
    url: "../search_car?key=%QUERY",
    filter: function (movies_car) {
      return $.map(movies_car, function (movie) {
        return {
          value: movie.vehicle_make + "--" + movie.vehicle_model,
          values: [
            {
              make: movie.vehicle_make,
              model: movie.vehicle_model,
            },
          ],
          values2: movies_car,
        };
      });
    },
  },
  limit: 200,
});

// Initialize the Bloodhound suggestion engine
movies_car.initialize();

// Instantiate the Typeahead UI
$("#name_search_car .typeahead").typeahead(null, {
  displayKey: "value",
  source: movies_car.ttAdapter(),
});

//Control the Divs Based on Search Input Length
$("#search_input_car").on("keyup", function () {
  name_check2 = $("#search_input_car").val();
  if (name_check2.length <= 1) {
    $("#search_input_car").removeClass("selected highlight");
    $("#name_hide_car").hide();
    $("#veh_make").val("");
    $("#veh_model").val("");
    $("#veh_make_cd").val("");
    $("#veh_model_cd").val("");
  }
});

$("#name_search_car .typeahead").on("typeahead:selected", function (e, datum) {
  $("#search_input_car").val(datum.values[0].make + "--" + datum.values[0].model);
  $("#veh_make").val(datum.values[0].make);
  $("#make").val(datum.values[0].make);
  $("#veh_model").val(datum.values[0].model);
  $("#model").val(datum.values[0].model);
});
