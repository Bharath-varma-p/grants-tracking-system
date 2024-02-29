var arrHead = new Array();
arrHead = ["", "Option"]; // table headers.
// function to add new row.
function addRow() {
  $("#bucketTable").append(
    '<tr style="background-color:' +
      color +
      ';"><td class="removeRemove" onclick="removeRow(this)" style="color:#3385ff; width:50%">Remove</td><td style="width:50%" contenteditable="true">Change this</td></tr>'
  );
}
function addRow2() {
  $("#bucketTable2").append(
    '<tr style="background-color:' +
      color +
      ';"><td class="removeRemove" onclick="removeRow2(this)" style="color:#3385ff; width:50%">Remove</td><td style="width:50%" contenteditable="true">Change this</td></tr>'
  );
}

function addRow3() {
  $("#bucketTable3").append(
    '<tr style="background-color:' +
      color +
      ';"><td class="removeRemove" onclick="removeRow3(this)" style="color:#3385ff; width:50%">Remove</td><td style="width:50%" contenteditable="true">Change this</td></tr>'
  );
}

function addRow4() {
  $("#bucketTable4").append(
    '<tr style="background-color:' +
      color +
      ';"><td class="removeRemove" onclick="removeRow4(this)" style="color:#3385ff; width:50%">Remove</td><td style="width:50%" contenteditable="true">Change this</td></tr>'
  );
}

function addRowOtherFeeType() {
  $("#bucketTableOtherFeeType").append(
    '<tr style="background-color:' +
      color +
      ';"><td class="removeRemove" onclick="removeRowOtherFeeType(this)" style="color:#3385ff;">Remove</td><td contenteditable="true">Change this</td><td contenteditable="true">Change this</td></tr>'
  );
}

Bucket = [];
// function to delete a row.
function removeRow(oButton) {
  $(document).on("click", "#bucketTable .removeRemove", function (e) {
    $(this).closest("tr").remove();
  });
}
function removeRow2(oButton) {
  $(document).on("click", "#bucketTable2 .removeRemove", function (e) {
    $(this).closest("tr").remove();
  });
}

function removeRow3(oButton) {
  $(document).on("click", "#bucketTable3 .removeRemove", function (e) {
    $(this).closest("tr").remove();
  });
}

function removeRow4(oButton) {
  $(document).on("click", "#bucketTable4 .removeRemove", function (e) {
    $(this).closest("tr").remove();
  });
}

function removeRowOtherFeeType(oButton) {
  $(document).on("click", "#bucketTableOtherFeeType .removeRemove", function (e) {
    $(this).closest("tr").remove();
  });
}

function bucketCourtAdd() {
  $("#bucketTable tr").each(function () {
    $(this)
      .find("input")
      .each(function () {
        if ($(this).val() != "Remove") {
          Bucket.push($(this).val());
        }
      });
  });

  var a = $("#court_date");
  for (i = 0; i < Bucket.length; i++) {
    a.append('<option value="' + Bucket[i] + '">' + Bucket[i] + "</option>");
  }
  $("#exampleModal3").modal("hide");
  a.selectpicker("refresh");
}
// function to extract and submit table data.
function bucketSubmit() {
  $("#bucketTable tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        if ($(this).text() != "Remove") {
          Bucket.push($(this).text());
        }
      });
  });

  $.ajax({
    type: "POST",
    url: "../save_user_defined_table",
    async: true,
    data: { data: Bucket, source: source },
    success: function (data) {
      Bucket = [];
      $.alert("The list succesfully updated");
      $("#exampleModal2").modal("hide");
      bucketType();
    },
  });
}

function bucketSubmit2() {
  $("#bucketTable2 tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        if ($(this).text() != "Remove") {
          Bucket.push($(this).text());
        }
      });
  });

  $.ajax({
    type: "POST",
    url: "../save_user_defined_table",
    async: true,
    data: { data: Bucket, source: source },
    success: function (data) {
      Bucket = [];
      $.alert("The list succesfully updated");
      $("#exampleModal3").modal("hide");
      bucketType2();
    },
  });
}

function bucketSubmit3() {
  $("#bucketTable3 tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        if ($(this).text() != "Remove") {
          Bucket.push($(this).text());
        }
      });
  });

  $.ajax({
    type: "POST",
    url: "../save_user_defined_table",
    async: true,
    data: { data: Bucket, source: source },
    success: function (data) {
      Bucket = [];
      $.alert("The list succesfully updated");
      $("#exampleModal4").modal("hide");
      bucketType3();
    },
  });
}

function bucketSubmit4() {
  $("#bucketTable4 tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        if ($(this).text() != "Remove") {
          Bucket.push($(this).text());
        }
      });
  });

  $.ajax({
    type: "POST",
    url: "save_user_defined_table",
    async: true,
    data: { data: Bucket, source: source },
    success: function (data) {
      Bucket = [];
      $.alert("The list succesfully updated");
      $("#exampleModal5").modal("hide");
      bucketType4();
    },
  });
}

function bucketSubmitQueries() {
  $("#bucketTable tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        if ($(this).text() != "Remove") {
          Bucket.push($(this).text());
        }
      });
  });

  $.ajax({
    type: "POST",
    url: "save_user_defined_table",
    async: true,
    data: { data: Bucket, source: source },
    success: function (data) {
      Bucket = [];
      $.alert("The list succesfully updated");
      $("#exampleModal8").modal("hide");
      bucketType();
    },
  });
}

function bucketSubmitOtherFeeType() {
  const other_fee_types = [];
  $("#bucketTableOtherFeeType tr:not(.bucket-header)").each(function () {
    other_fee_types.push({
      text: $(this).find("td").eq(1).text(),
      amount: $(this).find("td").eq(2).text(),
    });
  });

  $.ajax({
    type: "POST",
    url: "../save_user_defined_table",
    async: true,
    data: { data: other_fee_types, source: "other_fee_types" },
    success: function (data) {
      $.alert("The list succesfully updated");
      $("#modal_other_fee_types").modal("hide");
      bucketTypeOtherFeeType();
    },
  });
}
