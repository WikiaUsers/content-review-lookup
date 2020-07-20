/*Agrega un menu al Wiki-navigation. */
function agregarEnlaceSkinMenu() {
	if (!window.SkinPropagation) return;
	var url = SkinPropagation.parseURL(window.location.href);
	url.query.useskin = 'monobook';
	var surl = SkinPropagation.getURL(url);
	var a = $('<a></a>').text('Usar Monobook').attr({'class':'subnav-2a', title:'Ver WikiDex con la piel Monobook', href:surl, id:'mn-changeskin'}).wrap('<li></li>');
	$('#WikiHeader').children('nav').children('ul').children('li').eq(0).children('ul').append(a.parent());
	a.bind('click', function() {
		return confirm('La apariencia cambiará temporalmente a Monobook, el estilo anterior, pero con muchas más funcionalidades y más accesible. Si quieres volverlo a ver como ahora tendrás que quitar el useskin=monobook que aparece en la barra de direcciones del navegador.');
	});
}