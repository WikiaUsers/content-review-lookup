/* C�digos de dise�o */
importArticles({
    type: 'script',
    articles: ['u:onceuponatime:MediaWiki:Snowing.js'
    ]
});
 
/* Cambio de t�tulo (Cr�ditos a Un Show M�s y MPLWiki) */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});