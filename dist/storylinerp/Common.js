/* Imports */
importScriptPage('CollapsibleEdittools/code.js', 'dev');
importScriptPage('DisableArchiveEdit/code.js', 'dev');
importScriptPage( 'FastDelete/code.js', 'dev');
importScriptPage( 'AjaxUndo/code.js', 'dev' );
importScriptPage('DupImageList/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('SearchGoButton/code.js', 'dev');
importScriptPage('User:Joeytje50/tabinsert.js','rs')

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'spam',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': 'vandalism',
  'label': 'vandalism'}
fdButtons[fdButtons.length] = {
  'summary': 'Fan art',
  'label': 'Fan art'}

// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback

/* Mass delete (Special:Nuke) script */
if(wgPageName == 'Storyline RP Wiki:MassDelete')
    importScript('MediaWiki:Common.js/massdelete.js');

/** Change "bureaucrat" to newGroup **/
if((wgPageName == 'User:Omega111') || (wgPageName == 'Message_Wall:Omega111') || (wgPageName == 'User_blog:Omega111') || (wgPageName == 'Special:Contributions/Omega111')) {
  $('.group').html('King');
}

/* Archive tool */

var ArchiveToolConfig = { 
   'en': {
      buttonArchiveTool: "Archive",
      buttonArchiveToolTooltip: "Archive this page",
      buttonSelectAll: "Select all",
      buttonDeselectAll: "Deselect all",
      buttonSaveArchive: "Save archive",
      buttonAbort: "Abort",
      labelLines: "Lines",
      labelSections: "Sections",
      summaryArchiveFrom: "ArchiveTool: Archiving from",
      summaryArchiveTo: "ArchiveTool: Archiving to"
   }
}

/* Auto-refresh the Recentchanges and Wikiactivity */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Added by Riley Huntley';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Tooltip script begin */
 
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
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
});
 

/* Tooltip script end */

//Facebook 'Like Box'
//Graciously (and unknowingly) provided by The Spanish 'Simspedia'
 
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=126686564044617&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}
 
$(fBox);