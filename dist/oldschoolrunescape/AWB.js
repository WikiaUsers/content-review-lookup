var getCheckList = $.ajax('/index.php?title=MediaWiki:AWB.js/checklist.js&action=raw&ctype=text/javascript');
getCheckList.done(function(CheckList) {
if (CheckList.indexOf(wgUserName)!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
 
//setting main variables
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
var bot = (wgUserGroups.indexOf('bot')!=-1);
var sysop = (wgUserGroups.indexOf('sysop')!=-1);
var custodian = (wgUserGroups.indexOf('custodian')!=-1);
var stopped = true;
window.calcTimeoutLength = 30000; //30 secs timeout, should be enough to generate quite a nice list of pages.
 
//Interface
 
$('body').html('<div id="resultWindow"></div>\n<div id="inputsWindow"></div>');
$('#inputsWindow').html('<div id="editBox">\n<b>Editing box: </b>\n<textarea id="editBoxArea"></textarea>\n</div>\n<div id="inputsBox"></div><div id="replacesPopup" style="display:none;"></div><div id="pageListPopup" style="display:none;"><button id="addToList">Add generated list to pages list</button><div id="bodyContent"></div></div><div class="overlay" style="display:none;"></div>');
$('#inputsBox').html('<div id="articleBox">\n<b>Enter list of pages: <small class="cookieSave">(<span id="setCookie" title="Save the current pages list using cookies">save</span>|<span id="getCookie" title="Load pagelist from cookie (must be set earlier)">load</span>)</small></b>\n<textarea id="articleList"></textarea>\n</div>\n<div class="tabs"></div><div class="stats">Amount of pages listed: <span id="totPages">0</span>;&emsp;Pages saved: <span id="pagesSaved">0</span>;&emsp;Pages skipped: <span id="pagesSkipped">0</span>;</div>');
$('.tabs').html('<div class="tabholder"></div>\n<div class="tabc active" data-tab="1"></div>\n<div class="tabc" data-tab="2"></div>\n<div class="tabc" data-tab="3"></div>'+(sysop||custodian?'<div class="tabc" data-tab="4"></div>':'')+'<div class="tabc" data-tab="5" style="overflow:auto;"></div><div id="progress">done</div>');
$('.tabholder').html('<span class="tab active" data-tab="1">Content</span>\n<span class="tab" data-tab="2">Editing</span>\n<span class="tab" data-tab="3">Skip</span>'+(sysop||custodian?' <span class="tab" data-tab="4">Other actions</span>':'') + ' <span class="tab" data-tab="5">Log</span>');
 
$.get('http://runescape.wikia.com/wiki/RuneScape:AutoWikiBrowser/Script/Pagelist?action=render', function(response) {
	$('#bodyContent').html(response)
	importScriptPage('MediaWiki:Common.js/calc.js', 'runescape')
})
$('#replacesPopup').html('<button id="moreReplaces">add more inputs</button><br/><div class="replaces"><label>Replace: <input type="text" class="replaceText"/></label><br/>\n<label>With: <input type="text" class="replaceWith"/></label><br/>\n<div class="regexswitch"><label><input type="checkbox" class="useRegex"/> Regular Expression</label><br/>\n<label title="Any flags for regular expressions, for example i for ignorecase." style="display:none;">Regular Expression flags: <input type="text" class="regexFlags"/></label></div>')
 
$('.tabc[data-tab="1"]').html('Article list:<br/><button id="removeDupes">Remove duplicates</button> <button id="sortArticles">Sort</button><br/>\n <label>Replace: <input class="fullwidth" type="text" id="replaceText"/></label><br/>\n<label>With: <input class="fullwidth" type="text" id="replaceWith"/></label><br/>\n<div class="regexswitch"><label><input type="checkbox" id="useRegex"/> Regular Expression</label><br/>\n<label title="Any flags for regular expressions, for example i for ignorecase." style="display:none;">Regular Expression flags: <input type="text" id="regexFlags"/></label><br/><button id="replacesButton">More replace inputs</button><br/><button id="generateList">Generate pagelist</button></div>')
$('.tabc[data-tab="2"]').html('<label>Summary: <input class="fullwidth" type="text" id="summary" maxlength="250"/></label><br/>\n<label><input type="checkbox" id="minorEdit" checked="checked"> Minor edit</label><br/>\n<label><input type="checkbox" id="followPage"> Follow this page</label> (<button id="followNow" disabled="disabled" accesskey="f" title="Follow this page without having to edit ['+tooltipAccessKeyPrefix+'f]">or click here</button>)<br/><label><input type="checkbox" id="unfollowPage"> Unfollow this page</label> (<button id="unfollowNow" disabled="disabled" accesskey="u" title="Unfollow this page without having to edit ['+tooltipAccessKeyPrefix+'u]">or click here</button>)<br/>'+(bot?'\n<label><input type="checkbox" id="autosave"> Save automatically</label><br/>\n':'')+'<button id="stopbutton" disabled="disabled" accesskey="q" title="['+tooltipAccessKeyPrefix+'q]">Stop</button> <button id="startbutton" accesskey="a" title="['+tooltipAccessKeyPrefix+'a]">Start</button><br/><button class="editbutton" id="editbutton-1" disabled="disabled" accesskey="s" title="['+tooltipAccessKeyPrefix+'s]">Save</button> <button class="editbutton" id="editbutton-3" disabled="disabled" accesskey="p" title="['+tooltipAccessKeyPrefix+'p]">Preview</button><br/><button class="editbutton" id="editbutton-2" disabled="disabled" accesskey="n" title="['+tooltipAccessKeyPrefix+'n]">Skip</button> <button class="editbutton" id="editbutton-4" disabled="disabled" accesskey="d" title="['+tooltipAccessKeyPrefix+'d]">Diff</button>')
$('.tabc[data-tab="3"]').html('<label><input type="checkbox" id="skipNoChange" checked="checked"> No changes</label><br/>\n<label><input type="checkbox" id="skipNoPage" checked="checked"> Page doesn\'t exist</label><br/>\n <span style="cursor:default;">Redirects:</span><br/><label title="Edit the page the redirect leads to"><input type="radio" class="redirects" value="follow" name="redir"> Follow</label> <label title="Skip redirects"><input type="radio" class="redirects" value="skip" name="redir"> Skip</label> <label title="Edit the redirect itself instead of the page it redirects to"><input type="radio" class="redirects" value="edit" name="redir" checked="checked"> Edit</label><br/>\n<label>Contains: <input class="fullwidth" type="text" id="skipContains"></label><br/>\n<label>Doesn\'t contain: <input class="fullwidth" type="text" id="skipNotContains"></label><br/>\n<div class="regexswitch"><label><input type="checkbox" id="containRegex"> Regular Expression</label><br/>\n<label title="Any flags for regular expressions, for example i for ignorecase." style="display:none;">Regular Expression flags: <input type="text" id="containFlags"/></label></div>')
$('.tabc[data-tab="4"]').html((sysop||custodian?'<label><input type="checkbox" id="suppressRedir"> Suppress redirects</label><br/>Also move (when exists):<br/><label><input type="checkbox" id="movetalk"> talk page</label> <label><input type="checkbox" id="movesubpage"> subpages</label><br/><label>New pagename: <input type="text" id="moveTo"></label><br/><button class="editbutton" id="movePage" disabled="disabled" accesskey="m" title="['+tooltipAccessKeyPrefix+'m]">Move</button> ':'')+(sysop?'<button class="editbutton delete" id="deletePage" disabled="disabled" accesskey="x" title="['+tooltipAccessKeyPrefix+'x]"><span>Delete</span></button><br/>Protect:<br/><span title="Create protection when page doesn\'t exist">Edit:<select id="editProt"><option value="all" selected="selected">No protection</option><option value="autoconfirmed">Autoconfirmed</option><option value="sysop">Sysop only</option></select></span> Move:<select id="moveProt"><option value="all" selected="selected">No protection</option><option value="autoconfirmed">Autoconfirmed</option><option value="sysop">Sysop only</option></select><br/>\n<label>Expiry: <input type="text" id="protectExpiry"/></label>\n<br/><label><input type="checkbox" id="cascadeProt"> Cascading protection</label><br/>\n<button class="editbutton" id="protectPage" disabled="disabled">Protect</button>':'')+(sysop||custodian?'<button class="editbutton" id="skipPage" title="['+tooltipAccessKeyPrefix+'n]">Skip</button>':''))
$('.tabc[data-tab="5"]').html('<table class="actionlog"><tbody></tbody></table>');
 
$('head').append('<style type="text/css">body {background:none !important;} \n #resultWindow {resize:both;height:200px;width:99.5%;border:1px solid #555;padding:3px;overflow:auto;} #resultWindow * {resize:none;} \n #inputsWindow {height:300px;width:99.5%;margin-top:-2px;} \n #inputsBox {height:100%;} \n #editBox {width:40%;height:100%;float:right;position:relative;} \n #articleBox {width:15%;height:100%;float:left;margin-right:5px;position:relative;z-index:5;} \n textarea {width:100%;height:100%;} \n #editBoxArea {position:absolute;z-index:10;bottom:-24px;right:0px;} \n .tabs {height:100%;padding-top:5px;position:relative;} \n #progress {position:absolute;bottom:-20px;border:1px solid #555;margin-left:15.4%;width:44%;background:white;} \n .tabs .tabc {display:none;height:100%;border:1px solid #888;margin-top:-2px;} \n .tabs .tabc.active {display:block;} \n .tabc .fullwidth {width:44%;} \n #regexFlags, #containFlags {width:30px;} \n b {font-size:85%;} \n .tab {padding:0 3px;border:1px solid #888;border-bottom:none;border-radius:2px 2px 0 0;background:#FFF;cursor:pointer;} \n .tab:hover {background:#DDD;position:static !important;} \n .tab:active {background:#BBB;} \n .tab.active {background:#BBE;} \n body {font:16px "Times New Roman";} \n .editbutton {padding:10px;font-size:115%;color:#262;} #editbutton-2 {color:#A33;} \n #stopbutton {color:#F00;} #startbutton {color:#008000;} \n #articleList[disabled]:first-line {background-color:#77F;color:#000;} \n #deletePage {color:#F00;} \n #protectPage {color:#00F;} \n .overlay {z-index:30;cursor:pointer;position:fixed;top:0px;left:0px;width:100%;height:100%;background:rgba(0,0,0,0.3);} #replacesPopup, #pageListPopup {position:fixed;z-index:50;top:15%;left:25%;width:50%;height:70%;border:2px solid black;padding:5px;overflow:auto;background:white;} .cookieSave span {cursor:pointer;color:blue;} .cookieSave span:hover {text-decoration:underline;} tr[data-line]:not(.lineheader) {cursor:pointer;} .stats {margin-top:20px;} table.actionlog {border-collapse: collapse;} table.actionlog tr {border:1px #AAA solid;} table.actionlog td:last-child {width:85%;}</style>')
.append('<link rel="stylesheet" href="http://slot1.wikia.com/load.php?debug=false&lang=en&modules=mediawiki.action.history.diff&only=styles" />');
 
$('.tab').click(function() {
	$('.active').removeClass('active');
	$(this).addClass('active');
	$('.tabc[data-tab="'+$(this).attr('data-tab')+'"]').addClass('active')
})
 
$('#useRegex, #containRegex, .useRegex').click(function() {
	if ($(this).is(':checked')) {
		$(this).parent().next().next().css('display','inline');
	} else {
		$(this).parent().next().next().css('display','none');
	}
})
 
function progress(p) {
	p = p!='back'?p+' <img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" alt="loading..."/>':'done';
	$('#progress').html(p);
	$('.stats #totPages').html($('#articleList').val().split('\n').length);
}
 
$('#replacesButton').click(function() {
	$('#replacesPopup, .overlay').css('display','block');
})
$('#generateList').click(function() {
	$('#pageListPopup, .overlay').css('display','block');
})
$('.overlay').click(function() {
	$('#replacesPopup, #pageListPopup, .overlay').css('display','none');
})
$('#addToList').click(function() {
	$('#articleList').val(function() {return (this.value.replace(/^\n+|\n+$/g,'')+'\n'+$('#AWBPageList').html()).replace(/^\n|\n+$/g,'')})
	$('.stats #totPages').html($('#articleList').val().split('\n').length);
})
$('#moreReplaces').click(function() {
	$('#replacesPopup').append('<br/><div class="replaces"><label>Replace: <input type="text" class="replaceText"/></label><br/>\n<label>With: <input type="text" class="replaceWith"/></label><br/>\n<div class="regexswitch"><label><input type="checkbox" class="useRegex"/> Regular Expression</label><br/>\n<label title="Any flags for regular expressions, for example i for ignorecase." style="display:none;">Regular Expression flags: <input type="text" class="regexFlags"/></label></div>')
	$('#useRegex, #containRegex, .useRegex').click(function() {
		if ($(this).is(':checked')) {
			$(this).parent().next().next().css('display','inline');
		} else {
			$(this).parent().next().next().css('display','none');
		}
	})
})
 
//--------------
 
$('#setCookie').click(function() {
	setCookie('AWBPagesList',$('#articleList').val(),1000)
	$('#articleList').select()
})
$('#getCookie').click(function() {
	var newList = getCookie('AWBPagesList')==''?$('#articleList').val():getCookie('AWBPagesList')
	$('#articleList').val(newList).select()
})
 
//--------------
 
function replaceAll(input) {
	var replaces = document.getElementById('replacesPopup').getElementsByClassName('replaces');
	var pagevar = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].replace(/^.*?\|/, '');
	var result = input;
	for (i=0;i<replaces.length;i++) {
		var useRegex = replace==''?true:replaces[i].getElementsByClassName('useRegex')[0].checked
		var regexFlags = replaces[i].getElementsByClassName('regexFlags')[0].value
		var replace = replaces[i].getElementsByClassName('replaceText')[0].value.replace(/$x/gi, pagevar)
		replace = replace==''?'$':replace;
		replace = useRegex||replace=='$'?(new RegExp(replace, regexFlags)):replace;
		rWith = replaces[i].getElementsByClassName('replaceWith')[0].value.replace(/$x/gi, pagevar).replace(/\\n/g,'\n');
		result = result.replace(replace, rWith)
	}
	return result;
}
 
//--------------
 
function removeDupes(a) {
	for (i=0;a.join('\n').match(/(.*)\n((.*\n)*)\1\n/);i++) {
		a = a.join('\n').replace(/(.*)\n((.*\n)*)\1\n/g, '$1\n$2').split('\n');
	}
	if (a[a.length-1]==a[a.length-2]) {
		a = a.join('\n').replace(/\n.*$/,'').split('\n');
	}
	return a
}
$('#removeDupes').click(function() {
	var articleList = $('#articleList').val().replace(/^$\r/, '')
	$('#articleList').val(removeDupes(articleList.split('\n')).join('\n'))
	$('.stats #totPages').html($('#articleList').val().split('\n').length);
})
$('#sortArticles').click(function() {
	var articleList = $('#articleList').val().replace(/^$\n/m, '')
	$('#articleList').val(articleList.split('\n').sort().join('\n'))
	$('.stats #totPages').html($('#articleList').val().split('\n').length);
})
 
//--------------
 
function blink(e,t) {
	t=t?t:500;
	$(e).attr('disabled','disabled')
	.children().animate({opacity:'0.1'},t-100)
	.animate({opacity:'1'},t)
	.animate({opacity:'0.1'},t-100)
	.animate({opacity:'1'},t)
	setTimeout("$('"+e+"').removeAttr('disabled')",t*4-400)
}
 
//--------------
 
function callAPI(data, method, callback, addurl) {
	data['format'] = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: wgScriptPath + '/api.php' + (addurl?addurl:''),
		type: method,
		cache: false,
		success: function(response) {
			if (response.error)
				alert('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) { alert('AJAX error: ' + error) }
	});
}
 
function addLogLine(action, page, info) {
	var d = new Date();
	var pagee = encodeURIComponent(page);
	if (action=='edit') {
		var extraInfo = ' (<a target="_blank" href="/index.php?title='+pagee+'&diff='+info+'">diff</a>)';
	} else if (action=='move') {
		var extraInfo = ' to <a target="_blank" href="/wiki/'+encodeURIComponent(info)+'" title="'+info+'">'+info+'</a>';
	} else if (action=='protect') {
		var extraInfo = info
	} else {
		var extraInfo = '';
	}
	$('table.actionlog tbody').append('<tr><td>'+(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()).replace(/\b\d\b/g,'0$&')+'</td><th>'+action+'</th><td><a target="_blank" href="/wiki/'+pagee+'" title="'+page+'">'+page+'</a>'+ extraInfo +'</td></tr>');
}
 
function watchPage(pagename) {
	progress('Adding page to watchlist')
	callAPI({
		'action':'watch',
		'title':pagename
	}, 'POST', function(response) {
		$('#followNow').after('<span style="color:green;" id="watchsuccess">'+pagename+' has been added to your watchlist.</span>');
		progress('back')
	});
}
function unwatchPage(pagename) {
	progress('Removing page from watchlist')
	callAPI({
		'action':'watch',
		'unwatch':'yes',
		'title':pagename
	}, 'POST', function(response) {
		$('#unfollowNow').after('<span style="color:green;" id="unwatchsuccess">'+pagename+' has been removed from your watchlist.</span>');
		progress('back')
	});
}
 
function getDiff(run) {
	progress('Getting edit diff')
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	var editBoxInput = $('#editBoxArea').val();
	redirect = $('input.redirects:checked').val();
	redirects = redirect=='follow'?'redirects':'inprop';
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'indexpageids': 'true',
		'titles': pagename,
		'rvlimit': '1',
		'rvdifftotext': editBoxInput
	}, 'POST', function(response) {
		var pageExists = response.query.pages["-1"]?false:true;
		var page = pageExists?response.query.pages[response.query.pageids[0]]:'';
		var diff = pageExists?page.revisions[0].diff['*']:'';
		diff = pageExists?(diff!=''?'<table class="diff"><colgroup><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"></colgroup><tbody>'+diff+'</tbody></table>':'<h2>No changes made. Press skip to go to the next page in the list.</h2>'):'<span style="font-weight:bold;color:red;">Page doesn\'t exist, diff can not be made.</span>';
		$('#resultWindow').html(diff)
		$('.diff-lineno').each(function() {
			$(this).parent().attr('data-line',parseInt($(this).html().match(/\d+/)[0])-1).addClass('lineheader')
		})
		$('table.diff tr').each(function() {
			if (!$(this).next().is('[data-line]')) {
				$(this).next().attr('data-line',parseInt($(this).attr('data-line'))+1);
			}
		});
		progress('back')
		if (run) { run() }
	}, '?'+redirects+'=redirect');
}
 
