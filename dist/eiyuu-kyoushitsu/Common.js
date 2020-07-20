/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Fair use rationale */
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
 
PurgeButtonText = 'Assassinate';
 
// ==================================================
//            Toggle
// ==================================================
/* Any JavaScript here will be loaded for all users on every page load. */
 
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
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = (elem.className + '').split(' ');  // get list of classes
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
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }
 
    if ($('#title-meta').length == 0) {
        return;
    }
 
    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}
 
 
// END JavaScript title rewrite
addOnloadHook(rewriteTitle);
 
/* UserTags from Dev Wikia */
window.UserTagsJS = {
	modules: {},
	tags: {
		benriya: { u:'Benriya'},
		threadmoderator: { u:'Thread Mod'},
		chatmoderator: { u:'Chat Mod'},
		poweruser: { u: 'Power User'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 16, // And have at least 16 edits to remove the tag
	namespace: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // Edits must be made to content namespaces to count
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global', 'poweruser'];
UserTagsJS.modules.metafilter = {
	chatmoderator: ['bureaucrat', 'sysop', 'founder'],
	rollback: ['bureaucrat', 'sysop', 'founder'],
	patroller: ['bureaucrat', 'sysop', 'founder'],
	threadmoderator: ['bureaucrat', 'sysop', 'founder']
};
UserTagsJS.modules.userfilter = {
	'Deadlytoast1695': ['bureaucrat', 'sysop']
};
UserTagsJS.modules.custom = {
	'Demotivator': ['benriya'],
};
 
window.DisplayClockJS = {
	hoverText: 'Assassinate your rivals! (i.e. refresh the page!)'
};
 
/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}
 
importArticles({
    type: 'script',
    articles: [
	"u:dev:AjaxRC/code.js", /* Auto Refresh */
	"u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
	"w:c:dev:ReferencePopups/code.js", /* References pop-up when hovered over */
	"u:dev:PurgeButton/code.js", /* Adds refresh button to page controls */
	"u:dev:ExternalImageLoader/code.js", /* Allows adding of images external to the wiki */
	"w:c:dev:Countdown/code.js", /* Creates a Countdown clock where specified */
	"w:c:dev:SignatureCheck/code.js", /* Checks users have signed their talk page replies */
	"u:dev:AllPagesHideRedirect/code.js",
	"w:c:dev:UserTags/code.js", /* Enables customisable User Tags */
	"u:dev:DisplayClock/code.js", /* Displays clock on wiki */
	"u:dev:AjaxBatchDelete/code.2.js", /* Enables deleting of multiple pages */
	"u:dev:OasisToolbarButtons/code.js",
	"u:dev:PortableCSSPad/code.js",
	"w:c:dev:Highlight/code.css",
	"w:c:dev:AutoEditDropdown/code.js", /* Causes the drop down menus for edit buttons to automatically appear */
	"MediaWiki:Common.js/displayTimer.js",
	"MediaWiki:Common.js/Toggler.js"
    ]
});
 
// BEGIN ping function
var a = 0;
for(i=0;i<document.getElementsByClassName('msg-body').length-1;i++) {
while(a<document.getElementsByClassName('msg-body')[i].getElementsByTagName('p').length-1) {
if(document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.search('@username')>-1) {
// stuff
}
a += 1;
}
a = 0;
}
document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split('@')[1].split(' ')[0];
document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ')[document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ').indexOf('@username')];
document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ')[document.getElementsByClassName('msg-body')[i].getElementsByTagName('p')[a].innerHTML.split(' ').indexOf('@username')].split('@')[1];
// END ping function