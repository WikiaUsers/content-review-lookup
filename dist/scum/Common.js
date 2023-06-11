/* Any JavaScript here will be loaded for all users on every page load. */

/* Battlemetrics Embed logic*/
window.addEventListener('message',function(e)
{
	if(e.data.uid&&e.data.type==='sizeUpdate')
	{
		var i = document.querySelector('iframe[name="'+e.data.uid+'"]');
		i.style.width = e.data.payload.width;i.style.height = e.data.payload.height;
		
	}
});

mw.hook('wikipage.content').add(function($content) {
  $content.find('.battlemetricswidget').each(function() {
      var $this = $(this),
          data = $this.data(),
          id = encodeURIComponent(('' + data.id).trim()),
          uri = new mw.Uri('https://cdn.battlemetrics.com/b/horizontal500x80px/' + id + '.html');
 
      if (data.loaded) {
          return;
      }
 
      uri.query = {
          foreground: ('' + data.foreground).trim(),
          background: ('' + data.background).trim(),
          lines: ('' + data.playlist).trim(),
          linkColor: ('' + data.color).trim(),
          chartColor: ('' + data.layout).trim(),
      };
 
      $this.html(mw.html.element('iframe', {
          src: uri.toString(),
          style: 'border:0',
          frameborder: '0',
          name: 'ncbng'
      }));
      data.loaded = true;
  });
});

/* SCUM Map Embed logic*/
mw.hook('wikipage.content').add(function($content) {
  $content.find('.scummapwidget').each(function() {
  	  
      var $this = $(this),
          data = $this.data()
      var id = encodeURIComponent(('' + data.id).trim());
 
      if (data.loaded) {
          return;
      }
 
      $this.html(mw.html.element('iframe', {
          src: 'https://scum-map.com/en/embed_map/'+ id,
          title: ('' + data.title).trim(),
          frameBorder: ('' + data.frameBorder).trim(),
          allowfullscreen: ('' + data.allowfullscreen).trim(),
          width: ('' + data.width).trim(),
          height: ('' + data.height).trim()
      }));
      data.loaded = true;
  });
});
// copy to clipboard
$(function() { // wait for content load (DOMContentLoaded)
  $('.copy-clipboard').each(function () {
   var $this = $(this);
   var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
   $this.append($button);
   $button.click(function () {
    var $content = $this.find('.copy-content');
    $content.children().remove();
    selectElementText($content[0]);
  
    try {
      if (!document.execCommand('copy'))
       throw 42;
      mw.notify('Successfully copied to Clipboard.');
    } catch (err) {
      mw.notify('Copy to Clipboard failed. Please do it yourself.', {type:'error'});
    }
   });
  });

  $('.copy-wrapper img').click(function (e) {
    e.preventDefault();
    var text = $(this).closest('.copy-wrapper').find('.copy-content').html();
    var copyEl = document.createElement('textarea');
    copyEl.value = text;
    document.body.appendChild(copyEl);
    copyEl.select();
    try {
      if (!document.execCommand('copy'))
       throw 42;
      mw.notify('Successfully copied to Clipboard.');
    } catch (err) {
      mw.notify('Copy to Clipboard failed. Please do it yourself.', {type:'error'});
    }
    document.body.removeChild(copyEl);
   });

});



function selectElementText(element) {
  var range, selection;  
  if (document.body.createTextRange) {
   range = document.body.createTextRange();
   range.moveToElementText(element);
   range.select();
  } else if (window.getSelection) {
   selection = window.getSelection();     
   range = document.createRange();
   range.selectNodeContents(element);
   selection.removeAllRanges();
   selection.addRange(range);
  }
}