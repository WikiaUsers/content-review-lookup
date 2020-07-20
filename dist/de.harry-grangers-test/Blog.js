$.getJSON('/api.php?action=query&meta=allmessages&ammessages=edit%7Ccreate&format=json',function(res) {
	messages = res.query.allmessages;

	function isSubpage() {
        return wgPageName !== wgBasePageName;
    }
    pageExists(wgPageName,function() {},function() {
        if(wgNamespaceIds.user_blog == wgNamespaceNumber && isSubpage()) {
            $('.page-header__contribution-buttons').html(
                $('<div />',{class: 'wds-button-group'}).append(
                    $('<a />',{
                        href: 'javascript:void(0)',
                        class: 'wds-is-squished wds-button',
                        id: 'ca-edit',
                        'data-tracking': 'ca-edit'
                    }).append(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path d="M9.1 4.5l-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4zm7.6-.2l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z" fill-rule="evenodd"></path></svg>',
                        $('<span />').text(messages.create)
                    ).on('click',function() {
                        item = {
                            categories: JSON.stringify([{"name":"Blog-Beitrag","namespace":"Kategorie","outertag":"","sortkey":"","type":"normal"}]),
                            RTEMode: 'source',
                            RTETemporarySaveType: '',
                            RTETemporarySaveContent: '',
                            wpSection: '',
                            wpStarttime: (new Date()).getTime(),
                            wpEdittime: (new Date()).getTime(),
                            wpScrolltop: 0,
                            isMediaWikiEditor: 0,
                            wpLogin: '',
                            pageId: 0,
                            oldid: 0,
                            wpTitle: wgBasePageName,
                            wpTextbox1: '',
                            wpWatchthis: 'on',
                            wpEditToken: mw.user.tokens.get('editToken'),
                            antispam: '',
                            wpIsCommentingEnabled: 'on',
                            wpSummary: '',
                            CategorySelectInput: ''
                        }

                        var form_data = new FormData();

                        for ( var key in item ) {
                            form_data.append(key, item[key]);
                        }

                        var xmlHTTPRequest;
                        var _orgAjax = jQuery.ajaxSettings.xhr;
                        jQuery.ajaxSettings.xhr = function () {
                          xmlHTTPRequest = _orgAjax();
                          return xmlHTTPRequest;
                        };

                        $.ajax({
                            url: '/wiki/Spezial:CreateBlogPage?action=submit',
                            data: form_data,
                            processData: false,
                            contentType : false,
                            type: 'POST',
                            statusCode: {
                                302: function() {
                                    window.document.location = '/wiki/Special:MyBlog/' + wgBasePageName;
                                }
                            },
                            success: function(res,status,xhr) {
                                if(xmlHTTPRequest.responseURL === window.document.location.href) {
                                    console.log('successful => reload');
                                    window.document.location.href = window.document.location.href + '?action=edit';
                                }
                                else if(xmlHTTPRequest.responseURL === window.document.location.origin + '/wiki/Spezial:CreateBlogPage?action=submit') {
                                    notices = $('<div />').html($.parseHTML(res)).find('.editpage-notices ul li').map(function(i,v) { return $(v).text(); }).get();
                                    console.error('failed: not redirected',notices);
                                }
                                else {
                                    console.error('unknown error',res,status,xhr);
                                }
                            }
                        });
                    })
                )
            )
        }
    });
});