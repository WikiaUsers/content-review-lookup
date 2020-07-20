/** GOSUCHAT START 

(function() {

	// GOSUCHAT configuration

	// Community IDs
	var communityIds = [
		'1579f32d-8678-4a5f-8cf5-ddece1f5e817', // add community ID like this
		'', // you can add another community here. simply copy this line if you want to add more communities
	];

	// Hero colors and theme
	var heroColors = [
		'#43568B', // used in logo, banner, etc.
		'#8FBC8F', // used in image action backdrop, etc.
		'#F2F2F2', // used in autocompletion selected background, etc.
	];
	var theme = 'lite'; // use dark for dark theme

	// Options
	var options = {
		'anonymous-users': 'read-only',
		'nav-drawer': 'channellist-as-default',
	};


	// /!\ do not edit any code below this line /!\ 


	function getCommunityIds(communityIds) {
		return communityIds.join(',');
	}

	function getHeroColors(heroColors) {
		for (var key in heroColors) {
			heroColors[key] = heroColors[key].replace('#', 'x');
		}
		return heroColors.join('+');
	}

	function getOptions(options, theme, heroColors) {
		var compiledOptions = [
			'theme:' + theme,
			'hero-colors:' + getHeroColors(heroColors),
		];
		for (var key in options) {
			if (Object.prototype.hasOwnProperty.call(options, key)) {
				compiledOptions.push(key + ':' + options[key]);
			}
		}
		return compiledOptions.join(',');
	}


	var body = document.getElementsByTagName('body')[0];

	var chatElement = document.createElement('script');
	chatElement.src = 'https://be.go.su/embed/' + communityIds.join(',') + '/' + getOptions(options, theme, heroColors);

	body.appendChild(chatElement);

})();

/** GOSUCHAT END **/