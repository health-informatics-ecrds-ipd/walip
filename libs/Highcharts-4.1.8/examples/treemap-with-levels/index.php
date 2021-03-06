<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

<script type="text/javascript"  src="jquery.js"  ></script>
<style type="text/css">
    #container {
            height:600px;
            width: 890px;
    }
</style>

<script type="text/javascript">   
$(document).ready(function (){
    function chart(sexe, annee) {
        $.post('post_get_data.php',{'sexe':sexe,'annee':annee}, function (d) {
            d = $.parseJSON(d);
            var mydata = [];

            $.each(d, function(key, value){
                var v = $.parseJSON(value);
                var color  =  "#"+((1<<24)*Math.random()|0).toString(16);
                mydata.push({
                    id : v.pays,
                    name: v.pays,
                    color: color
                });
            });   

            $.post('post_get_data_positifs.php',{'sexe':sexe,'annee':annee}, function (d) {
                d = $.parseJSON(d);
                $.each(d, function(key, value){
                    var v = $.parseJSON(value);              
                    mydata.push({
                        name: v.pays + " (+)" ,
                        parent: v.pays,
                        value: parseInt(v.nb)
                    });
                }); 
                $.post('post_get_data_negatifs.php',{'sexe':sexe,'annee':annee}, function (d) {
                    d = $.parseJSON(d);
                    $.each(d, function(key, value){
                        var v = $.parseJSON(value);              
                        mydata.push({
                            name: v.pays +  " (-)",
                            parent: v.pays,
                            value: parseInt(v.nb)
                        });
                    }); 
                    $.post('post_get_data_autres.php',{'sexe':sexe,'annee':annee}, function (d) {
                        d = $.parseJSON(d);
                        $.each(d, function(key, value){
                            var v = $.parseJSON(value);              
                            mydata.push({
                                name: v.pays +  " (NA)",
                                parent: v.pays,
                                value: parseInt(v.nb)
                            });
                        }); 

                        $('#container').highcharts({
                            series: [{
                                type: "treemap",
                                layoutAlgorithm: 'stripes',
                                alternateStartingDirection: true,
                                levels: [{
                                    level: 1,
                                    layoutAlgorithm: 'sliceAndDice',
                                    dataLabels: {
                                        enabled: true,
                                        align: 'left',
                                        verticalAlign: 'top',
                                        style: {

                                            fontSize: '8px',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }],
                                data: mydata
                            }],
                            title: {
                                text: 'Resultats IgM Fievre Jaune Par Pays'
                            }
                        });
                     });
                });
            });
        });
    };
    var sexe = "<?php if (isset($_GET['sexe'])) echo ($_GET['sexe']); else echo ""; ?>"; 
    var annee = "<?php if (isset($_GET['annee'])) echo ($_GET['annee']); else echo ""; ?>";
 //   alert(sexe+' - '+annee);
    chart(sexe,annee);   
});
		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/treemap.js"></script>
<div id="container"></div>
	</body>
</html>
