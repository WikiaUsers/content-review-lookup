// ===== Imported JS ======
mw.loader.load('/index.php?title=MediaWiki:Common.css&action=raw&ctype=text/css', 'text/css');

// ===== Card =====
mw.hook('wikipage.content').add(function($content) {
    var $carousel = $content.find('.cover-flow');
    var $cards = $carousel.find('.card');
    var $prev = $carousel.find('.carousel-prev');
    var $next = $carousel.find('.carousel-next');

    if (!$cards.length) {
        return;
    }

    var classes = ['hidden-left', 'left', 'center', 'right', 'hidden-right'];
    var positions = [];

    $cards.each(function(i) {
        positions.push(i);
    });

    function updateCarousel() {
        $cards.each(function(index) {
            var $card = $(this);
            $card.removeClass('hidden-left left center right hidden-right');
            
            var posIndex = positions[index];
            if (posIndex < classes.length) {
                $card.addClass(classes[posIndex]);
            } else {
                $card.addClass('hidden-right');
            }
        });
    }

    $next.off('click.coverflow').on('click.coverflow', function(e) {
        e.preventDefault();
        positions.unshift(positions.pop()); // Moves cards right-to-left visually
        updateCarousel();
    });

    $prev.off('click.coverflow').on('click.coverflow', function(e) {
        e.preventDefault();
        positions.push(positions.shift()); // Moves cards left-to-right visually
        updateCarousel();
    });

    updateCarousel();
});


// ======= Creating and Assigning UserTags =========

window.UserTagsJS = {
    modules: {
        custom: {
            'Iostinstargazings': ['overseer'],
            'Archfactor Spiresplitter': ['overseer']
        },
    },
    tags: {
        overseer: { u: 'Overseer' }
    },
    oasisPlaceBefore: ''
};

// ===== Miscellaneous ======
mw.hook('dev.usertags').add(function() {
    var $overseerTag = $('.user-identity-header__tag.usergroup-overseer');

    if ($overseerTag.length) {
        var $icon = $('<img>', {
            src: 'https://static.wikia.nocookie.net/scp-lost-hope/images/1/1f/O5_Council.webp',
            css: {
                width: '16px',
                height: '16px',
                'margin-right': '5px',
                'vertical-align': 'middle'
            }
        });

        $overseerTag.prepend($icon);
    }
});


// ===== Welcome, from the Forsaken wiki ====== 
$(function () {
  const currentUser = mw.config.get("wgUserName");
  if (currentUser) {
    $(".insertusername").text(currentUser);
  }
});

// ===== From the Alter Ego wiki ====== 
function navigateTo(url) {
  window.location.href = url;
}

window.tooltips_config = {
    events: ['CustomEvent'],
    noCSS: true,
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
}

window.tooltips_config = {
    offsetY: 10,
    offsetX: 10,
    className: 'custom-tooltip-wrapper'
};

window.tooltips_list = [
    {
        classname: 'custom-tooltip-parse',
        text: '<div class="custom-popup"><div class="popup-content"><strong><#title#></strong><p><#description#></p></div></div>'
    }
];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Tooltips.js'
    ]
});

window.tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    className: 'custom-tooltip-wrapper'
};

$(document).on('DOMNodeInserted', '#tf-tooltip, .tf-tooltip', function() {
    $(this).css({
        'background': 'transparent',
        'border': 'none',
        'box-shadow': 'none',
        'padding': '0'
    });
});