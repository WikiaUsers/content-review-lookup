/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
    var a = localStorage.getItem('RefPopupsJS');
    a = a ? JSON.parse(a) : {react: "hover", hoverDelay: 200, animate: false, disabled: false, stick: false};
    a.animate = false;
    localStorage.setItem('RefPopupsJS', JSON.stringify(a));
}());

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];