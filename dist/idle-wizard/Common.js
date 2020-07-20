/* Any JavaScript here will be loaded for all users on every page load. */

// Tooltips (http://dev.wikia.com/wiki/Tooltips#Configuration)
var tooltips_list = [
    {
        classname: 'spell-tooltip',
        parse: '{' + '{DisplaySpellTooltip|<#name#>}}'
    },
    {
        classname: 'item-tooltip',
        parse: '{' + '{DisplayItemTooltip|<#name#>}}'
    },
    {
        classname: 'pet-tooltip',
        parse: '{' + '{DisplayPetTooltip|<#name#>}}'
    },
    {
        classname: 'class-tooltip',
        parse: '{' + '{DisplayClassTooltip|<#name#>}}'
    },
    {
        classname: 'generic-tooltip',
        parse: '<#tooltip#>'
    }
];

/* Resize item-icon-img to apply the ratio applied on item-icon-bg */
$(window).load(function() {
    
    $(".item-icon").each(function() {
        $cont = $(this);
        
        $resize = $cont.find(".item-icon-bg").first().width() / 76;
        
        $cont.find(".item-icon-img > p > a > img").each(function() {
            $img = $(this);
            
            $w = $img[0].naturalWidth;
            $h = $img[0].naturalHeight;
            
            $img.width($w * $resize);
            $img.height($h * $resize);
            
            // Lazyload?
            $img.load(function() {
                $lzy = $(this);
                
                $resize = $lzy.parent().parent().parent().parent().find(".item-icon-bg").first().width() / 76;
 
                $w = $lzy[0].naturalWidth;
                $h = $lzy[0].naturalHeight;
 
                $lzy.width($w * $resize);
                $lzy.height($h * $resize);
            });
        });
    });
    
    $(window).resize(function() {
        // Perform the resize of item-presets: 
        
        $(".item-icon").each(function() {
            $cont = $(this);
            
            $resize = $cont.find(".item-icon-bg").first().width() / 76;
            
            $cont.find(".item-icon-img > p > a > img").each(function() {
                $img = $(this);
                
                $w = $img[0].naturalWidth;
                $h = $img[0].naturalHeight;
                
                $img.width($w * $resize);
                $img.height($h * $resize);
            });
        });
    });
})