/* Any JavaScript here will be loaded for all users on every page load. */
// **************************************************
// TabView Mobile Compatibility and Edit Buttons
// **************************************************
 
+function(a,b,c,d){function e(a){var b=a[p],c=typeof b,e=c==m;if(g(b)?(u=b,t=q,e=r):c==l&&v.push(b),e)return e;try{a[p]=d}catch(f){}try{delete a[p],a[p]=d}catch(f){}}function f(){t=q;var a=0,b=v;for(v=[];a<b.length;a++)try{b[a]()}catch(c){}}function g(a){try{if(a&&((a.name||a.displayName||"").toString().toLowerCase()==o||k!=typeof a.$$&&k!=typeof a.addStyle&&k!=typeof a.addScript))return q}catch(b){}return r}function h(){return t}function i(a){var b=typeof a,c=b==l,d=a===!0;if(c||"object"==b||d)if(d||g(a))f();else if(c)if(t)try{a()}catch(e){}else v.push(a)}function j(){return u=u||a[n]||b[n],!t&&!u&&z++<50?setTimeout(j,20):void f()}var k="undefined",l="function",m="boolean",n="wikiMod",o="wikimod",p="onWikiModReady",q=!0,r=!1,s=c.defineProperty,t=r,u,v=[],w,x,y=0,z=0;if(x=e(a)?a:d,x=e(b)?b:x,x&&typeof x[p]==m&&v.length){var A=v;for(v=[];y<A.length;y++)try{x[p]=A[y]}catch(B){}try{if(x[p]=f,x[p]!==f&&typeof x[p]==m)return j()}catch(B){}}if(!x){w={get:h,set:i,enumerable:q,configurable:r};try{s(a,p,w),k==typeof b[p]&&s(b,p,w)}catch(B){}}j()}(this,window,Object);
 
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');
importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons.js', 'deadisland');