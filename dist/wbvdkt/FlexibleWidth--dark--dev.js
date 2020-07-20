/* ********************* */
/* *** GRAB THAT CSS *** */
/* ********************* */
function importCSS(url){
	var tag= document.createElement('link');
	tag.type='text/css';
	tag.href= url;
	tag.rel='stylesheet';
	document.body.appendChild(tag);
};
importCSS('http://wbvdkt.wikia.com/wiki/MediaWiki:FlexibleWidth/dark/dev.css?action=raw&ctype=text/css');

/* ************ */
/* *** SKIN *** */
/* ************ */
$(function () {
  $('<a class="sidebar-button" id="mw-sb-toggleshadow">Toggle glow</a>').appendTo('#mw-sidebar');
  $(document).ready(function(){
    $('a#mw-sb-toggleshadow').click(function(){
      $('#mw-sidebar').toggleClass('mw-darkskin-shadow');
      $('#WikiHeader').toggleClass('mw-darkskin-shadow');
      $('#WikiaMainContent').toggleClass('mw-darkskin-shadow');
      $('#WikiaArticleCategories').toggleClass('mw-darkskin-shadow');
      $('.mw-infobox').toggleClass('mw-darkskin-shadowbig');
      $('#EditPageToolbar').toggleClass('mw-darkskin-shadow');
      $('textarea#wpTextbox1').toggleClass('mw-darkskin-shadow');
      $('.toc').toggleClass('mw-darkskin-shadow');
      $('table.wikitable').toggleClass('mw-darkskin-shadow');
      $('.navbox').toggleClass('mw-darkskin-shadow');
      $('.thumb').toggleClass('mw-darkskin-shadow');
      $('.mp-container').toggleClass('mp-container-shadow')
    });
  });
  /* Glows on by default */
      $('#mw-sidebar').addClass('mw-darkskin-shadow');
      $('#WikiHeader').addClass('mw-darkskin-shadow');
      $('#WikiaMainContent').addClass('mw-darkskin-shadow');
      $('#WikiaArticleCategories').addClass('mw-darkskin-shadow');
      $('.mw-infobox').addClass('mw-darkskin-shadowbig');
      $('#EditPageToolbar').addClass('mw-darkskin-shadow');
      $('textarea#wpTextbox1').addClass('mw-darkskin-shadow');
      $('.toc').addClass('mw-darkskin-shadow');
      $('table.wikitable').addClass('mw-darkskin-shadow');
      $('.navbox').addClass('mw-darkskin-shadow');
      $('.thumb').addClass('mw-darkskin-shadow');
      $('.mp-container').addClass('mp-container-shadow')
  /* End glows on by default */
  $('img.sprite.search').attr('src', 'https://images.wikia.nocookie.net/wbvdkt/images/0/0b/Wiki-search-darkskin.png');
  $('#HelpLink').remove();
  $('#NotificationsLink').remove();
});