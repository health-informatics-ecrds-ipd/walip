function supprimer_compte_de(id){
     alertify.confirm("Voulez-vous vraiment supprimer ce compte?", function (e) {
        if (e) {
            blockui(); // bloquer l'interface ... 
            $.post('post_supprimer_compte.php', {'id':id}, function(data){
                $.unblockUI(); // debloquer l'interface ...
                if(data === 'ok'){   
                    alertify.success('Compte Supprime!');
                } else {
                    alertify.error('Reessayer plutard !!!');
                }
                $('#table_cnrfj_clients').DataTable().ajax.reload();
            });
        } else {
            return true;
        }
    });
}

function reinitialiser(id){
     alertify.confirm("Voulez-vous vraiment reinitialiser ce compte?", function (e) {
        if (e) {
            blockui(); // bloquer l'interface ... 
            $.post('post_reinitialiser_compte.php', {'id':id}, function(data){
                $.unblockUI(); // debloquer l'interface ...
                if(data === 'all_ok'){   
                    alertify.success('Compte reinitialise!');
                }
                else if(data === 'ok'){
                    alertify.alert("Compte reinitialise! <br/>Cependant l'email de notification n'est pas envoye<br/>Veuillez le notifier a l'utilisateur!");
                }
                else {
                    alertify.error('Reessayer plutard !!!');
                }
                $('#table_cnrfj_clients').DataTable().ajax.reload();
            });
        } else {
            return true;
        }
    });
}

function blockui() {
    $.blockUI({css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        },
        message: '<h4> En cours de traitement. Patientez.</h4>'});
}

function change_access_status(id) {
    blockui();
    var status = $('#label_change_access_status_' + id).text();

    $.post('post_change_access_status.php', {'id': id}, function(data){
        if (data === 'ok'){
            if (status === 'oui'){
                $('#label_change_access_status_' + id).text('non');
                $('#label_change_access_status_' + id).css('color', 'red');
            }
            else{
                $('#label_change_access_status_' + id).text('oui');
                $('#label_change_access_status_' + id).css('color', 'green');
            }
        }
        $.unblockUI();
    });
}



//pre-remplissage des champs ...
function pre_fill(id) { 
    $.post('post_charger_cnrfj_client.php', {'id': id}, function(data){
        var obj = $.parseJSON(data);
        var profiles_global_overview = "";
        
    
        
        profiles_global_overview = $.trim(profiles_global_overview).split(";");
        var i = 1;
        $.each(profiles_global_overview, function(key, value){
        	if($.trim(value) !== ""){
        		var values = value.split(" x ");
            	$("#investigation"+i).val($.trim(values[0]));
            	$("#diagnostique"+i).val($.trim(values[1]));
            	
            	$("#investigation"+i).attr('disabled', false);
            	$("#diagnostique"+i).attr('disabled', false);
            	i = i + 1;
        	}
        });
        
        i = i - 1;
        if($("#investigation"+i).val() !== "[Tout]" || $("#diagnostique"+i).val() !== "[Tout]"){
        	i = i + 1;
        	$("#investigation"+i).attr('disabled', false);
        	$("#diagnostique"+i).attr('disabled', false)
        }
        
        $.unblockUI();
    });
}

