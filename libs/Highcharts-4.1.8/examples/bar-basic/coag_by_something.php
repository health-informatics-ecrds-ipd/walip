
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title></title>

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
                
            	group = '<?php echo $_GET['group']; ?>';

                $.post('post_coag_by_something.php', {'group':group}, function(data) {
                    data = $.parseJSON(data);
                    
                    col  = null;
                    
                    if(group == 'no_grappe'){
						col = '#0d233a';
                    }

                    else if(group == 'district'){
						col = 'green';
                    }

                    else{
                    	col = 'orange';
                    }
                  	
                    $('#container').highcharts({
            	        chart: {
            	            type: 'column'
            	        },
            	        title: {
            	        	style:{ "fontSize": "14px"},
            	            text: ''
            	        },
            	        tooltip: {
            	            valueSuffix: ''
            	        },
            	        xAxis: {
            	            categories: data['category'],
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
            	        colors: [col],
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
            	            name: group == 'no_grappe' ? 'NOMBRE DE PRELEVEMENT PAR N° DE GRAPPE' :  group == 'district' ? 'NOMBRE DE PRELEVEMENT PAR DISTRICT' : group == 'sexe' ? 'NOMBRE DE PRELEVEMENT PAR SEXE' : '',
            	            data: data['n']
            	        }]
            	    });
            	    //....	
                    $.unblockUI();
                });
            });
		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/exporting.js"></script>

<div id="container" style=" height: 400px; margin: 0 auto"></div>

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
