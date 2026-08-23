(function () {
    'use strict';

    var $status = document.getElementById('image-preload-status');
    var $zhengwen = document.querySelector('.zhengwen');
    if (!$zhengwen) return;

    var imageUrl = 'https://static.wikitide.net/backroomszhwiki/0/0c/FdPZH825ZW.webp';

    if ($status) $status.textContent = '正在加载内容，请等待加载完成后进行选择...';

    var img = new Image();

    img.onload = function () {
        var applyImage = function () {
            // 把图片设为背景，但不改变透明度，透明度由折叠动画控制
            $zhengwen.style.backgroundImage = 'url("' + imageUrl + '")';
            if ($status) {
                $status.textContent = '加载结束，可开始阅读正文';
                // 可选：3秒后自动隐藏提示
                // setTimeout(function () {
                //     $status.style.display = 'none';
                // }, 3000);
            }
        };

        if (img.decode) {
            img.decode().then(applyImage).catch(applyImage);
        } else {
            applyImage();
        }
    };

    img.onerror = function () {
        if ($status) $status.textContent = '图片加载失败，请刷新重试';
    };

    img.src = imageUrl;
})();

(function () {
    const MAP_W = 720, MAP_H = 720;
    const PLAYER_RADIUS = 8, DOT_RADIUS = 8;
    const WALL_HALF_WIDTH = 4;
    const PLAYER_SPEED = 78;
    const DOT_SPEED = 39;
    const CHASE_SPEED = 195 / 11;
    const DOT_COUNT = 30;
    const DOT_COLLIDE_DIST = DOT_RADIUS * 2; // 红球之间的最小圆心距离

    // 红球视野参数（已调小）
    const AGGRO_RANGE = 80;    // 看到玩家的距离
    const DEAGGRO_RANGE = 150; // 失去玩家的距离（略大于视野，避免反复切换）

    // 从 SVG 路径/线段提取的碰撞墙段
    const wallSegments = [
        [168.33496, 43.66665, 663.33498, 43.66665],
        [663.33498, 43.66665, 663.33498, 672.66668],
        [663.33498, 672.66668, 600.58496, 672.66668],
        [515.83495, 672.66668, 60.33498, 672.66668],
        [60.33498, 672.66668, 60.33498, 313.23677],
        [60.33498, 313.23677, 168.33496, 313.01381],
        [168.33496, 313.01381, 168.33496, 43.66665],
        [60.33506, 483.66652, 299.33501, 484],
        [302.33501, 374.66653, 302, 592.66648],
        [307.33496, 559.6665, 355.33507, 559.6665],
        [399.33495, 559.6665, 447.33506, 559.6665],
        [447.33498, 559.66651, 447.33498, 672.66649],
        [448.33498, 44.66661, 448, 425.66653],
        [448.33498, 200.66658, 520.33497, 200.66658],
        [589.33495, 200.66658, 658.33494, 200.66658],
        [173.33504, 313, 338.335, 313],
        [417.33499, 313, 443.33499, 313]
    ];

    let playerX = 300, playerY = 180;

    const keys = {
        w:false, a:false, s:false, d:false,
        ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false
    };
    const btnTouchCount = { w:0, a:0, s:0, d:0 };

    let gameStarted = false, gameOver = false, gameStartTime = 0;
    let redDots = [], collisionCount = 0, doorTriggered = false;
    let pausedUntil = 0;

    const mapContainer = document.getElementById('map-container');
    const playerDiv = document.getElementById('player');
    const flashOverlay = document.getElementById('flash-overlay');

    const canvas = document.createElement('canvas');
    canvas.width = MAP_W;
    canvas.height = MAP_H;
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none;';
    mapContainer.insertBefore(canvas, playerDiv);
    const ctx = canvas.getContext('2d');

    function isGameVisible() { return mapContainer.offsetParent !== null; }
    function showEndScreen(id) { const el = document.getElementById(id); if (el) el.classList.add('show'); }

    // 判断点是否在门洞外侧（房间外）
    function isOutsideDoor(x, y) {
        return x > 515.83 && x < 600.58 && y > 672.67;
    }

    function drawScene() {
        ctx.clearRect(0, 0, MAP_W, MAP_H);
        ctx.strokeStyle = '#EEEEEE';
        ctx.lineWidth = 8;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        wallSegments.forEach(s => {
            ctx.moveTo(s[0], s[1]);
            ctx.lineTo(s[2], s[3]);
        });
        ctx.stroke();

        ctx.fillStyle = '#EEEEEE';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('卧室', 305, 180);
        ctx.fillText('卫生间', 160, 400);
        ctx.fillText('储物间', 160, 587);
        ctx.fillText('客厅', 555, 450);
        ctx.fillText('厨房', 550, 125);

        ctx.fillStyle = '#955F5F';
        redDots.forEach(d => {
            ctx.beginPath();
            ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function distToSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1, dy = y2 - y1, lenSq = dx * dx + dy * dy;
        if (lenSq === 0) return Math.hypot(px - x1, py - y1);
        const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
        return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
    }

    function isColliding(cx, cy, r = PLAYER_RADIUS) {
        if (cx - r < 0 || cx + r > MAP_W || cy - r < 0 || cy + r > MAP_H) return true;
        return wallSegments.some(s => distToSegment(cx, cy, s[0], s[1], s[2], s[3]) < r + WALL_HALF_WIDTH);
    }

    // 线段相交检测（用于视线判断）
    function segmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const d1 = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
        const d2 = (x2 - x1) * (y4 - y1) - (y2 - y1) * (x4 - x1);
        const d3 = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
        const d4 = (x4 - x3) * (y2 - y3) - (y4 - y3) * (x2 - x3);
        return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
               ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
    }

    // 判断两点之间是否有墙阻挡（视线）
    function hasLineOfSight(x1, y1, x2, y2) {
        for (const s of wallSegments) {
            if (segmentsIntersect(x1, y1, x2, y2, s[0], s[1], s[2], s[3])) {
                return false;
            }
        }
        return true;
    }

    function updatePlayer() {
        playerDiv.style.left = playerX + 'px';
        playerDiv.style.top = playerY + 'px';
    }

    function tryMove(dx, dy) {
        if (dx !== 0) {
            const nx = playerX + dx;
            if (!isColliding(nx, playerY)) playerX = nx;
            else if (!isColliding(playerX + Math.sign(dx) * 0.5, playerY)) playerX += Math.sign(dx) * 0.5;
        }
        if (dy !== 0) {
            const ny = playerY + dy;
            if (!isColliding(playerX, ny)) playerY = ny;
            else if (!isColliding(playerX, playerY + Math.sign(dy) * 0.5)) playerY += Math.sign(dy) * 0.5;
        }
        playerX = Math.max(PLAYER_RADIUS, Math.min(MAP_W - PLAYER_RADIUS, playerX));
        playerY = Math.max(PLAYER_RADIUS, Math.min(MAP_H - PLAYER_RADIUS, playerY));
    }

    function spawnDots(n) {
        const dots = [];
        const spawnRects = [
            { x1: 60, y1: 313, x2: 663, y2: 673 },
            { x1: 448, y1: 201, x2: 658, y2: 313 }
        ];
        for (let i = 0; i < n; i++) {
            let spawned = false;
            for (let attempt = 0; attempt < 500; attempt++) {
                const rect = spawnRects[Math.floor(Math.random() * spawnRects.length)];
                const x = rect.x1 + Math.random() * (rect.x2 - rect.x1);
                const y = rect.y1 + Math.random() * (rect.y2 - rect.y1);
                if (isColliding(x, y, DOT_RADIUS) || isOutsideDoor(x, y)) continue;

                // 检查与已生成红球是否太近
                let tooClose = false;
                for (const e of dots) {
                    if (Math.hypot(x - e.x, y - e.y) < DOT_COLLIDE_DIST) {
                        tooClose = true;
                        break;
                    }
                }
                if (tooClose) continue;

                const ang = Math.random() * Math.PI * 2;
                dots.push({ x, y, angle: ang, nextTurn: 0, chasing: false });
                spawned = true;
                break;
            }
            if (!spawned) {
                const ang = Math.random() * Math.PI * 2;
                dots.push({ x: 300, y: 400, angle: ang, nextTurn: 0, chasing: false });
            }
        }
        return dots;
    }

    function updateDots(dt) {
        const now = performance.now();

        for (const d of redDots) {
            if (d.angle === undefined) {
                d.angle = Math.atan2(d.vy, d.vx);
            }
            if (d.chasing === undefined) {
                d.chasing = false;
            }

            const distToPlayer = Math.hypot(playerX - d.x, playerY - d.y);
            const canSee = hasLineOfSight(d.x, d.y, playerX, playerY);

            // 根据距离和视线切换追逐/徘徊状态
            if (!d.chasing && canSee && distToPlayer < AGGRO_RANGE) {
                d.chasing = true;
            } else if (d.chasing && (!canSee || distToPlayer > DEAGGRO_RANGE)) {
                d.chasing = false;
            }

            const turnRate = d.chasing ? 4.0 : 2.0;
            let targetAngle;

            if (d.chasing) {
                // 追逐时加入噪声，避免所有红球直线锁死玩家
                if (!d.nextNoiseChange || now > d.nextNoiseChange) {
                    d.chaseNoise = (Math.random() - 0.5) * 1.6;
                    d.nextNoiseChange = now + 600 + Math.random() * 1200;
                }
                const base = Math.atan2(playerY - d.y, playerX - d.x);
                targetAngle = base + d.chaseNoise;
            } else {
                // 徘徊：随机方向，定期更新
                if (!d.nextTurn || now > d.nextTurn) {
                    d.targetAngle = Math.random() * Math.PI * 2;
                    d.nextTurn = now + 800 + Math.random() * 1200;
                }
                targetAngle = d.targetAngle;
            }

            // 平滑转向
            let diff = targetAngle - d.angle;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            const maxTurn = turnRate * dt;
            d.angle += Math.max(-maxTurn, Math.min(maxTurn, diff));

            const speed = d.chasing ? DOT_SPEED + CHASE_SPEED : DOT_SPEED;
            const dx = Math.cos(d.angle) * speed * dt;
            const dy = Math.sin(d.angle) * speed * dt;

            const nx = d.x + dx;
            const ny = d.y + dy;

            const cx = isColliding(nx, d.y, DOT_RADIUS) || isOutsideDoor(nx, d.y);
            const cy = isColliding(d.x, ny, DOT_RADIUS) || isOutsideDoor(d.x, ny);

            if (!cx) d.x = nx;
            if (!cy) d.y = ny;

            if (cx && cy) {
                d.angle += (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2);
            }
        }

        // 解决红球之间的重叠
        resolveDotCollisions();
    }

    function tryMoveDot(d, dx, dy) {
        const nx = d.x + dx;
        const ny = d.y + dy;

        if (!isColliding(nx, d.y, DOT_RADIUS) && !isOutsideDoor(nx, d.y)) {
            d.x = nx;
        }

        if (!isColliding(d.x, ny, DOT_RADIUS) && !isOutsideDoor(d.x, ny)) {
            d.y = ny;
        }
    }

    function resolveDotCollisions() {
        const minDist = DOT_COLLIDE_DIST;

        for (let iter = 0; iter < 6; iter++) {
            for (let i = 0; i < redDots.length; i++) {
                for (let j = i + 1; j < redDots.length; j++) {
                    const a = redDots[i];
                    const b = redDots[j];

                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < minDist) {
                        if (dist < 0.0001) {
                            const ang = Math.random() * Math.PI * 2;
                            tryMoveDot(a, Math.cos(ang) * minDist * 0.5, Math.sin(ang) * minDist * 0.5);
                            tryMoveDot(b, -Math.cos(ang) * minDist * 0.5, -Math.sin(ang) * minDist * 0.5);
                        } else {
                            const overlap = (minDist - dist) / 2;
                            const nx = dx / dist;
                            const ny = dy / dist;

                            tryMoveDot(a, -nx * overlap, -ny * overlap);
                            tryMoveDot(b, nx * overlap, ny * overlap);
                        }
                    }
                }
            }
        }
    }

    function getScreechAudio() {
        const container = document.getElementById('screech-audio-container');
        return container ? container.querySelector('audio, video') : null;
    }

    function getEndAudio(id) {
        const container = document.getElementById(id);
        return container ? container.querySelector('audio, video') : null;
    }

    function playEndAudio(id) {
        const audio = getEndAudio(id);
        if (!audio) return;
        try {
            audio.currentTime = 0;
            audio.volume = 1;
            audio.play().catch(() => {});
        } catch (e) {}
    }

function setupEndAudioNearEnd() {
    const audio = getEndAudio('end-audio-container');
    if (!audio || audio.dataset.nearEndBound) return;
    audio.dataset.nearEndBound = '1';

    function switchToNewContent() {
        if (audio.dataset.nearEndTriggered) return;
        audio.dataset.nearEndTriggered = '1';

        document.body.classList.add('diedai2-active');

        const diedai1 = document.getElementById('diedai1');
        if (diedai1) diedai1.style.display = 'none';

        const after = document.getElementById('diedai2');
        if (after) after.style.display = 'block';
    }

    audio.addEventListener('timeupdate', () => {
        if (audio.duration && audio.duration > 0.3 && audio.duration - audio.currentTime <= 0.3) {
            switchToNewContent();
        }
    });

    // 兜底：如果音频正常结束，也强制切换
    audio.addEventListener('ended', switchToNewContent);
}

    function initAudio() {
        const audio = getScreechAudio();
        if (audio) {
            audio.volume = 0.25;
            try { audio.load(); } catch (e) {}
            audio.muted = true;
            const p = audio.play();
            if (p !== undefined) {
                p.then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.muted = false;
                }).catch(() => {});
            }
        }

        ['end-audio-container', 'end-audio-container2'].forEach(id => {
            const endAudio = getEndAudio(id);
            if (!endAudio) return;
            endAudio.volume = 1;
            endAudio.muted = true;
            const p2 = endAudio.play();
            if (p2 !== undefined) {
                p2.then(() => {
                    endAudio.pause();
                    endAudio.currentTime = 0;
                    endAudio.muted = false;
                }).catch(() => {});
            }
        });
        setupEndAudioNearEnd();
    }

    function playScreech() {
        const audio = getScreechAudio();
        if (!audio) return;
        try {
            audio.currentTime = 0;
            audio.volume = 0.25;
            audio.play().catch(() => {});
        } catch (e) {}
    }

    function triggerFlash() {
        flashOverlay.classList.add('active');
        pausedUntil = performance.now() + 3000;
        setTimeout(() => flashOverlay.classList.remove('active'), 3000);
    }

    function stopGame(reason) {
        if (gameOver) return;
        gameOver = true;
        Object.keys(keys).forEach(k => keys[k] = false);
        if (reason === 'reds') {
            showEndScreen('end-jiejvyi');
            playEndAudio('end-audio-container');
        } else if (reason === 'door') {
            showEndScreen('end-kaishichumen');
            playEndAudio('end-audio-container2');
        }
    }

