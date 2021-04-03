( function() {

if (
	!mw.user.options.get( 'showtoolbar' ) ||
	mw.user.options.get( 'usebetatoolbar' ) ||
	$.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) === -1
) {
	return;
}

mw.loader.using( 'mediawiki.toolbar', function() {
	$.each( [
		[
			'//upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png',
			'Doorverwijzing',
			'#REDIRECT [[',
			']]',
			'Doelpagina'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
			'Doorstrepen',
			'<s>',
			'</s>',
			'Doorgestreepte tekst'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
			'Regel afbreken',
			'<br>'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
			'Superscript',
			'<sup>',
			'</sup>',
			'Superscripttekst'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
			'Subscript',
			'<sub>',
			'</sub>',
			'Subscripttekst'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
			'Kleine tekst',
			'<small>',
			'</small>',
			'Kleine tekst'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
			'Commentaar invoegen',
			'<!-- ',
			' -->',
			'Commentaar'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
			'Galerij invoegen',
			'\n<gallery>\n',
			'\n</gallery>',
			'Bestand:Voorbeeld.jpg|Bijschrift1\nBestand:Voorbeeld.jpg|Bijschrift2'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
			'Quoteblok invoegen',
			'<blockquote>\n',
			'\n</blockquote>',
			'Quoteblok'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
			'Tabel invoegen',
			'{| class="wikitable"\n|',
			'\n|}',
			'-\n! hoofd 1\n! hoofd 2\n! hoofd 3\n|-\n| rij 1, cel 1\n| rij 1, cel 2\n| rij 1, cel 3\n|-\n| rij 2, cel 1\n| rij 2, cel 2\n| rij 2, cel 3'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
			'Referentie invoegen',
			'<ref>',
			'</ref>',
			'Referentietekst'
		]
	], function() {
		mw.toolbar.addButton.apply( null, this );
	} );
} );


} )();