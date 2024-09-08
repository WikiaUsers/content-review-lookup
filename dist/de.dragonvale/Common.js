/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]]

window.UserTagsJS = {
 modules: {},
 tags: {
 'bot': { u: 'Bot-Konto', link:'Hilfe:Bots',},
 'vstf': { u: 'VSTF', link:'Hilfe:VSTF',},
 'taskforce': { u: 'VSTF', link:'Hilfe:VSTF',},
 'tech': { u: 'Techniker', link:'Dragonvale Wiki:Techniker',},
 'semiaktiv': { u: 'Sporadisch aktiv',},
 'bannedfromchat': { u: 'Aus dem Chat verbannt',},
 'founder': { u: 'Wiki-Gründer', link:'Admins',},
 'bureaucrat': { u: 'Bürokrat', m: 'Bürokrat', f: 'Bürokratin', order: 1 , link:'Admins',},
 'sysop': { u: 'Administrator', m: 'Administrator', f: 'Administratorin', order: 2 , link:'Admins',},
 'moderator': { u: 'Wiki-Moderator', m: 'Wiki-Moderator', f: 'Wiki-Moderatorin', order: 3 , link:'Admins',},
 'chatmoderator': { u: 'Chat-Moderator', m: 'Chat-Moderator', f: 'Chat-Moderatorin', order: 4 , link:'Admins',},
 'rollback': { u: 'Rollback-Benutzer', m: 'Rollback-Benutzer', f: 'Rollback-Benutzerin', order: 5 , link:'Admins',}
 }
};
 
UserTagsJS.modules.mwGroups = [
'bureaucrat', 'chatmoderator', 'moderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'
];

UserTagsJS.modules.metafilter = {
 'chatmoderator': ['moderator'],
 'rollback': ['moderator']
};
UserTagsJS.modules.custom = {
        'Kopcap94': ['taskforce'],
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js'                                                                                                                             ]
});

/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};


/* Any JavaScript here will be loaded for all users on every page load. */
 
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

// </syntax>

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
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

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/*Snow JavaScript
importScriptPage('MediaWiki:Snow.js','c');*/

