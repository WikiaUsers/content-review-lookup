'use strict';

importArticles({
    type: 'script',
    articles: [
        // other scripts
        'u:dev:QuickDelete/code.js',
        // other scripts
    ]
});

var Tooltip = function( data ) {
    this._elementBase = data.elem || document.body;
    this._elementTarget = null;
    this._selector = data.selector || '*';
    this._createTooltip = data.createTooltip;
    this._coords = {
        current: { x: 0, y: 0 },
        previous: { x: 0, y:0 }
    };
    this._delay = data.delay || 1000;
    this._position = {
        position: data.position.position,
        positionOffset: data.position.positionOffset || 0,
        subposition: data.position.subposition || 'center',
        subpositionOffset: data.position.subpositionOffset || 0,
        elementLimiting: data.position.elementLimiting || document.documentElement,
        elementLimiting_paddingTop: data.position.elementLimiting_paddingTop || 0,
        elementLimiting_paddingBottom: data.position.elementLimiting_paddingBottom || 0,
        elementLimiting_paddingLeft: data.position.elementLimiting_paddingLeft || 0,
        elementLimiting_paddingRight: data.position.elementLimiting_paddingRight || 0,
        window_paddingTop: data.position.window_paddingTop || 0,
        window_paddingBottom: data.position.window_paddingBottom || 0,
        window_paddingLeft: data.position.window_paddingLeft || 0,
        window_paddingRight: data.position.window_paddingRight || 0
    };
    this._precision = data.precision || 2;
    this._tooltip = null;
    this._velocityTimer = null;
    this._elementBase.addEventListener('mousemove', function( e ) {
        this._getMouseCoords( e );
    }.bind( this ));
    this._elementBase.addEventListener('mouseover', function() {
        if ( !this._velocityTimer && !this._tooltip )
            this._startMeasurementMouseVelocity();
    }.bind( this ));
    this._elementBase.addEventListener('mouseout', function( e ) {
        if ( this._tooltip && (e.relatedTarget === null || !this._elementTarget.contains( e.relatedTarget )) )  {
            this._hideTooltip();
        }
        if ( e.relatedTarget === null || !this._elementBase.contains( e.relatedTarget ) )
            this._endMeasurementMouseVelocity();
    }.bind( this ));
};
//Получает текущие координаты курсора мыши относительно экрана.
Tooltip.prototype._getMouseCoords = function( e ) {
    this._coords.current.x = e.pageX;
    this._coords.current.y = e.pageY;
};
//ищет элемент, удовлетворяющий селектору, вверх по цепочке родителей и возвращает его. Граница - базовый элемент.
Tooltip.prototype._closest = function() {
    var boundaryElem = this._elementBase,
        hoveredElems = boundaryElem.querySelectorAll( ':hover' ),
        currentElem = hoveredElems[ hoveredElems.length -1 ],
        selector = this._selector;
 
    while ( currentElem != document.documentElement ) {
        if ( currentElem.matches( selector ) )
            return currentElem;
        if ( currentElem == boundaryElem )
            return null;
        currentElem = currentElem.parentElement;
    }
};
 
