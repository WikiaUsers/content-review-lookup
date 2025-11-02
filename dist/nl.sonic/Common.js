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
var wiki_names = [
  "Gotta go fast!", "Aw, yeah! This is happenin'!", "What you see is what you get.",
  "An adventure's no fun if it's too easy.", "Just a guy that loves adventure!",
  "Talk about low budget flights.", "I'll make you eat those words!",
  "I will fight like I always have!", "I found you, faker!", "C'mon! Step it up!",
  "You're too slow!", "Way past cool!", "Gotta juice!", "Get a load of this!",
  "Let's do it to it!", "It's no use!", "Chaos Control!", "Time for a Knuckles sandwich!",
  "If you have time to worry, then run!", "Strange, isn't it!?", "That's no good.",
  "All hail the king, baby.", "Snooping as usual, I see...", "Live and learn.",
  "Moving around at the speed of sound.", "Gotta follow my rainbow!",
  "Wooow, my head's spinning!", "Now I'll show you!", "Have no fear, Amy Rose is here!",
  "The servers are the seven Chaos.", "It all starts with this...",
  "Watch out! You're gonna crash! Ahhh!", "Come on, ya big drip! Where ya goin'?",
  "Long time no see.", "Look! It's a giant talking egg!", "Tougher than leather.",
  "Unlike Sonic, I don't chuckle", "I promise you... REVENGE!",
  "I'm the world's ultimate life form.", "That blue hedgehog again, of all places.",
  "Konichi-waaaaaa?", "Determination of the strong...", "All hail Shadow.",
  "Can't hold on much longer...", "I know it's a one way track...",
  "I'm not gonna think this way...", "Close my eyes and feel it burn...",
  "Nor will I count on others!", "Thunder, rain, and lightning.",
  "I hate that hedgehog!", "Oh no.", "Watch out! You're gonna crash! Ahhh!",
  "Where's that DAMN fourth Chaos Emerald!?", "This is like taking candy from a baby, which is fine by me!",
  "I have no master, except the wind that blows free!", "I just gotta do what I gotta do, that's all!",
  "It was never about chivalry to me.", "Faker!? I think you're the fake hedgehog around here.",
  "You're not even good enough to be my fake!", "No copyright law in the universe is gonna stop me!",
  "You've turned into a big time villain, doctor!", "Find the computer room!",
  "I play by my own rules. Remember that.", "Hey, I'll play with you some other time!",
  "You know, what can I say? I die hard!", "Sonic, this time, there's no way out of marrying me!",
  "It all starts with this... a jewel containing the ultimate power!",
  "Well, this is new. Showing remorse, Eggman?", "If you played nice, I wouldn't have to break all your toys!",
  "Do I need a reason to want to help out a friend?", "We gotta live life to the fullest in the time we have.",
  "Bounce pad!", "“Baldy Nosehair?!” That's the best thing that I've heard all day!",
  "Too bad it’s all over, for you!", "I won't let him down, I won't give up!",
  "I told you I'm not a rat! I'm a hedgehog.", "You can do anything!",
  "Ask not what others can do for you, but what you can do for others.",
  "When you want to do something, do it right away.",
  "You must be ready to reach beyond the boundaries of Time itself.",
  "Don't give up on the sun. Don't make the sun laugh at you.", "Watch out, Eggman! I'm coming at ya full speed!",
  "Sonic's the name, speed is my game!", "You always have a choice... Making the right one is never easy.",
  "Uh... meow?", "For a guy named Knuckles, you are really bad at punching!", "Porcupine? I am an echidna.",
  "Do I look like I need your power?", "Oh flower, pretty flower, show your face and I'll sting you!",
  "If I had to choose between the world and Sonic, I would choose Sonic.", "I'm the coolest!",
  "It'll be a date to die for!", "Everybody's Super Sonic Racing.", "Can you feel the sunshine?", "Because we're Sonic Heroes!",
  "Our next adventure awaits us, so there's no time to waste!", "A friend of a friend is a friend!",
  "Shadow the Hedgehog... Why does that name haunt me?", "I bet no one expected this baby could fly.",
  "My... That's a pretty snazzy performance there.", "Your smile... That's all I need.",
  "Just raise your head and run!", "Nothing starts until you take action.",
  "I finally found him... the Iblis Trigger!", "Yeah, this is the real me! Pretty cool, huh?",
  "Thanks for that little skydiving adventure the other day!", "Some things never change, do they?"
];

var wiki_name_number = Math.floor(Math.random() * wiki_names.length);

var elements = document.getElementsByClassName('fandom-community-header__community-name');
if (elements.length > 0) {
  elements[0].textContent = wiki_names[wiki_name_number];
}

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
$(function () {
    // Check if the disable flag is present (set via template)
    if (document.getElementById('disable-js-flag')) return;

    // Add collapse buttons to all <gallery> elements
    $('gallery').each(function () {
        var $gallery = $(this);
        var $button = $('<button class="collapsible-gallery-button">+/-</button>');
        $button.click(function () {
            $gallery.toggleClass('collapsed');
        });
        $gallery.before($button);
    });

    // Add collapse buttons to all galleries with IDs starting with 'gallery-'
    $('div[id^="gallery-"]').each(function () {
        var $gallery = $(this);
        var $button = $('<button class="collapsible-gallery-button">+/-</button>');

        $button.on('click', function () {
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

/* Expand/Collapse */
document.addEventListener('DOMContentLoaded', function () {
    // Select all collapsible elements with the class 'mw-collapsible-text'
    var collapsibleLinks = document.querySelectorAll('.mw-collapsible-text');

    // Loop through each collapsible toggle
    document.querySelectorAll('.mw-collapsible-toggle').forEach(function(toggle, index) {
        var link = collapsibleLinks[index];  // Match the corresponding link

        // Set initial state based on aria-expanded
        if (toggle.getAttribute('aria-expanded') === 'true') {
            link.innerHTML = '-';
        } else {
            link.innerHTML = '+';
        }

        // Add a click event listener to toggle the + and - when clicked
        toggle.addEventListener('click', function () {
            setTimeout(function () {
                if (toggle.getAttribute('aria-expanded') === 'true') {
                    link.innerHTML = '-';
                } else {
                    link.innerHTML = '+';
                }
            }, 0);  // Use a timeout to ensure this runs after the toggle state changes
        });
    });
});