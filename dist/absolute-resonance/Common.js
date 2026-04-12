/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'User:Godof.FlameWater' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}

/* ================================ 
   UserTags Config
   Displays custom titles
================================ */
window.UserTagsJS = {
    modules: {},
    tags: {
        founder: { u: 'Founder', order: 1 },
        bureaucrat: { u: 'Absolute Ruler', order: 2 },
        'former-bureaucrat': { u: 'Retired Bureaucrat', order: 3 },
        sysop: { u: 'Ruler', order: 4 },
        'former-sysop': { u: 'Retired Administrator', order: 5 },
        'bot-global': { u: 'Global Bot', order: 6 },
        bot: { u: 'Bot', order: 7 },
        'content-moderator': { u: 'Emperor', order: 10 },
        threadmoderator: { u: 'King', order: 11 },
        rollback: { u: 'Duke', order: 13 },
        bannedfromchat: { u: 'Banned from Chat', order: 20 },
        inactive: { u: 'Inactive', order: Infinity } 
    }
};

// Inactive users module (using UserTagsJS)
UserTagsJS.modules.inactive = {
    days: 30, 
    text: 'Inactive', 
    warning: {
        text: 'This user has been inactive for %s days.', 
        days: 7 
    }
};

// Autoconfirmed users module
UserTagsJS.modules.autoconfirmed = true;

// New user module
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // Users are considered "new" if they have less than 7 days AND less than 20 edits
        return days < 7 && edits < 20;
    }
};

// MediaWiki groups to include
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'bannedfromchat'
];

/* ================================
   MultiClock config (UTC+8)
   ================================ */
window.MultiClockConfig = {
  interval: 500,
  clocks: [
    {
      label: "UTC+8",
      offset: 8,
      color: "#ffffff",
      format: "%H:%M:%S %d %b %Y"
    }
  ]
};

// BackToTopButton Config 
window.BackToTopModern = true;

// LockOldComments Config
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 365;
window.lockOldComments.addNoteAbove = true;

// Hide blocked template automatically when countdown reaches zero, from BTTH wiki
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

// Automatically updates the countdown to the next scheduled reset time, from BTTH wiki
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