console.log('[[Common.js]] eval');

console.log('Common.js loaded for', mw.config.get('wgPageName'));

mw.hook('wikipage.content').add(function ($content) {
  console.log('wikipage.content hook fired on', mw.config.get('wgPageName'));
});

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


/* ===========================
 * Trueking: サﾟ / シﾟ / スﾟ / セﾟ / ソﾟ spacing
 * =========================== */
mw.hook('wikipage.content').add(function () {
  console.log('[tk-handaku] hook running on', mw.config.get('wgPageName'));

  var root = document.querySelector('.mw-parser-output');
  if (!root) {
    console.log('[tk-handaku] no .mw-parser-output found');
    return;
  }

  var targetPairs = ['サﾟ', 'シﾟ', 'スﾟ', 'セﾟ', 'ソﾟ'];
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);

  var nodes = [];
  var node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }

  var total = 0;

  nodes.forEach(function (textNode) {
    var text = textNode.nodeValue;
    if (!text) return;

    var hasPair = targetPairs.some(function (pair) {
      return text.indexOf(pair) !== -1;
    });
    if (!hasPair) return;

    var parent = textNode.parentNode;
    if (!parent) return;
    if (parent.closest && parent.closest('.no-handaku-wrap')) return;

    var frag = document.createDocumentFragment();
    var replacedHere = 0;

    while (text.length) {
      var nextIndex = -1;
      var nextPair = null;

      targetPairs.forEach(function (pair) {
        var i = text.indexOf(pair);
        if (i !== -1 && (nextIndex === -1 || i < nextIndex)) {
          nextIndex = i;
          nextPair = pair;
        }
      });

      if (nextIndex === -1) {
        frag.appendChild(document.createTextNode(text));
        break;
      }

      if (nextIndex > 0) {
        frag.appendChild(document.createTextNode(text.slice(0, nextIndex)));
      }

      var span = document.createElement('span');
      span.className = 'tk-handaku';
      span.textContent = nextPair;
      frag.appendChild(span);

      replacedHere++;
      text = text.slice(nextIndex + nextPair.length);
    }

    if (replacedHere > 0) {
      parent.replaceChild(frag, textNode);
      total += replacedHere;
    }
  });

  console.log('[tk-handaku] wrapped pairs:', total);
});