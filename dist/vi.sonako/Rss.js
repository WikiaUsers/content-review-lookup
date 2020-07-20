// Google Feed API: https://developers.google.com/feed/
// Inspiration: http://designshack.net/articles/javascript/build-an-automated-rss-feed-list-with-jquery/
function parseFeed(url, container) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
            // log object data in console
            console.log(data.responseData.feed);
            // append feed link and title in container
            $(container).append('<a href="' + url + '"><span class="iconicstroke-rss-alt"></span></a>');
            $(container).append('<h1 class="feed">' + data.responseData.feed.title + '</h1>');
            // for each entry... *
            $.each(data.responseData.feed.entries, function(key, value) {
                // * create new date object and pass in entry date
                var date = new Date(value.publishedDate);
                // * create months array
                var months = new Array(12);
                months[0] = 'January';
                months[1] = 'February';
                months[2] = 'March';
                months[3] = 'April';
                months[4] = 'May';
                months[5] = 'June';
                months[6] = 'July';
                months[7] = 'August';
                months[8] = 'September';
                months[9] = 'October';
                months[10] = 'November';
                months[11] = 'December';
                // * parse month, day and year
                var month = date.getMonth();
                var day = date.getDate();
                var year = date.getFullYear();
                // * assign entry variables
                var title = '<h3 class="title"><a href="' + value.link + '" target="_blank">' + value.title + '</a></h3>';
                var time = '<p class="time">' + months[month] + ' ' + day + ', ' + year + '</p>';
                var snippet = '<p class="snippet">' + value.contentSnippet + '</p>';
                var entry = '<div class="entry">' + title + time + snippet + '</div>';
                // * append entire entry in container
                $(container).append(entry);
            });
        },
        // if there's an error... *
        error: function(errorThrown) {
            // * log error message in console
            console.log(errorThrown);
            // * show error message
            alert('Có vấn đề. Bạn hãy Ctrl F5 lại xem.');
        }
    });
}

function Rss() {
    parseFeed('http://www.rssmix.com/u/8199946/rss.xml', '#sonakofeed');
}

$( function () {
    $(Rss);
    // ajaxrc support
    window.ajaxCallAgain = window.ajaxCallAgain || [];
    window.ajaxCallAgain.push(Rss);
});