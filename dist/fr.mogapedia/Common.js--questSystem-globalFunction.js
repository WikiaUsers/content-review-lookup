/* Any JavaScript here will be loaded for all users on every page load. */

function questInit () {
    // Initialise le lancement de chaque script et choisis ceux à ne pas activer.
    var namespace = mw.config.get('wgNamespaceNumber');
    var board = new mw.Title(decodeURIComponent(new mw.Uri($('.page-header__page-subtitle > nav > a:nth-of-type(2)').attr('href')).path.substring(6))).getNameText();
    
    questGetDatabase.getDatabase('quest', false, false);
    questGetDatabase.getDatabase('user', false, false);
    
    if (board != questConfig.guildBoard || namespace != 1201)  {
            console.log('"questThreadCustom" is not loaded');
    } 
    else {
       questThreadCustom.init(); 
    }
    
    questNotificationMenu.init(); // S'initialise dans tout les cas, étant sur la barre de navigation du wikia.
    
    if (questConfig.userDatabase[questConfig.user]) {
        if (questConfig.userDatabase[questConfig.user].questSystem.viewNotif) {
            switch (questConfig.userDatabase[questConfig.user].questSystem.viewNotif) {
                case 'accepted': new BannerNotification('Votre quête a belle et bien été validée ! Vous avez reçu vos points de guilde correspondant.', 'notify').show();
                    break;
                case 'refused': new BannerNotification('Vos modifications ont été refusées ... Veuillez vous rendre sur le fil de la quête en question pour en savoir plus.', 'warn').show();
                    break;
            }
            questConfig.userDatabase[questConfig.user].questSystem.viewNotif = false;
            questEditDatabase.editDatabase(JSON.stringify(questConfig.userDatabase), 'user');
        }    
    }
}

var questGetDatabase = {
    readDatabase: function (object) {
        // Extract the useful text from the object and remove the category from the result.
        var pageId;
        for (var key in object.query.pages) {
            pageId = key.toString();
        }
        var text = object.query.pages[pageId].revisions[0]['*'];
        
        return JSON.parse(text.split("[[")[0]);
    },
    
    getDatabase: function (type, refresh, async) {     
        // Return a Response Object which contain the content of the database page.
        if (typeof async == 'undefined') {async = true}
        switch (type) {
            case 'quest': var path = questConfig.questDatabasePath;
                break;
            case 'user': var path = questConfig.userDatabasePath;
                break;
        }
        $.ajax({
            url: questConfig.apiPhp,
            data: {
                'format': 'json',
                'action': 'query',
                'titles': path,
                'prop': 'revisions',
                'rvprop': 'content'
            },
            dataType: 'json',
            type: 'GET',
            cache: false,
            async: async
        })
        .done(function (data) {
            if (type == 'quest') {
                questConfig.questDatabase = questGetDatabase.readDatabase(data);
                if (!questConfig.questDatabase.archive) {
                    questConfig.questDatabase.archive = {};
                }  
            }
            else {
                questConfig.userDatabase = questGetDatabase.readDatabase(data);
            }

            // Si l'utilisateur est bien sur un fil de quête, rafraichi les boutons
            if (refresh) {
                questThreadCustom.removeButton();
                questThreadCustom.showButton();
            }
        });
    },
};

var questEditDatabase = {
    changeDatabase: function (type, info) {
        // Edit the new database, depend of the type of modification.
        var quest = questConfig.page;
        var user = questConfig.user;
        var questDb = questConfig.questDatabase;
        var userDb = questConfig.userDatabase;

        switch (type) {
            case 'acceptQuest': 
                if (!userDb[user]) {
                    userDb[user] = {
                        questSystem: {
                            guildPoint: 0,
                            bonusQuest: 0,
                            nbQuest: 0,
                            rank: 'novice',
                            quest: null,
                            viewNotif: false,
                        },
                    };
                }
                questDb[quest].state = 'accepted';
                questDb[quest].user = user;
                userDb[user].questSystem.quest = quest;
                break;

            case 'annulQuest':
                questDb[quest].state = 'open';
                questDb[quest].user = null;
                userDb[user].questSystem.quest = null;
                break;

            case 'confirmQuest':
                questDb[quest].state = 'confirmed';
                break;

            case 'verifQuestTrue':
                var questUser = questDb[quest].user;
                questDb[quest].state = 'finished';
                questDb[quest].user = null;
                userDb[questUser].questSystem.quest = null;
                userDb[questUser].questSystem.nbQuest += 1;
                userDb[questUser].questSystem.viewNotif = 'accepted';
                questDb.archive[quest] = questDb[quest];
                delete questDb[quest];
                break;
                
            case 'verifQuestFalse':
                var questUser = questDb[quest].user;
                questDb[quest].state = 'accepted';
                userDb[questUser].questSystem.viewNotif = 'refused';
                break;

            case 'createQuest':
                if (!questDb[quest]) {
                    questDb[quest] = {
                        state: 'open',
                        user: null,
                        id: quest,
                        link: window.location.href,
                        info: info, // 'info' est un objet. Défini dans 'createQuest'.
                    };
                    questDb[quest].state = 'open';
                }
                break;

            case 'earnGuildPoint':
                var questUser = questDb[quest].user;
                var level = questDb[quest].info.difficulty;
                var nbquest = userDb[questUser].questSystem.bonusQuest;
                // var points = 0.5*level*nbquest + 9.5*level
                var points = 10*level;
                userDb[questUser].questSystem.guildPoint += points;
                break;

            default: return null;
        }

        console.log(questDb);
        questEditDatabase.editDatabase(JSON.stringify(questDb), 'quest', true); // On met à jour la page du wikia contenant la base de donnée
        questEditDatabase.editDatabase(JSON.stringify(userDb), 'user', true);
    },
    
   editDatabase: function (content, type, refresh) {
       switch (type) {
           case 'quest': var path = questConfig.questDatabasePath;
               break;
           case 'user': var path = questConfig.userDatabasePath;
               break;
       }
        $.ajax({
            url: questConfig.apiPhp,
            data: {
                'format': 'json',
                'action': 'edit',
                'title': path,
                'text': content,
                'token': mw.user.tokens.get('editToken')
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                console.log('Success!');
            },
            error: function (data) {
                console.log('Error !');
            },
        })
        .done(function (data) {
            questGetDatabase.getDatabase(type, refresh); // On met à jour les informations en mettant à jour la page (sans la recharger).
        });
   },
};

var questConfig = {
    version: '1.0',
    modoGroups: ['bureaucrat', 'sysop', 'content-moderator'],
    guildBoard: 'Guilde Mogapédienne',
    
    questDatabasePath: 'Base_de_données/quest-data',
    userDatabasePath: 'Base_de_données/user-data',
    wikiaPhp: 'http://fr.mogapedia.wikia.com/wikia.php',
    apiPhp: 'http://fr.mogapedia.wikia.com/api.php',
    
    questDatabase: null,
    userDatabase: null,
    
    page: mw.config.get('wgTitle'),
    user: mw.config.get('wgUserName'),
    
    testGroups: function () {
        // Check if the user is a modo. Return True if yes.
        for (i=0, length=questConfig.modoGroups.length; i<length; i++) {
            if (mw.config.get('wgUserGroups').indexOf(questConfig.modoGroups[i]) > -1) {
                return true;
            }
        }
        return false;
    },
};

questInit();