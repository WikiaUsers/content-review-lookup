//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true */
/*global UserTagsJS */

//
// MODULE: Autoconfirmed Users
// Tags users who are not autoconfirmed (have not contributed significantly
// anywhere in the Fandom network)
//
UserTagsJS.extensions.autoconfirmed = (function($) {
	"use strict";
	return {
		start: function(/*config, username, logger, lang*/) {
			return {
				ajax: {
					type: 'user',
					prop: ['groups']
				}
			};
		},
		generate: function(json) {
			if (!json || json.error || !json.query) {
				return;
			}
			json = json.query.users[0];
			if (!json || !json.groups) {
				return;
			}
			return $.inArray('autoconfirmed', json.groups) !== -1 ? {} : ['notautoconfirmed'];
		}
	};
})(jQuery);

//</syntaxhighlight>