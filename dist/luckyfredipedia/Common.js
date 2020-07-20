/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Replaces {{Template:InsertUsername}} with the name of the user browsing the page.
   Requires copying Template:InsertUsername. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{InsertUsername}} replacement */

// Tags
window.UserTagsJS = {
    modules: {},
    tags: {
		'bureaucrat-sysop': { u:'Commander', title:'Bureaucrat-Administrator' },
		'sysop': { u: 'Lieutenant', title:'Administrator' },
		'half-sysop': { u: 'Sub-lieutenant', title:'Content-Chat Moderator' },
		esfounder: { u:'es.Founder', title:'Founder of Spanish Wiki' },
		esadmin: { u: 'es.Admin', title:'Administrator of Spanish Wiki' },
		plfounder: { u: 'pl.Founder', title:'Founder of Polish Wiki' }
	}
};
UserTagsJS.modules.mwGroups = ['bannedfromchat', 'blocked', 'bureaucrat', 'sysop', 'chatmoderator', 'content-moderator', 'threadmoderator', 'bot'];
UserTagsJS.modules.inactive = {
	months: 1,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = {
'LFO': ['esfounder'],
'Invisible Killer': ['esadmin'],
'Azaphen': ['esadmin'],
'MicoTheGreat': ['plfounder']
};
UserTagsJS.modules.implode = {
'bureaucrat-sysop': ['sysop', 'bureaucrat'],
'half-sysop': ['chatmoderator', 'content-moderator']
};
UserTagsJS.modules.userfilter = {
	'RGL Victor The Great': ['bureaucrat-sysop']
};

// Add custom edit buttons
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
'imageFile': 'https://images.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png',
'speedTip': 'Add a reference',
'tagOpen': '<ref>',
'tagClose': '</ref>',
'sampleText': ''
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
"speedTip": "Redirect",
"tagOpen": "#REDIRECT [[",
"tagClose": "]]",
"sampleText": "Insert text"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
"speedTip": "Strike",
"tagOpen": "<s>",
"tagClose": "</s>",
"sampleText": "Strike-through text"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/1/1b/Button_miss_signature.png",
"speedTip": "Missing signature",
"tagOpen": "{{unsigned|",
"tagClose": "|09:12, September 11, 2013 (UTC)}}",
"sampleText": "Insert username here"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/luckyfredenglishpedia/images/7/70/Button_disambig.png",
"speedTip": 'Request deletion',
"tagOpen": '{{delete|reason=',
"tagClose": '}}',
'sampleText': 'your reason here'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/luckyfredenglishpedia/images/8/8c/Button_RedX.png",
"speedTip": "Disambiguation",
"tagOpen": "{{Disambig}}",
"tagClose": "",
"sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png",
"speedTip": "Wikipedia",
"tagOpen": "{{Wikipedia}}",
"tagClose": "",
"sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/a/a4/Button_wikimedia.png",
"speedTip": "Wikimedia",
"tagOpen": "{{From Wikimedia}}",
"tagClose": "",
"sampleText": ""
    };
}
 
$(function () {
    "use strict";
    // Change title
    var newTitle = $('#title-meta').html(),
        edits = $('#user_masthead_since').text();
 
    if (!newTitle) {
        return;
    }
 
    $('.firstHeading, #WikiaUserPagesHeader h1, #WikiaPageHeader h1').html(newTitle);
    $('.#user_masthead_head h2').html(newTitle + '<small id="user_masthead_since">' + edits + '</small>');
});

// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: '#E52B50',
    glow: false,
    users: {
        'username': 'usergroup',
        'RGL_Victor_The_Great': 'Primus Protectoris',
        'Ahookoochooloo': 'Sub-lieutenant',
    }
};

/* AjaxRC */
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/theloudhouse/images/5/53/Loading_bar.gif';
window.ajaxPages = [
    "Blog:Recent_posts",
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:Contributions"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// Image slider
 
$(function() {
  var slideTotal = $(".cslider ul li").length;
  var slideWidth = $(".cslider ul li").width();
  var slideVideo = $(".cslider").find("figure").parent().index();
  var slideIndex = 0;
  var slideshow = setInterval(function() {
    slideIndex += 1;
    showSlide();
  }, 5500);
 
  function showSlide() {
    if (slideIndex > slideTotal - 1) {
      slideIndex = 0;
    }
 
    if (slideIndex < 0) {
      slideIndex = slideTotal - 1;
    }
 
    $(".cslider-thumbs img").removeClass("active");
    $(".cslider-thumbs img").eq(slideIndex).addClass('active');
 
    $(".cslider-caption").children().hide();
    $(".cslider").css("background-color", "#000").animate({
      height: "415px"
    }, 400);
    $(".cslider ul").stop(true, true).animate({
      left: '-' + slideWidth * slideIndex + 'px'
    }, 600).queue(function(next) {
      $(".cslider-caption").children().fadeToggle('fast');
 
      if (slideIndex == slideVideo) {
        $(".cslider").css("background-color", "transparent").animate({
          height: "506px"
        }, 400);
      }
 
      next();
    });
  }
 
  $(".cslider").mouseover(function() {
    clearInterval(slideshow);
  });
 
  $(".cslider-prev").click(function() {
    clearInterval(slideshow);
    slideIndex -= 1;
    showSlide();
  });
 
  $(".cslider-next").click(function() {
    clearInterval(slideshow);
    slideIndex += 1;
    showSlide();
  });
 
  for (var i = 0; i < slideTotal; i++) {
    var thumbnail = $(".cslider ul li img").eq(i).attr("data-src");
    $(".cslider-thumbs").append("<img src=" + thumbnail + "/>").children().first().addClass("active");
  }
 
  $(".cslider-thumbs img").click(function() {
    clearInterval(slideshow);
    slideIndex = $(this).index();
    $(".cslider-thumbs img").removeClass("active");
    $(this).addClass("active");
    showSlide(slideIndex);
  });
});