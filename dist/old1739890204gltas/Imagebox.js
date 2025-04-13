function UploadTemplate() {
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)			return;
	if (editbox.value != '')	return;
	editbox.value = "{"+"{Imagebox\n"
                + "| description = \n"
		+ "| season      = \n"
		+ "| episode     = \n"
		+ "| source      = \n"
		+ "| origin      = \n"
		+ "| cats        = \n"
		+ "| license     = \n"
		+ "}"+"}";
}
addOnloadHook(UploadTemplate);