$(document).ready(function() {
	/* Activation des liens selectionnés */

    var u = location.href;

    if ((u.indexOf('menu') >= 0) === false) {
        //$('#a_ajouter').addClass('liens_actif');
         $('#a_consulter').addClass('liens_actif');
    } 
    
    else if (u.indexOf('ajouter') >= 0) {
        $('#a_ajouter').addClass('liens_actif');
    } 
    
    else if (u.indexOf('consulter') >= 0) {
        $('#a_consulter').addClass('liens_actif');
    } 
    
    else if (u.indexOf('historique') >= 0) {
        $('#a_historique').addClass('liens_actif');
    } 
    
    else if (u.indexOf('modifier') >= 0) {
        $('#a_modifier').addClass('liens_actif');
    }

    /* Soumission du formulaire 'creation de client */
    $('#form_clients').submit(function(){
        /*** profiles d'utilisateurs ***/
        var profile = '';
  
        
        if($('#comptes').is(':checked')){
            profile += 'comptes ; ';
        }
        
        if($('#resultatsCovid19').is(':checked')){
            profile += 'resultatsCovid19 ; ';
        }
        
        if($('#investigations').is(':checked')){
            profile += 'investigations ; ';
        }
        if($('#resplab').is(':checked')){
            profile += 'resplab ; ';
        }
        if($('#moh').is(':checked')){
            profile += 'moh ; ';
        }
        if($('#ooas').is(':checked')){
            profile += 'ooas ; ';
        }

        
        if($('#all_investigations').is(':checked')){
            profile += 'all_investigations ; ';
        }
         
        if($('#sencov').is(':checked')){
            profile += 'sencov ; ';
        }
        
        profile += "(";
        for(i=1; i<=20; i++){
        	if($("#investigation"+i).val() !== ""){
        		profile += $("#investigation"+i).val() + " x " + $("#diagnostique"+i).val() + " ; ";
        	}
        }
        profile += ") ";
        
        if(profile === ''){
            alertify.error('ERREUR : veuillez preciser ajouter au moins un profile a cet utilisateur!');
            return false ; 
        }
        
        else {
            $('#profile').val(profile);
        }
        
        var nom = $.trim($('#nom').val());
        var pays = $.trim($('#pays').val());
        var district = $.trim($('#district').val());
        var laboratoire = $.trim($('#laboratoire').val());
        var adresse_mail = $.trim($('#adresse_mail').val());
        
        // Controle de saisie...
        if (nom === '' || pays === '' || district === '' || laboratoire === '' || adresse_mail === ''){
            alertify.alert('ERREUR :  veuillez remplir les champs obligaoires !');
            return false;
        }
    });

    $('input, select').focus(function(){
        var id = this.id;
        $('#label_' + id).css('color', 'red');
    });

    $('input, select').focusout(function(){
        var id = this.id;
        $('#label_' + id).css('color', 'black');
    });
    
    $("#global").change(function(){
        if(this.checked) {
        	$("#investigation1").attr('disabled', false);
        	$("#diagnostique1").attr('disabled', false);
        } else {
        	for(i=1; i<=20; i++){
        		$("#investigation"+i).val("");
        		$("#diagnostique"+i).val("");
        		//------
        		$("#investigation"+i).attr('disabled', true);
            	$("#diagnostique"+i).attr('disabled', true);
        	}
        }
    });
    
    $('[id^="investigation"], [id^="diagnostique"]').change(function(){
    	var isInvestigation =  parseInt((this.id).indexOf('investigation') != -1 ? "1" : "0");
    	
    	var num = null;
    	if(isInvestigation){
    		num = parseInt((this.id).split('investigation')[1]);
    	} else {
    		num = parseInt((this.id).split('diagnostique')[1]);
    	}
    	
    	var investigation = $("#investigation"+num).val();
    	var diagnostique = $("#diagnostique"+num).val();
    	
    	if(investigation !== "" && diagnostique !== ""){
    		if (investigation == "[Tout]" && diagnostique == "[Tout]"){
        		for(i=2; i<=20; i++){
            		$("#investigation"+i).val("");
            		$("#diagnostique"+i).val("");

            		$("#investigation"+i).attr('disabled', true);
                	$("#diagnostique"+i).attr('disabled', true);
            	}
        	} 
    		else{
    			num = num + 1;
        		$("#investigation"+num).attr('disabled', false);
            	$("#diagnostique"+num).attr('disabled', false);
    		}
    		$("#enregister_client").attr('disabled', false);
    	} 
    	else if(investigation == "" && diagnostique == ""){
    		$("#enregister_client").attr('disabled', false);
    	}
    	else{
    		$("#enregister_client").attr('disabled', true);
    	}
    	
    });

    $("#vaccination_covid_19_ope").click(function(){
        if($('#vaccination_covid_19_ope').prop("checked") == true){
            $('#vaccination_covid19').prop('checked', true);
        } 
    });
        
});