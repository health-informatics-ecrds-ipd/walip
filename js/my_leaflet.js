var iconNeg = L.icon({
	iconUrl: 'leaflet/images/negatif.png',
	iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 14], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -14] // point from which the popup should open relative to the iconAnchor    
});

var iconStrutures = L.icon({
    iconUrl: 'leaflet/images/ps29.png',
    iconSize: [12, 12], // size of the icon
    iconAnchor: [6, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -12] // point from which the popup should open relative to the iconAnchor 
});


var iconPos = L.icon({
    iconUrl: 'leaflet/images/positif.png',
    iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 14], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -14] // point from which the popup should open relative to the iconAnchor 
});

var iconElse = L.icon({
    iconUrl: 'leaflet/images/autres.png',
    iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 14], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -14] // point from which the popup should open relative to the iconAnchor 
});

var cities = L.layerGroup();

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});



var baseLayers = {
	"Streets": streets,
	"Grayscale": grayscale
};

var overlays = {
	"Cities": cities
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function addDays(date, days) {
	  var result = new Date(date);
	  result.setDate(result.getDate() + days);
	  return result;
	}

function removeCircle(e) {
	var obj = this;
	alertify.confirm("Voulez-vous effacer le cercle?", function (e) {
		if (e) {
			map.removeLayer(obj);    
        } else {
            return true;
        }
    });
}

function markerOnClick(lat, lng, col, id, prefix) {
	//console.log(prefix+id);
	var rayon = parseInt($("#"+prefix+id).val());
    L.circle([lat,lng],
    		rayon,{
	        	color:col,
	     		opacity:0,
	     		fillColor: col,
	     		fillOpacity:.4
	     	}).addTo(map).on('click', removeCircle);
}

/* Numeric only */
jQuery('.numbersOnly').keyup(function () { 
    this.value = this.value.replace(/[^0-9\.]/g,'');
});

function getMinBound(arr, val){
	var ind = arr.indexOf(val);
	if(ind != -1){
		return ind;
	}
	for(var i=0; i<arr.length; i++){
		if(String(val) < String(arr[i])){
			return i;
		}
	}
	return 0;
}
   
function getMaxBound(arr, val){
	var ind = arr.indexOf(val);
	if(ind != -1){
		return ind;
	}
	for(var i=(arr.length-1); i>=0; i--){
		if(String(val) > String(arr[i])){
			return i;
		}
	}
	return (arr.length);
}

var map = L.map('map', {
	center: [14.512210, -14.660161], 
	zoom: 7,
	layers: [cities, streets]
});





var heat = null;
var pies = null;

$(document).ready(function(){
    var markers_array = [];
    var individuals = [];
	//var date_prelevement = [];
	var date_prelevement2 = [];
	var markers_array_vect = [];
    var gl_date = [];
    var epi_links_array = [];
	var structures_array = [];
	
    $.post('post_get_structures.php', function(data) {
    	data = $.parseJSON(data);
    	
    	$.each(data, function(k, v){
    		//console.log(v['lat']);
    		var select = "<option value=100>100</option>"
		 		+ "<option value=200 selected>200</option>"
		 		+ "<option value=300>300</option>"
		 		+ "<option value=400>400</option>"
		 		+ "<option value=500>500</option>"
		 		+ "<option value=600>600</option>"
		 		+ "<option value=700>700</option>"
		 		+ "<option value=800>800</option>"
		 		+ "<option value=900>900</option>"
		 		+ "<option value=1000>1000</option>"
		 		+ "</select>";
    		var label = '<br/>'+ "<b>Rayon: </b><select style = 'width:50px;' id='select_"+v['id']+"'>"+ select + ' m&egrave;tres' ;
    		
    		structures_array.push(L.marker([parseFloat(v['lat']), parseFloat(v['lon'])],{icon: iconStrutures})
    		.addTo(map)
    		.bindPopup('<b>' + v['nom'] + '<b/>'+ label + '<br/><a href="#" onclick="markerOnClick('+parseFloat(v['lat'])+','+parseFloat(v['lon']) + ','+'\'rgba(0,200,0,.2)\'' +','+v['id']+ ',' +'\'select_\'' +')">Encercler<a/>'));
    	});
    	
    	// hide for init
    	$.each(structures_array, function(k, v){
			map.removeLayer(v);
		}); 
    });
    	
    $("#btn_search").click(function(){
		var id = $.trim($("#patient_search").val());
		var ind = individuals.indexOf(id);
		
		if(ind != -1){
			markers_array[ind].openPopup();
		} else {
			alertify.error("Cet individu n'est pas positionné!!!");
		}
    });

    $('#epi_link').change(function(){
    	// Remove previous links
		$.each(epi_links_array, function(k, v){
			map.removeLayer(v);
		});
		
		epi_links_array = [];
    	
		if( $("#epi_link").val() == null ){return;}
		var vals = ($("#epi_link").val()).toString().split("*");
		vals.splice(-1,1);
		
		$.each(vals, function(k, val){
			if(val[0] == ","){
				val = val.substring(1);
			}
			var orign = val.split("-")[0];
			var links = (val.split("-")[1]).split(",");
			var ind_origin = individuals.indexOf(orign);
			
			if(ind_origin != -1){
				$.each(links, function(k,v){
					var ind_link = individuals.indexOf(v);
					if( ind_link != -1){
						var pointA = markers_array[ind_origin].getLatLng();
						var pointB = markers_array[ind_link].getLatLng();
						var pointList = [pointA, pointB];
						
						// Add new links
						var line = new L.Polyline(pointList, {
			            		    color: 'red',
			            		    weight: 2,
			            		    opacity: 0.5,
			            		    lineCap: "square",
			            		    smoothFactor: 1,
			            		    vertices: 10
			            		})
							.addTo(map)
							.bindTooltip(orign + " --> " + v, {permanent : false, sticky : true, direction : 'top', className : 'tooltip'});
						
						epi_links_array.push(line);
						/*
						epi_links_array.push(new L.polylineDecorator(line, {
						    patterns: [{
						                   offset: '50%',
						                   repeat: 0,
						                   symbol: L.Symbol.arrowHead({pixelSize: 2, polygon: false, pathOptions: {stroke: true}})
						               }]
						       }).addTo(map));
						 */
					}
				});
			}
		});
    	 
	});
    
   
 	
    $.post('post_map.php', function(data) {
    	console.log(data);
	 	//var date_prelevement2 = [];
	 	var select = "<option value=100>100</option>"
			 		+ "<option value=200 selected>200</option>"
			 		+ "<option value=300>300</option>"
			 		+ "<option value=400>400</option>"
			 		+ "<option value=500>500</option>"
			 		+ "<option value=600>600</option>"
			 		+ "<option value=700>700</option>"
			 		+ "<option value=800>800</option>"
			 		+ "<option value=900>900</option>"
			 		+ "<option value=1000>1000</option>"
			 		+ "</select>";
	 	
	 	var heat_tbl = [];
	 	//var heat_markers_arr = [];
    	$.each($.parseJSON(data), function(k, v) {
    		var lat = parseFloat(v['latitude']);
    		var lon = parseFloat(v['longitude']);
    		var date_prlvmt = parseFloat(v['date_prelevement']);
    		
    		if(!isNaN(lat) && !isNaN(lon) && !isNaN(date_prlvmt)){
        		var sexe = v['sexe'] == 'f' ? "<image src='../images/female.png' />" : v['sexe'] == 'm'? "<image src='../images/male.png' />" : "NR";
    			var lab = 	 '<b>ID:<b/> ' + v['no_ipd'] +
							 '<br/>' + '<b>Sexe:<b/> ' + sexe + 
							 '<br/>' + '<b>Age:<b/> ' + v['age_annees'] +
							 '<br/>' + '<b>Date prelevement:<b/> ' + v['date_prelevement'] +  
    						 '<br/>'+ "<b>Rayon: </b><select style = 'width:50px;' id='select_"+v['id']+"'>"+ select + ' m&egrave;tres' + '</br><b>Coordonn\351es GPS: ' + v['latitude'] + ' , ' + v['longitude'] + '</b>';
							 		  
				individuals.push(v['no_ipd']);
				
				//date_prelevement.push(v['date_prelevement']);
				date_prelevement2.push(v['date_prelevement']);
				
			    if(v['diagnostic'] == 1){
			    	heat_tbl.push([lat, lon, .9]);
			    	markers_array.push(L.marker([lat, lon],{icon: iconPos})
			    		.addTo(map)
			    		.bindPopup(lab+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ',' + '\'rgba(250,0,0,.4)\'' + ',' + v['id'] + ',' + '\'select_\'' +')">Encercler<a/>'));
				}		           
				else if(v['diagnostic'] == 2){
					heat_tbl.push([lat, lon, .1]);
					markers_array.push(L.marker([lat, lon],{icon: iconNeg})
						.addTo(map)
						.bindPopup(lab+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ','+'\'rgba(0,0,0,.1)\'' +','+v['id']+ ',' +'\'select_\'' +')">Encercler<a/>'));
				}
				else{
					heat_tbl.push([lat, lon, 0]);
					markers_array.push(L.marker([lat, lon],{icon: iconElse})
						.addTo(map)
						.bindPopup(lab+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ','+'\'rgba(0,0,0,.1)\'' +','+ v['id'] + ',' +'\'select_\'' +')">Encercler<a/>'));
				}
			}
    	});
    	
    	
    	heat = L.heatLayer(heat_tbl, {radius: 25}).addTo(map);
    	
    	//hide for init
    	map.removeLayer(heat);
    	
    	/*
    	L.polygon([[14.936183, -16.668874],
    	            [15.021028, -16.415599],
    	            [14.951547, -16.212028],
    	            [15.009218, -15.889284],
    	            [15.003604, -15.800989],
    	            [14.907714, -15.776664],
    	            [14.854104, -15.680340],
    	            [14.708265, -15.799733],
    	            [14.596514, -15.794730],
    	            [14.520339, -16.037275],
    	            [14.568533, -16.320161],
    	            [14.619553, -16.614165],
    	            [14.771084, -16.600222],
    	            [14.832276, -16.635895],
    	            [14.877489, -16.641340],
    	            [14.914718, -16.635789],
    	            [14.936183, -16.668874]], {
    	        color: 'red',
    	        weight: 2,
    	        opacity: 0.5,
    	        lineCap: "square",
    	        smoothFactor: 1,
    	        vertices: 10
    	    })
    	    .addTo(map);
    	    */
    	
    	$("#sampleSlider").dateRangeSlider({
			bounds:{
			    min: new Date(date_prelevement2[0]),
			    max: new Date(date_prelevement2[date_prelevement2.length-1])
			},
			
			defaultValues:{
			    min: new Date(date_prelevement2[0]),
			    max: new Date(date_prelevement2[date_prelevement2.length-1])
			  }
		});

    	$("#sampleSlider").bind("valuesChanged", function(e, data){
    		//console.log("Something moved. min: " + data.values.min + " max: " + data.values.max);
    		var dateMin    = data.values.min,
    		    yr      = dateMin.getFullYear(),
    		    month   = (dateMin.getMonth()+1) < 10 ? '0' + (dateMin.getMonth()+1) : (dateMin.getMonth()+1),
    		    day     = dateMin.getDate()  < 10 ? '0' + dateMin.getDate()  : dateMin.getDate(),
    		    newDateMin = yr + '-' + month + '-' + day;
    		    
    		var dateMax    = data.values.max,
    		    yr      = dateMax.getFullYear(),
    		    month   = (dateMax.getMonth()+1) < 10 ? '0' + (dateMax.getMonth()+1) : (dateMax.getMonth()+1),
    		    day     = dateMax.getDate()  < 10 ? '0' + dateMax.getDate()  : dateMax.getDate(),
    		    newDateMax = yr + '-' + month + '-' + day;

    		// clear all markers
      		$.each(markers_array, function(i,v){
    			map.removeLayer(v); 
			});
      		/*
			var showmarkers = markers_array.slice(
					getMinBound(date_prelevement2, newDateMin),
					getMaxBound(date_prelevement2, newDateMax)
				);
			*/
			
      		newDateMin = date_prelevement2[getMinBound(date_prelevement2, newDateMin)]
      		newDateMax = date_prelevement2[getMaxBound(date_prelevement2, newDateMax)]
      		
			var showmarkers = markers_array.slice(
					date_prelevement2.indexOf(newDateMin),
					date_prelevement2.lastIndexOf(newDateMax)
			);
			
      		if(showmarkers.length == 0 && date_prelevement2.indexOf(newDateMin) == date_prelevement2.lastIndexOf(newDateMax)){
      			showmarkers = [markers_array[date_prelevement2.indexOf(newDateMin)]];
			}
			
			$.each(showmarkers, function(i,v){
    			map.addLayer(v); 
			});
			
			/*
      		console.log(
      				date_prelevement2[getMinBound(date_prelevement2, newDateMin)] + '  '+
      				date_prelevement2[getMaxBound(date_prelevement2, newDateMax)]
              		);
			*/
			//console.log(date_prelevement2);
		});
    	
    	/*******************************************************
    	 * ENTOMOLOGIE
    	 ******************************************************/
    	
    	var iconMosquitoGreen = L.icon({
    		iconUrl : 'leaflet/images/mgreen.png',
    		iconSize : [ 24, 24 ],
    		iconAnchor : [ 12, 24 ],
    		popupAnchor : [ 0, -24 ]
    	});
    	
    	var iconMosquitoYellow = L.icon({
    		iconUrl : 'leaflet/images/myellow.png',
    		iconSize : [ 24, 24 ],
    		iconAnchor : [ 12, 24 ],
    		popupAnchor : [ 0, -24 ]
    	});
    	
    	var iconMosquitoRed = L.icon({
    		iconUrl : 'leaflet/images/mred.png',
    		iconSize : [ 24, 24 ],
    		iconAnchor : [ 12, 24 ],
    		popupAnchor : [ 0, -24 ]
    	});
    	
    	var iconMosquitoGray = L.icon({
    		iconUrl : 'leaflet/images/mgray.png',
    		iconSize : [ 24, 24 ],
    		iconAnchor : [ 12, 24 ],
    		popupAnchor : [ 0, -24 ]
    	});
    	
    	$.post('post_map_mosquito.php', {
    		'datedeb' : date_prelevement2[0],
    		'datefin' : date_prelevement2[date_prelevement2.length - 1]
    	}, function(data) {

    		$.each($.parseJSON(data), function(k, v) {    			
    			var total = 0;
    			var total_pos = 0;
    	
    			$.each(v, function(kk, vv) {
    				if (vv != null && kk.indexOf("_pos") >= 0) {
    					total_pos = total_pos + parseInt(vv);
    				}
    				if (vv != null
    						&& (kk.indexOf("_pos") >= 0 || kk
    								.indexOf("_neg") >= 0)) {
    					total = total + parseInt(vv);
    				}
    			});
    			
    			var ir = (total_pos / total) * 100;
    			var lat = parseFloat(v['gl_latitude']);
    			var lon = parseFloat(v['gl_longitude']);
    	
    			if (!isNaN(lat) && !isNaN(lon)) {
    				var icon = null;
    				var lab = null;
    				if (ir < 3) {
    					icon = iconMosquitoGreen;
    					lab = '<b>' 
    						+ v['gl_date'] + '<br/>'
    						+ v['gl_quartier'] + '<br/>'
    						+ 'IR: ' + ir.toFixed(2) + '%' 
    						+ '<br/>'+ "<b>Rayon: </b><select style = 'width:50px;' id='selectm_"+v['id']+"'>"+ select + ' m&egrave;tres'
    						+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ',' + '\'rgba(0,0,0,.1)\'' + ',' + v['id'] + ',' + '\'selectm_\'' +')">Encercler<a/>'
    						+ '</b>'
    				} else if (ir > 3 && ir <= 20) {
    					icon = iconMosquitoYellow;
    					lab = '<b>' 
    						+ v['gl_date'] + '<br/>'
    						+ v['gl_quartier'] + '<br/>'
    						+ 'IR: ' + ir.toFixed(2) + '%' 
    						+ '<br/>'+ "<b>Rayon: </b><select style = 'width:50px;' id='selectm_"+v['id']+"'>"+ select + ' m&egrave;tres'
    						+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ',' + '\'rgba(250,0,0,.4)\'' + ',' + v['id'] + ',' + '\'selectm_\'' +')">Encercler<a/>'
    						+ '</b>'
    				} else if (ir > 20) {
    					icon = iconMosquitoRed;
    					lab = '<b>' 
    						+ v['gl_date'] + '<br/>'
    						+ v['gl_quartier'] + '<br/>'
    						+ 'IR: ' + ir.toFixed(2) + '%'
    						+ '<br/>'+ "<b>Rayon: </b><select style = 'width:50px;' id='selectm_"+v['id']+"'>"+ select + ' m&egrave;tres'
    						+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ',' + '\'rgba(250,0,0,.6)\'' + ',' + v['id'] + ',' + '\'selectm_\'' +')">Encercler<a/>'
    						+ '</b>'
    				} else {
    					icon = iconMosquitoGray;
    					lab = '<b>' 
    						+ v['gl_date'] + '<br/>'
    						+ v['gl_quartier'] + '<br/>'
    						+ 'IR: ' + ir.toFixed(2) + '%'
    						+ '<br/>'+ "<b>Rayon: </b><select style = 'width:50px;' id='selectm_"+v['id']+"'>"+ select + ' m&egrave;tres'
    						+'<br/><a href="#" onclick="markerOnClick('+lat+','+lon + ',' + '\'rgba(0,0,0,.1)\'' + ',' + v['id'] + ',' + '\'selectm_\'' +')">Encercler<a/>'
    						+ '</b>'
    				}
    				if (isNaN(ir)) {
    					ir = "non renseigné";
    				} else {
    					ir = ir.toFixed(2);
    					ir = ir + "%";
    				}
    				markers_array_vect.push(
	    				L.marker([ lat, lon ], {
	    					icon : icon
	    				}).addTo(map).bindPopup(lab)
    				);
    				gl_date.push(v['gl_date']);
    			}
    		});
    		
    		
    		
    		//---
    		$("#sampleSliderVectors").dateRangeSlider({
    			bounds:{
    			    min: new Date(gl_date[0]),
    			    max: new Date(gl_date[gl_date.length-1])
    			},
    			
    			defaultValues:{
    				min: new Date(gl_date[0]),
     			    max: new Date(gl_date[gl_date.length-1])
    			  }
    		});

        	$("#sampleSliderVectors").bind("valuesChanged", function(e, data){
        		//console.log("Something moved. min: " + data.values.min + " max: " + data.values.max);
        		var dateMin    = data.values.min,
        		    yr      = dateMin.getFullYear(),
        		    month   = (dateMin.getMonth()+1) < 10 ? '0' + (dateMin.getMonth()+1) : (dateMin.getMonth()+1),
        		    day     = dateMin.getDate()  < 10 ? '0' + dateMin.getDate()  : dateMin.getDate(),
        		    newDateMin = yr + '-' + month + '-' + day;
        		    
        		var dateMax    = data.values.max,
        		    yr      = dateMax.getFullYear(),
        		    month   = (dateMax.getMonth()+1) < 10 ? '0' + (dateMax.getMonth()+1) : (dateMax.getMonth()+1),
        		    day     = dateMax.getDate()  < 10 ? '0' + dateMax.getDate()  : dateMax.getDate(),
        		    newDateMax = yr + '-' + month + '-' + day;

        		// clear all markers
          		$.each(markers_array_vect, function(i,v){
        			map.removeLayer(v); 
    			});
          		
          		newDateMin = gl_date[getMinBound(gl_date, newDateMin)]
          		newDateMax = gl_date[getMaxBound(gl_date, newDateMax)]
          		
          		var showmarkers = markers_array_vect.slice(
    					gl_date.indexOf(newDateMin),
    					gl_date.lastIndexOf(newDateMax)
    			);
          		
          		if(showmarkers.length == 0 && gl_date.indexOf(newDateMin) == gl_date.lastIndexOf(newDateMax)){
          			showmarkers = [markers_array_vect[gl_date.indexOf(newDateMin)]];
    			}
          		
    			$.each(showmarkers, function(i,v){
        			map.addLayer(v); 
    			});		
    			
    			/*
    			console.log(
    					gl_date[gl_date.indexOf(newDateMin)] + '  '+
    					gl_date[gl_date.lastIndexOf(newDateMax)]
                  		);
                 */ 		
    			
    		});
    	});

    });
    
    var pies_array = [];
    var denom = null;
    
    $.post('post_pie_get_denominator.php', function(data){
		data = $.parseJSON(data);
		
		denom = parseInt(data[0]['n']) * 10;
    	$.post('post_pie.php', function(data){		
    		$.each($.parseJSON(data), function(k, v) {
        		var npos = parseInt(v['npos']);
        		var nneg = parseInt(v['nneg']);
        		var nautres = parseInt(v['nautres']);
        		var r = 13000 + (((npos + nneg + nautres) / denom) * 15000);
        		//var r = ((10000 + npos + nneg + nautres) / 15000)  * 15000;
        		 
        		
        		var text_pos = npos + ' Pos';
        		var text_neg = nneg + ' Neg';
        		var text_autres = nautres + ' NR';
        		var data = [];
        		
        		var lat = parseFloat(v['lat']);
        		var lon = parseFloat(v['lon']);
        		
        		data.push({num: npos, label: text_pos, color:'red'});
        		data.push({num: nneg, label: text_neg, color: 'black'});
        		if(nautres != 0){
        			data.push({num: nautres, label: text_autres, color: 'gray'});
        		}
        		//console.log(lat);
        		if(!isNaN(lat) &&  !isNaN(lon)){
        			pies_array.push(L.pie(
            				[lat, lon], 
        					data, 
        	                 {radius: r,pathOptions: {
        	                     opacity: 0.9,
        	                     fillOpacity: 0.9
        	                 }}
            		      ).addTo(map));
        		}
        		
        		// hide for init
        		$.each(pies_array, function(k, v){
    				map.removeLayer(v);
    			});  
        	});
    	});
    });
	
    L.control.layers(baseLayers, overlays).addTo(map);	
   
	
	$("#show_hide_heatmap").change(function(){
		var val = $(this).val();
		if(val == "cacher"){
			map.removeLayer(heat); 
		} else {
			map.addLayer(heat);
		}
	});
	
	$("#show_hide_piechart").change(function(){
		var val = $(this).val();
		if(val == "cacher"){
			$.each(pies_array, function(k, v){
				map.removeLayer(v);
			}); 
		} else {
			$.each(pies_array, function(k, v){
				map.addLayer(v);
			}); 
		}
	});
	
	$("#show_hide_ss").change(function(){
		var val = $(this).val();
		if(val == "cacher"){
			$.each(structures_array, function(k, v){
				map.removeLayer(v);
			}); 
		} else {
			$.each(structures_array, function(k, v){
				map.addLayer(v);
			}); 
		}
	});
	
	$("#show_hide_piechart").val("cacher");
	$("#show_hide_ss").val("cacher");
	$("#show_hide_heatmap").val("cacher");
});
