/* Опции */ 
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

// Теги 1
$('#Write [name="message"]').bind('keydown', function(e) {
    if (e.which != 13) {
        return;
    }
    var letters = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
 
    var flipTo = {"я": "ʁ", "ю": "o", "э": "є", "ь": "q", "ы": "ıq", "ъ": "q", "щ": "m", "ш": "m", "ц": "ǹ", "х": "х", "ф": "ф", "п": "u", "у": "ʎ", "т": "ʟ", "с": "ɔ", "р": "d", "о": "о", "н": "н", "м": "w", "л": "v", "к": "ʞ", "и": "и", "з": "є", "ж": "ж", "ё": "ǝ", "е": "ǝ", "д": "6", "г": "L", "в": "ʚ", "б": "g", "а": "ɐ",
            z: "z", y: "ʎ", x: "x", w: "ʍ", v: "ʌ", u: "n", t: "ʇ", s: "s", r: "ɹ", q: "6", p: "d", o: "o", n: "u", m: "ш", l: "l", k: "ʞ", j: "ɾ", i: "ı", h: "у", g: "ƃ", f: "ɟ", e: "ǝ", d: "р", c: "ɔ", b: "q", a: "ɐ"};
 
    var morzeCode = {"А": "·−", "A": "·−", "Б": "−···", "B": "−···", "В": "·−−", "W": "·−−", "Г": "−−·", "G": "−−·", "Д": "−··", "D": "−··", "Е": "·", "Ё": "·", "E": "·", "Ж": "···−", "V": "···−", "З": "−−··", "Z": "−−··", "И": "··", "I": "··", "Й": "·−−−", "J": "·−−−", "К": "−·−", "K": "−·−", "Л": "·−··", "L": "·−··", "М": "−−", "M": "−−", "Н": "−·", "N": "−·", "О": "−−−", "O": "−−−", "П": "·−−·", "P": "·−−·", "Р": "·−·", "R": "·−·", "С": "···", "S": "···", "Т": "−", "T": "−", "У": "··−", "U": "··−", "Ф": "··−·", "F": "··−·", "Х": "····", "H": "····", "Ц": "−·−·", "C": "−·−·", "Ч": "−−−·", "Ö": "−−−·", "Ш": "−−−−", "CH": "−−−−", "Щ": "−−·−", "Q": "−−·−", "Ñ": "−−·−−", "Ь": "−··−", "Ы": "−·−−", "Ъ": "−−·−−", "X": "−··−", "Э": "··−··", "É": "··−··", "Ю": "··−−", "Ü": "··−−", "Я": "·−·−", "Ä": "·−·−", "1": "·−−−−", "2": "··−−−", "3": "···−−", "4": "····−", "5": "·····", "6": "−····", "7": "−−···", "8": "−−−··", "9": "−−−−·", "0": "−−−−−", ".": "······", ",": "·−·−·−", ":": "−−−···", ";": "−·−·−·", "(": "−·−−·−", ")": "−·−−·−", "`": "·−−−−·", "\"": "·−−−−·", "«": "·−−−−·", "»": "·−−−−·", "—": "−····−", "-": "−····−", "/": "−··−·", "?": "··−−··", "!": "−−··−−", "@": "·−−·−·", " ": "&nbsp;&nbsp;&nbsp;&nbsp;"};
 
    function makeLoop(tag, funct) {
        var message = $('#Write [name="message"]').val();
 
        while (message.search(new RegExp("\\[" + tag + "\\]([\\s\\S]+)\\[\\/" + tag + "\\]", "ig")) != -1) {
            var changedText = message.match(new RegExp("\\[" + tag + "\\]([\\s\\S]+?)\\[\\/" + tag + "\\]", "i"));
            var newtext = changedText[0].replace(new RegExp("\\[\\/?" + tag + "\\]", "ig"), '');
            newtext = funct(newtext);
            $('#Write [name="message"]').val(message.replace(new RegExp(changedText[0].replace(/([\^\$\(\)\<\>\[\]\{\\\|\.\*\+\?])/ig, '\\$1'), "i"), newtext));
            message = $('#Write [name="message"]').val();
        }
    }
 
    var actions = {
        's': function(word) {
            console.log(1);
            return '\u0336' + word.split('').join('\u0336') + '\u0336';
        },
        'u': function(word) {
            return '\u0332' + word.split('').join('\u0332') + '\u0332';
        },
        'mir': function(word) {
            return word.toLowerCase().split('').reverse().map(function (char) { 
                return flipTo[char] || char; 
            }).join("");
        },
        'tran': function(word){
            return word.split('').map(function (char) { 
                return letters[char] || char; 
            }).join("");
        },
 
        'rev': function(text) {
			return '&#8238;' + text;
		},
        'morze': function(word) {
            return word.split('').map(function (char) { 
                return morzeCode[char.toUpperCase()] + '&nbsp;&nbsp;' || ' '; 
            }).join("");
        }  
 
    };
 
    for (var i in actions) {
        makeLoop(i, actions[i]);
    }
});



//Тэги 2
var chatags = { images: true, videos: true };
 
chatags.css = '.chatags-image{max-width:300px;max-height:300px;}';
 
chatags.tags = {
    'span':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/span]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[span="' + t[1] + '"]', '<span style="' + mw.html.escape(t[1]) + '">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'div':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/div]', '</div>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[div="' + t[1] + '"]', '<div style="' + mw.html.escape(t[1]) + '">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'b':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/b]', '</span>');
                 } else {
                     s = s.replace('[b]', '<span style="font-weight:bold;">');
                 }
                 return s;
             },
    'bg':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/bg]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'big':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/big]', '</span>');
                 } else {
                     s = s.replace('[big]', '<span style="font-size:16pt;">');
                 }
                 return s;
             },
    'c':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/c]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'code':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/code]', '</span>');
                 } else {
                     s = s.replace('[code]', '<span style="font-family:monospace;">');
                 }
                 return s;
             },
    'font':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/font]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'i':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/i]', '</span>');
                 } else {
                     s = s.replace('[i]', '<span style="font-style:italic;">');
                 }
                 return s;
             },
    'img':   function (s,t) {
                 if (chatags.images !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[img="' + t[1] + '"]', '<img class="chatags-image" src="http://' + mw.html.escape(t[1]) + '" />');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'small': function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/small]', '</span>');
                } else {
                    s = s.replace('[small]', '<span style="font-size:7pt;">');
                }
                return s;
            },
    's':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/s]', '</span>');
                } else {
                    s = s.replace('[s]', '<span style="text-decoration:line-through;">');
                }
                return s;
            },
    'sub':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sub]', '</sub>');
                } else {
                    s = s.replace('[sub]', '<sub>');
                }
                return s;
            },
    'sup':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sup]', '</sup>');
                } else {
                    s = s.replace('[sup]', '<sup>');
                }
                return s;
            },
    'u':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/u]', '</span>');
                } else {
                    s = s.replace('[u]', '<span style="text-decoration:underline;">');
                }
                return s;
            },
    'yt':   function (s,t) {
                 if (chatags.videos !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[yt="' + t[1] + '"]', '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             }
};
 
