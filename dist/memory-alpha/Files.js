// Display Ogg files in galleries

const oggFile = $('.wikia-gallery-item [data-image-key$=".ogg"]');

oggFile.each(correctOggFiles);

function correctOggFiles(){
  $(this).after('<audio src="/wiki/Special:Redirect/file/'+$(this).attr('data-image-key')+'" controls>');
  $(this).remove();
}

// Display PDF files in galleries

const adobeGalleryIcon = $('.wikia-gallery-item [data-image-key$=".pdf"]');

adobeGalleryIcon.each(removeAdobeIcon);

function removeAdobeIcon(){
  const fileName = $(this).attr('data-image-key');
  $(this).after('<a href="/wiki/Special:Redirect/file/'+fileName+'" class="directLinkToPDF" target="_blank"></a><iframe src="/wiki/Special:Redirect/file/'+fileName+'" loading="lazy" width="185" height="185" title="'+fileName+'"></iframe><div class="thumbcaption pdf-thumbcaption"><a href="/wiki/File:'+fileName+'" class="info-icon pdf-info-icon"><svg><use xlink:href="#wds-icons-info-small"></use></svg></a></div>');
  $(this).parent().addClass('thumb show-info-icon');
  $(this).remove();
}

// Display PDF files on PDF file pages

const adobeIcon = $('.ns-6 [src="/resources-ucp/mw139/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();

adobeIcon.parent().prepend('<iframe src="/wiki/Special:Redirect/file/'+mw.config.get("wgTitle")+'" loading="lazy" width="250" height="auto" title="'+mw.config.get("wgTitle")+'"></iframe>');
adobeIcon.remove();

// Embed PDF file widgets into pages

const widget = $('.pdf-widget');

widget.each(embedPDFs);

function embedPDFs(){
  const specifiedFile = $(this).attr('data-file');
  const floatDir = $(this).attr('data-float') ? $(this).attr('data-float') : 'right';
  const caption = $(this).attr('data-caption') ? $(this).attr('data-caption').replace(/'''(.+?)'''/g, '<b>$1</b>').replace(/''(.+?)''/g, '<i>$1</i>').replace(/\[\[(.+?)\|(.+?)\]\]/g, '<a href="/wiki/$1">$2</a>').replace(/\[\[(.+?)\]\]/g, '<a href="/wiki/$1">$1</a>') : '';

  $(this).html('<figure class="thumb t'+floatDir+' show-info-icon"><a href="/wiki/Special:Redirect/file/'+specifiedFile+'" class="directLinkToPDF" target="_blank"></a><iframe src="/wiki/Special:Redirect/file/'+specifiedFile+'" loading="lazy" width="174.028" height="auto" scrolling="no" title="'+specifiedFile+'"></iframe><figcaption class="thumbcaption"><a href="/wiki/File:'+specifiedFile+'" class="info-icon pdf-widget-info-icon"><svg><use xlink:href="#wds-icons-info-small"></use></svg></a><p class="caption">'+caption+'</p></figcaption></figure>');
}