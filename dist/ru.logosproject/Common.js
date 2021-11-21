/**
* Размещаемый ниже код JavaScript применяется ко всем темам внешнего вида у всех пользователей и посетителей настольной версии вики, включая основную тему, FandomDesktop.
* Ещё для кода обеих настольной и мобильной версий вики см. MediaWiki:Global.js.
* Для кода только основной настольной версии вики (FandomDesktop) см. MediaWiki:Fandomdesktop.js.
* Для кода только старой настольной версии вики (HydraDark) см. MediaWiki:Hydradark.js.
* Для кода только основной мобильной версии вики (FandomMobile) см. MediaWiki:Mobile.js.
**/

importArticles({
type: "script",
articles: [
"u:l:MediaWiki:Fandomdesktop.js",
"u:l:MediaWiki:Functions.js",
"u:dev:MediaWiki:Discord.js", // Виджет Дискорда
"u:dev:MediaWiki:Tooltips.js", // Възплывающие подсказки
"u:dev:MediaWiki:Wikificator.js", // Викировщик
"u:dev:MediaWiki:OggPlayer.js", // Улучшенный звуковъзпроизводитель
"u:dev:MediaWiki:EditorColorPicker.js", // Светоподборщик в окне изправителя страницы
"u:dev:MediaWiki:Toggler.js",
"u:dev:MediaWiki:NewImages.js",
"u:dev:MediaWiki:StickyRailToggler.js",
"u:dev:MediaWiki:GadgetsStateToggler.js",
"u:dev:MediaWiki:DiscordIntegrator/code.js",
"u:dev:MediaWiki:AdaptiveCategoryFilter.js",
"u:dev:MediaWiki:CommunityPageHeaderLinks.js",
"u:dev:MediaWiki:InfoboxEditorPreview.js",
"u:dev:MediaWiki:MultipleActivity.js",
"u:dev:MediaWiki:CategorySorter.js",
"u:dev:MediaWiki:CustomSlider.js",
"u:dev:MediaWiki:NewPagesModule.js",
"u:dev:MediaWiki:SummaryButtonsCore.js",
"u:onepiece:MediaWiki:AddCatInPreview.js",
"u:dev:MediaWiki:RelatedDiscussionsPosts.js",
"u:dev:MediaWiki:AllPagesHideRedirect/code.js",
"u:dev:MediaWiki:SocialActivityModern.js",
"u:dev:MediaWiki:ListFiles/code.js",
"u:dev:MediaWiki:ReferencePopups/code.js",
"u:dev:MediaWiki:LinkPreview/code.js",
"u:dev:MediaWiki:SeeMoreActivityButton/code.js",
"u:dev:MediaWiki:PreloadTemplates.js",
"u:dev:MediaWiki:InputUsername/code.js",
"u:dev:MediaWiki:MassProtect/code.js",
"u:dev:MediaWiki:TopicBlockLog/code.js",
"u:dev:MediaWiki:Countdown/code.js",
"u:dev:MediaWiki:MassEdit/code.js",
"u:dev:MediaWiki:AjaxRC/code.js",
"u:dev:MediaWiki:Flags.js",
"u:dev:MediaWiki:ProfileTags.js",
"u:dev:MediaWiki:UserTags/code.js",
"u:onepiece:MediaWiki:Forum.js",
"u:onepiece:MediaWiki:CharNavFiltering.js",
"u:dev:MediaWiki:AjaxBatchDelete/code.2.js",
"u:dev:MediaWiki:AdminDashboard JS-Button/code.js",
"u:nkch:MediaWiki:Snippet/ExternalLinksInNewWindow.js",
"u:nkch:MediaWiki:Snippet/SpecificLinksInNewWindow.js",
"u:nkch:MediaWiki:ExploreMenuIcons.js"
]
});

window.tooltips_config = {
offsetX: 10,
offsetY: 15
}


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

/* Information template */
function InformationTemplate() {
if (wgPageName != ('Special:Upload' || 'Special:MultipleUpload')) { return; }
if (wgPageQuery.match(/(?=wpForReUpload%3D1)/)) { return; }
document.getElementById('wpUploadDescription').innerHTML = '{{Information\n|attention=\n|description=\n|source=\n|author=\n|filespecs=\n|licensing=\n|other versions=\n|cat artist=\n|cat subject=\n|cat type=\n}}';
document.getElementsByClassName('mw-htmlform-field-Licenses')[0].style.display='none';
document.getElementById('mw-license-preview').style.display='none';
}
addOnloadHook(InformationTemplate);

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

mw.hook('wikipage.content').add(function($content) {
if ($content.find('.today').length) {
$content.addClass('special-module');
}});