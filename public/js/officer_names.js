function officer_namesFill() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/" + globalVariables.routLink + "employees_getdata",
      async: true,
      success: function (employees) {
        var a = $("#officer_first");
        var b = $("#assist_officer");
        var c = $("#entered_by");
        var d = $("select.officers");
        for (i = 0; i < employees.length; i++) {
          var badgeForOfOfficer;
          if (employees[i].employee_badge) {
            badgeForOfOfficer = " - " + employees[i].employee_badge;
          } else {
            badgeForOfOfficer = "";
          }
          a.append(
            '<option badgeNo="' +
              employees[i].employee_badge +
              '" username="' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              '" value="' +
              employees[i].id +
              '">' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              badgeForOfOfficer +
              "</option>"
          );
          b.append(
            '<option username="' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              '" value="' +
              employees[i].id +
              '">' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              badgeForOfOfficer +
              "</option>"
          );
          c.append(
            '<option username="' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              '" value="' +
              employees[i].id +
              '">' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              badgeForOfOfficer +
              "</option>"
          );
          d.append(
            '<option badgeNo="' +
              employees[i].employee_badge +
              '" username="' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              '" value="' +
              employees[i].id +
              '">' +
              employees[i].last_name +
              ", " +
              employees[i].first_name +
              badgeForOfOfficer +
              "</option>"
          );
        }
        a.selectpicker("refresh");
        b.selectpicker("refresh");
        c.selectpicker("refresh");
        d.selectpicker("refresh");

        resolve(employees);
        flag = true;
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}

function audit_officers() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/" + globalVariables.routLink + "audit_officers_getdata",
      async: true,
      success: function (officers) {
        var elements = document.getElementsByClassName("officer-usernames");
        for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
          let element = elements[elementIndex];
          if (element.tagName === "SELECT") {
            for (i = 0; i < officers.length; i++) {
              var badgeForOfOfficer;
              if (officers[i].employee_badge) {
                badgeForOfOfficer = " - " + officers[i].employee_badge;
              } else {
                badgeForOfOfficer = "";
              }
              if (officers[i].username) {
                var option = document.createElement("option");
                option.setAttribute("badgeNo", officers[i].employee_badge || "");
                option.setAttribute("username", officers[i].last_name + ", " + officers[i].first_name);
                option.setAttribute("value", officers[i].username);
                if (element.classList.contains("officer-emails")) {
                  option.setAttribute("email", officers[i].email);

                  option.textContent =
                    officers[i].last_name + ", " + officers[i].first_name + " (" + officers[i].email + ")";
                } else {
                  option.textContent =
                    officers[i].last_name + ", " + officers[i].first_name + " (" + officers[i].username + ")";
                }

                element.appendChild(option);
              }
            }
          }
        }
        $(".officer-usernames").selectpicker("refresh");

        resolve(officers);
        flag = true;
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}

$("#officer_first").change(function () {
  var slecteditem = $(this).find("option:selected").attr("username");
  var slecteditem2 = $(this).find("option:selected").attr("badgeNo");
  document.getElementById("username").value = slecteditem;
  document.getElementById("badge").value = slecteditem2;
});

$("#assist_officer").change(function () {
  var targets = [];
  var targets2 = [];
  $.each($(this).find("option:selected"), function () {
    targets2.push($(this).attr("username"));
  });
  $.each($(this).find("option:selected"), function () {
    targets.push($(this).val());
  });
  document.getElementById("assist_officerList").value = targets2;
  document.getElementById("assist_officer_1").value = targets;
});
$("#entered_by").change(function () {
  var slecteditem = $(this).find("option:selected").attr("username");
  document.getElementById("enteredBy").value = slecteditem;
});
