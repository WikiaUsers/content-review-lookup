
/* kill read more headings on pages with elements that have id="noreadmore" */
function NoReadMore() {
    if ($('#noreadmore')) {
        $('.RelatedPagesModule').css('display', 'none');
    }
}
addOnloadHook(NoReadMore);
/*** END NoReadMore ***/

/*Special tool for the USERNAME template.*/
/* Replaces {{USERNAME}} with the name of the user browsing the page.
 Requires copying Template:USERNAME. */
 // Insert username
if (mw.config.get('wgAction') === 'view' && mw.user.name !== null) {
    $('.insertusername').text(mw.user.name);
}
/* End of the {{USERNAME}} replacement */


/* Import scripts for Oasis/Wikia
 * NOTE: Use of Common.js should be avoided --
 * scripts which also work on Monobook should be imported into Monobook.js as well
 */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:DisplayTimer.js',
        'MediaWiki:CollapsibleTables.js',
        'MediaWiki:UserTagsConfig.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:Countdown/code.js',
        'w:c:dev:BackToTopButton/code.js',
        //'w:c:dev:SexyUserPage/code.js'
    ]
});