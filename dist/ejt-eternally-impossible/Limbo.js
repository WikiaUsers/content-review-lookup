(function () {
  function rectsTouch(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function getSmallerRect(el, shrinkX, shrinkY) {
    const r = el.getBoundingClientRect();
    return {
      left: r.left + shrinkX,
      right: r.right - shrinkX,
      top: r.top + shrinkY,
      bottom: r.bottom - shrinkY
    };
  }

  function initLimbo() {
    const stage = document.querySelector("#limbo-stage");
    if (!stage) return;

    const camera = stage.querySelector("#limbo-camera");
    const player = stage.querySelector("#limbo-player");
    const percentText = stage.querySelector("#limbo-percent");
    const death = stage.querySelector("#limbo-death");
    const coords = stage.querySelector("#limbo-coords");
    const musicBox = stage.querySelector("#limbo-audio");

    if (!camera || !player) return;

    let music = null;
    let active = false;

    let x = 0;
    let y = 0;
    let vy = 0;
    let grounded = true;
    let dead = false;
    let complete = false;
    let started = false;
    let rotation = 0;
    let animationId = null;

    let touchingOrb = null;
    let coyoteFrames = 0;
    let jumpBufferFrames = 0;

    let lastTime = null;
    let accumulator = 0;

    const stepMS = 1000 / 60;

    const maxCoyoteFrames = 2;
    const maxJumpBufferFrames = 5;

    const speed = 5.5;
    const gravity = 0.85;
    const jumpPower = -12;

    const groundY = 340;
    const levelLength = 65000;

    const floorHeight = 60;
    const spikeHeight = 42;
    const blockHeight = 40;
    const padHeight = 12;

    function findMusic() {
      if (music) return music;
      if (musicBox) music = musicBox.querySelector("audio");
      if (!music) music = stage.querySelector("#limbo-audio audio");
      return music;
    }

    function playMusicFromStart() {
      const audio = findMusic();
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.7;
      audio.play().catch(function () {});
    }

    function resumeMusic() {
      const audio = findMusic();
      if (!audio) return;
      audio.volume = 0.7;
      audio.play().catch(function () {});
    }

    function stopMusic() {
      const audio = findMusic();
      if (!audio) return;
      audio.pause();
    }

    function requestJump() {
      if (touchingOrb) {
        vy = jumpPower * 1.15;
        grounded = false;
        coyoteFrames = 0;
        jumpBufferFrames = 0;

        const usedOrb = touchingOrb;
        usedOrb.classList.add("limbo-orb-used");

        setTimeout(function () {
          usedOrb.classList.remove("limbo-orb-used");
        }, 150);

        return;
      }

      jumpBufferFrames = maxJumpBufferFrames;
    }

    function actuallyJump() {
      vy = jumpPower;
      grounded = false;
      coyoteFrames = 0;
      jumpBufferFrames = 0;
    }

    function showStartScreen() {
      if (animationId) cancelAnimationFrame(animationId);

      active = false;
      started = false;
      dead = false;
      complete = false;

      x = 0;
      y = 0;
      vy = 0;
      grounded = true;
      rotation = 0;
      touchingOrb = null;
      lastTime = null;
      accumulator = 0;

      stage.classList.remove("limbo-running");
      stage.classList.add("limbo-dead");

      camera.style.transform = "translateX(0px)";
      player.style.top = groundY + "px";
      player.style.transform = "rotate(0deg)";

      if (percentText) percentText.textContent = "0%";
      if (coords) coords.textContent = "X: 0 | Y: 0";
      if (death) death.innerHTML = "CLICK TO START";
    }

    function restart() {
      if (animationId) cancelAnimationFrame(animationId);

      x = 0;
      y = 0;
      vy = 0;
      grounded = true;
      dead = false;
      complete = false;
      started = true;
      rotation = 0;
      touchingOrb = null;
      coyoteFrames = maxCoyoteFrames;
      jumpBufferFrames = 0;
      lastTime = null;
      accumulator = 0;

      stage.classList.remove("limbo-dead");
      stage.classList.add("limbo-running");

      if (death) death.textContent = "LIMBO";
      if (percentText) percentText.textContent = "0%";
      if (coords) coords.textContent = "X: 0 | Y: 0";

      camera.style.transform = "translateX(0px)";
      player.style.top = groundY + "px";
      player.style.transform = "rotate(0deg)";

      playMusicFromStart();

      animationId = requestAnimationFrame(loop);
    }

    stage.addEventListener("mousedown", function () {
      active = true;

      if (!started || dead || complete) {
        restart();
        return;
      }

      resumeMusic();
      requestJump();
    });

    document.addEventListener("click", function (e) {
      if (!stage.contains(e.target)) active = false;
    });

    document.addEventListener("keydown", function (e) {
      if (!active) return;

      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();

        if (!started || dead || complete) {
          restart();
          return;
        }

        resumeMusic();
        requestJump();
      }
    });

    function getAutoY(kind) {
      const floorTop = stage.clientHeight - floorHeight;

      if (kind === "spike") return floorTop - spikeHeight;
      if (kind === "block") return floorTop - blockHeight;
      if (kind === "pad") return floorTop - padHeight;

      return 200;
    }

    function makePageElementsIntoLevelObjects() {
	  const sources = document.querySelectorAll(".limbo-source");
	
	  sources.forEach(function (source, i) {
	    if (source.dataset.limboMade === "true") return;
	    source.dataset.limboMade = "true";
	
	    const kind = source.dataset.kind || "text";
	    const obj = document.createElement("div");
	    obj.className = "limbo-object";
	
	    const lx = Number(source.dataset.x || 700 + i * 420);
	    obj.style.left = lx + "px";
	
	    if (kind === "card") {
	      obj.classList.add("limbo-info-card");
	      obj.innerHTML = source.innerHTML;
	    } else if (kind === "spike") {
	      obj.classList.add("limbo-spike", "limbo-kill");
	    } else if (kind === "block") {
	      obj.classList.add("limbo-block", "limbo-solid");
	    } else if (kind === "pad") {
	      obj.classList.add("limbo-pad", "limbo-pad-object");
	    } else if (kind === "ceiling-spike") {
	      obj.classList.add("limbo-ceiling-spike", "limbo-kill");
	    } else if (kind === "fake-text") {
	      obj.classList.add("limbo-fake-text", "limbo-kill");
	      obj.innerHTML = source.innerHTML;
	    } else if (kind === "orb") {
	      obj.classList.add("limbo-orb", "limbo-orb-object");
	    } else if (kind === "portal") {
	      obj.classList.add("limbo-portal");
	    } else {
	      obj.classList.add("limbo-page-text");
	      obj.innerHTML = source.innerHTML;
	    }
	
	    camera.appendChild(obj);
	
	    if (source.dataset.y) {
	      obj.style.top = Number(source.dataset.y) + "px";
	    } else if (kind === "spike" || kind === "block" || kind === "pad") {
	      obj.style.top = (stage.clientHeight - floorHeight - obj.offsetHeight) + "px";
	    } else {
	      obj.style.top = "200px";
	    }
	
	    source.classList.add("limbo-hidden-source");
	  });
	}

    function die() {
      dead = true;
      stage.classList.remove("limbo-running");
      stage.classList.add("limbo-dead");
      stopMusic();

      if (death) {
        death.innerHTML = "YOU DIED<br><small>CLICK / SPACE TO RESTART</small>";
      }
    }

    function win() {
      complete = true;
      stage.classList.remove("limbo-running");
      stage.classList.add("limbo-dead");
      stopMusic();

      if (death) {
        death.innerHTML = "LIMBO VERIFIED<br><small>CLICK / SPACE TO REPLAY</small>";
      }
    }

    function handleSolidBlocks() {
      const playerBox = player.getBoundingClientRect();
      const playerHitbox = getSmallerRect(player, 4, 4);
      const stageBox = stage.getBoundingClientRect();

      stage.querySelectorAll(".limbo-solid").forEach(function (block) {
        const blockBox = block.getBoundingClientRect();
        const blockHitbox = getSmallerRect(block, 3, 3);

        const previousBottom = playerBox.bottom - vy;
        const currentBottom = playerBox.bottom;

        const falling = vy >= 0;
        const horizontallyTouching =
          playerBox.right > blockBox.left + 4 &&
          playerBox.left < blockBox.right - 4;

        const landingOnTop =
          falling &&
          horizontallyTouching &&
          previousBottom <= blockBox.top + 6 &&
          currentBottom >= blockBox.top;

        if (landingOnTop) {
          y = blockBox.top - stageBox.top - groundY - player.offsetHeight;
          vy = 0;
          grounded = true;
          rotation = 0;
          coyoteFrames = maxCoyoteFrames;
        } else if (rectsTouch(playerHitbox, blockHitbox)) {
          die();
        }
      });
    }

    function physicsStep() {
      x += speed;

      vy += gravity;
      y += vy;

      if (y >= 0) {
        y = 0;
        vy = 0;
        grounded = true;
        rotation = 0;
      } else {
        grounded = false;
      }

      if (grounded) {
        coyoteFrames = maxCoyoteFrames;
      } else {
        coyoteFrames--;
      }

      if (jumpBufferFrames > 0) {
        jumpBufferFrames--;
      }

      if (jumpBufferFrames > 0 && coyoteFrames > 0) {
        actuallyJump();
      }

      if (!grounded) {
        rotation += speed * 2;
      }
    }

    function renderAndCollide() {
      camera.style.transform = "translateX(" + -x + "px)";
      player.style.top = groundY + y + "px";
      player.style.transform = "rotate(" + rotation + "deg)";

      handleSolidBlocks();

      const percent = Math.min(100, Math.floor((x / levelLength) * 100));
      if (percentText) percentText.textContent = percent + "%";

      if (coords) {
        coords.textContent =
          "X: " + Math.floor(x) +
          " | Y: " + Math.floor(-y);
      }

      const p = getSmallerRect(player, 4, 4);

      touchingOrb = null;
      stage.querySelectorAll(".limbo-orb-object").forEach(function (orb) {
        const orbBox = getSmallerRect(orb, 3, 3);
        if (!dead && rectsTouch(p, orbBox)) {
          touchingOrb = orb;
        }
      });

      stage.querySelectorAll(".limbo-kill").forEach(function (killer) {
        let hitbox;

        if (
          killer.classList.contains("limbo-spike") ||
          killer.classList.contains("limbo-ceiling-spike")
        ) {
          hitbox = getSmallerRect(killer, 14, 12);
        } else {
          hitbox = getSmallerRect(killer, 3, 3);
        }

        if (!dead && rectsTouch(p, hitbox)) {
          die();
        }
      });

      stage.querySelectorAll(".limbo-pad-object").forEach(function (pad) {
        const padBox = getSmallerRect(pad, 2, 2);

        if (!dead && rectsTouch(p, padBox)) {
          vy = jumpPower * 1.35;
          grounded = false;
          coyoteFrames = 0;
          jumpBufferFrames = 0;
        }
      });

      if (x >= levelLength) {
        win();
      }
    }

    function loop(timestamp) {
      if (dead || complete) return;

      if (lastTime === null) lastTime = timestamp;

      let delta = timestamp - lastTime;
      lastTime = timestamp;

      if (!isFinite(delta) || delta < 0) delta = stepMS;
      if (delta > 100) delta = 100;

      accumulator += delta;

      while (accumulator >= stepMS && !dead && !complete) {
        physicsStep();
        accumulator -= stepMS;
      }

      renderAndCollide();

      if (!dead && !complete) {
        animationId = requestAnimationFrame(loop);
      }
    }

    makePageElementsIntoLevelObjects();
    showStartScreen();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLimbo);
  } else {
    initLimbo();
  }
})();