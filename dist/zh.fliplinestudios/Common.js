$('.insertusername').text(mw.config.get('wgUserName'));
/*MassEdit*/
window.MassEditConfig = {
  interval: 2500,
  placement: {
    element: "toolbar",
    type: "append"
  }
};

/*自動刷新*/
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1468579810/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';