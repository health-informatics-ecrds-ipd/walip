<?php

function gen_alpha($size) {
    $string = "";
    $chaine = "abcdefghijklmnpqrstuvwxy";
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
    $alpha_code = gen_alpha(6);
    return str_shuffle($num_code.$alpha_code);
}


function strtostr($text) {
    $utf8 = array(
        '/[áàâãªä]/u'   =>   'a',
        '/[ÁÀÂÃÄ]/u'    =>   'A',
        '/[ÍÌÎÏ]/u'     =>   'I',
        '/[íìîï]/u'     =>   'i',
        '/[éèêë]/u'     =>   'e',
        '/[ÉÈÊË]/u'     =>   'E',
        '/[óòôõºö]/u'   =>   'o',
        '/[ÓÒÔÕÖ]/u'    =>   'O',
        '/[úùûü]/u'     =>   'u',
        '/[ÚÙÛÜ]/u'     =>   'U',
        '/ç/'           =>   'c',
        '/Ç/'           =>   'C',
        '/ñ/'           =>   'n',
        '/Ñ/'           =>   'N',
        '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
        '/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
        '/[“”«»„]/u'    =>   ' ', // Double quote
        '/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
    );
    return preg_replace(array_keys($utf8), array_values($utf8), $text);
}

function envoyer_mail($userCode, $to, $nom, $profile){
    
    
    $subject = "Bienvenue a la Plateforme TERANGA LIMS";
    
    // profile de l'utilisateur.
    $profile = substr($profile, 0, (strlen($profile)-1));
    $profile =  str_replace(")","",str_replace("(", "",str_replace(";","\n    - ",$profile)));
    $profile = "    - ".$profile;
    $profile = trim($profile);
    $profile = (substr($profile, -1) == "-") ? substr($profile, 0, -1) : $profile  ;
    
   
    
    $txt     = "[Mail automatique - Ne pas répondre]\n\n";
    $txt    .= "Félicitation ".strtoupper($nom).", \n\n"
                ."Vous avez un compte d'accès à la plateforme TERANGA LIMS.\n\n"
                ."Vous aurez accès au(x) module(s) suivant(s):\n"
                ."\n".$profile."\n\n"
                    ."Merci de passer a l'activation de votre compte en copiant l'URL suivant sur votre navigateur :\n\n"
                        ."\n"
                        ."https://terangatest.pasteur.sn/first_connexion.php?code=".$userCode."\n\n"
                                    
                                    ."\n"
                                        ."Institut Pasteur\n"
                                            ."BP 220 Dakar, Senegal\n"
                                                ."Tel: 338399206\n"
                                                    ."Fax: 338399210";
                
    
    
    $headers =  "From: teranga@pasteur.sn, " . "\r\n" .
                //"CC: Cheikh.LOUCOUBAR@pasteur.sn,  mamadou.diop@pasteur.sn, Ousmane.FAYE@pasteur.sn, amadou.sall@pasteur.sn, Babacar.GNING@pasteur.sn, Ndongo.DIA@pasteur.sn, Christophe.PEYREFITTE@pasteur.sn, asow@wahooas.org" . "\r\n" ;
    "CC: Cheikh.LOUCOUBAR@pasteur.sn,  mamadou.diop@pasteur.sn, mamadou.cisse@pasteur.sn, Ousmane.FAYE@pasteur.sn, amadou.sall@pasteur.sn" . "\r\n" ;
               // "CC: Ousmane.FAYE@pasteur.sn"."\r\n".
               // "CC: amadou.sallR@pasteur.sn"."\r\n".
               //"CC: mamadou.diop@pasteur.sn"."\r\n";
                
   return(mail($to,$subject,$txt,$headers));
}
