// --------------------------------------------------------
// Contains citation templates to be added to the toolbar. 
// Source: [http://mediawiki.org/wiki/Manual:Custom_edit_buttons MediaWiki.org]
// Credit to [[User:RAP|RAP]] for the images.
// --------------------------------------------------------

// Variables
var action = mw.config.get("wgAction");

// We begin by getting the date for use in certain citations.
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

// Now we make the function itself
var customizeClassicToolbar = function(){
	
	// By some black magic MediaWiki reads these template strings as actual transclusions
	// So we have this as a workaround so that this page doesn't end up in [[:Category:Articles Using Invalid Arguments in Template Calls]] 
	var openRef = "<ref>{{"
	var closeRef = "}}</ref>"
	
	// Start with web cite
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/9/91/Button_cite_web.png',
		speedTip: 'Web Citation',
		tagOpen: openRef+'Cite Web|quote= ',
		tagClose: '|author= |published= |retrieved=" + nowmonth + " " + nowday + ", " + nowyear + "|url= |title= |site= |type='+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
	// Cite Book
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
		speedTip: 'Cite Book',
		tagOpen: openRef+'Cite Book|type= |quote= ',
		tagClose: '|book= |publisher= |page= '+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
	// Cite Guide
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
		speedTip: 'Cite Guide',
		tagOpen: openRef+'Cite Guide|quote= ',
		tagClose: '|game= |publisher= |page= |edition= |year= '+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
	// Cite Person
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/5/53/Button_cite_person.png',
		speedTip: 'Cite Person',
		tagOpen: openRef+'Cite Person|quote= ',
		tagClose: '|name= |url= |title= '+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
	// Cite Episode
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/1/1c/Button_cite_episode.png',
		speedTip: 'Cite Episode',
		tagOpen: openRef+'Cite Episode|quote= ',
		tagClose: '|name= |show= |episode= |time= '+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
	// Cite Manual
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/5/5d/Button_cite_manual.png',
		speedTip: 'Cite Manual',
		tagOpen: openRef+'Cite Manual|quote= ',
		tagClose: '|game= |page= '+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
	// Regular cite template
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.fandom.com/media/zelda.gamepedia.com/2/20/Button_cite_template.png',
		speedTip: 'Regular citation',
		tagOpen: openRef+'Cite|(Quote)',
		tagClose: '|(Person)|(Game)'+closeRef,
		sampleText: '',
		imageId: ''
	} );
	
};

var customizeWikiEditor = function () {
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'main',
		'group': 'insert',
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
						'post': '|game= |publisher= |page= '+closeRef
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
				label: 'Web Citation',
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
};
 
if( $.inArray(action, ['edit', 'submit']) !== -1 ) {
	// mw.loader.using( 'user.options', function () {
		// if ( !mw.user.options.get('usebetatoolbar') ) {
			// mw.loader.using( 'mediawiki.action.edit', function() {
				// $( customizeClassicToolbar );
			// });
		// } else {
			$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-doneInitialSections', customizeWikiEditor );
		// }
	// });
}