if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
	$( '.page-header__actions' ).first().prepend( $( '.eraicons' ).first() );
} else {
	$( '.page-header__contribution > div:first-child' ).append($('.eraicons').first() );
}

/* EN title */
(function() {
    var $ent = document.querySelector('#enTitle'),
        $header = document.querySelector('.page-header__main');
    if ($ent && $header && !mw.config.get('wgIsMainPage')) {
        $ent.style.display = 'block';
        $header.appendChild($ent);
    }
})();

/* Show/hide for media timeline -- Grunny */
$( function () {
    if( !$( '.timeline-toggles' ).length ) {
        return;
    }
    $( '.timeline-toggles' ).find( 'td > a' ).click( function () {
        var    hideBtnClass = $( this ).parent().attr( 'class' ),
            $hideContent = $( 'tr.' + hideBtnClass );
        if( !$hideContent.length ) {
            return;
        }
        $hideContent.toggle();
        if ( $( this ).text().indexOf( 'gizle' ) >= 1 ) {
            $( this ).text( $( this ).text().replace( 'gizle', 'göster' ) );
        } else {
            $( this ).text( $( this ).text().replace( 'göster', 'gizle' ) );
        }
    } );
} );

/* show hide button */
function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);

	if( show == 'false' ) {
		infoboxToggle();
	}

	var hidables = getElementsByClass('hidable');

	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);

		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

//Kaynak: jedipedia.de'nin Common.js
/***** Konfiguriert von Benutzer SVG *****/

//[[Özel:Çoklu Yükleme]]
 function remove_no_license_special_multipleupload() {
   if (mw.config.get('wgPageName') != "Özel:Çoklu Yükleme")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }

 $(remove_no_license_special_multipleupload);


/*-------------------------------------------------------------------------------------*\
|| allgemeine Funktion für einen HTTP-Request, die in mehreren Skripten verwendet wird ||
\*-------------------------------------------------------------------------------------*/
function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}

//import script zum Auslagern grosser Scripte
function importScript(page) {
	// TODO: might want to introduce a utility function to match wfUrlencode() in PHP
	var uri = mw.config.get('wgScript') + '?title=' +
		encodeURIComponent(page.replace(/ /g,'_')).replace(/%2F/ig,'/').replace(/%3A/ig,':') +
		'&action=raw&ctype=text/javascript';
	return importScriptURI(uri);
}

