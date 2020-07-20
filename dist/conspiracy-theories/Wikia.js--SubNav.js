/* <source lang="javascript"> */
 
/* Adding Level 4 to Navigation */
/* Courtesy of Terraria Wiki */

$(function() {
 
    var adminList, nav = $('.WikiHeader nav');
    var chevron = '<img height="0" width="0" class="chevron-right" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" />';
 
    // Administrators
    // this may need to be changed in the future to suit usernames with special characters
    adminList = ['Yuzura', 'BlazeFireXXXX', 'Epsilon_Master', 'XGlass_Reflection'];
 
    for (var i = 0, list = '', name; i < adminList.length; i++) {
        name = adminList[i];
        list += '<li><a href="/wiki/User:' + name + '" class="subnav-3a"><span style="color: #FFF; font-weight: normal;">' + name.replace('_', ' ') +'</span>' + chevron + '</a><ul><li><a href="/wiki/User:' + name + '"><span style="color: #FFF; font-weight: normal;">Profile</span></a></li><li><a href="/wiki/User_talk:' + name + '">Talk Page</a></li><li><a href="/wiki/User_blog:' + name + '">Blog</a></li><li><a href="/wiki/Special:Contributions/' + name + '">Contributions</a></li><li><a href="/wiki/Special:Log/' + name + '">Log</a></li></ul></li>';
    }
 
    $('.WikiHeader nav').find('a[href="/wiki/Project:Administrators"] + .subnav-3').html(list);
 
});