(function () {
  "use strict";

  function initUTRedGame(root) {
    root = root || document;

    var games = root.querySelectorAll("[data-ut-redgame]");
    if (!games.length) return;

    games.forEach(function (game) {
      if (game.dataset.utReady === "1") return;
      game.dataset.utReady = "1";

      var fightType = parseInt(game.dataset.utFight || "1", 10);

      var box = game.querySelector(".ut-battlebox");
      var player = game.querySelector(".ut-player");
      var hpEl = game.querySelector(".ut-hp");
      var timeEl = game.querySelector(".ut-time");
      var fightLabelEl = game.querySelector(".ut-fight-label");
      var overlay = game.querySelector(".ut-overlay");
      var titleEl = game.querySelector(".ut-title");
      var subtitleEl = game.querySelector(".ut-subtitle");
      var startButtons = game.querySelectorAll(".ut-start");
      var restartBtn = game.querySelector(".ut-restart");

      if (!box || !player) return;

      var BOX_W = 480;
      var BOX_H = 320;
      var PLAYER_SIZE = 18;
      var SPEED = 4;

      var keys = {};
      var bullets = [];
      var running = false;
      var animId = null;
      var spawnTimer = 0;
      var lastTime = 0;
      var elapsed = 0;
      var hp = 5;
      var invuln = 0;

      var px = (BOX_W - PLAYER_SIZE) / 2;
      var py = (BOX_H - PLAYER_SIZE) / 2;

      var fightData = {
        1: {
          duration: 15,
          spawnEvery: 250,
          title: "FIGHT 1",
          subtitle: "Apocalyption"
        },
        2: {
          duration: 25,
          spawnEvery: 200,
          title: "FIGHT 2",
          subtitle: "Eschalyption"
        },
        3: {
          duration: 35,
          spawnEvery: 150,
          title: "FIGHT 3",
          subtitle: "Cataclyption"
        }
      };

      var cfg = fightData[fightType] || fightData[1];

      function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
      }

      function setOverlay(title, subtitle, showStart) {
        titleEl.textContent = title;
        subtitleEl.innerHTML = subtitle;
        overlay.classList.remove("hidden");
        startButtons.forEach(function (btn) {
          btn.style.display = showStart ? "" : "none";
        });
      }

      function hideOverlay() {
        overlay.classList.add("hidden");
      }

      function clearBullets() {
        bullets.forEach(function (b) {
          if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
        });
        bullets = [];
      }

      function resetPlayer() {
        px = (BOX_W - PLAYER_SIZE) / 2;
        py = (BOX_H - PLAYER_SIZE) / 2;
        player.style.left = px + "px";
        player.style.top = py + "px";
      }

      function updateUI() {
        hpEl.textContent = hp;
        timeEl.textContent = elapsed.toFixed(1);
        if (fightLabelEl) fightLabelEl.textContent = String(fightType);
      }

      function makeBullet(x, y, vx, vy, className) {
        var el = document.createElement("div");
        el.className = "ut-bullet " + (className || "");
        el.style.left = x + "px";
        el.style.top = y + "px";
        box.appendChild(el);

        bullets.push({
          el: el,
          x: x,
          y: y,
          vx: vx,
          vy: vy
        });
      }

      function spawnRadialBurst(cx, cy, count, speed) {
        for (var i = 0; i < count; i++) {
          var a = (Math.PI * 2 * i) / count;
          makeBullet(cx, cy, Math.cos(a) * speed, Math.sin(a) * speed, "beam");
        }
      }

      function patternFight1() {
        var side = Math.floor(Math.random() * 4);
        var x, y, vx, vy;

        if (side === 0) {
          x = -14; y = Math.random() * (BOX_H - 12);
          vx = 2.6 + Math.random() * 1.0; vy = (Math.random() - 0.5) * 0.9;
        } else if (side === 1) {
          x = BOX_W + 14; y = Math.random() * (BOX_H - 12);
          vx = -(2.6 + Math.random() * 1.0); vy = (Math.random() - 0.5) * 0.9;
        } else if (side === 2) {
          x = Math.random() * (BOX_W - 12); y = -14;
          vx = (Math.random() - 0.5) * 0.9; vy = 2.6 + Math.random() * 1.0;
        } else {
          x = Math.random() * (BOX_W - 12); y = BOX_H + 14;
          vx = (Math.random() - 0.5) * 0.9; vy = -(2.6 + Math.random() * 1.0);
        }

        makeBullet(x, y, vx, vy, "");
      }

      function patternFight2() {
        var laneY = Math.floor(Math.random() * 5) * 60 + 10;
        for (var i = 0; i < 7; i++) {
          makeBullet(-20 - i * 70, laneY + (Math.random() * 18 - 9), 4.0, 0, "");
        }

        if (Math.random() < 0.5) {
          var laneX = Math.floor(Math.random() * 7) * 65 + 8;
          for (var j = 0; j < 3; j++) {
            makeBullet(laneX + (Math.random() * 16 - 8), -20 - j * 85, 0, 3.3, "");
          }
        }
      }

      function patternFight3() {
        var pattern = Math.floor(Math.random() * 3);

        if (pattern === 0) {
          spawnRadialBurst(BOX_W / 2, BOX_H / 2, 16, 2.7);
        } else if (pattern === 1) {
          var targetX = px + PLAYER_SIZE / 2;
          var targetY = py + PLAYER_SIZE / 2;
          var side = Math.floor(Math.random() * 4);
          var sx, sy;

          if (side === 0) {
            sx = -10; sy = Math.random() * BOX_H;
          } else if (side === 1) {
            sx = BOX_W + 10; sy = Math.random() * BOX_H;
          } else if (side === 2) {
            sx = Math.random() * BOX_W; sy = -10;
          } else {
            sx = Math.random() * BOX_W; sy = BOX_H + 10;
          }

          var dx = targetX - sx;
          var dy = targetY - sy;
          var len = Math.sqrt(dx * dx + dy * dy) || 1;
          var sp = 4.9;

          makeBullet(sx, sy, dx / len * sp, dy / len * sp, "beam");
          makeBullet(sx, sy, dx / len * (sp - 0.8), dy / len * (sp - 0.8), "beam");
        } else {
          for (var i = 0; i < 6; i++) {
            makeBullet(-20 - i * 55, 35 + i * 42, 4.3, Math.sin(i) * 0.9, "beam");
          }
        }
      }

      function spawnPattern() {
        if (fightType === 1) patternFight1();
        else if (fightType === 2) patternFight2();
        else patternFight3();
      }

      function intersectsBullet(b) {
        var pr = {
          left: px + 2,
          top: py + 2,
          right: px + PLAYER_SIZE - 2,
          bottom: py + PLAYER_SIZE - 2
        };

        var br = {
          left: b.x,
          top: b.y,
          right: b.x + 24,
          bottom: b.y + 24
        };

        return !(
          pr.right < br.left ||
          pr.left > br.right ||
          pr.bottom < br.top ||
          pr.top > br.bottom
        );
      }

      function damagePlayer() {
        if (invuln > 0) return;
        hp -= 1;
        invuln = 0.7;
        player.style.opacity = "0.35";
        updateUI();

        if (hp <= 0) loseGame();
      }

      function loseGame() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
        clearBullets();
        setOverlay("YOU DIED", "Press <b>Restart</b> to try again.", false);
      }

      function winGame() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
        clearBullets();
        setOverlay("VICTORY", "You cleared " + cfg.title + ".", false);
        
    	unlockConfiguredSection();
      }

      function startFight() {
        clearBullets();
        hideOverlay();
        running = true;
        elapsed = 0;
        spawnTimer = 0;
        invuln = 0;
        hp = 5;
        player.style.opacity = "1";
        resetPlayer();
        updateUI();
        game.focus();
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }

      function restartFight() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
        clearBullets();
        hp = 5;
        elapsed = 0;
        invuln = 0;
        player.style.opacity = "1";
        resetPlayer();
        updateUI();
        setOverlay(cfg.title, cfg.subtitle, true);
      }

      function updatePlayer(dt) {
        var move = SPEED * dt * 60;

        if (keys.arrowleft || keys.a) px -= move;
        if (keys.arrowright || keys.d) px += move;
        if (keys.arrowup || keys.w) py -= move;
        if (keys.arrowdown || keys.s) py += move;

        px = clamp(px, 0, BOX_W - PLAYER_SIZE);
        py = clamp(py, 0, BOX_H - PLAYER_SIZE);

        player.style.left = px + "px";
        player.style.top = py + "px";
      }

      function updateBullets(dt) {
        for (var i = bullets.length - 1; i >= 0; i--) {
          var b = bullets[i];
          b.x += b.vx * dt * 60;
          b.y += b.vy * dt * 60;
          b.el.style.left = b.x + "px";
          b.el.style.top = b.y + "px";

          if (intersectsBullet(b)) damagePlayer();

          if (
            b.x < -40 || b.x > BOX_W + 40 ||
            b.y < -40 || b.y > BOX_H + 40
          ) {
            if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
            bullets.splice(i, 1);
          }
        }
      }

      function loop(now) {
        if (!running) return;

        var dt = (now - lastTime) / 1000;
        lastTime = now;

        elapsed += dt;
        spawnTimer += dt;

        if (invuln > 0) {
          invuln -= dt;
          if (invuln <= 0) {
            invuln = 0;
            player.style.opacity = "1";
          }
        }

        updatePlayer(dt);

        if (spawnTimer >= cfg.spawnEvery / 1000) {
          spawnTimer = 0;
          spawnPattern();
        }

        updateBullets(dt);
        updateUI();

        if (elapsed >= cfg.duration) {
          winGame();
          return;
        }

        animId = requestAnimationFrame(loop);
      }

      game.addEventListener("click", function () {
        game.focus();
      });

      game.addEventListener("keydown", function (e) {
        var tag = (e.target.tagName || "").toLowerCase();
        var isTypingField =
          tag === "input" ||
          tag === "textarea" ||
          e.target.isContentEditable;

        if (isTypingField || !running) return;

        var k = e.key.toLowerCase();

        if (
          k === "arrowleft" || k === "arrowright" ||
          k === "arrowup" || k === "arrowdown" ||
          k === "a" || k === "d" || k === "w" || k === "s"
        ) {
          keys[k] = true;
          e.preventDefault();
        }
      });

      game.addEventListener("keyup", function (e) {
        var k = e.key.toLowerCase();

        if (
          k === "arrowleft" || k === "arrowright" ||
          k === "arrowup" || k === "arrowdown" ||
          k === "a" || k === "d" || k === "w" || k === "s"
        ) {
          keys[k] = false;
          e.preventDefault();
        }
      });

      game.addEventListener("blur", function () {
        keys = {};
      });

      startButtons.forEach(function (btn) {
        btn.addEventListener("click", startFight);
      });

      restartBtn.addEventListener("click", restartFight);
		
      restoreConfiguredSection();
      restartFight();
    });
  }

function unlockConfiguredSection() {
  var unlockId = game.dataset.unlock;
  if (!unlockId) return;

  var target = document.getElementById(unlockId);
  if (!target) return;

  target.classList.add("ut-unlocked");

  try {
    localStorage.setItem("ut_unlock_" + unlockId, "1");
  } catch (e) {}
}

function restoreConfiguredSection() {
  var unlockId = game.dataset.unlock;
  if (!unlockId) return;

  try {
    if (localStorage.getItem("ut_unlock_" + unlockId) === "1") {
      var target = document.getElementById(unlockId);
      if (target) target.classList.add("ut-unlocked");
    }
  } catch (e) {}
}

  function bootUTRedGame() {
    initUTRedGame(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootUTRedGame);
  } else {
    bootUTRedGame();
  }

  if (window.mw && mw.hook) {
    mw.hook("wikipage.content").add(function ($content) {
      initUTRedGame($content && $content[0] ? $content[0] : document);
    });
  }
})();