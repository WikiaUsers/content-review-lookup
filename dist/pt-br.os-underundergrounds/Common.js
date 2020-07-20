window.UserTagsJS = {
modules: {},
tags: {
               bureaucrat: { u:'Lider da Banda'}, 
               newuser: { u:'Novo na Banda'},
               sysop: { u:'Administrador'},
               rollback: {u:'Reversor'},
               chatmoderator: {u:'Bob'},
               founder: {u:'Criador'},
               threadmoderator: {u:'Lud'},

} 
};

importArticles({ 
   type: 'script',
   articles: [
       'u:dev:UserTags/code.js'
   ]

});