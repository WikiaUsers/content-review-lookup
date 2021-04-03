//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true forin:false curly:false */
/*global UserTagsJS */
 
//
// MODULE: Implode
// Combines a set of groups into a single by generating one and removing the set
//
UserTagsJS.extensions.implode = (function($) {
	"use strict";
	return {
		start: function(config/*, username, logger, lang*/) {
			this._config = ($.isPlainObject(config) && config) || {};
		},
		derive: function(groups) {
			var i, len, conf, newGroups = [];
			this._killList = [];
			// This is not very efficient, but making it more efficient would require
			// a pre-pass which walks every cell anyway (to build a trie or selector
			// hash) so we're better off just doing it the simple/dumb way.
			all_combinations: for (var outGroup in this._config) {
				conf = this._config[outGroup];
				if (!$.isArray(conf)) continue;
				for (i = 0, len = conf.length ; i < len ; ++i) {
					if (!groups.hasOwnProperty(conf[i])) continue all_combinations;
				}
				// Got here then we have a match
				this._killList.push.apply(this._killList, conf);
				newGroups[newGroups.length] = outGroup;
			}
			return newGroups;
		},
		filter: function(/*groups*/) {
			return this._killList;
		}
	};
})(jQuery);
 
//
// MODULE: Explode
// Same as Implode, except that it doesn't delete the groups in the generator set
//
UserTagsJS.extensions.explode = {
	start: UserTagsJS.extensions.implode.start,
	derive: UserTagsJS.extensions.implode.derive
};
 
//</syntaxhighlight>