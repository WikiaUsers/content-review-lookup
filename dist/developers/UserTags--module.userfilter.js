//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true */
/*global UserTagsJS */
 
//
// MODULE: User Filter
// Removes listed tag groups from a given username.
//
UserTagsJS.extensions.userfilter = (function($) {
	"use strict";
	return {
		start: function(config, username/*, logger, lang*/) {
			config = ((typeof(config) === 'object' && config) || {})[username];
			if (!config) {
				return;
			}
			this._filter = ($.isArray(config) ? config : [config + '']);
		},
		filter: function(/*groups*/) {
			return this._filter;
		}
	};
})(jQuery);
 
//</syntaxhighlight>