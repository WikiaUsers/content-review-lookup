/**
 * @name            SignatureCreator
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @protect         <nowiki>
 * @description     Script for quickly creating signature
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.user',
    'mediawiki.util'
]).then(function () {
    var config = mw.config.get([
        'wgCityId',
        'wgUserName'
    ]);    
    if (
        config.wgUserName !== 'TheGoldenPatrik1' ||
        !$('a[data-tracking-label="account.talk"]').exists() ||
        config.wgCityId === '65099'
    ) {
        return;
    }
    var title = 'User:TheGoldenPatrik1/sig.css';
    new mw.Api().get({
        cb: Date.now(),
        action: 'query',
        titles: title
    }).done(function (d) {
        if (d.error || !d.query.pages[-1]) {
            return;
        }
        $('#WikiaBar .toolbar .tools').append(
            $('<li>').append(
                $('<a>', {
                    href: '#sig',
                    id: 'ca-sig',
                    text: 'Create Sig',
                    click: click
                })
            )
        );
        function error () {
            new BannerNotification('An error occurred.', 'error').show();
        }
        function click () {
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: title,
                    summary: 'Automatic',
                    text: '<span style="padding:3px;background:#000;font-weight:bold;font-family:Lucinda Blackletter;">[[User:TheGoldenPatrik1|<font color="#FFF">Pat</font>]][[User talk:TheGoldenPatrik1|<font color="#FFF">rik</font>]]</span> {{{1|}}}',
                    format: 'json',
                    token: mw.user.tokens.get('editToken')
                }
            })
            .done(function (data) {
                if (data.edit.result === 'Success') {
                    new BannerNotification('Signature created—<a href="https://thegoldenpatrik1.fandom.com/wiki/Sig?ajaxedit=1">add</a> to list.', 'confirm').show();
                } else {
                    error();
                }
            })
            .fail(function (data) {
                error();
            });
        }
    });
});