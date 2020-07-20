//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true curly:false forin:false */
/*global UserTagsJS */

//
// MODULE: Stop Blocked.
// Removes all tags (except blocked) from users who are blocked.
//
UserTagsJS.extensions.stopblocked = {
	filter: function(groups) {
		"use strict";
		if (!groups.blocked) return;

		var all = [];
		for (var g in groups) {
			if (g === 'blocked') continue;
			all[all.length] = g;
		}
		return all;
	}
};

//</syntaxhighlight>