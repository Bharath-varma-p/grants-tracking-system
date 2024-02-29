/*
    SETUP ROW REORDER

    1. Include                                  -->     <script src="/js/row-reorder.js"></script>
    2. Add                                      -->     dataTable.DataTable().on('row-reorder', rowReorderHandler.bind(dataTable.DataTable()));
    3. Define draggable columns                 -->     "columns": [
                                                            { data: "data_name", className: "reorder" },
                                                            { data: "data_dob", className: "reorder" },
                                                            { data: "data_race", className: "reorder" },
                                                        ]                            
    4. Call rowReorderData on received data     -->     data = rowReorderData(data)  
*/

$.extend(
    $.fn.dataTable.RowReorder.defaults,
    { selector: '.reorder' }
);
$.fn.dataTable.defaults.rowReorder = true;


function rowReorderData(data) {
    for (let i = 0; i < data.length; i++) {
        $.ajax({
            type: "GET",
            url: "./row-reorder",
            data: {
                data_source: data[i].data_source,
                data_id: data[i].data_id,
            },
            success: function (order) {
                data[i].order = order.row_order
            },
            async: false
        })
    }

    const orderedData = data.filter(data => data.order !== undefined).sort((a, b) => {
        return a.order - b.order
    })
    data = data.filter(data => data.order === undefined)
    orderedData.forEach(item => { data.splice(item.order, 0, item) })
    return data
}

function rowReorderHandler(e, diff, edit) {
    diff.forEach(movedRow => {
        var data = this.row(movedRow.node).data();
        $.ajax({
            type: "POST",
            url: `/${globalVariables.routLink}/row-reorder`,
            data: {
                data_source: data.data_source,
                data_id: data.data_id,
                order: movedRow.newPosition
            },
            success: function (data) {
                table.ajax.reload(highlightClickedRow, false)
            }
        });
    })
}