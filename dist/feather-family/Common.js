/* Any JavaScript here will be loaded for all users on every page load. */
var DisplayTitle = document.getElementsByClassName("DisplayTitle");
var title =document.getElementsByClassName("page-header__title")[0];
for (var i=0; i<DisplayTitle.length; i++) {
    DisplayTitle[i].innerText = title.innerText;
}