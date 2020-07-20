/* Daily Bonus tracker */
function dailyBonus() {

    var startDay = new Date("2015-01-31T00:00:00");
    var today = new Date();
    var bonus = parseInt(((today - startDay) / 86400000) % 15) + 1;
    var message = "[" + bonus + "] ";

    // Bonus type
    switch (bonus) {
        case 2: case 5: case 8: case 11: case 14:
            message += "Item drop rate up";
            break;
        case 3: case 6: case 9: case 12: case 15:
            message += "Monster drop rate up";
            break;
        default:
            message += "No bonus";
    }

    // Bonus chapters
    switch (bonus) {
        case 2: case 12:
            message += "<br />Chapters: 2, 7, 12, 17, 22, 27, 32, 37, 42";
            break;
        case 3: case 8:
            message += "<br />Chapters: 4, 9, 14, 19, 24, 29, 34, 39";
            break;
        case 5: case 15:
            message += "<br />Chapters: 3, 8, 13, 18, 23, 28, 33, 38";
            break;
        case 6: case 11:
            message += "<br />Chapters: 5, 10, 15, 20, 25, 30, 35, 40";
            break;
        case 9: case 14:
            message += "<br />Chapters: 6, 11, 16, 21, 26, 31, 36, 41";
    }

    document.getElementById("dailyBonus").innerHTML = message;
}
setTimeout(function(){ dailyBonus(); }, 0);

/* Daily Quest tracker */
function dailyQuest() {

    var startDay = new Date("2018-10-10T00:00:00Z");
    var today = new Date();
    var day = parseInt(((today - startDay) / 86400000) % 41) + 1;

    // Quest type - Starts at Day 1
    var quest = [
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Particle_Hoarder_Horde>Particle Hoarder Horde?</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Metal_Runner_Rampage>Metal Runner Rampage</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Rarity_Rumble>Rarity Rumble</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Hedgehog_Hullabaloo>Hedgehog Hullabaloo</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Yamamoto's_Puzzle_Quest>Yamamoto's Puzzle Quest II</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Sweet_Temptation>Sweet Temptation</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Lucky_Orbling>Lucky Orbling</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Yamamoto's_Puzzle_Quest>Yamamoto's Puzzle Quest</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Crystal_Roundelay>Crystal Roundelay</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Hidden_Stars>Hidden Stars</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Rarity_Rumble>Rarity Rumble</a>",
        "<a href=https://terrabattle.wikia.com/wiki/The_Hunt_For_Joker>The Hunt For Joker</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Tearjerker_Time>Tearjerker Time</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Lucky_Orbling>Lucky Orbling</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Particle_Hoarder_Horde>Particle Hoarder Horde?</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Hedgehog_Hullabaloo>Hedgehog Hullabaloo</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Metal_Runner_Rampage>Metal Runner Rampage</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Yamamoto's_Puzzle_Quest>Yamamoto's Puzzle Quest II</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Tropical_Haze>Tropical Haze</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Sweet_Temptation>Sweet Temptation</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Rarity_Rumble>Rarity Rumble</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Hidden_Stars>Hidden Stars</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Metal_Runner_Rampage>Metal Runner Rampage</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Puppet_Pandemonium>Puppet Pandemonium</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Lucky_Orbling>Lucky Orbling</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Sweet_Temptation>Sweet Temptation</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Hedgehog_Hullabaloo>Hedgehog Hullabaloo</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Particle_Hoarder_Horde>Particle Hoarder Horde?</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Tropical_Haze>Tropical Haze</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Yamamoto's_Puzzle_Quest>Yamamoto's Puzzle Quest II</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Crystal_Roundelay>Crystal Roundelay</a>",
        "<a href=https://terrabattle.wikia.com/wiki/The_Hunt_For_Joker>The Hunt For Joker</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Lucky_Orbling>Lucky Orbling</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Yamamoto's_Puzzle_Quest>Yamamoto's Puzzle Quest</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Hidden_Stars>Hidden Stars</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Sweet_Temptation>Sweet Temptation</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Puppet_Pandemonium>Puppet Pandemonium</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Tropical_Haze>Tropical Haze</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Tearjerker_Time>Tearjerker Time</a>",
        "<a href=https://terrabattle.wikia.com/wiki/Daily_Quests/Crystal_Roundelay>Crystal Roundelay</a>",
        "<a href=https://terrabattle.wikia.com/wiki/The_Hunt_For_Joker>The Hunt For Joker</a>"
    ];

    var message = "[" + day + "] ";
    message += quest[(day * 2 - 2) % 41];
    message += "<br />";
    message += quest[(day * 2 - 1) % 41];

    document.getElementById("dailyQuest").innerHTML = message;
}
setTimeout(function(){ dailyQuest(); }, 0);

