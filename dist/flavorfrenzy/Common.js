mw.loader.using('mediawiki.util', function () {
  window.lockOldComments = window.lockOldComments || {};
  window.lockOldComments.limit = 14; // Lock threads after 14 days
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