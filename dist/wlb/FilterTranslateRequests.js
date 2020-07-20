if (wgArticleId === 10504 || wgArticleId === 3462 ) {

importScriptPage('Template:Javascript_Localization', 'wlb');

/* delay to load the messages */
setTimeout(function() {

type = "translate"; //$("#request-type").val();

$("#language").html('<div style="color: #eee; background: #0E0E0E; border: 2px solid #0E0E0E; border-radius: 3px; padding: 5px 10px; font-size: 96%; line-height: 1.3em">' + msg.get('ftr-bar-show') + '<select id="status"><option value="open">open</option><option value="completed">completed</option></select> translation requests <select id="direction"><option value="from">from</option><option value="to">to</option></select><!--   -->&nbsp;<select id="request-language">' + language_dropdown + '</select>&nbsp;<button onclick="generateRequests()">Search</button></div>');

function generateRequests() {

	to_language = "To+" + $("#language select#request-language").val();
	from_language = $("#language select#request-language").val();
	
	if($("#language #direction").val() === "from") { 
		language = from_language;
	} else if ($("#language #direction").val() === "to") {
		language = to_language;
	}
	
	status = $("#language select#status").val();
	
	if(status === "open") { 
		status_url = "New";
	} else if (status === "completed") {
		status_url = "Completed";
	}
	$.getJSON("http://wlb.wikia.com/api.php?action=query&list=categoryintersection&limit=10&categories=Category:" + status_url +  "+translations|Category:" + language + "&format=json")
	.done(function(data, i) {

		list_of_requests = [];
		list_of_requests_li = [];

		var i;
		for (i = 0; i < data.query.categoryintersection.length; ++i) {

			list_of_requests_li[i] = '<li class="request-item"><a id="' + data.query.categoryintersection[i].pageid + '" href="http://wlb.wikia.com/wiki/' + encodeURIComponent(data.query.categoryintersection[i].title) + '">' + data.query.categoryintersection[i].title + '</a></li>';
			list_of_requests[i] = data.query.categoryintersection[i].title;

		}
	});
	
	setTimeout(function() {
		
		$("#request-table").html(list_of_requests_li);
		
		setTimeout(function () {
			$("li.request-item").each(function () {
				id = $(this).find("a").attr("id");
				title = $(this).find("a").text();
				/* $(this).append('<div class="request-preview"><div style="display: none;"></div></div>');
				$(this).find(".request-preview div").load("http://wlb.wikia.com/wiki/" + encodeURIComponent(title) + "?&action=render");
				preview = $(".request-preview div #mw-content-text").find("p:nth-child(2)").text();
				$(this).find(".request-preview").prepend(preview);
				*/
			});
		}, 1000);
		
	}, 1000);
}

$("body").append("<style>"
+ "#request-table li {"
+ "list-style: none; margin: 0; padding: 5px; border-bottom: 1px solid #999;"
+ "}"
+ "#request-table li:last-child {"
+ "border-bottom: 0;"
+ "}"
+ "#request-table {"
+ "margin-top: 1em; padding: 0 10px;"
+ "background: #efefef;"
+ "}"
+ "</style>");

$("#request-table > p").remove();

}, 1500);
/* ^ end delay of delay for loading messages */
}