/* Any JavaScript here will be loaded for all users on every page load. */
function anectodesubmit() {
	if (!$("#Name").val()) {
	alert('Remplissez le champ : "Titre de votre anecdote"')
	return false;
	}
	if (wgUserName) {
		var user = 'de [[User:' + wgUserName + '|' + wgUserName + ']]';
	} else {
		var user = "d'un contributeur Wikia";
	}
    $('#startButton').replaceWith('<img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" />');
    var page = "<h2>" + $('#Name').val() + "</h2>" + $('#Corps').val() + '<br>' + "''Anecdote " + user + "''";
var url = wgServer + '/api.php?action=edit&title=' + wgPageName + '&section=new&text=' + page + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
    $.post(url, function (r) {
console.log('Should be done now:',r);
	$('#anecdote').closeModal();
        window.location.reload();
    });
}
var anecdotesHTML = '\
<form method="" name="" class="WikiaForm"> \
    <fieldset> \
	<div align="center"> \
        <p>Titre de votre anecdote:</p> \
            <input type="text" size="25" id="Name"/> \
        <p>Votre anecdote:</p> \
            <textarea id="Corps" placeholder="Votre anecdote" style="width: 471px; height: 203px;" COLS=25 ROWS=10/> \
	</div> \
	<div style="clear: both; font-size:75%; font-style: italic;">Toutes les contributions à Wiki Clash of Clans sont considérées comme publiées sous les termes de la CC-BY-SA (voir <a href="/wiki/w:c:fr:Licence">Wikia : Licence</a> pour plus de détails). Si vous ne désirez pas que vos écrits soient modifiés et distribués à volonté, merci de ne pas les soumettre ici. \
Vous nous promettez aussi que vous avez écrit ceci vous-même, ou que vous l’avez copié d’une source provenant du domaine public, ou d’une ressource libre. N’UTILISEZ PAS DE TRAVAUX SOUS DROIT D’AUTEUR SANS AUTORISATION EXPRESSE !</div> \
    </fieldset> \
</form>';
$('#create-anecdote').click(function () {
    $.showCustomModal('Ajouter une anecdote', anecdotesHTML, {
        id: 'anecdote',
        width: 500,
        buttons: [{
			message: 'Annuler',
            handler: function() {
                $('#anecdote').closeModal();
            }
        }, {
            id: 'startButton',
            message: 'Ajouter',
            defaultButton: true,
            handler: function () {
            anectodesubmit();    
            }
        }]
    });
});