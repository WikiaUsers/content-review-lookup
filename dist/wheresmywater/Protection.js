/*
-------------------
 Protection Icons
-------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- Protection.css

-----------------------
 AUTHORS & MAINTAINERS
-----------------------
- FaceBound: version 1 with template (Clash of Clans Wiki)
- E12Dragon: version 2

---------------
 Adapted from
---------------
- dev.fandom.com/wiki/ProtectionIcons (version 2)
*/

var config = mw.config.get([
    'wgPageName',
    'wgCanonicalNamespace',
    'wgTitle',
    'wgUserName'
]);

function addProtectionIcon(type, level) {
	//Large icon- for the type of restriction
	var iconlarge;
	if (type == 'create') {
		iconlarge = 'add';
	}else if (type == 'comment') {
		iconlarge = 'comment';
	}else if (type == 'move') {
		iconlarge = 'arrow';
	}else if (type == 'upload') {
		iconlarge = 'upload';
	}else {
		iconlarge = 'pencil';
	}
	//Small icon- for the protection of the restriction
	var iconsmall;
	if (type == 'comment' && level == 'sysop') {
		//Disabled comments
		iconsmall = 'cross';
	}else if (level == 'sysop' || config.wgCanonicalNamespace == 'MediaWiki') {
		//Fully protected restriction
		iconsmall = 'lock';
	}else if (config.wgCanonicalNamespace == 'User' || config.wgCanonicalNamespace == 'User_blog' || config.wgCanonicalNamespace == 'Fanon') {
		if (type == 'comment') {
			iconsmall = 'checkmark';
		}else {
			iconsmall = 'user';
		}
	}else if (level == 'autoconfirmed') {
		//Semi protected restriction
		iconsmall = 'unlock';
	}else {
		//Unprotected restriction
		iconsmall = 'checkmark';
	}
	//Determine the tooltip for the icon
	var title;
	if (type == 'comment') {
		//Comment restriction
		if (level == 'sysop') {
			title = 'Commenting is disabled on this page.';
		}else {
			title ='Commenting is enabled on this page.';
		}
	}else if (type == 'upload') {
		//Upload restriction
		if (level == 'sysop') {
			title = 'Only administrators can upload or overwrite this file.';
		}else if (level == 'autoconfirmed') {
			title = 'Your account must be autoconfirmed to upload or overwrite this file.';
		}else {
			title ='Anyone with a Fandom account can upload or overwrite this file.';
		}
	}else {
		//All other restrictions
		if (level == 'sysop' || config.wgCanonicalNamespace == 'MediaWiki') {
			//MediaWiki pages
			title = 'Only administrators can '+ type +' this page.';
		}else if (config.wgCanonicalNamespace == 'User') {
			if(config.wgTitle.endsWith('.js') || config.wgTitle.endsWith('.css')) {
				//Personal css/js pages
				title = 'This is a personal interface page which only ' + config.wgTitle.split('/')[0] + ' can ' + type + '.';
			}else {
				//All other user pages (autoconfirmed or unprotected)
				title = 'This is a user page. Ask ' + config.wgTitle.split('/')[0] + ' for permission to '+ type +' this page.';
			}
		}else if (config.wgCanonicalNamespace == 'User_blog') {
			title = 'This is a user blog. Ask ' + config.wgTitle.split('/')[0] + ' for permission to '+ type +' this blog.';
		}else if (config.wgCanonicalNamespace == 'Fanon') {
			title = 'This is a Fanon page. Ask the owner for permission to '+ type +' this page.';
		}else if (level == 'autoconfirmed') {
			//Autoconfirmed
			title = 'Your account must be autoconfirmed to '+ type +' this page.';
		}else {
			//Unprotected
			title ='Anyone with a Fandom account can '+ type +' this page.';
		}
	}
	//Change the "level" of the restriction if different to default
	if (config.wgCanonicalNamespace == 'User' || config.wgCanonicalNamespace == 'User_blog' || config.wgCanonicalNamespace == 'Fanon') {
		if (config.wgTitle.endsWith('.js') || config.wgTitle.endsWith('.css') && config.wgCanonicalNamespace == 'User') {
			//Personal css/js
			level = 'sysop';
		}else if (type !== 'comment' && level !== 'sysop') {
			//Set those namespaces to "user" level if autoconfirmed or unprotected
			//But not if we are adding the comment icon or sysop protected
			level = 'user';
		}
	}else if (config.wgCanonicalNamespace == 'MediaWiki') {
		//All mediawiki pages are only editable by sysop, even if unprotected
		level = 'sysop';
	}
	//Protection icons are loaded in this order when fetched from json: create, edit, move, comment, upload.
	//Upload icons need to appear next to the edit button over edit or move. Therefore they are appended.
	//Edit icons need to take precedence over move and comment, and create over comment. The order they are loaded in conveniently sorts them.
	var insertionMethod = (type == 'upload') ? 'prepend' : 'append';
	$('.page-header__actions .protection-image-container')[insertionMethod](
	    '<div class="protection-image" data-level="' + level + '" data-type="'+ type +'" title="'+ title +'">' +
	        '<div><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-' + iconlarge + '-small"></use></svg></div>' +
	        '<div><svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-' + iconsmall + '-tiny"></use></svg></div>' +
	    '</div>'
	);
}

mw.loader.using('mediawiki.api').then(function() {
	//Do not load if logged out or if page-header_actions does not exist
	if ( config.wgUserName == null || !$( '.page-header__actions').length ) return;
	
    var api = new mw.Api();
    api.get({
        action: 'query',
        format: 'json',
        titles: config.wgPageName,
        prop: 'info',
        inprop: 'protection',
    }).done(function(data) {
        var page = data.query.pages[Object.keys(data.query.pages)[0]];

        if (page) {
        	//Create protection icons container
        	$('.page-header__actions').prepend('<div class="protection-image-container"></div>');
        	
            // Use default protection if not specified
            var defaultProtection = { level: 'unprotected'};

            // Iterate through restriction types
            page.restrictiontypes.forEach(function(type) {
                // Find the corresponding protection in the array or use default
                var protectionEntry = page.protection.find(function(item) {
                    return item.type === type;
                }) || defaultProtection;

                // Use protection values in addProtectionIcon function
                addProtectionIcon(type, protectionEntry.level);
            });
        }
    });
});