/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('ShowHide/code.js', 'dev');

window.MassCategorizationGroups = ['sysop', 'content-moderator'];
window.MassEditConfig = {
  interval: 1600,
  placement: {
    element: "tools",
    type: "prepend"
  }
};