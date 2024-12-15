$(function(){
	var talkLink = $('.ns-110 #ca-talk');
	
	if (talkLink.length === 0){
		return;
	}
	
	talkLink.parent().remove();
});