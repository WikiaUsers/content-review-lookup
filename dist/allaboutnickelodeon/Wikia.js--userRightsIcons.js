// FOUNDER - even though it's TimmyD I'm saying it's Mpardiolo's. He helped 
    // A LOT.
 
  rights["Cotton Candy Coconut"]      = ["Most Amazing Gal Ever", "The Bitch of the Century"],
 
,

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>