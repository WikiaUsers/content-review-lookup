//Replaces {{USERNAME}} with the name of the user browsing the page.
//For usage with Template:USERNAME.
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});

// Tag for users that have been inactive 2+ months

/**
 * importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 2 };
**/

//User tags
window.UserTagsJS = {
	modules: {},
	tags: {
        archive: 'The AJCW Archive Team',
        art: 'Art Crew'
	}
};

UserTagsJS.modules.custom = {
    'AJCW Archive': ['archive'],
    'Pastelfeathers': ['art'],
    'Lilacquil': ['art'],
};


$('.bookcover').hide();
$('.book').bind('mouseover', function() {
        $('.bookcover').fadeOut();
        $('#'+$(this).attr('id')+'cover').fadeIn();
    });

$('.book').bind('mouseoff', function() {
  $('.bookcover').fadeOut();
});