  //  Скрипт автоматического переключение описаний артефактов.

;(function($, mw) {
  'use strict';

  if (window.tabbedInfoBoxInitialized) {
      return;
  }
  window.tabbedInfoBoxInitialized = true;

  var HASH_STANDARD = 'standard';
  var HASH_EXCEPTIONAL = 'exceptional';
  var HASH_LEGENDARY = 'legendary';
  var STANDARD_TABS = ['обычный', 'необычный', 'редкий', 'эпический'];
  var EXCEPTIONAL_TAB = 'исключительный';
  var LEGENDARY_TAB = 'легендарный';

  var DESC_CONTAINER_SELECTOR = '.descriptions';
  var DESC_ITEM_SELECTOR = '.description';
  var TABS_SELECTOR = '.portable-infobox .wds-tabs__tab';
  var TAB_LABEL_SELECTOR = '.wds-tabs__tab-label';

  var EVENT_NAMESPACE = '.tabbedInfoBox';

  function showDescription(hash) {
      var $descriptionContainer = $(DESC_CONTAINER_SELECTOR);
      if (!$descriptionContainer.length) {
          return;
      }
      var $descriptions = $descriptionContainer.find(DESC_ITEM_SELECTOR);
      if (!$descriptions.length) {
          return;
      }

      $descriptions.hide();

      var targetId;
      switch (hash) {
          case HASH_EXCEPTIONAL:
              targetId = '#' + HASH_EXCEPTIONAL;
              break;
          case HASH_LEGENDARY:
              targetId = '#' + HASH_LEGENDARY;
              break;
          case HASH_STANDARD:
              targetId = '#' + HASH_STANDARD;
              break;
          default:
              targetId = '#' + HASH_STANDARD;
              break;
      }

      $(targetId).show();
  }

  function initializeTabClickHandlers() {
      $(TABS_SELECTOR)
          .off('click' + EVENT_NAMESPACE)
          .on('click' + EVENT_NAMESPACE, function() {
              var $tab = $(this);
              var tabName = $tab.find(TAB_LABEL_SELECTOR).text().trim().toLowerCase();
              var hash = null;

              if (STANDARD_TABS.includes(tabName)) {
                  hash = HASH_STANDARD;
              } else if (tabName === EXCEPTIONAL_TAB) {
                  hash = HASH_EXCEPTIONAL;
              } else if (tabName === LEGENDARY_TAB) {
                  hash = HASH_LEGENDARY;
              }

              if (hash) {
                  var currentHash = window.location.hash.substring(1);
                  if (window.history && window.history.replaceState && currentHash !== hash) {
                      window.history.replaceState(null, null, '#' + hash);
                  }
                  
                  showDescription(hash);
              }
          });
  }

  $(window).off('hashchange' + EVENT_NAMESPACE).on('hashchange' + EVENT_NAMESPACE, function() {
      var hash = window.location.hash.substring(1);
      showDescription(hash || HASH_STANDARD);
  });

  if (window.location.hash) {
      setTimeout(function() {
          window.scrollTo(0, 0);
      }, 1);
  }

  var initialHash = window.location.hash.substring(1);
  showDescription(initialHash || HASH_STANDARD);

  mw.loader.using('jquery').then(function() {
      initializeTabClickHandlers();
      mw.hook('wikipage.content').add(initializeTabClickHandlers);
  });

}(jQuery, mediaWiki));

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