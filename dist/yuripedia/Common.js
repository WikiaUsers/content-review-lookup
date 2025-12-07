/* Any JavaScript here will be loaded for all users on every page load. */

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