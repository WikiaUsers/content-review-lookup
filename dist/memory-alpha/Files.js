'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	const infoIcon = mw.util.getUrl('Special:FilePath/Information icon simple.svg');
	
	// Display Ogg files in galleries
	const audio = $('.wikia-gallery-item [data-image-key$=".ogg"]');
	galleryAudio(0);
	
	function galleryAudio(i){
		const galleryItem = $(audio.get(i));
		const fileURL = mw.util.getUrl('Special:FilePath/' + galleryItem.data('image-key'));
		galleryItem.after($('<audio controls>').attr('src', fileURL));
		galleryItem.parent().addClass('gallery-item--audio');
		galleryItem.remove();
		
		if (i < audio.length){
			galleryAudio(i + 1);
		}
	}
	
	// Display PDF files in galleries
	const galleryPDFs = $('.wikia-gallery-item [data-image-key$=".pdf"]');
	galleryPDF(0);
	
	function galleryPDF(i){
		const galleryItem = $(galleryPDFs.get(i));
		const fileName = galleryItem.data('image-key');
		const iframe = $('<iframe>');
		const figcaption = $('<figcaption class="thumbcaption">');
		const iconLink = $('<a href="' + mw.util.getUrl('File:' + fileName) + '" class="info-icon">');
		const iconSVG = $('<img src="' + infoIcon + '" width="18" alt="View file page">');
		const linkAttributes = {
			'target': '_blank',
			'href': mw.util.getUrl('Special:FilePath/' + fileName),
		};
		const attributes = {
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
	const widgets = $('.pdf-widget');
	pagePDF(0);
	
	function pagePDF(i){
		const widget = $(widgets.get(i));
		const specifiedFile = widget.data('file');
		const floatDir = widget.data('float') ? widget.data('float') : 'right';
		const captionUnparsed = widget.data('caption');
		const filePath = mw.util.getUrl('Special:FilePath/' + specifiedFile);
		
		if (captionUnparsed){
			api.get({
				action: 'parse',
				title: mw.config.get('wgPageName'),
				text: captionUnparsed,
				prop: 'text',
			}).done(createThumbnail);
		} else {
			createThumbnail();
		}
		
		function createThumbnail(parserOutput){
			const fig = $('<figure class="thumb mw-halign-' + floatDir + ' show-info-icon document-embed" typeof="mw:File/Thumb">');
			const pdfLink = $('<a href="' + filePath + '" class="mw-file-description image" target="_blank">');
			const iframe = $('<iframe>');
			const figcaption = $('<figcaption class="thumbcaption">');
			const iconLink = $('<a href="' + mw.util.getUrl('File:' + specifiedFile) + '" class="info-icon">');
			const iconSVG = $('<img src="' + infoIcon + '" width="18" alt="View file page">');
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
			widget.after(fig);
			widget.remove();
			
			if (parserOutput){
				const captionParsed = $(parserOutput.parse.text['*']).children().html();
				const caption = $('<p class="caption">' + captionParsed + '</p>');
				figcaption.append(caption);
			}
			
			if (i < widgets.length){
				pagePDF(i + 1);
			}
		}
	}
	
	// Display PDF files on PDF file pages
	const adobeIcon = $('.ns-6 [src="/resources-ucp/mw143/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();
	const filePageIframe = $('<iframe>');
	const iframeAttributes = {
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