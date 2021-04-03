function getSettings(user, callback) {
    var v = Math.random() * 10;
    $.getJSON('/api.php?action=query&prop=revisions&rvprop=content&titles=MediaWiki:Custom-Settings.json&format=json&v=' + v).always(function(data) {
        json = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
        if($.inArray(user, Object.keys(json)) != -1) {
            settings = json[user];
            callback(settings);
        } 
        else {
            console.error('User has no settings',user);
        }        
    });
}
getSettings(mw.config.get('wgUserName'), function(settings) {
    if($.inArray('background', Object.keys(settings)) != -1) {
        if($.inArray('color', Object.keys(settings.background)) != -1) {
            $('body.skin-oasis').css('background-color', settings.background.color);
        }
        if($.inArray('image', Object.keys(settings.background)) != -1) {
            $('body.skin-oasis').css('background-image', 'url(' + settings.background.image + ')');
        }
    }
    if($.inArray('party', Object.keys(settings)) != -1) {
        $('body').addClass('user-party-' + settings.party);
        switch(settings.party) {
            case 'Gryffindor':
                logo = 'https://vignette.wikia.nocookie.net/harrypotter/images/b/be/HP_Logo_Gryffindor.png/revision/latest/?cb=20160824103448&path-prefix=de';
                break;
            case 'Hufflepuff':
                logo = 'https://vignette.wikia.nocookie.net/harrypotter/images/9/91/HP_Logo_Hufflepuff.png/revision/latest/?cb=20160824103401&path-prefix=de';
                break;
            case 'Ravenclaw':
                logo = 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a2/HP_Logo_Ravenclaw.png/revision/latest/?cb=20160824103412&path-prefix=de';
                break;
            case 'Slytherin':
                logo = 'https://vignette.wikia.nocookie.net/harrypotter/images/4/40/HP_Logo_Slyterhin.png/revision/latest/?cb=20160824103422&path-prefix=de';
                break;
            default:
                logo = 'https://vignette.wikia.nocookie.net/harrypotter/images/7/7c/HP_Logo_Hogwarts.png/revision/latest/?cb=20160824103344&path-prefix=de';
                break;
        }
        $('#WikiHeader .wordmark img').attr('src', logo);
    }
    if($.inArray('script', Object.keys(settings)) != -1) {
        var articles = [];
        for(var s in settings.script) {
            console.log(settings.name,'script',settings.script[s]);
            articles.push('u:dev:' + settings.script[s] + '/code.js');
        }
        console.log(articles);
        importArticles({
            type: 'script',
            articles: articles
        });
    }
});

function getParty(party, callback) {
    var v = Math.random() * 10;
    $.getJSON('/api.php?action=query&prop=revisions&rvprop=content&titles=MediaWiki:Custom-Settings.json&format=json&v=' + v).always(function(data) {
        json = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
        var lodash = mw.loader.getModuleNames().filter(function(m) {
        	return m.startsWith('lodash-');
    	})[0];
		mw.loader.using(lodash, function(require) {
		    var _ = require(lodash).lodash;
	        users = _.filter(json, { party: party });
	        callback(users);
		});
    });    
}

function getParties(callback) {
    for(var p in config.parties) {
        getParty(config.parties[p], callback);
    }
}