if (typeof window.ChatJSDisable === 'undefined' || window.ChatJSDisable === false) {
    document.getElementsByTagName('body')[0].onload = function() {
        var chatTopic     = document.createElement('div'),
            chatMessage   = document.createElement('span'),
            chatRulesLink = document.createElement('a'),
            chatOptions   = document.createElement('script'),
            chatModExt    = document.createElement('script');
            
        chatTopic.setAttribute('class', 'chattopic');
        chatTopic.style.color      = '#3A3A3A';
        chatTopic.style.fontSize   = '13px';
        chatTopic.style.fontWeight = 'bold';
        chatTopic.style.lineHeight = '1.6';
        chatTopic.style.marginLeft = '110px';
        chatTopic.style.position   = 'absolute';
        chatTopic.style.textAlign  = 'center';
        chatTopic.style.width      = '80%';
        chatTopic.style.zIndex     = '0';
        
        chatMessage.textContent = 'Welcome to the Spinpasta Wiki Chat.\nPlease read our policies ';
        chatMessage.style.color = '#FFFFFF';
        
        chatRulesLink.setAttribute('href', '/wiki/Spinpasta_Wiki:Site_Rules/Chat_Rules');
        chatRulesLink.setAttribute('title', 'Chat Rules');
        chatRulesLink.textContent = 'here.';
        chatRulesLink.style.position       = 'relative';
        chatRulesLink.style.textDecoration = 'underline';
        
        chatMessage.appendChild(chatRulesLink);
        chatTopic.appendChild(chatMessage);
        
        document.getElementsByClassName('wordmark')[0].insertBefore(chatTopic, document.getElementsByClassName('wordmark')[0].firstChild);
        
        chatOptions.setAttribute('src', 'http://dev.wikia.com/index.php?title=ChatOptions/code.js&action=raw&ctype=text/javascript');
        chatModExt.setAttribute('src', 'http://dev.wikia.com/index.php?title=QuickModTools/code.js&action=raw&ctype=text/javascript');
        
        document.getElementsByTagName('head')[0].appendChild(chatOptions);
        document.getElementsByTagName('head')[0].appendChild(chatModExt);
    };
}