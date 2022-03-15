function assign_lab_survey(panel_id, panel_num, id){
	wait();
	
	$('#lbl_panel_id').text(panel_id);
	$('#lbl_no_panel').text(panel_num);
	$('#lbl_pnl_id').text(id);
	params = [panel_id, panel_num, id];
	
	$.post("post/post_get_assignment.php", {"params":params}, function(data){
		data = $.parseJSON(data);
		console.log(data['status']);
		if(data['status'] === 'ok'){
			$('#slct_lab').val(data['lab_name']);
			$('#slct_survey').val(data['survey_name']);
			
			$.blockUI({
			 	onOverlayClick: $.unblockUI,
			 	css: {
		            'border-color'         : 'rgba(10, 10, 10, .4)',
		            'padding'              : '50px',
		            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
		            'border-radius'        : '30px',
		            'border-width'         : '5px',
			        'margin'               : 'auto',
			        'padding'              : 'auto',
			        'top'                  : '30%',
			        'width'                : '30%',
			        'left'                 : '34%'
		        },
		        message: $("#div_add_lab_survey")
		    });
		}
	}); 
}

function updateInpits(id, prefix,  min, max){
	value = $.trim($('#'+ id).val());
	for(i=min; i<= max; i++){
		$('#' + prefix + i).val(value);
	}
}

function blockuiDisplayForm(divID, panel_id){
	$.post("post/post_get_items_combinations.php", {'panel_id' : panel_id}, function(data){
		$("#h_panel_id").text("PANEL ID : " + panel_id);
		data = $.parseJSON(data);
		i = 1;
		
		$.each(data['data'], function(k, v){
			$('#lbl_n_items_' + i).text("Panel " + i + " : [" + v['panel_map'] + "], Number of Item(s) --> ");
			$('#n_items_' + i).val(v['current_stock']);
			i = i + 1;
		});
		
		$.blockUI({
		 	onOverlayClick: $.unblockUI,
		 	css: {
	            'border-color'         : 'rgba(10, 10, 10, .4)',
	            'padding'              : '50px',
	            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
	            'border-radius'        : '30px',
	            'border-width'         : '5px',
		        'margin'               : 'auto',
		        'padding'              : 'auto',
		        'top'                  : '10%',
		        'width'                : '45%',
		        'left'                 : '27%'
	        },
	        message: $("#" + divID)
	    });
	});
}

function blockuiDisplayDiv(divID, panel_id, npanels, ntubes, no_panel){
	$('#col2_filter_twh').empty();
	$('#col3_filter_twh').empty();
	
	$('#col2_filter_twh').append('<option value=""></option>');
	$('#col3_filter_twh').append('<option value=""></option>');
	 
	if( npanels != null){
		for(i=1; i<=npanels; i++){
			$('#col2_filter_twh').append('<option value="'+i+'">'+i+'</option>');
		}
//		for(i=1; i<=ntubes; i++){
//			$('#col3_filter_twh').append('<option value="'+i+'">'+i+'</option>');
//		}
	} 
	else {
		$('#col2_filter_twh').empty();
		$('#col2_filter_twh').append('<option value="'+no_panel+'">'+no_panel+'</option>');
		$('#col2_filter_twh').val(no_panel);
	}
	
	$('#col2_filter_twh').change();
	$('#col3_filter_twh').change();
	
	/////
	
	$('#col1_filter_twh').css('background', 'rgba(0,0,0, .1)');
	$('#col1_filter_twh').attr('disabled', false);
	$('#col1_filter_twh').val(panel_id);
	$('#col1_filter_twh').keyup();
	$('#col1_filter_twh').attr('disabled', true);
	$.blockUI({
	 	onOverlayClick: $.unblockUI,
	 	css: {
            'border-color'         : 'rgba(10, 10, 10, .4)',
            'padding'              : '50px',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
            'border-radius'        : '30px',
            'border-width'         : '5px',
	        'top'                  : '10%',
	        'width'                : '60%',
	        'left'                 : '17%',
	        'text-align'           : 'center'
        },
        message: $("#" + divID)
    });
}

