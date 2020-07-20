/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/**
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 * Script from: http://minecraft.gamepedia.com/
 */
window.mcw = {};
mcw.animation = function() {
	if ( mcw.animate === undefined && $( '.animated' ).length ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var $current = $( this ).children( '.active' ), $next = $current.nextAll( ':not(.skip):first' );
				if ( !$next.length ) {
					$next = $( this ).children( ':not(.skip):first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
	}
};
mcw.animation();

// SteamBox
+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
 
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');
 
// Configure
window.SteamAPI_Config = {
	games: [
			{
				name: "Primal Carnage: Extinction",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/215470/a95d1db1d814ee21bd3fc5416228ad5a5d458eb1.jpg",
				appid: "215470"
			},
			{
				name: "Team Fortress 2",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/440/07385eb55b5ba974aebbe74d3c99626bda7920b8.jpg",
				appid: "440"
			},
			{
				name: "Goat Simulator",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/265930/f116260f6858dda8a2e4c0ccedf270c8a24a0add.jpg",
				appid: "265930"
			},
			{
				name: "The Elder Scrolls V: Skyrim",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/72850/c5af3cde13610fca25cd17634a96d72487d21e74.jpg",
				appid: "72850"
			},
			{
				name: "Garry's Mod",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/4000/dca12980667e32ab072d79f5dbe91884056a03a2.jpg",
				appid: "4000"
			},
			{
				name: "Chivalry: Medieval Warfare",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/219640/dd3488ae69593cedf5e73b818ae98e6737aa956c.jpg",
				appid: "219640"
			},
			{
				name: "Terraria",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/105600/e3f375e78ada9d2ec7ffa521fe1b0052d1d2bbb5.jpg",
				appid: "105600"
			},
			{
				name: "Counter-Strike: Global Offensive",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/730/d0595ff02f5c79fd19b06f4d6165c3fda2372820.jpg",
				appid: "730"
			},
			{
				name: "Dead Island",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/91310/62632a275a4cc08f0238ed3d589ce1d8627fde91.jpg",
				appid: "91310"
			},
			{
				name: "Dishonored",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/205100/b94f5ff693304b7f70f88403d444686c4af3b940.jpg",
				appid: "205100"
			},
			{
				name: "Half-Life 2",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/220/e4ad9cf1b7dc8475c1118625daf9abd4bdcbcad0.jpg",
				appid: "220"
			},
			{
				name: "Left 4 Dead 2",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/550/205863cc21e751a576d6fff851984b3170684142.jpg",
				appid: "550"
			},
			{
				name: "Portal 2",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/620/d2a1119ddc202fab81d9b87048f495cbd6377502.jpg",
				appid: "620"
			},
			{
				name: "POSTAL 2",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/223470/ec19963d4431918601eee5198bafcd021259136d.jpg",
				appid: "223470"
			},
			{
				name: "Saints Row: The Third",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/55230/1129528455a8b297fb6404cbb90e802a62881b11.jpg",
				appid: "55230"
			},
			{
				name: "Tomb Raider",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/203160/495f7d723659add6ea476b3699be5424282ac4b8.jpg",
				appid: "203160"
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

// SLIDERMCU
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { 
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
});
});