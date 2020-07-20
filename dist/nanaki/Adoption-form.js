(function ($) {
    window.AdoptionForm = {
        namespaceNo: 114,
        namespaceName: 'Test',
        checkTitle: function(title, callback) {
            var prefix = AdoptionForm.namespaceName+':',
                title_base = title.replace(/\s*\([0-9]+\)\s*$/, '');
                
            $.ajax({
                url: '/api.php',
                data: { // api.php?action=query&list=allpages&apprefix=Example&apnamespace=112
                        format: 'json',
                        action: 'query',
                        list: 'allpages',
                        apprefix: title_base,
                        apnamespace: AdoptionForm.namespaceNo,
                        aplimit: 100,
                },
                success: function(data) {
                    var flag = true,
                        count = 1;
                    if(title != title_base) {
                        $(data.query.allpages).each(function(i,v) {
                            if(v.title == prefix+title) {
                                flag = false;
                                return false;
                            }
                        });
                        if(flag) {
                            setTimeout(function() { callback(title) }, 0);
                            return;
                        }
                    }
                    flag = true;
                    try {
                        while(flag) {
                            flag = false;
                            if(count>1) title = title_base + ' (' + count + ')';
                            $(data.query.allpages).each(function(i,v) {
                                if(v.title == prefix+title) {
                                    count++;
                                    flag = true;
                                    return false;
                                }
                            });
                        }
                    } catch(err) {
                        title = title_base;
                    }
                    setTimeout(function() { callback(title) }, 0);
                },
            });
        },
        init: function() {
            $('.adoption-form').each(function(){
                var form = $(this);
                if(!$('body').hasClass('wkMobile')) {
                    form.find('[data-placeholder]').each(function() {
                        $(this).find('input[type="text"]').attr('placeholder', $(this).data('placeholder'));
                    });
                }
                var send = false,
                    disabled = false,
                    box = form.find('.createboxForm'),
                    input = box.find('.createboxInput'),
                    button = box.find('.createboxButton');
                
                input.on('keyup', function(e) {
                    if(!disabled)
                        button.prop('disabled', !$(this).val().replace(/^\s+|\s+$/, ''));
                }).trigger('keyup');
                
                box.on('submit', function(e) {
                    if(!send) {
                        if(box.startThrobbing) box.startThrobbing();
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
})(jQuery);