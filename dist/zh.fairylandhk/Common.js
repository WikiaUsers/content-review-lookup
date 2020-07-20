$.multimap = function(f){
    var a = $.makeArray(arguments).slice(1);
    return $.map(a[0],function(d,i){
        return f.apply(this,$.map(a,function(e){return e[i];}).concat([i]));
    });
}

$(function(){
    var x = document.createElement('x');

    //Force loading all images
    $("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
    if($('#monsterCalc').length) monsterCalc();
    if(wgUserGroups.indexOf('sysop') == -1) $('.admin').remove();
    if(wgUserName === null) $('#WikiaArticleComments').on('DOMSubtreeModified',function(){
        $('#article-comments-minieditor-newpost').replaceWith('<p>請登陸以發表留言</p><br/>');
        $('.article-comm-reply').remove();
    });
    dataSlider();
    setInterval(function(){$('.eventTimerFlash').css({visibility:new Date().getSeconds()%2?'hidden':'visible'})},1000);
    $('#eventsButton').on('click',function(){eventsSwitch(1000);});

function alternate(){
    $('.alternate > :first-child').show();
    $('.alternate > :last-child').hide();

    $('.alternate')
        .delay(1500)
        .queue(function(n){$(this).children(':first-child').fadeOut(750,n);})
        .queue(function(n){$(this).children(':last-child').fadeIn(750,n);})
        .delay(1500)
        .queue(function(n){$(this).children(':last-child').fadeOut(750,n);})
        .queue(function(n){$(this).children(':first-child').fadeIn(750,n);});

    setTimeout(alternate,6000);        
}

function slideshow(){
    $('.slideshow > *').slice(1).hide();
    $('.slideshow').data('slideshowIndex',0).each(function(){
        var $this = $(this), c = $('<div>');
        $(this).children().each(function(){c.append($('<span>').on('click',function(){
            if($this.queue().length) return true;
            s($this,$(this).index());
        }));});
        c.addClass('slideshowControls').appendTo(this).children().eq(0).addClass('active');
    }).show();

    var s = function(el,j){
        clearTimeout(el.data('tv'));
        var i = el.data('slideshowIndex')
        if(j===undefined) j = (i+1) % (el.children().length-1);
        el.queue(function(n){$(this).children().eq(i).fadeOut(1000,n);})
            .queue(function(n){$(this).children().eq(j).fadeIn(1000,n);});
        el.find('.slideshowControls span').removeClass('active').eq(j).addClass('active');
        el.data({tv:setTimeout(function(){s(el);},5000), slideshowIndex:j});
    };
    
    $('.slideshow').on('mouseenter',function(){
        clearTimeout($(this).data('tv'));
    }).on('mouseleave',function(){
        var $this = $(this);
        clearTimeout($this.data('tv'));
        $this.data('tv',setTimeout(function(){s($this);},3000));        
    }).trigger('mouseleave');
}

function sliders(){
    $('.slider').each(function(i,slider){
        var opt = $(this).data('options'), mask = $('<div>').addClass('sliderMask').appendTo(this), h;
        opt.range = opt.max - opt.min;
        var ctrl = {
            get: function(){return $.map(h.slice(1,-1),function(e){return e*opt.range/$(slider).height()+opt.min;});},
            set: function(y){h = $.map([opt.min].concat($.map(y,function(e){return Math.min(Math.max(opt.min,e),opt.max);}),[opt.max]).sort(function(a,b){return a-b;}),function(e){return (e-opt.min)*$(slider).height()/opt.range;}); this.syn();},
            syn: function(){
                $(slider).children('.sliderArrow').each(function(i){$(this).css({top:$(slider).height()-h[i+1]-7});});
                $(slider).find('.sliderColor').each(function(i){$(this).css({bottom:h[i], height:h[i+1]-h[i]});});
            }
        };
        $(slider).data('control',ctrl);
        ctrl.set(opt.values);
        $.each(opt.colors,function(i,e){
            $('<div>').addClass('sliderColor').css({backgroundColor:e}).appendTo(mask);
            $('<div>').addClass('sliderArrow').css({borderColor:'transparent '+e}).appendTo(slider);
        });
        ctrl.syn();
        $(slider).find('.sliderArrow').eq(-1).remove().end().on('mousedown',function(e){
            e.preventDefault();
            var $this = $(this);
            $(document).on('mousemove.slider',function(e){
                var y = $(slider).offset().top+$(slider).height()-e.pageY, i = $(slider).children('.sliderArrow').index($this);
                h[i+1] = Math.min(Math.max(h[i],y),h[i+2]);
                ctrl.syn();
                $(slider).trigger('slide',[h[i+1]*opt.range/$(slider).height()+opt.min,i]);
            }).on('mouseup.slider',function(){$(this).off('.slider');});
        });
    });
}

function toggle(){
    $('.toggle').each(function(){
        var s = $('<div>').addClass('toggleBtn').appendTo(this), t = $(this).data({state:true, drag:false}), c = function(){
            var v = t.data('drag') ? s.position().left>t.width()/4 : t.data('state'), u = v==t.data('state');
            s.animate({left:v?t.width()/2-1:-1});
            $(document).off('.toggle');
            t.data({state:!v, drag:false});
            if(u) t.trigger('change',[!v]);
        };
        $(this).on('click',function(){c();});
        s.on('mousedown',function(e){
            var x = e.pageX, o = s.position().left;
            e.preventDefault();
            $(document).on('mousemove.toggle',function(e){
                if(e.pageX-x > 1) t.data('drag',true);
                s.css('left',Math.max(-1,Math.min(e.pageX-x+o,t.width()/2-1)));
            }).one('mouseup',function(){c();});
        }).on('click',function(e){e.stopPropagation();});
    });
}
 
function gacha(){
	if ($("#resultList").length){
		disableSelection(document.body);
		$("#resultList").isotope({itemSelector:".filterIcon",layoutMode:"fitRows"});
		var palList=[];
		$("#gachaList .d-pal").each(function(i){
			if ($(this).hasClass("r-1")) v=15; else if ($(this).hasClass("r-2")) v=3; else if ($(this).hasClass("r-3")) v=1; else v=1;
			if ($(this).parent().attr("id")!="gachaList") v*=3;
			for (j=0; j<v; j++) palList.push(i);
		});
		var palCount=palList.length;
		$(".gachaButton#pal").click(function(){
			i=$($("#gachaList .d-pal")[palList[Math.floor(Math.random()*palCount)]]).clone();
			$("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800)})).isotope("reloadItems").isotope({sortBy:"original-order"});
		});
 
		var rareList=[];
		$("#gachaList .d-rare").each(function(i){
			if ($(this).parent().attr("id")=="gachaList") v=1; else v=3;
			if ($(this).hasClass("r-3")) v*=12; else if ($(this).hasClass("r-4")) v*=3; else if ($(this).hasClass("r-5")) v*=1; else v=1;
			for (j=0; j<v; j++) rareList.push(i);
		});
		var rareCount=rareList.length;
		$(".gachaButton#rare").click(function(){
			i=$($("#gachaList .d-rare")[rareList[Math.floor(Math.random()*rareCount)]]).clone();
			$("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800)})).isotope("reloadItems").isotope({sortBy:"original-order"});
		});
		$("#clearGacha").click(function(){
			$("#resultList").isotope("remove", $("#resultList>.filterIcon"));
		});
	}
}


$(function(){
    var tt = $('.tt-text');
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.body.clientWidth, b = $(this).hasClass('bottom');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.body.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        $('<div>').addClass('tt-tip').css(p).text($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.tt-tip').remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
});