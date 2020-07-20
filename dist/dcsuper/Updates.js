//<nowiki>
 
window.UPD = {}; //the global object I'm going to use for this script.
UPD.post = {}; //storing the post's data
UPD.post.imgs = []; //storing all image urls.
UPD.post.imgname;
UPD.affected = [];
 
//News post functions
 
function toCORS(url) {
	var CORSSite = 'anyorigin.com'; //or whateverorigin.org
	return 'http://'+CORSSite+'/get/?url=' + encodeURIComponent(url) + '&callback=?';
}
 
UPD.statusMsg = function(msg) {
	$('#UPD-status :last-child').css('color', '#2B2')
	$('#UPD-status').append('<li>' + msg + '</li>');
}
 
UPD.getPost = function(url) {
	UPD.statusMsg('Fetching post data from <a href="'+url+'" target="_blank">'+url+'</a>.');
	$.getJSON(toCORS(url), function(data) {
		UPD.statusMsg('Parsing data');
		UPD.parsePost($(data.contents).find('article.content'));
	});
}
 
UPD.parsePost = function($post) {
	var $content = $post.find('.articleContentText');
	//meta info
	UPD.post.title = $post.find('.articleContent > h2').html().replace(/&amp;/g, '&');
	UPD.post.date = $post.find('.articleMeta time').html();
	UPD.post.category = $post.find('.articleMeta span a').html();
	UPD.post.cgID = $post.find('.articleMeta span a').attr('href').match(/cat=(\d+)/)[1];
	//extra function
	function getIMGName(url) {
		var name = 'File:';
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
		$content.prepend('[[' + getIMGName($post.find('.feature img').attr('src')) + ']]\n\n');
	}
	$content.find('iframe[src*="youtube.com"]').replaceWith(function() {
		return '{{Youtube|' + $(this).attr('src').match(/\/embed\/([^\/?&]+)/)[1] + '}}\n'
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
	$content.find('b, strong').replaceWith(function() { //bold text
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
	$content.find('span').filter(function() { //spans without attributes
		return this.attributes.length === 0;
	}).replaceWith(function() {
		return this.innerHTML;
	});
	$content.find('h1, h2, h3, h4, h5, h6').replaceWith(function() { //headers
		return '&lt;big&gt;&lt;b&gt;' + this.innerHTML + '&lt;/b&gt;&lt;/big&gt;';
	});
	$content.find('span, div, u').replaceWith(function() { //other html tags
		var tag = this.tagName.toLowerCase();
		return '&lt;'+tag+'&gt;' + this.innerHTML + '&lt;/'+tag+'&gt;';
	});
	$content.find('br').replaceWith('&lt;br&gt;');
	//links
	$content.find('a[href*="://services.runescape.com/m=rswiki/en/"]').replaceWith(function() { // JagexWiki
		var wikiArticle = $(this).attr('href').replace(/^.*?\/m=rswiki\/en\//, '').replace(/_/g, ' ');
		return '{{JagexWiki|' + wikiArticle + '|' + this.innerHTML + '}}';
	});
	$content.find('a[href*="://services.runescape.com/"], a[href*="://cdn.runescape.com/"]').filter(function() { //links to images
		return /(jpe?g|png)$/.test($(this).attr('href'));
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
	var content = $content.html();
	content = content.replace(/\[\[:File:([^|]*)\|\s*\[\[File:([^|]*)\]\]\s*\]\]/gi, '[[File:$2|link=File:$1|center]]');
	//HTML encoded characters
	var encoding = {
		lt:'<',
		gt:'>',
		quot:'"', rdquo:'"', ldquo: '"',
		apos:"'", rsquo:"'", lsquo: "'",
		hellip:'…',
		ndash:'–'
	}
	content = content.replace(/\&([lg]t|quot|[lr]dquo|apos|[rl]squo|hellip|ndash);/g, function(match, type) {
		return encoding[type];
	});
	content = '{{Update|date=' + UPD.post.date.replace(/\b0(?=\d)/g, '') + '|category=' + UPD.post.category + '}}\n\n' + content;
	content = content.replace(/\n{3,}/g, '\n\n'); //fixing quadruple enters caused by having 2 paragraphs below each other
	content = content.replace(/&amp;/g, '&'); //replace "&amp;" appearing in links and headers with just "&"
	content = content.replace(/^[ \t]*/gm, '');
	UPD.post.content = content;
	//verification that everything has been parsed
	if ($content.contents().filter(function() {return this.nodeType !== 3}).length > 1) {
		var unparsed = [];
		$content.contents().filter(function() {return this.nodeType !== 3}).each(function() {
			unparsed.push('&lt;'+this.tagName+'&gt; of nodeType='+this.nodeType);
		});
		UPD.statusMsg('Warning: Some HTML tags have not been parsed completely yet. This might not have any consequences, but please do verify every edit made is correct.' /*+ ' An error report is being sent for further review...'*/);
		//UPD.errorReport(unparsed);
	} else {
		UPD.uploadFiles();
	}
}
 
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
		comment = 'Automatically uploading news post image for [[Update:' + UPD.post.title + ']] using [[User:The Mol Man/updates.js|updates script]].\nSource: ' + url;
		var api = new mw.Api();
		api.post({
			action: 'upload',
			filename: files[i],
			comment: comment,
			text: '{{Update image|' + UPD.post.title + '|link=' + url + '}}',
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
}
 
UPD.createPage = function() {
	UPD.statusMsg('Creating update page');
	//also create redirect in case the post contains question marks in the title
	var redir = UPD.post.title.indexOf('?') !== -1 ? 'Update:' + UPD.post.title.replace(/\?/g, '') : '';
	var api = new mw.Api();
	api.post({
		action: 'edit',
		title: 'Update:' + UPD.post.title,
		token: mw.user.tokens.get('editToken'),
		text: UPD.post.content,
		summary: 'Automated creation using [[User:The Mol Man/updates.js|updates script]].',
	}).done(function() {
		UPD.affected.push('/wiki/Update:' + UPD.post.title);
		if (redir) {
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: redir,
				token: mw.user.tokens.get('editToken'),
				text: '#REDIRECT[[Update:' + UPD.post.title + ']]',
				summary: 'Automatically redirected page to [[Update:' + UPD.post.title + ']] using [[User:The Mol Man/updates.js|updates script]].',
			}).done(function() {
				UPD.affected.push('/wiki/'+redir.substr(1));
				UPD.updatesTemplate();
			});
		} else {
			UPD.updatesTemplate();
		}
	});
}
 
UPD.updatesTemplate = function() {
	UPD.statusMsg('Fetching newspost RSS data');
	var title = UPD.post.title;
	$.getJSON(toCORS('http://services.runescape.com/m=news/latest_news.rss'), function(data) {
		var $item = $(data.contents).find('title:contains('+title+')').parents('item');
		var d = new Date($item.find('pubDate').text());
		var months = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
		var date = d.getDate() + ' ' + months[d.getMonth()];
		var text = $.trim($item.find('description').text());
		var template = '{{Updates/Line|date='+date+'|title='+title+'|text='+text+'}}\n';
		var api = new mw.Api();
		api.post({
			action: 'query',
			titles: 'Template:Updates',
			prop: 'revisions',
			indexpageids: 'true',
			rvprop: 'content',
		}).done(function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			var content = page.revisions[0]['*'];
			//move to the next one if update's already there.
			if (content.match(new RegExp('{{Updates\\/Line[^}]*\\|title='+title, 'i'))) return UPD.updateLists();
			UPD.statusMsg('Updating <a href="/wiki/Template:Updates" target="_blank">Template:Updates</a>');
			//position of the first template: The pipe is needed to exclude the <!--documentation-->
			var i = content.indexOf('{{Updates/Line|');
			content = content.substr(0,i) + template + content.substr(i); //insert template there
			/* Verification needed that:
			 * No more than 4 updates across _more_ than 2 days are listed
			 * No more than 5 updates across exatcly 2 days are listed
			 * If the update count exceeds these amounts, the oldest day's worth of updates should be removed
			 * 2 adjacent updates on the same day should have the second update without |date= parameter
			 */
			//fix adjacent updates' |date= parameter
			var re = /{{Updates\/Line\|date=([^\|]+)(\|.*?)\n{{Updates\/Line\|date=\1/g;
			content = content.replace(re, '{{Updates/Line|date=$1$2\n{{Updates/Line');
			//check for having too many updates
			var updateDays = content.match(/{{Updates\/Line\|date=/g).length;
			var updates = content.match(/{{Updates\/Line\|/g).length;
			if ((updateDays > 2 && updates > 4) || (updateDays === 2 && updates > 5)) {
				//these indices captures the oldest day's worth of updates
				var oldestStart = content.lastIndexOf('{{Updates/Line|date='); //oldest listed update day's start
				var oldestEnd = content.indexOf('<!--', oldestStart); //...and end
				content = content.substr(0,oldestStart) /*old updates cut out*/ + content.substr(oldestEnd);
			}
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: 'Template:Updates',
				token: mw.user.tokens.get('editToken'),
				text: content,
				summary: 'Automated update using [[User:The Mol Man/updates.js|updates script]].',
				minor: 'true',
			}).done(function() {
				UPD.affected.push('/wiki/Template:Updates');
				UPD.updateLists();
			});
		});
	});
}
 
UPD.updateLists = function() {
	UPD.statusMsg('Preparing updates to news index pages');
	UPD.listCount = 0;
	var d = new Date(UPD.post.date);
	var months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];
	var year = d.getFullYear();
	var date = d.getDate() + ' ' + months[d.getMonth()];
	var gameUpdate = UPD.post.cgID == '1';
 
	var day = d.getDate();
	var month = months[d.getMonth()];
	var api = new mw.Api();
	api.get({
		action: 'query',
		titles: date + '|' + year + (gameUpdate ? '|Update:Game updates' : ''),
		prop: 'revisions',
		indexpageids: 'true',
		rvprop: 'content',
	}).done(function(response) {
		var pagesObj = response.query.pages;
		var pageids = response.query.pageids;
		var pages = [], temp;
		for (var i=0;i<pageids.length;i++) {
			temp = pagesObj[pageids[i]];
			if (temp) switch(temp.title) {
				case date: pages[0] = temp;break;
				case year+'': pages[1] = temp;break;
				case 'Update:Game updates': pages[2] = temp;break;
			}
		}
 
		// Date page updating (and also some cleanup)
		var content1 = pages[0].revisions[0]['*'];
		if (content1.indexOf('{{UD|' + UPD.post.title + '}}') === -1) {
			var i1 = content1.search(/^\*\s*'''/m);
			var cat1 = UPD.post.category;
			cat1 = cat1.replace(/Updates/, "update").replace(/The/, "the").replace("Your ", "").replace("Events", "Event update");
			var template1 = "*'''" + year + "''' – " + cat1 + ': {{UD|' + UPD.post.title + '}}\n'
			content1 = content1.substr(0, i1) + template1 + content1.substr(i1);
			//consistent use of &mdash; instead of minus, and consistent spacing between * and ''':
			content1 = content1.replace(/\*\s*'''(\d+)''' [—-] /g, "*'''$1''' - "); //emdash and minus sign -> endash
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: date,
				token: mw.user.tokens.get('editToken'),
				text: content1,
				summary: 'Automated update using [[User:The Mol Man/updates.js|updates script]].',
				minor: 'true',
			}).done(function() {
				UPD.affected.push('/wiki/'+date.replace(' ','_'));
				UPD.statusMsg('Completed updating <a href="/wiki/'+date.replace(' ','_')+'" target="_blank">'+date+'</a>');
				UPD.success();
			});
		} else UPD.success();
 
		// Year page updating
		var content2 = pages[1].revisions[0]['*'];
		if (content2.indexOf('{{UD|' + UPD.post.title + '}}') === -1) {
			var re = new RegExp('==\\s*'+month+'\\s*==\n'); //regex for finding this month's header
			if (!(re).test(content2)) {
				//This month's section hasn't been created yet
				var prevHeader = content2.indexOf('==');
				if (prevHeader === -1) { //no headers exist, for new years
					prevHeader = content2.indexOf('{{Timeline}}');
					if (prevHeader === -1) { //if the page doesn't even have navigational templates yet
						prevHeader = content2.length - 1;
					}
				}
				content2 = content2.substr(0, prevHeader) + '=='+month+'==\n\n' + content2.substr(prevHeader);
			}
			var i2 = content2.search(re) + content2.match(re)[0].length;
			if (content2.search(new RegExp('^\\*\\s*[['+date+']]', 'm')) === -1) { //no listed updates for this day yet
				//Simple solution: just insert at the top
				//If a check for where to insert this is needed, tell me.
				content2 = content2.substr(0, i2) + '*[['+date+']]\n' + content2.substr(i2);
				i2 += ('*[['+date+']]\n').length;
			} else {
				i2 = content2.search(/^\*\s*[['+date+']]/m);
			}
			content2 = content2.substr(0, i2) + '**{{UD|' + UPD.post.title + '}}\n' + content2.substr(i2);
			var api = new mw.Api()
			api.post({
				action: 'edit',
				title: year,
				token: mw.user.tokens.get('editToken'),
				text: content2,
				summary: 'Automated update using [[User:The Mol Man/updates.js|updates script]].',
				minor: 'true',
			}).done(function() {
				UPD.affected.push('/wiki/'+year);
				UPD.statusMsg('Completed updating <a href="/wiki/'+year+'" target="_blank">'+year+'</a>');
				UPD.success();
			});
		} else UPD.success();
 
		//[[Update:Game updates]], if the update is indeed a game update.
		if (!gameUpdate) return true;
		var content3 = pages[2].revisions[0]['*'];
		if (content3.indexOf('{{UD|' + UPD.post.title + '}}') === -1) {
			var re = new RegExp('===\\s*'+year+'\\s*===\\n');
			if (!re.test(content3)) {
				var prevYear = new RegExp('===\\s*'+(year-1)+'\\s*===\\n');
				content3 = content3.substr(0, prevYear) + '==='+year+'===\n' + content3.substr(prevYear);
			}
			var i3 = content3.search(re) + content3.match(re)[0].length;
			content3 = content3.substr(0,i3) + '*[['+date+']]: {{UD|' + UPD.post.title + '}}\n';
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: 'Update:Game updates',
				token: mw.user.tokens.get('editToken'),
				text: content3,
				summary: 'Automated update using [[User:The Mol Man/updates.js|updates script]].',
				minor: 'true',
			}).done(function() {
				UPD.affected.push('/wiki/Update:Game updates');
				UPD.statusMsg('Completed updating <a href="/wiki/Update:Game updates" target="_blank">Update:Game updates</a>');
				UPD.success();
			});
		} else UPD.success();
	});
}
 
UPD.success = function() {
	UPD.listCount++;
	if ((UPD.post.cgID == '1' && UPD.listCount == 3) || UPD.post.cgID != '1') {
		UPD.statusMsg('Updating complete.');
		var list = '<ul>\n';
		for (var i=0;i<UPD.affected.length;i++) {
			list += '<li><a href="'+UPD.affected[i]+'?diff=cur" target="_blank">'+UPD.affected[i].substr(6)+'</a></li>\n';
		}
		list += '</ul>';
		UPD.statusMsg('Before closing this window, verify the edits made on the following pages are correct:\n'+list);
	}
}
 
UPD.errorReport = function(unparsed) {
	var message = 'While updating the page [[Update:'+UPD.post.title+']] the following tag(s) occurred which were not parsed correctly:\n<pre>'+unparsed.join('\n')+'</pre>\n~~'+'~~';
	var api = new mw.Api();
	api.post({
		action: 'edit',
		section: 'new',
		title: 'User talk:Joeytje50',
		summary: 'Error report for [[User:The Mol Man/updates.js|updates script]].',
		token: mw.user.tokens.get('editToken'),
		text: message,
		notminor: 'true',
	}).done(UPD.uploadFiles); 
}
 
//init
 	$(function() {
		$('#UPD-form').html(
			$('<form action="javascript:void(0);"></form>')
			.append('<label>Enter URL to fetch update contents: <input type="url" id="UPD-url" size="100"/></label>')
			.append('<button>Create update page!</button>')
			.submit(function() {
				UPD.getPost($('#UPD-url').val());
			})
		);
	});