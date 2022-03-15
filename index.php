<?php
	session_start();
	session_destroy();
	require 'connect.php';
?> 
<!DOCTYPE html>
<html>
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z69RWHYV7M"></script> -->
        <!-- <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-Z69RWHYV7M');
        </script> -->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" type="text/css" media="all" href="css/style-classes.css?3.0" />
        <!-- <link rel="icon" type="image/gif"   href="images/dakar.PNG"/> -->
        <link href="libs/multi_select/multiple-select.css" rel="stylesheet"/>
        <script src="js/jquery.js"></script> 
        <script type="text/javascript"  src="js/blockui.js"></script>
        <script src="js/teranga.core.js?1.0"></script> 
        <link rel="stylesheet" type="text/css" href="css/animate.css" />
        <script type="text/javascript"  src="js/viewportchecker.js"></script>
        <title>CNRFJ|Connexion</title>
        <style type="text/css">
            label {
                font-weight:bold;
                font-size:16px;
            }
            table td{
            	padding-bottom:7px; 
            }
            
            #sbt_login{ 
                padding:20px;
                font-weight: bold;
                border:solid black 1px;
                /*box-shadow: 0px 0px 5px black ;*/ 
                /*background: rgba(30,144,255,0.2);*/
                border-radius: 20px;
            }
            
            #login{  
				background-image: url(images/login.png);
				background-repeat: no-repeat;
				text-indent: 40px;
				background-position: 5px 0;
				width:60%;
			}
			
			#mdp{
				background-image: url(images/lock.png);
				background-repeat: no-repeat;
				text-indent: 40px;
				background-position: 5px 0;
				width:60%;
			}      
            
            /*
            #sbt_login:hover  {
                box-shadow: 0px 0px 2px black ; 
            }
            */
            #conteneur{
                border-radius:10px;
            }
          	#login, #mdp{
          		height:35px;
          		font-size:23px;
          		font-weight:normal;
          		color:rgba(0,0,0,.8);
          		border-radius:20px;
          	}
          	
          	textarea:focus, input:focus{
                outline: none;
            }
        </style>
		 
        <script type="text/javascript">
            $(document).ready(function() {  
                
            	// if (location.protocol !== 'https:') {
            	// 	 window.location = document.URL.replace("http://", "https://");
            	// } 
				
				
                jQuery('.post').addClass("hidden").viewportChecker({
                    classToAdd: 'visible animated fadeInDown',
                    offset: 100
                });

             	//soumettre le formulaire quand on appui sur la touche entrer
                $('#login, #mdp').keyup(function(event) { 
                    var keycode = event.keyCode;
                    if (keycode == 13) {
                        $('#sbt_login').click();
                    }
                });
                
                $('#sbt_login').click(function() {
					//show loader image...
					$("#sbt_login").hide();
					$("#img_loader").show();
					//...

					
                    var login = $('#login').val();
                    var mdp = $('#mdp').val();
                    
                    if (mdp === '' || login === '') {
                        error("VEUILLEZ RENSEIGNER LES CHAMPS OBLIGATOIRES !!!");
                        //alertify.error('Veuillez renseigner les champs obligatoires !!!');
                        $("#img_loader").hide();
    					$("#sbt_login").show();
                    } else {
                        $.post('login.php', {'login': login, 'mdp': mdp}, function(data) {
                           	data = $.trim(data);
                           	
                            if (data === 'access_denied') {
                                error("Vous n'etes pas autoris\350 a vous connecter. \n\<br/>Veuillez contacter l'administrateur des comptes.");
                                //alertify.error("Vous n'etes pas autoris\350 a vous connecter. \n\<br/>Veuillez contacter l'administrateur des comptes.");
                                $("#img_loader").hide();
            					$("#sbt_login").show();
                            } 
                            else if(data === "veuillez tirer le Qaptcha!"){                            	
                            	error(data);
                            	//alertify.error(data);
                            	$("#img_loader").hide();
            					$("#sbt_login").show();
                            }
                            else if (data !== 'ko') {		
								$.post("post_email_notification.php", {'login': login, 'mdp': mdp}, function(){
									var profiles = data.split(';');
	                                if ((profiles[0]).indexOf('data') >= 0) {
	                                    location.href = 'data-manager';
	                                } else {
	                                    var direction = $.trim(profiles[0]);
	                                    if (direction === 'bio_mol') {
	                                        location.href = 'bio-mol';
	                                    } else if (direction === 'fichiers') {
	                                        location.href = 'filemanager';
	                                    } else {
	                                        location.href = $.trim(profiles[0]);
	                                    }
	                                }
								});    
                            } 
                            else {
                            	error('Identifiant ou Mot de passe incorrect!');
                                //alertify.error('Identifiant ou Mot de passe incorrect!');
                                $("#img_loader").hide();
            					$("#sbt_login").show();
                            } 
                        });
                    }
                });
            });
        </script>
          
    </head>

    <body style="zoom:75%;" >
    <br/>
    <br/>
    <center>
        <div >
            <div id="conteneur" class="conteneur" style="width:670px; border-radius:70px; ">   
                <div id="haut">
                	<!-- <img src="images/dakar.PNG" class="img_logo" /><br><br> -->
                	<img src="images/ooas_logo.png" class="img_logo" /><br><br>
                </div>
                <br/>
                <div id="milieu" class="div_table_style_class" style="width:600px;">              
                    <div style="width:100%" >
                        <input type="text" id="login" name="login"  placeholder=" Identifiant" autocomplete="off"/>
                        <br><br>
                    	<input type="password" id="mdp" name="mdp"  placeholder=" Mot de passe" autocomplete="off" />
                       
                    <br/>
                    <div class="QapTcha" style="text-align:center; margin-left:19.7%; border-radius:10px;"></div>
                    </div>
                    
                    <br/><br/>
                    <br/><br/>     
                    <br/><br/>  
                    <br/>      
                    
                    
                    <div>
                    <center>
                    	<input type="submit" id="sbt_login" value="Se connecter"  style="text-align:center; font-size:18px;padding:17px; border-radius:35px;" class="myButton" />
                    	<img src="images/loader_1.gif" style="display:none;"  id="img_loader" />
                    </center>
                    </div>
                    
                </div> 
                <br/> 
                <div >
                	<!-- <img src="images/cous.png" style="width:70px; height:30px;" />
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<img src="images/logo3.png" style="width:60px; height:30px;" />
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	<img src="images/msas.jpg" style="width:20px; height:30px;" /> -->
                </div>     
                <!-- hr size=1 style="width:90%"-->       
                <!-- <div  class="bas_de_page" > Institut Pasteur de Dakar, SENEGAL - &copy; 2015  </div> -->
            </div>
        </div>
    </center>

    
    
    <!-- qaptcha -->
    <link rel="stylesheet" href="QapTcha-master/jquery/QapTcha.jquery.css" type="text/css" />
    <script type="text/javascript" src="QapTcha-master/jquery/jquery-ui.js"></script>
    <script type="text/javascript" src="QapTcha-master/jquery/jquery.ui.touch.js"></script>
    <script type="text/javascript" src="QapTcha-master/jquery/QapTcha.jquery.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.QapTcha').QapTcha({disabledSubmit:false,autoRevert:true,autoSubmit:false});
        });
    </script>

    
    <!-- Nice alert -->
    <script src="alertify/lib/alertify.min.js"></script>
    <link rel="stylesheet" href="alertify/themes/alertify.core.css" />
    <link rel="stylesheet" href="alertify/themes/alertify.bootstrap.css" />
    
    <?php
    if (isset($_SESSION['status']) && $_SESSION['status'] == 1) {
        $_SESSION['status'] = 3;
    ?>
        <script type="text/javascript">
            alertify.success("REUSSITE : les informations sont bien enregistrees!");
        </script>
    <?php
    } 
    elseif (isset($_SESSION['status']) && $_SESSION['status'] == 2) 
    {
        $_SESSION['status'] = 3;
    ?>
        <script type="text/javascript">
        	error("ERREUR :  VEUILLEZ REESSAYER PLUTARD !!!");
            //alertify.error("ERREUR : veuillez reessayer plutard!");
        </script>
    <?php
    }
    ?>
</body>
</html>