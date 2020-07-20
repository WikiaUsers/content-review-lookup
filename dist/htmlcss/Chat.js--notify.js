localStorage.setItem('original_title', document.title);
window.count = 0;
window.originalTitle = localStorage.getItem('original_title');
window.focused = true;

if (mw.config.get('wgPageName') == 'Special:Chat'){
    NodeChatDiscussion.prototype.notifyCount = function(child){
        if (mainRoom.isInitialized && child.attributes.name != wgUserName){
            if (window.focused === true){
                window.count = 0;
                document.title = window.originalTitle;
                return;
            }
            if (window.count <= 999) window.count += 1;
            else if (window.count > 999) window.count = '999+';
            document.title = '('.concat(window.count) + ') ' + window.originalTitle;
        }
    };
    
    mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.notifyCount, mainRoom.viewDiscussion));
    
    $(window).on('blur', function(event){ window.focused = false; });
    $(window).on('focus', function(event){ window.focused = true; document.title = window.originalTitle; });
}