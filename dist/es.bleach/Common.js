importArticles({
    type: "script",
    articles: [
        "u:dev:WikiaNotification/code.js",
        "MediaWiki:Chat.js",
        "u:dev:ShowHide/code.js",
        "MediaWiki:Common.js/switch.js",
        "u:dev:ShowHide/code.js",
        "u:dev:TwittWidget/code.js",
        "u:dev:ReferencePopups/code.js"
    ]
});

/* Facebook */
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>