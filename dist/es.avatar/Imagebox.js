function UploadTemplate() {
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)			return;
	if (editbox.value != '')	return;
	editbox.value = "{"+"{Imagebox\n"
		+ "| descripción = \n"
		+ "| película    = \n"
		+ "| series      = \n"
		+ "| temporada   = \n"
		+ "| episodio    = \n"
		+ "| fuente      = \n"
		+ "| origen      = \n"
		+ "| cats        = \n"
		+ "| licencia    = \n"
		+ "}"+"}";
}
addOnloadHook(UploadTemplate);