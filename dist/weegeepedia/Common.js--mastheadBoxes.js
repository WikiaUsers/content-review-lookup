// <source lang="JavaScript">

// Adapted by Rappy 4187

$(function() {
  var rights = {};

  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  
    // BUREAUCRAT
  rights["TheAmazingHypneegee"]			= ["HEAD MWEEGEE"];

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();

    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

// </source>