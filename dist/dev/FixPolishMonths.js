/**
 * Fixes grammatical form of Polish months in users' profiles
 * @author Rail01 <railfail536@onet.pl>
 */
require([
    'wikia.window',
    'jquery',
    'mw'
], function( window, $, mw ) {
    if (
        mw.config.get( 'wgUserLanguage' ) !== 'pl' ||
        !$( '.UserProfileMasthead' ).exists() ||
        window.FixPLMonthsLoaded
    ) return;
    window.FixPLMonthsLoaded = true;

    var $birthday = $( '.UserProfileMasthead .masthead-info .details ul li:contains("Urodziny")' );

    // https://stackoverflow.com/a/16577007
    function allReplace( retStr, obj ) {
        for ( var x in obj ) {
            retStr = retStr.replace(
                new RegExp( x, 'g' ),
                obj[x]
            );
        }
        return retStr;
    }

    $birthday.html(
        allReplace($birthday.html(), {
            'styczeń': 'stycznia',         // January
            'luty': 'lutego',              // February
            'marzec': 'marca',             // March
            'kwiecień': 'kwietnia',        // April
            'maj': 'maja',                 // May
            'czerwiec': 'czerwca',         // June
            'lipiec': 'lipca',             // July
            'sierpień': 'sierpnia',        // August
            'wrzesień': 'września',        // September
            'październik': 'października', // October
            'listopad': 'listopada',       // November
            'grudzień': 'grudnia'          // December
        })
    );
});