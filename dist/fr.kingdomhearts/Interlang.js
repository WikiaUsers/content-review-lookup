/*Interlang.js MESSAGE: Would be cool to give us a reason as to why it was rejected. That's the point of it, no? */

jQuery(function($) {
	"use strict";
	$('.lienkhwikinet').eq(0).each(function() {

                if($('.WikiaArticleInterlang')[0]) {
                        var $links = $('.WikiaArticleInterlang ul').eq(0);
                        $links.prepend('<li><a href="http://www.khwiki.com/'.concat(this.textContent,'">English</a></li>'));
                } else {
                        var $links = '<nav class="WikiaArticleInterlang"><h3>Langues : </h3><ul><li><a href="http://www.khwiki.com/'.concat(this.textContent,'">English</a></li></ul></nav>');
                        $($links).insertBefore($(".WikiaArticleFooter"));
                }


	}).end()
	.remove();

});