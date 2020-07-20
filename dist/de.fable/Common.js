jQuery(document).ready(function($){
	/* NEWS-CAT SWITCHER */
	if($(".fb-news-container").length > 0){
		var news = $(".fb-news-container");
		
		$(".fb-nc-cat a").click(function(event){
			event.preventDefault();
			
			if($(this).parent().hasClass("fb-nc-cat-active")){
				return;
			}
			var number = $(this).parent("div").attr("id").split("-").reverse()[0];
			var content = $(news).find("td.fb-nc-content").children(".fb-nc-tag");
			var height = $(content).eq(number).outerHeight();
			
			if(height < ($(this).parent().outerHeight()*3)){
				height = $(this).parent().outerHeight()*3;
			}
			
			var _this = this;
			$(news).animate({
				height: (height+20) + "px"
			}, 200, function(){
				$(content).removeClass("fb-nc-tag-active");
				$(news).find(".fb-nc-cats").children().removeClass("fb-nc-cat-active");
				
				$(content).eq(number).addClass("fb-nc-tag-active");
				$(_this).parent().addClass("fb-nc-cat-active");
			});
		});
	}
	
	/* COSTUM FABLE SLIDER */
	var fableSliderInit = function(holder, width){
		$(holder).css("margin-left", "0px");
		$.each($(holder).children(".fbs-item"), function(index){
			if(index === 0){
				if(!$(this).hasClass("fbs-item-active")){
					$(this).addClass("fbs-item-active");
				}
				$(holder).css("height", $(this).outerHeight());
			} else {
				if($(this).hasClass("fbs-item-active")){
					$(this).removeClass("fbs-item-active");
				}
			}
			$(this).css({
				top:       "0px",
				left:		(width*index) + "px",
				width:		$(holder).outerWidth(),
				display:	"block",
				position:	"absolute"
			});
		});
	}
	var fableSlider = function(holder, width, action){
		var count = $(holder).children("div.fbs-item").length;
		var current = $(holder).children("div.fbs-item-active");
		var prev = $(current).prev("div.fbs-item");
		var next = $(current).next("div.fbs-item");
		
		var left, element;
		if(action == "left"){
			if(prev.length === 0){
				left = (width*(count-1))*-1;
				element = $(holder).children("div.fbs-item").eq(-1);
			} else {
				left = (parseInt($(holder).css("margin-left"))+width);
				element = prev;
			}
		} else {
			if(next.length === 0){
				left = 0;
				element = $(holder).children("div.fbs-item").eq(0);
			} else {
				left = (parseInt($(holder).css("margin-left"))-width);
				element = next;
			}
		}
		
		if($(current).outerHeight() !== $(element).outerHeight()){
			$(holder).animate({
				height: $(element).outerHeight(),
				marginLeft: left
			}, 200, function(){
				$(element).addClass("fbs-item-active");
				$(current).removeClass("fbs-item-active");
			});
		}else {
			$(holder).animate({
				marginLeft: left
			}, 200, function(){
				$(element).addClass("fbs-item-active");
				$(current).removeClass("fbs-item-active");
			});
		}
	}
	
	/* POLL SLIDER */
	if($("#fable-polls").length > 0){
		if($("#fable-polls .fable-polls").children("div.fbs-item").length > 1){
			$("#fable-polls .fable-widget-control").removeClass("fable-hide");
			var pollWidth = $("#fable-polls .fable-polls").outerWidth()+20;
			fableSliderInit($("#fable-polls .fable-polls"), pollWidth);
			
			$("#fable-polls .fable-widget-control .fable-poll-c").click(function(event){
				event.preventDefault();
				if($(this).hasClass("fable-poll-left")){
					fableSlider($("#fable-polls .fable-polls"), pollWidth, "left");
				} else {
					fableSlider($("#fable-polls .fable-polls"), pollWidth, "right");
				}
			});
		}
	}
	
	/* FEATURED SLIDER */
	if($("#fable-featured").length > 0){
		if($("#fable-featured .fable-featured-list").children("div.fbs-item").length > 1){
			$("#fable-featured").find("span.fable-featured-c").addClass("fable-featured-c-available");
			var featWidth = $("#fable-featured .fable-featured-list").outerWidth();
			fableSliderInit($("#fable-featured .fable-featured-list"), featWidth);
			
			$("#fable-featured span.fable-featured-c").click(function(event){
				if($(this).parent().hasClass("fable-featured-left")){
					fableSlider($("#fable-featured .fable-featured-list"), featWidth, "left");
				} else {
					fableSlider($("#fable-featured .fable-featured-list"), featWidth, "right");
				}
			});
		}
	}
});