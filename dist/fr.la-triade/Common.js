/*** HYDRAREVIVED ***/

/*$(function() {
	var config = mw.config.get([
			'skin',
			/*'wgRailModuleParams',*/
/*			'wgSiteName',
			'wgUserLanguage',
			'wgWikiaBarSkinData',
			'wgArticlePath'
		]);
    
	if (window.HydraRevivedReady || config.skin !== 'fandomdesktop') return;
	window.HydraRevivedReady = true;
	
	function msg(key, params) {
		return new Promise(function(resolve) {
			if (mw.message(key, params).exists()) {
				resolve(mw.message(key, params).text());
			} else {
				var name = key + '__' + config.wgUserLanguage;
				var val = $.cookie(name);
				if (val) {
					mw.messages.set({key: val});
					resolve(val);
				} else {
					mw.loader.using('mediawiki.api').done(function() {
						new mw.Api().loadMessagesIfMissing([key]).done(function() {
							var msg = mw.message(key, params);
							if (msg.exists()) $.cookie(name, msg.text(), { 
								expires: 7, 
								domain: 'fandom.com', 
								path: '/'
							});
							resolve(msg.text());
						});
					});
				}
			}
		});
	}
	
    /* Append body class */
    $('body').addClass('hydra-revived-ready');

    /* Add fancy tooltips for wiki tools */
    $('.fandom-community-header .wiki-tools .wds-button').each(function(index, element) {
        var $element = $(element);
        $element.attr('data-title', $element.attr('title'));
        $element.removeAttr('title');
    });

    /* Add page head */
/*	var $head = $('<div class="page__head">'),
        $left = $('<div class="page-tabs__left">').appendTo($head),
        $right = $('<div class="page-tabs__right page-header__actions" id="p-views">').appendTo($head),
        $more = $('<div class="wds-dropdown more-actions">' + 
					'<div class="wds-dropdown__toggle"><span class="head-tab">More</span></div>' + 
					'<div class="wds-dropdown__content wds-is-not-scrollable"><ul class="wds-list wds-is-linked" id="p-cactions"></ul></div>' +
				'</div>'),
		$moreList = $more.find('.wds-list');
		
	msg('fd-community-header-more').then(function(text) {
		$more.find('.wds-dropdown__toggle span').text(text);
	});

	var actions = config.wgWikiaBarSkinData.contentActions,
		$views = $('#p-views');
		$cactions = $('#p-cactions');
		
	if (actions) {
		$.each(actions, function(key, action) {
			var $tab = $cactions.find('#' + action.id).removeClass().addClass(action.class);
			
			if (!$tab.length) {
				if (key == 'share') {
					$tab = $('<div class="wds-dropdown" id="ca-share">' + 
							'<div class="wds-dropdown__toggle"><span class="head-tab">Share</span></div>' + 
							'<div class="wds-dropdown__content wds-is-not-scrollable">' + action.html + '</div>' +
						'</div>');
						
					msg('sharing').then(function(text) {
						$tab.find('.wds-dropdown__toggle span').text(text);
					});
				} else {
					$tab = $('<a>', {
						class: action.class,
						id: action.id,
						accesskey: action.accesskey,
						href: action.href,
						text: action.text
					});
				}
			}
			
			if (key.indexOf('nstab') > -1 || key === 'talk' || key === 'share') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.appendTo($left);
			} else if (action.primary || key === 'history') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.addClass('head-tab').appendTo($right);
			} else {
				$('<li>').append($tab).appendTo($moreList);
			}
		});
	}
	
	/* Append remaining items from more dropdown */
	$cactions.find('.wds-list > li:not(:empty)').appendTo($moreList);
	
	/* Append more dropdown */
	if ($moreList.children().length) {
		$more.appendTo($right);
	}
	
	/* Remove old action area */
	$views.remove();

    /** Search **/
    var $form = $('<form>', {
            action: config.wgArticlePath.replace('$1', 'Special:Search'),
            id: 'searchform'
        }),
        $bar = $('<div>', {
            id: 'simpleSearch',
            append: [
                $('<input>', {
                    type: 'hidden',
                    value: 'Special:Search',
                    name: 'title'
                }),
                $('<input>', {
                    type: 'submit',
                    name: 'go',
                    value: 'Rechercher',
                    title: 'Rechercher',
                    id: 'searchButton',
                    class: 'searchButton'
                })
            ],
            appendTo: $form
        }),
        $box = $('<input>', {
            type: 'search',
            name: 'search',
            placeholder: 'Rechercher sur ' + config.wgSiteName,
            title: 'Rechercher sur ' + config.wgSiteName,
            id: 'searchInput',
            tabindex: '1',
            prependTo: $bar
        }).attr('autocomplete', 'off');

    $right.append($form);
    $('.resizable-container .page').prepend($head);

    /* Enable autocomplete */
    mw.loader.using('mediawiki.searchSuggest');
});

