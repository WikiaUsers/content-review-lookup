/* Username replace function by Splarka */
function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
}
$(UserNameReplace);

/* Discord */
if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "597627758436417557"
        }
    };
}