// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

if (
	mw.user.options.get( 'showtoolbar' ) &&
	!mw.user.options.get( 'usebetatoolbar' ) &&
	$.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) > -1
) {
	mw.loader.using( 'mediawiki.toolbar', function() {
		$.each( [
			[
				'//upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png',
				'Átirányítás',
				'#REDIRECT [[',
				']]',
				'Céllap neve'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
				'Áthúzás',
				'<s>',
				'</s>',
				'Szöveg áthúzása'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
				'Új sor',
				'<br>'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
				'Szuperszkript',
				'<sup>',
				'</sup>',
				'Szuperszkript szöveg'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
				'Subszkript',
				'<sub>',
				'</sub>',
				'Subszkript szöveg'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
				'Kicsi',
				'<small>',
				'</small>',
				'Kicsi szöveg'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
				'Rejtett megjegyzés beillesztése',
				'<!-- ',
				' -->',
				'Megjegyzés'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
				'Képgaléria beillesztése',
				'\n<gallery>\n',
				'\n</gallery>',
				'Fájl:Példa.jpg|Felirat1\nFile:Példa.jpg|Felirat2'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
				'Idézett szövegblokk beillesztése',
				'<blockquote>\n',
				'\n</blockquote>',
				'Idézett szövegblokk'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
				'Táblázat beillesztése',
				'{| class="wikitable"\n|',
				'\n|}',
				'-\n! fejléc 1\n! fejléc 2\n! fejléc 3\n|-\n| sor 1, négyzet 1\n| sor 1, négyzet 2\n| sor 1, négyzet 3\n|-\n| sor 2, négyzet 1\n| sor 2, négyzet 2\n| sor 2, négyzet 3'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
				'Hivatkozás billesztése',
				'<ref>',
				'</ref>',
				'Lábjegyzet beillesztése ide'
			]
		], function() {
			mw.toolbar.addButton.apply( null, this );
		} );
	} );
}