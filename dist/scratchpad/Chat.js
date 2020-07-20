injectedJS = "window.badWords[window.badWords.indexOf('cu')] = 'dfsfcghbjgbfdsfxcg';"

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:WordFilter/code.js'
    ]
});


// Mark Administration Members (please keep in alphabetical order) //
$('#ChatHeader .User').attr('data-user', wgUserName.replace(' ', '_').replace(/["']/g, ''));
var userBadges = function() {
        'use strict';
        $('.User').each(function() {
            $(this).removeClass('chatmoderator');
            if ($(this).attr('data-user').match(/(Akari and Arizona)/)) {
                $(this).addClass('bureaucrat');
            }
            if ($(this).attr('data-user').match(/(Alyssa Edwards 1980|AshKetchumInitialDHero|BiggestThomasFan|BrownFamily1108|Elwoodjayson|Grimka Butterfly|IncognitoMan1|Mr. Crabmeat|NaturalFreshOtter00)/)) {
                 $(this).addClass('admin');
            }
            if ($(this).attr('data-user').match(/(AmonFatalis|Aster09|CAJH|Celdrøn|Cresh.|Dehydrated Dryhyder|Dioniso7|Fiona of Amber|Flightmare|Gernhald42|Idel sea Qatarhael|Klopsik600|Kopcap94|KuroUrufu|Leviathan 89|Luqgreg|Matheus Leonardo|Miri-Nae|Nanaki|Pavel Shepard|Pio387|Plover-Y|Rémy Lee|Tommy6|Tupka217|Vuh|Wildtech|Wyz|Yatalu|Zeist Antilles|机智的小鱼君)/)) {
                $(this).addClass('helper');
            }
            if ($(this).attr('data-user').match(/(Callofduty4|Cyanide3|DeXart|Icier|Jr Mime|Kopcap94|Lady Lostris|Laundry Machine|Noreplyz|TyA|VegaDark|Wiki-o-slay|Yuusuke Takazaki)/)) {
                $(this).addClass('vstf');
            }
            if ($(this).attr('data-user').match(/(Andrewteel213|HatariAlchemistCookieStan|Josephlu2021|Konnichiku|LegalizeAnythingMuppets|Madison01072003H*|PrincessAshley|Spears20500|TheSitcomLover|Tiffy33|Vinhchaule)/)) {
                 $(this).addClass('content-mod');
            }
            if ($(this).attr('data-user').match(/(Cream "Prower" the Rabbit)/)) {
                 $(this).addClass('thread-mod');
            }
            if ($(this).attr('data-user').match(/(AddictStudios|ElsbridgeStationFan1995|Ngb96)/)) {
                $(this).addClass('rollback');
            }
        })
    },
    wikiList = $('#PrivateChatList')[0],
    privateList = $('#WikiChatList')[0],
    userBadgesMO = new MutationObserver(userBadges);
window.onload = userBadges();
userBadgesMO.observe(wikiList, {childList: true});
userBadgesMO.observe(privateList, {childList: true});