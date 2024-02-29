$("#add_record_button_info").on("click", function () {
  myPopupWin("../additional_info_database", function () {
    var timesRun = 0;
    var interval = setInterval(function () {
      timesRun += 1;
      if (timesRun === 1) {
        clearInterval(interval);
      }
      $("#additional_descriptions").empty();
      eventTypeFetch();
    }, 100);
  });
});
var add_desc = [];
var additionalDescriptionData;
function eventTypeFetch() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "../additional_info_types",
      success: function (data) {
        additionalDescriptionData = data.map((p) => p.additional_info);

        var $select;
        $select = $("select", {
          class: "selectpicker",
          "data-live-search": "true",
        });

        for (i = 0; i < data.length; i++) {
          if (i == 0) {
            add_desc.push('<optgroup class="heading_style" label="' + data[i].additional_event_group + '">');
          } else {
            if (data[i - 1].additional_event_group != data[i].additional_event_group) {
              add_desc.push("</optgroup>");
              add_desc.push('<optgroup class="heading_style" label="' + data[i].additional_event_group + '">');
            }
          }

          add_desc.push(
            '<option class="option25" value="' + data[i].additional_info + '">' + data[i].additional_info + "</option>"
          );

          if (i == data.length - 1) {
            add_desc.push("</optgroup>");
          }
        }
        $(".selectpicker").selectpicker();
        var div = document.getElementById("additional_descriptions");
        div.innerHTML += add_desc;
        $("#additional_descriptions").selectpicker("refresh");

        resolve();
      },
      error: reject,
    });
  });
}

var additionalDescriptionPromise = eventTypeFetch();
