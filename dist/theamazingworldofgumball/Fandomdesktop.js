// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: { link: 'Special:ListUsers/bureaucrat' },
        bot: { link: 'Special:Listusers/bot' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        patroller: { link: 'Special:ListUsers/patroller' },
        rollback: { link: 'Special:ListUsers/rollback' },
        sysop: { link: 'Special:ListUsers/sysop' },
        imagecontroller: { link: 'Special:ListUsers/imagecontroller' }
    },
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
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
});
 
// Add custom edit buttons
if (mw.config.get('mwCustomEditButtons')) {
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png',
        'speedTip': 'Request deletion',
        'tagOpen': '{{delete|reason=',
        'tagClose': '}}',
        'sampleText': 'your reason here'
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
        'speedTip': 'Add the ō character',
        'tagOpen': 'ō',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
        'speedTip': 'Add the ū character',
        'tagOpen': 'ū',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
        'speedTip': 'Add a reference',
        'tagOpen': '<ref>',
        'tagClose': '</ref>',
        'sampleText': ''
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
 
// Message wall icons
// By [[User:AnimatedCartoons]]
// Do not use underscores (_)
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/InvaderrrZIM|PhoenixKenny|Klonoamiyumi/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/MarvinDarwin|Fenton127/g)) {
            $(this).addClass('chat-mod');
        }
        
        if ($user.match(/|Blue Pant.|SomnoticAgama/g)) {
            $(this).addClass('patroller');
        }
        if ($user.match(/202nd Skywalker|Gameuser10/g)) {
            $(this).addClass('admin');
        }
        if ($user.match(/Villicus/g)) {
            $(this).addClass('bot');
        }
    });
}, 1000);
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

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

document.querySelectorAll(".cslider ul li img").forEach(function(i) {
  var thumbnail = '';
  if (i.classList.contains('lazyload')) {
    thumbnail = i.getAttribute('data-src');
  } else {
    thumbnail = i.getAttribute('src');
  }
  $(".cslider-thumbs").append("<img src=" + thumbnail + "/>").children().first().addClass("active");
});

  $(".cslider-thumbs img").click(function() {
    clearInterval(slideshow);
    slideIndex = $(this).index();
    $(".cslider-thumbs img").removeClass("active");
    $(this).addClass("active");
    showSlide(slideIndex);
  });
});

// Time template

(function () {
    function getDefaultTimeFormat() {
        var formatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', hourCycle: 'h12' });
        var options = formatter.resolvedOptions();
        return options.hourCycle === 'h12' ? '12-hour' : '24-hour';
    }

    function isDSTActive(currentMonth, dstStart, dstEnd) {
        if (dstStart <= dstEnd) {
            return currentMonth >= dstStart && currentMonth < dstEnd;
        } else {
            return currentMonth >= dstStart || currentMonth < dstEnd;
        }
    }

    function updateTime() {
        var elements = document.querySelectorAll('.display-time');
        var date = new Date();
        var currentMonth = date.getMonth() + 1;
        var timeFormat = getDefaultTimeFormat();

        elements.forEach(function (i) {
            var timeZone = parseFloat(i.getAttribute('data-timezone'));
            if (isNaN(timeZone)) return;
            
            var dst = i.getAttribute('data-dst') === "true";
            if (dst) {
                var dstStart = parseInt(i.getAttribute('data-dst-start'), 10) || 3;
                var dstEnd = parseInt(i.getAttribute('data-dst-end'), 10) || 11;
                
                // Check if DST is active
                if (isDSTActive(currentMonth, dstStart, dstEnd)) {
                    timeZone += 1; // Add 1 hour for DST
                }
            }
            
            // Calculate time
            var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
            var userTime = new Date(utc + (timeZone * 3600 * 1000));
            
            // Format time
            var hour = userTime.getHours();
            var minute = userTime.getMinutes().toString().padStart(2, '0');
            var timeString;
            
            if (timeFormat === '24-hour') {
                timeString = hour.toString().padStart(2, '0') + ':' + minute;
            } else {
                timeString = (hour % 12 === 0 ? 12 : hour % 12) + ':' + minute + ' ' + (hour >= 12 ? 'PM' : 'AM');
            }
            i.innerText = timeString;
        });
    }
    setInterval(updateTime, 1000);
})();