function loadLabForm(labId){
	$.post("post/post_get_lab_by_id.php", {'id':labId}, function(data){
		data = $.parseJSON(data);
		$.each(data['data'][0], function(k, v){
			$('#' + k).val(v);
		});
		$('#sbt_create_lab').hide();
		$('#sbt_edit_lab').show();
	}); 
} 

var currentLabId = "none";
function addLabDiv(divID, labID, restricted){
	
	if(restricted === "restricted"){
		$( "#labname" ).prop( "disabled", true );
		$( "#img_locked_labname" ).show();
	} else {
		$( "#labname" ).prop( "disabled", false );
		$( "#img_locked_labname" ).hide();
	}
	
	if (typeof labID !== 'undefined') {
		currentLabId = labID; 
		loadLabForm(labID);
	} else {
		$('#sbt_edit_lab').hide();
		$('#sbt_create_lab').show();
	}
	
	$.blockUI({
	 	onOverlayClick: addLabDiv_CloseHandler,
	 	css: {
            'border-color'         : 'rgba(10, 10, 10, .4)',
            'padding'              : '50px',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
            'border-radius'        : '30px',
            'border-width'         : '5px',
	        'top'                  : '10%',
	        'width'                : '40%',
	        'left'                 : '30%',
	        'text-align'           : 'center'
        },
        message: $("#" + divID)
    });
}


function addSurveyDiv_CloseHandler(){
	$("#name_").val("");
	$("#description_").val("");
	$("#dateofonset").val("");
	$("#enddate").val("");
	$('#tbl_list_survey').DataTable().ajax.reload(null, false );
	$.unblockUI();
	
}

function loadSurveyForm(surveyId){
	$.post("post/post_get_survey_by_id.php", {'id':surveyId}, function(data){
		data = $.parseJSON(data);
		$.each(data['data'][0], function(k, v){
			$('#' + k).val(v);
		});
		$('#sbt_create_survey').hide();
		$('#sbt_edit_survey').show();
	}); 
} 

var currentSurveyId = "none";
function addSurveyDiv(divID, surveyID, restricted){
	if(restricted === "restricted"){
		$( "#name_" ).prop( "disabled", true );
		$( "#img_locked_survey" ).show();
	} else {
		$( "#name_" ).prop( "disabled", false );
		$( "#img_locked_survey" ).hide();
	}
	
	if (typeof surveyID !== 'undefined') {
		currentSurveyId = surveyID; 
		loadSurveyForm(surveyID);
	} else {
		$('#sbt_edit_survey').hide();
		$('#sbt_create_survey').show();
	}
	$.blockUI({
	 	onOverlayClick: addSurveyDiv_CloseHandler,
	 	css: {
            'border-color'         : 'rgba(10, 10, 10, .4)',
            'padding'              : '50px',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
            'border-radius'        : '30px',
            'border-width'         : '5px',
	        'top'                  : '10%',
	        'width'                : '40%',
	        'left'                 : '30%',
	        'text-align'           : 'center'
        },
        message: $("#" + divID)
    });
}

function addLabDiv_CloseHandler(){
	$("#country").val("");
	$("#labname").val("");
	$("#pob").val("");
	$("#address").val("");
	$('#tbl_list_lab').DataTable().ajax.reload(null, false );
	$.unblockUI();
	
}
 
function delete_panel_by_id(panel_id)
{
	alertify.confirm("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red;'>DO YOU REALLY WANT TO DELETE PANEL : "+panel_id+"?</b>", function (e) {
	    if (e) {       
	    	wait();
	    	$.post("post/post_delete_panel_by_id.php", {'panel_id':panel_id}, function(data)
	    	{
	    		if(data === "ok")
	    		{
	    			alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:green;text-decoration: underline;'>PANEL DELETED WITH SUCCESS</b>");
	    		}
	    		$.unblockUI();
	    		$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
	    	});
	    } else {
	        return true;
	    }
	});
	
}

