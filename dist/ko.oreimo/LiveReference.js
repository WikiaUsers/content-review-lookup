/**
 * Live Reference
 * 
 * Adds a tooltip to a citation link when a mouse hovers over it.
 * 
 * Compared to the classic "Reference Tooltips", this module:
 * - does not provide user configuration options
 * - is significantly faster
 * - is able to vertically flip the tooltip when it goes off screen
 * 
 * Default CSS setup available on [[MediaWiki:LiveReference.css]]
 * 
 * @Author(s)  User:Cafeinlove
 * @License    MIT License
 */
void function( window, document, mw, undefined ) {
 
    "use strict";
 
    /**
     * Namespace numbers for pages that do not need this module
     * -1: Special
     *  8: MediaWiki
     */
    var excludedNS = [-1, 8];
 
    if ( excludedNS.indexOf( mw.config.get("wgNamespaceNumber") ) > 0 ) return;
    if ( mw.config.get( "wgAction" ) != "view" ) return;
 
    // triggering elements (links like [1], [2]...)
    var container = document.getElementById( "mw-content-text" );
    var citations = container.getElementsByClassName( "reference" );
 
    if ( citations.length === 0 ) return;
 
    var tooltip; // dynamic tooltip
    var animation; // animationFrame queue
 
    /**
     * init
     * @description  initialize the tooltip
     */
    void function init() {
        // create tooltip element and append it to body element
        tooltip = document.createElement( "div" );
        tooltip.id = "liveReference";
        document.body.appendChild( tooltip );
 
        // delegate mouse events to "#mw-content-text"
        [ "mouseover", "mouseout" ].forEach( function( e ) {
            container.addEventListener( e, function( event ) {
                checkEvent( event );
            });
        });
    }();
 
    /**
     * checkTarget
     * @description    check detected mouse event and call tooltip functions if necessary
     * @param{Object}  detected mouse event object
     */
    function checkEvent( event ) {
        var target = event.target;
        
        if ( target.tagName != "A" ) return;
        if ( !target.parentNode.classList.contains( "reference" ) ) return;
 
        if ( event.type == "mouseover" ) {
            setTooltip( target );
        } else {
            resetTooltip();
        }
    }
 
    /**
     * setTooltip
     * @description         set content and position of the tooltip
     * @param{HTMLElement}  the citation link element which user has mouse-overed
     */
    function setTooltip( trigger ) {
        // replace() escapes all dots within the anchor's hash
        // preventing error when <ref/>'s name attribute has unicode string as its value
        var sourceHash = trigger.hash.replace( /\./g, "\\." );
        var sourceEl = document.querySelector( sourceHash + " .reference-text" );
        var scroll = {
            top: document.body.scrollTop || document.documentElement.scrollTop,
            left: document.body.scrollLeft || document.documentElement.scrollLeft
        };
        var rect = trigger.getBoundingClientRect();
        var isInViewport = ( rect.top - tooltip.offsetHeight ) > 100;
 
        // position the tooltip
        tooltip.style.top = ( scroll.top + rect.top ) + "px";
        tooltip.style.left = ( scroll.left + rect.left ) + "px";
 
        // copy content from target element to the tooltip
        tooltip.innerHTML = sourceEl.innerHTML;
 
        // flip the tooltip if it is going off the viewport
        if ( !isInViewport ) tooltip.classList.add( "is-flipped" );
 
        // fade in the tooltip
        fadeIn( tooltip );
    }
 
    /**
     * resetTooltip
     * @description  reset content and position of the tooltip
     */
    function resetTooltip() {
        fadeOut( tooltip, function() {
            // reset flip
            tooltip.className = "";
 
            // remove content
            while ( tooltip.lastChild ) {
                tooltip.removeChild( tooltip.lastChild );
            }
        });
    }
 
    /**
     * fadeIn
     * @description         fade in the tooltip 
     * @param{HTMLElement}  element to fade in
     */
    function fadeIn( el ) {
        var opacity = 0;
        var interval = 1 / 8;
 
        el.style.opacity = opacity;
        el.style.visibility = "visible";
 
        function animate() {
            opacity += interval;
 
            if ( opacity < 1 ) {
                el.style.opacity = opacity;
                animation = window.requestAnimationFrame( animate );
            } else {
                el.style.opacity = 1;
                return true;
            }
        }
 
        stopAnimation();
        animate();
    }
    
    /**
     * fadeOut
     * @description         fade out the tooltip
     * @param{HTMLElement}  element to fade out
     * @param{Function}     function to execute when fade animation completes
     */
    function fadeOut( el, callback ) {
        var opacity = 1;
        var interval = 1 / 8;
 
        function animate() {
            opacity -= interval;
 
            if ( opacity > 0 ) {
                el.style.opacity = opacity;
                animation = window.requestAnimationFrame( animate );
            } else {
                el.style.opacity = 0;
                el.removeAttribute( "style" );
 
                if ( typeof callback == "function" ) callback();
 
                return true;
            }
        }
 
        stopAnimation();
        animate();
    }
 
    /**
     * stopAnimation
     * @description  clear animationFrame queue
     */
    function stopAnimation() {
        if ( !animation ) return;
        window.cancelAnimationFrame( animation );
        animation = undefined;
    }
 
}( window, document, window.mediaWiki );