//<s>偷后室的</s>
mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    // 单页内联CSS与CSS触发器
    // $("span.import-css").each(function () {
    //     var css = mw.util.addCSS($(this).attr("data-css"));
    //     $(css.ownerNode).addClass("import-css")
    //         .attr("data-css-hash", $(this).attr("data-css-hash"))
    //         .attr("data-from", $(this).attr("data-from"))
    //         .attr("data-trigger", $(this).attr("data-trigger"));
    //     var trigger = $(this).attr("data-trigger");
    //     var triggerOpened = false;
    //     if (trigger != "none") {
    //         css.disabled = true;
    //         $(".csstrigger-" + trigger).click(function () {
    //             css.disabled = !css.disabled;
    //             triggerOpened = true;
    //         });
    //     }
    //     $(".css-toggler").click(function () {
    //         if ((trigger != "none" && triggerOpened) || (trigger == "none")) css.disabled = !css.disabled;
    //     });
    // });

    // 播放或暂停所有音频
    $(".audio-toggler").click(function () {
        $("audio").get().forEach(function (audio) { if (audio.paused || audio.ended) { audio.play(); } else { audio.pause(); } });
    });

    // 站点公告切换
    $(".sitenotice-tab-container").each(function () {
        var container = $(this);
        function switchTab(offset) {
            return function () {
                var tabs = container.children(".sitenotice-tab").toArray();
                var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
                var count = tabs.length;
                if (no < 1) no = count;
                else if (no > count) no = 1;
                for (var i = 0; i < count; i++)
                    tabs[i].style.display = (i + 1 == no ? null : "none");
                container.find(".sitenotice-tab-no")[0].innerText = no;
            };
        }
        container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
        container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
    });
});