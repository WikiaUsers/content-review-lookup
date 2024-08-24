// Etiqueta para usu�rios inativos por mais de 1 m�s
InactiveUsers = { text: 'Inativo' };
importScriptPage('InactiveUsers/code.js', 'dev');

// Personaliza��o de usu�rio
importArticles({
    type: 'script',
    articles: [
        'u:dev:TopEditors/code.js',                 // Editores
        'u:dev:InactiveUsers/code.js',              // Etiqueta em Usu�rios
        'u:dev:AjaxRC/code.js'                 // Atualiza��o Autom�tica
    ]
});