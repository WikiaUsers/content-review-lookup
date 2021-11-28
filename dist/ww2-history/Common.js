// 05:32, January 3, 2013 (UTC)
// <source lang="JavaScript">

/* ----------------------------------------- */

// Import scripts from DEV wiki
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:DISPLAYTITLE/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:LockOldBlogs/code.js'
    ]
});
// END Import scripts from DEV wiki
// </source>
// Lock Old Blogs
window.LockOldBlogs = {
    expiryDays: 365,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t edit this blog!",
    nonexpiryCategory: "Never archived blogs"
};
// END Lock Old Blogs

// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js');
// END Adds DisplayClock

/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;

    if ( !NavFrame || !NavToggle ) {
        return false;
    }

    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }

    event.preventDefault();
};

// ******************
// Collapsible tables
// ******************
 
importScriptPage('ShowHide/code.js', 'dev');

// **********************************
// FIND DUPLICATE IMAGES
// Code courtesy of "pcj" of WoWWiki.
// **********************************
 
dil = new Array();
 
function findDupImages(gf) {
    output = "";
    url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
    if (gf) url += "&gaifrom=" + gf;
    $.getJSON(url, function (data) {
        if (data.query) {
            pages = data.query.pages;
            for (pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n"
                }
            }
            $("#mw-dupimages").append(output);
            if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
        }
    });
}
 
$(function () {
    if ($("#mw-dupimages").length) findDupImages();
});
 
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: [
        '(click to browse)',
        '1.Improving', [
            'Clean up',
            'Corrected spelling/grammar',
            'Tweaking Code',
            'Updating',
            'Rating',
            'Test Change',
            'Rename',
            'Incorrect information',
            'Adding Information',
            'Adding Links',
            'Adding Infobox',
            'Adding Navbox',
            'Adding Category',
            'Removing Category',
            'Adding Photo',
            'Removing Photo',
            'Adding Flagicon',
            'Tagging as Stub',
            'Tagging as Needs Infobox',
            'Tagging as Needs Expansion',
            'Tagging as Redlinked',
            'Tagging as Plagiarized',
            'Tagging as Needs Clean up',
            'Removing Spam',
            'Removing Vandalism',
            'Removing Plagiarized information',
            'Unneeded Content',
            /* etc. */
         ]
         /* etc. */
    ]
};

var WikiaNotificationMessage = "Be sure to check the wiki <a href='/wiki/User_blog:Fargo84/Newsletter_July_10,_2016'>Newsletter!</a>";
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js',
        'u:dev:MediaWiki:Medals/code.js',
    ]
});