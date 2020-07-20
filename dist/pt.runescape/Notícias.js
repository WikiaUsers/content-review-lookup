//<nowiki>
var UPD = {};
UPD.post = {}; //storing the post's data
UPD.post.imgs = []; //storing all image urls.
UPD.post.imgname;
UPD.post.patchnotes = false;
UPD.affected = [];
UPD.purged = [];
UPD.retries = 0;

//News post functions

function toCORS(url) {
	var CORSSite = 'whateverorigin.org';
	return 'http://'+CORSSite+'/get?url=' + encodeURIComponent(url) + '&callback=?';
}

UPD.statusMsg = function(msg) {
	$('#UPD-status :last-child').css('color', '#2B2');
	$('#UPD-status').append('<li>' + msg + '</li>');
};

UPD.getPost = function(url) {
	UPD.post.url = url;
	UPD.statusMsg('A obter os dados de <a href="'+UPD.post.url+'" target="_blank">'+UPD.post.url+'</a>.');
	$.getJSON(toCORS(UPD.post.url), function(data) {
		UPD.statusMsg('A processar dados');
		UPD.parsePost($(data.contents).find('article.content, div.contents'));
	}).fail(function() {
		if (UPD.retries < 10) {
			UPD.statusMsg('Ocorreu um erro ao obter os dados, a tentar novamente... (' + (++UPD.retries) + ')');
			UPD.getPost(UPD.post.url);
		} else {
			UPD.statusMsg('Não foi possível obter os dados em 10 tentativas, abortado. Verifique a sua conexão e tente novamente');
		}
	});
};

