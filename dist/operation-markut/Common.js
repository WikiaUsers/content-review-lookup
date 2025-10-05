/**** Any JavaScript here will be loaded for all users on every page load. ****/

/* Auto-Refresh */
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:WikiActivity',
    'Special:Log',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
        blocked:            { u:'Banned', order: 0 },
        bureaucrat:         { u:'Bureaucrat', link:'4Classic Wiki:Staff', order: 1 },
        sysop:              { u:'Administrator', link:'4Classic Wiki:Staff', order: 2 },
        'content-moderator':{ u:'Content Moderator', link:'4Classic Wiki:Staff', order: 3 },
        threadmoderator:    { u:'Forum Moderator', link:'4Classic Wiki:Staff', order: 4  },
        chatmoderator:      { u:'Chat Moderator', link:'4Classic Wiki:Staff', order: 5 },
        rollback:           { u:'Rollback', link:'4Classic Wiki:Staff', order: 6 },
        '4classic-gm':      { u:'4Classic GM'}
    }
};

UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bannedfromchat',
    'bot',
    'bot-global',
    'bureaucrat', 
    'chatmoderator',
    'rollback',
    'sysop',
    'threadmoderator',
    'content-moderator',
    '4classic-gm'
];
/*UserTagsJS.modules.custom = {
    'NAME': ['4classic-gm']
};*/
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'moderator': ['sysop', 'bureaucrat'],
    'rollback': ['moderator']
};

/* UserTagsJS.modules.inactive = 90; //Sets an inactive tag after 90 days */

/* RevealAnonIP */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'moderator']
};

// Float any links in the game box widget
$(".game-box").each(function() {
    var $this = $(this),
        anchor = $this.find(".game-name a");
    if (!anchor || $this.parents(".game-box-link").length > 0)
        return;
    $this.wrap($("<a>", {
        class: "game-box-link",
        href: anchor.attr("href"),
        title: anchor.attr("title")
    }));
    $this.find("a").attr("tabindex", "-1");
});

// Importing from dev.fandom.com
// See the pages for the code.
 importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:UserTags/code.js',
    ]
});

/* ECharts – delayed display against JSON flash */
(function () {
  var REVEAL_DELAY = 500; // ms

  function wrap(el) {
    if (el._wrapped) return;
    var holder = document.createElement('div');
    holder.className = 'echarts-holder';
    el.parentNode.insertBefore(holder, el);
    holder.appendChild(el);
    var overlay = document.createElement('div');
    overlay.className = 'echarts-loading';
    overlay.textContent = 'Loading…';
    holder.appendChild(overlay);
    el._wrapped = true;
  }

  function revealAfterDelay(el) {
    setTimeout(function () {
      el.classList.add('echarts-ready');
      var p = el.parentElement;
      if (p && p.classList.contains('echarts-holder')) p.dataset.ready = '1';
    }, REVEAL_DELAY);
  }

  function observe(el) {
    wrap(el);
    var mo = new MutationObserver(function () {
      if (el.querySelector('canvas, svg')) {
        revealAfterDelay(el);
        mo.disconnect();
      }
    });
    mo.observe(el, { childList: true, subtree: true });
    if (el.querySelector('canvas, svg')) {
      revealAfterDelay(el);
      mo.disconnect();
    }
  }

  function initIn($root) {
    ($root || document).querySelectorAll('.echarts').forEach(observe);
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(function ($content) {
      initIn($content && $content[0] ? $content[0] : document);
    });
  } else {
    $(initIn);
  }
})();