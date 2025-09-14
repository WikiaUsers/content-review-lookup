(function() {
  function fixMapImages() {
    $(".map-template").each(function() {
      let $img = $(this).find("img");
      if (!$img.length) return;
      $img.each(function() {
        let srcAttr = $(this).attr("src") ? "src" : "data-src";
        let containerWidth = Math.min($(this).parent().width(), 2000);
        let url = $(this).attr(srcAttr);
        if (url) {
          $(this).attr(srcAttr, url.replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/" + containerWidth + "?"));
        }
        $(this).removeAttr("width").removeAttr("height");
        $(this).css({ width: "100%", height: "auto", display: "block" });
      });
    });
  }

  setTimeout(fixMapImages, 1000);
  let observer = new MutationObserver(fixMapImages);
  observer.observe(document.body, { childList: true, subtree: true });
})();