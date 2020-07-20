// Ver documentación en [[SVGoriginal]].
var svg_original = (function() {
    'use strict';
    var R = /https?:\/\/([^\/]+\/)+([^\/\.]+\.svg)\/.*/,
        C = document.createElement('div'),
        L = document.createElement('object');
    C.style.visibility = 'none';
    C.id = 'svg_original_temp_container';
    L.type = 'image/svg+xml';
    L.data = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chromiumthrobber.svg';
    C.appendChild(L);
    $(function() {
        document.body.appendChild(C);
    });
    return function(U, c) {
        var X = [],
            N = 0,
            I = document.getElementsByTagName('IMG');
        for(var i = 0; i < I.length; ++i) {
            var x = I[i], s;
            R.lastIndex = 0;
            if (x && ((undefined === c) || (x.classList.indexOf(c))) && (s = x.src) && (s = R.exec(s)) && (s = s[2]) && (s = U[s])) {
                var l = L.cloneNode(true);
                l.setAttribute('id', 'svg_original_temp_' + N);
                if (x.width) {
                    l.width = x.width;
                }
                if (x.height) {
                    l.height = x.height;
                }
                x.parentNode.replaceChild(l,x);
                var n = l.cloneNode(true);
                n.setAttribute('data-svg-original-tmp', N);
                n.setAttribute('data-svg-original', s);
                n.onload = function() {
                    var s = this.getAttribute('data-svg-original'),
                        l = document.getElementById('svg_original_temp_' + this.getAttribute('data-svg-original-tmp'));
                    if (this.data === s) {
                        l.parentNode.replaceChild(this, l);
                        this.onload = undefined;
                    }
                };
                C.appendChild(n);
                n.data = s;
                X[N] = n;
                ++N;
            }
        }
        return X;
    };
})();