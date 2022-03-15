<?php 
    session_start();
	if (isset($_SESSION['username']) === false ) {
	    header('location:../logout.php');
	    exit();
	}
?>
<script type="text/javascript" src="../js/all.js?1.1"></script>
<div  class = "class_menu_haut"  > 	               	   
    <?php if (strpos($_SESSION['profile'], 'comptes') !== false) { ?>
        <A  HREF="/comptes/" class = "class_a_menu_haut" id="a_comptes" >
            GESTION DES COMPTES
        </A>
        <span class="glyphicon glyphicon-off"></span>
        &nbsp;&nbsp;
    <?php } ?>

  

   
    
    <?php if (strpos($_SESSION['profile'], 'resultatsCovid19') !== false) { ?>
        <A  HREF="/resultatsCovid19/" class = "class_a_menu_haut" id="a_resultatsCovid19"  >
        	<?php 
        	    if(isset( $_SESSION['client_compte']) && !empty( $_SESSION['client_compte'])){
        	        echo 'RESULTAT ['.$_SESSION['client_compte'].']';
        	    }
        		else if(strlen($_SESSION['district']) > 3){
					if($_SESSION['district'] === "SENEGAL"){
						echo 'RESULTAT ['.$_SESSION['district'].']';
					} 
					
					else if(strpos( $_SESSION['district'], 'CTE') !== false){
						echo '['.$_SESSION['district'].']';
					}
					
					else{
						echo 'MCR ['.$_SESSION['district'].']';
					}	
				}
				else{
					echo 'MCD ['.$_SESSION['district'].']';
				}
        	?>
        </A>
        &nbsp;&nbsp;
    <?php } ?>
 

    
    <?php if (strpos($_SESSION['profile'], 'investigations') !== false) { ?>                    
        <A  HREF="/investigations/" class = "class_a_menu_haut" id="a_investigations"    >
            RESPONSABLE LABO..
        </A>
        &nbsp;&nbsp;
    <?php } ?>   

    <?php if (strpos($_SESSION['profile'], 'resplab') !== false) { ?>                    
        <A  HREF="/resplab/" class = "class_a_menu_haut" id="a_resplab"    >
            RESPONSABLE LABO
        </A>
        &nbsp;&nbsp; 
    <?php } ?>   

    <?php if (strpos($_SESSION['profile'], 'moh') !== false) { ?>                    
        <A  HREF="/moh/" class = "class_a_menu_haut" id="a_moh"    >
            MoH
        </A>
        &nbsp;&nbsp;
    <?php } ?>   

    <?php if (strpos($_SESSION['profile'], 'ooas') !== false) { ?>                    
        <A  HREF="/ooas/" class = "class_a_menu_haut" id="a_ooas"    >
           OOAS
        </A>
        &nbsp;&nbsp;
    <?php } ?>
 


    <!-- //new module africa lims -->
    &nbsp;&nbsp;
    <?php if (strpos($_SESSION['profile'], 'africa_lims') !== false) { ?>                    
        <A  HREF="/africa/" class = "class_a_menu_haut" id="a_africa_lims"    >
            <!-- AFRICA [TOG] -->
            <?php 
                if($_SESSION['pays'] === 'africa'){
                    echo "REVERSE LINKAGE";    
                }else {
                    $country = $_SESSION['pays'];
                    $query = "SELECT * FROM cnrfj_pays WHERE nom like '".$country."'";
                    $res = mysqli_query($link, $query);
                    while($data = mysqli_fetch_array($res) ){
                        echo "REVERSE LINKAGE [".$data['code_pays']."]";
                    }    
                }
            ?>
        </A>      
    <?php } ?> 
    
    
    <a href='javascript:void(0)' class = "deconnexion_cls" id="a_deconnexion" >
    	<img alt="" src="../images/logout1.png">	
    </a>
        
</div>

<script type = "text/javascript" >
        $(document).ready(function() {
            var operateur = "<?php echo ($_SESSION['username']); ?>";
            alertify.log(operateur, "", 0);
        });
   </script>
