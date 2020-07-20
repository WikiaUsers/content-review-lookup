window.command = window.command || {};

command.commandList = 
    {
        afk: {
            name: 'away',
            action: function(){
                    if($('.ChatHeader .User').hasClass('away') == false){
                        toggleAway();
                    }
            }
        },
        epicbarrage: {
            name: 'epicbarrage',
            action: function(){
                    $('.Write textarea[name="message"]').val('(epic) (epic) (epic) (epic)');
                    return true;
            }
        },
        options: {
            name: 'options',
            action: function(){
                    openOptions();
            }
        },
        slap: {
            name: 'slap',
            action: function(){
                    $('.Write textarea[name="message"]').val('/me slaps you around a bit with a large trout');
                    return true;
            }
        }
    };