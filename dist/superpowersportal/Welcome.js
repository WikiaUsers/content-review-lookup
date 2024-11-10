
/* ========================== */
/*      Welcome Notice        */
/* ========================== */
mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.storage'], function () {
    mw.user.getGroups().then(function(groups) {
        var dismissedMessage = mw.storage.get('DevMessageDismissed');

        if (!dismissedMessage || mw.config.get('wgPageName') === 'Template:Top') {
            $.ajax({
                url: mw.util.wikiScript('api'),
                method: 'GET',
                data: {
                    action: 'parse',
                    page: 'Template:Top',
                    format: 'json',
                    disablepp: true
                },
                dataType: 'json',
                success: function(data) {
                    if (data.parse && data.parse.text) {
                        var DevMessage = $('<div>', {
                            'class': 'NoticePage notice-black',
                            'css': { textAlign: 'center' }
                        }).html(
                            '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; z-index: 2; opacity: 0.35;">' +
                            '<div></div>' +
                            '</div>' +
                            '<div style="position: relative; z-index: 3; padding: 12px; font-family: Quicksand; color: #ffffff;">' +
                            '<div style="padding: 1rem;">' +
                            data.parse.text["*"] +
                            '</div>' +
                            '</div>'
                        );

                        var closeButton = $('<span>').text('x').css({
                            'position': 'absolute',
                            'top': '5px',
                            'right': '10px',
                            'cursor': 'pointer',
                            'color': 'var(--theme-link-color--secondary)',
                            'font-weight': 'bold',
                            'font-size': '16px',
                            'z-index': '1000'
                        }).attr('title', 'Click to close this message permanently.');

                        DevMessage.append(closeButton);
                        $('#mw-content-text').prepend(DevMessage);

                        closeButton.on('click', function() {
						    DevMessage.animate({ height: '1px', padding: '0px', margin: '0px' }, 500, function() {
						        $(this).animate({ width: '0px' }, 500, function() {
						            console.log("DevMessage has been sent to the great inbox in the sky. May it rest in peace... or at least until the next bug appears.");
						            $(this).remove();
						            mw.storage.set('DevMessageDismissed', 'true');
						        });
						    });
						});

                    } else {
                        console.error('Template content not found. Check if the template exists and is correct.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX Error:', status, error);
                }
            });
        }
    }).catch(function(error) {
        console.error('Error retrieving user groups:', error);
    });
});