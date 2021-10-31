window.UserTagsJS = {
	modules: {},
	tags: {
		classdummy: { u: 'Class Dummy', order: 100 },
		frenchclass: { u: 'French Class', order: 101 },
		partyanimal: { u: 'Party Animal', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Arzene': ['classdummy', 'frenchclass', 'partyanimal'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];