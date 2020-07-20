//<nowiki>
$(function() {
	$('.userimage').each(function () {
		var $self = $(this);
		//get encoded text
		var username = encodeURI($self.text());
		$.ajax({
			url: 'http://animaljam.wikia.com/api/v1/User/Details',
			data: 'ids='+username,
			dataType: 'json',
		})
		.done(function(data) {
			//change image size to 150px
			var responseurl = data.items[0].avatar.replace(/down\/100/,"down/150");
			//replace element with image
			var reconstructed = "<image src='"+responseurl+"' />";
			$self.html(reconstructed);
		});
	});
});

//</nowiki>