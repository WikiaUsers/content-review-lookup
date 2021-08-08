/*См. также MediaWiki:Modes.js, MediaWiki:BG.js, MediaWiki:Chatfilter.js, MediaWiki:ImportJS, MediaWiki:Fantom.js*/

/* LockOldBlogs */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Доступ к комментариям закрыт, так как блог не комментировали <expiryDays> дней"
}

/* DiscussionTemplates */
window.DiscussionTemplates = {
    templates: {
        /* Предупреждения */
        'Оскорбление': {
            name: 'Шаблон:Предупреждение/оскорбление',
            title: 'Оскорбление'
        },
        'Троллинг': {
            name: 'Шаблон:Предупреждение/троллинг',
            title: 'Троллинг'
        },
        'Спор': {
            name: 'Шаблон:Предупреждение/спор',
            title: 'Спор'
        },
        'Агрессия': {
            name: 'Шаблон:Предупреждение/агрессия',
            title: 'Агрессия'
        },
        'Субкритика': {
            name: 'Шаблон:Предупреждение/субкритика',
            title: 'Субкритика'
        },
        'Маты': {
            name: 'Шаблон:Предупреждение/маты',
            title: 'Маты'
        },
        'Оффтоп': {
            name: 'Шаблон:Предупреждение/оффтоп',
            title: 'оффтоп'
        },
        'Флуд': {
            name: 'Шаблон:Предупреждение/флуд',
            title: 'Флуд'
        },
        'Капс': {
            name: 'Шаблон:Предупреждение/капс',
            title: 'Капс'
        },
        'Спам': {
            name: 'Шаблон:Предупреждение/спам',
            title: 'Спам'
        },
        'Реклама': {
            name: 'Шаблон:Предупреждение/реклама',
            title: 'Реклама'
        },
        'Вандализм': {
            name: 'Шаблон:Предупреждение/вандализм',
            title: 'Вандализм'
        },
        'Статпад': {
            name: 'Шаблон:Предупреждение/статпад',
            title: 'Статпад'
        },
        'Плохие правки': {
            name: 'Шаблон:Предупреждение/плохиеправки',
            title: 'Плохие правки'
        },
        '18+': {
            name: 'Шаблон:Предупреждение/18',
            title: '18+'
        },
        'Твинк': {
            name: 'Шаблон:Предупреждение/твинк',
            title: 'Твинк'
        },
        'Плохие блоги': {
            name: 'Шаблон:Предупреждение/плохиеблоги',
            title: 'Плохие блоги'
        },
        'Вне ценза': {
            name: 'Шаблон:Предупреждение/внеценза',
            title: 'Вне ценза'
        },
        'Плохие игры': {
            name: 'Шаблон:Предупреждение/плохиеигры',
            title: 'Плохие игры'
        },
        'Бессмыслица': {
            name: 'Шаблон:Предупреждение/бессмыслица',
            title: 'Бессмыслица'
        },
    }
};

/* FastDelete */
window.fdButtons = [
    {
        summary: 'Вандализм',
        label: 'Вандал'
    },
    {
        summary: 'Мусор',
        label: 'Мусор'
    },
    {
        summary: 'Игра не проходит ценз',
        label: 'Ценз'
    }
];

/* MessageBlock */
window.MessageBlock = {
  title: 'Блокировка',
  message: 'Вы были заблокированы на $2, причина: $1.',
};

/* AddRailModule */
window.AddRailModule = ['Шаблон:Статья_месяца'];

/* Modes.js */
$('.template_modes_right').click(function(e) {
	let scroll = $('.template_modes_body').scrollTop();
	let i = scroll/105;
	$(".template_modes_move_" + (i+2)).css("color", "black");
	for (let k = 1; k < 8; k++) {
		if (k == (i+2)) {
			continue;
		} else {
			$(".template_modes_move_" + (k)).css("color", "white");
		}
	}
	$('.template_modes_body').scrollTop(scroll+105);
});

$('.template_modes_left').click(function(e) {
	let scroll = $('.template_modes_body').scrollTop();
	let i = scroll/105;
	$(".template_modes_move_" + (i)).css("color", "black");
	for (let k = 1; k < 8; k++) {
		if (k == (i)) {
			continue;
		} else {
			$(".template_modes_move_" + (k)).css("color", "white");
		}
	}
	$('.template_modes_body').scrollTop(scroll-105);
});

$(".template_modes_move_1").click((e) => {
	$('.template_modes_body').scrollTop(0);
	$(".template_modes_move_1").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 1) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_2").click((e) => {
	$('.template_modes_body').scrollTop(1*105);
	$(".template_modes_move_2").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 2) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_3").click((e) => {
	$('.template_modes_body').scrollTop(2*105);
	$(".template_modes_move_3").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 3) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_4").click((e) => {
	$('.template_modes_body').scrollTop(3*105);
	$(".template_modes_move_4").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 4) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_5").click((e) => {
	$('.template_modes_body').scrollTop(4*105);
	$(".template_modes_move_5").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 5) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_6").click((e) => {
	$('.template_modes_body').scrollTop(5*105);
	$(".template_modes_move_6").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 6) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_7").click((e) => {
	$('.template_modes_body').scrollTop(6*105);
	$(".template_modes_move_7").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 7) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

