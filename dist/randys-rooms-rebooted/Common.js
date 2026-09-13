/* Any JavaScript here will be loaded for all users on every page load. */

/* Lock Comments */
mw.loader.using('mediawiki.util', function () {
  window.lockOldComments = window.lockOldComments || {};
  window.lockOldComments.limit = 60;
  window.lockOldComments.addNoteAbove = true;

  console.log('[LockOldComments] Configuration applied');

  importArticles({
    type: 'script',
    articles: [
      'u:dev:LockOldComments/code.js',  // Enables comment locking
    ]
  });
});

/* Dedicated Talk Button Settings */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DedicatedTalkButton.js',
    ]
});

/* Countdown */
mw.hook('wikipage.content').add(function ($content) {
    
    function updateTimer($element, targetDate) {
        var now = new Date();
        var diff = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

        if (isNaN(diff)) {
            $element.text('** Invalid Date **');
            return;
        }

        var prefix = diff < 0 ? '-' : '';
        diff = Math.abs(diff);

        var seconds = diff % 60;
        diff = Math.floor(diff / 60);
        var minutes = diff % 60;
        diff = Math.floor(diff / 60);
        var hours = diff % 24;
        var days = Math.floor(diff / 24);

        var timeString = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        $element.text(prefix + timeString);
    }

    $content.find('.nocountdown').hide();
    $content.find('.countdown').show();

    $content.find('.countdowndate').each(function () {
        var $el = $(this);
        var rawDate = $el.text().trim();
        var targetDate = new Date(rawDate);

        if (!isNaN(targetDate.getTime())) {
            updateTimer($el, targetDate);
            setInterval(function () {
                updateTimer($el, targetDate);
            }, 1000);
        } else {
            $el.text('** Invalid Date **');
        }
    });
});