/* Any JavaScript here will be loaded for all users on every page load. */

/* Username inserts for the Player template; source: KHWiki.com */
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') == null) return;
    $('span.insertusername').each(function () {
        $(this).text(mw.config.get('wgUserName'));
    });
}
$(UserNameReplace);

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[hide]';
var NavigationBarShow = '[show]';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) { return false; }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for ( var i = 0; NavFrame = divs[i]; i++ ) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }

            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for ( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook(createNavigationBarToggleButton);

/** Extra toolbar options ******************************************************
 *
 *  Description: UNDOCUMENTED
 *  Maintainers: [[wikipedia:User:MarkS]]?, [[wikipedia:User:Voice of All]], [[wikipedia:User:R. Koot]]
 */

//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Superscript",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Superscript text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Subscript",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Subscript text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Small",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Small Text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
        "speedTip": "Insert hidden Comment",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Comment"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
        "speedTip": "Insert a picture gallery",
        "tagOpen": "\n<gallery>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Insert block of quoted text",
        "tagOpen": "<blockquote>\n",
        "tagClose": "\n</blockquote>",
        "sampleText": "Block quote"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Insert a table",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Insert a reference",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Insert footnote text here"
    };
}

/** "Technical restrictions" title fix *****************************************
 *
 * Description:
 * Maintainers: wikipedia:User:Interiot, wikipedia:User:Mets501, wikipedia:User:Freakofnurture
 */
//
// For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
// (for instance iPod's title is updated. But [[C#]] is not an equivalent
// wikilink, so [[C Sharp]] doesn't have its main title changed)
// Likewise for users who have selected the U.K. date format ("1 March") the  
// titles of day-of-the-year articles will appear in that style. Users with any
// other date setting are not affected.
//
// The function looks for a banner like this: 
// &lt;div id="RealTitleBanner"&gt;  ... &lt;span id="RealTitle"&gt;title&lt;/span&gt; ... &lt;/div&gt;
// An element with id=DisableRealTitle disables the function.
//
var disableRealTitle = 0; // users can set disableRealTitle = 1 locally to disable.
if (wgIsArticle) { // don't display the RealTitle when editing, since it is apparently inconsistent (doesn't show when editing sections, doesn't show when not previewing)
    addOnloadHook(function() {
        try {
            var realTitleBanner = document.getElementById("RealTitleBanner");
            if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
                var realTitle = document.getElementById("RealTitle");
                if (realTitle) {
                    var realTitleHTML = realTitle.innerHTML;
                    realTitleText = pickUpText(realTitle);

                    var isPasteable = 0;
                    //var containsHTML = /</.test(realTitleHTML);    // contains ANY HTML
                    var containsTooMuchHTML = /</.test(realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "")); // contains HTML that will be ignored when cut-n-pasted as a wikilink
                    // calculate whether the title is pasteable
                    var verifyTitle = realTitleText.replace(/^ +/, ""); // trim left spaces
                    verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length); // uppercase first character

                    // if the namespace prefix is there, remove it on our verification copy. If it isn't there, add it to the original realValue copy.
                    if (wgNamespaceNumber != 0) {
                        if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
                            verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
                        } else {
                            realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText;
                            realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;
                        }
                    }

                    // verify whether wgTitle matches
                    verifyTitle = verifyTitle.replace(/[\s_]+/g, " "); // underscores and multiple spaces to single spaces
                    verifyTitle = verifyTitle.replace(/^\s+/, "").replace(/\s+$/, ""); // trim left and right spaces
                    verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length); // uppercase first character
                    if ((verifyTitle == wgTitle) || (verifyTitle == wgTitle.replace(/^(.+)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+([12]?[0-9]|3[0123])([^\d].*)?$/g, "$1$3 $2$4"))) isPasteable = 1;
                    var h1 = document.getElementsByTagName("h1")[0];
                    if (h1 && isPasteable) {
                        h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
                        if (!containsTooMuchHTML)
                            realTitleBanner.style.display = "none";
                    }
                    document.title = realTitleText + " - Wikipedia, the free encyclopedia";
                }
            }
        } catch (e) {
            /* Something went wrong. */
        }
    });
}

// similar to innerHTML, but only returns the text portions of the insides, excludes HTML
function pickUpText(aParentElement) {
    var str = "";

    function pickUpTextInternal(aElement) {
        var child = aElement.firstChild;
        while (child) {
            if (child.nodeType == 1) // ELEMENT_NODE 
                pickUpTextInternal(child);
            else if (child.nodeType == 3) // TEXT_NODE
                str += child.nodeValue;

            child = child.nextSibling;
        }
    }

    pickUpTextInternal(aParentElement);
    return str;
}

//fix edit summary prompt for undo
//this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the
//edit summary unchanged
//this was added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]]
addOnloadHook(function() {
    if (document.location.search.indexOf("undo=") != -1 &&
        document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value = '1';
    }
});

