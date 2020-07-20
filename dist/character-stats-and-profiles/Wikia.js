//======================
// Cancel Edit button
//======================
 
$(function addCancel () {
  if (typeof(wgIsEditPage) != 'undefined') { 
    $('<span id="cancelbutton" class="button" style="margin-top:2px"><a id="cancelbuttontext" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF;text-decoration:none;">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

//==========
// RailWAM
//===========

window.railWAM = {logPage:"Project:WAM Log"};

//===========================================
// Makes ProfileTags override default tags
//===========================================

(window.dev = window.dev || {}).profileTags = {noHideTags: false};

//=======================================================
// Adds a Block button to button dropdown on messages
// Author: Dorumin
//=======================================================
 
if ((wgNamespaceNumber === 1201 || wgNamespaceNumber === 1200) && 
    wgUserGroups.includes("sysop")) {
        for (var i in $('.msg-toolbar')) {
            var user = $('.msg-toolbar:eq('+i+')')
                .parent()
                .find('.edited-by a')
                .text();
            $('.msg-toolbar:eq('+i+')').find('.WikiaMenuElement li')
                .last().before(
                    '<li><a href="/wiki/Special:Block/' + user + '">Block</a></li>'
            );
        }
}

//======================================================
// Mass Delete scripts.
// Intended primarily for quality control purges.
//======================================================

window.batchDeleteDelay = 2000; // 2 second interval
window.nukeDeleteReason = "Enacting quality control purge";
window.nukeDelay = 2000; // 2 second interval

importArticles({
    type: 'script',
    articles: [
        "u:dev:MediaWiki:AjaxBatchDelete.js",
        "u:dev:MediaWiki:Nuke/code.js"
    ]
});