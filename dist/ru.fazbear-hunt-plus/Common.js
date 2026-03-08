(function () {
  'use strict';

  var DRAG_THRESHOLD = 8;
  var AUTO_INTERVAL  = 90;
  var COOLDOWN_MS    = 5000;

  function initFake3D() {
    document.querySelectorAll('.fake3d-wrapper').forEach(initWrapper);
  }

  function initWrapper(wrapper) {
    var el = wrapper.querySelector('.fake3d');
    if (!el) return;

	var frameCount = parseInt(el.dataset.frames);
    var cols       = parseInt(el.dataset.columns);
    var fw         = parseInt(el.dataset.width);
    var fh         = parseInt(el.dataset.height);
    var image      = el.dataset.image;
    var rows       = Math.ceil(frameCount / cols);
    var ratio      = fh / fw;

    el.style.backgroundImage  = "url('" + image + "')";
    el.style.backgroundRepeat = 'no-repeat';

    var currentFrame  = 0;
    var isDragging    = false;
    var startX        = 0;
    var autoTimer     = null;
    var cooldownTimer = null;
    var cachedW       = 0;  // кэшируем размеры
    var cachedH       = 0;

	function updateFrame() {
	      var realW = el.offsetWidth;
	      if (!realW) return false;
	
	      // Пересчитываем размеры только если ширина изменилась
	      if (realW !== cachedW) {
	        cachedW = realW;
	        cachedH = Math.floor(realW * ratio);
	        el.style.height = cachedH + 'px';
	        el.style.backgroundSize =
	          Math.floor(cachedW * cols) + 'px ' + Math.floor(cachedH * rows) + 'px';
	      }
	
	      var col = currentFrame % cols;
	      var row = Math.floor(currentFrame / cols);
	
	      el.style.backgroundPosition =
	        '-' + Math.floor(col * cachedW) + 'px -' + Math.floor(row * cachedH) + 'px';
	
	      return true;
	    }

    function clampFrame(f) {
      return ((f % frameCount) + frameCount) % frameCount;
    }

    function startAuto() {
      if (autoTimer) return;
      autoTimer = setInterval(function () {
        currentFrame = clampFrame(currentFrame + 1);
        updateFrame();
      }, AUTO_INTERVAL);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function startCooldown() {
      if (cooldownTimer) clearTimeout(cooldownTimer);
      cooldownTimer = setTimeout(function () {
        cooldownTimer = null;
        startAuto();
      }, COOLDOWN_MS);
    }

	el.addEventListener('mousedown', function (e) {
	  isDragging = true;
	  startX = e.pageX;
	  e.preventDefault();
	  stopAuto();
	  startCooldown();
	});
	
	document.addEventListener('mouseup', function () {
	  isDragging = false;
	});
	
	// Если мышка вышла за пределы окна браузера
	document.addEventListener('mouseleave', function () {
	  isDragging = false;
	});
	
	document.addEventListener('mousemove', function (e) {
	  if (!isDragging) return;
	
	  // Если кнопка уже не зажата (например отпустили вне окна)
	  if (e.buttons === 0) {
	    isDragging = false;
	    return;
	  }
	
	  var delta = e.pageX - startX;
	  if (Math.abs(delta) > DRAG_THRESHOLD) {
	    currentFrame = clampFrame(currentFrame + (delta > 0 ? 1 : -1));
	    updateFrame();
	    startX = e.pageX;
	  }
	});

    window.addEventListener('resize', updateFrame);

    function waitForSize() {
      if (!updateFrame()) {
        requestAnimationFrame(waitForSize);
      } else {
        startAuto();
      }
    }
    requestAnimationFrame(waitForSize);
  }

  mw.hook('wikipage.content').add(function () {
    setTimeout(initFake3D, 500);
  });

})();