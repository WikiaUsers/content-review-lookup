/* Any JavaScript here will be loaded for all users on every page load. */

// Custom edit button for source mode by [[user:Thailog]] on [[w:c:avatar]]
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insert Imagebox template",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| season      = \r| episode     = \r| source      = \r| cats        = \r\}\}",
		"sampleText": ""};

//Lock Old Comments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
window.lockOldComments.addNoteAbove = true;