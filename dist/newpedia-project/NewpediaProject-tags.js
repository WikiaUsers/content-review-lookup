// <nowiki>
 
tags = {};
 
tags.addtag = function() {
	if( !(document.getElementById( 'ca-history' ) && document.getElementById( 'ca-edit' ))) return;
	if (wgCanonicalNamespace == "Project") {
		addPortletLink('p-cactions', 'javascript:tags.go(\'tag\')', 'Tag', 'ca-tag', 'Add a custom template or text to the top of this page');
		if (wgPageName == "Uncyclopedia:Ban_Patrol" && document.getElementById( 'ca-delete' )) {
			var tagBox = new Array(3);
			tagBox[0] = ['javascript:tags.go(\'bpc\')', 'BPC', '', 'Mark Ban Patrol as checked'];
			tagBox[1] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
			tagBox[2] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		} else if (wgPageName == "Uncyclopedia:QuickVFD" && document.getElementById( 'ca-delete' )) {
			var tagBox = new Array(3);
			tagBox[0] = ['javascript:tags.go(\'qvfdc\')', 'QVFDc', '', 'Mark QVFD as checked (only do this if it needs to be marked'];
			tagBox[1] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
			tagBox[2] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		}
		else {
			var tagBox = new Array(2);
			tagBox[0] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
			tagBox[1] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		}
		addCactionsDropdown('ca-tag', tagBox);
	} 
	else 	if (wgCanonicalNamespace == "UnNews") {
		addPortletLink('p-cactions', 'javascript:tags.go(\'tag\')', 'Tag', 'ca-tag', 'Add a custom template or text to the top of this page');
		var tagBox = new Array(4);
		tagBox[0] = ['javascript:tags.go(\'original\')', 'Original', '', 'Add the \'Original Newscasting\' template to this page'];
		tagBox[1] = ['javascript:tags.go(\'news\')', 'News header', '', 'Add the UnNews and date templates to this page'];
		tagBox[2] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
		tagBox[3] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		addCactionsDropdown('ca-tag', tagBox);
	}
	else if (wgCanonicalNamespace == "" 
	 || wgCanonicalNamespace == "UnTunes" 
	 || wgCanonicalNamespace == "HowTo" 
	 || wgCanonicalNamespace == "Why?" 
	 || wgCanonicalNamespace == "UnBooks" 
	 || wgCanonicalNamespace == "Unscripts" 
	 || wgCanonicalNamespace == "UnPoetia" 
	 || wgCanonicalNamespace == "Unquotable" 
	 || wgCanonicalNamespace == "UnDebate" 
	 || wgCanonicalNamespace == "UnReviews" 
	 || wgCanonicalNamespace == "Uncycloversity" 
	 || wgPageName == "User:Lyrithya/tags.js") {
		var tagBox = new Array(7);
 
		var icuBox = new Array(7);
		var fixBox = new Array(6);
		var formatBox = new Array(5);
		var writingBox = new Array(3);
		var unfunnyBox = new Array(3);
		var mergeBox = new Array(1);
 
		icuBox[0] = ['javascript:tags.go(\'icu\',\'notfunny\')', 'Not funny', '', 'Add an ICU: \'This page seems to be lacking in humor or satire.\''];
		icuBox[1] = ['javascript:tags.go(\'icu\',\'random\')', 'Random', '', 'Add an ICU: \'Truth is funnier than outright Lies or Plain Nonsense.\''];
		icuBox[2] = ['javascript:tags.go(\'icu\',\'encyclopedic\')', 'Encyclopedic', '', 'Add an ICU: \'Uncyclopedia is a parody of a Wikipedia-style Encyclopedia and should be written accordingly.\''];
		icuBox[3] = ['javascript:tags.go(\'icu\',\'format\')', 'Format', '', 'Add an ICU: \'This page needs some formatting help.\''];
		icuBox[4] = ['javascript:tags.go(\'icu\',\'short\')', 'Short', '', 'Add an ICU: \'This page needs some content!\''];
		icuBox[5] = ['javascript:tags.go(\'icu\',\'list\')', 'List', '', 'Add an ICU: \'This List needs some content!\''];
		icuBox[6] = ['javascript:tags.go(\'icu\',\'original\')', 'Original', '', 'Add an ICU: \'This article appears to have no redeeming value and is hence a candidate for speedy deletion.\' Only use this one if someone has already removed an ICU without permission.'];
 
		formatBox[0] = ['javascript:tags.go(\'fix\',\'list\')', 'Listiness', '', 'Add a fix tag: This article has too much listiness.'];
		formatBox[1] = ['javascript:tags.go(\'fix\',\'redlink\')', 'Red links', '', 'Add a fix tag: This article is full of links that don\'t go anywhere.'];
		formatBox[2] = ['javascript:tags.go(\'fix\',\'bluelink\')', 'Blue links', '', 'Add a fix tag: This article has too many blue links.'];
		formatBox[3] = ['javascript:tags.go(\'fix\',\'deadend\')', 'No links', '', 'Add a fix tag: This article is a Dead End.'];
		formatBox[4] = ['javascript:tags.go(\'fix\',\'images\')', 'Excess images', '', 'Add a fix tag: This article has too many images.'];
 
		writingBox[0] = ['javascript:tags.go(\'fix\',\'proofread\')', 'Proofread', '', 'Add a fix tag: This article needs a proofreading.'];
		writingBox[1] = ['javascript:tags.go(\'fix\',\'long\')', 'Too long', '', 'Add a fix tag: This article is quite drawn-out in spots.'];
		writingBox[2] = ['javascript:tags.go(\'fix\',\'unencyclopedic\')', 'Unencyclopedic', '', 'Add a fix tag: This article does not resemble an encyclopedia entry.'];
 
		unfunnyBox[0] = ['javascript:tags.go(\'fix\',\'random\')', 'Random', '', 'Add a fix tag: This article is terribly random.'];
		unfunnyBox[1] = ['javascript:tags.go(\'fix\',\'noconcept\')', 'No concept', '', 'Add a fix tag: This article appears to lack a unifying concept or idea.'];
		unfunnyBox[2] = ['javascript:tags.go(\'fix\',\'stupid\')', 'Stupid', '', 'Add a fix tag: This article relies heavily on stupid humor.'];
 
 
		fixBox[0] = [formatBox, 'javascript:tags.go(\'fix\',\'format\')', 'Format', '', 'Add a fix tag: This article needs formatting help.'];
		fixBox[1] = [writingBox, 'javascript:tags.go(\'fix\',\'badwriting\')', 'Bad writing', '', 'Add a fix tag: This is just plain bad writing.'];
		fixBox[2] = [unfunnyBox, 'javascript:tags.go(\'fix\',\'notfunny\')', 'Not funny', '', 'Add a fix tag: This article just isn\'t funny.'];
		fixBox[3] = ['javascript:tags.go(\'fix\',\'vanity\')', 'Vanity', '', 'Add a fix tag: This appears to be vanity.'];
		fixBox[4] = ['javascript:tags.go(\'fix\',\'qua?\')', 'Qua?', '', 'Add a fix tag: This text does not appear to be entirely English.'];
		fixBox[5] = ['javascript:tags.go(\'fix\', 1)', 'Multiple issues', '', 'Add a fix tag: This article has multiple issues.'];
 
		mergeBox[0] = ['javascript:tags.go(\'mergeinto\')', 'Mergeinto', '', 'Mark this article to have content from another merged into it']; 
 
		addPortletLink('p-cactions', 'javascript:tags.go(\'tag\')', 'Tag', 'ca-tag', 'Add a custom template or text to the top of this page');
		tagBox[0] = [icuBox, 'javascript:tags.go(\'icu\', 0)', 'ICU', '', 'Add an ICU with a custom fix message'];
		tagBox[1] = [fixBox,'javascript:tags.go(\'fix\', 0)', 'Fix', '', 'Tag this article as needing to be fixed - default use'];
		tagBox[2] = ['javascript:tags.go(\'expansion\')', 'Expand', '', 'Tag this article for expansion'];
		tagBox[3] = ['javascript:tags.go(\'aap\')', 'AAP', '', 'Mark this article as a candidate for recieving some pictures'];
		tagBox[4] = [mergeBox, 'javascript:tags.go(\'merge\')', 'Merge', '', 'Mark this to be merged into another article'];
		tagBox[5] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
		tagBox[6] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		addCactionsDropdown('ca-tag', tagBox);
	}
	else if (wgCanonicalNamespace == "Category") {
		var tagBox = new Array(4);
		addPortletLink('p-cactions', 'javascript:tags.go(\'tag\')', 'Tag', 'ca-tag', 'Add a custom template or text to the top of this page');
		tagBox[0] = ['javascript:tags.go(\'catbrowser\')', 'CatBrowser', '', 'Add a CatBrowser to this category page'];
		tagBox[1] = ['javascript:tags.go(\'diffuse\')', 'Diffuse', '', 'Mark this category as having too many subpages'];
		tagBox[2] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
		tagBox[3] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		addCactionsDropdown('ca-tag', tagBox);
	}
	else if ( 	wgCanonicalNamespace == "Template" || wgCanonicalNamespace == "Game" ) {
		var tagBox = new Array(2);
		addPortletLink('p-cactions', 'javascript:tags.go(\'tag\')', 'Tag', 'ca-tag', 'Add a custom template or text to the top of this page');
		tagBox[0] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		tagBox[1] = ['javascript:vfd.go()', 'VFD', '', 'Nominate this page for deletion'];
		addCactionsDropdown('ca-tag', tagBox);
	}
	else if (wgNamespaceNumber > 0) {
		var tagBox = new Array(1);
		addPortletLink('p-cactions', 'javascript:tags.go(\'tag\')', 'Tag', 'ca-tag', 'Add a custom template or text to the top of this page');
		tagBox[0] = ['javascript:tags.go(\'other\')', 'Other', '', 'Add a custom template or text to the bottom of this page'];
		addCactionsDropdown('ca-tag', tagBox);
	}
}
 
