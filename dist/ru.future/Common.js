/* Sliders using jquery
 * By: [[User:Tierrie]], with modifications by [[User:Thailog]] and [[User:KettleMeetPot]]
 */
 
$(document).ready(function() {
    mw.loader.using( ['jquery.ui.tabs'], function() {
      var $tabs = $("#portal_slider").tabs({ fx: [{opacity:'toggle', duration:200},{height:'toggle', duration:'normal'}, ] } );
      $("[class^=portal_sliderlink]").click(function() { // bind click event to link
        var currentCl = $(this).prop('class');
        var workaround = $(this).children("a").prop('href');
        $(this).children("a").children("img").addClass("selectedImg");
        $(".selectedImg").removeClass("selectedImg");
          if ( currentCl != "portal_sliderlink_28" ) {
            $tabs.tabs('select', currentCl.replace("portal_sliderlink_", ""));
          }
          else {
            window.location.replace(workaround);
          }
        return false;
      });
    });
});

window.UserTagsJS = {
	modules: {},
	tags: {
		newbie: { u:'Новичок'},
		otpusk: { u:'В вики отпуске'},
		oldie: { u:'Ветеран'},
		moder: { u:'Модератор'},
	}
};
 
UserTagsJS.modules.newuser = {
	days: 90, // Must have been on the Wiki for 90 days
	edits: 200, // And have at least 200 edits to remove the tag
	namespace: 0
};
UserTagsJS.modules.inactive = 30;
 
 
 
UserTagsJS.modules.implode = {
	newbie: ['newuser'], // Remove new user replace with новичок
	otpusk: ['inactive'] // Remove new user replace with новичок
};
 
UserTagsJS.modules.implode = {
	'moder': ['threadmoderator', 'content-moderator'],
};
 
 
 
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};

/*Wallpappers*/
 
function randomBg() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/future/images/f/fb/Скрин-2.jpeg/revision/latest?cb=20191129183938&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/future/images/5/56/Скрин-5.jpg/revision/latest?cb=20191129184100&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/future/images/7/7c/F1.png/revision/latest?cb=20191208185722&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/future/images/5/52/F2.jpg/revision/latest?cb=20191208185754&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/future/images/b/b9/F3.jpg/revision/latest?cb=20191208185836&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/future/images/e/e9/F4.jpg/revision/latest?cb=20191208185858&path-prefix=ru'
    ];
 
    $('body.skin-oasis').css('background-image','url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
$(randomBg);