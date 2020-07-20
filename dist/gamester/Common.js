importScriptPage('ShowHide/code.js', 'dev');
/*==================================================
  $Id: tabber.js,v 1.9 2006/04/27 20:51:51 pat Exp $
  tabber.js by Patrick Fitzgerald pat@barelyfitz.com
 
  Documentation can be found at the following URL:
  http://www.barelyfitz.com/projects/tabber/
 
  License (http://www.opensource.org/licenses/mit-license.php)
 
  Copyright (c) 2006 Patrick Fitzgerald
 
  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:
 
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
 
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ==================================================*/
 
function tabberObj(argsObj)
{
  var arg; /* name of an argument to override */
 
  /* Element for the main tabber div. If you supply this in argsObj,
     then the init() method will be called.
  */
  this.div = null;
 
  /* Class of the main tabber div */
  this.classMain = "tabber";
 
  /* Rename classMain to classMainLive after tabifying
     (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";
 
  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";
 
  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";
 
  /* Class for the navigation UL */
  this.classNav = "tabbernav";
 
  /* When a tab is to be hidden, instead of setting display='none', we
     set the class of the div to classTabHide. In your screen
     stylesheet you should set classTabHide to display:none.  In your
     print stylesheet you should set display:block to ensure that all
     the information is printed.
  */
  this.classTabHide = "tabbertabhide";
 
  /* Class to set the navigation LI when the tab is active, so you can
     use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";
 
  /* Elements that might contain the title for the tab, only used if a
     title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2','h3','h4','h5','h6'];
 
  /* Should we strip out the HTML from the innerHTML of the title elements?
     This should usually be true.
  */
  this.titleElementsStripHTML = true;
 
  /* If the user specified the tab names using a TITLE attribute on
     the DIV, then the browser will display a tooltip whenever the
     mouse is over the DIV. To prevent this tooltip, we can remove the
     TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;
 
  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;
 
  /* If addIds==true, then you can set a format for the ids.
     <tabberid> will be replaced with the id of the main tabber div.
     <tabnumberzero> will be replaced with the tab number
       (tab numbers starting at zero)
     <tabnumberone> will be replaced with the tab number
       (tab numbers starting at one)
     <tabtitle> will be replaced by the tab title
       (with all non-alphanumeric characters removed)
   */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';
 
  /* You can override the defaults listed above by passing in an object:
     var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) { this[arg] = argsObj[arg]; }
 
  /* Create regular expressions for the class names; Note: if you
     change the class names after a new object is created you must
     also change these regular expressions.
  */
  this.REclassMain = new RegExp('\\b' + this.classMain + '\\b', 'gi');
  this.REclassMainLive = new RegExp('\\b' + this.classMainLive + '\\b', 'gi');
  this.REclassTab = new RegExp('\\b' + this.classTab + '\\b', 'gi');
  this.REclassTabDefault = new RegExp('\\b' + this.classTabDefault + '\\b', 'gi');
  this.REclassTabHide = new RegExp('\\b' + this.classTabHide + '\\b', 'gi');
 
  /* Array of objects holding info about each tab */
  this.tabs = new Array();
 
  /* If the main tabber div was specified, call init() now */
  if (this.div) {
 
    this.init(this.div);
 
    /* We don't need the main div anymore, and to prevent a memory leak
       in IE, we must remove the circular reference between the div
       and the tabber object. */
    this.div = null;
  }
}
 
 
/*--------------------------------------------------
  Methods for tabberObj
  --------------------------------------------------*/
 
 
