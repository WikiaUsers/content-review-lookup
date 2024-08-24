/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
 
$(function() {
    var rights = {};
 
    rights["Darthwikia"]   = ["Founder", "Duke Fishron"],
 
    rights["SilverHexxitFights"]   = ["Bureaucrat", "Golem"],
 
    rights["Kerrawesome"]            = ["Administrator", "Destroyer"],
 
    rights["Daniel.gormley.77"]        = ["Chat Moderator", "Skeletron",];
 
    rights["The Mysteryous User"]        = ["Administrator", "Plantera"];
 
    rights["Adam9812"]        = ["Administrator", "Paladin"];
 
    rights["652Graystripe"]        = ["Moderator", "Eye of Cthulhu"];
    
    rights["The Terraria Swag Beast"]        = ["Bureaucrat", "Wall of Flesh"];
 
    if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});

window.MessageWallUserTags = {
    tagColor: 'purple',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Adam9812': 'Coder·Admin',
        'Darthwikia': 'Founder·Inactive',
        '652Graystripe': 'Moderator', 
        'Kerrawesome': 'Administrator',
        'SilverHexxitFights': 'Bureaucrat',
        'The Mysteryous User': 'Administrator',
        'Daniel.gormley.77': 'Chat Moderator',
        'The Terraria Swag Beast': 'Bureaucrat·Admin',
        'JustDanceIsTheBest': 'Chat Moderator'
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
	'u:dev:WallGreetingButton/code.js', //Adds Wall Greeting Edit Button
        'u:dev:Voice_Dictation/voice.js', //Adds Voice Dictation
        'MediaWiki:Common.js/StandardEditSummaries.js', //Adds Edit Summaries Dropdown
        'u:dev:DynamicImages/code.js', //Fixes GIFs in thumbnails
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:NullEditButton/code.js', //Adds a function like purging, but better
        'u:dev:AjaxRC/code.js', //Auto refreshes Wiki Activity and Recent Changes
        'w:c:dev:LockOldBlogs/code.js',
    ]
});

var quizName = "Test your Terraria Skills";
var quizLang = "en";
var resultsTextArray = [
	"You are a Terraria Newbie. I think you've just started.",
	"You are a good player. You've beaten a few bosses and done research.",
	"You're quite an experienced Terrarian, I bet you're in Hardmode",
	"You're a Terraria Master! You know all there is to know about the game"
	];
var questions = [
 
	["The First Boss you should face in Terraria is:",
	"Eye of Cthulhu",
	"Brain of Cthulhu",
	"Wall of Flesh",
	"Skeletron"], 
 
	["Souls of Blight are dropped by:",
	"Ocram",
	"The Destroyer",
	"Plantera",
	"Duke Fishron",],
 
	["In Mobile Terraria, the fastest weapon in the game is:",
	"Clockwork Assault Rifle",
	"Uzi",
	"Megashark",
	"Venus Magnum"],
 
	["The Dark Lance is the spear version of the Night's Edge",
	"Yes",
	"No"],
 
	["The Clentaminator Costs:",
	"2 Platinum 40 Gold",
	"3 Platinum 60 Gold",
	"1 Platinum",
	"2 Platinum 30 Gold"],
 
	["Which of the following is not dropped by the WoF?",
	"Flesh Axe",
	"Laser Rifle",
	"Clockwork Assault Rifle",
	"Breaker Blade",
	"Sorceror's Emblem"],
 
	["The most powerful sword in the game is:",
	"Terra Blade",
	"Night's Edge",
	"Excalibur",
	"Chlorophyte Claymore"],
 
	["Which of the following doesn't have 200% pickaxe power?",
	"Picksaw",
	"Chlorophyte Pickaxe",
	"Pickaxe Axe",
	"Spectre Pickaxe"],
 
	["The Boss with the lowest health Pre-hardmode is Eye of Cthulhu",
	"False",
	"True"],
 
	["The _______ NPC is not in Terraria Mobile",
	"Stylist",
	"Truffle",
	"Dye Trader",
	"Steampunker",
	"Cyborg"]
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});