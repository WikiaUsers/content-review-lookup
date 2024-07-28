/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Staat je toe om sjablonen te maken die je in/uit kan klappen */
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "weergeef",
	hide: "verberg",
	showAll: "alle weergeven",
	hideAll: "alle verbergen"
    }
};

/* icons, Avatar Wiki*/
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/* Wiki-headerverandering (Marvel Database, EN) */
var number_of_wiki_names = 27;
var wiki_name_number = 0;

while (wiki_name_number < 1 || wiki_name_number > number_of_wiki_names) {
  wiki_name_number = Math.random().toFixed(2) * 100;
};
var wiki_name_text=["Gotta go fast!", "Aw, yeah! This is happenin'!", "What you see is what you get.", "An adventure's no fun if it's too easy.", "Just a guy that loves adventure!", "Talk about low budget flights.", "I'll make you eat those words!", "I will fight like I always have!", "I found you, faker!", "C'mon! Step it up!", "You're too slow!", "Way past cool!", "Gotta juice!", "Get a load of this!", "Let's do it to it!", "It's no use!", "Chaos Control!", "Time for a Knuckles sandwich!", "If you have time to worry, then run!", "Strange, isn't it!?", "That's no good.", "All hail the king, baby.", "Snooping as usual, I see...", "Live and learn.", "Moving around at the speed of sound.", "Gotta follow my rainbow!", "Wooow, my head's spinning!", "Now I'll show you!", "Have no fear, Amy Rose is here!", "The servers are the seven Chaos", "It all starts with this...", "Watch out! You're gonna crash! Ahhh!", "Come on, ya big drip! Where ya goin'?", "Long time no see.", "Look! It's a giant talking egg!", "Tougher than leather.", "Unlike Sonic, I don't chuckle", "I promise you... REVENGE!", "I'm the world's ultimate life form.", "That blue hedgehog again, of all places." ][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;

/* Tussen haakjes hoofdingen */
$(document).ready(function() {
    $('h1').each(function() {
        var html = $(this).html();
        var newHtml = html.replace(/\(([^)]+)\)/g, '<span class="title-parentheses">($1)</span>');
        $(this).html(newHtml);
    });
});

document.querySelectorAll('.form .quote').forEach(function(element) {
        element.style.backgroundColor = 'rgba(191, 152, 18, 0.5)';
});

document.querySelectorAll('.form .quotemark').forEach(function(element) {
        element.style.color = 'rgba(191, 152, 18, 0.5)';
});

/* Galerij-klapbaar */
$(function() {
    // Add collapse buttons to all <gallery> elements
    $('gallery').each(function() {
        var $gallery = $(this);
        var $button = $('<button class="collapsible-gallery-button">+/-</button>');
        $button.click(function() {
            $gallery.toggleClass('collapsed');
        });
        $gallery.before($button);
    });
});


$(function() {
    // Add collapse buttons to all galleries with IDs starting with 'gallery-'
    $('div[id^="gallery-"]').each(function() {
        var $gallery = $(this);
        var $button = $('<button class="collapsible-gallery-button">+/-</button>');
        
        $button.on('click', function() {
            $gallery.toggleClass('collapsed');
        });

        $gallery.before($button);
    });
});

/* SpoilerAlert */
window.SpoilerAlertJS = {
    question: '<b>Deze sectie bevat enkele spoilers (plotinformatie, einddetails, ...). Wil je doorgaan?</b>',
    yes: 'Ja',
    no: 'Nee',
    fadeDelay: 500
};

/* Ripple */
window.ripplesConfig = {
  'normalRipples': document.querySelectorAll('.elements-1, .elements-2'),
  'recenteredRipples': document.querySelectorAll('.foo .bar'),
  'unboundedRipples': document.querySelectorAll('.lorem .ipsum')
};