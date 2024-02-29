/* eslint-disable no-undef */
class UserDefinedTable {
  constructor(source) {
    this.source = source;
  }

  createFunctionButtons(data = {}) {
    if (!globalVariables.PRIVILEGE_USER_DEFINED_TABLES.delete) {
      return "";
    }

    return `<td>
      <a href="#" class="removeUserDefinedTableRow">Remove</a>
      <a href="#" class="enableUserDefinedTableRow ${data.disabled === "true" ? "" : "d-none"}">Enable</a>
      <a href="#" class="disableUserDefinedTableRow ${data.disabled === "true" ? "d-none" : ""}">Disable</a>
    </td>
    `;
  }

  showUserDefinedTableModal() {
    const { title, columns, addTitle } = this.getUserDefinedTableValues(this.source);

    $("#user_defined_table_modal_title").text(title);
    $("#user_defined_table_modal_add_button").val(addTitle);

    $("#user_defined_table_body thead th[data-column-name]").remove();
    for (const column of columns) {
      $("#user_defined_table_body thead tr").append(`<th data-column-name="${column.name || ""}">${column.title}</th>`);
    }

    $("#user_defined_table_modal").one("show.bs.modal", this.onShowUserDefinedTable.bind(this)).modal("show");
    $("#user_defined_table_modal_add_button").off("click").on("click", this.addUserDefinedTableRow.bind(this));
    $("#user_defined_table_modal_save_button").off("click").on("click", this.saveUserDefinedTable.bind(this));

    if (!globalVariables.PRIVILEGE_USER_DEFINED_TABLES.write) {
      $("#user_defined_table_modal_add_button").remove();
    }

    if (!globalVariables.PRIVILEGE_USER_DEFINED_TABLES.delete) {
      $("#user_defined_table_function_column").remove();
    }

    if (!globalVariables.PRIVILEGE_USER_DEFINED_TABLES.write && !globalVariables.PRIVILEGE_USER_DEFINED_TABLES.delete) {
      $("#user_defined_table_modal_save_button").remove();
    }
  }

  async getData() {
    return $.post("/" + globalVariables.routLink + "get_user_defined_table_data", { source: this.source });
  }

  sortData(data) {
    const { columns } = this.getUserDefinedTableValues(this.source);

    const keyColumn = this.findKeyColumn(columns) || "value";

    if (typeof data[0] === "object") {
      for (const item of data) {
        item[keyColumn] = item[keyColumn].trim();
      }

      data.sort((a, b) =>
        a[keyColumn] === b[keyColumn]
          ? 0
          : a[keyColumn].toString().toLowerCase() > b[keyColumn].toString().toLowerCase()
          ? 1
          : -1
      );
    } else {
      data = data.map((p) => p.trim());
      data.sort((a, b) => (a === b ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : -1));
    }

    return data;
  }

  onShowUserDefinedTable() {
    const { columns } = this.getUserDefinedTableValues(this.source);
    this.getData().then((data) => {
      data = this.sortData(data);

      const trs = data
        .map((p) => {
          const isObject = typeof p === "object";
          const tds = [];
          for (const [index, column] of columns.entries()) {
            tds.push(
              `<td data-column-name="${column.name || ""}">${
                isObject ? p[column.name || "value"] : index === 0 ? p : ""
              }</td>`
            );
          }

          return `
            <tr ${p.disabled === "true" ? `option-disabled="true"` : ""}>
              ${this.createFunctionButtons(p)}
              ${tds.join("")}
            </tr>  
         `;
        })
        .join("");

      $("#user_defined_table_body tbody").html(trs);
      $("#user_defined_table_body tbody td[data-column-name]").prop(
        "contenteditable",
        globalVariables.PRIVILEGE_USER_DEFINED_TABLES.write
      );

      $(".removeUserDefinedTableRow").on("click", this.removeUserDefinedTableRow);
      $(".enableUserDefinedTableRow").on("click", this.enableUserDefinedTableRow);
      $(".disableUserDefinedTableRow").on("click", this.disableUserDefinedTableRow);
    });
  }

  getUserDefinedTableValues() {
    switch (this.source) {
      case "training_type":
        return {
          title: "Add Edit Training Type",
          columns: [{ title: "Training Types" }],
          addTitle: "Add Training Type",
        };
      case "pet_on_premise":
        return { title: "Add Edit Pet Kinds", columns: [{ title: "Pet Kind" }], addTitle: "Add Pet Kind" };
      case "training_category":
        return {
          title: "Add Edit Training Category",
          columns: [{ title: "Training Categories" }],
          addTitle: "Add Training Category",
        };
      case "training_frequency":
        return {
          title: "Add Edit Training Frequencies",
          columns: [{ title: "Training Frequencies" }],
          addTitle: "Add Training Frequency",
        };
      case "training_conducted_by":
        return {
          title: "Add Edit Training Conductors",
          columns: [{ title: "Training Conductors" }],
          addTitle: "Add Training Conductor",
        };
      case "person_type":
        return {
          title: "Vacation Watch Person Type",
          columns: [{ title: "Vacation Watch Person Type" }],
          addTitle: "Add Person Type",
        };
      case "court_name":
        return {
          title: "Add Edit Courts",
          columns: [
            { name: "court_name", title: "Court Name", isKey: true },
            { name: "court_code", title: "Court Code" },
          ],
          addTitle: "Add New Court",
        };
      default:
        return { title: "Add/Edit Values", columns: [{ title: "Value" }], addTitle: "Add New Value" };
    }
  }

