L SCSS JSResult
(function() {

  var blackboardHeight = $(".blackboard").height(),
    blackboardWidth = $(".blackboard").width(),
    blackboardArea = blackboardHeight * blackboardWidth,
    viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    expandedWidth = viewportWidth * 1.1,
    viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    expandedHeight = viewportHeight * 1.1,
    viewportArea = viewportWidth * viewportHeight,
    expandedArea = expandedWidth * expandedHeight,
    initialRight = 0,
    initialBottom = 0;

  function circleMaker(size, margin, color, opacity, blur, spread, positionLeeway, opacityLeeway, name) {

    var lsCellSide = size + (margin * 2),
      lsRows = Math.floor(expandedHeight / lsCellSide),
      lsColumns = Math.floor(expandedWidth / lsCellSide),
      lsQuantity = lsRows * lsColumns;
    console.log(name + " rows=" + lsRows);
    console.log(name + " columns=" + lsColumns);
    console.log(name + " quantity=" + lsQuantity);

    var paneHTML = '<div id="' + name + '-1" class=" ' + name + '-pane pane" style="top: 0; left: 0;' +
      ' width:' + (lsColumns * lsCellSide) + 'px; height:' + (lsRows * lsCellSide) + 'px;"></div>';
    $('.window').append(paneHTML);

    var columnBlock = Math.floor(lsColumns / 3);
    var columnBlockRemainder = lsColumns % 3;

    console.log("columnBlock = " + columnBlock);
    console.log("columnBlockRemainder = " + columnBlockRemainder);

    for (var i = 0; i < lsQuantity; i++) {

      var thisRow = Math.floor(i / lsColumns) + 1;
      var thisCol = (i % lsColumns) + 1;

      var thisColBlock = 0;

      if (thisCol <= columnBlock) {
        thisColBlock = 1;
      } else if (thisCol <= columnBlock * 2) {
        thisColBlock = 2;
      } else if (thisCol <= columnBlock * 3 + columnBlockRemainder) {
        thisColBlock = 3;
      }

      var initTranslateX = thisCol * lsCellSide;
      var initTranslateY = thisRow * lsCellSide;

      var randomRight = Math.floor(Math.random() * (positionLeeway + 1)),
        randomRight = randomRight *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

      var randomBottom = Math.floor(Math.random() * (positionLeeway + 1)),
        randomBottom = randomBottom *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

      var randomOpacity = Math.random() * opacityLeeway,
        randomOpacity = randomOpacity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1,
        randomOpacity = opacity + randomOpacity;

      var lsHTML = '<div class="ls-' + name + ' ls-col-' + thisColBlock + '" style="' +
        'height:' + size + "px; " +
        'width:' + size + "px;" +
        'left:' + (initialRight + randomRight - (margin + size) + initTranslateX) + 'px;' + //LOOK HERE FOR INITIAL POSITIONING
        'top:' + (initialBottom + randomBottom - (margin + size) + initTranslateY) + 'px;' +
        'background-color:' + color + ';' +
        'opacity:' + randomOpacity + ';' +
        'box-shadow: 0 0 ' + blur + 'px ' + spread + 'px ' + color + ';' +
        '"></div>';

      $('#' + name + '-1').append(lsHTML);

    }

    for (var i = 2; i < 3; i++) {
      var leftPosition = ((i - 1) * (lsColumns * lsCellSide));
      $('#' + name + '-1').clone().attr("id", name + "-" + i).css("left", leftPosition).appendTo('.window');
      //$('#' + name + '-1').clone().attr("id", name + "-duplicate-" + i).removeClass("pane").addClass("duplicate-pane").css("left", leftPosition).appendTo('.window');
    }
  }

  circleMaker(60, 30, "#E9008D", 0.13, 20, 2, 10, 0.15, "purple");
  circleMaker(20, 17, "#F5BFE1", 0.1, 15, 3, 6, 0.15, "pink");
  //circleMaker(5, 80, "#FFFFFF", 0.1, 30, 3, 20, 0.1, "white");
  

})();