document.addEventListener("DOMContentLoaded", function() {
  var tabs = document.querySelectorAll(".tab:not(.active)");

  tabs.forEach(function(tab) {
    var link = tab.querySelector("a");
    if (link) {
      tab.addEventListener("click", function() {
        window.location.href = link.getAttribute("href");
      });
    }
  });
});