// <nowiki>

function addWordSection() {
	// Nowy toolbar z nowymi sekcjami językowymi
	jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'sections': {
			'addword': {
				'type': 'toolbar',
				'label': 'Nowa sekcja'
			}
		}
	} );

	//----------------
	// Sekcja 'inne'
	jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'addword',
		'groups': {
			'other': {
				'label': '<a href="//pl.pastwa.wikia.com/wiki/Wiki:Zasady_tworzenia_hase%C5%82" target="_blank">Zasady</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nowe hasło:',
				'tools': {
					'misc': {
						label: 'Nowe hasło',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nuvola_action_edit_add.svg/22px-Nuvola_action_edit_add.svg.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język ",
								peri: "jaki",
								post: "}}) ==\n{{wymowa}}\n{{znaczenia}}\n''rzeczownik, rodzaj żeński, męski''\n: (1.1) [[krótki|krótka]] [[definicja]]\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]].\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologia}}\n{{uwagi}}\n{{tłumaczenia}}\n* angielski: (1.1) [[ ]]\n{{źródła}}"
							}
						}
					}
				}
			}
		}
	} );

	//----------------
	// Sekcja 'polski'
	jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'addword',
		'groups': {
			'pl': {
				'label': 'Polski',
				'tools': {
					'rzeczownik': {
						label: 'Nowe hasło (rzeczownik, język polski)',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Newfont-R.png/22px-Newfont-R.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język polski}}) ==\n{{wymowa}}\n{{znaczenia}}\n''rzeczownik, rodzaj żeński, męski''\n: (1.1) ",
								peri: "[[krótki|krótka]] [[definicja]]",
								post: "\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].''\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologia}}\n{{uwagi}}\n{{tłumaczenia}}\n* angielski: (1.1) [[ ]]\n{{źródła}}"
							}
						}
					},
					'przymiotnik': {
						label: 'Nowe hasło (przymiotnik, język polski)',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Newfont-P.png/22px-Newfont-P.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język polski}}) ==\n{{wymowa}}\n{{znaczenia}}\n''przymiotnik''\n: (1.1) ",
								peri: "[[krótki|krótka]] [[definicja]]",
								post: "\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].''\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologija}}\n{{uwagi}}\n{{tłumaczenia}}\n* angielski: (1.1) [[ ]]\n{{źródła}}"
							}
						}
					},
					'czasownik': {
						label: 'Nowe hasło (czasownik, język polski)',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Newfont-C.png/22px-Newfont-C.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język polski}}) ==\n{{wymowa}}\n{{znaczenia}}\n''czasownik''\n: (1.1) ",
								peri: "[[krótki|krótka]] [[definicja]]",
								post: "\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].''\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologia}}\n{{uwagi}}\n{{tłumaczenia}}\n* angielski: (1.1) [[ ]]\n{{źródła}}"
							}
						}
					}
				}

			}
		}
	} );

	// -----------------
	// Sekcja 'angielski'
	jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'addword',
		'groups': {
			'en': {
				'label': 'Angielski',
				'tools': {
					'rzeczownik': {
						label: 'Nowe hasło (rzeczownik, język angielski)',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Newfont-R.png/22px-Newfont-R.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język angielski}}) ==\n{{wymowa}}\n{{znaczenia}}\n''rzeczownik''\n: (1.1) ",
								peri: "[[krótki|krótka]] [[definicja]]",
								post: "\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]].\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologia}}\n{{uwagi}}\n{{źródła}}"
							}
						}
					},
					'przymiotnik': {
						label: 'Nowe hasło (przymiotnik, język angielski)',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Newfont-P.png/22px-Newfont-P.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język angielski}}) ==\n{{wymowa}}\n{{znaczenia}}\n''przymiotnik''\n: (1.1) ",
								peri: "[[krótki|krótka]] [[definicja]]",
								post: "\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]].\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologia}}\n{{uwagi}}\n{{źródła}}"
							}
						}
					},
					'czasownik': {
						label: 'Nowe hasło (czasownik, język angielski)',
						type: 'button',
						icon: '//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Newfont-C.png/22px-Newfont-C.png',
						action: {
							type: 'encapsulate',
							options: {
								pre: "== " + wgTitle + " ({{język angielski}}) ==\n{{wymowa}}\n{{znaczenia}}\n''czasownik''\n: (1.1) ",
								peri: "[[krótki|krótka]] [[definicja]]",
								post: "\n{{odmiana}}\n{{przykłady}}\n: (1.1) ''[[przykład|Przykład]] [[zdanie|zdania]].'' → [[tłumaczenie|Tłumaczenie]] [[zdanie|zdania]].\n{{składnia}}\n{{kolokacje}}\n{{synonimy}}\n{{antonimy}}\n{{pokrewne}}\n{{frazeologia}}\n{{etymologia}}\n{{uwagi}}\n{{źródła}}"
							}
						}
					}
				}

			}
		}
	} );
}

if ( mw.user.options.get( 'usebetatoolbar' ) === 1 ) {
	mw.loader.using( "ext.wikiEditor.toolbar", function() {
		jQuery( document ).ready( function() {
			addWordSection();
		} );
	} );
}

/* Otwórz nowym użytkownikom z defaultu "Nowa sekcja językowa". Autor: [[user:Olaf]] */
if ( jQuery.cookie( 'addword-gadget-toolbar-section-set' ) == null && jQuery.cookie( 'wikiEditor-0-toolbar-section' ) == null ) {
	jQuery.cookie( 'wikiEditor-0-toolbar-section', 'addword', {
		expires: 30,
		path: '/'
	} );

	jQuery.cookie( 'addword-gadget-toolbar-section-set', 'true', {
		expires: 30,
		path: '/'
	} );
}
// </nowiki>