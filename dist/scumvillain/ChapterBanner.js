(function () {
  function initChapterBanners($content) {
    var root = $content && $content[0] ? $content[0] : document;
    var banners = root.querySelectorAll('[data-svbi]:not([data-svbi-ready])');

    banners.forEach(function (banner) {
      banner.setAttribute('data-svbi-ready', '1');

      var hero = banner.querySelector('.svbi-hero');
      var toggle = banner.querySelector('.svbi-toggle');
      var nativeTitle = banner.querySelector('.svbi-native-title');
      var bookmarks = banner.querySelectorAll('.svbi-bookmark');
      var rows = banner.querySelectorAll('.svbi-row');

      if (hero) {
        hero.addEventListener('pointerenter', function () {
          banner.classList.add('is-hovering');
        });

        hero.addEventListener('pointerleave', function () {
          banner.classList.remove('is-hovering');
        });
      }

      bookmarks.forEach(function (bookmark) {
        bookmark.addEventListener('pointerenter', function () {
          bookmark.classList.add('is-active');
        });

        bookmark.addEventListener('pointerleave', function () {
          bookmark.classList.remove('is-active');
        });
      });

      if (nativeTitle) {
        nativeTitle.addEventListener('pointerenter', function () {
          nativeTitle.classList.add('is-active');
        });

        nativeTitle.addEventListener('pointerleave', function () {
          nativeTitle.classList.remove('is-active');
        });
      }

      if (toggle) {
        toggle.addEventListener('click', function () {
          var collapsed = banner.classList.toggle('is-collapsed');
          toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        });
      }

      function fallbackCopy(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      function showCopied(row) {
        row.classList.remove('svbi-copied');
        void row.offsetWidth;
        row.classList.add('svbi-copied');
        window.setTimeout(function () {
          row.classList.remove('svbi-copied');
        }, 950);
      }

      function copyRow(row) {
        var value = row.querySelector('.svbi-value');
        var text = value ? value.textContent.trim() : row.textContent.trim();

        if (!text) {
          return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopied(row);
          }).catch(function () {
            fallbackCopy(text);
            showCopied(row);
          });
        } else {
          fallbackCopy(text);
          showCopied(row);
        }
      }

      rows.forEach(function (row) {
        var label = row.querySelector('.svbi-label');
        row.setAttribute('aria-label', 'Copy ' + (label ? label.textContent.trim() : 'metadata') + ' value');

        row.addEventListener('pointerenter', function () {
          row.classList.add('is-active');
        });

        row.addEventListener('pointerleave', function () {
          row.classList.remove('is-active');
        });

        row.addEventListener('click', function () {
          copyRow(row);
        });

        row.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            copyRow(row);
          }
        });
      });
    });
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(initChapterBanners);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initChapterBanners();
    });
  }
}());