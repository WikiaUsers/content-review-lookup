//
// Qualquer JavaScript aqui vai ser carregado para todos os usu�rios que usam
// a pele Wikia em cada carregamento da p�gina
//
//
// Formato para v�rios scripts
//
// importArticles({
//   type: "script",
//     articles: [
//       "MediaWiki:Common.js",
//       "MediaWiki:Common.js"
//     ]
// });
//
//
// Importa os scripts localizados no MediaWiki:Common.js
//
 
importArticle({
    type: "script",
    article: "MediaWiki:Common.js"
});