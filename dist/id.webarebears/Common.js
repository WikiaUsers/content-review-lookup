/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
//Add border color to infoboxes
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

//Add username alt attribute to masthead profile so highlight css works there
$(function () {
    if (!mw.config.get('profileUserName')) {
        return;
    }

    if ($('#userProfileApp .user-identity-avatar__image').length) {
    	$('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    	return;
    }

    var interval = setInterval(function () {
        if (!$('#userProfileApp .user-identity-avatar__image').length) {
            return;
        }
        clearInterval(interval);
        $('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    }, 100);
});