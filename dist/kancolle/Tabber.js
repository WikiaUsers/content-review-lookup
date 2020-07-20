/**
 * Still doesn't work in threads.
 * 
 * A copy of https://github.com/Wikia/app/blob/dev/extensions/3rdparty/tabber/tabber.js
 * (sans location.hash interaction)
 */

(function($) {
	$.fn.tabber = function() {
		return this.each(function() {
			var $this = $(this),
				tabContent = $this.children('.tabbertab'),
				nav = $('<ul>').addClass('tabbernav');
			tabContent.each(function() {
				var anchor = $('<a>').text(this.title).attr('title', this.title).attr('href', '#');
				$('<li>').append(anchor).appendTo(nav);
				nav.append($('<wbr>'));
			});
			$this.prepend(nav);
			function showContent(title) {
				var content = tabContent.filter('[title="' + title + '"]');
				if (content.length !== 1) return false;
				tabContent.hide();
				content.show();
				nav.find('.tabberactive').removeClass('tabberactive');
				nav.find('a[title="' + title + '"]').parent().addClass('tabberactive');
				$(window).trigger('scroll');
				return true;
			}
			showContent(tabContent.first().attr('title'));
			nav.on('click', 'a', function(e) {
				var title = $(this).attr('title');
				e.preventDefault();
				showContent( title );
			});
			$this.addClass('tabberlive');
		});
	};
})(jQuery);

$(document).ready(function() {
	$('.tabber:not(.tabberlive)').tabber();
});

mw.hook('wikipage.content').add(function ($content) {
	$content.find('.tabber:not(.tabberlive)').tabber();
});

/**
 * Prevent tabber from interacting with location.hash.
 */

(function(mw, $) {

    "use strict";

    $(document).ready(function() {

        function fixTabber(content) {
            var navs = content ? content.find(".tabbernav") : $(".tabbernav");
            navs.each(function() {
                var nav = $(this);
                if (!nav.data("fixed")) {
                    nav.off("click", "a");
                    nav.on("click", "a", function(e) {
                        e.preventDefault();
                        var tabs = nav.parent().children(".tabbertab"); // .tabbernav -> .tabber -> .tabbertab
                        var title = $(this).attr("title");
                        var content = tabs.filter("[title='" + title + "']");
                        if (content.length !== 1) return;
                        tabs.hide();
                        content.show();
                        nav.find(".tabberactive").removeClass("tabberactive");
                        nav.find("a[title='" + title + "']").parent().addClass("tabberactive");
                        $(window).trigger("scroll");
                    });
                    nav.data("fixed", "true");
                }
            });
        }

        fixTabber();

        mw.hook("wikipage.content").add(function(content) {
            content = $(content);
            setTimeout(function() {
                fixTabber(content);
            }, 100);
        });

    });

}(mediaWiki, jQuery));