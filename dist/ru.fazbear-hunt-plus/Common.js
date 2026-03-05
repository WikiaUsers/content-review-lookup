/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
(function() {
    'use strict';

    function initFake3D() {
        document.querySelectorAll(".fake3d").forEach(element => {
            const frameCount = parseInt(element.dataset.frames);
            const columns = parseInt(element.dataset.columns);
            const frameWidth = parseInt(element.dataset.width);
            const frameHeight = parseInt(element.dataset.height);
            const image = element.dataset.image;

            element.style.width = frameWidth + "px";
			element.style.height = frameHeight + "px";

            element.style.backgroundImage = `url('${image}')`;
            element.style.backgroundSize =
    			(frameWidth * columns) + "px " +
    			(frameHeight * Math.ceil(frameCount / columns)) + "px";

            let currentFrame = 0;
            let isDragging = false;
            let startX = 0;
            
            function updateFrame() {
                const col = currentFrame % columns;
                const row = Math.floor(currentFrame / columns);
                element.style.backgroundPosition = `-${col*frameWidth}px -${row*frameHeight}px`;
            }

            element.addEventListener("mousedown", function(e) {
                isDragging = true;
                startX = e.pageX;
                element.style.cursor = "grabbing";
            });

            document.addEventListener("mouseup", function() {
                isDragging = false;
                element.style.cursor = "grab";
            });

            document.addEventListener("mousemove", function(e) {
                if (!isDragging) return;
                const delta = e.pageX - startX;
                if (Math.abs(delta) > 8) {
                    currentFrame += delta > 0 ? 1 : -1;
                    if (currentFrame >= frameCount) currentFrame = 0;
                    if (currentFrame < 0) currentFrame = frameCount - 1;
                    updateFrame();
                    startX = e.pageX;
                }
            });

            updateFrame();
        });
    }

    // Инициализация после загрузки страницы
    document.addEventListener("DOMContentLoaded", initFake3D);
})();