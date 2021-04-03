// Disable the parser cache on pages which use the <randomimage> tag
window.wgRandomImageNoCache = true;

// "AddRailModule" configuration
window.AddRailModule = [{ maxAge: 0 }];

// "BackToTopButton" configuration
window.BackToTopModern = true;

// "ImprovedTabbers" configuration
window.ImprovedTabbers = {
  HumanReadableAnchor: true,
};

// "Tooltips" configuration
window.tooltips_config = {
  waitForImages: true,
}


// Make image link="empty" unnecessary
$('a[href*="images"].image').not('.gallery a[href*="images"].image, .page-特別_ファイル一覧 a[href*="images"].image').removeAttr('href').bind('click', false);


// Enclose each character in <span> tag
$(".spanner").children().addBack().contents().each(function () {
  if (this.nodeType == 3) {
    var $this = $(this);
    $this.replaceWith($this.text().replace(/(\S)/g, "<span>$&</span>"));
  }
});