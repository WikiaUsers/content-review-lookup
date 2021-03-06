/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
 
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection){
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0'){
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else{
		myField.value += myValue;
	}
}

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */