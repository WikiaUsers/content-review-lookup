// ######################################## //
// ### Нові функції для Fairy Tail Wiki ### //
// ### Версія 1.0                       ### //
// ######################################## //
/* CustomGalleryButton by RyaNayR; Cqm; Prince(ss) Platinum; Bobogoobo; AnimatedCartoons; */
(function ($) {
    if ($('.wikia-photogallery-add').length) {
        var galleryButtonText = window.galleryButtonText || 'Додати фото / Редагувати галереї',
            galleryButtonIcon = window.galleryButtonIcon || 'https://images.wikia.nocookie.net/dev/images/a/af/Gallery-add-photo.gif',
            galleryButtonIconHidden = window.galleryButtonIconHidden || false;
        if (galleryButtonIconHidden) {
            $('.wikia-photogallery-add').text(galleryButtonText);
        } else {
            $('.wikia-photogallery-add').html('<img src="' + galleryButtonIcon + '" />&nbsp;' + galleryButtonText);
        }
    }
}(jQuery));
 
/* sliders using jquery by User:Tierrie */
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        $('.factions img').hide();
        $('.factions img').removeAttr('width').removeAttr('height');
        var l=$('.factions tr').eq(1).find('td').height();
        $('.factions tr').eq(1).find('img').css('max-height', l);
        $('.factions img').show();
        if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) {
            $('.factions tr').eq(1).find('td').width($('.factions img').width());
        }
        $('.id_upper').each(function() { 
            $(this).html($(this).html().toUpperCase()); 
        });
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
            return false;
        });
    });
});
 
/* Автовизначення ніку користувача */
if (wgUserName !== null) $('span.insertusername').text(wgUserName);
 
/* Автооновлення (Налаштування) */
var ajaxPages = [
    "Спеціальна:Watchlist",
    "Спеціальна:Contributions",
    "Спеціальна:WikiActivity",
    "Спеціальна:RecentChanges",
    "Спеціальна:NewFiles",
    "Спеціальна:Images"
];
var AjaxRCRefreshText = 'Автооновлення сторінки';
 
/* Закриття блоґу для коментування */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Цей блоґ був неактивний протягом <expiryDays> днів. Прохання не редагувати його.",
    nonexpiryCategory: "Архівні блоґи"
};
 
/* Неактивні користувачі */
InactiveUsers = { 
    months: 1,
    text: 'За межами Фіону' 
};
// ############################################# //
// ############################################# //
// ############################################# //