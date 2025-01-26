var bssWikiSettings = {};
var settingsList = [
	{
		name : 'colorToggle',
		desc : 'Enable extra colors for items',
		isGadget : true,
		requiresLogin : false,
		initiate : initiateTemplateColor,
		functions : {
			change : switchTemplateColor
		}
	},
];

//Misc functions
function getGadgetID(name) {
	return 'gadget-' + name;
}

function getStorageID(name) {
	return name + 'Gadget';
}

function getCheckboxID(name) {
	return name + 'Switch';
}

function returnBool(value, truthy, falsy) {
	if (value === null || typeof value === "undefined")
		value = false;
	else if (value === truthy)
		value = true;
	else if (value === falsy)
		value = false;
	return value;
}

function changeGadget(name, value, succeed, failure) {
	console.log('gadget has been fired');
	new mw.Api().saveOption(getGadgetID(name), (value ? 1 : 0).toString())
	.done(function () {
		console.log('gadget is done');
		mw.user.options.set(getGadgetID(name), value);
		bssWikiSettings.settings[name] = value;
		if (typeof succeed === "function") succeed();
		return true;
	})
	.fail(function () {
		console.log('gadget failed');
		if (typeof failure === "function") failure();
		return false;
	});
}

//switch function for colorToggle
//someone please untangle the if stack pls
function initiateTemplateColor() {
	activateTemplateColor();
}

function activateTemplateColor() {
	console.log("color being activated");
	$(".color-template").removeClass("revertAllClass");
}

function deactivateTemplateColor() {
	console.log("color being deactivated");
	$(".color-template").addClass("revertAllClass");
}

function switchTemplateColor(event) {
	var settingID = 'colorToggle';
	
	console.log('this has been fired');
	if (event.target.checked) { //checked, means enable template
		if (bssWikiSettings.isLoggedIn) { 
			changeGadget(settingID, true, activateTemplateColor);
		}
		else {
			localStorage.setItem(getStorageID(settingID), 'True');
			activateTemplateColor();
		}
	}
	else { //not checked, means disable
		if (bssWikiSettings.isLoggedIn) {
			changeGadget(settingID, false, deactivateTemplateColor);
		}
		else {
			localStorage.setItem(getStorageID(settingID), 'False');
			deactivateTemplateColor();
		}
	}
}

//do you need to check mediawiki.user?
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']).then(
	function() {
		//getting user settings
		//should i attempt to save calls here?
		bssWikiSettings.isLoggedIn = !mw.user.isAnon();
		bssWikiSettings.settings = {};
		for (var i=0;i<settingsList.length;i++) {
			var curSetting = settingsList[i];
			if (curSetting.isGadget && bssWikiSettings.isLoggedIn) {
				var gadgetEnabled = mw.user.options.get(getGadgetID(curSetting.name));
				//console.log(gadgetEnabled);
				bssWikiSettings.settings[curSetting.name] = returnBool(gadgetEnabled, "1", "0");
			}
			else {
				var storedSetting = localStorage.getItem(getStorageID(curSetting.name));
				console.log(storedSetting);
				bssWikiSettings.settings[curSetting.name] = returnBool(storedSetting, 'True', 'False');
			}
		}
		
		//creating the module in DOM
		var settingsWrapper = document.createElement("div");
		settingsWrapper.classList.add("rail-module", "RightRailSettingsWrapper");
		settingsWrapper.id = "bss-wiki-right-rail-settings";
		document.querySelector(".right-rail-wrapper").prepend(settingsWrapper);
			
		var header = "<h2>Settings</h2><br>\n";
		$("#"+settingsWrapper.id).append(header);
			
		for (var i=0;i<settingsList.length;i++) {
			var curSetting = settingsList[i];
	
			var checkbox = document.createElement("input");
			checkbox.id = getCheckboxID(curSetting.name);
			checkbox.setAttribute("type","checkbox");
			for (var attr in curSetting.functions) {
				//console.log(attr);
				//console.log(typeof curSetting.functions[attr]);
				checkbox.addEventListener(attr, curSetting.functions[attr]);
			}
			//console.log(bssWikiSettings.settings[curSetting.name]);
			checkbox.checked = bssWikiSettings.settings[curSetting.name];
			if (bssWikiSettings.settings[curSetting.name] && 
			(!curSetting.isGadget || !bssWikiSettings.isLoggedin) &&
			"initiate" in curSetting && typeof curSetting.initiate === "function") {
				curSetting.initiate();
			}
	
			var label = document.createElement("label");
			label.setAttribute("for", checkbox.id);
			label.innerHTML = curSetting.desc;
	
			$("#"+settingsWrapper.id).append(checkbox, label);
		}
	}
);