/* <nowiki> */

/**********************************************************/
/* JavaScript here is loaded for all users and all skins. */
/**********************************************************/

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('CollapsibleEdittools/code.js', 'dev');

importScriptPage('ShowHide2/code.js', 'dev');

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

/***************************************************/
/* Replaces {{USERNAME}} with the name of the user */
/***************************************************/
/* Requires copying Template:USERNAME. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/***********************************************************/
/* Sliders using jquery by User:Tierrie in Dragon Age Wiki */
/***********************************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

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

/* </nowiki> */


/******************************************
/* New Tooltip System                    */
/*****************************************/

/* Special thanks to Vanguard wiki for helping me learn from their tooltip display code and create one for AoEo Wiki. --Late Rental*/

var tooltip=function(){
  var id = 'tooltip_mouseover';
  var top = 3;
  var left = 15;
  var maxwidth = 260;
  var speed = 10;
  var timer = 20;
  var endalpha = 95;
  var alpha = 0;
  var tt,h;
  var ie = document.all ? true : false;
  var ttArray = new Array();
  var current_article;
  return{
    create:function(v,w){
      if(tt == null){
        tt  = document.createElement('div');
        tt.setAttribute('id',id);
        document.body.appendChild(tt);
        tt.style.opacity  = 0;
        tt.style.filter  = 'alpha(opacity=0)';
        document.onmousemove  = this.pos;
      }
      tt.style.display  = 'block';
      tt.innerHTML =  v;
      tt.style.width  = w ? w + 'px' : 'auto';

      if(!w  && ie){
        tt.style.width  = tt.offsetWidth;
      }

      if(tt.offsetWidth  > maxwidth){
        tt.style.width = maxwidth + 'px';
      }

      h = parseInt(tt.offsetHeight) + top;
      clearInterval(tt.timer);
      tt.timer =  setInterval(function(){tooltip.fade(1)},timer);
    },
    pos:function(e){
      var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
      var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
      tt.style.top = (u-h) + 'px';
      tt.style.left = (l + left) + 'px';
    },
    fade:function(d){
      var a = alpha;
      if((a != endalpha && d == 1) || (a != 0 && d == -1)){
        var i = speed;
        if(endalpha - a < speed && d == 1){
          i = endalpha - a;
        }else if(alpha < speed && d == -1){
          i = a;
        }
        alpha = a + (i * d);
        tt.style.opacity = alpha * .01;
        tt.style.filter = 'alpha(opacity=' + alpha + ')';
      }else{
        clearInterval(tt.timer);
        if(d == -1){tt.style.display = 'none'}
      }
    },
    hide:function(){
      if (tt != null) {
        clearInterval(tt.timer);
        tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
      }
    },
    show:function(article){
      current_article = article;
      if (ttArray[article] == null) {
        tooltip.create('Retrieving information...', 300);
//        var rankSearchStr = new RegExp('_[VXI]+$','i');
//        var rankStart = article.search(rankSearchStr);
        var rank = null;
//        if (rankStart != -1) {
//          rank = article.substr(rankStart);
//          article = article.substr(0,rankStart);
//        }
        if (tooltip.access(article, rank) == false) {
          tt.innerHTML = 'Sorry, your browser is not compatible with tooltips.';
        }
      } else {
        tooltip.create(ttArray[article], 300);
      }
    },
    update:function(httpRequest,article,rank) {
      if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
          if (tt != null && (current_article == article || current_article == article+rank)) {
            var searchStr = new RegExp('Click here to start this page!');
            if ((httpRequest.responseText).search(searchStr) != -1) {
              tt.innerHTML = 'This article does not yet exist.';
            } else {
              // Parse the response to see if there's something we can display
              var fixed_article=article.replace("'",".27");
              // Ignore bracketed suffix
              var bracketSearchStr = new RegExp('_[(]+','i');
              var bracketStart = fixed_article.search(bracketSearchStr);
              var bracketedPart = null;
              if (bracketStart != -1) {
                bracketedPart = fixed_article.substr(bracketStart);
                fixed_article = fixed_article.substr(0,bracketStart);
              }
              if (rank == null)
                searchStr = new RegExp('<table id=\"ttinfo_'+fixed_article+'\"','i');
              else
                searchStr = new RegExp('<table id=\"ttinfo_'+fixed_article+rank+'\"','i');
              var startPoint = (httpRequest.responseText).search(searchStr);
              if (startPoint != -1) {
                var endPoint = ((httpRequest.responseText).substr(startPoint)).search(/<\/table>/);
                if (endPoint != -1) {
                  tt.innerHTML = (httpRequest.responseText).substr(startPoint,endPoint)+'</table>';
                  if (rank == null)
                    ttArray[article] = (httpRequest.responseText).substr(startPoint,endPoint)+'</table>';
                  else
                    ttArray[article+rank] = (httpRequest.responseText).substr(startPoint,endPoint)+'</table>';
                  if (bracketedPart == "_(card)" || bracketedPart == "_(Card)") {
                    tt.style.width = "109px";
                  }
                  return;
                }
              }     
              tt.innerHTML = 'This article does not yet have a properly formatted tooltip.';
            }
          }
          h = parseInt(tt.offsetHeight) + top;
        } else {
          if (tt != null) {
            tt.innerHTML = 'Could not retrieve information.';
          }
        }
      }
    },
    access:function(article,rank) {
      var httpRequest;
      if (window.XMLHttpRequest) { 
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
          httpRequest.overrideMimeType('text/xml');
        }
      } 
      else if (window.ActiveXObject) {
        try {
          httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
          try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
          } 
          catch (e) {}
        }
      }
      if (!httpRequest) {
        // Browser incompatible with AJAX
        return false;
      }
      httpRequest.onreadystatechange = function() { tooltip.update(httpRequest,article,rank); };
      // httpRequest.open('GET', 'http://laterental.wikia.com/index.php?action=raw&ctype=text/css&title='+article+'&templates=expand&section=0', true);
      // Try full page request for now
      httpRequest.open('GET', 'http://laterental.wikia.com/index.php?title='+article, true);
      httpRequest.send('');
    }
  };
}();

