(function(window, $, mw) {
    'use strict';

    var golemUrl = "https://static.wikia.nocookie.net/vcheck-reimagined/images/c/ce/Golem.png/revision/latest?cb=20260608180812";
    var stalkerUrl = "https://static.wikia.nocookie.net/vcheck-reimagined/images/c/c6/Mimic_cursor.png/revision/latest?cb=20260611175959";

    var golemWidth = "120px";
    var stalkerWidth = "30px";

    function initMouseGlider() {
        $('#glide-image').remove();

        var $floater = $('<img id="glide-image" src="' + golemUrl + '" style="position: fixed !important; pointer-events: none !important; z-index: 999999 !important; opacity: 0.3; width: ' + golemWidth + '; height: auto; transition: left 1.5s, top 1.5s; transform: translate(-50%, -50%);" />');
        $('body').append($floater);

        var mouseX = window.innerWidth / 2;
        var mouseY = window.innerHeight / 2;

        window.addEventListener('mousemove', function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }, { passive: true });

        setInterval(function() {
            $floater.css({
                left: mouseX + 'px',
                top: mouseY + 'px'
            });
        }, 1500);
    }

    function initMouseStalker() {
        $('#glide-image').remove();

        var $floater = $('<img id="glide-image" src="' + stalkerUrl + '" style="position: fixed !important; pointer-events: none !important; z-index: 999999 !important; opacity: 0.3; width: ' + stalkerWidth + '; height: auto; transform: translate(-50%, -50%);" />');
        $('body').append($floater);

        var mouseHistory = [];
        var currentX = window.innerWidth / 2;
        var currentY = window.innerHeight / 2;

        window.addEventListener('mousemove', function(event) {
            currentX = event.clientX;
            currentY = event.clientY;
        }, { passive: true });

        function updateStalker() {
            var now = performance.now();

            mouseHistory.push({ x: currentX, y: currentY, time: now });

            var targetTime = now - 1000;
            while (mouseHistory.length > 1 && mouseHistory[1].time <= targetTime) {
                mouseHistory.shift();
            }

            var oldPosition = mouseHistory[0];

            $floater.css({
                left: oldPosition.x + 'px',
                top: oldPosition.y + 'px'
            });

            requestAnimationFrame(updateStalker);
        }

        requestAnimationFrame(updateStalker);
    }

    mw.hook('wikipage.content').add(function($content) {
        if ($content) {
            if (Math.random() < 0.5) {
                initMouseGlider();
            } else {
                initMouseStalker();
            }
        }
    });

})(window, jQuery, mediaWiki);