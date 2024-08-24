function handleFileSelect(evt) {
        if (!confirm('Sauvegarder cette image sur le wiki ?')) {
           return false;
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
                          if (news != "") {
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
	alert('Remplissez le champ : "Nom de votre fanfic"')
	return false;
	}
    $('#startButton').attr("disabled","disabled").addClass( 'ui-state-disabled' );
    var page = "\n----\n{{Fanfic\n|NOM = " + $("#Name").val() + "\n|USER = " + $("#Username").val() + "\n|Image = " + $("#Files").val() + "\n|Category = " + $("#Saison").val() + "\n}}";
var url = wgServer + '/api.php?action=edit&title=Imaginez_votre_fanfic_!&section=new&text=' + page + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
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
        <p>Nom de la fanfic:</p> \
            <input type="text" size="25" id="Name"/> \
        <p>Votre nom d\'utilisateur:</p> \
            <input type="text" size="25" maxlength="20" id="Username"/> \
        <p class="Image">Couverture de la Fanfic (optionnel) :</p> \
            <input type="file" id="Files" name="files[]" multiple /> \
        <p>Catégorie de votre fanfic:</p> \
            <select id="Category" name="Saison"> \
              <option value="Inazuma Eleven" selected>Inazuma Eleven</option> \
              <option value="Inazuma Eleven GO" selected>Inazuma Eleven GO</option> \
              <option value="Gold" selected>Or</option> \
            </select> \
	</span> \
    </fieldset> \
</form>';
$('#troop-button').click(function () {
    $.showCustomModal('Inscrivez votre Fanfic', troopHTML, {
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
    document.getElementById('Files').addEventListener('change', handleFileSelect, false); //is a <input type="file" id="files" name="files[]" multiple />
});