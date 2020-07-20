importArticles(/*{
    type: 'script',
    articles: [
        "u:dev:MessageBlocker/code.js",
        "u:c:User:Ultimate_Dark_Carnage/commands.js",
        "u:c:User:Ultimate_Dark_Carnage/test.js",
        "u:c:User:Ultimate_Dark_Carnage/sandbox2.js"
    ]
}, */{
    'type': 'style',
    articles: [
        'u:c:User:Ultimate_Dark_Carnage/chat2.css'
    ]
});
 
navigator.info = (function() {
    var N = navigator.appName,
        ua = navigator.userAgent,
        tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
 
    return M;
})();
 
$(document).ready(function(){
    var msg_no = 0;
    localStorage.setItem('title', document.title);
    $(window).on('blur', function(){
        $('.ChatWindow').on('DOMNodeInserted', '.Chat ul > li .message', function(event){
            msg_no = msg_no + 1;
            var original_title = localStorage.getItem('title');
            document.title = '(' + msg_no + ') ' + original_title;
        });
    });
 
    $(window).on('focus', function(){
        $('.ChatWindow').off('DOMNodeInserted');
        msg_no = 0;
        var original_title = localStorage.getItem('title');
        document.title = original_title;
    });
});
 
/**
 * Chat Navigation
 **/
 
// Part I
window.chat_nav = function chat_nav(){
    this.loaded = false;
    this.active = false;
    this.items = [];
    this.$chatWindow = $('body.ChatWindow');
    if (this.loaded === false) this.load();
    return this;
};
 
// Part II
chat_nav.prototype.emoticons = function emoticons(){
    var $body = $(document.body),
        Emoticons = {},
        RecentEmoticons = {},
        create_emote = function CreateEmote($elem, emote){
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
                $('.EmoticonPanel').find('.panel-emoticons .panel-main').append($emote_el);
        },
        update_recent_emoticons = function UpdateRecentEmoticons($elem, emote){
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
        },
        $panel = ($body.hasClass('ChatWindow')) ? $('<section><header /><div /><div /></section>').addClass('EmoticonPanel emoticon-panel panel') : null,
        _emoticons = mw.config.get('wgChatEmoticons', wgChatEmoticons);
    Array.prototype.forEach.call(_emoticons.split(/\n/gi), function createObj(el, index, arr){
        if (el[0] === '*' && el[1] !== '*')
            Emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim();
    }, this);
    $panel.find('> header')
        .addClass('panel-header')
        .html([
            $('<h2>')
                .addClass('panel-heading panel-title')
                .text('Emoticon Panel'),
            $('<a>')
                .addClass('panel-close')
                .attr('href', 'javascript:void(0);')
                .text('×')
                .on('click', function close(ev){
                    $('.EmoticonPanel').hide();
                })
        ]);
    $panel.find('> div').eq(0)
        .addClass('panel-section panel-emoticons')
        .html([
            $('<h3>')
                .addClass('panel-heading panel-subtitle')
                .text('Emoticons'),
            $('<article>')
                .addClass('panel-main')
        ]);
    $panel.find('> div').eq(1)
        .addClass('panel-section panel-recent')
        .html([
            $('<h3>')
                .addClass('panel-heading panel-subtitle')
                .text('Recent Emoticons'),
            $('<article>')
                .addClass('panel-main')
        ]);
    this.insertLink('Emoticon Panel', {
        id: 'EmoticonPanelTrigger',
        handler: function trigger(event){
            event.preventDefault();
            event.stopPropagation();
            if (!$('.EmoticonPanel').length){
                $body.append($panel);
                for (var emote in Emoticons)
                    if (Emoticons.hasOwnProperty(emote))
                        create_emote($('.EmoticonPanel .panel-emoticons'), emote);
            } else {
                $('.EmoticonPanel').show();
            }
        }
    });
};
 
chat_nav.prototype.partyMode = function partyMode(){
    var $body = this.$chatWindow || $(document.body),
        $partyModePanel =
            $('<section><header /><div /><div /></section>').addClass('PartyModePanel party-mode-panel panel'),
        Music = {},
        Themes = {},
        Disco = {},
        $base_html = [],
        create_disco = function CreateDisco(color){
 
        };
    this.insertLink('Party Mode', {
        id: 'PartyModeTrigger',
        handler: function trigger(event){
            event.preventDefault();
            event.stopPropagation();
            if (!$('.PartyModePanel').length){
                $body.append($partyModePanel);
            }
        }
    });
};
 
