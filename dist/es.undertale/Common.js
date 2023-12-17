window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Log', 'Contributions'];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Act. automát.',
    'ajaxrc-refresh-hover': 'Refrescar esta página automáticamente',
}}}}});

(function(window, $, mw) {
  'use strict';
  var $rail = $('#WikiaRail');
  function mediaTags($content) {
    $content.find('.html5-audio').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        src = esc($this.data('src')),
        type = esc($this.data('type')),
        controls = esc($this.attr('data-controls') || ''),
        autoplay = esc($this.attr('data-autoplay') || ''),
        loop = esc($this.attr('data-loop') || '');
        var options = controls === 'true' ? 'controls' : '' + ' ' + autoplay === 'true' ? 'autoplay' : '' + ' ' + loop === 'true' ? 'loop' : '' + ' ';
      $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
    $content.find('.html5-video').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        width = esc($this.data('width')),
        height = esc($this.data('height')),
        options = esc($this.data('options')),
        src = esc($this.data('src')),
        type = esc($this.data('type'));
      $this.html(
        '<video width="' +
          width +
          '" height="' +
          height +
          '" ' +
          options +
          '><source src="' +
          src +
          '" type="' +
          type +
          '"></video>'
      );
    });
  }
  mw.hook('wikipage.content').add(mediaTags);
  if ($rail.hasClass('loaded')) {
    mediaTags($rail);
  } else if ($rail.exists()) {
    $rail.on('afterLoad.rail', $.proxy(mediaTags, null, $rail));
  }
})(window, jQuery, mediaWiki);

window.BackToTopModern = true;

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
function jstzConvertAll() {
    var l = document.querySelectorAll("[data-jstz]");
    for (var i=0; i<l.length;i++) {
        var date = new Date(l[i].dataset.jstz);
        var format = l[i].dataset.jstzformat ? l[i].dataset.jstzformat : "Y/m/d h:i A";
        var utc = l[i].dataset.jstzutc;
        utc = utc && utc.toLowerCase() === "true";
        if(format && (date instanceof Date)) {
            l[i].innerHTML=jstzFormatDate(date, format, utc);
        }
    }
}

function jstzFormatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }
    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])Y+/g, "$1" + y);
    format = format.replace(/(^|[^\\])y/g, "$1" + y.toString().substr(2, 2));
    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])F+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])M/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])m/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])n/g, "$1" + M);
    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])l+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])D/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])d/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])j/g, "$1" + d);
    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])H+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])G/g, "$1" + H);
    var h = H > 12 ? H - 12 : H === 0 ? 12 : H;
    format = format.replace(/(^|[^\\])h+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])g/g, "$1" + h);
    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])i+/g, "$1" + ii(m));
    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])s+/g, "$1" + ii(s));
    var tz = -date.getTimezoneOffset();
    var P = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    var O = P;
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        P += ii(tzHrs) + ":" + ii(tzMin);
        O += ii(tzHrs) + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])P/g, "$1" + P);
    format = format.replace(/(^|[^\\])O/g, "$1" + O);
    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])A+/g, "$1" + T);
    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])a+/g, "$1" + t);
    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);
    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);
    format = format.replace(/\\(.)/g, "$1");
    return format;
}
$(jstzConvertAll);

mw.hook('wikipage.content').add(function($content) {
    $content.find('.episodepreview-video').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
 
        if (data.loaded || id === '') {
            return;
        }
 
        uri.path += id;
        uri.query = {
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim(),
            controls: 0,
            fs: 0,
            showinfo: 0,
            rel: 0, 
        };
 
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
        data.loaded = true;
    });
});

window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true}
];

window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};

window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
window.preloadTemplates_subpage = "syntax";
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/**
 * Loading UserTags from a page with JSON
 */
mw.loader.using('mediawiki.api').then(function() {
    new mw.Api().get({
        action: 'query',
        titles: 'MediaWiki:Custom-user-tags.json',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main'
    }).then(function(data) {
        window.UserTagsJS = JSON.parse(data.query.pages[210341].revisions[0].slots.main['*']);
    });
});

/**
 * Miscellaneous code
 */
