//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝【Add Rail Module】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.AddRailModule = ['Template:Main_Page/Featured_Poll'];

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Auto Refresh】＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Ajax Pages
window.ajaxPages = [];

// Ajax Special Pages
window.ajaxSpecialPages = ["RecentChanges", "Watchlist", "Log", "Contributions"];

// Indicator Icon
window.ajaxIndicator 

// Refresh Time
window.ajaxRefresh = 30000;

// Display and Hover Text
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Automatically refreshes the page by placing a check on the checkbox.',
}}}}}); // Allows Yaya to automatically refresh the page by placing a check on the checkbox.

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//


const elementToAnimate = document.querySelector('.character-illustration');


const options = {
  threshold: 0.5 // Percentage of the target element that needs to be visible to trigger the animation
};


const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the target element is intersecting with the viewport
      // Add a CSS class to apply the opacity animation
      elementToAnimate.classList.add('animate-opacity');
      // Stop observing once the animation is triggered
      observer.unobserve(entry.target);
    }
  });
};

// Create an IntersectionObserver instance with the callback function and options
const observer = new IntersectionObserver(callback, options);

// Start observing the target element
observer.observe(elementToAnimate);




//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Ajax Redirect】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev'); 

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//









//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//

//＝＝＝＝＝＝＝＝＝＝＝＝＝【Back to Top】＝＝＝＝＝＝＝＝＝＝＝＝//

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Modernization
window.BackToTopModern = true;

// Arrow Icon
/*window.BackToTopArrow = false;*/

// Button Text 
window.BackToTopText = "Back to Top";

// Scroll Speed
window.BackToTopSpeed = 600;

// Button Appearance
window.BackToTopStart = 800;

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//

 








//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//