  removeUserDefinedTableRow(ev) {
    ev.preventDefault();
    $(ev.currentTarget).closest("tr").remove();
  }

  disableUserDefinedTableRow(ev) {
    ev.preventDefault();
    $(ev.currentTarget).addClass("d-none");
    $(ev.currentTarget)
      .closest("tr")
      .attr("option-disabled", true)
      .find(".enableUserDefinedTableRow")
      .removeClass("d-none");
  }

  enableUserDefinedTableRow(ev) {
    ev.preventDefault();
    $(ev.currentTarget).addClass("d-none");
    $(ev.currentTarget)
      .closest("tr")
      .attr("option-disabled", false)
      .find(".disableUserDefinedTableRow")
      .removeClass("d-none");
  }

  addUserDefinedTableRow() {
    const { columns } = this.getUserDefinedTableValues(this.source);
    const newTr = $(`<tr>`);

    const tds = [];
    for (const column of columns) {
      tds.push(`<td data-column-name="${column.name || ""}">Change This</td>`);
    }

    newTr.append(`
        ${this.createFunctionButtons()}
        ${tds.join("")}
    `);

    $("#user_defined_table_body tbody").append(newTr);
    $("#user_defined_table_body tbody td[data-column-name]").prop(
      "contenteditable",
      globalVariables.PRIVILEGE_USER_DEFINED_TABLES.write
    );

    $(newTr).find(".removeUserDefinedTableRow").on("click", this.removeUserDefinedTableRow);
    $(newTr).find(".enableUserDefinedTableRow").on("click", this.enableUserDefinedTableRow);
    $(newTr).find(".disableUserDefinedTableRow").on("click", this.disableUserDefinedTableRow);
  }

  saveUserDefinedTable() {
    const data = [];
    const hasOptionDisabled = $("#user_defined_table_body tbody tr[option-disabled=true]").length > 0;

    $("#user_defined_table_body tbody tr").each(function (i, elementTr) {
      const rowData = {};
      let rowStringValue;
      let isObject = hasOptionDisabled;

      $(elementTr)
        .find("td[data-column-name]")
        .each(function (j, elementTd) {
          const columnName = $(elementTd).data("column-name");
          const value = $(elementTd).text();

          if (columnName) {
            isObject = true;
          }

          if (isObject) {
            rowData[columnName || "value"] = value;
            rowData["disabled"] = ($(elementTr).attr("option-disabled") === "true").toString();
          }

          if (value) {
            rowStringValue = value;
          }
        });

      data.push(isObject ? rowData : rowStringValue);
    });

    $.post("/" + globalVariables.routLink + "save_user_defined_table", { data, source: this.source }).done(() => {
      this.fillSelect(data, true);

      $.alert("The list succesfully updated");

      $("#user_defined_table_modal").modal("hide");
    });
  }

  findKeyColumn(columns) {
    if (!columns) {
      columns = this.getUserDefinedTableValues(this.source).columns;
    }
    return columns.find((p) => p.isKey)?.name;
  }

  async fillSelect(data, triggerChangeEvent = false) {
    data = data || (await this.getData());

    data = this.sortData(data);

    const { columns } = this.getUserDefinedTableValues(this.source);

    const keyColumn = this.findKeyColumn(columns);

    const columnNames = columns.filter((p) => p.name).map((p) => p.name);

    const source = this.source;

    $(`select[data-udt-source="${this.source}"]`).each(function (i, el) {
      const oldVal = $(el).val();

      $(el).html(
        data
          .map((p) => {
            const customDataAttributes = columnNames
              .map((colName) => `data-${colName}="${p[colName] ?? ""}"`)
              .join(" ");

            return `<option value="${
              typeof p === "object" ? p[keyColumn || "value"] : p.trim()
            }" ${customDataAttributes} ${p.disabled === "true" ? "disabled" : ""}>${
              typeof p === "object" ? p[keyColumn || "value"] : p.trim()
            }</option>`;
          })
          .join("")
      );

      $(el).val(oldVal).selectpicker("refresh");

      if (triggerChangeEvent) {
        $(el).change();
      }
    });
  }
}

$.fn.userDefinedTableReady = async function () {
  await Promise.all(
    $.map(this, (el) => {
      const udtSource = $(el).data("udt-source");
      el.fillPromise = el.fillPromise ?? new UserDefinedTable(udtSource).fillSelect();
      return el.fillPromise;
    })
  );
};

$(() => {
  $("select[data-udt-source]").each(function (i, el) {
    const udtSource = $(el).data("udt-source");

    el.fillPromise = new UserDefinedTable(udtSource).fillSelect();
  });

  $("input[data-udt-source], button[data-udt-source]").on("click", function () {
    const udtSource = $(this).data("udt-source");

    new UserDefinedTable(udtSource).showUserDefinedTableModal();
  });
});
