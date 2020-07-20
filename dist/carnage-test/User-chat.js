$(document).ready(function(){
    var $ChatLi = $('.ChatWindow .Chat').find('li'),
        _timer;
    $ChatLi.on({
        'mousedown': function showMenu(event){
            _timer = setTimeout($.proxy(function(){
                var $target = $(this.target),
                    user = $target.attr('data-user'),
                    child = mainRoom.model.users.findByName(user),
                    $menu_html = $('<section class="user-menu menu"><header class="menu-header user" /><nav class="menu-items user-menu-items" /></section>'),
                    default_items = {
                        'Profile': '/wiki/User:' + encodeURIComponent(child.attributes.name),
                        'Message Wall': '/wiki/Message_Wall:' + encodeURIComponent(child.attributes.name),
                        'Contributions': '/wiki/Special:Contributions/' + encodeURIComponent(child.attributes.name),
                        'Blog': '/wiki/User_blog:' + encodeURIComponent(child.attributes.name)
                    },
                    mod_items = {
                        ''
                    };
                if (child){
                    var $user_html = $('<img class="user-avatar avatar" /><span class="user-name username" />');
                    $user_html.attr('src', child.attributes.avatarSrc);
                    $user_html.next('span.username').text(child.attributes.name);
                }
                
            }, event), 3000);
        },
        'mouseup': function cancel(event){
            clearTimeout(_timer);
        }
    });
});

window.EmoticonPanel = window.EmoticonPanel || {
    init: function init(){
        this.$body = $(document.body);
        this.Emoticons = this.parseEmoticons() || {};
        this._emoticons = mw.config.get('wgChatEmoticons', wgChatEmoticons);
        this.RecentEmoticons = {};
    },
    create: function create(){
        var Emoticons = this.Emoticons;
        for (var emote in Emoticons)
            if (Emoticons.hasOwnProperty(emote))
                this.createEmote($('.EmoticonPanel .panel-emoticons'), emote);
    },
    createEmote: function createEmote($elem, emote){
        var $emote_el = $('<div><img /></div>').addClass('emoticon emote'),
            $emote_img = $emote_el.find('img');
        $emote_img.attr({
            'src': Emoticons[emote],
            'data-title': emote
        }).on('click', function insert(event){
            var $txt = $('.Write [name="message"]').last();
            $txt.val($txt.val() ? $txt.val() + ' ' + emote : emote);
            if ($('.EmoticonPanel').length) $('.EmoticonPanel').hide();
            update_recent_emoticons($elem, emote);
        });
 
        if (!$('.panel-emoticons img[src="' + Emoticons[emote] + '"]').length)
            $('.emoticon-panel').find('.panel-emoticons .panel-main').append($emote_el);
    },
    parseEmoticons: function parseEmoticons(){
        var emote_split = this._emoticons.split(/\n/gi),
            Emoticons = {};
        $.each(emote_split, function createObj(el, index, arr){
            if (el[0] === '*' && el[1] !== '*')
                Emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim();
        });
        return Emoticons;
    },
    updateRecentEmoticons: function updateRecentEmoticons($elem, emote){
        var $emote_el = $('<div><img /></div>').addClass('emoticon emote'),
            $emote_img = $emote_el.find('img');
        $emote_img.attr({
            'src': Emoticons[emote],
            'data-title': emote
        }).on('click', function insert(event){
            var $txt = $('.Write [name="message"]').last();
            $txt.val($txt.val() ? $txt.val() + ' ' + emote : emote);
            if ($('.EmoticonPanel').length) $('.EmoticonPanel').hide();
            update_recent_emoticons($elem, emote);
        });
 
        if (!$('.panel-recent img[src="' + Emoticons[emote] + '"]').length){
            //TODO: Save the recent emoticons using local storage
            if ($('.panel-recent .panel-main .emote').length < 13){
                $('.EmoticonPanel').find('.panel-recent .panel-main').prepend($emote_el);
            } else {
                $('.EmoticonPanel').find('.panel-recent .panel-main .emote').last().remove();
                $('.EmoticonPanel').find('.panel-recent .panel-main').prepend($emote_el);
            }
        }
    }
};