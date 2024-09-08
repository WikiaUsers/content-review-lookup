if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat'){
    localStorage.setItem('original_title', document.title);
    window.flash = false;
    window.focused = true;
    window.originaltitle = localStorage.getItem('original_title');
    NodeChatDiscussion.prototype.mention = function(child){
        if (mainRoom.isInitialized){
            var mention_regex = {
                    global: /@\[([^\[\]\|]+)\]/g,
                    reg: /@\[([^\[\]\|]+)\]/
                },
                string = child.attributes.text,
                $elem = $('.Chat li#entry-'.concat(child.cid)).find('.message'),
                matches = string.match(mention_regex.reg);
            string = string.replace(mention_regex.global, function(match, name){
                // Create inline alert and flash title
                if (child.attributes.name !== wgUserName){
                    if (name === wgUserName){
                        var $inline_alert = $('<li class="inline-alert" />');
                        $inline_alert.text('You have been mentioned by ' + child.attributes.name + '!');
                        mainRoom.viewDiscussion.chatUL.append(function(){
                            if (window.focused === false){
                                window.flash = true;
                                clearInterval(window.flashinterval);
                                window.flashinterval = setInterval(function(){
                                    if (!window.flash){
                                        document.title = window.originaltitle;
                                        clearInterval(window.flashinterval);
                                        return;
                                    }
                                    document.title =
                                        (document.title == window.originaltitle) ?
                                        window.originaltitle :
                                        'You have been mentioned by ' + child.attributes.name + '!';
                                }, 500);
                            }
                            return $inline_alert;
                        });
                    }
                }
 
                var elem = '<span class="mentioned" data-user="' + name + '">';
                elem = elem.concat(name);
                elem = elem.concat('</span>');
                return elem;
            });
            $elem.html(string);
        }
    };
 
    mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.mention, mainRoom.viewDiscussion));
 
    $(window).on('focus', function(event){ window.focused = true; window.flash = false; document.title = window.originaltitle; });
    $(window).on('blur', function(event){ window.focused = false; });
}