$('#resultWindow').click(function(e) {
	if ($(e.target).is('tr[data-line]:not(.lineheader) *')) {
		document.all.editBoxArea.scrollTop = 16.1*(parseInt($(e.target).parents('tr[data-line]').attr('data-line')) - 1)
	}
});
 
function getPageInfo(pagename,action) {
var editBoxInput = $('#editBoxArea').val();
if ($('#articleList').val().replace(/^$\n/m, '').length == 0) {
	stopEditing()
} else if (!stopped) {
redirect = $('input.redirects:checked').val();
redirects = redirect=='follow'||redirect=='skip'?'redirects':'inprop';
var progressAction = action=='submit'?'Submitting edit':(action=='preview'?'Getting preview':(action=='get'?'Getting page contents':''));
progressAction = action=='move'?'Moving page':(action=='delete'?($('#deletePage').is('.delete')?'D':'Und')+'eleting page':(action=='protect'?'Protecting page':progressAction));
progress(progressAction)
callAPI({
	'action': 'query',
	'prop': 'info|revisions',
	'intoken': 'edit|delete|protect|move',
	'titles': pagename,
	'rvprop': 'content|timestamp|ids',
	'rvlimit': '1',
	'indexpageids': 'true'
}, 'GET', function(response) {
	var page = response.query.pages[response.query.pageids[0]];
	var content = typeof(page.revisions)!="undefined"?page.revisions[0]['*']:'';
	var pageExists = response.query.pages["-1"]?false:true;
	var isRedirect = response.query["redirects"]||page["redirectto"]?true:false;
	var newContent = content;
	if (!pageExists&&$('#deletePage').is('.delete')) {
		$('#deletePage').removeClass('delete').addClass('undelete').children('span').html('Undelete')
		blink('#deletePage')
	} else if (pageExists&&$('#deletePage').is('.undelete')) {
		$('#deletePage').removeClass('undelete').addClass('delete').children('span').html('Delete')
		blink('#deletePage')
	}
	if (!pageExists) {
		$('#movePage').attr('disabled','disabled')
	} else {
		$('#movePage').removeAttr('disabled')
	}
	if (doReplace) {
		newContent = replaceAll(content.replace(replace, replaceWith));
	}
	if (action=='submit') {
		var minorEdit = $('#minorEdit').is(':checked');
		var pagename = redirects=='redirects'?response.query.redirects[0]["to"]:$('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0];
		var summary = $('#summary').val();
		callAPI({
			'title': pagename,
			'bot': 'yes',
			'summary': summary,
			'action': 'edit',
			'basetimestamp': typeof(page.revisions)!="undefined"?page.revisions[0].timestamp:'',
			'token': page.edittoken,
			'text': $('#editBoxArea').val()
		}, 'POST', function(response) {
			addLogLine('edit', response.edit.title, response.edit.newrevid);
			$('#articleList').val($('#articleList').val().replace(/^.*\n?/,''))
			var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
			defVars("getPageInfo(pagename,'get')")
			$('.stats #pagesSaved').html(parseInt($('.stats #pagesSaved').html()) + 1)
			progress('back')
		}, (minorEdit?'?minor=yes':''));
		if (followPage) {
			watchPage(pagename);
		} else if (unfollowPage) {
			unwatchPage(pagename);
		}
	} else if (action=='preview') {
		$.ajax({
			data: {
				'wpTextbox1': editBoxInput
			},
			dataType: 'text',
			type: 'POST',
			cache: false,
			url: wgScriptPath + '/index.php?title='+pagename+'&action=submit&wpPreview=true&live=true',
			success: function(response) {
				$('#resultWindow').html(response.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
				$('#resultWindow div.previewnote').remove()
				progress('back')
			}
		});
	} else if (action=='get') {
		progress('back')
		if (!(skipNoChange && content == newContent) && (!content.match(skipContains) || !skipContains) && (content.match(skipNotContains) || !skipNotContains) && !(skipNoPage && !pageExists) && !(redirect=='skip' && isRedirect)) {
			$('#editBoxArea').val(newContent);
			getDiff(function(){
				if ($('#autosave').is(':checked')&&bot) {
					defVars("getPageInfo(pagename,'submit')")
				}
			})
		} else {
			addLogLine('skip', $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]);
			$('#articleList').val($('#articleList').val().replace(/^.*\n?/,''))
			var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0];
			$('.stats #pagesSkipped').html(parseInt($('.stats #pagesSkipped').html()) + 1);
			defVars("getPageInfo(pagename,'get')")
		}
	} else if (action=='move') {
		var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
		var pagevar = articleList[0].replace(/^.*?\|/, '');
		var topage = $('#moveTo').val().replace(/$x/gi, pagevar)
		var summary = $('#summary').val();
		var movetalk = $('#moveTalk').is(':checked')
		var movesubpage = $('#moveSubpage').is(':checked')
		var noredir = $('#suppressRedir').is(':checked')
		callAPI({
			'action':'move',
			'from':pagename,
			'to':topage,
			'token':page.movetoken,
			'reason':summary,
			'ignorewarnings':'yes'
		}, 'POST', function(response) {
			addLogLine('move', response.move.from, reponse.move.to);
			progress('back')
			$('#articleList').val($('#articleList').val().replace(/^.*/,topage))
		}, (movetalk||movesubpage||noredir?'?':'') + (movetalk?'&movetalk=yes':'') + (movesubpage?'&movesubpages=yes':'') + (noredir?'&noredirect=yes':''))
	} else if (action=='delete') {
		var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
		var summary = $('#summary').val();
		var undeltoken = typeof response.query.deletedrevs[0]=='undefined'?'':response.query.deletedrevs[0].token;
		callAPI({
			'action':(pageExists?'delete':'undelete'),
			'title':pagename,
			'token':(pageExists?page.deletetoken:undeltoken),
			'reason':summary
		}, 'POST', function(response) {
			addLogLine('delete', response.delete.title);
			progress('back')
			$('#articleList').val($('#articleList').val().replace(/^.*\n?/,''))
			var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
			defVars("getPageInfo(pagename,'get')")
		})
	} else if (action=='protect') {
		var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
		var summary = $('#summary').val();
		var editprot = $('#editProt').val();
		var moveprot = $('#moveProt').val();
		callAPI({
			'action':'protect',
			'title':pagename,
			'token':page.protecttoken,
			'reason':summary,
			'expiry':$('#protectExpiry').val()!=''?$('#protectExpiry').val():'infinite',
			'protections':(pageExists?'edit='+editprot+'|move='+moveprot:'create='+editprot)
		}, 'POST', function(response) {
			var protactions = '';
			var prots = response.protect.protections
			for (var i=0;i<prots.length;i++) {
				if (typeof prots[i].edit == 'string') {
					protactions += ' edit: '+(prots[i].edit?prots[i].edit:'all');
				} else if (typeof prots[i].move == 'string') {
					protactions += ' move: '+(prots[i].move?prots[i].move:'all');
				} else if (typeof prots[i].create == 'string') {
					protactions += ' create: '+(prots[i].create?prots[i].create:'all');
				}
			}
			protactions += ' expires: '+prots[0].expiry;
			addLogLine('protect', response.protect.title, protactions)
			progress('back')
			$('#articleList').val($('#articleList').val().replace(/^.*\n?/,''))
			var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
			defVars("getPageInfo(pagename,'get')")
		})
	}
}, '?'+redirects+'=redirect'+(custodian||sysop?'&list=deletedrevs&drprop=token':''));
}
}
 
