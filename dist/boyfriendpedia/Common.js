/* Any JavaScript here will be loaded for all users on every page load. */
window.quizName = "quizQ";
window.quizLang = "en";
window.resultsTextArray = [ 
    "It may be low, but keep improving! Hopefully, you or your parents won't be that disappointed on your score!",
    "Keep working on the quiz, peasant!",
    "YOU DID IT! YOU'RE A NATURAL FUNKER! Now get a life." 
];
window.questions = [
    ["Why was the Funkipedia Mods Wiki created?",
    "To create Whitty’s Page in response to the growing number of search results of him on the main wiki.",
    "To create the B-Side mod’s Page in response to the growing number of search results of it on the main wiki.",
    "To create pages for multiple mods due to the growing amount of them.",
    "To document all mods made by BBpanzu."], 

    ["The Funkipedia Mods Wiki and the Main wiki used to be associated with each other:",
    "True",
    "False"],

    ["Who were the developers of the original Whitty Mod?",
    "Sock.clip, Nate Anim8, and Kade Dev",
    "Nate Anim8, Kade Dev, and BBpanzu",
    "Nate Anim8, BBpanzu, and Cval_Brown",
    "None of the above"],
    
    ["Who was the Innuendo, the composer for the A.G.O.T.I. mod, originally before he changed his current name?",
    "Whitty",
    "Ruv",
    "Aldryx",
    "A.G.O.T.I."],
    
    ["Which of the following would Dokki.Doodlez, the main artist of the Mid-Fight Masses mod, would mostly disapprove of?",
    "Shipping or erotic artwork of Selever and Rasazy.",
    "Pornographic artwork of Sarvente and Ruv.",
    "Other social media accounts impersonating her.",
    "Fan-made mods of Mid-Fight Masses."],
    
    ["The developers of the /v/-Tan mod implemented a virus within the files of the mod.",
    "True",
    "False"],
    	
	["The character designs in Mid-Fight Masses are based off of Countryhumans.",
	"True",
	"False"],
	
	["Which of the following is the best option for modmakers if there is a vandal edit on their articles?",
	"Screenshot it, Tweet it out, and blame the website along with its users and staff members as a whole.",
	"Create or use their Fandom account and edit out the edit themselves. If the page is locked, they may politely request a staff member to do it for them.",
	"Request another user to do the editing for them.",
	"All of the above."],
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Quiz/code.js',
    ]
});