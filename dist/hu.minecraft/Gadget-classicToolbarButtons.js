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
				'�tir�ny�t�s',
				'#REDIRECT [[',
				']]',
				'C�llap neve'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
				'�th�z�s',
				'<s>',
				'</s>',
				'Sz�veg �th�z�sa'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
				'�j sor',
				'<br>'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
				'Szuperszkript',
				'<sup>',
				'</sup>',
				'Szuperszkript sz�veg'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
				'Subszkript',
				'<sub>',
				'</sub>',
				'Subszkript sz�veg'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
				'Kicsi',
				'<small>',
				'</small>',
				'Kicsi sz�veg'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
				'Rejtett megjegyz�s beilleszt�se',
				'<!-- ',
				' -->',
				'Megjegyz�s'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
				'K�pgal�ria beilleszt�se',
				'\n<gallery>\n',
				'\n</gallery>',
				'F�jl:P�lda.jpg|Felirat1\nFile:P�lda.jpg|Felirat2'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
				'Id�zett sz�vegblokk beilleszt�se',
				'<blockquote>\n',
				'\n</blockquote>',
				'Id�zett sz�vegblokk'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
				'T�bl�zat beilleszt�se',
				'{| class="wikitable"\n|',
				'\n|}',
				'-\n! fejl�c 1\n! fejl�c 2\n! fejl�c 3\n|-\n| sor 1, n�gyzet 1\n| sor 1, n�gyzet 2\n| sor 1, n�gyzet 3\n|-\n| sor 2, n�gyzet 1\n| sor 2, n�gyzet 2\n| sor 2, n�gyzet 3'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
				'Hivatkoz�s billeszt�se',
				'<ref>',
				'</ref>',
				'L�bjegyzet beilleszt�se ide'
			]
		], function() {
			mw.toolbar.addButton.apply( null, this );
		} );
	} );
}