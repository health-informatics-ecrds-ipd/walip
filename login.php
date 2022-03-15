
<?php
session_start();
require 'connect.php';
require 'functions.php';

// DATA CLEANING 
$keys = array_keys($_POST);
foreach ($keys as $key){
    $_POST[$key] = str_replace("'","''",trim($_POST[$key]));
    $_POST[$key] = str_replace(" ","",trim($_POST[$key]));
    $_POST[$key] = str_replace("SLEEP","",trim($_POST[$key]));
    $_POST[$key] = mysqli_real_escape_string($link,trim($_POST[$key]));
}

if(!isset($_SESSION['IamAHuman']) || !$_SESSION['IamAHuman']){
    echo 'veuillez tirer le Qaptcha!';
    exit();
}

/*  Extration des varibales  */
extract($_POST);

/* Preparation de la requete */
$query =  "SELECT * "
		. "FROM cnrfj_clients "
		. "WHERE login LIKE BINARY '".$login."' "
				. "AND mdp LIKE BINARY '".md5($mdp)."'";

/* execution de la requete */
$res = mysqli_query($link, $query);

if(mysqli_num_rows($res)>0){
    if($data = mysqli_fetch_array($res)){
    	$_SESSION["adresse_mail"]       = $data["adresse_mail"];
    	$_SESSION["email_notification"] = $data["email_notification"];
        $_SESSION['profile']            = $data['profile']; 
        $_SESSION['district']           = $data['district'];
        $_SESSION['username']           = $data['nom'];
        $_SESSION['client_compte']      = $data['client_compte'];
        $_SESSION['code_client']        = $data['code_client'];
        $_SESSION['pays']               = $data['pays'];
        $_SESSION['telephone']          = $data['telephone'];
        $_SESSION['laboratoire']        = $data['laboratoire'];
        $_SESSION['tableResuslts']      = "covid_prelevements_min";
        #$_SESSION['tableResusltsDS']    = "covid_results_by_district_min";
        $_SESSION['tableResusltsDS']    = "covid_prelevements_min";
        $_SESSION['tableInvestigation'] = "bd_kedougou_min";
        $_SESSION['tableFacturation']   = "view_facturation_min";
        $_SESSION['enrolledDistricts']  = array( "DKO", "DKS", "DKN", "DKC", "STL", "KED", "TOU" );
        
        if($data['access'] === 'non'){
            echo 'access_denied';
            exit();
        }  
        
        else {
        	// mysqli_query($link, "	UPDATE cnrfj_clients 
		    //     			SET  nb_connections = nb_connections + 1,
        	// 					 statut = 1,
        	// 					 date_time = '". date("Y-m-d H:i:s")."'
		    //     			WHERE login LIKE BINARY '".$login."' AND mdp LIKE BINARY '".md5($mdp)."'");
            
        	// mysqli_query($link, " INSERT INTO cnrfj_historique_edition    ( editeur, profile,  date_heure )
			// 					 VALUES ('" . $_SESSION ['username']
			// 		        			. " - " . $_SESSION ['code_client']
			// 		        			. "', 'Connexion', '"
			// 		        			. date ( "Y-m-d H:i:s" ) . "')");
        	
            // $_SESSION["login"] = $login;
            $_SESSION["mdp"] = md5($mdp);
            echo $data['profile'];
            exit();
        }
        
    } 
    
    else {
        echo 'ko';
        exit();
    }
} 

else {
    echo 'ko';
    exit();
}


