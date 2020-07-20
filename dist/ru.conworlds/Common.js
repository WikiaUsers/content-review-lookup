importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});
 
importScriptURI("http://vk.com/js/api/openapi.js?115");
window.onload = function() {
    //Инициализируем скрипт
    VK.init({apiId: 6009753, onlyWidgets: true});
    //Добавляем кнопку
    $('<div id="vk_like"></div><script type="text/javascript">VK.Widgets.Like("vk_like", {type: "mini"});</script>').insertAfter('#WikiaPageHeader > .comments');
};

window.UserTagsJS = {
	modules: {},
	tags: {
	    zhurnal: { u:'Журналист'},
		newbie: { u:'Новичок'},
		hacker: { u:'Технический администратор'},
		otpusk: { u:'Покинул вики'},
		oldie: { u:'Ветеран'},
		founder: { u:'Отец-Основатель'},
		rollbask: { u:'Откатчик'},
	}
};
 
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Kostdanila': ['hacker']
 
};
UserTagsJS.modules.newuser = {
	days: 30, // Must have been on the Wiki for 30 days
	edits: 100, // And have at least 200 edits to remove the tag
	namespace: 0
};
UserTagsJS.modules.inactive = 365;
 
 
 
UserTagsJS.modules.implode = {
	newbie: ['newuser'], // Remove new user replace with новичок
	otpusk: ['inactive'] // Remove new user replace with новичок
};
 
 
 
 
 
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
 

UserTagsJS.modules.userfilter = {
	'ShiftNeru': ['newbie'] // Шифт никогда новичок даже если новичок
};
 /*
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'], // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
*/

/*Wallpappers*/
 
function randomBg() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/conworlds/images/0/0d/Ф-4.jpg/revision/latest?cb=20170409141212&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/0/01/Ф-3.jpg/revision/latest?cb=20170409141202&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/f/fe/Ф-2.jpg/revision/latest?cb=20170409141150&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/c/c3/Ф-1.jpg/revision/latest?cb=20170409141138&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/f/f6/С-4.jpg/revision/latest?cb=20170409141125&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/c/c6/С-3.jpeg/revision/latest?cb=20170409141115&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/2/23/С-2.jpg/revision/latest?cb=20170409141103&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/conworlds/images/7/7a/С-1.jpg/revision/latest?cb=20170409141050&path-prefix=ru'
    ];
 
    $('body.skin-oasis').css('background-image','url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
$(randomBg);