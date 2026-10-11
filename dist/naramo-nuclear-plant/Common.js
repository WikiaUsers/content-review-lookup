/* Any JavaScript here will be loaded for all users on every page load. */

/*
	[[MediaWiki:ImportJS]] configuration
*/
	// MarkBlocked strike and tooltip
window.mbIndefStyle = 'color: #ff0000; opacity: 0.7; font-style: italic; text-decoration: line-through; text-decoration-thickness: 0.1px; font-weight: 300; letter-spacing: 0.8px';
window.mbTempStyle = 'opacity: 0.7; font-style: italic; font-weight: 300; letter-spacing: 0.8px; text-decoration: line-through';
window.mbPartialStyle = 'opacity: 0.7; font-style: italic; font-weight: 300; letter-spacing: 0.8px';

window.mbTooltip = 'blocked by $2 for $1 with the reason: "$3" ($4 ago)';

	// ReportArticle
window.reportArticleConfig = {
	group: ['sysop', 'content-moderator'],
	namespaces: [0, 1, 6, 7, 500],
};

window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides.ReportArticle = {
  'default-body': 'An article has been reported: $1. It has been identified that you are part of a group set up to receive such reports.',
  'default-body-note': 'Please review the report.\n',
};

	// InactiveUsers
window.InactiveUsers = { months: 1 };

	// AutoCreateUserPage
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{New User}}',
    }, 
    summary: 'Automatically creating this user\'s page',
    notify: true
};