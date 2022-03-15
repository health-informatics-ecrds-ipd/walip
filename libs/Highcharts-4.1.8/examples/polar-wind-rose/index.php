<?php
	session_start();
	require '../../../../connect.php';
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
			$.post('post_get_data.php', function(data) {
				data =  $.parseJSON(data);
				var positives = [];
		        var negatives = [];
		        
		        var npositves = 0;
		        var nnegatives = 0;
		        var lab = [];
		        
		        $.each(data, function(k, v) {
		            lab.push(v['day']);
		            positives.push(parseInt(v['positif']));
		            npositves += parseInt(v['positif']);
		            negatives.push(parseInt(v['negatif']));
		            nnegatives += parseInt(v['negatif']);
		        });	
			
				$(function () {
				    // Parse the data from an inline table using the Highcharts Data plugin
				    $('#container').highcharts({
				        data: {
				            table: 'freq',
				            startRow: 1,
				            endRow: data.length,
				            endColumn: 2
				        },
				        colors : ["black","red"],
				        chart: {
				            polar: true,
				            type: 'bar',
				            
				        },
				
				        title: {
				            text: 'REPARTITION PAR STRUCTURE DE SANTE / [' + npositves + ' POSITIFS,  ' + nnegatives + ' NEGATIFS]'
				        },
				
				        
				
				        pane: {
				            size: '90%'
				        },
				
				        legend: {
				        	reversed: false
				        },
				
				        xAxis: {
				            tickmarkPlacement: 'on'
				        },
				
				        yAxis: {
				            min: 0,
				            endOnTick: false,
				            showLastLabel: true,
				            title: {
				                text: ''
				            },
				            labels: {
				                formatter: function () {
				                    return this.value + '';
				                }
				            },
				            reversedStacks: false
				        },
				
				        tooltip: {
				            valueSuffix: ''
				        },
				
				        plotOptions: {
				            series: {
				                stacking: 'normal',
				                shadow: false,
				                groupPadding: 0,
				                pointPlacement: 'on'
				            }
				        }
				    });
				});//
			});
		});
		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/highcharts-more.js"></script>
<script src="../../js/modules/data.js"></script>
<script src="../../js/modules/exporting.js"></script>

<div id="container" style="min-width: 420px; max-width: 750px; height: 520px; margin: 0 auto"></div>

<div style="display:none">
	<!-- Source: http://or.water.usgs.gov/cgi-bin/grapher/graph_windrose.pl -->
	<table id="freq" border="0" cellspacing="0" cellpadding="0">
		<tr nowrap bgcolor="#CCCCFF">
			<th colspan="9" class="hdr">Table of Frequencies (percent)</th>
		</tr>
		<?php 
			$res = mysqli_query($link, 
				"SELECT  count( if(". $_SESSION['diagnostique'] ." = 1 ,1,NULL)) AS positif ,
    					 count( if(". $_SESSION['diagnostique'] ." = 2 ,1,NULL)) AS negatif,
					     CASE 
							WHEN (district IS NULL OR district LIKE '') THEN 'non renseigné' ELSE district
							END AS day 
				FROM cnrfj 
				WHERE no_epid LIKE '". $_SESSION['investigation'] ."%' "."GROUP BY district"); 
		?>
		<tr nowrap bgcolor="#CCCCFF">
			<th class="freq">Direction</th>
			<th class="freq">Négatif(s)</th>
			<th class="freq">Positif(s)</th>
			<th class="freq">Total</th>
		</tr>
				
        <?php while($data = mysqli_fetch_array($res) ){ ?>
			
			<tr nowrap>
				<td class="dir"><?php echo $data['day']; ?></td>
				<td class="data"><?php echo $data['negatif']; ?></td>
				<td class="data"><?php echo $data['positif']; ?></td>
				<td class="data"><?php echo ($data['positif'] + $data['negatif']); ?></td>
			</tr>
		<?php } ?>
	</table>
</div>


	</body>
</html>
