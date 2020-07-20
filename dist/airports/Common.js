/* Any JavaScript here will be loaded for all users on every page load. */
/* RunwayFinder charts (kind of broken) */
$('#chart').html('<a href="http://www.runwayfinder.com/?loc='+$('#chart').html()+'"><img alt="chart" src="http://www.runwayfinder.com/staticmap/'+$('#chart').html()+'/?size=200" /></a>');

/* Relevant Flickr image search*/
var flickrKey = 'f94a2888a864ce4622fd18be21508f45';
$('#airport_image a.new').each(function() {
	var pattern = /....(?=.png$)/;
	var identifier = pattern.exec($(this).attr('title'));
	var apiEndpoint = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+flickrKey+'&format=json&nojsoncallback=1&license=4,5&per_page=1&tags='+identifier;
	$.ajax({
		url: apiEndpoint,
		dataType: 'json',
		success: function(data) {
			var photo = data.photos.photo[0];
			if (typeof photo != "object") return false;
			var photoUrl = "http://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
			var linkURL = "http://www.flickr.com/photos/"+photo.owner+"/"+photo.id;
			var createLink = $('#airport_image a.new').attr('href');
			$('#airport_image a.new').html('<img src="'+photoUrl+'" />');
			$('#airport_image a.new').after('<br style="clear:both;" /><div class="flickr_source">(<a href="'+linkURL+'">source</a>)</div><div class="flickr_caption"><a class="new" href="'+createLink+'">Temporary image - click to add a new one</a></div>');
		},
	});
});