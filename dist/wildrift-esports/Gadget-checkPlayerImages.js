function checkMetadata($gallery) {
	var a = new mw.Api();
	$gallery.find('.image').each(function() {
		var $file = $(this);
		var fileName = $file.attr('href').replace('/', '').replace(/_/g,' ');
		console.log(fileName);
		return a.get({
			action: 'cargoquery',
			tables: 'PlayerImages',
			where: '_pageName="' + fileName + '"',
			fields: 'FileName'
		}).then(function(data) {
			console.log(data);
			if (data.cargoquery.length > 0) $file.addClass('has-metadata');
		});
	});
}

$(function() {
	if (! $('#infoboxPlayer')) return;
	if ('#metadataChecker') $('#metadataChecker').detach();
	var el = document.createElement('div');
	$(el).html('Check for metadata')
		.attr('id', 'metadataChecker')
		.insertAfter($('#Images').parent());
	$(el).click(function(e) {
		e.preventDefault();
		checkMetadata($(el).next('.gallery'));
	});
});