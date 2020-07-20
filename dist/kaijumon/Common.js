/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/imports.js'
    ]
});

//</pre>

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable(tableIndex) {
    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table = document.getElementById('collapsibleTable' + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName('table');
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], 'collapsible')) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName('tr')[0];
            if (!HeaderRow) {
                continue;
            }
            var Header = HeaderRow.getElementsByTagName('th')[0];
            if (!Header) {
                continue;
            }
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);
 
            var Button = document.createElement('span');
            var ButtonLink = document.createElement('a');
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
            ButtonLink.setAttribute('href', "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode('['));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode(']'));
 
            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], 'collapsed') || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], 'autocollapse'))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], 'innercollapse')) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, 'outercollapse')) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}
 
addOnloadHook(createCollapseButtons);
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
var countdownnum = 10;
var countdown10 = setInterval(function () {
    countdownnum--;
    $('#countdown10').html(countdownnum);
}, 1000);
setTimeout("clearInterval(countdown10)", 10500);
 

/**/

function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}

/* Shows messages for Admins */
function showAdmMessage() {
    if (hasGroup('sysop')) {
        $('.adminmessage').css({'display': 'block !important'});
    }
}

addOnloadHook(showAdmMessage);

/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 * 
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 */
( function () {
 
// Set up the words in your language
var collapseCaption = 'hide';
var expandCaption = 'show';
 
var navigationBarHide = '[' + collapseCaption + ']';
var navigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} e Event object
 */
function toggleNavigationBar( indexNavigationBar, e ) {
	var navChild,
		navToggle = document.getElementById( 'NavToggle' + indexNavigationBar ),
		navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
 
	// Prevent browser from jumping to href "#"
	e.preventDefault();
 
	if ( !navFrame || !navToggle ) {
		return false;
	}
 
	// If shown now
	if ( navToggle.firstChild.data == navigationBarHide ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( hasClass( navChild, 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
			if ( hasClass( navChild, 'NavContent' ) ) {
				navChild.style.display = 'none';
			}
		}
		navToggle.firstChild.data = navigationBarShow;
 
	// If hidden now
	} else if ( navToggle.firstChild.data == navigationBarShow ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				navChild.style.display = 'block';
			}
		}
		navToggle.firstChild.data = navigationBarHide;
	}
}
 
/**
 * Adds show/hide-button to navigation bars.
 *
 * @param {jQuery} $content
 */
function createNavigationBarToggleButton( $content ) {
	var i, j, navFrame, navToggle, navToggleText, navChild,
		indexNavigationBar = 0,
		navFrames = $content.find( 'div.NavFrame' ).toArray();
 
	// Iterate over all (new) nav frames
	for ( i = 0; i < navFrames.length; i++ ) {
		navFrame = navFrames[i];
		// If found a navigation bar
		indexNavigationBar++;
		navToggle = document.createElement( 'a' );
		navToggle.className = 'NavToggle';
		navToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
		navToggle.setAttribute( 'href', '#' );
		$( navToggle ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );
 
		navToggleText = document.createTextNode( navigationBarHide );
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				if ( navChild.style.display == 'none' ) {
					navToggleText = document.createTextNode( navigationBarShow );
					break;
				}
			}
		}
 
		navToggle.appendChild( navToggleText );
		// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
		for ( j = 0; j < navFrame.childNodes.length; j++ ) {
			if ( $( navFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
				navFrame.childNodes[j].appendChild( navToggle );
			}
		}
		navFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
	}
}
 
mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );
 
}());

