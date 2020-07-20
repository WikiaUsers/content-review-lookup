window.ajaxSpecialPages = [
    'RecentChanges',
    'WikiActivity',
    'Log',
    'Images',
    'Watchlist'
];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
window.railWAM = { logPage: 'Project:WAM Log' };

// Konfiguracja skryptu LockOldBlogs
    window.LockOldBlogs = {
        expiryDays: 365,
        expiryMessage: 'Ten blog nie był komentowany przez ponad <expiryDays> dni. Nie ma potrzeby dodawać nowych komentarzy.',
        nonexpiryCategory: 'Niewygasające blogi'
    };
 
window.LockForums = {
    expiryDays: 365,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 30 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum"
};