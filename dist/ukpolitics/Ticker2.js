/*globals Bawolff getElementsByClassName hookEvent wgServer wgArticlePath addLoadEvent*/
/*
__This is Ticker2-0.9__

This is an attempt to redesign the ticker system. I believe that well the current ticker system is a good idea, it can be improved on

Then again, this may just be overthinking things. time will tell.
######
FROM http://en.wikinews.org/wiki/MediaWiki:Ticker2.js. Used under CC-BY license
####

Note: even though this is in my userspace, feel free to edit it if you know javascript. This is a wiki after all
*/

//to avoid name conflicts (we already have way to many global variables as is imho)
//Everything should be a member of Bawolff.Ticker
if (typeof Bawolff !== "object") Bawolff = {};
if (typeof Bawolff.Ticker === "Object") throw new Error("Can not initilize ticker. Already initilized, or someone stole its name!");

Bawolff.Ticker = function() {
/*
This is the constructor function for new Ticker objects. Call as:
var some_ticker_object = new Bawolff.Ticker;

Its primary purpose is to set defaults and create new Ticker objects. It takes no arguments.
Ticker Objects should have the following methods:
*setUp - set up ticker properties (and does sanity checks)
*engines - functions for transitions
probably more
*/

    var t_s = Bawolff.Ticker; //shortcut

    this.arg = ""; //defaults to none, if uspecified. (should this be an arg to this function?). unphrased definition of options
    this.elm = null; //element to work ticker magic on. setUp method will throw an error if this isn't set by then 

    //method setUp will take care of these. These are the actual options (defaults here)

    this.engineNumb = t_s.eng.none; //constant representing engine number
    this.speed = 1; //float - multiplication factor
    //Probably can't set these to null through wiki
    this.strLeft = "Latest News ("; //Intro string part 1 - null for none
    this.strRight = "):"; //intro part 3 - null for none
    this.strLinkURI = "http://en.wikinews.org/wiki/template:Latest_News"; //part 2 url
    this.strLinkText = "full list"; //part 2 text. null for no link.
    this.schowControls = false; //pause/restart
    this.tickSpeed = 1;
    this.resetSpeed=1;

    //Internal thingies (don't change)
    this.listIndex = 0;
    this.charIndex = 0;
    this.curState = "ok"; //for pausing
    this.resumeFunc = null; //storage for resume function
    this.resumeDelay = 0; //wait time before executing

}

