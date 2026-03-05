//BORDER COLOR FOR INFOBOXES - FROM STEVEN UNIVERSE WIKI
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

//ADD USERAME ALT FOR MASTHEAD - FROM STEVEN UNIVERSE WIKI
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