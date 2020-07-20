//<source lang="javascript">
//Twitter Template by: Princess Platinum
$(function () {
    if (wgNamespaceNumber == 2) {
        var twitterName = $('.twitter-name').text();
        var embedCode = $('.twitter-code').text();
        var embedUI = '<a class="twitter-timeline" href="https://twitter.com/' + twitterName + '" data-widget-id="' + embedCode + '">Tweets by @' + twitterName + '</a>';
        $('#twitter-container').html(embedUI);
        ! function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs");
    }
});
//</source>