// <pre><nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: "script",
	articles: [
        "MediaWiki:Common.js/translate.js",
	]
});

/* 在上传页面上添加“Template:文件信息”模板 */
var firstRun = true;
 
function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
	window.storagePresent = (typeof(globalStorage) != 'undefined');
 
	//addHideButtons();
 
	//fillPreloads();
 
	//substUsername();
	//substUsernameTOC();
	rewriteTitle();
	addAlternatingRowColors();
 
	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;
 
	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}
 
	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

$(document).ready(function() {

	if ((wgPageName != 'Special:Upload')&&(wgPageName != 'Special:上传文件')) {
		return;
	}

	$('#wpUploadDescription').text("{{文件信息\r\n|注意=\r\n|描述=\r\n|来源=\r\n|作者=\r\n|上传信息=\r\n|授权=\r\n|其他版本=\r\n|分类=\r\n}}");

});

//增加编辑按钮
if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
    "speedTip": "重定向",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "页面名称"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "删除线",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "被删除的文字"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "换行",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "添加注释行",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "请在此处添加注释"};
}


function addAlternatingRowColors() {
	var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

	if( infoboxes.length == 0 )
		return;

	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];

		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;

		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;

			var ths = rows[i].getElementsByTagName('th');

			if( ths.length > 0 ) {
				continue;
			}

			if(changeColor)
				rows[i].style.backgroundColor = '#f9f9f9';
			changeColor = !changeColor;
		}
	}
}

//一下部分的内容均出现在英文版 Harry Potter Wiki中，此处作为预留。
// onload stuff
/*var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}

	window.pageName = wgPageName;
	window.storagePresent = (typeof(globalStorage) != 'undefined');

	addHideButtons();

	fillPreloads();

	substUsername();
	substUsernameTOC();
	rewriteTitle();
	addAlternatingRowColors();

	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;

	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}*/

//function infoboxToggle() {
//	var page = window.pageName.replace(/\W/g, '_');
//	var nowShown;
//
//	if(document.getElementById('infoboxtoggle').innerHTML == '[折叠]') {
//		document.getElementById('infoboxinternal').style.display = 'none';
//		document.getElementById('infoboxtoggle').innerHTML = '[展开]';
//		nowShown = false;
//	} else {
//		document.getElementById('infoboxinternal').style.display = 'block';
//		document.getElementById('infoboxtoggle').innerHTML = '[折叠]';
//		nowShown = true;
//	}
//
//	if(window.storagePresent) {
//		var storage = globalStorage[window.location.hostname];
//		storage.setItem('infoboxshow-' + page, nowShown);
//	}
//}

//function addHideButtons() {
//	if(typeof getElementsByClass != 'function') {
//		return;
//	}
//	var hidables = getElementsByClass('hidable');
//
//	for( var i = 0; i < hidables.length; i++ ) {
//		var box = hidables[i];
//		var button = getElementsByClass('hidable-button', box, 'span');
//
//		if( button != null && button.length > 0 ) {
//			button = button[0];
//
//			button.onclick = toggleHidable;
//			button.appendChild( document.createTextNode('[折叠]') );
//
//			if( new ClassTester('start-hidden').isMatch(box) )
//				button.onclick('bypass');
//		}
//	}
//}

