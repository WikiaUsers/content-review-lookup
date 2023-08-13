/* Username replace function by Splarka */
function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(mw.config.get('wgUserName'));
}
$(UserNameReplace);