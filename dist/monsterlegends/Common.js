/* Any JavaScript here will be loaded for all users on every page load. */
/*importArticles({
		type: "script",
		articles: ["MediaWiki:FilterTable.js"]
});*/
// ============================================================


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') == null) return;
    $("span.insertusername").text(mw.config.get('wgUserName'));
 }
 $(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */


/* Calculators */
if (mw.config.get('wgPageName') === 'Calculators' || mw.config.get('wgPageName') === 'Monster_Legends_Wiki:Calculators') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Code.js');
    });
}

/* Calculators */
if (mw.config.get('wgPageName') === 'Breeding_Calculator' || mw.config.get('wgPageName') === 'Monster_Legends_Wiki:Breeding_Calculator' || mw.config.get('wgPageName') === 'User:Sonnorcteer/sandbox') {
    $(function () {
        importScriptPage('MediaWiki:BreedingCalculator/Code.js');
    });
}

/* LinkPreview */
window.pPreview.noimage = 'https://static.wikia.nocookie.net/monsterlegends/images/8/8c/Thumb-unknownmonster.jpg';