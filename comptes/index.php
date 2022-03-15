<?php
    session_start();
    if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
        header('location:../logout.php');
        exit();
    }
    require '../connect.php';
?>
<!DOCTYPE html>
<html> 
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z69RWHYV7M"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Z69RWHYV7M');
        </script> -->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/style-classes.css?2.1" />
        <link rel="icon" type="image/gif"   href="../images/dakar.PNG"/>
        <link href="../libs/lou-multi-select/css/multi-select.css" rel="stylesheet"/>
        <script src="../js/jquery.js"></script>
        <script type="text/javascript" src="../js/comptes.js?3.9"></script> 
        <script type="text/javascript" src="../js/globale.js"></script> 
        <script src="../libs/lou-multi-select/js/jquery.multi-select.js"></script>
        <!-- DataTables JS  -->
        <link rel="stylesheet" type="text/css" href="../libs/DataTables/responsive/css/jquery.dataTables.css">
        <link rel="stylesheet" type="text/css" href="../libs/DataTables/responsive/css/dataTables.responsive.css">
        <script type="text/javascript" language="javascript" src="../libs/DataTables/responsive/js/jquery.dataTables.js"></script>
        <script type="text/javascript" language="javascript" src="../libs/DataTables/responsive/js/dataTables.responsive.min.js"></script>
        <link type="text/css" rel="stylesheet" href="../css/jquery.autocomplete.css" />                  
		<script src="../js/jquery.autocomplete.js?1.0"></script>
        <script type="text/javascript"  src="../js/all_1.js"></script>
        <!-- BlockUI -->
        <script type="text/javascript"  src="../js/blockui.js"></script>
        <title>CNRFJ|Gestion des Comptes</title>
    </head>
    <body style="font-weight:bold; zoom: 75%;">
        <?php include('../profiles_conf.php'); ?>
        <br/>
        <br/>
      
    <center> 
        <div id="conteneur" class="conteneur" > 
            <input type="text" value="<?php echo $_SESSION['username']; ?>" id="username" style="display:none;" />
            <div class="class-menu" id = "div_top_menu" > 	
            <div id="div_hide_show"><img src="../images/plus_.png" id="img_plus"/>
        	    <img src="../images/dash.png" id="img_dash" style="display:none;"/>
        	</div>
        	<br> 
        	  <div id="div_menu">	               
                <A ID = "a_ajouter" HREF="index.php?menu=ajouter" class = "liens" >AJOUTER</A> <br/>
                <A ID = "a_modifier" HREF="index.php?menu=consulter" class = "liens" >MODIFIER</A><br/>
                <A ID = "a_consulter" HREF="index.php?menu=consulter" class = "liens" >CONSULTER</A><br/>
                <A ID = "a_historique" HREF="index.php?menu=historique" class = "liens" >HISTORIQUE</A>
              </div>
            </div>

            <div id="haut">
                <img src="../images/dakar.PNG" class="img_logo" />
            </div>

            <div id="milieu">
                <br/>
                <?php
                /*
                 *  Lequel fichier inclure dans la page principale ?
                 */
                if ( (isset($_GET['menu']) && $_GET['menu'] === 'ajouter')) {
                    include ('ajouter_modifier.php');
                } elseif (!isset($_GET['menu']) || isset($_GET['menu']) && $_GET['menu'] === 'consulter') {
                    include('consulter.php');
                } elseif (!isset($_GET['menu']) || (isset($_GET['menu']) && $_GET['menu'] === 'historique')) {
	                include('historique.php');
	            } else {
                    include('ajouter_modifier.php');
                }
                ?>
            </div>

            <div class="bas_de_page" > Institut Pasteur de Dakar, SENEGAL - &copy; 2015  </div>
        </div>
    </center>
    
    <script src="../js/all.js"></script>
    
    <script type="text/javascript" >
        // if (location.protocol !== 'https:') {
    	// 	 window.location = document.URL.replace("http://", "https://");
    	// }
    	 
        function filterGlobal() {
            $('#table_cnrfj_clients').DataTable().search(
                    $('#global_filter').val(),
                    $('#global_regex').prop('checked'),
                    $('#global_smart').prop('checked')
                    ).draw();
        }

        function filterColumn(i) {
            $('#table_cnrfj_clients, #table_fiche_prelevement').DataTable().column(i).search(
                    $('#col' + i + '_filter').val(),
                    $('#col' + i + '_regex').prop('checked'),
                    $('#col' + i + '_smart').prop('checked')
                    ).draw();
        }
