/* MessageBlock */
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have been blocked on the Yash Raj Films Wiki for the following reason: $1. If you want to appeal this block, please leave a message at [[w:Community Central|Community Central]]. (Note: You may not get unblocked depending on the reason given.)',
	autocheck : true
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MessageBlock/code.js'
	]
});