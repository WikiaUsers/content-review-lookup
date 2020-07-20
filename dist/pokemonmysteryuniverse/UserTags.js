//UserTags
window.UserTagsJS = {
	modules: {
	    mwGroups: true
	},
	tags: {
	    //Creates titles for tags using u:
	    wikiberry: {u:'Wiki Berry', order:-1/0},
	    bureaucrat: {u:'Wiki Head', order:0},
	    sysop: {u:'Wiki Admin', order:1},
	    'content-moderator': {u:'Wiki Mod', order:2}
	},
	extensions: {},
	debug: true
};


UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator'];
UserTagsJS.modules.explode = {
    'wikiberry': ['bureaucrat', 'sysop', 'content-moderator']
};

//Ranks Go Here
window.UserTagsJS.extensions.Ranks = {
	start: function(config, username) {
		return {
			ajax: {
    				//Pulls Edit Counts
    				action: 'query',
    				type: 'user',
                	prop: ['prop', 'prop'],
                	/*limit: 1,
                	dir: 'newer'*/
			},
			
			tags: {
			    editor: { u: 'Wiki Editor'},
				proficient: { u: 'Proficient Editor' },
				grand: { u: 'Grand Master of All Things Bad' }
			}
		};
	},
	generate: function(json) {
		num = json.query.contributions-details;
		
			if (num > 0 && num < 150) {
			    return ['editor'];
			}
			else if (num >= 150 && num < 5000) {
				return ['proficient']; //Should give users Proficient Editor tag if over 150 Edits but under 5000 Edits.
			}
			else if(num >= 5000) {
			    return ['grand']; //Should give users Grand Master of All Things Bad tag if over 5000 Edits.
			}
			return null;
	}
	
	//Old Code
	/*start: function(config, username) {
		var promise = $.ajax({
		    data: {
    			    //Pull Edit Count on Userpage
    				action: 'query',
    				type: 'contributions',
                	prop: ['prop', 'prop'],
                	limit: 1,
                	dir: 'newer'
    			},
    			dataType: 'json'
		}).then(function(json) {
		    num = json.query.contributions;
		    
			if (num > 0 && num < 150) {
			    return ['editor'];
			}
			else if (num >= 150 && num < 5000) {
				return ['proficient']; //Should give users Proficient Editor tag if over 150 Edits but under 5000 Edits.
			}
			else if(num >= 5000 && num < 7600) {
			    return ['grand']; //Should give users Grand Master of All Things Bad tag if over 5000 Edits.
			}
			else if(num > 7600) {
			    return ['fail']; //The number I'm testing is under 7600. If it's over 7600, then it's pulling from the username and not the edit count.
			}
			return null;
		});
        return{
			tags: {
			    fail: { u: 'You Failed'},
			    editor: { u: 'Wiki Editor'},
				proficient: { u: 'Proficient Editor' },
				grand: { u: 'Grand Master of All Things Bad' }
			},
			promise: promise
        };
    }*/
};
window.UserTagsJS.modules.Ranks = true;

importArticle({type:'script', article:'u:dev:MediaWiki:UserTags/code.js'});