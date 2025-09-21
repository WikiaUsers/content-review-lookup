(function() {
  function fixImages(targetSelectors) {
    targetSelectors.forEach(selector => {
      $(selector).each(function() {
        const $container = $(this);
        const $img = $container.find("img");
        if (!$img.length) return;

        // Remove width/height attributes and set sizing on img
        $img.each(function() {
          $(this).removeAttr("width").removeAttr("height");
          $(this).css({ 
            width: "100%", 
            height: "auto", 
            display: "block",
            border: "6px solid white", // border goes here
            borderRadius: "0"
          });
        });

        // Container styles (no border here)
        $container.css({
          display: "inline-block",
          float: "right",
          marginLeft: "1em",
          position: "relative"
        });
      });
    });
  }

  setTimeout(() => fixImages([".map-template", ".tierlist-image"]), 1000);

  const observer = new MutationObserver(() => fixImages([".map-template", ".tierlist-image"]));
  observer.observe(document.body, { childList: true, subtree: true });
})();