/* Remove edit & ve button if there's edit with form */
$(function() {
	var formEdit = document.getElementById("ca-formedit");
	if (!formEdit) {
		return;
	}
	var usergroups = mw.config.get('wgUserGroups');
	var ns = mw.config.get("wgCanonicalNamespace");
	if (formEdit && !(usergroups.includes("editor"))) {
		var ve = document.getElementById("ca-ve-edit");
		var edit = document.getElementById("ca-edit");
		if (ve) {
			ve.style.display = "none";
		}
		if (edit && ns != 'Template') {
			edit.style.display = "none";
		}
		if (ns == 'Template') {
			formEdit.style.display = 'none';
		}
	}
	return;
});