mw.hook("wikipage.content").add(function () {
    $("audio").get().forEach((audio) => audio.pause());
    if (document.querySelector("audio") == null) return;
    $("#page-header>div.page-header__top>div.page-header__meta").append(
        $("<a/>").addClass("audio-toggler").text("播放/暂停所有音频").css({ "background": "rgba(var(--theme-accent-color--rgb), 0.5)", "padding": "4px", "margin": "0 4px", "border-left": "5px solid rgba(var(--theme-border-color--rgb), 0.6)", "border-right": "5px solid rgba(var(--theme-border-color--rgb), 0.6)", "cursor": "pointer", "font-family": "'ZCOOL XiaoWei'" })
    );
    $("#page-header>div.page-header__top>div.page-header__meta").css({ "display": "inline" });
});