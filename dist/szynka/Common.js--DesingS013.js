// SteamBox
+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

window.SteamAPI_Config = {
	games: [
			{
				name: "Team Fortress 2",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/440/07385eb55b5ba974aebbe74d3c99626bda7920b8.jpg",
				appid: "440"
			},
			{
				name: "Grand Theft Auto IV",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/12210/47fb2a3e0763be24e49662591d6e076c58b2178d.jpg",
				appid: "12210"
			},
			{
				name: "Grand Theft Auto: Episodes from Liberty City",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/12220/40d1512d5922313878298c3731ffc066091a113a.jpg",
				appid: "12220"
			},
			{
				name: "Grand Theft Auto III",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/12100/0e73825e3abd7bfe43b55a49bbcb862aee7c2e71.jpg",
				appid: "12100"
			},
			{
				name: "Grand Theft Auto: San Andreas",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/12250/32e2d1d2054295603724f30c81c3cf46dc6392c0.jpg",
				appid: "12250"
			},
			{
				name: "Grand Theft Auto: Vice City",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/12110/6ba37ecba052f89c72272dd28b2daa89087a7eb3.jpg",
				appid: "12110"
			},
			
			
			{
				name: "Scribblenauts Unlimited",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/218680/c3f8420cd87dd772df8a35013e3538e964ecc2b8.jpg",
				appid: "218680"
			},
			{
				name: "PAYDAY: The Heist",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/24240/985cce1caab10e5b5f11af73c75fe0c5411ed76a.jpg",
				appid: "24240"
			},
			{
				name: "Goat Simulator",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/265930/f116260f6858dda8a2e4c0ccedf270c8a24a0add.jpg",
				appid: "265930"
			},
			{
				name: "Marvel Heroes 2015",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/226320/7121a66719963c4790d6169d38b9c65ad8f238bc.jpg",
				appid: "226320"
			},
			{
				name: "Sniper: Ghost Warrior",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/34830/bde8f0e009828fd323fe3a867f3891412d6b8a59.jpg",
				appid: "34830"
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