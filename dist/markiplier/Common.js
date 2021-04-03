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
    var query = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyAHeOiMJD0kKTYiGYuZkjZ7mggFkWd6foc&part=statistics"
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
$(function() {
    var htmlString = "";
    $.getJSON('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU7_YxT-KID8kRbqZo7MyscQ&maxResults=3&key=AIzaSyDLsZulAGiNeOxbYtLRdv-cLMAlUYqhaiE', function(data) {
        $.each(data.items, function(i, item) {
            var videoID = item['snippet']['resourceId']['videoId'];
            var title = item['snippet']['title'];
            htmlString += '<hr width="200"><div class="video"><a href="https://www.youtube.com/watch?v=' + videoID + '">';
            htmlString += '<img src="https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg" width="200"></a>';
            htmlString += '<a href="https://www.youtube.com/watch?v=' + videoID + '"><br>' + title + '</a></div>';
        });
        $('#youtube-channel-feed').html(htmlString);
    });
});