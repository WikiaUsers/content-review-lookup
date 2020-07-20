/**
 * Deleting underlying mediawiki pages for thread messages.
 * 
 * FIXME: doesn't work for message walls.
 */

(function ($) {
  'use strict';
  $(function () {
    // Non-mods don't have those in DOM
    if ($('#Wall .message .remove-message:first').length === 0) {
      return;
    }
    // Prevent second initialization, including faulty one
    if (window.kcThreadDeleteInitialized) {
      return;
    } else {
      window.kcThreadDeleteInitialized = true;
    }
    var messages = $('#Wall .message');
    var ids = messages.map(function (_, e) {
      return $(e).data('id');
    }).toArray();
    if (ids.length === 0) {
      return;
    }
    $.get('https://kancolle.fandom.com/api.php?action=query&pageids=' + ids.join('|') + '&format=json', function (data) {
      var pages = data.query.pages;
      messages.each(function (_, e) {
        var id = $(e).data('id');
        if (!id) {
          return;
        }
        var title = pages[id].title;
        var buttons = $(e).find('.buttons:first');
        if (buttons.length === 1) {
          buttons.prepend('<a href="https://kancolle.fandom.com/wiki/' + title + '?action=delete"><button class="secondary">Delete</button></a>');
        } else {
          $(e).find('.removed-info').append('<a style="float:right" href="https://kancolle.fandom.com/wiki/' + title + '?action=delete"><button class="secondary">Delete</button></a>');
        }
      });
    });
  });
})(window.jQuery);