/* Any JavaScript here will be loaded for all users on every page load. */

/* custom edit tools*/
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/geomag/images/a/a4/Geomag_construction.jpg",
     "speedTip": "Geomag Construction",
     "tagOpen": "{"+"{"+"Geomag-construction|PageTitle={"+"{s"+"ubst:PAGENAME"+"}"+"}"+"|Title={"+"{s"+"ubst:PAGENAME"+"}"+"}"+"|Filename=",
     "tagClose": "|Caption=\n|Type=\n|Triangles=|Squares=|Pentagons=|Rhombic=|Rods=|Spheres=|Author=~"+"~"+"~"+"~"+"}}",
     "sampleText": "No_image.jpg"};
}

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
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'already ';
  } else {
    var tpm = 'still ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// **************************************************
//  - start -  Experimental javascript image badge
// **************************************************

function getElementsByClassName_(node, tag, searchClass)
{
 var classElements = new Array();
 if (node == null)
 {
  node = document;
 }
 if (tag == null)
 {
  tag = '*';
 }
 var els = node.getElementsByTagName(tag);
 var elsLen = els.length;
 var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
 for (var i = 0, j = 0; i < elsLen; i++)
 {
  if (pattern.test(els[i].className))
  {
   classElements[j] = els[i];
   j++;
  }
 }
 return classElements;
}

function image_badge()
{
 //if (wgTitle!="Amafirlian")
 // return;
 //if (wgUserName != "Amafirlian")
 // return;
 //var dbg = getElementsByClassName_(document, 'div', 'debug');
 //dbg[0].innerHTML = "test";
 var img_div = getElementsByClassName_(document, 'div', 'image-badge');
 // dbg[0].innerHTML = "Found "+img_div.length+"image badges";
 for(var j=0;j<img_div.length;j++)
 {
  var nrdiv = getElementsByClassName_(img_div[j], 'div', 'image-badge-size');
  var img_hor = getElementsByClassName_(img_div[j], 'div', 'image-badge-orientation');
  var orient='Vertical';
  if (img_hor.length>0)
  {
   orient=img_hor[0].innerHTML;
  }
  var nr;
  if (nrdiv.length==0)
  {
   nr=8;
  }
  else
  {
   nr=parseInt(nrdiv[0].innerHTML);
  }
  var divs=getElementsByClassName_(img_div[j], 'div', 'thumb');
  var dates=img_div[j].getElementsByTagName("I");
  //dbg[0].innerHTML = "Found "+dates.length+" dates";
  //dbg[0].innerHTML = dates[0].innerHTML.substring(7);
  var hsh=new Object();
  var cnt=100; 

  var str='<table class="wikitable" cellpadding="0" cellspacing="10" border="0" align='+img_div[j].align+'>';
  if (orient=='Horizontal')
  {
   str+='<tr>';
  }
  for(var i=0;i<nr;i++)
  {
   var rnd=Math.floor(Math.random()*divs.length);
   if ((hsh[dates[rnd].innerHTML.substring(7)])&&(cnt-->0))
   {
    i--;
   }
   else
   {
    if (divs[rnd].innerHTML.match('ico">'))
    {
     i--;
    }
    else
    {
     if (orient!='Horizontal')
     {
      str+="<tr>";
     }
     str+="<td>"+divs[rnd].innerHTML+"</td>";
     if (orient!='Horizontal')
     {
      str+="</tr>";
     }
     hsh[dates[rnd].innerHTML.substring(7)]=1;
    }
   }
  }
  if (orient=='Horizontal')
  {
   str+='</tr>';
  }
  str+="</table>";
  img_div[j].innerHTML=str;
  img_div[j].style.display='block';
 }
}
addOnloadHook(image_badge);

function new_pages_table()
{
 //if (wgTitle!="Amafirlian")
 // return;
 //if (wgUserName != "Amafirlian")
 // return;
 //var dbg = getElementsByClassName_(document, 'div', 'debug');
 //dbg[0].innerHTML = "test";
 var newp_div = getElementsByClassName_(document, 'div', 'new-pages');
 //dbg[0].innerHTML = "Found "+newp_div.length+" new-page divs";
 for(var j=0;j<newp_div.length;j++)
 {
  var lis=newp_div[j].getElementsByTagName('li');
  //dbg[0].innerHTML = "Found "+lis.length+" entries";
  var str='<table class="forumlist" width="100%" style="padding: .5em; border: 1px solid #c9c9ff; color: #000; background-color: #f3f3ff;">';
  str+='<tr><th class="forum_title">Article</th><th class="forum_edited">Creation date</th><th class="forum_editor">Author</th></tr>';
  for(var i=0;i<lis.length;i++)
  {
   str+="<tr>";
   var as=lis[i].getElementsByTagName('a');
   as[1].innerHTML=lis[i].innerHTML.substring(0,lis[i].innerHTML.indexOf("<")-2);
   as[0].className="forum_new";
   str+='<td class="forum_title"><a href='+as[0].href+' title="'+as[0].title+'" class="forum_new">'+as[0].innerHTML+'</a></td>';
   str+='<td class="forum_edited"><a href='+as[1].href+' title="'+as[1].title+'">'+as[1].innerHTML+'</a></td>';
   str+='<td class="forum_editor"><a href='+as[2].href+' title="'+as[2].title+'" class="'+as[2].className+'">'+as[2].innerHTML+'</a></td>';
   str+="</tr>";
  }
  str+="</table>";
  newp_div[j].innerHTML=str;
  newp_div[j].style.display='block';
 }
}
addOnloadHook(new_pages_table);


// **************************************************
//  - end -  Experimental javascript extended table of contents
// **************************************************

/* Gray minor edits */
function addGrayMinorEditsStyle(){
  var minorEdits = getElementsByClassName(document, 'span', 'minor') //grab all minor edits
  for each ( minor_marker in minorEdits ){
    minor_marker.parentNode.className = minor_marker.parentNode.className + ' minor_edit'; //get the parent list item's class
  };
};

if(wgPageName=='Special:Contributions'){addOnloadHook(addGrayMinorEditsStyle)};//if we're on a contributions page run gray minor edits