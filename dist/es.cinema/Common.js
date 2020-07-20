batchDeleteDelay = 1000;
importScriptPage('MediaWiki:AjaxBatchDelete/code.2.js', 'dev');

//<syntaxhighlight lang="javascript">
$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
        outerLoop:
        switch (spans[index].className) {
            case "Metacafe":
                spans[index].innerHTML = '<iframe width="560" height="315" src="http://www.metacafe.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "HaganTube":
                spans[index].innerHTML = '<iframe width="640" height="360" src="http://hagantube.diamandahagan.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" allowfullscreen="true" seamless="true"></iframe>';
                break outerLoop;
            case "Crackle":
                spans[index].innerHTML = '<object width="640" height="360" type="application/x-shockwave-flash" data="http://legacyweb-us.crackle.com/flash/ReferrerRedirect.ashx"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="flashvars" value="rootURL=http%3A%2F%2Flegacyweb-us.crackle.com&amp;id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></object>';
                break outerLoop;
            case "Facebook":
                spans[index].innerHTML = '<iframe src="https://www.facebook.com/video/embed?video_id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" style="display: inline-block; height: inherit; width: inherit;"></iframe>' ;
                break outerLoop;
            case "Vine":
                spans[index].innerHTML = '<iframe src="https://vine.co/v/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/embed/simple" style="width: inherit; height: inherit;"></iframe>';
                break outerLoop;
            case "afreeca":
                spans[index].innerHTML = '<iframe src="http://play.afreeca.com/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/embed" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "internetArchive":
                spans[index].innerHTML = '<iframe src="https://archive.org/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" style="width: inherit; height: inherit;" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "YahooTV":
                spans[index].innerHTML = "<iframe style='width: inherit; height: inherit;' frameborder='0' src='https://www.yahoo.com/tv/v/" + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + "?format=embed' allowfullscreen='true' allowtransparency='true'></iframe>";
                break outerLoop;
            case "WikimediaCommons":
                spans[index].innerHTML = '<iframe src="https://commons.wikimedia.org/wiki/File%3A' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '?embedplayer=yes" style="width: inherit; height: inherit;" frameborder="0" ></iframe>';
                break outerLoop;
            case "openload":
spans[index].innerHTML = '<iframe data-src="https://openload.co/embed' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="617" height="370" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="https://openload.co/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "vimple":
spans[index].innerHTML = '<iframe data-src="http://player.vimple.ru/iframe/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="617" height="370" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="http://player.vimple.ru/iframe/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "netu":
spans[index].innerHTML = '<iframe data-src="http://hqq.tv/player/embed_player.php?vid=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="617" height="370" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="http://hqq.tv/player/embed_player.php?vid=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "powvideo":
spans[index].innerHTML = '<iframe data-src="http://powvideo.net/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="617" height="370" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="http://powvideo.net/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "funnyordie":
                spans[index].innerHTML = '<iframe src="https://www.funnyordie.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "TwitchStream":
                spans[index].innerHTML = '<iframe src="https://player.twitch.tv/?channel=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" scrolling="no" height="378" width="620"></iframe>'
                break outerLoop;
            case "ellenTube":
                spans[index].innerHTML = '<iframe style="width: inherit; height: inherit;" src="https://widgets.ellentube.com/videos/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            default:
                break outerLoop;
        }
      }
   }
});
//</syntaxhighlight>