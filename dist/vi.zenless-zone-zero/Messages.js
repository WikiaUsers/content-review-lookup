// Code to make the toggle button from [[Template:Messages]] functional 
mw.hook('wikipage.content').add(function(){
	$('.zzw-messages-toggle').on('click', function(){
		$('.zzw-messages-show, .zzw-messages-hide').toggleClass('zzw-messages-show zzw-messages-hide');
	    $('.zzw-messages-toggle').each(function(_, element) {
			if (element.innerHTML === 'Hiển Thị Tin Nhắn Nhân Vật Nữ') {
				element.innerHTML = 'Hiển Thị Tin Nhắn Nhân Vật Nam';
			}
			else {
				element.innerHTML = 'Hiển Thị Tin Nhắn Nhân Vật Nữ';
			}
	    });
	});
});