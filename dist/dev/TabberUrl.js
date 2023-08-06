/**
 * Automatically activates Tabber tabs based on the URL.
 * 
 * Setup:
 * Add the attribute data-tab="tabname" to or within the tabs.
 * The name "tabname" must be restricted to alphanumeric characters, spaces ( ) and dashes (-):
 * Viable targets for the attribute are the .wds-tabs__tab, .wds-tab__content node or anywhere within these nodes.
 * 
 * Usage:
 * Add the query parameter ?tabber-active=tabname to the URL. 
 * When the page loads, the script will automatically activate any tab with a matching attribute.
 * This allows linking to the same wiki page with different tabs active.
 * Combine this with an anchor link (/wiki/Page?tabber-active=test#Section) for a seamless experience.
 * 
 * Remarks:
 * To support multiple Tabbers the query parameter can be repeated.
 * Take special care to use unique names; only the last match within the same Tabber will be active.
 * 
 * PS. I hate ES5.
 * 
 * @author Silverfeelin
 * @license WTFPL
 */
(function () {
  // Load once.
  window.TabberUrl = window.TabberUrl || {};
  if (window.TabberUrl.loaded) return;
  window.TabberUrl.loaded = true;

  function init() {
    // Check URL for active tabs.
    var url = new URL(location.href);
    var qs = url.searchParams.getAll("tabber-active");
    // Match input against whitelist.
    if (!qs || !qs.length || qs.some(function(q) { return q.match(/[^a-zA-Z0-9 -]+/g); })) return;
  
    qs.forEach(function(q) {
      // Match tab by data-tab attribute. Fallback to check content within tabs.
      var tab = document.querySelector('.wds-tabs__tab[data-tab="' + q + '"], .wds-tab__content[data-tab="' + q + '"]');
      if (!tab) {
        tab = document.querySelector('.wds-tabs__tab [data-tab="' + q + '"], .wds-tab__content [data-tab="' + q + '"]');
        tab = tab && tab.closest('.wds-tabs__tab, .wds-tab__content');
      }
      if (!tab) {
        tab = document.querySelector('.wds-tabs__tab [title="' + q + '"], .wds-tab__content [title="' + q + '"]');
        tab = tab && tab.closest('.wds-tabs__tab, .wds-tab__content');
      }
      if (!tab) return;  
      var  i = Array.prototype.slice.call(tab.parentElement.children).indexOf(tab);
      
      var tabber = tab.closest('.wds-tabber');
      tabber.querySelectorAll('.wds-tabs__tab').forEach(function(t, j) {
        t.classList.toggle('wds-is-current', i === j);
      });
      tabber.querySelectorAll('.wds-tab__content').forEach(function(t, j) {
        t.classList.toggle('wds-is-current', i === j);
      });
    });
  }

  document.readyState === 'loading'
    ? window.addEventListener('DOMContentLoaded', init)
    : init();
})();