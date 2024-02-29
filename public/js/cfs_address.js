function initMap() {
                    var placeSearch, autocomplete;
                    var componentForm = {
                        street_number: 'short_name',
                        route: 'long_name',
                        neighborhood: 'short_name',
                        locality: 'long_name',
                        administrative_area_level_2: 'short_name',
                        administrative_area_level_1: 'short_name',
                        country: 'long_name',
                        postal_code: 'short_name'
                    };


                    var latlng = new google.maps.LatLng(39.605, -84.617);
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: latlng,
                        zoom: 12
                    });

                    var input = (document.getElementById('uc'));

                    var autocomplete = new google.maps.places.Autocomplete(input);

                    var marker = new google.maps.Marker({
                        map: map,
                        anchorPoint: new google.maps.Point(0, -29)
                    });

                    autocomplete.addListener('place_changed', function () {
                        marker.setVisible(false);
                        var place = autocomplete.getPlace();

                        if (!place.geometry) {
                            window.alert("Please enter a valid address");
                            return;
                        }
                        document.getElementById('lat').value = place.geometry.location.lat();
                        document.getElementById('lng').value = place.geometry.location.lng();
                        document.getElementById('neighborhood').value = '';
                        
                        var results2 = [];
                        results2.push(JSON.stringify(place.address_components));

                        var street_no;
                        var route_name;
                        // Get each component of the address from the place details
                        // and fill the corresponding field on the form.
                        for (var i = 0; i < place.address_components.length; i++) {
                            var addressType = place.address_components[i].types[0];
                            if (componentForm[addressType]) {
                                var val = place.address_components[i][componentForm[addressType]];
                                document.getElementById(addressType).value = val;
                            }
                        }

                        document.getElementById('addrs').value = document.getElementById('street_number').value + ' ' + document.getElementById('route').value;
                        marker.setPosition(place.geometry.location);
                        marker.setVisible(true);
                        // If the place has a geometry, then present it on a map.
                        if (place.geometry.viewport) {
                            map.fitBounds(place.geometry.viewport);
                        } else {
                            map.setCenter(place.geometry.location);
                            map.setZoom(17); // Why 17? Because it looks good.
                        }

                    });
                }
				
		function initMap3() {
          var placeSearch, autocomplete;             
         var input = (document.getElementById('owner_address_log'));
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Please enter a valid address");
                return;
            }
           document.getElementById('lat22').value =  place.geometry.location.lat();
           document.getElementById('lng22').value =  place.geometry.location.lng();
           document.getElementById('nghbd22').value = '';
            var street_no;
            var route_name;

              place.address_components.map(function(e){
               if(e.types.indexOf('locality') !== -1 &&
                       e.types.indexOf('political') !== -1) {
                   document.getElementById('city22').value = e.long_name;
               }

               if(e.types.indexOf('neighborhood') !== -1 &&
                       e.types.indexOf('political') !== -1) {
                   document.getElementById('nghbd22').value = e.long_name;
               }
               if(e.types.indexOf('street_number') !== -1)  {
                   street_no = e.long_name;

               } else if (e.types.indexOf('route') !== -1) {
                   route_name = e.long_name;
                   document.getElementById('addrs22').value = street_no + ' ' + route_name;
               }
               if(e.types.indexOf('administrative_area_level_2') !== -1 &&
                       e.types.indexOf('political') !== -1) {
                   document.getElementById('county22').value = e.long_name;
               }
               if(e.types.indexOf('administrative_area_level_1') !== -1 &&
                       e.types.indexOf('political') !== -1) {
                   document.getElementById('state22').value = e.short_name;
               }
               if(e.types.indexOf('country') !== -1 &&
                       e.types.indexOf('political') !== -1) {
                   document.getElementById('country22').value = e.short_name;
               }
               if(e.types.indexOf('postal_code') !== -1){
                   document.getElementById('zip22').value = e.long_name;
               }

           });

        });
    }