(function() {
    // AddRailModule configuration
    var ns = mw.config.get('wgNamespaceNumber');
    window.AddRailModule = (
        !localStorage.getItem('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? [
        {
            page: 'int:custom-spoiler-warning',
            prepend: true
        }
    ] : [];
    
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'int:custom-spoiler-warning') {
            var $module = $('#WikiaRail .railModule');
            $module.find('#spoiler-warning-button').click(function() {
                localStorage.setItem('spoiler-warning', '1');
                $module.slideToggle();
            });
        }
    });

    mw.hook('DiscordIntegrator.added').add(function() {
        var $content = $('#WikiaRail .railModule');
        $content.insertBefore('.DiscordIntegratorModule');
    });
})();

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');

	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
}

function addHideButtons() {
	var hidables = getElementsByClass('hidable');

	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');

		if( button != null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );

			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}

function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;

	if( content != null && content.length > 0 ) {
		content = content[0];

		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}

		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;

			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
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

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	if( mw.config.get('wgUserName') ) {
		$('.insertusername').text(mw.config.get('wgUserName'));
	}
}

function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');

	if( !userpage || !toc )
		return;

	var username = $('#pt-userpage').children(':first-child').text();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).text($(this).text().replace('<insert name here>', username));
	});
}

/**
 * Start upload form customisations
 * @author Green tentacle
 */

function setupUploadForm(){
	// Check if cookie has been set for form style. Overrides URL parameter if set.
	var formstyle = localStorage.getItem("uploadform");

	$("#uploadBasicLinkJS").show();
	$("#uploadTemplateNoJS").hide();

	var wpLicense = $('#wpLicense');

	if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
		if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
			// Add link to basic form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Switch to basic upload form</a></div>');

			// Stretch table to full width
			$('#mw-htmlform-description').css('width', '100%');

			// Bind upload button to verify function
			$('#mw-upload-form').bind('submit', verifySummary);

			// Hide existing rows
			var rows = $('#mw-htmlform-description').find('tr');
			$('tr.mw-htmlform-field-HTMLTextAreaField').hide();
			$('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();

			$('#mw-htmlform-description').addClass('hidable start-hidden');

			// Add new required rows
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Source:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Description:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody1.append('<tr><td colspan="2" style="text-align: center;">Optional fields <span class="hidable-button"></span></td></tr>');

			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Attention:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Original designer / artist:</td><td class="mw-input"><textarea id="artistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Conversion / editing / upload information:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other versions / source images:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Artist categories:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Licensee categories:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject categories:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Type categories:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}');

			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.wikia.com/index.php?title=Special:Upload" onclick="javascript:localStorage.setItem(\'uploadform\', \'guided\')">Switch to guided upload form</a></div>');
			
			$('#mw-upload-form').bind('submit', verifyName);
		}
	}
}

function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
	var wpDestFile = document.getElementById('wpDestFile');

	// Check for licensing
	if ( wpLicense.value == "" ){
		alert('Licensing must be completed.');
		return false;
	}

	// Check for source
	if ( document.getElementById('sourceBox').value == "" ){
		alert('Source must be completed.');
		return false;
	}

	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
		alert('Please do not use capitalized or duplicated file extensions in the filename.');
		return false;
	}

	var strBuilder = '==Summary==\r\n{{Information\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|artist=' + document.getElementById('artistBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat licensee=' + document.getElementById('catlicenseeBox').value + '\r\n';
	strBuilder += '|cat subject=' + document.getElementById('catsubjectBox').value + '\r\n';
	strBuilder += '|cat type=' + document.getElementById('cattypeBox').value + '\r\n';
	strBuilder += '}}';

	document.getElementById('wpUploadDescription').value = strBuilder;

	wpLicense.selectedIndex = 0;

	return true;
}

function verifyName(){
	var wpDestFile = document.getElementById('wpDestFile');
	var wpLicense = document.getElementById( 'wpLicense' );
	
	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg.jpg|png.png|gif.gif|svg.svg)$/)) {
		alert('Please do not use capitalized or duplicated file extensions in the filename.');
		return false;
	}

	// Check for annoying characters
	if ( wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
		alert('Please do not use parantheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
		return false;
	}
	if ( wpLicense.value != '' ) {
		$( '#wpUploadDescription' ).val(
			$( '#wpUploadDescription' ).val().replace( '|licensing=', '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title )
		);

		wpLicense.selectedIndex = 0;
	}
	return true;
}

/**
 * End upload form customisations
 */

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
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
}
/*
    end getElementsByClass
*/

