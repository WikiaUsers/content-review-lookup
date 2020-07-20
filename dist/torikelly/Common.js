/* Credits to Sam and Cat Wiki, Dev Wiki, Ariana Grande Wiki, & Zedd Wiki */
 
importArticles({
	type: "script",
	articles: [
		"w:dev:ReferencePopups/code.js",
		"w:dev:RevealAnonIP/code.js",
                "w:dev:WallGreetingButton/code.js",
                "w:c:dev:UserTags/code.js",
	]
});

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

//Explicit alert config
SpoilerAlert = {
    question: 'This page is for a song that is explicit, meaning that the lyrics may not be appropriate for—and may even be offensive to—younger readers.<br />Do you wish to proceed anyway?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Explicit');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});