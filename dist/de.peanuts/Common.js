/* Jedes JavaScript-Skript wird hier für alle Nutzern und Besucher auf jeder Seite geladen. */


// ============================================================
//                       Einstellungen
// ============================================================
/* UserTags Settings */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data },
		bureaucrat: { u:'Bürokrat', link:'Hilfe:Bürokrat', order: 1 }, // Normal order is 0
		sysop: { u:'Admin', link:'Hilfe:Admin', order: 2 },
		inactive: { u: 'Inaktiver Nutzer', link:'Hilfe:Inaktive Benutzerkonten', order: 100 },
		'montheditor': { u:'Bearbeiter des Monats', order: 101 },
		'featured': { u:'Beliebter User', order: 102 },
		'template': { u:'Vorlagen-Experte', order: 103 },
		'peanuts-expert': { u:'Peanuts-Experte', order: 104 },
		bot: { u:'Bot', link:'Hilfe:Bots', order: 105 },
		voldev: { u:'Volunteer Developers', link:'http://dev.wikia.com/wiki/Volunteer_Developers', order: 106 },
		autoconfirmed: { u:'Automatisch bestätigte Benutzer', link:'Hilfe:Automatisch bestätigte Benutzer', order: 107 },
		'fan': { u:'Peanuts-Fan', link:'Spezial:Maps/9483', order: 108 },
		'youtube': { u:'YouTuber', order: 109 }
	}
};
UserTagsJS.modules.custom = {
	'Lunarity': ['inactive', 'template', 'featured', 'montheditor', 'featured', 'peanuts-expert', 'fan', 'youtube'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

/* CacheCheck */
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.topLevelCat = '';

/* Less */
// our config is stored in an array
window.lessOpts = window.lessOpts || [];
 
// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Common.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Css-header/common'
} );

/* LastEdited */
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: false,
    time: 'timestamp',
    lang: 'de',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};


// ============================================================
//                       Importe
// ============================================================
/* Importierung von JavaScript-Skripte & CSS-Sheets aus Wikia Developer Wiki */
importArticles({
    type: 'script',
    articles: [
        'u:dev:LockOldBlogs/code.js',                 // Archive old blogs posts
        'u:dev:AjaxRC/code.js',                       // AjaxRC
	'u:dev:DisplayClock/code.js',                 // Display Clock
        'u:dev:ReferencePopups/code.js',              // Reference Popups
        'u:dev:WallGreetingButton/code.js',           // Wall Greeting Button
        'u:dev:Countdown/code.js',                    // Countdown
        'u:dev:Voice_Output/code.js',                 // Google Voice Output
        'u:dev:ArchiveTool/code.js',                  // ArchiveTool
        'u:dev:LockOldBlogs/code.js',                 // Lock all old Blog comments
        'u:dev:PageMakerPro/code.js',                 // Google Voice Output
        'u:dev:DISPLAYTITLE/code.js',                 // Displaytitle Function
        'u:dev:ListFiles/code.js',                    // ListFiles
        'u:dev:EditcountTag/code.js',                 // Editcount Tag
        'u:dev:Printer/code.js',                      // Print Function
        'u:dev:TopEditors/code.js',                   // Top Editors
        'u:dev:Translator/Translator.js',             // Translate Function
	'u:dev:SignatureCheck/code.js',               // Signature Check
        'u:dev:ExternalImageLoader/code.js',          // External Image Loader
        'u:dev:AjaxRC/code.js',                       // Recent Changes Watchlist
        'u:dev:PurgeButton/code.js',                  // Purge Button
        'u:dev:MiniComplete/code.js',                 // MiniComplete Function
        'u:zh.pad.wikia.com:MediaWiki:CountDown.js',  // Korean Pad Countdown
        'u:dev:ShowHide/code.js',                     // ShowHide
        'u:dev:Tooltips/code.js',                     // Tooltips
        'u:dev:UserTags/code.js',                     // UserTags
        'u:dev:ChatOptions/code.js',                  // ChatOptions
        'u:dev:ChatTags/code.js',                     // ChatTags
        'u:dev:CacheCheck/code.js',                   // CacheCheck
        'u:dev:Less/code.2.js',                       // Less
        'u:dev:QuickIW/code.js',                      // QuickIW
        'u:dev:AjaxRC/code.js',                       // AjaxRC
        'u:dev:HeaderLinks/code.js',                  // HeaderLinks
        'u:dev:LastEdited/code.js',                   // LastEdited
        'u:dev:ReferencePopups/code.js',              // ReferencePopups
        'u:dev:SpoilerAlert/code.js',                 // SpoilerAlert
        'u:dev:FloatingToc/code.js',                  // FloatingToc
        'u:dev:VisualSpellCheck/code.js',             // VisualSpellCheck
        'u:dev:SearchSuggest/code.js',                // SearchSuggest
        'u:dev:Standard_Edit_Summary/code.js',        // Standard Edit Summary
        'u:dev:CatNav/code.js',                       // CatNav
        'u:dev:Message/code.js',                      // Message
        'u:dev:ListAdmins/code.js',                   // ListAdmins
        'u:dev:TopEditors/code.js',                   // TopEditors
        'u:dev:MediaWiki:LinkedinSupport/code.js',    // LinkedinSupport
        'u:dev:MediaWiki:PlusOneButton/code.js',      // PlusOneButton
        'u:dev:MediaWiki:Translator/Translator.js',   // Translator
        'u:dev:ChatInterwikiLinks/code.js',           // ChatInterwikiLinks
        'u:shining-armor:MediaWiki:ChatTags/code.js', // ChatTags
        'u:dev:MediaWiki:CustomChatPings/code.js',    // CustomChatPings
        'u:dev:ExternalImageLoader/code.js',          // ExternalImageLoader
        'u:dev:MediaWiki:PowerPageMaker/code.js',     // PowerPageMaker
        'u:dev:PageRenameAuto-update/code.js',        // PageRenameAuto-update
        'u:dev:MediaWiki:PageMakerPro/code.js'        // PageMakerPro
        ]
    }, {
        type: "style",
        articles: [
            'u:zh.pad:MediaWiki:CountDown.css',
            'MediaWiki:Wikia.css'
        ]
});

