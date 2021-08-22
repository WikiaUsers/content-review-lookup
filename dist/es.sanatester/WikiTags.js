/***
 * @name: WikiTags
 * @author: Aexhell
 * @description: Add custom tags.
 * @version: v2.1
***/

/** Fetch the custom usertags (Help:WikiTags/Users) **/
var fetchTags = function () {
    var app = new mw.Api();
    var params = {action: "query", format: "json", formatversion: 2, prop: "revisions", rvprop: "content", titles: "Help:WikiTags/Users"};
    var response = app.get(params).then(function (data) {
        return data;
    });
    
    return response;
};

/** Start working when the document's ready **/
$(document).ready(function() {
	setTimeout( function() {
		console.log("[WikiTags] Document ready!");
		fetchTags().then(function (data) {
			console.log("[WikiTags] Module fetch complete!");
			console.log("[WikiTags] Starting script...");
		    		
			var tags = data.query.pages[0].revisions[0].content.split("\n");
			var html = $(".user-identity-header__tag");
			var userheader = $('.user-identity-header__attributes');
			/** Stop working if the userheader is not found/the user is not in a User page. **/
			if (userheader.length === 0) return console.log("[WikiText] The script couldn't found any tags. Stopping...");
			var username = userheader[0].children[0].innerHTML;
					
			tags.forEach(function (index) {
				if (!index.includes(username)) return;
				else {
					var stags = index.split(",");
							
					// Remove every tag.
					html.remove();
					$.each(stags, function(i, item) {
						if (item === username) return;
						else userheader.append('<span class="user-identity-header__tag">' + item + '</span>');
					});
							
					console.log("[WikiTags] " + username + "'s tags has been replaced.");
				}
			});
			
			console.log("[WikiTags] Tags modifier loaded.");
		});
	}, 1000);
});