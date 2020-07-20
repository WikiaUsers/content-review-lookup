function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    rights["CrimsonAssassin"] = ["Supreme Tribune"];
    
  // END List of Accounts Given Extra User Rights Icons

 // BEGIN rail thing
 
 $(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});

 // END rail thing