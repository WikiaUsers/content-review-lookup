/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
  if ( wgPageName == "User:AcerEvan/Sandbox2" ) {
    $(".test").html('<a href="javascript:void(0)">Klik aku</a>');
    $(".test").click(function() {
      $.ajax({  
        type: "POST",  
        url: "http://avatar.wikia.com/api.php?",  
        data: "action=query&prop=revisions&titles=Avatar%20Wiki&rvprop=content",
        success: function(results) { 
            $(".result").html(results);
            }
      });
    });
  }
});