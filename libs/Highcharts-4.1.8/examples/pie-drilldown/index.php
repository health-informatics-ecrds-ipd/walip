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
	$.post('post_bar.php', function(data) {
		var positives = [];
        var negatives = [];
        
        var npositves = 0;
        var nnegatives = 0;
        var lab = [];
        
        $.each($.parseJSON(data), function(k, v) {
            //console.log(v);
            lab.push(v['day']);
            positives.push(parseInt(v['positif']));
            npositves += parseInt(v['positif']);
            negatives.push(parseInt(v['negatif']));
            nnegatives += parseInt(v['negatif']);
        });	

        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'EVOLUTION JOURNALIERE / [' + npositves + ' POSITIF(S),  ' + nnegatives + ' NEGATIF(S)]'
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
                reversed: true
            },
            colors: ['red', '#0d233a'],
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
                name: 'positifs',
                data: positives
            }, {
                name: 'negatifs',
                data: negatives
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
