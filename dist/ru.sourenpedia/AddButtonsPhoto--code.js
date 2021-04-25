/**
 * Name:        AddButtonsPhoto
 * Author(s):   Shodai Tsuchi
 *              KockaAdmiralac <wikia@kocka.tech>
 * Version:     v1.2
 * Description: Adds buttons to add photos in a quick and easy way.
 */
(function() {
    if (window.AddButtonsPhotoLoaded) {
        return;
    }
    window.AddButtonsPhotoLoaded = true;
    var AddButtonsPhoto = {
        init: function(i18no) {
            i18no.loadMessages('AddButtonsPhoto')
                .then($.proxy(this.insert, this));
        },
        insert: function(i18n) {
            this.i18n = i18n;
            $('.page-header__contribution-buttons').append(
                $.map({
                    'photo': 'Upload'
                }, $.proxy(this.map, this))
            );
            mw.hook('AddButtonsPhoto.loaded').fire();
        },
        map: function(v, k) {
            var msg = this.i18n.msg(k).plain();
            return $('<a>', {
                'class': 'wds-button wds-is-squished wds-is-secondary',
                'href': mw.util.getUrl('Special:' + v),
                'text': msg,
                'title': msg
            });
        }
    };
    mw.hook('dev.i18n')
        .add($.proxy(AddButtonsPhoto.init, AddButtonsPhoto));
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();