//function toggleHidable(bypassStorage) {
//	if(typeof getElementsByClass != 'function') {
//		return;
//	}
//	
//	var parent = getParentByClass('hidable', this);
//	var content = getElementsByClass('hidable-content', parent);
//	var nowShown;
//
//	if( content != null && content.length > 0 ) {
//		content = content[0];
//
//		if( content.style.display == 'none' ) {
//			content.style.display = content.oldDisplayStyle;
//			this.firstChild.nodeValue = '[折叠]';
//			nowShown = true;
//		} else {
//			content.oldDisplayStyle = content.style.display;
//			content.style.display = 'none';
//			this.firstChild.nodeValue = '[展开]';
//			nowShown = false;
//		}
//
//		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
//			var page = window.pageName.replace(/\W/g, '_');
//			var items = getElementsByClass('hidable');
//			var item = -1;
//
//			for( var i = 0; i < items.length; i++ ) {
//				if( items[i] == parent ) {
//					item = i;
//					break;
//				}
//			}
//
//			if( item == -1 ) {
//				return;
//			}
//
//			var storage = globalStorage[window.location.hostname];
//			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
//		}
//	}
//}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
/*function substUsername() {
	$('.insertusername').text(wgUserName);
}

function substUsernameTOC() {
	if(typeof getElementsByClass != 'function') {
		return;
	}

	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');

	if( !userpage || !toc )
		return;

	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');

	for( var i = 0; i < elements.length; i++ )
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}*/

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
/*function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();

	if(node == null)
		node = document;

	if(tag == null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}

function ClassTester(className)
{
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element)
{
	return this.regex.test(element.className);
}*/
/*
    end getElementsByClass
*/

/*function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

function getFirstHeading() {
	var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
	return (elements != null && elements.length > 0) ? elements[0] : null;
}*/

/*
    Returns the element's nearest parent that has the specified CSS class.
*/
/*function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;

	while(node != null && node != document)
	{
		if(tester.isMatch(node))
			return node;

		node = node.parentNode;
	}

	return null;
}*/

/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
/*function rewriteHover() {
	var gbl = document.getElementById("hover-global");

	if(gbl == null)
		return;

	var nodes = getElementsByClass("hoverable", gbl);

	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onmouseover = function() {
			this.className += " over";
		}
		nodes[i].onmouseout = function() {
			this.className = this.className.replace(new RegExp(" over\\b"), "");
		}
	}
}*/
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/


/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * Modified by [[User:Grunny]] and [[User:Sikon]] for use in both Monobook and Monaco on Wikia
 * Added section edit functionality by [[User:Green tentacle]]
 * Fix for new edit button next to the title by [[User:Grunny]]
 * New Wikia skin support by [[User:Grunny]]
 */
/*function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');

		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}

		if (el)
			el.href += '&editintro=' + name;

		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;

			if (spans[i].className == 'editsection') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if (spans[i].className == 'editsection-upper') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			}
		}
	}
}

if (wgNamespaceNumber == 0) {
	addOnloadHook(function(){
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Category:哈利·波特维基特色条目') {
				addEditIntro('Template:Featured_editintro');
				break;
			}
		}
	});
}*/

// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]]
//and may be further modified for local use.
/*function mainPageRenameNamespaceTab() {
	try {
		var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
		if ( Node.textContent ) {      // Per DOM Level 3
			Node.textContent = '主页';
		} else if ( Node.innerText ) { // IE doesn't handle .textContent
			Node.innerText = '主页';
		} else {                       // Fallback
			Node.replaceChild( Node.firstChild, document.createTextNode( '主页' ) ); 
		}
	} catch(e) {
		// bailing out!
	}
}

if ( wgTitle == '主页' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
	addOnloadHook( mainPageRenameNamespaceTab );
}*/

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop inexperienced users bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Oasis support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 */
/*function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}

	if( skin == 'oasis' ) {
		if( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) {
			$("#WikiaUserPagesHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
			$('span.editsection').remove();
			return;
		} else {
			$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
			$('span.editsection').remove();
			return;
		}
	}

	if( !document.getElementById('ca-edit') ) {
		return;
	}

	if( skin == 'monaco' ) {
		editLink = document.getElementById('ca-edit');
	} else if( skin == 'monobook' ) {
		editLink = document.getElementById('ca-edit').firstChild;
	} else {
		return;
	}

	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';

	$('span.editsection-upper').remove();
	$('span.editsection').remove();

	appendCSS( '#control_addsection, #ca-addsection { display: none !important; }' );
}
addOnloadHook( disableOldForumEdit );

//Removes the "Featured on:" line on File pages -- By Grunny
addOnloadHook( function (){
	if ( wgNamespaceNumber == 6 && $('#file').length != 0 ) {
		$('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
	}
} );*/

