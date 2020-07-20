/* Any JavaScript here will be loaded for all users on every page load. */
$.multimap = function(f){
    var a = $.makeArray(arguments).slice(1);
    return $.map(a[0],function(d,i){
        return f.apply(this,$.map(a,function(e){return e[i];}).concat([i]));
    });
}
$(function() {
    if($('#monsterCalc').length) monsterCalc();
    var a = $('<input type="button" id="PurgeButton" style="vertical-align:top;margin-top:3px;background-color:blue" value="New pages" />');
    $("header#WikiaPageHeader").children("a.comments").after(a);
    $("#PurgeButton").click(function() {
    location.href = "/wiki/" + wgPageName + "?action=purge";
    });
    events();
    alternate();
    slideshow();
    sliders();
    toggle();
    dataSlider();
    stageData();
    setInterval(function(){$('.eventTimerFlash').css({visibility:new Date().getSeconds()%2?'hidden':'visible'})},1000);
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
        if(temp = Math.floor(diff/86400000)) text = temp + 'Day';
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

function dataSlider(){
    if(!$('#dataSlider').length) return;

    $('#dataSliderToggle').on('change',function(e,s){
        console.log(s);
        if(s){
            $('#monster-data>tbody>tr>*').slice(25,49).delay(500).fadeIn(500);
            $('#monster-data>tbody>tr>*').eq(24).fadeOut(500).delay(500);
        }else{
            $('#monster-data>tbody>tr>*').slice(25,49).fadeOut(500).delay(500);
            $('#monster-data>tbody>tr>*').eq(24).delay(500).fadeIn(500);
        }
    });

    var d = $('#dataSlider').parent(), t = d.find('table'), L = t.data('lv'), r = t.data('growthtype'), c = r=='Early' ? 1.8 : (r=='Late' ? 0.555555555555555 : 1), e = t.data('exp').split('+'), s = t.data('sell').split('+'), s0 = t.data('stats').split(','), sM = t.data('statsmax').split(',');

    $('<input>').addClass('input').css({width:25}).val(L).on('keyup',function(){
        var n = $('th.dataSliderInput input'), v = n.map(function(){return $(this).val();}).get(), i = n.index(this);
        v[i] = Math[i?'min':'max'].apply(this,v)
        $('#dataSlider').trigger('slide',[v[i],1-i]).data('control').set(v);
    }).appendTo('th.dataSliderInput');

    $('#dataSlider').on('slide',function(ev,y,i){
        var y = Math.floor(y), Y = y-1, sy = $.multimap(function(b,m){return Math.floor(b*1+(m-b)*((y-1)/(L-1)));},s0,sM).concat([Math.ceil(t.data('exptype')*10000*Math.pow((y-1)/98,c)),e[0]*1+e[1]*Y,s[0]*1+s[1]*Y]);
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
    $.get('http://chronosgate.wikia.com/api.php?format=json&action=expandtemplates&text={{Template:'+id+'|calc}}',function(d){
        function c(s1,s2,max,x){return Math.floor(s1+(s2-s1)*((x-1)/(max-1)));}
        function e(c,x,idx){return Math.ceil(c*Math.pow(i/98,idx));}
        var u = d.expandtemplates['*'].split(','), t = u.map(parseFloat), n = 0, d = (u[8]=='Early'?1.8:(u[8]=='Late'?0.555555555555555:1));
        $.get('http://chronosgate.wikia.com/api.php?format=json&action=parse&text={{MonsterIcon|'+id+'|40}} <span style="font-size:1.7em; font-weight: bold">[['+u[0]+']]</span>',function(h){$('#monsterCalc').before(h.parse.text['*']);})
        for(i=1; i<=t[1]; i++){
            var x = n, n = e(t[9]*10000,i,d);
            $('<tr>').append($('<th>').text(i),$('<td>').text(c(t[2],t[5],t[1],i)),$('<td>').text(c(t[3],t[6],t[1],i)),$('<td>').text(c(t[4],t[7]*1,t[1],i)),$('<td>').text(n-x),$('<td>').text(x),$('<td>').text(t[10]+t[11]*(i-1)),$('<td>').text(t[12]+t[13]*(i-1))).appendTo('#monsterCalc')
        }
    },'json');
}

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