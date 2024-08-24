importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

//Onload functions
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
    $('.slider').each(function(index,slider){
        var s = $.map($(this).data('values').split('|'),function(e){return e*1/$(slider).height();}), c = $(this).data('colors').split('|'), mask = $('<div>').addClass('sliderMask').appendTo(slider);
 
        var obj = {
            get: function(){
                return $(slider).children('.sliderArrow').map(function(){return ($(this).position().top+7)/$(slider).height();}).get();
            },
            set: function(arr){
                arr = [0].concat(arr,[1]).sort();
                $(slider).children('.sliderArrow').each(function(i){$(this).css({top:arr[i+1]*$(slider).height()-7});});
                $(slider).find('.sliderColor').each(function(i){$(this).css({top:arr[i]*$(slider).height(), height:(arr[i+1]-arr[i])*$(slider).height()});});
            }
        };
        $(this).data('control',obj);
 
        $.each(s,function(i,e){$('<div>').addClass('sliderArrow').css({top:e*$(slider).height()}).appendTo(slider);});
        $.each(c,function(i,e){$('<div>').addClass('sliderColor').css({background:e}).appendTo(mask);});
        obj.set(s);
 
        $(this).children('.sliderArrow').on('mousedown',function(ev){
            ev.preventDefault();
            var $this = $(this);
            $(document).on('mousemove',function(ev){
                var y = [0].concat(obj.get(),[1]), i = $(slider).find('.sliderArrow').index($this);
                var y = Math.min(Math.max(y[i],(ev.pageY-$(slider).offset().top)/$(slider).height()),y[i+2]);
                $this.css({top: y*$(slider).height()-7});
                obj.set(obj.get());
                $(slider).trigger('slide',{y:y, index:i});
            }).on('mouseup',function(){
                $(this).off('mousemove');
            });
        });
    });
}
//

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/* Hero Image */
 
// Remove dark gradient
if(document.getElementsByClassName("image-window").length > 0) document.getElementsByClassName("image-window")[0].className = "";
 
/* Drop Down Lists */
importScript('MediaWiki:Dropdown.js');