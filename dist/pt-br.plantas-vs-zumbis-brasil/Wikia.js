// Etiqueta para usuários inativos por mais de 1 mês
InactiveUsers = { text: 'Inativo' };
importScriptPage('InactiveUsers/code.js', 'dev');

// Personalização de usuário
importArticles({
    type: 'script',
    articles: [
        'u:dev:TopEditors/code.js',                 // Editores
        'u:dev:InactiveUsers/code.js',              // Etiqueta em Usuários
        'u:dev:AjaxRC/code.js'                 // Atualização Automática
    ]
});