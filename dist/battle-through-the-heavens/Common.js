/* Any JavaScript here will be loaded for all users on every page load. */

/* WAM Site-wide Installation */

// Automatically updates the countdown to the next scheduled reset time
function getNextSundayReset() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  let daysToSunday = (0 - day + 7) % 7;


  if(day === 0) {
    if(hour < 10 || (hour === 10 && minute === 0)) {
      daysToSunday = 0;
    } else {
      daysToSunday = 7;
    }
  }

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysToSunday,
    10, 0, 0, 0
  );
}


function updateCountdown() {
  const nextReset = getNextSundayReset();

  const yyyy = nextReset.getFullYear();
  const mm = String(nextReset.getMonth() + 1).padStart(2, '0');
  const dd = String(nextReset.getDate()).padStart(2, '0');
  const hh = String(nextReset.getHours()).padStart(2, '0');
  const mi = String(nextReset.getMinutes()).padStart(2, '0');
  const ss = String(nextReset.getSeconds()).padStart(2, '0');

  const dateStr = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  

  $('#weekly-reset-date').text(dateStr);
}


$(function() {
  updateCountdown();

  setInterval(updateCountdown, 60000); // Refresh every minute to handle weekly reset
});

//For random selection of articles using class count
$(document).ready(function() {
    $('.refresh-feed').each(function() {
        var $items = $(this).find('.feed-item');
        var total = $items.length;
        
        if (total > 0) {
            var randomIndex = Math.floor(Math.random() * total);
            $items.eq(randomIndex).css('display', 'block');
        }
    });
});

// For filtering source material template's gif
window.pPreview = window.pPreview || {};
window.pPreview.RegExp = window.pPreview.RegExp || {};

window.pPreview.RegExp.iimages = window.pPreview.RegExp.iimages || [];
window.pPreview.RegExp.iimages.push(/^2015060816373561467\.gif$/i);

window.pPreview.RegExp.noinclude = window.pPreview.RegExp.noinclude || [];
window.pPreview.RegExp.noinclude.push('.source-notice');

