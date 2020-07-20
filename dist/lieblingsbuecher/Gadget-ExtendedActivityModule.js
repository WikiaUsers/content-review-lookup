var activityWidget = $('#wikia-recent-activity > ul.activity-items');
if (!!activityWidget.length) {
    $.getJSON(wgScriptPath + '/api/v1/Activity/LatestActivity?limit=5&namespaces=0&allowDuplicates=false').then(function(activity) {
    	var api = new mw.Api();
    	var articles = activity.items.map(function(item) {
    		return item.article;
        });
    	var users = activity.items.map(function(item) {
    		return item.user;
        });
    	apiResults = [];
    	apiResults.push(api.get({
    		action: 'query',
    		list: 'users',
    		usids: users.join('|')
        }));
    	apiResults.push(api.get({
    		action: 'query',
    		pageids: articles.join('|'),
    		format: 'json',
    		indexpageids: true
        }));
    	$.when.apply(window, apiResults).done(function() {
    		var res = arguments[1][0];
    		var res2 = arguments[0][0];
    		activityWidget.empty();
    		res.query.pageids.reverse().map(function(page, idx) {
    			var li = $('<li />', { class: 'activity-item' });
    			var pageTitle = $('<div />', { class: 'page-title' }).appendTo(li);
    			if (/\/Bewertung$/.test(res.query.pages[page].title)) {
    				var rating = res.query.pages[page].title.split('/');
    				$('<a />', { href: mw.util.getUrl(rating[0]), class: 'page-title-link' }).append(
    					'<svg id="wds-icons-poll" viewBox="0 0 24 24" width="12px" height="12px"><g fill-rule="evenodd"><path id="poll-a" d="M17 21h5V10h-5v11zm-7-6V3h5v18h-5v-6zm-7 6h5v-5H3v5zM23 8h-6V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"></path></g></svg>',
    					'&emsp;',
    					rating[0]
    				).appendTo(pageTitle);
                }
    			else {
    				var pageTitleLink = $('<a />', { href: mw.util.getUrl(res.query.pages[page].title), class: 'page-title-link', text: res.query.pages[page].title }).appendTo(pageTitle);
    				if (res.query.pages[page].ns === 0) {
    					pageTitleLink.prepend('<svg id="wds-icons-book" viewBox="0 0 24 24" width="12px" height="12px"><g fill-rule="evenodd"><path id="book-a" d="M13 8.5v8.308A6.458 6.458 0 0 1 17.5 15c1.747 0 3.333.677 4.5 1.794V8.5C22 6.019 19.981 4 17.5 4a4.474 4.474 0 0 0-3.183 1.317A4.474 4.474 0 0 0 13 8.5zM6.5 4a4.474 4.474 0 0 0-3.183 1.317A4.474 4.474 0 0 0 2 8.5v8.308A6.458 6.458 0 0 1 6.5 15c1.747 0 3.333.677 4.5 1.794V8.5C11 6.019 8.981 4 6.5 4zM23 21h.01H23zm0 1c-.518 0-.98-.396-1.026-.912A4.467 4.467 0 0 0 17.5 17a4.474 4.474 0 0 0-3.183 1.317 4.438 4.438 0 0 0-1.29 2.766c-.044.523-.5.935-1.012.917-.541-.016-.995-.391-1.041-.912A4.467 4.467 0 0 0 6.5 17a4.474 4.474 0 0 0-3.183 1.317 4.438 4.438 0 0 0-1.29 2.766A1 1 0 0 1 1.03 22C.478 22 0 21.552 0 21V8.5c0-1.737.676-3.37 1.902-4.597A6.463 6.463 0 0 1 6.5 2a6.501 6.501 0 0 1 5.497 3.034c.256-.405.559-.784.905-1.131A6.463 6.463 0 0 1 17.5 2C21.084 2 24 4.916 24 8.5V21a1 1 0 0 1-1 1z"></path></g></svg>', '&emsp;');
                    }
                }
    			var editInfo = $('<div />', { class: 'edit-info' }).appendTo(li);
    			if (activity.items[idx].user) {
    				var user = _.findWhere(res2.query.users, { userid: activity.items[idx].user });
    				$('<a />', { class: 'edit-info-user', href: mw.util.getUrl('User:' + user.name), text: user.name }).appendTo(editInfo);
                }
    			else {
    				$('<span />').text('Ein FANDOM-Benutzer').appendTo(editInfo);
                }
				var date = (new Date(activity.items[idx].timestamp * 1000)).toISOString();
    			editInfo.append(
    				$('<span />', { class: 'edit-info-time' }).append(
    					$('<time />', { class: 'timeago', datetime: date, text: date })
    				)
    			);
    			activityWidget.append(li);
            });
            activityWidget.find('.edit-info-time > time').timeago(); 
        });
    });  
}