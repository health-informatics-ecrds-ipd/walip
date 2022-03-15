function correct_form() {
    var someForm = $('#form_resultats');
    var return_val = true;
    $.each(someForm[0].elements, function(index, elem) {
        if ((elem.id).indexOf("_val") >= 0) {
            var v1 = $.trim($(elem).val());
            var res_id = (elem.id).substr(0, (elem.id).length - 4);
            var v2 = $.trim($('#' + res_id).val());
            
            if (((v1 === '' && v2 !== '') || (v1 !== '' && v2 === ''))) {
                return_val = false;
            }
            else if (v1 !== '' && v2 !== '') {
                if ($.isNumeric(v1) === false || $.isNumeric(v2) === false) {
                    return_val = false;
                }
            }
        }
    });
    return return_val;
}

function init_select_input_handler(){
    var someForm = $('#form_resultats');

    $.each(someForm[0].elements, function(index, elem){
        select_input_handler(elem.id);
    });
}

function select_input_handler(id) {
    if (id === 'no_ipd') {
        return;
    }

    if ((id.indexOf("igm_") >= 0 || id.indexOf("arn_") >= 0 || id.indexOf("sn_") >= 0) === false){
        return;
    }

    var id1;
    var id2;

    if (id.indexOf("_val") >= 0) {
        id2 = id;
        id1 = id.substr(0, id.length - 4);
    } else {
        id1 = id;
        id2 = id + '_val';
    }

    var v1 = $.trim($('#' + id1).val());
    var v2 = $.trim($('#' + id2).val());

    if (v1 === '' && v2 === '') {
        $('#' + id1).css('background', 'white');
        $('#' + id2).css('background', 'white');
    } else if (v1 === '' && v2 !== '') {
        if ($.isNumeric(v2) === false) {
            $('#' + id2).css('background', 'rgba(220,0,0,0.3)');
        } else {
            $('#' + id2).css('background', 'white');
        }
        $('#' + id1).css('background', 'rgba(255,255,0,0.3)');
    } else if (v1 !== '' && v2 === '') {
        $('#' + id2).css('background', 'rgba(255,255,0,0.3)');
    } else if (v1 !== '' && v2 !== '') {
        $('#' + id1).css('background', 'white');
        $('#' + id2).css('background', 'white');
        if ($.isNumeric(v2) === false) {
            $('#' + id2).css('background', 'rgba(220,0,0,0.3)');
        } else {
            $('#' + id2).css('background', 'white');
        }
    }

}

$(document).ready(function()
{
    $('#form_resultats').submit(function() {
        var no_ipd = $.trim($('#no_ipd').val());
        var methode = $.trim($('#methode').val());
        if (no_ipd === '' || methode === '') {
            alertify.alert('ERREUR : veuillez remplir le(s) champ(s) obligatoire(s)!');
            return false;
        }
        if ($.isNumeric(no_ipd) === false)
        {
            alertify.alert('ERREUR : veuillez corriger le numero IPD!');
            return false;
        }
        /*
        if (correct_form() === false) {
            alertify.alert('ERREUR : presence de quelques erreurs!');
            return false;
        }
        */
        if ($('#sbt_resultats').val() === 'Enregistrer') {
            $('#form_resultats').attr('action', 'enregistrer_resultats.php');
        }
        else {
            $('#form_resultats').attr('action', 'enregistrer_resultats_modif.php');
        }
        return true;
    });

    $('select').change(function() {
        select_input_handler(this.id);
    });

    $('input').keyup(function() {
        select_input_handler(this.id);
    });
});