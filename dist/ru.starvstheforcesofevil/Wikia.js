
!function() {
    var host = location.host.split(".");
    host = host[host.length-3];
    $(".WikiaArticleInterlang a").each(function() {
        var $this = $(this),
            lang = $this.attr('tracking').replace('interwiki-', '');
        lang = lang == "en" ? "" : lang + ".";
        var title = $this.attr('href').split('/wiki/')[1];
        if (title === '') return;
        var query = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20json%20WHERE%20url%3D%22http%3A%2F%2F" + lang + host + ".wikia.com%2Fapi%2Fv1%2FArticles%2FDetails%3Fids%3D1%26titles%3D" + encodeURIComponent(title) +"%26abstract%3D0%26width%3D0%26height%3D0%22%20AND%20itemPath%3D%22json.items.*.id%22&format=json";
        console.log(title);
        console.log(encodeURIComponent(title));
        console.log(lang);
        $.get(query, function(d) {
            if (d.query.results === null) {
                $this.addClass("new");
            }
        });
    });
}();