/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds icons to page header */
$(function() {
    if( $( '#PageHeader' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 0px; bottom: 50px;' )
        );
    }
});


/* Audio Formatting */
mw.loader.using('jquery').then(function () {
    $('.pronunciation-audio').each(function () {
        var file = $(this).data('audio');
        if (!file) return;
        var audio = new Audio(mw.util.getUrl('File:' + file, { action: 'raw' }));

        $(this).on('click', function () {
            audio.pause();
            audio.currentTime = 0;
            audio.play().catch(function (err) {
                console.error("Audio playback failed:", err);
            });
        });
    });
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

/* Lock Old Comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 365
window.lockOldComments.namespaceNumbers = [0, 112, 114, 116, 500];

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
		"yandere-simulator-fan-ocs"
];