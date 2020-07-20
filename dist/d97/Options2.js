$("div.chattopic").append(' • <a href="#" id="chatPluginsButton" onClick="openOptionsBox();" class="chatPluginsMenu topiclink">< height="12px" class="optionsimage chattopic-icon" />Options</a>');

function openOptionsBox() {
    var $optionsWindowHTML = $.showCustomModal( "Chat options", '<form method="" name="" class="WikiaForm "><fieldset>' + 
	'<div id="chatPluginsHeader">Select the features to enable:</div>' + 
	'<table id="chatPluginsTable"></table>' + 
	'<div>Note: clicking \'save\' will refresh the chat.</div></fieldset></form>', {
	id: "optionsWindow",
		width: 600,
		buttons: [
			{
			id: "cancel",
			message: "Cancel",
			},
			{
				id: "save",
				defaultButton: true,
				message: "Save",
			}
		]
	});
}

if (wgServer!="http://animalcrossing.wikia.com" && wgServer!="http://d97.wikia.com") {
    console.log("[OPTIONS2] This broken script is unauthorised for use on this wiki. Disabling");
    $("div.chattopic > #chatPluginsButton").remove();
}