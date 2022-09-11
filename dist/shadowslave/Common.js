/* Any JavaScript here will be loaded for all users on every page load. */
// 1. AjaxRC configuration option
window.ajaxRefresh = 30000;
window.BackToTopModern = true;

window.quizName = "Shadow Slave Trivia";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Better Luck next time, You need to study more!",
    "Congratulations, you're score neither the highest nor the lowest, either you're luck or you really know the answer",
    "Congratulations, you've got the HIGHEST score. You're a true student of Teacher Julius!, a true scholar!" 
];
window.questions = [
    ["The Nightmare Spell usually infects young people around what age?",
    "sixteen to eighteen",
    "fifteen to eighteen",
    "sixteen to nineteen",
    "fifteen to nineteen"], 
    
    ["What serves as both an anchor and exit point for Awakened to enter and exit Dream Realm?",
    "Gateway",
    "Gate",
    "Dream Portal",
    "World Portal"],
    
	["What do human fortress built around a conquered gateway in Dream Realm called?",
    "Citadel",
    "Settlement",
    "Castle",
    "City Fort"],
    
    ["What is the magical item that is created from Soul Essence and assume physical form when summoned?",
    "Memory",
    "Shard",
    "Enchantment",
    "Echo"],
    
    ["What is the magical copy of a slain Nightmare Creature called?",
    "Echo",
    "Shard",
    "Memory",
    "Shadow"],
    
    ["It is capable of accumulating and storing vast amounts of Soul Essence.",
    "Soul Core",
    "Soul Sea",
    "Soul Shard",
    "Shadow Core"],
    
    ["What is the mystical title granted by the Spell to the most exceptional Awakened?",
    "True Name",
    "Soul Name",
    "Alias",
    "Aspect Name"],
    
    ["Human soul ranks are based on quality of one's Soul Core that _____________ towards _____________.",
    "ascend, divinity",
    "descend, profanity",
    "ascend, profanity",
    "descend, divinity"],
    
    ["Human soul ranks are based on quality of one's Soul Core that _____________ towards _____________.",
    "descend, profanity",
    "ascend, profanity",
    "ascend, profanity",
    "descend, divinity"],
    
    ["How many cores does an Awakened Tyrant possess?",
    "five",
    "four",
    "six",
    "three"],
    
    ["How many cores does a Fallen Terror possess?",
    "six",
    "four",
    "five",
    "three"],
    
    ["How many cores does a Great Devil possess?",
    "four",
    "six",
    "five",
    "three"],
    
    ["A Tier-four Ascended Memory would came from what Nightmare Creature?",
    "Fallen Devil",
    "Great Devil",
    "Great Tyrant",
    "Fallen Tyrant"],
    
    ["A Tier-five Awakened Memory would came from what Nightmare Creature?",
    "Awakened Tyrant",
    "Awakened Devil",
    "Fallen Tyrant",
    "Fallen Devil"],
    
    ["A Tier-six Ascended Memory would came from what Nightmare Creature?",
    "Fallen Terror",
    "Fallen Tyrant",
    "Great Tyrant",
    "Great Terror"]
];

// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:Quiz/code.js'
    ]
});