window.insertAtCursor = function(myField, myValue) {
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
}

/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;

	while(node != null && node != document)
	{
		if(tester.isMatch(node))
			return node;

		node = node.parentNode;
	}

	return null;
}
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$( loadFunc );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES SETTINGS

///////////////////////////////////////////////////////////////////////////////////////////////////////////

window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxPages = [ 'Special:RecentChanges', 'Special:Watchlist', 'Special:Log', 'Special:NewFiles', 'Special:AbuseLog' ];
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
	'ajaxrc-refresh-text': 'Automatically refresh',
	'ajaxrc-refresh-hover': 'Enable auto-refreshing page loads',
}}}}});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH SETTINGS

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//Link FA

var FA_enabled  = true;

function addfaicon() {
	// if disabled
	if (!FA_enabled) return;
	var pLang = document.getElementById("p-lang");
	if (!pLang) return;
	var lis = pLang.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		var li = lis[i];
		// only links with a corresponding Link_FA template are interesting
		if (!document.getElementById(li.className + "-fa"))   continue;
		// additional class so the template can be hidden with CSS
		li.className += " FA";
		// change title (mouse over)
		li.title = "This article is rated as featured article.";
	}
}
$(addfaicon);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny
 */
function addEditIntro(name) {
	// Top link
	$('.page-header #ca-edit').attr('href', $('.page-header #ca-edit').attr('href') + '&editintro=' + name);
	$('.page-side-tools #ca-edit').attr('href', $('.page-side-tools #ca-edit').attr('href') + '&editintro=' + name);
	$('span.mw-editsection > a').each( function () {
		$(this).attr('href', $(this).attr('href') + '&editintro=' + name);
	} );
}

$( function () {
	if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
		var cats = document.getElementById( 'articleCategories' );
		if ( !cats ) {
			return;
		}
		cats = cats.getElementsByTagName( 'a' );
		for ( var i = 0; i < cats.length; i++ ) {
			if ( cats[i].title === 'Category:Wookieepedia Featured articles' ) {
				addEditIntro( 'Template:Featured_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia Good articles' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia Comprehensive articles' ) {
				addEditIntro( 'Template:Comprehensive_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Articles undergoing major edits' ) {
				addEditIntro( 'Template:Inuse_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Legends articles with canon counterparts' ) {
				addEditIntro( 'Template:Legends_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Canon articles with Legends counterparts' ) {
				addEditIntro( 'Template:Canon_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Consensus track' ) {
				addEditIntro( 'Template:CT_editintro' );
				break;
			} else if ( mw.config.get( 'wgPageName' ) === 'Template:DYK editintro' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			}
		}
	} else if ( mw.config.get( 'wgPageName' ) === 'Template:DidYouKnow' ) {
		addEditIntro( 'Template:DYK_editintro' );
	}
} );
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco and Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 * UCP and FandomDesktop support by [[User:01miki10|01miki10]]
 */
function disableOldForumEdit() {
	if ( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	$( '#old-forum-warning-section .mw-editsection' ).remove();
	if ( !document.getElementById( 'old-forum-warning' ) ) {
		return;
	}

	if ( $( '.page-header #ca-addsection' ).length ) {
		$( '.page-header #ca-addsection' ).html( 'Archived' ).removeAttr( 'href' );
		$( '.page-header #ca-edit' ).remove();
		$( '.page-side-tools #ca-addsection' ).remove();
		$( 'span.mw-editsection' ).remove();
	} else {
		$( '.page-header #ca-edit' ).html( 'Archived' ).removeAttr( 'href' );
		$( '.page-side-tools #ca-edit' ).remove();
		$( 'span.mw-editsection' ).remove();
	}
}
$( disableOldForumEdit );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle($(this).text().includes('show'));
		if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'hide', 'show' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'show', 'hide' ) );
		}
	} );
} );