/*
        function filterGlobal() {
            $('#table_fiche_prelevement').DataTable().search(
                    $('#global_filter').val(),
                    $('#global_regex').prop('checked'),
                    $('#global_smart').prop('checked')
                    ).draw();
        }

        function filterColumn(i) {
            $('#table_fiche_prelevement').DataTable().column(i).search(
                    $('#col' + i + '_filter').val(),
                    $('#col' + i + '_regex').prop('checked'),
                    $('#col' + i + '_smart').prop('checked')
                    ).draw();
        }

        */
        $(document).ready(function(){
        	//window.onload = zoomin();
            $('#a_comptes').removeClass('class_a_menu_haut');
            $('#a_comptes').addClass('class_menu_haut_active');

            if((window.location.search).indexOf('historique') != -1){
            	var table = $('#table_fiche_prelevement').DataTable({
                    "responsive": true,
                    "processing": true,
                    "serverSide": true,
                    "ajax": { url : "post_server_side_historic.php" },
                    "order": [[2, "desc"]],
                    "aoColumnDefs": [{
                            "responsive": true,
                            "aTargets": [0, 1, 2, 3],
                            "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
                                $(nTd).css('border-top', 'solid 1px #dddddd');
                                if (iRow % 2 === 0) {
                                    $(nTd).css('background', 'rgba(0,0,0,0.018)');
                                }
                                else {
                                    $(nTd).css('background', 'rgba(0,0,0,0.01)');
                                }
                                if (iCol == 0 || iCol == 1 || iCol == 2 || iCol == 3 ) {
                                    $(nTd).hover(function() {
                                        $(nTd).css('background', 'rgba(0,0,0,0.1)');
                                    }, function() {
                                        if (iRow % 2 === 0) {
                                            $(nTd).css('background', 'rgba(0,0,0,0.018)');
                                        } else {
                                            $(nTd).css('background', 'rgba(0,0,0,0.01)');
                                        }
                                    });
                                }
                            }    
                        }]
                });
            } 
            else{
		            var table = $('#table_cnrfj_clients').DataTable({
		            			"responsive": true,
		                        "processing": true,
		                        "serverSide": true,
		                        "ajax": "post_server_side.php",
		                        "order": [[1, "asc"]],
		                        
		                        "aoColumnDefs": [{
		                        		"responsive": true,
		                        		columns: [
		                        		          { responsivePriority: 0 }],
		                                "aTargets": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		                                "fnCreatedCell": function(nTd, sData, oData, iRow, iCol)
		                                {
		                                    $(nTd).css('border-top', 'solid 1px #dddddd');
		                                   
		                                    if(iCol == 6 ){
		                                        $(nTd).css('font-weight', 'bold');
		                                        if ( sData != null && sData.indexOf('>non<') >= 0){
		                                            $(nTd).css('color', 'rgba(255,0,0,0.8)');
		                                        }
		                                        else if( sData != null && sData.indexOf('>oui<')>= 0){
		                                            $(nTd).css('color', 'green');
		                                        }
		                                    }
		                                   if (iRow % 2 === 0) {
		                                        $(nTd).css('background', 'rgba(0,0,0,0.018)');
		                                    } else {
		                                        $(nTd).css('background', 'rgba(0,0,0,0.01)');
		                                    }
		                                    
		                                    if( iCol == 15 || iCol == 14 || iCol == 13 || iCol == 12 || iCol == 11 || iCol == 10 ){
		                                        $(nTd).hover(function(){
		                                             $(nTd).css('background', 'rgba(0,0,0,0.1)');
		                                            },function(){
		                                            if (iRow % 2 === 0) {
		                                                $(nTd).css('background', 'rgba(0,0,0,0.018)');
		                                            } else {
		                                                $(nTd).css('background', 'rgba(0,0,0,0.01)');
		                                            }
		                                        });
		                                   }
		                                }
		                            }]
		                    });
            }
            //table.column( 1 ).visible( false );
            
            $('input.global_filter').on('keyup', function() {
                filterGlobal();
            });

            $('input.column_filter').on('keyup', function() {
                filterColumn($(this).parents('tr').attr('data-column'));
            });

            var oData;
            var districts = [
                 "CTE HOGIP", "CTE DIAMNIADIO",
                 "CTE URG FANN", "CTE FANN",
                 "CTE DANTEC", "CTE PRINCIPAL", 
                 "CTE CLINIQUE GOLF", "CTE DALAL JAM", 
                 "CTE YOFF", "CTE FANN SENCoV", "CTE DALAL JAM SENCoV"
                 ];

            $.post("post_get_disctricts.php", function(data) {
                oData = $.parseJSON(data);

                $.each(oData, function(k, v) {
                    var oV = $.parseJSON(v);
                   	districts.push(oV['code_district']);
                });
                
                $.post("post_get_regions.php", function(data){
                	oData = $.parseJSON(data);
                	
                    $.each(oData, function(k, v) {
                        var oV = $.parseJSON(v);
                       	districts.push(oV['region']);
                    });
                    
                	$("#district").autocomplete({
                        source: [districts]
                    });
                });
            });

            laboratoire = [];
            $.post("post_get_laboratoire.php", function(data) {
                oData = $.parseJSON(data);
                $.each(oData, function(k, v) {
                    var oV = $.parseJSON(v);
                    laboratoire.push(oV['labname']);
                });
                $("#laboratoire").autocomplete({
                    source: [laboratoire]
                });
                
            });
            
        });
    </script>

    <!-- Nice alert -->
    <script src="../alertify/lib/alertify.min.js"></script>
    <link rel="stylesheet" href="../alertify/themes/alertify.core.css" />
    <link rel="stylesheet" href="../alertify/themes/alertify.bootstrap.css" />

<?php
if (isset($_SESSION['status']) && $_SESSION['status'] == 1) {
    $_SESSION['status'] = 3;
    ?>
        <script type="text/javascript">
            alertify.success("REUSSITE : les informations sont bien enregistrees!");
        </script>
        <?php
    } elseif (isset($_SESSION['status']) && $_SESSION['status'] == 2) {
        $_SESSION['status'] = 3;
        ?>
        <script type="text/javascript">
            alertify.error("ERREUR : veuillez reessayer plutard!");
        </script>
        <?php
    }
    ?>

    
</body>
</html>
