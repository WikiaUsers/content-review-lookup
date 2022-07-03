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
	
	// Start with web cite
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/9/91/Button_cite_web.png',
		speedTip: 'Web Citation',
		tagOpen: '<ref>{{Cite Web|quote= ',
		tagClose: "|author= |published= |retrieved=" + nowmonth + " " + nowday + ", " + nowyear + "|url= |title= |site= |type=}}</ref>",
		sampleText: '',
		imageId: ''
	} );
	
	// Cite book
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
		speedTip: 'Cite Book',
		tagOpen: '<ref>{{Cite Book|quote= ',
		tagClose: '|book= |publisher= |page= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
	
	// Cite guide
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
		speedTip: 'Cite Guide',
		tagOpen: '<ref>{{Cite Guide|quote= ',
		tagClose: '|game= |publisher= |page= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
	
	// Cite person
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/5/53/Button_cite_person.png',
		speedTip: 'Cite Person',
		tagOpen: '<ref>{{Cite Person|quote= ',
		tagClose: '|name= |url= |title= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
	
	// Cite episode
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/1/1c/Button_cite_episode.png',
		speedTip: 'Cite Episode',
		tagOpen: '<ref>{{Cite Episode|quote= ',
		tagClose: '|name= |show= |episode= |time= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
	
	// Cite Manual
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/5/5d/Button_cite_manual.png',
		speedTip: 'Cite Manual',
		tagOpen: '<ref>{{Cite Manual|quote= ',
		tagClose: '|game= |page= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
	
	// Regular cite template
	mw.toolbar.addButton( {
		imageFile: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/2/20/Button_cite_template.png',
		speedTip: 'Regular citation',
		tagOpen: '<ref>{{Cite|(Quote)',
		tagClose: '|(Person)|(Game)}}</ref>',
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
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/2/20/Button_cite_template.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite|',
						'peri': '(quote)',
						'post': '|(person)|(game)}}</ref>'
					}
				}
			},
			'Cite Person': {
				label: 'Cite Person',
				type: 'button',
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/5/53/Button_cite_person.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite Person|quote= ',
						'peri': '',
						'post': '|name= |url= |title= }}</ref>'
					}
				}
			},
			'Cite Book': {
				label: 'Cite Book',
				type: 'button',
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite Book|quote= ',
						'peri': '',
						'post': '|book= |publisher= |page= }}</ref>'
					}
				}
			},
			'Cite Guide': {
				label: 'Cite Guide',
				type: 'button',
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/e/ef/Button_cite_book.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite Guide|quote= ',
						'peri': '',
						'post': '|game= |publisher= |page= }}</ref>'
					}
				}
			},
			'Cite Manual': {
				label: 'Cite Manual',
				type: 'button',
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/5/5d/Button_cite_manual.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite Manual|quote= ',
						'peri': '',
						'post': '|game= |page= }}</ref>'
					}
				}
			},
			'Cite Episode': {
				label: 'Cite Episode',
				type: 'button',
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/1/1c/Button_cite_episode.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite Episode|quote= ',
						'peri': '',
						'post': '|name= |show= |episode= |time= }}</ref>'
					}
				}
			},
			'Cite Web': {
				label: 'Web Citation',
				type: 'button',
				icon: 'https://zelda.gamepedia.com/media/zelda.gamepedia.com/9/91/Button_cite_web.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Cite Web|quote= ',
						'peri': '',
						'post': '|author= |published= |retrieved= ' + nowmonth + ' ' + nowday + ', ' + nowyear + '|url= |title= |site= |type= }}</ref>'
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