Tooltip.prototype._startMeasurementMouseVelocity = function() {
    this._coords.previous.x = this._coords.current.x;
    this._coords.previous.y = this._coords.current.y;
    this._velocityTimer = setInterval( this._measurementMouseVelocity.bind( this ), this._delay );
};
Tooltip.prototype._endMeasurementMouseVelocity = function() {
    clearInterval( this._velocityTimer );
    this._velocityTimer = null;
};
Tooltip.prototype._measurementMouseVelocity = function() {
    var pX = this._coords.previous.x,
        pY = this._coords.previous.y,
        cX = this._coords.current.x,
        cY = this._coords.current.y,
        velocityX = Math.abs( cX - pX ),
        velocityY = Math.abs( cY - pY );
 
    this._coords.previous.x = cX;
    this._coords.previous.y = cY;
    if ( velocityX <= this._precision && velocityY <= this._precision ) {
        this._endMeasurementMouseVelocity();
        this._elementTarget = this._closest();
        if ( this._elementTarget ) {
            this._showTooltip( this._elementTarget );
        }
    }
};
Tooltip.prototype._showTooltip = function( target ) {
    var elementTooltip = this._createTooltip( target ),
        elementTooltipPosition;
    this._tooltip = elementTooltip;
    elementTooltip.style.position = 'absolute';
    elementTooltip.style.visibility = 'hidden';
    target.appendChild( elementTooltip );
    elementTooltipPosition = this._calculationPosition( elementTooltip, target );
    elementTooltip.style.top = elementTooltipPosition.top + 'px';
    elementTooltip.style.left = elementTooltipPosition.left + 'px';
    elementTooltip.style.visibility = '';
};
Tooltip.prototype._hideTooltip = function() {
    this._elementTarget.removeChild( this._tooltip );
    this._elementTarget = null;
    this._tooltip = null;
};
Tooltip.prototype._calculationPosition = function( tooltip, target ) {
    var mainAxisCalculate = function( data ) {
            var d = data,
                fitsInWindow = d.targetPos - d.offset - d.paddingWin > d.tooltipSize,
                fitsInLimitingElement = d.targetPos - d.offset - d.paddingEl - d.tooltipSize > d.elPos;
            if (fitsInWindow && fitsInLimitingElement) {
                return ( p.position === 'top' || p.position === 'left' ) ?
                d.targetOffset - d.tooltipSize - d.offset : d.targetOffset + d.targetSize + d.offset;
            } else {
                return ( p.position === 'top' || p.position === 'left' ) ?
                d.targetOffset + d.targetSize + d.offset : d.targetOffset - d.tooltipSize - d.offset;
            }
        },
        crossAxisCalculate = function( data ) {
            var d = data,
                defoltPosition_window,
                defoltPositionOffsetParent;
            if ( p.subposition === 'center' ) {
                defoltPosition_window = d.targetPos + (d.targetSize - d.tooltipSize) / 2 + d.offset;
                defoltPositionOffsetParent = d.targetOffset + (d.targetSize - d.tooltipSize) / 2 + d.offset;
            } else if ( p.subposition === 'left' || p.subposition === 'top' ) {
                defoltPosition_window = d.targetPos - d.tooltipSize + d.offset;
                defoltPositionOffsetParent = d.targetOffset - d.tooltipSize + d.offset;
            } else {
                defoltPosition_window = d.targetPos + d.targetSize + d.offset;
                defoltPositionOffsetParent = d.targetOffset + d.targetSize + d.offset;
            }
            if ( defoltPosition_window < d.initialElPos + d.initialPaddingEl ||
                defoltPosition_window < d.initialPaddingWin ) {
                return defoltPositionOffsetParent +
                    (Math.max(d.initialElPos + d.initialPaddingEl, d.initialPaddingWin) - defoltPosition_window);
            } else if ( defoltPosition_window + d.tooltipSize + d.finalPaddingEl > d.finalElPos ||
                defoltPosition_window + d.tooltipSize + d.finalPaddingWin > d.windowSize ) {
                return defoltPositionOffsetParent - (defoltPosition_window + d.tooltipSize -
                    Math.min(d.finalElPos - d.finalPaddingEl, d.windowSize - d.finalPaddingWin));
            } else {
                return defoltPositionOffsetParent;
            }
        },
        targetPosition = target.getBoundingClientRect(),
        p = this._position,
        elemLimitingPosition = p.elementLimiting.getBoundingClientRect(),
        top,
        left;
 
    if ( p.position === 'top' ) {
        top = mainAxisCalculate({
            targetPos: targetPosition.top,
            targetSize: target.offsetHeight,
            targetOffset: target.offsetTop,
            elPos: elemLimitingPosition.top,
            tooltipSize: tooltip.offsetHeight,
            offset: p.positionOffset,
            paddingWin: p.window_paddingTop,
            paddingEl: p.elementLimiting_paddingTop
        });
    } else if ( p.position === 'bottom' ) {
        top = mainAxisCalculate({
            targetPos: document.documentElement.clientHeight - targetPosition.bottom,
            targetSize: target.offsetHeight,
            targetOffset: target.offsetTop,
            elPos: document.documentElement.clientHeight - elemLimitingPosition.bottom,
            tooltipSize: tooltip.offsetHeight,
            offset: p.positionOffset,
            paddingWin: p.window_paddingBottom,
            paddingEl: p.elementLimiting_paddingBottom
        });
    } else if ( p.position === 'left' ) {
        left = mainAxisCalculate({
            targetPos: targetPosition.left,
            targetSize: target.offsetWidth,
            targetOffset: target.offsetLeft,
            elPos: elemLimitingPosition.left,
            tooltipSize: tooltip.offsetWidth,
            offset: p.positionOffset,
            paddingWin: p.window_paddingLeft,
            paddingEl: p.elementLimiting_paddingLeft
        });
    } else if ( p.position === 'right' ) {
        left = mainAxisCalculate({
            targetPos: document.documentElement.clientWidth - targetPosition.right,
            targetSize: target.offsetWidth,
            targetOffset: target.offsetLeft,
            elPos: document.documentElement.clientWidth - elemLimitingPosition.right,
            tooltipSize: tooltip.offsetWidth,
            offset: p.positionOffset,
            paddingWin: p.window_paddingRight,
            paddingEl: p.elementLimiting_paddingRight
        });
    }
    if ( p.position === 'top' || p.position === 'bottom' ) {
        left = crossAxisCalculate({
            targetPos: targetPosition.left,
            targetSize: target.offsetWidth,
            targetOffset: target.offsetLeft,
            initialElPos: elemLimitingPosition.left,
            finalElPos: elemLimitingPosition.right,
            tooltipSize: tooltip.offsetWidth,
            offset: p.subpositionOffset,
            windowSize: document.documentElement.clientWidth,
            initialPaddingWin: p.window_paddingLeft,
            finalPaddingWin: p.window_paddingRight,
            initialPaddingEl: p.elementLimiting_paddingLeft,
            finalPaddingEl: p.elementLimiting_paddingRight
        });
    } else {
        top = crossAxisCalculate({
            targetPos: targetPosition.top,
            targetSize: target.offsetHeight,
            targetOffset: target.offsetTop,
            initialElPos: elemLimitingPosition.top,
            finalElPos: elemLimitingPosition.bottom,
            tooltipSize: tooltip.offsetHeight,
            offset: p.subpositionOffset,
            windowSize: document.documentElement.clientHeight,
            initialPaddingWin: p.window_paddingTop,
            finalPaddingWin: p.window_paddingBottom,
            initialPaddingEl: p.elementLimiting_paddingTop,
            finalPaddingEl: p.elementLimiting_paddingBottom
        });
    }
    return { top: top, left: left };
};