/* 
// Fireworks Effect Javascript
// copyright 3rd April 2005, 13th February 2009
// by Stephen Chapman http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code in this script (including these
// comments) is used without any alteration


var stopafter = 0;
var firestop = []; var fire = []; var stdDOM = document.getElementById; var nsDOM = ((navigator.appName.indexOf('Netscape') != -1) && (parseInt(navigator.appVersion) ==4)); function pageWidth() {return window.innerWidth != null? window.innerWidth: document.body != null? document.body.clientWidth:700;}function pageHeight() {return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:500;} function posLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;} function posTop() {return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;} var hD="0123456789ABCDEF"; function d2h(d) {return hD.substr(d>>>4,1)+hD.substr(d&15,1);} layernum=0; piece = function(parent) {this.elem = null; if(nsDOM) {if(parent == null) this.elem=new Layer(1); else {this.elem=new Layer(1,parent.elem); this.style.visibility = "inherit";} this.parent = parent; this.style = this.elem;} else if (stdDOM) {if(parent == null) this.parent=document.body; else this.parent=parent.elem; this.elem = document.createElement('div'); var xName = "xLayer" + layernum++; this.elem.setAttribute('id', xName); elemc = document.createTextNode('.'); this.elem.appendChild(elemc); this.parent.appendChild(this.elem); this.style = this.elem.style;document.getElementById(xName).style.lineHeight = '3px'; document.getElementById(xName).style.color = '#fff'; document.getElementById(xName).style.position = 'absolute';} window[this.elem.id]=this; this.ay = .1; this.type = 0;}; piece.prototype.moveTo = function(x,y) {if(nsDOM) this.elem.moveTo(x,y); else {this.style.left = x+"px"; this.style.top = y+"px";}}; piece.prototype.setC = function(colour) {if(nsDOM) this.elem.bgColor = colour; else this.style.backgroundColor = colour==null?'transparent':colour; };  piece.prototype.fire = function(sx, sy, fw) {var a = Math.random() * Math.PI * 2; switch (fw) {case 1: var s = Math.random() * 2; break; case 2: var s = 2; break; case 3: var s = (Math.PI * 2) - a - Math.random(); break; case 4: var s =  a - Math.random(); break; default: var s = Math.random() * 2; if(Math.random() >.6) s = 1.5;} this.dx = s*Math.sin(a); this.dy = s*Math.cos(a) - 2; this.x = sx; this.y = sy; this.moveTo(sx, sy);}; piece.prototype.sCol = function(hex,hex2,cl) {switch (cl) {case 1: this.setC("#" + hex + hex2 + "00"); break; case 2: this.setC("#00" + hex + "00"); break; case 3: this.setC("#00" + hex + hex2); break; case 4: this.setC("#" + hex + "0000"); break; case 5: this.setC("#" + hex + hex + "00"); break; case 6: this.setC("#" + hex + hex + hex); break; case 7: this.setC("#" + hex2 + hex + "00"); break; default: this.setC("#" + hex + hex2 + hex);}}; piece.prototype.animate = function(step,cl) {var colour = (step > 25) ?  Math.random()*(380-(step*5)) : 255-(step*4); var hex = d2h(colour-112); if (colour < 112) hex = d2h(colour); this.sCol(d2h(colour),hex,cl); this.dy += this.ay; this.x += this.dx; this.y += this.dy; this.moveTo(this.x, this.y);}; fo = function(numst) {this.id = "fo"+fo.count++;this.sp = new Array(); for(i=0 ; i<numst; i++) {this.sp[i]=new piece(); if(nsDOM){this.sp[i].style.clip.top =0; this.sp[i].style.clip.left = 0; this.sp[i].style.clip.bottom = 3; this.sp[i].style.clip.right = 3;} else this.sp[i].style.clip="rect("+0+" "+3+" "+3+" "+0+")"; this.sp[i].style.visibility = "visible";} this.step = 0; window[this.id]=this; fire.push(this); firestop.push(setInterval("window."+this.id+".animate()", 15));}; fo.count = 0; fo.prototype.animate = function() {if(this.step > 55) this.step = 0; if(this.step == 0) {var x = posLeft() + 50 + (Math.random()*(pageWidth() - 200)); var y = posTop() + 50 + (Math.random()*(pageHeight() - 250)); var fw = Math.floor(Math.random() * 5); this.cl = Math.floor(Math.random() * 8); for(i=0 ; i<this.sp.length ; i++)this.sp[i].fire(x, y, fw);} this.step++; for(i=0 ; i<this.sp.length ; i++) this.sp[i].animate(this.step,this.cl);};
function stopfire() {for(var i = firestop.length - 1; i >= 0; i--) {clearInterval(firestop[i]); for (var j = fire[i].sp.length - 1; j >= 0; j--) {fire[i].sp[j].style.visibility = "hidden";}}}
function fireworks() {new fo(50);setTimeout('new fo(50)',750);if (stopafter > 0) {setTimeout('stopfire()',stopafter * 60000);}} window.onload=fireworks;
*/

document.getElementById("pfeil").setAttribute("onclick", "expand()");
var expanded = true;
function expand(){
var pfeil = document.getElementById("pfeil");
	if(expanded==true){
		document.getElementById("content-2").style.height="715px";
                pfeil.style.webkitTransform="rotate(180deg)";
                pfeil.style.MozTransform="rotate(180deg)";
                pfeil.style.OTransform="rotate(180deg)";
                pfeil.style.Transform="rotate(180deg)";
		expanded = false;
	}
	else{
		document.getElementById("content-2").style.height="590px";
                pfeil.style.webkitTransform="rotate(0deg)";
                pfeil.style.MozTransform="rotate(0deg)";
                pfeil.style.OTransform="rotate(0deg)";
                pfeil.style.Transform="rotate(0deg)";
		expanded = true;
	}
}

var dragon = 0;
var pressed = false;

var dragon_part1 = document.getElementById("dragon-part1");
var dragon_part2 = document.getElementById("dragon-part2");
var dragon_part3 = document.getElementById("dragon-part3");
var dragon_part4 = document.getElementById("dragon-part4");
var dragonname1 = document.getElementById("dragonname1");
var dragonname2 = document.getElementById("dragonname2");
var dragonname3 = document.getElementById("dragonname3");
var dragonname4 = document.getElementById("dragonname4");