/* Check for tooltip links when document finishes loading */
function mouseoverTooltip(article) {
  // Hack to get around weird wiki stuff
  article=article.replace(".27", "'");
  article=article.replace(".28", "(");
  article=article.replace(".29", ")");

  return function() {
    tooltip.show((article));
  };
}

function putTooltips(){
  var spanArray = document.getElementsByTagName("span");
  for (var i=0 ; i<spanArray.length ; i++){
    if (spanArray[i].className == "tooltip_link") {
      spanArray[i].onmouseover = mouseoverTooltip((spanArray[i].id).substr(3));
      spanArray[i].onmouseout = function(){tooltip.hide()};
      // Change link inside to mouseover link style
      var tlink = spanArray[i].getElementsByTagName("a");
      if (tlink[0]){
//        tlink[0].style.background = "transparent url(http://images3.wikia.nocookie.net/__cb20100515030641/Vanguard/images/f/fd/Tooltip_icon.png) no-repeat scroll center left";
//        tlink[0].style.paddingLeft = "20px";
//        tlink[0].style.fontSize = "12px";
//        tlink[0].style.height = "16px";
//        tlink[0].style.fontWeight = "bold";
        tlink[0].style.color = "";
      }
    }
  }
}

if (window.addEventListener)
  window.addEventListener("load", putTooltips, false);
else if (window.attachEvent)
  window.attachEvent("onload", putTooltips);
else if (document.getElementById)
  window.onload=putTooltips();
  
/*
 *
 * ======= Vanguard map locator maps ======== 
 *
 *
 */												

var mapInstances = new Array();
                          
