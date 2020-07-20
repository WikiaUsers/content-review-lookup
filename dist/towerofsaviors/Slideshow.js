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