// Lazy load SWTOR article appearances list
$( function lazyLoadTorApp() {
	var	pageName = 'Star_Wars:_The_Old_Republic',
		appPageName = encodeURIComponent( pageName + '/Appearances' ),
		$lazyLoadEl = $( '#WookTorLazyload' ),
		includeHtml,
		$editLink;
	if ( mw.config.get('wgPageName') !== pageName || !$lazyLoadEl.length ) {
		return;
	}

	$lazyLoadEl.html( '<img src="https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Loading..." />' );
	$.getJSON( '/api.php?action=parse&page=' + appPageName + '&format=json' )
		.done( function ( data ) {
			if ( data.parse && data.parse.text ) {
				includeHtml = data.parse.text['*'];
				$lazyLoadEl.html( includeHtml );
				addHideButtons();
				$editLink = $lazyLoadEl.prev( 'h2' ).find( '.editsection a' );
				if ( $editLink.length ) {
					$editLink.attr( 'href', '/index.php?title=' + appPageName + '&action=edit' );
				}
			}
		} );
} );

/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub() {
	if ( mw.config.get( 'wgNamespaceNumber' ) === 0 || $( '#hideContentSub' ).length > 0 ) {	
		if ($( '.page-header__page-subtitle' ).text().substring(0, 1) === "<") {
            var	$wikiaHeader = $( '.page-header__page-subtitle' ),
                $backToPageLink;
            if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 ) {
                // ugly hack to only leave back to page link on talk pages
                $backToPageLink = $wikiaHeader.find( 'a[accesskey="c"]' );
                $wikiaHeader.html( '' ).append( $backToPageLink );
            } else {
                $wikiaHeader.hide();
            }
        }
	}
}

/**
 * Adds {{Talkheader}} template to preload parameter on new talk page links
 **/
function addTalkheaderPreload() {
	if (mw.config.get('wgNamespaceNumber') === 0 && document.querySelector('#ca-talk.new')) {
		document.querySelector('#ca-talk.new').href += '&preload=Template:Talkheader/preload';
	}
}

// </nowiki></pre>

// Related Categories
$(document).ready( function () {
	if( document.getElementById("related-catlinks") ) {
		document.getElementById("catlinks").appendChild(document.getElementById("related-catlinks"));
	}
} );

/* This script allows the numbers of articles on [[List of Star Wars Wikis in other languages]] to load automatically (current number) */
(function() {
    var stats = ['articles', 'activeusers', 'admins', 'edits', 'images'],
        wikis = [],
        regex = /^[0-9a-z\.-]+$/,
        prefix = 'outwikistats-';
    $(stats.map(function(name) {
        return '.outwikistats-' + name;
    }).join(', ')).each(function() {
        var $this = $(this),
            wiki = $this.text();
        $this.attr({
            'data-attr': $this.attr('class').substring(prefix.length),
            'data-wiki': wiki
        }).html($('<img>', {
            src: 'https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif'
        }));
        if (wikis.indexOf(wiki) === -1) {
            wikis.push(wiki);
        }
    });
    wikis.forEach(function(wiki) {
        if (!wiki.match(regex)) {
            return;
        }
        var url;
        if (wiki.indexOf('.') === -1) {
            url = 'https://' + wiki + '.fandom.com';
        } else {
            var wikiParts = wiki.split('.'),
                wikiLang = wikiParts[0],
                wikiDomain = wikiParts[1];
            url = 'https://' + wikiDomain + '.fandom.com/' + wikiLang;
        }
        $.ajax({
            type: 'GET',
            url: url + '/api.php',
            data: {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'statistics',
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function(data) {
                var stats = data.query.statistics;
                if (!stats) {
                    return;
                }
                $('[data-wiki="' + wiki + '"]').each(function() {
                    var $this = $(this),
                        prop = $this.attr('data-attr'),
                        result = stats[prop];
                    $this.text(result);
                });
            }
        });
    });
})();

/* Disable rollback script */
window.RollbackWikiDisable = true;

/**
 * fillEditSummaries for VisualEditor, based on Grunny's jQuery version of Sikon's original version
 * @author 01miki10
 */

function fillEditSummariesVisualEditor() {
	mw.hook( 've.activationComplete' ).add(function () {
	if ( $( '#stdEditSummaries' ).length ) return;
		$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
			var	$summaryOptionsList,
				$summaryLabel = $( '.ve-ui-summaryPanel' ),
				$summaryInput = $( '.ve-ui-summaryPanel-summaryInputField > input' ),
				lines = data.split( '\n' ),
				$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );

			$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
				var editSummary = $( this ).val();
				if ( editSummary !== '' ) {
					$summaryInput.val( editSummary );
				}
			} );

			for ( var i = 0; i < lines.length; i++ ) {
				var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
				$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
			}

			$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
		} );
	} );
}

