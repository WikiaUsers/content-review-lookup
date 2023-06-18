/* Pride toolbar button */
var toolbarLabel = 'Pride';
var toolbarLinks = [
    {link: 'https://open.spotify.com/playlist/0wItHPtLJBq7BBFdmXfbtW', label: 'Pride spotify playlist'},
    {link: 'https://community.fandom.com/wiki/User_blog:Idekmandy/Fandom_Celebrates_Pride_Month:_Looking_Back_%26_Moving_Forward_With_the_Queens_of_RuPaul%27s_Drag_Race', label: 'Pride blog with Drag Queens interview'},
    {link: 'https://muppet.fandom.com/wiki/Forum:Celebrate_Pride_Month,_love,_and_acceptance_with_Fandom_and_the_Muppet_Wiki!', label: 'Forum post'},
    {link: 'https://community.fandom.com/wiki/User_blog:Idekmandy/Editor_Stories:_Fandom_Celebrates_Pride_With_Itsbartbytheway', label: 'Pride Stories: Celebrate with Itsbartbytheway'}
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">Pride Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* SORT WHATLINKSHERE ALPHABETICALLY BEGIN */

(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')) ? 1 : -1;
    });
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

/* SORT WHATLINKSHERE ALPHABETICALLY END */



/* DEV INACTIVEUSERS BEGIN */

InactiveUsers = { 
    months: 6,
    gone: ['username1', 'username2'],
    text: 'inactive'
};

/* DEV INACTIVEUSERS END */


/* COMMA IN CONTRIBS USER HEADER BEGIN */

$(function() {
  var selector = '#userProfileApp .user-identity-stats strong';
  function prettify(strongs) {
    strongs.forEach(function(strong, i) {
      var text = strong.textContent;
      if (text.length > 3 && text.indexOf(',') === -1) {
        strong.textContent = parseInt(text).toLocaleString('en', {useGrouping:true});
      }
    })
  }
  mw.hook('wikipage.content').add(function($content) {
    var strongs = document.querySelectorAll(selector);
    if (strongs.length) {
      prettify(strongs);
    } else {
      // alternatively, run a setInterval or setTimeout.
      new MutationObserver(function(mutations, observer) {
        var strongs = document.querySelectorAll(selector);
        if (strongs.length) {
          observer.disconnect();
          prettify(strongs);
        }
      }).observe(document.querySelector('.page__main'), {
        childList: true, // observe direct children
        subtree: true, // and lower descendants too
      });
    }
  });
});

/* COMMA IN CONTRIBS USER HEADER END */


/* LINK ON RAIL ACTIVITY BOX BEGIN */

$('#WikiaRail').on('afterLoad.rail', function() {
  const recentChangesLink = $('<a/>').attr('href', '/wiki/Special:RecentChanges');
  const wikiActivityRailHeader = $('#wikia-recent-activity.rail-module.recent-wiki-activity .rail-module__header');
  recentChangesLink.append(wikiActivityRailHeader.html());
  wikiActivityRailHeader.empty().prepend(recentChangesLink);
});

/* LINK ON RAIL ACTIVITY BOX END */