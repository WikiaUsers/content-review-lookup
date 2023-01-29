/* Any JavaScript here will be loaded for all users on every page load. */

/* TEMPLATE:USERNAME */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* FIRSTEDITDATE */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FirstEditDate.js',
    ]
});
/* AUTO CREATE USERPAGE */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoCreateUserPages.js',
    ]
});

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{Userpage}}',
        3: false
    },
    summary: 'Creating my pages',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

/* MSG BLOCK */

window.MessageBlock = {
	title : 'You have been blocked!',
	message : 'You have been blocked for the reason of \'$1\', your ban duration is $2.',
	autocheck : true
};