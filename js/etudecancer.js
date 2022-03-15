// create a new doc
function createdocfunc(noDoc){	
	alertify.confirm("VOULEZ-VOUS CREER LE DOSSIER :" + noDoc, function (e) {
        if (e) {   
          $.post('php/createdoc.php', {'noDoc':noDoc}, function(data){
            var oData = data;
            if (oData == "ok") {
              alertify.success("REUSSITE : Le dossier a été bien créé !");
            }else{
              alertify.error("ERREUR :  Ce dossier existe déjà !!!");
            }	 
          });
        }      
    });	
}

//edit and existing doc
function editdocfunc(noDoc){	 
          $.post('php/editdoc.php', {'noDoc':noDoc}, function(data){
            var oData = data;
            console.log(oData);
            if (oData == "ok") {
              location.href = "indexonedoc.php";
            }else{
              alertify.error("ERREUR :  Ce dossier n'existe pas");
            }	 
          });           	
}





$(document).ready(function() {


    // element for real etudecancer
    $("#createdocbutton").click(function(){
        var createdoc = document.getElementById("createdoc").value;
        if (createdoc === undefined || createdoc === null || createdoc === "") {
          alertify.alert("VEUILLEZ SAISIR LE DOSSIER A CREER SVP");
        } else {
          createdocfunc(createdoc);
          document.getElementById("createdoc").value = "";
        }
        
    });


    $("#accessdocbutton").click(function(){
        var accessdoc = document.getElementById("accessdoc").value;
        if (accessdoc === undefined || accessdoc === null || accessdoc === "") {
          alertify.alert("VEUILLEZ SAISIR LE DOSSIER A CREER SVP");
        } else {
          editdocfunc(accessdoc);
        }
        

        
    });

    //window.open('ResultatCOVID-19.php?x='+id, 'name');
    // $.post('php/erasenoipd.php', {'noDoc':noDoc}, function(data){});
    // alertify.alert("Acces doc form");


    // end element for real etudecancer






    //deplacement of switchlabo.js inside $(document).ready
    //-------------------------------------------------//
    //-------------------------------------------------//
    // showing age menopause :
    $("#menopause").on('change',function(){  
    	if ($(this).val() == "oui") {
			var x = document.getElementsByClassName("label_age_menopause");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "inline";
			}			
    	}else{
			var x = document.getElementsByClassName("label_age_menopause");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
		}
    });


    // showing vaccination contre HPV :
    $("#vaccination_contre_HPV").on('change',function(){  
    	if ($(this).val() == "oui") {
			var x = document.getElementsByClassName("label_type_vaccination_contre_HPV");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "inline";
			}			
    	}else{
			var x = document.getElementsByClassName("label_type_vaccination_contre_HPV");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
		}
    });

    // showing 	Antecedents personnels de cancer  :
    $("#antecedents_personnels_cancer").on('change',function(){  
    	if ($(this).val() == "oui") {
			var x = document.getElementsByClassName("label_antecedents_cancer_organe");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "inline";
			}			
    	}else{
			var x = document.getElementsByClassName("label_antecedents_cancer_organe");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
		}
    });

    // showing 	Antecedents familiaux de cancer  :
    $("#antecedents_familiaux_cancer").on('change',function(){  
    	if ($(this).val() == "oui") {
			var x = document.getElementsByClassName("label_antecedents_familiaux_cancer_organe");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "inline";
			}			
    	}else{
			var x = document.getElementsByClassName("label_antecedents_familiaux_cancer_organe");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
		}
    });

    // showing 	elements for contraception  :
    $("#contraception").on('change',function(){  
    	if ($(this).val() == "oui") {
			var x = document.getElementsByClassName("label_type_contraception");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "inline";
			}			
    	}else{
			var x = document.getElementsByClassName("label_type_contraception");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
		}
    });
    //-------------------------------------------------//
    //-------------------------------------------------//


    //deplacement of submitAlertify.js inside $(document).ready
    //-------------------------------------------------//
    //-------------------------------------------------//
      //************************//
    //submitting bacterio button
    $("#sbt_info_mal_bacterio").click(function(){
        alertify.success('Success message');
        window.location.href = "/";

    
    });

    
    //************************//
    //submitting Arbo button
    $("#sbt_info_mal_arbo").click(function(){
        alertify.success('Success message');
    
    });
        //-------------------------------------------------//
        //-------------------------------------------------//


});     

