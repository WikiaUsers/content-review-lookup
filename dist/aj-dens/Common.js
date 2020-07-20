/* Any JavaScript here will be loaded for all users on every page load. */

/*Code used for Template:Username.*/

$(function () {
    var name;
    if (!wgUserName) {
        name = "fellow wikian";
    } else {
        name = wgUserName;
    }
    $('span.insertusername').text(name);
});

/*Code for preventing comments on old blogs. Credits: DEV Wiki*/
window.LockOldBlogs = {
    expiryDays: 21,
    expiryMessage: "There is no need to comment on this blog as it has not been commented on for over 3 weeks.",
};

/*Code for sending an automatic message when a user is blocked*/
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have been $1, which is against our rules. If you have questions regarding your block, contact the blocking adminsitrator on another wiki, such as Community Central. ',
  autocheck : true
};