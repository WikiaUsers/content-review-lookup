function handleFileSelect(evt) {
        if (!confirm('Sauvegarder cette image sur le wiki ?')) {
           return;
        }
	var file = evt.target.files[0]; // get (first) File 
	var fileName = evt.target.files[0].name;
        console.log(file + "///" + fileName);
	doApiCall(file, fileName);
 
}
function doApiCall(fileToUpload,fileName){
 
formdata = new FormData(); //see https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects?redirectlocale=en-US&redirectslug=Web%2FAPI%2FFormData%2FUsing_FormData_Objects
formdata.append("action", "upload");
formdata.append("filename", fileName);
formdata.append("token", mw.user.tokens.get( 'editToken' ) );
formdata.append("file", fileToUpload);
 
//as we now have created the data to send, we send it...
$.ajax( { //http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
		url: mw.util.wikiScript( 'api' ), //url to api.php 
		contentType:false,
		processData:false,
		type:'POST',
		data: formdata,//the formdata object we created above
		success:function(data){
                        if (data.indexOf("Warning") > -1) {
                          var news = prompt('Merci de choisir un autre nom pour votre image :',fileName);
                          if (news !== "") {
                          doApiCall(fileToUpload,news);
                          return false;
                          } else {
                          return false;
                          }
                        }
                        console.log("success!");
                        alert('Fichier enregistré.');
		},
		error:function(xhr,status, error){
			console.log(error);
		}
	});
}
function submit() {
	if (!$("#Name").val()) {
	alert('Remplissez le champ : "Nom de votre troupe"')
	return false;
	}
        var user = $("#Username").val() || "Anonyme";
    $('#startButton').replaceWith('<img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" />');
    var page = "\n----\n{{Imagination\n|NOM = " + $("#Name").val() + "\n|USER = " + user + "\n|Image = " + $("#Files").val() + "\n|Degats = " + $("#Degats").val() + "\n|PV = " + $("#PV").val() + "\n|Cout = " + $("#Cost").val() + "\n|Ressources = " + $('#Ressources option:selected').html() + "\n|Cible f = " + $("#Ciblef").val() + "\n|Cible = " + $("#Cibles").val() + "\n|Type de degats = " + $('#Typedegats option:selected').html() + "\n|Capacite = " + $("#Capacite").val() + "\n|Temps = " + $("#Time").val() + "\n|Vitesse = " + $("#Vitesse").val() + "\n|Description = " + $("#Description").val() + "\n}}";
var url = wgServer + '/api.php?action=edit&title=Imaginez_des_troupes_!&section=new&text=' + page + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
    $.post(url, function (r) {
console.log('Should be done now:',r);
	$('#new-troop').closeModal();
        window.location.reload();
    });
}
var troopHTML = '\
<form method="" name="" class="WikiaForm"> \
    <fieldset> \
	<span style="float:left;"> \
        <p>Nom de la troupe:</p> \
            <input type="text" size="25" id="Name"/> \
        <p>Votre nom d\'utilisateur:</p> \
            <input type="text" size="25" maxlength="20" id="Username"/> \
        <p>Dégâts de votre troupe:</p> \
            <input type="text" size="25" id="Degats" maxlength="3"/> \
        <p>Points de vie de votre troupe:</p> \
            <input type="text" size="25" id="PV" maxlength="4"/> \
        <p>Cout de formation de votre troupe:</p> \
            <input type="text" size="25" id="Cost" maxlength="5"/> \
        <p class="Image">Image de la troupe (optionnel) :</p> \
            <input type="file" id="Files" name="files[]" multiple /> \
        <p>Type de ressources :</p> \
            <select id="Ressources" name="Ressources"> \
              <option value="Elixir" selected>Élixir</option> \
              <option value="BlackElixir" selected>Élixir noir</option> \
              <option value="Gold" selected>Or</option> \
            </select> \
        <p>Cible préférée :</p> \
            <input type="text" size="25" id="Ciblef"/> \
        <p>Cibles :</p> \
            <input type="text" size="25" id="Cibles"/> \
	</span> \
	<span style="float:right;"> \
        <p>Type de dégâts :</p> \
            <select id="Typedegats" name="Dégâts"> \
              <option value="Melee" selected>Mélée</option> \
              <option value="Zone" selected>Zone</option> \
            </select> \
        <p>Capacité de logement :</p> \
            <input type="text" size="25" maxlength="3" id="Capacite"/> \
        <p>Temps de formation :</p> \
            <input type="text" size="25" maxlength="30" placeholder="30 minutes" id="Time"/> \
        <p>Vitesse :</p> \
            <input type="text" size="25" maxlength="2" id="Vitesse"/> \
        <p>Description :</p> \
            <textarea id="Description" placeholder="Description" COLS=25 ROWS=10/> \
	</span> \
	<div style="clear: both; font-size:75%; font-style: italic;">Toutes les contributions à Wiki Clash of Clans sont considérées comme publiées sous les termes de la CC-BY-SA (voir <a href="/wiki/w:c:fr:Licence">Wikia : Licence</a> pour plus de détails). Si vous ne désirez pas que vos écrits soient modifiés et distribués à volonté, merci de ne pas les soumettre ici. \
Vous nous promettez aussi que vous avez écrit ceci vous-même, ou que vous l’avez copié d’une source provenant du domaine public, ou d’une ressource libre. N’UTILISEZ PAS DE TRAVAUX SOUS DROIT D’AUTEUR SANS AUTORISATION EXPRESSE !</div> \
    </fieldset> \
</form>';
$('#Ressources').change(function() {
    if ($(this).val() !== "BlackElixir") {
        $('#Cost').val("");
        $('#Cost').attr('maxlength',5);
    } else {
        $('#Cost').val("");
        $('#Cost').attr('maxlength',4);
    }
});
$('#troop-button').click(function () {
    $.showCustomModal('Créer votre troupe', troopHTML, {
        id: 'new-troop',
        width: 500,
        buttons: [{
            id: 'startButton',
            message: 'Ajouter',
            defaultButton: true,
            handler: function () {
                submit();    
            }
        }, {
            message: 'Annuler',
            handler: function() {
                $('#new-troop').closeModal();
            }
        }]
    });
    if (wgUserName) {
      $('#Username').val(wgUserName);
      $('#Username').prop('disabled', true);
    } else {
      $("#Files").hide();
      $(".Image").hide();
    }
    document.getElementById('Files').addEventListener('change', handleFileSelect, false); //is a <input type="file" id="files" name="files[]" />
});