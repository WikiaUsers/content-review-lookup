$(function() {
	$('.userimage').each(function () {
		var currentelement = $(this).attr('id');
		var $self = $(this);
		$.ajax({
			url: 'http://rinzler135.wikia.com/api/v1/User/Details',
			data: 'ids='+currentelement,
			dataType: 'json',
		})
		.done(function(data) {
			var responseurl = data.items[0].avatar;
			var string = responseurl.split("/")[3];
			var reconstructed = "<image src='https://images.wikia.nocookie.net/"+string+"/scale-to-width-down/150#.png'>";
			$self.html(reconstructed);
		});
	});
});