/* Temporary fix for the duration of the giveaway to let others use talk pages 
$( function () {
	if( wgTitle == 'Wizarding World Giveaway' || wgTitle == 'Deathly Hallows Premiere Event' ) {
		return;
	}
	if( wgNamespaceNumber == 0 ) {
		if( skin == 'oasis' ) {
			$('ul.commentslikes > li.comments > a').text('Talk').attr('href','/wiki/Talk:'+ encodeURIComponent (wgPageName));
			$('section#WikiaArticleComments').remove();
		} else {
			$('#p-cactions > .pBody > ul > #ca-nstab-main').after('<li id="ca-talk"><a accesskey="t" title="Discussion about the content page [t]" href="/wiki/Talk:'+ encodeURIComponent (wgPageName) +'">Discussion</a></li>');
			$('div#article-comments-wrapper').remove();
		}
	}
} ); */


/* Auto-refresh */ 
/*
AjaxRCRefreshText = 'Auto-refresh'; AjaxRCRefreshHoverText = 'Automatically refresh this page'; ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; importScriptPage('AjaxRC/code.js', 'dev'); 
*/

///以下代码来自某魔法的禁书维基

$(document).ready(function(){
  $("tr:odd").addClass("odd");
  $("tr:even").addClass("even");
});

/**********************/
/* collapsible script */
/**********************/
importScript('MediaWiki:Gadget-collapsibleTables.js');

/****************************/
/* spoilers by User:Tierrie */
/****************************/
$(document).ready(function(){
  console.log("DAWiki: Spoilers script loaded");
 
  if(typeof($.cookie) === undefined) {
    mw.loader.using(['jquery.cookie']);
  }
 
  var cookie_id = 'splr_';
  function removeCookie(key) {
    setCookie(key);
  }
 
  function setCookie(key, value) {
    if(value=="undefined" || value == "null") value = null;
    $.cookie(cookie_id + key, value, { expires: 150, path: '/' });
  }
 
  function getCookie(key) {
    return $.cookie(cookie_id + key);
  }
 
  $('.sp_banner').click( function() {
    var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
 
    if( $('.sp_id_'+id+' .sp_wrn').css('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').fadeIn(200, function() {
        $(this).show(200);
      });
      $('.sp_id_'+id+' .sp_txt').hide(0);
      setCookie(id, 'hide');
    } else {
      $('.sp_id_'+id+' .sp_wrn').fadeOut(200, function() {
        $(this).hide(200);
      });
      $('.sp_id_'+id+' .sp_txt').delay(200).show(0);
      setCookie(id, 'show');
    }
  });
 
  var sp_on_page = {};
  $('.sp').each( function() {
    var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
    sp_on_page[id] = undefined;
  });
  for (var id in sp_on_page) {
    if (getCookie(id) === 'show') {
      $('.sp_id_'+id+' .sp_wrn').hide(0);
      $('.sp_id_'+id+' .sp_txt').show(0);
    } else if (getCookie(id) === 'hide') {
      $('.sp_id_'+id+' .sp_wrn').show(0);
      $('.sp_id_'+id+' .sp_txt').hide(0);
 
    // if no cookies are set, check to see if the warning is displayed by default
    } else if ($('.sp_id_'+id+' .sp_wrn').attr('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').hide(0);
      $('.sp_id_'+id+' .sp_txt').show(0);
    } else {
      $('.sp_id_'+id+' .sp_wrn').show(0);
      $('.sp_id_'+id+' .sp_txt').hide(0);
    }
  }
});
///以上代码来自某魔法的禁书维基

///以下内容来自维基百科
/* Top icon: [[Template:Topicon]] */
    $(function () {
      // what's the problem on modern?
      $('<div />').css('float', 'right').append($('.topicon').css({
        'float': 'right',
        'position': 'static'
      }).show()).insertBefore('#firstHeading span[dir=auto]');
    });
///以上内容来自维基百科
//</nowiki> </pre>