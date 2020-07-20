/*<source lang="javascript">
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to the wiki by Yami Arashi
@ License: CC-BY-NC-SA
*/
 
$('#nom').html('<a class="wikia-button" id="nom" onclick="openForm()">Make a Nomination</a>');
 
function openForm() {
	$.showCustomModal("Nominations for Rights", '<form class="WikiaForm" method="" name=""><fieldset><strong>User:</strong><input id="Nominee" type="text" placeholder="Nominee" style="width: 500px"/><br/><strong>User:</strong><input id="Nominator" type="text" placeholder="Nominator" style="width: 500px"/><br/><input id="UserRights" type="text" placeholder="Rights being requested/nominated" style="width: 500px"/><br/><input id="FirstEdit" type="text" placeholder="Date of first edit" style="width: 500px"/><br/><input id="EditCount" type="text" placeholder="Number of edits as of request" style="width: 500px"/><br/><textarea id="Nomination" cols="80" rows="10" placeholder="Insert nomination here."></textarea></feildset></form>', { id: "nomWindow", width: 650, buttons: [ { id: "cancel", message: "Cancel", handler: function() { cancelform(); } }, { id: "submit", defaultButton: true, message: "Submit", handler: function() { submitform(); setTimeout(cancelform(), 1000); } } ] });
}
 
//Closes the form
function cancelform() {
    $("#nomWindow").closeModal();
}
 
//Submits the form
function submitform() {
    var param1 = document.getElementById("Nominee").value,
        param2 = document.getElementById("Nominator").value,
        param3 = document.getElementById("UserRights").value,
        param4 = document.getElementById("FirstEdit").value,
        param5 = document.getElementById("EditCount").value,
        param6 = document.getElementById("Nomination").value,
        full = '{{NFR\n|nominee= ' + param1 + '\n|yourname= ' + param2 + '\n|rights= ' + param3 + '\n|joined= ' + param4 + '\n|editcount= ' + param5 + '\n|nom=\n' + param6 + '\n}}';
 
    //Ajax URL
    var url = wgServer + '/api.php?action=edit&title=' + encodeURIComponent(mw.config.get("wgPageName")) + '&section=new&text=' + encodeURIComponent(full) + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
 
    $.post(url, function() {
		window.location.reload();
    });
}
/*</source>*/