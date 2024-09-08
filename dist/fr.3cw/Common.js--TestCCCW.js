/* Any JavaScript here will be loaded for all users on every page load. */
/* Test Hulothe */

$('#nbcbx').click(function() {
    if ($('input[type="radio"]:checked').size() < 10) {
        alert("Vous devez répondre à toutes les questions !");
    } else {
        var trefles = $('input.fc-trefle[type="radio"]:checked').size();
        var piques = $('input.fc-pique[type="radio"]:checked').size();
        var coeurs = $('input.fc-coeur[type="radio"]:checked').size();
        var carreaux = $('input.fc-carreau[type="radio"]:checked').size();
        $('.fc-resultats').html('<p>Vous avez choisi :<br /><b style="color: #e00">' + piques + '</b>&nbsp;&nbsp;B (bureaucrate),<br /><b style="color: #e00">' + trefles + '</b>&nbsp;&nbsp;C (Complète),<br /><b style="color: #e00">' + coeurs + '</b>&nbsp;&nbsp;A (Administrateur) et<br /><b style="color: #e00">' + carreaux + '</b>&nbsp;&nbsp;D (Développeur)</p>');
        $('.fc-resultats').css('padding', '20px').css('border', '2px solid grey');
        var lemaximum = Math.max(trefles, piques, coeurs, carreaux);
        if (trefles == lemaximum) {
            $('.fc-resultats').append('<p class="filiere">Vous préfèrerez la filière <b style="color:#e00">C</b> (Complète), pour devenir un contributeur avancé !</p>');
        }
        if (piques == lemaximum){
            $('.fc-resultats').append('<p class="filiere">Vous préfèrerez la filière <b style="color:#e00">B</b> (Bureaucrate), pour gérer votre wikia à la perfection !</p>');
        }
        if (coeurs == lemaximum) {
            $('.fc-resultats').append('<p class="filiere">Vous préfèrerez la filière <b style="color:#e00">A</b> (Administrateur), pour maîtriser tous les outils et le codage nécessaires à votre rôle d\'administrateur !</p>');
        }
        if (carreaux == lemaximum) {
            $('.fc-resultats').append('<p class="filiere">Vous préfèrerez la filière <b style="color:#e00">D</b> (Développeur), pour devenir un specialiste du codage !</p>');
        }
        var nbdemax = $('.filiere').length;
        if (nbdemax > 1) {
            $('.fc-resultats').append('<p><b>Attention : vous avez plusieurs filières préférées (' + nbdemax + ' exactement). Vous devrez en choisir une parmis ces ' + nbdemax + ' pour participer aux cours.</b></p>')
        }
    }
});