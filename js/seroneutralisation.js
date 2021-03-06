function blockui()
{
    $.blockUI({css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        },
        message: '<h4> En cours de traitement. Patientez.</h4>'
    });
}

function resultats_bio(id){
	// Vider la table...
    $("#div_resultats_boi label[id]").map(function() { 
    	$("#"+this.id).text("");
    });
    
    $("#div_data_bio").hide();
    $("#img_loader").show();
    
    // Afficher la table ...
	$.blockUI({
		onOverlayClick: $.unblockUI,
        message: $('#div_resultats_boi'),
        css: {
            top: '10%',
            bottom: '1%',
            left: '35%',
            right: '35%',
            width: '30%',      
            height: '300px',      
            padding: 'auto',
            'padding-bottom': '10px',
            'border-radius': '0px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'            
        }
    });
    
	//*** Remplir la table *** 
    $.post("post_get_resultats_bio.php", {'id': id}, function(data){
    	$("#img_loader").hide();
    	$("#div_data_bio").show();
        
    	var data = $.parseJSON(data);
    	$.each(data, function(k,v){
    		if(k.indexOf('val') == -1){
    			var value = v;
    			v =  (v == 1)? " positif" : (v == 2)? " negatif" : "";
    			
        		$("#" + k).text(v);
        		
        		if(k === 'no_ipd'){
        			$("#label_no_ipd").text(value);
        		}
        		
        		$("#" + k).css('font-weight', 'bold');
        		$("#" + k).css('font-style', 'italic');
        		
        		if(v == " positif"){
        			$("#" + k).css('color', 'red');
        		} else {
        			$("#" + k).css('color', 'black');
        		}
    		} else {
    			v =  (v == null)? "" : v;
        		$("#" + k).text(v);
    		}
    	})
    });
}


function correct_form() {
    var someForm = $('#form_resultats');
    var return_val = true;
    $.each(someForm[0].elements, function(index, elem) {
        if ((elem.id).indexOf("_val") >= 0) {
            var v = $.trim($(elem).val());
            var v1_id = (elem.id).substr(0, (elem.id).length - 6);
            var v1 = $.trim($('#' + v1_id).val());

            if ((v !== '' && v1 === '') || (v !== '' && $.isNumeric(v) === false)) {
                return_val = false;
            }
        }
    });
    return return_val;
}

function init_select_input_handler() {
    var someForm = $('#form_resultats');

    $.each(someForm[0].elements, function(index, elem) {
        select_input_handler(elem.id);
    });
}

function select_input_handler(id) {
    if (id === 'no_ipd') {
        return;
    }

    if ((id.indexOf("igm_") >= 0 || id.indexOf("arn_") >= 0 || id.indexOf("sn_") >= 0) === false) {
        return;
    }

    var id1;
    var id2;
    var id3;

    if (id.indexOf("_val") >= 0) {
        id1 = id.substr(0, id.length - 6);
        id2 = id1 + '_val_1';
        id3 = id1 + '_val_2';
    } else {
        id1 = id;
        id2 = id1 + '_val_1';
        id3 = id1 + '_val_2';
    }

    var v1 = $.trim($('#' + id1).val());
    var v2 = $.trim($('#' + id2).val());
    var v3 = $.trim($('#' + id3).val());


    if (v1 === '' && (v2 !== '' || v3 !== '')) {
        $('#' + id1).css('background', 'rgba(255,255,0,0.3)');
    } else {
        $('#' + id1).css('background', 'white');
    }

    if (v2 !== '' && $.isNumeric(v2) === false) {
        $('#' + id2).css('background', 'rgba(220,0,0,0.3)');
    } else {
        $('#' + id2).css('background', 'white');
    }

    if (v3 !== '' && $.isNumeric(v3) === false) {
        $('#' + id3).css('background', 'rgba(220,0,0,0.3)');
    } else {
        $('#' + id3).css('background', 'white');
    }
}

