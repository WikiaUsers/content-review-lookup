importArticles({
   type: 'script',
   articles: [
       'u:dev:MediaWiki:Tooltips.js',
   ]
});

importScript('MediaWiki:Imagemap-Highlight.js');
// **************************************************
// Zmiana teł w zależności od pory dnia
// **************************************************
$(function () {
	var d = new Date();
	if (d.getHours() < 6) {
		document.body.className += ' BG3';
		document.getElementById('WikiaPage').className += ' BG3-page';
	} else if (d.getHours() < 13) {
		document.body.className += ' BG2';
		document.getElementById('WikiaPage').className += ' BG2-page';
	} else if (d.getHours() < 20) {
		document.body.className += ' BG1';
		document.getElementById('WikiaPage').className += ' BG1-page';
	} else if (d.getHours() < 24) {
		document.body.className += ' BG3';
		document.getElementById('WikiaPage').className += ' BG3-page';
	}
});
 
$('#WikiaPageBackground').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"></div>');

/* Skrypt odpowiedzialny za wyświetlanie szablonu Nagłówek [[Szablon:Nagłówek]] */
 addOnloadHook( function() {
  var hideAll=(document.getElementById('mojNaglowekUryj'));
  var noFooter=false;
  var tags = document.getElementsByTagName('div');
  var footers = 0;
  for (var i = 0; i < tags.length; i++) {
    var el=tags[i].getAttribute("id");
    if (el=='mojaStopka') 
       footers++;
    else
    if (hideAll && (el=='mojNaglowek'))
      {
      tags[i].innerHTML="";
      noFooter=true;
      }
  }
  if (noFooter) return;
  var footer = document.getElementById('mojaStopka');
  if ((footer != null) && (footers==1)) {
    var content = document.getElementById('content');
    if (content != null)
       {
       var s0=document.getElementById('mojaStopka0');
       var s1=document.getElementById('mojaStopka1');
       if ((s1 != null) ||
           ((s0 == null) && (content.innerHTML.length>8000)))
         content.innerHTML+=footer.innerHTML;
       }
    }
 });
/* Koniec skryptu odpowiedzialny za wyświetlanie szablonu Nagłówek [[Szablon:Nagłówek]] */
 
 
/* Skrypt odpowiedzialny za wyświetlanie galerii obrazków [[Szablon:Galeria]] */
function returnObjById( id ) 
{ 
    if (document.getElementById) 
        var returnVar = document.getElementById(id); 
    else if (document.all) 
        var returnVar = document.all[id]; 
    else if (document.layers) 
        var returnVar = document.layers[id];
    return returnVar; 
}
 
function toggleImage(group, remindex, shwindex) {
  returnObjById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
  returnObjById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}
function ImageGroup(){
  if (document.URL.match(/printable/g)) return;
  var divs=document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length ; i++) {
    if (divs[i].className != "ImageGroup") continue;
    UnitNode=undefined;
    search=divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length ; j++) {
      if (search[j].className != "ImageGroupUnits") continue;
      UnitNode=search[j];
      break;
    }
    if (UnitNode==undefined) continue;
    units=Array();
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className=="center") units.push(temp);
    }
    for (j = 0 ; j < units.length ; j++) {
      currentimage=units[j];
      currentimage.id="ImageGroupsGr"+i+"Im"+j;
      var imghead = document.createElement("div");
      var leftlink = document.createElement("a");
      var rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
        leftlink.innerHTML="◀";
      }
      if (j != units.length - 1) {
        rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
        rightlink.innerHTML="▶";
      }
      var comment = document.createElement("tt");
      comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
      with(imghead) {
        style.fontSize="110%";
        style.fontweight="bold";
        appendChild(leftlink);
        appendChild(comment);
        appendChild(rightlink);
      }
      currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
}
addOnloadHook(ImageGroup);
/* Koniec skryptu odpowiedzialnego za wyświetlanie galerii obrazków [[Szablon:Galeria]] */
 
