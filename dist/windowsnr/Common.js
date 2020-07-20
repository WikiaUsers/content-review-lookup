+function(t,n,e,i){function o(){return typeof wikiMod!==e?wikiMod:t.wikiMod||n.wikiMod}function r(){a||(a=!0,i(t.jQuery||n.jQuery,o()))}function u(t){t=t||1;try{if(!a&&!o()&&35>t)return setTimeout(function(n){u((n||t)+1)},25,t)}catch(n){}r()}function c(){var i=t[f],o=n[f],c=!0;try{if(i===!0||o===!0)return r();try{n[f]=r}catch(a){}if(e!=typeof n[f]&&n[f]!==r&&(c=!1),i===!1||"function"!=typeof i){try{t[f]=r}catch(a){}e!=typeof t[f]&&t[f]!==r&&(c=!1)}}catch(a){}c&&u()}var f="onWikiModReady",a=!1;c()}(this,window,"undefined",
function($,wikiMod){
	// Your Code Goes Here!
	console.log("Init: ",$,wikiMod);
});

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'FeanPL': ['Discuss User', 'Javascript Moderator'], 
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 50; // 50 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.prefLanguages = true;
UserTagsJS.extensions.MyModule = {
	start: function(config, username, logger, lang) {
		// Start up code
		// Return Values:
		//	[Array of group strings]
		//	A jQuery promise
		//	An object literal: { tags: {}, groups: [], promise: $.Deferred().promise(), ajax: [{}] }
		//	undefined/null/false/0/''
	},
	generate: function(json1, json2, json3, ...) {
		// AJAX completion callback
		// Return Values:
		//	[Groups Array]
		//	Object literal: { tags: {}, groups: [] }
		//	undefined/null/false/0/''
	},
	generateFailed: function() {
		// AJAX failure callback
		// Return values are the same as generate()
	},
	derive: function(groups) {
		// Derivation function, you receive a HASH containing all generated
		// groups. You can examine the hash to create derivative groups.
		// Return values:
		//	[Array of new groups]
		//	undefined/null/false/0/''
	},
	filter: function(groups) {
		// Filtering function for removing groups
		// Return values:
		//	[groups to remove array]
		//	undefined/null/false/0/''
	}
};

importScriptPage('SaveKey/code.js', 'dev');