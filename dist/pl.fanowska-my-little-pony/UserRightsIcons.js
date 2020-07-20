window.UserTagsJS = {
        tags: {
  "              org:    { u:'Porządek i Organizacja' },
                 opiek:    { u:'Opiekun' },
                 tech:    { u:'Technik' }
        },
        modules: {
                inactive: 30,
                mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
                autoconfirmed: true,
                newuser: true,
                nonuser: true,
                custom: {
                        'AngelWithHerShotgun':            ['opiek'],
                        'Milakia':            ['org'],
                        'Ryukkopr':            ['opiek'],
                        'TheDarkAlicorn':            ['tech']
                }
        }
};
 
importArticles({type: "script", articles: ["u:dev:UserTags/code.js"]});