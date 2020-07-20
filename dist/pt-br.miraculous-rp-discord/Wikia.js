// Importações
importArticles({
    type: 'script',
    articles: [
        //'u:c:User:Joeytje50/ChatPMs.js', // Chat Múltiplo
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Opções Múltiplas
    ]
});

/* Adds icons to page header
 * by: The 888th Avatar, adapted to new header by Thailog
 */
$(function() {
    if( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 115px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#icons' ) );
        $( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
    }
});