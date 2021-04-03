/* Any JavaScript here will be loaded for users using the Hydra skin */

// Fix li element when visiting User profiles
if (mw.config.get('wgNamespaceNumber') === 202) {
    $('li#ca-userprofile').addClass('selected');
    $('li#ca-user').removeClass('selected');
}