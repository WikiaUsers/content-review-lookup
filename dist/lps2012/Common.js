var backgroundLayer1 = document.createElement('div');
backgroundLayer1.id = 'backgroundLayer1'; 
document.body.appendChild(backgroundLayer1);

/* MessageWallUserTags import needs this. Please configure 
   as you see fit. See http://dev.wikia.com/wiki/MessageWallUserTags
   for more info. */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'User1': 'Founder',
        'User2': 'Bureaucrat',
        'User3': 'Admin',
        'User4': 'Rollback',
        'User5': 'Custom Tag'
    }
};

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
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',

        'MediaWiki:AjaxPageIt.js',
        'MediaWiki:ExtendedScripts.js',
        'MediaWiki:LyricsHighlighter.js',
        'MediaWiki:TurnToTabHeader.js',

        //'u:dev:FloatingToc/code.js',
        //'u:dev:SearchSuggest/code.js',
        
        //'MediaWiki:Snow.js',
        //'MediaWiki:Snowstorm.js',
        //'MediaWiki:Hearts.js',
    ]
});

/*WARNING! The list below are the current design scripts,
only ONE of them should be active at the time.*/

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:DayAndNight.js',
        //'MediaWiki:Wolf-i-fied.js',
        //'MediaWiki:Ad_Background.js',
        //'MediaWiki:Cupet_day.js',
        //'MediaWiki:Pet_fest.js',
        //'MediaWiki:Winter_holidays.js',
    ]
});

window.onload = function() {
    init();
    if (typeof wgIsMainPage != 'undefined'){
        $('.accordion').fadeIn(1000);
        $('.accordion').accordion({active:false, collapsible:true});
        $(".tabs").show('slide', {direction: 'left'}, 1000);
        $(".tabs").tabs({ hide: { effect: "drop"} });
        $(".tabs").tabs({ show: { effect: "slide"} });
        startSlider();
        $('#wowslider-container1').show(1000);
        $('.ws_images img').css('visibility','hidden');
    }
};

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