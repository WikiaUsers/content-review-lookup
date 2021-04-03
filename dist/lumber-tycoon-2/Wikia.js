//To help avoid confusion over the Fanon: pages, this message will be displayed under the title's of all pages in the fanon namespace
$('.ns-112 .page-header__separator').each(function() {
  $(this).before($('<span>').html("<h3><b><i>This is not real game content, it is fan made!</i></b></h3>"));
});