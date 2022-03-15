<?php 
     session_start();
     if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
         header('location:../logout.php');
         exit();
     }
?>
<style>	
	#table_fiche_prelevement td{
		text-align:center;
	}
	#table_fiche_prelevement th{
		text-align:center;
	}
	table_fiche_prelevement tr{
		text-align:left;
	}
		
	#tbl_search td{
		text-align:left;
		border-radius:20px;
		padding-bottom:5px;
	}
	
	#tbl_search {
		width:80%;
	}

	label{
		font-size:12px;
	}
</style>

 
<div class="div_table_style_class" >
	<br>
	<!-- table de recherche -->
	<table id="tbl_search">
		<tr>
			<td>
				<table cellpadding="3" cellspacing="0" border="0" style="padding-left : 40px; margin: 0 auto 2em auto;"  >
			        <thead>
			            <tr>
			                <th>Cible</th>
			                <th>Texte (recherche)</th>
			            </tr>
			        </thead>
			        <tbody style="text-align: left;">
			            <tr id="filter_col1" data-column="0">
			                <td><label for="col0_filter" id="label_col0_filter">Editeur</label></td>
			                <td align="center"><input type="text" class="column_filter" id="col0_filter"></td>
			            </tr>
			            <tr id="filter_col2" data-column="1">
			                <td><label for="col1_filter" id="label_col1_filter">No-IPD</label></td>
			                <td align="center"><input type="text" class="column_filter" id="col1_filter"></td>
			            </tr>         
			        </tbody>
			    </table>
			</td>
			<td>
				<table cellpadding="3" cellspacing="0" border="0" style="padding-left : 40px; margin: 0 auto 2em auto;"  >
			        <thead>
			            <tr>
			                <th>Cible</th>
			                <th>Texte (recherche)</th>
			            </tr>
			        </thead>
			        <tbody style="text-align: left;">
			            <tr id="filter_col3" data-column="2">
			                <td><label for="col2_filter" id="label_col2_filter">Date</label></td>
			                <td align="center"><input type="text" class="column_filter" id="col2_filter"></td>    
			            </tr>  
			            <tr id="filter_col4" data-column="3">
			                <td><label for="col3_filter" id="label_col3_filter">Profile</label></td>
			                <td align="center"><input type="text" class="column_filter" id="col3_filter"></td>    
			            </tr>       
			        </tbody>
			    </table>
			</td>
		</tr>
	</table>
	
    <div >
    	
        <a  href="javascript:void(0)"
            style="margin-left: 42%; float: left"
            onclick="$('#table_fiche_prelevement').DataTable().ajax.reload();"
            class="class_bt_refresh">
            Rafraichir la table 
        </a>
    </div>
    
    <br/>
    <br/>
    <br/>
    
    <table id="table_fiche_prelevement" width="100%" class="table table-hover table-striped"  > 
        <thead>
            <tr>                      
                <th class="all">Editeur</th>
                <th class="all">NO&nbsp;IPD</th>
                <th class="all">Date&nbsp;&&nbsp;Heure</th>
                <th class="all">Profile</th>
            </tr>
        </thead> 
    </table>
</div>
