/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
window.UserTagsJS = {
        tags: {
                honor:    { u:'Honorowy użytkownik' }
        },
        modules: {
                inactive: 30,
                mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
                autoconfirmed: true,
                newuser: true,
                nonuser: true,
                custom: {
                        'Vuh':            ['honor']
                }
        }
};
 
importArticles({type: "script", articles: ["u:dev:UserTags/code.js"]});