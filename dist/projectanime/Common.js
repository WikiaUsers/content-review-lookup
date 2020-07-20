/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "u:dev:Standard_Edit_Summary/code.js",
        "u:dev:SearchSuggest/code.js",
        "u:dev:HighlightUsers/code.js",
        "u:dev:DynamicImages/code.js",
        "u:dev:MessageWallUserTags/code.js"
    ]
});
/*Highlight*/
highlight = {
    selectAll: true,
    sysop: 'darkviolet',
    rollback: 'orange',
    users: {
        
    }
};
/*MessageWallandForumUserTags*/
window.MessageWallUserTags = {
    tagColor: 'green',
    glow: true,
    glowSize: '15px',
    glowColor: 'brightgreen',
    users: {
        'ForeverFriendlyViolet':'Head admin • Current leader of all Projects • Chat moderator • Rollback',
    }
};