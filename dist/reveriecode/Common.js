// Testing summary upload change (based on original code by pcj at https://dev.fandom.com/wiki/MediaWiki:CorrectFileHeadings.js)

mw.loader.using(['mediawiki.api','mediawiki.base','mediawiki.util']).then(function() {
  if (mw.config.get('wgCanonicalSpecialPageName') !== 'Upload') return;
  var a = new mw.Api();
  a.loadMessages(['filedesc','license-header']).done(function() {
    $('.mw-htmlform-submit-buttons > *').click(function() {
      $('#mw-upload-form').data('submitButton',$(this).attr('name'));
    });
    $('#mw-upload-form').on('submit.jsupload',function() {
      if ($('#mw-upload-form').data('submitButton') === 'wpCancelUpload') return true;
      if (!($('#wpDestFile').val() && ($('#mw-input-wpSessionKey').val() || $('#wpUploadFile')[0].files[0]))) return true;
      var fd = new FormData();
      fd.append('action','upload');
      fd.append('token',mw.user.tokens.get('csrfToken'));
      fd.append('filename',$('#wpDestFile').val());
      if ($('#mw-input-wpSessionKey').val()) {
        fd.append('sessionkey',$('#mw-input-wpSessionKey').val());
      }
      else {
        fd.append('file',$('#wpUploadFile')[0].files[0]);
      }
      var headerRE = new RegExp('==\\s*'+mw.messages.values['filedesc']+'\\s*==','g');
      var text = !$('#wpUploadDescription').val() ? '' : ((mw.messages.values['filedesc']==='' || $('#wpUploadDescription').val().match(headerRE))?'':'=='+mw.messages.values['filedesc']+'==\n')+$('#wpUploadDescription').val()+'\n';
      text += !$('#wpLicense').val() ? '' : (mw.messages.values['license-header']===''?'':'=='+mw.messages.values['license-header']+'==\n')+'{{'+$('#wpLicense').val()+'}}';
      fd.append('comment',text);
      fd.append('comment',text);
      fd.append('watchlist',$('#wpWatchthis').prop('checked')?'watch':'nochange');
      if ($('#wpIgnoreWarning').prop('checked') || $('#mw-upload-form').data('submitButton') === 'wpUploadIgnoreWarning') fd.append('ignorewarnings',1);
      fd.append('format','json');
      $.ajax({
        url: mw.util.wikiScript('api'),
        method: 'POST',
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST'
      }).done(function(data) {
      	if (data.upload != undefined) {
	        if (data.upload.result === 'Success') {
	          location.href = data.upload.imageinfo.descriptionurl;
	          return;
	        }
      	}
        //else
        $('#mw-upload-form').off('submit.jsupload').on('submit',function(){return true;});
        $('input[name="wpUpload"]').click();
      }).fail(function(data) {
        console.error('Error uploading file:',data);
      });
      return false;
    });
  }).fail(function(data) {
    console.error('Error getting system messages:',data);
  });
});
/* </nowiki> */