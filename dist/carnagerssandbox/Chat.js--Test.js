/* MultiBan.js Beta */
function showPopup() {
        $('body').append('<section style="left: 50%; top: 50px; width: 434px; z-index: 2000000002; margin-left: -222px;" class="modalWrapper" id="massban"><button class="close wikia-chiclet-button" onclick="cancelBan()"><img src="https://images.wikia.nocookie.net/__cb57523/common/skins/oasis/images/icon_close.png"></button><h1>Multiban</h1><section class="modalContent"><div><form method="" name="" class="WikiaForm "><fieldset><p>Enter usernames here, separated by a semicolon and a space. Tab insert works.</p><input type="text" name="multibaninput" id="multibaninput" /></fieldset><fieldset><p>Enter ban length here.</p><input type="text" name="multibanlenghtinput" id="multibanlenghtinput" /></p></form><div style="float:right;"><a onclick="banUsers()" class="wikia-button">Ban</a>&nbsp;<a onclick="cancelBan()" id="cancel" class="wikia-button secondary">Cancel</a></div></section></section>');
	$('body').append('<div style="height: 100%; width: 100%; z-index: 2000000001; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
}

function banUsers() {
	var multiban = $('#multibaninput').val()
        var multibanlength = $('#multibanlength').val()
	if (multiban.length != 0) {
		var usersToBan = multiban.split("; ");
		var i = 0;
		for (i; i<usersToBan.length; i++) {
			mainRoom.ban({name:usersToBan[i]});
		}
		$('#massban').remove();
		$('.blackout').remove();
	}
}