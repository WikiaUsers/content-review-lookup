function UploadTemplate() {
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)			    return;
	if (editbox.value != '')    return;
	editbox.value = "{"+"{Fileinfo\n"
		+ "|license=\n"
		+ "|categories=\n"
		+ "}"+"}";
}
addOnloadHook(UploadTemplate);