Bawolff.Ticker.prototype.setUp = function() {
/*
This function takes no arguments. call as:
some_ticker_object.setUp();

It initilizes ticker options based on what the class name of the ticker element is.
The options are (mostly) encoded as follows in a class attribute:

Ticker_<option name- no dashes, underscore allowed>-<urlencoded option value(must end in alphanumeric or _ character)>

options are seperated by a space (each is a different class).
###################################################
##This function must be extra careful not to be  ##
##vulnurable to an xss attack as it directly     ##
##deals with editable on wiki data, that could be##
##malicious! be careful                          ##
###################################################

*/


    //check to see if we really have an element
    if (!(this.elm && this.elm.nodeType && this.elm.nodeType === 1)) throw new Error("no element, or invalid element for ticker");

    var propMatch = /\bTicker_(\w+)-(\S*)\b/g;
    var res;
    
    while(res = propMatch.exec(this.arg)) {
       switch(res[1]) { //option name
            case "speed":
              var speed = parseFloat(decodeURIComponent(res[2]));
              if (isNaN(speed)) break;
              speed = 1/speed; //turn delay into speed multiplier
              if (speed < 1e-5) break;
              if (speed > 1e2)  break;
              
              this.speed = speed;
              break;

            case "strRight":
              res[2] = res[2].replace('+', '%20');//encode + with % encode. does this work w/unicode
              res[2] = res[2].replace('%00', '');
              this.strRight = decodeURIComponent(res[2]);
              break;

            case "strLeft":
              res[2] = res[2].replace('+', '%20');//encode + with % encode. does this work w/unicode
              res[2] = res[2].replace('%00', '');
              this.strLeft = decodeURIComponent(res[2]);
              break;

            case "strLinkText":
              res[2] = res[2].replace('+', '%20');//encode + with % encode. does this work w/unicode
              res[2] = res[2].replace('%00', '');
              this.strLinkText = decodeURIComponent(res[2]);
              break;

            case "strLinkURI":
              //despite name, actually local page name, not a URI
              var page = encodeURIComponent(res[2]); //note encode not decode
              if (page.match(/^special(%3A|:)userlogout/i)) break; //link is malicious
              this.strLinkURI = (page.length > 0) ? wgServer + wgArticlePath.replace("$1", page) : null;
              break;

            case "engine":
              //takes a literal engine name
              var engName = decodeURIComponent(res[2]);
              if (engName.match(/^\d+$/)||engName.length === 0) break;
              this.engineNumb = (typeof Bawolff.Ticker.eng[engName] === "number" ? Bawolff.Ticker.eng[engName] : this.engineNumb);
                
            default: 
              //throw new Error("not implemented");
        }
    }
    this.bigList = this.elm.getElementsByTagName("li"); //items to cycle ticker through
    this.listLength = this.bigList.length;
}
Bawolff.Ticker.prototype.start = function() {
//Start the ticker sets it up as well) separate from restart

/*
Creates a <ul class="actualTicker"> - actualTicker
            <span class="tickerIntroduction">(into <a class="tickerLink">stuff</a>):</span> - realTicker 
            <li > ...</li> (dummyItem)
          </ul>
*/

    this.elm.style.display = "none"; //hide the list

    var actualTicker = this.tickerElm = document.createElement("ul");
    actualTicker.className = "actualTicker";    

    var realTicker = document.createElement("Span");
    realTicker.className = "tickerIntroduction";
    realTicker.appendChild(document.createTextNode(this.strLeft));

    var realTickerLink = document.createElement("a");
    realTickerLink.href= this.strLinkURI;
    realTickerLink.title = this.strLinkText;
    realTickerLink.className = "tickerLink";
    realTickerLink.appendChild(document.createTextNode(this.strLinkText));
    realTicker.appendChild(realTickerLink);

    realTicker.appendChild(document.createTextNode(this.strRight));
    //Start the 2nd (Actual) span

    actualTicker.appendChild(realTicker);

    var dummyItem = document.createElement("li");
    actualTicker.appendChild(dummyItem);

    this.elm.parentNode.insertBefore(actualTicker, this.elm);

    this[Bawolff.Ticker.eng[this.engineNumb]](true); //Start the engine (ticker)



}
Bawolff.Ticker.prototype.pause = function () {
    this.curState = "paused";
}
Bawolff.Ticker.prototype.restart = function () {
    if (this.curState !== "paused") return false;
    this.curState = "ok";
    window.setTimeout(this.resumeFunc, this.resumeDelay);
}



/*
####
functions that are direct properties of the ticker constructor (not in prototype chain)
####
*/
Bawolff.Ticker.eng = []; //Stores object mapping engine name to engine number
Bawolff.Ticker.registerEngine = function (engName, engine) {
/*
This function takes care of hooking up engines (transitions)
into the system.
Arguments: String engName - name of engine (can not be a number)
           function engine - function containing engine code

Structure of what an engine should look like is noted somewhere (FIXME)

*/
    //to prevent screwing around with length property. considered an array index, even if passed a string with an interger value
    if (typeof engName !== "string" || (engName.match(/^\d+$/) !== null)) throw new Error("Invalid engine name. (can't be a number)");

    var te_s = Bawolff.Ticker.eng;
    var listLen = te_s.length;
    te_s[listLen] = "eng-" + engName;
    te_s[engName] = listLen;

    Bawolff.Ticker.prototype["eng-" + engName] = engine; //is that really the best way to add teh engine functions?
}

Bawolff.Ticker.registerEngine("none", function(state) {
/*
This function is a dummy transition (no animation, but changes it)

called as:
tick() - advance one letter forward (unused)
tick(flase) - last tick before break
tick(true) - set up/first tick


*/
    if (!state) return true; //Shouldn't happen as null transition. normally can't do this

    if (state) {
        var newItem = this.bigList[this.listIndex].cloneNode(true); //true means deep
        this.tickerElm.replaceChild(newItem, this.tickerElm.lastChild);
        this.listIndex++;
        this.listIndex >= this.listLength ? this.listIndex = 0: true;

        var cur_obj = this; //needed, as otherwise executes in context of window
        var resF = function() {
            cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj, true);
        }
        var resD = 7000*cur_obj.speed*cur_obj.resetSpeed;
        if (this.curState === "paused") {
            this.resumeFunc = resF;
            this.resumeDelay = resD;
        } else { //assume "ok" but allow other states
            window.setTimeout(resF, resD);
        }

    }


});

