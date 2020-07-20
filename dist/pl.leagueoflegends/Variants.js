/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */

( function( $ ) {
    function variantsInit() {
        window.allVariants = [];
        $('.variant-group').each(function() {
            $(this).contents().filter(function() {return this.nodeType === 3;}).remove()
        })
        $($('.variant-switcher')[0]).children().each(function(){
            var classes = $(this).attr('class').split(/\s+/)
            for(var x=0;x<classes.length;x++) {
                var res = (/^([a-z]+)-variant-switch$/).exec(classes[x])
                if(res[1] && allVariants.indexOf(res[1]) == -1) allVariants.push(res[1])
            }
        });
        if(!allVariants.length) return
        variantsEvents();
        variantsHandleHash(location.hash)
        $('.variant-group').removeClass('no-script')
        $('.default-variant, .a-variant, .b-variant, .c-variant, .d-variant').attr('title', '')
        $('.variant-switcher').removeClass('no-script')
    }
    function variantsEvents() {
        for(var x=0;x<allVariants.length;x++) {
            var variant = allVariants[x]
            $('.'+variant+'-variant-switch').data('variant', variant).click(function() {
                variantsShow($(this).data('variant'));
            })
        }
    }
    function variantsShow(variant) {
        for(var x=0;x<allVariants.length;x++) {
            if(allVariants[x] == variant) continue;
            $('#WikiaArticle').removeClass('show-'+allVariants[x]+'-variant')
        }
        if (variant != 'default') $('#WikiaArticle').addClass('show-'+variant+'-variant')
    }
    function variantsHandleHash(hash) {
        if(!hash) return
        $('#vs'+hash.substr(1)).click()
    }
    
    $( variantsInit )
} )( jQuery );