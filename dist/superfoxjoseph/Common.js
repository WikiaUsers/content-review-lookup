/* Clock */
window.DisplayClockJS = '%X %x [%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w] (UTC)';

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
 
if (window.location.href == "/wiki/UserProfileTag:Data") {
    document.getElementById("WikiaArticleFooter").style.display = "none";
}
 
function UserProfileTag (username, customtag) {
  var CustomTag = document.createElement("span");
  CustomTag.innerHTML = customtag;
  CustomTag.className = "tag";
 
  var div;
 
  if (document.getElementsByClassName("tag")[0]) {
      div = document.getElementsByClassName("tag")[0];
  } else if (document.querySelectorAll("hgroup h2")[0]) {
      div = document.querySelectorAll("hgroup h2")[0];
  } else {
      div = document.querySelectorAll("hgroup h1")[0];
  }
 
  if (window.location.href == window.location.origin + "/wiki/User:" + username) {
      insertAfter(div, CustomTag);
  }
 
  if (window.location.href == window.location.origin + "/wiki/Message_Wall:" + username) {
      insertAfter(div, CustomTag);
  }
 
  if (window.location.href == window.location.origin + "/wiki/User_blog:" + username) {
      insertAfter(div, CustomTag);
  }
 
  if (window.location.href == window.location.origin + "/wiki/Special:Contributions/" + username) {
      insertAfter(div, CustomTag);
  }
}

function RemoveUndoAdmin() {
    $.get(mw.util.wikiScript(), {action: "raw", title: "UserProfileTag:Admins"}, function(data) {
        var mainData = JSON.parse(data);
        if (mainData.admins.includes(document.querySelectorAll("#lastEdited a")[0].innerText)) {
	        if (document.getElementsByClassName("button")[2]) {
		        document.getElementsByClassName("button")[2].outerHTML = "";
	        }
	        checkIfAdmin();
        }
    });
}

var myVar;

function myFunction() {
    myVar = setInterval(RemoveUndoAdmin, 2000);
}
 
var params = {
  action: 'raw',
  title: 'UserProfileTag:Data'
};
 
$.get(mw.util.wikiScript(), params, function(data) {
  var TagData = JSON.parse(data);
  Object.keys(TagData).forEach(function(value) {
      UserProfileTag(value, TagData[value]);
  });
});

 
/* Last edit header */
window.lastEdited = {
    avatar: true,
    size: true,
    diff: true,
    comment: true,
    time: 'timeago',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
 
SpoilerAlert = {
  pages: ["Spoiler"],
};

// Tags
window.UserTagsJS = {
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'discord fanoner',
            'discord founder',
            'imagecontroller'
        ],
        newuser: true
    }
};
 
// Tabber
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
    }
};
Tabs.init();
 
// Show username
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
}
$(userNameReplace);
 
