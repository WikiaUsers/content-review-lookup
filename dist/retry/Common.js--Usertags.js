// Wanna learn how to edit and implement it? See http://dev.wikia.com/wiki/UserTags for information.

// Usertags
// Core configuration. We add more custom tags and change what some tags say.
window.UserTagsJS = {
modules: {},
tags: {
tech: 'Technician',
featured: 'Featured user',
wasfeatured: 'Former featured user',
topuser: 'Top user',
coin collector: 'Coin Collector',
bolt collector: 'Bolt Collector',
headtech: 'Head technician',
veryactive: 'Very active',
patroller: 'Patroller',
furry: 'Furry',
brony: 'Brony',
nickfan: 'Nick fan',
noncrasher: 'Non-crasher',
crashed: 'Out of Fuel',
awesome: 'Awesome',
otaku: 'Otaku',
marshmallow: 'Marshmallow',
kawaii: 'Kawaii',
potato: 'Potato',
fish: 'Fish',
god: 'God',
critic: 'Critic',
bot: 'Bot',
genlismo: 'Generalissimo',
tamaraw: 'Tamaraw',
modexpert: 'Modding expert',
demotion possible: 'In danger of demotion',
on watch: 'This user is under wiki watch',
}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
'ThePvzDude': ['topuser']
'TheZombiemelon': ['tech', 'bolt collector'],
'Sparkster1234': ['demoton possible'],
'Tiger03': ['headtech'],
'ThePvzDude': ['founder'],
'Brainulator9': ['veryactive', 'tech', 'patroller', 'genlismo', 'furry', 'brony', 'nickfan'],
'JemCel03': ['otaku', 'tamaraw']
'Pizzachu': ['awesome', 'coin collector', 'marshmallow', 'potato'],
'Ninja5Bot': ['bot'],
'CitronOrange': ['modexpert', 'brony'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.warning = 7; // 
UserTagsJS.modules.inactive = 4; // Inactive if no edits in 4 days
UserTagsJS.modules.demotion.possible = 7; // Demotion possible if no edits in 7 days
UserTagsJS.modules.metafilter = {
sysop: ['bureaucrat', 'founder', 'bot'],
bureaucrat: ['founder'],
chatmoderator: ['sysop', 'bureaucrat', 'founder'],
rollback: ['sysop', 'bureaucrat', 'founder'],
};
UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop', 'chatmoderator', 'rollback', 'bot-global', 'technician', 'patroller'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});