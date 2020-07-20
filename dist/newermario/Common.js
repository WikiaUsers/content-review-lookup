/* Any JavaScript here will be loaded for all users on every page load. */
 
// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================
 
// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
        crat: { u:'Bureaucrat' }, // each line except the last needs a comma at the end
        foo: { u:'Lorem Ipsum'},
        juen: {u:'Secretly Junko Enoshima'},
        ded: {u:'Inactive'},
        meme: {u:'Meme Master'}
	}

};

UserTagsJS.modules.custom = {
    'TheMaster001': ['ded'], // each line except the last needs a comma at the end
    'Mario101luigi202peach404': ['juen'],
    'AgentMuffin': ['meme','foo']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator'];