tabberObj.prototype.init = function(e)
{
  /* Set up the tabber interface.
 
     e = element (the main containing div)
 
     Example:
     init(document.getElementById('mytabberdiv'))
   */
 
  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab=0, /* which tab to select by default */
  DOM_ul, /* tabbernav list */
  DOM_li, /* tabbernav list item */
  DOM_a, /* tabbernav link */
  aId, /* A unique id for DOM_a */
  headingElement; /* searching for text to use in the tab */
 
  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) { return false; }
 
  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }
 
  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;
 
  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for(i=0; i < childNodes.length; i++) {
 
    /* Find the nodes where class="tabbertab" */
    if(childNodes[i].className &&
       childNodes[i].className.match(this.REclassTab)) {
 
      /* Create a new object to save info about this tab */
      t = new Object();
 
      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];
 
      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;
 
      /* If the class name contains classTabDefault,
	 then select this tab by default.
      */
      if (childNodes[i].className.match(this.REclassTabDefault)) {
	defaultTab = this.tabs.length-1;
      }
    }
  }
 
  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;
 
  /* Loop through each tab we found */
  for (i=0; i < this.tabs.length; i++) {
 
    t = this.tabs[i];
 
    /* Get the label to use for this tab:
       From the title attribute on the DIV,
       Or from one of the this.titleElements[] elements,
       Or use an automatically generated number.
     */
    t.headingText = t.div.title;
 
    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) { t.div.title = ''; }
 
    if (!t.headingText) {
 
      /* Title was not defined in the title of the DIV,
	 So try to get the title from an element within the DIV.
	 Go through the list of elements in this.titleElements
	 (typically heading elements ['h2','h3','h4'])
      */
      for (i2=0; i2<this.titleElements.length; i2++) {
	headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
	if (headingElement) {
	  t.headingText = headingElement.innerHTML;
	  if (this.titleElementsStripHTML) {
	    t.headingText.replace(/<br>/gi," ");
	    t.headingText = t.headingText.replace(/<[^>]+>/g,"");
	  }
	  break;
	}
      }
    }
 
    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
         number for the tab.
      */
      t.headingText = i + 1;
    }
 
    /* Create a list element for the tab */
    DOM_li = document.createElement("li");
 
    /* Save a reference to this list item so we can later change it to
       the "active" class */
    t.li = DOM_li;
 
    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
    DOM_a.onclick = this.navClick;
 
    /* Add some properties to the link so we can identify which tab
       was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;
 
    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {
 
      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i+1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));
 
      DOM_a.id = aId;
    }
 
    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);
 
    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }
 
  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);
 
  /* Make the tabber div "live" so different CSS can be applied */
  e.className = e.className.replace(this.REclassMain, this.classMainLive);
 
  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);
 
  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({tabber:this});
  }
 
  return this;
};
 
 
tabberObj.prototype.navClick = function(event)
{
  /* This method should only be called by the onClick event of an <A>
     element, in which case we will determine which tab was clicked by
     examining a property that we previously attached to the <A>
     element.
 
     Since this was triggered from an onClick event, the variable
     "this" refers to the <A> element that triggered the onClick
     event (and not to the tabberObj).
 
     When tabberObj was initialized, we added some extra properties
     to the <A> element, for the purpose of retrieving them now. Get
     the tabberObj object, plus the tab number that was clicked.
  */
 
  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */
 
  a = this;
  if (!a.tabber) { return false; }
 
  self = a.tabber;
  tabberIndex = a.tabberIndex;
 
  /* Remove focus from the link because it looks ugly.
     I don't know if this is a good idea...
  */
  a.blur();
 
  /* If the user specified an onClick function, call it now.
     If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {
 
    onClickArgs = {'tabber':self, 'index':tabberIndex, 'event':event};
 
    /* IE uses a different way to access the event object */
    if (!event) { onClickArgs.event = window.event; }
 
    rVal = self.onClick(onClickArgs);
    if (rVal === false) { return false; }
  }
 
  self.tabShow(tabberIndex);
 
  return false;
};
 
 
tabberObj.prototype.tabHideAll = function()
{
  var i; /* counter */
 
  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};
 
 
tabberObj.prototype.tabHide = function(tabberIndex)
{
  var div;
 
  if (!this.tabs[tabberIndex]) { return false; }
 
  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;
 
  /* Hide the tab contents by adding classTabHide to the div */
  if (!div.className.match(this.REclassTabHide)) {
    div.className += ' ' + this.classTabHide;
  }
  this.navClearActive(tabberIndex);
 
  return this;
};
 
 
tabberObj.prototype.tabShow = function(tabberIndex)
{
  /* Show the tabberIndex tab and hide all the other tabs */
 
  var div;
 
  if (!this.tabs[tabberIndex]) { return false; }
 
  /* Hide all the tabs first */
  this.tabHideAll();
 
  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;
 
  /* Remove classTabHide from the div */
  div.className = div.className.replace(this.REclassTabHide, '');
 
  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);
 
  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({'tabber':this, 'index':tabberIndex});
  }
 
  return this;
};
 