dragonname1.setAttribute("onclick", "dragonButton1()");
dragonname2.setAttribute("onclick", "dragonButton2()");
dragonname3.setAttribute("onclick", "dragonButton3()");
dragonname4.setAttribute("onclick", "dragonButton4()");
document.getElementById("zurueck").setAttribute("onclick", "zurueck()");

function zurueck(){
document.getElementById("new-dragons").style.top="0px";
switch (dragon){
case 1:
  dragon_part1.style.top="40px";
  dragon_part1.style.left="40px";
  break;
case 2:
  dragon_part2.style.top="40px";
  dragon_part2.style.right="40px";
  break;
case 3:
  dragon_part3.style.top="60px";
  dragon_part3.style.left="40px";
  break;
case 4:
  dragon_part4.style.top="60px";
  dragon_part4.style.right="40px";
  break;
}
}
function dragonButton1(){
switch (dragon){
case 1:
  dragon_part1.style.top="40px";
  dragon_part1.style.left="40px";
  pressed = false;
  break;
case 2:
  dragon_part2.style.top="40px";
  dragon_part2.style.right="40px";
  break;
case 3:
  dragon_part3.style.top="60px";
  dragon_part3.style.left="40px";
  break;
case 4:
  dragon_part4.style.top="60px";
  dragon_part4.style.right="40px";
  break;
}
	if(dragon != 1){
  		dragon_part1.style.top="50px";
  		dragon_part1.style.left="50px";
                document.getElementById("new-dragons").style.top="520px";
  		pressed = true;
	}
	if(pressed == false){
		dragon = 0;
	}else{
  		dragon = 1;
	}
}
function dragonButton2() {
switch (dragon)
{
case 1:
  dragon_part1.style.top="40px";
  dragon_part1.style.left="40px";
  break;
case 2:
  dragon_part2.style.top="40px";
  dragon_part2.style.right="40px";
  pressed = false;
  break;
case 3:
  dragon_part3.style.top="60px";
  dragon_part3.style.left="40px";
  break;
case 4:
  dragon_part4.style.top="60px";
  dragon_part4.style.right="40px";
  break;
}
	if(dragon != 2){
  		dragon_part2.style.top="50px";
  		dragon_part2.style.right="50px";
                document.getElementById("new-dragons").style.top="520px";
  		pressed = true;
	}
	if(pressed == false){
		dragon = 0;
	}else{
  		dragon = 2;
	}
}
function dragonButton3() {
switch (dragon)
{
case 1:
  dragon_part1.style.top="40px";
  dragon_part1.style.left="40px";
  break;
case 2:
  dragon_part2.style.top="40px";
  dragon_part2.style.right="40px";
  break;
case 3:
  dragon_part3.style.top="60px";
  dragon_part3.style.left="40px";
  pressed = false;
  break;
case 4:
  dragon_part4.style.top="60px";
  dragon_part4.style.right="40px";
  break;
}
	if(dragon != 3){
  		dragon_part3.style.top="50px";
  		dragon_part3.style.left="50px";
                document.getElementById("new-dragons").style.top="520px";
  		pressed = true;
	}
	if(pressed == false){
		dragon = 0;
	}else{
  		dragon = 3;
	}
}
function dragonButton4() {
switch (dragon)
{
case 1:
  dragon_part1.style.top="40px";
  dragon_part1.style.left="40px";
  break;
case 2:
  dragon_part2.style.top="40px";
  dragon_part2.style.right="40px";
  break;
case 3:
  dragon_part3.style.top="60px";
  dragon_part3.style.left="40px";
  break;
case 4:
  dragon_part4.style.top="60px";
  dragon_part4.style.right="40px";
  pressed = false;
  break;
}
	if(dragon != 4){
  		dragon_part4.style.top="50px";
  		dragon_part4.style.right="50px";
                document.getElementById("new-dragons").style.top="520px";
  		pressed = true;
	}
	if(pressed == false){
		dragon = 0;
	}else{
  		dragon = 4;
	}
}