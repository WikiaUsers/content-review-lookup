// ############################################# //
// ### Нові функції для High School DxD Wiki ### //
// ### Version 1.0                           ### //
// ############################################# //
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
 
//================================
//          jQuery Slider
//================================
 
// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie"
 
mw.loader.using(["jquery.cookie"]);
 
mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");
 
  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });
 
  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
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
    nonexpiryCategory: "Архівні блоги"
};
 
/* Неактивні користувачі */
InactiveUsers = { 
    months: 1,
    text: 'За межами High School DxD Wiki' 
};
// ############################################# //
// ############################################# //
// ############################################# //