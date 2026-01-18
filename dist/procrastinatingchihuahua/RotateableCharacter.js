(function () {

    const PIXELS_PER_STEP = 40;
    const MOMENTUM_FRICTION = 0.92;
    const MOMENTUM_THRESHOLD = 0.5;

    function init(container) {

        const img = container.querySelector(".rotCharImage");
        const hitbox = container.querySelector(".rotCharHitbox");
        const freezeBtn = container.querySelector(".rotCharFreeze");
        const snapBtn = container.querySelector(".rotCharSnap");
        const angleText = container.querySelector(".rotCharAngle");

        const base = container.dataset.name;
        const ext = container.dataset.ext;
        const path = container.dataset.path;
        const nowrap = container.dataset.nowrap === "true";
        const defaultAngle = container.dataset.default;

        let angles = container.dataset.angles
            .split(",")
            .map(a => a.trim());

        let index = angles.indexOf(defaultAngle);
        if (index < 0) index = 0;

        let startX = 0;
        let lastX = 0;
        let velocity = 0;
        let dragging = false;
        let frozen = false;
        let momentumActive = false;

        /* 🔍 Auto-detect missing files */
        angles = angles.filter(angle => {
            const test = new Image();
            test.src = `${path}${base}_${angle}.${ext}`;
            return true; // allow all, browser will cache missing
        });
        
        function buildImageURL(base, angle, ext) {
			const safeAngle = String(angle).replace(".", "_");
			return `https://procrastinatingchihuahua.fandom.com/wiki/Special:Redirect/file/${base}_${safeAngle}.${ext}`;
		}


        function update() {
            img.src = buildImageURL(base, angles[index], ext);
            angleText.textContent = `Angle: ${angles[index]}°`;
        }

        update();

        function start(x) {
            if (frozen) return;
            dragging = true;
            momentumActive = false;
            velocity = 0;
            startX = lastX = x;
            hitbox.style.cursor = "grabbing";
        }

        function move(x) {
            if (!dragging || frozen) return;

            const dx = x - lastX;
            velocity = dx;
            lastX = x;

            if (Math.abs(x - startX) >= PIXELS_PER_STEP) {
                if (dx > 0 && (nowrap ? index < angles.length - 1 : true))
                    index++;
                if (dx < 0 && (nowrap ? index > 0 : true))
                    index--;

                if (!nowrap)
                    index = (index + angles.length) % angles.length;

                startX = x;
                update();
            }
        }

        function end() {
            dragging = false;
            hitbox.style.cursor = "grab";

            if (Math.abs(velocity) > MOMENTUM_THRESHOLD) {
                momentumActive = true;
                requestAnimationFrame(momentum);
            }
        }

        function momentum() {
            if (!momentumActive || frozen) return;

            velocity *= MOMENTUM_FRICTION;

            if (Math.abs(velocity) < MOMENTUM_THRESHOLD) {
                momentumActive = false;
                return;
            }

            if (velocity > 0 && (nowrap ? index < angles.length - 1 : true))
                index++;
            if (velocity < 0 && (nowrap ? index > 0 : true))
                index--;

            if (!nowrap)
                index = (index + angles.length) % angles.length;

            update();
            requestAnimationFrame(momentum);
        }

        /* Input */
        hitbox.addEventListener("mousedown", e => start(e.clientX));
        document.addEventListener("mousemove", e => move(e.clientX));
        document.addEventListener("mouseup", end);

        hitbox.addEventListener("touchstart", e => start(e.touches[0].clientX));
        document.addEventListener("touchmove", e => move(e.touches[0].clientX));
        document.addEventListener("touchend", end);

        /* UI */
        freezeBtn.onclick = () => {
            frozen = !frozen;
            freezeBtn.textContent = frozen ? "Unfreeze" : "Freeze";
        };

        snapBtn.onclick = () => {
            index = angles.indexOf(defaultAngle);
            if (index < 0) index = 0;
            update();
        };
    }

    function boot() {
        document.querySelectorAll(".rotChar").forEach(init);
    }

    document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", boot)
        : boot();

})();