Bawolff.Ticker.registerEngine("std", function(state) {
/*
This function is a standard - 1 char at a time ticker

//this is not the greatest done tick function. In a paticular it expects a list formated
// a specific way, and does not handle exceptional conditions as it should
//this should be fixed later

called as:
tick() - advance one letter forward (unused)
tick(flase) - last tick before break
tick(true) - set up/first tick


*/
    if (state === false) {
        this.tickerElm.lastChild.firstChild.firstChild.data = this.fullItem.substring(0,this.charIndex); // kill ...
        var cur_obj = this; //needed, as otherwise executes in context of window
        var resF = function() {
            cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj, true);
        }
        var resD = 7000*cur_obj.speed*cur_obj.resetSpeed;
        if (this.curState === "paused") {
            this.resumeFunc = resF;
            this.resumeDelay = resD;
        } else { //assume "ok" but allow other states
            window.setTimeout(resF, resD);
        }
    }

    if (state === void 0) { //undefined as in normal tick
        if (this.charIndex === this.fullItem.length) {
            //if we're done

            var cur_obj = this; //needed, as otherwise executes in context of window
            var resF = function() {
                cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj, false);
            }
            var resD = 100*cur_obj.speed*cur_obj.tickSpeed;
            if (this.curState === "paused") {
                this.resumeFunc = resF;
                this.resumeDelay = resD;
            } else { //assume "ok" but allow other states
                window.setTimeout(resF, resD);
            }
            return true;
        }

        this.charIndex++;
        this.tickerElm.lastChild.firstChild.firstChild.data = this.fullItem.substring(0,this.charIndex) + '...';

        var cur_obj = this; //needed, as otherwise executes in context of window
        var resF = function() {
            cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj);
        }
        var resD = 100*cur_obj.speed*cur_obj.tickSpeed;
        if (this.curState === "paused") {
            this.resumeFunc = resF;
            this.resumeDelay = resD;
        } else { //assume "ok" but allow other states
            window.setTimeout(resF, resD);
        }
        return true;

    }

    if (state) {
        var newItem = this.bigList[this.listIndex].cloneNode(true); //true means deep
//This still doesn't handle exceptional situations as good as possible, but it won't indef loop or freeze
        if (newItem.firstChild.firstChild !== null) { //Link and then text
            this.fullItem = newItem.firstChild.firstChild.data;    
            newItem.firstChild.firstChild.data = "";
        } else if (newItem.firstChild !== null) { //just text
            this.fullItem = newItem.firstChild.data;    
            newItem.replaceChild(document.createElement("span"), newItem.firstChild);
            newItem.firstChild.appendChild(document.createTextNode(""));
        } else { //input confused script. send error message
            newitem.insertBefore(document.createElement("strong"), null);
            newitem.firstChild.className = "error";
            newitem.firstChild.appendChild(document.createTextNode("Error: List item incorrectly formated for this ticker type. Please use unformatted text, or a single unformatted link (or otherwise one element deep)."));
            this.fullItem = newItem.firstChild.firstChild.data;
            newItem.firstChild.firstChild.data = "";
        }    
            
        this.charIndex = 0;

        this.tickerElm.replaceChild(newItem, this.tickerElm.lastChild);
        this.listIndex++;
        this.listIndex >= this.listLength ? this.listIndex = 0: true;

        var cur_obj = this; //needed, as otherwise executes in context of window
        cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj);

    }


});


