$(document).ready(function() {
	$("#a_deconnexion").click(function(){
		 alertify.confirm("Voulez-vous vraiment FERMER VOTRE SESSION?", function (e) {
		        if (e) {       
		            location='../logout.php';
		            return true;
		        } else {
		            return false;
		        }
		 });
	});
});