tags.debugOutput = function(str) {
	tags.output += str;
	tags.panel.setBody(tags.output);
}
tags.debugStatus = function(i) {
	var s = (i) ? 'green;"> [OK]' : 'red;"> [FAILED]';
	tags.debugOutput('<span style="font-weight: bold;color:' + s + '</span>');
}
 
tags.go = function(type, moo) { 
	if (type == 'aap')
		tags.tag = '{{AAP}}';
	else if (type == 'bpc')
		tags.tag = '{{BPC|' + wgUserName + '}}';
	else if (type == 'catbrowser')
		tags.tag = '{{CatBrowser}}';
	else if (type == 'diffuse')
		tags.tag = '{{Category diffuse}}';
	else if ( type == 'fix' ) {
		if (moo == 0) tags.tag = '{{fix}}';
		else if (moo == 1) {
			 tags.tag = '{{fix|' + prompt( 'Fix tags (separated by \'|\'):', '' ) + '}}';
			if ( tags.tag == '{{fix|}}' || tags.tag == '{{fix|}}' ) 
				return;
		} else tags.tag = '{{fix|' + moo + '}}';
	} else if ( type == 'icu' ) {
		if (moo == 0) {
			tags.tag = '{{ICU|~~~~~|fix=' + prompt( 'ICU fix comment:', '' ) + '}}';
			if (tags.tag == '{{ICU|~~~~~|fix=null}}' || tags.tag == '{{ICU|~~~~~|fix=}}' )
				return;
		} else tags.tag = '{{ICU|~~~~~|sub=' + moo + '}}';
	} else if ( type == 'merge' || type == 'mergeinto' ) {
		if ( type == 'merge' ) tags.other = prompt( 'Article to merge into:', '' );
		else tags.other = prompt( 'Article to merge into this:', '' );
		if ( tags.other == 'null' || tags.other == '' )
			return;
		tags.tag = '{{' + type + '|' + tags.other + '}}';
	} else if (type == 'news'){ 
		tags.tag = prompt( 'Date:', '' );
		if ( tags.tag == null || tags.tag == '' ) {
			tags.tag = '{{news|{{subst:CURRENTDAY}} {{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}\n{{date|{{subst:CURRENTDAY}} {{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}';
		} else tags.tag = '{{news|' + tags.tag + '}}\n{{date|' + tags.tag + '}}';
	} else if (type == 'other'){
		tags.tag = prompt( 'Text or tag to append to page:', '' );
		if ( tags.tag == null || tags.tag == '' ) {
			return;
		}
	} else if (type == 'qvfdc'){ 
		tags.tag = '{{QVFD checked}} ';
	} else if (type == 'tag'){
		tags.tag = prompt( 'Text or tag to prepend to page:', '' );
		if ( tags.tag == null || tags.tag == '' ) {
			return;
		}
	}
	else tags.tag = '{{' + type + '}}';
	if (type == 'merge' || type == 'mergeinto') 
		tags.type = 'merge';
	else tags.type = type;
	tags.page = wgPageName.replace(/_/g,' ');
	tags.panel = new YAHOO.widget.Panel("tags", { width:"240px", fixedcenter:true, draggable:true, zindex:10, modal:false, visible:false } ); 
	tags.panel.setHeader('tagging, please wait...');
	tags.panel.setFooter('<br /><hr>Created through heavy use of <a href="/wiki/Workaround-oriented_programming">workaround-oriented programming</a> from various other scripts.')
	tags.output = '';
	tags.debugOutput("<br />Loading page...");
	tags.panel.render(document.body); 
	tags.panel.show();
	if (tags.type == 'bpc' || tags.type == 'qvfdc') {
		YAHOO.util.Connect.asyncRequest( 'GET', '/api.php?action=query&titles=' + wgPageName + '&prop=revisions|info|links&pllimit=500&rvprop=content&rvlimit=1&rvsection=1&format=xml&intoken=edit', tags.update, null );
	} else YAHOO.util.Connect.asyncRequest('GET', '/api.php?action=query&titles=' + wgPageName + '&prop=revisions|info|links&pllimit=500&rvprop=content&rvlimit=1&format=xml&intoken=edit', tags.update, null);
}
 
