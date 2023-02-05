// ##################################### //
// ### Нові функції для Macross Wiki ### //
// ### Version 1.0                   ### //
// ##################################### //
/* Користувальницька костомізація кнопки галереї за авторством: RyaNayR, Cqm, Prince(ss) Platinum, Bobogoobo та AnimatedCartoons. */
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
    text: 'За межами флоту Макрос' 
};
// ##################################### //