var ApperanceBlock = function( elem ) {
    this.element = elem;
    this.element.obj = this;
    this.tooltip = new Tooltip({
        elem: this.element,
        createTooltip: function( targetElem ) {
            var elem = document.createElement( 'div' ),
                header = document.createElement( 'div'),
                body = document.createElement( 'div'),
                seriesName = targetElem.dataset.seriesName,
                status = targetElem.dataset.appearance,
                statusDescription,
                name = this._elementBase.dataset.name;
            if ( status === 'main' ) {
                statusDescription = ' появляется в главной роли';
            } else if ( status === 'supporting' ) {
                statusDescription = ' появляется во второстепенной роли';
            } else if ( status === 'background' ) {
                statusDescription = ' появляется в фоновой роли';
            } else if ( status === 'mentioned' ) {
                statusDescription = ' не появляется, но упоминается другими персонажами';
            } else if ( status === 'missing' ) {
                statusDescription = ' не появляется';
            }
            elem.classList.add( 'appBlock_tooltip' );
            header.innerHTML = seriesName;
            header.classList.add( 'appBlock_tooltip-header' );
            elem.appendChild( header );
            body.innerHTML = 'В серии «' + seriesName + '» ' + name + statusDescription;
            body.classList.add( 'appBlock_tooltip-body' );
            elem.appendChild( body );
            return elem;
        },
        selector: '.appBlock_episode',
        delay: 300,
        precision: 1,
        position: {
            position: 'bottom',
            subposition: 'center',
            elementLimiting: document.getElementById( 'mw-content-text' )
        }
    });
    this.element.addEventListener( 'mouseup', this.RedirectToLink );
    this.element.addEventListener( 'mousedown', function( event ) {
        if ( event.target.classList.contains( 'appBlock_episode' ) ) {
            event.preventDefault();
        }
    } );
};
ApperanceBlock.prototype.RedirectToLink = function( event ) {
    var target = event.target,
        button = event.which,
        link = target.dataset.articleLink,
        name = event.target.dataset.seriesName,
        location;
    if ( target.classList.contains( 'appBlock_episode' ) ) {
        location = 'https://losyash-library.fandom.com/ru/wiki/' + encodeURIComponent(  ( link ) ? link : name );
        if ( button === 1 ) {
            window.location = location;
        } else if ( button === 2 ) {
            window.open( location );
        }
    }
};

(function() {
    var apperanceBlocks = document.getElementsByClassName( 'appBlock_apperanceBlock' );
    for ( var i = 0; i < apperanceBlocks.length; i++ )//var i -> let
        new ApperanceBlock( apperanceBlocks[ i ] );
})();