tags.update = {
	success: function(o) {
		tags.debugStatus(1);
		tags.debugOutput('<br />Adding tag...');
		try {
			var sectionText = o.responseXML.getElementsByTagName('rev')[0].firstChild.nodeValue;
			if (tags.type == 'bpc' || tags.type == 'qvfdc') {
				var lines = sectionText.split( '\n' );
				lines.splice( 1, 0, tags.tag );
				sectionText = lines.join( '\n' );
			} else if (wgCanonicalNamespace == 'Template') {
				if (tags.type == 'other') {
					sectionText = sectionText + '<noinclude>\n' + tags.tag + '\n</noinclude>';
				} else {
					sectionText = '<noinclude>' + tags.tag + '\n</noinclude>' + sectionText;
				}	
			}
			else {
				if (tags.type == "icu" || tags.type == "original" ) {
					sectionText = sectionText + '\n\n' + tags.tag;
				} else if (tags.type == 'other') {
					sectionText = sectionText + '\n' + tags.tag;
				} else {
					sectionText = tags.tag + '\n' + sectionText;
				}
			}
		} catch(e) {
			tags.debugStatus(0);
			tags.debugOutput('<br />Could not add text to the page.<br /><a href="javascript:tags.panel.hide()">Close</a>');
			return;
		}
		tags.debugStatus(1);
		tags.debugOutput('<br />Saving page...');
 
		if (tags.type == 'icu') tags.type = '+ICU: This new page should be improved or it will become a candidate for deletion in seven days.';
		else if (tags.type == 'fix') tags.type = '+Fix: This page may need one or more assorted fixes.';
		else if (tags.type == 'expansion') tags.type = '+Expansion: This short page should be expanded into a full article.';
		else if (tags.type == 'aap') tags.type = '+AAP: This page needs some images.';
		else if (tags.type == 'catbrowser') tags.type = '+CatBrowser';
		else if (tags.type == 'original') tags.type = '+Original content notice';
		else if (tags.type == 'news') tags.type = '+Presumably proper news header';
		else if (tags.type == 'bpc') tags.type = 'BPC';
		else if (tags.type == 'qvfdc') tags.type = 'QVFDc';
		else if (tags.type == 'diffuse') tags.type = '+Diffuse: Pages in this category should be moved to subcategories';
		else if (tags.type == 'merge') tags.type = '+Merge: This page should be merged with [[' + tags.other + ']].';
		else if (tags.type == 'other' || tags.type == 'tag') tags.type = 'Vigilance.';
 
		var token = o.responseXML.getElementsByTagName('page')[0].getAttribute('edittoken');
		if (tags.type == 'BPC' || tags.type == 'QVFDc') {
			var post = 'title=' + wgPageName + '&section=1&token=' + encodeURIComponent( token ) + '&summary=' + encodeURIComponent(tags.type) + '&text=' + encodeURIComponent(unescape(sectionText));
		} else var post = 'title=' + wgPageName + '&token=' + encodeURIComponent(token) + '&summary=' + encodeURIComponent(tags.type) + '&text=' + encodeURIComponent(unescape(sectionText));
		YAHOO.util.Connect.asyncRequest('POST', '/api.php?action=edit&format=xml', tags.saved, post);
	},
	failure: function() {
		tags.debugStatus(0);
		tags.debugOutput('<br />Couldn\'t connect to page.<br /><a href="javascript:tags.panel.hide()">Close</a>');
	}
}
 
 
tags.saved = {
	success: function(o) {
		try {
			result = (o.responseXML.getElementsByTagName('edit')[0].getAttribute('result') == 'Success') ? 1 : 0;
		} catch(e) {
			result = 0;
		}
		if (result) {
			tags.debugStatus(1);
			tags.debugOutput('<br /><b>Saved!</b><br /><a href="javascript:tags.panel.hide()">close</a>');
			if (wgIsArticle) window.location = '/wiki/' + wgPageName;
		} else {
			with(o.responseXML.getElementsByTagName('error')[0]) {
				tags.debugStatus(0);
				tags.debugOutput('<br /><b>Saving failed :(</b><br />Error: ' + getAttribute('code') + ' - ' + getAttribute('info') + '<br /><a href="/wiki/' + wgPageName + '?action=edit">Add manually</a> or <br /><a href="javascript:tags.panel.hide()">close</a>');
			}
		}
	},
	failure: function(o) {
		tags.debugStatus(0);
		tags.debugOutput('<br /><b>Connection failed. <a href="javascript:tags.panel.hide()">close</a>');
	}
}
 
