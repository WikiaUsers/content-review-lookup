// --------------------------------------------------------
// Contains citation templates to be added to the toolbar. 
// Source: [http://mediawiki.org/wiki/Manual:Custom_edit_buttons MediaWiki.org]
// Credit to [[User:RAP|RAP]] for the images.
// --------------------------------------------------------

mw.hook('wikiEditor.toolbarReady').add(function($textArea) {

	if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
		customizeWikiEditor();
	}
	
	// Citations of websites require the retrieval date
	var time = new Date(),
	    curday = time.getDate(),
	    month = [ "January",
	              "February",
	              "March",
	              "April",
	              "May",
	              "June",
	              "July",
	              "August",
	              "September",
	              "October",
	              "November",
	              "December" ],
	    curmonth = month[time.getMonth()],
	    nowyear = time.getYear()+1900,
	    nowday = curday.toString(),
	    nowmonth = curmonth.toString();
	
	function customizeWikiEditor() {
		// By some black magic MediaWiki reads these template strings as actual transclusions
		// So we have this as a workaround so that this page doesn't end up in [[:Category:Articles Using Invalid Arguments in Template Calls]] 
		var openRef = "<ref>{{";
		var closeRef = "}}</ref>";
		
		$textArea.wikiEditor( 'addToToolbar', {
			section: 'main',
			groups: {
				references: {
					label: 'References'
				}
			}
		} );
		
		$textArea.wikiEditor( 'addToToolbar', {
			'section': 'main',
			'group': 'references',
			'tools': {
				'Cite': {
					label: 'Regular Citation',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/2/20/Button_cite_template.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite|',
							'peri': '(quote)',
							'post': '|(person)|(game)'+closeRef
						}
					}
				},
				'Cite Person': {
					label: 'Cite Person',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/5/53/Button_cite_person.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Person|quote= ',
							'peri': '',
							'post': '|name= |url= |title= '+closeRef
						}
					}
				},
				'Cite Book': {
					label: 'Cite Book',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Book|quote= ',
							'peri': '',
							'post': '|book= |publisher= |page= '+closeRef
						}
					}
				},
				'Cite Guide': {
					label: 'Cite Guide',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Guide|quote= ',
							'peri': '',
							'post': '|game= |guide= |page= '+closeRef
						}
					}
				},
				'Cite Magazine': {
					label: 'Cite Magazine',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Magazine|quote= ',
							'peri': '',
							'post': '|magazine= |publisher= |volume= |issue= |date= |page= |url= '+closeRef
						}
					}
				},
				'Cite Manual': {
					label: 'Cite Manual',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/5/5d/Button_cite_manual.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Manual|quote= ',
							'peri': '',
							'post': '|game= |page= '+closeRef
						}
					}
				},
				'Cite Episode': {
					label: 'Cite Episode',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/1/1c/Button_cite_episode.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Episode|quote= ',
							'peri': '',
							'post': '|name= |show= |episode= |time= '+closeRef
						}
					}
				},
				'Cite Web': {
					label: 'Cite Web',
					type: 'button',
					icon: 'https://zelda.fandom.com/media/zelda.gamepedia.com/9/91/Button_cite_web.png',
					'action': {
						'type': 'encapsulate',
						'options': {
							'pre': openRef+'Cite Web|quote= ',
							'peri': '',
							'post': '|author= |published= |retrieved= ' + nowmonth + ' ' + nowday + ', ' + nowyear + '|url= |title= |site= |type= '+closeRef
						}
					}
				}
			}
		} );
	}
});