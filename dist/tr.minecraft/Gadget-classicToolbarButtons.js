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
			'Redirect',
			'#REDIRECT [[',
			']]',
			'Target page name'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
			'Strike',
			'<s>',
			'</s>',
			'Strike-through text'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
			'Line break',
			'<br>'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
			'Superscript',
			'<sup>',
			'</sup>',
			'Superscript text'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
			'Subscript',
			'<sub>',
			'</sub>',
			'Subscript text'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
			'Small',
			'<small>',
			'</small>',
			'Small text'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
			'Insert hidden Comment',
			'<!-- ',
			' -->',
			'Comment'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
			'Insert a picture gallery',
			'\n<gallery>\n',
			'\n</gallery>',
			'File:Example.jpg|Caption1\nFile:Example.jpg|Caption2'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
			'Insert block of quoted text',
			'<blockquote>\n',
			'\n</blockquote>',
			'Block quote'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
			'Insert a table',
			'{| class="wikitable"\n|',
			'\n|}',
			'-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3'
		],
		[
			'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
			'Insert a reference',
			'<ref>',
			'</ref>',
			'Insert footnote text here'
		]
	], function() {
		mw.toolbar.addButton.apply( null, this );
	} );
} );


} )();