/* This should really be merged into the above, but ugh, do I ever not want to. */
vfd = {};
 
vfd.debugOutput = function(str) {
	vfd.output += str;
	vfd.panel.setBody(vfd.output);
}
vfd.debugStatus = function(i) {
	var s = (i) ? 'green;"> [OK]' : 'red;"> [FAILED]';
	vfd.debugOutput('<span style="font-weight: bold;color:' + s + '</span>');
}
 
vfd.go = function() {
	vfd.comment = prompt( 'Reason:', '' );
	if ( vfd.comment == null ) {
		return;
	}
	vfd.page = wgPageName.replace(/_/g,' ');
	vfd.panel = new YAHOO.widget.Panel("vfd", { width:"240px", fixedcenter:true, draggable:true, zindex:10, modal:false, visible:false } ); 
	vfd.panel.setHeader('VFDing, please wait...');
	vfd.panel.setFooter('<br /><hr>Created through heavy use of <a href="/wiki/Workaround-oriented_programming">workaround-oriented programming</a> from various other scripts.');
	vfd.output = '';
	vfd.debugOutput("<br />Loading VFD page...");
	vfd.panel.render(document.body); 
	vfd.panel.show();
	YAHOO.util.Connect.asyncRequest('GET', '/api.php?action=query&titles=Uncyclopedia:Votes_for_deletion&prop=revisions|info|links&pllimit=500&rvprop=content&rvlimit=1&rvsection=2&format=xml&intoken=edit', vfd.update, null);
}
 
