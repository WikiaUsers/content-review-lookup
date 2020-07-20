//<syntaxhighlight lang="javascript">
/*
 * Script: RecentChangesMultiple
 * Author: Fewfre
 *
 * Uses ajax loading of atom feeds to show the RecentChanges of multiple wikis all on one page.
 *
 * TERTIARY / OTHER / MAYBE?
 *Use "WikiaRss.js" instead of YQL?
 *Display wikis as they are loaded? (semi pain to do, but cool?)
 * * if not: Add option to show all currently loaded wikis when not all wikis can be loaded.
 *Add support for "rollback" if possible to create the uniq id for it
 */

(function($, document, mw){
	"use strict";
	
	//######################################
	// Pre-script checks
	//######################################
	var module = (window.dev = window.dev || {}).RecentChangesMultiple = window.dev.RecentChangesMultiple || {};
	
	// Don't create/run this code twice on the same page
	if(module.loaded) { console.log("Script already loaded; exiting."); return; }
	// Find rcm container, and exit if not found (needed for everything else)
	if(document.querySelector('#rc-content-multiple,.rc-content-multiple') == undefined) { console.log('No "Recent Changes Multiple" container found; exiting.'); return; }
	// Mark script as loaded
	module.loaded = true;
	
	// BACKUP for mobile / Mercury skin - only meant to prevent script from crashing
	mw = mw || {
		config: {
			get: function(pStr){
				return {
					"wgUserName":"_",
					"wgMonthNames":Object.freeze([null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]),
					"wgUserLanguage":"en",
				}[pStr];
			}
		}
	};
	
	//######################################
	// Constants
	//######################################
	module.version = "0.0.0";
	var i18n = {
		TEXT: {
			en: { // ENGLISH
				footer : "Version {0} by {1}",
			},
			pl: { // Polski (POLISH) - @author: Szynka013, Matik7
				footer : "Wersja {0} stworzona przez {1}",
			},
		},
	}
	
	// Namespaces
	var gApp, gUtils;
	
	module.refresh = function() {} // Encase it needs to be accessed outside the script for some reason.
	
	//######################################
	// Initialization
	//######################################
	gApp = {
		// HTML Elements/Nodes
		resultCont: null, // {HTMLElement}
		footerNode: null, // {HTMLElement}
		
		// Data about the info supplied for the script to use.
		timezone: null, // {string}
		
		init: function() {
			gApp.resultCont = document.querySelector('#rc-content-multiple,.rc-content-multiple');
			
			gApp.defaultLang = gApp.resultCont.dataset.lang ? gApp.resultCont.dataset.lang.toLowerCase() : mw.config.get('wgUserLanguage');
			i18n.TEXT = $.extend(i18n.TEXT.en, i18n.TEXT[gApp.defaultLang]);
			
			gApp.resultCont.innerHTML = "";
			gApp._showUpdateMessage();
			gApp.footerNode = gUtils.newElement("div", { className:"rcm-footer" }, gApp.resultCont);
			
			gUtils.newElement("link", { rel:"stylesheet", type:"text/css", href:"/load.php?mode=articles&articles=u:dev:Mediawiki:RecentChangesMultiple.css&only=styles" }, document.head);
			
			gApp.footerNode.innerHTML = "[<a href='http://dev.wikia.com/wiki/RecentChangesMultiple'>RecentChangesMultiple</a>] " + gUtils.formatString(i18n.TEXT.footer, module.version, "<a href='http://fewfre.wikia.com/wiki/Fewfre_Wiki'>Fewfre</a>");
		},
		
		_showUpdateMessage: function() {
			var tMessage = gUtils.newElement("div", { className:"rcm-update-message", innerHTML:""
				+"RecentChangesMultiple has gone through a major rewrite."
				+" See changes <a href='http://dev.wikia.com/wiki/RecentChangesMultiple#26_July_2015_-_MediaWiki_API_rewrite_-_V1.1.0'>here</a>."
				+"<br />To use the updated version, modify your JS import to use code.2.js."
				+"<br />All Wikia wikis should work with update, although other wikis may require the use of '&scriptdir'."
				+"<br />This version (code.js) of the script no longer works at all due to YQL support being dropped."
			}, gApp.resultCont);
			tMessage.style.cssText = "border:5px double red; padding:2px 6px;";
		},
	};
	
	//######################################
	// General Helper Methods
	//######################################
	var gUtils = {
		// http://stackoverflow.com/a/4673436/1411473
		formatString: function(format) {
			var args = Array.prototype.slice.call(arguments, 1);
			return format.replace(/{(\d+)}/g, function(match, number) { 
				return typeof args[number] != 'undefined'
					? args[number] 
					: match
				;
			});
		},
		
		// Creates a new HTML element (not jQuery) with specific attributes
		newElement: function(tag, attributes, parent) {
			var element = document.createElement(tag);
			if(attributes != undefined) {
				for(var key in attributes)
					element[key] = attributes[key];
			}
			if(parent != undefined) parent.appendChild(element);
			return element;
		},
	};
	
	$(document).ready(gApp.init);
})(jQuery, document, window.mediaWiki);
//</syntaxhighlight>