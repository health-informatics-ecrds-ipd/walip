<?php
    session_start();
    if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'moh') === false) {
        header('location:../logout.php');
        exit();
    }
    require '../connect.php';
?>
<!DOCTYPE html>
<html> 
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/style-classes.css?2.1" />
        <link rel="icon" type="image/gif"   href="../images/ooas_logo.png"/>
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
        <title>WALIP|Responsable Labo</title>
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
        	  
            </div>

            <div id="haut">
                <img src="../images/ooas_logo.png" class="img_logo" />
            </div>

            <!-- reserved for coming page -->
            <?php
            echo "Elements for Ministery of Health"
            ?>

            <div class="bas_de_page" > WALIP - &copy; 2021  </div>
        </div>
    </center>
    
    <script src="../js/all.js"></script>
    
    <script type="text/javascript" >
     

        $(document).ready(function(){
        	//window.onload = zoomin();
            $('#a_moh').removeClass('class_a_menu_haut');
            $('#a_moh').addClass('class_menu_haut_active');

             
        });
    </script>

    <!-- Nice alert -->
    <script src="../alertify/lib/alertify.min.js"></script>
    <link rel="stylesheet" href="../alertify/themes/alertify.core.css" />
    <link rel="stylesheet" href="../alertify/themes/alertify.bootstrap.css" />


    
</body>
</html>
