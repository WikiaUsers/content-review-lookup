// <syntaxhighlight lang="javascript">
// Gets a list of pages from a specific category
$(function () {
    var iPagesLimit = 20; // this is the limit of pages shown on each listing;
    var tagPages = $('.listcatpages');
    if (!tagPages.length) {
        return;
    }
    $(".listcatpages").each(function (index) {
        var oTag = $(this);
        var sCategoryName = $(this).text();
        mw.loader.using('mediawiki.api', function () {
            (new mw.Api())
                .get({
                titles: 'Category:' + sCategoryName,
                indexpageids: ''
            }).done(function (data) {
                if (data.query.pages[data.query.pageids[0]].missing === '') {
                    getPageList();
                }
            });
        });

        function getPageList() {
            $.get("/api.php?format=json&action=query&list=categorymembers&cmlimit=" + iPagesLimit + "&cmtitle=Category:" + sCategoryName, function (data, textStatus, jqXHR) {
                var sSeparator = "•";
                var arrPages = "";
                $.each(data.query.categorymembers, function (i, entries) {
                    arrPages += "<a href='" + "/wiki/" + entries.title + "'>" + entries.title + "</a>" + " •";
                });
                console.log(arrPages);
                oTag.html(arrPages);
            });
        }
    });
});
//</syntaxhighlight>