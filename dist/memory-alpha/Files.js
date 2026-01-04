'use strict';
mw.loader.using(['mediawiki.api', 'mediawiki.util'], () => {
	const config = mw.config.values;
	const api = new mw.Api({'parameters': {
		'action': 'query',
		'format': 'json',
		'formatversion': 2,
		'errorformat': 'plaintext',
		'uselang': config.wgUserLanguage,
	}});
	const infoIcon = mw.util.getUrl('Special:FilePath/Information icon simple.svg');
	
	// Display Ogg files in galleries
	$('.wikia-gallery-item [data-image-name$=".ogg"]').each((_, ogg) => {
		const fileURL = mw.util.getUrl(`Special:FilePath/${$(ogg).data('image-name')}`);
		$(ogg).after($('<audio controls>').attr('src', fileURL));
		$(ogg).parent().addClass('gallery-item--audio');
		$(ogg).remove();
	});
	
	// Display PDF files in galleries
	$('.wikia-gallery-item [data-image-name$=".pdf"]').each((_, pdfGalleryItem) => {
		const fileName = $(pdfGalleryItem).data('image-name');
		const iframe = $('<iframe>');
		const figcaption = $('<figcaption class="thumbcaption">');
		const iconLink = $(`<a href="${mw.util.getUrl(`File:${fileName}`)}" class="info-icon">`);
		const iconSVG = $(`<img src="${infoIcon}" width="18" alt="View file page">`);
		const linkAttributes = {
			'target': '_blank',
			'href': mw.util.getUrl(`Special:FilePath/${fileName}`),
		};
		const attributes = {
			'src': mw.util.getUrl(`Special:FilePath/${fileName}`),
			'loading': 'lazy',
			'width': '185',
			'height': '185',
			'scrolling': 'no',
			'class': 'thumbimage ls-is-cached lazyloaded',
			'title': fileName,
		};
		
		iframe.attr(attributes);
		$(pdfGalleryItem).after(iframe);
		$(pdfGalleryItem).parent().addClass('document-embed').attr(linkAttributes);
		$(pdfGalleryItem).parent().parent().parent().addClass('show-info-icon').append(figcaption);
		figcaption.append(iconLink);
		iconLink.append(iconSVG);
		$(pdfGalleryItem).remove();
	});
	
	// Embed PDF file widgets into pages
	$('.pdf-widget').each((_, pdfWidget) => {
		const specifiedFile = $(pdfWidget).data('file');
		const floatDir = $(pdfWidget).data('float') ? $(pdfWidget).data('float') : 'right';
		const captionUnparsed = $(pdfWidget).data('caption');
		const filePath = mw.util.getUrl(`Special:FilePath/${specifiedFile}`);
		
		if (captionUnparsed){
			api.parse(
				captionUnparsed,
				{title: config.wgPageName}
			).then(createThumbnail);
		} else {
			createThumbnail();
		}
		
		function createThumbnail(parserOutput){
			const fig = $(`<figure class="thumb mw-halign-${floatDir} show-info-icon document-embed" typeof="mw:File/Thumb">`);
			const pdfLink = $(`<a href="${filePath}" class="mw-file-description image" target="_blank">`);
			const iframe = $('<iframe>');
			const figcaption = $('<figcaption class="thumbcaption">');
			const iconLink = $(`<a href="${mw.util.getUrl(`File:${specifiedFile}`)}" class="info-icon">`);
			const iconSVG = $(`<img src="${infoIcon}" width="18" alt="View file page">`);
			const attributes = {
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
			$(pdfWidget).after(fig);
			$(pdfWidget).remove();
			
			if (parserOutput){
				const captionParsed = $(parserOutput).children().html();
				const caption = $(`<p class="caption">${captionParsed}</p>`);
				figcaption.append(caption);
			}
		}
	});
	
	// Display PDF files on PDF file pages
	const adobeIcon = $('.ns-6 [src="/resources-ucp/mw143/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();
	const filePageIframe = $('<iframe>');
	const iframeAttributes = {
		'src': mw.util.getUrl(`Special:FilePath/${config.wgTitle}`),
		'loading': 'lazy',
		'width': '250',
		'height': 'auto',
		'title': config.wgTitle,
	};
	
	filePageIframe.attr(iframeAttributes);
	adobeIcon.after(filePageIframe);
	adobeIcon.remove();
});