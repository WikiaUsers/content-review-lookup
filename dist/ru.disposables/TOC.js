/**
 * Улучшение оглавления (TOC) на вики:
 *  – Автоматическое сворачивание вложенных разделов.
 *  – Сохранение состояния раскрытия в localStorage для повторного просмотра.
 *  – Поддержка как стандартного, так и "липкого" (sticky) TOC на страницах, содержащих __TOC__.
 *  – Обработка TOC при первичной загрузке и динамически при его появлении (через MutationObserver).
 * Автор: [[Участник:DALunaa]]
 */

mw.loader.using('jquery', function () {
  $(function () {
    const STORAGE_KEY = 'fandom_toc_expanded_v1';
    const selectorList = '#toc, .toc, #sticky-toc, .sticky-toc, .article-toc, .toc--sticky';

    const loadState = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
      catch (e) { return {}; }
    };
    const saveState = (obj) => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }
      catch (e) {}
    };
    let tocState = loadState();

    const getAnchor = ($link) => {
      const href = $link.attr('href') || '';
      const idx = href.indexOf('#');
      return idx === -1 ? null : href.slice(idx);
    };

    const enhanceTOC = ($toc) => {
      if (!$toc.length || $toc.data('enhanced')) return;
      $toc.data('enhanced', true);

      $toc.find('ul li').each(function () {
        const $li = $(this);
        const $sub = $li.children('ul');
        const $link = $li.children('a').first();
        if ($sub.length && $link.length && !$li.hasClass('processed')) {
          $li.addClass('processed');
          const anchor = getAnchor($link);
          const expanded = anchor && !!tocState[anchor];
          $sub.toggle(expanded);
          const $toggle = $('<span class="toc-toggle">' + (expanded ? '[–]' : '[+]') + '</span>');
          const $wrapper = $('<span class="toc-row"></span>');

                $link.addClass('toc-link');
                $link.wrap($wrapper);
                $link.parent().append($toggle);
        }
      });

      $toc.off('click', '.toc-toggle')
          .on('click', '.toc-toggle', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $toggle = $(this);
        const $li = $toggle.closest('li');
        const $sub = $li.children('ul');
        $sub.toggle();
        $toggle.text($sub.is(':visible') ? '[–]' : '[+]');
        const anchor = getAnchor($li.children('a').first());
        if (anchor) {
          tocState[anchor] = $sub.is(':visible');
          saveState(tocState);
        }
      });
    };

    const scan = () => {
      $(selectorList).each((_, el) => enhanceTOC($(el)));
    };

    scan();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
          scan();
          break;
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
});