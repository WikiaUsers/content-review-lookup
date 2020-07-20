/**
 * !block
 * Allows for users with block rights to block users in the chat with a textbox command
 * @Author Mario&LuigiBowser'sInsideStory
 */
 
;(function($, mw){
    if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
    
    // call API
    function Api(method, data, callback) {
        data.format = 'json';
        $.ajax({
            type: method,
            data: data,
            dataType: 'json',
            url: wgScriptPath + '/api.php',
            success: function(response) {
                callback(response);
            },
            error: function(){
                mainRoom.model.chats.add(new models.InlineAlert({text: "An API error has occured. Please try again later."}));
            }
        });
    }
    $(document).on('keydown', 'textarea[name="message"]', function(e){
        var $value = $(this).val();
        if (e.which === 13 && $value.substring(0, 6) === '!block') {
            if (/sysop|helper|vstf|bureaucrat|global-discussion-moderator/m.test(mw.config.get('wgUserGroups').join(' ')) === false) {
                $(this).val('');
                mainRoom.model.chats.add(new models.InlineAlert({text: 'You do not have permission to block users.'}));
                return false;
            }
            var textData = $value.slice(7).split(' | ');
            if (textData[0] === mw.config.get('wgUserName')){
                $(this).val('');
                mainRoom.model.chats.add(new models.InlineAlert({text: 'You cannot block yourself.'}));
                return false;
            }
            var config = {
                action: 'block',
                user: textData[0],
                reason: textData[1],
                expiry: textData[2],
                token: mw.user.tokens.get('editToken')
            };
            if (textData.indexOf('disable talk page') === -1) config.allowusertalk = 1;
            
            // For whatever reason you may want to leave the user's IP unblocked and not reblocking any existing ones.
            if (textData.indexOf('disable autoblock') === -1) config.autoblock = 1;
            if (textData.indexOf('disable reblock') === -1) config.reblock = 1;
            Api('POST', config, function(d){
                if (!d.error){
                    
                    // If that user is in the chat
                    if (mainRoom.model.users.findByName(textData[0])) {
                        mainRoom.kick({name: textData[0]});
                    }
                    mainRoom.model.chats.add(new models.InlineAlert({text: textData[0] + ' has been successfully blocked!'}));
                }
                else mainRoom.model.chats.add(new models.InlineAlert({text: 'An error occurred while blocking ' + textData[0] + ': ' + d.error.info + '.'}));
            });
            $(this).val('');
            return false;
        }
    });
})(jQuery, mediaWiki);