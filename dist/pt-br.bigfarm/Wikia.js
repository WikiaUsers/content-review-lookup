//
// Qualquer JavaScript aqui vai ser carregado para todos os usuários que usam
// a pele Wikia em cada carregamento da página
//
//
// Formato para vários scripts
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