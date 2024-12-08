$(function(){
	// Display Ogg files in galleries
	$('.wikia-gallery-item [data-image-key$=".ogg"]').each(function(){
		$(this).after('<audio src="' + mw.util.getUrl('Special:FilePath/' + $(this).data('image-key')) + '" controls>');
		$(this).remove();
	});
	
	// Display PDF files in galleries
	$('.wikia-gallery-item [data-image-key$=".pdf"]').each(function(){
		var fileName = $(this).data('image-key');
		var iframe = $('<iframe>');
		var attributes = {
			'src': mw.util.getUrl('Special:FilePath/' + fileName),
			'loading': 'lazy',
			'width': '185',
			'height': '185',
			'scrolling': 'no',
			'class': 'thumbimage ls-is-cached lazyloaded',
			'title': fileName,
		};
		
		iframe.attr(attributes);
		$(this).after(iframe);
		$(this).parent().addClass('document-embed').attr('target', '_blank');
		$(this).remove();
	});
	
	// Embed PDF file widgets into pages
	$('.pdf-widget').each(function(){
		var widget = $(this);
		var specifiedFile = widget.data('file');
		var floatDir = widget.data('float') ? widget.data('float') : 'right';
		var captionUnparsed = widget.data('caption');
		var filePath = mw.util.getUrl('Special:FilePath/' + specifiedFile);
		var infoIcon = mw.util.getUrl('Special:FilePath/Information icon simple.svg');
		
		if (captionUnparsed){
			new mw.Api().get({
				action:'parse',
				title:mw.config.get('wgPageName'),
				text:captionUnparsed,
				prop:'text',
			}).done(createThumbnail);
		} else {
			createThumbnail();
		}
		
		function createThumbnail(parserOutput){
			var fig = $('<figure class="thumb t' + floatDir + ' show-info-icon document-embed">');
			var pdfLink = $('<a href="' + filePath + '" class="image" target="_blank">');
			var iframe = $('<iframe>');
			var figcaption = $('<figcaption class="thumbcaption">');
			var iconLink = $('<a href="' + mw.util.getUrl('File:' + specifiedFile) + '" class="info-icon">');
			var iconSVG = $('<img src="' + infoIcon + '" width="18" alt="View file page">');
			var attributes = {
				'src': filePath,
				'loading': 'lazy',
				'width': '180',
				'scrolling': 'no',
				'class': 'thumbimage',
				'title': specifiedFile,
			};
			
			iframe.attr(attributes);
			fig.append(pdfLink);
			fig.append(figcaption);
			pdfLink.append(iframe);
			figcaption.append(iconLink);
			iconLink.append(iconSVG);
			widget.after(fig);
			widget.remove();
			
			if (parserOutput){
				var captionParsed = $(parserOutput.parse.text['*']).text().trim();
				var caption = $('<p class="caption">' + captionParsed + '</p>');
				figcaption.append(caption);
			}
		}
	});
});

// Display PDF files on PDF file pages
$(function(){
	var adobeIcon = $('.ns-6 [src="/resources-ucp/mw139/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();
	var iframe = $('<iframe>');
	var attributes = {
		'src': mw.util.getUrl('Special:FilePath/' + mw.config.get('wgTitle')),
		'loading': 'lazy',
		'width': '250',
		'height': 'auto',
		'title': mw.config.get('wgTitle'),
	};
	
	iframe.attr(attributes);
	adobeIcon.after(iframe);
	adobeIcon.remove();
});