chat_nav.prototype.customization = function customization(){
    function _c(){
        this.setCookie = function setCookie(name, data){
            var domain = wgServer.split('//')[1];
            document.cookie = 
                name + '=' + data +
                '; max-age=' + 60*60*24*150 +
                '; path=/; domain=' + domain;
        };
 
        this.getCookie = function getCookie(name, pos){
            var x, y, arr = document.cookie.split(';'), i = 0;
            for (; i < arr.length; i++){
                x = arr[i].substr(0, arr[i].indexOf('='));
                y = arr[i].substr(arr[i].indexOf('=') + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == name){
                    var objects = y.split(', ');
                    return unescape(objects[pos]);
                }
            }
        };
 
        this.looks = {};
        return this;
    }
    this.insertLink('Customization', {
        id: 'CustomizationTrigger',
        handler: function trigger(event){
            event.preventDefault();
            event.stopPropagation();
            if (!$('.CustomizationPanel').length){
                $body.append($customizationPanel);
            }
        }
    });
};
 
//
chat_nav.prototype.insertLink = function insertLink(name, config){
    var $link =
        $('<li class="menu-list-item item"><a href="javascript:void(0);" /></li>');
    $link.attr('id', config.id);
    $link.find('> a').on('click', config.handler).text(name);
    this.items[this.items.length] = $link;
};
 
//
chat_nav.prototype.load = function load(){
    var $html = $('<aside class="ChatNavigation chat-nav" id="ChatNavigation"><header class="wordmark-wrapper"><h1 class="wordmark"><img /></h1><a href="javascript:void(0);" class="chat-nav-close">×</a></header><nav class="ChatMenu menu"><ul class="menu-list" /></nav></aside>').addClass('hidden'),
        $wordmark = $('.ChatHeader').find('.wordmark img'),
        _src = $wordmark.attr('src');
    $html.find('> .wordmark-wrapper .wordmark img').attr('src', _src);
    $html.find('> .wordmark-wrapper .chat-nav-close').on('click', function close(event){
        $('#ChatNavigation').hide();
        $('.ChatHeader .chat-link:contains(Options)').removeClass('active');
    });
    if (this.emoticons instanceof Function || typeof this.emoticons == 'function') 
        this.emoticons();
    $html.find('> .menu > .menu-list').html(this.items);
    $('.public.wordmark').first().append(
        $('<a href="javascript:void(0);" class="chat-link link" onclick="return false;" />')
            .text('Options')
            .on('click', function showNav(ev){
                $(ev.target).addClass('active');
                $('#ChatNavigation').show();
            })
    );
    $html.hide();
    this.$chatWindow.append($html);
    this.loaded = true;
    this.active = true;
};
 
var C = new chat_nav();
 
// Testing
 
