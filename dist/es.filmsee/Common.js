/*Este codigo es exlusivo de Wikia Filmsee, si deseas copiarlo deberas 
referenciar a Wikia Filmsee*/

//<syntaxhighlight lang="javascript">
$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
        outerLoop:
        switch (spans[index].className) {
            case "Metacafe":
                spans[index].innerHTML = '<iframe width="670" height="400" src="http://www.metacafe.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "HaganTube":
                spans[index].innerHTML = '<iframe width="670" height="400" src="http://hagantube.diamandahagan.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" allowfullscreen="true" seamless="true"></iframe>';
                break outerLoop;
            case "Crackle":
                spans[index].innerHTML = '<object width="670" height="400" type="application/x-shockwave-flash" data="http://legacyweb-us.crackle.com/flash/ReferrerRedirect.ashx"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="flashvars" value="rootURL=http%3A%2F%2Flegacyweb-us.crackle.com&amp;id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></object>';
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
spans[index].innerHTML = '<iframe data-src="https://openload.co/embed' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="670" height="400" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="https://openload.co/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "spruto":
spans[index].innerHTML = '<iframe id="iframe_la" src="http://www.spruto.tv/iframe_embed.php?video_id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="670" height="400" frameborder="0" marginwidth="2" marginheight="1" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>';
              break outerLoop;
            case "vimple":
spans[index].innerHTML = '<iframe data-src="http://player.vimple.ru/iframe/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="670" height="400" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="http://player.vimple.ru/iframe/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "netu":
spans[index].innerHTML = '<iframe data-src="http://hqq.tv/player/embed_player.php?vid=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="670" height="400" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="http://hqq.tv/player/embed_player.php?vid=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
              case "videomega":
spans[index].innerHTML = '<iframe id="iframe_la" src="http://videomega.tv/view.php?ref=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" height="400" width="670" frameborder="0" marginwidth="2" marginheight="1" scrolling="no" allowfullscreen="true"></iframe>';
              break outerLoop;
            case "powvideo":
spans[index].innerHTML = '<iframe id="iframe_es" data-src="http://powvideo.net/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '-670x400.html" width="670" height="400" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="http://powvideo.net/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "cloudy":
spans[index].innerHTML = '<iframe id="iframe_sub" src="https://www.cloudy.ec/embed.php?id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" height="400" width="670" frameborder="0" marginwidth="2" marginheight="1" scrolling="NO" allowfullscreen="true"></iframe>';
              break outerLoop;
              case "ok":
spans[index].innerHTML = '<iframe width="670" height="400" src="//ok.ru/videoembed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" allowfullscreen></iframe>';
              break outerLoop;
              case "nowvideo":
spans[index].innerHTML = '<iframe width="670" height="400" frameborder="0" src="http://embed.nowvideo.sx/embed.php?v=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" scrolling="no"></iframe>';
              break outerLoop;
            case "vidspot":
spans[index].innerHTML = '<iframe src="http://vidspot.net/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder=0 marginwidth=0 marginheight=0 scrolling=no allowfullscreen="true" width=670 height=400></iframe>';
              break outerLoop;
            case "youwatch":
spans[index].innerHTML = '<IFRAME SRC="http://youwatch.org/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '.html" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=670 HEIGHT=400 allowfullscreen></IFRAME>';
              break outerLoop;
            case "streamin":
spans[index].innerHTML = '<IFRAME SRC="http://streamin.to/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '-670x400.html" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=670 HEIGHT=400></IFRAME>';
              break outerLoop;        
            case "allmyvideos":
spans[index].innerHTML = '<iframe src="http://allmyvideos.net/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '.html" width=670 height=400 frameborder=0 marginwidth=0 marginheight=0 scrolling=no allowfullscreen="true" />';
              break outerLoop;
            case "allvid":
spans[index].innerHTML = '<IFRAME SRC="http://allvid.ch/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '.html"FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=670 HEIGHT=400 allowfullscreen></IFRAME>';
              break outerLoop;
            case "uptostream":
spans[index].innerHTML = '<iframe width="595" height="360" src="https://uptostream.com/iframe/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"scrolling="no" frameborder="0" allowfullscreen webkitallowfullscreen></iframe>';
              break outerLoop;            
            case "flashx":
spans[index].innerHTML = '<iframe src="http://www.flashx.tv/embed-' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '.html"frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="670" height="400" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
              break outerLoop;             
            case "goog":
spans[index].innerHTML = '<iframe src="http://goo.gl/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" data-lazy-src="http://goo.gl/'  + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" height="400" width="670" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" scrolling="no" class="lazyloaded"></iframe>';
              break outerLoop;
            case "funnyordie":
                spans[index].innerHTML = '<iframe src="https://www.funnyordie.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "TwitchStream":
                spans[index].innerHTML = '<iframe src="https://player.twitch.tv/?channel=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" scrolling="no" height="378" width="670"></iframe>'
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