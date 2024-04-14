/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

    /* {{tab}} */
    $.fn.extend({
        tab: function() {
            return this.each(function() {
                var $this = $(this),
                    nav = $('<div>', {
                        addClass: 'tab-nav',
                        prependTo: $this
                    });
                    $this.addClass('tab-active');
                    $this.find('.tab-title').appendTo($this.find('.tab-nav'));
                $this.find('.tab-title').on('click', function(e) {
                    var target = !$(e.target).attr('class') ? $(e.target).parents('.tab-title') : $(e.target),
                        n = target.attr('class').split(' ')[1].replace(/tab-title-/g, ''),
                        current = $this.find('.tab-content-' + n);
                    target.addClass('tab-title-active');
                    target.siblings('.tab-title-active').removeClass('tab-title-active');
                    current.show();
                    current.siblings('.tab-content').hide();
                });
            });
        }
    });
    $(function() {
        $('.tab').not('.tab-active').tab();
    });
    mw.hook('wikipage.content').add(function(e) {
        e.find('.tab').not('.tab-active').tab();
    });

    /* script imports */
    importArticles({
        type: 'script',
        articles: [
            'w:c:dev:SignatureCheck/code.js',
            'w:c:dev:AjaxRC/code.js',
            'w:c:dev:UserTags/code.js',
            'w:c:dev:ShowHide/code.js',
            'w:c:dev:BackToTopButton/code.js',
            'w:c:dev:ChatOptions/code.js',
            'w:c:dev:DupImageList/code.js',
            'w:c:dev:AjaxBatchDelete/code.js'
        ]
    });