/* Any JavaScript here will be loaded for all users on every page load. */
/* If you don't know what you are doing, do not edit this page */
/* <pre> */

// ************
// Easy-add CVU
// ************
// Courtesy of Megan
// importScriptPage('User:Cakemix/QCVUAdder.js', 'callofduty');


// *********
// IRC Login Fixed by Megan (Now stops f***ing loading on every page)
// *********
$(document).ready(function () {
    if ($('#IRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-cod&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
    if ($('#CVNIRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-cod&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
    if ($('#CoDferenceIRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#CoDferenceIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=codference&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
});


// *************************
// Template:Game positioning
// *************************
// credit to Fallout wiki

$(function addTitleIcons() {
    if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
        var insertTarget;

        switch (skin) {
        case 'monobook':
            insertTarget = $('#firstHeading');
            break;
        case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
        case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
                insertTarget = $('#WikiaArticle');
            }
                break;
        }

        if (insertTarget) {
		$('#gametemplate').css('display', 'block').prependTo(insertTarget);
        }
    }
});

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************

if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}

// *****************************************************************************************
// Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// Maintainer: Cacycle
// *****************************************************************************************
 if (wgArticleId == 0 && wgUserName) {
    var slash = wgPageName.indexOf('/');
    var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
    var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
    var ext = null;
    if (norm == test + 'js') ext = 'js';
    else if (norm == test + 'css') ext = 'css';
    if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + ext);
}
    

// ***************************************
// Ajax-refresh (code from pcj of WoWWiki)
// ***************************************
window.ajaxPages = [
    "Special:Log",
    "Special:Contributions",
    "Special:AbuseLog"
];
window.AjaxRCRefreshText = 'Auto-Refresh';

// *********************************************
// Page background changer (courtesy of Megan)
// *********************************************

$(function BgImage() {
    if ($('#BgImage').text().length > 3 && ($('#BgImage').text().match("(((http://www)|(http://)|(www))[-a-zA-Z0-9@:%_\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)"))) {
        $('#BgImage').hide();
         $('body').css("background-image", "url(" + $('#BgImage').text() + ") !important").css("backgroundPosition", "top center").css("backgroundRepeat", "no-repeat").css("background", "none");
    }
});



/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/

$(function () {
    if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
        var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
        then = new String(then.match(/\d{8}/));
        var monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var year = then.match(/^\d{4}/);
        var month = then.substring(4, 6);
        var now = new Date();
        month--;
        month = monthnames[month];
        var day = then.match(/\d{2}$/);
        then = new Date(month + '' + day + ', ' + year);
        var old = parseInt(now - then);
        old = Math.floor(old / (1000 * 60 * 60 * 24));
        if (old > 30) {
            $('#article-comm-form').attr('disabled', 'disabled');
            $('#article-comm').attr('disabled', 'disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
            $('#article-comm-submit').attr('disabled', 'disabled');
            $('.article-comm-reply .wikia-button .secondary').remove();
        }
    }
});

$('a:contains(An Anonymous user)').append(function(){return ' (' + this.href.match(/(\d{1,3}\.){3}\d{1,3}/)[0] + ')'})

/*A tabber redirect to allow linking to a tabber*/

(function ($) {
    var hash = window.location.hash.replace('#', '').replace(/_/g, ' ');
    if (hash === '') return;
    $(function() {
        setTimeout(function() {
            var currentTabber = $('.tabbernav > li > a[title^="' + hash + '"]');
            if (currentTabber.length) currentTabber.click();
        }, 100);
    });    
})(jQuery);

/* MapsExtended global config */
window.mapsExtendedConfig = 
{
    "minimalLayout": true,
    "enableSidebar": true,
};


/* MapsExtended local config */
window.mapsExtendedConfigs = 
{
	"ConfigTesting":
    	{
    		"minimalLayout": true,
    		"enableSidebar": true,
    		"sidebarBehaviour": "autoInitial",
    		"sidebarInitialState": "show",
    		"iconAnchor": "center",
    		"enableSearch": true,
    		"openPopupsOnHover": false,
			"useCustomPopups": true,
    		"enableTooltips": true,
    		"enableFullscreen": true,
    		"fullscreenMode": "window",
    		"mapControls": [
			                ["zoom", "fullscreen"],
			                ["edit"]
			               ],
			"sortMarkers": "category",
			"disabledCategories": ["settings"],
			"categoryGroups": 
			    [
			    	{
			        	"label": "Intel",
			        	"children": 
			            	[
			                	"audio_deadbolt",
			                	"audio_terminus",
			                	"radio",
			                	"documents"
			            	]
			    	},
			    	{
			    		"label": "Portals",
			    		"children":
			    			[
			    				"portal",	
			    				"portal_exit",
			    			]
			    	
			    	},
			    	{
			    		"label": "Misc.",
			    		"children":
			    			[
			    				"harvester",
			    				"doghouse"
			    			]
			    	}
			   	]
		}
};