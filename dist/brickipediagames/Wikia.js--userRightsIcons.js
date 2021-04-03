// 13:52, November 21, 2011 (UTC)
// <source lang="JavaScript">

// WRITTEN BY USER:RAPPY_4187

$(function() {
  var rights = {};

  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // FOUNDERS

    rights["Cligra"]      = ["Gamemaster"],

    // BUREAUCRATS



    // ADMINISTRATORS

  rights["Berrybrick"]            = ["Gamemaster"],
  rights["CzechMate"]            = ["Gamemaster"],

   // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();

    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

// </source>