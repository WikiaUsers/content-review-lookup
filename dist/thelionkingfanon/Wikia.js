// <source lang="JavaScript">  

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS  

function addMastheadTags() {
  var   rights  = {},
        user    = "";

  // BEGIN List of Accounts Given Extra User Rights Icons


  rights["Nala15"]          = ["The Great Queen of the Past", "Inactive"];

  // END List of Accounts Given Extra User Rights Icons  

  // BEGIN Script to Remove Old Rights Icons & Insert New  

  if (wgCanonicalSpecialPageName == "Contributions") {
    user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
  } else {
    user = wgTitle;
  }

  if (typeof rights[user] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for (var i = 0, len = rights[user].length; i < len; i++) {
      // add new rights 
      $('<span class="tag" span style="margin-left: 10px !important">' +
        rights[user][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
  // END Script to Remove Old Rights Icons & Insert New  
}

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS


// </source>End

/*** AJAX Auto-refresh on wiki activity ****************************/
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh this page',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:NewFiles' );
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}