function LocationMap() {
  var mapsize = 256;
  var markerclass = 'mapmarker';
  var httpRequest;
  var divElement;
  var locations = new Array();
  var chunkx,chunky;
  
  /* Place the map markers once the map image has loaded */  
  this.placeMarkers = function() {
    var marker;
    for (var i = 0; i < locations.length; i++) {
    
      /* Validate the coordinates each time, just in case */
      var coords = locations[i].split(",");
      if (coords.length < 2 
      || isNaN(coords[0]) || Number(coords[0]) < -102435 || Number(coords[0]) > 102435
      || isNaN(coords[1]) || Number(coords[1]) < -102435 || Number(coords[1]) > 102435)
        continue;
        
      /* Calculate where on the image the marker should be displayed */
      var xpixel = Math.floor(((Number(coords[0]) + 102435) / 204870) * (mapsize-1))+1;
      var ypixel = Math.floor((Number(coords[1])/ 204870) * (mapsize-1))+1;
      
      /* Add the marker to the document */
      marker = document.createElement('img');
      marker.setAttribute('class',markerclass);
      divElement.appendChild(marker);
      marker.style.opacity  = 0.9;
      marker.style.filter  = 'alpha(opacity=0.9)';
      marker.src = "https://images.wikia.nocookie.net/vanguard/images/d/df/MapReticle.png";
      marker.style.position = 'relative';
      marker.style.left = xpixel+'px';
      marker.style.top = ypixel+'px';
      marker.style.zIndex = 150;
      marker.style.margin = '-2px';
      if (coords.length > 3) {
        marker.alt = coords[3]+': '+coords[0]+', '+coords[1]+', '+coords[2]+' in ['+chunkx+', '+chunky+']';
        marker.title = coords[3]+': '+coords[0]+', '+coords[1]+', '+coords[2]+' in ['+chunkx+', '+chunky+']';
      } else if (coords.length == 3) {

        marker.alt = coords[0]+', '+coords[1]+', '+coords[2]+' in ['+chunkx+', '+chunky+']';
        marker.title = coords[0]+', '+coords[1]+', '+coords[2]+' in ['+chunkx+', '+chunky+']';
      }
    }
  
  }
  
  this.update = function() {
    if (httpRequest.readyState == 4) {
      if (httpRequest.status == 200) {
        var searchStr = new RegExp('No file by this name exists');
        if ((httpRequest.responseText).search(searchStr) != -1) {
          divElement.innerHTML = 'Unable to load the map scroll.';
        } else {
          // Ignore bracketed suffix
          searchStr = new RegExp('<img alt=\"File:MapChunk -?[0-9]* -?[0-9]*.jpg" src="','i');
          var startPoint = (httpRequest.responseText).search(searchStr);
          if (startPoint != -1) {
            var endPoint = ((httpRequest.responseText).substr(startPoint)).search(/width="/);
            if (endPoint != -1) {
              divElement.innerHTML += (httpRequest.responseText).substr(startPoint,endPoint)+' class="locationmap_image" style="width: '+mapsize+'px; height: '+mapsize+'px;"/>';
              return;
            }
          }     
          divElement.innerHTML = 'Unable to pinpoint location.';
        } 
      }
    }  
  }
  
  this.access = function() {
    if (window.XMLHttpRequest) { 
    httpRequest = new XMLHttpRequest();
    if (httpRequest.overrideMimeType) {
      httpRequest.overrideMimeType('text/xml');
    }
    } 
    else if (window.ActiveXObject) {
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } 
    catch (e) {
      try {
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } 
      catch (e) {}
    }
    }
    if (!httpRequest) {
    // Browser incompatible with AJAX
    return false;
    }
    httpRequest.onreadystatechange = this.update;
    httpRequest.open('GET', 'http://laterental.wikia.com/index.php?title=File:MapChunk_'+chunkx+'_'+chunky+'.jpg', true);
    httpRequest.send('');
    return true;
  }
  
  this.show = function(element) {
    
    divElement = element;
    divElement.style.border = '1px solid #000';
    divElement.style.display = 'block';
    divElement.style.padding = '2px';
    divElement.style.fontColor = '';
    divElement.style.backgroundColor = '#222';
    divElement.style.backgroundImage =   'url("https://images.wikia.nocookie.net/vanguard/images/e/eb/Dark_background.png")';
    divElement.style.backgroundRepeat = 'repeat-x repeat-y';
    
    // Codestring should be in the form "scale|chunkx|chunky|x1,y1,z1|x2,y2,z2|..."
    var phrases = divElement.innerHTML.split("|");
    
    if (phrases.length < 4)
      return;
    if (isNaN(phrases[0]) || Number(phrases[0]) < 1 || Number(phrases[0]) > 800
     || isNaN(phrases[1]) || Number(phrases[1]) < -50 || Number(phrases[1]) > 50
     || isNaN(phrases[2]) || Number(phrases[2]) < -50 || Number(phrases[2]) > 50)
      return;
    
    chunkx = Number(phrases[1]);
    chunky = Number(phrases[2]);
    mapsize = Number(phrases[0]);

    divElement.style.width = mapsize+'px';
    divElement.style.height = mapsize+'px';
    
    for (var i = 3; i < phrases.length; i++) {
      if (phrases[i].length >= 5)
        locations.push(phrases[i]);
    }
    
    divElement.innerHTML = "";
    if (this.access() == false)
      divElement.innerHTML = 'Map could not be displayed.';
    else {
      this.placeMarkers();
    }
  }
    
}

