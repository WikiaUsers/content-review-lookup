/*notificacio*/
var WikiaNotificationMessage = "Mario party esta en proceso de fusi�n con <a href='/wiki/c:es.mario'>Super Mario Wiki</a>, as� que se le pide a los usuarios que revisas dicha wiki antes de editar un articulo";
var expiry = 0;
importArticles({
	type: 'script',
	articles: [
		'u:dev:ExtendedNavigation/code.js',
		'u:dev:WikiaNotification/code.js'
		]
})