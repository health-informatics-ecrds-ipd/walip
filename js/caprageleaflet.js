var iconNeg = L.icon({
	iconUrl: 'leaflet/images/negatif.png',
	iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 14], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -14] // point from which the popup should open relative to the iconAnchor    
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
	center: [14.564003, -14.619520],
	zoom: 7,
	layers: [cities, streets]
});


$(document).ready(function(){
    var markers_array = [];
    var individuals = [];
	//var date_prelevement = [];
	var date_prelevement2 = [];
	var markers_array_vect = [];
    var gl_date = [];
	
      
 	$.post('post_map.php', function(data) {
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
			 		+ "<option value=1100>1100</option>"
			 		+ "<option value=1200>1200</option>"
			 		+ "<option value=1300>1300</option>"
			 		+ "<option value=1400>1400</option>"
			 		+ "<option value=1500>1500</option>"
			 		+ "<option value=1600>1600</option>"
			 		+ "<option value=1700>1700</option>"
			 		+ "<option value=1800>1800</option>"
			 		+ "<option value=1900>1900</option>"
			 		+ "<option value=2000>2000</option>"
			 		+ "</select>";
	 	
    	$.each($.parseJSON(data), function(k, v) {
    		var coords = (v['q_4']).split(",");
    		var nbChiens = (v['q_39']).split(",")[0];
    		var nbChats = (v['q_39']).split(",")[1]==null?  '' : (v['q_39']).split(",")[1];
    		
    		var lat = parseFloat(coords[0]);
    		var lon = parseFloat(coords[1]);
    		
    		if(!isNaN(lat) && !isNaN(lon)){
    			var chiens = "<image src='../images/dog.png' height='20px;' width='20px;' />";
    			var chats = "<image src='../images/cat.png' height='30px;' width='30px;' />"
    			var lab = '<b>No Questionnaire : </b>' + v['q_62']
    				+"<br/><b>Region : </b>" + v['q_63']
    			 
    				+"<br/><b> "+chiens+" : </b>" + nbChiens
    				+"<br/><b>"+chats+" : </b>" + nbChats
    				+"<br/><b>Rayon: </b><select style = 'width:50px;' id='select_"+v['id']+"'>"+ select + ' m&egrave;tres';
    			if(nbChiens>=1){
    				markers_array.push(L.marker([lat, lon],{icon: iconPos})
    			    		.addTo(map)
    			    		.bindPopup(lab+'<br/><a href="#" onclick="markerOnClick('
    			    				+lat+','
    			    				+lon + ',' 
    			    				+ '\'rgba(250,0,0,.4)\'' 
    			    				+ ',' + v['id'] + ',' 
    			    				+ '\'select_\'' 
    			    				+')">Encercler<a/>'));
    			} else{
    				markers_array.push(L.marker([lat, lon],{icon: iconNeg})
    			    		.addTo(map)
    			    		.bindPopup(lab+'<br/><a href="#" onclick="markerOnClick('
    			    				+lat+','
    			    				+lon + ',' 
    			    				+ '\'rgba(250,0,0,.4)\'' 
    			    				+ ',' + v['id'] + ',' 
    			    				+ '\'select_\'' 
    			    				+')">Encercler<a/>'));
    			}
    				
			}
    	});

    });
	L.control.layers(baseLayers, overlays).addTo(map);	
});
