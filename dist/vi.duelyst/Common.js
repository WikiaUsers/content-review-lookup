/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
$('.spoiler-full > .spoiler-header > .spoiler-button').on('click',function(){
   var a = $(this);
   var body = a.parent('.spoiler-header').next('.spoiler-body');
   if(a.attr('data-open') === 'false'){
      a.attr('data-open', 'true');
      a.text('[ Ẩn ]');
      body.css('display', 'block');
   } else {
      a.attr('data-open', 'false');
      a.text('[ Hiện ]');
      body.css('display', 'none');
   }
});
var spoiler = $('.spoiler-full > .spoiler-header > .spoiler-button'), length = spoiler.length;
for(var i = 0; i < length; i++){
   var a = spoiler.eq(i);
   var body = a.parent('.spoiler-header').next('.spoiler-body');
   if(a.attr('data-open') === 'false'){
      a.attr('data-open', 'true');
      a.text('[ Ẩn ]');
      body.css('display', 'block');
      a.trigger('click');
   }
}
$('#gameplay-navbox').detach().appendTo('#bodyContent');