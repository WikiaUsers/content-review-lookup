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
				'Rinvio',
				'#RINVIA [[',
				']]',
				'Nome pagina bersaglio'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
				'Barrato',
				'<s>',
				'</s>',
				'Testo barrato'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
				'Interruzione linea',
				'<br>'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
				'Apice',
				'<sup>',
				'</sup>',
				'Testo apice'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
				'Pedice',
				'<sub>',
				'</sub>',
				'Tasto pedice'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
				'Piccolo',
				'<small>',
				'</small>',
				'Testo piccolo'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
				'Inserisci commento nascosto',
				'<!-- ',
				' -->',
				'Commento'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
				'Inserisci una galleria di immagini',
				'\n<gallery>\n',
				'\n</gallery>',
				'File:Example.jpg|Didascalia1\nFile:Example.jpg|Didascalia2'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
				'Inserisci blocco di testo quotato',
				'<blockquote>\n',
				'\n</blockquote>',
				'Blocco quotato'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
				'Inserisci una tabella',
				'{| class="wikitable"\n|',
				'\n|}',
				'-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
				'Inserisci un collegamento',
				'<ref>',
				'</ref>',
				'Inserisci una nota a piè di pagina qui'
			]
		], function() {
			mw.toolbar.addButton.apply( null, this );
		} );
	} );
}