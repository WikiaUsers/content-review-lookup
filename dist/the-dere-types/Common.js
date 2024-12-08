/* Any JavaScript here will be loaded for all users on every page load. */

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
    	'bureaucrat',
        'sysop',
        'content-moderator',
    ]
};

/* Lock Old Comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180
window.lockOldComments.namespaceNumbers = [0, 112, 114, 116, 500];

/* Topic Block Log */
TBL_GROUP = "dere-en";