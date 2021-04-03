//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true */
/*global UserTagsJS */
 
//
// MODULE: Non-users
// Tag for global accounts that have not edited, only sort-of useful in Monobook.
//
UserTagsJS.extensions.nonuser = {
	start: function(/*config, username, logger, lang*/) {
		"use strict";
		return {
			// Exact same query as inactive so they'll merge
			ajax: {
				type: 'contributions',
				limit: 1,
				dir: 'older',
				prop: ['timestamp']
			}
		};
	},
	generate: function(json) {
		"use strict";
		json = json.query.usercontribs[0]; // Only 1 contribution was requested
		if (!json) { // No contributions
			return ['nonuser'];
		}
	}
};
 
//</syntaxhighlight>