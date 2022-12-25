(function (window, $, mw) {
	var conf = window.dev.openvsc || {};
	
	// Get existing edit button
	var edit = $("#ca-edit")[0];
	
		// Check if there is even an edit button we can use
	if (!edit) return;

	// Set defaults for variables if they aren't configured by the user
	if (!conf["web"]) { conf["web"] = "WEB"; } // Text of original edit button
	if (!conf["web-dropdown"]) { conf["web-dropdown"] = "Web edit"; } // Text of original edit dropdown button
	if (!conf["vsc"]) { conf["vsc"] = "VSC"; } // Text of VSC edit button
	if (!conf["vsc-dropdown"]) { conf["vsc-dropdown"] = "Open with VSC"; } // Text of VSC dropdown edit button

	// format from https://github.com/Frederisk/Wikitext-Extension-Gadget
	var scheme = 'vscode';
	var extensionID = 'rowewilsonfrederiskholme.wikitext';
	var actionPath = '/PullPage';
	var args = {
	    RemoteBot: 'true',
	    TransferProtocol: window.location.protocol,
	    SiteHost: mw.config.get('wgServer').replace(/^[\w-]*?:(?=\/\/)/, ''),
	    APIPath: mw.util.wikiScript('api'),
	    Title: mw.config.get('wgPageName')
	};
	var vsclink = scheme + "://" + extensionID + actionPath + "?" + new URLSearchParams(args).toString();

	// Check if it is a regular button or a dropdown and add the links according to that
	if (edit.parentElement.nodeName == "LI") {
		// Change original edit button's text
		edit.innerHTML = conf["web-dropdown"];

		// Add VSC button bellow the original edit button in the dropdown
		edit.parentElement.outerHTML += '<li><a href="' + vsclink + '">' + conf["vsc-dropdown"] + '</a></li>';
	} else {
		// Clear content and make sure the text is what we want it to be
		edit.innerHTML = '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small" /></svg>' + conf["web"];

		// Add the VSC button next to the WEB (normal edit) button
		edit.outerHTML += '<a class="wds-button wds-is-text page-header__action-button has-label" href="' + vsclink +
			'"> <svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-preformat-small" /></svg>' + conf["vsc"] + '</a>';
	}

	// If we have VE in our preferences AND VE mode is enabled in the config AND there is a VE edit button
	if (mw.user.options.get('editortype') == "2" /* 2 means VE */ && conf["VE"] && $("#ca-ve-edit")){
		// Add a VSC button next to the VE one
		
		// A few more defaults 
		if (!conf["web-ve"]) { conf["web-ve"] = "WEB-VE"; } // Text of original edit button
		if (!conf["vsc-ve"]) { conf["vsc-ve"] = "VSC-SE"; } // Text of VSC edit button
		edit = $("#ca-ve-edit")[0];
		
		// Clear content and make sure the text is what we want it to be
		edit.innerHTML = '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small" /></svg>' + conf["web-ve"];

		// Add the VSC button next to the WEB (normal edit) button
		edit.outerHTML += '<a class="wds-button wds-is-text page-header__action-button has-label" href="' + vsclink +
			'"> <svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-preformat-small" /></svg>' + conf["vsc-ve"] + '</a>';
	}
}(this, jQuery, mediaWiki));