/* Any JavaScript here will be loaded for all users on every page load. */
// ================================================================================
//Default Fairuse License When Uploading File
$(document).on("submit", function (e) {
  if (e.target.id == "mw-upload-form") {
    $(e.target)
      .find('[name="wpLicense"] [value=""]:not([disabled])')
      .attr("value", "Fairuse");
  }
});
// ================================================================================
// Copied from https://starwars.fandom.com/wiki/MediaWiki:Common.js
$( function indicatorBesideEdit() {
    if ( $( '#article-indicator' ).length && $( '.page-header__actions' ).length ) {
      $( '.page-header__actions' ).first().prepend( $( '#article-indicator' ).show() );
    }
} );
// =================================================================================
// Configuration for NoLicenseWarning | https://dev.fandom.com/wiki/NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
    	'bureaucrat',
        'sysop',
        'threadmoderator',
        'content-moderator',
        'bot',
        'rollback'
    ]
};

// =================================================================================
/* Auto-update scripts for file and page renaming */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
    ]
});

// =================================================================================
/* Turns back-to-top button to the modern version */
window.BackToTopModern = true;

/* Changes number of days on locked comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 100;