/* Any JavaScript here will be loaded for all users on every page load. */

// Import Scripts
// MediaWiki:ImportJS

// Youtube stats loader
mw.loader.load('https://apis.google.com/js/api.js');
$(function() {
    var yt_use = "id"
    var channel = "UC7_YxT-KID8kRbqZo7MyscQ"
    if (document.getElementById("ytparse_channelname") !== null) {
        yt_use = "name";
        channel = document.getElementById("ytparse_channelname").innerText;
    }
    if (document.getElementById("ytparse_channelid") !== null) {
        yt_use = "id";
        channel = document.getElementById("ytparse_channelid").innerText;
    }
    var query = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyAFxR8UAOYCC7aJlWscKvI5UjhS6AZ68AE&part=statistics"
    if (yt_use == "id"){ query += '&id='+channel;}
    if (yt_use == "name"){ query += '&forUsername='+channel;}
    $.get(query, function (data) {
        $.each(data.items, function (i, item) {
            var viwesout = Number(item.statistics.viewCount).toLocaleString();
            var subsout = Number(item.statistics.subscriberCount).toLocaleString();
            var vidout = Number(item.statistics.videoCount).toLocaleString();
            $('#ytparse_views').html(viwesout);
            $('#ytparse_subs').html(subsout);
            $('#ytparse_vids').html(vidout);
        });
    })
});

//Youtube video feed
//$(function() {
//    var htmlString = "";
//    $.getJSON('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU7_YxT-KID8kRbqZo7MyscQ&maxResults=3&key=AIzaSyDLsZulAGiNeOxbYtLRdv-cLMAlUYqhaiE', function(data) {
//        $.each(data.items, function(i, item) {
//            var videoID = item['snippet']['resourceId']['videoId'];
//            var title = item['snippet']['title'];
//            htmlString += '<hr width="200"><div class="video"><a href="https://www.youtube.com/watch?v=' + videoID + '">';
//            htmlString += '<img src="https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg" width="200"></a>';
//            htmlString += '<a href="https://www.youtube.com/watch?v=' + videoID + '"><br>' + title + '</a></div>';
//        });
//        $('#youtube-channel-feed').html(htmlString);
//    });
//});

//Youtube video feed but through RSS and not G-API
$(function() {
	var RSS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';
	var RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC7_YxT-KID8kRbqZo7MyscQ';
	$.getJSON(RSS_PROXY+RSS_URL, function (data) {
		var yt_rss_feed = document.getElementById("youtube-channel-feed");
		yt_rss_feed.innerText = "";
		for (var key in data.items.slice(0,3)){
			var feed = data.items[key];
			var vi_link = feed.link;
			var vi_title = feed.title;
			var vi_date = feed.pubDate;

			var vi_id = vi_link.split('v=')[1];
			
			var hr = document.createElement("hr");
			hr.width = 200;
			yt_rss_feed.appendChild(hr);

			var img_a = document.createElement("a");
			img_a.href = vi_link;
			var img = document.createElement("img");
			var thumbnail_link = "https://img.youtube.com/vi/" + vi_id + "/maxresdefault.jpg";
			img.src = thumbnail_link;
			img.width = 200;
			img_a.appendChild(img);
			yt_rss_feed.appendChild(img_a);
			
			var br = document.createElement("br");
			yt_rss_feed.appendChild(br);
			
			var link = document.createElement("a");
			link.href = vi_link;
			link.text = vi_title;
			yt_rss_feed.appendChild(link);
			
			br = document.createElement("br");
			yt_rss_feed.appendChild(br);
			
			//var span = document.createElement("span");
			//span.innerText = vi_date;
			//yt_rss_feed.appendChild(span);
		}
	});
});