
/* Color de Users especiales */
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'staff': '#da0da0',
        'sysop': '#04E4FE',
        'rollback': '#00bfff',
        'bot': '#5f5ese',
        'chatmoderator': '#01ff5f',
        'bureaucrat': '#04E4FE',
    },
      styles: {
        // 'group-name': 'styles',
        'sysop': 'font-weight: normal' ,
        'staff': 'font-weight: normal' ,
        'chatmoderator': 'font-weight: normal' ,
        'rollback': 'font-weight: normal' ,
        'bureaucrat': 'font-weight: normal',
    }
};
importArticles({ type: 'script', articles: [ 'u:dev:HighlightUsers/code.js' ] 
 });