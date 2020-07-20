/*<source lang="javascript">
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to the wiki by Yami Arashi
@ License: CC-BY-NC-SA
*/
 
$('#message').html('<a class="wikia-button" id="message" onclick="openForm()">Leave a Message!</a>');
 
function openForm() {
	$.showCustomModal("Leave me a message!", '<form class="WikiaForm" method="" name=""><fieldset><input id="Header" type="text" placeholder="Header for the message." style="width: 500px"/><br/><textarea id="Message" cols="80" rows="14" placeholder="Type your message here. Remember to sign your post with ~~~~!"></textarea></fieldset></form>', { id: "messageWindow", width: 650, buttons: [ { id: "cancel", message: "Cancel", handler: function() { cancelform(); } }, { id: "submit", defaultButton: true, message: "Submit", handler: function() { submitform(); setTimeout(cancelform(), 1000); } } ] });
}
 
//Closes the form
function cancelform() {
    $("#messageWindow").closeModal();
}
 
//Submits the form
function submitform() {
    var param1 = document.getElementById("Header").value,
        param2 = document.getElementById("Message").value,
        full = '==' + param1 + '==\n' + param2 + '';
 
    //Ajax URL
    var url = wgServer + '/api.php?action=edit&title=' + encodeURIComponent(mw.config.get("wgPageName")) + '&section=new&text=' + encodeURIComponent(full) + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
 
    $.post(url, function() {
		window.location.reload();
    });
}
/*</source>*/