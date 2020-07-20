// Сделать видимыми комменты для администрации в шаблонах-плашках
mw.hook("wikipage.content").add(function($content) {
    if (
        /sysop|vstf|staff|helper|content-volunteer|content-moderator/.test(mw.config.get('wgUserGroups').join())
    ) {
        $content.find(".mbox__content__text__admin").removeClass("mbox__content__text__admin");
    }
});