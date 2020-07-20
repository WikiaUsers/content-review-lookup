/* Any JavaScript here will be loaded for all users on every page load.  */

/* importScriptPages-start */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('MediaWiki:Search_Fix.js', 'dantest');

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* importScriptPages-end */

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


 /* Credit goes to Saits Row Wiki */
importScript('MediaWiki:Common.js/standardeditsummaries.js'); /* standard edit summaries */

jQuery.getScript('/index.php?title=MediaWiki:Common.js/ReferenceTooltips.js&action=raw&ctype=text/javascript'); //custom ReferenceTooltips script

$(document).ready(function() { /* Run a bunch of display tweaks and fixes */
   //Change this colour to verify that your browser is loading updated js
   $('.jsupdate').css('background-color','lime');

   $('#mw-content-text > .noarticletext a').not('a[href*="action=edit"]').off('click');

   $('a.wikia-button.upphotos').off('click');

   $(".category-gallery-item-text .snippet").each( function() { //loop text items in gallery
      this.innerHTML ="<img src='https://images.wikia.nocookie.net/shingekinokyojin/images/b/b8/Policia_Militar.png' alt='No photo' style='width: 105px !important;height: 100px !important;padding: 15px 20px;'>";
      this.removeAttribute("class");
   });
$(".articleSnippet").each( function() { //loop text items in gallery
      this.innerHTML ="<img src='https://images.wikia.nocookie.net/shingekinokyojin/images/b/b8/Policia_Militar.png ' alt='No photo' style='width: 105px !important;height: 100px !important;'>";
      this.removeAttribute("class");
   });

   // Replace "Read More" with "Related Articles" See MediaWiki:Wikia.css for style
   $('.RelatedPagesModule h2').html('Related Articles'); 

   //On The Wiki additions
   $('.WikiNav ul li:first-child a[href="/wiki/Special:NewFiles"]').remove(); //Re-added below
   $('.WikiNav ul li:first-child a[href="/wiki/Special:Chat"]').remove(); //Re-added below
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:NewFiles">Photos</a></li>');
   $('.WikiNav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:Chat">Chat</a></li>');

   $("#WikiaRecentActivity li").each( function() { //add diff links to images in Recent Wiki Activity module.
      link = $("a", this)[0].getAttribute('href', 2); //get link
      image = $("img", this)[0]; //get image
//      image.src = "http://images.wikia.com/shingekinokyojin/images/b/b8/Policia_Militar.png";
      newNode = document.createElement("a"); //create anchor for image link
      newNode.innerHTML = image.outerHTML; //copy image inside anchor
      newNode.href = link+"?diff=cur"; //append diff to url
      newNode.title="show me the change on this page";
      replacedNode = this.replaceChild(newNode, image);
    });
});

/* Import analytics */
importScript('MediaWiki:Common.js/ga.js');

/* Import javascript countdown. Usage: {{countdown| date }} */
importScriptPage('MediaWiki:Common.js/javascriptcountdown.js');

/* Import displaytitle. see that page for usage */
importScriptPage('DISPLAYTITLE/code.js', 'dev');
/* Import dup image list. see that page for usage */
importScriptPage('DupImageList/code.js', 'dev');
/* add "view source" link to edit dropdown */
importScriptPage('View_Source/code.js', 'dev'); 
/* add "refresh" link to edit dropdown */
importScriptPage('PurgeButton/code.js', 'dev');
/* add "search suggestions" to search results */
importScriptPage('SearchSuggest/code.js', 'dev');
/* Replace "a wikia contributor" with IP address */
importScriptPage('RevealAnonIP/code.js', 'dev');

window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
/* automatically open edit menu on hover */
importScriptPage('AutoEditDropdown/code.js', 'dev');

/* Import custom usertags */
importScript('MediaWiki:Common.js/usertags.js');

function collapsercexpanded() {
   $(".rc-conntent span.mw-collapsible-toggle-expanded").each( function() { 
     this.click(); //collapsing expanded sections on recentchanges by default.  Wikia has been notified about this problem, but have not fixed it.
   });
}
addOnloadHook(collapsercexpanded);

// Display Timer
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'shingekinokyojin');

	

    // BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
     
    function FairUseRationale() {
            if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
                    document.getElementById('wpUploadDescription').value = '==Summary== \n{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n\n==Licensing== \n{{fairuse}}';
            }
    }
    addOnloadHook(FairUseRationale);
     
    // ****** END: JavaScript for [[Special:Upload]] ******