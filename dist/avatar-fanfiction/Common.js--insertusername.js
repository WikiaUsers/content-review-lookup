/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */

if (mw.config.get('wgUserName') != 'null') {
  $('.insertusername').text(mw.config.get('wgUserName'));
}

/* Modification of class="insertusername" mechanic; crucial for some templates
 * Anonymous users will see any content appended after the pipe of {{USERNAME|<content>}}
 * By [[User:KettleMeetPot]]
 */

$(document).ready(function () {
  if ( $.inArray("user", mw.config.get('wgUserGroups')) == -1 ) {
    $('.insertusername').each(function () {
      var id = $(this).prop("id");
      $(this).text(id);
    });
  }
});