//-------------------
 
var useRegex,RegexFlags,doReplace,replace,replaceWith,summary,minorEdit,followPage,skipNoChange,skipNoPage,skipContains,skipNotContains,containRegex,containFlags,articleList,pagename,pagevar;
 
function defVars(run) {
	articleList = $('#articleList').val().replace(/^$\n/m, '').split('\n');
	pagevar = articleList[0].replace(/^.*?\|/, '');
	useRegex = $('input#replaceText').val().length>0? $('#useRegex').is(':checked') : true;
	RegexFlags = useRegex?$('#regexFlags').val():'';
	doReplace = ($('input#replaceText').val().length>0 || $('input#replaceWith').val().length>0)?true:false;
	replace = $('input#replaceText').val().length>0? $('input#replaceText').val().replace(/$x/gi, pagevar) : '$';
	replace = useRegex||replace=='$'?(new RegExp(replace, RegexFlags)):replace;
	replaceWith = $('input#replaceWith').val().replace(/$x/gi, pagevar).replace(/\\n/g,'\n');
	summary = $('#summary').val();
	minorEdit = $('#minorEdit').is(':checked')?true:false;
	followPage = $('#followPage').is(':checked');
	unfollowPage = $('#unfollowPage').is(':checked');
	skipNoChange = $('#skipNoChange').is(':checked');
	skipNoPage = $('#skipNoPage').is(':checked');
	skipContains = $('#skipContains').val().length>0? $('#skipContains').val() : null;
	skipNotContains = $('#skipNotContains').val().length>0? $('#skipNotContains').val() : null;
	containRegex = $('#containRegex').is(':checked');
	containFlags = containRegex?$('#containFlags').val():'';
	skipContains = containRegex&&skipContains?(new RegExp(skipContains,containFlags)):skipContains;
	skipNotContains = containRegex&&skipNotContains?(new RegExp(skipNotContains,containFlags)):skipNotContains;
	redirect = $('input.redirects:checked').val();
	redirects = redirect=='follow'||redirect=='skip'?'redirects':'inprop';
	pagename = articleList[0].split('|')[0]
	eval(run);
}
 