function load_panel_form(id, modifcationUnabled){	
	wait();
	$.post("post/post_get_panel_by_id.php", {'id':id}, function(data){
		$("#div_create_form" ).removeClass( "div_table_style_class" ).addClass( "div_table_style_class_modify" );
		$('#sbt_resultats').hide();
		$('#sbt_resultats_update').show();
		$('#div_ajouter_modifier_2').show();
		
		data = $.parseJSON(data);
		
		if(data['status'] == "ok"){
			panel_id = data['data'][0]['panel_id'];
			reception_date = data['data'][0]['reception_date'];
			panel_id_prev = panel_id;
			nsamples = data['data'][0]['nsamples'];
			ntargets = data['data'][0]['ntargets'];
			ntubeperpanel = data['data'][0]['ntubeperpanel'];
			
			$('#ncols').val(ntargets);
			$('#nrows').val(nsamples);
			$('#panel_id').val(panel_id);
			$('#panel_id').val(panel_id);
			$('#reception_date').val(reception_date);
			$('#ntubeperpanel').val(ntubeperpanel);
			$('#draw').click();
			$('#bt_create_panel').click();
			
			$.each(data['data'], function(k,v){
				if(v['pathogen'] == "header" && v['result'] == "header"){
					headers = (v['results']).split(";");
					for(var i = 0; i < headers.length; i++){
						j = i + 3;
						$('#header_' + j).val(headers[i]);
					}
				}
				else{
					$('#' + k + '_1_cell').val(v['pathogen']);
					$('#' + k + '_2_cell').val(v['result']);
					$('#nitems_' + k).val(v['current_stock']);
					vals = (v['results']).split(";");
					for(var i = 0; i < vals.length; i++){
						j = i + 3;
						$('#' + k + '_'+ j + '_cell').val(vals[i]);
					}
				}
			});
		}
		
		if(!modifcationUnabled){
			$('#div_create_form *').prop('disabled', true);
			$('#sbt_resultats_update').hide();
		}
		else{
			$('#div_create_form *').prop('disabled', false);
			$('#sbt_resultats_update').show();
		}
		
		$.unblockUI();
	});
	$.unblockUI();
}

function empty_panel_creation_form(){
	$('#tbl_panel').empty();
	$('#panel_id').val('');
	$('#ncols').val('');
	$('#nrows').val('');
	$('#reception_date').val('');
	$('#ntubeperpanel').val('');
}

function htmlSelect(n, id, cssClass){
	tag = '<select id="' + id + '" class="' + cssClass + '">';
	tag = tag + '<option value=""></option>';
	for(var i = 1; i <= n; i++){
		tag = tag + '<option value="'+ i +'">' + i + '</option>'; 
	}
	tag = tag + '</select>';
	return(tag);
}

function htmlInput(id, cssClass, readonly){
	max    = parseInt($('#nrows').val());
	min    = 2;
	prefix = "nitems_";
	
	readonly = readonly == true ? "readonly" : "onkeyup='updateInpits(\"nitems_1\", \"" + prefix + "\",  " + min + ", " + max + ")'";
	tag = '<input type="text" class="'+ cssClass +'" onkeypress="validate(event)"  ' + readonly + ' id="'+ id +'"  />'
	return(tag);
}