/* ############################################# */
/* ##          CUSTOM EDIT BUTTONS            ## */
/* ############################################# */

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/godzilla/images/5/54/Wikia_Button_-_Category.png",
            "speedTip": "Category",
            "tagOpen": "[[:Category:",
            "tagClose": "]]",
            "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/493titanollante/images/b/bf/Wikia_Button_-_Glow.png",
            "speedTip": "Glow",
            "tagOpen": "<span style='color:white'>{{glow|color=olive|",
            "tagClose": "</span>}}",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/493titanollante/images/9/90/Wikia_Button_-_Reference.png",
            "speedTip": "Reference",
            "tagOpen": "<ref name=''>[http://",
            "tagClose": "]</ref>",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/493titanollante/images/0/05/Wikia_Button_-_Kaiju_Infobox.png",
            "speedTip": "Kaiju Infobox",
            "tagOpen": "{{Kaiju Infobox \r|type1            =???\r|type2            =???\r|header           ={{Toho Kaiju}} \r|copyrighticon    =\r|image            =\r|caption          =\r|name             =\r|species          =\r|nicknames        =\r|height           =?? meters\r|length           =?? meters\r|weight           =?? tons\r|forms            =\r|allies           =\r|enemies          =\r|relationships    =\r|controlled       =\r|created          =\r|portrayed        =\r|firstappearance  =\r|latestappearance =\r|suits            =\r|roar             =[[File:.ogg|180px|center|noicon]]{{More Roars}}\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/__cb20140223182417/493titanollante/images/1/19/Wikia_Button_-_TV_Kaiu_Infobox.png",
            "speedTip": "Television Kaiju Infobox",
            "tagOpen": "{{TV Kaiju Infobox \r|type1            =???\r|type2            =???\r|header           ={{ \r|image            =\r|caption          =\r|name             =\r|species          =\r|nicknames        =\r|height           =?? meters\r|length           = meters\r|weight           =?? tons\r|forms            =\r|controlled       =\r|relationships    =\r|allies           =\r|enemies          =\r|firstappearance  =\r|roar             =To be added.\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/__cb20140330215758/493titanollante/images/8/88/Wikia_Button_-_Character_Infobox.png",
            "speedTip": "Character Infobox",
            "tagOpen": "{{Character Infobox\r|type1           =\r|type2           =\r|header          ={{Toho Character}}\r|image           =\r|caption         =\r|species         =\r|nationality     =\r|relationships   =\r|occupation      =\r|firstappearance =\r|played          =\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/493titanollante/images/9/98/Wikia_Button_-_Film_Infobox.png",
            "speedTip": "Film Infobox",
            "tagOpen": "{{Infopelicula\r|type1       =\r|type2       =\r|image       =\r|caption     =The Japanese poster for \r|nameoffilm  =\r|director    =[[\r|producer    =[[\r|writer      =[[\r|composer    =[[\r|distributor =[[Toho Company Ltd.]]{{sup|[[Japan|JP]]}}<br>[[{{sup|[[United States|US]]}}\r|rating      =<br><br>\r|budget      =¥\r|gross       =¥\r|runtime     =?? minutes{{sup|[[Japan|JP]]}}<br />{{Small|(? hour, ?? minutes)}}<br />?? minutes{{sup|[[United States|US]]}}<br />{{Small|(? hour, ?? minutes)}}\r|designs     =[[\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/__cb20140318050025/493titanollante/images/3/35/Wikia_Button_-_Game_Infobox.png",
            "speedTip": "Game Infobox",
            "tagOpen": "{{Game Infobox\r|type1       =\r|type2       =\r|header      =\r|image       =\r|caption     =\r|name        =\r|published   =\r|developed   =\r|platforms   =\r|languages   =\r|genre       =\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/__cb20140219034760/493titanollante/images/8/83/Wikia_Button_-_Tab_and_Nav.png",
            "speedTip": "Tab and Navigation",
            "tagOpen": "{{Mtab}}\r{{Nav\r|type1       =\r|type2       =\r|type        =[[Godzilla (Franchise)|Godzilla]] [[:Category:|Category:]]\r|name        =\r|next        =\r|nextname    =\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/__cb20140219034760/493titanollante/images/1/1e/Wikia_Button_-_Staff_and_Cast.png",
            "speedTip": "Staff and Cast Templates",
            "tagOpen": "==Staff==\r{{Staffs\r|Directed by=[[\r|Written by=\r|Produced by=\r|Executive Producing by=\r|Music by=\r|Cinematography by=\r|Edited by=\r|Production Design by=\r|Assistant Directing by=\r|Special Effects by=\r}}\r==Cast==\r{{Cast\r||\r||\r||\r||\r||\r||\r||\r||\r||\r||\r||\r}}",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/493titanollante/images/c/cd/Wikia_Button_-_DVD.png",
            "speedTip": "DVD Info",
            "tagOpen": "'''COMPANY''' (YEAR)<ref name=>[http:// Amazon.com: ]</ref>\r*Released: \r*Region: Region \r*Language: \r*Format: \r*Other Details:  aspect ratio,  minutes run time,  disc,  version",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/godzilla/images/f/fa/Wikia_Button_-_Politically_Correct_Gallery.png",
            "speedTip": "Standard Gallery",
            "tagOpen": "<gallery widths='120' position='center' captionalign='center' spacing='small'>\r",
            "tagClose": "\r</gallery>",
            "sampleText": ""
    };

}

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* Any JavaScript here will be loaded for all users on every page load. */

// inserts user name into <span id="insertusername"></span>
addOnloadHook(UserNameReplace);

function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace) {
        return;
    }
    for (var i = 0; UserName = document.getElementsByTagName("span")[i]; i++) {
        if ((document.getElementById('pt-userpage')) && (UserName.getAttribute('id') == "insertusername")) {
            var ViewerName = document.getElementById('pt-userpage').firstChild.innerHTML;
            UserName.innerHTML = ViewerName;
        }
    }
}

