<?php
function gen_alpha($size) {
    $string = "";
    $chaine = "abcdefghjkmnpqrstuvwxyABCDEFGHJKMNPQRT@#*!";
    srand((double)microtime()*1000000);
    for($i=0; $i<$size; $i++) {
        $string .= $chaine[rand()%strlen($chaine)];
    }
    return $string;
}

function gen_numeric(){
    return abs(rand(1,date("simdyH")) % 1001);
}

function gen_pw(){
    $num_code = gen_numeric();
    $alpha_code = gen_alpha(7);
    return str_shuffle($num_code.$alpha_code);
}

// output : 0000-00-00
function dateFormat($date) {
    if(trim($date) === '')
    {
        return '0000-00-00';
    }
    $j = substr($date, 0, 2);
    $m = substr($date, 3, 3);
    $a = substr($date, 7, 4);

    $newDate = $a . '-';
    if (strcmp($m, "JAN") == 0)
        $newDate .= '01';
    elseif (strcmp($m, "FEV") == 0)
        $newDate .= '02';
    elseif (strcmp($m, "MAR") == 0)
        $newDate .= '03';
    elseif (strcmp($m, "AVR") == 0)
        $newDate .= '04';
    elseif (strcmp($m, "MAI") == 0)
        $newDate .= '05';
    elseif (strcmp($m, "JUN") == 0)
        $newDate .= '06';
    elseif (strcmp($m, "JUI") == 0)
        $newDate .= '07';
    elseif (strcmp($m, "AOU") == 0)
        $newDate .= '08';
    elseif (strcmp($m, "SEP") == 0)
        $newDate .= '09';
    elseif (strcmp($m, "OCT") == 0)
        $newDate .= '10';
    elseif (strcmp($m, "NOV") == 0)
        $newDate .= '11';
    elseif (strcmp($m, "DEC") == 0)
        $newDate .= '12';
    else
        $newDate .= '00';
    $newDate .= '-' . $j;
   
    if(trim($newDate) === '-00-')
    {
        return '';
    }
    
    return $newDate;
}

// 0000-00-00
function dateFormatInv($date) {
    $a = substr($date, 0, 4);
    $m = substr($date, 5, 2);
    $j = substr($date, 8, 2);

    $newDate = $j . '-';
    if (strcmp($m, "01") == 0)
        $newDate .= 'JAN';
    elseif (strcmp($m, "02") == 0)
        $newDate .= 'FEV';
    elseif (strcmp($m, "03") == 0)
        $newDate .= 'MAR';
    elseif (strcmp($m, "04") == 0)
        $newDate .= 'AVR';
    elseif (strcmp($m, "05") == 0)
        $newDate .= 'MAI';
    elseif (strcmp($m, "06") == 0)
        $newDate .= 'JUN';
    elseif (strcmp($m, "07") == 0)
        $newDate .= 'JUI';
    elseif (strcmp($m, "08") == 0)
        $newDate .= 'AOU';
    elseif (strcmp($m, "09") == 0)
        $newDate .= 'SEP';
    elseif (strcmp($m, "10") == 0)
        $newDate .= 'OCT';
    elseif (strcmp($m, "11") == 0)
        $newDate .= 'NOV';
    elseif (strcmp($m, "12") == 0)
        $newDate .= 'DEC';
    else
        $newDate .= '00';
    $newDate .= '-' . $a;

     if(trim($newDate) === '-00-')
    {
        return '';
    }
    
    return $newDate;
}

function strtostr($text) {
    $utf8 = array(
        '/[????????????]/u'   =>   'a',
        '/[??????????]/u'    =>   'A',
        '/[????????]/u'     =>   'I',
        '/[????????]/u'     =>   'i',
        '/[????????]/u'     =>   'e',
        '/[????????]/u'     =>   'E',
        '/[????????????]/u'   =>   'o',
        '/[??????????]/u'    =>   'O',
        '/[????????]/u'     =>   'u',
        '/[????????]/u'     =>   'U',
        '/??/'           =>   'c',
        '/??/'           =>   'C',
        '/??/'           =>   'n',
        '/??/'           =>   'N',
        '/???/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
        '/[???????????????]/u'    =>   ' ', // Literally a single quote
        '/[?????????????]/u'    =>   ' ', // Double quote
        '/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
    );
    return preg_replace(array_keys($utf8), array_values($utf8), $text);
}