var mapInstance;

function putLocationMaps(){
  var spanArray = document.getElementsByTagName("div");
  for (var i=0 ; i<spanArray.length ; i++){
    if (spanArray[i].className == "locationmap_div") {
	    mapInstance = new LocationMap();
      mapInstance.show(spanArray[i]);
      mapInstances.push(mapInstance);
    }
  }
}

if (window.addEventListener)
  window.addEventListener("load", putLocationMaps, false);
else if (window.attachEvent)
  window.attachEvent("onload", putLocationMaps);
else if (document.getElementById)
  window.onload=putLocationMaps();





/**************************************/
/***** New video function  ************/
/**************************************/

function Bonus(){
  var replace = document.getElementById("Bonus");

    if (null != replace) {
        var getvalue = replace.getAttribute("title");
        var mySplitResult = getvalue.split("<li />");
        for(i = 0; i < mySplitResult.length; i++){
	    /*document.write("<br /> Element " + i + " = " + mySplitResult[i]); */
        }
    }
}

var videonumber = 0;

function Video(){
  var replace = document.getElementById("Youtube");

if (null != replace) {

    var getvalue = replace.getAttribute("title");
    var mySplitResult = getvalue.split(",");
    for(i = 0; i < mySplitResult.length; i++){
	/*document.write("<br /> Element " + i + " = " + mySplitResult[i]); */
    }

   /* replace.innerHTML='<form><input type="button" value="'+mySplitResult.length+'" onclick="playpart1()" /></form>'
*/
    if(mySplitResult.length==1){
    replace.innerHTML='<iframe width="420" height="315" src="http://www.youtube.com/embed/'+mySplitResult[videonumber]+'" frameborder="0" allowfullscreen></iframe>';
    }
    else if(mySplitResult.length==2){
    replace.innerHTML='<iframe width="420" height="315" src="http://www.youtube.com/embed/'+mySplitResult[videonumber]+'" frameborder="0" allowfullscreen></iframe><form><input type="button" value="Part 1" onclick="playpart1()" /> <input type="button" value="Part 2" onclick="playpart2()" /></form>';
    }
    else if(mySplitResult.length==3){
    replace.innerHTML='<iframe width="420" height="315" src="http://www.youtube.com/embed/'+mySplitResult[videonumber]+'" frameborder="0" allowfullscreen></iframe><form><input type="button" value="Part 1" onclick="playpart1()" /> <input type="button" value="Part 2" onclick="playpart2()" /> <input type="button" value="Part 3" onclick="playpart3()" /></form>';
    }
    else if(mySplitResult.length==4){
    replace.innerHTML='<iframe width="420" height="315" src="http://www.youtube.com/embed/'+mySplitResult[videonumber]+'" frameborder="0" allowfullscreen></iframe><form><input type="button" value="Part 1" onclick="playpart1()" /> <input type="button" value="Part 2" onclick="playpart2()" /> <input type="button" value="Part 3" onclick="playpart3()" /> <input type="button" value="Part 4" onclick="playpart4()" /></form>';
    }
  }
}

function playpart1(){
    videonumber=0;
    Video();
}

function playpart2(){
    videonumber=1;
    Video();
}

function playpart3(){
    videonumber=2;
    Video();
}

function playpart4(){
    videonumber=3;
    Video();
}


function onloadhookcustom() {
  Video();
  Pastebin()
}

function Pastebin() {
var replace = document.getElementById("Pastebin");

if (null != replace) {
   var getvalue = replace.getAttribute("title");
   replace.innerHTML='<iframe src="http://pastebin.com/embed_iframe.php?i='+getvalue+'" style="border:none;width:100%;height:800px"></iframe>'
   }
}

if (window.addEventListener){window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}