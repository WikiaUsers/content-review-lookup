//Event rail module
$(function(){
	mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(
		function() {
			//creating the module in DOM
			var eventWrapper = document.createElement("div");
			eventWrapper.classList.add("rail-module", "RightRailEventWrapper");
			eventWrapper.id = "bss-wiki-right-rail-event";
			document.querySelector(".right-rail-wrapper").prepend(eventWrapper);
				
			var header = "<h2>Events</h2><br>\n";
			$("#"+eventWrapper.id).append(header);
			
			var url = mw.util.wikiScript(),
				params = {
				action: 'raw',
				title: 'Project:EventRightRail'
			};
			
			jQuery.get(url, params, function(data) {
				console.log(data);
				if (!data.length) 
				{
					$("#"+eventWrapper.id).append("<p> There are currently no active events. </p>");
					return;
				}
				$("#"+eventWrapper.id).append(data);
			}).fail(function(data) {
				$("#"+eventWrapper.id).append("<p> There are currently no active events. </p>");
			});
		}
	);
});