/* Any JavaScript here will be loaded for all users on every page load. */
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
// ==================================================================
//Default Fairuse License When Uploading File
$(document).on("submit", function (e) {
  if (e.target.id == "mw-upload-form") {
    $(e.target)
      .find('[name="wpLicense"] [value=""]:not([disabled])')
      .attr("value", "Fairuse");
  }
});
// ==================================================================
// Copied from https://starwars.fandom.com/wiki/MediaWiki:Common.js
$( function indicatorBesideEdit() {
    if ( $( '#article-indicator' ).length && $( '.page-header__actions' ).length ) {
      $( '.page-header__actions' ).first().prepend( $( '#article-indicator' ).show() );
    }
} );
// ==================================================================
// Configuration for AutoCreateUserPages | https://dev.fandom.com/wiki/AutoCreateUserPages
//2 for Userpage and 3 for talk page (not use)
// userpage will from AutoCreateUserPages template
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{'+'{subst:AutoCreateUserPages}}',
        3: '{{AutoCreateUserPages}}',
    },
    summary: 'GSH Wiki: Auto Creating User Page',
    notify: '<a href="/wiki/User:$2">Welcome to Great Sage of Humanity Wiki. Here is a link to your userpage, $1!</a>'
};
// =================================================================
// https://dev.fandom.com/wiki/InactiveUsers
// Inactive Tag
InactiveUsers = { 
    months: 1,
    gone: ['Livy Caldwell'],
};
importScriptPage('InactiveUsers/code.js', 'dev');
// ===================================================================