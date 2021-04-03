/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

// ============================================================
// Custom edit buttons
// ============================================================

function customEditButtons() {
    if (mwCustomEditButtons) {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert text"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
            "speedTip": "Insert a table",
            "tagOpen": '{| class="wikitable"\n|-\n',
            "tagClose": "\n|}",
            "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br />",
            "tagClose": "",
            "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
            "speedTip": "Insert a picture gallery",
            "tagOpen": '\n<div align="center"><gallery>\n',
            "tagClose": "\n</gallery></div>",
            "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
        };
    }
}

if (wgAction == "edit" || wgAction == "submit") {
    addOnloadHook(customEditButtons);
}

// ============================================================
// End of Custom edit buttons
// ============================================================

// ============================================================
// Test if an element has a certain class
//
// Description: Uses regular expressions and caching for better performance.
// Maintainers: User:Mike Dillon, User:R. Koot, User:SG
// ============================================================

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// ============================================================
// End of hasClass and getElementsByClassName
// ============================================================

// =====================================================================
// Collapsible Tables
//
// Description: Allows tables to be collapsed, showing only the header.
// Reference:   [[Wikipedia:Wikipedia:NavFrame]]
//              [[Wikipedia:Help:Collapsing]]
// Maintainers: [[Wikipedia:User:R. Koot]]
//
// =====================================================================

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
    if (!Table || !Button) return false;

    var Rows = Table.getElementsByTagName("tr");

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
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
    var navBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            /* Only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;

            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            navBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontSize = "90%";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    var j = 0;
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible") && hasClass(navBoxes[i], "autocollapse")) j++;

        var h = 0;
        if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible")) h = navBoxes[i].clientHeight;
        if (h == null || h == undefined) h = 0;

        // Collapses if:
        //   1. Contains "collapsed"
        //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
        //   3. If table height > maxHeight, and contains "navbox collapsible"
        //   4. If there are "innercollapse" tables in "outercollapse" tables */
        if (hasClass(navBoxes[i], "collapsed") || (j > autoCollapse) || (h > maxHeight)) {
            collapseTable(i);
        } else if (hasClass(navBoxes[i], "innercollapse")) {
            var element = navBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, "outercollapse")) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}

addOnloadHook(createCollapseButtons);

// =====================================================================
// End of Collapsible Tables
// =====================================================================

// ============================================================
// Tooltips
// ============================================================
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    events: ['CustomEvent'],
}

/* </pre> */


/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */
 
// ============================================================
// Icons in page header from avatar.fandom.com
// ============================================================

$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: inherit; right: 0px; width: 100%' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'inherit', 'left' : '5.1em', 'bottom' : '-2em' } ).show();
}
});

// ============================================================
// LinkPreview configuration
// ============================================================
    window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
    window.pPreview.defimage = 'https://static.wikia.nocookie.net/nfs/images/1/1c/Rap_sheet.jpg/revision/latest?cb=20120422091133&path-prefix=en';
    window.pPreview.noimage = 'https://static.wikia.nocookie.net/nfs/images/1/1c/Rap_sheet.jpg/revision/latest?cb=20120422091133&path-prefix=en';
    window.pPreview.tlen = 500;
    window.pPreview.RegExp.iparents = ['.wikia-gallery'];

// ============================================================
// WAM rail
// ============================================================
window.railWAM = {
    logPage: 'Project:WAM Log',
    appendAfter: '#wikia-recent-activity',
    showLogAlert: 'false'
};

// ============================================================
// YoutubePlayer
// ============================================================
    window.YoutubePlayerDisableAutoplay = true;