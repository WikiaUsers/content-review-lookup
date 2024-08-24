/* Any JavaScript here will be loaded for all users on every page load. */

window.AddRailModule = [{prepend: true}];

window.UserTagsJS = {
    extensions: {},
	modules: {},
	tags: { inactive: {u:'Hibernating'}},
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 60; // Inactive if no edits in 60 days

window.UserTagsJS.extensions.Over1Edits = {
	start: function(config, username) {
		var promise = $.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				action: 'parse',
				format: 'json',
				text: '{{Special:Editcount/' + username + '}}',
				prop: 'text',
				disablepp: 1
			},
			dataType: 'json'
		}).then(function(json) {
			var num = $(json.parse.text['*']).text().replace(/[^\d]/g, '');
			if (num && +num > 1000) {
				return ['edit1000'];
			} else if (num && +num > 900){
			    return ['edit900'];
			} else if (num && +num > 800){
			    return ['edit800'];
			} else if (num && +num > 650){
			    return ['edit650'];
			} else if (num && +num > 500){
			    return ['edit500'];
			} else if (num && +num > 450){
			    return ['edit450'];
			} else if (num && +num > 300){
			    return ['edit300'];
			} else if (num && +num > 200){
			    return ['edit200'];
			} else if (num && +num > 100){
			    return ['edit100'];
			} else if (num && +num > 50){
			    return ['edit50'];
			} else if (num && +num > 10){
			    return ['edit10'];
			} else if (num && +num > 0){
			    return ['edit1'];
			}
			return null;
		});
		return {
			tags: {
			    edit1000: { u: 'Emperor Monarch', title: 'Over 1000 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit900: { u: 'Titled God King', title: 'Over 900 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit800: { u: 'God King', title: 'Over 800 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit650: { u: 'Heavenly God', title: 'Over 650 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit500: { u: 'God', title: 'Over 500 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit450: { u: 'Pseudo God', title: 'Over 450 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit300: { u: 'Immortal', title: 'Over 300 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit200: { u: 'Ancient Sage', title: 'Over 200 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit100: { u: 'Great Sage', title: 'Over 100 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
			    edit50: { u: 'Saint', title: 'Over 50 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
				edit10: { u: 'Transcendent Mortal', title: 'Over 10 edits!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' },
				edit1: {u: 'Fighter', title: 'Welcome!', link: 'https://library-of-heavens-path.fandom.com/wiki/Become_a_Cultivator' }
			},
			promise: promise
		};
	}
};
window.UserTagsJS.modules.Over1Edits = true; // Enable the module

UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'bureaucrat' : ['founder']// Remove "Bureaucrat" tag from founder
};

window.MessageWallUserTags = {
    tagColor: 'black',
    txtSize: '10px',
    glow: true,
    glowSize: '1px',
    glowColor: 'red',
    users: {
        'Schwarzsäule': 'Celestial Master Teacher',
    }
};