EditIntroButtonText = 'Intro';

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
var ajaxRefresh = 30000;

window.UserTagsJS = {
	extensions: {},
	modules: {},
	tags: {
		tech: { u: 'Technician', title: 'This user holds Admin rights but is not a "real" administrator. If you need administrator help, you should ask someone else.', order: 0 }
	}
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};
UserTagsJS.modules.mwGroups = ['sysop', 'bannedfromchat'];
UserTagsJS.modules.custom = {
	'Lunarity': ['tech'],
	'Pecoes': ['tech']
};
UserTagsJS.extensions.technicians = {
	filter: function(groups) {
		return (groups.sysop && groups.tech) ? ['sysop'] : ['tech'];
	}
};
UserTagsJS.modules.technicians = true;

window.DisplayClockJS = {
	location: 'global',
	format: '%2d %b %Y %2H:%2M:%2S (UTC)',
	interval: 5000,
	hoverText: 'Purge the server cache and update the contents of this page.'
};

// I combined all external scripts into a single statement.
// That should increase the load speed noticeably -- pecoes
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Slider.js',
        'MediaWiki:Footer.js',
        'MediaWiki:MinifiedAudio.js',
        'w:dev:ShowHide/code.js',
        'w:dev:DisplayClock/code.js',
        'w:dev:BackToTopButton/code.js',
        'w:dev:CollapsibleEdittools/code.js',
        'w:dev:Countdown/code.js',
        'w:dev:AutoEditDropdown/code.js',
        'w:dev:PurgeButton/code.js',
        'w:dev:AjaxRC/code.js',
        'w:dev:ReferencePopups/code.js',
        'w:dev:ReferencePopups/custom.js',
        'w:dev:SpoilerAlert/code.js', // Is this actually used, doesn't it need special configuration?
        'w:dev:VisualSpellCheck/code.js',
        'w:dev:UserTags/code.js'
    ]
});

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

// Credit to Beyblade wiki.
// Adding "My Contributions" to user menu. 
// Function: Adds "My Contributions" to the UserDropdownMenu.
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
$(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_1334882127625"><param name="movie" value="http://beybladewiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334882127625&v=0&w=0"/><embed id="emb_1334882127625" src="http://beybladewiki.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334882127625&v=0&w=0"></embed></object><br>[ <a href="http://beybladewiki.chatango.com/clonegroup?ts=1334882127625">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334882127625">Start New</a> | <a href="http://beybladewiki.chatango.com">Full Size</a> ]';
  }
}
 
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

// Edits to OnTheWiki
// importScript('MediaWiki:Wikia.js/OnTheWiki.js');
// END Edits to OnTheWiki

// Custom headers for Hot Spots and Community Messages
function hotspotsheader() {	
$('.HotSpotsModule').prepend('<div align="center"><font size= "5" face="Black Chancery">Hot Spots</font></div>'); 	
}
 	
$(hotspotsheader);
 	
function communityheader() {	
$('.CommunityCornerModule').prepend('<div align="center"><font size= "5" face="Black Chancery">Community Messages</font></div>');	
}
 
$(communityheader);	
// END Custom headers for Hot Spots and Community Messages

/* Ratings/Stars widget code
      You can add more Rating-Widgets in your site,
      just pick some new rating-widget-unique-id (must be positive integer).
      For example (rating-widget-unique-id = 38):
      <div class="rw-ui-container rw-urid-38"></div>
    IMPORTANT: The number must be unique across the entire wiki. [One number = one page]
 */
jQuery(function($) {
        "use strict";

        // Disable on pages without a ratings widget, since it just crashes.
        if (!$('.rw-ui-container').length) return;

        // Async Rating-Widget initialization.
        window.RW_Async_Init = function(){
            RW.init("4893AEDA8BA1095BEEA0C43249CDD374", // WARNING: This key is wiki-specific DO NOT COPY THIS. You must generate your OWN key for each separate wiki to avoid mixing ratings together. Go to http://rating-widget.com/ and generate a user key using the "Get Widget" tool at the bottom.
            {
                advanced: {
                    star: {
                        stars: 10
                    },
                    font: {
                        color: "#000"
                    },
                    layout: {
                        align: {
                            hor: "center",
                            ver: "top"
                        },
                        dir: "ltr"
                    }
                },
                size: "medium",
                color: "yellow",
                type: "star"
            });
            RW.render();
        };

        // Append Rating-Widget JavaScript library.
        if (typeof(window.RW) === "undefined"){
            // <div class="rw-js-container"> (Part of the interface contract)
            var rw = document.createElement('div');
            rw.className = 'rw-js-container';
            var rw2 = document.createElement("script");
            rw2.type = "text/javascript";
            rw2.src = "http://js.rating-widget.com/external.min.js?t=js";
            rw.appendChild(rw2);
            document.body.appendChild(rw);
        }
});

/*Easy Dropdown Buttons - by ShermanTheMythran (special thanks to Mathmagician)*/
$('.drop-button').click(function(){
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active');
});

/* load audio player for message wall and forums */
if (1201 === wgNamespaceNumber || 2000 === wgNamespaceNumber || 'Forum' === wgCanonicalSpecialPageName) {
    $.getScript('/extensions/OggHandler/OggPlayer.js');
}

/* Template:USERNAME */
$(function () {
    $('.insertusername').text(mw.config.get('wgUserName'));
});

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});