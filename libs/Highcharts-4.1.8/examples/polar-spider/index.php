<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Highcharts Example</title>

<script type="text/javascript"
	src="jquery.js"></script>
<style type="text/css">
${
demo
.css
}
</style>
<script type="text/javascript">
$(function () {
	$.post('post_bar_by_symptome.php', function(data) {
		
        var p = [];
        var n = [];
        $.each($.parseJSON(data), function(k, v) {
            console.log(v['statut']);
            if(parseInt(v['statut']) == 1){
				p = v;
            } else if(parseInt(v['statut']) == 2){
					n = v;
                }
            
        });	
    $('#container').highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Symptomatologie des cas',
            x: -80
        },

        pane: {
            size: '80%'
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
                         "icteres"],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        colors: ['red', '#0d233a'],
        series: [{

            name: 'positif(s)',
            data: [parseInt(p["cephalee"]),
                   parseInt(p["fievre"]),
                   parseInt(p["douleurs_yeux"]),
                   parseInt(p["douleurs_musculaires"]),
                   parseInt(p["douleurs_articulaires"]),
                   parseInt(p["eruptions_cutanees"]),
                   parseInt(p["nausees_vomissements"]),
                   parseInt(p["toux"]),
                   parseInt(p["petechies"]),
                   parseInt(p["selles_sang"]),
                   parseInt(p["saigne_gencive"]),
                   parseInt(p["congestions_nasales"]),
                   parseInt(p["icteres"])],
            pointPlacement: 'on'
        }, {
            name: 'negatif(s)',
            data: [parseInt(n["cephalee"]),
                   parseInt(n["fievre"]),
                   parseInt(n["douleurs_yeux"]),
                   parseInt(n["douleurs_musculaires"]),
                   parseInt(n["douleurs_articulaires"]),
                   parseInt(n["eruptions_cutanees"]),
                   parseInt(n["nausees_vomissements"]),
                   parseInt(n["toux"]),
                   parseInt(n["petechies"]),
                   parseInt(n["selles_sang"]),
                   parseInt(n["saigne_gencive"]),
                   parseInt(n["congestions_nasales"]),
                   parseInt(n["icteres"])],
            pointPlacement: 'on'
        }]

    });
	 });	
});
		</script>
</head>
<body>
	<script src="../../js/highcharts.js"></script>
	<script src="../../js/highcharts-more.js"></script>
	<script src="../../js/modules/exporting.js"></script>

	<div id="container"
		style="min-width: 400px; max-width: 600px; height: 400px; margin: 0 auto"></div>

</body>
</html>
