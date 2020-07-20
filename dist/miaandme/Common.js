/* Any JavaScript here will be loaded for all users on every page load. */
/*UserTags*/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
                bureaucrat: { u:'Bureaucrat' },
	        featured: { u:'Featured User' },
		'head admin': { u:'Head administrator' },
                'co-head admin': { u:'Co-head administrator' },
                'leader scripts': { u:'Leader of Project Scripts' },
                'leader characters': { u:'Leader of Project Characters' },
                'leader places/locations': { u:'Leader of Project Places/Locations' },
                'leader episodes': { u:'Leader of Project Episodes' },
                'co-leader scripts': { u:'Co-leader of Project Scripts' },
                'co-leader characters': { u:'Co-leader of Project Characters' },
                'co-leader places/locations': { u:'Co-leader of Project Places/Locations' },
                'co-leader episodes': { u:'Co-leader of Project Episodes' },
                'rollback': { u:'Rollback' },
                'chat mod': { u:'Chat moderator'}
	}
};
 
UserTagsJS.modules.custom = {
	'ForeverFriendlyViolet': ['featured', 'head admin', 'rollback', 'chat mod', 'bureaucrat', 'leader scripts', 'leader characters', 'leader episodes', 'leader places/locations']
}

/*SpoilerAlert*/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/*Import Articles*/

importArticles({
  type:'script', 
  articles: [
      'w:c:dev:UserTags/code.js',
      'w:c:dev:SpoilerAlert/code.js',
      'u:dev:Standard_Edit_Summary/code.js',
      'u:dev:SearchSuggest/code.js',
      'u:dev:HighlightUsers/code.js',
      'u:dev:DynamicImages/code.js',
      'u:dev:MessageWallUserTags/code.js'

  ]
});

/*Highlight*/
highlight = {
    selectAll: true,
    rollback: 'mediumblue',
    sysop: '#FF1493',
    users: {
 
    }
};
/*MessageWallandForumUserTags*/
window.MessageWallUserTags = {
    tagColor: 'darkviolet',
    glow: true,
    glowSize: '15px',
    glowColor: 'violet',
    users: {
        'ForeverFriendlyViolet':'Head admin • Current leader of all Projects • Chat moderator • Rollback',
    }
};