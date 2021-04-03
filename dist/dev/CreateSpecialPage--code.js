// <source lang="javascript">
/* created by Curiouscrab */
// use "<item>TEXT</item>" tags where TEXT is the text you want to show in order to divide items into list (Special:Page/# shows certain number of items in list)
// use "<l id="ITEM">TEXT</l>" tags where ITEM is whatever item you want and TEXT with the text you want to show (Special:Page/ITEM displays this)
var pageNames = window.pageNames || [];
var pageData = window.pageData || [];
var pagePurpose = window.pagePurpose || [];
if(wgNamespaceNumber == wgNamespaceIds.special && pageNames.indexOf(wgPageName.split('/')[0].split(':')[1]) > -1) {
	$.get(mw.util.wikiScript('api'), {
		action: 'query',
		meta: 'allmessages',
		ammessages: 'pagetitle',
		amenableparser: '',
		format: 'json'
	}, function(data) {
		$('title').html((pagePurpose[pageNames.indexOf(wgPageName.split('/')[0].split(':')[1])] || wgPageName.split('/')[0]) + ' ' + data.query.allmessages[0]['*'].split(' ').splice(1).join(' '));
	});
		$('.AdminDashboardArticleHeader').html('<h1>' + wgPageName.split('/')[0].split(':')[1] + '</h1>');
	$('#mw-content-text').html(pageData[pageNames.indexOf(wgPageName.split('/')[0].split(':')[1])]);
	if(!wgPageName.split('/')[1]) {
		if(document.getElementById('mw-content-text').innerHTML.search('<item>') > -1 || document.getElementById('mw-content-text').innerHTML.search('<l id="') > -1) {
			if(document.getElementById('mw-content-text').innerHTML.search('<item>') > -1) {
				$('#mw-content-text').html('<ul>' + document.getElementById('mw-content-text').innerHTML.replace(/<item>/g,'<li>').replace(/<\/item>/g,'</li>') + '</ul>');
			}
			if(document.getElementById('mw-content-text').innerHTML.search('<l id="') > -1) {
				for(i=0;i<document.getElementsByTagName('l').length;i++) {
					document.getElementsByTagName('l')[i].id = '';
				}
				$('#mw-content-text').html(document.getElementById('mw-content-text').innerHTML.replace(/<l id="">/g,'').replace(/<\/l>/g,'<br>'));
			}
		}
	} else {
		if(wgPageName.split('/')[1] * wgPageName.split('/')[1] == wgPageName.split('/')[1] * wgPageName.split('/')[1]) {
			var content = document.getElementById('mw-content-text').innerHTML.replace(/<item>/g,'<li>').replace(/<\/item>/g,'</li><splitter>').split('<splitter>');
			$('#mw-content-text').html('<ul></ul>');
			for(i=0;i<wgPageName.split('/')[1];i++) {
				if(content[i] !== undefined && content[i] !== '' && content[i].search('<l id="') < 0) {
					$('#mw-content-text ul').append(content[i]);
				}
			}
		} else {
			if(document.getElementById(wgPageName.split('/')[1]) !== null) {
				for(i=0;i<document.getElementsByTagName('l').length;i++) {
					if(document.getElementsByTagName('l')[i].id !== wgPageName.split('/')[1]) {
						document.getElementsByTagName('l')[i].style.display = 'none';
					}
				}
				$('item').css({display:'none'});
			}
		}
	}
	wgCanonicalNamespace = 'Special';
	wgCanonicalSpecialPageName = wgPageName.split('/')[0].split(':')[1];
	console.log('Special page created and loaded successfully.');
}
for(i=0;i<document.getElementsByClassName('new').length-1;i++) {
	if(pageNames.indexOf(document.getElementsByClassName('new')[i].pathname.split('/').splice(2).join('/').split(':')[1]) > -1) {
		document.getElementsByClassName('new')[i].title = document.getElementsByClassName('new')[i].innerHTML;
		document.getElementsByClassName('new')[i].className = 'text';
	}
}
if(wgPageName == 'Special:AdminDashboard') {
	for(i=0;i<pageNames.length;i++) {
		$('.content .controls').append('<li class="control"><a href="/wiki/Special:' + pageNames[i] + '">' + pageNames[i] + '</a></li>');
	}
}
if(wgPageName == 'Special:SpecialPages') {
	document.getElementsByClassName('mw-specialpages-table')[document.getElementsByClassName('mw-specialpages-table').length-1].getElementsByTagName('td')[0].id = 'other';
	for(i=0;i<pageNames.length;i++) {
		$('#other ul').append('<li><a href="/wiki/Special:' + pageNames[i] + '">' + pageNames[i] + '</a></li>');
	}
}
if(wgPageName == 'Special:WantedPages') {
	for(i=0;i<document.getElementsByClassName('special')[0].getElementsByTagName('a').length;i++) {
		if(document.getElementsByClassName('special')[0].getElementsByTagName('a')[i].innerHTML.split(':')[0] == 'Special' && pageNames.indexOf(document.getElementsByClassName('special')[0].getElementsByTagName('a')[i].innerHTML.split(':')[1]) > -1) {
			document.getElementsByClassName('special')[0].getElementsByTagName('li')[i].remove();
		}
	}
}
console.log('Loaded CreateSpecialPage v1.0');
// </source>