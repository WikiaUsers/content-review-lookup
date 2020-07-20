/*!
 * Mark for review/slightly adapted by SoPretentious & Underscorre
 * 
 * Adds a button to the toolbar that automatically adds {{M4R|reason}} to the top of a page
 * so that users can quickly mark spam or inappropriate pages for review (same link)
 * 
 * http://dev.wikia.com/wiki/MarkForDeletion
 *jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true,             *unused:true, curly:true, browser:true, jquery:true */  


//<nowiki>

if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
 
		var wgServer = mw.config.get("wgServer"),
			wgPageNameEncoded = window.encodeURIComponent(mw.config.get("wgPageName"));
 
		// uses MW API to automatically edit the page and insert the M4R template at the top
		function setM4RNotice(M4RReason) {
			var c = null;
			$.ajax({
				url: wgServer + "/index.php?action=raw&title=" + wgPageNameEncoded,
				type: 'GET',
				success: function(raw) {
					console.log('done');
					var rarray = raw.match(/\[\[(Category\:[^\[\]]*)\]\]/gi);
					console.log(rarray);
					var i = 0;
					raw = raw + "\n<!--";
					for (i = 0; i < rarray.length; i++) {
						console.log(rarray[i]);
						raw = raw.replace(rarray[i], "");
						raw = raw + "\n" + rarray[i];
					}
					raw = raw + "\n-->";
					console.log(raw);
					if(rarray.length > 0) {
					    c = raw;
					}
					console.log(c);
					if(c !== null) {
        				var xhr = new XMLHttpRequest(),
        					summary = "Marked for review: " + M4RReason,
        					content = "{{M4R|" + M4RReason + "}}\n\n" + c,
        					editToken = mw.user.tokens.get("editToken"),
        					url = wgServer + "/api.php?action=edit&title=" + wgPageNameEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken);
 
        				xhr.open("POST", url);
        				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        				xhr.onreadystatechange = function () {
        					if (this.readyState === 4) {
        						window.location.reload();
        					}
        				};
        				xhr.send();
        			} else {
						var xhr = new XMLHttpRequest(),
        					summary = "Marked for review: " + M4RReason,
        					content = "{{M4R|" + M4RReason + "}}\n\n",
        					editToken = mw.user.tokens.get("editToken"),
        					url = wgServer + "/api.php?action=edit&title=" + wgPageNameEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&prependtext=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken);
 
        				xhr.open("POST", url);
        				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        				xhr.onreadystatechange = function () {
        					if (this.readyState === 4) {
        						window.location.reload();
        					}
        				};
        				xhr.send();
        			}
				},
				error: function() {
    				var xhr = new XMLHttpRequest(),
    					summary = "Marked for review: " + M4RReason,
    					content = "{{M4R|" + M4RReason + "}}\n\n",
    					editToken = mw.user.tokens.get("editToken"),
    					url = wgServer + "/api.php?action=edit&title=" + wgPageNameEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&prependtext=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken);
 
    				xhr.open("POST", url);
    				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    				xhr.onreadystatechange = function () {
    					if (this.readyState === 4) {
    						window.location.reload();
    					}
    				};
    				xhr.send();
				}
			});
		}
 
		// adds a "Mark for Review" button to the user's toolbar
		function initM4RNoticeButton() {
			var $button, toolbar, $mytoolsLI, $customizeLI;
 
			// create button
			$button = $('<li><a id="mark-for-M4R-link" style="cursor: pointer;">Mark for review</a></li>');
			$button.click(function M4RNoticeButtonClickHandler() {
				var promptedM4RReason = "spam";
				if (typeof window.MarkForDeletion === "object" && window.MarkForM4R !== null && typeof window.MarkForM4R.promptedM4RReason === "string") {
					promptedM4RReason = window.MarkForM4R.promptedM4RReason;
				}
 
				var M4RReason = window.prompt("Enter reason to quickly mark this page for review:", promptedM4RReason);
 
				if (typeof M4RReason === "string" && M4RReason.length > 0) {
					setM4RNotice(M4RReason);
				}
			});
 
			// add button to toolbar
			toolbar = document.getElementById("WikiaBarWrapper");
			if (toolbar !== null) {
				// oasis
				$mytoolsLI = $(toolbar).find("li.mytools");
				if ($mytoolsLI.length > 0) {
					// insert link before My Tools
					$mytoolsLI.before($button);
				} else {
					// try to insert link before Customize
					$customizeLI = $(toolbar).find("a.tools-customize").parent();
					$customizeLI.before($button);
				}
			} else {
				// monobook
				toolbar = document.getElementById("p-tb");
				if (toolbar !== null) {
					$(toolbar).find("ul").append($button);
				}
			}
		}
 
		// add button on DOMReady
		$(initM4RNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

//</nowiki>