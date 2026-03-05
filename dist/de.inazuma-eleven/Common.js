/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
}
;(function(mw) {
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
    });
function setLinkPreview() {
    window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
    window.pPreview.dock = '#mw-content-text';
    window.pPreview.RegExp.noinclude = ['.nolinkpreview', '.infobox', '#toc', '.mw-headline', '.reference', '.mw-references-wrap',  'li', 'pre'];
}
setLinkPreview();