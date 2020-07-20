/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
                'janitor': { u:'Janitor' },
                'inactive-admin': { u:'Inactive Admin', order: -1/0 },
                'inactive-crat': { u:'Inactive Bureaucrat', order: -1/0 },
                'lsofmankind': { u:'Last Hope of Mankind', order: -1/0 }
        }
};
UserTagsJS.modules.custom = {
        'JayBaee': ['lsofmankind'],
        'TheInfected': ['lsofmankind'],
        'Pops Capo': ['lsofmankind']
};
UserTagsJS.modules.inactive = 40
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback: ['sysop', 'bureaucrat', 'founder']
};
UserTagsJS.modules.implode = {
        'inactive-admin': ['sysop', 'inactive'],
        'inactive-crat': ['bureaucrat', 'inactive']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/custom.js',
        // ...
    ]
});

// Tooltip code written by Pcj

var $tfb;
 
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
  if(skin=='oasis') { var BC = '#WikiaArticle'; }
  else { var BC = '#bodyContent'; }
 
  $(BC).mouseover(hideTip);
  $(BC).append('<div id="tfb" class="htt"></div>');
  $tfb = $("#tfb");
  $(BC + " span.ajaxttlink").each(bindTT);
});

importScriptPage('ShowHide/code.js', 'dev');

if(wgPageName === "Message_Wall:GasmaskMerc_Bot") {
	$('.Wall').remove();
}

importArticles({
    type: "script",
    articles: [
        "u:dev:ListFiles/code.js" // ListFiles from Dev Wiki
    ]
});

window.SpoilerAlertJS = {
    question: 'This page contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};