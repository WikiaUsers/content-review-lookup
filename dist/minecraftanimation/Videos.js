/***
 --------------------------------------------------------------------
 # This page only contains codes pertaining to videos primarily
 from non-YouTube providers, or scripts that should affect all videos.
 For JavaScript specific to YouTube, navigate to MediaWiki:YouTube.js.
 --------------------------------------------------------------------
**/

/**
 *******************************************************************
 # BEGIN Video integration codes
 *******************************************************************
**/

importArticles({
    type: 'script',
    articles: Array(
        "external:dev:MediaWiki:VideoIntegrator/VideoIntegrator.js",
        "u:dev:MediaWiki:BilibiliVideo.js",
        "w:c:dev:MediaWiki:VevoEmbedder.js/VevoEmbedder.js"
)});
  
importScriptURI('https://player.vimeo.com/api/player.js');
importScriptURI('https://api.dmcdn.net/all.js');
  
var videoID = $(".DailyMotionVid, MetacafeVideo").attr("data-video-id");
var videoName = $(".MetacafeVideo").attr("data-video-name");
  
/** The height and width **/

var videoHeight = jQuery(
    String(".DailyMotionVid, MetacafeVideo")
).attr("data-video-height");
var videoWidth = $(".DailyMotionVid, MetacafeVideo").attr("data-video-width");
  
//====================================
// Dailymotion
//====================================

$(".DailyMotionVid").each(function() {
       if (videoID.length > 0) {
           $(this).replaceWith(
           '<iframe frameborder="0" width=' + videoWidth + ' height=' +
           videoHeight + ' src="https://www.dailymotion.com/embed/video/' +
           videoID + '" allowfullscreen allow="autoplay"></iframe>');
}});
    
//==================================
// Metacafe
//==================================
   
$(".MetacafeVideo").each(function() {
       if (videoID.length > 0 && videoName.length > 0) {
          $(this).replaceWith(
           '<iframe width=' + videoWidth + ' height=' + videoHeight + 
           ' src="http://www.metacafe.com/embed/' + videoID + '/' + videoName +
           '/" frameborder="0" allowfullscreen></iframe>');
}}); 

/**
 *******************************************************************
 # END Video integration codes
 *******************************************************************
**/

//=======================
// Vimeo Search Bar
//=======================

$(".VimeoSearch").replaceWith(
    '<div class="VimeoSearchBar">' +
    '<img src="https://shabany.de/wp-content/uploads/2018/05/vimeo-logo.png"' +
    'height="25" width="80"> <br /><form action="https://vimeo.com/search"' +
    'method="get" target="_blank"> <input name="q" type="text" ' + 
    'maxlength="128" /> <input type="submit" value="Search" /></form></div>'
);

//============================================================================
// Pause the video that is currently playing when the user plays another
//============================================================================

$(document.body).on('play', 'video', function (e) {
    $('video').not(e.target).pause();
});