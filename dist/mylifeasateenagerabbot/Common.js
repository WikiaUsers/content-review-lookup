/* Any JavaScript here will be loaded for all users on every page load. */
// *************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// *************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = '';
    } else {
        var tpm = '';
    }
 
    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

/* Blogs template */
function InformationTemplate() {
	if (wgPageName != ('Special:Upload' || 'Special:MultipleUpload')) { return; }
	if (wgPageQuery.match(/(?=wpForReUpload%3D1)/)) { return; }
	document.getElementById('wpUploadDescription').innerHTML = '{{Information\n|attention=\n|description=\n|source=\n|author=\n|filespecs=\n|licensing=\n|other versions=\n|cat artist=\n|cat subject=\n|cat type=\n}}';
	document.getElementsByClassName('mw-htmlform-field-Licenses')[0].style.display='none';
	document.getElementById('mw-license-preview').style.display='none';
}
addOnloadHook(BlogsTemplate);

/* Toolbar buttons */
/* function ToolbarButtons() {
	if (!wgPageQuery.match(/(?=action%3Dedit)/)) { return; }
	if (!document.getElementById('toolbar')) { return; }
	document.getElementById('mw-editbutton-wmu').style.display='none';
	document.getElementById('mw-editbutton-wpg').style.display='none';
	document.getElementById('mw-editbutton-vet').style.display='none';
	document.getElementById('toolbar').innerHTML=document.getElementById('toolbar').innerHTML+'<a href=\"wiki\/Special:Upload\" target=\"_blank\"><img id=\"mw-editbutton-wmu2\" class=\"mw-toolbar-editbutton\" width=\"23\" height=\"22\" border=\"0\" src=\"http:\/\/images.wikia.com\/common\/__cb37460\/extensions\/wikia\/WikiaMiniUpload\/images\/button_wmu.png\" alt=\"Upload a file\" title=\"Upload a file\" style=\"cursor: pointer;\"></a><a href=\"wiki\/Special:MultipleUpload\" target=\"_blank\"><img id=\"mw-editbutton-wmu3\" class=\"mw-toolbar-editbutton\" width=\"23\" height=\"22\" border=\"0\" src=\"http:\/\/images.wikia.com\/common\/__cb37460\/extensions\/wikia\/WikiaPhotoGallery\/images\/gallery_add.png\" alt=\"Upload multiple files\" title=\"Upload multiple files\" style=\"cursor: pointer;\"></a>';
}
addOnloadHook(ToolbarButtons); */

// ***************************************
// Ajax-refresh (code from pcj of WoWWiki)
// ***************************************
var ajaxPages = ["Special:WikiActivity", "Special:RecentChanges", "Special:Log", "Special:Contributions", "Special:AbuseLog"];
var AjaxRCRefreshText = 'Auto-Refresh';

$(function() {
	var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-homefront&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
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

// Add Popup Script
// commented out due to non-permissible User namespace import
// importScriptPage('User:Jgjake2/js/Popups.js', 'deadisland');

/* User Tags */
window.UserTagsJS = {
	modules: {
		inactive: 90,
		mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
		autoconfirmed: false,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,},
    tags: {
		yf: { u: 'flippy the killer', order: 2 },
	}
};
 
UserTagsJS.modules.custom = {
	'Yong feng': ['yf'],
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
}
/**** Custom user tags ****/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
window.archiveListTemplate = 'Archive';

//Handling new navbox by @Luma.dash
window.setTimeout(function() {
var $container = $('.navb'), $imgBox = $('#contain');
if ($container) {
    $container.each(function() {
	    $(this).find('.desc').css({
        'border-top': '4px solid ' + $(this).css('border-left-color'),
    });
	});
}
if ($imgBox) 
    $('#contain img').css('object-fit', 'contain');
}, 1000);

function cbck (mutations) {
var $regular = $('.navb .wds-tab__content.wds-is-current').not(':has(.wds-tab__content.wds-is-current)');
$regular.css('grid-template-columns', '1fr 1fr 1fr 1fr');
$regular.css('justify-items', 'center');
}
$(function() {
	var tracked = document.querySelectorAll('.navb .tabber.wds-tabber');
	if (tracked !== null) {
		var observer = new MutationObserver(cbck);
		var options = {
		childList: true,
		subtree: true, 
		attributeFilter: ["class"]
		}
	Array.from(tracked).forEach(function(ele){
		observer.observe(ele, options);
	});
	}
});

/**** End of new navbox handling ****/

window.InactiveUsers = {
	 months: 4, 
	 text: 'Inactive',
};

//Quote color auto-set 
$(function() {
if ($('.portable-infobox .pi-secondary-background').length > 0) {
	$(':root').css('--lquote-color', $('.portable-infobox .pi-secondary-background').css('background-color')); //set css variable to our custom accent color
}
else 
	return;
});

/*Handling content moderator FANDOM badges to match our color by @Luma.dash*/
function callback(mutations) { //handle content moderator badge color
$('span[title="Content Moderator"] svg path:first-child').attr('fill', '#ce2029');	
}
$(function() {
var namespace = mw.config.get('wgCanonicalNamespace');
if (namespace == "User_blog" || namespace == "Message_Wall") {
	var observer = new MutationObserver(callback);
	var Comm;
	if (namespace == "User_blog") { //in case it is a user blog
		Comm = document.querySelector('#articleComments');
	}
	else if (namespace == "Message_Wall") { //in case it is a message wall
	Comm = document.querySelector('#MessageWall');
	}
var option = {
	childList: true, 
	subtree: true
};
observer.observe(Comm, option);
}
});
window.discussionsModuleConfig = {
	'size' : 'number 3-6',
	'mostrecent' : 'true/false',
	'catid' : [
		'first category id',
		'second category id',
		'etc.'
	]
}