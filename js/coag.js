

function display_error_logs(id){
	console.log(id);
	$.post('post_show_error_logs.php', {'id':id}, function(data){
		if(data != ''){
			$.blockUI({
				 	onOverlayClick: $.unblockUI,
				 	css: {
		            border                 : 'none',
		            padding                : '25px',
		            backgroundColor        : '#000',
		            '-webkit-border-radius': '10px',
		            '-moz-border-radius'   : '10px',
		            opacity                : 1,
		            color                  : 'white',
		            'font-weight'          : 'bold',
		            'font-size'            : '20px',
		            'text-align'           : 'left',
		            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"'
		        },
		        message: '<a href="index.php?menu=modifier&id='+id+'" style="text-decoration:none; color:white">'+data+'</a>'
		    });
		} 
	});
}


function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
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
        message: '<h4> En cours de traitement. Patientez.</h4>'
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

    if ((id.indexOf("cdc_") >= 0 ||id.indexOf("igm_") >= 0 || id.indexOf("arn_") >= 0 || id.indexOf("sn_") >= 0) === false) {
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
	
	$('#date_nais').datetextentry({field_order: 'YMD',
		field_width_day   : 5,
		field_width_month : 5,
		field_width_year  : 5,
		field_width_sep   : 0,
		on_change         : function(){
			dob = $('#date_nais').val();
			dob = new Date(dob);
			today = new Date();
			age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
			$('#age_annees').attr('readonly', true);
			$('#age_mois').attr('readonly', true);
			$('#age_annees').val(age);
			$('#age_mois').val(age*12);
		},
		separator :'-'});
	   
	$('#age_annees, #age_mois').focus(function(){
		id  = this.id;
		dob = $('#date_nais').val();
		val = $.trim($(this).val());
		if(dob == ''){
			$('#age_annees').attr('readonly', false);
			$('#age_mois').attr('readonly', false);
		}
	});
	
	$('#age_annees, #age_mois').change(function(){
		dob = $('#date_nais').val();
		if(dob == '' && this.id === 'age'){
			a = parseInt($('#age').val());
			$('#age_mois').val(a * 12);
		}
		else if(dob == '' && this.id === 'age_mois'){
			a = parseInt($('#age_mois').val());
			$('#age_annees').val(a / 12);
		}
	});
	
	
	district = null;
    /*--------------------------------------
     Activation des liens selectionnés
     --------------------------------------- */
	var u = location.href;
    
    if ((u.indexOf('menu') >= 0) === false){
        $('#a_consulter').addClass('liens_actif');
    }
    
    else if (u.indexOf('ajouter') >= 0){
        $('#a_ajouter').addClass('liens_actif');
    }
    
    else if (u.indexOf('consulter') >= 0 ){
        $('#a_consulter').addClass('liens_actif');
    }
    
    else if (u.indexOf('modifier') >= 0){
        // cacher les IgM...
        $('#tr_cdc').show();
        $('#tr_ipd').show();
        //....   
           
        $('#a_modifier').addClass('liens_actif');
        $('#div_ajouter_modifier_2').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#sbt_resultats').val('Enregistrer les modifications');
        
        var id;
         
        if ((u.indexOf('id=') >= 0) === false){
            $('#div_nav_modif').show();
        }
        
        else{
            id = $.trim(u.split('=')[2]);
        }
        
        $.post('post_get_results_by_id.php', {'id': id}, function(data){
            if (data !== 'ko'){
                var d = $.parseJSON(data); // remplir le formulaire des resultats 
                $.each(d, function(k, v){
                    $('#' + k).val(v);
                    if(k.indexOf('date_nais') != -1){
                    	$('#date_nais').datetextentry('set_date', v);
                    }
                });
                init_select_input_handler();
                $("#region").change();
                district = d['district'];
            }
            
        });
    }
    
    $('#autre_profession').keyup(function(){
    	profession = $('#profession').val();
    	autre_profession = $.trim($(this).val());
    	if(profession != '' && profession != '7'){
    		$(this).val('');
            return true;
    	}
    	else if(profession == ''){
    		$('#profession').val('7');
    	}
    });
    
    $('#profession').keyup(function(){
    	profession = $('#profession').val();
    	if(profession != '' && profession != '7'){
    		$('#autre_profession').val('');
    	}
    });
    
    $("#region").change(function(){
    	region = $(this).val(); 
    	$("#district").empty();
    	$("#district").append('<option value=""></option>');
    	$.post("post_get_district.php",{"region":region}, function(data) {
        	oData = $.parseJSON(data);
            $.each(oData, function(k, v) {
                oV = $.parseJSON(v);
                oV = (oV['code_district']);
                $("#district").append('<option value="'+ oV +'">'+ oV +'</option>');
            });
            
            if(district != null){
            	$("#district").val(district.toUpperCase());
            }
        });
    });
    
    $("#district").focus(function(){
    	region = $("#region").val(); // GET SELECTED REGION 
    	if(region === ""){ // FORECE USER TO SELECT A REGION 
    		$(this).val("");
    		$("#region").focus();
    		alertify.alert("VEUILLEZ PRECISER LA REGION!"); 
    		return;
    	} 
    });

    $('#sbt_resultats').click(function() {
        $('#sbt_resultats').hide();
        $('#res_loader').show();
        $('#form_resultats').submit();
    });

    var nb_records = parseInt($('#lab_nb_enregistrement').text());
    var encours = nb_records;

    $('#bt_moins, #bt_plus').click(function(){
        var sens;
        if ((encours > 1 && this.id === 'bt_moins') || (encours < nb_records && this.id === 'bt_plus')){
            blockui();
            
            if (this.id === 'bt_plus'){
                encours++;
                sens = 'plus';
            }
            
            else{
                encours--;
                sens = 'moins';
            }

            $.post('post_get_results_by_id.php', {'sens': sens}, function(data){
                if (data !== 'ko') {
                    $('#lab_enregistrement_en_cours').text(encours);
                    // remplir le formulaire des resultats ...
                    var d = $.parseJSON(data);
                    $.each(d, function(k, v){
                        $('#' + k).val(v);
                    });
                    init_select_input_handler();
                    $.unblockUI();
                }
            });
        }
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
    
    $('#methode').change(function(){
       var val = $(this).val();
       
       if(val === '1'){
           $('#tr_ipd').hide();
           $('#tr_cdc').show();
       } else if(val === '2'){
           $('#tr_cdc').hide();
           $('#tr_ipd').show();          
       } else if(val === '3'){
           $('#tr_cdc').show();
           $('#tr_ipd').show();          
       } else {
           $('#tr_cdc').hide();
           $('#tr_ipd').hide(); 
       }
    });
    
    
    $('#igm_tr_tous').change(function(){
    	var val =  $('#igm_tr_tous').val();
    	var virus = ['yf', 'wn', 'den', 'rvf', 'chik', 'cchf', 'zika'];
    	/*
    	if(val !== ""){ 
	    	$.each(virus, function(k,v){
	    		$('#igm_' + v).attr('disabled', true);
	    	});
    	} else {
    		$.each(virus, function(k,v){
	    		$('#igm_' + v).attr('disabled', false);
	    	});
    	}
    	*/
    	$.each(virus, function(k,v){
    		$('#igm_' + v).val(val);
    	});
    });
    
    $("#igg_covid19, #igm_covid19").change(function(){
    	
    	igm = $("#igm_covid19").val();
    	igg = $("#igg_covid19").val();
    	
    	if(igm === '1' || igg === '1'){
    		$("#igm_aut_v_resp_corovirus").val('1');
    	}
    	else if((igm !== '1' && igg !== '1') && (igm === '9' || igg === '9') ){
    		$("#igm_aut_v_resp_corovirus").val('9');
    	}
    	else if(igm !== 'NULL' || igg !== 'NULL'){
    		$("#igm_aut_v_resp_corovirus").val('2');
    	}
    	else if(igm === 'NULL' && igg === 'NULL'){
    		$("#igm_aut_v_resp_corovirus").val('');
    	}
    });
    
    
    
});