function forcePreview() {
	if( wgUserGroups && wgUserGroups.join(' ').indexOf('user') != -1 || wgAction != 'edit' )
		return;
	saveButton = document.getElementById('wpSave');
	if( !saveButton )
		return;
	saveButton.disabled = true;
	saveButton.value = 'Save page (use preview first)';
	saveButton.style.fontWeight = 'normal';
	document.getElementById('wpPreview').style.fontWeight = 'bold';
}
addOnloadHook(forcePreview);