var toolTipsShows = -1; // This indicates that the number of current tooltips

function debounce(func) {
  var timeout = null;
  const delay = 300;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout)

    timeout = setTimeout(function() {
      func.apply(context, args)
    }, delay)
  }
}

$("sup.reference a").each(function(index) {
  index += 1;

  var refId = $(this).attr('href');
  refId = refId.replace(":", "\\:"); // An ID might contains a colon, add a backslash before the colon

  const ref = $("li" + refId + " .reference-text");
  if (!ref) return;

  const refText = ref.html();

  const refBox = $('<div class="refbox"></div>');
  const refArrow = $('<div class="refbox-arrow"></div>');
  const refHeader = $('<div style="font-weight: bold;">參考來源</div>');
  const refContent = $('<div></div>').append(refText);
  refBox.append(refArrow, refHeader, refContent);

  $(this).on('mouseenter', function() {
    if (toolTipsShows != index) { // When the box is shown but not this one or the box is even not shown
      $('.refbox').detach(); // Remove the box
      refArrow.removeAttr("style"); // Remove style of arrow
      toolTipsShows = index;

      // Set position of the reference box
      const position = $(document).find(this).position(); // The value relative to parent element
      const top = position.top;
      const left = position.left;
      const containerWidth = $('.page-content').width();
      const windowHeight = $(window).height();
      refBox.appendTo('.page-content'); // Shows the new one

      var translateX, translateY; // transform attribute for CSS
      var leftAttr;
      if (left + refBox.innerWidth() < containerWidth) { // Not exceed the width of page
        leftAttr = "calc(" + left + "px - 1rem)";
        refArrow.css("left", 0);
        translateX = "50%";
      } else {
        leftAttr = "calc(" + (left - 320) + "px + 1.5rem)";
        refArrow.css("right", 0);
        translateX = "-50%";
      }

      const top2 = $(this).offset().top; // The top value relative to the document
      const scrollTop = $(window).scrollTop();
      var topAttr;
      if (top2 + refBox.innerHeight() + 50 - scrollTop < windowHeight) { // Not exceed the height of window
        topAttr = "calc(" + top + "px + 1.5rem)";
        refArrow.css({
          top: 0,
          "border-color": "transparent transparent var(--theme-page-background-color--secondary) transparent",
          "border-width": "0 10px 10px 10px"
        });
        translateY = "-100%";
      } else {
        topAttr = "calc(" + (top - refBox.innerHeight()) + "px - 0.7rem)";
        refArrow.css({
          bottom: 0,
          "border-color": "var(--theme-page-background-color--secondary) transparent transparent transparent",
          "border-width": "10px 10px 0 10px"
        });
        translateY = "100%";
      }

      refBox.css({
        top: topAttr,
        left: leftAttr,
        position: 'absolute'
      });
      refArrow.css("transform", "translate(" + translateX + ", " + translateY + ")");
      refBox.fadeIn(50);
    }
  });

  $(this).on('mouseleave', function() {
    toolTipsShows = -1;
    debounce(function() {
      if (toolTipsShows == -1) { // If it's still -1, perform a fade out animation
        $('.refbox').fadeOut(100, function() {
          if (toolTipsShows == -1) { // If it's still -1 after 100ms. remove the box
            $('.refbox').detach();
          }
        });
      }
    })();
  });

  refBox.on('mouseenter', function() {
    toolTipsShows = index;
  });

  refBox.on('mouseleave', function() {
    toolTipsShows = -1;
    debounce(function() {
      if (toolTipsShows == -1) { // If it's still -1, perform a fade out animation
        $('.refbox').fadeOut(100, function() {
          if (toolTipsShows == -1) { // If it's still -1 after 100ms. remove the box
            $('.refbox').detach();
          }
        });
      }
    })();
  });
});