/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
});

importArticles({
    type: "script",
    articles: ["u:dev:ResponsiveSlider/code.js"]
})
// ============================================================
// Add back to Top Arrow in the Oasis Footer area.
// see = http://dev.wikia.com/wiki/BackToTopArrow
importScriptPage('BackToTopArrow/code.js', 'dev');



/* Calculators */
if (wgPageName === 'Calculators' || wgPageName === 'Monster_Legends_Wiki:Calculators') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Code.js');
    });
}

/* Calculators */
if (wgPageName === 'Breeding_Calculator' || wgPageName === 'Monster_Legends_Wiki:Breeding_Calculator' || wgPageName === 'User:Sonnorcteer/sandbox') {
    $(function () {
        importScriptPage('MediaWiki:BreedingCalculator/Code.js');
    });
}


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */