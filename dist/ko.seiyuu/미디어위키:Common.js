///////////////////////////////////////////////////////
// Standard Edit Summary
importArticle({
    type: "script",
    article: "w:dev:Standard_Edit_Summary/code.js"
});

///////////////////////////////////////////////////////
// Alternating row colors in Table
$(document).ready(function() {
	$('table.alternative tr:even').addClass("alt");
});

///////////////////////////////////////////////////////
// Scroll to Top
$(function() {
	if (wgNamespaceNumber != 2) {
		$('#WikiaRail').append('<div id="toTop"><img src="https://images.wikia.nocookie.net/cafeinlove/ko/images/b/b3/Up-arrow.png" /></div>' );
		$(window).scroll(function() {
			if($(this).scrollTop() > 400) {
				$('#toTop').fadeIn();	
			} else {
				$('#toTop').fadeOut();
			}
		});
 		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},100);
		});
	}
});

///////////////////////////////////////////////////////
// VTip from www.vertigo-project.com
this.vtip = function() {    
	this.xOffset = 10; // x distance from mouse
	this.yOffset = 10; // y distance from mouse       
 
	$(".vtip").unbind().hover(    
		function(e) {
		this.t = this.title;
		this.title = '';
		this.top = (e.pageY + yOffset); this.left = (e.pageX + xOffset);
 
 		$('body').append( '<p id="vtip">' +this.t+ '</p>' );
 
		$('.vtipWrapper').children('a').removeAttr('title'); // remove traditional tooltip
		$('p#vtip').css("top", this.top+"px").css("left", this.left+"px").fadeIn("medium");
	},
	function() {
		this.title = this.t;
		$("p#vtip").fadeOut("slow").remove();
	}
	);
}; 
jQuery(document).ready(function($){vtip();})