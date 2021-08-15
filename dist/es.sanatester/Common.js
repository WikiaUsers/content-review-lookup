var fetchTags = function () {
    var app = new mw.Api();

    var params = {action: "query", format: "json", formatversion: 2, prop: "revisions", rvprop: "content", titles: "Tags"};
    var response = app.get(params).then(function (data) {
        return data;
    });
    return response;
};

$(document).ready(function() {
	fetchTags().then(function (data) {
	    setTimeout(function() {
	    		console.log("starting usertags");
	    		console.log("page fetch complete!");
	    		
		        var tags = data.query.pages[0].revisions[0].content.split("|");
		        var html = $(".user-identity-header__tag");
				var userheader = $('.user-identity-header__attributes');
				if (userheader.length === 0) return console.log("there are no tags, stop running the script...");
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
						
				        /*$.each(userheader, function (index, element) {
							
							userheader.toArray().forEach(function(tag) {
					            switch(element.innerHTML) {
					                case mw.messages.values["userprofile-global-tag-bureaucrat"]:
					                    element.innerHTML = "Sanita";
					                    console.log("Replaced bureaucrat tag");
					                    break;
					                case mw.messages.values["userprofile-global-tag-sysop"]:
					                    element.innerHTML = "ONCE";
					                    console.log("Replaced sysop tag");
					                    break;
					                default:
					                    break;
					            }
							});
				        });*/
					}
				});
		
		        console.log("usertag modifier loaded");
			}, 1000);
	});
});