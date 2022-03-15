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
${
demo
.css
}
</style>
<script type="text/javascript">
		$(document).ready(function() {   		
			$(function () {
				$.post('post_bar_by_sex.php', function(data){
					var dd = [];

					var femme_pos = null;
					var femme_neg = null;
					var femme_nan = null;
	
					var homme_pos = null;
					var homme_neg = null;
					var homme_nan = null;	
						
					var femme_rep = [];
					var homme_rep = [];
						
					$.each($.parseJSON(data), function(k, v){
			            var d =  new Object();
			            d.name = "Homme";
			            d.y = parseFloat(v['Homme']);
			            d.drilldown = "Homme";
			            dd.push(d);

			            d =  new Object();
			            d.name = "Femme";
			            d.y = parseFloat(v['Femme']);
			            d.drilldown = "Femme";
			            dd.push(d);

			            femme_rep.push(['positif',parseInt(v['femme_pos'])]);
			            femme_rep.push(['negatif',parseInt(v['femme_neg'])]);
			            femme_rep.push(['en cours',parseInt(v['femme_nan'])]);
							
			            homme_rep.push(['positif',parseInt(v['homme_pos'])]);
			            homme_rep.push(['negatif',parseInt(v['homme_neg'])]);
			            homme_rep.push(['en cours',parseInt(v['homme_nan'])]);
			        });	
			        
			    // Create the chart
			    $('#container').highcharts({
			        chart: {
			            type: 'pie'
			        },
			        
			        title: {
			        	style:{ "fontSize": "14px"},
			            text: 'R\351partition Homme-Femme'
			        },
			        subtitle: {
			            text: 'Cliquer sur un sexe pour voir la r\351partition des cas'
			        },
			        plotOptions: {
			            series: {
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.name}: {point.y:.0f}'
			                }
			            }
			        },
			
			        tooltip: {
			            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
			        },
			        series: [{
			            name: "Sexe",
			            colorByPoint: true,
			            data: dd
			        }],
			        drilldown: {
			        	
			            series: [{
			                name: "Homme",
			                id: "Homme",
			                colors : ['red','black','gray'],
			                data: homme_rep
			            }, {
			                name: "Femme",
			                id: "Femme",
			                colors : ['red','black','gray'],
			                data: femme_rep
			            }]
			        }
			    });
			});
			});
});
		</script>
</head>
<body>
	<script src="../../js/highcharts.js"></script>
	<script src="../../js/modules/data.js"></script>
	<script src="../../js/modules/drilldown.js"></script>

	<div id="container"
		style="min-width: 310px; max-width: 600px; height: 400px; margin: 0 auto"></div>


</body>
</html>
