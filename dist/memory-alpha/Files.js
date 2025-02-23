$(function(){
	var infoIcon = mw.util.getUrl('Special:FilePath/Information icon simple.svg');
	
	// Display Ogg files in galleries
	var audio = $('.wikia-gallery-item [data-image-key$=".ogg"]');
	galleryAudio(0);
	
	function galleryAudio(i){
		var galleryItem = $(audio.get(i));
		var fileURL = mw.util.getUrl('Special:FilePath/' + galleryItem.data('image-key'));
		galleryItem.after($('<audio controls>').attr('src', fileURL));
		galleryItem.parent().addClass('gallery-item--audio');
		galleryItem.remove();
		
		if (i < audio.length){
			galleryAudio(i + 1);
		}
	}
	
	// Display PDF files in galleries
	var galleryPDFs = $('.wikia-gallery-item [data-image-key$=".pdf"]');
	galleryPDF(0);
	
	function galleryPDF(i){
		var galleryItem = $(galleryPDFs.get(i));
		var fileName = galleryItem.data('image-key');
		var iframe = $('<iframe>');
		var figcaption = $('<figcaption class="thumbcaption">');
		var iconLink = $('<a href="' + mw.util.getUrl('File:' + fileName) + '" class="info-icon">');
		var iconSVG = $('<img src="' + infoIcon + '" width="18" alt="View file page">');
		var linkAttributes = {
			'target': '_blank',
			'href': mw.util.getUrl('Special:FilePath/' + fileName),
		};
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
		galleryItem.after(iframe);
		galleryItem.parent().addClass('document-embed').attr(linkAttributes);
		galleryItem.parent().parent().parent().addClass('show-info-icon').append(figcaption);
		figcaption.append(iconLink);
		iconLink.append(iconSVG);
		galleryItem.remove();
		
		if (i < galleryPDFs.length){
			galleryPDF(i + 1);
		}
	}
	
	// Embed PDF file widgets into pages
	var widgets = $('.pdf-widget');
	pagePDF(0);
	
	function pagePDF(i){
		var widget = $(widgets.get(i));
		var specifiedFile = widget.data('file');
		var floatDir = widget.data('float') ? widget.data('float') : 'right';
		var captionUnparsed = widget.data('caption');
		var filePath = mw.util.getUrl('Special:FilePath/' + specifiedFile);
		
		if (captionUnparsed){
			new mw.Api().get({
				action: 'parse',
				title: mw.config.get('wgPageName'),
				text: captionUnparsed,
				prop: 'text',
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
			
			if (i < widgets.length){
				pagePDF(i + 1);
			}
		}
	}
	
	// Display PDF files on PDF file pages
	var adobeIcon = $('.ns-6 [src="/resources-ucp/mw139/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();
	var filePageIframe = $('<iframe>');
	var iframeAttributes = {
		'src': mw.util.getUrl('Special:FilePath/' + mw.config.get('wgTitle')),
		'loading': 'lazy',
		'width': '250',
		'height': 'auto',
		'title': mw.config.get('wgTitle'),
	};
	
	filePageIframe.attr(iframeAttributes);
	adobeIcon.after(filePageIframe);
	adobeIcon.remove();
});