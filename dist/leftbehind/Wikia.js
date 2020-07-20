importArticles({
	type: 'script',
	articles: [
        "u:dev:FloatingToc/code.js", /* Floating TOC */
        "u:scripts:Content/SpoilersToggle.js", /* Spoilers by User:Tierre; from Dragon Age Wiki @ w:c:dragonage:Help:Spoilers */
        "MediaWiki:Common.js/slider.js" /* "Slider" header for main page */
	]
});

/* Add link to contribs on Account Navigation dropdown
 * Obtained from the RuneScape Wiki @ w:c:runescape
 */
    function addContribs() {
        if (mw.config.get('wgAction') !== 'view') {
            return;
        }
 
        if (mw.config.get('wgUserName') === null) {
            $('<li id="YourContribs"><a href="/wiki/Special:MyContributions">My contributions</a></li>').insertBefore('.contribute ul li:first-child');
        } else {
            $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My contributions</a></li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
        }    
    }

/* Social media widget
 * Obtained from the Community Central forums @ w:c:community:Thread:537426
 */
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Recent Headlines' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{FTImageMap}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

/* Disclaimer footer */
$(document).ready(function() {
    var newSection = '<div id="disclaimer">' + '</div>';
    $('.WikiaFooter section').before(newSection);
    $.getJSON('/api.php?action=parse&text={{Disclaimer}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('div#disclaimer').append(code);
    });
});

/* Refresh homepage "Quotes" content
 * Obtained from Wikia Community Forums @ w:c:community
 * Written by User:Cafeinlove
 */
$(function(){
	$('.refresh').click(function(){
		var source = "Template:Featured_Quote";
		var container = $("#quotes");
 
		$.ajax({url: "http://leftbehind.wikia.com/wiki/" + source + "?action=render"})
			.done(function(data) {
				container.html(data);
		});
	});
});