UPD.parsePost = function($post) {
	var $content, restrictedTitle = false, originalTitle = '', divspancss= false;
	if ($post.find('.thread-view__heading').length && $post.find('.thread-view__heading').text().search(/modificações recentes/i) > -1) {
		UPD.post.patchnotes = true;
		UPD.statusMsg('Artigo é de Modificações Recentes');
		$content = $post.find('.forum-post--jmod .forum-post__body');
		if (!$content.length) {
			UPD.statusMsg('Error! Nenhuma notícia foi encontrada - verifique o URL');
			return;
		}
	} else {
		$content = $post.find('.articleContentText');
	}
	
	//meta info
	if (UPD.post.patchnotes) {
		UPD.post.date = (new Date($post.find('.forum-post--jmod .forum-post__time-below').text().substr(0, 11).replace(/-/g, ' '))).toLocaleDateString('pt-BR', {year:'numeric', month:'long', day: 'numeric'});
		UPD.post.title = 'Modificações Recentes (' + UPD.post.date + ')';
		UPD.post.qfc = $post.find('.thread-view__qfc-number').first().text();
		UPD.post.cgID = -1;
	} else {
		UPD.post.title = $post.find('.articleContent > h2').html().replace(/&amp;/g, '&').replace(/[‘’]/g,'\'');
		if (UPD.post.title.search(/\|/g) > -1) {
			restrictedTitle = true;
			originalTitle = UPD.post.title.replace(/\|/g, '{{!}}');
			UPD.post.title = UPD.post.title.replace(/\|/g, '-');
		}
		UPD.post.date = $post.find('.articleMeta time').html();
		UPD.post.category = $post.find('.articleMeta span a').html();
		UPD.post.cgID = $post.find('.articleMeta span a').attr('href').match(/cat=(\d+)/)[1];
	}
	//extra function
	function getIMGName(url) {
		var name = 'Ficheiro:';
		name += UPD.post.imgs[0].match(/([^/]*)(-\d+)?\.(png|jpe?g|gif)/i)[1].replace(/_/g, ' ');
		UPD.post.imgname = name;
		name += ' ('+UPD.post.imgs.length+') imagem de notícia';
		name += '.' + url.match(/\.(png|jpe?g|gif)/i)[1].replace('jpeg', 'jpg');
		return name;
	}
	//contents
	if ($post.find('.feature iframe').length) {
		$content.prepend('{{YouTube|' + $post.find('.feature iframe').attr('src').match(/\/embed\/([^\/?&]+)/)[1] + '}}\n');
	}
	if ($post.find('.feature img').length) {
		UPD.post.imgs.push($post.find('.feature img').attr('src'));
		$content.prepend('[[' + getIMGName($post.find('.feature img').attr('src')) + ']]\n\n');
	}
	$content.find('iframe[src*="youtube.com"]').replaceWith(function() {
		return '{{YouTube|' + $(this).attr('src').match(/\/embed\/([^\/?&]+)/)[1] + '}}\n';
	});
	$content.find('p').replaceWith(function() { //paragraph
		return '\n\n' + this.innerHTML;
	});
	$content.find('q').replaceWith(function() { //q tags appear to have no special styling on updates
		return this.innerHTML;
	});
	$content.contents().filter(function() { //remove HTML comments
		return this.nodeType == 8;
	}).remove();
	$content.find('h1, h2, h3, h4, h5, h6').replaceWith(function() { //headers
		return '{{UB|' + this.innerHTML + '}}';
	});
	$content.find('b, strong, span[style*="trajan-pro-3"]').replaceWith(function() { //bold text
		return "'''" + this.innerHTML + "'''";
	});
	$content.find('i, em').replaceWith(function() { //italic text
		return "''" + this.innerHTML + "''";
	});
	$content.find('hr').replaceWith('\n----\n'); //horizontal lines
	$content.find('ul li').replaceWith(function() { //unordered list items
		return '*' + this.innerHTML;
	});
	$content.find('ol li').replaceWith(function() { //ordered list items
		return '#' + this.innerHTML;
	});
	$content.find('ul, ol').replaceWith(function() { //(un)ordered list elements, now that their list items have been parsed
		return this.innerHTML;
	});
	$content.find('u').replaceWith(function(){
		return '&lt;span style="text-decoraction: underline;"&gt;' + this.innerHTML + '&lt;/span&gt;';
	});
	$content.find('span, div').each(function() { //spans and divs
		var tag = this.tagName.toLowerCase();
		if (this.hasAttribute('style')) { //if they have style attributes, bring the styles in, else strip tags
			divspancss = true;
			return '&lt;'+tag+' style="'+this.getAttribute('style')+'"&gt;' + ((this.innerHTML + ' ').trim()) + '&lt;/'+tag+'&gt;';
		} else {
			return this.innerHTML;
		}
	});
	$content.find('center').replaceWith(function(){
		return '&lt;div style="text-align: center;"&gt;' + this.innerHTML + '&lt;/div&gt;';
	});
	$content.find('br').replaceWith('&lt;br&gt;');
	//links
	$content.find('a[href*="://services.runescape.com/m=rswiki/en/"]').replaceWith(function() { // JagexWiki
		var wikiArticle = $(this).attr('href').replace(/^.*?\/m=rswiki\/en\//, '').replace(/_/g, ' ');
		return '{{JagexWiki|' + wikiArticle + '|' + this.innerHTML + '}}';
	});
	$content.find('a[href*="://services.runescape.com/"], a[href*="://cdn.runescape.com/"]').filter(function() { //links to images
		return (/(jpe?g|png)$/.test($(this).attr('href')));
	}).replaceWith(function() {
		UPD.post.imgs.push($(this).attr('href'));
		return '[[:' + getIMGName($(this).attr('href')) + '|' + this.innerHTML + ']]';
	});
	//TODO: Remove /a=xxx/ and /c=xxx/ from links
	$content.find('a').replaceWith(function() { //other links
		return '[' + $(this).attr('href') + ' ' + this.innerHTML + ']';
	});
	$content.find('img').replaceWith(function() { //images
		UPD.post.imgs.push($(this).attr('src'));
		return '[[' + getIMGName($(this).attr('src')) + ']]';
	});
	var content = $content.html().replace(/[‘’']/g,'\'');
	content = content.replace(/\[\[:Ficheiro:([^|]*)\|\s*\[\[Ficheiro:([^|]*)\]\]\s*\]\]/gi, '[[Ficheiro:$2|link=Ficheiro:$1|center]]');
	//HTML encoded characters
	var encoding = {
		lt:'<',
		gt:'>',
		quot:'"', rdquo:'"', ldquo: '"',
		apos:"'", rsquo:"'", lsquo: "'",
		hellip:'…',
		ndash:'–'
	};
	content = content.replace(/\&([lg]t|quot|[lr]dquo|apos|[rl]squo|hellip|ndash);/g, function(match, type) {
		return encoding[type];
	});
	
	
	if (UPD.post.patchnotes) {
		content = '{{Modificações Recentes|qfc=' + UPD.post.qfc + '|data=' + UPD.post.date + '}}' + content;
	} else {
		content = '{{Notícia|'/* link */ + UPD.post.url + '|'/* data */ + UPD.post.date.replace(/\b0(?=\d)/g, '') + '|'/* categoria*/ + UPD.post.category + '}}\n' + (restrictedTitle ? '{{DISPLAYTITLE:' + originalTitle + '}}\n' : '') +  '\n' + content;
	}
	
	if (restrictedTitle) {
		content += '\n{{Título restrito|Não é possível usar o caracter {{!}} no título}}';
	}
	
	content = content.replace(/ ?<br> ?<br>/g, '\n\n') // replace double-br with two newlines
		.replace(/ ?<br> ?/g, '\n') // replace single brs with just a newline
		.replace(/[“”]/g, '"') // replace weird quotes with standard ones
		.replace(/\n{3,}/g, '\n\n') //fixing quadruple enters caused by having 2 paragraphs below each other
		.replace(/&amp;/g, '&') //replace "&amp;" appearing in links and headers with just "&"
		.replace(/[ \t]+$/gm, '') // trim excess whitespace from the end of a line
		.replace(/^[ \t]+/gm, '') // trim excess whitespace from the beginning of a line
		.replace(/ +/g, ' '); // condense spaces
	
	if (divspancss) {
		UPD.statusMsg('Algum CSS inline presente numa tag span/div foi encontrado e importado. Verifique por erros de formatação - texto/cor de fundo, bordas, etc');
	}
	
	UPD.post.content = content.trim();
	//verification that everything has been parsed
	if ($content.contents().filter(function() {return this.nodeType !== 3}).length > 1) {
		var unparsed = [], i = 0, str = '<ul>';
		$content.contents().filter(function() {return this.nodeType !== 3}).each(function() {
			unparsed.push('&lt;'+this.tagName+'&gt; of nodeType='+this.nodeType);
		});
		for (i = 0; i < unparsed.length; i++) {
			str += '<li>' + unparsed[i] + '</li>';
		}
		str += '</ul>'
		UPD.statusMsg('Aviso: Algumas tags HTML não foram formatadas completamente. Verifique todas as edições por erros de formatação. Debug:<br />' + str /*+ ' An error report is being sent for further review...'*/);
		//UPD.errorReport(unparsed);
		UPD.uploadFiles(); //comment this out if error reporting is re-enabled
	} else {
		UPD.uploadFiles();
	}
};

UPD.uploadFiles = function() {
	if (UPD.post.imgs.length === 0) return UPD.createPage();
	var files = [];
	var extension;
	for (var i=0;i<UPD.post.imgs.length;i++) {
		extension = UPD.post.imgs[i].match(/\.(png|jpe?g|gif)/i)[0].replace('jpeg', 'jpg');
		files.push(UPD.post.imgname + ' (' + (i+1) + ') imagem de notícia' + extension);
	}
	var url, comment;
	function uploadFile(i) {
		UPD.statusMsg('Uploading file '+(i+1)+'/'+(files.length));
		url = UPD.post.imgs[i];
		comment = 'A fazer upload automático de imagem para [[Notícia:' + UPD.post.title + ']] usando o [[MediaWiki:Notícias.js|script de notícias]].\nFonte: ' + url;
		var api = new mw.Api();
		api.post({
			action: 'upload',
			filename: files[i],
			comment: comment,
			text: '{{Notícia Imagem|' + UPD.post.title + '|link=' + url + '}}',
			ignorewarnings: 'true',
			token: mw.user.tokens.get('editToken'),
			url: url,
		}).done(function() {
			UPD.affected.push('/wiki/'+files[i]);
			if (i+1 < files.length) {
				//Wikimedia servers do url uploads synchronously. Looping this way prevents overloading.
				uploadFile(i+1); //wait before file 1 has finished before uploading file 2
			} else {
				UPD.createPage();
			}
		});
	}
	uploadFile(0); //initiate first upload
};

UPD.createPage = function() {
	UPD.statusMsg('A criar artigo da notícia');
	//also create redirect in case the post contains question marks in the title
	var redir = UPD.post.title.indexOf('?') !== -1 ? 'Notícia:' + UPD.post.title.replace(/\?/g, '') : '';
	var api = new mw.Api();
	api.post({
		action: 'edit',
		title: 'Notícia:' + UPD.post.title,
		token: mw.user.tokens.get('editToken'),
		text: UPD.post.content,
		summary: 'Criado automaticamente usando o [[MediaWiki:Notícias.js|script de notícias]].',
	}).done(function() {
		UPD.affected.push('/wiki/Notícia:' + UPD.post.title);
		if (redir) {
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: redir,
				token: mw.user.tokens.get('editToken'),
				text: '#REDIRECT[[Notícia:' + UPD.post.title + ']]',
				summary: 'Artigo redirecionado automaticamente para [[Notícia:' + UPD.post.title + ']] usando o [[MediaWiki:Notícias.js|script de notícias]].',
			}).done(function() {
				UPD.affected.push(redir.substr(1));
				UPD.purgePages();
			});
		} else {
			UPD.purgePages();
		}
	});
};

