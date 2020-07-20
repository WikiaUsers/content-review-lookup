/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');


// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
// ****** END: JavaScript for [[Special:Upload]] ******


/* Code for custom edit buttons (ō, ū characters). */
if (mwCustomEditButtons) {

/*** wrappers *****/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|reason=",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}

/* Code for auto-adding template to all new blog posts (thanks to User:Monchoman45 @ Central Wikia for this). */
    function BlogPreload() {
            var creating = true;
            var params = location.href.split('?').slice(1).join('?').split('&');
            for(var i = 0; i < params.length; i++) {
                    if(params[i].split('=')[0] == 'pageId') {
                            creating = false;
                            break;
                    }
            }
            if(creating && wgPageName == 'Special:CreateBlogPage') {
                    if(document.getElementById('cke_contents_wpTextbox1') != null) {
                            document.getElementById('cke_contents_wpTextbox1').getElementsByTagName('iframe')[0].contentDocument.getElementById('bodyContent').innerHTML = '<p data-rte-fromparser="true"><img data-rte-meta="%7B%22type%22%3A%22double-brackets%22%2C%22lineStart%22%3A%22%22%2C%22title%22%3A%22Template%3ABlogheader%22%2C%22placeholder%22%3A1%2C%22wikitext%22%3A%22%7B%7BTemplate%3ABlogheader%7D%7D%22%7D" class="placeholder placeholder-double-brackets" data-cke-saved-src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" type="double-brackets"></p><p data-rte-fromparser="true" data-rte-empty-lines-before="1"><img data-rte-meta="%7B%22type%22%3A%22comment%22%2C%22wikitext%22%3A%22%3C%21--%20Please%20put%20your%20content%20under%20this%20line.%20--%3E%22%2C%22placeholder%22%3A1%7D" data-rte-instance="177-1852961854d9ce6078620f" class="placeholder placeholder-comment" data-cke-saved-src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" type="comment"></p>';
                    }
                    else {
                            document.getElementById('wpTextbox1').innerHTML = '{{Blogheader}}\n\n<!-- Please place your content under this line. -->';
                    }
            }
    }
     
    addOnloadHook(BlogPreload);

/* Twitter follow button */
function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/BleachWikia" class="twitter-follow-button" data-show-count="false">Follow @BleachWikia</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);
/*</pre>*/


var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

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
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
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

/* Chat Rules Notice Test*/
if(wgCanonicalSpecialPageName == 'Chat') {
	function ChatTopic() {
		var api = new APIQuery();
		api.send(new api.Query(api, 'GET', {action: 'query', prop: 'revisions', rvprop: 'content', titles: 'Project:Chat/Topic', indexpageids: '1'}, function(result) {
			document.getElementById('chat-topic').innerHTML = result.query.pages[result.query.pageids[0]].revisions[0]['*'];
		}));

		document.getElementById('ChatHeader').getElementsByTagName('h1')[0].innerHTML += '<div id="chat-topic" style="position:absolute; bottom:2px; z-index:5; font-weight:normal; left:250px; right:160px; height:35px; line-height:17px; font-size:smaller; color:#ccc" contenteditable="true" onblur="var api = new APIQuery(); api.send(new api.Query(api, \'POST\', {action: \'edit\', text: this.innerHTML, title: \'Project:Chat/Topic\', summary: \'changing topic\', bot: 1}, function(result) {if(result.edit.result == \'Succeeded\') {$(\'#Write textarea\').val(\'ätopic:\' + document.getElementById(\'chat-topic\').innerHTML); mainRoom.sendMessage({which: 13, preventDefault: function() {}});} else {window.alert(\'You do not have permission to change the topic.\');}}));">Topic loading...</div>';
	}
	addOnloadHook(ChatTopic);
	
	mainRoom.model.chats.bind('afteradd', $.proxy(function(data) {
		if(data.attrs.text.indexOf('ätopic:') == 0) {
			document.getElementById('chat-topic').innerHTML = data.attrs.text.substring(data.attrs.text.indexOf(':') + 1);
			this.chatUL.children().last().children('.message')[0].innerHTML = '*** Changed topic to ' + document.getElementById('chat-topic').innerHTML + ' ***';
		}
	}, mainRoom.viewDiscussion));
}
else if(!window.ChatCheck) {
	$(function () {
		if(document.body.className.indexOf('skin-oasis') == -1) {
			var a = document.getElementsByTagName('a');
			for(var i in a) {
				if(a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
					a[i].href = 'javascript:OpenChatWindow()';
				}
			}
		}
		else {
			window.chatcheck = setInterval('ChatCheck()', 200);
		}
	});
 
	function ChatCheck() {
		if($('.chat-join button').length != 0) {
			$('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()">' + $('.chat-join button').html() + '</a>');
			clearInterval(window.chatcheck);
		}
	}

	function OpenChatWindow() {
		window.chatwindow = window.open('/index.php?title=Special:Chat&useskin=wikia');
		window.chatwindow.onload = function () {
			//addOnloadHook, importScript, and importStylesheet
			window.chatwindow.$('body').prepend('<script>\nfunction importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}\nfunction importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}\nfunction importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}\nfunction importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}\nfunction importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}\nfunction importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}\n//This isn\'t the same as the regular addOnloadHook, because the regular one runs from a script tag in the body that I don\'t feel like appending. It\'s easier to just make it $(function), which is essentially equivalent\nfunction addOnloadHook(func) {$(func);}\n</script>');
			//global.js
			window.chatwindow.importScriptURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.js&action=raw&ctype=text/javascript');
			//wikia.js
			window.chatwindow.importScriptURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.js&action=raw&ctype=text/javascript');
			//global.css
			window.chatwindow.importStylesheetURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.css&action=raw&ctype=text/css');
			//wikia.css
			window.chatwindow.importStylesheetURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.css&action=raw&ctype=text/css');

			//common.js
			window.chatwindow.importScriptURI(wgServer + '/index.php?title=MediaWiki:Common.js&action=raw&ctype=text/javascript');
		}
	}
}