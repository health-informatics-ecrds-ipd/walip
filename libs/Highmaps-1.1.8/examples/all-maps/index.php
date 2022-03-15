<!DOCTYPE HTML>
<html>
    <head >
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Highmaps Example</title>

        <script type="text/javascript" src="jquery.js"></script>
        <style type="text/css">


            #demo-wrapper {
                max-width: 1000px;
                margin: 0 auto;
                height: 560px;
            }
            #mapBox {
                width: 100%;
                
            }
            #container {
                height: 500px;
            }
            #sideBox {
                float: right;
                width: 16%;   
                margin: 100px 1% 0 1%;
                padding-left: 1%;
                border-left: 1px solid silver;
                display: none;
            }
            #infoBox {
                margin-top: 10px;
            }
            .or-view-as {
                margin: 0.5em 0;
            }
            #up {
                height: 20px;
                max-width: 400px;
                margin: 0 auto;
            }
            #up a {
                cursor: pointer;
                padding-left: 40px;
            }
            .selector {
                height: 40px;
                max-width: 400px;
                margin: 0 auto;
                position: relative;
            }
            .selector .prev-next {
                position: absolute;
                padding: 0 10px;
                font-size: 30px;
                line-height: 20px;
                background: white;
                font-weight: bold;
                color: #999;
                top: -2px;
                display: none;
                border: none;
            }
            .selector .custom-combobox {
                display: block;
                position: absolute;
                left: 40px;
                right: 110px;
            }
            .selector .custom-combobox .custom-combobox-input {
                position: absolute;
                font-size: 14px;
                color: silver;
                border-radius: 0;
                height: 24px;
                display: block;
                background: url(search.png) 5px 5px no-repeat white;
                padding: 1px 5px 1px 30px;
                width: 100%;
            }
            .selector .custom-combobox .ui-autocomplete-input:focus {
                color: black;
            }
            .selector .custom-combobox .ui-autocomplete-input.valid {
                color: black;
            }
            .selector .custom-combobox-toggle {
                position: absolute;
                display: block;
                right: -78px;
                border-radius: 0;
            }

            .selector #btn-next-map {
                right: -12px;
            }
            .ui-autocomplete {
                max-height: 500px;
                overflow: auto;
            }
            .ui-autocomplete .option-header {
                font-style: italic;
                font-weight: bold;
                margin: 5px 0;
                font-size: 1.2em;
                color: gray;
            }

            .loading {
                margin-top: 10em;
                text-align: center;
                color: gray;
            }
            .ui-button-icon-only .ui-button-text {
                height: 26px;
                padding: 0 !important;
                background: white;
            }
            #infoBox .button {
                border: none;
                border-radius: 3px;
                background: #a4edba;
                padding: 5px;
                color: black;
                text-decoration: none;
                font-size: 12px;
                white-space: nowrap;
                cursor: pointer;
                margin: 0 3px;
                line-height: 30px;
            }

            @media (max-width: 768px) {
                #demo-wrapper {
                    width: auto;
                    height: auto;
                }
                #mapBox {
                    width: auto;
                    float: none;
                }
                #container {
                    height: 310px;
                }
                #sideBox {
                    float: none;
                    width: auto;
                    margin-top: 0;
                    border-left: none;
                    border-top: 1px solid silver;
                }
            }



        </style>
        <script type="text/javascript">
            
            $(function() {

                /**
                 * This is a complicated demo of Highmaps, not intended to get you up to speed
                 * quickly, but to show off some basic maps and features in one single place.
                 * For the basic demo, check out http://www.highcharts.com/maps/demo/geojson instead.
                 */

                // Base path to maps
                var baseMapPath = "http://code.highcharts.com/mapdata/",
                        showDataLabels = false, // Switch for data labels enabled/disabled
                        mapCount = 0,
                        searchText,
                        mapOptions = '';

                // Populate dropdown menus and turn into jQuery UI widgets
                $.each(Highcharts.mapDataIndex, function(mapGroup, maps) {
                    if (mapGroup !== "version") {
                        mapOptions += '<option class="option-header">' + mapGroup + '</option>';
                        $.each(maps, function(desc, path) {
                            mapOptions += '<option value="' + path + '">' + desc + '</option>';
                            mapCount += 1;
                        });
                    }
                });
                searchText = 'Search ' + mapCount + ' maps';
                mapOptions = '<option value="custom/world.js">' + searchText + '</option>' + mapOptions;
                $("#mapDropdown").append(mapOptions).combobox();

                // Change map when item selected in dropdown
                $("#mapDropdown").change(function() {
                    var $selectedItem = $("option:selected", this),
                            mapDesc = $selectedItem.text(),
                            mapKey = this.value.slice(0, -3),
                            svgPath = baseMapPath + mapKey + '.svg',
                            geojsonPath = baseMapPath + mapKey + '.geo.json',
                            javascriptPath = baseMapPath + this.value,
                            isHeader = $selectedItem.hasClass('option-header');

                    // Dim or highlight search box
                    if (mapDesc === searchText || isHeader) {
                        $('.custom-combobox-input').removeClass('valid');
                        location.hash = '';
                    } else {
                        $('.custom-combobox-input').addClass('valid');
                        location.hash = mapKey;
                    }

                    if (isHeader) {
                        return false;
                    }

                    // Show loading
                    if ($("#container").highcharts()) {
                        $("#container").highcharts().showLoading('<i class="fa fa-spinner fa-spin fa-2x"></i>');
                    }


                    // When the map is loaded or ready from cache...
                    function mapReady() {

                        var mapGeoJSON = Highcharts.maps[mapKey],
                                data = [],
                                parent,
                                match;

                        // Update info box download links
                        $("#download").html(
                                '<a class="button" target="_blank" href="http://jsfiddle.net/gh/get/jquery/1.11.0/' +
                                'highslide-software/highcharts.com/tree/master/samples/mapdata/' + mapKey + '">' +
                                'View clean demo</a>' +
                                '<div class="or-view-as">... or view as ' +
                                '<a target="_blank" href="' + svgPath + '">SVG</a>, ' +
                                '<a target="_blank" href="' + geojsonPath + '">GeoJSON</a>, ' +
                                '<a target="_blank" href="' + javascriptPath + '">JavaScript</a>.</div>'
                                );

                       
                        // Show arrows the first time a real map is shown
                        if (mapDesc !== searchText) {
                            $('.selector .prev-next').show();
                            $('#sideBox').show();
                        }

                        // Is there a layer above this?
                        match = mapKey.match(/^(countries\/[a-z]{2}\/[a-z]{2})-[a-z0-9]+-all$/);
                        if (/^countries\/[a-z]{2}\/[a-z]{2}-all$/.test(mapKey)) { // country
                            parent = {
                                desc: 'World',
                                key: 'custom/world'
                            };
                        } else if (match) { // admin1
                            parent = {
                                desc: $('option[value="' + match[1] + '-all.js"]').text(),
                                key: match[1] + '-all'
                            };
                        }
                        $('#up').html('');
                        if (parent) {
                            $('#up').append(
                                    $('<a><i class="fa fa-angle-up"></i> ' + parent.desc + '</a>')
                                    .attr({
                                        title: parent.key
                                    })
                                    .click(function() {
                                        $('#mapDropdown').val(parent.key + '.js').change();
                                    })
                                    );
                        }
                        // specification des parametres ...
                        var sexe = "<?php if (isset($_GET['sexe'])) echo ($_GET['sexe']); else echo ""; ?>";
                        var yf = "<?php if (isset($_GET['yf'])) echo ($_GET['yf']); else echo ""; ?>";
                        var annee = "<?php if (isset($_GET['annee'])) echo ($_GET['annee']); else echo ""; ?>";
                        var bd = "<?php if (isset($_GET['bd'])) echo ($_GET['bd']); else echo ""; ?>";
                        var serie_name = "";
                        
                        if(yf=='1'){
                            serie_name = 'IgM YF (+)';
                        }
                        else if (yf == '2'){
                            serie_name = 'IgM YF (-)';
                        }
                        else {
                            serie_name = 'Nbre de prlvt(s)';
                        }
                       
                        // chargement des données (pays)...  
                        $.ajax({
                            type: "POST",     
                            async: false,
                            url: "post_get_data_for_map.php",   
                            data: {
                              'sexe':sexe  ,
                              'yf' :yf,
                              'annee':annee,
                              'bd':bd
                            },
                            success: function(result){                               
                                var res = $.parseJSON(result);
                                $.each(res, function(k,v){
                                    var vv = $.parseJSON(v);
                                    data.push({
                                        key: vv.k ,
                                        value : vv.v
                                    }) ;                                 
                                });
                            }
                        });
                        
                        // chargement des données (regions)... 
                        
                        $.ajax({
                            type: "POST",     
                            async: false,                           
                            url: "post_get_district_data_for_map.php",   
                            data: {
                              'sexe':sexe ,
                              'yf' :yf,
                              'annee':annee  
                            },
                            success: function(result){                               
                                var res = $.parseJSON(result);
                                $.each(res, function(k,v){
                                    var vv = $.parseJSON(v);
                                    data.push({
                                        key: vv.k ,
                                        value : vv.v
                                    }) ;                                 
                                });
                            }
                        });
                        //data.push({key:"sn-dk", value:"300"})
                        // Instantiate chart
                        $("#container").highcharts('Map', {
                            title: {
                                text: "Repartition Geographique"
                            },
                            mapNavigation: {
                                enabled: true
                            },
                            colorAxis: {
                                min: 0,
                                stops: [
                                    [0, '#EFEFFF'],
                                    [0.5, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                                ]
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'left',
                                verticalAlign: 'bottom'
                            },
                            series: [{
                                    data: data,
                                    mapData: mapGeoJSON,
                                    joinBy: ['hc-key', 'key'],
                                    name: serie_name,
                                    states: {
                                        hover: {
                                            color: Highcharts.getOptions().colors[2]
                                        }
                                    },
                                    dataLabels: {
                                        enabled: showDataLabels,
                                        formatter: function() {
                                            return mapKey === 'custom/world' || mapKey === 'countries/us/us-all' ?
                                                    (this.point.properties && this.point.properties['hc-a2']) :
                                                    this.point.name;
                                        }
                                    },
                                    point: {
                                        events: {
                                            // On click, look for a detailed map
                                            click: function() {
                                                var key = this.key;
                                                $('#mapDropdown option').each(function() {
                                                    if (this.value === 'countries/' + key.substr(0, 2) + '/' + key + '-all.js') {
                                                        $('#mapDropdown').val(this.value).change();
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }, {
                                    type: 'mapline',
                                    name: "Separators",
                                    data: Highcharts.geojson(mapGeoJSON, 'mapline'),
                                    nullColor: 'gray',
                                    showInLegend: false,
                                    enableMouseTracking: false
                                }]
                        });
                        showDataLabels = $("#chkDataLabels").attr('checked');
                    }
                    // Check whether the map is already loaded, else load it and
                    // then show it async
                    if (Highcharts.maps[mapKey]) {
                        mapReady();
                    } else {
                        $.getScript(javascriptPath, mapReady);
                    }
                });
                
                                
                // Toggle data labels - Note: Reloads map with new random data
                $("#chkDataLabels").change(function() {
                    showDataLabels = $("#chkDataLabels").attr('checked');
                    $("#mapDropdown").change();
                });

                // Switch to previous map on button click
                $("#btn-prev-map").click(function() {
                    $("#mapDropdown option:selected").prev("option").prop("selected", true).change();
                });

                // Switch to next map on button click
                $("#btn-next-map").click(function() {
                    $("#mapDropdown option:selected").next("option").prop("selected", true).change();
                });

                // Trigger change event to load map on startup
                if (location.hash) {
                    $('#mapDropdown').val(location.hash.substr(1) + '.js');
                } else { // for IE9
                    $($('#mapDropdown option')[0]).attr('selected', 'selected');
                }
                $('#mapDropdown').change();
            });
            
            $(document).ready(function(){
               $('#refresh_map').click(function(){
                   
               }) ;
            });
        </script>
    </head>
    <body  >
        <script src="../../js/highmaps.js"></script>
        <script src="http://code.highcharts.com/mapdata/index.js?1"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
        <script src="http://www.highcharts.com/samples/maps/demo/all-maps/jquery.combobox.js"></script>

        <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/jquery-ui.css" rel="stylesheet">
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

        <div id="demo-wrapper">
            <div id="mapBox">
                
                <div id="up"></div>
                <div class="selector">
                    <button id="btn-prev-map" class="prev-next"><i class="fa fa-angle-left"></i></button>
                    <select id="mapDropdown" class="ui-widget combobox" ></select>
                    <button id="btn-next-map" class="prev-next"><i class="fa fa-angle-right"></i></button>
                </div>
                <input type="checkbox" id="chkDataLabels" checked='checked' />
                <label for="chkDataLabels" style="display: inline">Data labels</label>
               
                <div id="container"></div> 
                
            </div>

        </div>

    </body>
</html>
