//<pre>
/* 这里的任何JavaScript将为使用移动版网站的用户加载 */
    (function($, mw) { 

	function linkConfirm() {
        mw.loader.using('mediawiki.Uri').then(function() {
            if ($('body').css('position') === 'static') $('body').css('position', 'relative');
            var prompt = $('<div/>').attr('class', 'linkConfirmprompt');
            prompt.css('max-width', $('#mw-content-text').width() - 4);
            var textnode = $('<div/>').attr('class', 'linkConfirmpromptTextnode');
            var text = $('<span/>');
            textnode.append(text);
            prompt.appendTo('body');
            $('body').on('click', function(e) {
                var self = $(e.target);
                var uri = new mw.Uri(e.target.href);
                if (/\detective-hu\.fandom(?:\.com)?$/.test(uri.host)) {
                    if (!self.closest('.blackblock')[0] && !self.find('.blackblock')[0] || self.parent().is(".reference")) return true;
                    text.text(decodeURI(e.target.href));
                    $('.linkConfirmpromptAlert').hide();
                } else {
                    text.text(decodeURI(e.target.href));
                    $('.linkConfirmpromptAlert').show();
                }
                var promptTop = 0,
                    promptLeft = 0;
                var offsetParent = self;
                do {
                    promptTop += offsetParent.offset().top;
                    promptLeft += offsetParent.offset().left;
                    offsetParent = offsetParent.offsetParent();
                } while (!offsetParent.is("html, body"));
                promptTop += self.outerHeight() + 3;
                promptLeft += self.outerWidth() / 2 - prompt.outerWidth() / 2;
                if (promptTop + prompt.outerHeight() > $(document).height() - 3) promptTop = $(document).height() - prompt.outerHeight() - 3;
                if (promptLeft + prompt.outerWidth() > $(window).width() - 3) promptLeft = $(window).width() - prompt.outerWidth() - 3;
                if (promptLeft < 0) promptLeft = 3;
                prompt.css({
                    top: promptTop + 'px',
                    left: promptLeft + 'px',
                });
                window.setTimeout(check, 0, text);
                prompt.data({
                    href: e.target.href,
                    linkid: self[0].dataset.linkid,
                });
                prompt.fadeIn(137);
                return false;
            });
        });
    }
	
	$(function() {
	$('.blackblock a').on("click", function() {
            	if (!$(this).closest('.blackblock').is(':active, :focus')) return false;
       	 });
	linkConfirm();
	});

})(jQuery, mediaWiki);
/*阅读更多：https://zh.moegirl.org.cn/MediaWiki:Mobile.js
本文引自萌娘百科(https://zh.moegirl.org.cn)，文字内容默认使用《知识共享 署名-非商业性使用-相同方式共享 3.0》协议。*/
// <pre>