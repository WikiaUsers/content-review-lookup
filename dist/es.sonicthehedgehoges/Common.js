/*Nota, el contenido del Common.js se encuentra en [[MediaWiki:Common.js/Code.js]], y se importa desde MediaWiki:(skinname).js/Code.js <pre>*/
 
function loadTrueCommonJS() {
	// Hash para evitar que puedan usar URLs que afecten a cómo se ve la página
	var jsHashKey = window.wgStyleVersion;
	var reloadjs = false;
	var debug = false;
	var skipCommon = false;
	var skipSkinjs = false;
	var curLocation = window.location.href;
	if (curLocation.indexOf('jsHashKey='+jsHashKey) != -1) {
		reloadjs = (curLocation.indexOf('reloadjs=true') != -1);
		debug = (curLocation.indexOf('debug=true') != -1);
		skipCommon = (curLocation.indexOf('skipCommon=true') != -1);
		skipSkinjs = (curLocation.indexOf('skipSkinjs=true') != -1);
	}
	if (reloadjs) {
		var d = new Date();
		window.importScriptURI = function(oldImportScriptURI, ts) {
				return function(url) {
					return oldImportScriptURI(url+(url.indexOf('?') != -1 ? '&' : '?')+ts);
				}
			}(window.importScriptURI, d.getTime());
	}
	if (!skipCommon) {
		var page = 'Common.js';
		switch(window.skin) {
			case 'monobook':
				page = 'Monobook.js';
				break;
			case 'oasis':
			case 'wikia':
				page = 'Wikia.js';
				break;
		}
		var code = (debug ? 'Debug' : 'Code');
		importScriptURI(wgServer+wgScriptPath+wgScript+'?title=MediaWiki:'+page+'/'+code+'.js&action=raw&ctype=text/javascript&templates=expand');
	}
	if (skipSkinjs) {
		throw 'skipSkinjs especificado. Aborting...';
	}
}
 
loadTrueCommonJS();
/*</pre>*/