/* CCA Voting */
if (wgPageName === 'User_blog:Raylan13/Terra_Battle_Wikia_2014_Community_Choice_Awards') {
    challengers = {};
 
    //Boss images
    challengers['Mantledrake'] = 'https://images.wikia.nocookie.net/__cb20141009194839/terrabattle/images/e/e8/Mantledrake.png';
    challengers['Time Devourer'] = 'https://images.wikia.nocookie.net/terrabattle/images/b/be/Time_Devourer.jpg';
    challengers['Toxoid'] = 'https://images.wikia.nocookie.net/terrabattle/images/f/f6/Toxoid.jpg';
    challengers['Lich'] = 'https://images.wikia.nocookie.net/terrabattle/images/3/32/Lich_full.png';
    challengers['6ZOO'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/b/b6/6ZOO_-_Form_1.PNG';
    
    //Boss links
    challengers['Mantledrake-link'] = 'https://terrabattle.wikia.com/wiki/Mantledrake';
    challengers['Time_Devourer-link'] = 'https://terrabattle.wikia.com/wiki/Time_Devourer';
    challengers['Toxoid-link'] = 'https://terrabattle.wikia.com/wiki/Toxoid#Toxoid';
    challengers['Lich-link'] = 'https://terrabattle.wikia.com/wiki/Lich';
    challengers['6ZOO-link'] = 'https://terrabattle.wikia.com/wiki/6ZOO';

    //Human images
    challengers['Amina'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/7/7e/Amina-icon.png/revision/latest/scale-to-width/100?cb=20141012091220';        
    challengers['Jennish'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/4/43/Jennish-icon.png/revision/latest/scale-to-width/100?cb=20141012094123';
    challengers['Kuscah'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/4/43/Kuscah_icon.png/revision/latest/scale-to-width/100?cb=20141013221358';
    challengers['Yukken'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/e/ef/Yukken-icon.png/revision/latest/scale-to-width/100?cb=20141012100447';
    challengers['Sheena'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/4/47/Sheena_icon.png/revision/latest/scale-to-width/100?cb=20141015134647';

    //Human links
    challengers['Amina-link'] = 'https://terrabattle.wikia.com/wiki/Amina';    
    challengers['Jennish-link'] = 'https://terrabattle.wikia.com/wiki/Jennish';    
    challengers['Kuscah-link'] = 'https://terrabattle.wikia.com/wiki/Kuscah';
    challengers['Yukken-link'] = 'https://terrabattle.wikia.com/wiki/Yukken';
    challengers['Sheena-link'] = 'https://terrabattle.wikia.com/wiki/Sheena';

    //Lizardfolk images
    challengers['A\'merpact'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/7/74/A%27merpact-icon.png/revision/latest/scale-to-width/100?cb=20141013045419';
    challengers['A\'misandra'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/5/5c/A%27misandra-icon.png/revision/latest/scale-to-width/100?cb=20141012093601';
    challengers['Macuri'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/e/e8/Ma%27curi_icon.png/revision/latest/scale-to-width/100?cb=20141013221359';
    challengers['Piz\'fer'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/1/10/Piz%27fer-icon.png/revision/latest/scale-to-width/100?cb=20141012100406';
    challengers['Ba\'gunar'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/3/32/Ba%27gunar_icon.png/revision/latest/scale-to-width/100?cb=20141013221356';

    //Lizardfolk links
    challengers['A\'merpact-link'] = 'https://terrabattle.wikia.com/wiki/A%27merpact';
    challengers['A\'misandra-link'] = 'https://terrabattle.wikia.com/wiki/A%27misandra';
    challengers['Macuri-link'] = 'https://terrabattle.wikia.com/wiki/Ma%27curi';
    challengers['Piz\'fer-link'] = 'https://terrabattle.wikia.com/wiki/Piz%27fer';   
    challengers['Ba\'gunar-link'] = 'https://terrabattle.wikia.com/wiki/Ba%27gunar'; 

    //Beastfolk images
    challengers['Bonna'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/6/66/Bonna-icon.png/revision/latest/scale-to-width/100?cb=20141013043534';
    challengers['Kana'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/8/8f/Kana-icon.png/revision/latest/scale-to-width/100?cb=20141013045450';
    challengers['Amimari'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/4/42/Amimari-icon.png/revision/latest/scale-to-width/100?cb=20141012093547';
    challengers['Zafitte'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/b/b1/Zafitte_icon.png/revision/latest?cb=20141106084951';
    challengers['Jaguna'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/a/a9/Jaguna_icon.png/revision/latest/scale-to-width/100?cb=20141101040851';

    //Beastfolk links
    challengers['Bonna-link'] = 'https://terrabattle.wikia.com/wiki/Bonna';
    challengers['Kana-link'] = 'https://terrabattle.wikia.com/wiki/Kana';
    challengers['Amimara-link'] = 'https://terrabattle.wikia.com/wiki/Amimari';
    challengers['Zafitte-link'] = 'https://terrabattle.wikia.com/wiki/Zafitte';
    challengers['Jaguna-link'] = 'https://terrabattle.wikia.com/wiki/Jaguna';

    //Stonefolk images
    challengers['Kem'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/d/d2/Kem-icon.png/revision/latest/scale-to-width/100?cb=20141013045532';
    challengers['Pahrl'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/b/b2/Pahrl-icon.png/revision/latest/scale-to-width/100?cb=20141013045614';
    challengers['Lewto'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/c/c1/Lewto-icon.png/revision/latest/scale-to-width/100?cb=20141012094149';
    challengers['Palpa'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/d/d0/Palpa-icon.png/revision/latest/scale-to-width/100?cb=20141013043646';
    challengers['Daiana'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/d/d6/Daiana-icon.png/revision/latest/scale-to-width/100?cb=20141013045434';

    //Stonefolk links
    challengers['Kem-link'] = 'https://terrabattle.wikia.com/wiki/Kem';
    challengers['Pahrl-link'] = 'https://terrabattle.wikia.com/wiki/Pahrl';    
    challengers['Lewto-link'] = 'https://terrabattle.wikia.com/wiki/Lewto';    
    challengers['Palpa-link'] = 'https://terrabattle.wikia.com/wiki/Palpa';
    challengers['Daiana-link'] = 'https://terrabattle.wikia.com/wiki/Daiana';

    //Downloaded character images
    challengers['Camellia'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/6/6a/Camellia_icon.png/revision/latest/scale-to-width/100?cb=20141017162023';
    challengers['Velraine'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/8/84/Velraine_icon.png/revision/latest/scale-to-width/100?cb=20141101041104';
    challengers['Maralme'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/9/9a/Maralme_icon.png/revision/latest/scale-to-width/100?cb=20141101041042';
    challengers['Suoh'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/a/a8/Suoh_icon.png/revision/latest/scale-to-width/100?cb=20141017162024';
    challengers['Rejin'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/1/1e/Rejin-icon.png/revision/latest/scale-to-width/100?cb=20141205090022';

    //Downloaded character links
    challengers['Camellia-link'] = 'https://terrabattle.wikia.com/wiki/Camellia';
    challengers['Velraine-link'] = 'https://terrabattle.wikia.com/wiki/Velraine';
    challengers['Maralme-link'] = 'https://terrabattle.wikia.com/wiki/Maralme';
    challengers['Suoh-link'] = 'https://terrabattle.wikia.com/wiki/Suoh';
    challengers['Rejin-link'] = 'https://terrabattle.wikia.com/wiki/Rejin';

    //Job art images
    challengers['Gegonago'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/5/5a/Gegonago-icon.png/revision/latest/scale-to-width/100?cb=20141013043622';
    challengers['Czekras'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/f/f5/Czekras-icon.png/revision/latest/scale-to-width/100?cb=20141012093613';

    //Job art links
    challengers['Gegonago-link'] = 'https://terrabattle.wikia.com/wiki/Gegonago';
    challengers['Czekras-link'] = 'https://terrabattle.wikia.com/wiki/Czekras';

    //Hunting area images
    challengers['Pudding Time'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/2/23/Pudding.png/revision/latest/scale-to-width/200?cb=20140927011153';
    challengers['Puppet Show'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/9/94/Papa_Puppet.png/revision/latest/scale-to-width/100?cb=20140925120042';
    challengers['Tin Parade'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/2/2d/Tin_King.jpg/revision/latest/scale-to-width/100?cb=20140925081851';
    challengers['Attack of the Coin Creeps'] = 'https://vignette.wikia.nocookie.net/terrabattle/images/1/17/CoinsIco.png/revision/latest?cb=20141205091516';

    //Hunting area links
    challengers['Pudding Time-link'] = 'https://terrabattle.wikia.com/wiki/Pudding_Time';
    challengers['Puppet Show-link'] = 'https://terrabattle.wikia.com/wiki/Puppet_Show';
    challengers['Tin Parade-link'] = 'https://terrabattle.wikia.com/wiki/Tin_Parade';
    challengers['Attack of the Coin Creeps-link'] = 'https://terrabattle.wikia.com/wiki/Attack_of_the_Coin_Creeps';
 
    challengerPoll = {
        init: function() {
            $('.ajax-poll').each(function() {
                var pollID = $(this).attr('id').split('-')[2];
                $('.pollAnswerName label', this).each(function(index) {
                    var challenger = $(this).text();
                    var radioID = $('input', this).attr('id');
                    var radioValue = $('input', this).attr('value');
                    var challenger1 = challenger.trim();
                    challengerPoll.beautify(this, challenger1, pollID, radioID, radioValue);
                });
            });
 
            $('.ajax-poll').on('click', '.challenger img', function() {
                var currentPoll = $(this).parents().find('.ajax-poll').get(0);
                $(this).closest('.ajax-poll').children().find('.challenger').attr('class','challenger');
                $(this).parent().addClass('active');
 
                var pollID = $(this).attr('data-poll');
                var pollRadio = $(this).attr('data-radio');
                var pollValue = $(this).attr('data-value');
                var params = {};
                params['action'] = 'ajax';
                params['rs'] = 'axAjaxPollSubmit';
                params['title'] = wgPageName;
                params['wpPollId'] = pollID;
                params['wpVote'] = 'Vote!';
                params[pollRadio] = pollValue;
                $.post('index.php', params, function(data) {
                    var total = data.total;
                    $('.pollAnswerVotes', currentPoll).each(function() {
                        var votedSpan = $('span', this);
                        var votedBar = $('div', this);
                        var currentValue = $('span', this).attr('id').split('-')[1];
 
                        if (typeof data.votes[currentValue] != 'undefined') {
                            $(votedSpan).text(data.votes[currentValue].value);
                            $(votedSpan).attr('title',data.votes[currentValue].percent + '%');
                            $(votedBar).css('width',data.votes[currentValue].percent + '%');
                        }
                        else {
                            $(votedSpan).text('0');
                            $(votedSpan).attr('title','0%');
                            $(votedBar).css('width','0%');                        
                        }
                    });        
                }, "json");
            });
 
        },    
        beautify: function(element, challenger, poll, radio, value) {
            var challengerLink = challenger + '-link';
            $(element).html('<a href="' + challengers[challengerLink] +'"><div class="name">' + challenger + '</div></a><div class="challenger"><img data-poll="' + poll +'" data-radio="' + radio + '" data-value="' + value + '" style="width: 100px; height: 100px;" class="challenger-image" src="' + challengers[challenger] + '" alt="' + challenger + '"></div>');
        }
    };
 
    $(document).ready(function() {
        $('.ajax-poll .total').parent().attr('class','description');
        $('.ajax-poll .pollAnswerVotes span').each(function () {
            var titleReplace = $(this).attr('title');
            if (titleReplace == 0) {
                $(this).attr('title','0%');                
            }
            else if (titleReplace) {
                var titleReplace = titleReplace.replace(/[^[0-9\,\.\%]+/g,'');
                $(this).attr('title',titleReplace);
            }
            else {
                $(this).attr('title','0%');        
            }
        });
        challengerPoll.init();
    });
}