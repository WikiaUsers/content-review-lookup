// BEGIN Soporte de idioma para BotoneraPopups en wikis en espa�ol
// Este c�digo solo ser� efectivo en wikis cuyo idioma sea espa�ol
if (mw.config.get('wgContentLanguage') == 'es') {
	if (!window.BotoneraPopups) {
		window.BotoneraPopups = {};
	}
	window.BotoneraPopups.wikisiteinfo = $.extend(true, window.BotoneraPopups.wikisiteinfo, {namespaces:{'-2':{canonical:'Media'},'-1':{canonical:'Special'},'1':{canonical:'Talk'},'2':{canonical:'User'},'3':{canonical:'User talk'},'4':{canonical:'Project'},'5':{canonical:'Project talk'},'6':{canonical:'File'},'7':{canonical:'File talk'},'9':{canonical:'MediaWiki talk'},'10':{canonical:'Template'},'11':{canonical:'Template talk'},'12':{canonical:'Help'},'13':{canonical:'Help talk'},'14':{canonical:'Category'},'15':{canonical:'Category talk'}}, specialpagealiases:[{realname:'Upload',aliases:['SubirArchivo']},{realname:'Prefixindex',aliases:['P�ginasPorPrefijo']},{realname:'Contributions',aliases:['Contribuciones']},{realname:'Whatlinkshere',aliases:['LoQueEnlazaAqu�']},{realname:'Movepage',aliases:['MoverP�gina']},{realname:'Log',aliases:['Registro']},{realname:'Blockip',aliases:['Bloquear']},{realname:'Undelete',aliases:['Restaurar']},{realname:'Search',aliases:['Buscar']}]});
	window.BotoneraPopups.rollbackSummaryPrefix = 'Revertidos los cambios de [[Special:Contributions/$1|$1]]: ';
}
// END