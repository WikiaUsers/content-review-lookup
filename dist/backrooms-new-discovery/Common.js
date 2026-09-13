// [[Category:Internal]] 
// For [[Module:CSS]]; [[T:CSS]] dependency 
mw.hook( 'wikipage.content' ).add(function() { 
    $( 'span.import-css' ).each(function() { 
        var $this = $(this);
        var css = mw.util.addCSS($this.attr( 'data-css' )); 
        
        $(css.ownerNode).addClass( 'import-css' ) 
            .attr( 'data-css-hash' , $this.attr( 'data-css-hash' )) 
            .attr( 'data-from' , $this.attr( 'data-from' )) 
            .attr( 'data-wait' , $this.attr( 'data-wait' )) 
            .attr( 'data-portal' , $this.attr( 'data-portal' )); 
            
        var wait = $this.attr( 'data-wait' ); 
        var portal = $this.attr( 'data-portal' ); 
        var portalOpened = false; 
        var timer;

        if (wait !== 'none' && wait !== undefined) { 
            css.disabled = true; 
            timer = setTimeout(() => css.disabled = false, parseInt(wait, 10) || 0); 
        } 
        
        if (portal !== 'none' && portal !== undefined) { 
            css.disabled = true; 
            $( '.t-css-portal-' + portal).click(function() { 
                css.disabled = !css.disabled; 
                portalOpened = true; 
            }); 
        } 
        
        $( '.theme-toggler' ).click(function() { 
            switch (true) { 
                case wait !== 'none' && wait !== undefined: 
                    if (timer || css.disabled === false) { 
                        clearTimeout(timer); 
                        timer = false; 
                        css.disabled = true; 
                    } else {
                        css.disabled = false; 
                    }
                    break; 
                case portal !== 'none' && portal !== undefined: 
                    if (portalOpened) css.disabled = !css.disabled; 
                    break; 
                default: 
                    css.disabled = !css.disabled; 
                    break; 
            } 
        }); 
    }); 
});

$( '.switchtext' ).click(function() { 
    var el = $(this); 
    var from = el.attr( 'data-from' ); 
    var to = el.attr( 'data-to' ); 
    el.text(el.text() === from ? to : from); 
});