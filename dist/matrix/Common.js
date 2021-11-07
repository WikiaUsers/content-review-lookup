// Most functions here were copied and modified from the starwars wiki/ wookieepedia (Nov 4, 2021)
// utility functions mainly used by other functions
function ClassTester(className) {
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
ClassTester.prototype.isMatch = function(element) {
	return this.regex.test(element.className);
}
function getElementsByClass(searchClass, node, tag) {
	var classElements = [];
	if (node == null) {
		node = document;
	}
	if (tag == null) {
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);
	for(i = 0, j = 0; i < elsLen; i++) {
		if (tester.isMatch(els[i])) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;
	while (node != null && node != document) {
		if (tester.isMatch(node)) {
			return node;
		}
		node = node.parentNode;
	}
	return null;
}
// functions used by the wiki
function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var hidables = getElementsByClass('hidable');
	for (var i = 0; i < hidables.length; i++) {
		var show = localStorage.getItem('hidableshow-' + i  + '_' + page);
		if ( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
			if ( content != null && content.length > 0
					&& button != null && button.length > 0
					&& content[0].style.display != 'none' ) {
				button[0].onclick('bypass');
			}
		} else if ( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
			if ( content != null && content.length > 0
					&& button != null && button.length > 0
					&& content[0].style.display == 'none' ) {
				button[0].onclick('bypass');
			}
		}
	}
}
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
	if ( content != null && content.length > 0 ) {
		content = content[0];
		if ( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
		if ( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
			for ( var i = 0, len = items.length; i < len; i++ ) {
				if ( items[i] == parent ) {
					item = i;
					break;
				}
			}
			if( item == -1 ) {
				return;
			}
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}
function addHideButtons() {
	var hidables = getElementsByClass('hidable');
	for ( var i = 0, len = hidables.length; i < len; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
		if( button != null && button.length > 0 ) {
			button = button[0];
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
			if( new ClassTester('start-hidden').isMatch(box) ) {
				button.onclick('bypass');
			}
		}
	}
}
function substUsername() {
	if ( mw.config.get('wgUserName') ) {
		$('.insertusername').text(mw.config.get('wgUserName'));
	}
}
function loadFunc() {
	window.pageName = mw.config.get('wgPageName');
	window.storagePresent = (typeof(localStorage) != 'undefined');
	addHideButtons();
	if( window.storagePresent ) {
		initVisibility();
	}
	substUsername();
	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;
	if( !bodyClass || (bodyClass.indexOf('page-') === -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
	}
	console.log('script = Common.js');
}
$( loadFunc );