$(document).ready(function() {
    /*-------------------------------------
     Activation des liens selectionn??s ...
     ------------------------------------- */

    var u = location.href;
    if ((u.indexOf('menu') >= 0) === false)
    {
        $('#a_ajouter').addClass('liens_actif');
    }
    else if (u.indexOf('ajouter') >= 0)
    {
        $('#a_ajouter').addClass('liens_actif');
    }
    else if (u.indexOf('consulter') >= 0)
    {
        $('#a_consulter').addClass('liens_actif');
    }
    else if (u.indexOf('modifier') >= 0)
    {
        $('#a_modifier').addClass('liens_actif');
        $('#div_ajouter_modifier_2').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#sbt_resultats').val('Enregistrer les modifications');
        var id;
        if ((u.indexOf('id=') >= 0) === false)
        {
            $('#div_nav_modif').show();
        }
        else
        {
            id = $.trim(u.split('=')[2]);
        }
        $.post('post_get_results_by_id.php', {'id': id}, function(data){
            if (data !== 'ko'){
                // remplir le formulaire des resultats ...
                var d = $.parseJSON(data);

                $.each(d, function(k, v){
                    $('#' + k).val(v);
                });
                
                init_select_input_handler();
            }
        });
    }

    var nb_records = parseInt($('#lab_nb_enregistrement').text());
    var encours = nb_records;

    $('#bt_moins, #bt_plus').click(function()
    {
        var sens;
        if ((encours > 1 && this.id === 'bt_moins') || (encours < nb_records && this.id === 'bt_plus'))
        {
            blockui();
            if (this.id === 'bt_plus')
            {
                encours++;
                sens = 'plus';
            }
            else
            {
                encours--;
                sens = 'moins';
            }

            $.post('post_get_results_by_id.php', {'sens': sens}, function(data)
            {
                if (data !== 'ko')
                {
                    $('#lab_enregistrement_en_cours').text(encours);
                    // remplir le formulaire des resultats ...
                    var d = $.parseJSON(data);
                    $.each(d, function(k, v)
                    {
                        $('#' + k).val(v);
                    });
                    init_select_input_handler();
                    $.unblockUI();
                }
            });
        }
    });

    $('#sbt_resultats').click(function() {
        $('#sbt_resultats').hide();
        $('#res_loader').show();
        var no_ipd = $.trim($('#no_ipd').val());
        
        //alert(no_ipd);
        
        if (no_ipd === '') {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : veuillez remplir le(s) champ(s) obligatoire(s)!');
            return false;
        }
        if ($.isNumeric(no_ipd) === false) {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : veuillez corriger le numero IPD!');
            return false;
        }

        if (correct_form() === false) {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : presence de quelques erreurs!');
            return false;
        }
       
       $.post('post_can_i_modify.php', {'no_ipd': no_ipd}, function(data) {
            if (data === "pas de resultats" || data.split("|")[3] === "" ) {
                $('#form_resultats').submit();
            } else {
                $('#res_loader').hide();
                $('#sbt_resultats').show();
                alertify.alert("IMPOSSIBLE d'editer pour cet echantillon.<br/>"
                        + "Cause : les resultats de SERONEUTRALISATION sont deja valid\351s ");
                return false;
            }
        });  
       
    });
    
    
    $('#sn_tr_tous').change(function(){
    	var val =  $('#sn_tr_tous').val();
    	var virus = ['yf', 'wn', 'den', 'rvf', 'chik', 'cchf', 'zika'];
    	/*
    	if(val !== ""){ 
	    	$.each(virus, function(k,v){
	    		$('#sn_' + v).attr('disabled', true);
	    	});
    	} else {
    		$.each(virus, function(k,v){
	    		$('#sn_' + v).attr('disabled', false);
	    	});
    	}
    	*/
    	$.each(virus, function(k,v){
    		$('#sn_' + v).val(val);
    	});
    });
    
    // colorier les champs en cas d'erreurs ...
    $('select').change(function() {
        select_input_handler(this.id);
    });
    $('input').keyup(function() {
        select_input_handler(this.id);
    });
    $('#no_ipd').keyup(function() {
        var val = $(this).val();
        if (val !== '' && $.isNumeric(val) === false) {
            $(this).css('background', 'rgba(220,0,0,0.3)');
        } else {
            $(this).css('background', 'white');
        }
    });


    $('input, select').focus(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'red');
    });

    $('input, select').focusout(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'black');
    });
});