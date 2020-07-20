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

$('.Wall.Board').on('keypress','.cke_source',function(e) {
    if(e.which === 13 && e.ctrlKey) {
	$(this).closest('.SpeechBubble').find('.replyButton').click();
    }
});

Wall.Pagination.prototype.switchPage = (function(_super) {
    return function() {
	console.log(event);
        _super.call(this,event);
	console.log('MessageWall page',page);
        window.location.hash = '#page-' + page;
    }
})(Wall.Pagination.prototype.switchPage);
$('.Wall').on('click', '.Pagination a', Wall.Pagination.prototype.switchPage.bind(this,event));