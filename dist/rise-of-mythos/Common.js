/* Any JavaScript here will be loaded for all users on every page load. */

window.texttip = function(){
    var tt = $('.tt-text');
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.body.clientWidth, b = $(this).hasClass('bottom');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.body.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        $('<div>').addClass('tt-tip').css(p).html($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.tt-tip').remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
};
texttip();

function modalInfo(event) {
	var div = $(">div", event.currentTarget);

	$(div).clone().css({"display":""}).makeModal({
	  id: "modalInfo",
	  width: $(window).width() - 500,
	  position: "absolute",
	});
	$("#modalInfo .modalContent")
        .addClass("WikiaArticle") //because some default formatting requires it.
        .css({
	  overflow: "auto",
	  height: $(window).height() - 600
	});
	$("#modalInfo").center()
}
$(function() {
	$('.modalInfo').each(function() {$(this).click(modalInfo)});
});
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() + $(this).outerWidth()) / 4) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

// Override Lightboxes and go directly to the image's page when clicking on an image
var ImageLightbox= {
  log:function(msg) {
    $().log(msg,'ImageLightbox');
  },
  track:function(fakeUrl){
    window.jQuery.tracker.byStr('lightbox'+fakeUrl);
  },
  init:function(){
    var self=this;
    if(!window.wgEnableImageLightboxExt){
      this.log('disabled');
      return;
    }
    var images=$('#bodyContent').find('a.lightbox, a.image');
    if(!images.exists()){return;}
    images.unbind('.lightbox').bind('click.lightbox',function(ev){self.onClick.call(self,ev);});
  },
  onClick:function(ev){
  },
  show:function(imageName,caption){
  }
};
ImageLightbox.init.call(ImageLightbox);

var tooltips_config = {
    waitForImages: true,
}
importArticles({
    type: "script",
    articles: [
        "u:dev:Tooltips/code.js",
         ]
});