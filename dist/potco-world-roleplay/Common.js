/* Any JavaScript here will be loaded for all users on every page load. */

var WikiaNotificationMessage = "Ahoy there! Welcome to the POTCO World Roleplay Wiki!";
var WikiaNotificationexpiry = 10;

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

+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
 
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

// Configure
window.SteamAPI_Config = {
	games: [
			{
				name: "Dead Island",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/91310/62632a275a4cc08f0238ed3d589ce1d8627fde91.jpg",
				appid: "91310"
			},
			{
				name: "Dead Island 2",
				image: "http://cdn.akamai.steamstatic.com/steam/apps/268150/capsule_184x69.jpg",
				appid: "268150"
			},
			{
				name: "Dead Island Riptide",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/216250/3b62996c558973a9debf26afee64fe3eadf09ef5.jpg",
				appid: "216250"
			},
			{
				name: "Dead Island: Epidemic",
				image: "http://cdn.akamai.steamstatic.com/steam/apps/222900/capsule_184x69.jpg",
				appid: "222900"
			},
			{
				name: "Escape Dead Island",
				image: "http://cdn.akamai.steamstatic.com/steam/apps/226560/capsule_184x69.jpg",
				appid: "226560"
			}
		],
		cache: { // Optional
			UserGameStatsMaxTime: 20, // Minutes
			ProfileInfoMaxTime: 10, // Minutes
			ProfileSummaryMaxTime: 5 // Minutes
		},
		UI: { // Optional
			UserInfoFadeInDelay: 50, // Milliseconds
			UserInfoFadeInTime: 800
		}
};
 
importStylesheetPage('User:Jgjake2/css/SteamUserInfo.css', 'deadisland');
importScriptPage('User:Jgjake2/js/SteamUserInfo.js', 'deadisland');