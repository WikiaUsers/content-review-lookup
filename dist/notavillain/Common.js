/* Any JavaScript here will be loaded for all users on every page load. */

if (window.location.pathname === '/wiki/Poll') {
  // only change the Poll page
  $('#archivePolls input').hide();
}