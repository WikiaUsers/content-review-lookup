$(document).ready(function() {

  window.imagemap = window.imagemap || {};

  var
    // add this class to all elements created by the script. the reason is that we call the script again on window resize, and use the class to remove all the "artifacts" we created in the previous run.
    myClassName = 'imageMapHighlighterArtifact',
    liHighlightClass = 'liHighlighting',
    specialAreaMark = 'area_mark',
    specialLiClassesMark = 'list_classes',
    // "2d context" attributes used for highlighting.
    areaHighLighting = { fillStyle: window.imagemap.hightlightfill || 'rgba(0,0,0,0.35)', strokeStyle: window.imagemap.hightlightcolor || '#C51111', lineJoin: 'round', lineWidth: 2 },
    // Every imagemap that wants highlighting, should reside in a div of this 'class':
    hilightDivMarker = '.imageMapHighlighter',
    hideLegend = window.imagemap.hidelegend || false,
    // Specifically for wikis - redlinks tooltip adds this message
    expandLegend = 'Show Legend',
    collapseLegend = 'Hide Legend'
    ;

  function drawMarker(context, areas) { // mthis is where the magic is done.
    function drawPoly(coords) {
      context.moveTo(coords.shift(), coords.shift());
      while (coords.length)
        context.lineTo(coords.shift(), coords.shift());
    }

    for (var i in areas) {
      var coords = areas[i].coords.split(',');
      context.beginPath();
      switch (areas[i].shape) {
        case 'rect': drawPoly([coords[0], coords[1], coords[0], coords[3], coords[2], coords[3], coords[2], coords[1]]); break;
        case 'circle': context.arc(coords[0], coords[1], coords[2], 0, Math.PI * 2); break;//x,y,r,startAngle,endAngle
        case 'poly': drawPoly(coords); break;
      }
      context.closePath();
      context.stroke();
      context.fill();
    }
  }

  function mouseAction(e) {
    var $this = $(this),
      activate = e.type == 'mouseover',
      caption = $this.text(),
      ol = $this.parent(),
      context = ol.data('context'),
      special = ol.data(specialAreaMark);

    $this.toggleClass(liHighlightClass, activate); // mark/unmark the list item. 

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // prepare for a new day.

    ol.find('li').each(function() {
      var $li = $(this);
      var licap = $li.text();
      var param;
      if (activate && licap === caption) { // highlight!!!
        param = special && special.hover || areaHighLighting;
      } else {
        param = special && special.nover && (special.nover[licap] || special.nover.default);
      }
      if (param) {
        $.extend(context, param);
        drawMarker(context, $li.data('areas'));
      }
    });
  }

  function handleOneMap() {
    var img = $(this),
      w = img.width(),
      h = img.height(),
      map = img.siblings('map:first'),
      dims = { position: 'absolute', width: w + 'px', height: h + 'px', border: 0, top: 0, left: 0 },
      specialHighlight = img.closest(hilightDivMarker).data(specialAreaMark),
      specialLiClasses = img.closest(hilightDivMarker).data(specialLiClassesMark);


    if (!('area', map).length)
      return;	//not an imagemap. inside "each" anonymous function, 'return' means "continue".

    var jcanvas = $('<canvas>', { 'class': myClassName })
      .css(dims)
      .attr({ width: w, height: h });
    var bgimg = $('<img>', { 'class': myClassName, src: img.attr('src') })
      .css(dims);//completely inert image. this is what we see.
    var context = $.extend(jcanvas[0].getContext("2d"), areaHighLighting);

    // this is where the magic is done: prepare a sandwich of the inert bgimg at the bottom,
    // the canvas above it, and the original image on top,
    // so canvas won't steal the mouse events.
    // pack them all TIGHTLY in a newly minted "relative" div, so when page chnage
    // (other scripts adding elements, window resize etc.), canvas and imagese remain aligned.
    var div = $('<div>').css({ position: 'relative', width: w + 'px', height: h + 'px' });
    img.before(div);	// put the div just above the image, and ...
    div.append(bgimg)	// place the background image in the div
      .append(jcanvas)// and the canvas. both are "absolute", so they don't occupy space in the div
      .append(img);	// now yank the original image from the window and place it on the div.
    img.fadeTo(1, 0);	// make the image transparent - we see canvas and bgimg through it. 
    // the original, now transparent image is creating our mouse events

    if (hideLegend !== true) {
      var ol = $('<ol>', { 'class': myClassName })
        .css({ clear: 'both', margin: 0, listStyle: 'none', maxWidth: w + 'px', float: 'left', position: 'relative' })
        .attr({ 'data-expandtext': expandLegend, 'data-collapsetext': collapseLegend })
        .data(specialAreaMark, specialHighlight)
        .data('context', context);

      // ol below image, hr below ol. original caption pushed below hr.
      div.after($('<hr>', { 'class': myClassName }).css('clear', 'both'))
        .after(ol);
      var lis = {};	//collapse areas with same caption to one list item
      var someli; // select arbitrary one
      $('area', map).each(function() {
        var text = this.title;
        var li = lis[text];	// title already met? use the same li
        if (!li) {			//no? create a new one.
          var href = this.href;
          lis[text] = li = $('<li>', { 'class': myClassName })
            .append($('<a>', { href: href, text: text }))
            .on('mouseover mouseout', mouseAction)
            .data('areas', [])
            .addClass(specialLiClasses && (specialLiClasses[text] || specialLiClasses['default']))
            .appendTo(ol);
        }
        li.data('areas').push(this);	//add the area to the li
        someli = li; // whichever - we just want one...
        $(this).on('mouseover mouseout', function(e) { li.trigger(e.type); });
      });
      if (someli) someli.trigger('mouseout');
      mw.loader.using('jquery.makeCollapsible').then(function() {
        ol.addClass('mw-collapsed')
          .makeCollapsible();
      });
    }
  }

  function init() {
    mw.util.addCSS('li.' + myClassName + '{white-space:nowrap;border:solid 1px transparent;border-radius:6px;}\n' + //css for li element
      'li.' + myClassName + '.' + liHighlightClass + '{background-color:yellow;}\n' + //css for highlighted li element.
      '.rtl li.' + myClassName + '{float: right; margin-left: 3em;}\n' +
      '.ltr li.' + myClassName + '{float: left; margin-right: 3em;}');
    $(hilightDivMarker + ' img').each(handleOneMap);
  }

  //has at least one "imagehighlight" div, and canvas-capable browser:
  if ($(hilightDivMarker).length && $('<canvas>')[0].getContext)
    mw.loader.using(['jquery.makeCollapsible', 'mediawiki.util']).done(init);
});