function draw_panel(id, nrows, ncols, pathogens, results){ 
	$('#' + id).empty(); 
	
	/** headers */
	row = '<tr>';
	for(var i=1; i<= (ncols+3); i++){
		if(i == 1){
			row = row + '<td class="clslabel">Path.</td>';
		}
		else if(i == 2){
			row = row + '<td class="clslabel">Res.</td>';
		}
		else if(i == (ncols+3)){
			row = row + '<td class="clslabel">N Item(s)</td>';
		}
		else{
			idheader = 'header_' + i;
			row = row + '<td>' + '<input type="text" class="clscellsheader"  placeholder="T.['+(i-2)+']" id="'+ idheader +'"   />' + '</td>';
		}
	}
	row = row + '</tr>'; 
	$('#'+id).append(row);
	
	for( var nrow = 1; nrow <= nrows; nrow++ ){
		tr_id = nrow + '_tr';
		row = '<tr id="' + tr_id + '">';
		
		for(var ncol = 1; ncol <= (ncols+2); ncol++){
			input_id = nrow + '_' + ncol + '_cell';
			
			if(ncol == 1){
				str_options = '';
				$.each(pathogens, function(k,v){
					str_options = str_options + '<option value="' + v + '">' + v + '</option>';
				});
				row = row + '<td>' + 'Tube ['+ nrow +']  <select class="clscellsheader" id="'+ input_id +'" >' + str_options + '</select>' + '</td>';
			} 
			
			else if(ncol == 2){
				str_options = '<option value=""></option>';
				$.each(results, function(k,v){
					str_options = str_options + '<option value="' + v + '">' + v + '</option>';
				});
				row = row + '<td>' + '<select class="clscellsheader" id="'+ input_id +'" >' + str_options + '</select>' + '</td>';
			} 
			
			else{
				row = row + '<td>' + '<input type="text" class="clscells" onkeypress="validate(event)" id="'+ input_id +'"   />' + '</td>';
			}
		}
		
		itemID = "nitems_"+ nrow;
		
		if(nrow == 1){
			row = row + '<td>' + htmlInput(itemID, "clscellsheader", false) + '</td>';
		}
		
		else{
			row = row + '<td>' + htmlInput(itemID, "clscellsheader", true) + '</td>';
		}
		//row = row + '<td>' + '<input type="text" class="clscellsheader" onkeypress="validate(event)" id="nitems_'+ nrow +'"   />' + '</td>';
		//row = row + '<td>' + '<a  class="clsremovetr"  id="del_'+ nrow +'"   > <img src="../images/trash1.png" /></a>' + '</td>';
		row = row + '</tr>';
		$('#'+id).append(row);
	}
}

