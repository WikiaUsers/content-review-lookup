/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
  if ( mw.config.get('wgPageName') == "User:KettleMeetPot/Sandbox2" ) {
    $(".test").html('<a href="javascript:void(0)">Click me</a>');
    $(".test").click(function() {
      $.ajax({  
        type: "GET",  
        url: "https://avatar.fandom.com/api.php?",  
        data: "action=query&prop=revisions&titles=Avatar%20Wiki&rvprop=content",
        success: function(results) { 
            $(".result").html(results);
            }
      });
    });
  }
});