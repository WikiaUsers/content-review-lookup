/*<nowiki>*/

/** YouTube Search Bar **/

$(".YouTubeSearchLightBG").replaceWith(
    '<div class="YouTubeSearchBarDark">' +
    '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/' +
    'Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-' +
    '2017%29.svg.png" height="30" width="90"><form' +
    ' action="http://www.youtube.com/results" method="get"' + 
    ' target="_blank"><input name="search_query" type="text" ' + 
    ' maxlength="128" /><select name="search_type"><option value="">Videos' +
    ' </option><option value="search_users">Channels</option></select><input' +
    ' type="submit" value="Search" /></form></div>'
);
 
$(".YouTubeSearchDarkBG").replaceWith(
    '<div class="YouTubeSearchBarLight">' +
    '<img src="https://mbtskoudsalg.com/images/youtube-logo-png-white.png"' +
    ' height="19" width="120"><form action="http://www.youtube.com/results"' +
    ' method="get" target="_blank"><input name="search_query" type="text" ' + 
    ' maxlength="128" /><select name="search_type"><option value="">Videos' +
    ' </option><option value="search_users">Channels</option></select><input' +
    ' type="submit" value="Search" /></form></div>'
);

/** Allow easy HTML-like method of YouTube video integration ~
    Documentation at Help:Video Integration **/

function r(f) {
  RegExp(/in/).test(document.readyState) ? setTimeout('r('+f+')',
  Number(9)): f();
}
 
r(function(){
    new String('use strict');
    if (!document.getElementsByClassName) {
        
        // IE8 support
        
        var getElementsByClassName = function(node, classname) {
            var a = [];
            var re = RegExp('(^| )'+classname+'( |$)');
            var els = node.getElementsByTagName("*");
            for (var i = 0, j = els.length; i < j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a}; 
            var videos = getElementsByClassName(document.body, "YouTubeVideo")} 
            else {var videos = document.getElementsByClassName("YouTubeVideo")}
 
    var nb_videos = videos.length;
    for (var i = 0; i < nb_videos; i++) {
        
        // Based on the YouTube ID, we can easily find the thumbnail image
        
        videos[i].style.backgroundImage = 'url(https://i.ytimg.com/vi/' +
                                          videos[i].id + '/maxresdefault.jpg)';
 
        // Overlay the Play icon to make it look like a video player
        
        var play = document.createElement("div");
        play.setAttribute("class", "Play");
        videos[i].appendChild(play);
 
        videos[i].onclick = function() {
            
            // Create an iFrame
            
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id;
            
            if (this.getAttribute("data-params")) 
                iframe_url += '&' + this.getAttribute("data-params");
            
            iframe.setAttribute("src", iframe_url);
            iframe.setAttribute("frameborder", '0');
 
            // The height and width of the iFrame should be the same as parent
            
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;
 
            // Replace the YouTube thumbnail with YouTube Player
            
            this.parentNode.replaceChild(iframe, this);
        };
    }
});

/** Add direct links on YouTube video file pages **/

if (window.playerParams && playerParams.provider === 'youtube') {
    var $ytLink = $('<a>').attr(
        'href',
        'https://www.youtube.com/watch?v=' + 
         playerParams.jsParams.videoId
    ).text(mw.config.get('wgTitle'));
    $('.video-provider').prepend($ytLink, ' – ');
    $('div[id^="youtubeVideoPlayer"]').removeAttr('style');
}

/** Script imports **/

window.YoutubePlayerDisableAutoplay = true;

importArticles({
    type: 'script',
    articles: [
       'u:dev:MediaWiki:YouTubeAudio.js',
       'u:dev:MediaWiki:YouTubeButton/code.js',
       'u:dev:MediaWiki:YouTubeModal/code.js',
       'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});

/** Live subscriber counts **/

!function() {
   var Channel = jQuery(".LiveSubCount").attr("data-channel");
   $(".LiveSubCount").replaceWith(
      "<iframe src = 'https://grow.grin.co/live-youtube-subscriber-"
      +"count/"+ Channel + "' height = '300' width = '350' scrolling = "+
      "'no'></iframe>");
}();