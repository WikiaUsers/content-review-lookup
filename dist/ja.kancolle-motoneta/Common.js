// "Tooltips" configuration
window.tooltips_config = {
  waitForImages: true,
};

// Disable the parser cache on pages which use the <randomimage> tag
window.wgRandomImageNoCache = true;


//Add class for body
const depth = (document.body.scrollHeight - 740);
if (depth >= 5100) {
  document.getElementsByTagName("body")[0].classList.add("over5100m");
}

//Add random class for body
const randNum = Math.floor(Math.random() * 10);
document.getElementsByTagName("body")[0].classList.add("randomizer-" + randNum);


// Make image link="empty" unnecessary
$('a[href*="images"].image').not('.gallery a[href*="images"].image, .page-特別_ファイル一覧 a[href*="images"].image').removeAttr('href').bind('click', false);


// Enclose each character in <span> tag
$(".spanner").children().addBack().contents().each(function () {
  if (this.nodeType == 3) {
    var $this = $(this);
    $this.replaceWith($this.text().replace(/(\S)/g, "<span>$&</span>"));
  }
});