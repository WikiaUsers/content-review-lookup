/* Any JavaScript here will be loaded for all users on every page load. */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'Defaultuserpage}}',
        3: false,
        1202: false
    },
    summary: 'Making my new user page!',
    notify: '<a href="/wiki/User:$2">Welcome to the wiki! You can start by visiting your userpage, $1!</a>'
};

window.MessageBlock = {
	title : 'You have been blocked!',
	message : 'You have been blocked for the reason of \'$1\', your ban duration is $2.',
	autocheck : true
};

window.mbPartialStyle = 'opacity: 0.5; color: #cc4949;';
window.mbTempStyle = 'opacity: 0.7; text-decoration: line-through; color: #b03030;';
window.mbIndefStyle = 'opacity: 0.4; font-style: italic; text-decoration: line-through; color: #782626;';