// Notificaci�n
var WikiaNotificationMessage = "�Nuevo/a en Pok�Polis? <a href='/wiki/Pok�Polis:Manuales de Estilo'>�Visita los manuales de estilo!</a><br />Notifica los errores del skin de Pok�Polis a <a href='/wiki/Pok�Polis:Administraci�n'>la administraci�n</a>.";
importArticles({
	type: 'script',
	articles: [
		'u:dev:WikiaNotification/code.js'
	]
});

// Quitamos el "Fanon:" del WikiaPageHeader
var nofanon = mw.config.get('wgTitle')
$('.ns-112 .WikiaPageHeader h1').html(nofanon);