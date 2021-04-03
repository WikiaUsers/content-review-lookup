$(window).keydown(function (e) {
     if ((e.ctrlKey || e.metaKey) && e.keyCode === 16 && e.keyCode === 68) {
          window.location.href = wgPageName + "?action=delete";
     }
});