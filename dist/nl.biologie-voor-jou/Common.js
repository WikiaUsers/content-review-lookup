/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */


window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'lord of the smilling faces'},
                newuser: { u:'nieuwe gebruiker'},
                coder: { u:'coder'},
                derp: {u:'derp'},
                founder: {u:'oprichter'},
                biologie: {u:'biologie leraar'},
                
	}
};

UserTagsJS.modules.custom = {
        'Themattyboy64': ['derp', 'founder', 'bureaucrat'],
       
};

UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
	days: 3, // Must have been on the Wiki for 3 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});