//-------------------
 
$('#startbutton').click(function() {
var articleList = $('#articleList').val().replace(/^$\n/m, '')
if (articleList.length==0) {
	alert('Please enter some articles to browse before clicking start.')
} else {
	stopped = false;
	$('#stopbutton, .editbutton, #followNow, #unfollowNow').removeAttr('disabled')
	$('#startbutton, #articleList').attr('disabled','disabled');
	var pagename = articleList.split('\n')[0].split('|')[0]
	defVars("getPageInfo(pagename,'get')")
}
});
function stopEditing() {
	$('#stopbutton, .editbutton, #followNow, #unfollowNow').attr('disabled','disabled');
	$('#articleList, #startbutton').removeAttr('disabled');
	$('#watchsuccess, #unwatchsuccess').remove();
	$('#resultWindow').html('');
	stopped = true;
}
$('#stopbutton').click(function() {
	stopEditing()
})
$('#followNow, #unfollowNow').click(function() {
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0];
	$('#watchsuccess, #unwatchsuccess').remove()
	if ($('#articleList').val().replace(/^$\n/m, '').length==0) {
		alert('No page entered to watch');
	} else {
		if ($(this).attr('id')=='followNow') {
			watchPage(pagename);
		} else {
			unwatchPage(pagename);
		}
	}
});
$('#unfollowPage, #followPage').click(function() {
	var other = $(this).attr('id')=='followPage'?'#unfollowPage':'#followPage';
	if ($(this).is(':checked')) {
		$(other).attr('disabled','disabled');
	} else {
		$(other).removeAttr('disabled');
	}
});
 
