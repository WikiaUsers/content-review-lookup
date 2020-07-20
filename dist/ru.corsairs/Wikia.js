//Scrolls Games left and right
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});

/*Викификатор*/
 
function addWikifButton() {
        var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar')); // Monobook+Modern
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
        addOnloadHook(addWikifButton);
}

'use strict';
(function() {
    var IcSlider = function( slider ) {
        var leftArrow = document.createElement( 'div' ),
            rightArrow = document.createElement( 'div' ),
            body = slider.firstElementChild;
 
        leftArrow.setAttribute( 'class', 'iC_appArrow-left iC_appArrow-disabled' );
        rightArrow.setAttribute( 'class', 'iC_appArrow-right' );
        slider.insertBefore( leftArrow, slider.firstElementChild );
        slider.appendChild( rightArrow );
        if ( slider.children[ 1 ].children.length < 2 ) {
            rightArrow.classList.add( 'iC_appArrow-disabled' );
            return;
        }
        leftArrow.addEventListener( 'click', this._prepareToStepLeft.bind( this ) );
        rightArrow.addEventListener( 'click', this._prepareToStepRight.bind( this ) );
        body.addEventListener( 'transitionend', this._endStep.bind( this ) );
        this._slides = body.children;
        this._maxSlide = this._slides.length - 1;
        this._curentSlide = 0;
        this._leftArrow = leftArrow;
        this._rightArrow = rightArrow;
        this._lastStep = null;
        this._targetSlide = 0;
    };
    IcSlider.prototype._prepareToStepLeft = function() {
        if ( this._targetSlide === 0 )
            return;
        this._targetSlide -= 1;
        if ( this._targetSlide === 0 )
            this._leftArrow.classList.add( 'iC_appArrow-disabled' );
        if ( this._rightArrow.classList.contains( 'iC_appArrow-disabled' ) )
            this._rightArrow.classList.remove( 'iC_appArrow-disabled' );
        console.log(this._targetSlide);
        if ( !this._lastStep && this._targetSlide !== this._curentSlide ) {
            this._lastStep = 'left';
            this._startStepLeft();
        }
    };
    IcSlider.prototype._prepareToStepRight = function() {
        if ( this._targetSlide === this._maxSlide )
            return;
        this._targetSlide += 1;
        if ( this._targetSlide === this._maxSlide )
            this._rightArrow.classList.add( 'iC_appArrow-disabled' );
        if ( this._leftArrow.classList.contains( 'iC_appArrow-disabled' ) )
            this._leftArrow.classList.remove( 'iC_appArrow-disabled' );
        if ( !this._lastStep && this._targetSlide !== this._curentSlide ) {
            this._lastStep = 'right';
            this._startStepRight();
        }
    };
    IcSlider.prototype._startStepLeft = function() {
        if ( this._slides[ this._curentSlide + 1 ] )
            this._slides[ this._curentSlide + 1 ].setAttribute( 'class', 'iC_appItem' );
        this._slides[ this._curentSlide ].setAttribute( 'class', 'iC_appItem-right' );
        this._slides[ this._curentSlide - 1 ].setAttribute( 'class', 'iC_appItem-curent' );
        if ( this._slides[ this._curentSlide - 2 ] )
            this._slides[ this._curentSlide - 2 ].setAttribute( 'class', 'iC_appItem-left' );
    };
    IcSlider.prototype._startStepRight = function() {
        if ( this._slides[ this._curentSlide - 1 ] )
            this._slides[ this._curentSlide - 1 ].setAttribute( 'class', 'iC_appItem' );
        this._slides[ this._curentSlide ].setAttribute( 'class', 'iC_appItem-left' );
        this._slides[ this._curentSlide + 1 ].setAttribute( 'class', 'iC_appItem-curent' );
        if ( this._slides[ this._curentSlide + 2 ] )
            this._slides[ this._curentSlide + 2 ].setAttribute( 'class', 'iC_appItem-right' );
    };
    IcSlider.prototype._endStep = function( e ) {
        if( !e.target.classList.contains( 'iC_appItem-curent' ) )
            return;
        if ( this._lastStep === 'left') {
            this._curentSlide -= 1;
        } else if ( this._lastStep === 'right' ) {
            this._curentSlide += 1;
        }
        if ( this._targetSlide > this._curentSlide ) {
            this._lastStep = 'right';
            this._startStepRight();
        } else if (this._targetSlide < this._curentSlide ) {
            this._lastStep = 'left';
            this._startStepLeft();
        } else {
            this._lastStep = null;
        }
    };
 
    var icSliders = document.getElementsByClassName( 'iC_apperances' );
    Array.prototype.forEach.call(icSliders, function( elem ){
        new IcSlider( elem );
    });
})();