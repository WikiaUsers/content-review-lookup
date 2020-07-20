/* Any JavaScript here will be loaded for all users on every page load. */
// Function: Adds "My Blog" to the UserDropdownMenu.
function UserBlogMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:MyBlog">Ваш блог</a></li>');
}
 
addOnloadHook(UserBlogMenuItem);

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Ваш вклад</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);

function UserDraftMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:MyPage/Черновик">Ваш черновик</a></li>');
}
 
addOnloadHook(UserDraftMenuItem);

function UserForumMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Forum">Форум</a></li>');
}
 
addOnloadHook(UserForumMenuItem);

function UserListUsersMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Listusers">Список участников</a></li>');
}
 
addOnloadHook(UserListUsersMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
  }
}