$(() => {
	const talkLink = $('.ns-110 #ca-talk');
	if (!talkLink.length){
		return;
	}
	talkLink.parent().remove();
});