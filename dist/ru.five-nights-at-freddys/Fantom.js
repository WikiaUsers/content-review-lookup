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