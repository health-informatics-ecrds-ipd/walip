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
$(document).ready(function() {   
	
$(function () {
	$.post('post_bar_by_sex.php', function(data) {
		var positives_pcr = [];
		var npositves_pcr = 0;

		var positives_serologie = [];
        var npositves_serologie = 0;
		
        var negatives = [];
        var nnegatives = 0;
        
        var en_cours = [];
        var nen_cours = 0;
        var lab = [];
        
        $.each($.parseJSON(data), function(k, v) {
            //console.log(v);
            lab.push(v['day']);
            positives_pcr.push(parseInt(v['positif_pcr']));
            npositves_pcr += parseInt(v['positif_pcr']);

            positives_serologie.push(parseInt(v['positif_serologie']));
            npositves_serologie += parseInt(v['positif_serologie']);
            
            negatives.push(parseInt(v['negatif']));
            nnegatives += parseInt(v['negatif']);
            en_cours.push(parseInt(v['en_cours']));
            nen_cours += parseInt(v['en_cours']);
        });	
		var npositives = npositves_serologie + npositves_pcr;

        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
            	style:{ "fontSize": "14px"},
                text: "REPARTITION HOMME-FEMME / ["+(npositives)+" Pos ("+npositves_pcr+" PCR, "+npositves_serologie+" S\351ro.), "+nnegatives+" N\351g, "+nen_cours+" EN COURS]" 
            },
            xAxis: {
                categories: lab
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Nombre d'\351chantillons test\351s"
                }
            },
            legend: {
                reversed: false
            },
            colors:['grey', '#0d233a', 'rgba(255, 0, 0, .4)','red' ],
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                column: {
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        overflow: 'none'
                    }
                }
            },
            series: [{
					    name: 'en cours',
					    data: en_cours
					},
					
		            {
		                name: 'negatifs',
		                data: negatives
		            },
					{
		                name: 'positifs (Serologie)',
		                data: positives_serologie
		            },
					{
					    name: 'positifs (PCR)',
					    data: positives_pcr
					}]
        });
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
