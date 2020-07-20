//Wikimediaplayer, Based on wikiminiatlas by dschwen
//<pre>
var wikimediaplayer =
{
 wmpconfig:
 {
  width  : 400,
  height : 450,
  playerurl : 'http://tools.wikimedia.de/~gmaxwell/jorbis/JOrbisPlayer.php',
  buttonImage: 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nuvola_apps_kaboodle.png/18px-Nuvola_apps_kaboodle.png',
  largebuttonImage: 'http://upload.wikimedia.org/wikipedia/commons/0/0c/Nuvola_apps_kaboodle.png',
  imgbase   : 'http://tools.wikimedia.de/~dschwen/wikiminiatlas/tiles/'
 },

 strings:
 {
  buttonTooltip : {
   en:'Play media',
   es:'Reproducir'
  },
  hide: {
   en:'hide',
   es:'ocultar'
  },
  close : {
   de:'schließen',
   en:'close',
   eu:'itxi',
   es:'cerrar'
  }
 },

 link : null,
 links : null,

 language : 'es',
 iframe : { div: null, iframe: null, closebutton: null},

 playpath : '',

 // cross-browser event attachment (John Resig)
 // http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
 addEvent : function ( obj, type, fn )
 {
  if (obj.addEventListener)
   obj.addEventListener( type, fn, false );
  else if (obj.attachEvent)
  {
   obj["e"+type+fn] = fn;
   obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
   obj.attachEvent( "on"+type, obj[type+fn] );
  }
 },

  // vertikale position auf der Seite bestimmen
 totalOffset : function( obj, offset )
 {
  if( obj.offsetParent == null || 
      obj.offsetParent.id == 'content' )
   return offset + obj.offsetTop;
  else
   return wikimediaplayer.totalOffset(obj.offsetParent, offset + obj.offsetTop );
 },

 // move iframe around and toggle visibility
 toggleIFrame : function( e )
 {
  with(wikimediaplayer)
  {
   var newurl = this.playparam;

   if(iframe.div.style.visibility != "visible" ||
      ( ( iframe.iframe.src != newurl ) && ( this.playparam != '' ) ) )
   {
    if( iframe.iframe.src != newurl )
    {
     iframe.iframe.src = newurl;
    }
    iframe.div.style.top = (totalOffset( this, 0 ) + 20 ) + 'px';
    iframe.div.style.visibility="visible";
   }
   else {
    iframe.div.style.visibility="hidden";
    iframe.iframe.src = "";
   }
  }
  return false;
 },

 // Insert the IFrame into the page.
 loader : function()
 {
  // apply settings

  with(wikimediaplayer)
  {
   language = window.location.host.substr(0,2);
   var neediframe=0;
   links = document.getElementsByTagName('a');
   for( var key = 0; key < links.length; key++ )
   {
    link = links[key];
    if( link.href && 
        ( link.href.substr(0,wmpconfig.playerurl.length) == wmpconfig.playerurl ) )
    {
     playerlink = link.href;
   

      playbutton = document.createElement('img');
      playbutton.title = strings.buttonTooltip[language];
      playbutton.style.padding = '0px 3px 0px 0px';
      playbutton.style.cursor = 'pointer';
      playbutton.src = wmpconfig.buttonImage;
      playbutton.playparam = playerlink;
      addEvent( playbutton, 'click', toggleIFrame );
      link.playparam = playerlink;
      link.onclick = toggleIFrame ;
      neediframe=1;

      // link.parentNode.insertBefore(playbutton, link.nextSibling);
      link.parentNode.insertBefore(playbutton,link);
     }
   } //for

   //Big icon for image pages.
   if (wgNamespaceNumber==6){
   divi = document.getElementById('file');
   if (!divi)
     return;
   links = divi.getElementsByTagName('a');
   var filere= /\/([^\/]*?.[Oo][Gg][Gg])$/
   for( var key = 0; key < links.length; key++ )
   {
    link = links[key];
    if( link.href && 
        ( filere.test(link.href) ))
    {
     filere.exec(link.href)
     playerlink = wmpconfig.playerurl + '?path=' + RegExp.$1;

      playbutton = document.createElement('img');
      playbutton.title = strings.buttonTooltip[language];
      playbutton.style.padding = '0px 3px 0px 0px';
      playbutton.style.cursor = 'pointer';
      playbutton.src = wmpconfig.largebuttonImage;
      playbutton.playparam = playerlink;
      addEvent( playbutton, 'click', toggleIFrame );
      neediframe=1;

      // link.parentNode.insertBefore(playbutton, link.nextSibling);
      link.parentNode.insertBefore(playbutton,link);
     }
   } //for link
   }

   if (neediframe==1) {
     // iframe vorbereiten
     iframe.div = document.createElement('div');
     iframe.div.style.visibility = 'hidden';
     iframe.div.style.width = (wmpconfig.width+12)+'px';
     iframe.div.style.height = (wmpconfig.height+12)+'px';
     iframe.div.style.margin = '0px';
     iframe.div.style.padding = '0px';
     iframe.div.style.backgroundColor = 'white';
     iframe.div.style.position = 'absolute';
     iframe.div.style.right = '2em';
     iframe.div.style.top = '1em';
     iframe.div.style.border = '1px solid gray';
     iframe.div.style.zIndex = 13;

     iframe.hidebutton = document.createElement('img');
     iframe.hidebutton.title = strings.hide[language];
     iframe.hidebutton.src = 'http://upload.wikimedia.org/wikipedia/commons/d/d4/Button_hide.png';
     iframe.hidebutton.style.zIndex = 15;
     iframe.hidebutton.style.position = 'absolute';
     iframe.hidebutton.style.right = '42px';
     iframe.hidebutton.style.top = '11px';
     iframe.hidebutton.style.width = '18px';
     iframe.hidebutton.style.cursor = 'pointer';
     addEvent( iframe.hidebutton, 'click', function() { wikimediaplayer.iframe.div.style.visibility = "hidden" } );

     iframe.closebutton = document.createElement('img');
     iframe.closebutton.title = strings.close[language];
     iframe.closebutton.src = 'http://upload.wikimedia.org/wikipedia/commons/9/97/WikEd_close.png';
     iframe.closebutton.style.zIndex = 15;
     iframe.closebutton.style.position = 'absolute';
     iframe.closebutton.style.right = '11px';
     iframe.closebutton.style.top = '11px';
     iframe.closebutton.style.width = '18px';
     iframe.closebutton.style.height = '18px';
     iframe.closebutton.style.cursor = 'pointer';
     iframe.closebutton.playparam = '';
     addEvent( iframe.closebutton, 'click', toggleIFrame );

     iframe.iframe = document.createElement('iframe');
     iframe.iframe.border = '0';
     iframe.iframe.style.zIndex = 14;
     iframe.iframe.style.position = 'absolute';
     iframe.iframe.style.right = '1px';
     iframe.iframe.style.top = '1px';
     iframe.iframe.style.width = (wmpconfig.width+10)+'px';
     iframe.iframe.style.height = (wmpconfig.height+10)+'px';
     iframe.iframe.style.margin = '0px';
     iframe.iframe.style.padding = '0px';

     iframe.div.appendChild(iframe.iframe);
     iframe.div.appendChild(iframe.hidebutton);
     iframe.div.appendChild(iframe.closebutton);

     var content = document.getElementById('content');
     content.insertBefore(iframe.div,content.childNodes[0]);
    } //with
  }
 }

}

//
// Hook up installation function
//
addOnloadHook(wikimediaplayer.loader);

//</pre>