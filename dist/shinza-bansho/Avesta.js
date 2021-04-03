!function( $, mw) {
    var p = mw.config.get( 'wgTitle' ), a;
    a = [
           'Khvarenah',
           'Bahlavan',
           'Nadare',
           'Frederica',
           'Mashyana',
           'Kaikhosru',
           'Aka Manah',
        ];
    if (a.indexOf(p) !== -1){
        importArticle({
            type: 'style',
            Article: 'MediaWiki:AvestaDruj.css'
        });
    
    }
    }( jQuery, mediaWiki );