/* Custom Server Time for JP and NA */
/*$(document).ready(function() {
    var newSection = '<section id="timeZones"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{ClockJS}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#timeZones').append(code);
    });
});

/*
return require('Dev:Calculator')
//Clashes with server clock
*/

/* Countdown Clock for Event Banners */
/* importArticles({
    type: "script",
    articles: [
        'w:c:dev:MediaWiki:Countdown/code.js',
        'u:dev:TZclock.js'
    ]
}, {
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
	]
});
*/ 
//Seems to clash with our own clock.

window.railWAM = {
    logPage:"Project:WAM Log"
};