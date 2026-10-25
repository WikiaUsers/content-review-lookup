
(function () {
    function initDynamicImages() {
        document.querySelectorAll('.dynamicimage-viewer').forEach(function (viewer) {
            if (viewer.dataset.dynamicReady) return;

            var track = viewer.querySelector('.dynamicimage-track');
            var img = track && track.querySelector('img');

            if (!track || !img) return;

            viewer.dataset.dynamicReady = '1';

            var x = 0;
            var y = 0;
            var maxX = 0;
            var maxY = 0;
            var cellWidth = 0;
            var cellHeight = 0;
            var dragging = false;
            var startX = 0;
            var currentX = 0;

            function updateBounds() {
                cellWidth = viewer.clientWidth;
                cellHeight = viewer.clientHeight;

                maxX = Math.max(0, track.scrollWidth - cellWidth);
                maxY = Math.max(0, img.offsetHeight - cellHeight);

                x = Math.min(x, maxX);
                y = Math.min(y, maxY);

                render();
            }

            function render() {
                track.style.transform =
                    'translate(' + (-x) + 'px, ' + (-y) + 'px)';
            }

            function move(direction) {
                if (cellWidth <= 0 || cellHeight <= 0) return;

                x += direction * cellWidth;

                if (x > maxX) {
                    x = 0;
                    y += cellHeight;

                    if (y > maxY) {
                        y = 0;
                    }
                } else if (x < 0) {
                    x = maxX;
                    y -= cellHeight;

                    if (y < 0) {
                        y = maxY;
                    }
                }

                render();
            }

            function stopDragging() {
                if (!dragging) return;

                var delta = startX - currentX;

                if (Math.abs(delta) > 10) {
                    move(delta > 0 ? 1 : -1);
                }

                dragging = false;
                viewer.classList.remove('dynamicimage-dragging');
            }

            viewer.addEventListener('mousedown', function (e) {
                if (e.button !== 0) return;

                dragging = true;
                startX = e.clientX;
                currentX = e.clientX;

                viewer.classList.add('dynamicimage-dragging');
                e.preventDefault();
            });

            document.addEventListener('mousemove', function (e) {
                if (!dragging) return;

                currentX = e.clientX;
            });

            document.addEventListener('mouseup', stopDragging);

            viewer.addEventListener('mouseleave', stopDragging);

            img.addEventListener('dragstart', function (e) {
                e.preventDefault();
            });

            if (img.complete && img.naturalWidth > 0) {
                updateBounds();
            } else {
                img.addEventListener('load', updateBounds, { once: true });
            }

            window.addEventListener('resize', updateBounds);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDynamicImages);
    } else {
        initDynamicImages();
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(initDynamicImages);
    }
})();