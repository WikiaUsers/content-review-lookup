/* Any JavaScript here will be loaded for all users on every page load. */
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

$(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Recent Changes</a>');

<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Recent Changes</a>

('ShowHide/code.js', 'dev');


importArticles({
    type: "script",
    articles: [
        "MediaWiki:common.js/Slider.js"
    ]
});

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refretogglsh';
importScriptPage('AjaxRC/code.js', 'dev');

var hidepoll = document.getElementsByClassName('hidepoll');
 $(function() {
  $('.ajax-poll .pollAnswerVotes').hide();
  $('.ajax-poll [type="submit"]').on('click', function() {
    $('.ajax-poll .pollAnswerVotes').hide();
  });
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://es.maxpayne.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );


/*************************/
/**New files module**/
/************************/
 
//NewFilesModuleCompact = 1; //optional compact mode
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if ($('.ChatModule').length && !$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/13" + " #gallery-", function () {
          $('.ChatModule').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
          if (typeof NewFilesModuleCompact != "undefined" && NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
  $('head').append('<style type="text/css">\n#gallery- { height:452px; overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em;}\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; }\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; }\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
}

var togglers = new Array();
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled) return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++) {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string") {
            if (toggles.charAt(0) == '-') {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles) toggles = new Array(toggles);
            }
            else toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length) continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
        switch (op) {
        case "_reset":
            for (var j in toggles)
            toggles[j].style.display = toggles[j]._toggle_original_display;
            break;
        case "_show":
            for (var j in toggles)
            toggles[j].style.display = '';
            break;
        case "_hide":
            for (var j in toggles)
            toggles[j].style.display = 'none';
            break;
        case "":
        default:
            // Toggle
            for (var j in toggles)
            toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
            break;
        }
    }
}
 
