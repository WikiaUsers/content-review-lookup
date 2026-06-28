/* Any JavaScript here will be loaded for all users on every page load. */


/* Redirects 'Add a photo' button to Special:Upload */

$(function() { // Restores the Special:Upload functionality. This does not block core functionality
	if (window.UploadPhotos && window.UploadPhotos.showDialog) {
		$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
	}
});


/**
 * Start upload form customisations. Copied from Wookieepedia.
 * @author Green tentacle
 */
 
function setupUploadForm(){
	// Check if cookie has been set for form style. Overrides URL parameter if set.
	var formstyle = getCookie("uploadform");
 
	$("#uploadBasicLinkJS").show();
	$("#uploadTemplateNoJS").hide();
 
	var wpLicense = $('#wpLicense');
 
	if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
		if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
			// Add link to basic form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://baldursgate.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Switch to basic upload form</a></div>');
 
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
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Original designer / artist:</td><td class="mw-input"><textarea id="authorBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Conversion / editing / upload information:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other versions / source images:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Artist categories:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject categories:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Type categories:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('==Summary==\r\n{{Image information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat subject=\r\n|cat type=\r\n}}');
 
			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://baldursgate.wikia.com/index.php?title=Special:Upload" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Switch to guided upload form</a></div>');
		}
	}
}
 
function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
 
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
 
	var strBuilder = '==Summary==\r\n{{Image information\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|author=' + document.getElementById('authorBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat subject=' + document.getElementById('catsubjectBox').value + '\r\n';
	strBuilder += '|cat type=' + document.getElementById('cattypeBox').value + '\r\n';
	strBuilder += '}}';
 
	document.getElementById('wpUploadDescription').value = strBuilder;
 
	wpLicense.selectedIndex = 0;
 
	return true;
}

$(function() {
	if ( wgCanonicalSpecialPageName === 'Upload' ) {
		setupUploadForm();
		addHideButtons();
	}
});
 
/**
 * End upload form customisations
 */

/**
 * Sets the cookie. Copied from Wookieepedia.
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}

/**
 * Gets the cookie. Copied from Wookieepedia.
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
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

/**
 * Hide buttons. Copied from Wookieepedia.
 */
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
 
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

/**
 * End of hide buttons.
 */

/************************************************************
 * Functions.js stuff
 * Copied from Wookieepedia
 * Could be rewritten with jQuery
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
/**
 * GameFiles Universal Data Viewer for Baldur's Gate fandom
 * Parses URL hash parameters and forwards them to Lua modules.
 * More details can be found in the [[GameFiles/Technical_description|technical description]] of the project.
 * Author: [[https://baldursgate.fandom.com/wiki/User:Jeremy_James_33|Jeremy_James_33]]
 */
(function(mw, $) {
    // Ensure required MediaWiki modules are loaded
    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {

        var pageName = mw.config.get('wgPageName');

        // Only run on GameFiles/* pages
        if (!pageName || pageName.indexOf('GameFiles/') !== 0) return;

        // Extract display type (e.g., "DisplayItem")
        var displayType = pageName.replace(/^GameFiles\//, '').split('/')[0];

        var loadGameData = function() {
            var $container = $('#GameFiles-Viewer');
            if (!$container.length) return;

            // Parse hash parameters
            var hash = window.location.hash.replace(/^#/, '');
            var params = {};

            if (hash.includes('=')) {
                // Multi-parameter mode: key=value&key2=value2
                hash.split('&').forEach(function (pair) {
                    var parts = pair.split('=');
                    if (parts[0]) {
                        // Decode the params to be able to manipulate them
                        params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
                    }
                });
            } else if (hash) {
                // Single raw parameter
                params.param = decodeURIComponent(hash);
            }

            // Build Lua parameter string, format: |key=value
            // Escape sensitive characters
            var luaParams = Object.keys(params)
                .map(function (key) {
                    var cleanKey = key.replace(/[|}=]/g, ''); // Basic cleanup
                    var cleanVal = params[key].replace(/[|}]/g, function(m) {
                        return (m === '|' ? '{{!}}' : '&#125;'); // Escape Wikitext
                    });
                    return cleanKey + '=' + cleanVal;
                })
                .join('|');

            // Loading UI
            $container.html(
                '<div style="text-align:center; padding:20px;">' +
                '<div class="mw-ajax-loader"></div><br>' +
                'Fetching data...</div>');

            // Choose Lua function
            var luaFunction = hash ? 'param' : 'noparam';

            // Safe built of wikitext
            var wikitext = '{{#invoke:GameFiles/' + displayType + '|' + luaFunction;
            if (luaParams) wikitext += '|' + luaParams;
            wikitext += '}}';

            // Call Lua
            new mw.Api().get({
                action: 'parse',
                text: wikitext,
                prop: 'text',
                disablelimitreport: true,
                pst: true // Pre-save transform to manage signatures/pipes
            }).done(function (data) {
                if (data && data.parse && data.parse.text) {
                    $container.html(data.parse.text['*']);
                    // Optional : trigger MediaWiki hooks for other scripts (ex: tooltips)
                    mw.hook('wikipage.content').fire($container);
                }
            }).fail(function () {
                $container.html('<div class="errorbox">Error: Could not communicate with the Lua module.</div>');
            });
        };

        // Execute on page load
        $(document).ready(loadGameData);
        // Execute when the URL hash changes (navigation without refresh)
        $(window).on('hashchange', loadGameData);
    });
})(window.mediaWiki, window.jQuery);