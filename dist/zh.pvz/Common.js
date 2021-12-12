/* 这里的任何JavaScript将在每次页面载入时为所有用户加载。 */

/* 二代植物圖鑑 */
$(function () {
  function almanac2() {
    var a = document.getElementById("a2p-find-more");
    a.addEventListener("click", almanac2FindMore);
  }
  function almanac2FindMore() {
    var b = document.getElementById("a2p-find-more-tooltip");
    if (b.style.display == "none") {
      b.style.display = "block";
      b.addEventListener("click", almanac2FindMoreTooltipFocus);
      document.addEventListener("click", almanac2FindMoreTooltip, { once: true });
      event.stopPropagation();
    }
  }
  function almanac2FindMoreTooltip() {
    var b = document.getElementById("a2p-find-more-tooltip");
    b.style.display = "none";
    b.removeEventListener("click", almanac2FindMoreTooltipFocus);
  }
  function almanac2FindMoreTooltipFocus(event) {
    event.stopPropagation();
  }
  almanac2();
});