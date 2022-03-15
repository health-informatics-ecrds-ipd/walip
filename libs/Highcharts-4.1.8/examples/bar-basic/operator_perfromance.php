<?php
session_start();
if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'data_entry_perf') === false) {
    exit();
}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript"  src="blockui.js"></script>
		<style type="text/css">
${demo.css}
		</style>
		<script type="text/javascript">
$(function () {
	
	$.blockUI({
        message: $('#wait_for_validation')
    });
    
	var days = [];
    var n = [];
    var n2 = [];
    var n3 = [];
	var recordGroup = "complete_records_with_id";
$.post('post_operator_performance.php',{'recordGroup':recordGroup}, function(data) {
		
        $.each($.parseJSON(data), function(k, v) {
            days.push(v['jour']);
            n.push(parseInt(v['n']));
        });	

        recordGroup = "complete_records_without_id";
        $.post('post_operator_performance.php', {'recordGroup':recordGroup}, function(data) {
            $.each($.parseJSON(data), function(k, v) {
                days.push(v['jour']);
                n2.push(parseInt(v['n']));
            });	

            recordGroup = "complete_records";
            $.post('post_operator_performance.php', {'recordGroup':recordGroup}, function(data) {
                $.each($.parseJSON(data), function(k, v) {
                    days.push(v['jour']);
                    n3.push(parseInt(v['n']));
                });
              //....
                $('#container').highcharts({
        	        chart: {
        	            type: 'column'
        	        },
        	        title: {
        	        	style:{ "fontSize": "14px"},
        	            text: 'PERFORMANCE SAISIE JOURNALIERE'
        	        },
        	        tooltip: {
        	            valueSuffix: ''
        	        },
        	        xAxis: {
        	        	 
        	            categories: days,
        	            title: {
        	                text: null
        	            }
        	        },
        	        yAxis: {
        	            
        	            title: {
        	                text: '',
        	                align: 'high'
        	            },
        	            labels: {
        	                overflow: 'justify'
        	            }
        	        },
        	        colors: ['#0d233a', 'green', 'orange'],
        	        plotOptions: {
        	            bar: {
        	                dataLabels: {
        	                    enabled: false
        	                }
        	            }
        	        },
        	        legend: {
                        reversed: false
                    },
        	        credits: {
        	            enabled: false
        	        },
        	        series: [{
        	            name: 'SAISIE COMPLETE AVEC ID PATIENT',
        	            data: n
        	        },
        	        {
        	            name: 'SAISIE COMPLETE SANS ID PATIENT',
        	            data: n2
        	        },
        	        {
        	            name: 'SAISIE COMPLETE',
        	            data: n3
        	        }]
        	    });
        	    //....	
                $.unblockUI();
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

<div id="wait_for_validation" style="display: none">
	<center>
	<br>
	<img src="loader_1.gif"    />
	<br>
	Chargement En Cours, Patientez...
	<br>
	<br>
	</center> 
</div>

</body>
</html>
