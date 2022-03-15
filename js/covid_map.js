 $(document).ready(function() {   
	 var cities = L.layerGroup();
	 
     var  mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                   	mbUrl =  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
                  // mbUrl =  'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=3ddba6803180430782e97f73b840f0ae';
     
     var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
        streets  = L.tileLayer(mbUrl, {id: 'mapbox.light',   attribution: mbAttr});

     
     /*
     var grayscale, streets =  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    		maxZoom: 20,
    		attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    	});
    	*/
     var map = L.map('map', {
                 center: [14.595907, -14.388979],
                 zoom: 7.4, 
                 layers: [cities, streets]
              });

              var baseLayers = { 
            		"Grayscale": grayscale,
                    "Streets": streets
              };

     var overlays = {
        "Cities": cities
     };
		
     
	 	
		$.post('post_map_mosquito.php', function(data) {
			$.each($.parseJSON(data), function(k, v) {
        			var lat = parseFloat(v['lat']);
        			var lng = parseFloat(v['lng']);
        			var n = parseFloat(v['n']);

        			var textLatLng = [lat, lng];
        			var myTextLabel = L.marker(textLatLng, {
        			    icon: L.divIcon({
        			        className: 'cls_tooltip',   
        			        html: v['n']
        			    }),  
        			    zIndexOffset: 500     
        			});
        			//myTextLabel.addTo(map);
        			
        			/*
					$.post("post_polyline.php", function(data){
						var data = $.parseJSON(data);
						var plg = {};
						
						$.each(data, function(key, value){
							if (plg[value['localite']] === undefined || plg[value['localite']] === null) {
								plg[value['localite']] = []; 
								(plg[value['localite']]).push([value['lat'], value['lng']]);
								}
							else{
								(plg[value['localite']]).push([value['lat'], value['lng']]);
							}
						});
						
						
						$.each(plg, function(k, v){
							L.polyline(v).setStyle({
							    color: 'red',
							    weight: 2,
							    fill: 'red',
							    'fillOpacity': .02
							})
							.addTo(map);								
						});
						
					});
					*/
        			
        			var customOptions = {
        					className : 'clsPopUp'
   					};
        			
            		L.circle([lat, lng],{
                		radius: (100*n+4000),
                		fillColor: "rgba(255, 0, 0, .8)",
                	    color: "black",
                	    weight: .3,
                	    opacity: 1,
                	    fillOpacity: 0.4  
                	})
                	.addTo(map)      
					.bindPopup(
							 "REGION : <b>" + v['region']   + "</b><br>"
							//+"DISTRICT : <b>" + v['district'] +"</b><br>"
							+"NBRE DE CAS : <b style='color:rgba(255,0,0,.8);font-size:14px;'>" + v['n'] +"</b>" , customOptions);
            		
            		
            		
				});
        	});
			L.control.layers(baseLayers, overlays).addTo(map);
        });