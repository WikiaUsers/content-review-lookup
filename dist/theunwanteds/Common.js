/* Any JavaScript here will be loaded for all users on every page load. */

window.railWAM = {
    logPage:"Project:WAM Log"
     autoLogForUsers: "BleakInfinity"
};

UserTagsJS.modules.custom = {
	'BleakInfinity': ['css'] // CSS
	'BleakInfinity': ['eotm'] // EotM
};

window.UserTagsJS = {
	modules: {},
	tags: {
		css: { u:'CSS Editor' },
		eotm: { u:' Editor of the  Month' },
	}
};