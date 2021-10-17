/* Any JavaScript here will be loaded for all users on every page load. */


//////////////////////////////////////////////
/* The code below adds buttons to the 2010 wikitext editor (Source editor) to quickly insert templates such Template:Resources and the infoboxes. To see the infobox buttons, click on "Advanced" which will open up a new section where the buttons are stored. */
/////////////////////////////////////////////
var customizeToolbar2 = function () {
/* Template:Resources */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'main',
	group: 'insert',
	tools: {
		"resources": {
			label: 'Resources',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/empireearth/images/5/58/Fruit_bowl.jpg',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Resources|wood= ",
					post: "|food= |gold= |stone= |iron= |oil= |tin= |saltpeter= |uranium= }}"
				}
			}
		}
	}
} );

/*-------- INFOBOXES --------*/
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	groups: {
		"infoboxes": {
			'label': 'Infoboxes'
		}
	}
} );
/* Unit */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"unit": {
			label: 'Unit',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/empireearth/images/c/c6/Button_unit.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Unit Infobox \r|Name           = ",
					post: "\r|Icon           = \r|Image          = \r|Game           = \r|Epoch          = \r|Civilization   = \r|Trained At     = \r|Built At       = \r|Type           = \r|Attack Type    = \r|HP             = \r|Attack         = \r|Armor          = \r|Arrow          = \r|Pierce         = \r|Shock          = \r|Area Effect    = \r|Gun            = \r|Laser          = \r|Transport      = \r|Speed          = \r|Power          = \r|Range          = \r|Flight Time    = \r|LOS            = \r|Hotkey         = \r|Requires       = \r|Abilities      = \r|Cost           = \r|Pop Count      = \r|Build Time     = \r|Upgrades From  = \r|Upgrades To    = \r}}"
				}
			}
		}
	}
} );
/* Building */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"building": {
			label: 'Building',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/empireearth/images/8/8c/Button_building.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Building Infobox\r|Name           = ",
					post: "\r|Icon           = \r|Image          = \r|Game           = \r|Epoch          = \r|Type           = \r|RPS            = \r|HP             = \r|Attack         = \r|Range          = \r|LOS            = \r|Cost           = \r|Build Time     = \r|Upgrades from  = \r|Upgrades to    = \r}}"
				}
			}
		}
	}
} );
/* Scenario */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"scenario": {
			label: 'Scenario',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/empireearth/images/0/0e/Scenario_Infobox_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Scenario Infobox\r|Game                  = ",
					post: "\r|Campaign              = \r|Preceding Scenario    = \r|Following Scenario    = \r|Civ Points            = \r|Civilizations         = \r|Heroes                = \r}}"
				}
			}
		}
	}
} );
/* Character */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"character": {
			label: 'Character',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/empireearth/images/9/96/Button_character.jpg',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Character Infobox\r|Name               = ",
					post: "\r|Icon               = \r|Image              = \r|Game               = \r|Campaign           = \r|Scenarios          = \r|Unit Appearance    = \r|Hero Type          = \r|Hit Points         = \r|Attack Points      = \r|Armor              = \r|Range              = \r|Speed              = \r|LOS                = \r|Attack Type        = \r|Power/Mana         = \r|Pop Count          = \r|Epoch              = \r|Build Time         = \r|Cost               = \r|Upgrades From      = \r|Upgrades To        = \r}}"
				}
			}
		}
	}
} );
/* Epoch */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"epoch": {
			label: 'Epoch',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/empireearth/images/5/5f/Button_epoch.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Epoch Infobox\r|Name           = ",
					post: "\r|Icon           = \r|Image          = \r|Caption        = \r|Game           = \r|Time Period    = \r|PrevEpoch      = \r|NextEpoch      = \r|Resources      = \r}}"
				}
			}
		}
	}
} );
};

/* Check if view is in edit mode and that the required modules are available. Then, customize the toolbar … */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
mw.loader.using( 'user.options' ).then( function () {
// This can be the string "0" if the user disabled the preference ([[phab:T54542#555387]])
if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
$.when(
mw.loader.using( 'ext.wikiEditor' ), $.ready
).then( customizeToolbar2 );
}
} );
}