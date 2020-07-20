(function(mw, $, mainRoom, config){
    if (config.disableActions) return;
    
    FandomizedChat.Actions = Object.create(null);
    
    FandomizedChat.Actions.PM = Object.create(null);
    
    FandomizedChat.Actions.PM.createUI = function(){
        var $modal = FandomizedChat.openModal(function(modal){
            if (modal instanceof FandomizedChat.Modal){
                modal.id = 'MultiPM-modal';
                modal.heading = 'Multi PM';
                modal.content = FandomizedChat.createForm({
                    'Users': {
                        type: 'user-list',
                        source: FandomizedChat.users,
                        hasAvatar: true,
                        hasGroups: true,
                        rowlimit: 2
                    }
                });
                modal.buttons = FandomizedChat.createButtonGroup({
                    'Cancel': {
                        id: 'MultiPM-cancel',
                        handler: function(event){
                            modal.close();
                        }
                    },
                    'Submit': {
                        id: 'MultiPM-submit',
                        handler: function(event){
                            var data = FandomizedChat.getDataFromForm(modal.content);
                        }
                    }
                });
            }
        });
    };
    
    FandomizedChat.Actions.PM.trigger = function(users){
        if (users.length > 0){
            if (users.indexOf(mw.config.get('wgUserName')) > -1){
                users = users.filter(function(user){
                    return user !== mw.config.get('wgUserName');
                });
            }
            mainRoom.openPrivateChat(users);
        }
    };
}(mediaWiki, jQuery, mainRoom, window.FandomizedChatConfig = window.FandomizedChatConfig || {}));