function checkCollision() {
    if (gameOver) return;
    for (let i = redDots.length - 1; i >= 0; i--) {
        if (Math.hypot(playerX - redDots[i].x, playerY - redDots[i].y) < PLAYER_RADIUS + DOT_RADIUS) {
            redDots.splice(i, 1);
            collisionCount++;

            if (collisionCount >= 5) {
                // 第 5 次：只触发结局，不播放尖叫、不闪烁
                stopGame('reds');
            } else {
                // 前 4 次：正常触发尖叫和闪烁
                playScreech();
                triggerFlash();
            }

            break;
        }
    }
}

    function checkDoor() {
        if (gameOver || doorTriggered) return;
        if (playerX > 515.83 && playerX < 600.58 && playerY - PLAYER_RADIUS > 672.67 + WALL_HALF_WIDTH) {
            doorTriggered = true;
            stopGame('door');
        }
    }

    // ===== 监听已有音频（无自动播放） =====
    function getIntroAudio() {
        const el = document.querySelector('.media-id-0');
        if (!el) return null;
        if (el.tagName === 'AUDIO' || el.tagName === 'VIDEO') return el;
        return el.querySelector('audio, video');
    }

    function startGame() {
        if (gameStarted || gameOver) return;
        gameStarted = true;
        gameStartTime = performance.now();
        redDots = spawnDots(DOT_COUNT);
        initAudio();
    }

    function onIntroEnded() {
        document.getElementById('game-bg').classList.remove('hidden');
        document.getElementById('game-outer').classList.remove('hidden');
        document.querySelectorAll('.corner-btn').forEach(btn => btn.classList.remove('hidden'));
        startGame();
    }

    function initIntroAudio() {
        const introAudio = getIntroAudio();
        if (!introAudio) return;
        introAudio.addEventListener('ended', onIntroEnded);
    }

    // ===== 主循环 =====
    let last = performance.now();
    function loop(now) {
        if (!isGameVisible()) {
            drawScene();
            requestAnimationFrame(loop);
            return;
        }

        if (now < pausedUntil) {
            drawScene();
            last = now;
            requestAnimationFrame(loop);
            return;
        }

        flashOverlay.classList.remove('active');

        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;

        if (!gameOver && gameStarted) {
            let mx = 0, my = 0;
            if (keys.w || keys.ArrowUp) my--;
            if (keys.s || keys.ArrowDown) my++;
            if (keys.a || keys.ArrowLeft) mx--;
            if (keys.d || keys.ArrowRight) mx++;
            const mag = Math.hypot(mx, my);
            if (mag > 1) {
                mx /= mag;
                my /= mag;
            }
            if (mx || my) {
                tryMove(mx * PLAYER_SPEED * dt, my * PLAYER_SPEED * dt);
                updatePlayer();
            }
            updateDots(dt);
            checkCollision();
            checkDoor();
        }

        drawScene();
        requestAnimationFrame(loop);
    }

    // ===== 事件监听 =====
    window.addEventListener('keydown', e => {
        if (!isGameVisible() || gameOver) return;
        const k = e.key;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(k)) e.preventDefault();
        if (k === 'w' || k === 'W') keys.w = true;
        if (k === 'a' || k === 'A') keys.a = true;
        if (k === 's' || k === 'S') keys.s = true;
        if (k === 'd' || k === 'D') keys.d = true;
        if (k === 'ArrowUp') keys.ArrowUp = true;
        if (k === 'ArrowDown') keys.ArrowDown = true;
        if (k === 'ArrowLeft') keys.ArrowLeft = true;
        if (k === 'ArrowRight') keys.ArrowRight = true;
    });

    window.addEventListener('keyup', e => {
        const k = e.key;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(k)) e.preventDefault();
        if (k === 'w' || k === 'W') keys.w = false;
        if (k === 'a' || k === 'A') keys.a = false;
        if (k === 's' || k === 'S') keys.s = false;
        if (k === 'd' || k === 'D') keys.d = false;
        if (k === 'ArrowUp') keys.ArrowUp = false;
        if (k === 'ArrowDown') keys.ArrowDown = false;
        if (k === 'ArrowLeft') keys.ArrowLeft = false;
        if (k === 'ArrowRight') keys.ArrowRight = false;
    });

    function bindCornerBtn(id, key) {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('touchstart', e => {
            e.preventDefault();
            if (!isGameVisible() || gameOver) return;
            btnTouchCount[key]++;
            keys[key] = true;
            btn.classList.add('pressed');
        }, { passive: false });
        btn.addEventListener('touchend', e => {
            e.preventDefault();
            btnTouchCount[key] = Math.max(0, btnTouchCount[key] - 1);
            if (!btnTouchCount[key]) {
                keys[key] = false;
                btn.classList.remove('pressed');
            }
        });
        btn.addEventListener('touchcancel', () => {
            btnTouchCount[key] = 0;
            keys[key] = false;
            btn.classList.remove('pressed');
        });
        btn.addEventListener('mousedown', e => {
            e.preventDefault();
            if (!isGameVisible() || gameOver) return;
            keys[key] = true;
            btn.classList.add('pressed');
        });
        btn.addEventListener('mouseup', e => {
            e.preventDefault();
            keys[key] = false;
            btn.classList.remove('pressed');
        });
        btn.addEventListener('mouseleave', () => {
            keys[key] = false;
            btn.classList.remove('pressed');
        });
    }

    bindCornerBtn('btn-w', 'w');
    bindCornerBtn('btn-a', 'a');
    bindCornerBtn('btn-s', 's');
    bindCornerBtn('btn-d', 'd');

    // ===== 初始化 =====
    drawScene();
    updatePlayer();
    initIntroAudio();   // 只添加事件监听，不自动播放
    requestAnimationFrame(loop);
})();