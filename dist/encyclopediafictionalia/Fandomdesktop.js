// <pre>
/* global mw, $, console */

$(function () {
  // Timestamp (eases checking of new code)
  console.log("MediaWiki:Common.js last updated: 15:35, 29 April 2022 (UTC)");

  /**
   * General scripts
   */
  // Redirect Special:Forum to Forum:Index
  if (mw.config.get("wgPageName") === "Special:Forum") {
    $(".page-header__title").text("Redirecting...");
    $("#mw-content-text").html(
      'Redirecting to <a href="/wiki/Forum:Index">Forum:Index</a>'
    );
    window.location = "https://templates.fandom.com/wiki/Forum:Index";
  }
  
  // Archive edit button
  function archiveButton() {
    
    // Checks
    
    if (!/(sysop|helper|soap|staff|content-moderator|rollback|wiki-representative|wiki-specialist|content-volunteer)/.test(mw.config.get('wgUserGroups').join(' '))) return
    if (mw.config.get("wgNamespaceNumber") !== '110') return
    
    const api = new mw.Api()
    const result = api.get({
      action: "query",
      titles: mw.config.get("wgPageName"),
      
    });
    const obj = JSON.parse(result);
    
    obj["timestamp"]
  }
});