UPD.purgePages = function() {
	UPD.statusMsg('Edição do artigo terminada. A preparar para atualizar índices de categorias...');
	var d = new Date(UPD.post.date);
	var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
		'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	var year = d.getFullYear();
	var date = d.getDate() + '_' + months[d.getMonth()];
	var ctg = -1;
	var pagesToPurge = [];
	
	pagesToPurge.push(year);
	pagesToPurge.push(date);
	pagesToPurge.push('Predefinição:Notícias');
	pagesToPurge.push('RuneScape_Wiki');
	switch (UPD.post.cgID) {
		case 1: ctg = 'Game_updates';
		break;
		case 2: ctg = 'Website_updates';
		break;
		case 3: ctg = 'Customer_Support_updates';
		break;
		case 4: ctg = 'Technical_updates';
		break;
		case 5: ctg = 'Community_updates';
		break;
		case 6: ctg = 'Behind_the_Scenes';
		break;
		case 9: ctg = 'Shop_updates';
		break;
		case 12: ctg = 'Future_updates';
		break;
		case 13: ctg = 'Solomon%27s_Store_updates';
		break;
		case 14: ctg = 'Treasure_Hunter_updates';
		break;
		case 15: ctg = 'Feedback_updates';
		break;
		case 16: ctg = 'Event_updates';
		break;
		default: ctg = 'Modificações_Recentes';
		break;
	}
	if (ctg !== -1) {
		pagesToPurge.push(ctg);
	}
	
	UPD.nullEdit(pagesToPurge);
};

