//WikiaMenuBarIcons

$(function () {
    $(".subnav-3a").each(function () {
        //Or: $.each( $("p"), function() {
        var $menuItem = $(this);
        var sMenuText = $(this).text();
        var sImgName = sMenuText.match(/\@(.*)\@/);
        if (sImgName) {
            $.getJSON('/api.php?action=query&prop=imageinfo&titles=' + sImgName[1] + '&iiprop=url&format=json', function (data) {
                for (var first in data.query.pages) {
                    if (first) {
                        if (data.query.pages[first].imageinfo && data.query.pages[first].imageinfo[0]) {
                            url = data.query.pages[first].imageinfo[0].url;
                            url = url.replace('/latest', "/latest/scale-to-width/20");
                            var sNewItem = sMenuText.replace(sImgName[0], "<img src='" + url + "'>");
                            $menuItem.html(sNewItem);
                        }
                        return;
                    }
                }
            });
        }
    });
});