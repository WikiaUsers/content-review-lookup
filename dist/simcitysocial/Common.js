/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
/** Collapsible tables *********************************************************
  */
 
importScriptPage('ShowHide/code.js', 'dev');
 

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
 
// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
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

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data.substring(0,NavigationBarHide.length) == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow + ' ' + NavToggle.firstChild.data.substring(NavigationBarHide.length);
 
     // if hidden now
     } else if (NavToggle.firstChild.data.substring(0,NavigationBarShow.length) == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide + ' ' +NavToggle.firstChild.data.substring(NavigationBarShow.length);
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
             indexNavigationBar++;
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
             for(var j=0;j < NavFrame.childNodes.length;j++) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
               // This is a hack particular to help.wikia for having the title clickable, meh
               if (hasClass(NavFrame.childNodes[j], "NavHeadToggle")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggleTitle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide + ' ' + NavFrame.childNodes[j].firstChild.nodeValue);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
                 NavFrame.childNodes[j].firstChild.nodeValue='';
               }
 
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(var i=1;i<=indexNavigationBar;i++) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars (experimantal)
// ============================================================
 
// ================================================================================
//  START dynamic topics for help.wikia
// ================================================================================
var dsHide = '[hide]';
var dsShow = '[show]';
var dsShowOne = true;
var dsEnnumerate = true;
function dynamicTopicsInit() {
  if(!document.getElementById('dynamictopicwrapper')) return
  var dtw = document.getElementById('dynamictopicwrapper');
  var out = document.getElementById('out');
  var h2 = getElementsByClassName(dtw,'span','mw-headline');
  var dt = getElementsByClassName(dtw,'div','dynamictopic');
  if(h2.length == dt.length) {
    for(var i=0;i<h2.length;i++) {
      var txt = h2[i].cloneNode(true);
      removeNodes(h2[i]);
      var a = document.createElement('a');
      a.setAttribute('href','javascript:dtShow(' + i + ',' + h2.length + ')');
      a.setAttribute('class','dtshowlink');
      a.appendChild(txt);
      var st = document.createElement('span');
      st.setAttribute('id','ds_' + i);
      st.setAttribute('class','dynamicstatus');
      st.appendChild(document.createTextNode(dsShow));
      a.appendChild(st);
      if(dsEnnumerate == true) h2[i].appendChild(document.createTextNode(i + 1 + '. '))
      h2[i].appendChild(a);
      dt[i].style.display = 'none';
      h2[i].id = 'dh_' + i;
      dt[i].id = 'dt_' + i;
    }
  }
}
addOnloadHook(dynamicTopicsInit);
function dtShow(num,total) {
  if(document.getElementById('dt_' + num).style.display == '') {
    document.getElementById('dt_' + num).style.display='none';
    removeNodes(document.getElementById('ds_' + num));
    document.getElementById('ds_' + num).appendChild(document.createTextNode(dsShow));
  } else {
    for(var i=0;i<total;i++) {
      if(i == num) {
        document.getElementById('dt_' + i).style.display='';
        removeNodes(document.getElementById('ds_' + i));
        document.getElementById('ds_' + i).appendChild(document.createTextNode(dsHide));
      } else {
        if(dsShowOne == true) {
          document.getElementById('dt_' + i).style.display='none';
          removeNodes(document.getElementById('ds_' + i));
          document.getElementById('ds_' + i).appendChild(document.createTextNode(dsShow));
        }
      }
    }
  }
}
 
function removeNodes(obj) {
  while(obj.firstChild) obj.removeChild(obj.firstChild);
}
 
// ================================================================================
//  END dynamic topics for help.wikia
// ================================================================================