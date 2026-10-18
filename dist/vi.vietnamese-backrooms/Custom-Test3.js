mw.loader.using('mediawiki.api').then(function () {
    mw.hook('wikipage.content').add(function ($content) {
        $(".invert-card").each(function () {
            var $card = $(this);

            if ($card.data("physics-init"))
                return;

            $card.data("physics-init", true);

            var $light = $card.find(".rgb-light");

            var $ambient =
                $("<div>")
                    .addClass("ambient-rgb")
                    .appendTo("body");

            let targetX = 0;
            let targetY = 0;

            let x = 0;
            let y = 0;

            let vx = 0;
            let vy = 0;

            let lastX = 0;
            let lastY = 0;

            let hue = 0;

            let active = false;

            $card.on(
                "mouseenter",
                function () {
                    active = true;

                    $light.css("opacity", 1);

                    $ambient.css("opacity", .25);
                });

            $card.on(
                "mousemove",
                function (e) {
                    let rect =
                        this.getBoundingClientRect();

                    targetX =
                        e.clientX - rect.left;

                    targetY =
                        e.clientY - rect.top;
                });

            $card.on(
                "mouseleave",
                function () {
                    active = false;

                    $light.css("opacity", 0);

                    $ambient.css("opacity", 0);
                });

            function animate() {

                /*
                    液态惯性物理
                */

                let dx =
                    targetX - x;

                let dy =
                    targetY - y;

                /*
                    弹簧拉力
                */

                vx += dx * 0.03;
                vy += dy * 0.03;

                /*
                    空气阻尼
                */

                vx *= 0.85;
                vy *= 0.85;

                /*
                    更新位置
                */

                x += vx;
                y += vy;

                /*
                    根据速度计算形变
                */

                let speed =
                    Math.sqrt(
                        vx * vx +
                        vy * vy
                    );

                let angle =
                    Math.atan2(vy, vx);

                let stretch =
                    Math.min(
                        speed / 35,
                        0.35
                    );

                let scaleX =
                    1 + stretch;

                let scaleY =
                    1 - stretch * 0.45;

                $light.css({
                    left: x + "px",
                    top: y + "px",
                    "--scaleX": scaleX,
                    "--scaleY": scaleY
                });

                /*
                    外部环境光稍微滞后
                */

                let cardRect =
                    $card[0]
                        .getBoundingClientRect();

                $ambient.css({
                    left:
                        cardRect.left + x + "px",

                    top:
                        cardRect.top + y + "px"
                });

                /*
                    RGB同步
                */

                hue += 0.8;

                $card.css(
                    "--hue",
                    hue + "deg"
                );

                $light.css(
                    "--hue",
                    hue + "deg"
                );

                $ambient.css(
                    "--hue",
                    hue + "deg"
                );

                requestAnimationFrame(
                    animate
                );
            }

            animate();
        });
    });
});