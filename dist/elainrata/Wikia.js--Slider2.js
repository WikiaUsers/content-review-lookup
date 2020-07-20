/**
    Name:          TC Slider
    Autohrs:       T3CHNOCIDE and Nanaki
    Description    Creates an animated slider with editable width and height and support for any (reasonable) ammount of slides.
*/
$(function(){
    function openSlide(slider, slide) {        
        var slides = slider.children();
        slides.removeClass('active linked');
        slide.addClass('active').removeClass('linked');
        
        slider.data('current', slide.data('index'));
        
        var positions = getPositions(slider.innerWidth(), slide.data('width'), slides.length, slide.data('index'));
        
        slides.each(function(i){
            var s = $(this);
            s.addClass('animated').animate({
                'left': positions[i][0],
                'right': positions[i][1]
            }, "normal", "linear", function() {
                $(this).removeClass('animated').dequeue();
                if(slide.data('href')) slide.addClass('linked');
            });
        });
    }
    function clearAnim(slider) {
        slider.children('.slide').each(function(){
            if($(this).hasClass('animated')) $(this).removeClass('animated').dequeue().stop();
        });
    }
    function handleClick(slider) {
        var slide = $(this)
        if(slide.hasClass('active')) {
            location.href = slide.data('href');
        } else {
            clearAnim(slider);
            openSlide(slider, slide);
        }
    }
    function nextSlide(slider) {
        no = (slider.data('current')+1) % slider.data('num');
        openSlide(slider, $(slider.children().get(no)));
    }
    function getPositions(main, slide, num, at) {
        if(num <= 1) return [[0,main]]
        var rest = Math.max(0, main-slide);
        var bar = rest/(num-1),
            lines = [],
            left = 0,
            right = main;
        for(var i = 0; i < num; i++) {
            right -= (i == at ? slide : bar);
            lines.push([left, right]);
            left += (i == at ? slide : bar);
        }
        return lines
    }
    function init(slider) {
        if(slider.data('initialized')) return;
        slider.data('initialized', true);
        
        slider.contents().filter(function() {
            return this.nodeType != 1 || !$(this).hasClass('slide');
        }).remove();
        
        var current, height = 0;
        var slides = slider.children();
        slides.each(function(index) {
            var slide = $(this);
            if(current === undefined && slide.hasClass('active')) current = index;
            if(current != index) slide.removeClass('active');
            slide.children('div').children().unwrap();
            
            var a = slide.find('a');
            slide.data('href', a.prop('href'));
            slide.attr('title', slide.attr('title') || a.attr('title'));
            a.contents().unwrap();
            
            slide.data('index', index);
            slide.css('z-index', slides.length-index);
            
            height = Math.max(height, slide.height());
            slide.data('width', slide.width());
            
            slide.children().wrapAll($('<div>').css('float', 'right'));
            
            slide.click(function(){
                handleClick.call(this, slider)
            });
        });
        if(current === undefined) {
            current = 0;
            $(slides.get(0)).addClass('active');
        }
        
        height = parseInt(slider.css('height') || height);
        
        var positions = getPositions(slider.innerWidth(), $(slides.get(current)).width(), slides.length, current);
        slides.each(function(i) {
            var slide = $(this);
            slide.css({
                'left': positions[i][0],
                'right': positions[i][1]
            }).height(height);
        });
        
        slider.height(height);
        slider.data({
            'current': current,
            'num': slides.length,
        });
        
        var delay = Math.max(1, slider.data('delay') || 10) * 1000;
        
        var scrolltimer = setInterval(nextSlide, delay, slider);
        slider.on("mouseenter", function() {
            scrolltimer = clearInterval(scrolltimer);
        }).on("mouseleave", function() {
            scrolltimer = setInterval(nextSlide, delay, slider);
        });
        if(typeof ImgLzy === 'object') ImgLzy.load(this);
        console.log(ImgLzy.checkAndLoad())
    }
    mw.util.addCSS('.tcslider { position:relative; overflow:hidden } .tcslider > .slide { position:absolute; bottom:0; left:0; cursor:pointer; } .tcslider > .slide::before { content:attr(data-label); display:block; font-size:12px; line-height:1; position:absolute; bottom:5px; right:5px; text-shadow:1px 1px 5px #000; transition:opacity .5s } .tcslider > .slide.active::before { opacity:0 }');
    mw.hook('wikipage.content').add(function(elem) {
        $(elem).find('.tcslider').each(function(){
            init($(this));
        });
    });
});