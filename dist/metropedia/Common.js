/* Автовизначення ніку користувача */
if (wgUserName !== null) $('span.insertusername').text(wgUserName);
 
/* Автооновлення (Налаштування) */
 var ajaxPages =["Спеціальна:Watchlist","Спеціальна:Contributions","Спеціальна:WikiActivity","Спеціальна:RecentChanges","Спеціальна:NewFiles", "Спеціальна:Images"];
var AjaxRCRefreshText = 'Автооновлення сторінки';
 
/* Закриття блоґу для коментування */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Цей блоґ був неактивний протягом <expiryDays> днів. Прохання не редагувати його.",
    nonexpiryCategory: "Метропедія:Архівні блоґи"
};

/* Неактивні користувачі */
InactiveUsers = { 
    months: 1,
    text: 'Покинув вікі-спільноту'
};