function rewriteHover() {
    var gbl = document.getElementById("hover-global");

    if (gbl === null) return;

    var nodes = getElementsByClassName(gbl, '*', 'hoverable');

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onmouseover = function () {
            this.className += " over";
        };

        nodes[i].onmouseout = function () {
            this.className = this.className.replace(new RegExp(" over\\b"), "");
        };
    }
}

function ContentLoader() {
    this.cache = true;
}

ContentLoader.prototype.enableCache = function (caching) {
    this.cache = (caching === null) ? true : this.cache;
};

ContentLoader.prototype.createRequest = function () {
    if (typeof (XMLHttpRequest) != 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof (ActiveXObject) != 'undefined') {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }

    return null;
};

ContentLoader.prototype.send = function (url, postdata, contentType) {
    var method = (postdata === null) ? 'GET' : 'POST';
    this.request = this.createRequest();
    this.request.open(method, url);

    if (!this.cache) this.request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");

    var request = this.request;
    var loader = this;

    if (postdata === null) {
        if (contentType === null) contentType = 'application/x-www-form-urlencoded';

        request.setRequestHeader('Content-type', contentType);
    }

    var f = function () {
        if (request.readyState == 4) {
            loader.text = request.responseText;
            loader.document = request.responseXML;
            request = null;
            loader.request = null;
            loader.callback();
        }
    };

    this.request.onreadystatechange = f;
    this.request.send(postdata);
};
/*
	end ContentLoader
*/

function replaceSearchIcon() {
    var innerDiv;

    var searchbox = document.getElementById('searchBody');

    if (searchbox) {
        innerDiv = searchbox.getElementsByTagName('div')[0];
        var link = innerDiv.getElementsByTagName('a')[0];

        if (link) innerDiv.removeChild(link);
    } else {
        searchbox = getElementsByClassName(document.getElementById('searchBox'), 'div', 'r_boxContent')[0];
        innerDiv = searchbox.getElementsByTagName('div')[1];
    }

    var loader = new ContentLoader();
    loader.div = innerDiv;
    loader.callback = onSearchIconsArrival;
    loader.send('/index.php?title=Template:Searchicons&action=raw');
}

function rand(n) {
    return Math.round(Math.random() * n);
}

function onSearchIconsArrival() {
    var lines = this.text.split('\n');
    var line = lines[rand(lines.length - 1)];
    var pos = line.indexOf(' ');

    var link = document.createElement('div');
    //	link.href = '/index.php?title=Special:Search&adv=1';
    link.id = 'search-icon-wrapper';
    var img = document.createElement('img');
    img.alt = 'Search';
    img.src = (pos == -1) ? line : line.substring(0, pos);
    link.appendChild(img);

    this.div.insertBefore(link, this.div.firstChild);

    var div = document.createElement('div');
    div.id = 'search-popup';
    div.style.display = 'none';
    var ul = document.createElement('ul');

    var li;
    var a;

    li = document.createElement('li');
    a = document.createElement('a');
    a.href = '/index.php?title=Special:Search&adv=1';
    a.appendChild(document.createTextNode('Advanced search'));
    li.appendChild(a);
    ul.appendChild(li);

    li = document.createElement('li');
    a = document.createElement('a');
    a.href = (pos == -1) ? 'javascript:emptySearchDesc()' : '/wiki/' + line.substring(pos + 1);
    a.appendChild(document.createTextNode("What's this? (" + ((pos == -1) ? 'NO DESCRIPTION' : line.substring(pos + 1)) + ')'));
    li.appendChild(a);
    ul.appendChild(li);

    li = document.createElement('li');
    a = document.createElement('a');
    a.href = 'javascript:closeSearchPopup()';
    a.appendChild(document.createTextNode("Close"));
    li.appendChild(a);
    ul.appendChild(li);

    div.appendChild(ul);
    document.getElementById('globalWrapper').appendChild(div);

    link.onclick = openSearchPopup;
}

function openSearchPopup(event) {
    var div = document.getElementById('search-popup');
    var e = event || window.event;

    div.style.display = (div.style.display == 'none') ? 'block' : 'none';
    div.style.left = e.clientX + 'px';
    div.style.top = (e.clientY + document.documentElement.scrollTop) + 'px';
}

function closeSearchPopup() {
    document.getElementById('search-popup').style.display = 'none';
}

function emptySearchDesc() {
    alert('No description exists for this search icon. Please contact the administrators to resolve this problem.');
}

function ContentLoader() {
    this.cache = true;
}

// **************************************************
// End (Sikon's?) searchicon code
// **************************************************

