/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor/a del Mes' },
		featured: { u:'Usuari@ Destacad@' },
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor/a del Mes', order:-1/0 },
		featured: 'Usuari@ Destacad@',
	}
};

UserTagsJS.modules.inactive = 20; // 20 days

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.autoconfirmed = true; // Switch on

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript' },
		csshelper: { u: 'CSS' },
		templatehelper: { u: 'Templates' }
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};

UserTagsJS.modules.custom = {
	'Lunarity': ['csshelper', 'templatehelper', 'jshelper'] // NOTE: order of list here does NOT matter
};

/* Código de es.c.wikia.com */
 
jQuery(document).ready(function($){
$('#Parallax').mousemove(
function(e){
/* Work out mouse position */
var offset = $(this).offset();
var xPos = e.pageX - offset.left;
var yPos = e.pageY - offset.top;
 
/* Get percentage positions */
var mouseXPercent = Math.round(xPos / $(this).width() * 100);
var mouseYPercent = Math.round(yPos / $(this).height() * 100);
 
/* Position Each Layer */
$(this).children('div').each(
function(){
var diffX = $('#Parallax').width() - $(this).width();
var diffY = $('#Parallax').height() - $(this).height();
 
var myX = diffX * (mouseXPercent / 100); //) / 100) / 2;
 
 
var myY = diffY * (mouseYPercent / 100);
 
 
var cssObj = {
'left': myX + 'px',
'top': myY + 'px'
}
//$(this).css(cssObj);
$(this).animate({left: myX, top: myY},{duration: 50, queue: false, easing: 'linear'});
 
}
);
 
}
);
});