/**
 * Skrypt służy do wyświetlania 4 ostatnich tematów Dyskusji
 * wewnątrz tagów DIV o klasie discussions-module.
 * Skrypt przeznaczony głównie na Stronę główną
 * 
 * @author  MGRINZ
 */

$(function () {
    var config = mw.config.get([
        "wgCityId",
        "wgServer",
        "wgScriptPath",
        "wgArticlePath"
    ]);
    config.wgArticlePath = config.wgArticlePath.slice(0, -2);
    
	var api = new mw.Api();
	
	var $moduleRoot = $("div.discussions-module");
	
	if(!$moduleRoot.length)
		return;

	$moduleRoot.empty();

	var $moreLink = $("<a>")
		.attr("href", config.wgServer + config.wgScriptPath + "/f")
		.addClass("more");
		
	api.loadMessages(["oasis-more"]).then(function () {
		$moreLink
			.text(mw.messages.get("oasis-more"))
	});
	
    $.ajax("https://services.fandom.com/discussion/" + config.wgCityId + "/threads", {
        method: "get",
        data: {
            limit: 4,
            sortBy: "trending",
            responseGroup: "small",
            viewableOnly: "true"
        }
    }).done(function (result) {
        var threads = result._embedded.threads;
        for(var i = 0; i < threads.length; i++)
            $moduleRoot.append(createThreadItem(threads[i]))
		$moduleRoot.append($moreLink)
    });
    
    function createThreadItem(thread) {
		var userPageUrl = config.wgArticlePath + "User:" + thread.createdBy.name;
		var threadUrl = config.wgServer + config.wgScriptPath + "/f/p/" + thread.id;
		var userAvatarUrl = thread.createdBy.avatarUrl + "/scale-to-width-down/50";
		var defaultAvatarUrl = "https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/50";
		
		if(thread.createdBy.name === null)
			userPageUrl = "#";
		
		if(thread.createdBy.avatarUrl === null)
			userAvatarUrl = defaultAvatarUrl;
		
        var $threadItem = $("<div>")
            .addClass("discussions-module-thread");
            
        var $threadAvatar = $("<a>")
			.addClass("discussions-module-avatar")
			.attr("href", userPageUrl)
			
		var $threadAvatarImage = $("<img>")
            .attr("src", userAvatarUrl);
			
		$threadAvatar.append($threadAvatarImage);
			
        var $threadTitle = $("<a>")
            .addClass("discussions-module-title")
            .attr("href", threadUrl)
            .text(thread.title);
            
        var $threadDetails = $("<div>")
            .addClass("discussions-module-details");

		var $threadTitleDetailsWrapper = $("<div>");
		$threadTitleDetailsWrapper
            .append($threadTitle)
            .append($threadDetails);
            
        var $threadUsername = $("<a>")
            .attr("href", userPageUrl)
            .text(thread.createdBy.name);
           
		var $threadDate = $("<span>")
		epochToTimeAgo(thread.creationDate.epochSecond).then(function (timeAgo) {
			$threadDate.text(" • " + timeAgo)
		});
        
        $threadItem
            .append($threadAvatar)
            .append($threadTitleDetailsWrapper);
            
        $threadDetails
            .append($threadUsername)
            .append($threadDate);
        
        return $threadItem;
    }
	
	/**
	 * epochToTimeAgo
	 * 
	 * Pożyczone z dev:MediaWiki:DiscussionsActivity.js
	 * i dostosowane na potrzeby tego skryptu
	 */
	
	function epochToTimeAgo (epoch) {
		return new Promise(function (resolve, reject) {
			var elapsed = (Math.floor(new Date().getTime()) - new Date(epoch * 1000)) / 1000;
			var factors = [['second', 60], ['minute', 60], ['hour', 24], ['day', 30], ['month', 12], ['year']];
			var unit;
			var message;
			var i = 0;

			for (; i < factors.length && elapsed >= factors[i][1]; i++) {
				elapsed /= factors[i][1];
			}

			unit = factors[i][0];
			elapsed = Math.floor(elapsed);

			message = mw.messages.get("timeago-" + unit).replaceAll(/\$1/g, elapsed);
			
			api.get({
				action: "parse",
				format: "json",
				text: message,
				disablelimitreport: "1",
				disablepp: "1"
			}).then(function (result) {
				var parsedText = result.parse.text["*"];
				resolve($(parsedText).text())
			})
		});
	}
});