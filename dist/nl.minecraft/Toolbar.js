( function() {


/** 
 * Extra classic toolbar options
 *
 * Adds extra buttons to the classic editing toolbar.
 */
var buttons = [
	[
		'//upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png',
		'Doorverwijzing',
		'#REDIRECT [[',
		']]',
		'Doelpagina'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
		'Streep',
		'<s>',
		'</s>',
		'Doorgestreepte tekst'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
		'Regel breken',
		'</br>'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
		'Superscript',
		'<sup>',
		'</sup>',
		'Tekst in superscript'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
		'Subscript',
		'<sub>',
		'</sub>',
		'Tekst in subscript'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
		'Klein',
		'<small>',
		'</small>',
		'Kleine tekst'
	],
    [
        '//commons.wikimedia.org/wiki/File:Button_big.png',
        'Groot',
        '<big>',
        '</big>',
        'Grote tekst'
    ],
	[
		'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
		'Voeg verborgen reactie toe',
		'<!-- ',
		' -->',
		'Reactie'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
		'Galerij toevoegen',
		'\n<gallery>\n',
		'\n</gallery>',
		'Bestand:Voorbeeld1.jpg|Bijschirft1\nBestand:Voorbeeld2.jpg|Bijschrift2'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
		'Een quote toevoegen',
		'<blockquote>\n',
		'\n</blockquote>',
		'Quote'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
		'Tabel toevoegen',
		'{| class="wikitable"\n|',
		'\n|}',
		'-\n! kop 1\n! kop 2\n! kop 3\n|-\n| rij 1, cel 1\n| rij 1, cel 2\n| rij 1, cel 3\n|-\n| rij 2, cel 1\n| rij 2, cel 2\n| rij 2, cel 3'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
		'Referentie toevoegen',
		'<ref>',
		'</ref>',
		'Voeg een referentie toe'
	],
    [
        '//upload.wikimedia.org/wikipedia/commons/2/23/Button_code.png',
        'Computercode toevoegen',
        '<code>',
        '</code>',
        'Voeg tekst in computercode toe'
    ],
    [
        '//upload.wikimedia.org/wikipedia/commons/7/73/Button_code_nowiki.png',
        'Geen Wikiopmaak en computercode toevoegen',
        '<code><nowiki>',
        '</nowiki></code>',
        'Voeg tekst zonder Wikiopmaak en in computercode toe'
    ]
];
$.each( buttons, function() { mw.toolbar.addButton.apply( null, this ); } );


} )();