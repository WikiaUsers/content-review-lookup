/* Any JavaScript here will be loaded for all users on every page load. */

/* Countdown Timer */
importScriptPage('Countdown/code.js', 'dev');


/* Twitter button template */
$(document).ready(function() {
   $(".twitterbutton").html("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-lang=\"en\">Share this page</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=\"//platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>");
});
/* Twitter button template */