// Add custom edit buttons
if (mw.config.get('mwCustomEditButtons'))
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://vignette.fandom.nocookie.net/sml/images/e/e1/O_Accent_Button.png/revision/latest?cb=20161208115611',
        'speedTip': 'Mark for deletion',
        'tagOpen': '<nowiki>{{delete|reason=',
        'tagClose': '}}</nowiki>',
        'sampleText': 'your reason here'
    };
    
       	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.fandom.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};

	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAXNSR0IArs4c6QAAAk9QTFRFAAAAgAAAAIAAgIAAAACAgACAAICAwMDAwNzApsrwAAAAQ1l4SGB7a3uQdYijhpixkKO9k6bAl6rEmq3HnrHLo7bQqLvVrb/YsMPds8bgus3nvc/owdTuxNjzydz20uT91+f+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTECL3QDwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCQccCQrY7AcAAACHSURBVCjPfchZDsMgEATR+jfOhldsSLj/JdNJjIRHKE+IHhW5qSe/Whz52dKRU4Jk/ekxQrTU9x12S33bYLPUQ4Bgqa8rrJb6ssBiqc8zzJb6NMFUlEt9HGEsyqk+DMBwKKe6954TBa/+kFP/BPV7Tfm76rca/Fb9WuNY9UuLo3ddVz194vo3NB0oZdoKj8sAAAAASUVORK5CYII=",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"
	};

	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.fandom.nocookie.net/clubpenguin/images/3/31/HighlightButton.png",
		"speedTip": "Highlight",
		"tagOpen": "<span style='background:yellow'>",
		"tagClose": "</span>",
		"sampleText": "Highlighted text here."
	};

	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.fandom.nocookie.net/central/images/5/56/Button_big.png",
		"speedTip": "Large Text",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Insert Text Here"
	};

	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.fandom.nocookie.net/central/images/5/58/Button_small.png",
		"speedTip": "Small Text",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Insert Text Here"
	};

	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.fandom.nocookie.net/central/images/f/fd/Button_underline.png",
		"speedTip": "<u>Underline Selected Text</u>",
		"tagOpen": "<u> ",
		"tagClose": " </u>",
		"sampleText": "Insert text to underline!"
	};

	    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCBEoGHtVh6UAAAAMaVRYdENvbW1lbnQAAAAAALyuspkAAAIYSURBVDjLtVW7ihRBFD13uvYxa2hmICIo4scIJgqCoOAPmAhGfoEYGGxiIisL/oCIoIEiGGhiZKDsKLg7jbrs4AxOd92HQVXPw77twqKVnOCcunWq7rkUmZnhP6w797YQBvuAmYGIXARwJO7j7jeEKI3xLjwaFytFr65qTKsai3j71k3cuHYFg8GgxTW4/eghrl+9jGdPn7gaM0MwSoct4mDnE0YHBxiPfyYvjmZv9yvK4R7KctihIQRmbXcj31DFIKJuw5oYqPoaMkNgjm6jAECUIcJuw8w0FxdXQ0QIIgwygxHN0LJ1ZYbEeombaVTzDdTXGBBULZ+GGc6dG1iXuQY139AMrgYwhLqOnW9elkMUYcV988lkkgyIIEZ2FIQgIl21sXn/7qGTmBrarkGE9OZd1s+eO4+NjWNu0S+fd7D/43t6c7cGchRzNmeYrV+4eAknT51e5jJubz3Am9cvoWpg0ZZGU/Ho7QUAMDNijC2OAGhOi6j4GjOEyJxanto8RwDCAo6xzRHBNMdV1NeAEIS5wzcgqnn62ndrhk3/oslp+WPjLAmak9DeOM+5uRoiQmARENJUNti4FxGIyBLX4Hz81deYITSNWVxFEVJWewRRcWPW6xVZW3RoCLT5+EXrm2NmqAhW19Y6h8dMUU0rrPf7Lv/81TuE0WjcWeDXNB46oVXt719dLxDevv/wzz/nlX7AmRPH8RuTxxRrcgmtcAAAAABJRU5ErkJggg==",
		"speedTip": "History table",
		"tagOpen": "{|class=\"wikitable sortable\"\n! scope=\"col\"| Catalog\n! scope=\"col\"| Available from\n! scope=\"col\"| Available until\n|-\n|catalog goes here\n|starting date\n|ending date\n|}",
	};
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.fandom.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
        'speedTip': 'Add the ō character',
        'tagOpen': 'ō',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.fandom.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
        'speedTip': 'Add the ū character',
        'tagOpen': 'ū',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.fandom.nocookie.net/naruto/images/7/79/Button_reflink.png',
        'speedTip': 'Add a reference',
        'tagOpen': '<ref>',
        'tagClose': '</ref>',
        'sampleText': ''
    };
    
        mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png',
        'speedTip': 'Add a Facebook like button',
        'tagOpen': '<fb:like>',
        'tagClose': '</fb:like>',
        'sampleText': ''
    };
    
        mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png',
        'speedTip': 'Add a Facebook share button',
        'tagOpen': '<fb:share-button>',
        'tagClose': '</fb:share-button>',
        'sampleText': ''
    };
    
        mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://vignette.fandom.nocookie.net/sfj/images/f/f7/Twitter.png/revision/latest?cb=20170122231631',
        'speedTip': 'Add a Twitter follow button',
        'tagOpen': '<div class="twitter-follow-button" data-href="https://twitter.com/username" data-show-count="false">Follow @username',
        'tagClose': '</div>',
        'sampleText': ''
    };
    
        mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://vignette.fandom.nocookie.net/sfj/images/f/f7/Twitter.png/revision/latest?cb=20170122231631',
        'speedTip': 'Add a Twitter tweet button',
        'tagOpen': '<span id="twitter-tweet-button">',
        'tagClose': '</span>',
        'sampleText': ''
    };
    
        mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://blog.agilebits.com/wp-content/uploads/2015/01/Tumblr-icon.png',
        'speedTip': 'Add a Tumblr share button',
        'tagOpen': '<span class="tumblr-share-button">',
        'tagClose': '</span>',
        'sampleText': ''
    };
	
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
 
