//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*global UserTagsJS */
 
//
// MODULE: Custom Tags
// Adds manually specified groups to users
//
UserTagsJS.extensions.custom = {
	start: function(config, username/*, logger, lang*/) {
		"use strict";
		var groups = config[username];
		if (jQuery.isArray(groups)) {
			return groups;
		}
		return groups && [groups + ''];
	}
};
 
//</syntaxhighlight>