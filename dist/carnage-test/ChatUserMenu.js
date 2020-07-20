(function(mw, $, mainRoom){
    var WikiaChatMenu = $.extend({}, window.WikiaChatMenu);
    WikiaChatMenu.items = $.extend({
        actions: {
            title: 'Actions',
            items: [
                {
                    name: 'Message Wall',
                    subpage: 'Message Wall|User talk',
                    condition: Fandom.WikiFeatures['messageWall'].enabled,
                    link: '/wiki/$subpage:$username'
                },
                {
                    name: 'Contributions',
                    link: '/wiki/Special:Contributions:$username'
                },
                {
                    name: 'Private Message',
                    handler: function(username){
                        if (username !== mw.config.get('wgUserName')){
                            mainRoom.openPrivateChat(username);
                        }
                    }
                },
                {}
            ]
        },
        moderator: {
            title: 'Moderator Actions',
            items: [
                {
                    name: 'Kick',
                    init: function(){},
                    handler: function(username){
                        
                    }
                }
            ]
        }
    }, WikiaChatMenu.items);
}(mediaWiki, jQuery, mainRoom));