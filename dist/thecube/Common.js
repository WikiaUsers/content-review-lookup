/* Any JavaScript here will be loaded for all users on every page load. */
// Custom user tags (uses pre-approved script UserTags)
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		registeredcharacter: { u:'Registered Character' }, // Since this is a collaborative work of fiction, we require the characters to be registered to have a consistent story
		xenocloid: { u:'XenoCloid', order:-1/0}, // Just a special tag for Xeno since this whole thing was his idea
		supergd: { u:'SuperGD', order:-1/0 }, // Special tag for me since I had the idea to make this public
		vandalpatrol: { u: 'Vandal Patrol Volunteer' } // Simple volunteer, they don't get any permissions
	}
};
//
UserTagsJS.modules.custom = {
	'SuperGDPro3': ['registeredcharacter', 'supergd', 'vandalpatrol'], // Assigning myself Registered Character, SuperGD and Vandal Patrol
	'XenoCloid': ['registeredcharacter', 'xenocloid', 'vandalpatrol'] // Ditto but XenoCloid
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop']; // I think this checks for if users have Bureaucrat/Admin idk it says that on the docs