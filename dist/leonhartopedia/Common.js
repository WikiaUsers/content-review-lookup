/* Any JavaScript here will be loaded for all users on every page load. */
 
// **************************************************
// Start Javascript Libraries
// **************************************************
 
+function(e,t,n,o){function i(){g=p;for(var e,t=0;m.length>0&&100>t;){t++,e=m[0],m[0]=void 0,m.splice(0,1);try{e()}catch(n){o(n)}}}function r(e){try{if(e.displayName==s||e.name==s||f!=typeof e.$&&f!=typeof e.$$&&f!=typeof e.addStyle&&f!=typeof e.addScript)return p}catch(t){}return!1}function a(){return g}function c(e){var t=typeof e,n="function"==t;if(n||"object"==t)if(r(e))l=e,i();else if(n)if(g)try{e()}catch(o){}else m.push(e)}function u(n){n=n||1,l=typeof wikiMod!==f?wikiMod:e[s]||t[s]||(w?w[s]:null);try{if(!g&&!l&&35>n)return setTimeout(function(e){u((e||n)+1)},20,n)}catch(o){}i()}var l,f="undefined",s="wikiMod",d="onWikiModReady",p=!0,y=!1,w=typeof unsafeWindow!==f&&"window"===n.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g,"").toLowerCase()?unsafeWindow:null,g=!1,m=[],h={allowCallbacks:p,allowCrossOriginArguments:p};if(!(w&&f!=typeof w[d]&&f!=typeof e[d]||!w&&f!=typeof t[d])){if(w&&f==typeof w[d]&&f!=typeof exportFunction)try{n.defineProperty(w,d,{get:exportFunction(a,w,h),set:exportFunction(c,w,h),enumerable:p,configurable:y})}catch(b){o(b)}try{n.defineProperty(e,d,{get:a,set:c,enumerable:p,configurable:y})}catch(b){o(b)}if(f==typeof t[d])try{n.defineProperty(t,d,{get:a,set:c,enumerable:p,configurable:y})}catch(b){o(b)}u()}}(this,window,Object,console.log);

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

// **************************************************
// Insert Non-Time Critical Scripts Below Here...
// **************************************************
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});