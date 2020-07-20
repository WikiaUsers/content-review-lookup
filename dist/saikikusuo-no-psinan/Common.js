/* Any JavaScript here will be loaded for all users on every page load. */

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