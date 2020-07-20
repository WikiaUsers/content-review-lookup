/* Any JavaScript here will be loaded for all users on every page load. */

var questThreadCustom = {        
    init: function () {        
        var container = 
            '<div class="questButton-container">'+
                '<table align="center">'+
                    '<tr></tr>'+
                '</table>'+
            '</div>';
        $('.msg-toolbar:first').after(container);      
        
        questThreadCustom.showButton();
    },
    
    popup: {
        // Send a popup to the user, used by the buttons.
        confirm: function (text) { 
            new BannerNotification(text, 'confirm').show();
        },
        notify: function (text) { 
            new BannerNotification(text, 'notify').show();
        },
        warn: function (text) { 
            new BannerNotification(text, 'warn').show();
        },
        error: function (text) { 
            new BannerNotification(text, 'error').show();
        },
    },  
    
    showButton: function () {
        // Choose which button need to be shown
        var quest = questConfig.page;
        var user = questConfig.user;
        var object = questConfig.questDatabase;

        if (object[quest]) {
            if (object[quest].state == 'open') {
                questThreadCustom.createButton('accept');
            }
            else if (object[quest].state == 'accepted') {
                questThreadCustom.createButton('confirm');
                questThreadCustom.createButton('annul');
            }
            else if (object[quest].state == 'confirmed') {
                if (questConfig.testGroups()) {
                    questThreadCustom.createButton('verifTrue');
                    questThreadCustom.createButton('verifFalse');
                }
                else {
                    questThreadCustom.createButton('waitingVerif');
                }
            }
        }
        else if (object.archive[quest]) {
            questThreadCustom.createButton('archived');
        }
        else {
            if (questConfig.testGroups()) {
                questThreadCustom.createButton('create'); 
            }
        }
    },
    
    removeButton: function (id) {
        console.log(id);
        if (!id) {
            $('.questButton').remove();
        }
        else {
            $('.questButton#'+id).remove();
        }
    },
    
    createQuest: function () {
        // Create a new quest in the Database.
        var info = {
            title: $('.msg-title').text().split('|')[1],
            difficulty: $('.msg-title').text().split('★')[0],
            game: $('span#game').text(),
            page: $('span#link').text(),
            pageType: $('span#page-type').text(),
            questType: $('span#quest-type').text(),
            goal: $('span#goal').text(),
        }; // On va stocker ici toutes les infos concernant la quête.
        
        questEditDatabase.changeDatabase('createQuest', info);
        questThreadCustom.popup.confirm('Ce fil a bien été défini en tant que "quête de la Guilde".');
    },
    
    verifQuestTrue: function () {
        // Once the quest has been confirmed by the user, the moderation need to verify the quest.
        questEditDatabase.changeDatabase('earnGuildPoint');
        questEditDatabase.changeDatabase('verifQuestTrue');
        questThreadCustom.popup.confirm('La Guilde Mogapédienne a validée la quête. Une notification sera envoyée à son contributeur.');
    },    

    verifQuestFalse: function () {
        // Once the quest has been confirmed by the user, the moderation need to verify the quest.
        questEditDatabase.changeDatabase('verifQuestFalse');
        questThreadCustom.popup.confirm('La Guilde Mogapédienne a refusée la quête. Une notification sera envoyée à son contributeur.');
    },   
    
    annulQuest: function () {
        // Allow to cancel the selected quest by erase the user of the database.
        questEditDatabase.changeDatabase('annulQuest');
        questThreadCustom.popup.warn('Vous avez abandonné la quête');
    },
    
    confirmQuest: function () {
        // Make the quest verifiable by the moderation. 
        questEditDatabase.changeDatabase('confirmQuest');
        questThreadCustom.popup.confirm('Votre quête a bien été validée, en attente de validation de la Guilde');
    },
    
    acceptQuest: function () {
        // Tip the user's name on the database.
        questEditDatabase.changeDatabase('acceptQuest'); 
        questThreadCustom.popup.notify('La quête a bien été enregistrée en votre nom');
    },
    
    createButton: function (type) {
        // Create a button which allow to accept, cancel or confirm the quest.
        switch (type) {
            case 'accept': 
                var text = 'Accepter';
                break;
            case 'confirm':
                var text = 'Valider';
                break;
            case 'annul': 
                var text = 'Abandonner';
                break;
            case 'verifTrue':
                var text = 'Valider les modifications';
                break;
            case 'verifFalse':
                var text = 'Refuser les modifications';
                break;
            case 'create':
                var text = 'Definir en tant que quête';
                break;
            default: 
                var text = 'Cliquer';
        }
        
        if (questConfig.questDatabase[questConfig.page]) {
            if (questConfig.user != questConfig.questDatabase[questConfig.page].user && questConfig.questDatabase[questConfig.page].user) {
                if (!questConfig.testGroups()) {
                    $('.questButton-container table tr').append('<td><div class="quest-waitingVerif" style="color:orange;">Cette quête est déjà en cours d\'execution par quelqu\'un d\'autre</div></td>');
                    return;
                }
            }
            else if (type == 'waitingVerif') {
                $('.questButton-container table tr').append('<td><div class="quest-waitingVerif" style="color:green;">En attente de validation de la Guilde ...</div></td>');
                return;
            }
        }
        else if (type == 'archived') {
            $('.questButton-container table tr').append('<td><div class="quest-waitingVerif" style="color:orange;">Cette quête a déjà été completée et validée.</div></td>');
            return;
        }
        
        var id = 'quest-'+type;
        var button = '<td><div class="questButton" id="'+id+'">'+text+'</div></td>';
        $('.questButton-container table tr').append(button);
        
        switch (type) {
            case 'accept': $('#'+id).click(questThreadCustom.acceptQuest);
                break;
            case 'confirm': $('#'+id).click(questThreadCustom.confirmQuest);
                break;
            case 'annul': $('#'+id).click(questThreadCustom.annulQuest);
                break;
            case 'verifTrue': $('#'+id).click(questThreadCustom.verifQuestTrue);
                break;
            case 'verifFalse': $('#'+id).click(questThreadCustom.verifQuestFalse);
                break;
            case 'create': $('#'+id).click(questThreadCustom.createQuest);
                break;
            default: console.log('This button type is not recognize.');
        }  
    },
};