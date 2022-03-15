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
		var p = [];
        var n = [];
        $.each($.parseJSON(data), function(k, v) {
            if(parseInt(v['statut']) == 1){
				p = v;
            } else if(parseInt(v['statut']) == 2){
					n = v;
                }
        });	

		console.log(p['npos']);
		        
        var datap = [  parseFloat((parseFloat(parseInt(p["cephalee"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["fievre"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["douleurs_yeux"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["douleurs_musculaires"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["douleurs_articulaires"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["eruptions_cutanees"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["nausees_vomissements"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["toux"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["petechies"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["selles_sang"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["saigne_gencive"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["congestions_nasales"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["manifestations_hemorragiques"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["meningo_encephalite"])/p['npos']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["icteres"])/p['npos']) * 100).toFixed(2))];
        
        var datan = [  parseFloat((parseFloat(parseInt(n["cephalee"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["fievre"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["douleurs_yeux"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["douleurs_musculaires"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["douleurs_articulaires"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["eruptions_cutanees"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["nausees_vomissements"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["toux"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["petechies"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["selles_sang"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["saigne_gencive"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["congestions_nasales"])/n['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["manifestations_hemorragiques"])/p['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(p["meningo_encephalite"])/p['nneg']) * 100).toFixed(2)),
                       parseFloat((parseFloat(parseInt(n["icteres"])/n['nneg']) * 100).toFixed(2))];
        //console.log(datan);
	    $('#container').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	        	style:{ "fontSize": "14px"},
	            text: 'R\351partition symptomatologique'
	        },
	        tooltip: {
	            valueSuffix: '%'
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
	                         "manifestations_hemorragiques",
	                         "meningo_encephalite",
	                         "icteres"],
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            max:100,
	            title: {
	                text: '',
	                align: 'high'
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        colors: ['red', '#0d233a'],
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: false
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
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
	            name: 'Positif(s)',
	            data: datap
	        }, {
	            name: 'N\351gatif(s)',
	            data: datan
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
