/**
 * To delay datatable search
 * @param {String} id 
 * DataTable Id Exp: dc-chart-table
 * @param {Number} delay 
 * The search will be done when the delay time elapsed after the user's last key stroke. Default is 1000 ms.
 * @param {Number} minLength 
 * If the length of search input is greater than minLength, the search will be done otherwise table search will be reset.
 */
function delaySearch(id, delay, minLength)
{
    var initialSearch = $(`#${id}_filter label:first > input`).val();

    $(`#${id}_filter label:first`).remove();

    $(`#${id}_filter`).append(`
        <label>Search:<input type="search" class="" placeholder="" aria-controls="dc-table-chart" id="search_filter"></label>
    `);

    if (minLength && minLength > 0)
    {
        $("#search_filter").prop("placeholder",`Min ${minLength} characters`);
    }

    $("#search_filter").css("font-weight","normal");

    let searchTimeOut;
    let lastSearch="";
    
    if (initialSearch)
    {
        lastSearch = initialSearch;
        $("#search_filter").val(initialSearch);
    }

    $(document).on("input",'#search_filter',function(e){

        if (searchTimeOut) clearTimeout(searchTimeOut);

        searchTimeOut = setTimeout(function(){

            let searchVal = "";

            if (minLength)
            {
                if (e.target.value.length >= minLength)
                {
                    searchVal = e.target.value;
                }
            }

            if (searchVal !== lastSearch)
            {
                lastSearch = searchVal;

                $("#"+id).dataTable().fnFilter(searchVal);
                $('#loading-screen').show();
                $('#cfsRowInfo').show();
            }
        },delay || 1000);
    });


}

        