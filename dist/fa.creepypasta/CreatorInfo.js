$(function () {
    var page = mw.config.get("wgPageName");

    new mw.Api().get({
        action: "query",
        prop: "revisions",
        titles: page,
        rvlimit: 1,
        rvdir: "newer",
        rvprop: "user",
        format: "json"
    }).done(function (creatorData) {

        var pages = creatorData.query.pages;
        var pageId = Object.keys(pages)[0];

        if (!pages[pageId].revisions) return;

        var creator = pages[pageId].revisions[0].user;

        new mw.Api().get({
            action: "query",
            prop: "revisions",
            titles: page,
            rvlimit: 1,
            rvprop: "user",
            format: "json"
        }).done(function (editorData) {

            var pages2 = editorData.query.pages;
            var pageId2 = Object.keys(pages2)[0];
            var editor = pages2[pageId2].revisions[0].user;

            var dark = document.documentElement.classList.contains("theme-fandomdesktop-dark") ||
        			   document.documentElement.classList.contains("theme-dark");

            var box = $("<div>").css({
                margin: "10px 0",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "var(--theme-page-background-color, transparent)",
                color: "inherit",
                fontSize: "14px",
                lineHeight: "1.6",
                textAlign: "right",
                display: "inline-block",
                direction: "rtl"
            });

            box.html(
                'این صفحه توسط <a href="' +
                mw.util.getUrl("User:" + creator) +
                '" style="font-weight:600;color:inherit;text-decoration:none;">' +
                creator +
                '</a> ایجاد شده است و آخرین بار توسط <a href="' +
                mw.util.getUrl("User:" + editor) +
                '" style="font-weight:600;color:inherit;text-decoration:none;">' +
                editor +
                '</a> ویرایش شده است.'
            );

            box.find("a").hover(
                function () {
                    $(this).css("text-decoration", "underline");
                },
                function () {
                    $(this).css("text-decoration", "none");
                }
            );

            $("#firstHeading").after(box);
        });
    });
});