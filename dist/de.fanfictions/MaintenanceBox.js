/* DETERMINE IF PAGE HAS A SLASH IN IT */
var doesTitleHaveASlash = "(.*/)";
if ( ! wgPageName.match(doesTitleHaveASlash)) { 
//wenn kein schrägstrich drin ist
var regexPageName = ':.*';		 

} else { 
// wenn schrägstrich drin ist 
var regexPageName = ':(.*?)/';		 
}

var wgPageNameRegexed = mw.config.get("wgPageName").match(regexPageName);

if ( ! wgPageName.match(doesTitleHaveASlash)) { 
//wenn kein schrägstrich drin ist
var wgPageNameRegexedSplit = wgPageNameRegexed[0].split(":").pop(); 
var wgPageNameRegexedEncoded = window.encodeURIComponent(wgPageName.match(wgPageNameRegexedSplit));

} else { 
// wenn schrägstrich drin ist 
var wgPageNameRegexedEncoded = window.encodeURIComponent(wgPageNameRegexed[1]);
}

function hideBox() {
      $("#organisationsbox").remove();
}



$(document).ready(function(){ 
if($("body").hasClass("ns-112")) {

/* append layouts */
	
		var wgServer = mw.config.get("wgServer");

		function addBearbeiterboxToPage() {
				summary = "Layout fix",
				editToken = mw.user.tokens.get("editToken"),
                                url_bearbeiter = wgServer + "/api.php?action=edit&title=" + wgPageName + "&summary=" + window.encodeURIComponent(summary) + "&format=json&appendtext=" + "\n\n{{Bearbeiter}}" + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";				

$.post(url_bearbeiter, function () {
window.location.reload();
    });
}

		function addGeschichtenbalkenToPage() {
				summary = "Layout fix",
				editToken = mw.user.tokens.get("editToken"),
                                url_balken = wgServer + "/api.php?action=edit&title=" + wgPageName + "&summary=" + window.encodeURIComponent(summary) + "&format=json&prependtext=" + "{{Geschichtenbalken}}\n" + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";	
			
$.post(url_balken, function () {
window.location.reload();
    });
}

		function addGeschichtenbalkenAndBearbeiterboxToPage() {
				summary = "Layout fix",
				editToken = mw.user.tokens.get("editToken"),
                                url_both = wgServer + "/api.php?action=edit&title=" + wgPageName + "&summary=" + window.encodeURIComponent(summary) + "&format=json&appendtext=" + "\n{{Bearbeiter}}" + "&prependtext={{Geschichtenbalken}}\n&token=" + window.encodeURIComponent(editToken) +"&bot=1";	
			
$.post(url_both, function () {
window.location.reload();
    });
}

$('#WikiaSearch').append('<br style="clear: both;"><br><section class="module" id="organisationsbox" style="font-style: 11px;"><div style="float: right; font-size: 80%;"><a href="http://de.fanfictions.wikia.com/wiki/MediaWiki:MaintenanceBox.js?action=edit">edit</a><a  id="showMaintenanceBox" style="cursor: pointer;" onclick="hideBox()">&nbsp;remove</a></div><h3 style="margin-top: 0;">Toolbox <a  style="font-size: 80%;" asdf href="http://de.fanfictions.wikia.com/wiki/MediaWiki_talk:MaintenanceBox.js">HowTo/Hilfe</a></h3><small>Referenz: Toolbox ändert Daten für [ ' +   wgPageNameRegexed[1]  + ' ] (wenn "undefined", dann bitte auf Unterseite gehen - außer für geschichtenbalken.)</small><br><br />Geschichtenseite quickfix: <a asdf id="addGeschichtenbalkenToPage" onclick="addGeschichtenbalkenToPage()">Balken</a> <a asdf id="addBearbeiterboxToPage" onclick="addBearbeiterboxToPage()">Bearbeiter</a> <a asdf id="addGeschichtenbalkenAndBearbeiterboxToPage" onclick="addGeschichtenbalkenAndBearbeiterboxToPage()" style="font-style: italic;">Beide</a><br><br></section>');
$('#status-aendern-link').appendTo('#organisationsbox');


$("body").append("<style>.mum-organizational {" +
"margin-right: 5px; padding-right: 5px; border-right: 1px dashed black; } .mum-organizational:last-child {" + 
"border-right: 0; }</style>" );

/* GESCHICHTENBALKEN LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Geschichtenbalken anlegen",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Geschichtenbalken/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="gbl-aendern-link" class="mum-organizational" style="cursor: pointer;">Geschichtenbalken: normal</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "<!-- INFORMATIONEN ZUR ANPASSUNG IST UNTEN\n-->{{Geschichten-Info 2013\n<!-- unter dieser Linie nichts verändern -->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name="+ wgPageNameRegexedSplit +"\n}}<noinclude>{{Geschichten-Info/Autoren-Werkzeugkasten}}[[Kategorie:Angepasste Geschichtenbalken]]</noinclude>";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Sollte alles mit 'OK' funktionieren. ###### ACHTUNG ##### geht nur in Geschichtenübersicht.", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* GESCHICHTENBALKEN KURZ LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Geschichtenbalken anlegen",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Geschichtenbalken/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="gbl-kg-aendern-link" class="mum-organizational" style="cursor: pointer;">Kurzgeschichte</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "<!-- INFORMATIONEN ZUR ANPASSUNG IST UNTEN\n-->{{Geschichten-Info 2013/Kurzgeschichte\n<!-- unter dieser Linie nichts verändern -->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name="+ wgPageNameRegexedSplit +"\n}}<noinclude>{{Geschichten-Info/Autoren-Werkzeugkasten}}[[Kategorie:Angepasste Geschichtenbalken]]</noinclude>";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Sollte alles mit 'OK' funktionieren. ###### ACHTUNG ##### geht nur in Geschichtenübersicht.", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}


/* STATUS ÄNDERN LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Status aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Status/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('<a id="status-aendern-link" class="mum-organizational" style="cursor: pointer;">Status</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = 'aktiv';
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Status der Geschichte angeben; Möglichkeiten:\naktiv, inaktiv, abgeschlossen, pause, neu", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}


/* THEMA ÄNDERN LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Thema aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Thema/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="thema-aendern-link" class="mum-organizational" style="cursor: pointer;">Thema</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "One Piece";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Thema der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* FACEBOOK LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Facebook-Link aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Facebooklinks/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fb-aendern-link" class="mum-organizational" style="cursor: pointer;">FB</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "http://facebook.com/meerundmehr";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Facebook-Fanpage-Link angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* TWITTER LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Twitter-Link aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Twitterlinks/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="tw-aendern-link" class="mum-organizational" style="cursor: pointer;">TW</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "http://twitter.com/MeerUndMehrWiki";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Twitter-Link angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* BESCHREIBUNG LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Beschreibung aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Beschreibungen/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="descr-aendern-link" class="mum-organizational" style="cursor: pointer;">Beschreibung</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "Hier die Beschreibung";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Beschreibung angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* FSK LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "FSK aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Geschichten-FSK/' + wgPageNameRegexedEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fsk-aendern-link" class="mum-organizational" style="cursor: pointer;">FSK</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("FSK der Geschichte angeben. Mögliche Eingaben:\n0, 6, 8, 12, 16, 18", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}



/* Autoren LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Autor aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Autoren/' + wgPageNameRegexedEncoded + "/Autor/1&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="autor1-aendern-link" class="mum-organizational" style="cursor: pointer;">Autor1</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Ersten Autor der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* Autoren LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Autor aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Autoren/' + wgPageNameRegexedEncoded + "/Autor/2&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fsk-aendern-link" class="mum-organizational" style="cursor: pointer;">Autor2</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Zweiten Autor der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* Autoren LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Autor aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Autoren/' + wgPageNameRegexedEncoded + "/Autor/3&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fsk-aendern-link" class="mum-organizational" style="cursor: pointer;">Autor3</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Dritten Autor der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* Kategorieen LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Kategorie aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Kategorien/' + wgPageNameRegexedEncoded + "/Kategorie/1&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fsk-aendern-link" class="mum-organizational" style="cursor: pointer;">Kategorie1</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Erste Kategorie der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* Kategorieen LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Kategorie aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Kategorien/' + wgPageNameRegexedEncoded + "/Kategorie/2&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fsk-aendern-link" class="mum-organizational" style="cursor: pointer;">Kategorie2</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Zweite Kategorie der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

/* Kategorieen LINK */
if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null) {
	(function ($, mw, window, document) {
		"use strict";
		
		var wgServer = mw.config.get("wgServer");

		// uses MW API to automatically edit the page and insert the delete template at the top
		function setDeleteNotice(deleteReason) {
			var xhr = new XMLHttpRequest(),
				summary = "Kategorie aktualisieren",
				content = deleteReason,
				editToken = mw.user.tokens.get("editToken"),
				url = wgServer + "/api.php?action=edit&title=" + 'Vorlage:Kategorien/' + wgPageNameRegexedEncoded + "/Kategorie/3&summary=" + window.encodeURIComponent(summary) + "&format=json&text=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken) +"&bot=1";
			
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
			$button = $('&nbsp;<a id="fsk-aendern-link" class="mum-organizational" style="cursor: pointer;">Kategorie3</a>');
			$button.click(function deleteNoticeButtonClickHandler() {
				var promptedDeleteReason = "FSK";
				if (typeof window.MarkForDeletion === "object" && window.MarkForDeletion !== null && typeof window.MarkForDeletion.promptedDeleteReason === "string") {
					promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
				}
				
				var deleteReason = window.prompt("Dritte Kategorie der Geschichte angeben", promptedDeleteReason);
				
				if (typeof deleteReason === "string" && deleteReason.length > 0) {
					setDeleteNotice(deleteReason);
				}
			});
			
			// add button to toolbar
$($button).appendTo('#organisationsbox');
		}
		
		// add button on DOMReady
		$(initDeleteNoticeButton);
	}(jQuery, mediaWiki, window, document));
}

// END "IF PAGE READY" FUNCTION
setTimeout(function () {
$('#autor1-aendern-link').prepend('<br />');
$('#status-aendern-link').prepend('<br />');
  }, 1000);
}
});


/* </source> */