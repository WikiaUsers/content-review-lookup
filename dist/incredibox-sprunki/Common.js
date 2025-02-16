/* Any JavaScript here will be loaded for all users on every page load. */
/*Locking old comments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 7;
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.namespaceNumbers = [0];

/*Message Walls notice*/
mw.hook('messageWall.activated').add(function () {
const appContainer = document.querySelector('.message-wall-app');
const postsContainer = document.querySelector('.MessageWallForum');
const helloMessage = document.createElement('div');
helloMessage.textContent = 'Reminder: Be respectful of other users and Message Wall messages are public so do not engage in inappropriate conversations.';
helloMessage.style.color = 'red';
helloMessage.style.padding = '10px';
helloMessage.style.border = '1px solid red';
helloMessage.style.margin = '0 0 12px';
appContainer.insertBefore(helloMessage, postsContainer);
})