/* Ce code servira pour signaler une éventuelle erreur sur le wikia */
function reporterrorsubmit() {
	if (!$("#Name").val()) {
	alert('Remplissez le champ : "Titre de la page"')
	return false;
	}
	if (wgUserName) {
		var user = 'de [[User:' + wgUserName + '|' + wgUserName + ']]';
	} else {
		var user = "d'un contributeur Wikia";
	}
    $('#startButton').replaceWith('<img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" />');
    var page = "<h2>" + $('#Name').val() + "</h2>" + $('#Corps').val() + '<br>' + "''reporterror " + user + "''";
var url = wgServer + '/api.php?action=edit&title=' + wgPageName + '&section=new&text=' + page + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
    $.post(url, function (r) {
console.log('Should be done now:',r);
	$('#reporterror').closeModal();
        window.location.reload();
    });
}
var reporterrorHTML = '\
<form method="" name="" class="WikiaForm"> \
    <fieldset> \
	<div align="center"> \
        <p>Titre de la page:</p> \
            <input type="text" size="25" id="Name"/> \
        <p>Description des erreurs:</p> \
            <textarea id="Corps" placeholder="Description" style="width: 471px; height: 203px;" COLS=25 ROWS=10/> \
	</div> \
	<div style="clear: both; font-size:75%; font-style: italic;">Toutes les contributions à Wiki Clash of Clans sont considérées comme publiées sous les termes de la CC-BY-SA (voir <a href="/wiki/w:c:fr:Licence">Wikia : Licence</a> pour plus de détails). Si vous ne désirez pas que vos écrits soient modifiés et distribués à volonté, merci de ne pas les soumettre ici. \
Vous nous promettez aussi que vous avez écrit ceci vous-même, ou que vous l’avez copié d’une source provenant du domaine public, ou d’une ressource libre. N’UTILISEZ PAS DE TRAVAUX SOUS DROIT D’AUTEUR SANS AUTORISATION EXPRESSE !</div> \
    </fieldset> \
</form>';
$('#create-reporterror').click(function () {
    $.showCustomModal('Signaler une ou plusieurs erreurs', reporterrorHTML, {
        id: 'reporterror',
        width: 500,
        buttons: [{
			message: 'Annuler',
            handler: function() {
                $('#reporterror').closeModal();
            }
        }, {
            id: 'startButton',
            message: 'Ajouter',
            defaultButton: true,
            handler: function () {
            reporterrorsubmit();    
            }
        }]
    });
});