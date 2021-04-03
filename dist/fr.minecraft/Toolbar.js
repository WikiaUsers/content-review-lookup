( function() {


/** 
 * Extra classic toolbar options
 *
 * Adds extra buttons to the classic editing toolbar.
 */
var buttons = [
	[
		'//upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png',
		'Redirection',
		'#REDIRECTION [[',
		']]',
		'Nom de la page'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
		'Barrer',
		'<s>',
		'</s>',
		'Texte barré'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
		'Saut de ligne',
		'<br>',
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
		'Exposant',
		'<sup>',
		'</sup>',
		'Texte en exposant'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
		'Indice',
		'<sub>',
		'</sub>',
		'Texte en indice'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
		'Petit',
		'<small>',
		'</small>',
		'Texte en petit'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
		'Insérer un commentaire caché',
		'<!-- ',
		' -->',
		'Commentaire'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
		"Insérer une galerie d'images",
		'\n<gallery>\n',
		'\n</gallery>',
		'Fichier:Exemple.png|Légende1\nFichier:Exemple.png|Légende2'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
		'Insérer une citation',
		'<blockquote>\n',
		'\n</blockquote>',
		'Bloc de texte'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
		'Insérer un tableau',
		'{| class="wikitable"\n|',
		'\n|}',
		'-\n! entête 1\n! entête 2\n! entête 3\n|-\n| ligne 1, cellule 1\n| ligne 1, cellule 2\n| ligne 1, cellule 3\n|-\n| ligne 2, cellule 1\n| ligne 2, cellule 2\n| ligne 2, cellule 3'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
		'Insérer une référence',
		'<ref>',
		'</ref>',
		'Insérer le texte en bas de page ici'
	]
];
$.each( buttons, function() { mw.toolbar.addButton.apply( null, this ); } );


} )();