//// Intento de mejora de LinkSuggest. Modificado por [[User:Ciencia Al Poder]]
function improveLinkSuggest(){
	if (!window.YAHOO || !YAHOO.example || !YAHOO.example.AutoCompleteTextArea) return;
	YAHOO.example.AutoCompleteTextArea.prototype._sendQuery = function(sQuery) {
		var text = this._elTextbox.value.replace(/\r/g, "");
		var caret = this.getCaret(this._elTextbox);
		var sQueryStartAt;
		var closedTemplateFound = false;
		var closedLinkFound = false;
 
		// also look forward, to see if we closed this one
		for(var i = caret; i < text.length; i++) {
			var c = text.charAt (i) ;
			// Characters that are invalid inside a link. It makes no sense to continue forward to see if it's closed.
			if (c == "\n" || c == "[" || c == "{"){
				break;
			}/*
			if((c == "[") && (text.charAt(i - 1) == "[")) {
				break ;
			}
			if((c == "{") && (text.charAt(i - 1) == "{")) {
				break ;
			}*/
			if((c == "]") && (text.charAt(i - 1) == "]")) {
				// An opened template inside a closed link won't work if we return here. We'll need to check later if it's a template or a link
				//return ;
				closedLinkFound = true;
				break;
			}
			if((c == "}") && (text.charAt(i - 1) == "}")) {
				// An opened link inside a closed template won't work if we return here. We'll need to check later if it's a template or a link
				//return ;
				closedTemplateFound = true;
				break;
			}
		}
 
		for(var i = caret; i >= 0; i--) {
			var c = text.charAt(i);
			if(c == "]" || c == "|") {
				if ( (c == "|") || ( (c == "]") && (text.charAt(i-1) == "]") ) ) {
					this._toggleContainer(false) ;
				}
				return;
			}
			if(c == "}" || c == "|") {
				if ( (c == "|") || ( (c == "}") && (text.charAt(i-1) == "}") ) ) {
					this._toggleContainer(false) ;
				}
				return;
			}
			if((c == "[") && (text.charAt(i - 1) == "[")) {
				if (closedLinkFound){
					this._toggleContainer(false) ;
					return;
				}
				this._originalQuery = text.substr(i + 1, (caret - i - 1));
				sQueryReal = this._originalQuery
				if (this._originalQuery.indexOf(':')==0){
					this._bIsColon = true;
					sQueryReal = sQueryReal.replace(':','');
				} else {
					this._bIsColon = false;
				}
				this._bIsTemplate = false;
				sQueryStartAt = i;
				break;
			}
			if((c == "{") && (text.charAt(i - 1) == "{")) {
				if (closedTemplateFound){
					this._toggleContainer(false) ;
					return;
				}
				this._originalQuery = text.substr(i + 1, (caret - i - 1));
				this._bIsColon = false;
				if (this._originalQuery.length >= 6 && this._originalQuery.toLowerCase().indexOf('subst:') == 0){
					sQueryReal = "Template:"+this._originalQuery.replace(/subst:/i,'');
					this._bIsSubstTemplate = true;
				} else if (this._originalQuery.indexOf(':')==0){
					sQueryReal = this._originalQuery.replace(':','');
					this._bIsColon = true;
				} else {
					sQueryReal = "Template:"+this._originalQuery;
					this._bIsSubstTemplate = false;
				}
				this._bIsTemplate = true;
				sQueryStartAt = i;
				break;
			}
		}
 
		if(sQueryStartAt >= 0 && sQueryReal.length > 2) {
			YAHOO.example.AutoCompleteTextArea.superclass._sendQuery.call(this, encodeURI(sQueryReal.replace(/\x20/g,'_')));
		}
	};
}
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(improveLinkSuggest);
 

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = ' ';
    } else {
        var tpm = ' ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Code for "More Info Button"
function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function hideDiv() {
   document.getElementById('welcomeDiv').style.display = "none";
}
/* End */

/* Code for Artworks */
$(document).ready(function () {

    var number = 0;
    var current;

    // Set the first .view to display: block;
    $("td.views > div").each(function (index) {
        number = number + 1;
        if (index == 0) {
            $(this).css("display", "block");
            current = 0;
        }
    });

    // Bind functions to the left/right keys
    $("body").keyup(function (event) {
        if (event.keyCode == 37) {
            backone();
        }
        if (event.keyCode == 39) {
            forwardone();
        }
    });

    // Bind functions to the buttons
    $(".backone").click(function () {
        backone();
    });
    $(".forwardone").click(function () {
        forwardone();
    });

    function backone() {
       current--;
        if (current < 0) {
            current = number - 1;
        }
        current2 = current + 1;
        $("td.views > div").css("display", "none");
        $("td.views > div:nth-child(" + current2 + ")").css("display", "block");
        console.log(current);
    }

    function forwardone() {
        current++;
        if (current > number - 1) {
            current = 0;
        }
        current2 = current + 1;
        $("td.views > div").css("display", "none");
        $("td.views > div:nth-child(" + current2 + ")").css("display", "block");
        console.log(current);
    }
});
/* End */

/* Anons IP */
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['user']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
/* The End */

InactiveUsers = { months: 2 };