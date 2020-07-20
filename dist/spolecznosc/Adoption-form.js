require([
    'jquery',
    'mw',
    'wikia.window'
], function($, mw, window) {
    window.AdoptionForm = {
        namespaceNo: (mw.config.get('wgNamespaceNumber') === 112) ? ans = 112 : ans = 114,
        namespaceName: (mw.config.get('wgNamespaceNumber') === 112) ? ans = 'Projektowanie' : ans = 'Adopcja',
        checkTitle: function(title, callback) {
            var prefix = AdoptionForm.namespaceName + ':',
                title_base = title.replace(/\s*\([0-9]+\)\s*$/, '');

            new mw.Api().get({
                action: 'query',
                list: 'allpages',
                apprefix: title_base,
                apnamespace: AdoptionForm.namespaceNo,
                aplimit: 100
            }).done(function(data) {
                var flag = true,
                    count = 1;
                if (title !== title_base) {
                    $(data.query.allpages).each(function(i, v) {
                        if (v.title === prefix + title) {
                            flag = false;
                            return false;
                        }
                    });
                    if (flag) {
                        setTimeout(function() {
                            callback(title);
                        }, 0);
                        return;
                    }
                }
                flag = true;
                try {
                    while (flag) {
                        flag = false;
                        if (count > 1) title = title_base + ' (' + count + ')';
                        $(data.query.allpages).each(function(i, v) {
                            if (v.title === prefix + title) {
                                count++;
                                flag = true;
                                return false;
                            }
                        });
                    }
                } catch (err) {
                    title = title_base;
                }
                setTimeout(function() {
                    callback(title);
                }, 0);
            });
        },
        init: function() {
            $('.adoption-form').each(function() {
                var form = $(this);
                if (!$('body').hasClass('wkMobile') && form.data('placeholder'))
                    form.find('input[type="text"]').attr('placeholder', form.data('placeholder'));

                var send = false,
                    disabled = false,
                    box = form.find('.createboxForm'),
                    input = box.find('.createboxInput'),
                    button = box.find('.createboxButton');

                input.on('keyup', function(e) {
                    if (!disabled)
                        button.prop('disabled', !$(this).val().replace(/^\s+|\s+$/, ''));
                }).trigger('keyup');

                box.on('submit', function(e) {
                    if (!send) {
                        if (box.startThrobbing) box.startThrobbing();
                        else {
                            button.prop('disabled', true);
                            disabled = true;
                        }
                        AdoptionForm.checkTitle(input.val(), function(title) {
                            input.val(title);
                            send = true;
                            box.trigger('submit');
                        });
                        e.preventDefault();
                    }
                });
            });
        },
    };
    AdoptionForm.init();
    if ($('.ns-112 a[href="#wymagania"], .ns-114 a[href="#wymagania"]').length) 
        $('#wymagania.mw-collapsed .mw-collapsible-toggle').click();
    $('.ns-112 a[href="#wymagania"], .ns-114 a[href="#wymagania"]')
        .mouseover(function() {
            $('#wymagania').addClass('accent');
        })
        .mouseout(function() {
            $('#wymagania').removeClass('accent');
        });
});