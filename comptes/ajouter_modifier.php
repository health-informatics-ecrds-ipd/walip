<?php 
     session_start();
     if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) 
	 {
         header('location:../logout.php');
         exit();
     }
?>
<script type="text/javascript"> 
    $(document).ready(function(){
        var url =  location.href;
    
        /// Modification
        if(url.indexOf("&id") >= 0)
        {
            url =  ((location.href).split("&")[1]).split("="); 
            pre_fill($.trim(url[1]));
            $('#enregister_client').text('Modifier');
            $('#enregister_client').css('color','rgba(230,0,0,0.8)');
            $('#form_clients').attr('action','enregistrer_modification.php?id='+$.trim((location.href).split("=")[2]));
        } 
        
        /// Ajout d'un nouveau client
        else 
        {
            $('#enregister_client').text('Enregistrer');
            $('#enregister_client').css('color','white');
        }
    });
</script>
<style>
    input, select{
        width:300px;
    }
    label{
        font-size:21px;
    }
	tr:nth-child(even) {
		background: rgba(0, 0, 0, .045);
		border-radius:30px;
	}
	td:nth-child(odd) {
		background: rgba(0, 0, 0, .025);
		border-radius:30px;
	}
	td:nth-child(even) {
		background: rgba(0, 0, 0, .025);
		border-radius:30px;
	}
</style>
<div id="div_ajouter_modifier" class="div_table_style_class">
	<form id="form_clients"  method="POST"
		action="enregistrer_client.php" style="width: 90%">
		<table id="table_compte_acces" class="div_table_style_class"> 
			<caption style="color: red; font-style: italic;">Tous les champs sont obligatoires</caption>
			<tr>
				<td><label for="nom" id="label_nom">Nom:</label></td>
				<td><input type="text" id="nom" name="nom" /></td>
			</tr>
			<tr>
				<td><label for="pays" id="label_pays">Pays:</label></td>
				<td><select id="pays" name="pays" >
						<option value=""></option>
                        <?php $res = mysqli_query($link, "SELECT * FROM cnrfj_pays"); ?>
                        <?php while($data = mysqli_fetch_array($res) ){ ?>
                        <option value="<?php echo $data['nom']; ?>"><?php echo $data['nom']; ?></option>
                        <?php } ?>
                    </select></td>
			</tr>
			<tr>
				<td><label for="district" id="label_district">District:</label></td>
				<td><input type="text" id="district" name="district"/></td>
			</tr>
			
			<tr>
				<td><label for="district" id="label_laboratoire">Laboratoire:</label></td>
				<td><input type="text" id="laboratoire" name="laboratoire"
					 /></td>
			</tr>
			<tr>
				<td><label for="adresse_mail" id="label_adresse_mail">Adresse E-mail:</label></td>
				<td><input type="text" id="adresse_mail" name="adresse_mail"/></td>
			</tr>
			
			<tr>
				<td><label for="telephone" id="label_telephone">Téléphone:</label></td>
				<td><input type="text" id="telephone" name="telephone"
					 /></td>
			</tr>
			
			<tr>
				<td><label for="email_notification" id="label_email_notification">Suivre l'utilisateur:</label></td>
				<td><select id="email_notification" name="email_notification" >
						<option value=""></option>
						<option value="oui">Oui</option>
						<option value="non">Non</option>
                    </select></td>
			</tr>
		</table>
			<br><br>
			<label style="font-size:28px"><b></b>ROLE(S):</b></label>
			<br><br>
			<!-- tr>
				<td><label style="font-weight: bold; font-size:30px;"><u>ROLE(S):</u></label></td>
				<td></td>
			</tr-->
		<table class="div_table_style_class">
			<tr>
				<td><label for="comptes" id="label_comptes">Gestion des Comptes</label></td>
				<td><input type="checkbox" id="comptes" name="comptes"
					 /></td>
			</tr>

			<tr>
				<td><label for="resplab" id="label_resplab">RESPONSABLE LABO</label></td>
				<td><input type="checkbox" id="resplab" name="resplab"
					 /></td>
			</tr>
			<tr>
				<td><label for="moh" id="label_moh">Ministère of Health</label></td>
				<td><input type="checkbox" id="moh" name="moh"
					 /></td>
			</tr>
			<tr>
				<td><label for="ooas" id="label_ooas">OOAS</label></td>
				<td><input type="checkbox" id="ooas" name="ooas"
					 /></td>
			</tr>
			<tr>
				<td><label for="investigations" id="label_investigations">Investigations</label></td>
				<td><input type="checkbox" id="investigations" name="investigations"
					 /></td>
			</tr>
		


			
		<?php include("inc_epi_list.php"); ?>

		</table>
		<br> 
		<input type="text" id="profile" name="profile" style="display: none;" />
		<button class="myButton" id="enregister_client" style="padding: 15px;">Enregistrer</button>
	</form>
</div>