// Edit count template

(function() {
	var elements = document.querySelectorAll('.editcount');
	elements.forEach(function(i) {
		var username = i.getAttribute('data-user');
		if (username) {
			fetch('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(username)).then(function(response) {
				response.json().then(function(obj) {
					var userId = obj.query.users[0] ? obj.query.users[0].userid : null;
					if (userId) {
						fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + userId.toString()).then(function(response2) {
							response2.json().then(function(obj2) {
								i.innerText = obj2.userData.localEdits ? obj2.userData.localEdits.toString() : '0';
							});
						});
					}
				});
			});
		}
	});
})();

// Active since template

(function() {
	var elements = document.querySelectorAll('.user-active-since');
	elements.forEach(function(i) {
		var username = i.getAttribute('data-user');
		if (username) {
			fetch('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(username)).then(function(response) {
				response.json().then(function(obj) {
					var userId = obj.query.users[0] ? obj.query.users[0].userid : null;
					if (userId) {
						fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + userId.toString()).then(function(response2) {
							response2.json().then(function(obj2) {
								i.innerText = obj2.userData.registration ? obj2.userData.registration : '';
							});
						});
					}
				});
			});
		}
	});
})();

// Automate user status

(function() {
	function getUserState(username) {
	    var THIRTY_DAYS_MS = 30 * 86400 * 1000;
	    var SIXTY_DAYS_MS = 60 * 86400 * 1000;
	    return fetch('/api.php?action=query&format=json&list=usercontribs&uclimit=10&ucuser=' + encodeURIComponent(username) + '&ucprop=timestamp').then(function (response) {
	        if (!response.ok) {
	            console.error('Network response was not ok: ' + response.status);
	            return 'error';
	        }
	        return response.json();
	    }).then(function (data) {
	        var contribs = data.query && data.query.usercontribs;
	        if (!contribs || contribs.length === 0) {
	            return 'inactive';
	        }
	        var now = Date.now();
	        var close = now - new Date(contribs[0].timestamp).getTime();
	        if (contribs.length < 10) {
	            return close < SIXTY_DAYS_MS ? 'semi-active' : 'inactive';
	        }
	
	        var far = now - new Date(contribs[9].timestamp).getTime();
	        if (far < THIRTY_DAYS_MS) {
	            return 'active';
	        } else if (close < SIXTY_DAYS_MS) {
	            return 'semi-active';
	        } else {
	            return 'inactive';
	        }
	    }).catch(function (error) {
	        console.error('Error fetching user state:', error);
	        return 'error';
	    });
	}
	
	function updateUserStates() {
	    document.querySelectorAll('.user-active-state').forEach(function (element) {
	        var username = element.getAttribute('data-user'); // Get the "data-user" attribute
	        if (!username) {
	            console.error('Missing "data-user" attribute on element:', element);
	            return;
	        }
	        getUserState(username).then(function (state) {
	            var statusText = '';
	            var backgroundColor = '';
	            if (state === 'active') {
	                statusText = 'ACTIVE';
	                backgroundColor = 'lime';
	            } else if (state === 'semi-active') {
	                statusText = 'SEMI ACTIVE';
	                backgroundColor = 'yellow';
	            } else if (state === 'inactive') {
	                statusText = 'INACTIVE';
	                backgroundColor = 'red';
	            } else {
	                statusText = 'ERROR';
	                backgroundColor = 'gray';
	            }
	            element.innerText = statusText;
	            element.style.backgroundColor = backgroundColor;
	        }).catch(function (error) {
	            console.error('Failed to get state for user:', username, error);
	            element.innerText = 'ERROR';
	            element.style.backgroundColor = 'gray';
	        });
	    });
	}
	updateUserStates();
})();