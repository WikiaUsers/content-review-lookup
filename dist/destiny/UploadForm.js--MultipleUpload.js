//This script replaces the default text at Special:MultipleUpload. It forms part of a larger script.
function ufExecute() {
    $("#wpUploadDescription").val("{{Image summary\n|type=\n"
	+ "|description=\n"
	+ "|source=\n"
	+ "|holder=\n"
	+ "|license=\n"
	+ "|variants=\n"
	+ "}}\n");
	$(".mw-htmlform-field-Licenses").hide();
}

$(document).ready(ufExecute());