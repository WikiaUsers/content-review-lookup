/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
// Start Javascript Libraries
// **************************************************
 
// wikiMod watcher.
// Setter adds functions to a stack till wikiMod is ready.
// set using window.onWikiModReady = function(){};
+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
 
// wikiMod
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

//countdown Module
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
 
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