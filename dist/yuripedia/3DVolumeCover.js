$(function () {
  function ensureSpine($img) {
    var $book = $img.closest(".book");
    if (!$book.length) return;

    var $spine = $book.children(".book-spine");
    if (!$spine.length) {
      $spine = $('<div class="book-spine"></div>').appendTo($book);
    }

    // fill only when alt is available
    var alt = $img.attr("alt") || "";
    var m = alt.match(/\d+/);
    if (m) $spine.text(m[0]);
  }

  function wrapImg(img) {
    var $img = $(img);
    if ($img.closest(".book-container").length) {
      ensureSpine($img);
      return;
    }

    var $container = $('<div class="book-container"></div>');
    var $book = $('<div class="book"></div>');
    var $cover = $('<div class="book-cover"></div>');
    var $spine = $('<div class="book-spine"></div>');

    $img.before($container);
    $container.append($book);
    $book.append($cover);
    $cover.append($img);
    $book.append($spine);

    ensureSpine($img);
  }

  function init(ctx) {
    $(ctx)
      .find(".volume-table td:not(:first-child) > span > .image > img")
      .each(function () { wrapImg(this); });
  }

  init(document);

  new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1) init(n);
      });
      // also catch attribute updates (alt arriving)
      if (m.type === "attributes" && m.target.tagName === "IMG") {
        ensureSpine($(m.target));
      }
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["alt"]
  });
});