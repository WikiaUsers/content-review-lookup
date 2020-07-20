/*<source lang="javascript">
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to the wiki by Yami Arashi
@ License: CC-BY-NC-SA
*/

$('#report').html('<a class="wikia-button" id="report" onclick="openForm()">Make a Report</a>');

function openForm() {
	$.showCustomModal("IP Check Request", '<form class="WikiaForm" method="" name=""><fieldset><strong>User:</strong><input id="YourName" type="text" placeholder="Your Username" style="width: 500px"/><br/><strong>User:</strong><input id="FirstAccount" type="text" placeholder="First Account" style="width: 500px"/><br/><strong>User:</strong><input id="SecondAccount" type="text" placeholder="Second Account" style="width: 500px"/><br/><textarea id="Reason" cols="80" rows="10" placeholder="Reason why the user is suspected for sockpuppetry."></textarea></feildset></form>', { id: "reportWindow", width: 650, buttons: [ { id: "cancel", message: "Cancel", handler: function() { cancelform(); } }, { id: "submit", defaultButton: true, message: "Submit", handler: function() { submitform(); setTimeout(cancelform(), 1000); } } ] });
}

//Closes the form
function cancelform() {
    $("#reportWindow").closeModal();
}

//Submits the form
function submitform() {
    var param1 = document.getElementById("YourName").value,
        param2 = document.getElementById("FirstAccount").value,
        param3 = document.getElementById("SecondAccount").value,
        param4 = document.getElementById("Reason").value,
        full = '{{Report|' + param1 + '|' + param2 + '|' + param3 + '|' + param4 + '}}';

    //Ajax URL
    var url = wgServer + '/api.php?action=edit&title=' + encodeURIComponent(mw.config.get("wgPageName")) + '&section=new&text=' + encodeURIComponent(full) + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);

    $.post(url, function() {
		window.location.reload();
    });
}
/*</source>*/