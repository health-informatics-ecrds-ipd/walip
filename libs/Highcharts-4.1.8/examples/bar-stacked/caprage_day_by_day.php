<?php
	session_start();
	/*
	if (isset($_SESSION['investigation']) === false) {
	  	echo "<h3>Veuillez selectionner une investigation et un pathogène</h3>"  ;
	    exit();
	} 
	*/
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
var localite = <?php echo $_GET['localite']; ?>;	
$(function () {
	$.post('post_caprage_dbd.php',{'localite':localite}, function(data) {		
		var positives = [];
        var negatives = [];
        
        var npositves = 0;
        var nnegatives = 0;
        var lab = [];
        
        $.each($.parseJSON(data), function(k, v) {
            lab.push(v['day']);
            positives.push(parseInt(v['nb']));
            npositves += parseInt(v['nb']);
            negatives.push(parseInt(0));
            nnegatives += parseInt(0);
            var localite = v['localite'];
        });	

        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: "EVOLUTION JOURNALIERE, "+localite.toUpperCase()+" / TOTAL : ["+npositves+"]"
            },
            xAxis: {
                categories: lab
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Nombre de foyer(s) enquet\351(s)"
                }
            },
            legend: {
                reversed: true
            },
            colors: ['#0d233a', '#0d233a'],
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                column: {
                	groupPadding: 0,
                    pointPadding: 0,
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        overflow: 'none'
                    }
                }
            },
            series: [{
            	showInLegend: true,               
                name: "<b>Nbre de Foyer(s) Enquet\351(s)</b>",
                data: positives,
            }]
        });
    });
    
    
});

});
		</script>
	</head>
	<body >
	<script src="../../js/highcharts.js"></script>
	<script src="../../js/modules/exporting.js"></script>
	
	
	<div id="container" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>


	</body>
</html>
