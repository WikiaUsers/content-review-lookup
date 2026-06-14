if (mw.config.get('wgPageName') === 'The_Celestial_Enormous') {

    mw.hook('wikipage.content').add(function() {

        var READ_TIME     = 5000;
        var GROW_DURATION = 5000;
        var SPIN_DURATION = 13000;
        var START_SIZE    = 20;
        var MAX_SPIN      = 42;

        var CENTER = { top: '40%', left: '50%', size: 340 };
        var CORNER = { top: '12%', left: '90%', size: 54 };

        var BURST_CAP = 48;

        var starPaths = {
            4: 'M50 0 C52 35, 65 48, 100 50 C65 52, 52 65, 50 100 C48 65, 35 52, 0 50 C35 48, 48 35, 50 0 Z',
            5: 'M50 0 C51 28, 58 38, 80 20 C68 42, 78 50, 100 50 C78 58, 70 68, 80 90 C62 72, 54 72, 50 100 C46 72, 38 72, 20 90 C30 68, 22 58, 0 50 C22 42, 32 38, 20 20 C42 38, 49 28, 50 0 Z',
            7: 'M50 0 C51 22, 56 30, 72 14 C64 34, 70 40, 90 32 C76 48, 78 56, 100 50 C78 56, 76 64, 90 80 C70 72, 62 76, 68 96 C56 78, 52 76, 50 100 C48 76, 44 78, 32 96 C38 76, 30 72, 10 80 C24 64, 22 56, 0 50 C22 44, 24 36, 10 20 C30 28, 36 22, 28 4 C40 26, 49 22, 50 0 Z'
        };

        function generateStarPath(points) {
            var path = '';
            var cx = 50, cy = 50;
            var outerR = 50, innerR = 20;
            var step = Math.PI / points;
            for (var i = 0; i < points * 2; i++) {
                var r = (i % 2 === 0) ? outerR : innerR;
                var angle = i * step - Math.PI / 2;
                var x = cx + r * Math.cos(angle);
                var y = cy + r * Math.sin(angle);
                path += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
            }
            return path + 'Z';
        }

        function solidStar(path, fill) {
            return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">'
                + '<path d="' + path + '" fill="' + fill + '"/></svg>';
        }

        function gradStar(path, id, colors) {
            var stops = '';
            for (var i = 0; i < colors.length; i++) {
                var off = Math.round(i * 100 / (colors.length - 1));
                stops += '<stop offset="' + off + '%" stop-color="' + colors[i] + '"/>';
            }
            return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">'
                + '<defs><radialGradient id="' + id + '" cx="50%" cy="50%" r="50%">' + stops + '</radialGradient></defs>'
                + '<path d="' + path + '" fill="url(#' + id + ')"/></svg>';
        }

        var starStates = [
            { svg: function() { return solidStar(starPaths[4], 'white'); }, glow: 'rgba(200,180,255,0.95)' },
            { svg: function() { return solidStar(starPaths[4], 'white'); }, glow: 'rgba(180,160,255,0.95)' },
            { svg: function() { return gradStar(starPaths[5], 'gmain', ['#ffffff', '#a080ff', '#4020c0']); }, glow: 'rgba(120,80,255,0.95)' },
            { svg: function() { return gradStar(starPaths[7], 'gmain', ['#ffffff', '#ff80ff', '#c020a0']); }, glow: 'rgba(200,40,255,0.95)' }
        ];

        var currentGlow = starStates[0].glow;

        var chosen = document.createElement('div');
        chosen.innerHTML = starStates[0].svg();
        chosen.style.cssText = 'position:fixed;width:' + START_SIZE + 'px;height:' + START_SIZE + 'px;top:' + CENTER.top + ';left:' + CENTER.left + ';margin-top:' + (-START_SIZE / 2) + 'px;margin-left:' + (-START_SIZE / 2) + 'px;z-index:9999999;pointer-events:none;filter:drop-shadow(0 0 6px ' + currentGlow + ');transform-origin:center center;opacity:0;';
        document.body.appendChild(chosen);

        var textbox = document.createElement('div');
        textbox.style.cssText = 'display:none;position:fixed;top:calc(40% + 200px);left:50%;transform:translateX(-50%);background:rgba(3,1,15,0.95);border:1px solid rgba(160,130,255,0.2);border-radius:12px;padding:28px 40px;text-align:center;width:220px;z-index:9999999;font-family:Georgia,serif;opacity:0;transition:opacity 1.4s ease;';
        textbox.innerHTML = '<p style="color:rgba(180,160,255,0.5);font-size:13px;letter-spacing:3px;margin:0 0 18px;font-style:italic;">What do you desire?</p>'
            + '<button onclick="celestialChoice()" style="background:transparent;border:1px solid rgba(180,160,255,0.45);border-radius:10px;color:rgba(180,160,255,0.55);font-family:Georgia,serif;font-size:22px;letter-spacing:6px;cursor:pointer;padding:10px 28px 14px;transition:color 0.4s ease, border-color 0.4s ease;" onmouseover="this.style.color=\'rgba(200,180,255,0.95)\';this.style.borderColor=\'rgba(200,180,255,0.8)\'" onmouseout="this.style.color=\'rgba(180,160,255,0.55)\';this.style.borderColor=\'rgba(180,160,255,0.45)\'">...</button>';
        document.body.appendChild(textbox);

        var spinners = [];

        function masterLoop() {
            for (var i = 0; i < spinners.length; i++) {
                var s = spinners[i];
                s.angle += s.speed;
                s.el.style.transform = 'rotate(' + s.angle + 'deg)';
            }
            requestAnimationFrame(masterLoop);
        }
        requestAnimationFrame(masterLoop);

        function dilateStar(target, durMs, after) {
            var d = (durMs / 1000) + 's ease';
            chosen.style.transition = 'top ' + d + ', left ' + d + ', width ' + d + ', height ' + d + ', margin ' + d + ', filter ' + d;
            chosen.style.top        = target.top;
            chosen.style.left       = target.left;
            chosen.style.width      = target.size + 'px';
            chosen.style.height     = target.size + 'px';
            chosen.style.marginTop  = (-target.size / 2) + 'px';
            chosen.style.marginLeft = (-target.size / 2) + 'px';
            chosen.style.filter     = 'drop-shadow(0 0 ' + Math.round(target.size * 0.35) + 'px ' + currentGlow + ')';
            if (after) setTimeout(after, durMs + 60);
        }

        function setStarState(index) {
            chosen.innerHTML = starStates[index].svg();
            currentGlow = starStates[index].glow;
        }

        function makeBlaze(inner, mid) {
            var b = document.createElement('div');
            b.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999997;pointer-events:none;opacity:0;background:radial-gradient(ellipse 100% 100% at 50% 40%, ' + inner + ' 0%, ' + mid + ' 40%, rgba(3,1,15,0) 100%);';
            document.body.appendChild(b);
            return b;
        }

        function blazeTo(b, opacity, durMs) {
            b.style.transition = 'opacity ' + (durMs / 1000) + 's ease';
            setTimeout(function() { b.style.opacity = String(opacity); }, 30);
        }

        function removeBlaze(b, delayMs) {
            setTimeout(function() { if (b.parentNode) b.parentNode.removeChild(b); }, delayMs);
        }

        var sourcePreview = document.getElementById('ce-source-preview');
        var currentAngle = 0;
        var startTime = null;

        function easeIn(t) { return t * t * t; }
        function lerp(a, b, t) { return a + (b - a) * t; }

        setTimeout(function() {
            if (sourcePreview) {
                sourcePreview.style.transition = 'opacity 1.5s ease';
                sourcePreview.style.opacity = '0';
                setTimeout(function() { sourcePreview.style.display = 'none'; }, 1500);
            }
            chosen.style.transition = 'opacity 1.5s ease';
            chosen.style.opacity = '1';
            setTimeout(function() {
                chosen.style.transition = 'none';
                requestAnimationFrame(runSequence);
            }, 1500);
        }, READ_TIME);

        function runSequence(ts) {
            if (!startTime) startTime = ts;
            var elapsed = ts - startTime;

            var growT = Math.min(elapsed / GROW_DURATION, 1);
            var spinT = Math.min(elapsed / SPIN_DURATION, 1);

            var size = lerp(START_SIZE, CENTER.size, easeIn(growT));
            currentAngle += lerp(0.05, MAX_SPIN, easeIn(spinT));

            chosen.style.width      = size + 'px';
            chosen.style.height     = size + 'px';
            chosen.style.marginTop  = (-size / 2) + 'px';
            chosen.style.marginLeft = (-size / 2) + 'px';
            chosen.style.transform  = 'rotate(' + currentAngle + 'deg)';

            var glowSize = lerp(6, 120, easeIn(growT));
            chosen.style.filter = 'drop-shadow(0 0 ' + glowSize + 'px ' + currentGlow + ')';

            if (spinT < 1) {
                requestAnimationFrame(runSequence);
            } else {
                spinners.push({ el: chosen, speed: MAX_SPIN, angle: currentAngle });
                showQuestion();
            }
        }

        function showQuestion() {
            textbox.style.display = 'block';
            setTimeout(function() { textbox.style.opacity = '1'; }, 30);
        }

        var choiceUsed = false;

        window.celestialChoice = function() {
            if (choiceUsed) return;
            choiceUsed = true;

            textbox.style.opacity = '0';
            setTimeout(function() { if (textbox.parentNode) textbox.parentNode.removeChild(textbox); }, 1400);

            var blaze = makeBlaze('rgba(180,140,255,1)', 'rgba(80,40,180,0.9)');
            blazeTo(blaze, 1, 2200);
            dilateStar({ top: CENTER.top, left: CENTER.left, size: 800 }, 2200);

            setTimeout(function() {
                setStarState(1);
                chosen.style.filter = 'drop-shadow(0 0 280px ' + currentGlow + ')';

                var guise = document.getElementById('ce-guise');
                var guiseOverlay = document.getElementById('ce-guise-overlay');
                if (guise) {
                    guise.style.display = 'block';
                    setTimeout(function() {
                        guise.style.opacity = '1';
                        if (guiseOverlay) guiseOverlay.style.opacity = '1';
                    }, 30);
                }
                window.scrollTo(0, 0);

                blazeTo(blaze, 0.45, 1400);

                setTimeout(function() {
                    dilateStar(CORNER, 2500);
                    blazeTo(blaze, 0, 2500);
                    removeBlaze(blaze, 2700);
                }, 3000);

            }, 2800);
        };

        var burstStars = [];
        var burstIndex = 0;

        function spawnBurstChild(fromTopVh, fromLeftVw, fromSize) {
            if (burstStars.length >= BURST_CAP) return;

            var hue   = (burstIndex * 137.508) % 360;
            burstIndex++;
            var fill  = 'hsl(' + hue.toFixed(1) + ', 85%, 70%)';
            var glow  = 'hsla(' + hue.toFixed(1) + ', 90%, 65%, 0.9)';
            var pts   = 4 + Math.floor(Math.random() * 4);
            var size  = 40 + Math.random() * 200;
            var toTop  = Math.random() * 100;
            var toLeft = Math.random() * 100;

            var clone = document.createElement('div');
            clone.innerHTML = solidStar(generateStarPath(pts), fill);
            clone.style.cssText = 'position:fixed;width:' + (fromSize * 0.7) + 'px;height:' + (fromSize * 0.7) + 'px;top:' + fromTopVh + 'vh;left:' + fromLeftVw + 'vw;margin-top:' + (-fromSize * 0.35) + 'px;margin-left:' + (-fromSize * 0.35) + 'px;z-index:9999998;pointer-events:none;opacity:0;filter:drop-shadow(0 0 ' + Math.round(size * 0.3) + 'px ' + glow + ');transform-origin:center center;';
            document.body.appendChild(clone);

            burstStars.push({ el: clone, topVh: toTop, leftVw: toLeft, size: size });
            spinners.push({ el: clone, speed: 4 + Math.random() * 16, angle: Math.random() * 360 });

            setTimeout(function() {
                var d = '1.1s ease';
                clone.style.transition = 'top ' + d + ', left ' + d + ', width ' + d + ', height ' + d + ', margin ' + d + ', opacity 0.5s ease';
                clone.style.opacity    = '1';
                clone.style.top        = toTop + 'vh';
                clone.style.left       = toLeft + 'vw';
                clone.style.width      = size + 'px';
                clone.style.height     = size + 'px';
                clone.style.marginTop  = (-size / 2) + 'px';
                clone.style.marginLeft = (-size / 2) + 'px';
            }, 40);
        }

        function mitosisBurst(onFull) {
            function generation() {
                if (burstStars.length === 0) {
                    spawnBurstChild(40, 50, CENTER.size);
                } else {
                    var snapshot = burstStars.slice();
                    for (var i = 0; i < snapshot.length; i++) {
                        spawnBurstChild(snapshot[i].topVh, snapshot[i].leftVw, snapshot[i].size);
                    }
                }
                if (burstStars.length >= BURST_CAP) {
                    setTimeout(onFull, 900);
                } else {
                    setTimeout(generation, 850);
                }
            }
            generation();
        }

        function clearBurstStars() {
            for (var i = 0; i < burstStars.length; i++) {
                (function(rec) {
                    rec.el.style.transition = 'opacity 1.6s ease';
                    rec.el.style.opacity = '0';
                    setTimeout(function() {
                        if (rec.el.parentNode) rec.el.parentNode.removeChild(rec.el);
                        for (var j = 0; j < spinners.length; j++) {
                            if (spinners[j].el === rec.el) { spinners.splice(j, 1); break; }
                        }
                    }, 1700);
                })(burstStars[i]);
            }
            burstStars = [];
        }

        var chaosPalette = ['#ff00ff', '#4400ff', '#00ffff', '#ff00aa', '#ffffff', '#aa00ff', '#ff4488', '#0088ff', '#8800ff', '#ff66cc'];

        function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

        function startChaos(el, uid, minPts, maxPts) {
            function cycle() {
                var pts = minPts + Math.floor(Math.random() * (maxPts - minPts + 1));
                el.innerHTML = gradStar(generateStarPath(pts), uid, [pick(chaosPalette), pick(chaosPalette), pick(chaosPalette)]);
                setTimeout(cycle, 450 + Math.random() * 450);
            }
            cycle();
        }

        function buildRing() {
            var W = document.documentElement.clientWidth;
            var H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            var inset = 34;
            var RING_SIZE = 44;
            var MAX_RING = 56;

            var slots = [];
            var perim = 2 * (W - inset * 2) + 2 * (H - inset * 2);
            var spacing = Math.max(120, perim / MAX_RING);

            var x, y;
            for (x = inset; x <= W - inset; x += spacing) slots.push({ x: x, y: inset });
            for (y = inset + spacing; y <= H - inset; y += spacing) slots.push({ x: W - inset, y: y });
            for (x = W - inset - spacing; x >= inset; x -= spacing) slots.push({ x: x, y: H - inset });
            for (y = H - inset - spacing; y > inset; y -= spacing) slots.push({ x: inset, y: y });

            var rect = chosen.getBoundingClientRect();
            var originX = rect.left + rect.width / 2 + window.pageXOffset;
            var originY = rect.top + rect.height / 2 + window.pageYOffset;

            slots.sort(function(a, b) {
                var da = Math.pow(a.x - originX, 2) + Math.pow(a.y - originY, 2);
                var db = Math.pow(b.x - originX, 2) + Math.pow(b.y - originY, 2);
                return da - db;
            });

            var i = 0;
            function spawnNext() {
                if (i >= slots.length) return;
                var slot = slots[i];
                var uid = 'ring' + i;
                i++;

                var star = document.createElement('div');
                star.style.cssText = 'position:absolute;width:' + RING_SIZE + 'px;height:' + RING_SIZE + 'px;top:' + (originY - RING_SIZE / 2) + 'px;left:' + (originX - RING_SIZE / 2) + 'px;z-index:99999;pointer-events:none;opacity:0;filter:drop-shadow(0 0 18px rgba(200,100,255,0.9));transform-origin:center center;';
                document.body.appendChild(star);

                startChaos(star, uid, 4, 12);
                spinners.push({ el: star, speed: 2 + Math.random() * 7, angle: Math.random() * 360 });

                setTimeout(function() {
                    var d = '1.1s ease';
                    star.style.transition = 'top ' + d + ', left ' + d + ', opacity 0.6s ease';
                    star.style.opacity = '1';
                    star.style.top  = (slot.y - RING_SIZE / 2) + 'px';
                    star.style.left = (slot.x - RING_SIZE / 2) + 'px';
                }, 40);

                setTimeout(spawnNext, 280);
            }
            spawnNext();
        }

        var t1Used = false;
        var t2Used = false;

        window.celestialTransition = function(stage) {

            if (stage === 1 && !t1Used) {
                t1Used = true;

                var blaze = makeBlaze('rgba(180,140,255,0.95)', 'rgba(80,40,180,0.85)');
                blazeTo(blaze, 0.55, 2000);

                dilateStar(CENTER, 2000, function() {
                    setTimeout(function() {
                        mitosisBurst(function() {
                            blazeTo(blaze, 1, 700);

                            setTimeout(function() {
                                setStarState(2);
                                chosen.style.filter = 'drop-shadow(0 0 ' + Math.round(CENTER.size * 0.35) + 'px ' + currentGlow + ')';

                                var guise = document.getElementById('ce-guise');
                                var guiseOverlay = document.getElementById('ce-guise-overlay');
                                if (guise) {
                                    guise.style.opacity = '0';
                                    if (guiseOverlay) guiseOverlay.style.opacity = '0';
                                    setTimeout(function() { guise.style.display = 'none'; }, 1800);
                                }

                                var starSection = document.getElementById('ce-star');
                                var starOverlay = document.getElementById('ce-star-overlay');
                                if (starSection) {
                                    starSection.style.display = 'block';
                                    setTimeout(function() {
                                        starSection.style.opacity = '1';
                                        if (starOverlay) starOverlay.style.opacity = '1';
                                    }, 30);
                                }
                                window.scrollTo(0, 0);

                                blazeTo(blaze, 0.45, 1400);

                                setTimeout(function() {
                                    clearBurstStars();
                                    setTimeout(function() {
                                        dilateStar(CORNER, 2500);
                                        blazeTo(blaze, 0, 2500);
                                        removeBlaze(blaze, 2700);
                                    }, 1000);
                                }, 2600);

                            }, 750);
                        });
                    }, 600);
                });

            } else if (stage === 2 && !t2Used) {
                t2Used = true;

                var blaze2 = makeBlaze('rgba(255,120,255,1)', 'rgba(120,20,200,0.92)');
                blazeTo(blaze2, 0.5, 2000);

                dilateStar(CENTER, 2000, function() {

                    blazeTo(blaze2, 1, 2200);
                    dilateStar({ top: CENTER.top, left: CENTER.left, size: 800 }, 2200);

                    setTimeout(function() {
                        setStarState(3);
                        chosen.style.filter = 'drop-shadow(0 0 280px ' + currentGlow + ')';

                        var starSection = document.getElementById('ce-star');
                        var starOverlay = document.getElementById('ce-star-overlay');
                        if (starSection) {
                            starSection.style.opacity = '0';
                            if (starOverlay) starOverlay.style.opacity = '0';
                            setTimeout(function() { starSection.style.display = 'none'; }, 1800);
                        }

                        var sourceFull = document.getElementById('ce-source-full');
                        var sourceOverlay = document.getElementById('ce-source-overlay');
                        if (sourceFull) {
                            sourceFull.style.display = 'block';
                            setTimeout(function() {
                                sourceFull.style.opacity = '1';
                                if (sourceOverlay) sourceOverlay.style.opacity = '1';
                            }, 30);
                        }
                        window.scrollTo(0, 0);

                        blazeTo(blaze2, 0.45, 1400);

                        setTimeout(function() {
                            dilateStar(CORNER, 2500, function() {
                                startChaos(chosen, 'gmain', 7, 20);
                                buildRing();
                            });
                            blazeTo(blaze2, 0, 2500);
                            removeBlaze(blaze2, 2700);
                        }, 2500);

                    }, 2800);
                });
            }
        };

        function wireEndButton(id, stage, dimColor, brightColor) {
            var el = document.getElementById(id);
            if (!el) return;
            var label = el.querySelector('p:last-child');
            el.addEventListener('click', function() { window.celestialTransition(stage); });
            el.addEventListener('mouseover', function() { if (label) label.style.color = brightColor; });
            el.addEventListener('mouseout',  function() { if (label) label.style.color = dimColor; });
        }

        wireEndButton('ce-end-1', 1, 'rgba(200,160,100,0.55)', 'rgba(200,160,100,0.9)');
        wireEndButton('ce-end-2', 2, 'rgba(140,100,255,0.55)', 'rgba(140,100,255,0.9)');

    });

}