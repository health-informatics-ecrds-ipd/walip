<script src="jquery.js"></script>
<script src="highcharts.js"></script>
<script src="exporting.js"></script>
<script src="highcharts-regression.js"> </script>

<h1> R&eacute;gression Lin&eacute;aire </h1>
<div id="container" style="min-width: 310px; height: 550px; margin: 0 auto"></div>

<script>
    $(document).ready(function(){
        $.post("post_get_data.php", function(d){
            var dd = $.parseJSON(d);
            
            //console.log(dd);
            $(function () {
                $('#container').highcharts({
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Titre'
                    },
                    subtitle: {
                        text: 'Institut Pasteur de Dakar'
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Abcisses'
                        },
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Ordonnees'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 100,
                        y: 70,
                        floating: true,
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.x} xx, {point.y} yy'
                            }
                        }
                    },
                    series: [{
                        regression: true ,
                        regressionSettings: {
                            type: 'linear',
                            color:  'rgba(223, 83, 83, .9)'
                        },
                        name: 'Individu',
                        color: 'rgba(223, 83, 83, .5)',
                        data: dd
                    }]
                });
            });
        });
        
        
    
    });
</script>