$( fillEditSummariesVisualEditor );

// Copied from https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length && $( '.page-header__actions' ).length ) {
    	$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    }
} );

--- Generates citations across the wiki to ensure standard formatting.
--  The module accepts several different types of citations and processes each
--  differently, based on the <code>f</code> table's functions. When the module
--  is called without a type, it acts as a citation needed template.
--  @module             cite
--  @alias              p
--  @require            Dev:Date
--  @require            Dev:User error
--  @require            Dev:Yesno
--  @require            Module:Tags
--  @author             [[User:KockaAdmiralac|KockaAdmiralac]]
--  <nowiki>
local p = {}

-- Module dependencies
local Date = require('Dev:Date')
local userError = require('Dev:User error')
local yesno = require('Dev:Yesno')
local tags = require('Module:Tags')
local data = mw.loadData('Module:Cite/data')
local title = mw.title.getCurrentTitle()

--  Private logic.

--- Wrapper for <code>userError</code> that places the page under the Pages with
--  user errors category.
--  @function           err
--  @param              {string} text Text to display as an error
--  @return             {string} Wikitext with the error and category
--  @local
local function err(text)
    return userError(text, 'Pages with user errors')
end

--- Checks whether a given date string is a valid date.
--  @function           valid_date
--  @param              {string} d Date string to check
--  @return             {bool} Whether the string is a valid date
--  @local
function valid_date(d)
    return pcall(function()
        Date(d)
    end)
end

--- Table of possible citation types and the way they are processed.
--  Each type has a function associated with it that gets passed the arguments
--  after the type, does validation of these arguments and returns the whole
--  citation text.
--  @table              cite_functions
--  @alias              f
local f = {}

--- Handles Twitter citations.
--  Twitter citations receive arguments in this order:
--  * Twitter snowflake
--  * Tweet author's handle
--  * Citation from the tweet
--  * (Optional) Timestamp of the tweet's archival
--  * (Optional) Whether the original tweet link is dead
--  @function           f.twitter
--  @param              {table} args Citation type arguments
--  @return             {string} Citation text
function f.twitter(args)
    -- Check validity of arguments
    if not args[1] or not tonumber(args[1]) then
        return err('Tweet snowflake invalid or not specified')
    end
    if not args[2] or not args[3] then
        return err('Tweet author or citation not specified')
    end
    -- Twitter snowflake date extraction
    -- Credits: https://github.com/client9/snowflake2time
    local snowflake = tonumber(args[1])
    local epoch = math.floor(snowflake / 4194304 + 1288834974657)
    local date1 = Date(math.floor(epoch / 1000))
    -- Format citation
    local deadurl = yesno(args[5], false)
    local archived = yesno(args[4], true)
    local str = {
        '\'\'',
        args[3],
        '\'\' - ['
    }
    if deadurl and archived then
        table.insert(str, 'https://web.archive.org/web/')
        table.insert(str, args[4])
        table.insert(str, '/')
    end
    table.insert(str, 'https://twitter.com/')
    table.insert(str, args[2])
    table.insert(str, '/status/')
    table.insert(str, args[1])
    if data.twitter[args[2]] then
        table.insert(str, ' ')
        table.insert(str, data.twitter[args[2]])
        table.insert(str, ' (@')
        table.insert(str, args[2])
        table.insert(str, ')')
    else
        table.insert(str, ' @')
        table.insert(str, args[2])
    end
    table.insert(str, ' on Twitter,] ')
    table.insert(str, date1:fmt('%B %d, %Y.'))
    if deadurl then
        if archived then
            table.insert(str, ' Archived on ')
            table.insert(str, Date(args[4]):fmt('%B %d, %Y.'))
        else
            table.insert(str, ' \'\'\'[deleted]\'\'\'')
        end
    end
    return table.concat(str)
