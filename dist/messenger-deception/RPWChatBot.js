/*
 * @name        RPWChatBot.js
 * @description Browser-based chatbot JS, certain sections are modified from ChatLogger and BotAntiSpam.
 * @author     Dorumin, KockaAdmiralac, TheGoldenPatrik1, Qstlijku, TheKorraFanatic.
 * Modified by Messenger of Heaven for Roleplay Wiki
 */

window.AutoMod = {
    ban: {
        words: ['cunt'],
        reason: 'Automatically banned for misbehaving in chat',
        duration: 7200
    },
    check: true,
    kick: ['slut']
};
 
//Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoMod.js',
        'u:dev:MediaWiki:ChatLogger.js',
        'u:dev:ChatLogger.js',
    ]
});
// Chat commands
            break;
            case 'ping': (function(){
            message.reply('pong!');
            })();
            break;
            case 'mew': (function(){
            message.reply('MEW MEW MEW MEW!');
            })();
            break;
            case 'ship' : (function(){
                var toShip = text.split(' | ');
                if (!text || !toShip[0] || !toShip[1]){
                    send('Usage: %ship CHOICE A | CHOICE B');
                    return;
                }
                message.channel.send('(h)Lovely. Ship name: ' + toShip[0].slice(Math.round(toShip[0].length / 2)).charAt(0).toUpperCase() + toShip[0].slice(Math.round(toShip.length / 2)).slice(1) + toShip[1].slice(Math.round(toShip.length / 2)));
            })();
            break;
            case "rate": (function() {
                message.reply(' I\'d give ' + text + ' a ' + Math.floor(Math.random() * 11) + '/10.');
            break;
            case 'botinfo': (function(){
                message.reply('Hello! I\'m SlendyBot I was created May 14th 2017 by Messenger of Heaven on The Demon\'s Light wiki. If you have any questions about my code message my creator here: [[Message_Wall:Messenger of Heaven|Messenger of Heaven]] or [[Message_Wall:TheKorraFanatic|TheKorraFanatic]]');
            })();
            break;
            case "choose" : (function() {
                if (!text) {
                    message.channel.send('Usage: !choose CHOICE A | CHOICE B | Etc...');
                    return;
                }
                var choice = text.split("|")
                var ac = Math.floor(Math.random() * choice.length);
                if (choice[1] === choice[2]) {
                    message.channel.send('Error: You have not specified a second choice.');
                    return;
                }
                message.channel.send('I choose ' + choice[ac] + '!');
            })();  
            break;
            case 'bite': (function(){
                var arr = ['https://media.giphy.com/media/OWabwoEn7ezug/giphy.gif, https://media.giphy.com/media/69159EHgBoG08/giphy.gif'];
                const user = message.mentions.users.first();
                const embed = new Discord.RichEmbed()
                .setDescription('Oh no!' + message.guild.member(user.id).user.username + ',  has been bitten by' + message.member.user.username + '!')
                .setColor('#e22dee')
                .setImage(arr[Math.floor(Math.random() * arr.length)]);
                message.channel.send(embed);
            })();
            break;
        }
    }
    if (/\bgrrr\b/i.test(message.content) && message.member.id != bot.user.id) {
        message.reply('Grrrrrrrrrrrr');
    }
    if (/\breee\b/i.test(message.content) && message.member.id != bot.user.id) {
        message.reply('REEEEEEEEE');
    }
    if (/\bmew\b/i.test(message.content) && message.member.id != bot.user.id) {
        message.reply('mew mew mew MEOW');
    }
    if (/\bkitty squad\b/i.test(message.content) && message.member.id != bot.user.id) {
        message.reply('Kitty Squad Best Squad');
    }
    if (/\bhot\b/i.test(message.content) && message.member.id !=bot.user.id) {
        message.reply('The only hot thing in the world is me, sweetheart')
    }
    if (/\bBTS\b/i.test(message.content) && message.member.id !=bot.user.id) {
        message.reply('BTS = Band That Sucks :stuck_out_tongue: ')
    }         
        }
    });
});
}