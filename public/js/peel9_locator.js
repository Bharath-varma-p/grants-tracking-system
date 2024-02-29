  var movies = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
			dataType: 'jsonp',
            url: '../peel9_locator_search?key=%QUERY',
            filter: function (movies) {
                // Map the remote source JSON array to a JavaScript object array
                return $.map(movies, function (movie) {
                    return {
                          //value: (movie.FullName ? movie.FullName : 1) + ' ' + (movie.milePost ? movie.milePost : 1),
						  value: (movie.st_number ? (movie.st_number + ' ') : '') + 
						  (movie.FullName ? (movie.FullName + ', ') : '') + 						 
						  (movie.st_name ? (movie.st_name + ' ') : '') + 
						  (movie.city ? (movie.city + ', ') : '') + 
						  (movie.state ? (movie.state + ' ') : '') + 
						  (movie.zip_code ? (movie.zip_code + ' ') : '') + 
						  (movie.milePost ? (movie.milePost + ' ') : ''),
						  values:[{FullName: movie.FullName, FullName: movie.FullName, road_code:movie.road_code, 
						  pointx:movie.pointx, pointy:movie.pointy, county:movie.county, district:movie.district, Type:movie.Type,neighborhood:movie.neighborhood,city:movie.city,state:movie.state,zip_code:movie.zip_code, st_number:movie.st_number,st_name:movie.st_name
						  }],
                        values2:movies						
                    };
                });
            }
        },
		limit: 15
    });
 
 // Initialize the Bloodhound suggestion engine
    movies.initialize();

	  // Instantiate the Typeahead UI
    $('#peel9_search .typeahead').typeahead(null, {
        displayKey: 'value',
        source: movies.ttAdapter()
    });
	//Control the Divs Based on Search Input Length

    $('#peel9_search .typeahead').on('typeahead:selected', function (e, datum) {
		$('#addrs').val(datum.values[0].FullName);
		$('#uc').val(datum.values[0].FullName);
		$('#owner_address_log').val(datum.values[0].FullName);
		$('#addrs22').val(datum.values[0].FullName);
		$('#nghbd22').val(datum.values[0].neighborhood);
		$('#state22').val(datum.values[0].state);
		$('#county22').val(datum.values[0].county);
		$('#zip22').val(datum.values[0].zip_code);
		$('#city22').val(datum.values[0].FullName);
		$('#lat').val(datum.values[0].pointy);
		$('#lng').val(datum.values[0].pointx);
		$('#lat22').val(datum.values[0].pointy);
		$('#lng22').val(datum.values[0].pointx);
		$('#locality').val(datum.values[0].city);
		$('#neighborhood').val(datum.values[0].neighborhood);
		$('#administrative_area_level_1').val(datum.values[0].state);
		$('#administrative_area_level_2').val(datum.values[0].county);
		$('#postal_code').val(datum.values[0].zip_code);
	initMapPeel9();	
    });

		$('#peel9_locator_add').click(function () {		
      myPopupWin("../LocatorDatabase?empty_layout=yes");
    });
 
	
		
$('#not_found').click(function(){  
//$('#google_search').hide();
//$('#google_search_incident').hide();
//$('#google_search_suspect').hide();
//$('#google_search_employer').hide();
//$('#peel9_search').show();
$('#not_found_div').hide();
$('#back_to_google_div').show();
document.getElementById('not_found').value='universal';

});

$('#back_to_google').click(function(){
//$('#google_search').show();
//$('#google_search_suspect').show();
//$('#google_search_employer').show();
//$('#google_search_incident').show();
//$('#peel9_search').hide();
document.getElementById('not_found').value='lids';

$('#not_found_div').show();
$('#back_to_google_div').hide();
});
	function initMapPeel9() {
  var get_center = {lat: parseFloat(document.getElementById('lat').value), lng: parseFloat(document.getElementById('lng').value)};  
   var get_center2 = [parseFloat(document.getElementById('lat').value), parseFloat(document.getElementById('lng').value)]; 
  
  if(document.getElementById('map')){ 

    var marker = L.marker(get_center2, {
      title: 'Mile Post'
    }).addTo(map);
  map.setView(get_center2, 19);
  }
  
  
  if(document.getElementById('map_asil')){ 

    var marker = L.marker(get_center2, {
      title: 'Mile Post'
    }).addTo(map);
  map.setView(get_center2, 19);
}
	}
	