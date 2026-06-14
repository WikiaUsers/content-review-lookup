mw.loader.using('mediawiki.util', function () {
  window.lockOldComments = window.lockOldComments || {};
  window.lockOldComments.limit = 60; // Lock threads after 7 days
  window.lockOldComments.addNoteAbove = true; // Show a note above locked threads

  console.log('[LockOldComments] Configuration applied');

  importArticles({
    type: 'script',
    articles: [
      'u:dev:LockOldComments/code.js',  // Enables comment locking
      'u:dev:MediaWiki:MassEdit/code.js' // Enables the MassEdit tool
    ]
  });
});

/* Collapsible navigation tree using *#| syntax */
$(function () {
    function processNavTree() {
        $('ul li').each(function () {
            var text = $(this).text().trim();

            if (text.startsWith('#|') && !$(this).hasClass('nav-section')) {
                $(this).addClass('nav-section');
                var label = text.replace(/^#\|/, '').trim();

                $(this).html('<span class="nav-toggle">▶</span> ' + $('<div>').text(label).html());
                $(this).next('ul').hide();

                $(this).click(function (e) {
                    e.stopPropagation();
                    var $ul = $(this).next('ul');
                    if ($ul.is(':visible')) {
                        $ul.slideUp();
                        $(this).find('.nav-toggle').text('▶');
                    } else {
                        $ul.slideDown();
                        $(this).find('.nav-toggle').text('▼');
                    }
                });
            }
        });
    }

    processNavTree();
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ListFiles/code.js',
    ]
});


(function() {
    'use strict';

    var config = window.profileTags || {};
    if (window.ProfileTagsLoaded) {
        return;
    }
    window.ProfileTagsLoaded = true;

    // Target masthead classes across modern Fandom layouts
    var $masthead = $('.user-identity-header__attributes, .user-identity-box .user-identity-avatar');
    if (!$masthead.length) {
        return;
    }

    var title = mw.config.get('wgTitle'),
        namespace = mw.config.get('wgNamespaceNumber');

    // Only run on User, User_talk, and Message_Wall spaces
    if ([2, 3, 1200].indexOf(namespace) === -1) {
        return;
    }

    // Isolate the clean username from subpages
    var user = title.split('/')[0];

    function init(text) {
        var lines = text.split('\n'),
            tags = [],
            noHide = false;

        lines.forEach(function(line) {
            line = line.trim();
            if (line === '!nohide') {
                noHide = true;
                return;
            }
            if (line.indexOf('#') === 0 || line === '') {
                return;
            }

            var parts = line.split('|');
            if (parts[0].trim() === user) {
                var userTags = parts.slice(1).join('|').split(',');
                userTags.forEach(function(tag) {
                    tags.push(tag.trim());
                });
            }
        });

        if (tags.length === 0) {
            return;
        }

        // Clean up fallback default text tags if requested
        if (!noHide && !config.noHideTags) {
            $('.user-identity-header__tag, .tag-container').remove();
        }

        // Inject the custom parsed tags into the masthead area
        tags.forEach(function(tag) {
            var $tagSpan = $('<span>', {
                'class': 'user-identity-header__tag profile-tag',
                'text': tag
            });
            
            // Append securely next to baseline attributes
            $('.user-identity-header__attributes').append($tagSpan);
        });
        
        mw.hook('ProfileTags.loaded').fire(tags);
    }

    // Fetch the structural configuration directly from the local wiki API
    $.get(mw.util.wikiScript('api'), {
        action: 'query',
        prop: 'revisions',
        titles: 'MediaWiki:ProfileTags',
        rvprop: 'content',
        rvslots: 'main',
        format: 'json'
    }).done(function(data) {
        if (!data.query || !data.query.pages) { return; }
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];
        if (pageId === '-1') { return; }
        
        var content = pages[pageId].revisions[0].slots.main['*'];
        init(content);
    });
})();

(function () {
  'use strict';

  // Parse ISO 8601 date string robustly
  function parseISO(d) {
    try {
      var dt = new Date(d);
      if (isNaN(dt.getTime())) return null;
      return dt;
    } catch (e) {
      return null;
    }
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatDuration(ms) {
    if (ms < 0) {
      return null;
    }
    var totalSeconds = Math.floor(ms / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    if (days > 0) {
      return days + 'd ' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }

  function updateElement(el) {
    var dateStr = el.getAttribute('data-countdown');
    var target = parseISO(dateStr);
    if (!target) {
      el.textContent = 'Invalid date';
      return;
    }
    var now = new Date();
    var diff = target.getTime() - now.getTime();
    var formatted = formatDuration(diff);
    if (formatted === null) {
      // finished
      var finishedText = el.getAttribute('data-finished-text') || 'Finished';
      el.textContent = finishedText;
      el.classList.add('countdown-finished');
      return;
    }
    el.textContent = formatted;
  }

  function initCountdowns() {
    var els = document.querySelectorAll('.countdown[data-countdown]');
    if (!els.length) return;
    // Initial render
    els.forEach(function (el) {
      updateElement(el);
    });
    // Update every 1 second
    setInterval(function () {
      els.forEach(function (el) {
        updateElement(el);
      });
    }, 1000);
  }

  // Run after DOM ready in MediaWiki
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCountdowns();
  } else {
    document.addEventListener('DOMContentLoaded', initCountdowns);
  }
})();

window.AddRailModule = (window.AddRailModule || []).concat(['Template:Update', {prepend:true}]);