vfd.update = {
	success: function(o) {
		vfd.debugStatus(1);
		vfd.debugOutput("<br />Checking VFD for selected page...");
		var titles = o.responseXML.getElementsByTagName('pl');
		for (lk in titles) {
			try {
				if (titles[lk].getAttribute('title') == vfd.page) {
					vfd.debugStatus(0);
					vfd.debugOutput('<br />Page already on VFD!<br /><a href="javascript:vfd.panel.hide()">Close</a>');
					return;
				}
			} catch(e) {};
		}
		vfd.debugStatus(1);
		vfd.debugOutput('<br />Adding page...');
		try {
			var sectionText = o.responseXML.getElementsByTagName('rev')[0].firstChild.nodeValue;
			sectionText = '=={{VFDn|' + vfd.page +'}}==\n{{VFDt|
time=~~~~~\n|delnumber=1\n|delete=\n#' + vfd.comment + ' ~~~\n|
keepnumber=0\n|keep=\n|comments=\n}}\n\n' + sectionText;
		} catch(e) {
			vfd.debugStatus(0);
			vfd.debugOutput('<br />Could not add text to the page!<br /><a href="javascript:vfd.panel.hide()">Close</a>');
			return;
		}
		vfd.debugStatus(1);
		vfd.debugOutput('<br />Saving page...');
 
		var token = o.responseXML.getElementsByTagName('page')[0].getAttribute('edittoken');
		var post = 'title=Uncyclopedia:Votes_for_deletion&section=2&token=' + encodeURIComponent(token) + '&summary=%2B[[' + encodeURIComponent(vfd.page) + ']]&text=' + encodeURIComponent(unescape(sectionText));
		YAHOO.util.Connect.asyncRequest('POST', '/api.php?action=edit&format=xml', vfd.saved, post);
	},
	failure: function() {
		vfd.debugStatus(0);
		vfd.debugOutput('<br />Couldn\'t connect to VFD page!<br /><a href="javascript:vfd.panel.hide()">Close</a>');
	}
}
 
