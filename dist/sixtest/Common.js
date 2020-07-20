/* Any JavaScript here will be loaded for all users on every page load. */

/* Test if an element has a certain class
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *  From: http://en.wikipedia.org/wiki/MediaWiki:Common.js
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ){
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
 
function createCollapseButtons(){
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "#" );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
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
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
/* API - load /Core */
(function LoadApi() {
	"use strict";
	if (wgPageName === 'Sixtest_Wiki:API4' && wgAction === 'view') {
		addOnloadHook(function () {
			var head, script, src, baseURL;
			head = document.getElementsByTagName('head')[0];
			src = 'Sixtest_Wiki:API4/Core';
			script = document.createElement('script');
			baseURL = 'http://sixtest.wikia.com/index.php?title=';
			script.type = 'text/javascript';
			script.src = baseURL + src + '&action=raw';
			head.appendChild(script);
		});
	}
}());
// for #5
(function LoadApi() {
	"use strict";
	if (wgPageName === 'Sixtest_Wiki:API5' && wgAction === 'view') {
		addOnloadHook(function () {
			var head, script, src, baseURL;
			head = document.getElementsByTagName('head')[0];
			src = 'Sixtest_Wiki:API5/Core';
			script = document.createElement('script');
			baseURL = 'http://sixtest.wikia.com/index.php?title=';
			script.type = 'text/javascript';
			script.src = baseURL + src + '&action=raw';
			head.appendChild(script);
		});
	}
}());
// #6
(function LoadApi() {
	"use strict";
	if (wgPageName === 'Sixtest_Wiki:API6' && wgAction === 'view') {
		addOnloadHook(function () {
			var head, script, src, baseURL;
			head = document.getElementsByTagName('head')[0];
			src = 'Sixtest_Wiki:API6/Core';
			script = document.createElement('script');
			baseURL = 'http://sixtest.wikia.com/index.php?title=';
			script.type = 'text/javascript';
			script.src = baseURL + src + '&action=raw';
			head.appendChild(script);
		});
	}
}());
(function (document) {
	"use strict";
	if (document.getElementsByClassName === undefined) {
		// IE<=8
		document.getElementsByClassName = function getElementsByClassName(className) {
			var ret = [], regex = new RegExp("(^| )" + className + "( |$)"), elements = document.body.getElementsByTagName("*"), i, len;
			for (i = 0, len = elements.length; i < len; i += 1) {
				if (regex.test(elements[i].className)) {
					ret[ret.length] = elements[i];
				}
			}
			return ret;
		};
	}
}(document));

(function (window) {
	// create the console object, otherwise scripts in the testing phase will break
	if (window.console === undefined || typeof window.console !== 'object' || typeof window.console.log !== 'function') {
		window.console = { "log": function () {} };
	}
}(window));

addOnloadHook((function () {
	"use strict";
	var loaded = false, loading = false;
	return function () {
		var instances, head, script;
		instances = document.getElementsByClassName('TibiaWikiAPI');
		function loadAPI(callback) {
			if (window.$API === undefined) {
				loading = true;
				head = document.getElementsByTagName('head')[0];
				script = document.createElement('script');
				script.type = 'text/javascript';
				if (typeof callback === 'function') {
					// TODO: support IE
					if (script.onload !== undefined) {
						script.onload = function () { loading = false; loaded = true; callback(); };
					}
				}
				script.src = 'http://sixtest.wikia.com/index.php?title=' + 'Sixtest_Wiki:API6/Core' + '&action=raw';
				head.appendChild(script);
				return true;
			}
			if (loaded) { callback(); return true; }
			if (loading) { throw new Error("Failed!"); }
			return false;
		}
		function loadInstances(instances) {
			var i, len, data;
			for (i = 0, len = instances.length; i < len; i += 1) {
				data = JSON.parse(instances[i].childNodes[0].textContent.substr(6));
				// the source element of the API call
				data.data.src = data.data.src || instances[i];
				$API(data);
			}
		}
		if (instances.length) {
			loadAPI(function () { loadInstances(instances); });
		} else if (wgPageName === 'Sixtest_Wiki:API') {
			loadAPI();
		}
	};
}()));
/* Mapper */
addOnloadHook(function() {
if (wgPageName === 'Mapper' || $('a[href*="http://tibia.wikia.com/wiki/Mapper"]').size()) {
$.ajax({ url: '/index.php?title=Mapper/Code&action=raw', success: function(text) {
  text = text.slice(text.search('id="pre_mapper">')+16, text.search('<\/pre>'));
  $('body:first').append('<script type="text/javascript">'+text+'</script>');
}});
}
});
/* End Mapper */

if ($('.lighttable').length) {
    importArticles({type: 'script', articles: ['MediaWiki:Common.js/highlightTable.js']})
}