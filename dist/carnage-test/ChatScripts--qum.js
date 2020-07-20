if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat'){
    NodeChatDiscussion.prototype.QUM = function(child){
        if (mainRoom.isInitialized){
            var $elem = $('.Chat li#entry-'.concat(child.cid));
            $elem.on('contextmenu touchstart touchend', function(event){
                switch (event.type){
                    case 'contextmenu':
                        if (!event.ctrlKey) return;
                        event.preventDefault();
                        
                        break;
                }
            });
        }
    };
}