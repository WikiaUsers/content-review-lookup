$.multimap = function(f){
    var a = $.makeArray(arguments).slice(1);
    return $.map(a[0],function(d,i){
        return f.apply(this,$.map(a,function(e){return e[i];}).concat([i]));
    });
}

$(function(){
    var x = document.createElement('x');
    x.style.cssText = 'pointer-events:auto;'
    if($('#monsterCalc').length) monsterCalc();
    if(wgUserGroups.indexOf('sysop') == -1) $('.admin').remove();
    if(wgUserName === null) $('#WikiaArticleComments').on('DOMSubtreeModified',function(){
        $('#article-comments-minieditor-newpost').replaceWith('<p>請登陸以發表留言</p><br/>');
        $('.article-comm-reply').remove();
    });
    moveModule();
    events();
    alternate();
    slideshow();
    sliders();
    toggle();
    staminaSlider();
    dataSlider();
    stageData();
    setInterval(function(){$('.eventTimerFlash').css({visibility:new Date().getSeconds()%2?'hidden':'visible'})},1000);
    $('#eventsButton').on('click',function(){eventsSwitch(1000);});
    if ((typeof wgIsMainpage !== 'undefined') && (wgIsMainpage)) MainPage();
});

function events(){
    $('.event').each(function(){
        if($(this).is('[data-start]')) var start = $(this).data('start')*1000, end = $(this).data('end')*1000;
        else var start = $(this).closest('[data-start]').data('start')*1000, end = $(this).closest('[data-end]').data('end')*1000;
        var cur = new Date()*1;
        if(cur < start) $(this).removeClass('eventDuring eventAfter').addClass('eventBefore');
        else if(start <= cur && cur < end) $(this).removeClass('eventBefore eventAfter').addClass('eventDuring');
        else if(end <= cur) $(this).removeClass('eventBefore eventDuring').addClass('eventAfter');

        if(!$(this).hasClass('eventTimer')) return true;
    
        var text = '';
        if($(this).hasClass('eventBefore')) var diff = start-cur;
        else if($(this).hasClass('eventDuring')) var diff = end-cur;
        else if($(this).hasClass('eventAfter')) var diff = cur-end;
        if(temp = Math.floor(diff/86400000)) text = temp + '日';
        text += ('0'+Math.floor(diff%86400000/3600000)).slice(-2);
        $(this).empty().append(
            document.createTextNode(text),
            $('<span>').addClass('eventTimerFlash').text(':'),
            document.createTextNode(('0'+Math.floor(diff%3600000/60000)).slice(-2))
        );

        
    });

    $('.eventDisplayBefore, .eventDisplayDuring, .eventDisplayAfter').hide();
    $('.eventDisplayBefore.eventBefore, .eventDisplayDuring.eventDuring, .eventDisplayAfter.eventAfter').show();

    setTimeout(events,5000);
}

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

