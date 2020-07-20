// Fast Warnings
/* For sysops only */
$(function() {
    if (wgUserGroups.toString().search('sysop') == -1) {
        return;
    }
    var wel = 'Xin chào. \n\n',
        warns = {
            'Phá hoại/Xúc phạm' : wel + 'Xúc phạm/troll/gây war dưới bất cứ hình thức nào đều không được chào đón trên Sonako wiki. Tôi hi vọng đây chỉ là trường hợp cá biệt và mong bạn không tái diễn hành động này trong tương lai',
            'Thô tục'        : wel + 'Sử dụng ngôn từ thô tục không được chào đón trên Sonako wiki. Đừng bao giờ tái diễn lại hành động này trong tương lai',
            'Comment' : wel + 'Spam hay Comment không đúng chủ đề không được chào đón trên Sonako wiki. Tôi hi vọng đây chỉ là trường hợp cá biệt và mong bạn không tái diễn hành động này trong tương lai.',
            'Trang'      : wel + 'Lập trang rỗng hay trang dịch không đảm bảo chất lượng dịch thuật theo [[Thread:45659]] đều sẽ bị xóa và ban nick/IP trên Sonako. Mong bạn không tái diễn hành động này trong tương lai.',
            'Test năng lực'        : wel + 'Bạn mới đưa 1 trang dịch thuật lên Sonako song có vẻ bạn chưa thực hiện bài Test năng lực của Sonako. Để đảm bảo chất lượng dịch thuật trên Sonako, bạn bắt buộc phải thực hiện bài Test. Hãy xem thêm tại đây [[Sonako Tuyển quân]] để biết thêm chi tiết.'
        },
        Wform = '<fieldset style="border:solid 1px #36759c; margin:1em 0; padding:0 1em 1em;">'+
                    '<legend style="padding:7px;">Mẫu cảnh báo</legend>'+
                    '<input id="w-nick" type="text" placeholder="Điền tên User" style="width:305px; margin-bottom:5px; margin-right:5px;"><select id="w-type" />'+
                    '<textarea id="w-msg" type="text" placeholder="Tin nhắn bổ sung" style="resize:none; padding:1px; width:100%; height:50px;"></textarea>'+
                '</fieldset>';
    $(".WikiaBarWrapper .toolbar .tools").append('<button style="display:inline-block; margin:-1px 3px;" type="button" id="WarnLaunch">Cảnh báo</button>');
    $('#WarnLaunch').click(function() {
        $.showCustomModal('', Wform, {
            id: 'w-modal',
            width: 450,
            buttons: [{
                message: 'Gửi đi',
                handler: function(){
                    var header = $('#w-type option:selected').text(),
                        text = warns[header];
                    if ($('#w-msg').val() !== '') {
                        text += '\n\n' + $('#w-msg').val();
                    }
                    $.post('/wikia.php', {
                        controller:'WallExternal',
                        method:'postNewMessage',
                        format:'json',
                        body:text,
                        messagetitle:header,
                        notifyeveryone:'0',
                        pagetitle:$('#w-nick').val(),
                        pagenamespace:'1200'
                    }).done(function() {
                        $('#w-modal').closeModal();
                    });
                }
            }]
        });
        for(var key in warns) {
            $("#w-type").append('<option>'+key+'</option>');
        }
    });
});