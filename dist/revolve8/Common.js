/* Any JavaScript here will be loaded for all users on every page load.                      */
/* JS placed here is optional and will force the equalization the main page layout columns   */
/*                                                                                           */
/* This section js has been moved to two different pages: MediaWiki:3colmainpage.js and      */
/* MediaWiki:2colmainpage.js                                                                 */
/* Wiki managers can either use one or the other for their wiki and overwrite this page with */
/* customized version, or use the import commands shown below                                */
/*                                                                                           */
/* The following is for the regular 2 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:2colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/*                                                                                           */
/* The following is for the regular 3 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:3colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/* ***************************************************************************************** */
if ( $( '#fmptrailer, #fmpguides' ).length === 2 ) {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $( '#fmptrailer iframe' ).attr( 'id', 'yt_trailer' );
  $( '#fmptrailer iframe' ).attr( 'src', $( '#fmptrailer iframe' ).attr( 'src' ) + '&enablejsapi=1' );
  var trailerPlayer = null;

  $( '#fmpguides iframe' ).attr( 'id', 'yt_guide' );
  $( '#fmpguides iframe' ).attr( 'src', $( '#fmpguides iframe' ).attr( 'src' ) + '&enablejsapi=1' );
  var guidePlayer = null;

  $( '#fmptrailer .clickrelay' ).one( 'click', function() {
    $( '#fmptrailer .heading, #fmptrailer .clickrelay' ).hide();
    trailerPlayer.playVideo();
  } );

  $( '#fmpguides .clickrelay' ).one( 'click', function() {
    $( '#fmpguides .heading, #fmpguides .clickrelay' ).hide();
    guidePlayer.playVideo();
  } );
}

function onYouTubeIframeAPIReady() {
  trailerPlayer = new YT.Player( 'yt_trailer' );
  guidePlayer = new YT.Player( 'yt_guide' );
}