/* Color de Users especiales */
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'staff': '#8B00FF',
        'sysop': '#32EEFD',
        'rollback': '#00bfff',
        'bot': '#5f5ese',
        'chatmoderator': '#01ff5f',
        'bureaucrat': '#32EEFD',
    },
    styles: {
        // 'group-name': 'styles',
        'sysop': 'font-weight: normal' ,
        'staff': 'font-weight: normal' ,
        'bureaucrat': 'font-weight: normal;'
    }
};
importArticles({ type: 'script', articles: [ 'u:dev:HighlightUsers/code.js' ] 
 });