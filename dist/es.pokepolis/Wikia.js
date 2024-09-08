// Notificación
var WikiaNotificationMessage = "¿Nuevo/a en PokéPolis? <a href='/wiki/PokéPolis:Manuales de Estilo'>¡Visita los manuales de estilo!</a><br />Notifica los errores del skin de PokéPolis a <a href='/wiki/PokéPolis:Administración'>la administración</a>.";
importArticles({
	type: 'script',
	articles: [
		'u:dev:WikiaNotification/code.js'
	]
});

// Quitamos el "Fanon:" del WikiaPageHeader
var nofanon = mw.config.get('wgTitle')
$('.ns-112 .WikiaPageHeader h1').html(nofanon);