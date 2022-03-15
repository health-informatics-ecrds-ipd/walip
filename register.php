<?php
    session_start();
    require 'connect.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z69RWHYV7M"></script>
        <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-Z69RWHYV7M');
        </script>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" type="text/css" media="all" href="css/style-classes.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/css.css" /> 
        <link rel="icon" type="image/gif" href="images/Institut_Pasteur.gif" />
        
        <!-- BlockUI -->
        <script src="js/jquery.js"></script> 
        <script src="js/register.js"></script> 
        <script type="text/javascript"  src="js/blockui.js"></script>
        <title>Registration</title>
        <style type="text/css">
            label {
                font-weight:bold;
            }
            
        </style>
    </head>
    
    <body style="zoom:75%" >
    <br/>
    <br/>
    <center>
        <div id="conteneur" class="conteneur" style="width:50%" >    
            <div id="haut"><img src="images/dakar.PNG" class="img_logo" /></div>
            <br/>
            <h3 style="font-weight: bold; color: red; font-style: italic;">
                F&eacute;licitation, votre compte d'utilisateur &agrave; &eacute;t&eacute; cr&eacute;e!<br/>
                Il ne vous reste qu'a configuer vos param&egrave;tres de connexion
            </h3>
            <br/>
            <div id="milieu" class="div_table_style_class">
                <form method="post" action="enregistrer_registration.php" id="form_login" >
                    <?php
                        if(isset($_GET['code']) === false){
                            header('location:error.php');
                            exit();
                        }
                    ?>
                    <input type="text" id="code_client" name="code_client" value="<?php echo $_GET['code']; ?>" style="display:none;" />
                    <table >
                        <tr>
                            <td><label for="login">Identifiant:</label><label style="color:red;">*</label></td>
                            <td><input type="text" id="login" name="login" class="class-input" /></td>
                        </tr>
                        <tr>
                            <td><label for="login">Mot de passe:</label><label style="color:red;">*</label></td>
                            <td><input type="password" id="mdp1" name="mdp1" class="class-input" /></td>
                        </tr>
                        <tr>
                            <td><label for="login">Retaper le mot de passe:</label><label style="color:red;">*</label></td>
                            <td><input type="password" id="mdp2" name="mdp2" class="class-input" /></td>
                        </tr>
                    </table>  
                    <br/>
                    <button class="myButton" id="sbt_login"  style="padding:15px;"   >Configurer!</button>
                </form> 
            </div>           
            <br/>
            <div class="bas_de_page" > Institut Pasteur de Dakar, SENEGAL - &copy; 2015  </div>
        </div>
    </center>
    
    <!-- Nice alert -->
    <script src="alertify/lib/alertify.min.js"></script>
    <link rel="stylesheet" href="alertify/themes/alertify.core.css" />
    <link rel="stylesheet" href="alertify/themes/alertify.default.css" />
    
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
