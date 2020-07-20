/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Иконки социальных сетей */
// $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="http://steamcommunity.com/app/273350"><img src="https://images.wikia.nocookie.net/__cb20141212114238/evolvepedia/ru/images/9/9b/SteamIcon.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://www.turtlerockstudios.com"><img src="https://images.wikia.nocookie.net/__cb20141212114245/evolvepedia/ru/images/d/d8/TurtleRockIcon.png"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="https://www.2k.com"><img src="https://images.wikia.nocookie.net/__cb20141212114219/evolvepedia/ru/images/1/16/2KIcon.png"></a></div></div><div style="position: absolute; margin-top:126px" class="SocialIcon"><div style="float:right;"><a href="http://evolvegame.com"><img src="https://images.wikia.nocookie.net/__cb20141212114228/evolvepedia/ru/images/d/d0/EvolveIcon.png"></a></div></div>');

function initVisibility() {
	var storage = globalStorage[window.location.hostname];
 
	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = storage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

/* http://requirejs.org/docs/api.html */
/* http://stackoverflow.com/questions/17026036/require-js-bug-random-failed-to-load-resource */
var requireConfig = {
  // "config": {
  //   "addThis": {
  //     "pubid": "ra-52aa2bf97ab987b2"
  //   }
  // },
  // To get timely, correct error triggers in IE, force a define/shim exports check.
  // enforceDefine: true,

  // By default load any module IDs from _/js/inc
  baseUrl: "_/js/inc",

  // except, if the module ID starts with "vendor",
  // load it from the _/js/vendor directory. paths
  // config is relative to the baseUrl, and
  // NEVER INCLUDES A ".js" EXTENSION since
  // the paths config could be for a directory.
  paths: {
 		"player_api" : ["http://www.youtube.com/player_api/?"],

    "vendor": "../vendor",
		"inc" : "/_/js/inc",
    "jquery": [
      "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
      // If the CDN fails, load from this location
      "../vendor/jquery/jquery-1.10.2.min" //may need to rename this to 'jquery' or 'jquery.min'
    ],
		"plugins" : "/_/js/inc/plugins",
    "addThis": "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52aa2bf97ab987b2",
    "maxmind": "//js.maxmind.com/js/apis/geoip2/v2.0/geoip2",
    "isotope": "../vendor/isotope.pkgd",
    "imagesloaded": "../vendor/imagesloaded.pkgd.min",
    "swipe": "../vendor/swipe",
    "lazy": "../vendor/jquery/jquery.lazyload.min"
    },
  shim: {
    // 'vendor/typed': ['jquery'],
		'plugins' : ['jquery'],
    'isotope' : ['jquery'],
    'lazy': ['jquery'],
    'vendor/imagesloaded.pkgd.min' : ['jquery'],
    'vendor/jquery.infinitescroll.min' : ['jquery'],
		'preorder' : ['jquery','main']
  }

}

require.config(requireConfig);

// require.onError = function (err) {
//   console.log(err.requireType);
//   if (err.requireType === 'timeout') {
//     console.log('modules: ' + err.requireModules);
//   }
//   throw err;
// };

//do not load addThis, typedjs on agegate

require(['jquery','plugins', 'main', 'share', 'geoip']);