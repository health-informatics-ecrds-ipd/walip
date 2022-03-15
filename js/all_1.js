$(document).ready(function() {
	/*
	if (location.protocol !== 'https:') {
	    location.replace(`https:${location.href.substring(location.protocol.length)}`);
	} 
	*/
	$('#div_hide_show').mouseover(function(){
		$('#div_menu').show('slow');
		$('#img_plus').hide();
		$('#img_dash').show();
	});

	/* hiding information from domicile prelevement  */
	$('#for_prelevement_domicile1').hide();
	$('#for_prelevement_domicile2').hide();
	$('#for_prelevement_domicile3').hide();
	$('#for_prelevement_domicile4').hide();
	$("#prelevement_domicile").change(function(){
		if (this.value == "oui") {
			$('#for_prelevement_domicile1').show();	
			$('#for_prelevement_domicile2').show();	
			$('#for_prelevement_domicile3').show();	
		} else {

			$('#for_prelevement_domicile1').hide();
			$('#for_prelevement_domicile2').hide();	
			$('#for_prelevement_domicile3').hide();	
			$('#for_prelevement_domicile4').hide();	
			$('#prelevement_indiv_groupe').val('indiv');	
		}

    });

	$("#prelevement_indiv_groupe").change(function(){
		if (this.value == "group") {	
			$('#for_prelevement_domicile4').show();	
		} else {
			$('#for_prelevement_domicile4').hide();
		}

    });
	/* ***************************************** */
	


	/* hiding information for no vaccination  */
	$('#for_vaccination_sars_cov_2_1').hide();
	$('#for_vaccination_sars_cov_2_2').hide();
	$('#for_vaccination_sars_cov_2_3').hide();
	$("#vaccination_sars_cov_2").change(function(){
		if (this.value == "oui") {
			$('#for_vaccination_sars_cov_2_1').show();	
			$('#for_vaccination_sars_cov_2_2').show();	
			$('#for_vaccination_sars_cov_2_3').show();	
		} else {
			$('#for_vaccination_sars_cov_2_1').hide();
			$('#for_vaccination_sars_cov_2_2').hide();	
			$('#for_vaccination_sars_cov_2_3').hide();	
		}

    });
	/* ***************************************** */


	/*
	$('#div_top_menu').mouseleave(function(){
		$('#div_menu').hide('slow');
		$('#img_dash').hide();
		$('#img_plus').show();
	}); 
	*/
	/*
	$('#show_autres_virus').mouseover(function(){
		$('#div_autres_virus').show('slow');
	});
	
	$('#div_top_autres_virus').mouseleave(function(){
		$('#div_autres_virus').hide('slow');
	});
	*/
	
	$('#show_autres_virus').click(function(){
		if($('#div_autres_virus').is(":visible")){
			$('#div_autres_virus').hide('slow');
			$('#show_autres_virus' ).css('background', 'url(../images/arrow_down.png) no-repeat right rgba(0,0,0,.0)');
	        $('#show_autres_virus' ).css('background-position', '70%');
		}
		else{
			$('#div_autres_virus').show('slow');
			$('#show_autres_virus' ).css('background', 'url(../images/arrow_up.png) no-repeat right rgba(0,0,0,.0)');
	        $('#show_autres_virus' ).css('background-position', '70%');
		}
	});
	
	$('#show_sequencage').click(function(){
		if($('#div_sequencage').is(":visible")){
			$('#div_sequencage').hide('slow');
			$('#show_sequencage' ).css('background', 'url(../images/arrow_down.png) no-repeat right rgba(0,0,0,.0)');
	        $('#show_sequencage' ).css('background-position', '70%');
		}
		else{
			$('#div_sequencage').show('slow');
			$('#show_sequencage' ).css('background', 'url(../images/arrow_up.png) no-repeat right rgba(0,0,0,.0)');
	        $('#show_sequencage' ).css('background-position', '70%');
		}
	});
	
	$('#show_arbovirus').click(function(){
		if($('#div_arbovirus').is(":visible")){
			$('#div_arbovirus').hide('slow');
			$('#show_arbovirus' ).css('background', 'url(../images/arrow_down.png) no-repeat right rgba(0,0,0,.0)');
	        $('#show_arbovirus' ).css('background-position', '70%');
		}
		else{
			$('#div_arbovirus').show('slow');
			$('#show_arbovirus' ).css('background', 'url(../images/arrow_up.png) no-repeat right rgba(0,0,0,.0)');
	        $('#show_arbovirus' ).css('background-position', '70%');
		}
	});
	
	
});