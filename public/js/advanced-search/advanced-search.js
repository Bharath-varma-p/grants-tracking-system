class AdvancedSearch {
  constructor(options) {
    this.table = options.table;
    this.afterSearchCallback = options.afterSearchCallback;
    this.fillSearchFields = options.fillSearchFields;
    this.openDefault = options.openDefault;
    this.applyDefaults = options.applyDefaults;
    this.reloadWithoutSearchParams = options.reloadWithoutSearchParams ?? true;

    if (!this.searchFieldFilled) {
      this.searchFieldFilled = true;
      this.fillSearchFields && this.fillSearchFields();
    }

    if (options.openDefault) {
      $("#open_advanced_search").click();
    }
  }

  refreshTable() {
    $("#loading-screen").show();
    this.table.ajax.reload(() => {
      $("#loading-screen").hide();
    });
  }

  static sendAdvancedSearchValues(serverParams) {
    serverParams.push({ name: "search_fields", value: searchFields.join("|") });
    serverParams.push({ name: "search_values", value: searchValues.join("|") });
    serverParams.push({
      name: "search_categories",
      value: searchCategories.join("|"),
    });
    serverParams.push({ name: "apply_search", value: applySearch });
  }
}

var searchFields = [];
var searchValues = [];
var searchCategories = [];
var applySearch = 0;
var advancedSearch;

const filterSearchFields = () => {
  const search_val = $("#filter_search_fields").val().toLowerCase();

  let isFound = false;

  $("#search_fields_container .form-group:not(.button_container)").each(function () {
    if ($(this).find("label").eq(0).text().toLowerCase().includes(search_val)) {
      $(this).show();
      isFound = true;
    } else $(this).hide();
  });

  if (isFound) {
    $("#search_fields_container .button-container").show();
  } else $("#search_fields_container .button-container").hide();
};

function resetAdvancedSearchFields() {
  $("#advanced_search_fields input").val("");
  $("#advanced_search_fields .selectpicker").val("default").selectpicker("refresh");

  if (advancedSearch?.applyDefaults) {
    advancedSearch.applyDefaults();
    $("#advanced_search_fields .selectpicker").selectpicker("refresh");
  }

  searchFields = [];
  searchValues = [];
  searchCategories = [];
  applySearch = 0;
}

function getSearchValues() {
  $("#advanced_search_fields input, #advanced_search_fields select").each(function (i, search_input) {
    var search_value = $(search_input).val();

    if (search_value) {
      const id = $(search_input).attr("id");

      if (id === "charge") {
        const orc = $(search_input).find("option:selected").eq(0).attr("ek_code3");
        const local_code = $(search_input).find("option:selected").eq(0).attr("local_code");

        searchFields.push("orc");
        searchValues.push(orc);
        searchCategories.push($(search_input).attr("data-category"));

        searchFields.push("local_code");
        searchValues.push(local_code);
        searchCategories.push($(search_input).attr("data-category"));
      } else {
        searchFields.push($(search_input).attr("id"));

        searchValues.push(search_value);

        searchCategories.push($(search_input).data("category"));
      }
    }
  });
}

$(function () {
  $("#search_criterias_header").click(function () {
    $("#search_fields_accordion").toggle();
  });

  $("#open_advanced_search").click(function () {
    $("#advanced_search_fields").show();
    $("#open_advanced_search").hide();
    $("#close_advanced_search").show();
    $("#reset_advanced_search").show();
  });

  if (advancedSearch?.openDefault) {
    $("#open_advanced_search").click();
  }

  $("#close_advanced_search").click(function () {
    $("#advanced_search_fields").hide();
    $("#open_advanced_search").show();
    $("#close_advanced_search").hide();
    $("#reset_advanced_search").hide();
  });

  $("#reset_advanced_search").click(function () {
    if (!advancedSearch?.openDefault) {
      $("#advanced_search_fields").hide();
      $("#open_advanced_search").show();
      $("#close_advanced_search").hide();
      $("#reset_advanced_search").hide();
    }

    resetAdvancedSearchFields();
    if (advancedSearch?.reloadWithoutSearchParams) {
      advancedSearch.refreshTable();
    } else {
      advancedSearch?.table.clear().draw();
    }
  });

  $("#search_button").on("click", function () {
    searchFields = [];
    searchValues = [];
    searchCategories = [];

    getSearchValues();

    applySearch = 1;

    advancedSearch.refreshTable();

    advancedSearch.afterSearchCallback && advancedSearch.afterSearchCallback();
  });

  let filterFieldsTimeout;

  $("#filter_search_fields")
    .on("click", (e) => e.stopPropagation())
    .on("input", () => {
      if (filterFieldsTimeout) clearTimeout(filterFieldsTimeout);

      filterFieldsTimeout = setTimeout(filterSearchFields, 500);
    });

  $("#reset_search_filter").on("click", (e) => {
    e.stopPropagation();
    $("#filter_search_fields").val("");
    resetAdvancedSearchFields();
    filterSearchFields();
    advancedSearch.refreshTable();
  });

  $(".advanced-search-date-short").datetimepicker({
    format: "MM/DD/YYYY",
  });

  $(".advanced-search-date-long").datetimepicker({
    format: "MM/DD/YYYY HH:mm",
  });
});
