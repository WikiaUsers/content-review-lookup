window.SpoilerAlert = {
    categories: "Spoiler",
};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.rows;

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
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
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

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}

addOnloadHook(createCollapseButtons);

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


/** Extra toolbar options ******************************************************
 *
 *  Description: UNDOCUMENTED
 *  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
 */

//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Superscript",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Superscript text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Subscript",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Subscript text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Small",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Small Text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
        "speedTip": "Insert hidden Comment",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Comment"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
        "speedTip": "Insert a picture gallery",
        "tagOpen": "\n<gallery>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Insert block of quoted text",
        "tagOpen": "<blockquote>\n",
        "tagClose": "\n</blockquote>",
        "sampleText": "Block quote"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Insert a table",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    };

}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});