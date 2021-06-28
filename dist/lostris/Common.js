/* Any JavaScript here will be loaded for all users on every page load. */

if (wgUserName != 'null') {
  $('.insertusername').html(wgUserName);
}

/* Modification of class="insertusername" mechanic; crucial for some templates
 * Anonymous users will see any content appended after the pipe of {{USERNAME|<content>}}
 * By [[User:KettleMeetPot]]
 */

$(document).ready(function () {
  if ( $.inArray("user", wgUserGroups) == -1 ) {
    $('.insertusername').each(function () {
      var id = $(this).prop("id");
      $(this).html(id);
    });
  }
});