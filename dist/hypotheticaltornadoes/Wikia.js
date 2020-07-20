/**
 * Auto updating recent changes opt-in.
 * See w:c:dev:AjaxRC for info & attribution.
 */
 
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Watchlist', 'Log', 'Log/upload', 'Log/newusers', 'Contributions'];
window.ajaxIndicator = 'https://images.wikia.com/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});

/* LockForums config */
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 21,
    warningMessage: "This thread is now <actualDays> days old. Please refrain from commenting on it unless absolutely necessary. This thread will automatically archive when the last comment is <expiryDays> days old.",
    banners: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old thread, you may be filling up the e-mail boxes of many people who are still following this thread. Are you sure you want to do this?",
};