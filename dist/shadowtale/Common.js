// main function to process the fade request //
function colorFade(id,element,start,end,steps,speed) {
  var startrgb,endrgb,er,eg,eb,step,rint,gint,bint,step;
  var target = document.getElementById(id);
  steps = steps || 20;
  speed = speed || 20;
  clearInterval(target.timer);
  endrgb = colorConv(end);
  er = endrgb[0];
  eg = endrgb[1];
  eb = endrgb[2];
  if(!target.r) {
    startrgb = colorConv(start);
    r = startrgb[0];
    g = startrgb[1];
    b = startrgb[2];
    target.r = r;
    target.g = g;
    target.b = b;
  }
  rint = Math.round(Math.abs(target.r-er)/steps);
  gint = Math.round(Math.abs(target.g-eg)/steps);
  bint = Math.round(Math.abs(target.b-eb)/steps);
  if(rint == 0) { rint = 1 }
  if(gint == 0) { gint = 1 }
  if(bint == 0) { bint = 1 }
  target.step = 1;
  target.timer = setInterval( function() { animateColor(id,element,steps,er,eg,eb,rint,gint,bint) }, speed);
}

// incrementally close the gap between the two colors //
function animateColor(id,element,steps,er,eg,eb,rint,gint,bint) {
  var target = document.getElementById(id);
  var color;
  if(target.step <= steps) {
    var r = target.r;
    var g = target.g;
    var b = target.b;
    if(r >= er) {
      r = r - rint;
    } else {
      r = parseInt(r) + parseInt(rint);
    }
    if(g >= eg) {
      g = g - gint;
    } else {
      g = parseInt(g) + parseInt(gint);
    }
    if(b >= eb) {
      b = b - bint;
    } else {
      b = parseInt(b) + parseInt(bint);
    }
    color = 'rgb(' + r + ',' + g + ',' + b + ')';
    if(element == 'background') {
      target.style.backgroundColor = color;
    } else if(element == 'border') {
      target.style.borderColor = color;
    } else {
      target.style.color = color;
    }
    target.r = r;
    target.g = g;
    target.b = b;
    target.step = target.step + 1;
  } else {
    clearInterval(target.timer);
    color = 'rgb(' + er + ',' + eg + ',' + eb + ')';
    if(element == 'background') {
      target.style.backgroundColor = color;
    } else if(element == 'border') {
      target.style.borderColor = color;
    } else {
      target.style.color = color;
    }
  }
}

// convert the color to rgb from hex //
function colorConv(color) {
  var rgb = [parseInt(color.substring(0,2),16), 
    parseInt(color.substring(2,4),16), 
    parseInt(color.substring(4,6),16)];
  return rgb;
}
$(function(){
//colorFade('fade', 'background', 'ffffff', 'ff0000', 64, 150);//
//The first parameter is the id of the element you are targeting. The second is the property to fade which can be the background, border or text. The third is the hex value of the starting color. The third is the hex value to fade to. The fourth and fifth are both optional. The first is the the number of times to divide the color difference and the last is the transition speed.//
});


document.getElementById('fade').onmouseover = function() { colorFade('fade', 'background', '000000', 'ffff00', 64, 30); };
document.getElementById('fade').onmouseout = function() { colorFade('fade', 'background', 'ffff00', '000000', 64, 30); };



/* Any JavaScript here will be loaded for all users on every page load. */


function onloadhookcustom() {
  var replace = document.getElementById("TestReplace");
if (null != replace) {
     replace.appendChild( document.createTextNode( "Click a number to see that episode" ) );
    var getvalue = replace.getAttribute("class");

            ArrayOfLinks = ["blip.tv/file/get/Rurikar-episode1689.flv","blip.tv/file/get/Rurikar-episode2103.flv","blip.tv/file/get/Rurikar-episode3869.flv","blip.tv/file/get/Rurikar-episode4247.flv","blip.tv/file/get/Rurikar-episode5338.flv","blip.tv/file/get/Rurikar-episode6945.flv","blip.tv/file/get/Rurikar-episode7294.flv","blip.tv/file/get/Rurikar-episode8155.flv","blip.tv/file/get/Rurikar-episode9447.flv"]; 
            var button = [,,,,,,,,,];
            var buttontext = [,,,,,,,,,];
            for(i=0;i<ArrayOfLinks.length;i++)
            {
                  
                  replace[button + i] = "test";
                  replace[buttontext + i]=document.createElement( "a" ); 
                  replace[button + i]=document.createTextNode( 'i' );
                  replace[button + i].setAttribute( "href", "javascript:playVideo('ArrayOfLinks'+i);"); 
                  //replace[button + i].appendChild( i );
                  replace.appendChild( document.createTextNode( " " ) );
                  replace.appendChild( replace[button + i] );
            }
  }
}
////New Video Player code Starts Here
function playVideo(getvalue) {
  var replace = document.getElementById("MusicReplace");
if (null != replace) {
    var getvalueofclass = replace.getAttribute("class");
  replace.innerHTML='<embed wmode="transparent" src="http://blip.tv/scripts/flash/blipplayer.swf?autoStart=true&file=http://'+getvalue+'" quality="low" width="625" height="350" name="movie"type="application/x-shockwave-flash"pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';

  }
}

////New Video Player code Ends

///HERE IS THE IRC REPLACER. made by Green Reaper & ShadowTale

//mydiv=document.createElement('div'); document.appendChild(mydiv);
function onloadhookcustomtwo() {
  var replace = document.getElementById("IRCReplace");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-khf" width="650" height="400" </iframe>';
  }
}













function onloadhookcustomthree() {
  var replace = document.getElementById("MusicReplace");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=Kongregate" width="650" height="400"></iframe>';


    /*replace.innerHTML='<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/XA9_oEI9Ocs&hl=en_US&fs=1&color1=0x3a3a3a&color2=0x999999"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/XA9_oEI9Ocs&hl=en_US&fs=1&color1=0x3a3a3a&color2=0x999999&autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';*/
  }
}

function onloadhookcustomfour() {
  var replace = document.getElementById("WolReplace");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<iframe src="http://www.activegamez.com/games/1740/chalice.html" width="800" height="616"></iframe>';
  }
}









if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);window.addEventListener("load",onloadhookcustomtwo,false);window.addEventListener("load",onloadhookcustomthree,false);window.addEventListener("load",onloadhookcustomfour,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);window.attachEvent("onload",onloadhookcustomtwo);window.attachEvent("onload",onloadhookcustomthree);window.attachEvent("onload",onloadhookcustomfour);}






/* Test if an element has a certain class **************************************
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
 

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "SHOW";
 
function collapseTable( tableIndex )
{
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
 
function createCollapseButtons()
{
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
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
           
            
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
addOnloadHook( createCollapseButtons );