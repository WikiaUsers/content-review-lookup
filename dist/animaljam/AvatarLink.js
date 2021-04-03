//<nowiki>
$(function() {
	$('.userimage').each(function () {
		var $self = $(this);
		//get encoded text
		var username = encodeURI($self.attr("id").replace(/\.[0-9A-F]{2}/g,function(hex) {return String.fromCharCode(parseInt(hex.slice(1), 16))}).replace(/_/g," "));
		$.ajax({
			url: 'https://animaljam.fandom.com/api/v1/User/Details',
			data: 'ids='+username,
			dataType: 'json',
		})
		.done(function(data) {
			//change image size to 150px
			var responseurl = data.items[0].avatar.replace(/100/g,$self.attr("title"));
			//replace element with image
			var reconstructed = "<image src='"+responseurl+"' />";
			$self.html(reconstructed);
		});
	});
});

//</nowiki>