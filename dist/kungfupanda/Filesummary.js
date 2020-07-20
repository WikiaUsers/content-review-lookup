function UploadTemplate() {
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)			return;
	if (editbox.value != '')	return;
	editbox.value = "S"+"HORT DESCRIPTION OF IMAGE GOES HERE\n"
		+ "*'''Source:''' NAME/URL OF SOURCE GOES HERE\n";
}
addOnloadHook(UploadTemplate);