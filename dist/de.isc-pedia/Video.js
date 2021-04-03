/*********** Video-iFrame -JavaScript ***********
Dieses JavaScript durchsucht den Artikel nach einer DIV-Box, in die es ein iFrame zu einer Videoquelle einbetten kann.

Verwendet wird:
* [[Vorlage:Video]]

(c) 2014 by 20M61 - TWD-Wikia
***************************************/

var VideoTag = document.getElementById('WikiaMainContent').getElementsByTagName("div");
for ( nxtDIV=0; nxtDIV<VideoTag.length; nxtDIV++ ) 
{
  if (VideoTag[nxtDIV].getAttribute('data-Type') == 'Video')
  {
    //Video-iFrame erstellen.
    VideoElement                       = document.createElement("iframe");
    VideoElement.width                 = VideoTag[nxtDIV].getAttribute('data-width');
    VideoElement.height                = VideoTag[nxtDIV].getAttribute('data-height');
    VideoElement.webkitAllowFullScreen = ""; 
    VideoElement.mozallowfullscreen    = ""; 
    VideoElement.allowFullScreen       = ""; 
    VideoElement.src                   = VideoTag[nxtDIV].getAttribute('data-src');
    VideoTag[nxtDIV].appendChild(VideoElement);
  }
}