function tow_status_fill(tow_no) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "../get_status_history",
      async: true,
      data: {
        tow_no: tow_no,
      },
      success: function (last_status) {
        var selectable = $("#status_select");
        let index = last_status[0] ? last_status[0].status_type : -1;
        let total = last_status[0] ? last_status[0].status_type : -1;
        for (i = 6; i > total; i--) {
          index = index + 1;
          switch (index) {
            case 0:
              lastStatus = "Destination Arrival (Police Team)";
              break;
            case 1:
              lastStatus = "Tow Truck Called";
              break;
            case 2:
              lastStatus = "Tow Truck Arrived";
              break;
            case 3:
              lastStatus = "Car Towed";
              break;
            case 4:
              lastStatus = "Car Parked";
              break;
            case 5:
              lastStatus = "Not Paid Impound";
              break;
            case 6:
              lastStatus = "Paid Impound";
              break;
            default:
              break;
          }

          selectable.append('<option value="' + index + '">' + lastStatus + "</option>");
        }
        selectable.selectpicker("refresh");

        resolve(last_status);
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}
