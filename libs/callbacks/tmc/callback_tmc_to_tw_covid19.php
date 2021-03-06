<?php
require '../../../connect_simple.php';
require '../../functions.php';
require_once('../../teranga-mobile-php-client-master/vendor/autoload.php');
use TerangaMobile\Client;

$terangaMobileClient = new Client([      
    "application_id"     => "teranga-mobile",
    "application_secret" => "[f~6F5@A&{iGV1^|Dd8yS2{iWl3lqz"
]);
    
$callbackData = $terangaMobileClient->getCallbackData();

$data_json    = $callbackData;

$zone_sante   = $data_json['team']['uid'];
$zone_sante   = explode("_", $zone_sante); 
$zone_sante   = strtoupper($zone_sante[1]);

$groups       = ['traitement_en_cours', 'signes_symptomes__autres', 'maladies_chroniques', 'age'];

$group_concat = ['nationalite', 'type_animaux_manipules', 'type_prelevement_effectue'];

$cols = $values = array();

$data_json['entries']['nom_patient'] = $data_json['entries']['nom'] . " " . $data_json['entries']['prenom'];

$updateNoTerrain = false;

$cas_suspect = "2";
  
$cas_contact = "2";   
    
$control = "NON";
 
foreach($data_json['entries'] as $key => $val) {
    $key = trim($key);
    $val = trim($val);
      
    if($key === "suspect_ou_contact"){
        if($val === "contact"){
            $cas_contact = "1";     
        }  
        else {     
            $cas_suspect = "1";
        }
        array_push($cols, 'cas_suspect');
        array_push($values, $cas_suspect);
        array_push($cols, 'cas_contact');
        array_push($values, $cas_contact);
        array_push($cols, 'suspect_ou_contact');
        array_push($values, mysqli_real_escape_string($link, trim($val)));
    }
      
    else if($key === 'nature_reprelevement'){ 
        if(strpos($val, "controle")>=0){
            $control = "OUI";     
        }       
        array_push($cols, 'nature_reprelevement');    
        array_push($values, mysqli_real_escape_string($link, trim($val)));        
    }
    
    else if($key === 'telephone'){ # recherche de l'index
        array_push($cols, 'lien_cas_contact');
        array_push($values, mysqli_real_escape_string($link, trim($val)));
        $lien_cas_contact = trim($val);
        
    }  
    
    else if($key === 'details_index'){ 
        array_push($cols, 'commentaires');
        array_push($values, mysqli_real_escape_string($link, trim($val)));
        //$lien_cas_contact = trim($val);
        
    }  
    
    else if($key === 'numero_telephone'){ 
        array_push($cols, 'numero_telephone');
        $val = str_replace("-", "", trim($val));
        array_push($values, mysqli_real_escape_string($link, trim($val)));
        //$lien_cas_contact = trim($val);
        
    }
    
    else if($key === 'telephone_patient'){
        if(is_numeric($val) == false){
            array_push($cols, 'no_terrain');
            array_push($values, mysqli_real_escape_string($link, trim($val)));
        }
        
        else{
            $updateNoTerrain = true;
            
            # GET LAST ID
            $res = mysqli_query($link, 'SELECT (MAX(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(no_terrain,"/",-1),"-",1) AS UNSIGNED)) + 1) AS n FROM cnrfj WHERE no_terrain IS NOT NULL AND CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(no_terrain,"/",-1),"-",1) AS UNSIGNED) <> 0');
            $d = mysqli_fetch_array($res);
            $no_terrain = "SN/".$zone_sante."/". date("y") . "/" . $d['n'];
            
            # SET ID NUMBER
            array_push($cols, 'no_terrain');
            array_push($values, mysqli_real_escape_string($link, trim($no_terrain)));
        }
    }
    
    else{
        if(in_array($key, $group_concat)){
            $v = implode(", ", explode("\n", $val));
            array_push($cols, $key);
            array_push($values, mysqli_real_escape_string($link, trim($v)));
        }
        
        else if(in_array($key, $groups) == false){
            array_push($cols, $key);
            array_push($values, mysqli_real_escape_string($link, trim($val)));
        }
        
        else{
            $v_tmp = explode("\n", $val);
            foreach($v_tmp as $key => $val){
                $val = explode(":", $val);
                if(count($val)>1){
                    array_push($cols, trim($val[0]));
                    array_push($values, mysqli_real_escape_string($link, trim($val[1])));
                }
                else{
                    array_push($cols, trim($val[0]));
                    array_push($values, "1");
                }
            }
        }
    }
}

array_push($cols, 'control');
array_push($values, $control);     

array_push($cols, "auteur_saisie");
array_push($values, mysqli_real_escape_string($link, 'tablette_'.$zone_sante));

array_push($cols, "zone_sante");
array_push($values, mysqli_real_escape_string($link, $zone_sante));

array_push($cols, 'lab_origine');

$lab_origine = "laboIPD";
if(in_array($zone_sante,["TOU", "STL"]))
{
    $lab_origine = "laboMobilePraesensTouba";
} 
else if(in_array($zone_sante,["KED"]))
{
    $lab_origine = "laboIPDKED";
}

array_push($values, mysqli_real_escape_string($link, $lab_origine)); 

function date_standard_format($datetime1){
    try {
        $datetime1 = explode("/", $datetime1);
        $datetime = $datetime1[2] . "-" . $datetime1[1]  . "-" . $datetime1[0];
    }
    catch (Exception $e) {
        return 'NULL';
    }
    
    return $datetime;
}
   