chatags.parser = function (s) {
    if(s==undefined||s==null)
        s=''
    var t = s.match(/\[([^\[\]]*)\]/g);
    var tg = '';
    var TAG_LIMIT = 24;
 
    if (!t) return s;
 
    t = t.slice(0, TAG_LIMIT);
 
    for (var i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
 
        try {
            tg = tg.split('="')[0];
        } catch(e) { console.log(e) }
 
        if (typeof chatags.tags[tg] !== 'undefined') {
            s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }
    return s;
};
 
chatags.init = function() {
    if (typeof window.mainRoom !== 'undefined') {
        $('head').append('<style>' + chatags.css + '</style>');
 
        window.mainRoom.model.chats.bind("afteradd", function(c) {
            if (typeof window.mainRoom.roomId === "undefined")
                return;
            var string = $("#Chat_" + window.mainRoom.roomId + " .message:last").html();
 
            string = chatags.parser(string);
            $("#Chat_" + window.mainRoom.roomId + " .message:last").html(string);
        });
 
        window.mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoomId = u.attributes.roomId;
            var privateRoom = mainRoom.chats.privates[privateRoomId];
 
            privateRoom.model.chats.bind('afteradd', function(chat) {
                if (chat.attributes.isInlineAlert) return;
 
                var string = $("#Chat_" + privateRoomId + " .message:last").html();
                    string = chatags.parser(string);
 
                $("#Chat_" + privateRoomId + " .message:last").html(string);
            });
        });
    }
};
 
$(document).ready(function() {
    chatags.init();
});
 
 
/* Команда !kick */
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups'),
            absentMessage = window.absentMessage || '<user> is not on chat. Cannot kick.';
        if (groups.indexOf('sysop') > -1 ||
           groups.indexOf('bureaucrat') > -1 ||
           groups.indexOf('chatmoderator') > -1
           ) {
            $('[name="message"]').keydown(function(e) {
                if (e.which == 13 &&
                   $(this).val().substr(0, 5) == '!kick'
                   ) {
                    var user = $(this).val().substr(6), users = [], last = $('.Chat li').last().attr('data-user');
                    $('.WikiChatList .User').each(function() {
                        users.push($(this).attr('data-user'));
                    });
                    if (users.indexOf(user) == -1) {
                        $('.Chat ul').append('<li id="entry-sp" class="inline-alert">' + absentMessage.replace('<user>', user) + '</li>');
                        if (!last) {
                            $('.inline-alert').last().addClass('continued');
                        }
                    }
                    mainRoom.kick({
                        name: user
                    })
                    $(this).val('');
                }
            });
        }
    }
});

/* Смайлы */
importStylesheetURI('http://korniux.wikia.com/wiki/SpeedEmoticon/style.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://images.wikia.nocookie.net/central/images/a/ac/Emoticon_laughing.png" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
        $('#poplist').css({             
                top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
                left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
            });
    });
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
    $('#SpeedEmoticon a').each(function() {
        $(this).after('<img src="' + $(this).attr('href') + '"/>');
        $(this).remove();
    });
    $('#poplist img').click(function(){
        var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
            messg = $('.message textarea').val();
        $('.message textarea').val(messg + ' ' + txt).focus();
    });
    $('#poplist div').attr('style', '');
    console.log('SpeedEmoticon v1.7')
});