function email_notification($to, $nom, $message){
	 
    $subject = '[PLATEFORME TERANGA] - Connexion reussie ';//. $nom;
    $headers = "From: teranga@pasteur.sn" . "\r\n" .
                "CC: Cheikh.LOUCOUBAR@pasteur.sn"."\r\n".
                "CC: mamadou.diop@pasteur.sn ";

	
    $message    .=  "\n\n"
			."Institut Pasteur\n"
			."BP 220 Dakar, Senegal\n"
					."Tel: 338399206\n"
							."Fax: 338399210";

	
	
	return(mail($to,$subject,$message,$headers));
}



function dateTest($date){
    $d = explode("-", $date);
    if(isset($d[0]) && is_numeric($d[0])
        && isset($d[1]) && is_numeric($d[1])
        && isset($d[2]) && is_numeric($d[2])){
            return 1;
    }
    return 0;
}



function historic($link, $no_ipd, $username, $message){
    $query = " INSERT INTO cnrfj_historique_edition ( "
        . " no_ipd ,"
            . " editeur,"
                . " profile, "
                    . " date_heure "
                        . " ) VALUES ( '"
                            . $no_ipd . "', "
                                . "'" . $username . "', "
                                    . "'".$message."', "
                                        . "'" . date("Y-m-d H:i:s") . "')";
    $res = mysqli_query($link, $query);
    return $res;
}




function clean_accents($data){
    $unwanted_array = array(    '??'=>'S', '??'=>'s', '??'=>'Z', '??'=>'z', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'C', '??'=>'E', '??'=>'E',
        '??'=>'E', '??'=>'E', '??'=>'I', '??'=>'I', '??'=>'I', '??'=>'I', '??'=>'N', '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'U',
        '??'=>'U', '??'=>'U', '??'=>'U', '??'=>'Y', '??'=>'B', '??'=>'Ss', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'c',
        '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'o', '??'=>'n', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o',
        '??'=>'o', '??'=>'o', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'y', '??'=>'b', '??'=>'y' );
    
    foreach ($data as $key => $value){
        $data[$key] = strtr( $value, $unwanted_array );
    }
    
    return $data;
}


function setNoEpid($dblink, $indexPhoneNumber, $noIPD){
    if(is_null($noIPD))            return "insufficient parameters";
    if(is_null($indexPhoneNumber)) return "insufficient parameters";
    
    //$myfile = fopen("../../../superviseur/query2.txt", "w") or die("Unable to open file!");
    //fwrite($myfile, $indexPhoneNumber."\n");
    //fwrite($myfile, $noIPD."\n");
    
    $indexNoTerrain = $indexPhoneNumber;
    if(is_numeric($indexPhoneNumber)){
        $query   = "select no_terrain from cnrfj where  no_terrain is not null and arn_aut_v_resp_corovirus = '1' and telphone like '".trim($indexPhoneNumber)."' limit 1";
        //fwrite($myfile, $query."\n");
        $res     = mysqli_query($dblink, $query);
        if(mysqli_num_rows($res) == 0){
            return "INDEX TO INVESTIGATED";
        }
        if($data = mysqli_fetch_array($res)){
            $indexNoTerrain = $data['no_terrain'];
        }
    }
    
    $query  = "select count(*) as n from cnrfj where lien_cas_contact like '".$indexNoTerrain."'";
    //fwrite($myfile, $query."\n");
    $res    = mysqli_query($dblink, $query);
    
    if(mysqli_num_rows($res) > 0){        
        $n              = mysqli_fetch_array($res);
        $indexNoTerrain = $indexNoTerrain."-C".$n['n'];
        
        $query = "update cnrfj set no_terrain = '".$indexNoTerrain."' where no_ipd = '".$noIPD."'";
        $res   =  mysqli_query($dblink, $query);
    }
    
    else{
        $query = "Update cnrfj set no_terrain = '".$indexNoTerrain."-C1' where no_ipd = '".$noIPD."'";
        $res   =  mysqli_query($dblink, $query);
    }
    
    //fwrite($myfile, $query."\n");
    //fclose($myfile);
    
    if($res){
        return "ok";
    }
    
    else{
        return "ko";
    }
    
}