function moveModule(){
    if($('#WikiaRail.loaded').length==0) {
        setTimeout(moveModule, 100);
        return;
    }
    if($(".page-\u661f\u754c\u4e4b\u68afAstral_Stairways_Wiki").length==0){
        $("#WikiaRail").append($(".move"));
        $(".move").show();
        $(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}
 
function staminaSlider(){
    if(!$('#staminaSlider').length) return;
    var t = null, r = function(){
        clearTimeout(t);
        var now = new Date(), eta = new Date(now.getTime() + ($('#staminaSlider input[type=hidden]').eq(1).val()-$('#staminaSlider input[type=hidden]').eq(0).val())*480000), d = Math.max(0,(Date.UTC(eta.getFullYear(),eta.getMonth(),eta.getDate()) - Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);
        switch(d){case 0:d='';break; case 1:d='明天';break; case 2:d='後天';break; default:d=d+'天後';}
        $('#staminaSliderNow').empty().append(document.createTextNode(('0'+now.getHours()).slice(-2)),$('<span>').addClass('eventTimerFlash').text(':'),document.createTextNode(('0'+now.getMinutes()).slice(-2)));
        if($('#staminaSlider input[type=checkbox]').prop('checked')){
            var l = $('#staminaSlider .sliderText').eq(-1);
            $('#staminaSliderETA').empty().text((l.find('select').val()=='今天'?'':l.find('select').val())+(('0'+l.find('input[type=text]').val()).slice(-2))).append($('<span>').addClass('eventTimerFlash').text(':'),document.createTextNode('00'));
            $('#staminaSlider input').slice(0,2).val(Math.max(0,Math.ceil($('#staminaSlider input[type=hidden]').eq(1).val() - (new Date(now.getFullYear(),now.getMonth(),now.getDate()+$('#staminaSlider select').prop('selectedIndex'),$('#staminaSlider input').eq(-1).val()*1).getTime() - now.getTime())/600000)));
        }else{
            $('#staminaSliderETA').empty().append(document.createTextNode(d),document.createTextNode(('0'+eta.getHours()).slice(-2)),$('<span>').addClass('eventTimerFlash').text(':'),document.createTextNode(('0'+eta.getMinutes()).slice(-2)));
        }
 
        $('#staminaSlider').data('control').set($('#staminaSlider .sliderArrow+.sliderText input[type=hidden]').map(function(){return $(this).val()*1;}).get());
 
        var v = $('#staminaSlider .sliderArrow').map(function(){return parseInt($(this).css('top'));}).get();
        $('#staminaSlider .sliderText')
            .eq(0).css('top',v[0] = v[0] + Math.max(27-v[0]+v[1],0)/2 - 5).end()
            .eq(1).css('top',function(){return Math.min(v[1]-5,v[0]-$(this).height()-3);});
        t = setTimeout(r,6000);
    };
 
    $('<div>').addClass('sliderText').insertAfter('#staminaSlider .sliderArrow');
    $('<div>').addClass('sliderText').appendTo('#staminaSlider');
    $('#staminaSlider .sliderText').eq(0).append(
        $('<span>').attr({id:'staminaSliderSwitch'}).text('現有'),
        document.createTextNode('體力: '),
        $('<input type="text">').addClass('input').val(50),
        $('<input type="hidden">').val(50),
        $('<br>'),
        document.createTextNode('現在是 '),
        $('<span>').attr({id:'staminaSliderNow'})
    ).end().eq(1).append(
        document.createTextNode('目標體力: '),
        $('<input type="text">').addClass('input').val(80),
        $('<input type="hidden">').val(80),
        $('<br>'),
        $('<span>').attr({id:'staminaSliderSwitch2'}).text('大約'),
        document.createTextNode('於 '),
        $('<span>').attr({id:'staminaSliderETA'})
    ).end().eq(2).append(
        $('<input type="checkbox">'),
        document.createTextNode('鎖定於'),
        $('<br>'),
        $('<select>').addClass('input').css({width:'auto', marginRight:2}).append($('<option>').text('今天'),$('<option selected>').text('明天'),$('<option>').text('後天')),
        $('<input type="text">').addClass('input').val(0),
        document.createTextNode(' 時'),
        $('<div>').attr({id:'staminaSliderLockArrow'})
    ).css({background: 'rgb(255,128,0)'}).hide().on('mousedown',function(e){e.stopPropagation();});
    r();
 
    $('#staminaSlider').on('slide',function(e,y,i){
        $(this).find('.sliderText input[type=text]').eq(i).val(Math.floor(y));
        $(this).find('.sliderText input[type=hidden]').eq(i).val(Math.floor(y));
        r();
    });
    $('#staminaSlider .sliderArrow+.sliderText').on('mousedown',function(ev){
        if(ev.target!=this) return true;
        ev.preventDefault();
        $(this).prev().trigger('mousedown');
    });
    $('#staminaSlider input[type=checkbox]').on('change',function(){
        r();
        $('#staminaSlider input').eq(0).prop('disabled',$(this).prop('checked'));
        $('#staminaSliderSwitch').text($(this).prop('checked')?'需保留':'現有');
        $('#staminaSliderSwitch2').text($(this).prop('checked')?'':'大約');
    });
    $('#staminaSlider .sliderArrow+.sliderText input[type=text]').on('keyup',function(){
        var n = $('#staminaSlider .sliderArrow+.sliderText input[type=text]'), v = n.map(function(){return $(this).val()*1;}).get(), i = n.index(this);
        $(this).next().val(Math[i?'max':'min'].apply(this,v));
        r();
    });
    $('#staminaSliderETA').on('click',function(){
        var d = $(this).parent();
        $('.sliderText').eq(-1).css({top: d.position().top+d.height()+3}).show();
        $(document).one('mousedown',function(){$('.sliderText').eq(-1).hide();})
    });
}

function dataSlider(){
    if(!$('#dataSlider').length) return;

    $('#dataSliderToggle').on('change',function(e,s){
        console.log(s);
        if(s){
            $('#monster-data>tbody>tr>*').slice(23,47).delay(500).fadeIn(500);
            $('#monster-data>tbody>tr>*').eq(22).fadeOut(500).delay(500);
        }else{
            $('#monster-data>tbody>tr>*').slice(23,47).fadeOut(500).delay(500);
            $('#monster-data>tbody>tr>*').eq(22).delay(500).fadeIn(500);
        }
    });

    var d = $('#dataSlider').parent(), t = d.find('table'), L = t.data('lv'), r = t.data('race'), c = r=='獸類' ? 2/3 : (r=='神族'||r=='妖精類' ? 1.5 : 1), e = t.data('exp').split('+'), s = t.data('sell').split('+'), s0 = t.data('stats0').split(','), sM = t.data('statsmax').split(',');

    $('<input>').addClass('input').css({width:25}).val(L).on('keyup',function(){
        var n = $('th.dataSliderInput input'), v = n.map(function(){return $(this).val();}).get(), i = n.index(this);
        v[i] = Math[i?'min':'max'].apply(this,v)
        $('#dataSlider').trigger('slide',[v[i],1-i]).data('control').set(v);
    }).appendTo('th.dataSliderInput');

    $('#dataSlider').on('slide',function(ev,y,i){
        var y = Math.floor(y), Y = y-1, sy = $.multimap(function(b,m){return Math.floor(b*1+(m-b)*Math.pow(y/L,c));},s0,sM).concat([Math.ceil(t.data('exptype')*500000*Math.pow(Y,2)/9604),e[0]*1+e[1]*Y,s[0]*1+s[1]*Y]);
        d.find('tr').eq(4-2*i).find('input').val(y);
        d.find('tr').eq(4-2*i).find('td').each(function(j){$(this).text(sy[j]);});
        var f = function(){return $(this).text();}, x = $.multimap(function(a,b){return a*1-b*1},d.find('tr').eq(2).find('td').map(f).get(),d.find('tr').eq(4).find('td').map(f).get());
        d.find('tr').eq(3).find('td').each(function(j){$(this).text('+'+x[j]);});
    }).trigger('slide',[1,0]);
}

function monsterCalc(){
    $('#monsterCalc').data('sel',0).on('click','tr:not(:first-child,.total) th',function(){
        var p = $(this).parent().toggleClass('selected');
        var sel = $('#monsterCalc').data('sel')+(p.hasClass('selected')?1:-1);
        if(sel == 2){
            $('#monsterCalc tr:not(.selected,:first-child)').hide();
            var a = $('#monsterCalc tr.selected').map(function(){return $(this).find('th,td').map(function(){return $(this).text();}).get();}).get(), b = [];
            for(var i=0;i<8;i++) b[i] = a[8+i] - a[i];
            $('<tr>').addClass('totals').append($('<th>').text('+'+b[0]),$('<td>').text('+'+b[1]),$('<td>').text('+'+b[2]),$('<td>').text('+'+b[3]),$('<td>').text('--'),$('<td>').text('+'+b[5]),$('<td>').text('+'+b[6]),$('<td>').text('+'+b[7])).appendTo('#monsterCalc');
        }else{
            $('#monsterCalc tr:not(.selected,:first-child)').show();
            $('#monsterCalc tr.totals').remove();
        }
        $('#monsterCalc').data('sel',sel);
    });
    var id = location.search.match(/id=(\d{3,4})/)[1];
    $.get('http://zh.tos.wikia.com/api.php?format=json&action=expandtemplates&text={{Template:'+id+'|calc}}',function(d){
        function c(s1,s2,max,idx,x){return Math.floor(s1+(s2-s1)*Math.pow(x/max,idx));}
        function e(c,x){return Math.ceil(c*i*i/9604);}
        var u = d.expandtemplates['*'].split(','), t = u.map(parseFloat), n = 0, d = (u[8]=='獸類'?2/3:(u[8]=='神族'||u[8]=='妖精類'?1.5:1));
        $.get('http://zh.tos.wikia.com/api.php?format=json&action=parse&text={{MonsterIcon|'+id+'|40}} <span style="font-size:1.7em; font-weight: bold">[['+u[0]+']]</span>',function(h){$('#monsterCalc').before(h.parse.text['*']);})
        for(i=1; i<=t[1]; i++){
            var x = n, n = e(t[9]*500000,i);
            $('<tr>').append($('<th>').text(i),$('<td>').text(c(t[2],t[5],t[1],d,i)),$('<td>').text(c(t[3],t[6],t[1],d,i)),$('<td>').text(c(t[4],t[7]*1,t[1],d,i)),$('<td>').text(n-x),$('<td>').text(x),$('<td>').text(t[10]+t[11]*(i-1)),$('<td>').text(t[12]+t[13]*(i-1))).appendTo('#monsterCalc')
        }
    },'json');
}

function eventsSwitch(dl){
    if($('#Timetable').is(':visible'))
        var from = $('#Timetable'), to = $('#CurrentEvents');
    else
        var from = $('#CurrentEvents'), to = $('#Timetable');
    $('#EventsModule').delay(dl).animate({height: to.height()},dl);
    from.fadeOut(dl);
    to.delay(dl*2).fadeIn(dl);
}

function stageData(){
    $('.stageData td.special').each(function(){
        var t = $(this).parent().nextUntil('tr:not(:has(td.specspan))');
        if(t.length == 0) return true;
        $(this).attr('rowSpan',t.length+1);
        t.each(function(){$(this).children().eq(1).remove();});
    });
    $('.stageData td.stage').each(function(){
        var t = $(this).parent().nextUntil('tr:not(:has(td.span))');
        if(t.length == 0) return true;
        $(this).attr('rowSpan',t.length+1);
        t.each(function(){$(this).children().eq(0).remove();});
    });

    $('.stageDataDropPlus').mouseenter(function(){
        $(this).hide();
        $(this).parent().prev().css({background:'rgba(0,0,0,.7)', zIndex:1});
        $(this).parent().parent().css({overflow:''});
    });
    $('.stageDataDrop').mouseleave(function(){
        $(this).next().find('.stageDataDropPlus').show();
        $(this).css({background:'', zIndex:0});
        $(this).parent().css({overflow:'hidden'});
    });
}

var tooltips_config = {
    waitForImages: true,
}
 
var tooltips_list = [
    {
        classname: 'basic-tooltip',
        onHide: function(handle) { $(this).html($(handle).html()) },
    },{
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    },{
        classname: 'imgsrc-tooltip',
        parse: '['+'[File:<#imgsrc#>i.png|link=<#link#>]]',
    }
]

importArticles({
    type: 'script',
    articles: [
        "u:dev:Tooltips/code.js"
    ]
});

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

function MainPage() {
	var a=$("#main_page_center").find("img");
	a.css("cursor","pointer").css("margin","5px 0").click(function() {
		var aname=$(this).attr('data-image-name').replace(/(.*)i.png/ig,'$1');
		$.getJSON('http://zh.asw.wikia.com/api.php',
			{
				action: 'parse',
				format: 'json',
				text: '{{'+aname+'}}'
			},
			function (data) {
				$('#main_page_right').children().remove();
				$(data.parse.text['*']).appendTo('#main_page_right');
			}
		);
		a.fadeTo(0,0.5);
		$(this).fadeTo(0,1);
	}).not(":eq(0)").fadeTo(0,0.5);
}


$(function() {
    //$('#mw-content-text').prepend('<div class="leftMenu"><a target="_blank" href="http://zh.tos.wikia.com/wiki/%E5%8F%AC%E5%96%9A%E7%8D%B8%E6%90%9C%E5%B0%8B%E5%99%A8" title="\u53ec\u559a\u7378\u641c\u5c0b\u5668"><img src="https://vignette.wikia.nocookie.net/tos/images/5/54/%E5%8F%AC%E5%96%9A%E7%8D%B8%E6%90%9C%E5%B0%8Bi.png/revision/latest?cb=20150407113752&path-prefix=zh"></a></div>'); - Adds left menu - not permitted
    $('.skill_toggle').add($('.toggleBtn')).click(function(){
      tmp1 = $(this).parent().parent().parent().parent().find('.note').not(':hidden');
      tmp2 = $(this).parent().parent().parent().parent().find('.note:hidden');
      tmp1.hide();
      tmp2.show();
    });
    if ($.isArray(wgUserGroups) && !(0 > $.inArray("autoconfirmed", wgUserGroups))) {
        var a = $('<input type="button" id="ReportButton" style="vertical-align:top;margin-top:3px" value="\u56de\u5831\u9801\u9762\u932f\u8aa4" /><input type="button" id="PurgeButton" style="vertical-align:top;margin-top:3px" value="\u986f\u793a\u6700\u65b0\u9801\u9762" /><span style="float:right;font-weight:bold;">Copyright © 2017 星界之梯Astral Stairways wiki All rights reserved</span>');
        $("header#WikiaPageHeader").children("a.comments").after(a);
        $("#ReportButton").click(function() {
            window.open().location.href = "http://zh.tos.wikia.com/wiki/Project:回報?page=" + wgPageName.replace(/%/g, '%25');
            console.log(wgPageName);
        });
        $("#PurgeButton").click(function() {
            var locary = (location.href.indexOf('?') !== -1)?"&"+location.href.split('?')[1]:"";
            location.href = "/wiki/" + wgPageName + "?action=purge" + locary;
        });
    }
});
window.texttip = function(){
    var tt = $('.tt-text'),tl;
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.body.clientWidth, b = $(this).hasClass('bottom'), l = $(this).hasClass('line');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.body.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        tl = l ?'tt-tip-stage':'tt-tip';
        $('<div>').addClass(tl).css(p).html($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.' + tl).remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
};
texttip();
// Pages need to import script
wgPageName === '填寫通關攻略' && importScript('MediaWiki:NewTeam.js');
wgPageName === '召喚獸搜尋器' && importScript('MediaWiki:PetSearch.js');
wgPageName === 'Tower_of_Saviors_维基:回報' && importScript('MediaWiki:Report.js');
wgPageName === 'Category:龍刻圖鑒' && importScript('MediaWiki:Galleryfilter2.js');
wgPageName === '眾神的考驗' && importScript('MediaWiki:ThePantheonsOrdeal.js');
wgPageName === '神魔之塔 繁中維基主頁' && importScript('MediaWiki:MobilePage.js');
$.inArray('召喚獸', wgCategories) !== -1 && importScript('MediaWiki:PetGallery.js');