/* Чатбот */
// Данные
window.fsinit = new CreateBotInit();
var DC = window.fsinit.DataCom;
window.fsinit.lang.ru = {
'commands': {
    'Wes_off': new DC('Вес-офф|Вэс-офф', "Всё-всё-всё, {usernick}"),
    'Wes_on': new DC('Вес-он|Вэс-офф', '...'),
    'Flowey_on': new DC('Флауи-он', ['', '', '', 'Выход']),
    'Guess_on': new DC('Угадай-он', 'Начинаем игру! От 1 до 1000! Используй num-<число>, {usernick}'),
    'num': new DC('num-\\d+', [
        'Да, это то самое число, {usernick}', 
        'Очень горячо, {usernick}',
        '{usernick}, горячо', 
        '{usernick}, еще теплее', 
        '{usernick}, тепло', 
        '{usernick}, холодно', 
        '{usernick}, очень холодно'
    ]),
    'Guess_off': new DC('Угадай-офф', 'Всё-всё-всё, {usernick}'),
    'Phrase': new DC('Фразу'),
    'Roulette': new DC("Рулетка \\d+", [
        '{usernick}, вы выжили', 
        '{usernick}, вы умерли', 
        '{usernick}, а чем предложишь стрелять? Бананами?', 
        '{usernick}, вы что, пулями питаетесь?'
    ]),
    'music': new DC("Музыка", [
        '{usernick}, я не нашёл такой музыки', 
        'Загружаю стандартную музыку ', 
        'не работает?', 
        "Вы не воспроизводили никакой музыки", 
        'Останавливаю музыку', 
        'Запускаю эту музыку снова', 
        'Показываю видео', 
        'Прячу видео', 
        'Загружаю случайную стандартную музыку',
        'Загружаю музыку',
        'д',
        'стоп',
        'снова',
        'переключить',
        'случайную'
    ]),
    'logsfor': new DC("Логи на ", [
        "(сегодня|сёдня)",
        'Логи на сёдня? Есть такое. <a href="','" target="_blank">Держи</a>',
        'Логи на сёдня? Упс... Походу, их пока нет <a href="','" target="_blank">Держи вчерашние</a>',
        'вчера',
        'Логи на вчера? Эт пожалуйста. <a href="','" target="_blank">Держи вчерашние</a>',
        'завтра',
        'Не все могут смотреть в завтрашний день, не так ли?',
        'Логи на эту дату? Есть, канеш. <a href="','" target="_blank">Держи</a>',
        'Я не нашёл этой даты :c Что посоветовать могу:<br/>- Проверить написания даты. Надо вводить дд-мм-гггг<br/>- Возможно, логи на эту дату пока нет. Попробуйте другую дату.<br/>- Попробуйте ввести "Логи на сегодня" или "Логи на вчера"',
        'дд\\-мм\\-гггг',
        'Мне попался что-то очень умный пользователь... {usernick} зовут',
        'Логи на... стоп, ты шутишь? Надо "Логи на сегодня", "Логи на вчера" или "Логи на дд-мм-гггг"'
    ]),
    'Sources': new DC('Исходники', 
        'Мои коды хранятся в <a href="/wiki/MediaWiki:Chat.js" target="_blank">MW:Chat.js</a>.' +
        '<br/>Исходник DontStarveBot - <a href="https://github.com/sactage/chatbot-rb">тут</a>.' + 
        '<br/>Если вы хотите создать своего логгера, есть <a href="http://runescape.wikia.com/wiki/User:Joeytje50/ChatLogger.js" target="_blank">ChatLogger.js</a>'
    ), 
    'Logs': new DC("Логи", 'Логи могут быть найдены <a href="/wiki/Category:Wikia_Chat_logs" target="_blank">здесь</a>'),
    'User': new DC('User:[\\s\\S]+', '{usernick}, инфа по участнику:'),
    'Mainpage': new DC("(заглавная|заглавную)", 'На, {usernick}, держи: <a href="/wiki/" target="_blank">Заглавная</a>'),
    'Emoticons': new DC("(смайлы|смайлики)", 'Вот, {usernick}, пользуйся: <a href="/wiki/MediaWiki:Emoticons" target="_blank">тык</a>'),
    'Rules': new DC("правила", '{usernick}, а ну быстро читать: <a href="/wiki/Правила_поведения_в_чате" target="_blank">Ты послушный, не так ли?</a>'),
    'Admin': new DC("(админы|модеры)", 'Хэй, {usernick}, ты их можешь найти <a href="/wiki/Служебная:ListUsers/sysop" target="_blank">здесь</a>!'),
    'Article': new DC("Статья", '{usernick}, держи, как просил:'),
    'Tags': new DC('(Тэги|Теги)', '{usernick}, '),
    'ProfileTags': new DC("Статусы", '{usernick}, это <a href="/wiki/MediaWiki:ProfileTags" target="_blank">здесь</a>'),
    'myjs': new DC('(my js|my javascript)', '{usernick}, это здесь'),
    'mycss': new DC('my css', '{usernick}, это здесь'),
    "wikiactivity": new DC('wikiactivity', '{usernick}, на:'),
    'please': new DC("пожалуйста", 'Ок, {usernick}'),
    'give': new DC("Дай", 'Что, {usernick}, информации захотелось? А не дам, вежливо попроси!'),
    'Hello': new DC("Привет", 'Привет, {usernick}. Как жизнь?'),
    'Bye': new DC("Пока", 'Пока, {usernick}.'),
    'mypage': new DC('my page', '{usernick}, ты <a href="/wiki/Special:MyPage" target="_blank">здесь</a>'),
    "listusers": new DC("listusers", [" (м)", " (о)", " (с)"]),
    'Open_PM_with': new DC("Открой ЛС с ", "Открываю ЛС... "),
    'Commands': new DC("Команды", 
        'Вау, ты всё-таки решил маленькую головоломку и догадался ввести команду. Значит, вот тебе в награду список этих самых команд: <a href="http://ru.dont-starve.wikia.com/wiki/Don%27t_Starve_%D0%B2%D0%B8%D0%BA%D0%B8:%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B_%D0%B1%D0%BE%D1%82%D0%B0" target="_blank">Тык</a>'),
    'Money': new DC("Деньги", 'Денег захотел? А зачем тебе?'),
    'And_you_too': new DC("А у тебя", 'Тоже...')
},
'papyrusPhrases': [
    '...'
],
'sansPhrases': [
    'Так что?',
    'Ты знал? У меня есть <a href="http://ru.dont-starve.wikia.com/wiki/Don%27t_Starve_%D0%B2%D0%B8%D0%BA%D0%B8:%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B_%D0%B1%D0%BE%D1%82%D0%B0" target="_blank">список команд</a>!',
    'Ты не забыл про "пожалуйста"?',
    'Никогда не понимал зачем люди это делают',
    'Хмм...',
    'Хэй, а давай я загадаю цифру, а ты введёшь "угадай-он", а?',
    'Введи "Вес-он" и ты оставишь меня в покое, окей?',
    'Ну зачем ты меня разбудил?!',
    'У меня есть отличная идея. Введи "Рулетка 6"',
    'Хочешь узнать, к кому обращаться, когда тебя обижают? Введи "Админы"!',
    'Прекрати.',
    'Нет.',
    'И зачем ты это пишешь? В чате тихо и тебе нечего делать?',
    'Слушай, иди лучше поговори с реальными людьми. Ты же в чате.',
    'У тебя есть любимая игра? Если в чате скучно, то поиграй в неё, а не доставай меня, окей?',
    'М-да.',
    'Ладно, ладно... Ладно... Расскажи мне обо всех своих печалях и обидах. Я послушаю.',
    'Напиши "Фразу". Это веселее, чем пытаться со мной говорить.',
    'Дружище, не хочешь-ли слегка посмайлить в чате? <a href="/wiki/MediaWiki:Emoticons" target="_blank">Держи.</a> Только не увлекайся, а то тебя могут и забанить. Если это произойдёт - я не при чём.',
    'Послушай, для развлечения есть ещё куча режимов. Почему ты выбрал именно меня?',
    'Ты только это и можешь сказать.',
    'Мне тоже может быть обидно, ты не подумал?',
    'Надеюсь, что тебе сейчас очень весело.',
    'Не грусти. Иди поговори в чате. Я думаю, тебе это поможет.',
    'А ты злой однако.',
    'Ладно, извини... Не хотел.',
    'Кто тебе больше всех нравится из ДС?',
    'Ты ждёшь нового обновления меня? Жди. Халф-Лайф 3 тоже многие ждут.',
    'Эм...',
    'Когда говоришь в чате - правила не нарушай. А если не знаешь правил, то напиши мне "правила", я их тебе выдам. Не стесняйся.',
    'Ты любишь печеньки?',
    'Я так не считаю.',
    'Слушай, тебе очень нравится меня доставать? А если бы тебе по 10-20 человек каждый день писали? Тебе было-бы приятно, а?',
    'Как ты относишься к Звёздным Войнам?',
    'Тебе нравится Вархаммер?',
    'Ты часом не Брони?',
    'Ты никогда не хотел создать свой, уникальный чат? Свою вики?',
    'Странный ты.',
    'Если ты ешь, то приятного аппетита тебе. А если нет, то... Просто удачи.',
    'Тебе нравится Масс Эффект?',
    'Знаешь, когда мне кто-то грубит или шутит надо мной... Мне тоже обидно, хоть я и не могу это открыто сказать...',
    'Хм... А ты правишь в статьях? Помогаешь этой вики?',
    'Молодец.',
    'Как так?',
    'Мне бывает интересно общаться с людьми, конечно... Но... Не всегда.',
    'Конечно нет.',
    'Вставай из-за компьютера. Иди лучше зарядку сделай.',
    'Да.',
    'А зачем тебе?', 
    'Как-же меня бесят люди, которые пытаются меня материть, троллить... Я лишь скрипт, какой толк меня оскорблять?',
    'Ну ты чего, нормально-же общались.',
    'Ты любишь читать? Какая у тебя любимая книга?',
    'А зря.',
    'Какая твоя любимая песня?',
    'Это очень мило.',
    'Хех.', 
    'Лол.',
    'Жаль, что я тоже не могу пообщаться в чате. Это интересно наверное.',
    'Пришёл спрятаться в ДС-чат? Заходи, здесь уютно!',
    'Ты когда-нибудь думал о том, как была создана Вселенная? Как появились ты, я, и мои создатели?',
    'На нервы действовать начинаешь... Кхм.',
    'Меня всё больше и больше бесят те, кто пытается меня троллить или материть... Им совсем нечего делать?',
    'А ты смешной... Убью тебя последним...',
    'Иди статьи попробуй подправить. Пользу вики принеси.',
    'Чат сейчас активен?',
    'Оуууу...',
    'Шутку понял. Смешно.',
    'Ахахахахаха.',
    'Хочешь создать свою беседу в чате? Могу помочь. Только напиши "Открой ЛС с..." и ники тех, с кем ты хочешь пообщаться через ";".',
    'В ЛС можно флудить, материться, капсить... Открывай ЛС с кем-то, и если тебя не пошлют, то ори на него, а не на меня.',
    'Если хочешь посмеятся, введи "Фразу". Я то умею генерировать шуточки.',
    'Хей, не найдётся немного средств для бота? Еды там... Или долларов...',
    'Во мне столько фраз... Мне уже до ИИ не далеко.',
    'Хе-хе-хе...',
    'о_о',
    'Уууу... И тебя это стороной не обошло...',
    'Играешь в КС? Какой ранг?',
    'Твоя музыка шикарна... *звучит, как сарказм*',
    'Какие книги ты читал?... Или вообще не читал?..',
    'Я люблю природу... Животных, растения... И Тёмную Сторону.',
     'Я терпеть не могу вандалов. Какой толк портить статьи? Может ты понимаешь?',
     'Я хороший собеседник, как думаешь?',
     'Мне скучно бывает одному... Рад, что вы со мной говорите.',
     '...'
],
'phrase': [
    ['Чёрный', 'Адский', 'Милый', 'Удачливый', 'Белый', 'Умный', 'Треугольный', 'Хороший', 'Дружелюбный', 'Лежащий на полу', 'Смешной', 'Чудный', 'Плохой', 'Злой', 'Агресивный', 'Забавный', 'Странный', 'Неразумный', 'Великолепный', 'Мудрый', 'Потраченый', 'Крутой', 'Средний', 'Влюблённый', 'Очень смешной', 'Коварный', 'Жаждущий мести'],
    ['человек', 'некто', 'участник', 'бот', 'Ктулху', 'Лиза', 'кое-кто', 'Гастер', 'Дмитрий', 'Сосиска', 'Скраггеш', 'Смит', 'Штурмовик', 'Пруф', 'Гг', 'парадокс'],
    ['играет', 'делится', 'дружит', 'разговаривает', 'идёт на свидание', 'устраивает бой', 'читает книжку', 'гуляет', 'сидит в чате', 'правит статью', 'пишет скрипт', 'ест', 'играет', 'танцует', 'играет в покер', 'веселится', 'орёт', 'порабощает мир'],
    ['с Вуди.', 'с ботом.', 'с Вигфрид.', 'с Админом.', 'с Вэйдером.', 'с WX-78.', 'с Веббером.', 'с Уиллоу.', 'с Весом.', 'с анонимом.', 'с Венди.', 'с Уикерботтом.', 'с Вольфгангом.', 'с Максвеллом.', 'с Уилсоном.', 'с пони.', 'с кеком.', 'с Флаттершай', 'с Рэинбоу Дэш']
],
'botPhrase': ['Это бот. Попробуй ввести "Команды" для получения списка команд', 'Кликни на меня!'],
//Флауи
//Цветочек по имени Цветик!
'chooseUrWay': function(e) {
e.preventDefault();
var answerFlowey = window.fsinit.answerUser,
    output = window.fsinit.output,
    rnd = window.fsinit.rnd,
    doChoose = window.fsinit.doChoose;
    $('.fs-message textarea').show();
    $('.fs-choose').hide();
if (window.fs.nope) {
    $('.bad').remove();
}
$('.fs-body ul').animate({'scrollTop': '9999999'}, 1);
}
};
window.fsinit.lang.en = {
'commands': {
    'Papyrus_off': new DC('Papyrus-off', "Okay-okay-okay, {usernick}"),
    'Papyrus_on': new DC('Papyrus-on', 'HUMAN!'),
    'Flowey_on': new DC('Flowey-on', ['', '', '', 'Quit']),
    'Guess_on': new DC('Guess-on', 'Let\'s start a game! From 1 to 1000! Use num-<number>, {usernick}'),
    'num': new DC('num-\\d+', [
        'Yes, that\'s a right number, {usernick}', 
        'Very hot, {usernick}', 
        '{usernick}, hot', 
        '{usernick}, warmer', 
        '{usernick}, warm', 
        '{usernick}, cold', 
        '{usernick}, very cold'
    ]),
    'Guess_off': new DC('Guess-off', 'Okay-okay-okay, {usernick}'),
    'Phrase': new DC('Phrase'),
    'Roulette': new DC("Roulette \\d+", [
        '{usernick}, you\'re survived', 
        '{usernick}, you\'re dead', 
        '{usernick}, what do you have to shoot? Bananas?', 
        '{usernick}, don\'t you eat bullets?'
    ]),
    'music': new DC("music", [
        '{usernick}, I haven\'t found this music', 
        'Loading a standard music ', 
        'isn\'t it working?', 
        "You haven't played a music yet", 
        'Stopping a music', 
        'Loading this music once again', 
        'Showing the video', 
        'Hiding the video', 
        'Loading a random music',
        'Loading a music',
        'd',
        'stop',
        'replay',
        'toggle',
        'rnd'
    ]),
    'logsfor': new DC('logs for ', [
        "(today|t\\'dday)",
        'Logs for today? Yes, they\'re here. <a href="',
        '" target="_blank">There</a>',
        'Logs for today? Oops... It seems like there\'s not... <a href="',
        '" target="_blank">There\'s for yesterday</a>',
        'yesterday',
        'Logs for yesterday? Sure. <a href="',
        '" target="_blank">I have it</a>',
        'tomorrow',
        'Nobody can look in the future, right?',
        'Logs for this date? Surely... <a href="',
        '" target="_blank">I have it</a>',
        'I haven\'t found these logs :c What I can recommend to you is checking the date you typed. It must be day-month-year (in numbers)<br/>- Maybe, there isn\'t the logs for this date. Try another date.<br/>- Try to type "Logs for today" or "Logs for yesterday"',
        '(dd\\-mm\\-yyyy|day-month-year)',
        'Strangely, but I met a very smart user today... it\'s called {usernick}',
        'Logs for... wait, are you kidding? You should type either "Logs for today", or "Logs for yesterday", or "Logs for day-month-year"'
    ]),
    'Sources': new DC('Sources', 
        'My code is reserved here <a href="/wiki/MediaWiki:Chat.js" target="_blank">MW:Chat.js</a>.' +
        '<br/>UndertaleBot\'s source is <a href="https://github.com/sactage/chatbot-rb">here</a>.' + 
        '<br/>If you wanna create your own logger, there\'s a <a href="http://runescape.wikia.com/wiki/User:Joeytje50/ChatLogger.js" target="_blank">ChatLogger.js</a>'
    ), 
    'Logs': new DC('Logs', 'Logs can be found <a href="/wiki/Category:Chat_logs" target="_blank">here</a>'),
    'User': new DC('User:[\\s\\S]+', '{usernick}, information about this user:'),
    'Mainpage': new DC("(Mainpage|Main Page)", 'There, {usernick}: <a href="/wiki/" target="_blank">Main Page</a>'),
    'Emoticons': new DC("(Emoticons)", 'There, {usernick}, use it: <a href="/wiki/MediaWiki:Emoticons" target="_blank">it\'s here</a>'),
    'Rules': new DC('Rules', '{usernick}, com\'on to read it: <a href="/wiki/Project:Правила_чата" target="_blank">You\'re good, aren\'t you?</a>'),
    'Admin': new DC("(Admins|Moderators)", 'Hey, {usernick}, you can look at them <a href="/wiki/Служебная:ListUsers/sysop" target="_blank">here</a>!'),
    'Article': new DC("Article", '{usernick}, there, as you wanted:'),
    'myjs': new DC('(my js|my javascript)', '{usernick}, it\'s here'),
    'mycss': new DC('my css', '{usernick}, it\'s here'),
    "wikiactivity": new DC('wikiactivity', '{usernick}, here:'),
    'please': new DC('please', 'Ok, {usernick}'),
    'give': new DC('give', 'Well, {usernick}, you need the information? I won\'t give, ask politely!'),
    'Hello': new DC('Hello', 'Hi, {usernick}. What\'s up?'),
    'Bye': new DC('Bye', 'If we really were friends, {usernick}, you wouldn\'t return here... I\'m kidding, nice to meet you again.'),
    'mypage': new DC('my page', '{usernick}, you\'re <a href="/wiki/Special:MyPage" target="_blank">here</a>'),
    "listusers": new DC("listusers", [" (cm)", " (a)", " (s)"]),
    'Open_PM_with': new DC('Open PM with ', "Opening PM with... "),
    'Commands': new DC('Commands', 
        'Wow, you\'ve solved this little puzzle and typed a command, So that, your prize is the list if those commands itself: <a href="/wiki/Project:Команды бота" target="_blank">it\'s here</a>'
    ),
    'Money': new DC('Money', 'You\'re wanna money? Why?'),
    'And_you_too': new DC('And you too', 'Too...')
},
'papyrusPhrases': [
    '...'
],
'sansPhrases': [
    "I'm don't work"
],
'phrase': [
    ['Sorry, '],
    ['i\'m '],
    ['don\'t '],
    ['work']
],
'botPhrase': ['It\'s a bot. Try to type "Commands" to get the list of commands', 'Click on me!'],
//Flowey
//It's very long!
'chooseUrWay': function(e) {
e.preventDefault();
var answerFlowey = window.fsinit.answerUser,
    output = window.fsinit.output,
    rnd = window.fsinit.rnd,
    doChoose = window.fsinit.doChoose;
    $('.fs-message textarea').show();
    $('.fs-choose').hide();
if (window.fs.nope) {
    $('.bad').remove();
}
$('.fs-body ul').animate({'scrollTop': '9999999'}, 1);
}
};
 
