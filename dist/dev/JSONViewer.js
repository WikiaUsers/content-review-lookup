mw.loader.using('mediawiki.util').then(function () {
    //Don't run if:
    //-we've already ran
    //-we're not viewing or editing the page
    //-if the page's content model isn't JSON
    if (
        $('.mw-json .jsonview').length || 
        !/view|edit|submit/.test(mw.config.get('wgAction')) || 
        mw.config.get('wgPageContentModel') !== 'json'
    ) {
        return;
    }

    //Import https://cdnjs.com/libraries/jquery-jsonview from a well known CDN using SRI and locking it to a version
    //DO NOT CHANGE THESE UNLESS YOU KNOW WHAT YOU ARE DOING
    $('<link>', {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview.min.css',
        integrity: 'sha512-aM9sVC1lVWwuuq38iKbFdk04uGgRyr7ERRnO990jReifKRrYGLugrpLCj27Bfejv6YnAFW2iN3sm6x/jbW7YBg==',
        crossorigin: 'anonymous',
        appendTo: $('head')
    });
    var loadScript = $.ajax({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview.min.js',
        dataType: 'script',
        method: 'GET',
        scriptAttrs: {
            integrity: 'sha512-ff/E/8AEnLDXnTCyIa+l80evPRNH8q5XnPGY/NgBL645jzHL1ksmXonVMDt7e5D34Y4DTOv+P+9Rmo9jBSSyIg==',
            crossorigin: 'anonymous'
        }
    });

    //Wait until the JSONView script is loaded
    $.when(loadScript).then(function () {
        //Add some custom styling
        $('head').append('<style>.jsonview { padding: 5px; } .jsonview .bool, .jsonview .num { color: #0070ff; }</style>');

        //Check if editing, so we know if we need to pull the content from the textarea, or from the API
        if (mw.config.get('wgAction') !== 'view') {
            //Add ourselves to a hook so that we can run every time a preview happens
            mw.hook('wikipage.content').add(function () {
                //Set a timeout so that the element has time to exist before we use it
                setTimeout(function () {
                    //If the ace editor exists, get the content from it (since it will be updated as the user changes the content in the textarea), otherwise, fallback to getting the content from the textbox, which won't be updated as the user edits
                    var json;

                    if ($('.ace_editor').length) {
                        //Set an id on the editor, since ace only accepts ids, and the editor doesn't have one
                        $('.ace_editor').attr('id', 'ace-editor');
                        json = ace.edit('ace-editor').getValue();
                    } else {
                        json = $('#wpTextbox1').text();
                    }

                    $('.mw-json').JSONView(json);
                }, 100);
            });
        } else {
            $.ajax({
                url: mw.util.wikiScript('api'),
                method: 'GET',
                data: {
                    action: 'query',
                    format: 'json',
                    prop: 'revisions',
                    rvslots: 'main',
                    titles: mw.config.get('wgPageName'),
                    rvprop: 'content'
                }
            }).then(function (data) {
                $('.mw-json').JSONView(data.query.pages[mw.config.get('wgArticleId')].revisions[0].slots.main['*']);
            });
        }
    });
});