$(function(){
	//Move module to right column
	moveModule();
});

function moveModule(){
	if($(".page-机动战士高达EXVSFB_WIKI").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}

(function() {
    var $backToTopTxt = "返回顶部", $backToTopEle = new Element("div", {
        "class": "backToTop",
        title: $backToTopTxt
    }).set("text", $backToTopTxt).addEvent("click", function() {
        var st = document.getScroll().y, speed = st / 6;
        var funScroll = function() {
            st -= speed;
            if (st <= 0) { st = 0; }
            window.scrollTo(0, st);
            if (st > 0) { setTimeout(funScroll, 20); }
        };
        funScroll();
    }).inject(document.body), $backToTopFun = function() {
        var st = document.getScroll().y, winh = window.getSize().y;
        (st > 0)? $backToTopEle.setStyle("display", "block"): $backToTopEle.setStyle("display", "none");
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.setStyle("top", st + winh - 166);
        }
    };
    window.addEvents({
        scroll: $backToTopFun,
        domready: $backToTopFun
    });
})();