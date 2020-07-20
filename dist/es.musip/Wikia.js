/*** El codigo que afecta el codigo java scrip de la piel Wikia de Musip Wiki esta acontinuacion ***/

/*** Botones sociales **/
var SocialMediaButtons = { 
position: 'top',
colorScheme: '#ffba00',
buttonSize: '27px',
wikiTwitterAccount: 'default'
};
 
importArticles({
type: 'script',
articles: [
'w:c:dev:SocialIcons/code.js',
'MediaWiki:Parallax.js'
]
});
 
/*** Enlaces de Interlanguage en el foro ***/
$(function(){
if ($('#forum-display').length ) {
$('#forum-display').insertBefore('#WikiaFooter');
}
});