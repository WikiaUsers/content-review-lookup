mw.loader.using('mediawiki.util', function () {
  window.lockOldComments = window.lockOldComments || {};
  window.lockOldComments.limit = 30; // Lock threads after 30 days
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

/* DEXTER TYPING CHATBOX CODE */
(function () {
  'use strict';

  function scaleDexterText(el, text) {
    var box = el.closest('.dexterTextBox');

    if (!box) {
      return;
    }

    var baseSize = parseFloat(window.getComputedStyle(box).fontSize) || 22;
    var length = text.length;
    var newSize = baseSize;

    if (length > 120) {
      newSize = baseSize * 0.55;
    } else if (length > 90) {
      newSize = baseSize * 0.65;
    } else if (length > 65) {
      newSize = baseSize * 0.75;
    } else if (length > 40) {
      newSize = baseSize * 0.88;
    }

    box.style.fontSize = newSize + 'px';
  }

  function typeOneDexterText(el) {
    if (!el || el.getAttribute('data-started') === 'true') {
      return;
    }

    el.setAttribute('data-started', 'true');

    var fullText = el.textContent || '';
    var speed = parseInt(el.getAttribute('data-speed'), 10) || 80;
    var wait = parseInt(el.getAttribute('data-wait'), 10) || 300;
    var index = 0;

    scaleDexterText(el, fullText);

    el.textContent = '';
    el.classList.add('dexter-ready');

    window.setTimeout(function () {
      el.classList.add('is-typing');

      function typeNextCharacter() {
        if (index < fullText.length) {
          el.textContent += fullText.charAt(index);
          index += 1;
          window.setTimeout(typeNextCharacter, speed);
        } else {
          el.classList.remove('is-typing');
        }
      }

      typeNextCharacter();
    }, wait);
  }

  function initDexterTypewriter() {
    var texts = document.querySelectorAll('.dexterTypewriter');

    for (var i = 0; i < texts.length; i++) {
      typeOneDexterText(texts[i]);
    }
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(initDexterTypewriter);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDexterTypewriter);
  } else {
    initDexterTypewriter();
  }
})();