$.multimap = function(f){
    var a = $.makeArray(arguments).slice(1);
    return $.map(a[0],function(d,i){
        return f.apply(this,$.map(a,function(e){return e[i];}).concat([i]));
    });
};

$(function(){
    var x = document.createElement('x');
    x.style.cssText = 'pointer-events:auto;';
    if(x.style.pointerEvents === 'auto') importStylesheet('MediaWiki:Frames1pe.css');
    else importStylesheet('MediaWiki:Frames1.css');
    if($('#monsterCalc').length) monsterCalc();
    if(mw.config.values.wgUserGroups.indexOf('sysop') == -1) $('.admin').remove();
    if(mw.config.values.wgUserName === null) $('#WikiaArticleComments').on('DOMSubtreeModified',function(){
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
    setInterval(function(){$('.eventTimerFlash').css({visibility:new Date().getSeconds()%2?'hidden':'visible'});},1000);
    $('#eventsButton').on('click',function(){eventsSwitch(1000);});
    if (mw.config.values.wgPageName == '神魔之塔_繁中維基') MainPage();
});

function events(){
    $('.event').each(function(){
        if($(this).is('[data-start]')) var start = $(this).data('start')*1000, end = $(this).data('end')*1000, oneday = Math.floor(end-86400000);
        else var start = $(this).closest('[data-start]').data('start')*1000, end = $(this).closest('[data-end]').data('end')*1000, oneday = Math.floor(end-86400000);
        var cur = new Date()*1;
        if(cur < start) $(this).removeClass('eventDuring eventOnedayDuring eventAfter').addClass('eventBefore');
        else if(start <= cur && cur < oneday) $(this).removeClass('eventBefore eventAfter eventOnedayDuring').addClass('eventDuring');
        else if(oneday <= cur && cur < end) $(this).removeClass('eventBefore eventAfter eventDuring').addClass('eventOnedayDuring');
        else if(end <= cur) $(this).removeClass('eventBefore eventDuring eventOnedayDuring').addClass('eventAfter');

        if(!$(this).hasClass('eventTimer')) return true;
    
        var text = '';
        if($(this).hasClass('eventBefore')) var diff = start-cur;
        else if($(this).hasClass('eventDuring') || $(this).hasClass('eventOnedayDuring')) var diff = end-cur;
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
    $('.eventDisplayBefore.eventBefore, .eventDisplayDuring.eventDuring, .eventDisplayDuring.eventOnedayDuring, .eventDisplayAfter.eventAfter').show();

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
        var i = el.data('slideshowIndex');
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
    if($(".page-\u795e\u9b54\u4e4b\u5854_\u7e41\u4e2d\u7dad\u57fa").length==0){
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
        $(document).one('mousedown',function(){$('.sliderText').eq(-1).hide();});
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
        v[i] = Math[i?'min':'max'].apply(this,v);
        $('#dataSlider').trigger('slide',[v[i],1-i]).data('control').set(v);
    }).appendTo('th.dataSliderInput');

    $('#dataSlider').on('slide',function(ev,y,i){
        var y = Math.floor(y), Y = y-1, sy = $.multimap(function(b,m){return Math.floor(b*1+(m-b)*Math.pow(y/L,c));},s0,sM).concat([Math.ceil(t.data('exptype')*500000*Math.pow(Y,2)/9604),e[0]*1+e[1]*Y,s[0]*1+s[1]*Y]);
        d.find('tr').eq(4-2*i).find('input').val(y);
        d.find('tr').eq(4-2*i).find('td').each(function(j){$(this).text(sy[j]);});
        var f = function(){return $(this).text();},x = $.multimap(function(a,b){return a*1-b*1;},d.find('tr').eq(2).find('td').map(f).get(),d.find('tr').eq(4).find('td').map(f).get());
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
    $.get(mw.util.wikiScript('api'), {
        format: 'json',
        action: 'expandtemplates',
        text: '{{Template:' + id + '|calc}}'
    }, function (d) {
        function c(s1,s2,max,idx,x){return Math.floor(s1+(s2-s1)*Math.pow(x/max,idx));}
        function e(c,x){return Math.ceil(c*i*i/9604);}
        var u = d.expandtemplates['*'].split(','), t = u.map(parseFloat), n = 0, d = (u[8]=='獸類'?2/3:(u[8]=='神族'||u[8]=='妖精類'?1.5:1));
        $.get(mw.util.wikiScript('api'), {
        format: 'json',
        action: 'parse',
        text: '{{MonsterIcon|' + id + '|40}} <span style="font-size:1.7em; font-weight: bold">[[' + u[0] + ']]</span>'
    }, function (h) {
    $('#monsterCalc').before(h.parse.text['*']);});
        for(i=1; i<=t[1]; i++){
            var x = n, n = e(t[9]*500000,i);

$('<tr>').append($('<th>').text(i),$('<td>').text(c(t[2],t[5],t[1],d,i)),$('<td>').text(c(t[3],t[6],t[1],d,i)),$('<td>').text(c(t[4],t[7]*1,t[1],d,i)),$('<td>').text(n-x),$('<td>').text(x),$('<td>').text(t[10]+t[11]*(i-1)),$('<td>').text(t[12]+t[13]*(i-1))).appendTo('#monsterCalc');
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
    $('.stageData td.stageRowDesk.stage2').each(function(){
        var t = $(this).parent().nextUntil(':not(tr:has(td.stageRowES), tr:has(td.span2))');
        if(t.length == 0) return true;
        var x = t.children('td.stageRowDesk.span2')  
        $(this).attr('rowSpan',x.length+1);
        t.each(function(){$(this).children('td.stageRowDesk.span2').eq(0).remove();});
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

window.tooltips_config = {
    waitForImages: true,
}

window.tooltips_list = [
    {
        classname: 'basic-tooltip',
        onHide: function(handle) { $(this).html($(handle).html()); },
    },{
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    },{
        classname: 'imgsrc-tooltip',
        parse: '['+'[File:<#imgsrc#>i.png|link=<#link#>]]',
    }
];

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
            $("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800);})).isotope("reloadItems").isotope({sortBy:"original-order"});
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
            $("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800);})).isotope("reloadItems").isotope({sortBy:"original-order"});
        });
        $("#clearGacha").click(function(){
            $("#resultList").isotope("remove", $("#resultList>.filterIcon"));
        });
    }
}

function MainPage() {
    var a=$("#main_page_center").find("img");
    a.css("cursor","pointer").css("margin","5px 0").click(function() {
        var aname=$(this).attr('data-image-name').replace(/(.*)i\.png/ig,'$1');
        new mw.Api().get({
            action: 'parse',
            format: 'json',
            text: decodeURI('%7B%7B' + aname + '%7D%7D')
            }).done(function (data) {
                console.log('data=' + data);
                $('#main_page_right').children().remove();
                $(data.parse.text['*']).appendTo('#main_page_right');
            }, 'json');
        a.fadeTo(0,0.5);
        $(this).fadeTo(0,1);
    }).not(":eq(0)").fadeTo(0,0.5);
}

( function ( $, mw ) {
    var nsNr = mw.config.get( 'wgNamespaceNumber' ),
        theText = '\u56de\u5831\u9801\u9762\u932f\u8aa4';
        if ($.isArray(wgUserGroups) && !(0 > $.inArray("autoconfirmed", wgUserGroups))) {
            $( addReportButton );
        }
    
    function reportPage () {
            window.open().location.href = "https://tos.fandom.com/zh/wiki/Project:回報?page=" + wgPageName.replace(/%/g, '%25');
    }
    
    function addOasisReportButton () {
        switch (nsNr) {
            case 500:
            case 502:
                $('.page-header__contribution-buttons').append(
                    '<a class="custom-report-button wds-button wds-is-squished wds-is-secondary" href="javascript:void(0)"></a>'
                );
                break;
            case 2:
            case 3:
                $( '.UserProfileActionButton .wikia-menu-button ul' ).append(
                    '<li><a class="custom-report-button" href="javascript:void(0)"></a></li>'
                );
                break;
            default:
                $( '.page-header__contribution-buttons .wds-list' ).append(
                    '<li><a class="custom-report-button" href="javascript:void(0)"></a></li>'
                );
        }
    }
    
    function addReportButton () {
        switch( mw.config.get( 'skin' ) ) {
            
            case 'uncyclopedia': /* monobook clone, pass to monobook */
            case 'wowwiki': /* monobook clone, pass to monobook */
            case 'lostbook': /* monobook clone, pass to monobook */
            case 'monobook':
                $('#p-cactions > .pBody > ul').append('<li id="ReportButton" id="ca-report"><a class="custom-report-button" href="javascript:void(0)"></a></li>');
                break;
            
            case 'oasis':
            case 'wikia':
                addOasisReportButton();
                break;
        }
        $( '.custom-report-button' ).text( theText ).click( reportPage );
    }    
} ( jQuery, mediaWiki ) );

$(function() {
    $(".license-description").append("<div style='font-weight:bold; font-size:12pt; background: rgba(0,0,0,0.5); border-radius: 5px; padding: 5px; text-shadow: 1px 1px 0px rgba(155,155,155,0.5);'><img style='vertical-align:middle' src='https://images.wikia.nocookie.net/__cb20131122002606/tos/zh/images/thumb/c/c7/Attention.png/45px-Attention.png'> 嚴禁發佈<span style='color: yellow'>徵友</span>及<span style='color: yellow'>招生</span>訊息。違反<a href='javascript:void(0)' onclick=window.open().location.href='https://tos.fandom.com/zh/wiki/Tower_of_Saviors_%E7%BB%B4%E5%9F%BA:%E7%94%A8%E6%88%B6%E5%AE%88%E5%89%87#.E8.A8.8E.E8.AB.96.E5.AE.88.E5.89.87'>用戶守則</a>將會封禁帳號處分。</div>");
    $('.skill_toggle').add($('.toggleBtn')).click(function(){
      tmp1 = $(this).parent().parent().parent().parent().find('.note').not(':hidden');
      tmp2 = $(this).parent().parent().parent().parent().find('.note:hidden');
      tmp1.hide();
      tmp2.show();
    });

});
window.YoutubePlayerDisableAutoplay = true;
window.fng = $.extend(true, window.fng, {cp: (window.fng || {}).cp || {} });
window.fng.cp.uselang = 'zh';
window.fng.cp.lang = $.extend(true, {}, window.fng.cp.lang, { 
    zh: {preview: '預覽', cancel: '取消', publish: '發表評論'}
});
window.texttip = function(){
    var tt = $('.tt-text'),tl;
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.documentElement.clientWidth, b = $(this).hasClass('bottom'), l = $(this).hasClass('line');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.documentElement.clientHeight-o.top-$(this).outerHeight()};
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
window.scriptMap = {
    '填寫通關攻略': ['MediaWiki:NewTeam.js'],
    '召喚獸搜尋器': ['MediaWiki:PetSearch1.js'],
    '召喚獸搜尋器test': ['MediaWiki:PetSearch1.js'],
    '龍刻搜尋器': ['MediaWiki:CraftSearch.js'],
    'Tower_of_Saviors_維基:回報': ['MediaWiki:Report.js'],
    '龍刻圖鑒': ['MediaWiki:Galleryfilter2.js'],
    '龍刻武裝圖鑒': ['MediaWiki:Galleryfilter2.js'],
    '眾神的考驗': ['MediaWiki:ThePantheonsOrdeal.js'],
    '神魔之塔 繁中維基主頁': ['MediaWiki:MobilePage.js']
};
// Use timeout to check importScript is exist after some time
setTimeout(function () {
window.scriptMap[mw.config.values.wgPageName].forEach(function (script) {
    importScript(script);
});
}, 100);
setTimeout(function () {
if (mw.config.get("wgCategories").indexOf("召喚獸") >= 0) {
	importScript("MediaWiki:PetGallery.js");
	}
}, 100);
/*
if (mw.config.values.wgCategories.indexOf('召喚獸') >= 0) {
    importScript('MediaWiki:PetGallery.js');
}
wgPageName === '填寫通關攻略' && importScript('MediaWiki:NewTeam.js'),
wgPageName === '召喚獸搜尋器' && importScript('MediaWiki:PetSearch.js'),
wgPageName === '召喚獸搜尋器test' && importScript('MediaWiki:PetSearch1.js'),
wgPageName === '龍刻搜尋器' && importScript('MediaWiki:CraftSearch.js'),
wgPageName === 'Tower_of_Saviors_維基:回報' && importScript('MediaWiki:Report.js'),
wgPageName === '龍刻圖鑒' && importScript('MediaWiki:Galleryfilter2.js'),
wgPageName === '龍刻武裝圖鑒' && importScript('MediaWiki:Galleryfilter2.js'),
wgPageName === '眾神的考驗' && importScript('MediaWiki:ThePantheonsOrdeal.js'),
wgPageName === '神魔之塔 繁中維基主頁' && importScript('MediaWiki:MobilePage.js'),
$.inArray('召喚獸', wgCategories) !== -1 && importScript('MediaWiki:PetGallery.js');
*/