// Variable pour PreloadTemplates
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
 
// Variables pour Standard Edit Summary
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
}; 
 
// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Standard Edit Summary/code.js',
        'u:dev:Mediawiki:PreloadTemplates.js',
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* subtitle */
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
 
// add the original english title as a subtitle.
  showEnTitle();

function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('firstHeading');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

  
// Copied from http://starwars.wikia.com/wiki/MediaWiki:Wikia.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

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
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'cacher' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'cacher', 'afficher' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'afficher', 'cacher' ) );
		}
	} );
} );

/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/* @author Grunny */
function addHideButtons() {
    var hidables = document.querySelectorAll('.hidable');

    if (hidables !== null){
    	for( var i = 0; i < hidables.length; i++ ) {
    		var box = hidables[i];
    		var button = box.querySelector('span.hidable-button');
     
    		if( button !== null ) {
    			button.onclick = toggleHidable;
    			button.appendChild( document.createTextNode('[masquer]') );
    
                var regex = new RegExp("(^|\\s)" + 'start-hidden' + "(\\s|$)")
    			if( isMatch(regex ,'start-hidden', box) )
    				button.onclick('bypass');
    		}
    	}
    }
}
 
/* @author Grunny */
function toggleHidable(bypassStorage) {
	var parent = this.closest('.hidable');
	
	var content = parent.querySelectorAll('.hidable-content');
	var nowShown;
 
	if( content !== null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[masquer]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[afficher]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = document.querySelectorAll('.hidable');
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

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
    var hidables = document.querySelector('.hidable');

    if (hidables !== null){
        for(var i = 0; i < hidables.length; i++) {
            var box = hidables[i];
    		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
    		
    		var content = box.querySelector('.hidable-content');
    		var button = box.querySelector('.hidable-button');
    
    		if( show == 'false' ) {
    			if( content !== null &&	button !== null && content[0].style.display != 'none' )	{
    				button[0].onclick('bypass');
    			}
    		} else if( show == 'true' ) {
    			if( content !== null && button !== null && content[0].style.display == 'none' )	{
    				button[0].onclick('bypass');
    			}
    		}
    	}
    }
}

function isMatch(regex, className, element) {
	return regex.test(element.className);
}
 

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
/*window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


// Variable pour PreloadTemplates
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
 
// Variables pour Standard Edit Summary
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
}; 
 
// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Standard Edit Summary/code.js',
        'u:dev:Mediawiki:PreloadTemplates.js',
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* subtitle */
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
 
// add the original english title as a subtitle.
  showEnTitle();

function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('firstHeading');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

  
// Copied from http://starwars.wikia.com/wiki/MediaWiki:Wikia.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

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
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'cacher' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'cacher', 'afficher' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'afficher', 'cacher' ) );
		}
	} );
} );

/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/* @author Grunny */
function addHideButtons() {
    var hidables = document.querySelectorAll('.hidable');

    if (hidables !== null){
    	for( var i = 0; i < hidables.length; i++ ) {
    		var box = hidables[i];
    		var button = box.querySelector('span.hidable-button');
     
    		if( button !== null ) {
    			button.onclick = toggleHidable;
    			button.appendChild( document.createTextNode('[masquer]') );
    
                var regex = new RegExp("(^|\\s)" + 'start-hidden' + "(\\s|$)")
    			if( isMatch(regex ,'start-hidden', box) )
    				button.onclick('bypass');
    		}
    	}
    }
}
 
