mw.hook("wikipage.content").add(function () {

  document.querySelectorAll(".cond-audio").forEach(wrapper => {

    const targetId = wrapper.dataset.checkDiv;
    if (!targetId) return;

    const targetDiv = document.getElementById(targetId);
    if (!targetDiv) return;

    const waitForAudio = setInterval(() => {
      const audio = wrapper.querySelector("audio");
      if (!audio) return;

      clearInterval(waitForAudio);

      let lastState = null;

      function check() {
        const collapsed = targetDiv.classList.contains("mw-collapsed");

        if (collapsed === lastState) return;
        lastState = collapsed;

        if (!collapsed) {
          audio.pause();
          audio.currentTime = 0;
          audio.play().catch(e => console.warn("Autoplay blocked:", e));
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }

      check();

      new MutationObserver(check)
        .observe(targetDiv, { attributes: true, attributeFilter: ["class"] });

    }, 100);

  });

});