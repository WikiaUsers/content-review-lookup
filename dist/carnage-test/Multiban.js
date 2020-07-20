// Prevents the required script from being imported more than once
if (!$('script[src*="MediaWiki:CustomUI.js" i]').length) importArticle({ type: 'script', article: 'MediaWiki:CustomUI.js'});

const MultiBan = {};
MultiBan.dialogTitle = 'Mass Ban';
MultiBan.dialog = new CustomDialog(MultiBan.dialogTitle);

// Dialog configurations
MultiBan.dialog.contentHTML = function(){
    let DialogHTML =
        $('<div class="modal-content" />').html(function(){
            
        });
    return DialogHTML;
};

MultiBan.dialog.id = 'MassBanModal';
MultiBan.dialog.width = 650;
MultiBan.dialog.buttons = [{
    'Cancel': {
        id: 'mass-ban-cancel',
        handler: function(event){
            if ($(MultiBan.dialog.selector).length)
                MultiBan.dialog.close();
            else return;
        }
    },
    'Ban!': {
        id: 'mass-ban-confirm',
        defaultButton: true,
        handler: function(event){
            if ($(MultiBan.dialog.selector).length)
                MultiBan.dialog.close(function(){
                    var users = $('.userlist .selected').map(function(){
                        var data_user = $(this).attr('data-user');
                        if (data_user !== '')
                            return data_user;
                    }),
                        user_reasons = users.map(function(){
                            
                        }),
                        user_duration = users.map(function(){
                            
                        });
                    
                    
                }, 400);
        }
    }
}];