function UploadTemplate() {
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)			return;
	if (editbox.value != '')	return;
	editbox.value = "{"+"{Imagebox\n"
		+ "|description = \n"
		+ "|source      = \n"
		+ "|source2     = \n"
		+ "}"+"}";
}
addOnloadHook(UploadTemplate);