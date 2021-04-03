var p = mw.config.get( 'wgTitle' ), a;
 
a = [
    'Édition Coeur-du-Vide'
];
 
if ( a.indexOf( p ) !== -1 ) {
    importArticle({
        type: 'style',
        article: 'MediaWiki:CoeurduVide.css'
    });
}