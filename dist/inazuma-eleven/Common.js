/**
 * MediaWiki:Common.js
 *
 * Any JavaScript here will be loaded for all users on every page load.
 * to-do list:
 * - script to lock blog comments after 30 days
 */

;(function(mw) {

    /* configs */
    window.UserTagsJS = {
        modules: {},
        tags: {
            kanpeki: {
                u: 'Kanpeki',
                title: '°˖✧◝(⁰▿⁰)◜✧˖°'
            },
            ficwinnerc: {
                u: '☆',
                title: 'First place in the wiki fanfiction contest - Canon category'
            },
            ficwinnero: {
                u: '☆',
                title: 'First place in the wiki fanfiction contest - Original category'
            },
            detective: {
                u: 'Detective!',
                title: 'A swift detective. Minaho\'s gonna be proud of this guy, alright!'
            },
        }
    };
    window.UserTagsJS.modules.custom = {
        'Mizuki Raimon': ['kanpeki', 'ficwinnerc'],
        'Pokemon Ranger Alex': ['ficwinnero'],
        'HeatFlame': ['detective'],
    };

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

    /* page specific imports */
    if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }
    if (mw.config.get('wgCanonicalNamespace') == 'User_blog') {
        importScript('MediaWiki:Common.js/lockoldblogs.js');
    }

}) (window.mediaWiki);

window.i = window.i || 0; //Required for SignatureCheck to work properly

var headerInterval;

function updateTableHeader() {
    const tables = document.querySelectorAll('.pbinder.mw-collapsible');

    tables.forEach(function(table) {
        const collapsibleButton = table.querySelector('.mw-collapsible-toggle'),
            header = table.querySelector('.header'),
            content = header.innerHTML,
            contentContainer = document.createElement('div'),
            buttonContainer = document.createElement('div');

        header.innerHTML = '';
        header.append(contentContainer);
        header.append(buttonContainer);

        contentContainer.className = 'header-content-container';
        contentContainer.innerHTML = content;

        buttonContainer.className = 'header-button-container';
        buttonContainer.append(collapsibleButton);

        clearInterval(headerInterval);
    });
}

mw.hook('wikipage.content').add(function() {
    headerInterval = setInterval(updateTableHeader, 100);
});