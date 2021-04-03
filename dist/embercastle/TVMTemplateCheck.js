//By Sophie with help from Kocka
(function () {
    function setTemplateType (id, type) {
        //Using code from https://dev.fandom.com/wiki/MediaWiki:TemplateTypeButtons/code.js
        $.post(mw.util.wikiScript('wikia') + '?' + $.param({
            controller: mw.config.get('wgVersion').includes('1.33') ?
                'Fandom\\TemplateClassification\\Api\\ClassificationController' :
                'TemplateClassificationApi',
            method: 'classifyTemplate',
            format: 'json'
        }), {
            articleId: id,
            pageId: id,
            type: type,
            editToken: mw.user.tokens.get('editToken'),
            token: mw.user.tokens.get('csrfToken')
        });
    }
    
    function handleError (error) {
        console.error(error);
        alert('An error happened, check the console.');
    }

    function editPage (title, content) {
        new mw.Api().post({
            action: 'edit',
            title: title,
            text: content,
            minor: true,
            bot: true,
            createonly: true,
            token: mw.user.tokens.get('editToken'),
            summary: 'Copying content from starter'
        }).done(function (data) {
            if (data.error) {
                return handleError(data.error);
            }
            if (title.includes('Template:')) {
                if (title.includes('/')) {
                    setTemplateType(data.edit.pageid, 'nonarticle');
                } else {
                    setTemplateType(data.edit.pageid, 'context-link');
                }
            }
        }).fail(handleError);
    }

    function getContent (title) {
        new mw.Api({
            ajax: {
                url: 'https://starter.fandom.com/api.php',
                dataType: 'jsonp'
            }
        }).get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'content',
            indexpageids: true
        }).done(function (data) {
            if (data.error) {
                return handleError(data.error);
            }
            var page = data.query.pages[data.query.pageids[0]];
            editPage(page.title, page.revisions[0]['*']);
        }).fail(handleError);
    }

    function init () {
        //Using code from from https://www.mediawiki.org/wiki/Topic:Ucv6bimvdwj1nbe3
        new mw.Api().get({
            action: 'query',
            titles: 'Template:Main/doc|Template:Main|Module:Hatnote'
        }).then(function (data) {
            var mainDoesNotExist;
            $.each(data.query.pages, function () {
                if (this.title === 'Template:Main' && this.missing === '') {
                    mainDoesNotExist = true;
                }
            });
            if (mainDoesNotExist && confirm('Create Template:Main and etc?')) {
                $.each(data.query.pages, function () {
                    if (this.missing === '') {
                        getContent(this.title);
                    }
                });
            }
        });
    }

    if (mw.config.get('wgPageName') === 'Special:BlankPage/TVMH') {
        mw.loader.using('mediawiki.api').then(init);
    }
})();