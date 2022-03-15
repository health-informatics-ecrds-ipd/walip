<?php 
     session_start();
     if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
         header('location:../logout.php');
         exit();
     }
?>
<div class="div_table_style_class" >
    <table cellpadding="3" cellspacing="0" border="0" style="padding-left : 40px; margin: 0 auto 2em auto;"  >

        <tbody style="text-align: left;">
            <tr id="filter_col2" data-column="1">
                <td><label for="col1_filter" id="label_col1_filter"> PAYS</label></td>
                <td align="center"><input type="text" class="column_filter" id="col1_filter"></td>
            </tr>
           
            
            <tr id="filter_col5" data-column="4">
                <td><label for="col4_filter" id="label_col4_filter">NOM</label></td>
                <td align="center"><input type="text" class="column_filter" id="col4_filter"></td>
            </tr>    
            <tr id="filter_col6" data-column="5">
                <td><label for="col5_filter" id="label_col5_filter">E-MAIL</label></td>
                <td align="center"><input type="text" class="column_filter" id="col5_filter"></td>
            </tr>       
        </tbody>
    </table>
    <a  href="javascript:void(0)"
            style="margin-left: 10px;"
            onclick="$('#table_cnrfj_clients').DataTable().ajax.reload();"
            class="class_bt_refresh">
         Rafraichir la table 
    </a>
    <br/>
    <br/>
    <table id="table_cnrfj_clients"  width="100%" class="table table-hover table-striped"  > 
        <thead>
            <tr>                      
                <th class="none">id</th>
                <th>Pays</th>
                <th>District</th>
                <th>Labo</th>
                <th>Nom</th>
                <th class="none">E-mail</th>
                <th class="none">Acc&egrave;s</th>
                <th class="all">R&ocirc;le(s)</th>
                <th class="none">Nbre Connexions</th>
                <th class="none">Heure</th>
                <th class="none">Modifier</th>
                <th class="none">Reinitialiser</th>
                <th class="none">Supprimer</th>
                <th class="all">Statut</th>
                <th class="all">Nb<br>Download(s)</th>
                <th class="all">Date</th>
            </tr>
        </thead>          
    </table>
</div>
