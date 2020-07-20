/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});

/* Script that allows pagetitle changes and pagetitle custom alignment
   Requires copying Template:Title. */
 
// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// by Sikon
//
// The script was found incompatable when imported as other scripts are
// =====================================================================
 
function rewriteTitle() {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    // For the title in the Monaco masthead
    if (skin == "monaco" && (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk")) {
        var mastheadUser = document.getElementById("user_masthead_head");
        var mastheadSince = document.getElementById("user_masthead_since");
 
        var titleString = '<h2>' + titleDiv.innerHTML;
        titleString += '<small id="user_masthead_since">' + mastheadSince.innerHTML;
        titleString += '</small></h2>';
 
        mastheadUser.innerHTML = titleString;
    } else {
        var cloneNode = titleDiv.cloneNode(true);
        var firstHeading = $('h1.firstHeading').get(0);
        var node = firstHeading.childNodes[0];
 
        // new, then old!
        firstHeading.replaceChild(cloneNode, node);
        cloneNode.style.display = "inline";
 
        var titleAlign = document.getElementById('title-align');
        firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
    }
}
addOnloadHook(rewriteTitle, false);


/* End of the JavaScript title rewrite/alignment */