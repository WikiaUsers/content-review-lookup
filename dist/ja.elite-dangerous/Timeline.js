$('.tag_switcher > p > span, .timeline .tag').click(function(){
    var tag = $(this).attr('class').replace('tag ','');
    if (tag == 'reset') {
        $('.timeline li').fadeIn(2000);
    } else {
        $('.timeline li').fadeOut(2000);
        $('.timeline li.'+tag).fadeIn(1000);
    }
});