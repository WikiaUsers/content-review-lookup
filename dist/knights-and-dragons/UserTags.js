// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};

UserTagsJS.modules.custom = {
	'FrosteeSnoman': ['csshelper', 'templatehelper', 'jshelper'] // NOTE: order of list here does NOT matter
};