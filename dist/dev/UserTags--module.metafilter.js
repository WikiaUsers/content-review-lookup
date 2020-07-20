//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true curly:false forin:false smarttabs:true */
/*global UserTagsJS */

//
// MODULE: Meta Filter
// Removes a group when a certain combination of groups is encountered
// { 'group': ['group', 'or group', ['or group 1', 'and group 2']] }
// TODO: Add a NOT-IN variant
//
UserTagsJS.extensions.metafilter = (function($, Object) {
	"use strict";
	return {
		start: function(config/*, username, logger, lang*/) {
			this._config = (typeof(config) === 'object' && config) || {};
		},
		filter: function(groups) {
			var list, i, j, group, filter, reject = [], has = Object.hasOwnProperty,
			    match;
			// For every group in the group set, we check if a filter exists.
			// If we find a filter set then we apply it.
			for (group in groups) {
				list = this._config[group];
				if (!list) continue;
				if (!$.isArray(list)) list = [list];

				i = list.length;
				match = (i === 0); // Empty array = match all
				all_filters: while (i--) {
					filter = list[i];
					if (!$.isArray(filter)) filter = [filter];

					// Check all the filters in this batch (subarray)
					j = filter.length;
					while (j--) {
						if (!has.call(groups, filter[j])) continue all_filters;
					}

					match = true;
					break;
				}
				if (match) {
					// If we got here then one of the filters matched, kill the group
					reject[reject.length] = group;
				}
			}
			return reject;
		}
	};
})(jQuery, Object);

//</syntaxhighlight>