// SocialIcons config
var SocialMediaButtons = {
	position: "top",
	colorScheme: "color"
};
 
AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

/* .username is the same class for the 'Edited by' section of Wall/Blog/Forum posts
    This should be changed to something more specific to not conflict
$('.username').text(mw.config.get('wgUserName'));
*/

function addTwitterFollowButton() {
   $('#twitter-follow-button').append('<a href="http://twitter.com/SuperFoxJoseph" class="twitter-follow-button" data-show-count="false">Follow @SuperFoxJospeh</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterFollowButton);

function addTwitterTweetButton() {
$('#twitter-tweet-button').append('<a class="twitter-share-button" href="http://twitter.com/intent/tweet">Tweet</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterTweetButton);

function addLinkedInButton() {
$('#linkedin-button').append('<script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: + mw.config.get("wgUserLanguage") + mw.config.get("wgUserLanguage").toUpperCase() + </script><script type="IN/Share"></script></span>');
}
$(addLinkedInButton);

//<syntaxhighlight lang="javascript">
$('#tumblr-share-button').ready(function(){
$('#tumblr-share-button').append('<span id="tumbonerButton"><a class="tumblr-share-button" id="tumblrShareButton1" data-color="white" data-posttype="link" href="https://embed.tumblr.com/share"></a></span>');
!function(d,s,id){
	var js, ajs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src="https://secure.assets.tumblr.com/share-button.js";
		ajs.parentNode.insertBefore(js,ajs);
	}
}(document, "script", "tumblr-js");
});
//</syntaxhighlight>

function addSinaWeiboButton() {
$('#sinaweibo-button').append('<html xmlns:wb="http://open.weibo.com/wb"><script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>');
}
$(addSinaWeiboButton);

function addTwitterMessageButton() {
$('#twitter-message-button').append('<a href="https://twitter.com/messages/compose?recipient_id=3805104374" class="twitter-dm-button" data-screen-name="@superfoxjoseph">Message</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterMessageButton);

function addFlipboardFlipButton() {
$('#flipboard-flip-button').append('<a data-flip-widget="flipit" href="https://flipboard.com">Add to Flipboard Magazine.</a><script src="https://cdn.flipboard.com/web/buttons/js/flbuttons.min.js" type="text/javascript"></script>');
}
$(addFlipboardFlipButton);

// Add Twitter timeline to sidebar by GTR19Hoody from psychodreams.fandom.com
$(window).load(function() {
     $('.ChatModule').after('<section class="module" id="twittermodule"><a class="twitter-timeline" data-height="380" href="https://twitter.com/SFJWiki">Tweets by SFJWiki</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
});

//DiscussionsActivity config
window.rdaSubtitleLinksPages = {
    RecentChanges: {
        links: ['DiscussionsRC'],
    },
    DiscussionsRC: {
        title: 'Recent Discussions changes',
        links: ['RecentChanges'],
    },
    WikiActivity: {
        links: ['WikiActivity/watchlist', 'RecentChanges', 'DiscussionsActivity', 'DiscussionsRC']
    },
    DiscussionsActivity: {
        links: ['WikiActivity']
    },
    'WikiActivity/watchlist': {
        links: ['WikiActivity', 'RecentChanges', 'DiscussionsActivity', 'DiscussionsRC']
    }
};