$(document).ready(function() {
	/** Global variables */
	panel_id_prev = "";
	
	$('#draw').click(function(){
		ncols = parseInt($('#ncols').val());
		nrows = parseInt($('#nrows').val());
		id = 'tbl_panel';
		pathogens = ['SARS-CoV-2'];
		results = ['Pos', 'Neg','Lim. D.', 'Und.'];
		draw_panel(id, nrows, ncols, pathogens, results);
	});
	
	$('a').live('click', function(){
		if((this.id).indexOf('del')>-1){
			tr_id = (this.id).split('_')[1];
			tr_id = tr_id + '_tr';
			$('table#tbl_panel tr#'+tr_id).remove();
			nrow = parseInt($('#nrows').val()) - 1;
			$('#nrows').val(nrow);
		}
	});
	
	/** Handler : Panel ID Validation */
	duplicated_panel_key = "yes";
	$('#panel_id').keyup(function(){
		panel_id = $.trim($('#panel_id').val());
		$('#panel_id').css('background', 'rgba(0,0,0,0.01)');
		if(panel_id !== ''){
			$.post("post/post_panel_id_check.php", {'panel_id':panel_id}, function(data){
				data = $.parseJSON(data);
				if(data['status'] === 'ko'){
					$('#panel_id').css('background', 'rgba(255,10,10,.3)');
					duplicated_panel_key = "yes";
				}
				else{
					$('#panel_id').css('background', 'rgba(0,0,0,0.01)');
					duplicated_panel_key = "no";
				}
			});
		}
	});
	
	/** Handler : submit panel creation form */
	$('#sbt_resultats, #sbt_resultats_update').click(function(){
		panel_id = $.trim($('#panel_id').val());
		if(!panel_id.trim()){
			error('FILL MANDATORY FIELDS!');
			return;
		}
		
		if(this.id === "sbt_resultats" && duplicated_panel_key === "yes"){
			error('DUPLICATED PANEL KEY.');
			return;
		}
		
		panel_id       = $.trim($('#panel_id').val());
		nsamples       = parseInt($('#nrows').val());
		ntargets       = parseInt($('#ncols').val());
		reception_date = $('#reception_date').val();
		ntubeperpanel  = $('#ntubeperpanel').val();
		results        = [];
		nItems         = [];
		
		/** ref panel headers */
		str = panel_id + ";" + String(nsamples) + ";" + String(ntargets)  + ";" + 'header' + ";" + 'header' + ";" ;
		for(var ncol = 3; ncol <= (ntargets+2); ncol++){
			cellid = 'header_' + ncol ;
			str = str + $('#'+ cellid).val() + ';';
		}
		results.push(str);
		nItems.push("0");
		
		/** ref panel results */
		for(var nrow=1; nrow<=nsamples; nrow++){
			str = panel_id + ";" + String(nsamples) + ";" + String(ntargets) + ";";
			for(var ncol = 1; ncol <= (ntargets+2); ncol++){
				cellid = nrow + '_' + ncol + '_cell';
				str = str + $('#'+ cellid).val() + ';';
			}
			results.push(str);
			nitem = $('#nitems_' + nrow).val();
			if(nitem === ""){
				nItems.push("0");
			}
			else{
				nItems.push(nitem);
			}
		}
		
		$('#sbt_resultats').hide();
		$('#res_loader').show();
		
		post = "post/post_create_panel.php";
		if(this.id === "sbt_resultats_update"){
			post = "post/post_update_panel.php";
		}
		$.post(post, {
							'data[]' : results, 'nItems[]' : nItems, 
							'ntubeperpanel' : ntubeperpanel,'panel_id' : panel_id_prev, 
							'reception_date' : reception_date, 'nsamples' : nsamples, 
							'current_panel_id' : panel_id
																				}, function(data){
			///console.log(data); return;
			$('#res_loader').hide();
			$('#sbt_resultats').show();
			data = $.parseJSON(data);
			if(data['status'] == "ok"){
				$('#tbl_panel').empty(); 
				$('#panel_id').val("");
				$('#nrows').val("");
				$('#ncols').val("");
				$('#reception_date').val("");
				$('#bt_create_panel').click(); 
				alertify.alert("SUCCESSFULLY SAVED RESULTS!!!");
			}
			else{
				error("SOMTETHING WENT WRONG, TRY AGAIN LATER.");
				//console.log(data['message']);
			}
		});
	});
	
	/** Handler : create panel button */
	create_panel_form = "closed";
	$('#bt_create_panel').click(function(){
		if(create_panel_form == "closed"){
			$('#div_create_form').show('slow');
			$('#div_panel_list').hide('slow');
			$("#lbl_action").text('BACK TO REFERENCE PANEL LIST');
			create_panel_form = "opened";
			$('#div_create_form *').prop('disabled', false);
		}
		else{
			$( "#div_create_form" ).removeClass( "div_table_style_class_modify" ).addClass( "div_table_style_class" );
			$('#sbt_resultats_update').hide();
			$('#sbt_resultats').show();
			empty_panel_creation_form();
			$('#div_create_form').hide('slow');
			$('#div_panel_list').show('slow');
			$('#table_fiche_prelevement').DataTable().ajax.reload();
			$("#lbl_action").text('CREATE NEW PANEL');
			create_panel_form = "closed";
		}
	});
	
	$('#nrows, #ncols').change(function(){
		nrows = $('#nrows').val();
		ncols = $('#ncols').val();
		if(nrows !== "" && ncols !== ""){
			$('#draw').click();
		}
	});
	
	$('#btn_add_items').click(function(){
		panel_id = ($("#h_panel_id").text()).split(" : ")[1];
		n = [];
		combinations = [];
		
		for(i=1; i<=5; i++){
			s               = $('#lbl_n_items_'+i).text();
			min             = s.indexOf("[") + 1;
			max             = s.indexOf("]");
			comb            = s.substring(min, max);
			combinations[(i-1)] = comb;
			n[(i-1)]            = $('#n_items_'+i).val(); 
		}
		
		$.post("post/post_save_items.php", {'panel_id' : panel_id, 'n[]' : n, 'combinations[]' : combinations}, function(data){
			data = $.parseJSON(data); 
			
			if(data['status'] ===  'ok'){
				alertify.alert("UPDATED WITH SUCCESS");
			}
			
			else{
				alertify.alert("<h style='color:red'2>SOMETHING WENT WRONG<br>PLEASE TRY AGAIN LATER</h2>");
			}
			
			$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
			$.unblockUI();
		});
	});
	
	$('#sbt_create_lab, #sbt_edit_lab').click(function(){
		data = {
			"country"       : $.trim($("#country").val()),
			"labname"       : $.trim($("#labname").val()),
			"pob"           : $.trim($("#pob").val()),
			"address"       : $.trim($("#address").val()),
			"id"  : currentLabId
		};
		
		/* Looking for empty fields */
		if(Object.values(data).indexOf("") != -1){
			alertify.alert("<b class='clsErrorAlert'>PLEASE, FILL ALL FIELDS</b>");
			return false;
		}
		
		post_path  = "post/post_create_lab.php";
		msgSuccess = "LAB CREATED WITH SUCCESS";
		if(this.id === 'sbt_edit_lab'){
			post_path = "post/post_update_lab.php";
			msgSuccess = "LAB UPDATED WITH SUCCESS";
		}
		
		$.post(post_path, data, function(data){
			data = $.parseJSON(data);
			if(data['status']){ 
				addLabDiv_CloseHandler();
				alertify.alert(msgSuccess); 
			} else{
				alertify.alert("<b class='clsErrorAlert'>SOMETHING WENT WRONG, PLEASE TRY AGAIN LATER</b>");
			}
		});
	});
	
	
	// CREATE SURVEY /////////////////////////////////////////
	$('#sbt_create_survey, #sbt_edit_survey').click(function(){
		data = {
			"name_"         : $.trim($("#name_").val()),
			"description_"  : $.trim($("#description_").val()),
			"dateofonset"   : $.trim($("#dateofonset").val()),
			"enddate"       : $.trim($("#enddate").val()),
			"id"  : currentSurveyId
		};
		
		/* Looking for empty fields */
		if(Object.values(data).indexOf("") != -1){
			alertify.alert("<b class='clsErrorAlert'>PLEASE, FILL ALL FIELDS</b>");
			return false;
		}
		
		post_path  = "post/post_create_survey.php";
		msgSuccess = "SURVEY CREATED WITH SUCCESS";
		if(this.id === 'sbt_edit_survey'){
			post_path = "post/post_update_survey.php";
			msgSuccess = "SURVEY UPDATED WITH SUCCESS";
		}
		
		$.post(post_path, data, function(data){
			data = $.parseJSON(data);
			if(data['status']){ 
				addSurveyDiv_CloseHandler();
				alertify.alert(msgSuccess); 
			} else{
				alertify.alert("<b class='clsErrorAlert'>SOMETHING WENT WRONG, PLEASE TRY AGAIN LATER</b>");
			}
		});
	});
	
	
	$('#btn_save_lab_survey').click(function(){
		panel_id     = $('#lbl_panel_id').text();
		slct_lab     = $('#slct_lab').val();
		slct_survey  = $('#slct_survey').val();
		lbl_pnl_id   = $('#lbl_pnl_id').text();
		lbl_no_panel = $('#lbl_no_panel').text();
		params       = [panel_id, slct_lab, slct_survey, lbl_pnl_id, lbl_no_panel]; 
	
		if(slct_lab === "" || slct_survey === ""){
			alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red;'>VEUILLEZ RENSEIGNER TOUS LES CHAMPS</b>");
			return;
		}
		
		/// Check : if Focal Point Exists?
		$.post('post/post_check_pf.php', {"params[]":params}, function(data){
			if(data === "ok"){
				$('#slct_lab').val("");
				$('#slct_survey').val("");
				$.post('post/post_set_lab_survey.php', {'panel_id':panel_id, 'slct_lab':slct_lab, 'slct_survey':slct_survey, 'lbl_pnl_id':lbl_pnl_id, 'lbl_no_panel':lbl_no_panel}, function(data){
					if(data === "duplicated"){
						alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red;'>ASSIGNMENT ALREADY EXISTING!!!</b>");
						return;
					}
					else{
						/// Email De Notification
						$.post('post/post_assignment_notification.php', {"params[]":params}, function(data){});				
						$('#tbl_tubes').DataTable().ajax.reload(null, false );
						$.unblockUI();
					}
				});
			}
			
			else if(data === "PF_not_defined"){
				alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red;'>NO DESIGNATED FOCAL POINT FOR THIS LABORATORY!!!</b>");
				return;
			}
		});
	});
});




