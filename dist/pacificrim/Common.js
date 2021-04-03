/* Any JavaScript here will be loaded for all users on every page load. */

/* Snow */	
//importScriptPage('MediaWiki:Snow.js'); //remove those two slashes during the holidays

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

/* InactiveUsers
 * Adds an "inactive" tag to the user pages, user talk pages, message walls and blog pages of users who haven't made an edit of any sort for some time
 * See w:c:dev:InactiveUsers for info and attribution
 */

InactiveUsers = { months: 2 };

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/CEB.js',              // Custom edit buttons
        'MediaWiki:Common.js/extraRollbacks.js',   // Extra Rollback Buttons
        'MediaWiki:Common.js/ajaxRollback.js'      // AjaxRollback - works with Extra Rollback Buttons
    ]
});

var fdButtons = [];
fdButtons[fdButtons.length] = {
    'summary': 'spam',
    'label': 'spam'
};
fdButtons[fdButtons.length] = {
    'summary': 'vandalism',
    'label': 'vandalism'
};
fdButtons[fdButtons.length] = {
    'summary': 'Fan art',
    'label': 'Fan art'
};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

function collapseTable(tableIndex) {
    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table = document.getElementById('collapsibleTable' + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.rows;

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName('table');

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], 'collapsible')) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName('tr')[0];
            if (!HeaderRow) {
                continue;
            }
            var Header = HeaderRow.getElementsByTagName('th')[0];
            if (!Header) {
                continue;
            }

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);

            var Button = document.createElement('span');
            var ButtonLink = document.createElement('a');
            var ButtonText = document.createTextNode(collapseCaption);

            Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
            ButtonLink.setAttribute('href', "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode('['));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode(']'));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], 'collapsed') || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], 'autocollapse'))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], 'innercollapse')) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, 'outercollapse')) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}

addOnloadHook(createCollapseButtons);

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

var countdownnum = 10;
var countdown10 = setInterval(function () {
    countdownnum--;
    $('#countdown10').html(countdownnum);
}, 1000);
setTimeout("clearInterval(countdown10)", 10500);

/* Add a button to edit Message Wall Greeting
 * By: [[User:Ray422]], modified by [[User:Ray422]]
 */

$(function EditGreeting() {
    if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
        if (wgTitle == wgUserName) {
            $('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:' + wgUserName + '?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
        }
    }
});