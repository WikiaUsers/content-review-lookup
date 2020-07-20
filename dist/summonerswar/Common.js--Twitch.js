/* Any JavaScript here will be loaded for all users on every page load. */
$(function(){
	var spans = document.getElementsByTagName("span");
	for (var index = 0; index < spans.length; index++) {
		if (spans[index].getAttribute("class")) {
			if (spans[index].getAttribute("class")=="TwitchFeedList") {
				if (spans[index].getAttribute("data-widget-id")) {
					var workingSpan = spans[index];
					var dwi = workingSpan.getAttribute("data-widget-id");
					var workingIndex = index;
					var target = "https://api.twitch.tv/" + dwi;
					$.getJSON(target).done(function(data){
						for (var i = 0; i < data.streams.length; i++) {
							workingSpan.innerHTML += "<div style='background:white; padding-left:10px; padding-top:10px; font-size:small;'>" + "<a href='" + data.streams[i].channel["url"] + "'><img src='https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/4/43/Twitch_icon.png' width='20px'/> " + data.streams[i].channel["status"] + "</a> " + "<br />" + "&nbsp; &nbsp; &nbsp;" + data.streams[i].channel["display_name"] + " - " + data.streams[i].viewers + " Viewers <br />" + '<div style="height:10px;"></div> </div>';
						}
					}).fail(function( badCode, status, err ){});
				}
			}
		}
	}
});
$("span.TwitchFeedList").css("display", "block");
//