/* Skrypt odpowiedzialny za zmianę napisu na zakładce treść - pierwszej od lewej [[Szablon:Autorinfo]] oraz [[Szablon:PostępPrac]]*/
addOnloadHook(function()
{
   //first tab
   var tab1 = document.getElementById("ca-nstab-main");
   if(tab1) {
          var t = tab1.firstChild
          if (document.getElementById("Author")) {
                  t.title="Zobacz stronę autora ["+tooltipAccessKeyPrefix+"c]";
                  t.firstChild.textContent="autor"
          }
          q = document.getElementById("textquality")
          if (q) {
                var src = {
                    "0%":   "http://upload.wikimedia.org/wikipedia/commons/8/8f/00%25.png",
                    "25%":  "http://upload.wikimedia.org/wikipedia/commons/5/5b/25%25.png",
                    "50%":  "http://upload.wikimedia.org/wikipedia/commons/3/3a/50%25.png",
                    "75%":  "http://upload.wikimedia.org/wikipedia/commons/c/cd/75%25.png",
                    "100%": "http://upload.wikimedia.org/wikipedia/commons/6/64/100%25.png" 
                }
                if (src[q.className]) {
                    var i = document.createElement("img");
                    i.className = "textquality-image";
                    i.src = src[q.className];
                    i.width = 9;
                    i.height = 9;
                    t.appendChild(i);
                }
           }
       }
});
/* Koniec skryptu odpowiedzialnego za zmianę napisu na zakładce treść - pierwszej od lewej */
 
/* Skrypt odpowiedzialny za dodatkowe informacje interwiki [[Szablon:Interwiki-info]] */
addOnloadHook(function() 
{
   // iterate over all <span>-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a linkInfo span
      if(a.className == "interwiki-info") {
         // iterate over all <li>-elements
         var count=0;
 
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            if(b.className == "interwiki-" + a.id) {
               b.innerHTML = b.innerHTML + " "+a.title;
               if(a.title == "(org.)") { b.title = "Tekst oryginalny"; }
            }
         else if(b.className == "interwiki-" + a.id.substr(0,a.id.length-1)) {
               count = count+1;
               if(a.id.charAt(a.id.length-1) == count) {
                  b.innerHTML = b.innerHTML + " "+a.title;
               }
            }
         }
      }
   }
});
/* Koniec skryptu odpowiedzialnego za dodatkowe informacje interwiki */
 
/* Skrypt odpowiedzialny za dodanie do wszystkich interwiki możliwości porównania wersji językowych - ⇔ */
addOnloadHook(function() 
{
    if( wgNamespaceNumber != 0) return;
    var doc_url = document.URL;
    var url = '';
    // iterate over all <li>-elements
    for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
         if(b.className.substring(0,10) == "interwiki-" ) {
               var lang = b.className.substring(10,b.className.length);
               if( doc_url.indexOf('?title=') != -1 ) { 
                   var qm  = doc_url.indexOf('&match=');
                   if( qm != -1 ) url = doc_url.substring(0,qm)+"&match="+lang;
                   else url = doc_url+"&match="+lang;
               } else {
                   var qm  = doc_url.indexOf('?');
                   if( qm != -1 ) url = doc_url.substring(0,qm)+"?match="+lang;
                   else url = doc_url+"?match="+lang;
               }
               b.innerHTML = b.innerHTML+'<a href="'+url+'" title="Porównaj z wersją w tym języku"> ⇔</a>';
             }
         }
});
/* Koniec skryptu odpowiedzialnego za dodanie do interwiki możliwości porównania wersji językowych - ⇔ */
 
/* Skrypt odpowiedzialny za znaki specjalne [[MediaWiki:Edittools]] */
addOnloadHook(function() {
  var specialchars = document.getElementById('specialchars');
 
  if (specialchars) {
    var menu = "<select style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>Polskie</option>";
    menu += "<option>Łacińskie</option>";
    menu += "<option>Cyrylica</option>";
    menu += "<option>Greckie</option>";
    menu += "<option>Dodatkowe</option>";
    menu += "<option>Wiki</option>";
    menu += "<option>Szablony licencji</option>";
    menu += "<option>Arabskie i hebrajskie</option>";
    menu += "<option>Gruzińskie i ormiańskie</option>";
    menu += "</select>";
    specialchars.innerHTML = menu + specialchars.innerHTML;
 
    /* default subset - try to use a cookie some day */
    chooseCharSubset(0);
  }
});
 
/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
}
/* Koniec skryptu odpowiedzialnego za znaki specjalne */