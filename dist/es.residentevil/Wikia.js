/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };

importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:InactiveUsers/code.js',
    ]
});

/** Añadiendo el enlace para discusiones en el panel de navegación **/
$(function () {
	var a = $('<a></a>').text('Discusiones').attr({'class':'subnav-2a', title:'Acceder a la página de discusiones', href:'http://es.masseffect.wikia.com/d/f', id:'discussions-menuitem'}).wrap('<li></li>');
	$('#WikiHeader').children('nav').children('ul').children('li').eq(0).children('ul').append(a.parent());
});