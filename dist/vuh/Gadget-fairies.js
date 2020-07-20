/* credit: http://james.padolsey.com/javascript/creating-fairies/ */
 
(function(){
 
    if (window.fairyEnvironment && fairyEnvironment.Fairy) {
        return init();
    }
 
    var s = document.documentElement.appendChild(document.createElement('script')),
        t = setInterval(function(){
            if (window.fairyEnvironment && fairyEnvironment.Fairy) {
                clearInterval(t);
                s.parentNode.removeChild(s);
                init();
            }
        }, 50);
 
    s.src = 'https://raw.github.com/padolsey/Fairy/master/fairy.js';
 
    function init() {
 
        var d = document.body.appendChild(document.createElement('div')),
            docEl = document.documentElement,
            body = document.body,
            winHeight,
            resize = function() {
 
                winHeight = window.innerHeight ||
                            docEl.clientHeight ||
                            body.clientHeight;
 
                fairyEnvironment.bounds.right =
                    Math.max(docEl.clientWidth, docEl.offsetWidth);
 
                scroll();
 
            },
            scroll = function() {
 
                fairyEnvironment.bounds.top =
                    Math.max(
                        ~~window.pageYOffset,
                        body.scrollTop,
                        docEl.scrollTop
                    );
                fairyEnvironment.bounds.left =
                    Math.max(
                        ~~window.pageXOffset,
                        body.scrollLeft,
                        docEl.scrollLeft
                    );
                fairyEnvironment.bounds.bottom =
                    fairyEnvironment.bounds.top + winHeight;
 
            };
 
        resize();
 
        if (window.addEventListener) {
            window.addEventListener('resize', resize, false);
            window.addEventListener('scroll', scroll, false);
        } else {
            window.attachEvent('onresize', resize);
            window.attachEvent('onscroll', scroll);
        }
 
        fairyEnvironment.spawn(25, function(){
            if (this.dom) {
                d.appendChild(this.dom);
                this.start();
            }
        });
 
    }
 
}());
 
