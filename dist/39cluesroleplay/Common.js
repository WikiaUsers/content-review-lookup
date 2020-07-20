/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
  $('.page-User_Swordcross .masthead-info hgroup .group').html('Co-founder');
});

$(function() {
  $('.page-User_blog_Swordcross .masthead-info hgroup .group').html('Co-founder');
});

$(function() {
  $('.page-User_talk_Swordcross .masthead-info hgroup .group').html('Co-founder');
});

$(function() {
  $('.page-User_Kangaroopower .masthead-info hgroup .group').html('Co-founder');
});

$(function() {
  $('.page-User_blog_Kangaroopower .masthead-info hgroup .group').html('Co-founder');
});

$(function() {
  $('.page-User_talk_Kangaroopower .masthead-info hgroup .group').html('Co-founder');
});

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);