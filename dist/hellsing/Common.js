/* Any JavaScript here will be loaded for all users on every page load. */
/* add class to custom tabs when sticky
   author = 919dd
*/
let stickyElm = document.querySelector('.custom-tabs')
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm)

/* More text for the popup extension */

mw.loader.using('mediawiki.api').then(function () {
  var MAX_CHARS = 220;        // visible characters to show (tune to your popup size)
  var STRIP_NIHONGO = true;   // drop "(Japanese: ..., Hepburn: ..., IPA: ...)" from the lead
  var DEBUG = true;           // set to false once it works

  var api = new mw.Api();
  var cache = {};

  function log() {
    if (DEBUG) console.log.apply(console, ['[popup-extender]'].concat([].slice.call(arguments)));
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Remove the first parenthetical if it is the Japanese/IPA one (copes with nested brackets).
  function stripNihongo(text) {
    var start = text.indexOf('(');
    if (start === -1 || start > 200) return text;
    var depth = 0, end = -1, i;
    for (i = start; i < text.length; i++) {
      if (text.charAt(i) === '(') {
        depth++;
      } else if (text.charAt(i) === ')') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end === -1 || !/\b(?:Japanese|Hepburn|Romaji|Kanji|IPA)\s*:/.test(text.slice(start, end))) return text;
    return (text.slice(0, start).replace(/\s+$/, '') + ' ' + text.slice(end + 1).replace(/^\s+/, ''))
      .replace(/\s+([,.;:!?])/g, '$1');
  }

  function truncate(text, max) {
    var plainLength = text.replace(/[\u0001\u0002]/g, '').length;
    if (plainLength <= max) return text;
    var cut = text.lastIndexOf(' ', max);
    if (cut < max * 0.6) cut = max;
    return text.slice(0, cut).replace(/[\s,;:(\-]+$/, '') + '\u2026';
  }

  // Find the first real paragraph of the article. Bold text is wrapped in \u0001 ... \u0002 markers.
  function leadText(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html'); // does not load images or run scripts
    var $root = $(doc.body);
    $root.find('style, script, .reference, sup[id^="cite_ref"], .noexcerpt, .mw-editsection').remove();
    var found = '';
    $root.find('p').each(function () {
      var $p = $(this);
      if ($p.closest('aside, table, blockquote, .portable-infobox, .hatnote, .dablink').length) return;
      $p.find('b, strong').each(function () {
        $(this).text('\u0001' + $(this).text() + '\u0002');
      });
      var t = $p.text()
        .replace(/\s+/g, ' ')
        .replace(/\[(?:[a-z]|\d{1,3})\]/g, '') // leftover footnote markers like [b] or [12]
        .trim();
      if (t.replace(/[\u0001\u0002]/g, '').length > 30) {
        found = t;
        return false;
      }
    });
    return found;
  }

  function getLead(title) {
    if (!cache[title]) {
      cache[title] = api.get({
        action: 'parse',
        page: title,
        prop: 'text',
        section: 0,
        redirects: 1,
        disablelimitreport: 1,
        disableeditsection: 1,
        disabletoc: 1,
        formatversion: 2,
        smaxage: 300,
        maxage: 300
      }).then(function (data) {
        var html = data && data.parse && data.parse.text;
        if (html && typeof html !== 'string') html = html['*']; // older response format
        var text = html ? leadText(html) : '';
        if (STRIP_NIHONGO) text = stripNihongo(text);
        return truncate(text, MAX_CHARS);
      }).fail(function (code, err) {
        log('parse failed for', title, code, err);
        delete cache[title];
      });
    }
    return cache[title];
  }

  log('loaded');

  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      Array.prototype.forEach.call(m.addedNodes, function (node) {
        if (node.nodeType !== 1 || !node.classList.contains('mwe-popups-type-page')) return;
        var link = node.querySelector('a.mwe-popups-extract');
        var hit = link && link.href.match(/\/wiki\/([^?#]+)/);
        if (!hit) return;
        var title;
        try {
          title = decodeURIComponent(hit[1]).replace(/_/g, ' ');
        } catch (e) {
          return;
        }
        log('popup for', title);
        getLead(title).then(function (text) {
          if (!text) { log('no lead paragraph found for', title); return; }
          link.innerHTML = escapeHtml(text).replace(/\u0001/g, '<b>').replace(/\u0002/g, '</b>');
          log('replaced text for', title);
        });
      });
    });
  }).observe(document.body, { childList: true });
});