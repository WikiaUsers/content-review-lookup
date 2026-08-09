/* 星铎棋游戏逻辑 */

(function() {
    'use strict';

    var container = document.getElementById('game-container');
    if (!container) return;

    // 内联样式备用
    if (!document.getElementById('xingduoqi-style')) {
        var style = document.createElement('style');
        style.id = 'xingduoqi-style';
        style.textContent = `
            .xingduoqi-game #app{width:100%}
            .xingduoqi-game #select-screen,.xingduoqi-game #diff-screen{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 10px}
            .xingduoqi-game .btn-group{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0}
            .xingduoqi-game .btn-group button{padding:6px 16px;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;border:1px solid var(--xq-border);background:var(--xq-btn-bg);color:var(--xq-btn-text);transition:.2s}
            .xingduoqi-game .btn-group button:hover{background:var(--xq-btn-hover)}
            .xingduoqi-game #top-bar{width:100%;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px;padding:6px 10px;background:var(--xq-card);border-bottom:1px solid var(--xq-border)}
            .xingduoqi-game #top-bar button{background:var(--xq-btn-bg);color:var(--xq-btn-text);border:none;border-radius:4px;padding:3px 10px;font-size:11px;font-weight:600;cursor:pointer}
            .xingduoqi-game #top-bar button:hover{background:var(--xq-btn-hover)}
            .xingduoqi-game #score-board{font-weight:700;font-size:13px;padding:2px 10px;border-radius:12px;border:1px solid var(--xq-border);background:var(--xq-bg);color:var(--xq-text)}
            .xingduoqi-game .stat-panel{background:var(--xq-card);border:1px solid var(--xq-border);padding:4px 14px;display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700;border-radius:20px;margin:0 8px;color:var(--xq-text)}
            .xingduoqi-game #turn-label{font-size:17px;font-weight:700;padding:4px 20px;border-radius:20px;background:var(--xq-card);border:1px solid var(--xq-border);color:var(--xq-text)}
            .xingduoqi-game #board-canvas{max-width:100%;height:auto;border-radius:8px;box-shadow:0 0 8px var(--xq-shadow);background:transparent}
            .xingduoqi-game .modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:none;justify-content:center;align-items:center;z-index:1000}
            .xingduoqi-game .modal-content{background:var(--xq-card);color:var(--xq-text);padding:20px;border-radius:12px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;border:1px solid var(--xq-border)}
            .xingduoqi-game .modal-content button{background:var(--xq-btn-bg);color:var(--xq-btn-text);border:none;padding:5px 16px;border-radius:6px;font-weight:600;cursor:pointer}
            .xingduoqi-game .modal-content button:hover{background:var(--xq-btn-hover)}
            .xingduoqi-game #continue-btn{background:#4CAF50;color:#fff;border:none;padding:6px 24px;border-radius:20px;font-weight:700;font-size:15px;cursor:pointer}
        `;
        document.head.appendChild(style);
    }

    var CANVAS_W = 720,
        CANVAS_H = 561,
        TRI_SIZE = 55;
    var canvas, ctx;
    var gameContainer = container;

    var $ = function(id) {
        return document.getElementById(id);
    };

    var gameState = {};
    var pendingPlayer = 0;

    // 获取CSS变量
    function getColor(variable, fallback) {
        var val = getComputedStyle(gameContainer).getPropertyValue(variable).trim();
        return val || fallback || '#888888';
    }

    // ---------- 棋盘生成 ----------
    function genTriangles() {
        var size = TRI_SIZE,
            radius = 3,
            verts = [];
        for (var q = -radius; q <= radius; q++) {
            for (var r = -radius; r <= radius; r++) {
                var s = -q - r;
                if (Math.max(Math.abs(q), Math.abs(r), Math.abs(s)) <= radius) {
                    verts.push([q, r]);
                }
            }
        }
        var vset = new Set(verts.map(function(v) { return v.join(','); }));
        var tris = new Set();
        for (var i = 0; i < verts.length; i++) {
            var v = verts[i];
            if (vset.has((v[0] + 1) + ',' + v[1]) && vset.has(v[0] + ',' + (v[1] + 1))) {
                tris.add([
                    [v[0], v[1]],
                    [v[0] + 1, v[1]],
                    [v[0], v[1] + 1]
                ].sort().join(';'));
            }
            if (vset.has((v[0] - 1) + ',' + v[1]) && vset.has(v[0] + ',' + (v[1] - 1))) {
                tris.add([
                    [v[0], v[1]],
                    [v[0] - 1, v[1]],
                    [v[0], v[1] - 1]
                ].sort().join(';'));
            }
        }
        var dx = size * Math.sqrt(3),
            dy = size * 1.5,
            pixels = [];
        tris.forEach(function(triStr) {
            var verts = triStr.split(';').map(function(p) {
                return p.split(',').map(Number);
            });
            var pts = verts.map(function(v) {
                return [v[0] * dx + v[1] * dx / 2, v[1] * dy];
            });
            var cx = pts.reduce(function(s, p) { return s + p[0]; }, 0) / 3;
            var cy = pts.reduce(function(s, p) { return s + p[1]; }, 0) / 3;
            var ys = pts.map(function(p) { return p[1]; });
            var dir = ys.filter(function(v) { return v === Math.min.apply(Math, ys); }).length === 1 ? 'up' : 'down';
            pixels.push({ cx: cx, cy: cy, dir: dir });
        });
        var avgCx = pixels.reduce(function(s, t) { return s + t.cx; }, 0) / pixels.length;
        var avgCy = pixels.reduce(function(s, t) { return s + t.cy; }, 0) / pixels.length;
        var ci = 0,
            minDist = Infinity;
        pixels.forEach(function(t, i) {
            var d = (t.cx - avgCx) * (t.cx - avgCx) + (t.cy - avgCy) * (t.cy - avgCy);
            if (d < minDist) { minDist = d;
                ci = i; }
        });
        var tmp = pixels[0];
        pixels[0] = pixels[ci];
        pixels[ci] = tmp;
        var others = pixels.slice(1).sort(function(a, b) { return a.cy - b.cy || a.cx - b.cx; });
        pixels = [pixels[0]].concat(others);
        var allX = pixels.map(function(t) { return t.cx; });
        var allY = pixels.map(function(t) { return t.cy; });
        var shiftX = CANVAS_W / 2 - (Math.min.apply(Math, allX) + Math.max.apply(Math, allX)) / 2;
        var shiftY = CANVAS_H / 2 - (Math.min.apply(Math, allY) + Math.max.apply(Math, allY)) / 2;
        pixels = pixels.map(function(t) {
            return { cx: t.cx + shiftX, cy: t.cy + shiftY, direction: t.dir };
        });
        var idToTri = {};
        pixels.forEach(function(t, i) {
            idToTri[String(i)] = t;
        });
        return idToTri;
    }

    function buildStraightLines() {
        var centers = {};
        for (var id in gameState.idToTri) {
            centers[id] = [gameState.idToTri[id].cx, gameState.idToTri[id].cy];
        }
        var ids = Object.keys(centers);
        var ang = [0, 60, 120, 180, 240, 300].map(function(a) { return a * Math.PI / 180; });
        var straight = {};
        ids.forEach(function(id) {
            straight[id] = Array(6).fill().map(function() { return []; });
        });
        var step = TRI_SIZE;
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var cx = centers[id][0],
                cy = centers[id][1];
            for (var d = 0; d < 6; d++) {
                var a = ang[d];
                var curX = cx,
                    curY = cy;
                while (true) {
                    curX += step * Math.cos(a);
                    curY += step * Math.sin(a);
                    var bestId = null,
                        bestDist = step * 0.55;
                    for (var j = 0; j < ids.length; j++) {
                        var oid = ids[j];
                        if (oid === id) continue;
                        var ox = centers[oid][0],
                            oy = centers[oid][1];
                        var dist = Math.hypot(curX - ox, curY - oy);
                        if (dist < bestDist) { bestDist = dist;
                            bestId = oid; }
                    }
                    if (!bestId) break;
                    if (straight[id][d].indexOf(bestId) !== -1) break;
                    straight[id][d].push(bestId);
                    curX = centers[bestId][0];
                    curY = centers[bestId][1];
                }
            }
        }
        return straight;
    }

    function assignDisplayIds() {
        var entries = Object.entries(gameState.idToTri).map(function(e) {
            return [e[0], e[1].cx, e[1].cy];
        });
        entries.sort(function(a, b) { return a[2] - b[2] || a[1] - b[1]; });
        var id2d = {},
            d2id = {};
        entries.forEach(function(e, i) {
            var ds = String(i);
            id2d[e[0]] = ds;
            d2id[ds] = e[0];
        });
        return { id2d: id2d, d2id: d2id };
    }

    function initGameData() {
        gameState.idToTri = genTriangles();
        gameState.straightLines = buildStraightLines();
        var m = assignDisplayIds();
        gameState.idToDisplay = m.id2d;
        gameState.displayToInternal = m.d2id;
        gameState.edgeWeight = {};
        for (var pid in gameState.idToTri) {
            var cnt = 0;
            for (var d = 0; d < 6; d++) {
                if (gameState.straightLines[pid][d].length) cnt++;
            }
            gameState.edgeWeight[pid] = Math.max(0, 6 - cnt);
        }
    }

    function initBoard() {
        gameState.board = {};
        for (var pid in gameState.idToTri) gameState.board[pid] = 0;
        var setup = { '0': 0, '18': 2, '19': 0, '22': 0, '23': 1, '24': 1, '25': 0, '29': 2, '30': 2, '35': 1 };
        for (var disp in setup) {
            var iid = gameState.displayToInternal[disp];
            if (iid) gameState.board[iid] = setup[disp];
        }
        gameState.currentPlayer = 0;
        gameState.gameOver = false;
        gameState.lastBotPid = null;
        gameState.undoHistory = [];
        resetTimers();
    }

    function resetTimers() {
        gameState.blackTime = 0;
        gameState.whiteTime = 0;
        stopTimer();
        updateTimerDisplay();
    }

    function toggleTimer() {
        gameState.timerEnabled = !gameState.timerEnabled;
        $('timer-btn').textContent = '计时:' + (gameState.timerEnabled ? '开' : '关');
        $('black-timer').style.display = gameState.timerEnabled ? 'block' : 'none';
        $('white-timer').style.display = gameState.timerEnabled ? 'block' : 'none';
        if (gameState.timerEnabled) startTimer();
        else stopTimer();
        updateTimerDisplay();
    }

    function startTimer() {
        if (!gameState.timerEnabled || gameState.gameOver || gameState.currentPlayer === 0) return;
        stopTimer();
        gameState.timerStart = Date.now();
        gameState.timerRunning = true;
        gameState.timerInterval = setInterval(tickTimer, 200);
    }

    function stopTimer() {
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
        gameState.timerRunning = false;
    }

    function tickTimer() {
        if (!gameState.timerEnabled || gameState.gameOver || gameState.currentPlayer === 0) {
            stopTimer();
            return;
        }
        var elapsed = (Date.now() - gameState.timerStart) / 1000;
        if (gameState.currentPlayer === 1) gameState.blackTime += elapsed;
        else gameState.whiteTime += elapsed;
        gameState.timerStart = Date.now();
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        var fmt = function(sec) {
            return Math.floor(sec / 60).toString().padStart(2, '0') + ':' + Math.floor(sec % 60).toString().padStart(2, '0');
        };
        $('black-timer').textContent = fmt(gameState.blackTime);
        $('white-timer').textContent = fmt(gameState.whiteTime);
    }

    // ---------- 核心游戏逻辑 ----------
    function getFlips(pid, player) {
        var opp = 3 - player;
        if (gameState.board[pid] !== 0) return [];
        var flips = [];
        for (var d = 0; d < 6; d++) {
            var line = gameState.straightLines[pid][d];
            if (!line.length || gameState.board[line[0]] !== opp) continue;
            var j = 0;
            while (j < line.length && gameState.board[line[j]] === opp) j++;
            if (j < line.length && gameState.board[line[j]] === player) {
                for (var k = 0; k < j; k++) flips.push(line[k]);
            }
        }
        return flips;
    }

    function getValidMoves(player) {
        var moves = {};
        for (var pid in gameState.idToTri) {
            if (gameState.board[pid] === 0) {
                var f = getFlips(pid, player);
                if (f.length) moves[pid] = f;
            }
        }
        return moves;
    }

    function makeMove(pid, player) {
        var f = getFlips(pid, player);
        if (!f.length) return false;
        gameState.board[pid] = player;
        f.forEach(function(fid) { gameState.board[fid] = player; });
        return true;
    }

    function checkWinner() {
        var b = 0,
            w = 0;
        for (var v in gameState.board) {
            if (gameState.board[v] === 1) b++;
            else if (gameState.board[v] === 2) w++;
        }
        return b > w ? 1 : (w > b ? 2 : 0);
    }

    // ---------- 绘图函数 ----------
    function drawHexBg() {
        var pts = [];
        for (var tri in gameState.idToTri) {
            var t = gameState.idToTri[tri];
            var h = TRI_SIZE * Math.sqrt(3) / 2;
            if (t.direction === 'up') {
                pts.push([t.cx, t.cy - 2 * h / 3], [t.cx - TRI_SIZE / 2, t.cy + h / 3], [t.cx + TRI_SIZE / 2, t.cy + h / 3]);
            } else {
                pts.push([t.cx, t.cy + 2 * h / 3], [t.cx - TRI_SIZE / 2, t.cy - h / 3], [t.cx + TRI_SIZE / 2, t.cy - h / 3]);
            }
        }
        var cx = CANVAS_W / 2,
            cy = CANVAS_H / 2,
            maxR = 0;
        for (var i = 0; i < pts.length; i++) {
            for (var j = 0; j < 6; j++) {
                var a = j * Math.PI / 3;
                var proj = (pts[i][0] - cx) * Math.cos(a) + (pts[i][1] - cy) * Math.sin(a);
                if (proj > maxR) maxR = proj;
            }
        }
        var R = (maxR + 2) / Math.cos(Math.PI / 6);
        ctx.beginPath();
        for (var k = 0; k < 6; k++) {
            var angle = k * Math.PI / 3;
            var x = cx + R * Math.cos(angle),
                y = cy + R * Math.sin(angle);
            if (k === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = getColor('--xq-board-fill', '#CFCED3');
        ctx.fill();
        ctx.strokeStyle = getColor('--xq-board-stroke', '#B0AFAF');
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawTriangle(internalId, cx, cy, direction, val, highlight, isLastBot) {
        var size = TRI_SIZE,
            h = size * Math.sqrt(3) / 2,
            pts;
        if (direction === 'up') {
            pts = [
                [cx, cy - 2 * h / 3],
                [cx - size / 2, cy + h / 3],
                [cx + size / 2, cy + h / 3]
            ];
        } else {
            pts = [
                [cx, cy + 2 * h / 3],
                [cx - size / 2, cy - h / 3],
                [cx + size / 2, cy - h / 3]
            ];
        }
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[1][0], pts[1][1]);
        ctx.lineTo(pts[2][0], pts[2][1]);
        ctx.closePath();

        var hw = Math.max(2, size * 0.07),
            bw = Math.max(2, size * 0.05);
        var fill, outline, lw, tcol;

        if (isLastBot) {
            fill = val === 1 ? '#222222' : '#F0F0F0';
            outline = '#CC0000';
            lw = hw;
            tcol = val === 1 ? 'white' : 'black';
        } else if (val === 0) {
            fill = highlight ? getColor('--xq-highlight-fill', 'rgba(39,53,186,0.15)') : getColor('--xq-cell-fill', '#D8D7DB');
            outline = highlight ? getColor('--xq-highlight-stroke', '#2735BA') : getColor('--xq-cell-stroke', '#B0AFAF');
            lw = highlight ? hw : bw;
            tcol = highlight ? getColor('--xq-text-light', '#4a4a6a') : getColor('--xq-text-dark', '#666666');
        } else if (val === 1) {
            fill = '#222222';
            outline = '#666666';
            lw = bw;
            tcol = 'white';
        } else {
            fill = '#F0F0F0';
            outline = '#AAAAAA';
            lw = bw;
            tcol = 'black';
        }

        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = outline;
        ctx.lineWidth = lw;
        ctx.stroke();

        ctx.fillStyle = tcol;
        ctx.font = 'bold ' + Math.max(8, size * 0.15) + 'px Consolas';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(gameState.idToDisplay[internalId], cx, cy);
    }

    function drawBoard() {
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        drawHexBg();
        var valid = new Set();
        if (!gameState.gameOver && gameState.currentPlayer !== 0) {
            var show = !(gameState.botEnabled && gameState.currentPlayer === gameState.botColor);
            if (show) {
                var moves = getValidMoves(gameState.currentPlayer);
                for (var pid in moves) valid.add(pid);
            }
        }
        for (var id in gameState.idToTri) {
            var tri = gameState.idToTri[id];
            var isLastBot = (id === gameState.lastBotPid);
            var hl = valid.has(id) && !isLastBot;
            drawTriangle(id, tri.cx, tri.cy, tri.direction, gameState.board[id], hl, isLastBot);
        }
        var bc = 0,
            wc = 0;
        for (var v in gameState.board) {
            if (gameState.board[v] === 1) bc++;
            else if (gameState.board[v] === 2) wc++;
        }
        $('black-count').textContent = bc;
        $('white-count').textContent = wc;
        $('score-board').textContent = '黑 ' + gameState.history[0] + ' 平 ' + gameState.history[2] + ' 白 ' + gameState.history[1];
        var turnLabel = $('turn-label'),
            cont = $('continue-container');
        if (gameState.gameOver) {
            turnLabel.style.display = 'none';
            cont.style.display = 'flex';
            setPanelColors('#EAE0C8', 'black', '#EAE0C8', 'black');
            stopTimer();
        } else {
            cont.style.display = 'none';
            turnLabel.style.display = 'block';
            if (gameState.currentPlayer === 0) {
                turnLabel.textContent = '';
                turnLabel.style.backgroundColor = '#D2B48C';
                setPanelColors('#EAE0C8', 'black', '#EAE0C8', 'black');
            } else if (gameState.currentPlayer === 1) {
                setPanelColors('#ADD8E6', '#003366', '#EAE0C8', 'black');
            } else {
                setPanelColors('#EAE0C8', 'black', '#ADD8E6', '#003366');
            }
        }
        if (!gameState.animating && !gameState.winAnimating) {
            if (gameState.botEnabled && !gameState.gameOver && gameState.currentPlayer === gameState.botColor) {
                setTimeout(botMove, 400);
            }
        }
    }

    function setPanelColors(bgB, fgB, bgW, fgW) {
        var lp = $('left-panel'),
            rp = $('right-panel');
        lp.style.background = bgB;
        lp.querySelector('.title').style.color = fgB;
        lp.querySelector('.count').style.color = fgB;
        lp.querySelector('.timer').style.background = bgB;
        lp.querySelector('.timer').style.color = fgB;
        rp.style.background = bgW;
        rp.querySelector('.title').style.color = fgW;
        rp.querySelector('.count').style.color = fgW;
        rp.querySelector('.timer').style.background = bgW;
        rp.querySelector('.timer').style.color = fgW;
    }

    function showTurnLabel(player, skip) {
        if (gameState.animating) return;
        gameState.animating = true;
        $('continue-container').style.display = 'none';
        var label = $('turn-label');
        label.style.display = 'block';
        label.textContent = skip ? '无法落子，回合跳过' : (player === 1 ? '黑方回合' : '白方回合');
        label.style.backgroundColor = '#ADD8E6';
        setTimeout(function() {
            label.textContent = '';
            label.style.backgroundColor = '#D2B48C';
            gameState.animating = false;
            drawBoard();
            startTimer();
        }, 700);
    }

    function showWinAnimation() {
        gameState.winAnimating = true;
        var w = checkWinner();
        var text = w === 1 ? '黑获胜！' : (w === 2 ? '白获胜！' : '平局！');
        ctx.save();
        ctx.fillStyle = '#ADD8E6';
        ctx.strokeStyle = '#1E90FF';
        ctx.lineWidth = 2;
        var bw = 260,
            bh = 45;
        var x = (CANVAS_W - bw) / 2,
            y = (CANVAS_H - bh) / 2;
        ctx.fillRect(x, y, bw, bh);
        ctx.strokeRect(x, y, bw, bh);
        ctx.fillStyle = '#003366';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + bw / 2, y + bh / 2);
        ctx.restore();
        setTimeout(function() {
            gameState.winAnimating = false;
            drawBoard();
        }, 1200);
    }

    // ---------- AI ----------
    function botEasy(moves) {
        var best = null,
            bestFlips = -1;
        for (var pid in moves) {
            if (moves[pid].length > bestFlips) {
                bestFlips = moves[pid].length;
                best = pid;
            }
        }
        return best;
    }

    function botStandard(moves) {
        var best = null,
            bestScore = -999;
        for (var pid in moves) {
            var score = (gameState.edgeWeight[pid] || 0) * 3 + moves[pid].length;
            if (Math.random() < 0.1) score += Math.floor(Math.random() * 11) - 5;
            if (score > bestScore) {
                bestScore = score;
                best = pid;
            }
        }
        return best;
    }

    function evaluate(player) {
        var opp = 3 - player;
        var score = 0;
        for (var pid in gameState.idToTri) {
            var val = gameState.board[pid];
            if (val === player) score += 10 + (gameState.edgeWeight[pid] || 0) * 5;
            else if (val === opp) score -= 10 + (gameState.edgeWeight[pid] || 0) * 5;
        }
        return score;
    }

    function botHard(moves) {
        var opp = 3 - gameState.botColor;
        var best = null,
            bestScore = -Infinity;
        for (var pid in moves) {
            var savedBoard = {};
            for (var k in gameState.board) savedBoard[k] = gameState.board[k];
            var savedPlayer = gameState.currentPlayer;
            makeMove(pid, gameState.botColor);
            var myScore = evaluate(gameState.botColor);
            var oppMoves = getValidMoves(opp);
            if (Object.keys(oppMoves).length) {
                var oppBest = -Infinity;
                for (var opid in oppMoves) {
                    var saved2 = {};
                    for (var k2 in gameState.board) saved2[k2] = gameState.board[k2];
                    var saved2Player = gameState.currentPlayer;
                    makeMove(opid, opp);
                    var scoreAfter = evaluate(opp);
                    if (scoreAfter > oppBest) oppBest = scoreAfter;
                    gameState.board = saved2;
                    gameState.currentPlayer = saved2Player;
                }
                var total = myScore - oppBest * 1.2;
                if (total > bestScore) {
                    bestScore = total;
                    best = pid;
                }
            } else {
                var total2 = myScore + 1000;
                if (total2 > bestScore) {
                    bestScore = total2;
                    best = pid;
                }
            }
            gameState.board = savedBoard;
            gameState.currentPlayer = savedPlayer;
        }
        return best;
    }

    function botMove() {
        if (!gameState.botEnabled || gameState.gameOver || gameState.currentPlayer !== gameState.botColor) return;
        var moves = getValidMoves(gameState.botColor);
        if (Object.keys(moves).length === 0) {
            handlePass(gameState.botColor);
            return;
        }
        var savedBoard = {};
        for (var k in gameState.board) savedBoard[k] = gameState.board[k];
        var savedPlayer = gameState.currentPlayer;
        gameState.undoHistory.push({ board: savedBoard, currentPlayer: savedPlayer });
        var bestPid;
        if (gameState.difficulty === '体验') bestPid = botEasy(moves);
        else if (gameState.difficulty === '标准') bestPid = botStandard(moves);
        else bestPid = botHard(moves);
        makeMove(bestPid, gameState.botColor);
        gameState.lastBotPid = bestPid;
        drawBoard();
        setTimeout(function() {
            gameState.lastBotPid = null;
            drawBoard();
        }, 1200);
        afterMove();
    }

    function handlePass(player) {
        var np = 3 - player;
        if (Object.keys(getValidMoves(np)).length === 0) {
            gameState.gameOver = true;
            stopTimer();
            updateHistoryNoDraw();
            showWinAnimation();
            checkExperienceLoss();
        } else {
            gameState.currentPlayer = np;
            showTurnLabel(np, true);
        }
    }

    function afterMove() {
        var np = 3 - gameState.currentPlayer;
        if (Object.keys(getValidMoves(np)).length === 0) {
            handlePass(np);
        } else {
            gameState.currentPlayer = np;
            showTurnLabel(np, false);
        }
        if (gameState.botEnabled && !gameState.gameOver && gameState.currentPlayer === gameState.botColor) {
            setTimeout(botMove, 400);
        }
    }

    function undoMove() {
        if (!gameState.undoHistory.length || gameState.gameOver || gameState.animating) return;
        if (gameState.undoHistory.length >= 2) {
            gameState.undoHistory.pop();
            var state = gameState.undoHistory.pop();
            gameState.board = state.board;
            gameState.currentPlayer = state.currentPlayer;
            gameState.gameOver = false;
        } else if (gameState.undoHistory.length === 1) {
            var state2 = gameState.undoHistory.pop();
            gameState.board = state2.board;
            gameState.currentPlayer = state2.currentPlayer;
            gameState.gameOver = false;
        }
        drawBoard();
        showTurnLabel(gameState.currentPlayer, false);
        startTimer();
    }

    function offerUndoIfNeeded() {
        if (gameState.difficulty === '体验' && gameState.lostInExperience && !gameState.undoAvailable) {
            gameState.undoAvailable = true;
            $('undo-btn').style.display = 'inline-block';
            gameState.undoPopupActive = true;
            $('undo-modal').style.display = 'flex';
        }
    }

    function closeUndoModal() {
        $('undo-modal').style.display = 'none';
        gameState.undoPopupActive = false;
        gameState.lostInExperience = false;
    }

    function updateHistoryNoDraw() {
        var w = checkWinner();
        if (w === 1) gameState.history[0]++;
        else if (w === 2) gameState.history[1]++;
        else gameState.history[2]++;
    }

    function checkExperienceLoss() {
        if (gameState.difficulty === '体验' && gameState.botEnabled && checkWinner() === gameState.botColor) {
            gameState.lostInExperience = true;
        }
    }

    // ---------- UI 控制 ----------
    function showSelect() {
        $('select-screen').style.display = 'flex';
        $('diff-screen').style.display = 'none';
        $('game-screen').style.display = 'none';
    }

    function showDifficulty(player) {
        pendingPlayer = player;
        $('select-screen').style.display = 'none';
        $('diff-screen').style.display = 'flex';
        $('game-screen').style.display = 'none';
    }

    function startGameWithDifficulty(diff) {
        startGame(pendingPlayer, true, diff);
    }

    function startGame(player, botMode, difficulty) {
        if (!botMode && player === 0) player = Math.random() < 0.5 ? 1 : 2;
        gameState.botEnabled = botMode;
        gameState.difficulty = difficulty || '标准';
        if (botMode) {
            if (player === 0) player = Math.random() < 0.5 ? 1 : 2;
            gameState.botColor = player === 1 ? 2 : 1;
            gameState.firstPlayer = 2;
        } else {
            gameState.botColor = 0;
            gameState.firstPlayer = player;
        }
        gameState.undoAvailable = false;
        gameState.lostInExperience = false;
        gameState.undoPopupActive = false;
        $('undo-btn').style.display = 'none';
        $('select-screen').style.display = 'none';
        $('diff-screen').style.display = 'none';
        $('game-screen').style.display = 'flex';
        initBoard();
        gameState.currentPlayer = gameState.firstPlayer;
        drawBoard();
        showTurnLabel(gameState.firstPlayer, false);
        startTimer();
    }

    function returnToMenu() {
        if (confirm('返回主界面将清空积分，确定吗？')) {
            gameState.history = [0, 0, 0];
            stopTimer();
            gameState.undoAvailable = false;
            gameState.lostInExperience = false;
            gameState.undoPopupActive = false;
            $('undo-btn').style.display = 'none';
            showSelect();
        }
    }

    function resetBoard() {
        initBoard();
        gameState.currentPlayer = gameState.firstPlayer;
        drawBoard();
        showTurnLabel(gameState.firstPlayer, false);
        startTimer();
    }

    function continueGame() {
        offerUndoIfNeeded();
        initBoard();
        gameState.currentPlayer = gameState.firstPlayer;
        drawBoard();
        showTurnLabel(gameState.currentPlayer, false);
        startTimer();
    }

    function resetHistory() {
        gameState.history = [0, 0, 0];
        drawBoard();
    }

    function showRules() {
        $('rules-modal').style.display = 'flex';
        var c = $('rules-canvas'),
            ctx2 = c.getContext('2d');
        ctx2.clearRect(0, 0, 280, 220);
        ctx2.beginPath();
        for (var i = 0; i < 6; i++) {
            var a = i * Math.PI / 3,
                vx = 140 + 70 * Math.cos(a),
                vy = 110 + 70 * Math.sin(a);
            if (i === 0) ctx2.moveTo(vx, vy);
            else ctx2.lineTo(vx, vy);
        }
        ctx2.closePath();
        ctx2.fillStyle = '#CDBA96';
        ctx2.fill();
        ctx2.strokeStyle = '#5C4033';
        ctx2.stroke();
        ctx2.fillStyle = 'black';
        ctx2.fillRect(137, 107, 6, 6);
        for (var j = 0; j < 6; j++) {
            var angle = j * Math.PI / 3;
            ctx2.beginPath();
            ctx2.moveTo(140, 110);
            ctx2.lineTo(140 + 49 * Math.cos(angle), 110 + 49 * Math.sin(angle));
            ctx2.strokeStyle = 'black';
            ctx2.stroke();
        }
        ctx2.fillText('6方向夹吃翻转', 100, 95);
    }

    var tutStep = 0;

    function showTutorial() {
        tutStep = 0;
        $('tutorial-modal').style.display = 'flex';
        updateTutorial();
    }

    function updateTutorial() {
        var c = $('tutorial-canvas'),
            ctx2 = c.getContext('2d');
        ctx2.clearRect(0, 0, 620, 280);
        ctx2.fillStyle = '#F5F0E0';
        ctx2.fillRect(0, 0, 620, 280);
        ctx2.fillStyle = '#3E2A1F';
        ctx2.font = 'bold 18px Arial';
        ctx2.textAlign = 'center';
        var steps = [
            { text: '欢迎来到星铎棋！', draw: function() { ctx2.fillText('欢迎！', 310, 130); } },
            { text: '初始棋盘已有预设棋子。', draw: function() { ctx2.fillText('初始棋盘', 310, 130); } },
            { text: '翻转规则：6方向夹吃。', draw: function() { ctx2.fillText('翻转规则', 310, 130); } },
            { text: '蓝色边框提示合法落子。', draw: function() { ctx2.fillText('合法落子', 310, 130); } },
            { text: '无合法位置自动跳过。', draw: function() { ctx2.fillText('跳过回合', 310, 130); } },
            { text: '双方无法落子则游戏结束。', draw: function() { ctx2.fillText('游戏结束', 310, 130); } },
            { text: '准备好了吗？优先占满边线！', draw: function() { ctx2.fillText('准备好了！', 310, 130); } }
        ];
        var s = steps[tutStep];
        s.draw();
        $('tutorial-text').textContent = s.text;
        $('tut-prev').disabled = (tutStep === 0);
        if (tutStep === 6) {
            $('tut-next').textContent = '关闭';
            $('tut-next').onclick = function() {
                $('tutorial-modal').style.display = 'none';
            };
        } else {
            $('tut-next').textContent = '下一步';
            $('tut-next').onclick = tutNext;
        }
    }

    function tutNext() {
        if (tutStep < 6) {
            tutStep++;
            updateTutorial();
        }
    }

    function tutPrev() {
        if (tutStep > 0) {
            tutStep--;
            updateTutorial();
        }
    }

    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) e.target.style.display = 'none';
    };

    // ---------- 主渲染 ----------
    function renderGame() {
        var html = `
            <div id="app">
                <div id="select-screen">
                    <div class="top-btns">
                        <button onclick="showRules()">规则</button>
                        <button onclick="showTutorial()">新手教程</button>
                    </div>
                    <h1>星铎棋</h1>
                    <div class="mode-title">双人对战</div>
                    <div class="btn-group">
                        <button style="background:#333;color:white;" onclick="startGame(1,false)">黑方先手</button>
                        <button style="background:#CDBA96;color:black;" onclick="startGame(0,false)">随机先手</button>
                        <button style="background:#EEE;color:black;" onclick="startGame(2,false)">白方先手</button>
                    </div>
                    <hr>
                    <div class="mode-title">人机对战（统一白方先手）</div>
                    <div class="btn-group">
                        <button style="background:#555;color:white;" onclick="showDifficulty(1)">玩家执黑</button>
                        <button style="background:#CDBA96;color:black;" onclick="showDifficulty(0)">人机随机</button>
                        <button style="background:#EEE;color:black;" onclick="showDifficulty(2)">玩家执白</button>
                    </div>
                </div>
                <div id="diff-screen" style="display:none;">
                    <div class="top-btns"><button onclick="showSelect()">返回</button></div>
                    <h2 style="color:var(--xq-text);">选择难度</h2>
                    <div class="btn-group" style="margin-top:30px;">
                        <button style="background:#90EE90;color:black;" onclick="startGameWithDifficulty('体验')">体验</button>
                        <button style="background:#CDBA96;color:black;" onclick="startGameWithDifficulty('标准')">标准</button>
                        <button style="background:#FF8C00;color:white;" onclick="startGameWithDifficulty('磨难')">磨难</button>
                    </div>
                </div>
                <div id="game-screen" style="display:none;">
                    <div id="top-bar">
                        <div id="left-btns">
                            <button onclick="returnToMenu()">返回</button>
                            <button id="undo-btn" onclick="undoMove()" style="display:none;">悔棋</button>
                            <button id="timer-btn" onclick="toggleTimer()">计时:关</button>
                            <button onclick="showRules()">规则</button>
                        </div>
                        <div id="score-board">黑 0 平 0 白 0</div>
                        <div id="right-btns">
                            <button onclick="resetHistory()">重置积分</button>
                            <button onclick="resetBoard()">重置棋盘</button>
                        </div>
                    </div>
                    <div id="stats-container">
                        <div style="display:flex;gap:20px;">
                            <div class="stat-panel" id="left-panel">
                                <span class="title">黑</span>
                                <span class="count" id="black-count">3</span>
                                <span class="timer" id="black-timer" style="display:none;">00:00</span>
                            </div>
                            <div class="stat-panel" id="right-panel">
                                <span class="title">白</span>
                                <span class="count" id="white-count">3</span>
                                <span class="timer" id="white-timer" style="display:none;">00:00</span>
                            </div>
                        </div>
                    </div>
                    <div id="turn-frame">
                        <div id="turn-label" style="display:block;"></div>
                        <div id="continue-container" style="display:none;">
                            <button id="continue-btn" onclick="continueGame()">下一局</button>
                        </div>
                    </div>
                    <div id="main-area">
                        <div id="canvas-wrapper">
                            <canvas id="board-canvas"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div id="rules-modal" class="modal">
                <div class="modal-content">
                    <h3>游戏规则</h3>
                    <p>棋盘由54个小三角形组成大正六边形，编号0～53。 双人模式：黑方/白方/随机先手。 人机模式：统一白方先手。 落子时翻转夹住的对方棋子。 无合法位置时自动跳过。</p>
                    <canvas id="rules-canvas" width="280" height="220"></canvas>
                    <button onclick="document.getElementById('rules-modal').style.display='none'">关闭</button>
                </div>
            </div>
            <div id="tutorial-modal" class="modal">
                <div class="modal-content">
                    <canvas id="tutorial-canvas" width="620" height="280"></canvas>
                    <p id="tutorial-text"></p>
                    <div style="display:flex;justify-content:center;gap:10px;">
                        <button id="tut-prev" onclick="tutPrev()" disabled>上一步</button>
                        <button id="tut-next" onclick="tutNext()">下一步</button>
                    </div>
                </div>
            </div>
            <div id="undo-modal" class="modal">
                <div class="modal-content" style="text-align:center;">
                    <h3>送你一张“后悔药”</h3>
                    <p>悔棋按钮已出现在上方工具栏</p>
                    <button onclick="closeUndoModal()">知道了</button>
                </div>
            </div>
        `;
        container.innerHTML = html;
        canvas = document.getElementById('board-canvas');
        canvas.width = CANVAS_W;
        canvas.height = CANVAS_H;
        ctx = canvas.getContext('2d');

        // 暴露全局函数给 onclick
        window.showSelect = showSelect;
        window.showDifficulty = showDifficulty;
        window.startGameWithDifficulty = startGameWithDifficulty;
        window.startGame = startGame;
        window.returnToMenu = returnToMenu;
        window.resetBoard = resetBoard;
        window.continueGame = continueGame;
        window.resetHistory = resetHistory;
        window.showRules = showRules;
        window.showTutorial = showTutorial;
        window.tutPrev = tutPrev;
        window.tutNext = tutNext;
        window.undoMove = undoMove;
        window.toggleTimer = toggleTimer;
        window.closeUndoModal = closeUndoModal;

        // Canvas 点击落子
        canvas.addEventListener('click', function(e) {
            if (gameState.gameOver || gameState.currentPlayer === 0 || gameState.animating || gameState.winAnimating) return;
            if (gameState.botEnabled && gameState.currentPlayer === gameState.botColor) return;
            var rect = canvas.getBoundingClientRect();
            var scaleX = CANVAS_W / rect.width;
            var scaleY = CANVAS_H / rect.height;
            var x = (e.clientX - rect.left) * scaleX;
            var y = (e.clientY - rect.top) * scaleY;
            var target = null,
                minDist = Infinity,
                maxDist = TRI_SIZE * 0.4;
            for (var id in gameState.idToTri) {
                if (gameState.board[id] !== 0) continue;
                var tri = gameState.idToTri[id];
                var d = (x - tri.cx) * (x - tri.cx) + (y - tri.cy) * (y - tri.cy);
                if (d < minDist) {
                    minDist = d;
                    target = id;
                }
            }
            if (!target || minDist > maxDist * maxDist) return;
            var valid = getValidMoves(gameState.currentPlayer);
            if (!(target in valid)) return;
            var saved = {};
            for (var k in gameState.board) saved[k] = gameState.board[k];
            gameState.undoHistory.push({ board: saved, currentPlayer: gameState.currentPlayer });
            makeMove(target, gameState.currentPlayer);
            gameState.lastBotPid = null;
            drawBoard();
            afterMove();
        });

        initGameData();
        showSelect();
    }

    renderGame();
})();