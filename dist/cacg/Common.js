/* Any JavaScript here will be loaded for all users on every page load. */
switch (mw.config.get('wgPageName')) {
    case 'A-007_DATA_REDACTED':
        window.SpoilerAlertJS = {
    question: 'WARNING! Access to this portion of information requires Level 5 Clearance.',
    yes: 'Enter Level 5 Credentials',
    no: 'Decline',
    fadeDelay: 1600
    };
    break;
    case 'A-090_The_King_With_Violet':
        window.SpoilerAlertJS = {
    question: 'WARNING! Access to this portion of information requires Seraphim Approval.',
    yes: 'Enter Seraphim Authorization Credentials',
    no: 'Decline',
    fadeDelay: 1600
        };
		break;
}