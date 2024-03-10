// Page protection indicators
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

var l10n = (function(){
	var $text = {
		'doclink': {
			'en': 'Project:Protected pages',
			'fr': 'Projet:Pages protégées',
			'pt-br': 'Project:Protected pages',
			'ru': 'Project:Защита страниц',
		},
		'edited-by-new-users-ip': {
			'en': 'This page is protected from being edited by unregistered or new users.',
			'fr': 'Cette page est protégée et ne peut pas être modifiée par des nouveaux utilisateurs ou des non-enregistrés.',
			'pt-br': 'Esta página está protegida contra edição por novos usuários não registrados.',
			'ru': 'Эта страница защищена от правок незарегистрированными или новыми участниками.',
		},
		'edited-by-users': {
			'en': 'This page is fully protected from being edited by regular users.',
			'fr': 'Cette page est entièrement protégée et ne peut pas être modifiée par des utilisateurs réguliers.',
			'pt-br': 'Esta página está totalmente protegida contra edição por usuários regulares.',
			'ru': 'Эта страница полностью защищена от правок обычными участниками.',
		},
		'moved-by-users': {
			'en': 'This page is fully protected from being moved by regular users.',
			'fr': 'Cette page est entièrement protégée et ne peut pas être déplacée par des utilisateurs réguliers',
			'pt-br': 'Esta página está totalmente protegida de ser movida por usuários regulares.',
			'ru': 'Эта страница полностью защищена от переименования обычными участниками.',
		}
	}
	var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key){
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	}
})();

function getImageURL(name, store, size) {
	var encodedName = mw.util.wikiUrlencode(name);
	return "https://images.wikia.com/terraria_gamepedia/images/"
		+ store
		+ "/"
		+ encodedName;
}

function mimicIndicator(id, link, imgName, imgStore, title) {
	var encodedLink = mw.util.getUrl(link);
	return $("<div>")
		.attr("id", "mw-indicator-" + id)
		.addClass("mw-indicator")
		.addClass("mw-indicator-protection-lock")
		.append($("<a>")
			.attr({
				"href": encodedLink,
				"title": title,
				"class": "image"
			}).append($("<img>")
				.attr({
				"alt": title,
				"src": getImageURL(imgName, imgStore, 29),
				"width": "25",
				"height": "25"
				})
			)
		);
}

$(function() {
	var protectionLevelData = mw.config.get("wgRestrictionEdit");
	var moveProtectionLevelData = mw.config.get("wgRestrictionMove");
	
	if (protectionLevelData === null) {
		// Null on nonexistent or special pages. Avoids a crash there.
		return;
	}
	if (mw.config.get("wgAction") !== "view") {
		// No need to display the indicator when viewing history or editing the page
		return;
	}
	if (mw.config.get("wgIsMainPage")) {
		// The indicator lock breaks formatting on the main page due to the level 1 header being hidden
		return;
	}
	
	var protectionLevel = protectionLevelData[0];
	if (protectionLevel === "autoconfirmed") {
		mimicIndicator(
			"protection-semi",
			l10n('doclink'),
			"Silver Lock.png",
			"7/78",
			l10n('edited-by-new-users-ip')
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			l10n('doclink'),
			"Gold Lock.png",
			"5/55",
			l10n('edited-by-users')
		).appendTo($(".mw-indicators"));
	}
	
	if (moveProtectionLevelData[0] === "sysop") {
		mimicIndicator(
			"protection-move",
			l10n('doclink'),
			"Green Lock.png",
			"a/ab",
			l10n('moved-by-users')
		).appendTo($(".mw-indicators"));
	}
});