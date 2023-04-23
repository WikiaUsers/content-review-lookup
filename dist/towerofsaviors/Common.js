$(document).ready( function() {
    $('.suppress a').removeAttr('title');
    stageData();
    texttip();
    
    // Pages need to import script
    switch (mw.config.get('wgPageName')) {
        case 'Card_Search':
            importScript('MediaWiki:PetSearch.js');
            break;
        case 'Craft_Search':
            importScript('MediaWiki:CraftSearch.js');
            break;
        case 'Card_Drops_Search':
            importScript('MediaWiki:DropSearch.js');
            break;
        case 'Titles_System':
            importScript('MediaWiki:TitleSearch.js');
            break;
        case 'Past_Stages':
            importScript('MediaWiki:PastStages.js');
            break;
    }
});

function stageData(){
    $('.stageData td.special').each(function(){
        var t = $(this).parent().nextUntil('tr:not(:has(td.specspan))');
        if(t.length == 0) return true;
        $(this).attr('rowSpan',(t.length)/2+1);
        t.each(function(){$(this).children().eq(1).remove();});
    });
    $('.stageData td.stage').each(function(){
        var t = $(this).parent().nextUntil('tr:not(:has(td.span))');
        if(t.length == 0) return true;
        $(this).attr('rowSpan',(t.length)/2+1);
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
 
window.tooltips_config = {
    noCSS: true,
};
 
window.tooltips_list = [
    {
        classname: 'basic-tooltip',
        onHide: function(handle) { $(this).html($(handle).html()); },
    },{
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    },{
        classname: 'imgsrc-tooltip',
        parse: '['+'[File:<#imgsrc#>.png|<#size#>]]',
    }
];

window.texttip = function(){
    var tt = $('.tt-text');
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var c = $(this).attr('class').replace("tt-text", "");
        var o = $(this).offset(), w = document.documentElement.clientWidth, b = $(this).hasClass('bottom');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.documentElement.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        $('<div>').addClass('tt-tip ' + c).css(p).html($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.tt-tip').remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
};

window.BackToTopModern = true;