//For Adding Search Button + Season dropdown on DonghuaEpisodes Template
(function () {
    var SEASONS = {
        "Season 1":         { base: "Donghua Season 1/Episode", total: 12 },
        "Season 1: Remake": { base: "Donghua Season 1 Remake: Battle Through The Heavens: Origin/Episode", total: 3 },
        "Season 2":         { base: "Donghua Season 2/Episode", total: 12 },
        "Season 2 Special": { base: "Donghua Season 2 Special/Episode", total: 3 },
        "Season 3":         { base: "Donghua Season 3/Episode", total: 12 },
        "Season 4":         { base: "Donghua Season 4/Episode", total: 24 },
        "Season 4 Special": { base: "Donghua Special 3 Years Agreement/Episode", total: 13 },
        "Season 5":         { base: "Donghua Season 5/Episode", total: 219 }
    };

    function createEpCard(base, num) {
        var a = document.createElement("a");
        a.href = "/wiki/" + encodeURIComponent(base + " " + num);
        a.title = base + " " + num;
        a.innerHTML = '<span class="dh-ep-tag">EP</span><span class="dh-ep-num">' + num + '</span>';
        return a;
    }

    function initNav(nav) {
        var body = nav.querySelector(".dh-body");
        var head = nav.querySelector(".dh-head");
        var grid = nav.querySelector(".dh-grid");
        if (!grid) return;

        var titleEl = nav.querySelector("#dh-season-title");
        var initialSeason = "Season 5";
        if (titleEl) {
            var rawText = titleEl.textContent || "";
            for (var s in SEASONS) {
                if (rawText.indexOf(s) !== -1) {
                    initialSeason = s;
                    break;
                }
            }
        }

        var existingBar = nav.querySelector(".dh-bar");
        if (existingBar) {
            existingBar.parentNode.removeChild(existingBar);
        }

        var bar = document.createElement("div");
        bar.className = "dh-bar";

        var optionsHtml = "";
        for (var sName in SEASONS) {
            var sData = SEASONS[sName];
            var sel = (sName === initialSeason) ? ' selected="selected"' : '';
            optionsHtml += '<option value="' + sName + '"' + sel + '>' + sName + ' (' + sData.total + ' Eps)</option>';
        }

        bar.innerHTML =
            '<div class="dh-season-select-wrapper">' +
                '<label class="dh-season-label">Season:</label>' +
                '<select class="dh-season-dropdown">' + optionsHtml + '</select>' +
            '</div>' +
            '<div class="dh-sw">' +
                '<span class="dh-si">⌕</span>' +
                '<input class="dh-search" type="text" placeholder="Search episode…">' +
            '</div>' +
            '<span class="dh-count-bar">' +
                '<b class="dh-shown">0</b> / <b class="dh-total">0</b> episodes' +
            '</span>';

        if (body) {
            nav.insertBefore(bar, body);
        } else if (head && head.nextSibling) {
            nav.insertBefore(bar, head.nextSibling);
        } else {
            nav.appendChild(bar);
        }

        var dropdown = bar.querySelector(".dh-season-dropdown");
        var searchInput = bar.querySelector(".dh-search");
        var shownEl = bar.querySelector(".dh-shown");
        var totalEl = bar.querySelector(".dh-total");

        dropdown.addEventListener("change", function () {
            var selectedSeason = this.value;
            var sData = SEASONS[selectedSeason];
            if (!sData) return;

            var activeGrid = nav.querySelector(".dh-grid");
            if (!activeGrid) return;

            activeGrid.innerHTML = "";
            for (var i = 1; i <= sData.total; i++) {
                activeGrid.appendChild(createEpCard(sData.base, i));
            }

            var pillEl = nav.querySelector("#dh-season-pill");
            var footEl = nav.querySelector("#dh-foot-label");

            if (titleEl) titleEl.textContent = selectedSeason + " — Episodes";
            if (pillEl) pillEl.textContent = sData.total + " Episodes";
            if (footEl) footEl.textContent = "Donghua • " + selectedSeason;

            searchInput.value = "";
            updateFilter();
        });

        function updateFilter() {
            var cards = nav.querySelectorAll(".dh-grid a, .dh-grid .selflink");
            var q = searchInput.value.trim();
            var visible = 0;

            cards.forEach(function (card) {
                var numEl = card.querySelector(".dh-ep-num");
                var epNum = numEl ? numEl.textContent.trim() : "";
                var match = !q || epNum.indexOf(q) !== -1;
                card.style.setProperty("display", match ? "flex" : "none", "important");
                if (match) visible++;
            });

            if (shownEl) shownEl.textContent = visible;
            if (totalEl) totalEl.textContent = cards.length;
        }

        searchInput.addEventListener("input", updateFilter);
        updateFilter();
    }

    function init() {
        var navs = document.querySelectorAll(".dh-nav");
        navs.forEach(initNav);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

//Adding Prefix for InputUsername
function updateGreeting() {
    const span = document.querySelector('.InputUsername');
    const username = mw.config.get('wgUserName');
    if (!span) return;

    if (!username) {
        span.textContent = 'Hi there,';
        return;
    }

    if (span.textContent.trim() === username) {
        span.textContent = `Hi ${username},`;
    } else {
        setTimeout(updateGreeting, 100);
    }
}
setTimeout(updateGreeting, 200);

// Hide blocked template automatically when countdown reaches zero
$(function () {
    $(".blockNotice").each(function () {
    	var $notice = $(this);
    	var $date = $notice.find(".countdowndate");
    	
    	if ($date.length === 0) return;
    	
    	function check() {
    		var text = $date.text().trim();
    		if (!text) return;
    		
    		var expiry = new Date(text.replace(/-/g, "/"));
    		if (isNaN(expiry)) return;
    		
    		var now = new Date();
    		if (now >= expiry) {
    			$notice.fadeOut(300, function () {
    				$(this).remove();
    			});
    		}
    	}
    	check();
    	setInterval(check, 30000);
    });
});

//BackToTop button
window.BackToTopModern = true;

window.railWAM = {
    logPage:"Project:WAM Log"
};

window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:countdown/code.js'
    ]
});

