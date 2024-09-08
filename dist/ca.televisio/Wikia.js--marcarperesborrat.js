if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
 
		var wgServer = mw.config.get("wgServer"),
			wgPageNameEncoded = window.encodeURIComponent(mw.config.get("wgPageName"));
 
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "marcat per ser esborrat. motiu: " + deleteReason,
				content = "{{esborrat|" + deleteReason + "}}",
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
 
		// adds a "Mark for deletion" button to the user's toolbar
		function initDeleteNoticeButton() {
			var $button, toolbar, $mytoolsLI, $customizeLI;
 
			// don't create duplicate buttons
			if (document.getElementById("mark-for-deletion-link") !== null) {
				return;
			}
 
			// create button
			$button = $('<li><a id="mark-for-deletion-link" style="cursor: pointer;">Marcar per ser esborrat</a></li>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "spam";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
 
				var deleteReason = window.prompt("Anota el motiu pel qual aquesta pàgina ha de ser esborrada:", promptedDeleteReason);
 
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
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
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}-