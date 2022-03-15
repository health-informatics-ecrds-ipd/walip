$(document).ready(function(){
    $('#login, #mdp1').keyup(function(event){ // soumettre le formulaire quand on appui sur la touche entrer
        var keycode = event.keyCode;
        if(keycode == 13){
            $('#sbt_login').click();
        }
    });
    
    $('#sbt_login').click(function()
    {
       var login = $('#login').val(); 
       var mdp1 = $('#mdp1').val(); 
       var mdp2 = $('#mdp2').val(); 
       
       if(login === '' || mdp1 === '' || mdp2 === ''){
           alertify.error('ERREUR : Veuillez remplir tous les champs obligatoires!');
           return false ;
       }
       
       if(mdp1 !== mdp2) {
           alertify.error('ERREUR : les mots de passes ne correspondent pas !');
           return false ; 
       }
       
       // tester si le login n'existe pas deja dans la liste des comptes users ...
       $.post("post_if_login_exists.php", {'login':login, 'mdp':mdp1}, function(data){
           if(data === 'ko'){
               alertify.alert("Ce nom d'identifiant existe deja!!!");
               return false ;
           } else {
               $('#form_login').submit();
           }
       });
       
       //return true;
    });
});