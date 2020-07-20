/*!
 * Mark for deletion
 *
 * Adds a button to the toolbar that automatically adds {{delete|reason}} to the top of a page
 * so that users can quickly mark spam or inappropriate pages for deletion
 * 
 * Copyright (c) Jeff Bradford ([[User:Mathmagician]])
 */
/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */
(function ($, mw, window) {
	"use strict";
	
	var skin = mw.config.get("skin"),
		wgUserName = mw.config.get("wgUserName"),
		wgServer = mw.config.get("wgServer"),
		wgPageNameEncoded = window.encodeURIComponent(mw.config.get("wgPageName"));
	
	// gets an edittoken and calls the setDeleteNotice method after 
	function getEditToken(deleteReason) {
		var xhr = new XMLHttpRequest(),
			url = wgServer + "/api.php?action=query&prop=info&intoken=edit&format=xml&titles=" + wgPageNameEncoded;
		
		xhr.open("GET", url);
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				var text, indexFrom, indexTo;
				
				// parse response for edittoken
				text = this.responseText;
				indexFrom = text.indexOf("edittoken=") + 11;
				text = text.substring(indexFrom);
				indexTo = text.indexOf("\"");
				text = text.substring(0, indexTo);
				
				// set delete notice, passing deleteReason and token along
				setDeleteNotice(deleteReason, text);
			}
		};
		xhr.send();
	}
	
	function setDeleteNotice(deleteReason, token) {
		var xhr = new XMLHttpRequest(),
			summary = "marked for deletion: " + deleteReason,
			content = "{{delete|" + deleteReason + "}}",
			url = wgServer + "/api.php?action=edit&title=" + wgPageNameEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&prependtext=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(token);
		
		// add delete notice to the top of the page and reload
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				window.location.reload();
			}
		};
		xhr.send();
	}
	
	function addDeleteNoticeButton() {
		// create button
		var $button = $('<li><a id="mark-for-deletion" style="cursor: pointer;">Mark for deletion</a></li>');
		$button.click(function () {
			var deleteReason = window.prompt("Enter delete reason to quickly mark this page for deletion:", "spam");
			if (typeof deleteReason === "string" && deleteReason !== null && deleteReason.length > 0) {
				getEditToken(deleteReason);
			}
		});
		
		// add button to toolbar
		var $toolbar;
		if (skin === "oasis" || skin === "wikia") {
			$toolbar = $(document.getElementById("WikiaBarWrapper")).find("li.mytools");
			$toolbar.before($button);
		} else {
			$toolbar = $(document.getElementById("p-tb")).find("ul");
			$toolbar.append($button);
		}
	}
	
	// add button on DOMReady, but only for logged-in users
	if (typeof wgUserName === "string" && wgUserName !== null && wgUserName.length > 0) {
		$(addDeleteNoticeButton);
	}
}(jQuery, mediaWiki, window));