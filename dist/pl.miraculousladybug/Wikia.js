// Umieszczony tutaj kod JavaScript wykonywany jest w przeglądarce każdego użytkownika wiki
// Kod autorstwa użytkownika Rail01
require( [ 'wikia.window' ], function( window ) {
    // Zapobieganie wielokrotnemu ładowaniu
    if ( window.SiteWideJsLoaded ) return;
    window.SiteWideJsLoaded = true;
 
    /**
     * Konfiguracja skryptów zewnętrznych
     */
    // InactiveUsers
    window.InactiveUsers = {
        text: {
            unknown: 'nieaktywny',
            female: 'nieaktywna'
        }
    };
 
    // RevealAnonIP
    window.RevealAnonIP = {
        permissions: [
            'sysop',
            'bureaucrat'
        ]
    };
 
    // AjaxRC
    window.ajaxSpecialPages = [
        'Recentchanges',
        'WikiActivity',
        'Following',
        'Newpages',
        'Images',
        'Videos',
        'Log'
    ];
} );

// RailWam
window.railWAM = {
    logPage:"Project:WAM Log"
};