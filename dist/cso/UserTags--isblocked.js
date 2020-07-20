/*global UserTagsJS */
 
//
// MODULE: Blocked Users
// Detects blocked users and adds the blocked group.
// NOTE: This module is only necessary for Monobook as Oasis provides a
//	Blocked tag built-in which OasisTagsModule will detect in the Core.
//
UserTagsJS.extensions.isblocked = {
	start: function(config, username/*, logger, lang*/) {
		"use strict";
		// Anonymous users are a pain, list=users only works on registered ones
		// List blocks works on all but it returns EVERY block EVER so we have
		// to actually calculate if it's current or not.
		return {
			ajax: {
				list: 'blocks',
				bkusers: username,
				bkprop: 'expiry',
				bkdir: 'older',
				bklimit: 1
			}
		};
	},
	generate: function(json) {
		"use strict";
		json = json.query.blocks[0];
		if (json && Date.now() < Date.parseISO8601(json.expiry)) {
			return ['blocked'];
		}
	}
};
 
//