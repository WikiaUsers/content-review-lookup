// 11:36, November 5, 2016 (UTC)
// <source lang="JavaScript">

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent(wgUserName) +'">My contributions</a></li><li><a href="/wiki/Special:Watchlist/'+ encodeURIComponent(wgUserName) +'">My watchlist</a></li><li><a href="/wiki/Special:Following">Followed pages</a></li>').insertAfter($('.wds-global-navigation__user-menu .wds-dropdown__content li a[data-tracking-label="global-navigation-user-my-preferences"]').parent());
}
if(!window.CustomButtonsLoaded)
  $(AddNavigationLinks);
var CustomButtonsLoaded = true;

// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

// </source>