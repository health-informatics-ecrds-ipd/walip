<?php
	session_start();
	if (isset($_SESSION['investigation']) === false) {
	  	echo "<h3>Veuillez selectionner une investigation et un pathogène</h3>"  ;
	    exit();
	} 
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

		<script type="text/javascript" src="jquery.js"></script>
		<style type="text/css">
${demo.css}
		</style>
		<script type="text/javascript">
$(function () {
	$.post('post_cliniques.php', function(data) {
		//console.log(data); return;
		
		var p = [];
        var n = [];
        $.each($.parseJSON(data), function(k, v) {
            console.log(v['statut']);
            if(parseInt(v['statut']) == 1){
				p = v;
            } else if(parseInt(v['statut']) == 2){
					n = v;
                }
        });	
        
	    $('#container').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Historic World Population by Region'
	        },
	        subtitle: {
	            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
	        },
	        xAxis: {
	            categories: ["cephalee",
	                         "fievre",
	                         "douleurs_yeux",
	                         "douleurs_musculaires",
	                         "douleurs_articulaires",
	                         "eruptions_cutanees",
	                         "nausees_vomissements",
	                         "toux",
	                         "petechies",
	                         "selles_sang",
	                         "saigne_gencive",
	                         "congestions_nasales",
	                         "icteres"],
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Population (millions)',
	                align: 'high'
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: ' millions'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: -40,
	            y: 80,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow: true
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Year 1800',
	            data: [parseInt(p["cephalee"]),
                       parseInt(p["fievre"]),
                       parseInt(p["douleurs_yeux"]),
                       parseInt(p["douleurs_musculaires"]),
                       parseInt(p["douleurs_articulaires"]),
                       parseInt(p["eruptions_cutanees"]),
                       parseInt(p["nausees_vomissements"]),
                       parseInt(p["toux"]),
                       parseInt(p["petechies"]),
                       parseInt(p["selles_sang"]),
                       parseInt(p["saigne_gencive"]),
                       parseInt(p["congestions_nasales"]),
                       parseInt(p["icteres"])]
	        }, {
	            name: 'Year 2012',
	            data: [parseInt(n["cephalee"]),
                       parseInt(n["fievre"]),
                       parseInt(n["douleurs_yeux"]),
                       parseInt(n["douleurs_musculaires"]),
                       parseInt(n["douleurs_articulaires"]),
                       parseInt(n["eruptions_cutanees"]),
                       parseInt(n["nausees_vomissements"]),
                       parseInt(n["toux"]),
                       parseInt(n["petechies"]),
                       parseInt(n["selles_sang"]),
                       parseInt(n["saigne_gencive"]),
                       parseInt(n["congestions_nasales"]),
                       parseInt(n["icteres"])]
	        }]
	    });
	});
});
		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>

	</body>
</html>