vfd.saved = {
	success: function(o) {
		try {
			result = (o.responseXML.getElementsByTagName('edit')[0].getAttribute('result') == 'Success') ? 1 : 0;
		} catch(e) {
			result = 0;
		}
		if (result) {
			vfd.debugStatus(1);
			vfd.debugOutput('<br /><b>Saved!</b>');
			YAHOO.util.Connect.asyncRequest('GET', '/api.php?action=query&titles=' + wgPageName + '&prop=revisions|info|links&pllimit=500&rvprop=content&rvlimit=1&rvsection=0&format=xml&intoken=edit', vfd.tag, null);
		} else {
			with(o.responseXML.getElementsByTagName('error')[0]) {
				vfd.debugStatus(0);
				vfd.debugOutput('<br /><b>Saving failed :(</b><br />Error: ' + getAttribute('code') + ' - ' + getAttribute('info') + '<br /><a href="/wiki/Uncyclopedia:Votes_for_deletion">Add manually</a> or <br /><a href="javascript:vfd.panel.hide()">close</a>');
			}
		}
	},
	failure: function(o) {
		vfd.debugStatus(0);
		vfd.debugOutput('<br /><b>Connection failed :(</b><br /><a href="/wiki/Uncyclopedia:Votes_for_deletion">Go to VFD</a> or <br /><a href="javascript:vfd.panel.hide()">close</a>');
	}
}
vfd.tag = {
	success: function(o) {
		vfd.debugStatus(1);
		vfd.debugOutput('<br />Adding tag...');
		try {
			var sectionText = o.responseXML.getElementsByTagName('rev')[0].firstChild.nodeValue;
			if (wgCanonicalNamespace == 'Template') sectionText = '<noinclude>{{VFD}}\n</noinclude>' + sectionText;
			else sectionText = '{{VFD}}\n' + sectionText;
		} catch(e) {
			vfd.debugStatus(0);
			vfd.debugOutput('<br />Could not add text to the page.<br /><a href="javascript:vfd.panel.hide()">Close</a>');
			return;
		}
		vfd.debugStatus(1);
		vfd.debugOutput('<br />Saving page...');
 
		var token = o.responseXML.getElementsByTagName('page')[0].getAttribute('edittoken');
		var post = 'title=' + wgPageName + '&section=0&token=' + encodeURIComponent(token) + '&summary=%2BVFD&text=' + encodeURIComponent(unescape(sectionText));
		YAHOO.util.Connect.asyncRequest('POST', '/api.php?action=edit&format=xml', vfd.savedtags, post);
	},
	failure: function() {
		tags.debugStatus(0);
		tags.debugOutput('<br />Couldn\'t connect to page.<br /><a href="javascript:tags.panel.hide()">Close</a>');
	}
}
 
vfd.savedtags = {
	success: function(o) {
		try {
			result = (o.responseXML.getElementsByTagName('edit')[0].getAttribute('result') == 'Success') ? 1 : 0;
		} catch(e) {
			result = 0;
		}
		if (result) {
			vfd.debugStatus(1);
			vfd.debugOutput('<br /><b>Saved!</b><br /><a href="/wiki/Uncyclopedia:Votes_for_deletion">Go to VFD</a> or <br /><a href="javascript:vfd.panel.hide()">close</a>');
			if (wgIsArticle) window.location = '/wiki/' + wgPageName;
 
		} else {
			with(o.responseXML.getElementsByTagName('error')[0]) {
				vfd.debugStatus(0);
				vfd.debugOutput('<br /><b>Saving failed :(</b><br />Error: ' + getAttribute('code') + ' - ' + getAttribute('info') + '<br /><a href="/wiki/' + wgPageName + '?action=edit">Add manually</a> or <br /><a href="javascript:vfd.panel.hide()">close</a>');
			}
		}
	},
	failure: function(o) {
		vfd.debugStatus(0);
		vfd.debugOutput('<br /><b>Connection failed. <a href="javascript:tags.panel.hide()">close</a>');
	}
}
 
YAHOO.util.Event.onContentReady('p-cactions', tags.addtag);
 
// </nowiki>