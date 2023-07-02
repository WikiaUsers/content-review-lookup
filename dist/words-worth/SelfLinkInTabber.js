(function () {
  "use strict";
  window.SelfLinkInTabber = window.SelfLinkInTabber || {};
  if (typeof window.SelfLinkInTabber.Loaded !== "undefined") {
    return; // prevent second load.
  }
  window.SelfLinkInTabber.Loaded = true;

  $(document).ready(function () {
    document
      .querySelectorAll(".tabber .wds-tab__content .selflink")
      .forEach(function (selflink) {
        var tab = selflink.closest(".tabber .wds-tab__content");
        console.log(tab);
        if (!tab.parentNode) {
          return;
        }
        var current = Array.from(tab.parentNode.children).indexOf(tab) - 1,
          tabber = tab.closest(".wds-tabber");
        console.log(current);
        if (!tabber) {
          return;
        }
        tabber
          .querySelectorAll(":scope > .wds-tab__content")
          .forEach(function (e, index) {
            e.classList.toggle("wds-is-current", current === index);
          });
        tabber
          .querySelectorAll(":scope > .wds-tabs__wrapper .wds-tabs__tab")
          .forEach(function (e, index) {
            e.classList.toggle("wds-is-current", current === index);
          });
      });
  });
})();