importScriptPage('Countdown/code.js', 'dev');

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );

/* Custom edit buttons
See http://help.wikia.com/wiki/Help:Custom_edit_buttons
 */
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
     "speedTip": "List",
     "tagOpen": "\n* ",
     "tagClose": "\n* Element B\n* Element C",
     "sampleText": "Element A"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
     "speedTip": "Numbering",
     "tagOpen": "\n# ",
     "tagClose": "\n# Element 2\n# Element 3",
     "sampleText": "Element 1"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png",
     "speedTip": "Blockquote",
     "tagOpen": "<blockquote>",
     "tagClose": "</blockquote>",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Note",
     "tagOpen": "{{Info|Insert title|",
     "tagClose": "}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Category",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": "Category name"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
     "speedTip": "Picture gallery",
     "tagOpen": "\n<gallery>\nImage:",
     "tagClose": "|[[The Sims Wiki]] Logo\nImage:Wiki.png|[[The Sims Wiki]] Logo\nImage:Wiki.png|Eine [[The Sims Wiki]] Logo\n<\/gallery>",
     "sampleText": "Wiki.png"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Template",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Template"};
  }

/** Hiding things with JS ******
  *
  * This should only be used when necessary. You can also use CSS hiding, but must also be used when necessary.
*/

 function hideObjects() {
   if(skin=='oasis'){
     $('#WikiaArticle .jshidden').hide();
   } else if( skin=='monobook' ) {
     $('#bodyContent .jshidden').hide();
   }
 }

 addOnloadHook( hideObjects );

/* MOS Box */
importScript('MediaWiki:Common.js/mosbox.js');

/* Display clock in header */
importScript('MediaWiki:Common.js/DisplayTimer.js');


 
// Adding "My Contributions" to user menu. Ask me to remove if needed.
// Function: Adds "My Contributions" to the UserDropdownMenu.
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_0010000029865334382"><param name="movie" value="http://robloxgameswikia.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid0010000029865334382&v=0&w=0"/><embed id="emb_0010000029865334382" src="http://robloxgameswikia.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid0010000029865334382&v=0&w=0"></embed></object><br>[ <a href="http://robloxgameswikia.chatango.com/clonegroup?ts=0010000029865334382">Copy this</a> | <a href="http://chatango.com/creategroup?ts=0010000029865334382">Start New</a> | <a href="http://robloxgameswikia.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}



//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://assassinscreed.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );
 

/* Add timer to nav bar */
importScriptPage('MediaWiki:Common.js/displayTimer.js');

//From Admin tools Wiki
// Redesign of ProfileMastheads (included for statustop)
importScript('MediaWiki:Common.js/profileRedesign.js');
// END Redesign of ProfileMastheads

/* Auto updating recent changes opt-in */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');



$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');
importArticles({type: 'script', articles:'u:dev:FloatingToc/code.js'});

/* Any JavaScript here will be loaded for all users on every page load. */

// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================

// RevealAnonIP

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,
};

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

// ==============================


// ==============================
// Reveal Anon Users
// ==============================
importArticles({
    type: "script",
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js',
    ]
});

// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});

// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================

// ===========================================
// Message Wall Tags (Part 1)
// ===========================================
window.MessageWallUserTags = {
    tagColor: 'DeepPink',
    glow: true,
    glowSize: '15px',
    glowColor: '#ff89b8',
    users: {
        'MaintenanceRequired': 'Bureaucrat',
    }
};
 
// ================================================================
// Username tags additions/filters (Working as intended)
// ================================================================

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
                newuser: { u:'Unconfirmed'},
                staff: {u:'ROBLOX Staff'},
                editor: {u:'Editor'},
                obc: {u:'Paid OBC'},
                tbc: {u:'Paid TBC'},
                bc: {u:'Paid BC'},
                famous: {u:'Known'},
                maintenance: {u:'Founder'},
	}
};

UserTagsJS.modules.custom = {
	'MaintenanceRequired': ['maintenance', 'bureaucrat', 'editor'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat'], }
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
	days: 7, // Must have been on the Wiki for 3 days
	edits: 20, // And have at least 10 edits to remove the tag
	namespace: 5 // Edits must be made to articles to count
};

UserTagsJS.modules.userfilter = {
};

// ===================
// Icons (Part 2)
// ===================
// Message wall icons
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/MaintenanceRequired/g)) {
            $(this).addClass('founder');
        }
    });
}, 1);
 
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'Indigo', //Glow color
    users: {
        'MaintenanceRequired': 'Bureaucrat',

    }
};


//===================================================================