$('#editbutton-1').click(function() {
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	defVars("getPageInfo(pagename,'submit')")
})
$('#editbutton-2, #skipPage').click(function() {
	addLogLine('skip', $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]);
	$('#articleList').val($('#articleList').val().replace(/^.*\n?/,''))
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	$('.stats #pagesSkipped').html(parseInt($('.stats #pagesSkipped').html()) + 1);
	defVars("getPageInfo(pagename,'get')")
})
$('#editbutton-3').click(function() {
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	defVars("getPageInfo(pagename,'preview')")
});
$('#editbutton-4').click(function() {
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	defVars("getDiff()")
});
$('#movePage').click(function() {
	if ($('#moveTo').val().length==0) {
		alert('Please enter the new pagename before clicking move.')
	} else {
		var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
		if (sysop||custodian) defVars("getPageInfo(pagename,'move')")
	}
})
$('#protectPage').click(function() {
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	if (sysop) defVars("getPageInfo(pagename,'protect')")
})
$('#deletePage').click(function() {
	var pagename = $('#articleList').val().replace(/^$\n/m, '').split('\n')[0].split('|')[0]
	if (sysop) defVars("getPageInfo(pagename,'delete')")
})
 
} else {
	alert('Your username is not on the AWB checklist. Please request AWB access on RS:AWB/R.')
}
});