UPD.nullEdit = function(pagesToPurge) {
	if (pagesToPurge.length === 0) {
		return UPD.success();
	}
	var pageNullEdit = pagesToPurge.shift();
	new mw.Api().post({
		format: 'json',
		action: 'edit',
		title: pageNullEdit,
		token: mw.user.tokens.get('editToken'),
		prependtext: ''
	})
	.done(function(d) {
		if (!d.error) {
			UPD.statusMsg('Null edit of '+pageNullEdit+' successful!');
			UPD.purged.push('/wiki/'+pageNullEdit);
		} else {
			UPD.statusMsg('Failed to null edit '+pageNullEdit+': '+ d.error.code+ '<br />Please manually purge this page: <a href="/wiki/'+pageNullEdit+'?action=purge" target="_blank">here</a>');
		}
	})
	.fail(function() {
		UPD.statusMsg('Failed to null edit '+pageNullEdit+'<br />Please manually purge this page: <a href="/wiki/'+pageNullEdit+'?action=purge" target="_blank">here</a>');
	})
	.always(function () {
		UPD.nullEdit(pagesToPurge);
	});
}

UPD.success = function() {
	UPD.statusMsg('Atualização concluída.');
	var list = '<ul>\n', list2 = '<ul>\n';
	for (var i=0;i<UPD.affected.length;i++) {
		list += '<li><a href="'+UPD.affected[i]+'?diff=cur" target="_blank">'+UPD.affected[i].substr(6)+'</a></li>\n';
	}
	list += '</ul>';
	
	for (i=0;i<UPD.purged.length;i++) {
		list2 += '<li><a href="'+UPD.purged[i]+'?action=view" target="_blank">'+UPD.purged[i].substr(6)+'</a></li>\n';
	}
	list2 += '</ul>';
	UPD.statusMsg('Before closing this window, verify the edits made on the following pages are correctly created/edited:\n'+list+'... and that the following pages are correctly purged:\n'+list2);
};

UPD.errorReport = function(unparsed) {
	var message = 'While updating the page [[Update:'+UPD.post.title+']] the following tag(s) occurred which were not parsed correctly:\n<pre>'+unparsed.join('\n')+'</pre>\n~~'+'~~';
	var api = new mw.Api();
	api.post({
		action: 'edit',
		section: 'new',
		title: 'MediaWiki talk:Notícias.js',
		summary: 'Relatório de erros para o [[MediaWiki:Notícias.js|script de notícias]].',
		token: mw.user.tokens.get('editToken'),
		text: message,
		notminor: 'true',
	}).done(UPD.uploadFiles); 
};

//init
window.UPD = UPD; //the global object I'm going to use for this script.
if (
	(mw.config.get('wgTitle') == 'Criar Notícia' && mw.config.get('wgNamespaceNumber') == 4) &&
	(mw.config.get('wgUserGroups').indexOf('sysop') !== -1)
) { //only custs/sysops on [[RuneScape Wiki:Criar Notícia]] load this script
	$(function() {
		$('#UPD-form').html(
			$('<form action="javascript:void(0);"></form>')
			.append('<label>Introduza o URL da notícia: <input type="url" id="UPD-url" size="100"/></label>')
			.append('<button>Criar artigo!</button>')
			.submit(function() {
				window.UPD.getPost($('#UPD-url').val());
			})
		);
	});
} else delete UPD;