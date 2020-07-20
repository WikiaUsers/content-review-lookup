/* Any JavaScript here will be loaded for all users on every page load. */

// START CustomImages script
$(function CustomImages($) {
    var imgWidth = $('.custom-image img').attr('width');
 
    $('.custom-image').css('width', imgWidth);
 
    $('.custom-image img').css({
        'border': '1px solid #aaaaaa',
            'border-radius': '1em',
            'overflow': 'hidden',
            'padding': '0'
    });
 
    $('.custom-image-desc').css({
        'border': '1px solid #aaaaaa',
            'border-radius': '1em',
            'text-align': 'center',
            'width': '100%'
    });
});
// END CustomImages script
 
// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
window.MessageWallUserTags = {
    tagColor: '#72d9ff',
    glow: 'false',
    users: {
        'Haruyo-koi': 'Administrator',
        'FutureKnightX': 'Administrator',
        'Kudossko': 'Administrator'
    }
};

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* AjaxRC */
AjaxRCRefreshText = 'Auto-refresh';
ajaxSpecialPages = ["WikiActivity", "Recentchanges"];
 
/* Spoiler alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        imagecontrol: { u: 'imagecontrol' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagecontrol',
            'rollback',
            'bot'
        ]
    }
};
 
/* Link to Discussions Feed */
if (mw.config.get('wgCanonicalSpecialPageName') == 'WikiActivity' || mw.config.get('wgCanonicalSpecialPageName') == 'Recentchanges') {
    $('<li>', {
        id: 'discussrclink',
    }).html('<a href="/wiki/Special:DiscussionsFeed">Discussions Feed</a>')
    .prependTo('.toolbar .tools');
}
 
/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.html.escape(mw.config.get('wgUserName')));
});
 
/* Adds icons to page header
 * by: The 888th Avatar, adapted to new header by Thailog
 */
$(function() {
    if( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#icons' ) );
        $( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
    }
});

/* Card Grid stuff
 */
 
 (function(mw, $) {
  // Return list of elements whose data-value matches the active filters.
  function filterCards(list, key, filter) {
    // If no active filters, all elements valid.
    if (!filter.length) {
      return list;
    }
    return list.filter(function(i, entry) {
      return filter.find(function(filterEntry) {
        return String(filterEntry.dataset.value).toLowerCase() ===
            String(entry.dataset[key]).toLowerCase();
      });
    });
  }
 
  function updateCardGridFilters() {
    var filterParams = [];
    var cardList = $('.card-entry');
    cardList.each(function() {
      this.style.display = 'none';
    });
 
    var filteredList = cardList;
    var filterKeys = [
        'rarity', 'attribute', 'cardfeature', 'character', 'availability', 'appealskill'];
    filterKeys.forEach(function(key) {
        var activeFilters =
            $('.filter-group-' + key + ' > .active').toArray();
        var activeValues = activeFilters.map(function(filter) {
            return filter.dataset.value;
        }).join(',');
        if (activeValues.length) {
            filterParams.push(key + ':' + activeValues);
        }
        filteredList = filterCards(filteredList, key, activeFilters);
    });
 
    filteredList.each(function() {
      this.style.display = '';
    });
    // Update the URL so the filtered state can be directly linked to.
    var hashParams = new URLSearchParams();
    hashParams.set('CardGridFilters', filterParams.join(';'));
    history.replaceState(null, null, '#' + hashParams.toString())
  }
 
$(document).ready(function() {
    $('.character-filters .button').on('click', function(event) {
        $(event.delegateTarget).toggleClass('active');
        updateCardGridFilters();
    });
    // Replace periods in URL hash with %'s because wiki links URL
    // encode characters with periods instead.
    var urlParams = new URLSearchParams(decodeURIComponent(
        window.location.hash.slice(1).replace(/\./g, '%')));
    // If the URL hash-based param exists, set initial filters.
    // The expected format is filter1:valueA,valueB;filter2...
    // e.g name:Gaku Yaotome;type:Rabbit Chat,Puchinana;...
    if (urlParams.has('CardGridFilters')) {
        urlParams.get('CardGridFilters').split(';')
            .forEach(function(filterString) {
                var keyValue = filterString.split(':');
                keyValue[1].split(',').forEach(function(value) {
                    $('.filter-group-' + keyValue[0] +
                        "> [data-value='" + value + "']").toggleClass('active');
                });
        });
        updateCardGridFilters();
    }
});

// BackToTopButton config - https://dev.fandom.com/wiki/BackToTopButton
window.BackToTopModern = true;
window.BackToTopArrow = true;

})(mediaWiki, jQuery);