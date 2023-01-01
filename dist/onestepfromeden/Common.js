/* Any JavaScript here will be loaded for all users on every page load.*/
$(document).ready(function(){
  //Load Reva Diagbeam Demo
  if(document.getElementById("reva-diag-demo"))
  {
    mw.loader.load( '/index.php?title=MediaWiki:RevaDiagDemo.js&action=raw&ctype=text/javascript' );
  }

  //Load Shopkeeper Quad Demo Demo
  if(document.getElementById("sk-quadrants-demo"))
  {
    mw.loader.load( '/index.php?title=MediaWiki:ShopkeeperQuadrantDemo.js&action=raw&ctype=text/javascript' );
  }

  // Load Test JavaScript Playfield (Doesn't work, may try to work it again later [[User:SageVarq|SageVarq]] ([[User talk:SageVarq|talk]]) 02:50, 30 May 2020 (UTC))
  //if(document.getElementsByClassName("infobox-playfield-js"))
  //{
  //  mw.loader.load( '/index.php?title=MediaWiki:Playfield.js&action=raw&ctype=text/javascript' );
  //}

  // Load Hero Skin Slideshow
  if(document.getElementsByClassName("slideshow-container"))
  {
    mw.loader.load( '/index.php?title=MediaWiki:SkinSlideshow.js&action=raw&ctype=text/javascript' );
  }

  // Load Tooltips
  if(document.getElementsByClassName("ajaxttlink"))
  {
    mw.loader.load( '/index.php?title=MediaWiki:Tooltips.js&action=raw&ctype=text/javascript' );
  }
});