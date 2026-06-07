document.addEventListener("click", function (e) {
  const link = e.target.closest("a[href^='#']");
  if (!link) return;

  const hash = link.getAttribute("href").slice(1);
  if (!hash) return;

  const target = document.getElementById(hash);
  if (!target) return;

  const tabContent = target.closest(".wds-tab__content.miniwiki-tab__content");
  if (!tabContent) return;

  const tabber = tabContent.closest(".wds-tabber");
  if (!tabber) return;

  const miniwiki = tabber.closest(".miniwiki");
  if (!miniwiki) return;

  // If already active, just scroll
  if (tabContent.classList.contains("wds-is-current")) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Deactivate contents in this miniwiki
  miniwiki
    .querySelectorAll(".wds-tab__content.miniwiki-tab__content")
    .forEach(c => c.classList.remove("wds-is-current"));

  // Activate the correct content
  tabContent.classList.add("wds-is-current");

  // Sync tab buttons
  const activeHash = tabContent.dataset.hash;
  let activeTab = null;

  miniwiki
    .querySelectorAll(".wds-tabs__tab.miniwiki-tabs__tab")
    .forEach(tab => {
      const isCurrent = activeHash && tab.dataset.hash === activeHash;
      tab.classList.toggle("wds-is-current", isCurrent);
      if (isCurrent) activeTab = tab;
    });

  // Ensure active tab is visible
  if (activeTab) {
    activeTab.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }

  // Ensure tab bar itself is visible
  const tabBar = miniwiki.querySelector(".miniwiki_tabs");
  if (tabBar) {
    tabBar.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Scroll to the anchor target
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

(function () {

  function expandAllAncestors(target) {
    var node = target;

    while (node) {
      // Portable infobox handling
      if (node.classList && node.classList.contains("pi-collapse")) {
        node.classList.add("pi-collapse-open");
        node.classList.remove("pi-collapse-closed");
      }

      // CH handling
      /*
      if (node.classList && node.classList.contains("ch-outer-wrapper")) {
        var header = node.previousElementSibling;
        var toggle = header && header.querySelector(".ch-toggle");

        if (toggle && toggle.classList.contains("ch-toggle--collapsed")) {
          toggle.click();
        }
      }
      */

      node = node.parentElement;
    }
  }

  function activateTabs(target) {
	  const tabber = target.closest(".wds-tabber, .wds-tabs__wrapper");
	  if (!tabber) return false;
	
	  // Find the direct panel ancestor of the target
	  const panel = target.closest(".wds-tab__content");
	  if (!panel || !tabber.contains(panel)) return false;
	
	  // Collect only direct child panels of this tabber
	  const panels = Array.from(tabber.querySelectorAll(":scope > .wds-tab__content"));
	  const index = panels.indexOf(panel);
	  if (index === -1) return false;
	
	  // Collect only direct child tabs of this tabber
	  const tabsList = tabber.querySelector(".wds-tabs");
	  const tabs = tabsList ? Array.from(tabsList.children) : [];
	  const tab = tabs[index];
	
	  // Reset siblings inside this tabber
	  panels.forEach(p => {
	    if (p !== panel) p.classList.remove("wds-is-current");
	  });
	  tabs.forEach(t => {
	    if (t !== tab) {
	      t.classList.remove("wds-is-current");
	      t.setAttribute("aria-selected", "false");
	      t.tabIndex = -1;
	    }
	  });
	
	  // Activate the correct panel + tab
	  panel.classList.add("wds-is-current");
	  if (tab) {
	    tab.classList.add("wds-is-current");
	    tab.setAttribute("aria-selected", "true");
	    tab.tabIndex = 0;
	  }
	
	  return true;
  }

  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;

    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    // Original expand behavior
    expandAllAncestors(target);

    // Only activate tab if target is inside one
    activateTabs(target);

    // Original scroll behavior
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, false);

})();

function center_current_tab_horizontal(wrapper) {
  var tabs = wrapper.querySelector('ul.miniwiki_tabs.horizontal');
  if (!tabs) return;

  var current = tabs.querySelector('.wds-is-current');
  if (!current) return;

  var current_center = current.offsetLeft + (current.offsetWidth / 2);
  var desired = current_center - (tabs.clientWidth / 2);

  if (desired < 0) desired = 0;

  var max = tabs.scrollWidth - tabs.clientWidth;
  if (desired > max) desired = max;

  tabs.scrollLeft = desired;
}

function center_miniwiki_tabs_horizontal() {
  var wrappers = document.querySelectorAll('.miniwiki-tabs__wrapper');
  if (!wrappers || wrappers.length === 0) return;

  wrappers.forEach(function (wrapper) {
    var tabs = wrapper.querySelector('ul.miniwiki_tabs.horizontal');
    if (!tabs) return;

    var wrapper_w = wrapper.clientWidth;
    var tabs_w = tabs.scrollWidth;

    wrapper.style.setProperty('display', 'flex', 'important');
    wrapper.style.setProperty('justify-content', 'center', 'important');
    wrapper.style.setProperty('align-items', 'center', 'important');
    wrapper.style.setProperty('width', '100%', 'important');
    wrapper.style.setProperty('box-sizing', 'border-box', 'important');

    if (tabs_w <= wrapper_w) {
      tabs.style.removeProperty('display');
      tabs.style.removeProperty('margin');
      tabs.style.removeProperty('overflow-x');
      return;
    }

    tabs.style.overflowX = 'auto';
    center_current_tab_horizontal(wrapper);
  });
}

function attach_miniwiki_observers() {
  center_miniwiki_tabs_horizontal();

  window.addEventListener(
    'resize',
    center_miniwiki_tabs_horizontal,
    { passive: true }
  );

  var miniwikis = document.querySelectorAll('.miniwiki');

  if (typeof ResizeObserver !== 'undefined') {
    try {
      var ro = new ResizeObserver(center_miniwiki_tabs_horizontal);

      miniwikis.forEach(function (m) {
        ro.observe(m);
      });

      document
        .querySelectorAll('.miniwiki-tabs__wrapper')
        .forEach(function (w) {
          ro.observe(w);
        });
    } catch (e) {}
  }

  // Recenter when user navigates tabs with keyboard arrows
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      return;
    }

    var wrapper = document.activeElement
      ? document.activeElement.closest('.miniwiki-tabs__wrapper')
      : null;

    if (!wrapper) return;

    // Allow tab state/focus to update first
    requestAnimationFrame(function () {
      center_current_tab_horizontal(wrapper);
    });
  });
}

document.addEventListener('click', function (e) {
  if(!e.target.closest('.page-side-tool.content-size-toggle')){return;}

  // Wait until the size change has been applied
  requestAnimationFrame(function (){center_miniwiki_tabs_horizontal();});
});

document.addEventListener('click', function (e) {
  var tab = e.target.closest('.miniwiki-tabs__wrapper ul.miniwiki_tabs.horizontal li');
  if (!tab) return;
  var wrapper = tab.closest('.miniwiki-tabs__wrapper');
  requestAnimationFrame(function (){center_current_tab_horizontal(wrapper);});
});

if(document.readyState === 'complete' || document.readyState === 'interactive'){attach_miniwiki_observers();}
else{document.addEventListener('DOMContentLoaded', attach_miniwiki_observers);}