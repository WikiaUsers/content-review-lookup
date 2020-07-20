/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

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


/** Verzichtserklärung *********************************************************
 *
 *  Beschreibung: Verzichtserklärung
 */

var t = '<div id="nfshpwiki_legal">Das Need for Speed: Hot Pursuit Wiki ist nicht im Besitz von Criteriongames und wird auch nicht von Criteriongames betrieben. Alle Bilder von Need for Speed: Hot Pursuit sind Eigentum von Criteriongames. Die Quelle der News findet man unter http://hotpursuit.needforspeed.com/de .</div>';
document.getElementById("WikiaArticleBottomAd").innerHTML += t;

/* Zeigt einen Besucherzähler auf jeder Seite dieses Wikis */

document.write ("<div style='position:fixed; right:2px; bottom:2px; display:block; height:20px; width:80px'>");
document.write ("<a href='http://www.counter-kostenlos.net'><img src='http://www.counter-kostenlos.net/counter.php?id=123702'></a>");
document.write ("</div>");

/*Javascript für Mouseover Effekt */
function FP_preloadImgs() {
 var d=document,a=arguments; if(!d.FP_imgs) d.FP_imgs=new Array();
 for(var i=0; i<a.length; i++) { d.FP_imgs[i]=new Image; d.FP_imgs[i].src=a[i]; }
}
function FP_swapImg()
{
 var doc=document,args=arguments,elm,n; doc.$imgSwaps=new Array(); for(n=2; n<args.length;
 n+=2) { elm=FP_getObjectByID(args[n]); if(elm) { doc.$imgSwaps[doc.$imgSwaps.length]=elm;
 elm.$src=elm.src; elm.src=args[n+1]; } }
}
function FP_getObjectByID(id,o) {//v1.0
 var c,el,els,f,m,n; if(!o)o=document; if(o.getElementById) el=o.getElementById(id);
 else if(o.layers) c=o.layers; else if(o.all) el=o.all[id]; if(el) return el;
 if(o.id==id || o.name==id) return o; if(o.childNodes) c=o.childNodes; if(c)
 for(n=0; n<c.length; n++) { el=FP_getObjectByID(id,c[n]); if(el) return el; }
 f=o.forms; if(f) for(n=0; n<f.length; n++) { els=f[n].elements;
 for(m=0; m<els.length; m++){ el=FP_getObjectByID(id,els[n]); if(el) return el; } }
 return null;
}
function open_new_window(url,win_name,xWin,yWin)
{
	popupwindow = window.open(url,win_name,'toolbar=0,menubar=0,resizable=0,dependent=0,status=0,width='+(xWin+36)+',height='+(yWin+42)+',left=25,top=25')
}
var refer=true;
var n=0;
function combo(n,refer)
{
switch (n)
{
case 1: {
if (refer) {document.all.List1.style.visibility="visible"}
else {document.all.List1.style.visibility="hidden"};
break}
}
}