<?php for($i=2; $i<=20; $i++) { ?>
    <tr style = "display:none">
        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&rarr;&nbsp;
            <label for="<?php echo('investigation'.$i); ?>" id="<?php echo('label_investigation'.$i); ?>">Investigation : </label>
            <select id="<?php echo('investigation'.$i); ?>" name="<?php echo('investigation'.$i); ?>"  disabled>
                <option value=""></option>
                <?php for($an = 17; $an <= date("y"); $an++){ ?>
                        <option value="<?php echo("epi/".$an); ?>"><?php echo("epi/".$an); ?></option>
                <?php } ?>
                <?php 
                    mysqli_data_seek($res1, 0); 
                    while($data = mysqli_fetch_array($res1)){ 
                ?>
                <option value="<?php echo($data['projet']); ?>"><?php echo($data['projet']); ?></option>
                <?php } ?>
            </select>
        </td>
    
        <td><label for="<?php echo('diagnostique'.$i); ?>" id="<?php echo('label_diagnostique'.$i); ?>">Pathog&egrave;ne : </label>
            <select id="<?php echo('diagnostique'.$i); ?>" name="<?php echo('diagnostique'.$i); ?>"  disabled>
                <option value=""></option>
                <?php
                    mysqli_data_seek($res2, 0);
                    while($data = mysqli_fetch_array($res2)){ 
                        //$virus = explode("_", $data['COLUMN_NAME']);
                        $virus = $data['COLUMN_NAME'];
                        $virus = str_replace("arn_", "", $virus);
                        $virus = str_replace("arnc_", "", $virus);
                        $virus = str_replace("igm_", "", $virus);
                ?>
                <option value="<?php echo("pcr-igm_".$virus); ?>"><?php echo("pcr-igm_".$virus); ?></option>
                <?php } ?>
            </select></td>
    </tr>
<?php } ?>