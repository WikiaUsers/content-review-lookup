window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 28;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a.extiw').forEach(function(link) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
});