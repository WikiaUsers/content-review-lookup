/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/Usertags.js',
        'u:dev:MediaWiki:ModernBackToTopButton/code.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:PurgeBlogs/code.js',
        'u:dev:SearchSuggest/code.js',
        'u:dev:MediaWiki:WhatLinksHere/code.js',
        'u:dev:MediaWiki:DiscussionsRailModule/code.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        'w:c:clashofclans:MediaWiki:Common.js/Protection.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:View_Source/code.js',
    ]
});
 
// ============================================================
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/milmo/images/1/1c/ComingSoonSmall.png/revision/latest?cb=20180406060650&path-prefix=pt-br';
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];