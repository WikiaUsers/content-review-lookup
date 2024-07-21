// Code to make the toggle button from [[Template:Messages]] functional 
mw.hook('wikipage.content').add(function(){
	$('.zzw-messages-toggle').on('click', function(){
		$('.zzw-messages-show, .zzw-messages-hide').toggleClass('zzw-messages-show zzw-messages-hide');
	    $('.zzw-messages-toggle').each(function(_, element) {
			if (element.innerHTML === 'Show Female Responses') {
				element.innerHTML = 'Show Male Responses';
			}
			else {
				element.innerHTML = 'Show Female Responses';
			}
	    });
	});
});