/******************************************************************************
https://raw.github.com/padolsey/Fairy/master/fairy.js contains:
 * Fairy generator
 * @author James Padolsey
 * @version 1.0
 
// Singleton FairyEnvironment
var fairyEnvironment = new function() {
 
    this.bounds = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
 
    this.speedLimit = {
        high: 6,
        low: 2
    };
 
    this.spawn = function(amount, postCreation, config) {
 
        var ret = [], i = -1;
 
        amount = ~~amount
 
        while (++i < amount) {
            postCreation && postCreation.call(ret[i] = new fairyEnvironment.Fairy(config));
        }
 
        return ret;
 
    };
 
};
 
// Fairy Class
fairyEnvironment.Fairy = function Fairy(config) {
 
    // Config is optional, defaults apply
    config = config || {};
 
    var bounds = this.bounds = fairyEnvironment.bounds,
        speedLimit = this.speedLimit = fairyEnvironment.speedLimit;
 
    this.timer;
 
    // If no width is specified then generate width between 10 and 30
    this.width = config.width || 0 | Math.random() * 20 + 10;
    this.height = config.height || this.width;
 
    this.opacity = 1;
    this.dOpacity = Math.random() * .1;
 
    // If no speed is specified then genarate a random width between
    // the upper and lower limits specified in FairyEnvironment
    this.speed = config.speed || Math.random() * (speedLimit.high - speedLimit.low) + speedLimit.low;
    this.dX = 0;
    this.dY = 0;
 
    // Setup an arbitrary direction (to get things rolling)
    this.shiftDirection();
 
    // If no color is specified then generate one randomly
    // Note that this will generate intensities between 155 and 255
    this.color = config.color || [
        0|Math.random()*100+155,
        0|Math.random()*100+155,
        0|Math.random()*100+155
    ];
 
    // Spawn the fairy somewhere random
    this.y = Math.random() * (bounds.bottom - this.height - bounds.top) + bounds.top;
    this.x = Math.random() * (bounds.right - this.width - bounds.left) + bounds.left;
 
    // Build the canvas
    // Note, this doesn't HAVE to be a canvas - it could just be a regular DOM element
    this.dom = this.build();
 
    // set initial position
    if (this.dom) this.step(); 
 
};
 
fairyEnvironment.Fairy.prototype = {
 
    LEFT_EDGE: 1,
    TOP_EDGE: 2,
    RIGHT_EDGE: 3,
    BOTTOM_EDGE: 4,
 
    build: function() {
 
        // Create <canvas>
 
        var c = document.createElement('canvas'),
            _ = c.getContext && c.getContext('2d'),
            color = this.color;
 
        if (!_) {
            // Just for IE :D
            var d = document.createElement('div');
            d.style.fontSize = '12px';
            d.style.fontFamily = 'monospace';
            d.style.position = 'absolute';
            d.style.color = '#FFF';
            d.style.background = '#000';
            d.innerHTML = 'IE SUCKS';
            this.width = 48;
            return d;
        }
 
        c.width = this.width;
        c.height = this.height;
 
        // Create radial gradient to make it Fairy-like
        var grad = _.createRadialGradient(this.width/2,this.height/2,0,this.width/2,this.height/2,this.width/2);
        grad.addColorStop(0, 'rgba(' + color.join() + ',1)');
        grad.addColorStop(1, 'rgba(' + color.join() + ',0)');
 
        _.fillStyle = grad;
        _.fillRect(0,0,this.width,this.height);
 
        c.style.position = 'absolute';
 
        return c;
 
    },
 
    start: function() {
        var hoc = this;
        this.timer = setInterval(function(){
            hoc.step();
        }, 30);
    },
 
    stop: function() {
        this.timer && clearInterval(this.timer);
    },
 
    step: function() {
 
        if (!this.detectEdges()) {
            this.shiftDirection();
        }
 
        this.limitSpeed();
 
        this.dom.style.left = ~~(this.x += this.dX) + 'px';
        this.dom.style.top = ~~(this.y += this.dY) + 'px';
 
        this.pulse();
 
    },
 
    pulse: function() {
 
        if (this.opacity >= 1 || this.opacity <= .6) {
            this.dOpacity = -this.dOpacity;
        }
 
        this.dom.style.opacity = this.opacity += this.dOpacity;
 
    },
 
    limitSpeed: function() {
 
        // Make sure the fairy isn't going too fast.
 
        if (Math.abs(this.dX) >= this.speed) {
            this.dX += this.dX > 0 ? -1 : 1;
            this.compensate('Y');
        }
 
        if (Math.abs(this.dY) >= this.speed) {
            this.dY += this.dY > 0 ? -1 : 1;
            this.compensate('X');
        }
 
    },
 
    compensate: function(axis) {
 
        // Compensate an delta-axis.
        // E.g. if abs(dX) is 5 then abs(dY) should be 5
        // E.g. if abs(dY) is 3 then abs(dX) should be 7
 
        var other = axis === 'Y' ? 'X' : 'Y',
            val = this.speed - Math.abs(this['d' + other]);
 
        this['d' + axis] = this['d' + axis] > 0 ? val : -val;
 
    },
 
    shiftDirection: function() {
 
        // Only change direction 30% of the time
        if (Math.random() > .7) {
            this.dX += Math.random() * 2 - 1; // between 1 & -1
            this.compensate('Y');
        }
 
    },
 
    turnAway: function(fromEdge) {
 
        if (fromEdge === this.TOP_EDGE || fromEdge === this.BOTTOM_EDGE) {
            // SLowly start inverting Y
            this.dY += fromEdge === this.TOP_EDGE ? 1 : -1;
            this.compensate('X');
        } else {
            // Slowly start inverting X
            this.dX += fromEdge === this.LEFT_EDGE ? 1 : -1;
            this.compensate('Y');
        }
 
        return true;
 
    },
 
    detectEdges: function() {
 
        // If the fairy is too close to an edge (padding is fixed at 60px)
        // then slowly turn away... 
 
        var x = this.x,
            y = this.y,
            w = this.width,
            h = this.height,
            bounds = this.bounds,
            padding = 60;
 
        if (x < padding + bounds.left) return this.turnAway(this.LEFT_EDGE);
        if (y < padding + bounds.top) return this.turnAway(this.TOP_EDGE);
        if (x + w > bounds.right - padding) return this.turnAway(this.RIGHT_EDGE);
        if (y + h > bounds.bottom - padding) return this.turnAway(this.BOTTOM_EDGE);
 
    }
 
};
*******************************************************************************/