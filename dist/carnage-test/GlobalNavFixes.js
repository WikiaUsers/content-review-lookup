( function( window, mw, $ ) { 
	"use strict";
	function regexEscape( s ) { 
		return String( s ).replace( 
			/[-[\]{}()*+!<=:?./\\^$|#\s.]/g, 
			'\\$&' 
		);
	}
	
	function fetchSearch( event ) { 
		const value = event.target.value.trim( );
		if ( !value ) return Promise.reject( );
		const api = new mw.Api( );
		return api.get( { 
			action: "linksuggest",
			get: "suggestions",
			query: value,
			format: "json"
		} );
	}
	
	function loadMWMessages( ) { 
		const api = new mw.Api( );
		return api.loadMessagesIfMissing( [ 
			"search-modal-see-all-results", 
			"tooltip-search", 
			"tooltip-search-go" 
		] );
	}
	
	function createSearch( ui ) { 
		const form = ui.form( { 
			"class": "fandom-community-header__search",
			"id": "fandom-community-header__search"
		} );
		
		const wrapper = ui.div( { 
			"class": "fandom-community-header__search-input-wrapper",
			"id": "fandom-community-header__search-input-wrapper"
		} );
		
		const input = ui.input( { 
			"class": "fandom-community-header__search-input",
			"id": "fandom-community-header__search-input"
		} );
		
		const button = ui.button( { 
			"class": "fandom-community-header__search-button",
			"id": "fandom-community-header__search-button"
		} );
	}
} )( window, mediaWiki, jQuery );