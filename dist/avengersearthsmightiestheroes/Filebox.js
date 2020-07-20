function UploadTemplate() {
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)			return;
	if (editbox.value != '')	return;
	editbox.value = "{"+"{Filebox\n"
		+ "| description = \n"
		+ "| season      = \n"
		+ "| episode     = \n"
		+ "| source      = HD\n"
		+ "| origin      = \n"
		+ "| license     = screenshot\n"
		+ "}"+"}";
}
addOnloadHook(UploadTemplate);