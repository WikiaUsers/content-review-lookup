/* Any JavaScript here will be loaded for all users on every page load. */ 

/* Discord Configuration */
if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord Server",
            id: "413239851060559885"
        }
    };
}

/* UserTagsJS */
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured' },
		templates: { u:'Templates Guru' }
	}
}

/*RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log"
};