/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
/* operate for Template:EmbedMusic */  $(".swf-cp-domain").each(function() { if (String(Number($(this).attr("data-src"))) != "NaN") { $(this).html('<embed src="http://media1.clubpenguin.com/play/v2/content/global/music/' + $(this).attr("data-src") + '.swf' + '" style="display: inline; width: 0px; height: 0px; margin: 0px; padding: 0px;" />'); } });