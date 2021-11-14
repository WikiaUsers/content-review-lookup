// Core functionality of the table.persistent class.
// Makes table headers stick to the top of the screen when scrolling.
// Adapted from https://css-tricks.com/persistent-headers/
$(function() {
   var clonedHeaderRow;
   $(".persistent").each(function() {
       clonedHeaderRow = $(".persistent > :first-child > tr:first-of-type");
       clonedHeaderRow
         .before(clonedHeaderRow.clone())
         .css("width", clonedHeaderRow.width())
         .addClass("persistentHeader")
         .children().each(function(index) {
             $(this).css("width", $(".persistent > :first-child > tr:first-of-type > th").eq(index).outerWidth());
         });
   });

   $(window)
    .scroll(function() {
        $(".persistent").each(function() {
            var el             = $(this),
                offset         = el.offset(),
                scrollTop      = $(window).scrollTop(),
                floatingHeader = $(".persistentHeader", this);

            if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
                floatingHeader.css({
                 "visibility": "visible",
                 "top": $("#globalNavigation").offset().top + $("#globalNavigation").outerHeight() - $(window).scrollTop() + "px"
                });
            } else {
                floatingHeader.css({
                 "visibility": "hidden"
                });
            }
        });
    })
    .trigger("scroll");
});