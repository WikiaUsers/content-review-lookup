/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Color de Usuarios con cargos */
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'staff': '#7133FF',
        'sysop': '#57739F',
        'rollback': '#00bfff',
        'bot': '#5f5ese',
        'chatmoderator': '#01ff5f',
        'bureaucrat': '#04E4FE',
        'threadmoderator': '#FF008F',
    },
    styles: {
        // 'group-name': 'styles',
        'sysop': 'font-weight: normal' ,
        'staff': 'font-weight: normal' ,
        'bureaucrat': 'font-weight: normal',
    }
};
importArticles({ type: 'script', articles: [ 'u:dev:HighlightUsers/code.js' ] 
 });