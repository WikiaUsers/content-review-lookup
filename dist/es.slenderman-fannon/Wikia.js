/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página de la piel Wikia */
 
// ################### Developers ###################
 
importArticles({
    type: 'script',
    articles: [
// Hojas de estilos en páginas de usuario
        'u:dev:SexyUserPage/code.js',
// Botón bienvenida del muro
        'u:dev:WallGreetingButton/code.js'
    ]
});