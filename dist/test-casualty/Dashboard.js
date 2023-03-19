 /* Restores Normal Header To Special Pages */
function ADHeader() {
	$('header.AdminDashboardHeader').before('<header id="WikiaPageHeader" class="WikiaPageHeader"><h1>' + wgTitle + '</h1><h2>Special page</h2><form id="WikiaSearch" class="WikiaSearch" action="index.php?title=Special:Search" method="get"><input type="text" name="search" placeholder="Search Casualty Test Wiki" autocomplete="off" accesskey="f"><input type="hidden" name="fulltext" value="0"><input type="submit"><button class="secondary"><img src="https://images.wikia.nocookie.net/__cb40945/common/skins/common/blank.gif" class="sprite search" height="17" width="21"></button></form></header>');

var productElement = document.getElementById("ajaxRefresh");
if (productElement != null)
{
  $('header.AdminDashboardHeader h1 a').css({"display": 'none'});
  $('header.AdminDashboardHeader h1').css({"margin-top": '-12px'});
  $('header.AdminDashboardHeader').css({"height": '25px'});
  $('header.AdminDashboardHeader').css({"padding-left": '5px'});
  $('header.AdminDashboardHeader').css({"background": 'transparent !important'});
  $('header.AdminDashboardHeader').css({"border": '0px'});
  $('header.AdminDashboardHeader').css({"display": 'block !important'});
}
}
$(ADHeader)