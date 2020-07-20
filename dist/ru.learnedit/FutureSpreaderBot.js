//Версия 2.3
/* Бот. 
 * Создание:
 * Сибирский Смотритель (код) (ru) (en)
 * Annovy (фразы и код) (ru)
 * Бургерпентс (контент) (ru)
 * Mamvik (контент) (en)
 */
//Стили
importStylesheetURI('http://ru.learnedit.wikia.com/wiki/MediaWiki:FutureSpreaderBot.css?action=raw&ctype=text/css');

// Данные
window.fsinit = new CreateBotInit();
window.fs = new window.fsinit.CreateBot();
 
function CreateBotInit() {
    this.usernick = wgUserName;
    this.DataCom = function(name, data) {
        this.name = name;
        this.data = data;
    };
    this.rnd = function(min, max) {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    };
    this.modeOutput = {
        'normal': 'http://i.imgur.com/6bQR2zO.png',
        'flowie.1': 'https://vignette.wikia.nocookie.net/undertale/images/3/3b/Flowey_Talk_normal.gif/revision/latest?cb=20151023123033&path-prefix=ru',
        'flowie.2': 'https://vignette.wikia.nocookie.net/undertale/images/a/a6/Hungry.png/revision/latest?cb=20151108165835&path-prefix=ru',
        'flowie.3': 'http://i.imgur.com/VrCK7kM.png',
        'flowie.4': 'http://i.imgur.com/4nJdy3E.png',
        'flowie.5': 'http://i.imgur.com/3txixr4.png',
        'flowie.6': 'http://i.imgur.com/ESuX7OW.png',
        'flowie.7': 'http://i.imgur.com/FBPl9uB.png',
        'flowie.8': 'http://i.imgur.com/769MYcl.png',
        'asriel.1': 'http://ianmccowan.nfshost.com/undertale/static/images/sprites/Asriel/1.png',
        'asriel.2': 'http://ianmccowan.nfshost.com/undertale/static/images/sprites/Asriel/26.png',
        'asriel.3': 'http://i.imgur.com/ofQtQ7g.png'
    };
    this.output = function(text, mode) {
        $('<li class="fs-bot fs-bot-' + mode + '">' +
            '<img src="' + window.fsinit.modeOutput[mode] + '" width="30px" height="30px" />' +
            '<div>' +
                '<span>' + text
                            .replace(/\{usernick\}/gi, window.fsinit.usernick) // {usernick} > ник из window.fsinit.usernick
                            .replace(/\{baseusernick\}/gi, wgUserName) // {baseusernick} > ник участника (для технических целей)
                            .replace(/\[\[([^\]\[\|]*)\|([^\]\[\|]+)\]\]/ig, '<a href="/wiki/$1" target="_blank">$2</a>') // [[$1|$2]] > ссылка на страницу $1, отображающаяся как $2
                            .replace(/\[\[([^\]\[\|]+)\]\]/ig, '<a href="/wiki/$1" target="_blank">$1</a>')  // [[$1]] > просто ссылка на $1
                + '</span>' + 
            '</div>' +
        '</li>').appendTo('.fs-body ul');
    };
    this.answerUser = function(text) {
        $('<li class="fs-user">' +
            '<img src="' + $('.Write img').attr('src') + '" width="30px" height="30px" />' +
            '<div>' +
                '<span>' + text
                            .replace(/\{usernick\}/g, window.fsinit.usernick)
                            .replace(/\{baseusernick\}/gi, wgUserName) // {baseusernick} > ник участника (для технических целей)
                            .replace(/\[\[([^\]\[\|]*)\|([^\]\[\|]+)\]\]/ig, '<a href="/wiki/$1" target="_blank">$2</a>') // [[$1|$2]] > ссылка на страницу $1, отображающаяся как $2
                            .replace(/\[\[([^\]\[\|]+)\]\]/ig, '<a href="/wiki/$1" target="_blank">$1</a>')
                 + '</span>' + 
            '</div>' +
        '</li>').appendTo('.fs-body ul');
    };
    //Конструктор ролевых модов
    this.CreateRP = function(finalFunction) {
        var functRP = {};
        var doChoose = function(choose) {
            $('.fs-choose').empty();
            var result = [];
            for (var i in choose) {
                if (typeof choose[i] !== 'undefined')
                    result[result.length] = '<a href="#" class="choose ' + choose[i][1] + '">' + choose[i][0] + '</a>';
            }
            $('.fs-choose').html(result.join('<br/>'));
            $('a.choose').on('click', function(e) {
                e.preventDefault();
                functRP[$(this).attr('class').replace(/choose/i, '').trim()]();
                $('.fs-body ul').animate({'scrollTop': '9999999'}, 1);
                if (typeof finalFunction !== 'undefined') finalFunction();
            });
        };
        this.getFunct = function(name) {return functRP[name];};
        this.doChoose = doChoose;
        this.NewLine = function(id, answerUser, functback, choose) {
            functRP[id] = function() {
                if (typeof answerUser !== 'undefined') window.fsinit.answerUser(answerUser);
                functback();
                if (typeof choose !== 'undefined') doChoose(choose);
            };
        };
        this.StartLine = function(functback, choose) {
            this.Launch = function() {
                functback();
                $('.fs-message textarea').hide();
                $('.fs-choose').css('display', 'inline-block');
                if (typeof choose !== 'undefined') doChoose(choose);
            };
        };
        this.StopLine = function(id, answerUser, functback) {
            functRP[id] = function() {
                if (typeof answerUser !== undefined) window.fsinit.answerUser(answerUser);
                functback();
                $('.fs-message textarea').show();
                $('.fs-choose').hide().empty();
            };
        };
    };
    // Конструктор Healthbar
    this.HealthBar = function(maxHealth) {
        if (typeof maxHealth !== 'number') maxHealth = 20;
        this.health = maxHealth;
        var healthBar = $('<div class="healthbar">' +
            '<progress id="healthbar-bar" value="' + maxHealth + '" max="' + maxHealth + '">' +
            '</progress>' + 
            '<div style="display: inline-block; height: 30px; margin-left: 3px; vertical-align: top;">' +
                '<span class="healthbar-value">' + maxHealth + '</span>/<span class="healthbar-max">' + maxHealth + '</span>' +
            '</div>' +
        '</div>'),
            defaultTextDesc = $('.fs-profile-desc').text();
        this.put = function() {
            $('.fs-profile-desc').html(healthBar);
        };
        this.remove = function() {
            $('.fs-profile-desc').html(defaultTextDesc);
        };
        this.set = function(healTo) {
            if (typeof healTo == 'number' && healTo <= maxHealth) {
                healthBar.find('#healthbar-bar').attr('value', (healTo >= 0) ? healTo : 0);
                healthBar.find('.healthbar-value').text((healTo >= 0) ? healTo : 0);
                this.health = (healTo >= 0) ? healTo : 0;
            } else if (healTo > maxHealth || healTo.search(/max/i) != -1) {
                healthBar.find('#healthbar-bar').attr('value', maxHealth);
                healthBar.find('.healthbar-value').text(maxHealth);
                this.health = maxHealth;
            } else {
                throw new Error("Only number and 'max' can be value of health");
            }
        };
        this.setMax = function(max) {
            if (typeof max == "number" && !isNaN(max) && Math.abs(max) != Infinity) {
                maxHealth = max;
                healthBar.find('.healthbar-max').text(max);
                healthBar.find('#healthbar-bar').attr('max', max);
                if (this.health > maxHealth) {
                    this.health = maxHealth;
                }
            } else {
                if (typeof max != "number") throw new Error("This type cannot be max of healthbar!");
                else if (isNaN(max)) throw new Error("NaN cannot be max of healthbar");
                else if (Math.abs(max) == Infinity) throw new Error("infinite value cannot be max of healthbar");
            }
        };
    };
    //Конструктор классических модов
    this.newMode = function(name, avatar) {
        this.name = name;
        this.avatar = avatar;
        this.commands = {};
        this.IS = false;
        this.SetCommand = function(comobj, comaction) {
            if (typeof comobj === "object") {
                if (typeof comaction === "string")
                    this.commands[comobj.name] = function() {window.fsinit.output(comaction, name);};
                else if (typeof comaction === "object")
                    this.commands[comobj.name] = function() {window.fsinit.output(comaction[window.fsinit.rnd(0, comaction.length - 1)], name);};
                else if (typeof comaction === "undefined") {
                    if (typeof comobj.data === "string")
                        this.commands[comobj.name] = function() {window.fsinit.output(comobj.data, name);};
                    else if (typeof comobj.data === "object")
                        this.commands[comobj.name] = function() {window.fsinit.output(comobj.data[window.fsinit.rnd(0, comobj.data.length - 1)], name);};
                } else {
                    this.commands[comobj.name] = function(m) {
                        var d;
                        if (typeof comobj.data === 'string')
                            d = comobj.data;
                        else {
                            d = [];
                            for (var i in comobj.data) {d[i] = comobj.data[i]}
                        }
                        comaction(d, m);
                    };
                }
            } else if (typeof comobj === "string") {
                if (typeof comaction === "string")
                    this.commands[comobj] = function() {window.fsinit.output(comaction, name);};
                else if (typeof comaction === "object")
                    this.commands[comobj] = function() {window.fsinit.output(comaction[window.fsinit.rnd(0, comaction.length - 1)], name);};
                else {
                    this.commands[comobj] = function(m) {
                        comaction(m);
                    };
                }
            }
        };
        this.on = function(comobj) {
            if (typeof comobj == 'object') {
                return function() {
                    window.fs.mode[name].IS = true;
                    window.fsinit.output(comobj.data, name);
                };
            } else {
                return function() {
                    window.fs.mode[name].IS = true;
                    window.fsinit.output(comobj, name);
                };
            }
        };
        this.off = function(comobj, text) {
            if (typeof comobj == 'object') {
                this.commands[comobj.name] = function() {
                    window.fs.mode[name].IS = false;
                    window.fsinit.output(comobj.data, 'normal');
                };
            } else {
                this.commands[comobj] = function() {
                    window.fs.mode[name].IS = false;
                    window.fsinit.output(text, 'normal');
                };
            }
        };
    };
    this.CreateBot = function() {
        var answerUser = window.fsinit.answerUser,
            output = window.fsinit.output,
            rnd = window.fsinit.rnd,
            DC = window.fsinit.DataCom;
        var l = {
            'commands': {
                'Papyrus_off': new DC('Папирус-офф', "Всё-всё-всё, {usernick}"),
                'Papyrus_on': new DC('Папирус-он', 'ЧЕЛОВЕК!'),
                'Flowey_on': new DC('Флауи-он', ['Howdy!', 'A. Слушать дальше', 'B. Приказать замолчать', 'Выход']),
                'Guess_on': new DC('Угадай-он', 'Начинаем игру! От 1 до 1000 или любого другого числа (можно установить с угадай-<макс. число>)! Используй num-<число>, {usernick}'),
                "Guess_num": new DC("Угадай-\\d+", "Установлено максимальное значение: "),
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
                    'Логи на сёдня? Есть такое. [[', '|Держи]]',
                    'Логи на сёдня? Упс... Походу, их пока нет [[','"|Держи вчерашние]]',
                    'вчера',
                    'Логи на вчера? Эт пожалуйста. [[','|Держи вчерашние]]',
                    'завтра',
                    'Не все могут смотреть в завтрашний день, не так ли?',
                    'Логи на эту дату? Есть, канеш. [[','|Держи]]',
                    'Я не нашёл этой даты :c Что посоветовать могу:<br/>- Проверить написания даты. Надо вводить дд-мм-гггг<br/>- Возможно, логи на эту дату пока нет. Попробуйте другую дату.<br/>- Попробуйте ввести "Логи на сегодня" или "Логи на вчера"',
                    'дд\\-мм\\-гггг',
                    'Мне попался что-то очень умный пользователь... {usernick} зовут',
                    'Логи на... стоп, ты шутишь? Надо "Логи на сегодня", "Логи на вчера" или "Логи на дд-мм-гггг"'
                ]),
                'Logs': new DC("Логи", 'Логи могут быть найдены [[Category:Chat_logs|здесь]]'),
                'User': new DC('User:[\\s\\S]+', '{usernick}, инфа по участнику:'),
                'Article': new DC("Статья", '{usernick}, держи, как просил:'),
                'please': new DC("пожалуйста", 'Ок, {usernick}'),
                'give': new DC("Дай", 'Что, {usernick}, информации захотелось? А не дам, вежливо попроси!'),
                'Hello': new DC("Привет", 'Привет, {usernick}. Как жизнь?'),
                'Bye': new DC("Пока", 'Если же мы и вправду настоящие друзья, {usernick}, то ты сюда больше не вернёшься... Шучу, приходи ещё.'),
                "listusers": new DC("listusers", [" (м)", " (о)", " (с)"]),
                'Open_PM_with': new DC("Открой ЛС с ", "Открываю ЛС... "),
                'links': new DC('Ссылки', '{usernick}, за решение головоломки вот все ссылки, которые можно дать:<br/>\
                                Про вики:<br/>\
                                [[Заглавная страница]], [[Special:WikiActivity|WikiActivity]], [[Special:RecentChanges|RecentChanges]], [[Special:Log|Log]],<br/>\
                                [[Project:Правила|Правила]], [[Служебная:ListUsers/sysop|Админы]],<br/>\
                                Про чат:<br/>\
                                [[Project:Правила_чата|Правила]], [[Служебная:ListUsers/chatmoderator|Модеры]], [[MediaWiki:Emoticons|Смайлы]], [[Project:Тэги в чате|ChatTags]]<br/>\
                                Про тебя:<br/>\
                                [[Special:MyPage|Профайл]], [[User talk:{baseusernick}|Стена]], [[User blog:{baseusernick}|Блог]], [[Special:Contributions/{baseusernick}|Вклад]],<br/>\
                                [[Special:Editcount/{baseusernick}|Правки]], [[Special:Log/{baseusernick}|Лог (исп)]], [[Special:Log?page=User:{baseusernick}|Лог (цель)]],<br/>\
                                [[w:Special:UserActivity|Активность]], [[Служебная:Preferences|Настройки]],<br/>\
                                CSS: [[Special:MyPage/wikia.css|Wikia]], [[Special:myPage/chat.css|Chat]], [[w:Special:MyPage/global.css|Global]],<br/>\
                                JS: [[Special:MyPage/common.js|Common]], [[Special:myPage/chat.js|Chat]], [[w:Special:MyPage/global.js|Global]],<br/>\
                                Про меня:<br/>\
                                [[Project:Команды бота|Команды]], [[w:c:ru.learnedit:MediaWiki:FutureSpreaderBot.js|Скрипты]], [[w:c:ru.learnedit:MediaWiki:FutureSpreaderBot.css|Стили]],<br/>\
                                Про ботов:<br/>\
                                <a href="https://github.com/sactage/chatbot-rb" target="_blank">Ядро UndertaleBot</a>, [[w:c:runescape:User:Joeytje50/ChatLogger.js|ChatLogger]].'),
                // команды для отдельных ссылок
                'emoticons': new DC('(смайлы|смайлики)', '{usernick}, держи: [[MediaWiki:Emoticons|вот]].'),
                'mainpage': new DC('(заглавная|заглавную)', '{usernick}, вот [[заглавная]]'),
                'wikiactivity': new DC('(active|wikiactivity)', '{usernick}, активность на вики: [[Special:WikiActivity|WA]]-[[Special:RecentChanges|RC]]-[[Special:Log|LOG]]'),
                'rules': new DC('правила', '{usernick}, все правила: [[Project:Правила_чата|Чат]], [[Project:Правила|Вики]]'),
                'admin': new DC('(Администрация|Статусники|Админы|Модеры)', '{usernick}, вот: [[Служебная:ListUsers/chatmoderator|модеры]], [[Служебная:ListUsers/sysop|админы]]'),
                'me': new DC("(me|my page)", "{usernick}, вся инфа о тебе: [[Special:MyPage|u]]-[[User talk:{baseusernick}|ut]]-[[User blog:{baseusernick}|b]]-[[Special:Contributions/{baseusernick}|c]]-[[Special:Editcount/{baseusernick}|ec]]-[[Special:Log/{baseusernick}|log1]]-[[Special:Log?page=User:{baseusernick}|log2]]-[[w:Special:UserActivity|act]]-[[Служебная:Preferences|sett]]"),
                'css': new DC("css", "{usernick}, вот все ссылки на личный CSS: [[Special:MyPage/wikia.css|Wikia]], [[Special:myPage/chat.css|Chat]], [[w:Special:MyPage/global.css|Global]]"),
                'js': new DC("(js|javascript)", "{usernick}, вот все ссылки на личный JS: [[Special:MyPage/common.js|Common]], [[Special:myPage/chat.js|Chat]], [[w:Special:MyPage/global.js|Global]]"),
                'source': new DC("исходник", '{usernick}, смотри: [[w:c:ru.learnedit:MediaWiki:FutureSpreaderBot.js|Мои скрипты]], [[w:c:ru.learnedit:MediaWiki:FutureSpreaderBot.css|Мои стили]],<br/><a href="https://github.com/sactage/chatbot-rb" target="_blank">Ядро UndertaleBot</a>, [[w:c:runescape:User:Joeytje50/ChatLogger.js|ChatLogger]], '),
                'commands': new DC('Команды', 'Всё не забываешь ту первоначальную ссылку в головоломке? Ладно, [[Project:Команды бота|держи]]'),
                'chatags': new DC('(чат\\-?т?[эе]гс|chat\\-?t?ags)', 'Что, захотелось писать красным текстом? Смотри [[Project:Тэги в чате|сюда]].'),
                'Money': new DC("Деньги", 'Денег захотел? А зачем тебе?'),
                'And_you_too': new DC("А у тебя", 'Тоже...')
            },
            'papyrusPhrases': [
                'Я ОБЯЗАТЕЛЬНО СТАНУ ЧЛЕНОМ КОРОЛЕВСКОЙ ГВАРДИИ!',
                'NYEH HEH HEH HEH HEH HEH HEH HEH HEH HEH!',
                'ТЕБЕ НИ ЗА ЧТО НЕ ПОБЕДИТЬ ВЕЛИКОГО ПАПИРУСА!',
                'Я ДОЛЖЕН БЫТЬ ПЕРВЫМ! Я ДОЛЖЕН ПОЙМАТЬ ЧЕЛОВЕКА!',
                'ОТДАЙ ВСЕ СВОИ ДЕНЬГИ!',
                'О БОЖЕ!',
                'Я ПОЗВОЛЯЮ ТЕБЕ!!!',
                'YOU LAZYBONES!',
                'САНС, ТЫ СТАНОВИШЬСЯ ЛЕНИВЕЕ И ЛЕНИВЕЕ С КАЖДЫМ ДНЁМ!!!',
                'ЧТО?! ЭТО НЕВОЗМОЖНО.',
                'Я ВЕЛИКОЛЕПНЫЙ ШЭФ ПАПИРУС!',
                'Прекрати заглядывать в мой пустой почтовый ящик, это моя пустота, не твоя.',
                'ПАЦАНАМ ВХОД ЗАПРЕЩЁН! ДЕВУШКАМ ЗАПРЕЩЁН! ПАПИРУСУ РАЗРЕШЁН.',
                'ОСТОРОЖНО!! ЛЁД СКОЛЬЗКИЙ!!! НО КОГДА ВЫ НА НЁМ СКОЛЬЗИТЕ, ТО НИКТО НЕ БУДЕТ ВАС АТАКОВАТЬ. НИКТО НЕ ХОЧЕТ ПРОВАЛИТЬСЯ ПОД ЛЁД!',
                'ОХ-ХО-ХО! ЭЛЕКТРИЧЕСКИЙ ЛАБИРИНТ! ЭТО БЫЛО ВЕСЕЛО ДО ТОГО КАК МЕНЯ НЕ УДАРИЛО ТОКОМ!',
                'ЗАГС ДЛЯ СОБАК... ТЫ КОГДА-ТО ХОТЕЛ БЫ ЖЕНИТСЯ НА СОБАКЕ???',
                'СИГНАЛ НА МОЁМ ТЕЛЕФОНЕ СТАНОВИТСЯ СЛАБЕЕ. ОН ВООБЩЕ ПЕРЕСТАЁТ ЛОВИТЬ СИГНАЛ. ДУМАЮ НЕТ ПРИЧИНЫ ИДТИ ДАЛЬШЕ.',
                'СНОУДИН... - ДОМ ПАПИРУСА. НЕ ПРАВДА ЛИ КЛАССНЫЙ СЛОГАН???',
                'ПРИВЕТ.',
                'ГОСТИНИЦА В СНОУДИНЕ ЭТО ОЧЕНЬ ХОРОШЕЕ МЕСТО. ОСОБЕННО МНЕ НРАВИТСЯ ХОЗЯЙКА ЭТОЙ ГОСТИНИЦЫ, ОНА ВСЕГДА МНЕ ДАЁТ ЛЕДЕНЕЦ И ХЛОПАЕТ ПО ГОЛОВЕ.',
                'ЭТО ТА КОМНАТА ГДЕ Я ТЕБЯ СПОЙМАЛ. УЖАСНОЕ ВОСПОМИНАНИЕ',
                'ВОДОПАД.... ЭТО МЕСТО О КОТОРОМ Я ЗНАЮ ПОЧТИ ВСЁ. ОЙ, У МЕНЯ НЕТ ФАКТОВ НА ТЕМУ ВОДОПАДА',
                'Э??',
                'ОМ...',
                'ЭТО ВСЕГО-ЛИШЬ РЕКА',
                'ГИФТРОТ ЖИВЁТ РЯДОМ. ОН ЛЮБИТ ПОДАРКИ. НЕ БЕСПОКОЙТЕСЬ ЕСЛИ У ВАС ПОСЛЕ НЕГО НЕ ОСТАЛОСЬ ДЕНЕГ НА ЧТО-ТО ХОРОШЕЕ. ОН НА ЭТО РАССЧИТЫВАЕТ',
                'ЭТО ГИПНОЗ, НЕ ПРАВДА ЛИ???',
                'Я ЛЮБЛЮ БИБЛИОТЕКИ. ТАМ КНИГИ РАССОРТИРОВАНЫ ПО ЦВЕТАМ. ТО ЧУВСТВО, КОГДА ТЫ БЕРЁШЬ КНИГУ....',
                'ЧТО ТАКОЕ АБОНЕМЕНТ ЧИТАТЕЛЯ???',
                'ХММ... В ЭТОЙ КОМНАТЕ ЧТО-ТО РАЗДРАЖАЕТ МЕНЯ.',
                'ЗАГАДОЧНАЯ СТАТУЯ...',
                'ОТКУДА ДОНОСИТСЯ МУЗЫКА????',
                'ТЫ ЗАМЁРЗНЕШЬ, ПОКА БУДЕШЬ ЕСТЬ ЭТИ ВКУСНЕЙШИЕ СПАГЕТТИ',
                'КАК ТЫ ПРОШЁЛ ЛОВУШКУ ВЕЛИКОГО ПАПИРУСА?'
            ],
            'sansPhrases': [
                'Так что?',
                'Ты знал? У меня есть <a href="/wiki/Project:Команды бота" target="_blank">список команд</a>!',
                'Ты не забыл про "пожалуйста"?',
                'Никогда не понимал зачем люди это делают',
                'Хмм...',
                'Хэй, а давай я загадаю цифру, а ты введёшь "угадай-он", а?',
                'Введи "Папирус-он" и ты оставишь меня в покое, окей?',
                'Ну зачем ты меня разбудил?!',
                'У меня есть отличная идея. Введи "Рулетка 6"',
                'Даааааа тя поимееееели!',
                'Хочешь узнать, к кому обращаться, когда тебя обижают? Введи "Админы"!',
                'Какой прекрасный денёк снаружи... птички поют... цветочки благоухают... в такие дни... Дети, как те, что флудят в чате... Должны гореть в аду.',
                'Прекрати.',
                'Нет.',
                'И зачем ты это пишешь? В чате тихо и тебе нечего делать?',
                'Слушай, иди лучше поговори с реальными людьми. Ты же в чате.',
                'У тебя есть любимая игра? Если в чате скучно, то поиграй в неё, а не доставай меня, окей?',
                'М-да.',
                'Ладно, ладно... Ладно... Расскажи мне обо всех своих печалях и обидах. Я послушаю.',
                'Напиши "Фразу". Это веселее, чем пытаться со мной говорить.',
                'Дружище, не хочешь-ли слегка посмайлить в чате? [[MediaWiki:Emoticons|Держи.]] Только не увлекайся, а то тебя могут и забанить. Если это произойдёт - я ни при чём.',
                'Послушай, для развлечения есть ещё куча режимов. Почему ты выбрал именно меня?',
                'Ты только это и можешь сказать.',
                'Зря ты убил тогда Ториэль в Геноцид-руте. Это будет мучать тебя.',
                'Мне тоже может быть обидно, ты не подумал?',
                'Надеюсь, что тебе сейчас очень весело.',
                'Не грусти. Иди поговори в чате. Я думаю, тебе это поможет.',
                'Как думаешь, может Флауи тебя выслушает? Напиши "Флауи-он". Он придёт.',
                'А ты злой однако.',
                'Ладно, извини... Не хотел.',
                'Кто тебе больше всех нравится из Андертейла?',
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
                'А вот и нет',
                'У меня насчёт этого плохие предчувствия',
                'Ага, конечно',
                'Допустим',
                'А я бот!',
                'Я не уберу этот носок, {usernick}',
                '(приставучий юзер попался...)',
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
                'Пришёл спрятаться в Андерчат? Заходи, здесь уютно!',
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
                'Следишь за новостями Андертейла? Как думаешь, будет-ли вторая часть?',
                'Твоя музыка шикарна... *звучит, как сарказм*',
                'Какие книги ты читал?... Или вообще не читал?..',
                'Я люблю природу... Животных, растения... И Тёмную Сторону.',
                'Я терпеть не могу вандалов. Какой толк портить статьи? Может ты понимаешь?',
                'Я хороший собеседник, как думаешь?',
                'Мне скучно бывает одному... Рад, что вы со мной говорите.',
                '...'
            ],
            'phrase': [
                ['Чёрный', 'Адский', 'Милый', 'Удачливый', 'Белый', 'Умный', 'Треугольный', 'Хороший', 'Дружелюбный', 'Лежащий на полу', 'Смешной', 'Чудный', 'Плохой', 'Злой', 'Агресивный', 'Забавный', 'Странный', 'Неразумный', 'Великолепный', 'Мудрый', 'Потраченый', 'Крутой', 'Средний', 'Очень смешной'],
                ['Фриск', 'участник', 'Чара', 'человек', 'некто', 'участник', 'бот', 'Ктулху', 'Анонс', 'кое-кто', 'Аннови', 'Сиба', 'Странник', 'Бургерпентс', 'Следун', 'Штурмовик', 'С8', 'OllFilezYT', 'Пруф', 'Зак', 'Гг', 'Мамвик', 'Украини', 'Лисохвост'],
                ['играет', 'делится', 'дружит', 'разговаривает', 'идёт на свидание', 'устраивает бой', 'читает книжку', 'гуляет', 'сидит в чате', 'правит статью', 'пишет скрипт', 'ест', 'играет', 'танцует', 'играет в покер', 'веселится', 'орёт'],
                ['с Сансом.', 'с Ториэль.', 'с Папирусом.', 'с Флауви.', 'с Андайн.', 'с Альфис.', 'с Азриэль.', 'с Темми.', 'с Меттатоном.', 'с Асгором.', 'с Напстаблуком.', 'с Маффет.', 'с Герсоном.', 'с Брэтти.', 'с Кэтти.', 'с пони.', 'с кеком.', 'с Флаттершай', 'с Рэинбоу Дэш']
            ],
            'botPhrase': ['Это бот. Попробуй ввести "Ссылки" для получения списка ссылок', 'Кликни на меня!']
        };
        ////////////////////////////////////////////
        this.papyrusPhrases = l.papyrusPhrases;
        this.sansPhrases = l.sansPhrases;
        this.defaultMusic = {
            'start': 's7RRgF5Ve_E',
            'menu': 'kRT9vY2f7tg',
            'flowey': '83jGCWCcBzc',
            'toriel': 'B69GfSqEZEs',
            'ruins': 'QyPR77rg1to',
            'Uwa1': 'rHU4rpQUshg',
            'dummy': 't62zFJATVPM',
            'tension': 'OSPbX0lkTmQ',
            'battle': 'JRU6GnETSN4',
            'napsta': 'Zz1bfhtKsHM',
            'DETERMINATION': 'W1i4mTyidOc',
            'home': '5_E_y1AWAfc',
            'home(mb)': 'ANEsXjSiYxI',
            'toriel2': 'xflkF-sqNaM',
            'sans': 'Zzo6L3wsf8c',
            'papyrs': 'FKdtstAo6iU',
            'snowy': '8BIeGdBjJiU',
            'Uwa2': 'XnG7HG8bmkU',
            'dogbass': 'a1OLiuNLpEs',
            'mysterious': 'gC11HJ99Egs',
            'dog': 'H4wptBuM6zs',
            'snowdin': 'z6LmMCuGjfA',
            'shop': 'jCQ_5Gj6jlg',
            'papyrus2': 'zdeZwAk6ULE',
            'dating1': 'dtYwq4aBr0E',
            'dating2': 'ShK_Tj-Ee3Y',
            'dating3': 'JQ8bpWkoC7A',
            'premonition': 'sQDiDDb1_9k',
            'danger': 'FhpJN6Khesw',
            'undyne': 'VH6HIHmhvQU',
            'waterfall': 'v712NiVK5uY',
            'run': 'PPapt88_3aU',
            'water': 'AsvhQ-soLdg',
            'memory': 'eijdNQMYikY',
            'bird': 'Z51lfE2k7jU',
            'dummy!': 'N3epEVMNJdY',
            'pathetic': 'nu_ruGyTNEs',
            'spook1': 'K1qjt_1geiI',
            'spook2': 'o251comtNfk',
            'ghoul': 'lWP9s44i-YA',
            'chill': 'D4Ximn7nZdc',
            'snail': 'ewxyxByJPP0',
            'temmie1': 'rNlyF43Te6U',
            'temmie2': 'y_qHuDjE3CQ',
            'undyne2': 'PLDyWLbuptQ',
            'undyne3': 'qrBB3_rFPjg',
            'Ooo': 'vdE3R3BeH-I',
            'alphys': 'xG2AtyD3elY',
            'showtime!': '9uwEAugeH8w',
            'mettaton': 'P0PpyUsvT9w',
            'hotland': 'xLsuam9o9BA',
            'Uwa3': 'wyShNqRkQ1I',
            'hard': 'HnmHqWU0z5M',
            'hotel': '8wSYwqbp4S4',
            'hotel2': 'wRUdj1WgwIE',
            'confession': 'qzQyP99Q0pE',
            'report1': '4oi_XcH2sAw',
            'report2': 'Z3ZULqzMutw',
            'muffet': 'YZ3XjVVNagU',
            'wrong': 'gTCSQevpuOg',
            'oh1': 'JlKHChbEcps',
            'oh2': '5aRE_J4UvYM',
            'sans2': 'zNd4apsr3WE',
            'approach': 'qNi_6kXc2cc',
            'CORE': 'tDuEWw648jo',
            'last': 'pzhYcYwg4vE',
            'ohmy': 'r-IvDZ8Wljo',
            'mettaton2': 'r-IvDZ8Wljo',
            'fans': '6nOHNgotIPM',
            'long': 'XDQGK6ztbLs',
            'undertale': 'EBhFHJMVfiI',
            'sans3': '41YOknSl0zw',
            'choice': 'C4Wv5M9JPao',
            'shock': 'EUJA3xRyVVM',
            'barrier': 'nJfzf--xqeQ',
            'asgore': 'YivzBeEwzWI',
            'asgore2': 'hMa4hZQbrms',
            'idiot': 'eOqq5kNBVoM',
            'flowey2': 'eUcThHVbrXY',
            'finale': 'yWjavxcGfqM',
            'ending': 'l3sJ79C1Zyo',
            'piano': 'zEAN2dna9To',
            'lab': 'y49b8aiQVBg',
            'amalgam': '71u0i6J-Qes',
            'toriel(r)': 'cGBMTAGzWPs',
            'pacifist': 'B4qdpiad_Q0',
            'asriel': 'tz82xbLvK_k',
            'asriel2': 'pumVu-WWhKM',
            'save': 'mZRP7nQkfrM',
            'asriel3': 'IkOK8tdEsFY',
            'power': '6nQbkE1DS0o',
            'reunited': 'WgRfPc1lfJk',
            'menu2': 'brP9Q08kEfk',
            'respite': 'E-fyLcHg4iM',
            'BringIt': 'x_P5smsopK0',
            'goodbye': '5P8V4mP5RLg',
            'refused': 'ML6OV8fG74w',
            'undyne4': 'aWBtpBwzzdM',
            'mettaton3': 'mwrUem9vM_A',
            'megalovania': 'c5daGZ96QGU',
            'GoodNight': 'BGpJrPY563A',
            'gaster': 'AB8o_VdvFpk',
            'rick': 'dQw4w9WgXcQ',
            'bot': 'Xx-GGQgzCCU'
        };
        this.phrase = l.phrase;
        this.chooseUrWay = l.chooseUrWay;
        this.mode = {};
        this.commands = {};
        var c = l.commands;
 
        //Мод Флауи
        var nope = false;
        var health = new window.fsinit.HealthBar();
        var isHope = false;
        var currentActionId = 0;
        var floweyMode = new window.fsinit.CreateRP(function() {
            if (nope) $('.bad').remove();
        });
        (function(d) {
            var scale = 0;
 
            floweyMode.StartLine(function () {output('Howdy', 'flowie.1');}, 
            [
                ['A. Слушать дальше', 'good-1'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-1', 'Угу.', function () {output('Ты наверное ничего не знаешь о Подземелье?', 'flowie.1');},
            [
                ['A. Слушать дальше', 'good-2'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-2', 'Угу.', function () {output('Думаю, ты хочешь узнать что-то о нём.', 'flowie.1');},
            [
                ['A. Слушать дальше', 'good-3'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-3', 'Угу.', function () {output('Я могу тебя научить как жить в нём.', 'flowie.1');},
            [
                ['A. Слушать дальше', 'good-4'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-4', 'Угу.', function () {output('Видишь эти дружелюбные пульки? Это ЛЮБОВЬ<br/>*хотя они не такие уж и дружелюбные*.', 'flowie.1');},
            [
                ['A. Слушать дальше', 'good-5'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-5', 'Угу.', function () {output('Ах да. ЛЮБОВЬ сделана из ОПЫТА.', 'flowie.1');},
            [
                ['A. Слушать дальше', 'good-6'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-6', 'Угу.', function () {output('Чем больше уровень любви то тем ты сильнее.', 'flowie.1');},
            [
                ['A. Слушать дальше', 'good-7'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-7', 'Угу', function () {output('Лови их!<br/>*надеюсь, он не такой тупой, как шестеро прошлых людей*', 'flowie.1');},
            [
                ['A. Ловить', 'catch'],
                ['B. Не ловить', 'dodge'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('dodge', '*увернулся*', function () {output('Гм... Почему ты не ловишь?', 'flowie.2');},
            [
                ['A. Слушать дальше', 'good-8'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-8', 'Потому, что я так хочу.', function () {output('Я не думал, что люди одинаковы.', 'flowie.2');},
            [
                ['A. Слушать дальше', 'good-9'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-9', 'Такая реальность.', function () {output('Думаю, ты меня не разочаруешь.', 'flowie.2');},
            [
                ['A. Слушать дальше', 'good-10'],
                ['B. Приказать замолчать', 'bad'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-10', 'Надеюсь.', function () {output('Попытка №2!<br/>*Флауи бросил вторую порцию ЛЮБВИ*', 'flowie.2');},
            [
                ['A. Ловить', 'catch'],
                ['B. Не ловить', 'dodge-2'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('dodge-2', '*увернулся*', function () {output('Ты уже знаешь, что тут происходит, верно?', 'flowie.3');},
            [
                ['А. Слушать дальше', 'good-11-1'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('catch', '*Поймал*', function () {output('ТЫ ИДИОТ!', 'flowie.3');},
            [
                ['А. Слушать дальше', 'good-11'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-11-1', 'Ага.', function () {output('Ты просто хотел увидеть меня злым!', 'flowie.3');}, 
            [
                ['А. Слушать дальше', 'good-11'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('good-11', 'Угу.', function () {output('Умри!', 'flowie.3');},
            [
                ['А. Угроза', 'genocide-1'],
                ['B. Попросить пощады', 'pacifist-1'],
                ['Выход', 'quit']
            ]);
            //Геноцид (да я знаю, что Омега из нейтрала, но в этой РП нейтрала нету)
            floweyMode.NewLine('genocide-1', 'Сам умри!', function () {output('Ты бросаешь мне вызов!', 'flowie.4');},
            [
                ['А. Угроза', 'genocide-2'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('genocide-2', 'Я тебя уничтожу!', function () {output('Ну что-ж! Я ВЫСОСУ ТВОЮ ДУШУ!', 'flowie.8');},
            [
                ['А. Угроза', 'genocide-3'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('genocide-3', '!!?!', function() {
                $('.fs-body').hide();
                $('.fs-avatar').show();
                $('.fs-avatar img').attr('src', 'http://i.imgur.com/ESuX7OW.png');
                $('.fs-profile img').attr('src', 'http://i.imgur.com/7JVjiNZ.gif');
                $('.fs-profile-desc').text('HAHAHAHAHAHAHAHAHAHAHAHAHAHAH AHAHAHAHAHAHAHAHAHAHAHAHAHAHA');
                $('.fs-body ul').empty();
                output('НУ ВСЁ! Я ТЕБЯ УНИЧТОЖУ!', 'flowie.6');
            },
            [
                ['A. Позвать на помощь', 'help-1'],
                ['B. Пытаться увернуться', 'dodgePh-1']
            ]);
            floweyMode.NewLine('help-1', 'На помощь!', function () {output('НИКТО НЕ ПРИДЁТ НА ПОМОЩЬ!', 'flowie.6');},
            [
                ['A. Позвать на помощь', 'help-1'],
                ['B. Пытаться увернуться', 'dodgePh-1']
            ]);
            floweyMode.NewLine('dodgePh-1', '*пытаюсь увернуться*', function () {output('НЕ УБЕЖИШЬ ОТ МЕНЯ!<br/>*ТРЕВОГА! ТЕРЯЮ 1 ДУШУ*', 'flowie.6');},
            [
                ['A. Позвать на помощь', 'help-2'],
                ['B. Пытаться увернуться', 'dodgePh-2']
            ]);
            floweyMode.NewLine('dodgePh-2', '*пытаюсь увернуться*', function () {output('НЕ УБЕЖИШЬ ОТ МЕНЯ!<br/>*ДУША ОСТАЛАСЬ!*', 'flowie.6');},
            [
                ['A. Позвать на помощь', 'help-1'],
                ['B. Пытаться увернуться', 'dodgePh-1']
            ]);
            floweyMode.NewLine('help-2', undefined, function() {
                scale++;
                if (scale == 6) {
                    $('.fs-body ul').empty();
                    answerUser('На помощь!');
                    output('НЕЕЕЕЕЕЕЕЕТ!<br/>*Души уничтожили Омегу Флауи*.', 'flowie.6');
                    $('.fs-avatar img').attr('src', 'http://i.imgur.com/6bQR2zO.png');
                    $('.fs-profile img').attr('src', 'http://i.imgur.com/6bQR2zO.png');
                    $('.fs-profile-desc').text(l.botPhrase[0]);
                    nope = false;
                    scale = 0;
                    floweyMode.doChoose([
                        ['Поговорить с Флауи', 'talk']
                    ]);
                } else {
                    answerUser('НА ПОМОЩЬ.');
                    output('НИКТО НЕ ПРИДЁТ НА ПОМОЩЬ!<br/>*ДУША ВАС ВЫЛЕЧИВАЕТ! ВЫ СПАСЛИ ОДНУ ДУШУ*', 'flowie.6');
                    floweyMode.doChoose([
                        ['A. Позвать на помощь', 'help-1'],
                        ['B. Пытаться увернуться', 'dodgePh-1']
                    ]);
                }
            });
            floweyMode.NewLine('talk', 'Хэй! Ты ещё здесь?', function () {output('Что ж. Убей меня. Пощада меня лишь начнёт всё сначала', 'flowie.7');},
            [
                ['А. Пощадить', 'mercy'],
                ['B. Убить', 'fight']
            ]);
            floweyMode.StopLine('fight', 'Умри!', function () {output('Ты не убьёшь меня. Но я отключюсь. Можешь позвать меня обратно командой Флауи-он в свободное время', 'flowie.7');});
            floweyMode.NewLine('mercy', 'Живи!', function () {floweyMode.Launch();});
            //Пацифист
            floweyMode.NewLine('pacifist-1', 'Ну не бей!', function () {output('В этом мире убей или будь убитым!', 'flowie.4');},
            [
                ['А. Пощада', 'pacifist-2'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('pacifist-2', 'Пожалуйста!', function () {output('НЕ ПОМОЖЕТ!', 'flowie.5');},
            [
                ['А. Пощада', 'pacifist-3'],
                ['Выход', 'quit']
            ]);
            floweyMode.NewLine('pacifist-3', 'Прошу!', function() {
                output('Чтож, придётся тебя, идиота, оставить тебя наедине! Зачем ты включил меня... А хотя...', 'flowie.2');
            },
            [
                ['?!??', 'asriel-1']
            ]);
            floweyMode.StopLine('asriel-1', 'Чо?', function() {
                output('Хотя не, забей, я ещё не вышел', 'asriel.1');
            });
            /* Coming Soon
            floweyMode.NewLine('asriel-1', undefined, function() {
                $('.fs-body ul').empty();
                output('Приветик, это я...', 'asriel.1');
            },
            [
                ['?!??', 'asriel-2']
            ]);
            floweyMode.NewLine('asriel-2', 'Привет. А кто ты?', function() {
                output('АЗРИЕЛЬ ДРИМУРР!!!', 'asriel.2');
                health.put();
            },
            [
                ['АААААА', 'asriel-3']
            ]);
            floweyMode.NewLine('asriel-3', 'Как так-то?', function() {
                output('Готовлю Звездопад', 'asriel.2');
            },
            [
                ['Надеяться', 'hope'],
                ['Мечтать', 'dream']
            ]);
            floweyMode.NewLine('hope', 'Я надеюсь на тебя!', function() {
                isHope = true;
                health.set(health.health+1);
                output('Надеешься? Ладно, снижу урон.', 'asriel.2');
            },
            [
                ['Двигаться', 'move'],
                ['Сдерживать', 'tank']
            ]);
            floweyMode.NewLine('dream', 'Я мечтаю о лечении...', function() {
                isHope = false;
                health.set(health.health+5);
                output('Мечтаешь? Ладно, полечу...', 'asriel.2');
            },
            [
                ['Двигаться', 'move'],
                ['Сдерживать', 'tank']
            ]);
            floweyMode.NewLine('move', undefined, function() {
                asrielsAttack(false);
            });
            floweyMode.NewLine('tank', undefined, function() {
                asrielsAttack(true);
            });
            function asrielsAttack(isTank) {
                var isSucceccful;
                if (currentActionId < 8) {
                    if (isTank) answerUser('Я решительно стою');
                    else answerUser();
                    switch (currentActionId) {
                        case 0:
 
                            break;
                    }
                    floweyMode.doChoose([
                        ['Надеяться', 'hope'],
                        ['Мечтать', 'dream']
                    ]);
                    currentActionId++;
                } else {
 
                }
            }
            */
            //Разное
            floweyMode.NewLine('bad', 'Надоело тебя слушать, заткнись!', function() {
                output('Неа.', 'flowie.1');
                nope = true;
                $('.bad').remove();
            });
            floweyMode.NewLine('quit', 'Оу, сколько времени... мне пора!', function () {output('Печально, конечно...', 'flowie.1');},
            [
                ['Идти', 'quit-2']
            ]);
            floweyMode.NewLine('quit-2', 'Я очень тороплюсь!', function () {output('Я ВЫСОСУ ТВОЮ ДУШУ!', 'flowie.3');},
            [
                ['Идти', 'quit-3']
            ]);
            floweyMode.StopLine('quit-3', 'Воу...', function() {
                output('Пока ^^', 'flowie.1');
                nope = false;
            });
        })(c.Flowey_on.data);
        this.floweyMode = floweyMode;
        /*  Что ты здесь делаешь? Ищешь секреты?
            Тут ничего нет.
        */
        /////////////////////////////////////////////////////////////////
        //Мод Папируса
        var papyrusCommands = new window.fsinit.newMode('papyrus', 'https://vignette.wikia.nocookie.net/undertale/images/1/12/Papyrus.png/revision/latest?cb=20151024045322&path-prefix=ru');
        papyrusCommands.SetCommand('DEFAULT', this.papyrusPhrases);
        papyrusCommands.off(c.Papyrus_off);
        this.SetCommand(c.Papyrus_on, papyrusCommands.on(c.Papyrus_on));
        this.SetMode(papyrusCommands);
        //Стандартное
        this.SetCommand('DEFAULT', this.sansPhrases);
        this.SetCommand(c.Flowey_on, function() {floweyMode.Launch();});
        var gnumber;
        var maxnum = 1000;
        this.SetCommand(c.Guess_on, function(d) {
            gnumber = rnd(1, maxnum);
            output(d, 'normal');
        });
        this.SetCommand(c.Guess_num, function(d, m) {
            var inputMaxnum = parseInt(m.split("-")[1]);
            maxnum = inputMaxnum;
            output(d + maxnum, 'normal');
        });
        this.SetCommand(c.num, function(d, m) {
            if (!gnumber) {
                window.fs.commands.DEFAULT();
                return;
            }
            var n = parseInt(m.split('-')[1], 10);
            var out;
 
            if (n - window.fs.gnumber === 0) {
                window.fs.gnumber = false;
                out = 0;
            } 
            else if (Math.abs(n - gnumber) <= (maxnum/200)) out = 1;
            else if (Math.abs(n - gnumber) <= (maxnum/100)) out = 2;
            else if (Math.abs(n - gnumber) <= (maxnum/20)) out = 3;
            else if (Math.abs(n - gnumber) <= (maxnum/10)) out = 4;
            else if (Math.abs(n - gnumber) <= (maxnum/2)) out = 5;
            else out = 6;
 
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
            } else if (typeof command[1] === 'undefined') {
                window.fs.commands.DEFAULT();
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
            //Получает вчерашний день
            function yesterdayLog() {
                var date = new Date();
                date.setDate(date.getDate()-1);
                var day,
                    month = months[date.getMonth()],
                    year = date.getFullYear();
                if (date.getDate() < 10) {
                    day = '0' + date.getDate();
                } else {
                    day = date.getDate();
                }
                return 'Project:Chat/Logs/' + day + '_' + month + '_' + year;
            }
            // Проверяет, появилась ли статья
            function pageIsExists(articleName, onExists, onNotExists) {
                $.ajax({
                    data: {
                        'action': 'query',
                        'prop': 'info|revisions',
                        'intoken': 'edit',
                        'titles': articleName,
                        'rvprop': 'content',
                        'rvlimit': '1',
                        'indexpageids': 'true',
                        'format': 'json'
                    },
                    dataType: 'json',
                    url: wgScriptPath + '/api.php',
                    type: 'GET',
                    success: function(response) {
                        if (response.error)
                            throw new Error('API error: ' + response.error.info);
                        else {
                            var pageExists = response.query.pages["-1"]?false:true;
                            if (pageExists)
                                onExists(articleName);
                            else
                                onNotExists(articleName);
                        }
                            
                    },
                    error: function(xhr, error) { throw new Error('AJAX error: ' + error); }
                });
            }
            if (when.search(new RegExp(d[0], 'i')) != -1) {
                var date = new Date(),
                    day,
                    month = months[date.getMonth()],
                    year = date.getFullYear();
                if (date.getDate() < 10) {
                    day = '0' + date.getDate();
                } else {
                    day = date.getDate();
                }
                var articleName = 'Project:Chat/Logs/' + day + '_' + month + '_' + year;
                pageIsExists(articleName, function() {
                    output(d[1] + articleName + d[2], 'normal');
                },
                function() {
                    output(d[3] + yesterdayLog() + d[4], 'normal');
                });
            } else if (when.search(new RegExp(d[5], 'i')) != -1) {
                output(d[6] + yesterdayLog() + d[7], 'normal');
            } else if (when.search(new RegExp(d[8], 'i')) != -1) {
                output(d[9], 'normal');
            } else if (when.search(/\d\d\-\d\d\-\d\d\d\d/i) != -1) {
                var enterdate = when.split('-'),
                    month = months[parseInt(enterdate[1]) - 1];
                var articleName = 'Project:Chat/Logs/' + enterdate[0] + '_' + month + '_' + enterdate[2];
                pageIsExists(articleName, function() {
                    output(d[10] + articleName + d[11], 'normal');
                },
                function() {
                    output(d[12], 'normal');
                });
            } else if (when.search(new RegExp(d[13], 'i')) != -1) {
                output(d[14], 'normal');
            } else {
                output(d[15], 'normal');
            }
        });
        this.SetCommand(c.Logs);
        this.SetCommand(c.User, function(d, m) {
            var nick = encodeURIComponent(m.replace(/user:/i, '').replace(/\s/g, '_'));
            output(d + 
                '<br/>[[User:'+nick+'|u]]-[[User_talk:'+nick+'|ut]]-[[Special:Contributions/'+nick+'|c]]-[[Special:Editcount/'+nick+'|ec]]-[[Special:Log?page=User:'+nick+'|l]]' + 
                '<br/>CSS: [[User:'+nick+'/wikia.css|Wikia]]-[[User:' + nick + '/chat.css|Chat]]-[[w:User:'+nick+'/global.css|Global]]' +
                '<br/>JS: [[User:'+nick+'/common.js|Common]]-[[User:'+nick+'/chat.js|Chat]]-[[w:User:'+nick+'/global.js|Global]]'
            , 'normal');
        });
        this.SetCommand(c.Article, function(d, m) {
            var article = m.replace(/Статья /ig, '');
            output(
                d + ' <a href="/wiki/' + article + '" target="_blank">' + article + '</a><br/>' +
                '?veaction=<a href="/wiki/' + article + '?veaction=edit" target="_blank">edit</a><br/>' +
                '?action=<a href="/wiki/' + article + '?action=edit" target="_blank">edit</a>-' + 
                    '<a href="/wiki/' + article + '?action=history" target="_blank">history</a>-' +
                    '<a href="/wiki/Special:MovePage/' + article + '" target="_blank">rename</a>-' +
                    '<a href="/wiki/' + article + '?action=delete" target="_blank">delete</a>-' +
                    '<a href="/wiki/' + article + '?action=protect" target="_blank">protect</a>-' +
                    '<a href="/wiki/' + article + '?action=raw" target="_blank">raw</a>-' +
                    '<a href="/wiki/' + article + '?action=render" target="_blank">render</a>'
            ,'normal');
        });
        this.SetCommand(c.links);
        this.SetCommand(c.emoticons);
        this.SetCommand(c.css);
        this.SetCommand(c.commands);
        this.SetCommand(c.chatags);
        this.SetCommand(c.js);
        this.SetCommand(c.mainpage);
        this.SetCommand(c.wikiactivity);
        this.SetCommand(c.rules);
        this.SetCommand(c.admin);
        this.SetCommand(c.me);
        this.SetCommand(c.source);
        this.SetCommand(c.please);
        this.SetCommand(c.give);
        this.SetCommand(c.Hello);
        this.SetCommand(c.Bye);
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
        this.SetCommand(c.Money);
        this.SetCommand(c.And_you_too);
        this.botPhrase = l.botPhrase;
    };
    //Методы
    this.CreateBot.prototype.SetCommand = function(comobj, comaction) {
        if (typeof comobj === "object") {
            if (typeof comaction === "string")
                this.commands[comobj.name] = function() {window.fsinit.output(comaction, 'normal');};
            else if (typeof comaction === "object")
                this.commands[comobj.name] = function() {window.fsinit.output(comaction[window.fsinit.rnd(0, comaction.length - 1)], 'normal');};
            else if (typeof comaction === "undefined") {
                if (typeof comobj.data === "string")
                    this.commands[comobj.name] = function() {window.fsinit.output(comobj.data, 'normal');};
                else if (typeof comobj.data === "object")
                    this.commands[comobj.name] = function() {window.fsinit.output(comobj.data[window.fsinit.rnd(0, comobj.data.length - 1)], 'normal');};
            } else {
                this.commands[comobj.name] = function(m) {
                    var d;
                    if (typeof comobj.data === 'string')
                        d = comobj.data;
                    else {
                        d = [];
                        for (var i in comobj.data) {d[i] = comobj.data[i]}
                    }
                    comaction(d, m);
                };
            }
        } else if (typeof comobj === "string") {
            if (typeof comaction === "string")
                this.commands[comobj] = function() {window.fsinit.output(comaction, 'normal');};
            else if (typeof comaction === "object")
                this.commands[comobj] = function() {window.fsinit.output(comaction[window.fsinit.rnd(0, comaction.length - 1)], 'normal');};
            else {
                this.commands[comobj] = function(m) {
                    comaction(m);
                };
            }
        }
    };
    this.CreateBot.prototype.SetMode = function(mode) {
        window.fsinit.modeOutput[mode.name] = mode.avatar;
        this.mode[mode.name] = mode.commands;
    };
}
 
 
//Парсер
(function() {
$('<div class="future-spreader">' +
    '<div class="fs-avatar" title="' + window.fs.botPhrase[1] + '">' +
        '<img src="http://i.imgur.com/6bQR2zO.png" width="30px" height="30px" />' +
    '</div>' +
    '<div class="fs-body">' +
        '<div class="fs-profile">' +
          '<img src="http://i.imgur.com/6bQR2zO.png" width="30px" height="30px" />' +
          '<div class="fs-profile-desc">'+
            window.fs.botPhrase[0] +
          '</div>' +
        '</div>' +
        '<ul>' +
        '</ul>' +
        '<div class="fs-message">' +
          '<img src="' + $('.Write img').attr('src') + '" width="30px" height="30px" style="vertical-align: top;"/>' +
          '<textarea></textarea>' +
          '<div class="fs-choose"></div>' +
          '<button class="fs-clr">CLR</button>' +
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
    window.fsinit.answerUser(message);
 
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