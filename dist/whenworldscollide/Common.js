/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
importArticles({
    type: 'script',
    articles: [
        'u:kocka:MediaWiki:AjaxCommentDelete/code.js',
        'u:kocka:MediaWiki:AjaxThreadDelete/code.js'
    ]
});

window.batchDeleteDelay = 1000;

window.massRenameDelay = 1000; // Optional
window.massRenameSummary = 'automatic'; // Optional

window.massCategorizationDelay = 1000;

/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Imports biography from discussions to ns:2 if no profile page is present.
*/

//replace redlink placeholder with discussions bio.
function addDProfile(text) {
    var content = document.getElementsByClassName("noarticletext")[0];
    content.innerHTML = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function getUserBio(userId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var arr = JSON.parse(request.responseText);
            if (Boolean(arr.value)) { //Only continue if there is an actual bio written.
                addDProfile(arr.value);
            }
        }
    };
    request.open("GET", "https://services.wikia.com/user-attribute/user/" + userId + "/attr/bio", true);
    request.send();
}

//Is there a better way to get the user id?
function getUserIdByName(username) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var arr = JSON.parse(request.responseText);
            userId = arr["query"]["allusers"][0].id;
            if (Boolean(userId)) {
                getUserBio(userId);
            }
        }
    };
    request.open("GET", "/api.php?action=query&list=allusers&aufrom=" + username + "&format=json&aulimit=1", true);
    request.send();
}

function createDProfiles() {
    if (wgNamespaceNumber == 2) {
        //Test if profile page exists (we want this to 404)
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 404) {
                var username = wgTitle;
                getUserIdByName(username);
            }
        };
        request.open("GET", "/wiki/" + wgPageName, true);
        request.send();
    }
}

addOnloadHook(createDProfiles);