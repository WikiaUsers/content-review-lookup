/**
 * This version of the
 * Emoticon Panel is made
 * specifically for this
 * wiki. Please do not copy
 * unless you are given
 * permission to by an
 * administrator.
 * 
 * - Ultimate Dark Carnage
 **/

$(document).ready(function(event){
    var $body = $(this),
        Emoticons = {};
        
    function CreateEmote($elem, emote){
        var $emote_el = $('<img />').addClass('emoticon-icon emote');
        $emote_el.attr('src', Emoticons[emote]);
        $emote_el.attr('data-tooltip', emote);
        $emote_el.on('click', function(ev){
            var $txt = $('.Write [name="message"]').last();
            $txt.val($txt.val() + ' ' + emote);
            $('.EmoticonPanel').remove();
        });
        $('.EmoticonPanel').find('.panel-main').append($emote_el);
    }
    
    if ($body.hasClass('ChatWindow') === true){
        var $panel = $('<section />').addClass('EmoticonPanel panel'),
            emoticons = mw.config.get('wgChatEmoticons', wgChatEmoticons),
            $panel_button = $('<a />').attr('href', '#').addClass('panel-button').text('Emoticons');
        emoticons.split("\n").forEach(function(el, index, arr){ 
            if(el[0] === "*" && el[1] !== "*") 
                Emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim();
        }, this);
 
        $panel.html([
            $('<header />').addClass('panel-header')
                .html([
                    $('<h2 />').addClass('panel-heading panel-title').text('Emoticon Panel'),
                    $('<a />').attr('href', '#').addClass('panel-close')
                ]),
            $('<div />').addClass('panel-section panel-emoticons')
                .html([
                    $('<h3 />').addClass('panel-heading panel-subtitle'),
                    $('<article />').addClass('panel-main')
                ]),
            $('<div />').addClass('panel-section panel-recent')
                .html([
                    $('<h3 />').addClass('panel-heading panel-subtitle'),
                    $('<article />').addClass('panel-main')
                ])
        ]);
        
        $panel_button.on('click', function(e){
            $body.append($panel);
            for (var emote in Emoticons){
                if (Emoticons.hasOwnProperty(emote))
                    CreateEmote($('.EmoticonPanel .panel-emoticons'), emote);
            }
        });
        
        $('.public.wordmark').first().append($panel_button);
    }
});