/* BG.js */
function BG(file) {
    if (file) {
        return encodeURI("/ru/wiki/Служебная:FilePath/" + file);
    } else {
        return null;
    }
}

if (mw.config.get("wgCanonicalNamespace") == "") {
    var BGbackground;
    var BGcategories = mw.config.get("wgCategories");
    for (var ct = 0; ct < BGcategories.length; ct++) {
        if (BGcategories[ct] == "Five Nights at Freddy's") {
            BGbackground = BG('FNaF 1 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 2") {
            BGbackground = BG('FNaF 2 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 3") {
            BGbackground = BG('FNaF 3 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 4") {
            BGbackground = BG('FNaF 4 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's World") {
            BGbackground = BG('FNaF W BG.jpg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Sister Location") {
            BGbackground = BG('FNaF SL BG.png');
            break;
        } else if (BGcategories[ct] == "Freddy Fazbear's Pizzeria Simulator") {
            BGbackground = BG('FFPS BG.png');
            break;
        } else if (BGcategories[ct] == "Ultimate Custom Night") {
            BGbackground = BG('UCN BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Help Wanted") {
            BGbackground = BG('FNaF HW BG.jpg');
            break;
        } else if (BGcategories[ct] == "Freddy in Space 2") {
            BGbackground = BG('FiS 2 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's AR: Special Delivery") {
            BGbackground = BG('FNaF AR BG.jpg');
            break;
        } else if (BGcategories[ct] == "Security Breach: Fury's Rage") {
            BGbackground = BG('SB FR BG.png');
            break;
        } else if ((BGcategories[ct] == "Книги") || (BGcategories[ct] == "Персонажи книг")) {
            BGbackground = BG('FNaF Books BG.png');
            break;
        }
    }

    if (BGbackground) {
        $("body.skin-oasis").css("background", '#000 url(' + BGbackground + ') fixed');
        $("body.skin-oasis").css("background-size", 'cover');
    }
}

/* Fantom.js */
// Код на аниматроников v0.21b
// Специально для ru.five-nights-at-freddys-rus
// @author: Kopcap94
// @not_author_but_just_a_random_guy: Никто,просто никто.
!function( $ ) {
    var i = Math.floor( ( Math.random() * 10 ) );
    var anim = {};
    var categories = mw.config.get("wgCategories");
    for (var c = 0; c < categories.length; c++) {
        if (categories[c] == "Five Nights at Freddy's") {
            anim = {
                // Бонни
                '1': [
                    'https://vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/f/fd/Fantom_JS_-_Bonnie.png/revision/latest?cb=20191101210639&path-prefix=ru', 
                    'bottom: 0px; right: -240px;', 
                    {right: "0px"},
                    {right: "-240px"}, 
                    'style = "width: 240px; height: 341px;"',
                    2000
                ],
                //Чика
                '2': [
                    '//i.imgur.com/DfqNZPa.png',
                    'bottom: 0px; left: -249px;', 
                    {left: '0px'},
                    {left: '-249px'}, 
                    'style = "width: 249px; height: 336px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Five Nights at Freddy's 2") {
            anim = {
                // Марионетка
                '1': [
                    './Служебная:FilePath/Puppet_head.png', 
                    'bottom: -344px; right: 0px;', 
                    {bottom: "0px"},
                    {bottom: "-344px"}, 
                    'style = "width: 344px;"', 
                    2000
                ],
                // Игрушечная Чика
                '2': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/8/83/Toy_Chica%27s_twitching_animation_in_the_Office_after_Patch_Note_1.021.gif/revision/latest?cb=20181125181316&path-prefix=ru',
                    'bottom: 0px; left: -281px;', 
                    {left: '0px'},
                    {left: '-281px'}, 
                    'style = "width: 281px; height: 310px;"',
                    2000
                ],
                // Игрушечный Бонни
                '3': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/2/29/Toy_Bonnie_Office.gif/revision/latest?cb=20180629101345&path-prefix=ru',
                    'bottom: 0px; right: -209px;', 
                    {right: '0px'},
                    {right: '-209px'}, 
                    'style = "width: 209px; height: 290px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Five Nights at Freddy's 3") {
            anim = {
                // Спрингтрап
                '1': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/d/d9/Springtrap_Walk_Gif-0.gif/revision/latest?cb=20190722190447&path-prefix=ru', 
                    'bottom: -320px; right: -20%;',
                    {right: '120%'},
                    {right: '120%'}, 
                    'style = "width: 220px;"', 
                    8000
                ],
                // Тень Фредди
                '2': [
                    '//i.imgur.com/miKayRa.png',
                    'bottom: 0px; left: -160px;', 
                    {left: '0px'},
                    {left: '-160px'}, 
                    'style = "width: 160px; height: 320px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Five Nights at Freddy's 4") {
            anim = {
                // Кошмарный Мальчик с шариком
                '1': [
                    '//i.imgur.com/q3KMZub.png', 
                    'bottom: -189px; left: 0px;', 
                    {bottom: '0px'},
                    {bottom: '-189px'}, 
                    'style = "width: 233px; height: 189px;"', 
                    2000
                ],
                // Кошмарный Фредди
                '2': [
                    '//i.imgur.com/bAObtXo.png',
                    'bottom: 0px; left: 0px;', 
                    {left: '0px'},
                    {left: '0px'}, 
                    'style = "width: 120px; height: 120px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Five Nights at Freddy's: Sister Location") {
            anim = {
                // Минирина
                '1': [
                    '//cdn.discordapp.com/attachments/620707393072005141/625585804571312129/Minireena_Rotating.gif', 
                    'bottom: -50px; left: -10%;', 
                    {left: '120%'},
                    {left: '120%'}, 
                    'style = ""', 
                    7000
                ],
                // Боннет
                '2': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/5/52/Bonnet_just_walkin%27_through.gif/revision/latest?cb=20161203155107&path-prefix=ru',
                    'bottom: -7%; right: -10%;', 
                    {right: '120%'},
                    {right: '120%'}, 
                    'style = "width: 350px;"',
                    7000
                ],
                // Йенндо
                '3': [
                    '//i.imgur.com/VfRYUYQ.png',
                    'bottom: 0px; right: -214px;', 
                    {right: '0'},
                    {right: '-214px'}, 
                    'style = "width: 214px; height: 255px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Freddy Fazbear's Pizzeria Simulator") {
            anim = {
                // Рокстар Фокси
                '1': [
                    '//vignette.wikia.nocookie.net/comfort/images/5/59/RF1.gif/revision/latest?cb=20191001181006&path-prefix=ru', 
                    'bottom: -40px; left: 0px;', 
                    {bottom: '-40px'},
                    {bottom: '-40px'}, 
                    'style = ""', 
                    2600
                ],
                // Рокстар Фредди
                '2': [
                    '//i.imgur.com/bCY2cu8.png',
                    'bottom: 0px; left: -278px;', 
                    {left: '0px'},
                    {left: '-278px'}, 
                    'style = "width: 278px; height: 280px;"',
                    2000
                ],
                // Рокстар Чика
                '3': [
                    '//i.imgur.com/XxKJVht.png',
                    'bottom: 0px; right: -187px;', 
                    {right: '0'},
                    {right: '-187px'}, 
                    'style = "width: 187px; height: 235px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Ultimate Custom Night") {
            anim = {
                // Ди Ди
                '1': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/6/6a/DeeDeeUCN.gif/revision/latest?cb=20180703200530&path-prefix=ru', 
                    'bottom: -300px; right: 100px;', 
                    {bottom: '0px'},
                    {bottom: '-500px'}, 
                    'style = "width: 70%;"',
                    3000
                ],
                // Кошмарионн
                '2': [
                    '//i.imgur.com/1TbVcpr.png',
                    'top: -176px; left: 0px;', 
                    {top: '0px'},
                    {top: '-176px'}, 
                    'style = "width: 408px; height: 176px;"',
                    2000
                ],
                // Фредди
                '3': [
                    '//i.imgur.com/n5BJwDp.png',
                    'bottom: 0px; left: -179px;', 
                    {left: '0'},
                    {left: '-179px'}, 
                    'style = "width: 179px; height: 278px;"',
                    2000
                ]
            }
            break;
        } else if (categories[c] == "Five Nights at Freddy's World") {
            anim = {
                '1': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/a/ae/Foxyjet.gif/revision/latest?cb=20160520184417&path-prefix=ru', 
                    'bottom: 5%; left: -10%;', 
                    {left: '110%'},
                    {left: '110%'}, 
                    'style = ""',
                    7000
                ],
                '2': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/3/31/FlyingCrab.gif/revision/latest?cb=20160523180820&path-prefix=ru',
                    'bottom: 5%; right: -10%;', 
                    {right: '110%'},
                    {right: '110%'}, 
                    'style = ""',
                    7000
                ],
                '3': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/3/3f/Souldozer.gif/revision/latest?cb=20160516124536&path-prefix=ru',
                    'bottom: -8%; right: -10%;', 
                    {right: '110%'},
                    {right: '110%'}, 
                    'style = "height: 310px;"',
                    7000
                ],
                '4': [
                    '//vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/5/5f/FreddleAttack.gif/revision/latest?cb=20160523191527&path-prefix=ru',
                    'bottom: -2%; right: -10%;', 
                    {right: '110%'},
                    {right: '110%'}, 
                    'style = ""',
                    5000
                ]
            }
            break;
        }
    }
 
    if ( typeof anim[ i ] === 'undefined') return;
 
    var data = anim[ i ];
 
    $( 'body' ).append(
        '<div id="MarFNAF" style="position:fixed; ' + data[1] + ' z-index:1000;">' +
            '<img src="' + data[0] + '" ' + data[4] + ' />' +
        '</div>'
    );
 
    $( '#MarFNAF' ).animate( data[2], data[5], function() {
        setTimeout(function(){
            $( '#MarFNAF' ).animate( data[3], 2000, function() {
                $( '#MarFNAF' ).remove(); // Чистим за собой
            });
        }, 2000);
    });
}( this.jQuery );