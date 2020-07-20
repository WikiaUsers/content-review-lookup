// Platform.js integrates YouTube subscribe buttons

mw.loader.load(String('https://apis.google.com/js/platform.js'));
function r(f) {
  RegExp(/in/).test(document.readyState) ? setTimeout('r('+f+')',
  Number(9)) : f();
}
 
r(function(){ // Direct YouTube Video Integration
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
            // Create an iFrame with autoplay set to true
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + 
                              this.id + "?autoplay=1&autohide=1";
            if (this.getAttribute("data-params")) {
                iframe_url+='&'+this.getAttribute("data-params")}
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

window.YoutubePlayerDisableAutoplay = true;
importWikiaScriptPages(Array(
    "external:dev:YouTubeModal/code.js", 
    "external:dev:YouTubeAudio.js",
    "external:dev:YoutubePlayer/code.js"
));

/** -------------------------------------------- **/
/** Add direct links on YouTube video file pages **/
/** -------------------------------------------- **/

if (window.playerParams && playerParams.provider === 'youtube') {
    var $ytLink = $('<a>').attr(
        'href',
        'https://www.youtube.com/watch?v=' + 
         playerParams.jsParams.videoId
    ).text(mw.config.get('wgTitle'));
    $('.video-provider').prepend($ytLink, ' – ');
    $('div[id^="youtubeVideoPlayer"]').removeAttr('style');
}