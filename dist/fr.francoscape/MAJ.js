//Transcription de http://runescape.wikia.com/wiki/RuneScape_Wiki adapté pour la version française.//


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
	UPD.statusMsg('Récupération des données de publication à partir de <a href="'+UPD.post.url+'" target="_blank">'+UPD.post.url+'</a>.');
	$.getJSON(toCORS(UPD.post.url), function(data) {
		UPD.statusMsg('Analyse des données');
		UPD.parsePost($(data.contents).find('article.content, div.contents'));
	}).fail(function() {
		if (UPD.retries < 10) {
			UPD.statusMsg('Impossible de récupérer le message, nouvel essai... (' + (++UPD.retries) + ')');
			UPD.getPost(UPD.post.url);
		} else {
			UPD.statusMsg('Échec après 10 tentatives, arrêt. Vérifiez votre connections, actualisez et ré-essayez');
		}
	});
};

UPD.parsePost = function($post) {
	var $content, restrictedTitle = false, originalTitle = '', divspancss= false;
	if ($post.find('.thread-view__heading').length && $post.find('.thread-view__heading').text().search(/patch notes/i) > -1) {
		UPD.post.patchnotes = true;
		UPD.statusMsg('Article détecté en tant que notes de mise à jour');
		$content = $post.find('.forum-post--jmod .forum-post__body');
		if (!$content.length) {
			UPD.statusMsg('Erreur! Impossible de trouver le message - vérifiez le lien');
			return;
		}
	} else {
		$content = $post.find('.articleContentText');
	}
	
	//meta info
	if (UPD.post.patchnotes) {
		UPD.post.date = (new Date($post.find('.forum-post--jmod .forum-post__time-below').text().substr(0, 11).replace(/-/g, ' '))).toLocaleDateString('en-GB', {year:'numeric', month:'long', day: 'numeric'});
		UPD.post.title = 'Notes de patch (' + UPD.post.date + ')';
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
		var name = 'Fichier:';
		name += UPD.post.imgs[0].match(/([^/]*)(-\d+)?\.(png|jpe?g|gif)/i)[1].replace(/_/g, ' ');
		UPD.post.imgname = name;
		name += ' ('+UPD.post.imgs.length+') update image';
		name += '.' + url.match(/\.(png|jpe?g|gif)/i)[1].replace('jpeg', 'jpg');
		return name;
	}
	//contents
	if ($post.find('.feature iframe').length) {
		$content.prepend('{{Youtube|' + $post.find('.feature iframe').attr('src').match(/\/embed\/([^\/?&]+)/)[1] + '}}\n');
	}
	if ($post.find('.feature img').length) {
		UPD.post.imgs.push($post.find('.feature img').attr('src'));
		$content.prepend('[[' + getIMGName($post.find('.feature img').attr('src')) + '|center]]\n\n');
	}
	$content.find('iframe[src*="youtube.com"]').replaceWith(function() {
		return '{{Youtube|' + $(this).attr('src').match(/\/embed\/([^\/?&]+)/)[1] + '}}\n';
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
		return '{{UG|' + this.innerHTML + '}}';
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
	content = content.replace(/\[\[:File:([^|]*)\|\s*\[\[File:([^|]*)\]\]\s*\]\]/gi, '[[File:$2|link=File:$1|center]]');
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
		content = '{{Notes de patch|crr=' + UPD.post.qfc + '|date=' + UPD.post.date + '}}' + content;
	} else {
		content = '{{Mise à jour|date=' + UPD.post.date.replace(/\b0(?=\d)/g, '') + '|catégorie=' + UPD.post.category + '|lien=' + UPD.post.url +'}}\n' + (restrictedTitle ? '{{DISPLAYTITLE:' + originalTitle + '}}\n' : '') +  '\n' + content;
	}
	
	if (restrictedTitle) {
		content += '\n{{Titre restreint|Impossible d\'utiliser les barres verticales dans les titres}}';
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
		UPD.statusMsg('Some inline CSS in a span/div tag was detected and brought in. Check that it looks OK - text/background colour, borders, etc');
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
		UPD.statusMsg('Warning: Some HTML tags have not been parsed completely yet. This might not have any consequences, but please do verify every edit made is correct. Debug info:<br />' + str /*+ ' An error report is being sent for further review...'*/);
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
		files.push(UPD.post.imgname + ' (' + (i+1) + ') update image' + extension);
	}
	var url, comment;
	function uploadFile(i) {
		UPD.statusMsg('Uploading file '+(i+1)+'/'+(files.length));
		url = UPD.post.imgs[i];
		comment = 'Automatically uploading news post image for [[MAJ:' + UPD.post.title + ']] using [[MediaWiki:MAJ.js|script de mide à jour]].\nSource: ' + url;
		var api = new mw.Api();
		api.post({
			action: 'upload',
			filename: files[i],
			comment: comment,
			text: '{{MAJ image|' + UPD.post.title + '|lien=' + url + '}}',
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
	UPD.statusMsg('Création page de mise à jour');
	//also create redirect in case the post contains question marks in the title
	var redir = UPD.post.title.indexOf('?') !== -1 ? 'MAJ:' + UPD.post.title.replace(/\?/g, '') : '';
	var api = new mw.Api();
	api.post({
		action: 'edit',
		title: 'MAJ:' + UPD.post.title,
		token: mw.user.tokens.get('editToken'),
		text: UPD.post.content,
		summary: 'Création automatique utilisant [[MediaWiki:MAJ.js|script de mise à jour]].',
	}).done(function() {
		UPD.affected.push('/wiki/MAJ:' + UPD.post.title);
		if (redir) {
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: redir,
				token: mw.user.tokens.get('editToken'),
				text: '#REDIRECT[[MAJ:' + UPD.post.title + ']]',
				summary: 'Redirigé automatiquement vers la page [[MAJ:' + UPD.post.title + ']] utilisant [[MediaWiki:MAJ.js|script de mise à jour]].',
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
	UPD.statusMsg('L\'édition de la page est terminée. Préparation à la remise à zéro des index...');
	var d = new Date(UPD.post.date);
	var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
		'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var year = d.getFullYear();
	var date = d.getDate() + '_' + months[d.getMonth()];
	var ctg = -1;
	var pagesToPurge = [];
	
	pagesToPurge.push(year);
	pagesToPurge.push(date);
	pagesToPurge.push('Modèle:Mise à jour');
	pagesToPurge.push('Wiki_FRS');
	switch (UPD.post.cgID) {
		case 1: ctg = 'Mises_à_jour_jeu';
		break;
		case 2: ctg = 'Mises_à_jour_site_web';
		break;
		case 3: ctg = 'Mises_à_jour_support';
		break;
		case 4: ctg = 'Mises_à_jour_technique';
		break;
		case 5: ctg = 'Mises_à_jour_communauté';
		break;
		case 6: ctg = 'Dans_les_coulisses';
		break;
		case 9: ctg = 'Mises_à_jour_magasin';
		break;
		case 12: ctg = 'Mises_à_jour_futures';
		break;
		case 13: ctg = 'Mises_à_jour_magasin_Salomon';
		break;
		case 14: ctg = 'Mises_à_jour_chasse_aux_trésors';
		break;
		case 15: ctg = 'Mises_à_jour_rétroactions';
		break;
		case 16: ctg = 'Mises_à_jour_événements';
		break;
		default: ctg = 'Notes de patch';
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
			UPD.statusMsg('Remise à zéro de '+pageNullEdit+' complété avec succès!');
			UPD.purged.push('/wiki/'+pageNullEdit);
		} else {
			UPD.statusMsg('Impossible de remettre à zéro '+pageNullEdit+': '+ d.error.code+ '<br />Veuillez purger manuellement cette page: <a href="/wiki/'+pageNullEdit+'?action=purge" target="_blank">ici</a>');
		}
	})
	.fail(function() {
		UPD.statusMsg('Impossible de remettre à zéro '+pageNullEdit+'<br />Veuillez purger manuellement cette page: <a href="/wiki/'+pageNullEdit+'?action=purge" target="_blank">ici</a>');
	})
	.always(function () {
		UPD.nullEdit(pagesToPurge);
	});
}

UPD.success = function() {
	UPD.statusMsg('Mise à jour complété.');
	var list = '<ul>\n', list2 = '<ul>\n';
	for (var i=0;i<UPD.affected.length;i++) {
		list += '<li><a href="'+UPD.affected[i]+'?diff=cur" target="_blank">'+UPD.affected[i].substr(6)+'</a></li>\n';
	}
	list += '</ul>';
	
	for (i=0;i<UPD.purged.length;i++) {
		list2 += '<li><a href="'+UPD.purged[i]+'?action=view" target="_blank">'+UPD.purged[i].substr(6)+'</a></li>\n';
	}
	list2 += '</ul>';
	UPD.statusMsg('Avant de fermer cette fenêtre, vérifiez que les modifications apportées aux pages suivantes sont correctement créées/éditées:\n'+list+'... et que les pages suivantes sont correctement purgées:\n'+list2);
};

UPD.errorReport = function(unparsed) {
	var message = 'En mettant à jour la page [[MAJ:'+UPD.post.title+']] les étiquettes suivantes n\'ont pas été analysées correctement:\n<pre>'+unparsed.join('\n')+'</pre>\n~~'+'~~';
	var api = new mw.Api();
	api.post({
		action: 'edit',
		section: 'new',
		title: 'Discussion MediaWiki:MAJ.js',
		summary: 'Rapport d\'erreur pour [[MediaWiki:MAJ.js|script de mise à jour]].',
		token: mw.user.tokens.get('editToken'),
		text: message,
		notminor: 'true',
	}).done(UPD.uploadFiles); 
};

//init
window.UPD = UPD; //the global object I'm going to use for this script.
if (
	(mw.config.get('wgTitle') == 'Update maker' && mw.config.get('wgNamespaceNumber') == 4) &&
	(mw.config.get('wgUserGroups').indexOf('sysop') !== -1 || mw.config.get('wgUserGroups').indexOf('custodian') !== -1)
) { //only custs/sysops on [[RuneScape:Update maker]] load this script
	$(function() {
		$('#UPD-form').html(
			$('<form action="javascript:void(0);"></form>')
			.append('<label>Enter URL to fetch update contents: <input type="url" id="UPD-url" size="100"/></label>')
			.append('<button>Créer une page de mise à jour!</button>')
			.submit(function() {
				window.UPD.getPost($('#UPD-url').val());
			})
		);
	});
} else delete UPD;