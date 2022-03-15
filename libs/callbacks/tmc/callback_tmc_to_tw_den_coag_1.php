<?php
require '../../../connect_simple.php';
require '../../functions.php';
require 'error_logs.php';
require_once('../../teranga-mobile-php-client-master/vendor/autoload.php');

use TerangaMobile\Client;

$terangaMobileClient = new Client([
    "application_id" => "teranga-web",
    "application_secret" => "c57a6a1dabc57a090d8b7432aee83ca74b6e6dc7b1c89a863ecf0260d23657cf"
]);

$callbackData = $terangaMobileClient->getCallbackData();

$data_json = $callbackData;

/*
$fichier  =  fopen('../../../superviseur/data.json','w'); 
fwrite($fichier, json_encode($data_json)); 
fclose($fichier);
*/

$groups = ['age', 'voyage_1', 'vecu_region', 'voyage_2', 'voyage_3', 'signes_gravite', 'signes_6_derniers_mois_1', 'signes_6_derniers_mois_2'];

$cols   = array();
$values = array();

array_push($cols, 'team_id');
array_push($values, $data_json['collector']['team_id']);

array_push($cols, 'title');
array_push($values, $data_json['collector']['title']);

array_push($cols, 'phone');
array_push($values, $data_json['collector']['phone']);

array_push($cols, 'date_envoi');
array_push($values, date('Y-m-d H:m:s'));

foreach($data_json['entries'] as $key => $val) {
    $key = trim($key);
    if(strpos($key, 'aucun') === false){
        if(in_array($key, $groups) == false){
            array_push($cols, $key);
            array_push($values, mysqli_real_escape_string($link, trim($val)));
        }
        else{
            $v_tmp = explode("\n", $val);
            foreach($v_tmp as $key => $val){
                $val = explode(":", $val);
                if(strpos(trim($val[0]), 'aucun') === false){
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
}

function date_standard_format($datetime1){
    try {
        $datetime1 = explode("/", $datetime1);
        $datetime = $datetime1[2] . "-" . $datetime1[1]  . "-" . $datetime1[0];
    } catch (Exception $e) {
        return 'NULL';
    }
    
    return $datetime;
}

# Change date format
$dates = ['voyage_date_1', 'voyage_date_2', 'voyage_date_3', 'date_nais', 'date_contact_personne_covid', 'periode_fievre'];

foreach ($dates as $key => $val){
    if(array_search($val, $cols,true) != null){
        $i_date = array_search($val, $cols,true);
        
        if(is_numeric($values[$i_date])){
            $values[$i_date] = date('Y-m-d', $values[$i_date]);
        }
        
        else{
            $values[$i_date] = date_standard_format($values[$i_date]);
        }
        
    }
}

# historique
$query = "INSERT INTO den_coag (". implode(', ', $cols ) . ") VALUES ('" . implode("', '", $values ) . "')";

$query = str_replace("'oui'", "'1'", $query);
$query = str_replace("'non'", "'2'", $query);
$query = str_replace("'nsp'", "'3'", $query);

$query = str_replace("'Toujours (tous les jours)'", "'1'", $query);
$query = str_replace("'Parfois'", "'2'", $query);
$query = str_replace("'Exceptionnellement'", "'3'", $query);

# Execute query
$res = mysqli_query($link,  $query);


/*
$query .= " ON DUPLICATE KEY UPDATE ";
for($i = 0; $i<count($cols); $i++){
    $query .=  $cols[$i] . " = '" . $values[$i] . "', ";
}
$query = substr($query, 0, -2);
$fichier  =  fopen('../superviseur/query.txt','w');
fwrite($fichier, $query);
fclose($fichier);
*/


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
#...]


$err = error_logs($link, null);
$query = "UPDATE den_coag SET error_logs = '" . $err[0] . "', n_logs = " . $err[1] . " ORDER BY id DESC LIMIT 1";
mysqli_query($link, $query);

// historic($link, $callbackData['entries']['id_participant'], "Tablette", "DEN CoAG - Tablette");

mysqli_close($link);
exit();
