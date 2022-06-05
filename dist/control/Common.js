// <nowiki>

/* BackToTop Button Config */
window.BackToTopModern = true;
/* Spoilers */
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 500
};
/* Youtube Link Integrator */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YouTubeModal/code.js',
    ]
});
/* Article Previews */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ArticlePreview/code.js',
    ]
});
// </nowiki>