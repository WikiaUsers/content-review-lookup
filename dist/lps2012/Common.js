if (typeof wgIsMainPage !== 'undefined') {
    importArticles({
        type: 'script',
        articles: [
            'MediaWiki:CharacterHover.js',
            'MediaWiki:Slider.js',
            'MediaWiki:Slidertranslate.js',
            'MediaWiki:Template.js'
        ]
    });
}
        
importArticles({
    type: 'script',
	articles: [
        'u:dev:UserTags/code.js',

        'MediaWiki:AjaxPageIt.js',
        'MediaWiki:ExtendedScripts.js',
        'MediaWiki:LyricsHighlighter.js',
        'MediaWiki:TurnToTabHeader.js',

		/*  WARNING! The list below are the current design scripts,
			only ONE of them should be active at the time. */
        'MediaWiki:DayAndNight.js',
        //'MediaWiki:Wolf-i-fied.js',
        //'MediaWiki:Ad_Background.js',
        //'MediaWiki:Cupet_day.js',
        //'MediaWiki:Pet_fest.js',
        //'MediaWiki:Winter_holidays.js',
    ]
});

$('.spoilerContainer').click(function() {
	$(this).children(".spoilerBody").toggleClass("spoilerHidden");
});
 
$('.warningRequired').mouseenter(function() {
	$(this).children(".warningMessage").slideDown( "slow" );
});
$('.warningRequired').mouseleave(function() {
	$(this).children(".warningMessage").slideUp("slow");
});
 
//replace the text on the infobox character's sex properly 
if ($('#addSexSymbol').length) {
    var males = [/\bmale\b/i, /\bdude\b/i, /\bmen\b/i, /\bboy\b/i, /\bman\b/i, /\bguy\b/i, /\bgay\b/i],
        females = [/\bfemale\b/i, /\bwomen\b/i, /\bgirl\b/i, /\bwoman\b/i, /\blesbian\b/i],
        sexIndex;

    for (sexIndex = 0; sexIndex < males.length; sexIndex++) {
    if (males[sexIndex].test((document.getElementById('addSexSymbol').innerHTML))) {
    document.getElementById('addSexSymbol').innerHTML = document.getElementById('addSexSymbol').innerHTML.replace(males[sexIndex], 'Male &#9794;');
        } 
    }
 
    for (sexIndex = 0; sexIndex < females.length; sexIndex++) {
    if (females[sexIndex].test((document.getElementById('addSexSymbol').innerHTML))) {
    document.getElementById('addSexSymbol').innerHTML = document.getElementById('addSexSymbol').innerHTML.replace(females[sexIndex], 'Female &#9792;');
        } 
    }
}
//end of this