/* WikiaNoticfication(s) */
importScriptPage('MediaWiki:Common.js/WIKIANOTIFICATION.js');

/* Only if uploading.JS */
importScriptPage('MediaWiki:Onlyifuploading.js');

/* Collapsible tables */
importScriptPage('MediaWiki:Gadget-collapsibleTables.js');

/* Dynamic Navigation Bars */
importScriptPage('MediaWiki:Gadget-NavFrame.js');


// ============================================================
//                   Sonstige Einstellungen
// ============================================================

/* Variablen für das Skript LockOldBlogs (siehe http://dev.wikia.com/wiki/LockOldBlogs) */

LockOldBlogs = {
  expiryDays: 30,
  expiryMessage: "Die letzte Aktivität liegt <expiryDays> Tage zurück. Dieser Blog wurde deshalb archiviert."
};

/* Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC) */
ajaxPages = ['Spezial:Letzte_Änderungen'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'automatische Aktualsierung ohne Neuladen der kompletten Seite';


// Import [[MediaWiki:Onlyifuploading.js]] 
 
if ( wgCanonicalSpecialPageName == "Upload" ) {
  document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }


/***********************************************
* Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

var dragobject={
  z: 0,
  x: 0,
  y: 0,
  offsetx : null,
  offsety : null,
  targetobj : null,
  dragapproved : 0,
  initialize : function(){
    document.onmousedown = this.drag
    document.onmouseup = function() {
      this.dragapproved = 0
    }
  },
  drag : function(e){
    var evtobj = window.event? window.event : e
    this.targetobj=window.event? event.srcElement : e.target
    if (this.targetobj.className == "jstest"){
      this.dragapproved=1
      if (isNaN(parseInt(this.targetobj.style.left))) {
        this.targetobj.style.left = 0
      }
    if (isNaN(parseInt(this.targetobj.style.top))) {
      this.targetobj.style.top=0
    }
    this.offsetx = parseInt(this.targetobj.style.left)
    this.offsety = parseInt(this.targetobj.style.top)
    this.x = evtobj.clientX
    this.y = evtobj.clientY
    if (evtobj.preventDefault)
      evtobj.preventDefault()
    document.onmousemove = dragobject.moveit
    }
  },
  moveit : function(e){
    var evtobj = window.event? window.event : e
    if (this.dragapproved == 1) {
      this.targetobj.style.left = this.offsetx+evtobj.clientX-this.x+"px"
      this.targetobj.style.top = this.offsety+evtobj.clientY-this.y+"px"
      return false
    }
  }
}

dragobject.initialize();

// **************************************************
// Start Javascript Libraries
// **************************************************
 
// wikiMod watcher.
// Setter adds functions to a stack till wikiMod is ready.
// set using window.onWikiModReady = function(){};
+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
 
// wikiMod
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');
 
// **************************************************
// End Javascript Libraries
// **************************************************
 
 
// **************************************************
// wikiMod Dependant Scripts
// **************************************************
 
importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons.js', 'deadisland');
 
// **************************************************
// End wikiMod Dependant Scripts
// **************************************************