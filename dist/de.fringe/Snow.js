$.getScript('http://de.fringe.wikia.com/wiki/MediaWiki:Browser.js?action=raw&ctype=text/javascript')
 .success(function(){
if( isMobile.iOS() || isMobile.BlackBerry() || isMobile.Android() || isMobile.Opera() || isMobile.Windows() || mw.util.getParamValue( 'useskin' ) == 'wikiamobile' ) {
$('.lcs-container').prepend('<div style="color:green; font-weight:bold; border:2px green solid; background-color:#befdaa;">Das Schneefallscript wird bald auch den Benutzern mit mobilen Geräten zur Verfügung stehen!</div>');
}
else {
var no = 25;                   // number of snowflakes
var speed = 10;                // the smaler, the faster snowflakes
var snowflake = "https://images.wikia.nocookie.net/__cb20141224103453/fringe/de/images/2/26/Snow.gif";    // picture source
var ns4b = (document.layers) ? 1 : 0;   // Netscape4.x
var b4up = (document.all) ? 1 : 0;      // MSIE4, Opera5, Netccape5
var dx, xp, yp;                // coordinate and position variables
var am, stx, sty;              // amplitude and step variables
var snowobj;
var i, doc_width = 800, doc_height = 600; // 800x600 screen-default

if (ns4b) {
   doc_width  = self.innerWidth;
   doc_height = self.innerHeight;
} else if (b4up) {
   doc_width  = document.body.clientWidth;
   doc_height = document.body.clientHeight;
} else {
   doc_width = document.documentElement.scrollWidth;
   doc_height = document.documentElement.scrollHeight;
   b4up = 1;
}// if

dx = new Array();
xp = new Array();
yp = new Array();
am = new Array();
stx = new Array();
sty = new Array();
snowobj = new Array();

for (i=0; i<no; ++i) {         // iterate for every snowflake
   dx[i] = 0;                  // set coordinate variables
   xp[i] = Math.random()*(doc_width-50); // set position variables
   yp[i] = Math.random()*doc_height;
   am[i] = Math.random()*20;             // set amplitude variables
   stx[i] = 0.02 + Math.random()/10;     // set step variables
   sty[i] = 0.7 + Math.random();         // set step variables
   if (ns4b) {                           // set layers
      document.write("<LAYER NAME=\"flake"+ i +"\" LEFT=\"15\" "
      + "TOP=\"15\" VISIBILITY=\"show\"><IMG SRC=\""
      + snowflake +"\" BORDER=0></LAYER>");
   } else if (b4up) {
     $('<img></img>')
  .prop({
    'src': snowflake,
    'id': 'flake' + i
  })
  .css({
    'position': 'absolute',
    'visibility': 'visible',
    'top': '15px',
    'left': '15px',
    'z-index': '1'
  })
  .appendTo('body');
      snowobj[i] = eval (document.getElementById("flake"+i).style);
   }//if
}//for

function snowNS() {            // Netscape4 main animation function
   for (i=0; i<no; ++i) {      // iterate for every snowflake
      yp[i] += sty[i];
      if (yp[i] > doc_height-50) {
         xp[i] = Math.random()*(doc_width-am[i]-30);
         yp[i] = 0;
         stx[i] = 0.02 + Math.random()/10;
         sty[i] = 0.7 + Math.random();
      }//if
         dx[i] += stx[i];
         document.layers["flake"+i].top = yp[i] + "px";
         document.layers["flake"+i].left = xp[i] + am[i]*Math.sin(dx[i]) + "px";
      }//for
   setTimeout("snowNS()", speed);
}//snowNS

window.snowDocument = function() {      // MSIE4, Opera5, Netscape5 main
   for (i=0; i<no; ++i) {      // iterate for every flake
      yp[i] += sty[i];
      if (yp[i] > doc_height-50) {
         xp[i] = Math.random()*(doc_width-am[i]-30);
         yp[i] = 0;
         stx[i] = 0.02 + Math.random()/10;
         sty[i] = 0.7 + Math.random();
      }//if
      dx[i] += stx[i];
      snowobj[i].top  = yp[i] + "px";
      snowobj[i].left = (xp[i] + am[i]*Math.sin(dx[i]) + doc_width - 50) % (doc_width - 50) + "px";
   }//for
   setTimeout("snowDocument()", speed);
}//snowDocument

if (ns4b) {                   // Netscape4
   snowNS();
} else if (b4up) {            // MSIE4, Opera5, Netscape5
   snowDocument();
}//if
}
});