end

--- Handles citations of text in the game.
--  Game citations receive arguments in this order:
--  * Quotation
--  * Quote author and the situation in which they made the quote
--  @function           f.game
--  @param              {table} args Citation type arguments
--  @return             {string} Citation text
function f.game(args)
    if not args[1] then
        return err('Quote not specified')
    end
    if not args[2] then
        return err('Quote author not specified')
    end
    return table.concat({
        '\'\'',
        tags.replace(args[1]),
        '\'\' - ',
        args[2]
    })
end

--- Handles citations of YouTube videos.
--  YouTube citations receive arguments in this order:
--  * YouTube video ID
--  * Video title
--  * (Optional) Time at which the video plays
--  @function           f.youtube
--  @param              {table} args Citation type arguments
--  @return             {string} Citation text
function f.youtube(args)
    if not args[1] or not args[2] then
        return err('Video ID or title not specified')
    end
    local str = {
        '\'\'',
        args[2],
        '\'\' - [https://youtu.be/',
        args[1]
    }
    if args[3] then
        table.insert(str, '?t=')
        table.insert(str, args[3])
    end
    table.insert(str, ' YouTube]')
    return table.concat(str)
end

--- Handles Tumblr citations.
--  Tumblr citations receive arguments in this order:
--  * Tumblr name of the author
--  * Tumblr post ID
--  * Citation from the post
--  * Date in YYYY-MM-DD format (or any other standard format)
--  @function           f.tumblr
--  @param              {table} args Citation type arguments
--  @return             {string} Citation text
function f.tumblr(args)
    if not args[1] or not args[3] then
        return err('Author or quote not specified')
    end
    if not args[2] or not tonumber(args[2]) then
        return err('Post ID invalid or not specified')
    end
    if not args[4] or not valid_date(args[4]) then
        return err('Date invalid or not specified')
    end
    return table.concat({
        '\'\'',
        tags.replace(args[3]),
        '\'\' - [http://',
        args[1],
        '.tumblr.com/post/',
        args[2],
        ' ',
        args[1],
        ' on Tumblr,] ',
        Date(args[4]):fmt('%B %d, %Y.')
    })
end

--- Handles citations of the game's code.
--  Code citations receive arguments in this order:
--  * GML script name
--  * (Optional) Starting line number
--  * (Optional) Ending line number
--  @function           f.code
--  @param              {table} args Citation type arguments
--  @return             {string} Citation text
--  @see                https://github.com/KockaAdmiralac/deltarune-viewer
function f.code(args)
    local str = {}
    if not args[1] then
        return err('Script name not specified')
    end
    if (args[2] and not tonumber(args[2])) or (args[3] and not tonumber(args[3])) then
        return err('Line number is not a number')
    end
    if data.script_repo ~= nil then
        str = {
            '[',
            data.script_repo,
            '/',
            args[1],
            '.html',
        }
        if args[2] then
            table.insert(str, '#L')
            table.insert(str, args[2])
        end
        table.insert(str, ' ')
        table.insert(str, args[1])
        table.insert(str, ' script]')
    else
        str = {
            args[1],
            ' script'
        }
    end
    if args[2] then
        table.insert(str, ', line')
        if args[3] then
            table.insert(str, 's ')
            table.insert(str, args[2])
            table.insert(str, '–')
            table.insert(str, args[3])
        else
            table.insert(str, ' ')
            table.insert(str, args[2])
        end
    end
    return table.concat(str)
end

--- Handles citations from news sources.
--  News citations receive arguments in this order:
--  * Excerpt from the news
--  * News post title
--  * News site name
--  * News post URL
--  * News post date
--  * (Optional) First name of the author
--  * (Optional) Last name of the author
--  @function           f.news
--  @param              {table} args Citation type arguments
--  @return             {string} Citation text
function f.news(args)
    if not args[1] then
        return err('Relevant news post excerpt not specified')
    end
    if not args[2] then
        return err('News post title not specified')
    end
    if not args[3] then
        return err('News site name not specified')
    end
    if not args[4] then
        return err('News post URL not specified')
    end
    if not args[5] or not valid_date(args[5]) then
        return err('News post date invalid or not specified')
    end
    local author = {}
    if args[6] then
        if args[7] then
            table.insert(author, args[7])
            table.insert(author, ', ')
        end
        table.insert(author, args[6])
        table.insert(author, ', ')
    end
    return table.concat({
        '\'\'',
        tags.replace(args[1]),
        '\'\' - [',
        args[4],
        ' ',
        args[2],
        '] (',
        table.concat(author),
        Date(args[5]):fmt('%B %d, %Y.'),
        ') \'\'',
        args[3],
        '\'\'.'
    })
