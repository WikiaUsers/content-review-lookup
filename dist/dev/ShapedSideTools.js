(function () {
  function tooltip_present(btn) {return !!btn.querySelector(".wds-tooltip");}

  function proper_pack_up(btn) {
    if(btn.__wrapped){return;}
    if(!tooltip_present(btn)){return;}

    const skin = document.createElement("span");
    skin.className = "page-side-skin";

    skin.style.display = "inline-block"; skin.style.position = "relative";

    btn.parentNode.insertBefore(skin, btn); skin.appendChild(btn); btn.__skin = skin; btn.__wrapped = true;
  }

  function get_tooltip(btn) {return btn.querySelector(".wds-tooltip");}

  function detach_tooltip(btn) {
    const tooltip = get_tooltip(btn); const skin = btn.__skin;
    if (!tooltip || !skin || tooltip.__moved){return;}
    skin.appendChild(tooltip);  tooltip.__moved = true;
  }

  function show_tooltip(btn){
      const tooltip = get_tooltip(btn);
      if (!tooltip){return;}
    
      proper_pack_up(btn);
      detach_tooltip(btn);
    
      tooltip.style.display = "block"; tooltip.style.top = "40%";
      tooltip.style.left = "calc(100% + 0.6em)"; tooltip.style.transform = "translateY(-50%)";
    }

  function hide_tooltip(btn) {
    const tooltip = get_tooltip(btn);
    if(!tooltip){return;}
    tooltip.style.display = "none";
  }

  function update_tooltip() {
    document.querySelectorAll(".page-side-tool").forEach(btn => {
      const tooltip = get_tooltip(btn);
      if (!tooltip || tooltip.style.display === "none"){return;}
      position(btn);
    });
  }

  function tooltip_handler() {
    document.querySelectorAll(".page-side-tool").forEach(btn => {
      if (!tooltip_present(btn)) return;
      btn.addEventListener("mouseenter", () => show_tooltip(btn));
      btn.addEventListener("mouseleave", () => hide_tooltip(btn));
    });

    window.addEventListener("scroll", update_tooltip, true);
    window.addEventListener("resize", update_tooltip);
    new ResizeObserver(update_tooltip).observe(document.body);
  }

  const obs = new MutationObserver(() => {
    if(document.querySelector(".page-side-tool")){obs.disconnect(); tooltip_handler();}
  });

  obs.observe(document.body, { childList: true, subtree: true });
})();