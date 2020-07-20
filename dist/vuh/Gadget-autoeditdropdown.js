/* <source lang="javascript"> */
 
/*!
 * AutoEditDropdown by Mathmagician, using CSS suggested by Pecoes
 * Causes edit dropdown menus to automatically display upon mouseover
 * 
 * http://dev.wikia.com/wiki/AutoEditDropdown/code.js
 * 
 * CC-BY-SA 3.0
 */
/*jshint strict:true, undef:true, curly:true, browser:true, jquery:true */
(function ($, config, undefined) {
	"use strict";
	var selectors;
 
	// init config object if it doesn't exist
	if (typeof config !== "object" || config === null) {
		config = {};
	}
 
	// set up CSS selectors based on user's configuration
	if (config.expandedAreaContribute) {
		if (config.expandedAreaEdit) {
			selectors = '#WikiHeader nav.wikia-menu-button:hover ul,#WikiaMainContent nav.wikia-menu-button:hover ul';
		} else {
			selectors = '#WikiHeader nav.wikia-menu-button:hover ul,#WikiaMainContent nav.wikia-menu-button .drop:hover ~ ul,#WikiaMainContent nav.wikia-menu-button ul.WikiaMenuElement:hover';
		}
	} else {
		if (config.expandedAreaEdit) {
			selectors = '#WikiHeader nav.wikia-menu-button .drop:hover ~ ul,#WikiHeader nav.wikia-menu-button ul.WikiaMenuElement:hover,#WikiaMainContent nav.wikia-menu-button:hover ul';
		} else {
			selectors = '#WikiHeader nav.wikia-menu-button .drop:hover ~ ul,#WikiHeader nav.wikia-menu-button ul.WikiaMenuElement:hover,#WikiaMainContent nav.wikia-menu-button .drop:hover ~ ul,#WikiaMainContent nav.wikia-menu-button ul.WikiaMenuElement:hover';
		}
	}
 
	// remove AutoEditDropdown style tag if previously existed, insert AutoEditDropdown style tag
	var style = '<style id="AutoEditDropdown-style">' + selectors + '{min-width:100%;display:block;}</style>';
	$('#AutoEditDropdown-style').remove();
	$(document.head).append(style);
}(jQuery, window.AutoEditDropdownConfig));
 
/* </source> */