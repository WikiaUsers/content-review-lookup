$("#mw-revision-info").append($("<a>", {
    id: "thank",
    title: "Gửi lời cảm ơn tới người dịch chương/tập này (♥o♥)",
    html: "Cảm ơn bạn"
}).on("click", function() {
    thank(wgRevisionId);
}));
$("#mw-diff-ntitle2").append($("<a>", {
    id: "thank",
    title: "Gửi lời cảm ơn tới người dịch/viết chương/tập này (♥o♥)",
    html: "Cảm ơn bạn"
}).on("click", function() {
    thank($("a[data-action=revision-link-after]").attr("href").split("oldid=")[1]);
}));
if (typeof wgRevisionId != "undefined" && wgCurRevisionId == wgRevisionId) $(".WikiaPageHeader > .comments").after($("<a>", {
    id: "thank",
    title: "Gửi lời cảm ơn tới người dịch/viết chương/tập này (♥o♥)",
    html: "Cảm ơn bạn"
}).on("click", function() {
    thank(wgRevisionId);
}));

function thank(revid) {
    if (typeof revid == "undefined") {
        console.log("No revid");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/wikia.php?controller=ContributionAppreciation&method=appreciate",
        data: {
            "revision": revid,
            "token": mw.user.tokens.get("editToken")
        },
        success: function(data) {
            console.log("success");
            console.log(data);
            $("#thank").html("Đã gửi (^o^)");
        }
    });
}