Bawolff.Ticker.registerEngine("fade", function(state) {
/*
This function is a fade in effect

This is relies on Css3+MSIE extentions, and thus isn't all that cross browser compatible

called as:
tick() - advance one letter forward (unused)
tick(flase) - last tick before break
tick(true) - set up/first tick


*/

 
    if (state === false) { //sleep
        var cur_obj = this; //needed, as otherwise executes in context of window
        var resF = function() {
            cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj, true);
        }
        var resD = 7000*cur_obj.speed*cur_obj.resetSpeed;
        if (this.curState === "paused") {
            this.resumeFunc = resF;
            this.resumeDelay = resD;
        } else { //assume "ok" but allow other states
            window.setTimeout(resF, resD);
        }
    }

    if (state === void 0) { //undefined as in normal tick
        if (this.charIndex === 100) {
            //if we're done

            var cur_obj = this; //needed, as otherwise executes in context of window
            var resF = function() {
                cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj, false);
            }
            var resD = 40*cur_obj.speed*cur_obj.tickSpeed;
            if (this.curState === "paused") {
                this.resumeFunc = resF;
                this.resumeDelay = resD;
            } else { //assume "ok" but allow other states
                window.setTimeout(resF, resD);
            }
            return true;
        }

        this.charIndex++;
        Bawolff.setTrans(this.tickerElm.lastChild, this.charIndex/100);

        var cur_obj = this; //needed, as otherwise executes in context of window
        var resF = function() {
            cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj);
        }
        var resD = 40*cur_obj.speed*cur_obj.tickSpeed;
        if (this.curState === "paused") {
            this.resumeFunc = resF;
            this.resumeDelay = resD;
        } else { //assume "ok" but allow other states
            window.setTimeout(resF, resD);
        }
        return true;

    }

        if (state) {

        this.charIndex = 0;

        var newItem = this.bigList[this.listIndex].cloneNode(true); //true means deep
        Bawolff.setTrans(newItem, 0);
        (navigator && navigator.appName === "Microsoft Internet Explorer") ? newItem.style.display = 'inline-block' : true;
        this.tickerElm.replaceChild(newItem, this.tickerElm.lastChild);
        this.listIndex++;
        this.listIndex >= this.listLength ? this.listIndex = 0: true;


        var cur_obj = this; //needed, as otherwise executes in context of window
        cur_obj[Bawolff.Ticker.eng[cur_obj.engineNumb]].call(cur_obj);

    }

});



/*Not really used. To make all pause call Bawolff.Ticker.allDo("pause");
Bawolff.Ticker.allDo =  function (func) {
    var l = Bawolff.Ticker.allTickers.length;
    for (var i=0;i<l;i++) {
        Bawolff.Ticker.allTickers[i][func]();
    }
}
*/
Bawolff.Ticker.allDoPause =  function () {
    var l = Bawolff.Ticker.allTickers.length;
    for (var i=0;i<l;i++) {
        Bawolff.Ticker.allTickers[i].pause();
    }
}
Bawolff.Ticker.allDoRestart =  function () {
    var l = Bawolff.Ticker.allTickers.length;
    for (var i=0;i<l;i++) {
        Bawolff.Ticker.allTickers[i].restart();
    }
}

Bawolff.setTrans = function(elm, opacity/*1 being full visible, 0 being invisible*/) {
    if (!Bawolff.setTrans.opacityMethod) {
        //standard way (CSS3)
        if (elm.style && (typeof elm.style.opacity != "undefined")) {
            Bawolff.setTrans.opacityMethod = 1;
        }
        else if (elm.style && (typeof elm.style.MozOpacity != "undefined")) { //old moz
            Bawolff.setTrans.opacityMethod = 2;
        }
        else if (elm.style && (typeof elm.style.filter != "undefined")) {
            Bawolff.setTrans.opacityMethod = 3;
        }
        else {
            
            //throw new Error("opacity is not supported on this platform (or this script needs to be fixed to include support on your platform");
        }
    }
    switch (Bawolff.setTrans.opacityMethod) {
        case 1:
            elm.style.opacity = opacity;
            break;
        case 2:
            elm.style.MozOpacity = opacity;
            break;
        case 3:
            elm.style.filter = "alpha(opacity=" + opacity*100 + ")"; //No guarantees this works
            break;
        default:
            //do nothing, so other browsers not inconvianced
            break;
    }
}

Bawolff.Ticker.init = function () {
    //handled elsewhere if (!document.getElementById("enableTickers")) return false; //Bcause getting all elements by class is expensive

    var tickerList = getElementsByClassName(document.body, "div", "isATicker");
    var l = tickerList.length;

    Bawolff.Ticker.allTickers = [];
    for (var i=0;i<l;i++) {
        Bawolff.Ticker.allTickers[i] = new Bawolff.Ticker;
        Bawolff.Ticker.allTickers[i].elm = tickerList[i];
        Bawolff.Ticker.allTickers[i].arg = tickerList[i].className;

        Bawolff.Ticker.allTickers[i].setUp();
        Bawolff.Ticker.allTickers[i].start();
    }
    if (!(navigator && navigator.appName === "Microsoft Internet Explorer")) {
    //blur sometimes fires too much on MSIE and makes things not work
    hookEvent('blur', Bawolff.Ticker.allDoPause);//stop anim on loss of focus, and restart it on gain of focus. hookEvent from wikibits
    hookEvent('focus', Bawolff.Ticker.allDoRestart);
    }

}
Bawolff.Ticker.init(); //already from a load event