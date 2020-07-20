/* Οποιοσδήποτε κώδικας JavaScript εδώ θα φορτωθεί για όλους τους χρήστες σε κάθε φόρτωση σελίδας. */
// Ajax RC Φόρτωση
window.ajaxPages = [
    "A Wiki - DevWiki:Πολιτική",
    "A Wiki - Dev Wiki:Πολιτική",
    "MediaWiki:ImportJS",
    "MediaWiki:Common.js",
    "MediaWiki:Wikia.js",
    "MediaWiki:Monobook.js",
    "MediaWiki:Common.css",
    "MediaWiki:Wikia.css",
    "MediaWiki:Monobook.css"
];
window.ajaxSpecialPages = [
    "RecentChanges",
    "WikiActivity",
    "Images",
    "Videos",
    "Log",
    "Contributions",
    "AllPages"
];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshHoverText = 'Αυτόματη Ανανέωση σελίδας';

// This configuration option makes Κλωκάκι script
// append the button into right rail instead of page header
// so wikis can import this script without breaking the
// customization policy.
window.InTheRail = true;