/* Códigos de diseño */
importArticles({
    type: 'script',
    articles: ['u:onceuponatime:MediaWiki:Snowing.js'
    ]
});
 
/* Cambio de título (Créditos a Un Show Más y MPLWiki) */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});