window.fs = new window.fsinit.CreateBot();
 
function CreateBotInit() {
    this.usernick = wgUserName;
    this.lang = {};
    this.DataCom = function(name, data) {
        this.name = name;
        this.data = data;
    };
    this.rnd = function(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    };
    this.modeOutput = {
        'normal': 'https://vignette.wikia.nocookie.net/dont-starve/images/d/da/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%B1%D0%BE%D1%82%D0%B0.jpg/revision/latest?cb=20160824090841&path-prefix=ru',
        'flowie.2': 'https://vignette.wikia.nocookie.net/undertale/images/a/a6/Hungry.png/revision/latest?cb=20151108165835&path-prefix=ru',
        'flowie.3': 'http://i.imgur.com/VrCK7kM.png',
        'flowie.4': 'http://i.imgur.com/4nJdy3E.png',
        'flowie.5': 'http://i.imgur.com/3txixr4.png',
        'flowie.6': 'http://i.imgur.com/ESuX7OW.png',
        'flowie.7': 'http://i.imgur.com/FBPl9uB.png',
        'flowie.8': 'http://i.imgur.com/769MYcl.png'
    };
    this.output = function(text, mode) {
        $('<li style="padding: 3px;">' +
            '<img src="' + window.fsinit.modeOutput[mode] + '" width="30px" height="30px" />' +
            '<div style="display: inline-block; vertical-align: top; padding-top: 7px; padding-left: 10px; width: 220px; color: black;">' +
                text +
            '</div>' +
        '</li>').appendTo('.fs-body ul');
    };
    this.answerUser = function(text) {
        $('<li style="padding: 3px; background: rgba(90, 90, 90, 0.6);">' +
            '<img src="' + $('.Write img').attr('src') + '" width="30px" height="30px" />' +
            '<div style="display: inline-block; vertical-align: top; padding-top: 7px; padding-left: 10px; width: 220px; color: white;">' +
                text +
            '</div>' +
        '</li>').appendTo('.fs-body ul');
    };
    this.replaceNick = function(reps) {
        return reps.replace(/\{usernick\}/g, window.fs.usernick);
    };
    this.doChoose = function(links, funct) {
        $('.fs-choose').empty();
        var result = [];
        for (var i in links) {
            result[result.length] = '<a href="#" class="choose ' + links[i][1] + '">' + links[i][0] + '</a>';
        }
        $('.fs-choose').html(result.join('<br/>'));
        $('a.choose').on('click', funct);
    };
    this.CreateBot = function() {
        var answerFlowey = window.fsinit.answerUser,
            output = window.fsinit.output,
            rnd = window.fsinit.rnd,
            doChoose = window.fsinit.doChoose;
        this.usernick = wgUserName;
        var l;
        if (window.fsinit.lang[wgUserLanguage]) {
        l = window.fsinit.lang[wgUserLanguage];
            for (var $senten in window.fsinit.lang.en) {
                if (!l[$senten]) {
                    l[$senten] = window.fsinit.lang.en[$senten];
                }
            }
        }
        else {
            l = window.fsinit.lang.en;
        }
        ////////////////////////////////////////////
        this.papyrusPhrases = l.papyrusPhrases;
        this.sansPhrases = l.sansPhrases;
        this.defaultMusic = {
            'bot': 'Xx-GGQgzCCU'
        };
        this.phrase = l.phrase;
        this.nope = false;
        this.scale = 0;
        this.chooseUrWay = l.chooseUrWay;
        this.mode = {};
        this.commands = {};
        var c = l.commands;
        var papyrusCommands = {};
        papyrusCommands.DEFAULT = function() {
            output(window.fsinit.replaceNick(window.fs.papyrusPhrases[rnd(0, window.fs.papyrusPhrases.length - 1)]), 'papyrus');
        };
        papyrusCommands[l.commands.Wes_off.name] = function() {
            window.fs.mode.papyrus.IS = false;
            output(window.fsinit.replaceNick(c.Wes_off.data), 'normal');
        };
        this.SetMode('papyrus', 
            'https://vignette.wikia.nocookie.net/dont-starve/images/1/13/%D0%92%D1%8D%D1%81_%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82.png/revision/latest?cb=20160303151959&path-prefix=ru',
            papyrusCommands
        );
        this.SetCommand(new window.fsinit.DataCom('DEFAULT'), this.sansPhrases);
        this.SetCommand(c.Wes_on, function(d) {
                window.fs.mode.papyrus.IS = true;
                output(d, 'papyrus');
            });
        this.SetCommand(c.Flowey_on, function(d) {
                $('.fs-message textarea').hide();
                $('.fs-choose').css('display', 'inline-block');
                doChoose([
                    [d[1], 'good-1'],
                    [d[2], 'bad'],
                    [d[3], 'quit']
                ], window.fs.chooseUrWay);
            });
        this.SetCommand(c.Guess_on, function(d) {
                window.fs.gnumber = rnd(1, 1000);
                output(d, 'normal');
            });
        this.SetCommand(c.num, function(d, m) {
                if (!window.fs.gnumber) {
                    window.fs.commands.DEFAULT();
                    return;
                }
                var n = parseInt(m.split('-')[1], 10);
                var out;
 
                if (n - window.fs.gnumber === 0) {
                    window.fs.gnumber = false;
                    out = 0;
                } else if (Math.abs(n - window.fs.gnumber) <= 5) {
                    out = 1;
                } else if (Math.abs(n - window.fs.gnumber) <= 10) {
                    out = 2;
                } else if (Math.abs(n - window.fs.gnumber) <= 50) {
                    out = 3;
                } else if (Math.abs(n - window.fs.gnumber) <= 100) {
                    out = 4;
                } else if (Math.abs(n - window.fs.gnumber) <= 500) {
                    out = 5;
                } else {
                    out = 6;
                }
 
                output(d[out], 'normal');
            });
        this.SetCommand(c.Guess_off, function(d) {
                window.fs.gnumber = false;
                output(d, 'normal');
            });
        this.SetCommand(c.Phrase, function() {
                var phrase = window.fs.phrase;
                output(
                    phrase[0][rnd(0, phrase[0].length - 1)] + ' ' + 
                    phrase[1][rnd(0, phrase[1].length - 1)] + ' ' + 
                    phrase[2][rnd(0, phrase[2].length - 1)] + ' ' + 
                    phrase[3][rnd(0, phrase[3].length - 1)] + ' ', 
                'normal');
            });
        this.SetCommand(c.Roulette, function(d, m) {
                var number = parseInt(m.split(' ')[1], 10);
                var result;
 
                if (rnd(1, 6) >= number) {
                    result = 0;
                } else {
                    result = 1;
                }
 
                if (number < 1) {
                    result = 2;
                } else if (number >= 6) {
                    result = 3;
                }
 
                output(d[result], 'normal');
            });
        this.SetCommand(c.music, function(d, m) {
                var command = m.split('.'),
                    defaultMusic = window.fs.defaultMusic;
                if (command[1] == d[10]) {
                    if (defaultMusic[command[2]] === undefined) {
                        output(d[0], "normal");
                    } else {
                        $('iframe.fs-player').remove();
                        output(d[1] + command[2] + '  (<a href="https://www.youtube.com/watch?v=' + defaultMusic[command[2]] + '" target="_blank">' + d[2] + '</a>) ', "normal");
                        $('<iframe class="fs-player" style="display: none; position: absolute; z-index: 10000; right: 5px; top: 5px;" src="http://www.youtube.com/embed/' + defaultMusic[command[2]] + '?autoplay=1&loop=1&playlist=' + defaultMusic[command[2]] + '" frameborder="0" allowfullscreen></iframe>').prependTo('.ChatHeader');
                        lastMusic = defaultMusic[command[2]];   
                    }
                } else if (command[1] == d[11]) {
                    if (!$('iframe.fs-player').length) {
                        output(d[3], "normal");
                    } else {
                        $('iframe.fs-player').remove();
                        output(d[4], "normal");
                    }
                } else if (command[1] == d[12]) {
                    if (!lastMusic.length) {
                        output(d[3], "normal");
                    } else {
                        var music = $('<iframe class="fs-player" style="display: none; position: absolute; z-index: 10000; right: 5px; top: 5px;" src="http://www.youtube.com/embed/' + lastMusic + '?autoplay=1&loop=1&playlist=' + lastMusic + '" frameborder="0" allowfullscreen></iframe>');
                        $('iframe.fs-player').remove();
                        output(d[5], "normal");
                        music.prependTo('.ChatHeader');   
                    }
                } else if (command[1] == d[13]) {
                    if (!$('iframe.fs-player').length) {
                        output(d[3], "normal");
                    } else {
                        if ($('iframe.fs-player').css('display') == 'none') {
                            $('iframe.fs-player').css('display', 'block');
                            output(d[6], 'normal');
                        } else {
                            $('iframe.fs-player').css('display', 'none');
                            output(c.music[7], 'normal');
                        }
                    }
                } else if (command[1] == d[14]) {
                    var defMusicArray = $.map(
                        window.fs.defaultMusic, 
                        function(value, index) {
                            return [value];
                        }
                    );
                    var num = rnd(1, defMusicArray.length);
                    $('iframe.fs-player').remove();
                    output(d[8] + ' (<a href="https://www.youtube.com/watch?v=' + defMusicArray[num-1] + '" target="_blank">' + d[2] + '</a>) ', "normal");
                    $('<iframe class="fs-player" style="display: none; position: absolute; z-index: 10000; right: 5px; top: 5px;" src="http://www.youtube.com/embed/' + defMusicArray[num-1] + '?autoplay=1&loop=1&playlist=' + defMusicArray[num-1] + '" frameborder="0" allowfullscreen></iframe>').prependTo('.ChatHeader');
                    lastMusic = defMusicArray[num-1];
                } else {
                    $('iframe.fs-player').remove();
                    output(d[9] + ' (<a href="https://www.youtube.com/watch?v=' + command[1] + '" target="_blank">' + d[2] + '</a>) ', "normal");
                    $('<iframe class="fs-player" style="display: none; position: absolute; z-index: 10000; right: 5px; top: 5px;" src="http://www.youtube.com/embed/' + command[1] + '?autoplay=1&loop=1&playlist=' + command[1] + '" frameborder="0" allowfullscreen></iframe>').prependTo('.ChatHeader');
                    lastMusic = command[1];
                }
            });
        this.SetCommand(c.logsfor, function(d, m) {
                var when = m.replace(new RegExp(c.logsfor.name, 'i'), '').trim();
                var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                var dayOnMonths = ["31","28","31","30","31","30","31","31","30","31","30","31"];
                if (when.search(new RegExp(d[0], 'i')) != -1) {
                    var date = new Date(),
                        day,
                        month = months[date.getMonth()],
                        year = date.getFullYear();
                        day = date.getDate();
                        if (day[0] == 0)
                            day.slice(1);
                    var articleName = '/wiki/Project:Chat/Logs/' + day + '_' + month + '_' + year;
                    $.ajax({
                        url: articleName,
                        type: 'GET',
                        success: function() {
                            output(d[1] + articleName + d[2], 'normal');
                        },
                        error: function() {
                            day = date.getDate()-1;
                            if (day == 0) {
                                month = months[date.getMonth()-1];
                                if (month == undefined) {
                                    year--;
                                    month = "December"
                                    day = 31
                                } else {
                                    day = dayOnMonths[date.getMonth()-1];
                                }
                            }
                            articleName = '/wiki/Project:Chat/Logs/' + day + '_' + month + '_' + year;
                            output(d[3] + articleName + d[4], 'normal');
                        }
                    });
                } else if (when.search(new RegExp(d[5], 'i')) != -1) {
                    var date = new Date(),
                        day = date.getDate() - 1,
                        month = months[date.getMonth()],
                        year = date.getFullYear();
                        if (day == 0) {
                            month = months[date.getMonth()-1];
                            if (month == undefined) {
                                year--;
                                month = "December"
                                day = 31
                            } else {
                                day = dayOnMonths[date.getMonth()-1];
                            }
                        }
                    var articleName = '/wiki/Project:Chat/Logs/' + day + '_' + month + '_' + year;
                    output(d[6] + articleName + d[7], 'normal');
                } else if (when.search(new RegExp(d[8], 'i')) != -1) {
                    output(d[9], 'normal');
                } else if (when.search(/\d\d\-\d\d\-\d\d\d\d/i) != -1 || when.search(/\d\-\d\d\-\d\d\d\d/i) != -1) {
                    var enterdate = when.split('-'),
                        month = months[parseInt(enterdate[1]) - 1];
                    var articleName = '/wiki/Project:Chat/Logs/' + enterdate[0] + '_' + month + '_' + enterdate[2];
                    $.ajax({
                        url: articleName,
                        type: 'GET',
                        success: function() {
                            output(d[10] + articleName + d[11], 'normal');
                        },
                        error: function() {
                            output(d[12], 'normal');
                        }
                    });
                } else if (when.search(new RegExp(d[13], 'i')) != -1) {
                    output(d[14], 'normal');
                } else {
                    output(d[15], 'normal');
                }
            });
        this.SetCommand(c.Sources, c.Sources.data);
        this.SetCommand(c.Logs, c.Logs.data);
        this.SetCommand(c.User, function(d, m) {
                var nick = encodeURIComponent(m.replace(/user:/i, '').replace(/\s/g, '_'));
                output(d + ' <a href="/wiki/User:' + nick + 
                        '" target="_blank">u</a>-<a href="/wiki/User_talk:' + nick + 
                        '" target="_blank">ut</a>-<a href="/wiki/Special:Contributions/' + nick + 
                        '" target="_blank">c</a>-<a href="/wiki/Special:Editcount/' + nick + 
                        '" target="_blank">ec</a>-<a href="/wiki/Special:Log?page=User:' + nick + 
                        '" target="_blank">l</a> ', 'normal');
            });
        this.SetCommand(c.Mainpage, c.Mainpage.data);
        this.SetCommand(c.Emoticons, c.Emoticons.data);
        this.SetCommand(c.Rules, c.Rules.data);
        this.SetCommand(c.Admin, c.Admin.data);
        this.SetCommand(c.Article, function(d, m) {
										var article = m.replace(/Статья /i, '').replace(/\s/g, '_');
										output(
                    ' <a href="/wiki/' + article + '" target="_blank">' + article + '</a><br/>' +
                    '<a href="/wiki/' + article + '?action=edit" target="_blank">Редактировать</a><br/>' + 
                        '<a href="/wiki/' + article + '?action=history" target="_blank">История</a><br/>' +
                        '<a href="/wiki/Special:MovePage/' + article + '" target="_blank">Переименовать</a><br/>' +
                        '<a href="/wiki/' + article + '?action=delete" target="_blank">Удалить</a><br/>' +
                        '<a href="/wiki/' + article + '?action=protect" target="_blank">Защитить</a><br/>' +
                        '<a href="/wiki/' + article + '?action=raw" target="_blank">Исходный код</a><br/>'
                ,'normal')});
        this.SetCommand(c.myjs, c.myjs.data + ' - [<a href="/wiki/Special:MyPage/chat.js" target="_blank">Chat</a>, <a href="/wiki/Special:MyPage/common.js" target="_blank">Common</a>, <a href="c.wikia.com/wiki/Special:MyPage/global.js" target="_blank">Global</a>]');
        this.SetCommand(c.Tags, c.Tags.data + ' <a href="/wiki/Тэги_в_чате" target="_blank">держи</a>');
        this.SetCommand(c.mycss, c.mycss.data + ' - [<a href="/wiki/Special:MyPage/chat.css" target="_blank">Chat</a>, <a href="/wiki/Special:MyPage/wikia.css" target="_blank">Wikia</a>, <a href="c.wikia.com/wiki/Special:MyPage/global.css" target="_blank">Global</a>]');
        this.SetCommand(c.wikiactivity, c.wikiactivity.data  + ' <a href="/wiki/Special:WikiActivity" target="_blank">WA</a>-<a href="/wiki/Special:RecentChanges" target="_blank">RC</a>-<a href="/wiki/Special:Log" target="_blank">LOG</a>');
        this.SetCommand(c.please, c.please.data);
        this.SetCommand(c.give, c.give.data);
        this.SetCommand(c.Hello, c.Hello.data);
        this.SetCommand(c.Bye, c.Bye.data);
        this.SetCommand(c.mypage, c.mypage.data);
        this.SetCommand(c.listusers, function(d) {
                var listUser = [];
                $('.User').each(function() {
                    var userList = '<a href="/wiki/User:' + $(this).attr('data-user') + '">' + $(this).attr('data-user') + '</a>';
                    if ($(this).hasClass('chat-mod')) {
                        userList += d[0];
                    }
                    if ($(this).hasClass('away')) {
                        userList += d[1];
                    }
                    if ($(this).hasClass('staff')) {
                        userList += d[2];
                    }
 
                    listUser.push(userList);
                });
 
                output(listUser.join('<br/>'), "normal");
            });
        this.SetCommand(c.Open_PM_with, function(d, m) {
                var users = m.replace(new RegExp(c.Open_PM_with.name, 'ig'), '').trim().split(';');
                output(d, "normal");
                $("#PrivateChatList [data-user='" + users[0] + "']").remove();
                mainRoom.openPrivateChat(users);
            });
        this.SetCommand(c.Commands, c.Commands.data);
        this.SetCommand(c.Money, c.Money.data);
        this.SetCommand(c.And_you_too, c.And_you_too.data);
        this.botPhrase = l.botPhrase;
    };
    this.CreateBot.prototype.SetCommand = function(comobj, comaction) {
        if (typeof comaction === "string")
            this.commands[comobj.name] = function() {window.fsinit.output(window.fsinit.replaceNick(comaction), 'normal');};
        else if (typeof comaction === "object")
            this.commands[comobj.name] = function() {window.fsinit.output(window.fsinit.replaceNick(comaction[window.fsinit.rnd(0, comaction.length - 1)]), 'normal');};
        else {
            this.commands[comobj.name] = function(m) {
                var d;
                if (typeof comobj.data === 'string')
                    d = window.fsinit.replaceNick(comobj.data);
                else {
                    d = [];
                    for (var i in comobj.data) {d[i] = window.fsinit.replaceNick(comobj.data[i])}
                }
                comaction(d, m);
            };
        }
    };
    this.CreateBot.prototype.SetMode = function(modename, avatar, commands) {
        window.fsinit.modeOutput[modename] = avatar;
        this.mode[modename] = commands;
    };
}
 
 
//Парсер
(function() {
$('<div class="future-spreader" style="position: absolute; z-index: 10000; text-align: center; width: 100%; top: -74px;">' +
    '<div class="fs-avatar" style="display: block; width: 30px; margin: 19px -10px; cursor: pointer; left: -2px; position: relative; top: -2px;" title="' + window.fs.botPhrase[1] + '">' +
        '<img src="https://vignette.wikia.nocookie.net/dont-starve/images/d/da/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%B1%D0%BE%D1%82%D0%B0.jpg/revision/latest?cb=20160824090841&path-prefix=ru" width="30px" height="30px" />' +
    '</div>' +
    '<div class="fs-body" style="display: none; text-align: left; margin: 19px -10px;">' +
        '<div class="fs-profile" style="padding: 3px; background: rgb(30, 30, 30); width: 300px;">' +
          '<img src="https://vignette.wikia.nocookie.net/dont-starve/images/d/da/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%B1%D0%BE%D1%82%D0%B0.jpg/revision/latest?cb=20160824090841&path-prefix=ru" width="30px" height="30px" style="position: relative; top: -5px; left: -5px;" />' +
          '<div class="fs-profile-desc" style="width: 250px; display: inline-block; padding-left: 3px; vertical-align: top; color: white;">'+
            window.fs.botPhrase[0] +
          '</div>' +
        '</div>' +
        '<ul style="overflow: auto; width: 300px; background: rgb(170, 170, 170); height: 300px; margin: 0px; padding: 3px;">' +
        '</ul>' +
        '<div class="fs-message" style="padding: 3px; background: rgb(30, 30, 30); width: 300px;">' +
          '<img src="' + $('.Write img').attr('src') + '" width="30px" height="30px" style="vertical-align: top;"/>' +
          '<textarea style="width: 200px; height: 25px; margin-left: 4px; resize: none;"></textarea>' +
          '<div class="fs-choose" style="display: none; width: 200px;"></div>' +
          '<button class="fs-clr" style="display: inline-block; vertical-align: top; margin-left: 4px;">CLR</button>' +
        '</div>' +
    '</div>' +
'</div>').prependTo('.ChatWindow .WikiaPage');
$('.fs-avatar').click(function() {
$('.fs-avatar').hide();
$('.fs-body').show();
$('.fs-message textarea').focus();
});
$('.fs-profile').click(function() {
$('.fs-body').hide();
$('.fs-avatar').show();
});
$('.fs-clr').click(function() {
$('.fs-body ul').empty();
});
 
$('.fs-message textarea').keypress(function(e) {
if (e.which == 13) {
e.preventDefault();
var message = $(this).val();
 
if (message.trim() !== '') {
    $(this).val('');
 
    $('<li style="padding: 3px; background: rgba(90, 90, 90, 0.6);">' +
        '<img src="' + $('.Write img').attr('src') + '" width="30px" height="30px" />' +
        '<div style="display: inline-block; vertical-align: top; padding-top: 7px; padding-left: 10px; width: 220px; color: white;">' +
            message +
        '</div>' +
    '</li>').appendTo('.fs-body ul');
 
    try {
        var passMode = true;
        for (var $mode in window.fs.mode) {
            if (!window.fs.mode[$mode].IS) {
                passMode = true;
                continue;
            }
            var passCommandCustom = true;
            for (var $command in window.fs.mode[$mode]) {
                if (message.search(new RegExp($command, 'gi')) != -1 && $command !== "IS" && $command !== "DEFAULT") {
                    passCommandCustom = false;
                    passMode = false;
                    window.fs.mode[$mode][$command](message);
                    break;
                }
            }
            if (passCommandCustom) {
                passMode = false;
                window.fs.mode[$mode].DEFAULT(message);
            }
            break;
        }
 
        if (passMode) {
            var passCustomCommand = true;
            for (var $command in window.fs.commands) {
                if (message.search(new RegExp($command, 'gi')) != -1 && $command !== "DEFAULT") {
                passCustomCommand = false;
                window.fs.commands[$command](message);
                break;
                }
            }
            if (passCustomCommand)
                window.fs.commands.DEFAULT(message);
        }
    } catch (e) {
        window.fsinit.output('Ooops! I\'ve got an error! Text of error:<br/>' + e, 'normal');
    }
}
 
$('.fs-body ul').animate({'scrollTop': '9999999'}, 1);
}
});
 
})();

/* Проверка соединения с чатом */
$(function () {
    mainRoom.socket.on("chat:add", function(msg) {
	    	var data = JSON.parse(msg.data)
	    	userSay = data.attrs.text
	    	if (userSay.indexOf('!Пинг') +1 || userSay.indexOf('!пинг') +1 )
	    		$("#Chat_" + mainRoom.roomId + " li:last .message").append('<br /><span style="font-weight: bold; font-size: 12px; color: #959063; min-height: 0; padding-bottom: 10px; padding-top: 10px; text-align: center; font-family: arial;"> понг.</span>');
    });
})

importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js', //Команда !mods 
        'u:dev:MediaWiki:!ban/code.js' //Команда !ban (Пример: !ban This is test account for 1 minute because test)
    ]
} );