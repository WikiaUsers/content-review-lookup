/*************************CONTENTS*************************/
/* Episode Tables Class */
/* Volume Tables Class */
/* HD Gallery Class */
/* Topic Block Log */
/* Default File License */
/* Page Icons */
/**********************************************************/

/* ==================================================
    Episode Tables
================================================== */
$(function () {
    $('.episode-table').each(function () {
        var $table = $(this);
        var $header = $table.find('tr').first().children();
        var $controls = $('<div class="column-toggles"></div>');

        var tableId = $table.attr('id') || 'episode-table';

        // ---------- TITLE LANGUAGE TOGGLES (GLOBAL, PERSISTENT) ----------
        var titleToggles = [
            { key: 'jp',     label: 'Japanese', default: false },
            { key: 'romaji', label: 'Romaji',   default: false },
            { key: 'en',     label: 'English',  default: true }
        ];

        var $titleGroup = $('<span class="title-toggles"></span>');

        titleToggles.forEach(function (t) {
            var storageKey = 'episode-title-' + t.key;
            var stored = localStorage.getItem(storageKey);
            var isChecked = stored === null ? t.default : stored === 'true';

            var $checkbox = $('<label><input type="checkbox"> ' + t.label + '</label>');
            var $input = $checkbox.find('input').prop('checked', isChecked);

            // Apply state immediately
            $('.episode-title.' + t.key).toggle(isChecked);

            // Persist on change
            $input.on('change', function () {
                var show = this.checked;
                $('.episode-title.' + t.key).toggle(show);
                localStorage.setItem(storageKey, show);
            });

            $titleGroup.append($checkbox);
        });

        // ---------- COLUMN TOGGLES ----------
        $header.each(function (i) {
            if (i === 0) return; // skip Ep. #

            var colName = $(this).text().trim();

            // Special handling for Title column
            if (colName === 'Title') {
                $controls.append(
                    $('<label class="column-label">Title:</label>')
                );
                $controls.append($titleGroup);
                return;
            }

            var storageKey = tableId + '-col-' + i;

            var stored = localStorage.getItem(storageKey);
            var isChecked = stored === null ? true : stored === 'true';

            var $checkbox = $('<label><input type="checkbox"> ' + colName + '</label>');
            var $input = $checkbox.find('input').prop('checked', isChecked);

            // Apply stored state
            $table.find('tr').each(function () {
                $(this).children().eq(i).toggle(isChecked);
            });

            // Persist on change
            $input.on('change', function () {
                var show = this.checked;
                $table.find('tr').each(function () {
                    $(this).children().eq(i).toggle(show);
                });
                localStorage.setItem(storageKey, show);
            });

            $controls.append($checkbox);
        });

        $table.before($controls);
    });
});

/* ==================================================
    Volume Tables
================================================== */

// Apply column hover highlighting for volume tables
document.querySelectorAll('.volume-table').forEach(table => {
    const cells = table.querySelectorAll('td, th');

    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            const colIndex = cell.cellIndex;
            table.querySelectorAll('tr').forEach(row => {
                const colCell = row.children[colIndex];
                if (colCell) colCell.classList.add('hovered-column');
            });
        });

        cell.addEventListener('mouseleave', () => {
            table.querySelectorAll('.hovered-column').forEach(colCell => {
                colCell.classList.remove('hovered-column');
            });
        });
    });
});

/* ==================================================
    HD Gallery Class
================================================== */

(function () {
  function buildGallery(gallery) {
    if (gallery.dataset.built === '1') return;

    const lines = gallery.textContent
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    if (!lines.length) return;

    gallery.dataset.built = '1';
    gallery.innerHTML = '';

    const width = gallery.getBoundingClientRect().width || 600;
    const minThumb = 120;
    const gap = 8;

    const cols = Math.max(1, Math.floor(width / (minThumb + gap)));
    const scaleFactor = 1.5;
    const thumb = Math.floor((width - gap * (cols - 1)) / cols * scaleFactor);
    
    gallery.style.setProperty('--thumb', thumb + 'px');

    lines.forEach(line => {
      let [fileLine, caption] = line.split('|');
      const file = fileLine.replace(/^File:/i, '').trim();

      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.width = thumb + 'px';

      const link = document.createElement('a');
      link.href = '/wiki/File:' + encodeURIComponent(file);
      link.className = 'image';

      const img = document.createElement('img');
      img.src = '/wiki/Special:FilePath/' + encodeURIComponent(file);
      img.alt = caption || '';
      img.loading = 'lazy';

      link.appendChild(img);
      item.appendChild(link);

      if (caption) {
        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = caption;
        item.appendChild(cap);
      }

      gallery.appendChild(item);
    });
  }

  function scan(root) {
    (root || document).querySelectorAll('.hd-gallery').forEach(buildGallery);
  }

  scan();
  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(scan);
  }
})();

/* ==================================================
    Topic Block Log
================================================== */

TBL_WIKIS = [
	    "100kanojo",
	    "aesthetics",
        "animanga",
        "bleach",
        "bokuyaba",
		"community",
		"dragonball",
		"fairytail",
		"futurediary",
		"horimiya",
		"kanojo-okarishimasu",
		"japanese",
		"manga",
		"nagatoro",
		"naruto",
		"onepiece",
		"oshinoko",
		"otaku",
		"otonari-no-tenshi",
		"the-dere-types",
		"tonikaku-kawaii",
		"tora-dora",
		"tropedia",
		"tsundere",
		"yandere",
		"yandere-girls",
		"yandere-simulator",
		"yandere-simulator-fan",
		"yandere-simulator-fan-ocs",
		"yuripedia"
];

/* ==================================================
    File License
================================================== */

/* ==================== Default Fairuse License ==================== */
(function () {

    const uploadForm = document.querySelector('#mw-upload-form');
    if (!uploadForm) return;

    // Function to set the license to Fairuse
    function applyLicense(root = document) {
        const license = root.querySelector('#wpLicense');
        if (license && !license.value) {
            for (const opt of license.options) {
                if (opt.value === 'Fairuse') {
                    license.value = opt.value;
                    license.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }
    }

    applyLicense();
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                    applyLicense(node);
                }
            }
        }
    });

    observer.observe(uploadForm, {
        childList: true,
        subtree: true
    });

})();

/* ==================== NoLicenseWarning ==================== */
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'content-moderator'
    ]
};

/* ==================================================
    Miscellaneous
================================================== */

/* Adds icons to page header */
$(function() {
    if( $( '#PageHeader' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 0px; bottom: 50px;' )
        );
    }
});