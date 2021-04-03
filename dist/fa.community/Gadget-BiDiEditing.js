function bidiSwitchSetup() {
	var editform = document.getElementById("editform");
	if (editform == null) {
		return;
	}
 
	bidiAddButton(editform, "Default", function(style) {
		style.direction = "inherit";
		style.unicodeBidi = "inherit";
	});
	bidiAddButton(editform, "dir=ltr", function(style) {
		style.direction = "ltr";
	});
	bidiAddButton(editform, "dir=rtl", function(style) {
		style.direction = "rtl";
	});
	bidiAddButton(editform, "bidi=normal", function(style) {
		style.unicodeBidi = "normal";
	});
	bidiAddButton(editform, "bidi=override", function(style) {
		style.unicodeBidi = "bidi-override";
	});
}
 
function bidiAddButton(before, label, action) {
	var button = document.createElement("input");
	button.type = "button";
	button.value = label;
	button.onclick = function(event) {
		var box = document.getElementById("wpTextbox1");
		if (box == null) {
			alert("Broken! Edit box missing.");
		} else {
			//var style = document.getOverrideStyle(box, null);
			var style = box.style;
			action(style);
		}
	}
	before.parentNode.insertBefore(button, before);
}
 
addOnloadHook(bidiSwitchSetup);