/* @author Grunny */
function toggleHidable(bypassStorage) {
	var parent = this.closest('.hidable');
	
	var content = parent.querySelectorAll('.hidable-content');
	var nowShown;
 
	if( content !== null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[masquer]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[afficher]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = document.querySelectorAll('.hidable');
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

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
    var hidables = document.querySelector('.hidable');

    if (hidables !== null){
        for(var i = 0; i < hidables.length; i++) {
            var box = hidables[i];
    		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
    		
    		var content = box.querySelector('.hidable-content');
    		var button = box.querySelector('.hidable-button');
    
    		if( show == 'false' ) {
    			if( content !== null &&	button !== null && content[0].style.display != 'none' )	{
    				button[0].onclick('bypass');
    			}
    		} else if( show == 'true' ) {
    			if( content !== null && button !== null && content[0].style.display == 'none' )	{
    				button[0].onclick('bypass');
    			}
    		}
    	}
    }
}

function isMatch(regex, className, element) {
	return regex.test(element.className);
}
 

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
/*window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */


/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/***** Customisation *****/
/*** AddRailModule (Dev Wiki) ***/
window.AddRailModule = [{prepend: true}];

/*** Modification de la page d'import de fichier ***/
$(function() {
	if (mw.config.get('wgPageName') != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|description=\r\n|licence=\r\n|source=\r\n|autre=}}");
	$('.mw-htmlform-field-HTMLTextAreaField .mw-input').append('<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="Tèxte en gras" title="Tèxte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="Tèxte en italica" title="Tèxte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam intèrne" title="Ligam intèrne" id="button-link" style="width: 23px; height: 22px;">');
	$('#button-italic').click(function() {
		richEditor("\'\'", "\'\'");
	});
	$('#button-bold').click(function() {
		richEditor("\'\'\'", "\'\'\'");
	});
	$('#button-link').click(function() {
		richEditor("[[", "]]");
	});

	function richEditor(primier, segond) {
		var textarea = document.getElementById("wpUploadDescription");
		if ('selectionStart' in textarea) {
			if (textarea.selectionStart != textarea.selectionEnd) {
				var newText = textarea.value.substring (0, textarea.selectionStart) + 
								primier + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + segond +
								textarea.value.substring (textarea.selectionEnd);
				textarea.value = newText;
			}
		}
		else {
			var textRange = document.selection.createRange ();
			var rangeParent = textRange.parentElement ();
			if (rangeParent === textarea) {
				textRange.text = primier + textRange.text + segond;
			}
		}
	}
});

/*** Forcer le favicon à s'afficher lors de bugs ***/

(function () {
 // Remettre le favicon s'il n'est pas chargé
 var headTitle = document.querySelector('head'), 
  favIcons = [{ rel: 'apple-touch-icon' }, { rel: 'apple-touch-startup-image' }, { rel: 'shortcut icon' }];
 favIcons.forEach(function (favIcon) {
    var setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel', favIcon.rel);
    setFavicon.setAttribute('href', 'https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/6/64/Favicon.ico/revision/latest?cb=20201126084739&path-prefix=fr');
    headTitle.appendChild(setFavicon);
 });
 //headTitle.appendChild(setFavicon);
})();

/***** Modèles *****/

/*** USERNAME ***/
 
function substUsername() {
        $('.insertusername').text('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + mw.config.get('wgUserName') + '</a>');
        $('.insertusername:hover').css('text-decoration', 'none');
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').text(mw.config.get('wgUserName'))});

/*** Slider ***/

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});

// Retrait des [GDCP] dans les sommaires

$(function () {
  /**
   * @type {HTMLElement}
   */
  var LISTE = document.getElementById('toc');
  var content = String(LISTE.innerHTML);
  content = content
    .replace(
      /(?:<sup>)?\[(?:(?:GDCP\d)|(?:GDCP8\.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))[^\]]*\]?(?:<\/sup>)?/g,
      ''
    )
    .replace(
      /\[(?:(?:GDCP\d)|(?:GDCP8.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))\]/g,
      ''
    );
  document.getElementById('toc').innerHTML = content;
});
/*** Module de progression ***/
setTimeout(function () {
  document.querySelectorAll('.progressmodifs').forEach(function (item) {
    var modifs = parseInt(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', '')),
      palier;
      console.log(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', ''));
    if (modifs < 20) {
      palier = 20;
    } else if (modifs < 50) {
      palier = 50;
    } else if (modifs < 100) {
      palier = 100;
    } else if (modifs < 200) {
      palier = 200;
    } else if (modifs < 350) {
      palier = 350;
    } else if (modifs < 500) {
      palier = 500;
    } else if (modifs < 750) {
      palier = 750;
    } else if (modifs < 1000) {
      palier = 1000;
    } else if (modifs < 1500) {
      palier = 1500;
    } else if (modifs < 2000) {
      palier = 2000;
    } else if (modifs < 2500) {
      palier = 2500;
    } else if (modifs < 3000) {
      palier = 3000;
    } else if (modifs < 4000) {
      palier = 4000;
    } else {
      palier = 10000;
    }
    var calc = (modifs / palier) * 100,
      color;
    if (calc <= 25) {
      color = 'red';
    } else if (calc <= 50) {
      color = 'orange';
    } else if (calc <= 75) {
      color = 'yellow';
    } else {
      color = 'green';
    }
    item.innerHTML =
      '<center>' +
      Math.round(calc) +
      '% de ' +
      palier +
      '</center>\n<center><div style="width: 75%; height: 20px; background-image: linear-gradient(to right, ' +
      color +
      ' ' +
      calc +
      '%, #FFF 0%); border: 3px solid #3A3A3A"></div></center>';
  });
}, 5000);

// empêcher les balises existantes d'être masquées
(window.dev = window.dev [[:Template:!!]] {}).profileTags = { noHideTags: true };