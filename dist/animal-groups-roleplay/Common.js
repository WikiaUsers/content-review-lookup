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
};


$('.bookcover').hide();
$('.book').bind('mouseover', function() {
        $('.bookcover').fadeOut();
        $('#'+$(this).attr('id')+'cover').fadeIn();
    });

$('.book').bind('mouseoff', function() {
  $('.bookcover').fadeOut();
});