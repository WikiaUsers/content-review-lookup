$(function(){
	// Display Ogg files in galleries
	var oggFile = $('.wikia-gallery-item [data-image-key$=".ogg"]');
	oggFile.each(correctOggFiles);
	function correctOggFiles(){
		$(this).after('<audio src="' + mw.util.getUrl('Special:Redirect/file/'+$(this).attr('data-image-key')) + '" controls>');
		$(this).remove();
	}
	
	// Display PDF files in galleries
	var adobeGalleryIcon = $('.wikia-gallery-item [data-image-key$=".pdf"]');
	adobeGalleryIcon.each(removeAdobeIcon);
	function removeAdobeIcon(){
		var fileName = $(this).attr('data-image-key');
		$(this).after('<a href="' + mw.util.getUrl('File:' + fileName) + '" class="directLinkToPDF" target="_blank"></a><iframe src="' + mw.util.getUrl('Special:Redirect/file/' + fileName) + '" loading="lazy" width="185" height="185" title="' + fileName + '"></iframe>');
		$(this).parent().addClass('thumb');
		$(this).remove();
	}
	
	// Display PDF files on PDF file pages
	var adobeIcon = $('.ns-6 [src="/resources-ucp/mw139/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();
	adobeIcon.parent().prepend('<iframe src="' + mw.util.getUrl('Special:Redirect/file/' + mw.config.get("wgTitle")) + '" loading="lazy" width="250" height="auto" title="' + mw.config.get("wgTitle") + '"></iframe>');
	adobeIcon.remove();
	
	// Embed PDF file widgets into pages
	$('.pdf-widget').each(function(){
		var widget = $(this);
		var specifiedFile = widget.attr('data-file');
		var floatDir = widget.attr('data-float') ? widget.attr('data-float') : 'right';
		var caption = widget.attr('data-caption') ? widget.attr('data-caption') : '';
		
		new mw.Api().get({
			action:'parse',
			title:mw.config.get('wgPageName'),
			text:caption,
			revid:mw.config.get('wgCurRevisionId'),
			prop:'text',
		}).done(function(data){
			caption = data.parse.text['*'];
			
			widget.html('<figure class="thumb t' + floatDir + ' show-info-icon"><a href="' + mw.util.getUrl('Special:Redirect/file/' + specifiedFile) + '" class="directLinkToPDF" target="_blank"></a><iframe src="' + mw.util.getUrl('Special:Redirect/file/' + specifiedFile) + '" loading="lazy" width="174.028" height="auto" scrolling="no" title="' + specifiedFile + '"></iframe><figcaption class="thumbcaption"><a href="' + mw.util.getUrl('File:' + specifiedFile) + '" class="info-icon pdf-widget-info-icon"><svg><use xlink:href="#wds-icons-info-small"></use></svg></a><p class="caption">' + caption + '</p></figcaption></figure>');
		});
	});
});