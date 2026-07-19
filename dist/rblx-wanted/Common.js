/* ====== Link Preview Configuration ====== */

window.pPreview = $.extend(true, window.pPreview, {
    RegExp: (window.pPreview || {}).RegExp || {}
});

/* ====== Disable No Image Placeholder ====== */

window.pPreview.showNoImagePlaceholder = false;

/* Show preview sooner */
window.pPreview.delay = 75;

/* Don't use article details API */
window.pPreview.apid = false;

/* Cache more previews */
window.pPreview.csize = 300;

/* ====== Ignore Gallery Images ====== */

window.pPreview.RegExp.iclasses = [
    "lightbox"
];

window.pPreview.RegExp.iparents = [
    "[id^=flytabs]",
    ".gallery-image-wrapper",
    ".gallery-image-wrapper.accent",
    ".gallery-image",
    ".thumb"
];
/* ====== Follow Mouse Cursor ====== */

$(document).on("mousemove", function (e) {

    const $preview = $(".npage-preview");

    if (!$preview.length) return;

    const offsetX = 24;
    const offsetY = 20;

    $preview.css({
        left: (e.pageX + offsetX) + "px",
        top: (e.pageY + offsetY) + "px"
    });

});