var fetchTags = function() {
	let resp = fetch("https://sanatester.fandom.com/es/api.php?action=query&prop=revisions&titles=Tags&rvslots=%2A&rvprop=content&formatversion=2&format=json").then(function(response) { response.json() }).then(function(res) { console.log(res) } );
	return resp;
};

$(document).ready(function() {
	var userTags = fetchTags();
	
    setTimeout(function() {
    		console.log("starting usertags");
    		
	        var tags = userTags.query.pages[0].revisions[0].slots.main.content.split("|");
	        var html = $(".user-identity-header__tag");
			var userheader = $('.user-identity-header__attributes');
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
		}, 3000);
});