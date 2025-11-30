/* SORT WHATLINKSHERE ALPHABETICALLY BEGIN */

(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')) ? 1 : -1;
    });
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

/* SORT WHATLINKSHERE ALPHABETICALLY END */



/* DEV INACTIVEUSERS BEGIN */

InactiveUsers = { 
    months: 6,
    gone: ['username1', 'username2'],
    text: 'inactive'
};

/* DEV INACTIVEUSERS END */



/* COMMA IN CONTRIBS USER HEADER BEGIN */

$(function() {
  var selector = '#userProfileApp .user-identity-stats strong';
  function prettify(strongs) {
    strongs.forEach(function(strong, i) {
      var text = strong.textContent;
      if (text.length > 3 && text.indexOf(',') === -1) {
        strong.textContent = parseInt(text).toLocaleString('en', {useGrouping:true});
      }
    })
  }
  mw.hook('wikipage.content').add(function($content) {
    var strongs = document.querySelectorAll(selector);
    if (strongs.length) {
      prettify(strongs);
    } else {
      // alternatively, run a setInterval or setTimeout.
      new MutationObserver(function(mutations, observer) {
        var strongs = document.querySelectorAll(selector);
        if (strongs.length) {
          observer.disconnect();
          prettify(strongs);
        }
      }).observe(document.querySelector('.page__main'), {
        childList: true, // observe direct children
        subtree: true, // and lower descendants too
      });
    }
  });
});

/* COMMA IN CONTRIBS USER HEADER END */



/* LINK ON RAIL ACTIVITY BOX BEGIN */

$('#WikiaRail').on('afterLoad.rail', function() {
  const recentChangesLink = $('<a/>').attr('href', '/wiki/Special:RecentChanges');
  const wikiActivityRailHeader = $('#wikia-recent-activity.rail-module.recent-wiki-activity .rail-module__header');
  recentChangesLink.append(wikiActivityRailHeader.html());
  wikiActivityRailHeader.empty().prepend(recentChangesLink);
});

/* LINK ON RAIL ACTIVITY BOX END */



/* ARTICLE TITLE COPY PASTE BEGIN */

var sels = ['.page-header', '.page-header__categories', '.page-header__meta', '.page-header__categories', '.page-header__categories-dropdown', '.page-header__categories-dropdown-content', '.page-header__top', '.page-header__bottom', '.page-header__title-wrapper', '.page-header__title']
sels.forEach((sel)=>{$(sel).html((_, c)=>c.replace(/^[\s\n\r\t]+/, '').replace(/[\s\n\r\t]+$/, ''))});

/* ARTICLE TITLE COPY PASTE END */




/* INTERNAL LINKS BEGIN */
/**
 * Script to override Fandom's default target="_blank" behavior for internal links using the full url when interwiki links aren't an option.
 * It removes target="_blank" for internal links on the current wiki going to other pages on this wiki.
 *
 * This script will override the target="_blank" for:
 * 1. Links with the class 'open-in-same-tab'.
 * 2. Links that match any path listed in specificUrlOverrides.
 */
(function(window, document, $) {
    'use strict';

    // -----------------------------------------------------------------------
    // List the specific paths (excluding domain) that should ALWAYS open in the same tab.
    // Use the base path to match all variations
    // of the link (even with different query parameters).
    const specificUrlOverrides = [
        // The user's requested path:
        '/wiki/',
        // Add other specific Special Pages or high-traffic internal full URLs here if needed:
        // '/wiki/Template:MyTemplate'
    ];
    // -----------------------------------------------------------------------

    $(document).ready(function() {
        const currentHost = window.location.hostname;
        // Select all anchor tags that have an href and might have target="_blank"
        const $links = $('a[href]');

        $links.each(function() {
            const $link = $(this);
            const href = $link.attr('href');
            const hasTargetBlank = $link.attr('target') === '_blank';

            // 1. Must be a full URL pointing back to the current wiki
            // 2. Must currently have target="_blank" set
            if (href && href.includes(currentHost) && hasTargetBlank) {

                // Check 1: Does it have the designated class?
                const hasSameTabClass = $link.hasClass('open-in-same-tab');

                // Check 2: Does the link contain one of the specific override paths?
                const matchesOverride = specificUrlOverrides.some(path => href.includes(path));

                if (hasSameTabClass || matchesOverride) {
                    // Remove the attribute to force it open in the same tab.
                    $link.removeAttr('target');
                }
            }
        });
    });

})(window, document, jQuery);

/* INTERNAL LINKS END */