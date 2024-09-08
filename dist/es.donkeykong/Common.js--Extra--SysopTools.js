// <pre>
function ActionDeleteLinks() {
	var wr = $G('wpReason');
	if (!wr) return;
	var bc = $UT.create('input', {type:'button',value:'Borrar comentario',listener:['click',function() {$G('wpReason').value='';}]});
	var bi = $UT.create('input', {type:'button',value:'Dejar sólo autor',listener:['click', function() {
		var t = $G('wpReason'), re = /(\[\[E?special:Contributions\/.+\|.+\]\])/ig, res = null, ma = null;
		while ((ma = re.exec(t.value)) != null){
			res = ma[0];
		}
		if (res) t.value='Único autor: '+res;
		t.focus();
	}]});
	$UT.makeChildren([bc,bi], wr.parentNode);
}

if (wgAction == 'delete') {
	$(ActionDeleteLinks);
}

/*
* FileUsage: Muestra una lista de artículos donde se usa (como imagen o como enlace) un archivo al acceder a la página para borrar o renombrar el archivo.
* Copyright (C) 2010  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
var FileUsage = {
	pagename: null,
	iucontinue: null,
	blcontinue: null,
	loading: false,
	init: function() {
		if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Movepage') {
			var name = $('#contentSub').find('a').eq(0).text();
			if (name && name.indexOf('Archivo:') == 0) {
				FileUsage.pagename = name;
			}
		} else if (wgAction == 'delete' && wgNamespaceNumber == 6 && !$('#mw-returnto').exists() && (window.location.href.indexOf('oldimage=') == -1)){
			FileUsage.pagename = wgPageName;
		}
		if (FileUsage.pagename && wgEnableAPI) {
			$('div').find('.printfooter').before('<h2 id="fileusage-heading"><span class="mw-headline"> Uso de la imagen </span><span class="progress">cargando...<span class="icon-loading"></span><a href="javascript:FileUsage.stop();">detener</a></span></h2><ul id="fileusage-list"></ul>');
			FileUsage.loading = true;
			FileUsage.reqUsage();
		}
	},
	reqUsage: function() {
		var url = '/api.php?action=query&list=backlinks|imageusage&bltitle='+FileUsage.pagename+'&iutitle='+FileUsage.pagename+'&format=json';
		if (FileUsage.iucontinue) {
			url += '&iucontinue='+FileUsage.iucontinue;
		}
		if (FileUsage.blcontinue) {
			url += '&blcontinue='+FileUsage.blcontinue;
		}
		$.getJSON(url, function(data) {
			if (!FileUsage.loading) {
				return;
			}
			$.each(data.query.backlinks, function() {
				var t = this.title;
				$('#fileusage-list').append('<li class="backlink"><a href="'+wgArticlePath.replace('$1',t)+'" title="'+t+'">'+t+'</a> (enlace)</li>');
			});
			$.each(data.query.imageusage, function() {
				var t = this.title;
				$('#fileusage-list').append('<li class="image"><a href="'+wgArticlePath.replace('$1',t)+'" title="'+t+'">'+t+'</a> (imagen)</li>');
			});
			FileUsage.iucontinue = FileUsage.blcontinue = null;
			var qc = data['query-continue'];
			if (qc) {
				if (qc.imageusage) {
					FileUsage.iucontinue = qc.imageusage.iucontinue || null;
				}
				if (qc.backlinks) {
					FileUsage.blcontinue = qc.backlinks.blcontinue || null;
				}
			}
			if (FileUsage.iucontinue || FileUsage.blcontinue) {
				setTimeout(FileUsage.reqUsage,1000);
			} else {
				FileUsage.stop();
			}
		});
	},
	stop: function() {
		FileUsage.loading = false;
		$('#fileusage-heading').find('span.progress').remove();
	}
}

$(FileUsage.init);
// </pre>