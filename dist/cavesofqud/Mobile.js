/* Any JavaScript here will be loaded for users using the mobile site */
/************************************
/* Main Page Mobile Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2018-Jun-7
// License: CC-BY 3.0

// This script, paired with .mobilecollapsible styles in MediaWiki:Mobile.css, supports making .fpbox collapsible in the mobile view using both the standard
// 2 or 3-column responsive front pages.

// Making an .fpbox collapsible in mobile view involves the following:
//   1. Adding "mobilecollapsible" as another class alongside "fpbox".
//   2. Making sure there is a heading identified by the "heading" class.
//      * Links inside headings can still work, but aren't recommended because they'll be easy to fat-finger while trying to collapse/expand the box.
//      * The script allows multiple headings and automatically ignores any with the "nomobile" or "notoggle" class.
//      * If there are still multiple headings after excluding those, only the first is turned into a collapsing toggle link.
//   3. Placing the area that should be hidden when collapsed inside a div or other block with the "body" class.
//      * It's usually best for this to be everything in the box *except* the heading.
//   4. Optionally add "expanded" next to "mobilecollapsible" to leave the box expanded by default.

var fpmobilecollapse = fpmobilecollapse || {
    initialize: function() {
        var index = 0;
        $('.fpbox.mobilecollapsible').each(function() {
            var heading = $(this).children('.fpbox-heading').not('.nomobile, .notoggle');
            if (heading.length > 0 && $(this).children('.body').length > 0) {
                $(this).addClass('mobilecollapsible' + index);
                if (!($(this).hasClass('expanded'))) {
                    $(this).addClass('collapsed');
                }
                heading.first().html($('<a class="togglecollapse" href="javascript:fpmobilecollapse.toggle( ' + index + ' )"></a>').html(heading.html()));
            }
            ++index;
        });
    },
    toggle: function(index) {
        $('.fpbox.mobilecollapsible' + index).each(function() {
            if ($(this).hasClass('collapsed')) {
                $(this).removeClass('collapsed');
                $(this).addClass('expanded');
            } else {
                $(this).removeClass('expanded');
                $(this).addClass('collapsed');
            }
        });
    }
}

window.fpmobilecollapse = fpmobilecollapse;

$(document).ready(fpmobilecollapse.initialize);

/****************************************
/* End Main Page Mobile Collapse Script *
/****************************************/

/************************************
/* Qud infobox image-to-gif swapper *
/************************************/
// Author:  egocarib
// Date:    2020-Oct
// License: CC-BY 3.0

// Designed for use in infoboxes on the Caves of Qud wiki.
// Powers an infobox template (Template:Infobox_image_and_gif) that
// allows users to swap from a static image to preview an animated gif
// Also supports "image carousel"-type behavior with multiple images/gifs.

var qudInfoboxImageToggler = qudInfoboxImageToggler || {
  initialize: function () {
    $('.qud-toggler > .qud-toggler-initial').show();
    $('.qud-toggler > .qud-toggler-button').show();
    $('.qud-toggler > .qud-toggler-final').hide();
    $('.qud-toggler > .qud-toggler-button').click(function () {
      window.qudInfoboxImageToggler.toggle();
    });
    $('.qud-html-details .qud-html-summary').click(function () {
      window.qudInfoboxImageToggler.summaryClick();
    });
  },
  toggle: function () {
    $('.qud-toggler > .qud-toggler-initial').hide();
    $('.qud-toggler > .qud-toggler-button').hide();
    $('.qud-toggler > .qud-toggler-final').show();
  },
  summaryClick: function () {
    $('.qud-html-details .qud-html-summary').toggleClass(
      'qud-html-summary-open'
    );
    if ( $('.qud-toggler > .qud-toggler-final > img').css('visibility') == 'hidden' )
      $('.qud-toggler > .qud-toggler-final > img').css('visibility','visible');
    else
      $('.qud-toggler > .qud-toggler-final > img').css('visibility','hidden');
  }
};

window.qudInfoboxImageToggler = qudInfoboxImageToggler;

$(document).ready(qudInfoboxImageToggler.initialize);

var qudCarouselGearbox = qudCarouselGearbox || {
  initialize: function () {
    $(".qud-sprite-carousel").each(function (idx1, elem1) {
      $(elem1).find('.qud-carousel-item').each(function (idx, elem) {
        $(elem).addClass("qud-carousel-item-number-" + idx);
        if ($(elem).is(":visible")) {
          window.qudCarouselGearbox.currentIndex = idx;
        }
      });
    });
    $(".qud-sprite-carousel .qud-carousel-btn-left").click(function () {
      window.qudCarouselGearbox.removeHighlight();
      window.qudCarouselGearbox.rotate($(this).closest('.qud-sprite-carousel'), -1);
    });
    $(".qud-sprite-carousel .qud-carousel-btn-right").click(function () {
      window.qudCarouselGearbox.removeHighlight();
      window.qudCarouselGearbox.rotate($(this).closest('.qud-sprite-carousel'), 1);
    });
    $(".infobox-title").append('<div class="qud-carousel-title"></div>');
  },
  rotate: function (parentElem, amount) {
    items = $(parentElem).find('.qud-carousel-item');
    curIndex = 0
    $(items).each(function (idx, elem) {
      if ($(elem).is(":visible")) {
        curIndex = idx
      }
      $(elem).hide();
    });
    curIndex += amount
    end = $(items).length - 1;
    if (curIndex < 0) {
      curIndex = end;
    } else if (curIndex > end) {
      curIndex = 0;
    }
    curItem = $(parentElem).find('.qud-carousel-item-number-' + curIndex).first();
    curItem.show();
    /* expand infobox title to also show image label */
    carouselTitle = $(parentElem).closest('.moduleinfobox').find('.infobox-title > .qud-carousel-title').first();
    carouselTitle.text(curItem.data("label"));
    carouselTitle.animate({ height: "25px" });
  },
  removeHighlight: function () {
    /* prevents weird highlight selection behavior if buttons are double-clicked */
    if (window.getSelection) window.getSelection().removeAllRanges();
    else if (document.selection) document.selection.empty();
  }
};

window.qudCarouselGearbox = qudCarouselGearbox;

$(document).ready(qudCarouselGearbox.initialize);
/****************************************
/* End Qud infobox image-to-gif swapper *
/****************************************/

/*************************
/* Qud inline gif player *
/*************************/
// Author:  egocarib
// Date:    2020-Oct
// License: CC-BY 3.0

// Code for a simple little gif mask / click to play widget.
// See Template:Masked_gif for a demo

var qudInlineGifMasker = qudInlineGifMasker || {
  initialize: function () {
    $('.qud-inline-gif').click(function () {
      window.qudInlineGifMasker.toggle(this);
    });
  },
  toggle: function(elem) {
    $(elem).find('*').toggleClass('qud-invisible');
  }
};

window.qudInlineGifMasker = qudInlineGifMasker;

$(document).ready(qudInlineGifMasker.initialize);
/*****************************
/* End Qud inline gif player *
/*****************************/