function createTogglerLink(toggler, id) {
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit() {
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (typeof elem.className != 'string' || !elem.className) continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++) {
            var elemClass = elemClasses[j];
            if (!allClasses[elemClass]) allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle") continue;
 
            if (elemClass == "_togglegroup") toggleGroup = new Array();
            else if (elemClass == "_toggle") toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init") {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show") elem.style.display = '';
                else if (disp == "hide") elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler") {
                if (togglerID == -1) {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1) toBeToggled = elemClass.substring(hyphen + 1);
                else {
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
 
 
function owwsitesearch(f) {
    f.q.value = 'site:http://openwetware.org/wiki/' + f.base.value + '++' + f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
 
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









































/* wikiMod
 * by: jgjake2
 * 
 * wikiMod was originally designed to provide a base API for mobile JS hacks on Wikia,
 * but has since been generalized work in any situation on any platform.
 * 
 * Many functions are based on/taken from another project of mine called jMod
 * https://github.com/jgjake2/myUserJS-API
 */
 
// Several functions taken from another project of mine: jMod
// https://github.com/jgjake2/myUserJS-API
+function($, _mw, factory){
	var global = this,
		_undefined = "undefined",
		uw = (typeof unsafeWindow != _undefined ? unsafeWindow : null);
 
	function isMediaWiki(obj){
		return (obj && obj.loader && obj.messages && obj.libs ? true : false);
	}
 
	try {
		if(!uw && window.wikiMod && window.wikiMod.isPrivileged === true){
			return;
		}
	} catch(e) {}
 
	var wikiMod = factory.call(global, $, (isMediaWiki(_mw) ? _mw : undefined) , uw, Object, _undefined);
 
	if(wikiMod.mw == null){
		wikiMod.load("mediawiki");
	}
 
	if((uw && uw.jQuery && !uw.jQuery.loadJQueryUI) || (!uw && !$.loadJQueryUI)){
		wikiMod.load("jquery.loaders");
	}
 
	try {
		if(global.wikiMod){
			wikiMod._wikiMod = global.wikiMod;
		}
	} catch(e) {}
 
	try {
		if(window.wikiMod){
			wikiMod.__wikiMod = window.wikiMod;
		}
	} catch(e) {}
 
	function exportArgs(name, cb, coa){
		var length = arguments.length;
		var t = {
			"allowCallbacks": (length > 1 ? (cb == true) : true),
			"allowCrossOriginArguments": (length > 2 ? (coa == true) : true)
			};
		if(length > 0 && name)
			t.defineAs = name;
		return t;
	};
	var validDeepExports = [],
		excludePropsFromExport = ["exportFunction", "cloneInto"];
 
 
	function exportProxy(obj, args){
		args = args || {};
		var exportHandlers = cloneInto({}, uw, {cloneFunctions: true, wrapReflectors: true}),
			_exportFunction = exportFunction;
		_exportFunction(args["get"] || function(oTarget, sKey){
			if(typeof obj[sKey] !== "undefined" || sKey in obj){
				try{
					if(excludePropsFromExport.indexOf(sKey) > -1){
						return undefined;
					}
				}catch(e){}
				try{
					if(obj === wikiMod && validDeepExports.indexOf(sKey) > -1){
						return exportProxy(obj[sKey]);
					}
				}catch(e){}
				if(typeof obj[sKey] === "object" || typeof obj[sKey] === "function"){
					try{
						return cloneInto(obj[sKey], uw, {cloneFunctions: true, wrapReflectors: true});
					}catch(e){}
				}
				return obj[sKey];
			} else {
				return undefined;
			}
		}, exportHandlers, exportArgs("get"));
 
		_exportFunction(args["set"] || function(oTarget, sKey, vValue){
			try{
				obj[sKey] = vValue;
			}catch(e){return false;}
			return true;
		}, exportHandlers, exportArgs("set"));
 
		_exportFunction(args["has"] || function(oTarget, sKey){
			return (sKey in obj);
		}, exportHandlers, exportArgs("has"));
 
		_exportFunction(args["enumerate"] || function(oTarget, sKey){
			try{
				return (obj.keys())[Symbol.iterator]();
			}catch(e){}
			try{
				// To Do:
				// Check for .keys existence before use (ES5 support)
				return obj.keys();
			}catch(e){}
		}, exportHandlers, exportArgs("enumerate"));
 
		_exportFunction(args["ownKeys"] || function(oTarget, sKey){
			return Object.getOwnPropertyNames(obj);
		}, exportHandlers, exportArgs("ownKeys"));
 
		_exportFunction(args["defineProperty"] || function(oTarget, sKey, oDesc){
			if (oDesc && !(sKey in obj)){
				Object.defineProperty(obj, sKey, oDesc);
			}
			return obj;
		}, exportHandlers, exportArgs("defineProperty"));
 
		_exportFunction(function(oTarget, sKey){
			return Object.getOwnPropertyDescriptor(obj, sKey);
		}, exportHandlers, exportArgs("getOwnPropertyDescriptor"));
 
		_exportFunction(args["construct"] || function(oTarget, argumentsList){
			return obj.apply(obj, argumentsList);
		}, exportHandlers, exportArgs("construct"));
 
		_exportFunction(function(oTarget, sKey){
			return obj.prototype;
		}, exportHandlers, exportArgs("getPrototypeOf"));
 
		_exportFunction(function(oTarget, thisArg, argumentsList){
			return obj.apply(obj, argumentsList);
		}, exportHandlers, exportArgs("apply"));
 
		try{
			return new uw.Proxy(_exportFunction(function(){return obj.apply(obj, arguments);}, uw, exportArgs()), exportHandlers);
		}catch(e){
			console.log('export error', e);
			return undefined;
		}
	};
 
	try {
		if(uw && uw.wikiMod){
			wikiMod.__uwwikiMod = uw.wikiMod;
		}
	} catch(e) {}
 
	try {
		window.wikiMod = global.wikiMod = wikiMod;
	} catch(e) {}
 
	if(uw && uw.Proxy){
		try {
			uw.wikiMod = exportProxy(wikiMod);
		} catch(e) {
			console.log('Error exportProxy: ', e);
		}
	}
 
	var wmReadyName = "onWikiModReady";
 
	if(_undefined!=typeof window[wmReadyName]){
		if(window[wmReadyName] === false){
			try {
				window[wmReadyName] = window.wikiMod;
			} catch(e) {}
		} else if(window[wmReadyName] === true){
			// Do Nothing
		} else if(typeof window[wmReadyName] == "function") {
			try {
				window[wmReadyName]();
				window[wmReadyName] = undefined;
				delete window[wmReadyName];
			} catch(e) {}
		}
	}
 
	if(uw && _undefined!=typeof uw[wmReadyName]){
		if(uw[wmReadyName] === false){
			uw[wmReadyName] = uw.wikiMod;
		} else if(uw[wmReadyName] === true){
			// Do Nothing
		} else if(typeof uw[wmReadyName] == "function") {
			try {
				uw[wmReadyName]();
				uw[wmReadyName] = undefined;
				delete uw[wmReadyName];
			} catch(e) {}
		}
	}
 
	var exportArgs2 = {allowCallbacks: true, allowCrossOriginArguments: true},
		getFn = function(){return true;},
		setFn = function(fn){try{fn();}catch(e){}};
 
	if(uw && _undefined==typeof uw[wmReadyName] && _undefined!=typeof exportFunction){
		try {
			Object.defineProperty(uw, wmReadyName, {
				get: exportFunction(getFn, uw, exportArgs2),
				set: exportFunction(setFn, uw, exportArgs2),
				enumerable: true,
				configurable: false
			});
		} catch(e) {console.log(e);}
	}
 
	if(_undefined==typeof window[wmReadyName]){
		try {
			Object.defineProperty(window, wmReadyName, {
				get: getFn,
				set: setFn,
				enumerable: true,
				configurable: false
			});
		} catch(e) {console.log(e);}
	}
 
}.call(
	this,
	typeof jQuery !== "undefined" ? jQuery : (window.jQuery || window.$ || null),
	typeof mediaWiki !== "undefined" ? mediaWiki : (window.mw || window.mediaWiki || (typeof unsafeWindow !== "undefined" ? (unsafeWindow.mediaWiki || unsafeWindow.mw) : null)),
function($, _mw, uw, Object, _undefined, undefined) {
 
	var global = this,
		customCSSAdded = false, _css = "@import url(http://code.jmod.info/fonts/sansation.css);\n",
		_jQueryAvailable = ($ ? true : false),
		__mw = _mw,
		mCloneIntoDefaultArgs = {
			cloneFunctions: true,
			wrapReflectors: true
		},
		Slice = Array.prototype.slice,
		winUwGl = (window || uw || global), // Order Matters!
		winGlUw = (window || global || uw), // Order Matters!
		uwGlWin = (uw || global || window), // Order Matters!
		isURLPatt = /^\s*((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+(:[0-9]+)?|(?:ww‌​w\.|[\-;:&=\+\$,\w]+)[A-Za-z0-9\.-]+)((?:\/[\+~%\/\.\w-_]*)?\??(?:[-\+=&;%\@\.\w_]*)?(?:\#‌​(?:[\w-_]*))?)?)\s*$/gi;
 
	if (!String.prototype.trim) {
		Object.defineProperty(String.prototype, 'trim', {
			value: function() {return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');},
			enumerable: false
		});
	}
 
	function WikiMod(){
		var args = arguments,
			length = args.length,
			i = 1, types = [],
			arg0, type0;
			function type(x){return (x < length ? types[x] : "notdefined");}
			/*
			function typeMatch(){
				var a = arguments, l = a.length;
				if(l > length || l == 0)
					return false;
				for(var x = 0; x < l; x++){
					if(a[x] !== types[x])
						return false;
				}
				return true;
			}
			*/
			// realType0,
 
		if(length == 0){
			return wikiMod.mw;
		} else {
			arg0 = args[0];
			types.push(type0 = typeof arg0);
			for( ; i < args.length; i++){
				types.push(typeof args[i]);
			}
 
			//realType0 = RealTypeOf(arg0);
			if(length == 1){
				switch(type0){
					case "function":
						try {
							wikiMod.onLoad = arg0;
						} catch(e) {}
						return;
						break;
					case "object":
						var isPlain = isPlainObject(arg0);
 
						// Is HTML constructor object
						if(isPlain && arg0.type && typeof arg0.type == "string"){
							try{
								return createNewElement(arg0);
							} catch(e) {}
						}
 
						//if(realType0 == "array"){
						//	
						//}
						break;
				}
			} else {
				switch(type0){
					case "string":
						if(
								types[1] == "function" &&
								wikiMod.Events.e.hasOwnProperty(arg0) &&
								length < 4 &&
								["boolean", "notdefined"].indexOf(type(2)) > -1
							)
						{
							return wikiMod.Events.addListener(arg0, args[1], (type(2) == "boolean" ? args[2] : true));
						}
						break;
				}
			}
 
		}
	};
	var wikiMod = WikiMod;
 
	wikiMod.displayName = wikiMod.name = "wikiMod";
 
	function isMediaWiki(obj){
		return (obj && obj.loader && obj.messages && obj.libs ? true : false);
	}
 
	var _isMonobook;
 
	Object.defineProperties(wikiMod, {
		isPrivileged: {
			value: (uw ? true : false),
			enumerable: true,
			configurable: false,
			writable: false
		},
		document: {
			get: function(){
				try {
					return (typeof document !== "undefined" ? document : (window.document || global || uw.document));
				} catch(e) {}
				return null;
			}
		},
		head: {
			get: function(){
				try {
					var doc = wikiMod.document;
					return doc.head || doc.getElementsByTagName('head')[0];
				} catch(e) {}
				return null;
			}
		},
		body: {
			get: function(){
				try {
					var doc = wikiMod.document;
					return doc.body || doc.getElementsByTagName('body')[0];
				} catch(e) {}
				return null;
			}
		},
		WikiaMainContent: {
			get: function(){
				return getWikiElement("#WikiaMainContent", "#wkMainCnt", true);
			}
		},
		WikiaPageHeader: {
			get: function(){
				return getWikiElement("#WikiaPageHeader", "#wkMainCntHdr", true);
			}
		},
		WikiaArticle: {
			get: function(){
				return getWikiElement("#WikiaArticle", null, true);
			}
		},
		jQueryAvailable: {
			get: function(){
				if(_jQueryAvailable || typeof $ !== _undefined)
					return (_jQueryAvailable = true);
 
				if(typeof jQuery !== _undefined)
					return ($ = jQuery, _jQueryAvailable = true);
 
				if(uw && typeof uw.jQuery !== _undefined)
					return ($ = uw.jQuery, _jQueryAvailable = true);
 
				return false;
			},
			set: function(val){
				_jQueryAvailable = (val?true:false);
				try{
					if(RealTypeOf(val) == "jQuery")
						$ = val;
				}catch(e){}
			},
			enumerable: false
		},
 
		jQuery: {
			get: function(){
				return (wikiMod.jQueryAvailable ? $ : undefined)
			},
			configurable: false
		},
 
		isMonobook: {
			get: function(){
				if(typeof _isMonobook == "boolean")
					return _isMonobook;
				var body = wikiMod.body;
				if(body) {
					try {
						var tmp = wikiMod.$('body.monobook');
						return (_isMonobook = (!tmp ? false : true));
					} catch(e) {}
				}
				return null;
			},
			enumerable: true
		},
 
		CSS: {
			get: function(){
				return _css;
			},
 
			set: function(value){
				_css += value;
				if(customCSSAdded){
					addStyle(_css);
					_css = '';
				}
			}
		},
 
		mw: {
			get: function(){
				var check__mw = function(){
					if(__mw && isMediaWiki(__mw)){
						if(wikiMod.Events && !wikiMod.onMediaWiki){try{wikiMod.Events.fire.apply(wikiMod.Events, ['onMediaWiki', {_this: global, args: __mw}]);}catch(e){}}
						return true;
					}
					return false;
				};
 
				if(check__mw()) return __mw;
 
				__mw = (global.mw || global.mediaWiki || window.mw || window.mediaWiki);
 
				if(check__mw()) return __mw;
 
				try {
					if(uw){
						__mw = (uw.mw || uw.mediaWiki);
						if(check__mw()) return __mw;
					}
				} catch(e) {}
 
				return (__mw = undefined);
			}
		}
	});
 
 
	var _getWikiElementCache = {};
	function getWikiElement(selector, monobookSelector, nojQuery, noCache){
		if(wikiMod.isMonobook && monobookSelector) {
			try {
				return ((!noCache && _getWikiElementCache[monobookSelector]) || (_getWikiElementCache[monobookSelector] = (wikiMod.$(monobookSelector, null, nojQuery) || null)));
			} catch(e) {return null;}
		}
 
		try {
			return ((!noCache && _getWikiElementCache[selector]) || (_getWikiElementCache[selector] = (wikiMod.$(selector, null, nojQuery) || null)));
		} catch(e) {}
 
		return null;
	}
 
	wikiMod.wg = function(name) {
		var out, i, keys, tKey, wgPatt = /^wg/, tWin = (uw ? uw : window);
		if(arguments.length == 0) {
			out = {};
			try {
				keys = Object.getOwnPropertyNames(tWin);
				for(i = 0; i < keys.length; i++) {
					tKey = keys[i];
					if(wgPatt.test(tKey)) {
						out[tKey] = tWin[tKey];
					}
				}
			} catch(e) {}
 
			return out;
		}
 
 
		if(out = (global[name] || window[name] || (uw ? uw[name] : undefined))) {
			return out;
		}
 
		if(wikiMod.mw && wikiMod.mw.config) {
			try {
				if(out = wikiMod.mw.config.get(name)) {
					return out;
				}
			} catch(e) {}
		}
 
		switch(i = name.toLowerCase()) {
			case "wgcdnrooturl":
				return "http://slot1.images2.wikia.nocookie.net";
				break;
			case "wgresourcebasepath":
				return "https://images.wikia.nocookie.net/common";
				break;
			case "wgextensionspath":
				return "https://images.wikia.nocookie.net/common/extensions";
				break;
		}
 
		return (global[i] || window[i] || (uw ? uw[i] : undefined));
	};
 
	wikiMod.addCSS = function(css){
		customCSSAdded = true;
		wikiMod.CSS = (css || "");
	};
 
	function mExportFunction(func, scope, args){
		if(typeof exportFunction !== _undefined){
			try{
				return exportFunction(func, scope, args);
			}catch(e){}
		}
		var name = '';
		if(args && args.defineAs)
			name = args.defineAs;
		else if(typeof func === "function" && func.name != '')
			name = func.name
		if(name && name.trim() != '') {
			try{return (scope[name] = func);}catch(e){}
		} else {
			return func;
		}
	}
	wikiMod.exportFunction = mExportFunction;
 
	function cloneErrorObject(eObj, scope){
		scope = scope || uw || global;
		var r,
			errRef = "Error", // Default error type is a generic "Error" object
			scopeRef = scope.Error && typeof scope.Error === "function" ? scope : (uw || global); // Check input scope for "Error" class. Otherwise, use unsafeWindow.
		if(!scopeRef) return;
 
		// Check if the input error has a name and if that name has a constructor in scopeRef.
		if(eObj.name && eObj.name != "Error" && typeof scopeRef[eObj.name] == "function"){
			errRef = eObj.name;
		}
 
		// Create the object and copy its properties.
		r = new scopeRef[errRef](eObj.message || null, eObj.fileName || null, eObj.lineNumber || null);
		r.name = eObj.name + "";
		r.stack = (eObj.stack || "") + "";
		r.message = eObj.message + "";
		r.fileName = typeof eObj.fileName != _undefined ? (eObj.fileName + "") : null;
		r.lineNumber = typeof eObj.lineNumber != _undefined ? parseInt(eObj.lineNumber) : null;
		r.columnNumber = typeof eObj.columnNumber != _undefined ? parseInt(eObj.columnNumber) : null;
 
		// Completely overwrite the toString function.
		delete r.toString;
		r.toString = function(){ return this.name + ': ' + this.message }.bind(r);
		return r;
	};
 
	function mCloneInto(obj, scope, args, debug, depth){
		if(typeof cloneInto !== _undefined){
			depth = depth || 0;
			try{
				// Should work 99% of the time, unless there is a scope-locked property like an error event object from a privileged userscript
				return cloneInto(obj, scope, args);
			}catch(e){
				if(debug){
					console.log('mCloneInto error', e);
				}
			}
			//
			// If it fails, copy it piece-by-piece excluding any properties that fail to copy cleanly.
			//
 
 
			var x, output,
				objType = typeof obj;
			try{
				// Some objects must be cloned specially
				if(objType == "object"){
					if(obj instanceof Error){
						objType = "error";
					} else if(obj.constructor === (new Array).constructor){
						objType = "array";
					} else if(obj === null){
						objType = "null";
					}
				}
			}catch(e){}
 
			var objFn = function(o) {
				var type = typeof o;
 
				// Copy strings, numbers, booleans, nulls and undefined objects normally
				if(type == "string" || type == "number" || type == "boolean" || type == _undefined || o === null){
					return o;
				} else if(o instanceof Error) {
					try {
						return cloneErrorObject(o, scope);
					} catch(e) {}
				} else if(type == "object") {
					if(depth < 3) {
						try{
							return mCloneInto(o, scope, args, debug, depth + 1);
						}catch(e){}
					}
					try {
						return cloneInto(o, scope, args);
					} catch(e) {}
 
				} else if(type == "function" && args.cloneFunctions) {
 
					try {
						return cloneInto(o, scope, args);
					} catch(e) {}
				}
			};
 
 
			if(objType == "undefined" || objType == "null"){
				return obj;
			} else if(objType == "error") {
				try{
					output = cloneErrorObject(obj, scope);
				}catch(e){}
			} else if(objType == "array") {
				output = cloneInto([], scope, args);
				for(x = 0; x < obj.length; x++){
					var tmpValue;
					try{
						tmpValue = objFn(obj[x]);
					}catch(e){}
					try{
						output.push(tmpValue);
					}catch(e){
						output.push(undefined);
					}
				}
			//} else if(objType == "function") {
				// to Do:
				// Create a new function (call it newFn) using the "Function"
				// constructor in the desired scope or the unsafeWindow.
				// Then export original function (obj) as newFn's constructor.
				// Copy all other properties normally the same as a normal object
				//
				// However, this mExportFunction should still be used instead of
				// directly cloning it.
				//
				// Does not depend on "args.cloneFunctions"
				// Only properties of 
			} else {
				output = cloneInto({}, scope, args);
				for(x in obj){
					if(x != "constructor" && Object.prototype.hasOwnProperty.call(obj, x)) {
						var tmpValue;
						try{
							tmpValue = objFn(obj[x]);
						}catch(e){}
						output[x] = tmpValue;
					}
				}
			}
			return output;
		} else {
			// Manually clone object
			// ToDo
		}
		// If everything fails, return the original object
		return obj;
	};
 
	wikiMod.cloneInto = mCloneInto;
 
	wikiMod.$ = function(selector, target, nojQuery){
		target = target || wikiMod.document;
 
		try{
			if(nojQuery !== true && wikiMod.jQueryAvailable){
				try{
					return $(selector, target).first()[0];
				}catch(e){}
			}
 
			if(typeof selector !== "string"){
				return;
			}
 
			return target.querySelector(selector);
 
		}catch(e){
			console.log('Error (wikiMod.Query):', e);
		}
	}
 
	wikiMod.$$ = function(selector, target, nojQuery){
		target = target || wikiMod.document;
		try{
			if(nojQuery !== true && wikiMod.jQueryAvailable){
				try{
					return $(selector, target).toArray();
				}catch(e){}
			}
 
			if(typeof selector !== "string"){
				return;
			}
 
			var tmp = target.querySelectorAll(selector);
			return (tmp?[].map.call(tmp, function(element) {return element;}):[]);
		}catch(e){
			console.log('Error (wikiMod.Query):', e);
		}
		return [];
	}
 
	var addEventListener = wikiMod.addEventListener = function(el, eventName, handler, useCapture) {
		if (el.addEventListener) {
			el.addEventListener(eventName, handler, useCapture ? true : false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + eventName, handler);
		} else {
			el['on' + eventName] = handler;
		}
	}
 
	var removeEventListener = wikiMod.removeEventListener = function(el, eventName, handler, useCapture) {
		if (el.removeEventListener) {
			el.removeEventListener(eventName, handler, useCapture ? true : false);
		} else if (el.detachEvent) {
			el.detachEvent('on' + eventName, handler);
		} else {
			el['on' + eventName] = null;
		}
	}
 
	var eventCancel = wikiMod.eventCancel = function(e){
		var win = window || (typeof unsafeWindow !== "undefined" ? unsafeWindow : null);
		if(!e){
			if(win.event)
				e = win.event;
			else
				return;
		}
		if(e.cancelBubble != null) e.cancelBubble = true;
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		if(win.event) e.returnValue = false;
		if(e.cancel != null) e.cancel = true;
	}
 
	// Taken from jMod
	var addStyle = wikiMod.addStyle = function(css){
		if(css) {
 
			var style,
				doc = wikiMod.document,
				head = wikiMod.head;
			if(head && doc) {
				style = doc.createElement('style');
				try {
					style.innerHTML = css + "";
				} catch (x) {
					style.innerText = css + "";
				}
				style.type = 'text/css';
				return head.appendChild(style);
			}
		}
	};
 
	var addStylesheet = wikiMod.addStylesheet = function(url){
		var style,
			head = wikiMod.head;
 
		if(head){
			style = wikiMod.document.createElement('link');
			style.setAttribute('rel', 'stylesheet');
			style.href = url;
			style.type = "text/css";
			return head.appendChild(style);
		}
	};
 
	wikiMod.contentEval = function(source) {
		// Check for function input.
		if ('function' == typeof source) {
			// Execute this function with no arguments, by adding parentheses.
			// One set around the function, required for valid syntax, and a
			// second empty set calls the surrounded function.
			source = '(' + source + ')();'
		}
		var doc = wikiMod.document,
			head = wikiMod.head,
			// Create a script node holding this source code.
			script = doc.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.textContent = source;
 
		// Insert the script node into the page, so it will run, and immediately
		// remove it to clean up.
		head.appendChild(script);
		head.removeChild(script);
	};
 
	function isValidURL(str) {
		// check for spaces or invalid characters, then check for syntax errors
		return (/[^\\\-_\.~\!\*\'\"\`\(\);\:\@\&\=\+\$\,\/\?\%\#\[\]\?0-9a-zA-Z]/.test(str) || !isURLPatt(str) ? false : true);
	}
 
	// Taken from jMod
	var addScript = wikiMod.addScript = function(js, src, id, type, async, defer, appendToBody) {
		var body, doc = wikiMod.document,
			target = wikiMod.head,
			jsType = typeof js,
			newScript = doc.createElement('script'),
			data = (jsType == "object" ? js : {
				js: js,
				src: src,
				id: id,
				type: type,
				async: async,
				defer: defer,
				appendToBody: appendToBody
			});
 
		if(data.appendToBody === true && (body = wikiMod.body)){
			target = body;
		}
 
		if(jsType == "string" && data.js && !data.src && isValidURL(js)) {
			data.src = js;
			data.js = undefined;
		}
 
		if(target) {
 
			if(data.id && typeof data.id === "string") {
				try{newScript.id = data.id;}catch(x){}
			}
 
			if(typeof data.async === "boolean") {
				newScript.setAttribute('async', data.async);
				newScript.async = data.async;
			}
 
			if(typeof data.defer === "boolean") {
				newScript.setAttribute('defer', data.defer);
				newScript.defer = data.defer;
			}
 
			if(data.onload != null) {
				newScript.onload = data.onload;
			}
 
			if(data.onerror != null) {
				newScript.onerror = data.onerror;
			}
 
			newScript.type = data.type || 'text/javascript';
 
			if(data.js && typeof data.js === "string") {
				try {
					newScript.innerHTML = data.js;
				} catch (x) {
					newScript.innerText = data.js;
				}
			}
 
			if(data.src && typeof data.src === "string") {
				try{newScript.src = data.src;}catch(x){}
			}
 
			try{return target.appendChild(newScript);}catch(x){console.log('Add Script Error!', x);}
		}
		return null;
	};
 
	wikiMod.importScriptPage = function(page, server) {
		var url = '/index.php?title=' + encodeURIComponent(page.replace(/\s/g, '_')).replace('%2F', '/').replace('%3A', ':') + '&action=raw&ctype=text/javascript';
		if(typeof server == "string") {
			if(server.indexOf('://') == -1) {
				url = 'http://' + server + '.wikia.com' + url;
			} else {
				url = server + url;
			}
		}
		return wikiMod.load(url, true);
	};
 
	wikiMod.importScriptURI = function(uri) {
		return wikiMod.load(uri, true);
	};
 
	wikiMod.importScript = function(page) {
		var _page, uri, _wgScript = uw && uw.wgScript ? uw.wgScript : (global.wgScript || window.wgScript || wikiMod.mw.config.get('wgScript'));
		try {
			_page = wikiMod.mw.util.wikiUrlencode(page);
		} catch(e) {
			_page = encodeURIComponent(page.replace(/\s/g, '_')).replace('%2F', '/').replace('%3A', ':');
		}
		uri = _wgScript + '?title=' + _page + '&action=raw&ctype=text/javascript';
		return wikiMod.load(uri, true);
	};
 
	if(!window.importScriptPage && !global.importScriptPage && (!uw || (uw && !uw.importScriptPage))) {
		if(uw){
			mExportFunction(wikiMod.importScriptPage, uw, {defineAs: "importScriptPage", allowCallbacks: true, allowCrossOriginArguments: true});
		} else {
			global.importScriptPage = window.importScriptPage = wikiMod.importScriptPage;
		}
	}
 
	if(!window.importScriptURI && !global.importScriptURI && (!uw || (uw && !uw.importScriptURI))) {
		if(uw){
			mExportFunction(wikiMod.importScriptURI, uw, {defineAs: "importScriptURI", allowCallbacks: true, allowCrossOriginArguments: true});
		} else {
			global.importScriptURI = window.importScriptURI = wikiMod.importScriptURI;
		}
	}
 
	if(!window.importScript && !global.importScript && (!uw || (uw && !uw.importScript))) {
		if(uw){
			mExportFunction(wikiMod.importScript, uw, {defineAs: "importScript", allowCallbacks: true, allowCrossOriginArguments: true});
		} else {
			global.importScript = window.importScript = wikiMod.importScript;
		}
	}
 
	var _prefetchList = {};
	wikiMod.prefetch = function(url) {
		if(_prefetchList[url])
			return _prefetchList[url];
		var link,
			head = wikiMod.head;
 
		if(head){
			link = wikiMod.document.createElement('link');
			link.setAttribute('rel', 'prefetch');
			link.href = url;
			return (_prefetchList[url] = head.appendChild(link));
		}
	};
 
	var isElement = wikiMod.isElement = function(obj) {
		try {
			return obj instanceof HTMLElement;
		} catch(e) {
			return (typeof obj==="object") &&
			(obj.nodeType===1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument ==="object");
		}
	};
 
	//function isWindow(obj){return (Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase() === "window");}
 
	var isWindow = wikiMod.isWindow = function(obj) {
		try {
			if (typeof((uw || window).constructor) === 'undefined') {
				return obj instanceof ((uw || window).constructor);
			}
		} catch(e) {}
 
		try {
			return (Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase() === "window");
		} catch(e) {}
 
		try {
			return obj.window === obj;
		} catch(e) {}
		return false;
	}
 
	var RealTypeOf = wikiMod.RealTypeOf = function(_obj){
		var obj;
		// Check if scope is locked
		try{
			if (_obj.constructor === ({}).constructor || _obj || _obj === null || Object.prototype.toString.call(_obj)) // Always true. Try to cause error with scoped obj
				obj = _obj;
		}catch(e){
			// Clone if scope is locked
			obj = mCloneInto(_obj, (uw || global || window), mCloneIntoDefaultArgs);
		}
		try{
			if(typeof(obj) === _undefined) return _undefined;
			if(typeof obj === "number" && isNaN(obj) == true) return "nan";
			if (typeof(obj) === "object") {
				if (obj === null) return "null";
				if (obj.constructor === ({}).constructor) return "map";
				if (obj.constructor === (new Array).constructor) return "array";
				if (obj.constructor === (new Date).constructor){
					if(isNaN(obj.getTime()))
						return "invaliddate";
					return "date";
				}
				if (obj.constructor === (new RegExp).constructor) return "regex";
				return Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase();
			}
		}catch(e){}
		try{
			if(typeof(obj) === "function"){
				if(obj.typeOfName && typeof obj.typeOfName === "string") return obj.typeOfName;
				if(obj.displayName && typeof obj.displayName === "string") return obj.displayName;
			}
		}catch(e){}
		return typeof(obj);
	}
 
	var isPlainObject = wikiMod.isPlainObject = function( obj ) {
		try{
			if ( typeof obj !== "object" || obj.nodeType || obj === obj.window ) {
				return false;
			}
			if ( obj.constructor && !obj.hasOwnProperty.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		}catch(e){
			var obj2 = mCloneInto(obj, (uw || global || window), mCloneIntoDefaultArgs);
			if ( typeof obj2 !== "object" || obj2.nodeType || obj2 === obj2.window ) {
				return false;
			}
 
			if ( obj2.constructor && !obj2.hasOwnProperty.call( obj2.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		}
		return true;
	};
 
	var isArray = wikiMod.isArray = function(obj){
		try{
			if (obj.constructor === (new Array).constructor) return true;
		}catch(e){
			var obj2 = mCloneInto(obj, unsafeWindow, mCloneIntoDefaultArgs);
			if (obj2.constructor === (new Array).constructor) return true;
		}
		return false;
	};
 
	var isEvent = wikiMod.isEvent = function(a){
		var patt = /^\[object |\]$/g;
		try{
			if(Object.prototype.toString.call(a).replace(patt,'').toLowerCase() == "event") return true;
		}catch(e){}
 
		try{
			if(a.constructor.toString().replace(patt,'').toLowerCase() == "event") return true;
		}catch(e){}
 
		return false;
	};
 
	wikiMod.hexToRgb = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: null
		} : null;
	};
 
	wikiMod.parseRGB = function(str){
		var r = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/mi.exec(str);
		return r ? {
			r: parseInt(r[1]),
			g: parseInt(r[2]),
			b: parseInt(r[3]),
			a: r[4] && r[4] != '' ? parseFloat(r[4]) : null
		} : null;
	}
 
	wikiMod.parseColorString = function(str){
		var r = wikiMod.parseRGB(str);
		return (r || wikiMod.hexToRgb(str));
	}
 
	wikiMod.getClientRect = function(el){
		try{
			var comp, r = wikiMod.extend({}, el.getBoundingClientRect());
 
			if (r.height == null || r.width == null) {
				comp = wikiMod.getComputedStyle(el);
				r.height = parseFloat(comp['height']);
				r.width = parseFloat(comp['width']);
			}
 
			return r;
		}catch(e){}
	};
 
	wikiMod.getDefaultComputedStyle = function(){
		var args = arguments,
			length = args.length,
			el = args[0],
			doc, win,
			pseudoEl = null,
			newEl;
 
		if(isWindow(el)){
			win = el;
			el = args[1];
		}
 
		if(length > 1 && typeof args[length - 1] == "string"){
			pseudoEl = args[length - 1];
		}
 
		if(!isElement(el)){
			throw new Error('Invalid Element!');
		}
 
		doc = win ? win.document : el.ownerDocument;
		win = win || doc.defaultView || el.defaultView || uw || window;
 
		if(win.getDefaultComputedStyle){
			return win.getDefaultComputedStyle(el, pseudoEl);
		} else {
			newEl = (doc || document).createElement(el.tagName);
			newEl.ClassName = el.className;
			try {
				return win.getComputedStyle(newEl, pseudoEl);
			} catch(e) {
				return (newEl.defaultView || uw || window).getComputedStyle(newEl, pseudoEl);
			}
		}
	};
 
	wikiMod.getComputedStyle = function(){
		var args = arguments,
			length = args.length,
			el = args[0],
			doc, win,
			pseudoEl = null,
			comp, i = 1;
 
		if(isWindow(el)){
			win = el;
			el = args[i++];
		}
 
		if(length > i && typeof args[i] == "string"){
			pseudoEl = args[i++] || null;
		}
 
		if(length > i && typeof args[i] == "object"){
			comp = args[i++];
		}
 
		if(!isElement(el)){
			throw new Error('Invalid Element!');
		}
 
		doc = win ? win.document : el.ownerDocument;
		win = win || doc.defaultView || el.defaultView || uw || window;
 
		comp = comp || win.getComputedStyle(el, pseudoEl);
 
		return comp;
	};
 
	function fireClick(el, bubbles, cancelable){
		var doc = wikiMod.document;
		if(wikiMod.jQueryAvailable){
			$(el).click();
		} else if(doc.createEvent) {
			var evt = doc.createEvent('MouseEvents');
			evt.initEvent('click', bubbles || true, cancelable || true);
			el.dispatchEvent(evt);	
		} else if(doc.createEventObject) {
			el.fireEvent('onclick');	
		} else if(typeof el.onclick == "function") {
			el.onclick();
		}
	};
 
 
	wikiMod.logFormatBuilder = function(){
		this.args = [];
 
		var addLine = function(value, type, style){
			var isUndef = _undefined===typeof value,
				origType = typeof type;
			if(typeof type === _undefined) type = typeof value;
			var fmtType;
			switch(type){
				case "d":
				case "%d":
					fmtType = "%d";
					break;
				case "i":
				case "%i":
					fmtType = "%i";
					break;
				case "f":
				case "%f":
					fmtType = "%.2f";
					break;
				case "number":
					if(parseInt(value) === value && value === +value){
						fmtType = "%d";
						value = parseInt(value);
					} else {
						fmtType = "%.2f";
						value = parseFloat(value);
					}
					break;
				case "s":
				case "%s":
					if(value == "\n" || value == " \n"){
						fmtType = " \n";
						value = undefined;
						style = undefined;
						isUndef = false;
					} else
						fmtType = "%s";
					break;
				case "string":
					fmtType = value;
					value = undefined;
					isUndef = false;
					break;
				case "o":
				case "%o":
					fmtType = "%o";
					break;
				case "object":
				default:
					if(origType==_undefined && _undefined==typeof style)
						fmtType = "";
					else
						fmtType = "%o";
					break;
			}
 
			this.args.push({
				valueIsUndefined: isUndef,
				value: value,
				fmtString: fmtType,
				style: style
			});
		}
 
		this.add = function(){
			var i = 0, var0 = arguments[0];
			if(arguments.length == 1 && RealTypeOf(var0) == "array"){
				for(i; i < var0.length; i++){
					addLine.apply(this, var0[i]);
				}
			} else {
				addLine.apply(this, Slice.call(arguments));
			}
		}
 
		this.build = function(){
			var fmtString = '';
 
			var arr = [];
 
			for(var i = 0; i < this.args.length; i++){
				fmtString += (typeof this.args[i].style !== "undefined" ? '%c' : '') + this.args[i].fmtString;
				if(typeof this.args[i].style !== "undefined")
					arr.push(this.args[i].style != "" ? this.args[i].style : " ");
 
				if(typeof this.args[i].value !== "undefined" || this.args[i].valueIsUndefined)
					arr.push(this.args[i].value);
			}
 
			return [fmtString].concat(arr);
		}
 
		if(arguments.length > 0)
			this.add.apply(this, arguments);
	};
 
	var URLBuilder = wikiMod.URLBuilder = function(input){
		var _this = this;
		_this.protocol = 'http:';
		_this.hostname = '';
		_this.pathname = '';
		_this.args = [];
		_this.setHostname = function(str){
			try{
				if(typeof str === "string"){
					var parser = document.createElement('a');
					if(!(/^\s*(?:https?\:)?\/\//i.test(str)))
						str = 'http://' + str;
					parser.href = str;
 
					_this.hostname = parser.hostname;
					_this.protocol = parser.protocol;
				}
			}catch(e){
			}finally{
				return _this;
			}
		}
		_this.setPath = function(str){
			if(str[0] != '/') str = '/' + str;
			_this.pathname = str;
			return _this;
		}
		_this.addArg = function(key, value){
			_this.args.push({name: key, value: value});
			return _this;
		}
		_this.addArgs = function(args){
			for(var i = 0; i < args.length; i++){
				switch(RealTypeOf(args[i])){
					case "array":
						_this.addArg(args[i][0], args[i][1]);
						break;
					case "map":
					case "object":
						var tmpName = getFirstValidKeyValue(args[i], ['name', 'key']);
						var tmpValue = getFirstValidKeyValue(args[i], ['value']);
						if(tmpName && tmpValue)
							_this.addArg(tmpName, tmpValue);
						break;
				}
			}
			return _this;
		}
		_this.buildArgs = function(){
			var argStr = '';
			var argsArr = [];
			for(var i = 0; i < _this.args.length; i++){
				argsArr.push(_this.args[i].name + '=' + _this.args[i].value);
			}
			return argsArr.join('&');
		}
		_this.toString = function(){
			return _this.protocol + '//' + _this.hostname + _this.pathname + '?' + _this.buildArgs();
		}
		_this.setHostname(input);
	};
 
	+(function(){
		var defaultTitle = "WikiMod";
		var defaultIconURL = 'https://vignette.wikia.nocookie.net/deadisland/images/6/64/Favicon.ico/revision/latest?cb=20110217195632',
			defaultIconStyle = ''
				+'font-size:1.75em;'
				+'background-color: transparent;'
				//+'background-image:url("https://vignette.wikia.nocookie.net/deadisland/images/6/64/Favicon.ico/revision/latest?cb=20110217195632");'
				+'background-clip: border-box;'
				+'background-position:left center;'
				+'background-size:auto 75%;'
				+'background-repeat: no-repeat;'
				+'letter-spacing: 20px;'
				+'white-space: pre;'
				+'display: run-in;',
			SansationFontFamily = 'font-family:"Sansation","Open Sans",Arial;',
			headerFontStyle = 'font-size:175%;font-weight:300;' + SansationFontFamily,
			_defaultStyle = 'display: run-in;',
			defaultHeaderStyle = headerFontStyle,
			defaultTitleStyle = 'color:#000;font-size:125%;',
			defaultTextStyle = 'font-weight:bold;font-size:120%;color:000;';
 
			var infoDefaultTextStyle = 'font-weight:bold;font-size:120%;color:blue;';
 
		wikiMod.logger = function(loggerData){
			// Normal
			var loggerTitle = (loggerData.title || defaultTitle),
				defaultStyle = (loggerData.defaultStyle || _defaultStyle),
				iconURL = (loggerData.iconURL || defaultIconURL),
				iconStyle = (loggerData.iconStyle || defaultIconStyle) + 'background-image:url("' + iconURL + '");',
				headerStyle = (loggerData.headerStyle || defaultHeaderStyle),
				titleStyle = (loggerData.titleStyle || defaultTitleStyle),
				textStyle = (loggerData.textStyle || defaultTextStyle);
 
			// Info
			var infoDefaultStyle = (loggerData.infoDefaultStyle || _defaultStyle),
				infoHeaderStyle = (loggerData.infoHeaderStyle || defaultHeaderStyle),
				infoTitleStyle = (loggerData.infoTitleStyle || defaultTitleStyle),
				infoTextStyle = (loggerData.infoTextStyle || infoDefaultTextStyle);
 
			this.log = function(title, text){
				//if(jMod.log.OUTPUT_TYPES.LOG.level > jConfig('API.log.verbosity_level'))
					//return;
 
				var i = 2,
					fmtBuild = new wikiMod.logFormatBuilder([
						['  ', "%s", defaultStyle + iconStyle],
						[loggerTitle + "", "string", defaultStyle + headerStyle]
					]);
 
				if(_undefined!==typeof text){
					fmtBuild.add([
						[' - ', "string", defaultStyle],
						[title || ' ', "%s", defaultStyle + titleStyle],
						[" \n", "string"],
						[text || '', "%s", defaultStyle + textStyle]
					]);
				} else {
					fmtBuild.add([
						[" \n", "string"],
						[title || '', "%s", defaultStyle + textStyle]
					]);
				}
 
				if(arguments.length > 2)
					fmtBuild.add(" \n", "string");
 
				for(i; i < arguments.length; i++){
					fmtBuild.add(arguments[i]);
				}
 
				//jMod.Log.apply(jMod.log,fmtBuild.build());
 
				var args = fmtBuild.build();
				try {
					console.log.apply(console, args);
				} catch(e) {
					try {
						var safeArgs = mCloneInto(args, (uw || console || global || window), mCloneIntoDefaultArgs);
						console.log.apply(console, safeArgs);
					} catch(e) {}
				}
			};
 
 
 
			this.info = function(title, text){
				//if(jMod.log.OUTPUT_TYPES.INFO.level > jConfig('API.log.verbosity_level'))
					//return;
				var i = 2,
					fmtBuild = new wikiMod.logFormatBuilder([
						['  ', "%s", infoDefaultStyle + iconStyle],
						[loggerTitle + "", "string", infoDefaultStyle + infoHeaderStyle]
					]);
 
				if(_undefined!==typeof text){
					fmtBuild.add([
						[' - ', "string", infoDefaultStyle],
						[title || ' ', "%s", infoDefaultStyle + infoTitleStyle],
						[" \n", "string"],
						[text || '', "%s", infoDefaultStyle + infoTextStyle]
					]);
				} else {
					fmtBuild.add([
						[" \n", "string"],
						[title || '', "%s", infoDefaultStyle + infoTextStyle]
					]);
				}
 
				if(arguments.length > 2)
					fmtBuild.add(" \n", "string");
 
				for(i; i < arguments.length; i++){
					fmtBuild.add(arguments[i]);
				}
 
				//jMod.Info.apply(jMod.log,fmtBuild.build());
				var args = fmtBuild.build();
				try {
					console.info.apply(console, args);
				} catch(e) {
					try {
						var safeArgs = mCloneInto(args, (uw || console || global || window), mCloneIntoDefaultArgs);
						console.info.apply(console, safeArgs);
					} catch(e) {}
				}
			};
 
		};
 
	})();
	
	// ==UserScript==
// @name        Wikia TabView Edit Buttons
// @description Adds edit buttons to active tabs created by the TabView extension
// @namespace   jgjake2
// @include     http://deadisland.wikia.com/wiki/User:Jgjake2
// @include     http://deadisland.wikia.com/wiki/User:Jgjake2/Sandbox
// @include     http://leonhartopedia.wikia.com/wiki/Bloom
// @include     /^https?:\/\/deadisland\.wikia\.com\/wiki\/User:Jgjake2\/Sandbox(?:\?.*?|\#.*?)?$/
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require     http://deadisland.wikia.com/index.php?title=User:Jgjake2/js/wikiMod.js&action=raw&ctype=text/javascript
// @version     1
// @grant       unsafeWindow
// @run-at      document-end
// ==/UserScript==
 
// Can run as a UserScript (for dev/testing) or as a standalone site extension
+function(global){
	function isWindow(obj){return (Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase() === "window");}
 
	var _undefined = "undefined",
		uw = typeof unsafeWindow !== _undefined && isWindow(unsafeWindow) ? unsafeWindow : null;
 
	if(uw){
		uw.TABVIEW_EDIT_BUTTONS_DISABLE = (window || global).TABVIEW_EDIT_BUTTONS_DISABLE = true;
		uw.MobileDeviceJSLoader = (window || global).MobileDeviceJSLoader = true;
	}
 
	var TVEB_init = function($, wikiMod) {
		if(!$) {
			console.log("Error! No jQuery!!");
			return;
		}
 
		if(!wikiMod){
			console.log("Error! No wikiMod!!");
			return;
		}
		/*
		console.log('unsafeWindow', unsafeWindow);
		console.log('window', window);
		console.log('global', this);
		console.log('$', $);
		*/
 
		var wikiMainContent, $wikiMainContent, observer, isObserving,
			baseExtensionLoaded = false,
			mutationClassPatt = /(?:[^\w]|^)(tabBody|tabs|editable-tabs|WikiaArticle)(?:[^\w]|$)/ig,
			observerTryTimeout = 100, observerTryMax = 25,
			customCSS, doc,
			isChecking = 0,
			customCSSAdded = false;
			isFirefox = false,
			isChrome = false,
			observerConfig = {
				attributes: true,
				childList: true,
				subtree: true,
				attributeFilter: ["data-tab-body"]
			},
		// Default Settings
		settings = {
			afterscriptexecute: true, // Exec on afterscriptexecute event
			DOMContentLoaded: true, // Exec on DOMContentLoaded event
			watch_mutation: true, // Exec on mutation events
			init_timeout: 1000, // Timeout before initial tab check. (disable with -1)
			fixMobileView: 2, // 0 = disable | 1 = Only when adding edit button | 2 = always fix when TabView element is detected
			color: {
				link: '#51956a'
			},
			edit: {
				text: 'Edit',
				title: 'Edit Page'
			},
			vde: {
				view_title: 'View this page',
				view_text: 'v',
				discuss_title: 'Discuss this page',
				discuss_text: 'd',
				edit_title: 'Edit this page',
				edit_text: 'e'
			}
		};
 
		var wikiLogger = new wikiMod.logger({
			iconURL: 'https://vignette.wikia.nocookie.net/deadisland/images/6/64/Favicon.ico/revision/latest',
			title: 'TabView Edit Button (Dead Island)'
		});
 
		if((window.TABVIEW_EDIT_BUTTONS_DISABLE || global.TABVIEW_EDIT_BUTTONS_DISABLE) === true && !uw){
			return;
		}
 
		(window || global).TABVIEW_EDIT_BUTTONS_DISABLE = true;
		if(uw){
			uw.TABVIEW_EDIT_BUTTONS_DISABLE = true;
		}
 
		// Disable script running on wikia if running a userscript (dev)
 
 
		try {
			doc = (typeof document !== _undefined ? document : (window.document || global.document || uw ? uw.document : null));
		} catch(e) {
			return;
		}
 
		try {
			isFirefox = (typeof navigator != _undefined ? navigator : (window.navigator || uw.navigator)).userAgent.toLowerCase().indexOf('firefox') > -1;
		} catch(e) {}
 
		try {
			isChrome = (typeof navigator != _undefined ? navigator : (window.navigator || uq.navigator)).userAgent.toLowerCase().indexOf('chrome') > -1;
		} catch(e) {}
 
 
		if(typeof TABVIEW_EDIT_BUTTONS !== _undefined){
			settings = $.extend(true, settings, TABVIEW_EDIT_BUTTONS);
		}
 
		function getWikiMainContent(){
			if($wikiMainContent && wikiMainContent && $wikiMainContent.length > 0){
				return $wikiMainContent;
			}
			$wikiMainContent = $('#WikiaMainContent', wikiMod.document);
			if(!$wikiMainContent || $wikiMainContent.length == 0){
				$wikiMainContent = $('#wkMainCnt', wikiMod.document);
			}
 
			try {
				wikiMainContent = $wikiMainContent[0];
			} catch(e) {
				wikiMainContent = null;
			}
			return ($wikiMainContent && $wikiMainContent.length > 0 ? $wikiMainContent : null);
		}
 
		function createObserver(){
			if(observer != null){
				return observer;
			}
 
			getWikiMainContent();
 
			if(wikiMainContent) {
				observer = new MutationObserver(function(mutations) {
					for(var x = 0; x < mutations.length; x++){
						var mutation = mutations[x].target;
						if(mutationClassPatt.test(mutation.className)){
							checkTabViews($wikiMainContent || null);
						}
					}
				});
				return observer;
				//observer.observe(wikiMainContent, observerConfig);
			}
			return null;
		}
 
		function wikiPageExists(pageTitle, onTrue, onFalse){
			var url = wgServer + '/api.php?action=query&prop=info|revisions&inprop=created&titles=' + page + '&format=json&rvprop=timestamp&rvlimit=1';
		}
 
		function genEditButton(url, callback, text, title) {
			text = text || "Edit";
			title = title || "";
 
			var newUrl = url.split("?")[0];
			newUrl += '?action=edit';
 
			var editBtn = {
				type: 'span',
				className: 'extendtabtitle edittabsection',
				innerHTML: {
					type: 'a',
					className: 'notabstyle',
					attributes: {
						href: newUrl,
						title: title || settings.edit.title
					},
					innerHTML: [
						{
							type: 'span',
							className: 'sprite edit-pencil'
						},
						(text || settings.edit.text)
					],
					EventListeners: {
						click: callback,
						touchstart: callback
					}
				}
			};
 
			return editBtn;
		}
 
		var talkNamespaces = [
			{
				regex: /\/wiki\/Template\:/,
				replace: '/wiki/Template_talk:'
			},
			{
				regex: /\/wiki\/User\:/,
				replace: '/wiki/User_talk:'
			},
			{
				regex: /\/wiki\/File\:/,
				replace: '/wiki/File_talk:'
			},
			{
				regex: /\/wiki\/Talk\:/,
				replace: '/wiki/Talk:'
			},
			{
				regex: /\/wiki\//,
				replace: '/wiki/Talk:'
			}
		];
		function genVDE(url, callback, view_title, discuss_title, edit_title) {
			var i = 0,
				baseURL = url.split("?")[0],
				viewURL = baseURL + '',
				discussURL = baseURL + '',
				editURL = baseURL + '?action=edit';
 
			for( ; i < talkNamespaces.length; i++){
				if(talkNamespaces[i].regex.test(discussURL)){
					discussURL = discussURL.replace(talkNamespaces[i].regex, talkNamespaces[i].replace);
					break;
				}
			}
 
			var vdeStyle = 'padding-left:1.2em; padding-right:1.2em;;padding-left:0.0em; padding-right:0.0em;background:none transparent;';
 
			var dot = {
				type: 'span',
				style: 'padding-left:1.2em; padding-right:1.2em;;padding-left:0.0em; padding-right:0.0em;;background:none transparent;border:none;font-size:100%;vertical-align: sub;cursor: default;',
				innerHTML: {
					type: 'b',
					innerHTML: '&#183;'
				}
			};
 
			var vdeEl = {
				type: 'span',
				className: 'extendtabtitle vdesection',
				style: 'white-space:nowrap;word-spacing:-.22em;',
				innerHTML: [
					{
						type: 'a',
						className: 'notabstyle',
						attributes: {
							href: viewURL
						},
						innerHTML: {
							type: 'span',
							style: vdeStyle,
							attributes: {
								title: (view_title || settings.vde.view_title)
							},
							innerHTML: settings.vde.view_text
						},
						EventListeners: {
							click: {
								callback: callback
							}
						}
					},
					dot,
					{
						type: 'a',
						className: 'notabstyle',
						attributes: {
							href: discussURL
						},
						innerHTML: {
							type: 'span',
							style: vdeStyle,
							attributes: {
								title: (discuss_title || settings.vde.discuss_title)
							},
							innerHTML: settings.vde.discuss_text
						},
						EventListeners: {
							click: {
								callback: callback
							}
						}
					},
					dot,
					{
						type: 'a',
						className: 'notabstyle',
						attributes: {
							href: editURL
						},
						innerHTML: {
							type: 'span',
							style: vdeStyle,
							attributes: {
								title: (edit_title || settings.vde.edit_title)
							},
							innerHTML: settings.vde.edit_text
						},
						EventListeners: {
							click: {
								callback: callback
							}
						}
					}
				]
			}
			return vdeEl;
		}
 
		var __editableUlTabs = '.editable-tabs > div[id^="flytabs"]:first-of-type > ul.tabs';
 
		customCSS = ''
				+''+__editableUlTabs+' > li.selected > a {'
					+'cursor: default;'
				+'}'
				+''+__editableUlTabs+' > li.selected .extendtabtitle {'
					+'display: inline-block;'
					+'height: 16px !important;'
					+'line-height: 16px !important;'
				+'}'
				+''+__editableUlTabs+' > li:not(.selected) .extendtabtitle {'
					+'display: none;'
				+'}'
				+'.editable-tabs .notabstyle {'
					+'border 0 none !important;'
					+'border-width: 0 !important;'
					+'border-style: none !important;'
					+'cursor: pointer;'
					+'display: inline-block;'
					+'font-size: 14px;'
					+'line-height: 23px;'
					+'padding: 0px !important;'
					+'top: auto;'
					+'position: relative;'
				+'}'
				+'.editable-tabs .extendtabtitle {'
					+'margin-left: 10px;'
				+'}'
				+'.editable-tabs .extendtabtitle.vdesection a, .editable-tabs .extendtabtitle.vdesection span, .editable-tabs .extendtabtitle.vdesection b {'
					+'font-style:normal;'
					+'font-weight:400;'
					+'font-size: 0.85em;'
					+'text-decoration: none;'
				+'}'
				+'.editable-tabs .extendtabtitle.vdesection a, .editable-tabs .extendtabtitle.vdesection a > span {'
					+'color: '+settings.color.link+';'
					+'cursor: pointer;'
				+'}'
				+''+__editableUlTabs+' > li.selected .extendtabtitle.edittabsection > a {'
					+'font-style:normal;'
					+'font-weight:400;'
					+'color: '+settings.color.link+';'
				+'}'
				+''+__editableUlTabs+' > li.selected .extendtabtitle.edittabsection > a:hover {'
					+'font-style:normal;'
					+'font-weight:400;'
					+'color: '+settings.color.link+';'
					+'text-decoration: underline;'
					+'cursor: pointer;'
				+'}'
				+''+__editableUlTabs+' > li.selected .extendtabtitle.edittabsection .sprite {'
					+'display: inline-block;'
					+'vertical-align: text-top;'
					+'margin-right: 1px;'
				+'}'
			;
 
 
		//
		// Fix mobile wiki tabs!!!
		// TabView is not loaded on mobile devices. This completely breaks any page using TabView considering it chooses to link
		// directly to the render page. Thus any user following this link on a mobile device will only see the rendered html of
		// that page.
		//
		// This is an awful bug and needs to be addressed, otherwise the TabView extension is useless.
		//
		function fixMobileDevice($ctx){
			if(!$ctx || $ctx.length == 0) {
				$ctx = getWikiMainContent();
			}
			if(!baseExtensionLoaded){
				var tmp = $('script[src$="/extensions/wikia/TabView/js/TabView.js"]', wikiMod.document);
				if(!tmp || tmp.length == 0){
					if(!wikiMod.mw){
						wikiMod.load("mediawiki");
					}
 
					//var _wgResourceBasePath = wikiMod.wg("wgResourceBasePath");// typeof wgResourceBasePath !== "undefined" ? wgResourceBasePath : (window.wgResourceBasePath || uw.wgResourceBasePath);
 
					wikiMod.CSS = ''
						+'ul.tabs,ol.tabs{margin:0}'
						+'.tabs{'
							+'zoom:1;'
							+'border-bottom:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
							+'overflow:visible;'
							+'padding-left:5px;'
						+'}'
						+'.tabs:after{'
							+'clear:both;'
							+'content:" ";'
							+'display:block;'
							+'height:0;'
							+'overflow:hidden;'
							+'visibility:hidden;'
						+'}'
						+'.tabs li{'
							+'float:left;'
							+'list-style:none;'
							+'margin:0 1px;'
							+'padding:0;'
							+'position:relative;'
						+'}'
						+'.tabs li a{'
							+'border:1px solid transparent;'
							+'border-top-left-radius:4px;'
							+'border-top-right-radius:4px;'
							+'cursor:pointer;'
							+'display:inline-block;'
							+'font-size:14px;'
							+'line-height:23px;'
							+'padding:6px 12px 3px;'
							+'position:relative;'
							+'top:1px;'
						+'}'
						+'.tabs li .chevron{display:none}'
						+'.tabs .selected a{'
							+'border-bottom:1px solid transparent;'
							+'border-left:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
							+'border-right:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
							+'border-top:1px solid #4c4c4c;' // To Do: Dynamic color based on setting or computed style of page
							+'background:#202020;' // To Do: Dynamic color based on setting or computed style of page
							+'color:#d5d4d4;'
							+'cursor:text;'
							+'font-weight:bold;'
							+'text-decoration:none;'
						+'}'
						+'.tabs .selected a:hover{padding-bottom:3px}'
						+'.tabs .accent{background-color:transparent}'
						+'.tabs .disabled a{color:#8f8f8f;pointer-events:none}' // To Do: Dynamic color based on setting or computed style of page
						+''
						+'.tabBody{display: none;}'
						+'.tabBody.selected{display:block;}'
						+'.sprite.edit-pencil {'
							+'background-position: -1000px -48px;'
							+'height: 16px;'
							+'width: 16px;'
							+'background-color: transparent;'
							+'background-image: url("'+wikiMod.wg("wgResourceBasePath")+'/skins/shared/images/sprite.png");'
							+'background-repeat: no-repeat;'
						+'}'
					;
 
					baseExtensionLoaded = true;
 
					$.ajax({
						url: "http://deadisland.wikia.com/extensions/wikia/TabView/js/TabView.js",
						type: "GET",
						crossDomain: true,
						cache: true,
						dataType: "text",
						success: function( data ) {
							var newScript = "+(function(){"
									+"var stylepath = wgCdnApiUrl + \"/common/skins\";"
									+"if(!$.fn.startThrobbing){$.fn.startThrobbing=function(){return this.append('<div class=\"wikiaThrobber\"></div>')};}"
									+"if(!$.fn.stopThrobbing){$.fn.stopThrobbing=function(){this.find(\".wikiaThrobber\").remove();return this};}"
									+"if(!$.fn.preloadThrobber){$.preloadThrobber=function(){var img=new Image();img.src=stylepath+\"/common/images/ajax.gif\"};}"
									+"if(!$.createClass){$.createClass=function(sc,o){var constructor=o.constructor;if(typeof constructor!==\"function\"||constructor==Object.prototype.constructor){constructor=function(){sc.apply(this,arguments)}}var bc=constructor;var f=function(){};f.prototype=sc.prototype||{};bc.prototype=new f();if(typeof o.statics==\"object\"){bc=$.extend(bc,o.statics);delete o.statics}for(var m in o){bc.prototype[m]=o[m]}bc.prototype.constructor=bc;bc.superclass=sc.prototype;return bc;};}"
									+data
									+"window.TabView = {init: function (options) {return new TabViewClass(options);}};" // Actually return the new TabView Object
								+"})();";
							//wikiMod.addScript(newScript, undefined, "_TabViewExt");
							(uw || window).eval(newScript);
							setTimeout(function(){
								var $tabsToInit = $ctx.find('div[id^="flytabs_"]:not([id$="-content-wrapper"])');
								$tabsToInit.each(function(index) {
									var $tmpTab = $(this);
									var tmpTab = $tmpTab[0];
									var $liLinks = $tmpTab.find('li > a:first-of-type');
									$liLinks.each(function(){
										wikiMod.addEventListener($(this)[0], "click", function(e){
											tmpTab._TabView(this);
										}, true);
									});
 
									var options = {id: $tmpTab.attr("id"), selected: 0};
 
									var tabViewInstance = (uw || window).TabView.init(typeof cloneInto !== "undefined" ? cloneInto(options, uw || window, {cloneFunctions: true, wrapReflectors: true}) : options);
									var onLinkClick = function(target){
										var $target = $(target);
										var $parent = $target.parent();
										var $tabBody = $('[data-tab-body="'+$parent.attr("data-tab")+'"]');
										$parent.siblings("li").removeClass("selected");
										$tabBody.siblings(".tabBody").removeClass("selected");
										$parent.addClass("selected");
										$tabBody.addClass("selected");
 
										try {
											tabViewInstance.loadContent(typeof cloneInto !== "undefined" ? cloneInto($target, uw || window, {cloneFunctions: true, wrapReflectors: true}) : $target);
										} catch(e) {}
										setTimeout(initTabberTabs, 200);
										setTimeout(initTabberTabs, 800);
									};
									tmpTab._TabView = typeof exportFunction !== "undefined" && typeof unsafeWindow !== "undefined" ? exportFunction(onLinkClick, unsafeWindow, {
											allowCallbacks: true,
											allowCrossOriginArguments: true
										}) : onLinkClick;
 
									setTimeout(function(){
										try {
											uw.JSSnippets.init();
										} catch(e) {
											try {
												window.JSSnippets.init();
											} catch(a) {}
										}
									}, 0);
								});
 
								setTimeout(function(){
									isChecking = 0;
									checkTabViews();
								}, 25);
							}, 0);
 
						},
						error: function(xhr, txt, e){
							console.log(xhr, txt, e);
						}
					});
 
 
				}
			}
		}
 
 
		function checkTabViews($ctx) {
			isChecking++;
 
			if(isChecking > 1) {
				return;
			}
 
			if(!$ctx || $ctx.length == 0){ // || $ctx.type == "DOMAttrModified")
				$ctx = getWikiMainContent();
			}
 
			if(!$ctx || $ctx.length == 0) {
				isChecking = 0;
				return;
			}
 
			try {
				var $editableTabs = $ctx.find('.editable-tabs > div[id^="flytabs"]:first-of-type');
 
				if(!baseExtensionLoaded) {
					var tmp = $('script[src$="/extensions/wikia/TabView/js/TabView.js"]', wikiMod.document);
					if(!tmp || tmp.length == 0){
						var $allTabs = $ctx.find('div[id^="flytabs_"] > ul.tabs');
						if(settings.fixMobileView > 0 &&
							(($editableTabs && $editableTabs.length > 0) ||
							($allTabs && $allTabs.length > 0 && settings.fixMobileView >= 2))
						) {
							fixMobileDevice($ctx);
						} else {
							isChecking = 0;
						}
						return;
					}
				}
 
 
				if($editableTabs) {
 
					if(!customCSSAdded) {
						customCSSAdded = true;
						//wikiMod.CSS = customCSS;
						wikiMod.addCSS(customCSS);
					}
					$editableTabs.each(function(index) {
						var $this = $(this);
						var $tabList = $this.find('.tabs > li:not([data-edit-btn-added])');
						if($tabList && $tabList.length > 0) {
							$tabList.each(function(i) {
								var $tab = $(this);
								$tab.attr('data-edit-btn-added', 'true');
								var $link = $tab.children('a').first();
								var href = $link.attr('href');
 
								if($this.parent().hasClass('vde')){
									var linkCallback = function(e){
										wikiMod.eventCancel(e);
										var linkhref = this.href || $clickedLink.attr('href');
										window.location.href = linkhref;
									}
									var newVDEArgs = genVDE(href, linkCallback);
 
									var newVDE = wikiMod.createNewElement(newVDEArgs);
									$link.append(newVDE);
								} else {
									var linkCallback = function(e){
										var touch, linkhref = this.href || $clickedLink.attr('href');
										try{
											touch = e.touches[0];
										} catch(e) {}
 
										if(touch && e.type == "touchstart"){
											console.log('touchstart', e);
											var _timeoutCTX,
												willTriggerClick = true,
												touchEndHandle = function(e2){
													if(_timeoutCTX)
														clearTimeout(_timeoutCTX);
 
													wikiMod.removeEventListener(e.target, 'touchend', touchEndHandle);
													wikiMod.removeEventListener(e.target, 'touchcancel', cancelFunction);
 
													try {
														wikiMod.eventCancel(e2);
													} catch(e) {}
 
													try {
														wikiMod.eventCancel(e);
													} catch(e) {}
 
 
													if(willTriggerClick){
														window.location.href = linkhref;
													}
												};
 
 
											var cancelFunction = function(e_cancel){
												_timeoutCTX = null;
												willTriggerClick = false;
												wikiMod.removeEventListener(e.target, 'touchend', touchEndHandle);
												wikiMod.removeEventListener(e.target, 'touchcancel', cancelFunction);
											};
 
											wikiMod.addEventListener(e.target, 'touchend', touchEndHandle);
											wikiMod.addEventListener(e.target, 'touchcancel', cancelFunction);
											_timeoutCTX = setTimeout(cancelFunction, 1000);
										} else {
											wikiMod.eventCancel(e);
											window.location.href = linkhref;
										}
									}
									var newButtonArgs = genEditButton(href, linkCallback);
 
									var newButton = wikiMod.createNewElement(newButtonArgs);
 
									$link.append(newButton);
								}
							});
						}
 
					});
 
				}
			} catch(e) {
				console.log("Error!", e);
			}
 
			// If a lot of check attempts were made (because of mutation events), then check again after a timeout
			if(isChecking > 3) {
				setTimeout(checkTabViews, 1);
			}
			isChecking = 0;
		}
 
		var TabViewScriptPatt = /TabView\/js\/TabView\.js$/i;
 
		if(settings.afterscriptexecute) {
			// Check for tabs after the TabView script executes
			try {
				wikiMod.addEventListener(window, isFirefox ? 'afterscriptexecute' : 'beforescriptexecute', function(e){
					if(TabViewScriptPatt.test(e.target.src)) {
						setTimeout(checkTabViews, isFirefox ? 0 : 100);
					}
				}, false);
			} catch(e) {}
		}
		if(settings.DOMContentLoaded){
			// Check for tabs after the DOM loads
			try {
				wikiMod.addEventListener(window, 'DOMContentLoaded', function(e){
					setTimeout(checkTabViews, 0);
				}, false);
			} catch(e) {}
		}
 
		function startObserving(count) {
			count = count || 1;
			if(isObserving || count > observerTryMax) {
				return;
			}
 
			if(!observer) {
				createObserver();
			}
 
			if(observer) {
				try {
					observer.observe(wikiMainContent, observerConfig);
					isObserving = true;
				} catch(e) {}
			} else {
				//setTimeout(startObserving, observerTryTimeout, count + 1); // Params for callback not supported in old IE
				setTimeout(function(_count) {
					startObserving((_count || count) + 1);
				}, observerTryTimeout, count);
			}
		}
 
		$(doc || document).ready(function(){
			// Detect when TabView script changes attributes of its elements
			if(settings.watch_mutation) {
				startObserving();
			}
 
			if(typeof settings.init_timeout == "number" && settings.init_timeout > -1) {
				// Manually check after a timeout
				setTimeout(checkTabViews, settings.init_timeout);
			}
		});
 
		function initTabberTabs(){
			var tbFn = "tabberAutomaticOnLoad";
			try {
				(uw && uw[tbFn] ? uw[tbFn] : (global[tbFn] || window[tbFn]))();
			} catch(e) {}
		}
 
		if(!wikiMod.$('script[src*="tabber/tabber.js"]')){
			wikiMod.addStylesheet('https://images.wikia.nocookie.net/extensions/3rdparty/tabber/tabber.css');
			wikiMod.addScript(undefined, 'https://images.wikia.nocookie.net/extensions/3rdparty/tabber/tabber.js');
		}
 
		function onLoadFn(){
			// Fix Tabber Also
			var loadjQueryUIFn = ($.loadJQueryUI || (uw && uw.jQuery ? uw.jQuery.loadJQueryUI : null));
 
			try{loadjQueryUIFn();}catch(e){
				wikiMod.load('jqueryloaders');
				wikiMod.load('jqueryui');
			}
 
			setTimeout(initTabberTabs, 800);
			checkTabViews();
		}
 
		var isInit = false;
		function init(){
			if(!isInit){
				isInit = true;
				onLoadFn();
			}
		}
 
		try {
			wikiMod.onLoad = init;
		} catch(e) {
			setTimeout(init, 500);
		}
 
	}.bind(global);
 
	function getWM(){return (typeof wikiMod !== _undefined ? wikiMod : (global.wikiMod || window.wikiMod || (uw ? uw.wikiMod : null)));}
 
	var started = false;
	function start(){
		if(!started){
			started = true;
			TVEB_init(uw && typeof jQuery !== _undefined ? jQuery.noConflict() : (global.jQuery || global.$ || window.jQuery || window.$ || null),getWM());
		}
	}
 
	function waitForWikiMod(count){
		count = count || 1;
		try {if(!started && !getWM() && count < 35){return setTimeout(function(_count){waitForWikiMod((_count || count) + 1);}, 25, count);}} catch(e) {}
		start();
	}
 
	function addStartHooks(){
		var rName = "onWikiModReady",gReady = global[rName],wReady = window[rName],uReady = uw ? uw[rName] : undefined;
		try {
			if(gReady === true || wReady === true || uReady === true){
				return start();
			} else {
				if(typeof gReady!=_undefined) {
					global[rName] = start;
					if(global[rName] !== start) return;
				}
				if(!uw && typeof wReady!=_undefined) {
					window[rName] = start;
					if(window[rName] !== start) return;
				}
			}
		} catch(e) {}
		waitForWikiMod();
	}
	addStartHooks();
 
}(this);
 
// **************************************************
// Start Javascript Libraries
// **************************************************

+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);

importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

// Read a page's GET URL variables and return them as an associative array. - jgjake2
function getUrlVars() {
    var vars = [],
        hash,
		hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'),
		i = 0;
    for ( ; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

window.JSExtensionConfig = window.JSExtensionConfig || {};

var diURLVars = getUrlVars();
var tmpjsextcfg;

if(diURLVars.jsextcfg){
	try {
		tmpjsextcfg = JSON.parse(unescape(diURLVars.jsextcfg));
	} catch(e) {
		tmpjsextcfg = {};
	}
	$.extend(true, window.JSExtensionConfig, tmpjsextcfg);
}
window.JSExtensionConfig = window.JSExtensionConfig || {};
window.JSExtensionConfig.TabViewEditButtons = window.JSExtensionConfig.TabViewEditButtons || {};

window.JSExtensionConfig.TabViewEditButtons.defaultMode = 'none'; // 'edit', 'vde', 'none'

// **************************************************
// wikiMod Dependant Scripts
// **************************************************

window.JSExtensionConfig.TabViewEditButtons = window.JSExtensionConfig.TabViewEditButtons || {};
window.JSExtensionConfig.TabViewEditButtons.version = 'beta'; // Forces beta script to load. Remove this line to use production version.
// Tab View Edit Buttons Loader
!(function(TabViewEditButtonsCfg){
	var JS_Version,
		TabViewEditButtons_JSEnabled = true;
	
	// Do not load while debugging local code
	if(TabViewEditButtonsCfg){
		try {
			if(TabViewEditButtonsCfg.disable)
				return;
				
			JS_Version = TabViewEditButtonsCfg.jsVersion || TabViewEditButtonsCfg.version;
			
			if(TabViewEditButtonsCfg.jsDisable)
				TabViewEditButtons_JSEnabled = false;
		} catch(e) {}
	}
	
	if(TabViewEditButtons_JSEnabled){
		importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons' + (JS_Version ? '-' + escape(JS_Version) : '') + '.js', 'deadisland');
	}
})(window.JSExtensionConfig.TabViewEditButtons);