tabberObj.prototype.navSetActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that only one nav item can be active at a time.
  */
 
  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;
 
  return this;
};
 
 
tabberObj.prototype.navClearActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that one nav should always be active.
  */
 
  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';
 
  return this;
};
 
 
/*==================================================*/
 
 
function tabberAutomatic(tabberArgs)
{
  /* This function finds all DIV elements in the document where
     class=tabber.classMain, then converts them to use the tabber
     interface.
 
     tabberArgs = an object to send to "new tabber()"
  */
  var
    tempObj, /* Temporary tabber object */
    divs, /* Array of all divs on the page */
    i; /* Loop index */
 
  if (!tabberArgs) { tabberArgs = {}; }
 
  /* Create a tabber object so we can get the value of classMain */
  tempObj = new tabberObj(tabberArgs);
 
  /* Find all DIV elements in the document that have class=tabber */
 
  /* First get an array of all DIV elements and loop through them */
  divs = document.getElementsByTagName("div");
  for (i=0; i < divs.length; i++) {
 
    /* Is this DIV the correct class? */
    if (divs[i].className &&
	divs[i].className.match(tempObj.REclassMain)) {
 
      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }
 
  return this;
}
 
 
/*==================================================*/
 
 
function tabberAutomaticOnLoad(tabberArgs)
{
  /* This function adds tabberAutomatic to the window.onload event,
     so it will run after the document has finished loading.
  */
  var oldOnLoad;
 
  if (!tabberArgs) { tabberArgs = {}; }
 
  /* Taken from: http://simon.incutio.com/archive/2004/05/26/addLoadEvent */
 
  oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = function() {
      tabberAutomatic(tabberArgs);
    };
  } else {
    window.onload = function() {
      oldOnLoad();
      tabberAutomatic(tabberArgs);
    };
  }
}
 
 
/*==================================================*/
 
 
/* Run tabberAutomaticOnload() unless the "manualStartup" option was specified */
 
if (typeof tabberOptions == 'undefined') {
 
    tabberAutomaticOnLoad();
 
} else {
 
  if (!tabberOptions['manualStartup']) {
    tabberAutomaticOnLoad(tabberOptions);
  }
 
}
 
//THE CODES BELOW DEALS WITH ERA TEMPLATE
//codes courtesy of silent hill wiki.
 
function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;
 
    var titleDiv = document.getElementById(className);
 
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
 
function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}
 
