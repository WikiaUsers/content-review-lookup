var p = mw.config.get( 'wgTitle' ), a;
 
a = [
    'Voidheart Edition'
];
 
if ( a.indexOf( p ) !== -1 ) {
    importArticle({
        type: 'style',
        article: 'MediaWiki:Voidheart.css'
    });
}