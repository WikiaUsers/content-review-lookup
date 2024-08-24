InactiveUsers = { text: 'inactivo' };
importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:Countdown/code.js',
		'w:c:dev:InactiveUsers/code.js'
	]
});

/* Función para cargar la plantilla información en Descripción de archivo */
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'especial:subirarchivo') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Información\r| atencion= \r| descripcion= \r| fuente= \r| autor= \r| retoques= \r| licencia= \r| otras versiones= \r}}"));
 
}
addOnloadHook (preloadUploadDesc);