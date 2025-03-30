  //  Скрипт автоматического переключение описаний артефактов.

$(document).ready(function() {
  function showDescription(hash) {
    $('.descriptions .description').hide(); 
    if (hash === 'standard') {
      $('#standard').show();
    } else if (hash === 'exceptional') {
      $('#exceptional').show();
    } else if (hash === 'legendary') {
      $('#legendary').show();
    } else {
      $('#standard').show(); 
    }
  }

  $('.portable-infobox .wds-tabs__tab').on('click', function() {
    var tabName = $(this).find('.wds-tabs__tab-label').text().trim().toLowerCase();
    var hash;

    if (['обычный', 'необычный', 'редкий', 'эпический'].includes(tabName)) {
      hash = 'standard';
    } else if (tabName === 'исключительный') {
      hash = 'exceptional';
    } else if (tabName === 'легендарный') {
      hash = 'legendary';
    }

    if (hash) {
      history.replaceState(null, null, '#' + hash);
      showDescription(hash);
    }
  });

  var initialHash = window.location.hash.substring(1);
  if (initialHash) {
    showDescription(initialHash);
  } else {
    showDescription('standard');
  }

  $(window).on('hashchange', function() {
    var hash = window.location.hash.substring(1);
    showDescription(hash);
  });

  if (window.location.hash) {
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);
  }
});

  //  Скрипт кнопок развернуть/свернуть.
  
  ;(function($, mw) {
    'use strict';

    if (window.customToggleTextInitialized) {
        return;
    }
    window.customToggleTextInitialized = true;

    var prefixClosed = 'Развернуть';
    var prefixOpen = 'Свернуть';

    function updateToggleButtonText($toggleButton, $collapsibleElement, baseText) {
        var currentPrefix = $collapsibleElement.hasClass('mw-collapsed') ? prefixClosed : prefixOpen;
        var newText = currentPrefix + ' ' + baseText.replace(prefixOpen + ' ', '').replace(prefixClosed + ' ', '');
        $toggleButton.text(newText);
    }

    function initToggleText() {
        $('[class*="mw-customtoggle-"]').each(function() {
            var $toggleButton = $(this);
            var toggleIdMatch = this.className.match(/mw-customtoggle-([\w-]+)/);

            if (toggleIdMatch && toggleIdMatch[1]) {
                var collapsibleId = 'mw-customcollapsible-' + toggleIdMatch[1];
                var $collapsibleElement = $('#' + collapsibleId);

                if ($collapsibleElement.length > 0) {
                    var baseText = $toggleButton.data('base-text');
                    if (baseText === undefined) {
                         baseText = $toggleButton.text().trim();
                         $toggleButton.data('base-text', baseText);
                    }

                    updateToggleButtonText($toggleButton, $collapsibleElement, baseText);

                    $toggleButton.off('click.toggleText').on('click.toggleText', function() {
                        var currentBaseText = $toggleButton.data('base-text');
                        setTimeout(function() {
                            updateToggleButtonText($toggleButton, $collapsibleElement, currentBaseText);
                        }, 0);
                    });
                }
            }
        });
    }

    mw.loader.using(['jquery.makeCollapsible', 'mediawiki.util']).then(function() {
        $(initToggleText);
        mw.hook('wikipage.content').add(initToggleText);
    });

}(jQuery, mediaWiki));