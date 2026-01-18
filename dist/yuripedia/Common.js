/* Any JavaScript here will be loaded for all users on every page load. */

/* wikitable episode-table */
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

/* Adds icons to page header */
$(function() {
    if( $( '#PageHeader' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 0px; bottom: 50px;' )
        );
    }
});

/* Default Fairuse License When Uploading File */
$(document).on("submit", function (e) {
  if (e.target.id == "mw-upload-form") {
    $(e.target)
      .find('[name="wpLicense"] [value=""]:not([disabled])')
      .attr("value", "Fairuse");
  }
});

/* Configuration for NoLicenseWarning */
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'content-moderator'
    ]
};

/* Topic Block Log */
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