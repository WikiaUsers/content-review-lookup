( function ( $, mw ) {
	'use strict';

	var prefix = `/*
Этот скрипт формируется из содержимого страницы [[Википедия:AutoWikiBrowser/Typos]].
Для обновления cкопируйте текст из поля по ссылке:
https://ru.wikipedia.org/?title=Project:AutoWikiBrowser/Typos&action=edit&withJs=Gadget-wfTypos/update.js
*/

window.wfPlugins = window.wfPlugins || [];
window.wfPlugins.push(function(txt,r){`;
	var postfix = '});';

	var typosToJs = function() {
		var wpTextbox1 = document.editform.wpTextbox1,
			txt = wpTextbox1.value;

		function r ( r1, r2 ) {
			txt = txt.replace( r1, r2 );
		}

		// Clear
		r( /^(.|\n)+?<source lang="xml">/, '' );
		// r( /<\/source>(?!(.|\n)+<\/source>)(.|\n)+?$/, '' ); // for all replaces
		r( /\n=+\s*Сокращения(.|\n)+?$/, '' );

		r( /<source lang="xml">/g, '' );
		r( /<\/source>/g, '' );
		r( /<pre>(.|\n)*?<\/pre>/g, '' );
		r( /^=+.*=+$/gm, '' );

		r( /^<Typo word=".+?" find="/gm, '' );
		r( /" replace="/g, '\x01' );
		r( /" \/>\s*?<!--.*?-->/g, '' );
		r( /" \/>\s*?/g, '' );
		r( /^\s*<!--.*?-->\s*$/gm, '' );

		// \b conversion
		r( /^\\b(\(\?!.+\))?\((.)\|(.)\)([*+?])/gm, '((?:^|\\s)$1[$2$3]$4)' );
		r( /^\\b(\(\?!.+\))?\((.)\|(.)\)/gm, '((?:^|\\s)$1[$2$3])' );
		r( /^\\b(\(\?!.+\))?\(\[(.+)\]\)([*+?])/gm, '((?:^|\\s)$1[$2]$3)' );
		r( /^\\b(\(\?!.+\))?\(\[(.+)\]\)/gm, '((?:^|\\s)$1[$2])' );
		r( /^\\b(\(\?!.+\))?\((?!\?!)(.+?)\|(.+?)\)([*+?])/gm, '((?:^|\\s)$1(?:$2|$3)$4)' );
		r( /^\\b(\(\?!.+\))?\((?!\?!)(.+?)\|(.+?)\)/gm, '((?:^|\\s)$1(?:$2|$3))' );

		// clear all that we can't emulate
		r( /^(.*\\b\(*([A-ZА-ЯЁa-zа-яё]|\\w).*)$/gm, '' );
		r( /^.*\(\?<!.*$/gm, '' );
		r( /^\\b.*$/gm, '' );

		r( /\)\?\\b\(\?!\\u0301\)\x01/gm, '|)(?=[^A-ZА-ЯЁa-zа-яё\u0301]|$)\x01' );
		r( /\\b\(\?!\\u0301\)(.*\x01)/gm, '(?=[^A-ZА-ЯЁa-zа-яё\u0301]|$)$1' );
		r( /\\b\(\?!\\u0301\)(.*\x01)/gm, '(?=[^A-ZА-ЯЁa-zа-яё\u0301]|$)$1' );

		// Wrap into function r()
		r( /\\w/g, '[А-ЯЁа-яё]' );
		r( /^(.+)/gm, 'r( /$1' );
		r( /\x01/g, '/g, \'' );
		r( /(.+)$/gm, '$1\' );' );

		// Empty lines
		r( /\n+/g, '\n' );
		r( /^[\n\r]+/, '' );

		wpTextbox1.value = prefix + '\n\n' + txt + '\n' + postfix;
	};

	$( document ).ready( typosToJs );

}( jQuery, mediaWiki ) );