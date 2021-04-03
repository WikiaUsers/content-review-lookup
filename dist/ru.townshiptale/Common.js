/* Any JavaScript here will be loaded for all users on every page load.                      */
( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// Collapsible elements and page loader
	hideText: 'скрыть',
	showText: 'показать',
	
	// Page loader
	loadErrorTitle: 'Возникла ошибка при загрузке содержимого',
	
	// File upload
	defaultLicense: 'Лицензия'
};

/**
 * Instead of cluttering up the global scope with
 * variables, they should instead be set as a
 * property of this global variable
 *
 * E.g: Instead of
 *   myVar = 'blah';
 * use
 *   mcw.myVar = 'blah';
 */
var mcw = window.mcw = {};

/* Добавляет Викификатор */
if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	mw.loader.load('https://minecraft-ru.gamepedia.com/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
}

/* Скрывает вкладки "Править вики-текст", "Просмотреть вики-текст", "Править" если им не хватает места в навигации */
$("li[id*='ca-watch']").addClass('collapsible');
$("li[id*='ca-unwatch']").addClass('collapsible');
$("li[id*='ca-edit']").addClass('collapsible');
$("li[id*='ca-view']").addClass('collapsible');
$("li[id*='ca-ve-edit']").addClass('collapsible');
$("li[id*='ca-viewsource']").addClass('collapsible');

/* End DOM ready */

}() );