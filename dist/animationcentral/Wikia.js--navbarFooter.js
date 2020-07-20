// 07:33, January 2, 2012 (UTC)
// <source lang="JavaScript">

// Navigation bar at the bottom of WikiaPage
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$('#WikiaPage .WikiaPageContentWrapper').append('<footer id="navbar" style="margin-bottom:20px;"><table style="width: 990px; margin: 0 auto; border:1px solid #000080;"><tr style="vertical-align:middle; padding:5px;"><td style="padding:5px;"><b style="font-weight:bold;">External&nbsp;links:</b>&nbsp;<a href="http://en.wikipedia.org/wiki/Main_Page">Wikipedia</a></td><th style="padding:5px;">Social Media:</th><td><div class="g-plusone" data-size="small" data-annotation="bubble" data-href="http://animtioncentral.wikia.com/wiki/Animtion_Central_Wiki"></div></td><td><div class="fb_root"></div><div class="fb-like" data-href=" http://www.facebook.com/pages/Animation-Central-Wiki/173120572810417?ref=tn_tnmn " data-send="true" data-layout="button_count" data-width="450" data-show-faces="false" data-action="recommend" data-font="trebuchet ms"></div></td><td align="right"><a class="twitter-follow-button" href="https://twitter.com/A.C.W." data-show-count="false">Follow ATW</a></td></tr></table></footer>');
// END Navigation bar at the bottom of WikiaPage

// </source>