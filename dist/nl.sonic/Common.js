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
var wiki_name_text=["Gotta go fast!", "Aw, yeah! This is happenin'!", "What you see is what you get.", "An adventure's no fun if it's too easy.", "Just a guy that loves adventure!", "Talk about low budget flights.", "I'll make you eat those words!", "I will fight like I always have!", "I found you, faker!", "C'mon! Step it up!", "You're too slow!", "Way past cool!", "Gotta juice!", "Get a load of this!", "Faker?!", "It's no use!", "Chaos Control!", "Time for a Knuckles sandwich!", "If you have time to worry, then run!", "Strange, isn't it!?", "That's no good.", "All hail the king, baby.", "Snooping as usual, I see...", "Live and learn.", "Moving around at the speed of sound.", "Gotta follow my rainbow!", "Wooow, my head's spinning!", "Now I'll show you!" ][wiki_name_number];
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