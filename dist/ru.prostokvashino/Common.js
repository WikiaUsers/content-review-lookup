/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Автообновление
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматическое обновление страницы';
 
document.querySelector(".premium-recirculation-rail h2").innerHTML = "Популярные статьи";

/* VK-виджет */
+function (cfg) {
    // reinit vk widgets by new params; +wikipage.content hook support,
    // that missed in the original widget. @user:fngplg, 2018 <pre>
    // forward-compatible w\ any possbile option: https://vk.com/dev/widget_community
    // mw.hook('fng.vkwidget').fire(widgetid)
    // <span class="vk" data-no_cover="1" mode="1"><vk group-id="24586581"/></span>
 
    if (cfg.loaded) return;
    cfg.loaded = true;
 
    var mwc = mw.config.get(['wgAction']);
 
    function callback($content) {
        if ($content.hasClass('mw-content-text')) cfg.mwcprocessed = true;
        if (['edit', 'submit'].indexOf(mwc.wgAction) === -1 && !cfg.mwcprocessed && cfg.fixContentHook !== false) {
            cfg.mwcprocessed = true;
            callback($('#mw-content-text'));
        }
        var $widgets = $content.find('[data-wikia-widget="vk"]');
        if (!$widgets.length) return;
        mw.loader.load('ext.wikia.VKTag');// async w\o cb ftt
        var timer = setInterval(function() {
            if (!window.VK || !window.VK.Widgets) return;
            clearInterval(timer);
            $widgets.each(function() {
                var $this = $(this),
                    elementId = $this.attr('id'),
                    options = $this.data(),
                    groupId = options.groupId,
                    addOptions = $this.closest('.vk').data();
                if ($this.find('iframe').length && !Object.keys(addOptions).length) return;// there is nothing to do
                options = $.extend({}, options, addOptions);
                setTimeout(function() {
                    $('#' + elementId).children().remove();// remove previous one
                    mw.hook('fng.vkwidget').fire(window.VK.Widgets.Group(elementId, options, groupId));
                }, 100);
            });
        }, 100);
    }// callback
 
    mw.hook('wikipage.content').add(callback);
}((window.fng = window.fng || {vkwidget:{}}).vkwidget = window.fng.vkwidget || {});