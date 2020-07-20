/* Any JavaScript here will be loaded for all users on every page load. */

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
// END Ajax auto-refresh

// Last edit details on articles
window.lastEdited = {
    avatar: true,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    namespaces: {
        include: [],
        exclude: ["User_blog", "User_blog_comment"]
    },
    pages: ["The_Wizard_of_Oz_Wiki"]
};
// END Last edit details on articles

// User tags
window.UserTagsJS = {
	modules: {
                custom: {
                    'Xxsammmsammmxx': 'image_mod',
                    'Dsneybuf': 'c_mod',
                    'LarrySpring96': 'c_mod',
        }
        },
	tags: {
		'image_mod': { u:'Image moderator' },
		'c_mod': { u:'Content moderator' },
	}
 };
UserTagsJS.modules.inactive = 60, // Inactive if no edits in 60 days;
// END User tags

// Message Wall User Tags
window.MessageWallUserTags = {
    tagColor: 'OliveDrab',
    glow: true,
    glowSize: '15px',
    glowColor: 'Yellow',
    users: {
        // 'username': 'usergroup',
        'Xxsammmsammmxx': 'Temp Admin • Image Mod',
        'Riadse96': 'Admin',
        'Philipkc': 'Admin',
        'Dsneybuf': 'Content Mod',
        'LarrySpring96': 'Content Mod',
    }
};

// END Message Wall User Tags

importArticles({
    type: "script",
    articles: [
        "u:dev:ShowHide/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:DisplayClock/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:TopEditors/code.js",
        "u:dev:SearchSuggest/code.js",
        "u:dev:NullEditButton/code.js",
        "u:dev:AjaxRC/code.js",
        "u:dev:LastEdited/code.js",
        "u:dev:UserTags/code.js",
        "u:dev:MessageWallUserTags/code.js"
    ]
});