//＝＝＝＝＝＝＝＝＝【Disable Bot Message Wall】＝＝＝＝＝＝＝＝＝//

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.DisableBotMessageWalls = {
    exceptions: ['']
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//

//＝＝＝＝＝＝＝＝＝＝＝＝＝【Discussion Embed】＝＝＝＝＝＝＝＝＝＝＝＝//

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Discussion Limit
window.discussEmbedLimit = 7;

// Discussion ID
//window.discussEmbedForum = "";

// Discussion Sort
window.discussEmbedSortTrending = 0;

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//

//＝＝＝＝＝＝＝＝＝＝＝【Discussion Rail Module】＝＝＝＝＝＝＝＝＝＝//

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Embedding-only Use
window.discussionsModuleEmbed = true;

// Positioning
mw.hook('discussionsModule.added').add(function($module) {
    // Module addition 
    if ($('.insights-module').exists()) {
        $module.insertBefore('.insights-module');
    } else {
        $module.appendTo('#WikiaRail');
    }
});

// Content Filtering
window.discussionsModuleConfig = { 
    'size' : '4', 
    'mostrecent' : 'false',
    //'catid' : [
    //]
}

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Display Clock】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.DisplayClockJS = {
    format: '%B %d %Y, %I:%2M:%2S %p (UTC)',
    location: 'header',
    hoverText: 'Purges the cache by clicking the time.',
    interval: 500,
    offset: 0,
    monofonts: 'Junicode'
};// Allows Yaya to purge the cache by clicking the time.

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//



 

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝【File Usage Auto Update】＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.LIRoptions = {
//  bottomMessage: '',
//  editSummary: '',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 1000
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
 






//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//

//＝＝＝＝＝＝＝＝＝＝＝＝＝【Link Preview】＝＝＝＝＝＝＝＝＝＝＝＝＝//

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/unbreakable-machine-doll/images/d/d7/No_Available_Image_H.jpg/revision/latest?cb=20160830183959&format=original';
window.pPreview.tlen = 4000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];






//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Message Block】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.MessageBlock = {
    title: 'Blocked',
    message: 'You have been blocked for $2 because you have $1.',
    autocheck: true
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝【Message Wall User Tags】＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.MessageWallUserTags = {
    tagColor:'#01779C',
    txtSize:'10px',
    glow:false,
    glowSize:'15px',
    glowColor:'#65AFC4',
    users: {
        '赤羽_雷真':'Founder • Bureaucrat • Administrator',
        'UMDP':'Assistant Administrator'
    }
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Quiz】＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
var quizName = "Machine Physics Test";
var quizLang = "en";
var resultsTextArray = [ 
	"Text displayed after the user completes the quiz with the LOWEST score",
	"Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
	"Text displayed after the user completes the quiz with the HIGHEST score" 
	];
var questions = [
 
	["What is the most popularised magic circuit currently?",
	"Heat",
	"Eve’s Heart",
	"Photic Generation",
	"Kinetic"], 
 
	["This is the second question, feel free to add as many questions as you like",
	"The CORRECT answer to question 2",
	"An INCORRECT answer to question 2",
	"Another INCORRECT answer to question 2"],
 
	["This is the third question",
	"The CORRECT answer to question 3",
	"An INCORRECT answer to question 3"]
 
	];

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Rail】＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
$(function () {

    "use strict";
    
    if (mw.config.get('wgIsMainPage') === true) {
        var homeSocial =
                '<table>' +
                    '<tr>' +
                        '<td colspan="2">' +
                            '<iframe style="border: 0; height: 300px; margin: 0; overflow: hidden; width: 296px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2&amp;header=true&amp;height=300&amp;heightcolorscheme=light&amp;show_faces=false&amp;small_header=false&amp;stream=true&amp;width=296" scrolling="yes"></iframe>' +
                        '</td>' +
                    '</tr>' +
                '</table>';
    }

});

$(window).load(function () {
 
    'use strict';
 
    // Module
    var socialModule =
    '<section class="module" id="SocialModule">' +
        '<h2>Follow us!</h2>' +
        '<table>' +
            '<tr>' +
                '<td colspan="2">' +
                    '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUnbreakable-Machine-Doll-850917448283173%2F&tabs=timeline%2Cevents%2Cmessages&width=268&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="268" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>' +
                '</td>' +
            '</tr>' +
        '</table>' +
    '</section>';
 
    // Inserts the module
    if (mw.config.get('wgIsMainpage') !== true) { // Checks if it's not the homepage
        if ($('#TOP_RIGHT_BOXAD').length) { // Checks if there are ads
            $('#TOP_RIGHT_BOXAD').after(socialModule, $('#WikiaRecentActivity')); // Inserts module and Recent Wiki Activity (if there is) below ads
        } else if (mw.config.get('wgPageName') === 'Special:WikiActivity') { // If there are no ads, checks if it's Special:WikiActivity
            $('#WikiaRail').prepend(socialModule, $('.CommunityCornerModule')); // Inserts module and Community Corner at the top of the sidebar
        } else { // If there are no ads and it isn't Special:WikiActivity
            $('#WikiaRail').prepend(socialModule, $('#WikiaRecentActivity')); // Inserts modules at the top of the sidebar
        }
    }



var namespaces = [
        2, // User profiles
        1200 // Message Walls
    ];
    var pagenames = ['Special:WikiActivity', 'Special:Following'];
    var pathname = window.location.pathname.split('/'); // Returns /wiki/rest/of/path and splits it in "/" to work with them below
 
    // Inserts the module
    if (mw.config.get('wgIsMainpage') !== true) { // Checks if it's not the homepage
 
        // Inserts module above Recent Wiki Activity in most pages
        $('#WikiaRecentActivity').before(socialModule);
 
        // Inserts it in different places in forum and blogs
        if (mw.config.get('wgPageName') !== 'Special:WikiActivity') { //Checks if it's not Wiki Activity
            if (mw.config.get('wgUserGroups').indexOf('user') > -1) { // If it's a registered user
                if ($('.ForumActivityModule').length) { // Checks if it's the forum
                    $('.ChatModule').before(socialModule); // Inserts module above Chat
                }
            } else { // If it's an anonymous user
                $('.ForumActivityModule').first().before(socialModule); // Inserts module above either Forum Activity or Related Threads
                $('.WikiaBlogListingBox').before(socialModule); // Inserts module above Popular blog posts
            }
        }
 
        // Inserts it above Chat in other pages
        if ((namespaces.indexOf(mw.config.get('wgNamespaceNumber')) > -1 && typeof pathname[3] === 'undefined') || pagenames.indexOf(mw.config.get('wgPageName')) > -1 || pathname[2] === 'Special:Contributions') { // If it's Message Walls, WikiActivity, Following or Contributions
            $('.ChatModule').before(socialModule); // Inserts module above Chat
        }
 
    }
});

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Random】＝＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Author: Slyst                                                      //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
/*$(function() {
    $.fn.extend({
        randomize: function(parent, child) {
            var $this = $(this);
            var r = {
                items: [],
                index: function() {
                    if (!parent) {
                        parent = $this.data('parent') || $this.find(':first-child');
                    }
                    if (!child) {
                        child = $this.data('child') || parent.children(':first-child') || parent;
                    }
                    var elem = (parent !== child) ? $this.find(parent).find(child).eq(0).parent().children(child) : $this.find(parent);
                    elem.each(function(i) {
                        $(this).addClass('item-' + i);
                    });
                },
                store: function() {
                    r.items = [];
                    var items;
                    if (!$this.find('[class^="item-"]').length) {
                        this.index();
                    }
                    $this.find('[class^="item-"]').each(function() {
                        r.items.push($(this).html());
                    });
                },
                generate: function(limit) {
                    var array = this.shuffle(this.items);
                    for (var i = 0; i < limit; i++) {
                        $this.find('.item-' + i).html(array[i]).removeClass();
                    }
                    $this.find('[class^="item-"]').remove();
                },
                shuffle: function(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var random = Math.floor(Math.random() * (i + 1)),
                            temp = array[i];
                        array[i] = array[random];
                        array[random] = temp;
                    }
                    return array;
                },
                init: function() {
                    this.store();
                    if (!$this.data('limit')) {
                        $this.attr('data-limit', $this.find('[class^="item-"]').length);
                    }
                    this.generate($this.data('limit'));
                }
            };
            return r.init();
        }
    });
    if ($('.randomize').length) {
        $('.randomize').each(function() {
            $(this).randomize();
        });
    }
});*/

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//


$('.references-small').hide();
$('<span class="button onclick="toggleReflist()">Show</span>').insertBefore('.references-small');

function toggleReflist() {
$('.references-small').show(950);
}


//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝【Reference Popups】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
//((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Reveal Anon IP】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.RevealAnonIP = {
    permissions : ['staff', 'util', 'helper', 'bureaucrat', 'sysop',  
    'rollback']
};
 
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝【Signature Check】＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.SignatureCheckJS = {
    checkSignature:true, //Enables the signature check function.
//    preamble:'The line before the warning.\n\n',
    noForumheader:'Please write the header of your post above it.\n',
    noSignature:'Please leave your signature of four tildes (<nowiki>~~~~</nowiki>) below your post.\n'
//    epilogue:'\nThe line after the warning.',
//    forumheader:'Forumheader' //Set the Forumheader template's name to an empty string to disable it.
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Toggle Image】＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
function cycleImages() {
	var index = 0;

	$imageEls = $('.toggle-image'); // Get the images to be cycled.

	setInterval(function () {
		// Get the next index.  If at end, restart to the beginning.
		index = index + 1 < $imageEls.length ? index + 1 : 0;
		// Show the next image.
		$imageEls.eq(index).addClass('show');
		// Hide the previous image.
		$imageEls.eq(index - 1).removeClass('show');

	}, 2000);
};

// Document Ready.
$(function () {
	cycleImages();
});

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//



//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝【USERNAME】＝＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Replaces {{USERNAME}} with the name of the user browsing the page. //
// Requires copying Template:USERNAME.                                //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
if (mw.config.get('wgUserName')) {
    $('.insertusername').html(mw.config.get('wgUserName'));
}

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝【User Tags】＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Core configuration; customs the built-in sysop tag's label and     //
// adds custom tags.                                                  //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m:'Male', f:'Female', u:'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		sysop: { u:'Administrator' },
		'wiseman': { u:'Wiseman' },
		'one-man force': { u:'One-man Force' },
		'mini-sysop': { u:'Assistant Administrator' },
		'vandal-patrol': { u: 'Spamdal Janitor', link:'Project:Janitors' }
	}
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Adds custom groups to several users and forces the inactive group  //
// onto a user.                                                       //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.custom = {
	'赤羽 雷真': ['wiseman', 'one-man force'],
	'UMDP': ['mini-sysop'],
	'You': ['inactive'],
	'Other User': ['hello']
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Identifies if a user is new in Wikia and makes a user inactive if  //
// the user did not make an edit after particular days.               //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.inactive = 30;

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Adds a particular group to particular users.                       //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Removes a group from users who have the other group.               //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.metafilter = {
	hello: ['muckraker'],
	'vandal-patrol': ['mini-sysop']
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Makes a user never inactive.                                       //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.userfilter = {
	'赤羽 雷真': ['inactive'], 
	'UMDP': ['inactive'] 
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Removes the other groups of a user if all exist and replaces them  //
// with a group.                                                      //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator']
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Adds a group to users who have all other groups.                   //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback']
};

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Yaya Clock】＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//;(function() {
//    var attributes = {
//        src: 'http://www.machine-doll.com/bp/yaya_watch.swf',
//        wmode: 'transparent',
//        quality: 'best',
//        bgcolor: '#000000',
//        width: 150,
//        height: 300,
//        name: 'index',
//        align: 'middle',
//        type: 'application/x-shockwave-flash',
//        pluginspage: 'http://www.macromedia.com/gog/getflashplayer'
//    };
//    var embed = document.createElement('embed');
//    for (var i in attributes) {
//        embed.setAttribute(i, attributes[i]);
//    }
//    if (document.getElementById('yaya_watch')) {
//        document.getElementById('yaya_watch').appendChild(embed);
//    }
//})();



//if (mw.config.get("wgIsMainpage")) {
//	importScriptURL("http://www.machine-doll.com/bp/bp.js");
//}

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//




// Test
document.addEventListener('DOMContentLoaded', function() {
    // Get the table of contents element by its ID
    var tableOfContents = document.getElementById('toc');

    // Check if the table of contents element exists
    if (tableOfContents) {
        // Get the height of the table of contents
        var tocHeight = tableOfContents.offsetHeight;

        // Set the padding based on the height
        // You can adjust the padding calculation as needed
        var paddingTop = tocHeight * 0.1;
        var paddingBottom = tocHeight * 2.3;

        // Apply the padding to the table of contents
        tableOfContents.style.paddingTop = paddingTop + 'px';
        tableOfContents.style.paddingBottom = paddingBottom + 'px';
    }
});