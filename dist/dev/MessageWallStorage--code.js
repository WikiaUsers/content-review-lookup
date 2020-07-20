$('.Wall.Board').on('input','.cke_source',function() {
    parent = $(this).closest('.SpeechBubble');
    if(parent.hasClass('new-reply')) {
	sessionStorage.setItem('message_wall_' + wgArticleId + '_tread_' + parent.parents('.SpeechBubble').data('id'),$(this).val());
    }
    else if(parent.hasClass('new-message')) {
	sessionStorage.setItem('message_wall_' + wgArticleId + '_tread_new',$(this).val());
    }
});
 
$('.Wall.Board').on('focus','.cke_source',function() {
    parent = $(this).closest('.SpeechBubble');
    if(parent.hasClass('new-reply')) {
	$(this).val(sessionStorage.getItem('message_wall_' + wgArticleId + '_tread_' + parent.parents('.SpeechBubble').data('id')));
    }
    else if(parent.hasClass('new-message')) {
	$(this).val(sessionStorage.getItem('message_wall_' + wgArticleId + '_tread_new'));
    }
});