;(function($, mw, window, discussion, Hangman){
    var mwVars = mw.config.get(['wgPageName', 'wgUserName', 'wgUserGroups', 'skin', 'wgServer']),
        $hangman_html = $('<section class="hangman-wrapper"><header class="hangman-header"><h2>Hangman</h2><a href="javascript:void(0);" class="close-button"></a><div class="user-data" /></header><div class="hangman" /></section>').wrap('<div class="hangman-blackout"></div>'),
        $hangman_trigger = $('<div class="hangman-trigger">Hangman</div>'),
        Game = {
            init: function init(words){
                this.words = words;
                this.$html = $('.hangman');
                this.$msg = $('.hangman-message');
                this.$title = $('.hangman-title');
                this.$text = $('.hangman-txt');
                this.$restart = $('.hangman-restart');
                this._word = this.randomWord();
                this.correct = 0;
                this.$guess = $('.hangman-guess');
                this.$wrong = $('.hangman-wrong');
                this.winQuote = ['Awesome!', 'You Win', 'You won the game!', 'Fantastic, you won!', 'Good game', 'You\'re winner', 'Winner'];
                this.loseQuote = ['Awww, you lost', 'You Lose', 'Loser!!!!!', 'You suck', 'Better luck next time'];
                this.wrongGuesses = [];
                this.rightGuesses = [];
                this.tries = Hangman.MAX_TRIES || 5;
                this.$guessForm = $('.hangman-guess-form');
                this.$guessInput = $('.hangman-guess-letter');
                this.setup();
            },
            setup: function setup(){
                this.binding();
                this.showGuess(this.wrongGuesses);
                this.showWrong();
                $hangman_html.parent().show();
            },
            binding: function binding(){
                this.$guessForm.on('submit', $.proxy(this.guess, this));
                this.$restart.on('click', $.proxy(this.restart, this));
            },
            restart: function restart(event){
                event.preventDefault();
                this.reset();
            },
            guess: function guess(event){
                event.preventDefault();
                var _guess = this.$guessInput.val();
                if (_guess.match(/[a-zA-Z]|\s/) && _guess.length == 1){
                    if ($.inArray(_guess, this.wrongGuesses) > -1 || $.inArray(_guess, this.rightGuesses) > -1){
                        this.$guessInput.val('').focus();
                    }
                    else if (_guess){
                        var foundLetters = this.checkGuess(_guess);
                        if (foundLetters.length > 0){
                            this.setLetters(foundLetters);
                            this.$guessInput.val('').focus();
                        } else {
                            this.wrongGuesses.push(_guess);
                            if (this.wrongGuesses.length == this.tries){
                                this.lose();
                            } else {
                                this.showWrong(this.wrongGuesses);
                            }
                            this.$guessInput.val('').focus();
                        }
                    }
                    else {
                        this.$guessInput.val('').focus();
                    }
                }
            },
            randomWord: function randomWord(){
                var _randomWord = this.words[Math.floor(Math.random() * this.words.length)];
                return this.wordData(_randomWord);
            },
            showGuess: function showGuess(){
                var frag = '<ul class="hangman-word">';
                $.each(this._word.letters, function(index, val){
                    frag += '<li data-pos="' + index + '" class="hangman-letter letter">*</li>';
                });
                frag += '</ul>';
                this.$guess.html(frag);
            },
            showWrong: function showWrong(wrongGuesses){
                var frag;
                if (wrongGuesses){
                    frag = '<ul class="hangman-wrong-letters">';
                    $.each(wrongGuesses, function(index, val){
                        frag += '<li class="wrong-letter">' + val + '</li>';
                    });
                    frag += '</ul>';
                } else {
                    frag = '';
                }
                this.$wrong.html(frag);
            },
            checkGuesses: function checkGuesses(guessedLetter){
                var _ = this,
                    found = [];
                $.each(this._word.letters, function(index, val){
                    if (guessedLetter == val.letter.toLowerCase()){
                        found.push(val);
                        _.rightGuesses.push(val.letter);
                    }
                });
                return found;
            },
            setLetters: function setLetters(letters){
                var _ = this;
                _.correct = _.correct += letters.length;
                $.each(letters, function(index, val){
                    var letter = $('.letter[data-pos="' + index + '"]');
                    letter.html(val.letter);
                    letter.addClass('correct');
                    if (_.correct == _._word.letters.length)
                        _.win();
                });
            },
            wordData: function wordData(word){
                return {
                    letters: this._letters(word),
                    word: word.toLowerCase(),
                    totalLetters: word.length
                };
            },
            hideMsg: function hideMsg(){
                this.$msg.hide();
            },
            showMsg: function showMsg(){
                this.$msg.show();
            },
            _letters: function _letters(word){
                var letters = [];
                for(var i = 0; i<word.length; i++){
                    letters.push({
                        letter: word[i],
                        pos: i
                    });
                }
                return letters;
            },
            _rating: function _rating(){
                var right = this.rightGuesses.length,
                    wrong = this.wrongGuesses.length || 0,
                    rating = {
                        rating: Math.floor(( right / ( wrong + right )) * 100),
                        guesses: (right + wrong)
                    };
                return rating;
            },
            win: function win(){
                var rating = this._rating();
                this.$msgTitle.html(this.winQuote[Math.floor(Math.random() * this.winQuote.length)]);
                this.$msgText.html("You solved the word in <span class='highlight'>" + rating.guesses + "</span> guesses!<br>Score: <span class='highlight'>" + rating.rating + "%</span>");
                this.showMsg();
            },
            lose: function lose(){
                this.$msgTitle.html(this.loseQuote[Math.floor(Math.random() * this.winQuote.length)] + " The word was <span class='highlight'>"+ this._word.word +"</span>");
                this.$msgText.html("Don't worry, you'll get the next one!");
                this.showMsg();
            }
        },
        wordList = [];
    $.ajax({
        method: 'GET',
        dataType: 'text',
        url: mw.util.wikiScript('index'),
        data: {
            title: 'User:Ultimate_Dark_Carnage/hangman-words',
            action: 'raw'
        }
    }).success(function(data){
        var words = data.split(/\n/),
            i = 0;
        for (; i < words.length; i++){
            wordList[i] = words[i].toLowerCase();
        }
        Game.init(wordList);
    }).fail(function(){
        discussion.viewDiscussion.chatUL.append('<li class="inline-alert">Cannot start Hangman. Please try again later</li>');
    });
})(this.jQuery, this.mediaWiki, this.window, this.mainRoom, this.Hangman);