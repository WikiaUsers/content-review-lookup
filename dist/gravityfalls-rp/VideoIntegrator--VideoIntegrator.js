
//<syntaxhighlight lang="javascript">
$(function(){
   var spans = document.getElementsByTagName("span");
   outerLoop:
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
        switch (spans[index].className) {
            case "Metacafe":
                spans[index].innerHTML = '<iframe width="560" height="315" src="http://www.metacafe.com/embed/' + spans[index].getAttribute("data-widget-id") + '/" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "HaganTube":
                spans[index].innerHTML = '<iframe width="640" height="360" src="http://hagantube.diamandahagan.com/embed/' + spans[index].getAttribute("data-widget-id") + '" frameborder="0" allowfullscreen="true" seamless="true"></iframe>';
                break outerLoop;
            case "Crackle":
                spans[index].innerHTML = '<object width="640" height="360" type="application/x-shockwave-flash" data="http://legacyweb-us.crackle.com/flash/ReferrerRedirect.ashx"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="flashvars" value="rootURL=http%3A%2F%2Flegacyweb-us.crackle.com&amp;id=' + spans[index].getAttribute("data-widget-id") + '"></object>';
                break outerLoop;
            case "Facebook":
                spans[index].innerHTML = '<iframe src="https://www.facebook.com/video/embed?video_id=' + spans[index].getAttribute("data-widget-id") + '" frameborder="0" style="display: inline-block; height: inherit; width: inherit;"></iframe>' ;
                break outerLoop;
            case "Vine":
                spans[index].innerHTML = '<iframe src="https://vine.co/v/' + spans[index].getAttribute("data-widget-id") + '/embed/simple" style="width: inherit; height: inherit;"></iframe>';
                break outerLoop;
            case "afreeca":
                spans[index].innerHTML = '<iframe src="http://play.afreeca.com/' + spans[index].getAttribute("data-widget-id") + '/embed" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "internetArchive":
                spans[index].innerHTML = '<iframe src="https://archive.org/embed/' + spans[index].getAttribute("data-widget-id") + '" style="width: inherit; height: inherit;" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "YahooTV":
                spans[index].innerHTML = "<iframe style='width: inherit; height: inherit;' frameborder='0' src='https://www.yahoo.com/tv/v/" + spans[index].getAttribute("data-widget-id") + "?format=embed' allowfullscreen='true' allowtransparency='true'></iframe>";
                break outerLoop;
            case "WikimediaCommons":
                spans[index].innerHTML = '<iframe src="https://commons.wikimedia.org/wiki/File%3A' + spans[index].getAttribute("data-widget-id") + '?embedplayer=yes" style="width: inherit; height: inherit;" frameborder="0" ></iframe>';
                break outerLoop;
            case "funnyordie":
                spans[index].innerHTML = '<iframe src="https://www.funnyordie.com/embed/' + spans[index].getAttribute("data-widget-id") + '" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "TwitchStream":
                spans[index].innerHTML = '<iframe src="https://player.twitch.tv/?channel=' + spans[index].getAttribute("data-widget-id") + '" frameborder="0" scrolling="no" height="378" width="620"></iframe>'
                break outerLoop;
            default:
                break outerLoop;
        }
      }
   }
});
//</syntaxhighlight>