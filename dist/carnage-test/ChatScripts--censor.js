if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat'){
    NodeChatDiscussion.prototype.censor = function(child){
        if (mainRoom.isInitialized){
            var bad_words = window.badWords || ['ass', 'shit', 'fuck', 'cunt'],
                bad_word_pattern = new RegExp('('.concat(bad_words.join('|')).concat(')'), 'gi'),
                text = child.attributes.text,
                elem = $('.Chat li#entry-'.concat(child.cid)).find('.message');
            if (bad_words.length){
                text = text.replace(bad_word_pattern, function(match, result){
                    var r = '<span class="censored" data-tooltip="' + result + '">';
                    r = r.concat(result);
                    r = r.concat('</span>');
                    return r;
                });
                elem.html(text);
            }
        }
    };
    
    mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.censor, mainRoom.viewDiscussion));
}