# Change date format
$dates = [
    'date_du_dernier_contact', 'date_detection',
    'date_entree_pays', 'date_voyage_1', 'date_voyage_2',
    'date_consultation_structure_sanitaire', 'date_debut_symptomes','date_prelevement', 'date_naissance'
];

foreach ($dates as $key => $val){
    if(array_search($val, $cols,true) != null){
        $i_date = array_search($val, $cols,true);
        $values[$i_date] = date_standard_format($values[$i_date]);
    }
}

$cols_current     = ["details_index", "lab_origine", "signes_symptomes__anosmie", "signes_symptomes__agueusie", "control", "cas_contact", "cas_suspect", "nature_reprelevement", "suspect_ou_contact", "lieu_residence_senegal",  "zone_sante", "auteur_saisie", "age_annees", "date_naissance", "event__id_cas", "nom_patient", "code_barre_prelevement", "lien_cas_contact","sexe", "personne_repondant", "statut_matrimonial", "profession", "nombre_personnes_vivant_avec_cas", "date_detection", "detection_porte_entree", "date_entree_pays", "date_debut_symptomes", "signes_symptomes__fievre", "signes_symptomes__maux_de_gorge", "voyage_14_jours_1", "pays_visite_1", "villes_visitees_1", "participation_rassemblement", "exposition_personne_symptomes_similaires", "consultation_structure_sanitaire", "consultation_medecine_traditionnelle", "manipulation_animaux_14_jours", "type_animaux_manipules", "type_prelevement_effectue", "date_prelevement", "formation_sanitaire", "signes_symptomes__fievre_temparature", "signes_symptomes__toux", "signes_symptomes__cephalees", "Arthralgies", "numero_telephone", "no_terrain"];
$cols_replacement = ["commentaires", "lab_origine", "anosmie", "agueusie", "control", "cas_contact", "cas_suspect", "nature_reprelevement", "suspect_ou_contact", "adresse",  "zone_sante", "auteur_saisie", "age_annees", "date_nais", "id_dhis2", "nom_patient", "no_ipd", "lien_cas_contact","sexe", "patient_ou_tiers", "statut_matrimonial", "profession", "nb_personnes_vivant_avc_lecas", "date_detection", "detection_prote_entree", "date_entree_pays", "date_deb_mal", "fievre", "gorge_irritee", "voyage2semprecedentesmaladie", "pays_visites", "villes_visitees", "participer_rassemblement", "meme_symptome_entourage", "consultation_structure_sante", "consultation_medecine_traditionelle", "manipuler_animaux_jrs_prec_symptomes", "manipuler_animaux_jrs_prec_symptomes_type", "type_prelevement", "date_prelevement", "district", "temperature", "toux", "cephalee", "douleurs_articulaires", "telphone", "no_terrain"];

$cols_new = array();
$values_new = array(); 

foreach ($cols_current as $k => $v){   
    if(array_search($v, $cols) != false){
        $i =  array_search($v, $cols);  
        if($v === 'code_barre_prelevement'){
            $values[$i] = intval($values[$i]); //+ 50000000;
        }
        array_push($cols_new, $cols_replacement[$k]);
        array_push($values_new, $values[$i]);        
    }
}

$query = "INSERT INTO cnrfj (". implode(', ', $cols_new ) . ") VALUES ('" . implode("', '", $values_new ) . "')";

# UPDATE [
$queryUpdate = " ON DUPLICATE KEY UPDATE ";
foreach($cols_new as $key => $value){
    if( $value !== "no_ipd" ){
        $queryUpdate .= $value . " = '" . $values_new[$key] . "', ";
    } 
    else{
        $no_ipd = $values_new[$key];
    }
}
$queryUpdate  = substr($queryUpdate, 0, -2);
$query .= $queryUpdate;  
#-]

$query = str_replace("'oui'", "'1'", $query);
$query = str_replace("'non'", "'2'", $query);
$query = str_replace("'nsp'", "'3'", $query);
$query = str_replace("'Toujours (tous les jours)'", "'1'", $query);
$query = str_replace("'Parfois'", "'2'", $query);
$query = str_replace("'Exceptionnellement'", "'3'", $query);

#Execute query
$res = mysqli_query($link,  $query);

# Query return [  
$retour = array();

if($res){
    $retour['status'] = "ok";
}
      
else {
    $retour['status'] = "ko";
    $retour['message'] = mysqli_error ( $link );
}

echo json_encode($retour);
# ] 
    
mysqli_query($link, "insert into tmc_callbacks (_data, retour, _date, form_desc) values ('".json_encode($_POST)."', '".json_encode($retour)."', '".date('Y-m-d H:m:s')."','covid_surveillance')");

if(($cas_suspect !== "1") && ($updateNoTerrain)){
    mysqli_query($link, "update cnrfj set no_terrain = NULL where no_ipd = ". $no_ipd );
    //setNoEpid($link, $lien_cas_contact, $no_ipd);
}      
  
mysqli_query($link, "update cnrfj set age_annees = round(DATEDIFF(CURDATE(), date_nais) / 365.25) where no_ipd = ".$no_ipd." and  date_nais is not null");

// EPID attribution if 'cas contact' and no attribution yet
// if($cas_contact === "1" && !startsWith($no_terrain,"SN")){
//     setNoEpid($link, $lien_cas_contact, $no_ipd);
// }

exit();