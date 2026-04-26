/**
 * WikiActivity.js
 * 
 * @description Recreates the legacy Special:WikiActivity page on the
 *				FandomDesktop skin with a modernized appearance and
 *				allows the WikiActivity page to be configurable.
 * 
 * @author Ultimate Dark Carnage <dev.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 * @version 1.6.5b
 * @license CC-BY-SA 4.0
 * @external "mediawiki.api"
 * @external "mediawiki.util"
 * @external "mediawiki.Title"
 **/
((window, $, mw) => {
	"use strict";
	
	// Creating the Dev object if it exists
	window.dev = Object.assign({}, window.dev);
	// Creating the UCX object if it exists
	window.UCX = Object.assign({}, window.UCX);
	
	if (
		window.UCX.wikiActivity || 
		window.waLoaded
	) return;
	
	// Set loaded state to true
	window.waLoaded = true;
	
	// Creating helper functions
	const inGroup = (groups = []) => 
		Array
			.from(groups)
			.some((group) => mw.config.get("wgUserGroups").includes(group));
			
	const regesc = (string) => 
		s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
		
	function truncate( s, l ) { 
		return ( s.length >= l ) ? 
			s.substr( 0, l ).replace( /.$/gi, "..." ) :
			s;
	}
	
	function pad( n ) { 
		return ( Math.abs( n ) < 10 ) ?
			( n >= 0 ? "0" + n : "-0" + Math.abs( n ) ) :
			n;
	}
		
	// Creating the recent changes poller
	class APIPoller {
		constructor({ 
			name = "mwapi", 
			delay = 3 * 60 * 1000 
		}) {
			this.url = ""
		}
	}
	
	// Creating the WikiActivity object
	
	// Set the WikiActivity object globally
	window.UCX.wikiActivity = wikiActivity
})(window, jQuery, mediaWiki);