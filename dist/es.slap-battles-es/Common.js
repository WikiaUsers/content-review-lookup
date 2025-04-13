/* Any JavaScript here will be loaded for all users on every page load. */

/* AutoCreateUserPages configurations */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'Defaultuserpage}}',
        3: false,
        1202: false
    },
    summary: 'Making my new user page!',
    notify: '<a href="/wiki/User:$2">Welcome to the wiki! You can start by visiting your userpage, $1!</a>'
};

/* MessageBlock configurations */
window.MessageBlock = {
	title : 'You have been blocked!',
	message : 'You have been blocked for the reason of \'$1\', your ban duration is $2.',
	autocheck : true
};

/* MarkBlocked configurations */
window.mbPartialStyle = 'opacity: 0.5; color: #cc4949;';
window.mbTempStyle = 'opacity: 0.7; text-decoration: line-through; color: #b03030;';
window.mbIndefStyle = 'opacity: 0.4; font-style: italic; text-decoration: line-through; color: #782626;';

/* LockOldComments configurations */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.limit = 30;

/* --- UserAvatarFetch automatic image injection --- */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.UserAvatarFetch').each(function() {
        var $container = $(this);
        var username = $container.find('.avi-thisUsername').text().trim();
        var size = $container.find('.avi-thisSize').text().trim() || "100";
        var link = $container.find('.avi-thisLink').text().trim();

        if (!username) return;

        var imgUrl = 'https://static.wikia.nocookie.net/__cb0/user_avatar/' + encodeURIComponent(username) + '/avatar.png/revision/latest/scale-to-width-down/' + size;

        var $img = $('<img>', {
            src: imgUrl,
            width: size,
            height: size,
            alt: username,
            style: 'border-radius: 50%; object-fit: cover;'
        });

        if (link) {
            $img = $('<a>', { href: link }).append($img);
        }

        $container.append($img);
    });
});