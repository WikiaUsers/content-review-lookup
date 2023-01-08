/* Any JavaScript here will be loaded for all users on every page load. */

// Add "mainpage" class to the body element
if (
	mw.config.get( 'wgMainPageTitle' ) === mw.config.get( 'wgPageName' ) &&
	mw.config.get( 'wgAction' ) === 'view'
)
{
	$( document ).ready( function() {
		document.body.className += ' mainpage';
	});
}

// Editpage scripts
if( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	importScript( 'MediaWiki:Editpage.js' );
}

/* End of extra pages */

/* Test if an element has a certain class **************************************
 *
 * From English Wikipedia, 2008-09-15
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
var hasClass = ( function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();


/** Dynamic Navigation Bars (experimental) *************************************
 *
 * From English Wikipedia, 2008-09-15
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var collapseCaption = 'hide';
var expandCaption = 'show';

var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar( indexNavigationBar ) {
	var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
	var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );

	if( !NavFrame || !NavToggle ) {
		return false;
	}

	// if shown now
	if( NavToggle.firstChild.data == NavigationBarHide ) {
		for( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
			if ( hasClass( NavChild, 'NavPic' ) ) {
				NavChild.style.display = 'none';
			}
			if ( hasClass( NavChild, 'NavContent' ) ) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;

	// if hidden now
	} else if( NavToggle.firstChild.data == NavigationBarShow ) {
		for( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
			if( hasClass( NavChild, 'NavPic' ) ) {
				NavChild.style.display = 'block';
			}
			if( hasClass( NavChild, 'NavContent' ) ) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
	var indexNavigationBar = 0;
	// iterate over all < div >-elements
	var divs = document.getElementsByTagName( 'div' );
	for( var i = 0; NavFrame = divs[i]; i++ ) {
		// if found a navigation bar
		if( hasClass( NavFrame, 'NavFrame' ) ) {
			indexNavigationBar++;
			var NavToggle = document.createElement( 'a' );
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
			NavToggle.setAttribute( 'href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');' );

			var NavToggleText = document.createTextNode( NavigationBarHide );
			for( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
				if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
					if( NavChild.style.display == 'none' ) {
						NavToggleText = document.createTextNode( NavigationBarShow );
						break;
					}
				}
			}

			NavToggle.appendChild( NavToggleText );
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
				if( hasClass( NavFrame.childNodes[j], 'NavHead' ) ) {
					NavFrame.childNodes[j].appendChild( NavToggle );
				}
			}
			NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
		}
	}
}
addOnloadHook( createNavigationBarToggleButton );

/**
 * Hide prefix in category
 *
 * @source: www.mediawiki.org/wiki/Snippets/Hide_prefix_in_category
 * @rev: 3
 * @author Krinkle
 */
mw.loader.using( 'jquery.mwExtension', function() {
	var $tplHideCategoryPrefix = $( '#mw-cat-hideprefix' );
	if ( $tplHideCategoryPrefix.length ) {
		var prefix = $tplHideCategoryPrefix.text();
		if ( $.trim( prefix ) === '' ) {
			prefix = mw.config.get( 'wgTitle' ) + '/';
		}
		$( '#mw-pages' ).find( 'a' ).text( function( i, val ){
			return val.replace( new RegExp( '^' + $.escapeRE( prefix ) ), '' );
		});
	}
});

/**
 * Load the CodeReview 'tooltips' gadget on [[MediaWiki roadmap]] subpages,
 * so it's available for the revision reports where it's particularly useful
 * @author: Happy-melon
 */
if( mw.config.get( 'wgPageName' ).match( /^MediaWiki_roadmap/ ) ) {
	mw.loader.using( ['ext.codereview.tooltips'], function(){} );
}

/**
 * Load withJS and withCSS
 *
 * @source: www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL#Load_withJS_and_withCSS
 * @rev: 1
 * @author: Krinkle
 */
/* withJS */
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	// Disallow some characters in file name
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	// Don't use alert but the jsMsg system. Run jsMsg only once the DOM is ready.
	} else {
		$( document ).ready( function() {
			jsMsg( extraJS + ' script not allowed to be loaded.', 'error' );
		} );
	}
}
/* withCSS */
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	// Disallow some characters in file name
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	// Don't use alert but the jsMsg system. Run jsMsg only once the DOM is ready.
	} else {
		$( document ).ready( function() {
			jsMsg( extraCSS + ' stylesheet not allowed to be loaded.', 'error' );
		} );
	}
}

// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>