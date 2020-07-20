/* Any JavaScript here will be loaded for all users on every page load. */

/* Borrowed from Candy Crush Saga Wiki
   Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME.  */

$(function(){
    toggle();
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* This is the toggle button javascript*/
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

/* Toggling the toggle. Credits to http://zh.tos.wikia.com */

$(function() {
$('.skill_toggle').add($('.toggleBtn')).click(function(){
      tmp1 = $(this).parent().parent().parent().parent().find('.note').not(':hidden');
      tmp2 = $(this).parent().parent().parent().parent().find('.note:hidden');
      tmp1.hide();
      tmp2.show();
    });
    
});
/* Importing codes for 4th and 5th navigation extensions and Tooltips   */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:Tooltips/code.js'
    ]
});

/* Special Pages will have special imports */

wgPageName === 'Template:PrimeTesting' && importScript('MediaWiki:PrimeTest.js');
wgPageName === 'Prime_Numbers_Wiki' && importScript('MediaWiki:PrimeTest.js');