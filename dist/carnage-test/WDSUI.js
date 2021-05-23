/**
 * WDSUI
 * 
 * Creates a Fandom Design System component by
 * using a constructor.
 * 
 * Version: 1.0
 **/
( function( mw ) { 
	"use strict";
	
	mw.hook( "dev.wds" ).add( function( wdsIcons ) { 
		function WDS( type, options ) { 
			const types = Object.freeze( { 
				"floating-button": { 
					aliases: [ "floatingButton" ],
					component: WDS.FloatingButton
				},
				"floating-button-group": { 
					aliases: [ "floatingButtonGroup", "floating-button__group" ],
					component: WDS.FloatingButtonGroup
				},
				"button": { 
					component: WDS.Button
				},
				"button-group": { 
					aliases: [ "buttonGroup" ],
					component: WDS.ButtonGroup
				},
				"dialog": { 
					aliases: [ "modal" ],
					component: WDS.Dialog
				},
				"toggle": { 
					aliases: [ "toggles" ],
					component: WDS.Toggle
				},
				"pill": { 
					aliases: [ "pills" ],
					component: WDS.Pill
				},
				"dropdown": { 
					aliases: [ "dropdownList", "dropdown-list" ],
					component: WDS.Dropdown
				},
				"spinner": { 
					aliases: [ "indicator" ],
					component: WDS.Spinner
				},
				"banner": { 
					aliases: [ "notification" ],
					component: WDS.Banner
				},
				"tabs": { 
					component: WDS.Tabs
				}
			} );
			
			if ( Object.hasOwnProperty( type ) ) return new types[ type ].component( options );
			
			const typeName = Object
				.getOwnPropertyNames( types )
				.find( function( name ) { 
					const object = types[ name ];
					return object.aliases.includes( type );
				} );
			
			if ( !typeName ) throw new ReferenceError( "Invalid type: " + type );
			
			return new types[ typeName ].component( options );
		}
		
		WDS.Banner = function( options ) { 
			const banner = this;
			
			banner.$el = document.createElement( "div" );
			banner.$el.classList.add( "wds-banner-notification__container" );
			
			banner.$defaults = Object.freeze( { 
				type: "message",
				content: "",
				hidden: false,
				timeout: Infinity
			} );
			
			banner.$options = { };
			
			banner.setOptions = function( opts ) { 
				Object
					.getOwnPropertyNames( banner.$defaults )
					.forEach( function( key ) { 
						banner.$options[ key ] = opts[ key ] || banner.$defaults[ key ];
					} );
			};
			
			
			
			banner.setOptions( options );
		};
	} );
} )( mediaWiki );