/** Add dismiss button to watchlist-message *************************************
 *
 *  Description: Hide the watchlist message for one week.
 *  Maintainers: [[wikipedia:User:Ruud Koot|Ruud Koot]]
 */

function addDismissButton() {
    var watchlistMessage = document.getElementById("watchlist-message");
    if (watchlistMessage == null) return;
    var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig, '');

    if (document.cookie.indexOf("hidewatchlistmessage-" + watchlistCookieID + "=yes") != -1) {
        watchlistMessage.style.display = "none";
    }

    var Button = document.createElement("span");
    var ButtonLink = document.createElement("a");
    var ButtonText = document.createTextNode("dismiss");

    ButtonLink.setAttribute("id", "dismissButton");
    ButtonLink.setAttribute("href", "javascript:dismissWatchlistMessage();");
    ButtonLink.setAttribute("title", "Hide this message for one week");
    ButtonLink.appendChild(ButtonText);

    Button.appendChild(document.createTextNode("["));
    Button.appendChild(ButtonLink);
    Button.appendChild(document.createTextNode("]"));

    watchlistMessage.appendChild(Button);
}

function dismissWatchlistMessage() {
    var e = new Date();
    e.setTime(e.getTime() + (7 * 24 * 60 * 60 * 1000));
    var watchlistMessage = document.getElementById("watchlist-message");
    var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig, '');
    document.cookie = "hidewatchlistmessage-" + watchlistCookieID + "=yes; expires=" + e.toGMTString() + "; path=/";
    watchlistMessage.style.display = "none";
}

addOnloadHook(addDismissButton);

/** WikiMiniAtlas *******************************************************
 *
 *  Description: WikiMiniAtlas is a popup click and drag world map.
 *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *               The script itself is located on meta because it is used by many projects.
 *               See [[Meta:WikiMiniAtlas]] for more information. 
 *  Created by: [[wikipedia:User:Dschwen]]
 */
var wgNoticeProject = wgPageContentLanguage;

importScriptURI('https://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js');

// ******************************************************START Quick Preview
function addQPreviewButton() {
    if (wgAction == 'edit' || wgAction == 'submit') {

        if (!window.qPreviewName) qPreviewName = 'QPreview';
        var accesskey = window.qPreviewKey || '';
        if (window.qPreviewAtBottom)
            addSystemButton(qPreviewName, qPreview, 'btnQPreview', 'Quick Preview', accesskey);
        else
            addToolbarButton(qPreviewName, qPreview, 'btnQPreview', 'Quick Preview', accesskey);
    }
}

function qPreview() {
    var divPreview = document.getElementById('wikiPreview');
    if (!divPreview) return;
    var btnQPreview = document.getElementById('btnQPreview');
    var btnWidth = Math.max(btnQPreview.scrollWidth, btnQPreview.offsetWidth);
    if (btnQPreview) btnQPreview.value = window.qPreviewWait || 'Wait...';
    btnQPreview.style.width = btnWidth + 'px';
    a = sajax_init_object();
    a.open('POST', document.editform.action + '&live', true);
    var Boundary = '--------p1415';
    a.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + Boundary);
    var PostData = '--' + Boundary +
        '\nContent-Disposition: form-data; name="wpTextbox1"\n\n' +
        document.getElementById('wpTextbox1').value + '\n--' + Boundary;
    if (a.overrideMimeType) a.overrideMimeType('text/html');
    a.send(PostData);
    a.onreadystatechange = function() {
        if (a.readyState != 4) return;
        var html = a.responseText;
        html = html.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&apos;/g, "'");
        divPreview.innerHTML = html;
        if (btnQPreview) btnQPreview.value = qPreviewName;
    };
}

function addSystemButton(name, onclick, id, tooltip, accesskey) {
    var wpPreview = document.getElementById('wpPreview');
    if (!wpPreview) return;
    var btn = document.createElement('input');
    btn.type = 'button';
    if (name) btn.value = name;
    if (onclick) btn.onclick = onclick;
    if (id) btn.id = id;
    if (tooltip) btn.title = tooltip;
    if (accesskey) {
        btn.accessKey = accesskey;
        btn.title += ' [' + tooltipAccessKeyPrefix + btn.accessKey + ']';
    }
    wpPreview.parentNode.insertBefore(btn, wpPreview);
    return btn;
}

function addToolbarButton(name, onclick, id, tooltip, accesskey) {
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return;
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.style.background = '#adbede';
    btn.style.height = '22px';
    btn.style.verticalAlign = 'middle';
    if (name) btn.value = name;
    if (onclick) btn.onclick = onclick;
    if (id) btn.id = id;
    if (tooltip) btn.title = tooltip;
    if (accesskey) btn.accessKey = accesskey;
    toolbar.appendChild(btn);
    return btn;
}
// ******************************************************END Quick Preview