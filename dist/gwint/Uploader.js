$(function () {
    mw.log('MediaWiki:Uploader.js')
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
        if (!!$.getUrlVar('wpDestFile') && !!$.getUrlVar('wpLicense') && !!$.getUrlVar('wpIgnoreWarning') && !!$.getUrlVar('wpGwentUploadAuto')) {
            var match = $('#mw-upload-permitted p').text().trim().match(/^(.*?: )[a-z ,]+(\.)$/)
            var ext = $.getUrlVar('wpDestFile').match(/\.(.*?)$/)
            if (match.length > 0 && ext.length > 0) {
                $('#mw-upload-permitted p').text(match[1] + ext[1] + match[2])
            }
            if (ext.length > 0) {
                $('#wpUploadFile').attr('accept', '.' + ext[1])
            }
            $('#mw-upload-form > fieldset:first-of-type > legend').text($.getUrlVar('wpDestFile'))
            $('#mw-upload-form > fieldset:not(:first-of-type)').css('display', 'none')
        }
    }
})