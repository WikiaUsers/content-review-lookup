// custom-coded tab functionality for new infoboxes only
mw.loader.using('mediawiki.util', function () {
  $(function () {
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.classList.contains("ionized") ? "ionized" :
                    btn.classList.contains("spectral") ? "spectral" : "normal";

        // switch visible content
        document.querySelectorAll(".tab-content").forEach(el => {
          el.classList.remove("active");
          if (el.classList.contains(tab)) el.classList.add("active");
        });

        // switch active button
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });
});