<?php
require '../../../connect_simple.php';
require '../../functions.php';
require_once('../../teranga-mobile-php-client-master/vendor/autoload.php');
use TerangaMobile\Client;
$terangaMobileClient = new Client([      
    "application_id"     => "teranga-mobile",
    "application_secret" => "[f~6F5@A&{iGV1^|Dd8yS2{iWl3lqz"
]);

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

$callbackData   = $terangaMobileClient->getCallbackData();
$data_json      = $callbackData;

$groups         = ['maladies_chroniques'];
$group_concat   = ['autres_maladies_chroniques'];
$cols           = [
    "numero_identification_passeport", "prenom", "nom", "sexe", 
    "date_naissance", "age", "profession", "souffrez_vous_maladie_chronique", 
    "maladies_chroniques", "autres_maladies_chroniques", "telephone", "email", 
    "region", "departement", "commune", "quartier", "date_inscription", 
    "numero_lot_vaccin", "observations", "date_de_vaccination", "date_de_vaccination_rappel", "date_de_vaccination_2", 
    "lieu_de_vaccination", "numero_lot_vaccin_2", "lieu_de_vaccination_2", "numero_dose",
    "numero_lot_vaccin_3", "lieu_de_vaccination_3", "date_de_vaccination_3"
];

$values   = array();
$cols_new = array();

// $numero_dose     = "";   
// $numero_dose_val = "";
// $data_json['entries']['date_de_vaccination_rappel'] = null;
// if(isset($data_json['entries']['numero_dose']))
// {
//     $numero_dose     = $data_json['entries']['numero_dose'] === "1" ? ", numero_dose_1" : ", numero_dose_2";
//     $numero_dose_val = $data_json['entries']['numero_dose'] === "1" ? ", '1'" : ", '2'";
//     $data_json['entries']['date_de_vaccination']        = $data_json['entries']['numero_dose'] === "1" ? ($data_json['entries']['date_de_vaccination']) : null;
//     $data_json['entries']['date_de_vaccination_rappel'] = $data_json['entries']['numero_dose'] === "2" ? ($data_json['entries']['date_de_vaccination']) : null;
// }

foreach($cols as $key => $val){ 
    $key = $val;  
    
    $val = $data_json['entries'][$val];
     
    if(!empty($data_json['entries'][$key])){
        
        if($key === "numero_identification_passeport"){
            $numero_identification_passeport = $data_json['entries'][$key];
        }
        
        else if($key === "telephone"){
            $telephone = $data_json['entries'][$key];
        }
                 
        if(in_array($key, $group_concat)){
            $v = implode(", ", explode("\n", $val));
            array_push($values, mysqli_real_escape_string($link, trim($v)));
        }
        
        else if(in_array($key, $groups)){
            $v = implode(" ", explode("\n", $val));
            array_push($values, mysqli_real_escape_string($link, trim($v)));
        }
        
        else if(!is_null($val)){
            array_push($values, mysqli_real_escape_string($link, trim($val)));
        }
        array_push($cols_new, $key);
    }
}

   
# Change date format
$dates = [
    'date_inscription', 
    'date_naissance' //,'date_de_vaccination', 'date_de_vaccination_rappel'
];

foreach ($dates as $key => $val){
    if(array_search($val, $cols_new,true) != null){
        $i_date = array_search($val, $cols_new,true);
        $values[$i_date] = date_standard_format($values[$i_date]);
    }
}

$query = "INSERT  INTO vacc_patient (". implode(', ', $cols_new ) . ", qrcode, laboratoire ".$numero_dose.") VALUES ('" . implode("', '", $values ) . "', '".gen_pw()."', '".$data_json['organisation']['title']."'".$numero_dose_val.")";

# UPDATE [
$queryUpdate = " ON DUPLICATE KEY UPDATE ";
foreach($cols_new as $key => $value){
    if( $value !== "numero_identification_passeport" ){
        $queryUpdate .= $value . " = '" . $values[$key] . "', ";
    }
}

$queryUpdate  = substr($queryUpdate, 0, -2);
$query .= $queryUpdate;
#-]  
 
// $fichier  =  fopen('../../../superviseur/query.txt','w');
// fwrite($fichier, $query);
// fclose($fichier);


# Execute query
$res = mysqli_query($link,  $query);
 
# Query return[  
$retour = array(); 
     
if($res){
    $retour['status'] = "ok"; 
}
      
else {
    $retour['status'] = "ko";
    $retour['message'] = mysqli_error ( $link );
}

echo json_encode($retour);
#] 
    
//mysqli_query($link, "insert into tmc_callbacks (_data, retour, _date, form_desc) values ('".json_encode($_POST)."', '".json_encode($retour)."', '".date('Y-m-d H:m:s')."','covid_surveillance_vacc')");
//mysqli_query($link, "insert into tmc_callbacks (_data, retour, _date, form_desc) values (".mysqli_real_escape_string($link, $queryUpdate).", '".json_encode($retour)."', '".date('Y-m-d H:m:s')."','test')");


#==============================SMS=======================================#
#==============================SMS=======================================#
#==============================SMS=======================================#

include('httpful.phar');  
function SendSMS ($login,$api_access_key,$token,$subject,$signature,$recipient,$content) {
    $timestamp=time();
    $msgToEncrypt=$token . $subject . $signature . $recipient . $content . $timestamp;
    $key=hash_hmac('sha1', $msgToEncrypt, $api_access_key);
    $params = array(
        'token' => $token,
        'subject' => $subject,
        'signature' => $signature,
        'recipient' => $recipient,
        'content' => $content,
        'timestamp' => $timestamp,
        'key' => $key
    );
    
    //$uri = 'https://api.orangesmspro.sn:8443/api';
    $uri = 'https://213.154.64.26:8443/api';
    
    $response = \Httpful\Request::post($uri)
    ->body(http_build_query($params))
    ->authenticateWith($login, $token)
    ->send();
    return json_encode($response);
}


$res=mysqli_query($link, "SELECT telphone, no_ipd, zone_sante FROM cnrfj WHERE id =".$_POST['x']);

$data = mysqli_fetch_array($res, MYSQLI_ASSOC);

if(!empty($telephone)){
    $telephone = str_replace("-", "", $telephone);
    $res = SendSMS("teranga","a35c1366cb9ed22b0a8816645dc90fb2","127309b3851f0671663f9adbc94100f0",
        "COVID-19","PASTEUR","221".$telephone,
        $data_json['entries']['date_de_vaccination'] . ": 1ere dose vaccination CoVID-19\nNous vous recontaterons pour la 2nde dose. Restez toujours vigilant."
        );
}

exit();
