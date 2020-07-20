/* Any JavaScript here will be loaded for all users on every page load. */
 
// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
// ==============================
 
 
// ==============================
// Reveal Anon Users
// ==============================
importArticles({
    type: "script",
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js',
    ]
});