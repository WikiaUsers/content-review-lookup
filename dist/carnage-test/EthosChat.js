/**************
 * Ethos Chat
 * ------------
 * Written by Ultimate Dark Carnage
 *************/
 
// Importing scripts before the page loads
importArticles({
    type: 'script',
    articles: [
        'User:' + wgUserName + '/ethos-chat.js'
    ]
}, {
    type: 'style',
    articles: [
        'MediaWiki:EthosChat.css',
        'User:' + wgUserName + '/ethos-chat.css'
    ]
});

// Creating the primary object
var Ethos = {
    version: '1.0.0 alpha',
    chatLoaded: false,
    href: location.href.replace(/#[\S]*/, ''),
    loadingIndicator: {
        image: Ethos.retrieveWordmark(),
        message: 'Loading Chat...'
    },
    timeout: '500ms'
};

$(document).ajaxSend(function(_, _2, settings){
    if (Ethos.href === settings.url || Ethos.chatLoaded === false){
        Ethos.loadingScreen.show(function($screen){
            $screen = $screen || $('#LoadingScreen');
            var hue = 0;
            var _i = setInterval(function(){
                var hsl = 'hsl(' + hue + ', 50, 50)';
                $screen.css('background-color', hsl);
                hue += 15;
            }, 100);
            
            if (hue > 360) clearInterval(_i);
        });
    }
}).ajaxComplete(function(_, _2, settings){
    if (Ethos.href === settings.url || Ethos.chatLoaded === false){
        Ethos.loadingScreen.hide(function($screen){
            $screen = $screen || $('#LoadingScreen');
            setTimeout(function(){
                $screen.remove();
                Ethos.chatLoaded = true;
            }, Ethos.parseTime(Ethos.timeout));
        });
    }
});