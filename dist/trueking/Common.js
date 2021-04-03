//
/* Any JavaScript here will be loaded for all users on every page load. */

/* == Import Show-Hide JS == */
/* dev.wikia.com/wiki/ShowHide/code.js */
/* dev.wikia.com/wiki/ShowHide */
//importScriptPage('ShowHide/code.js', 'dev');

/* == Longer image titles in categories == */
//$(function () {$('.gallerytext a').each(function() {this.innerHTML = this.title;});});

/* == Open search results in new tab == */
/* community.wikia.com/wiki/Admin_Forum:Open_search_results_in_new_tab._JS_or_CSS%3F */

//$(function() {
//    $('#WikiaSearch, #search, #powersearch').attr({ target: '_blank' });
//});
//WikiaSearchApp.initSuggest = function () {
//    $.loadJQueryAutocomplete(function () {
        // WikiaSearchApp.searchField.autocomplete({
//             serviceUrl: wgServer + wgScript + "?action=ajax&rs=getLinkSuggest&format=json",
//             onSelect: function (a, b) {
//                 WikiaSearchApp.track("suggest");
//                 WikiaSearchApp.trackInternal("search_start_suggest", {
//                     sterm: encodeURIComponent(a.replace(/ /g, "_")),
//                     rver: 0
//                 });
//                 window.open(wgArticlePath.replace(/\$1/, encodeURIComponent(a.replace(/ /g, "_"))));
//             },
//             appendTo: "#WikiaSearch",
//             deferRequestBy: 250,
//             maxHeight: 1000,
//             selectedClass: "selected",
//             width: "270px",
//             skipBadQueries: true
//         })
//     })
// };
//

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}