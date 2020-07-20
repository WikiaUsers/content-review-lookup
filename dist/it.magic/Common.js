/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
importArticles({
    type: "script",
    articles: [
        "w:dev:UserTags/code.js",
        "MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
        "MediaWiki:Selector.js",
        "w:dev:ShowHide/code.js",
        "w:dev:BackToTopButton/code.js",
        "w:dev:SocialIcons/code.js",
        "w:dev:LockForums/code.js",
        "w:dev:DupImageList/code.js",
        "w:dev:MessageWallUserTags/code.js",
    ]
}, {
    type: "style",
    articles: [
        "MediaWiki:DropDownMenu.css",
        "MediaWiki:DropDownMenu2.css",
        "MediaWiki:Wikia.css/Highlight.css",
    ]
});
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');