end

-- Package items.

--- Template entrypoint for [[Template:Cite]].
--  @function           p.main
--  @param              {table} frame Scribunto frame object
--  @return             {string} Citation text
function p.main(frame)
    local args = frame:getParent().args
    local t = args[1]
    if t then
        if f[t] then
            local nargs = {}
            for i, v in ipairs(args) do
                if i > 1 then
                    nargs[i - 1] = v
                end
            end
            return f[t](nargs);
        else
            return err('Invalid citation type specified')
        end
    else
        -- {{cite}} was used
        local str = '<sup>&#91;[[Project:Manual of Style#Citation needed|<span title="This statement needs proper citation.">citation needed</span>]]&#93;</sup>'
        if title.namespace == 0 or title.namespace == 14 then
            return str .. '[[Category:Articles lacking sources]]'
        else
            return str
        end
    end
end

return p

--- Formats [[w:c:ut:Template:Flavortext|Template:Flavortext]] and
--  [[w:c:deltarune:Template:Quote|Template:Quote]] correctly and replaces
--  color/font tags in them.
--  @module             quote
--  @alias              p
--  @require            Dev:User error
--  @require            Module:Tags
--  @author             [[User:KockaAdmiralac|KockaAdmiralac]]
local p = {}

--  Module dependencies.
local userError = require('Dev:User error')
local tags = require('Module:Tags')

-- Package items.

--- Template entrypoint for [[w:c:ut:Template:Flavortext|Template:Flavortext]]
--  and [[w:c:deltarune:Template:Quote|Template:Quote]].
--  @function           p.main
--  @param              {table} frame Scribunto frame object
--  @returns            {string} Formatted quote
--  @error[24]          {string} 'No quotation text provided'
function p.main(frame)
    local args = frame:getParent().args
    if not args[1] then
        return userError('No quotation text provided', 'Pages with user errors')
    end
    local quote = mw.ustring.gsub(mw.text.trim(args[1]), '\n', '<br />')
    quote = tags.replace(quote)
    local html = mw.html.create('blockquote'):attr({
        ['data-template'] = 'quote',
        ['data-font']     = args[3]
    })
        :tag('p')
            :wikitext(quote)
        :done()
    if args[2] then
        html:tag('cite')
                :wikitext(args[2])
            :done()
    end
    return tostring(html:done())
end

return p

/* Personaje2 (de NIJISANJI website) */
.njsj-caption {
	position: relative;
	left: 50%;
	display: inline-block; 
	max-width: 100%;
	height: 22px;
	margin-top: 16px;
	padding-left: 40px;
	text-align: right; 
	transform: translateX(-50%);
}
.njsj-caption::before {
	content:"";
	position: absolute; 
	top: 0px;
	left: 0px;
	width: 6px;
	height: 6px;
	background-color: black;
	border-radius: 50%;
	transition: background 0.3s ease 0s;
}
.njsj-caption span {
	position: relative; 
	display: block;
	float: right; 
	max-width: calc(100% + 25px);
	height: 100%;
	overflow: hidden;
	font-weight: 700;
	font-size: 13px;
	white-space: nowrap;
	text-align: right;
	text-overflow: ellipsis;
}
.njsj-caption span::after {
	content:"";
	position: absolute;
	top: calc(100% - 2px);
	right: 0px;width: 100%; 
	height: 2px;
	background-color: black; 
	border-radius: 1px;
	transition: background 0.3s ease 0s;
}
.njsj-caption::after {
	content:"";
	position: absolute;
	top: 2.5px;
	left: 7px;
	width: 40px;
	height: calc(100% - 3px);
	border-left: 2.4px solid black;
	border-bottom:2px solid black;
	border-radius: 1px;
	transform: skew(30deg);
}