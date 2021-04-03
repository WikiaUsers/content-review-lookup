!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Players',
        'Hanna Yoo',
        'Alex Baek',
        'Elliot Baek',
        'Jay',
        'Eva Lee',
        'Loveme',
        'Perry Joo',
        'Rosaline Kim',
        'Kate Lee',
        'Nathan Kang',
        'Kyle Jan',
        'Red Hood',
        'Gina Park',
        'Joseph Ha',
        'Alice Neul',
        'Hailey Lee',
        'Nathan Kim',
        'Travis Yoo',
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Players.css'
        });
    }
}( jQuery, mediaWiki );