function showError(msg) {
    console.error(msg);
}

url = mw.Uri();
var urlparams = url.query;

function isset(variable) {
    return typeof variable != 'undefined';
}

function empty(param) {
    //if(
}

function replaceUmlauts(str) {
    return str
    .replace(/[\u00c4]/gm,'Ae')
    .replace(/[\u00e4]/gm,'ae')
    .replace(/[\u00d6]/gm,'Oe')
    .replace(/[\u00f6]/gm,'oe')
    .replace(/[\u00dc]/gm,'Ue')
    .replace(/[\u00fc]/gm,'ue')
    .replace(/[\u00df]/gm,'ss'); 
}

function replaceURIChars(str) {
    return str
    .replace(/\r|\n|\r\n/gm,'%0A')
    .replace(/#/gm,'%23')
    .replace(/&/gm,'%26')
    .replace(/?/gm,'%3F')
}

function isEven(num) {
    return num % 2 == 0;
}

function isOdd(num) {
    return num % 2 == 1;
}
$.fn.extend({
    getOuterHTML : function() {
        return $(this).wrapAll('<div>').parent().html();
    }
});

function isUserpage() {
    return ($.inArray(wgNamespaceNumber,[2,3,1200,500]) !== -1 || (wgCanonicalSpecialPageName && $.inArray(wgCanonicalSpecialPageName,['Contributions','Following']) != -1));
}

function getUserByPage() {
    if($.inArray(wgNamespaceNumber,[2,1200,500]) != -1) {
        return /:(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Contributions') {
        return /\/(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Following') {
        return wgUserName;
    }
}

//Thanks to: https://css-tricks.com/snippets/jquery/get-query-params-object/
$.extend({
    getQueryParameters : function(str) {
        return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    }
});

/* Thanks to musefan: http://stackoverflow.com/a/17973165 */
function pad(x){
    if(x < 10) return "0" + x;
    return x;
}

/* Event handler for native js */
var eventify = function(arr, callback) {
    arr.push = function(e) {
        Array.prototype.push.call(arr, e);
        callback(arr);
    };
    
};

function ObservedObject() {
    this.eventListeners = {};
    this.entries = {};
}
ObservedObject.prototype = {
    set: function(key, val) {
        this.entries[key] = val;
        if(this.eventListeners.hasOwnProperty('set')) {
            this.eventListeners.set();
        }
        else {
            console.log('no event handler attached to \'set\'');
        }
    },
    get: function(key) {
        if(this.eventListeners.hasOwnProperty('get')) {
            this.eventListeners.get();
        }
        else {
            console.log('no event handler attached to \'get\'');
        }
        return this.entries[key];
    },
    addEventListener: function(event,callback) {
        this.eventListeners[event] = callback;
        return this.eventListeners;
    },
    size: function (object) {
        return Object.keys(this.entries).length;
    }
}

/* Extend Object functions */
/*Object.prototype.size = function (object) {
  return Object.keys(object).length;
}

Object.prototype.invert = function(object) {
  var key, tmp_ar = {};

    for (key in object)
    {
        if (object.hasOwnProperty(key)) {
            tmp_ar[object[key]] = key;
        }
    }

    return tmp_ar;
}

Object.prototype.values = function(object) {
  return Object.keys(Object.invert(object));
}

Object.prototype.varName = function(object) {
  //Thanks to Matt Smith: http://stackoverflow.com/users/3750358/matt-smith
  for (var name in window) {
    if (window[name] == object)
    return(name);
  }
  return("");
}

Object.prototype.inObject = function(value) {
  return Object.invert(window[Object.varName(this)]).hasOwnProperty(value);
}*/

function locationHashChanged() {
    console.log('hash changed',location.hash);
    var re1 = /#tab-([0-9]{1,3})-([0-9]{1,3})/;
    var tabber = '$1';
    var tab = '$2';
    var re2 = /#dia-([0-9]{1,3})-([0-9]{1,3})/;
    var diashow = '$1';
    var dia = '$2';
    if (re1.test(location.hash)) {
      tabchange(location.hash.replace(re1,tabber),location.hash.replace(re1,tab));
    }
    else if(re2.test(location.hash)) {
        diashowImgChange(location.hash.replace(re2,diashow),location.hash.replace(re2,dia));
    }
    else {
        console.log('no match found');
    }
}
 
function setHash(text,history) {
    location.hash = '#' + text;
    if(history) {
        history.pushState(null, null, text);
    }
}
 
window.onhashchange = locationHashChanged;

function pageExists(title,success,error) {
    $.getJSON('/api.php?action=query&titles=' + title + '&format=json',function(data) {
        console.log(data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('pageid') && !data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('missing'));
        if(data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('pageid') && !data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('missing')) {
            success();
        }
        else {
            error();
        }
    });
}

/* show/hide trigger */
(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

function addScript(s) {
  script = document.createElement('script');
  script.setAttribute('scr',s);
  document.head.appendChild(script);
}

function getSettings() {
    var deferredObject = $.Deferred();
    $.getJSON('/wiki/Project:Settings?action=raw',function(data) {
        if(data !== 'undefined' && !!Object.keys(data).length && data.hasOwnProperty(wgUserName)) {
            deferredObject.resolve(data[wgUserName]);
        }
    });
    return deferredObject;
}

function getUserSettings(callback) {
    getSettings().done(callback);
}

/*
function getSettings(callback) {
    //settings;
    var deferred = $.Deferred();
    deferred.done(function(data) {
        console.log('defered',data);
    });
    $.getJSON('http://de.harry-grangers-test.wikia.com/wiki/MediaWiki:Settings.js?action=raw').done(callback).error(function(error) {
        console.log('error',error);
    });
    return deferred;
}

function getUserSettings() {
    getSettings(function(data) {
        console.log('settings',data,data !== 'undefined',!!Object.keys(data).length,data.hasOwnProperty(wgUserName),data[wgUserName]);
        if(data !== 'undefined' && !!Object.keys(data).length && data.hasOwnProperty(wgUserName)) {
            console.log('data load properly for ' + wgUserName + ':',data[wgUserName]);
            deferred.resolve( data[wgUserName], "val2" );
            window.settings = data[wgUserName];
            return data[wgUserName];
        }
        return {'error':'No settings found for username ' + wgUserName};
    });
}
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
function getElementsByClass(searchClass, node, tag) {
    var classElements = [];
 
    if (node === null || node === undefined || !node) node = document;
 
    if (tag === null) tag = '*';
 
    var els = node.getElementsByTagName(tag);
    if(els.length!==0){
        var elsLen = els.length;
        var tester = new ClassTester(searchClass);
 
        for (i = 0, j = 0; i < elsLen; i++) {
            if (tester.isMatch(els[i])) {
                classElements[j] = els[i];
                j++;
            }
        }
    }
    return classElements;
}
 
function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
 
ClassTester.prototype.isMatch = function (element) {
    return this.regex.test(element.className);
};
/*
    end getElementsByClass
*/
/*
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}
 
function getFirstHeading() {
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements !== null && elements.length > 0) ? elements[0] : null;
}
*/
/*
    Returns the element's nearest parent that has the specified CSS class.
*/
/*
function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;
 
    while (node !== null && node != document) {
        if (tester.isMatch(node)) return node;
 
        node = node.parentNode;
    }
 
    return null;
}
*/
/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
/*
function rewriteHover() {
    var gbl = document.getElementById("hover-global");
 
    if (gbl === null) return;
 
    var nodes = getElementsByClass("hoverable", gbl);
 
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onmouseover = function () {
            this.className += " over";
        };
        nodes[i].onmouseout = function () {
            this.className = this.className.replace(new RegExp(" over\\b"), "");
        };
    }
}
*/
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/
// onload stuff
var firstRun = true;
 
function loadFunc() {
    if (firstRun) {
        firstRun = false;
    } else {
        return;
    }
 
    window.pageName = wgPageName;
    window.storagePresent = (typeof (globalStorage) != 'undefined');
 
    //addHideButtons(); //Stored in MediaWiki:Hidable.js
 
    fillPreloads();
 
    //substUsername(); //Stored in MediaWiki:UserAPI.js
    substUsernameTOC();
    rewriteTitle();
    //addAlternatingRowColors();
 
    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;
 
    if (!bodyClass || (bodyClass.indexOf('page-') == -1)) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }
 
    if (typeof (onPageLoad) != "undefined") {
        onPageLoad();
    }
}
 
function infoboxToggle() {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;
 
    if (document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Show]';
        nowShown = false;
    } else {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
        nowShown = true;
    }
 
    if (window.storagePresent) {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
}
 
function addAlternatingRowColors() {
    var infoboxes = getElementsByClass('infobox', document.getElementById('content'));
 
    if (infoboxes.length === 0) return;
 
    for (var k = 0; k < infoboxes.length; k++) {
        var infobox = infoboxes[k];
 
        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;
 
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].className.indexOf('infoboxstopalt') != -1) break;
 
            var ths = rows[i].getElementsByTagName('th');
 
            if (ths.length > 0) {
                continue;
            }
 
            if (changeColor) rows[i].style.backgroundColor = '#f9f9f9';
            changeColor = !changeColor;
        }
    }
}
 
function substUsernameTOC() {
    if (typeof getElementsByClass != 'function') {
        return;
    }
 
    var toc = document.getElementById('toc');
    var userpage = document.getElementById('pt-userpage');
 
    if (!userpage || !toc) return;
 
    var username = userpage.firstChild.firstChild.nodeValue;
    var elements = getElementsByClass('toctext', toc, 'span');
 
    for (var i = 0; i < elements.length; i++)
    elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}
 
$(loadFunc);

$.fn.listenFor = function(el,callback) {
	$(this).bind("DOMSubtreeModified", function() {
		if(!!$(el).length) {
			callback($(el));
		}
	});
}