window.ajaxRefresh = 60000;
window.ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Contributions',
    'Special:Log',
    'Special:Log/move',
    'Special:AbuseLog',
    'Special:NewFiles',
    'Special:NewPages',
    'Special:Watchlist',
    'Special:Statistics',
    'Special:ListFiles',
    'Category:Speedy_deletion_candidates',
    'Category:Speedy_move_candidates'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data },
        founder: {
            u: 'Founder',
            order: 1
        },
        bureaucrat: {
            u: 'Bureaucrat',
            order: 2
        },
        'former-bureaucrat': {
            u: 'Retired Bureaucrat',
            order: 3
        },
        sysop: {
            u: 'Administrator',
            order: 4
        },
        'former-sysop': {
            u: 'Retired Administrator',
            order: 5
        },
        'bot-global': {
            u: 'Global Bot',
            order: 7
        },
        bot: {
            u: 'Bot',
            order: 8
        },
        'content-moderator': {
            u: 'Dou Saint',
            order: 10
        },
        'former-content-moderator': {
            u: 'Retired Content Moderator',
            order: 11
        },
        threadmoderator: {
            u: 'Dou Venerate',
            order: 13
        },
        'former-threadmoderator': {
            u: 'Retired Discussion Moderator',
            order: 14
        },
        chatmoderator: {
            u: 'Dou Ancestor',
            order: 16
        },
        'former-chatmoderator': {
            u: 'Retired Chat Moderator',
            order: 17
        },
        rollback: {
            u: 'Dou Emperor',
            order: 19
        },
        'former-rollback': {
            u: 'Former Rollback',
            order: 20
        },
        calc: {
            u: 'Calc Group',
            order: 22
        },
        'former-calc': {
            u: 'Retired Calc Group',
            order: 23
        },
        tester: {
            u: 'Tester',
            order: 40
        },
        'js-helper': {
            u: 'JS Helper',
            order: 51
        },
        'css-helper': {
            u: 'CSS Helper',
            order: 52
        },
        'image-helper': {
            u: 'Image Helper',
            order: 53
        },
        'template-helper': {
            u: 'Templates Helper',
            order: 54
        },
        'human-resources': {
            u: 'Human Resources',
            order: 55
        },
        'former-human-resources': {
            u: 'Retired Human Resources',
            order: 56
        },        
        consultant: {
            u: 'Consultant',
            order: 100
        },
        bannedfromchat: {
            u: 'Banned from Chat',
            order: 500
        },
        inactive: {
            u: 'Inactive',
            order: 1 / 0
        }
    }
};
UserTagsJS.modules.inactive = {
    days: 30,
    // namespaces: [0, 'Talk', 'User', 'User talk', 'Forum'], // Only articles, talk pages, user pages, user talk pages or forums edits count, other Wikia namespace edits don't count
    zeroIsInactive: true // 0 edits = inactive
};
UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');
UserTagsJS.modules.autoconfirmed = true; // Switch on Autoconfirmed User check
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // If the expression is true then they will be marked as a new user
        // If the expression is false then they won't.
        // In this instance, newuser is removed as soon as the user gets 30
        // edits, OR as soon as they have been present for 10 days, whichever
        // happens first.
        return days < 10 && edits < 30;
    }
};
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator', 
    'chatmoderator',
    'patroller',
    'rollback',
    'bannedfromchat'
];
UserTagsJS.modules.custom = {
    'Iamtharusha': ['former-bureaucrat'],
    'Immortal Sovereign': ['bureaucrat','sysop'],
    'Ruenslayer': ['founder','former-bureaucrat'],
    'Flareboy123': ['former-sysop'],
    'Shacour': ['former-bureaucrat'],
    'Nonickfound':['former-sysop']
    
};
UserTagsJS.modules.metafilter = {
    // Remove inactive from all bureaucrats, sysops, bots, global bots, staff, wikia utility and vstf
    'inactive': [
        'sysop',
        'bureaucrat',
        'bot',
        'bot-global',
        'staff',
        'util',
        'vstf'
    ], 
    'sysop': ['bot', 'bot-global'], // Remove "Administrator" tag from bots and global bots
    'content-moderator': ['bureaucrat', 'sysop'], // Remove "Content Moderator" tag from bureaucrats and administrators
    'threadmoderator': ['bureaucrat', 'sysop'], // Remove "Discussions Moderator" tag from bureaucrats and administrators
    'chatmoderator': ['bureaucrat', 'sysop'], // Remove "Chat Moderator" tag from bureaucrats and administrators
    'rollback': ['bureaucrat', 'sysop'] // Remove "Rollback" tag from bureaucrats and administrators
};
// UserTagsJS.modules.stopblocked = true; //Enabled by default
//Manually turn off by changing true -> false
 
// Username script // 
(function () { 
const user = mw.config.get("wgUserName");
if (user) $('span.insertusername').text(user);
})();
 
// Bureaucrat promotion warning message //
!function() {
    if (mw.config.get("wgCanonicalSpecialPageName") !== 'Userrights') return;
    $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if ($('#wpGroup-bureaucrat').attr('checked') && !confirm('Do you truly want to appoint a bureaucrat?')) $('#wpGroup-bureaucrat').attr('checked', null);
    });
}();