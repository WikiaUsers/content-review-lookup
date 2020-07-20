$(window).keydown(function (e) {
     if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
          document.getElementById('wpSave').click();
     }
});