var loadedScripts = {}; // included-scripts tracker
function importScriptURI(url) {
	if (loadedScripts[url]) {
		return null;
	}
	loadedScripts[url] = true;
	var s = document.createElement('script');
	s.setAttribute('src',url);
	s.setAttribute('type','text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
	return s;
}

//----- ZU IMPORTIERENDE SCRIPTE -----//

importScript('MediaWiki:Functions.js');

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */

 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();
 
 var autoCollapse = 2;
 var collapseCaption = "Gizle";
 var expandCaption = "Göster";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 $( createCollapseButtons );

 /**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
$( createNavigationBarToggleButton );

//-------------------------------------------------------------------------------------

function replaceusername() {
  var spantags = document.getElementsByTagName("span");
  for (i=0; i<spantags.length; i++) {
    if (spantags[i].className=="insertusername") {
      if (mw.config.get('wgUserName')==null) {
        spantags[i].innerHTML="...";
      } else {
        spantags[i].innerHTML=mw.config.get('wgUserName');
      }
    }
  }
}
$(replaceusername);

//-------------------------------------------------------------------------------------

function addEditIntro(name) {
	var el = document.getElementById('ca-edit');

	if( typeof(el.href) == 'undefined' ) {
		el = el.getElementsByTagName('a')[0];
	}

	if (el)
		el.href += '&editintro=' + name;

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

if (mw.config.get('wgNamespaceNumber') == 0) {
	$(function(){
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Kategori:Seçkin maddeler') {
				addEditIntro('Şablon:SIntro');
				break;
				break;
			} else if ( cats[i].title == 'Kategori:UNDER CONSTRUCTION') {
				addEditIntro('Şablon:UCIntro');
				break;
			}
		}
	});
}

/*---------------------------------------------------------------------------------*\
|| Automatische Spaltenänderung der Bildergalerien basierend auf der Browserbreite ||
\*---------------------------------------------------------------------------------*/
function updategallery() {
objects=document.getElementsByTagName("table");
for (i=0; i<objects.length; i++) {
	if (objects[i].className=="gallery") {
		innerobjects=objects[i].getElementsByTagName("td");
		newtext="";
		for (j=0; j<innerobjects.length; j++) {
			newtext+=innerobjects[j].innerHTML;
		}
		newtable=document.createElement("table");
		newtable.className="gallery";
		objects[i].parentNode.insertBefore(newtable, objects[i].nextSibling);
		newtbody=document.createElement("tbody");newtr=document.createElement("tr");newtd=document.createElement("td");
		newtd.innerHTML=newtext;//DIVs zusammen in einer neuen Tabelle ergänzen
		newtbody.appendChild(newtr);newtr.appendChild(newtd);newtable.appendChild(newtbody);
		objects[i].parentNode.removeChild(objects[i]);//Tabelle entfernen
	}
}
}
$(updategallery);

$('a.wikia-button.upphotos').click(function () {
   location.href = mw.config.get('wgServer') + '/wiki/Özel:Yükle'
});

importScript('MediaWiki:Title.js');

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

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

/**
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {

	if ( !$( '#wpSummaryLabel' ).length ) {
		return;
	}

	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$summaryOptionsList,
			$summaryLabel = $( '#wpSummaryLabel' ),
			lines = data.split( '\n' ),
			$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );

		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
			var editSummary = $( this ).val();
			if ( editSummary !== '' ) {
				$( '#wpSummary' ).val( editSummary );
			}
		} );

		for ( var i = 0; i < lines.length; i++ ) {
			var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
		}

		$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
	} );

}

/**
 * fillEditSummaries for VisualEditor, based on Grunny's jQuery version of Sikon's original version
 * @author 01miki10
 */

function fillEditSummariesVisualEditor() {
	mw.hook( 've.activationComplete' ).add(function () {

		$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
			var	$summaryOptionsList,
				$summaryLabel = $( '.ve-ui-summaryPanel' ),
				$summaryInput = $( '.ve-ui-summaryPanel-summaryInputField > input' ),
				lines = data.split( '\n' ),
				$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Varsayılan özetler: ' );

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
 * jQuery version of Sikon's fillPreloads
 * @author Grunny
 */
function fillPreloads() {

	if( !$( '#lf-preload' ).length ) {
		return;
	}

	$( '#lf-preload' ).attr( 'style', 'display: block' );

	$.get( wgScript, { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );

		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '_' );
				$.get( wgScript, { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					data = data.replace(/<includeonly>(\n)?|(\n)?<\/includeonly>|\s*<noinclude>[^]*?<\/noinclude>/g, '');
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );

		for ( var i = 0; i < lines.length; i++ ) {
			var templateText = ( lines[i].indexOf( '*' ) === 0 ) ? lines[i].substring(1) : '';
			$preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
		}

		$( '#lf-preload-cbox' ).html( $preloadOptionsList );
	} );

	$( '#lf-preload-pagename' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />' );

}

function doCustomPreload() {
	var value = $( '#lf-preload-pagename > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}

function insertAtCursor(myField, myValue) {
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

/* Şablon:RailModule */
window.AddRailModule = [{prepend: true}];
/* Şablon:RailModule final */

/**
 * Start upload form customisations
 * @author Green tentacle
 */

$(function() {
	if ( wgCanonicalSpecialPageName === 'Upload' ) {
		setupUploadForm();
	}
});

function setupUploadForm(){
	// Check if cookie has been set for form style. Overrides URL parameter if set.
	var formstyle = localStorage.getItem("uploadform");

	$("#uploadBasicLinkJS").show();
	$("#uploadTemplateNoJS").hide();

	var wpLicense = $('#wpLicense');

	if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
		if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
			// Add link to basic form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.wikia.com/tr/index.php?title=Special:Upload&basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Basit yükleme formuna geç</a></div>');

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
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Kaynak:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Açıklama:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody1.append('<tr><td colspan="2" style="text-align: center;">İsteğe bağlı alanlar <span class="hidable-button"></span></td></tr>');

			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Dikkat:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Eser sahibi/Sanatçı:</td><td class="mw-input"><textarea id="authorBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Dosya özellikleri / düzenleme detayları:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Diğer versiyonlar / kaynak resimler:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Sanatçı kategorileri:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Lisans sahibi kategorileri:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Konu kategorileri:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">TypeTür kategorileri:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('{{Bilgi\r\n|attention=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}');

			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="//starwars.wikia.com/tr/index.php?title=Special:Upload" onclick="javascript:localStorage.setItem(\'uploadform\', \'guided\')">Rehberli yükleme formuna geç</a></div>');
			
			$('#mw-upload-form').bind('yükle', verifyName);
		}
	}
}

function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
	var wpDestFile = document.getElementById('wpDestFile');

	// Check for licensing
	if ( wpLicense.value == "" ){
		alert('Lisansalama boş bırakılamaz.');
		return false;
	}

	// Check for source
	if ( document.getElementById('sourceBox').value == "" ){
		alert('Kaynak boş bırakılamaz.');
		return false;
	}

	// Check for duplicated or capitalized file extensions
	if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
		alert('Lütfen dosya uzantısında büyük hafler veya tekrarlama kullanmayınız.');
		return false;
	}

	var strBuilder = '{{Bilgi\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|author=' + document.getElementById('authorBox').value + '\r\n';
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
		alert('Lütfen dosya uzantısında büyük hafler veya tekrarlama kullanmayınız.');
		return false;
	}

	// Check for annoying characters
	if ( wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
		alert('Lütfen dosya adında parantez, eğik çizgi, noktalama işaret veya diğer alfanumerik olmayan karakterleri kullanmayınız.');
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

$( fillEditSummaries );
$( fillEditSummariesVisualEditor );
$( fillPreloads );

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
		$( '.page-header #ca-addsection' ).html( 'Arşivlendi' ).removeAttr( 'href' );
		$( '.page-header #ca-edit' ).remove();
		$( '.page-side-tools #ca-addsection' ).remove();
		$( 'span.mw-editsection' ).remove();
		return;
	} else {
		$( '.page-header #ca-edit' ).html( 'Arşivlendi' ).removeAttr( 'href' );
		$( '.page-side-tools #ca-edit' ).remove();
		$( 'span.mw-editsection' ).remove();
		return;
	}
}

function addHideButtons() {
	var hidables = getElementsByClass('hidable');

	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');

		if( button != null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Gizle]') );

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

$(addHideButtons);

$( disableOldForumEdit );