function moveRating()
{
    var elements = getElementsByClass('ratings-top', document.getElementById('content'), 'div');
    if(elements[0] == null || elements[0] == undefined)
        return;
    var cloneNode = elements[0].cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
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
 
moveRating();
showEras('title-linktabs');
 
// END OF CODES FOR ERA
 
 
 
/* Button Factory
 * This javascript generates CSS for custom Monaco buttons. 
 * See http://help.wikia.com/wiki/Help:ButtonFactory
*/
$(function() {
$("#buttonFactory").html('<div><label><strong>Color:</strong></label> <input type="text" id="buttonFactory-input" size="12"> <strong>Type:</strong> <input type="radio" name="type" id="buttonFactory-type-primary" checked="checked"> Primary <input type="radio" name="type" id="buttonFactory-type-secondary"> Secondary <button onclick="buttonFactory.calculate()" id="buttonFactory-submit">Calculate</button></div><textarea id="buttonFactory-output" style="height: 300px"></textarea>');
});
 
  buttonFactory = {};
  buttonFactory.calculate = function() {
    var color = document.getElementById("buttonFactory-input").value.toLowerCase();
    if (buttonFactory.cssColorNames[color]) {
       color = buttonFactory.cssColorNames[color];
    }
    if (color.length == 3) {
      color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    }
    if (color.length == 6) {
      color = color.toUpperCase();
      var shade = buttonFactory.calculateShade(color);
      var tint = "FFFFFF";
      var stroke = buttonFactory.calculateStroke(color);
      var text = buttonFactory.calculateText(color);
      var textShadow = buttonFactory.calculateTextShadow(text);
      var secondary = (document.getElementById("buttonFactory-type-primary").checked) ? '' : '.secondary';
 
      var css ='';
      css += 'a.wikia-button' + secondary + ',\n'+
      'a.wikia-button' + secondary + ':visited,\n'+
      'span.wikia-button' + secondary + ' a,\n'+
      'span.wikia-button' + secondary + ' a:visited,\n'+
      'input[type="submit"]' + secondary + ',\n'+
      'input[type="reset"]' + secondary + ',\n'+
      'input[type="button"]' + secondary + ',\n'+
      'button' + secondary + ' {\n';
 
        css += '\tbackground-color: #'+ color +';\n'+
          '\tbackground-image: -moz-linear-gradient(top, #'+ color +' 20%, #'+ shade +' 70%);\n'+
          '\tbackground-image: -webkit-gradient(linear, 0% 20%, 0% 70%, from(#'+ color +'), to(#'+ shade +'));\n'+
          '\tborder-color: #'+ tint +';\n'+
          '\tbox-shadow: 0 1px 0 #'+ stroke +', 0 -1px 0 #'+ stroke +', 1px 0 0 #'+ stroke +', -1px 0 0 #'+ stroke +';\n'+
          '\tcolor: #'+ text +';\n'+
          '\t-moz-box-shadow: 0 0 0 1px #'+ stroke +';\n'+
          '\t-webkit-box-shadow: 0 1px 0 #'+ stroke +', 0 -1px 0 #'+ stroke +', 1px 0 0 #'+ stroke +', -1px 0 0 #'+ stroke +';\n'+
 
      '}';
 
      css += '\n\n/* IE Styles */\n';
 
      css += 'a.wikia-button' + secondary +',\n'+
      'span.wikia-button' + secondary + ' a,\n'+
      'input[type="submit"]' + secondary + ',\n'+
      'input[type="reset"]' + secondary + ',\n'+
      'input[type="button"]' + secondary + ',\n'+
      'button' + secondary + ' {\n';
 
          css += '\tfilter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr="#FF' + color + '", EndColorStr="#FF' + shade + '");\n'+
          '\toutline: 1px solid #' + stroke + '\\9;\n'+
 
      '}';
 
      css += '\n\n/* Hover and Active states */\n';
 
      css += 'a.wikia-button' + secondary +':hover,\n'+
      'span.wikia-button' + secondary + ' a:hover,\n'+
      'input[type="submit"]' + secondary + ':hover,\n'+
      'input[type="reset"]' + secondary + ':hover,\n'+
      'input[type="button"]' + secondary + ':hover,\n'+
      'button' + secondary + ':hover {\n';
 
          css += '\ttext-shadow: #' + textShadow + ' 0 1px 1px;\n'+
 
      '}';
 
      css += '\n\na.wikia-button' + secondary +':active,\n'+
      'span.wikia-button' + secondary + ' a:active,\n'+
      'input[type="submit"]' + secondary + ':active,\n'+
      'input[type="reset"]' + secondary + ':active,\n'+
      'input[type="button"]' + secondary + ':active,\n'+
      'button' + secondary + ':active {\n';
 
          css += '\tcolor: #' + text + ';\n'+
          '\tbackground-image: -moz-linear-gradient(top, #' + shade + ' 20%, #' + color + ' 70%);\n'+
          '\tbackground-image: -webkit-gradient(linear, 0% 20%, 0% 70%, from(#' + shade + '), to(#' + color + '));\n'+
 
      '}';
 
      document.getElementById("buttonFactory-output").innerHTML = css;
    } else {
      document.getElementById("buttonFactory-output").innerHTML = "Enter either a hex color value or a color keyword (like 'blue')";
    }
  }
  buttonFactory.calculateTextShadow = function(color) {
    if (color == "000000") {
      return "FFFFFF";
    } else {
      return "000000";
    }
  }
  buttonFactory.calculateText = function(color) {
    rgb = buttonFactory.hex2rgb(color);
    var black = 0;
    var white = 0;
    for (var i=0; i<rgb.length; i++) {
      black += rgb[i];
      white += (255 - rgb[i]);
    }
    if (black - white >=0) {
      return "000000";
    } else {
      return "FFFFFF";
    }
  }
  buttonFactory.calculateStroke = function(color) {
    rgb = buttonFactory.hex2rgb(color);
    for(var i=0; i<rgb.length; i++) {
      rgb[i] = Math.floor(rgb[i] * .3);
    }
    return buttonFactory.rgb2hex(rgb);
  }
  buttonFactory.calculateShade = function(color) {
    rgb = buttonFactory.hex2rgb(color);
    for(var i=0; i<rgb.length; i++) {
      rgb[i] = Math.floor(rgb[i] * .8);
    }
    return buttonFactory.rgb2hex(rgb);
  }
  buttonFactory.rgb2hex = function(rgb) {
    var char = "0123456789ABCDEF";
    var hex = "";
    for(var i = 0; i<rgb.length; i++) {
      hex += String(char.charAt(Math.floor(rgb[i] / 16)));
      hex += String(char.charAt(rgb[i] - (Math.floor(rgb[i] / 16) * 16)));
    }
    return hex;
  } 
  buttonFactory.hex2rgb = function(hex) {
    var rgb = [];
    rgb.push(parseInt(hex.substring(0,2), 16));
    rgb.push(parseInt(hex.substring(2,4), 16));
    rgb.push(parseInt(hex.substring(4,6), 16));
    return rgb;
  }
  buttonFactory.cssColorNames = {"aliceblue" : "F0F8FF", "antiquewhite" : "FAEBD7", "aqua" : "00FFFF", "aquamarine" : "7FFFD4", "azure" : "F0FFFF", "beige" : "F5F5DC", "bisque" : "FFE4C4", "black" : "000000", "blanchedalmond" : "FFEBCD", "blue" : "0000FF", "blueviolet" : "8A2BE2", "brown" : "A52A2A", "burlywood" : "DEB887", "cadetblue" : "5F9EA0", "chartreuse" : "7FFF00", "chocolate" : "D2691E", "coral" : "FF7F50", "cornflowerblue" : "6495ED", "cornsilk" : "FFF8DC", "crimson" : "DC143C", "cyan" : "00FFFF", "darkblue" : "00008B", "darkcyan" : "008B8B", "darkgoldenrod" : "B8860B", "darkgray" : "A9A9A9", "darkgreen" : "006400", "darkkhaki" : "BDB76B", "darkmagenta" : "8B008B", "darkolivegreen" : "556B2F", "darkorange" : "FF8C00", "darkorchid" : "9932CC", "darkred" : "8B0000", "darksalmon" : "E9967A", "darkseagreen" : "8FBC8F", "darkslateblue" : "483D8B", "darkslategray" : "2F4F4F", "darkturquoise" : "00CED1", "darkviolet" : "9400D3", "deeppink" : "FF1493", "deepskyblue" : "00BFFF", "dimgray" : "696969", "dodgerblue" : "1E90FF", "firebrick" : "B22222", "floralwhite" : "FFFAF0", "forestgreen" : "228B22", "fuchsia" : "FF00FF", "gainsboro" : "DCDCDC", "ghostwhite" : "F8F8FF", "gold" : "FFD700", "goldenrod" : "DAA520", "gray" : "808080", "green" : "008000", "greenyellow" : "ADFF2F", "honeydew" : "F0FFF0", "hotpink" : "FF69B4", "indianred " : "CD5C5C", "indigo " : "4B0082", "ivory" : "FFFFF0", "khaki" : "F0E68C", "lavender" : "E6E6FA", "lavenderblush" : "FFF0F5", "lawngreen" : "7CFC00", "lemonchiffon" : "FFFACD", "lightblue" : "ADD8E6", "lightcoral" : "F08080", "lightcyan" : "E0FFFF", "lightgoldenrodyellow" : "FAFAD2", "lightgrey" : "D3D3D3", "lightgreen" : "90EE90", "lightpink" : "FFB6C1", "lightsalmon" : "FFA07A", "lightseagreen" : "20B2AA", "lightskyblue" : "87CEFA", "lightslategray" : "778899", "lightsteelblue" : "B0C4DE", "lightyellow" : "FFFFE0", "lime" : "00FF00", "limegreen" : "32CD32", "linen" : "FAF0E6", "magenta" : "FF00FF", "maroon" : "800000", "mediumaquamarine" : "66CDAA", "mediumblue" : "0000CD", "mediumorchid" : "BA55D3", "mediumpurple" : "9370D8", "mediumseagreen" : "3CB371", "mediumslateblue" : "7B68EE", "mediumspringgreen" : "00FA9A", "mediumturquoise" : "48D1CC", "mediumvioletred" : "C71585", "midnightblue" : "191970", "mintcream" : "F5FFFA", "mistyrose" : "FFE4E1", "moccasin" : "FFE4B5", "navajowhite" : "FFDEAD", "navy" : "000080", "oldlace" : "FDF5E6", "olive" : "808000", "olivedrab" : "6B8E23", "orange" : "FFA500", "orangered" : "FF4500", "orchid" : "DA70D6", "palegoldenrod" : "EEE8AA", "palegreen" : "98FB98", "paleturquoise" : "AFEEEE", "palevioletred" : "D87093", "papayawhip" : "FFEFD5", "peachpuff" : "FFDAB9", "peru" : "CD853F", "pink" : "FFC0CB", "plum" : "DDA0DD", "powderblue" : "B0E0E6", "purple" : "800080", "red" : "FF0000", "rosybrown" : "BC8F8F", "royalblue" : "4169E1", "saddlebrown" : "8B4513", "salmon" : "FA8072", "sandybrown" : "F4A460", "seagreen" : "2E8B57", "seashell" : "FFF5EE", "sienna" : "A0522D", "silver" : "C0C0C0", "skyblue" : "87CEEB", "slateblue" : "6A5ACD", "slategray" : "708090", "snow" : "FFFAFA", "springgreen" : "00FF7F", "steelblue" : "4682B4", "tan" : "D2B48C", "teal" : "008080", "thistle" : "D8BFD8", "tomato" : "FF6347", "turquoise" : "40E0D0", "violet" : "EE82EE", "wheat" : "F5DEB3", "white" : "FFFFFF", "whitesmoke" : "F5F5F5", "yellow" : "FFFF00", "yellowgreen" : "9ACD32"};
 
 
 
 
function GetBlip(){
 var blip_elements = getElementsByClassName(document.getElementById('bodyContent'),'div','video_blip');
 for(var i = 0; i < blip_elements.length; i++){
  blip_elements[i].innerHTML = "<embed width=\""+ blip_elements[i].style.width + "\" height=\""+ blip_elements[i].style.height +"\" src=\""+ blip_elements[i].firstChild.href +"\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\"></embed>";
 }
}
GetBlip();
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Custom edit buttons
 
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020115943/central/images/c/cb/Button_wikipedia.png",
     "speedTip": "Link to Wikipedia",
     "tagOpen": "[[wikipedia:",
     "tagClose": "]]",
     "sampleText": "Insert text"}
}
 
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/6/60/Button_support.png",
     "speedTip": "Support",
     "tagOpen": ":{{",
     "tagClose": "}}:",
     "sampleText": "support"}
}
 
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/4/4f/Button_neutral.png",
     "speedTip": "Neutral",
     "tagOpen": ":{{",
     "tagClose": "}}:",
     "sampleText": "neutral"}
}
 
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
     "speedTip": "Oppose",
     "tagOpen": ":{{",
     "tagClose": "}}:",
     "sampleText": "oppose"}
}

// Purge Button
 
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

// Reveal AnonIP
 
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});