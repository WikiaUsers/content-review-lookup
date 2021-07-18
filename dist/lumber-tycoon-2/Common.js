
/* Ajax, AutoRefresh */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Modernizes BackToTopButton */
window.BackToTopModern = true;

/* Cross-Wiki Block log check */
TBL_GROUP = "roblox-en";

//To help avoid confusion over the Fanon: pages, this message will be displayed under the title's of all pages in the fanon namespace
$('.ns-112 .page-header__bottom').each(function() {
  $(this).after($('<span>').html("<h3><b><i>This is not real game content, it is fan made!</i></b></h3>"));
});