/* Any JavaScript here will be loaded for all users on every page load. */

/* AjaxRC: see http://dev.wikia.com/wiki/AjaxRC) */
window.ajaxPages = [ "Special:WikiActivity"
                   , "Special:RecentChanges"
                   , "Special:Watchlist"
                   , "Special:Log" ];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/**
 * Displays the current user's username.
 * See Template:USERNAME for additional infos.
 */
$(function() {
    /* disabled in main namespace */
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null || mw.config.get('wgNamespaceNumber') === 0) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* Temporary theme-selector to showcase differnt new themes */

$(function()
{
  if(mw.config.get("wgPageName") !== 'User:NoWayThisUsernameIsAlreadyOwnedBySomeone/Sandbox')
  {
    return;
  }
  
  $(".WikiaMainContent").prepend('<select id="new-infobox-theme-selector"><option value="default">Default Theme</option><option value="dark">Dark Theme</option><option value="yellow">Simpsons Theme</option></select>');
  $("#new-infobox-theme-selector").change(function()
  {
    var selectedValue = $('option:selected', $(this)).val();
    
    $('.portable-infobox').removeClass('pi-theme-dark').removeClass('pi-theme-yellow');
    
    if(selectedValue != 'default')
    {
      $('.portable-infobox').addClass('pi-theme-' + selectedValue);
    }
  });
});