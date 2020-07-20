/* Any JavaScript here will be loaded for all users on every page load. */

// "Username" template - from Avatar Wiki

$(function() {
  if (typeof wgUserName != 'undefined') {
     $('.insertusername').html(wgUserName);
  }
});