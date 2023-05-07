window.MessageWallUserTags = {
    tagColor: '#4682B4',
    glow: true,
    glowColor: '#2F4F4F',
    glowSize: '15px',
    users: {
        'username': 'usergroup',
        'Golfpecks256': 'Wiki Adopter • Bureaucrat • Administrator',
        'TheSystemGuy99': 'Administrator',
        'Catchycatpaws': 'Administrator',
        'Hulk10': 'Bureaucrat • Administrator',
        'Dinotrux18': 'Administrator'
    }
};

var quizName = "The Octonauts Quiz";
var quizLang = "en";

var resultsTextArray = [
    "You need to watch more Octonauts!",
    "Not bad. You have a decent knowledge of Octonauts.",
    "You are a Octonauts expert!"
];

var questions = [

    ["What is Kwazii's favorite Gup?",
    "Gup-B",
    "Gup-A",
    "Gup-C",
    "Gup-E"],

    ["What color is the Octopod?",
    "Orange.",
    "Beige.",
    "Blue.",
    "Red."],

    ["Where does Professor Inkling like to stay?'",
    "Library",
    "Kitchen",
    "HQ",
    "Games Pod"],

    ["In what special is Professor Natquik featured in?",
    "The Operation Deep Freeze",
    "The Great Penguin Race",
    "The Great Christmas Rescue",
    "The Over and Under Adventure"],

    ["What type of octopus is professor inkling?",
    "Dumbo Octopus",
    "Pacific Orange Octopus",
    "Mimic Octopus",
    "Blue Ringed Octopus"],

    ["What is Peso interested in?",
    "All of the options",
    "Helping sea creatures",
    "Playing the xylophone",
    "Playing ping pong/table tennis"]
];
        
/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Founder', order: -1/0 },
		adopter: { u:'Wiki Adopter', order: -1/0 },
		retired: 'Retired'
	}
};

UserTagsJS.modules.custom = {
    'Bobbybop': ['founder', 'retired'],
    'Golfpecks256': ['adopter']
};
/* End of User Tags */