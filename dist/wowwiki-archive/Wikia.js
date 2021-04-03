/***********************************************************************************

* The 'MediaWiki:Common.js' will be loaded via imported '/site' file, at the *top*
of page in '<head>'. Will load immediately before Wikia.js.

* This 'MediaWiki:Wikia.js' will be loaded via imported '/site' file, at the *top*
of page in '<head>'. Will load immediately after Common.js and before importArticles.

* Common 'importArticles' files will be loaded together via dynamic import as
'/load.php' file, separately appearing at the *bottom* of the page.

* All files will be checked and minified nearly the same.

* 'Common' files are supposed to be theme agnostic, and 'Wikia' files are supposed
to be a part of the default theme and are supposed theme specific. Currently on here,
there is *no* theme specific JS. Please error on the side of placing code in
Common.js rather than Wikia.js. *All* js code should be tolerant of thematic changes
and any degradation on the various devices.

************************************************************************************/

/* ***************************************
     How to Navigate Wikia.js
   ***************************************

Major section headers look like this:

  *******************************************************************************************

  SECTION   Namespace:File.css

  *******************************************************************************************

There should be several main sections:
1) SECTION Functions - general theme specific functions
2) SECTION Extensions - general theme specific extensions
3) SECTION Startup - code to run on start, page startup event or timer, or inlined

*/

/*******************************************************************************************

SECTION  Functions

********************************************************************************************/

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/jsSlider.js"
    ]
});

//Scrolls Games left and right (blue default)
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});

//Scrolls Games left and right (gold)
$('.GamesArrowLeft-gold').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight-gold').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});


/*******************************************************************************************

SECTION  Extensions

********************************************************************************************/

/*******************************************************************************************

SECTION  Startup

********************************************************************************************/

/*
$(function () {

});
*/