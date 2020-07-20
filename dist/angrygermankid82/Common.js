/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Tooltips/code.js",
        "w:c:dev:DisplayClock/code.js",
        "w:c:dev:TopEditors/code.js"
    ]
}, {
    type: "style",
    articles: [
        "w:c:hitlerparody:MediaWiki:Flags.css",
        "w:c:dev:DropdownMenu/code.css",
        "w:c:dev:FontAwesome/code.css"
    ]
});
 
// Create the "dev" namespace if it doesn't exist already:
window.dev = window.dev || {};
// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
// The options need to be set before the import! Otherwise they may not work.
importScriptPage('Standard_Edit_Summary/code.js', 'dev');
 
// SocialBlade Widget (now supports multiple tags)
$('.SocialBladeWidget').each(function() {
    var sbname=$(this).attr("data-name");
    $(this).html('<iframe class="sbframe" src="http://widget.socialblade.com/widget.php?v=2&u=' +sbname+ '" style="overflow: hidden; height: 190px; width: 180px; border: 0;" scrolling="no" frameBorder="0"></iframe>').show();
});
 
// YouTube Embed
$('.YouTube').each(function() {
   var id=$(this).attr("id");
   $(this).html('<iframe width="100%" height="100%" src="http://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>').show();
});
 
// Inactive users
$(function() {
 
    if (!$('#UserProfileMasthead').length) return;
 
    if (!parseInt($("#UserProfileMasthead .tally").text())) return;
 
    var userName  = $("#UserProfileMasthead h1").text();
 
    function ISODateNDaysAgo (days) {
        function pad (n) { return n < 10 ? '0' + n : n; }  
        function ISODateString (d) {  
            return    d.getUTCFullYear() + '-'  
                + pad(d.getUTCMonth()+1) + '-'  
                + pad(d.getUTCDate())    + 'T'  
                + pad(d.getUTCHours())   + ':'  
                + pad(d.getUTCMinutes()) + ':'  
                + pad(d.getUTCSeconds()) + 'Z';
        }
        return ISODateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
    }
 
    var apiUrl = '/api.php?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
                 '&ucuser='  + userName +
                 '&ucstart=' + ISODateNDaysAgo(0) +
                 '&ucend='   + ISODateNDaysAgo(30);
 
    $.getJSON(apiUrl, function (result) {
        if (typeof result.query != 'undefined' && typeof result.query.usercontribs != 'undefined' &&
            !result.query.usercontribs.length) {
            $('<span class="tag" style="margin-left: 5px; margin-right: 5px">INACTIVE</span>').appendTo('#UserProfileMasthead hgroup');
        }
    });
});
 
// User Tags
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  rights["AGK82"] = ["Creator of AGK82, Ex-parodist, Owner of AGK82 Wiki, Bureaucrat, Admin"],

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 5px; margin-right: 5px">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// End of User Tags