(function (window, $, mw) {
        "use strict";

        // Bulk loading scripts.
        // scriptList are scripts to load everywhere
        // pageScriptList are scripts which only certain pages need.
        var scriptList = [],
                pageScriptList = [];

                       /* Scripts to be loaded everywhere */

        // Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
        scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');

        // Configure AjaxRC
        (window.ajaxPages = (window.ajaxPages || [])).push(
                "Special:RecentChanges",
                "Special:Watchlist",
                "Special:Log",
                "Special:Contributions",
                "Special:NewFiles",
                "Special:NewPages",
                "Special:ListFiles",
                "Special:WikiActivity"
        );
        window.AjaxRCRefreshText = 'Automatically refresh every 60secs';
        window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
        scriptList.push('u:dev:AjaxRC/code.js');

        // ArchiveTool
        window.archiveListTemplate = 'ArchiveList';
        window.archivePageTemplate = 'ArchivePage';
        scriptList.push('u:dev:ArchiveTool/code.js');

        // Refresh button
        scriptList.push('u:dev:PurgeButton/code.js');

        // List Files. See [[Narutopedia:ListFiles]]
        scriptList.push('u:dev:ListFiles/code.js');

        // Sig Reminder
        scriptList.push('MediaWiki:Common.js/SigReminder.js');

        // Warnings
        scriptList.push('MediaWiki:Common.js/Warnings.js');

        // Reference Popups, like on Wikipedia
        scriptList.push('u:dev:ReferencePopups/code.js');

                            /* Page specific scripts */

        // List Duplicate images
        if (mw.config.get('wgPageName') === 'Narutopedia:Duplicate_Images') {
                pageScriptList.push('u:dev:DupImageList/code.js');
        }

        // Custom Special:[Multiple]Upload UI
        $(function ($) {
                // Detach the AJAX upload feature from the Recent Image Uploads "Add Image" button
                // because the pop-up form does not obey the preloads and such.
                $('a.wikia-button.upphotos').off('click');
        });
        if (({
                Upload: 1,
                MultipleUpload: 1
        })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
                pageScriptList.push(
                        'MediaWiki:Common.js/FairUseUpload.js',
                        'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
                );
        }


             /* Small scripts which donot need a seperate page */

        // Remove red-links (deleted pages) from Recent Changes
        // [They stay red, they just don't link to ?action=edit]
        if (({
                Recentchanges: 1,
                Log: 1
        })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
                var deNewRC = function () {
                        $('a.new').each(function () {
                                this.href = this.href.replace(/\?[^?]*$/, '');
                        });
                };
                $(deNewRC);
                window.ajaxCallAgain.push(deNewRC);
        }

        // Remove dismiss option from Site Notice
        if (mw.config.get('skin') === 'monobook') {
                $('#mw-dismissable-notice > tbody > tr > td:last').remove();
        }

        // Custom edit buttons
        if ($.isArray(window.mwCustomEditButtons)) {
                mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
                        "speedTip": "Add the ū character",
                        "tagOpen": "ū",
                        "tagClose": "",
                        "sampleText": ""
                };

                mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
                        "speedTip": "Add the ō character",
                        "tagOpen": "ō",
                        "tagClose": "",
                        "sampleText": ""
                };

                mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
                        "speedTip": "Add a Chapter Reference",
                        "tagOpen": "<ref>",
                        "tagClose": "</ref>",
                        "sampleText": "''Naruto'' chapter 0, page 0"
                };
        }

        // HOOK: Verbatim imports embedded on particular pages.
        if ($.isArray(window.pageNeededScripts)) {
                pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
                try {
                        delete window.pageNeededScripts;
                } catch (e) {
                        window.pageNeededScripts = null;
                } // IE8 sucks.
        }

        // Import all scripts in bulk (and minified)
        window.importArticles({
                type: 'script',
                articles: scriptList
        }, {
                type: 'script',
                articles: pageScriptList
        });
})(window, jQuery, mediaWiki);

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */ 
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/*Back to top*/
importScriptPage('BackToTopButton/code.js', 'dev');
 
/*Referencepopups*/
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* Dev Wiki Scripts */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});
 
// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (typeof elem.className != 'string' || !elem.className) 
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>