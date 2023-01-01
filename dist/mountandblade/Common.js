/* Any JavaScript here will be loaded for all users on every page load. */
/* World Map Navigator */
// Structure:
// .worldmap-button (span)
// .worldmap-popup (div)
// * .worldmap-tabs (div)
// * *.worldmap-target (span)
// * *.worldmap-target... (span)
// * .worldmap-navigator (div)
// * * 'image' (div)

// load jQuery UI
// @see http://dev.wikia.com/wiki/MediaWiki:Loadables/JQueryUI.js
jQuery.holdReady(true);
jQuery.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js", function() {
    jQuery.holdReady(false);
});
//wsl.loadScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js");

$(document).ready(function() {
    // process each World Map
    $('.worldmap-button').each(function(index, button) {
        button = $(button);
        var popup = button.next('.worldmap-popup');
        var targets = popup.find('.worldmap-target');
        var navigator = popup.find('.worldmap-navigator:first');
        var url = navigator.children('a').prop('href');

        button.prop('id', 'worldmap-button-' + index);
        popup.prop('id', 'worldmap-popup-' + index);
        navigator.prop('id', 'worldmap-navigator-' + index);

        // Button: on click - show popup (hides other popups) or hide popup
        button.click({
            index: index
        }, function(event) {
            var index = event.data.index;
            var button = $('#worldmap-button-' + index);
            var popup = $('#worldmap-popup-' + index);
            event.preventDefault();
            if (popup.is(':hidden')) {
                var target = popup.find('.worldmap-target:first');
                $('.worldmap-button.selected').removeClass('selected'); // deselect other buttons
                button.addClass('selected'); // select this button
                $('.worldmap-popup:visible').hide(); // hide all popups
                popup.show(); // show this popup
                popup.position({
                    my: "center top",
                    at: "center bottom",
                    of: button,
                    collision: "fit flip",
                    within: "#WikiaArticle"
                });
                if (target.length > 0) {
                    target.click();
                }
                else {
                    var navigator = popup.find('.worldmap-navigator:first');
                    var img = navigator.find('img:first');
                    navigator.scrollLeft(img.width() / 2 - navigator.innerWidth() / 2);
                    navigator.scrollTop(img.height() / 2 - navigator.innerHeight() / 2);
                }
            } else {
                button.removeClass('selected');
                popup.hide();
            }
        });


        // Popup
        navigator.bind('update-targets', {
            index: index
        }, function(event) {
            var index = event.data.index;
            var popup = $('#worldmap-popup-' + index);
            var navigator = popup.find('.worldmap-navigator:first');
            var targets = popup.find('.worldmap-target');
            var i;
            for (i = 0; i < targets.length; ++i) {
                var target = $(targets[i]);
                var area = navigator.find('area[title="' + target.text() + '"]:first');
                target.unbind('click');
                target.removeClass('invalid');
                if (area.length > 0) {
                    // valid - use area coordinates and select
                    var coords = area.attr('coords').split(',', 2);
                    var data = {
                        index: index,
                        x: coords[0],
                        y: coords[1],
                        select: true
                    };
                }
                else {
                    // invalid - use center of image and mark invalid
                    var img = navigator.find('img:first');
                    var data = {
                        index: index,
                        x: img.width() / 2,
                        y: img.height() / 2,
                    };
                    target.addClass('invalid');
                }
                // Target: on click - scroll to coordinates
                target.click(data, function(event) {
                    var popup = $('#worldmap-popup-' + event.data.index);
                    var navigator = popup.find('.worldmap-navigator:first');
                    event.preventDefault();
                    popup.find('.worldmap-target.selected').removeClass('selected'); // unselect all targets
                    if (event.data.select) $(this).addClass('selected'); // select this target
                    navigator.scrollLeft(event.data.x - navigator.innerWidth() / 2);
                    navigator.scrollTop(event.data.y - navigator.innerHeight() / 2);
                });
            }
            // Navigator: drag fully visible clone of map
            navigator.children('div').draggable({
                helper: 'clone',
                opacity: 0.90,
                stop: function(event, ui) {
                    var div = $(this);
                    var navigator = div.closest('.worldmap-navigator');
                    var div_pos = div.offset();
                    var helper_pos = ui.helper.offset();
                    navigator.scrollLeft(navigator.scrollLeft() - helper_pos.left + div_pos.left);
                    navigator.scrollTop(navigator.scrollTop() - helper_pos.top + div_pos.top);
                    navigator.closest('.worldmap-popup').find('.worldmap-target.selected').removeClass('selected');
                }
            });
        });

        // Load and process navigator
        if (url) {
            navigator.load(url + '?action=render', function() {
                $(this).trigger('update-targets');
            });
        }
        else {
            navigator.trigger('update-targets');
        }
    });
});

/*---------*/
/*-- Map --*/
/*---------*/

$(document).ready(function () {
  $(".map").each(function () {
    var $map = $(this);
    var $mapControls = $map.find(".map-control-list");
    var $mapView = $map.find(".map-view");
    var $mapImage = $mapView.find("img[usemap]").first();
    var $mapContent = $mapImage.parent();
    if ($mapContent.find('area').length === 0) {
      return; // not an imagemap?
    }
    
    // data
    var pixels = function (px,min,max) {
      if (min !== undefined && px < min) px = min;
      if (max !== undefined && px > max) px = max;
      if (px === 0) return 0;
      return px + 'px';
    };
    var areas = {};
    $mapContent.find("area").each(function () {
      var name = this.title;
      var shape = this.shape;
      if (!!areas[name]) {
        console.log("duplicate map areas not supported: " + String(name));
      }
      else if (shape === "circle") {
        var coords = this.coords.split(",");
        areas[this.title] = {
          'shape': 'circle',
          'left': parseInt(coords[0]),
          'top': parseInt(coords[1]),
          'radius': parseInt(coords[2]),
        };
      }
      else {
        console.log("map area shape not supported: " + String(shape));
      }
    });
    
    // look-at
    var lookingAt = areas[$mapView.attr('data-look-at')];
    var lookAt = function (area) {
      if (typeof(area) === "string") {
        area = areas[area];
      }
      if (area === undefined) {
        area = { // image center
          'left': $mapImage.width() / 2,
          'top': $mapImage.height() / 2,
        };
      }
      var minLeft = $mapView.width()-$mapImage.width();
      var minTop = $mapView.height()-$mapImage.height();
      var left = $mapView.width()/2-area.left;
      var top = $mapView.height()/2-area.top;
      $mapContent.css({
        'left': pixels(Math.floor(left), minLeft, 0),
        'top': pixels(Math.floor(top), minTop, 0),
      });
      lookingAt = {
        'left': $mapView.width()/2-parseInt($mapContent.css('left')),
        'top': $mapView.height()/2-parseInt($mapContent.css('top')),
      };
    };
    lookAt(lookingAt);
    $(window).resize(function () {
      lookAt(lookingAt); // keep lookingAt centered
    });
    $mapControls.find(".map-control-look-at").each(function () {
      // look-at button
      var $control = $(this);
      var name = $control.text();
      if (!!areas[name]) {
        $control.click(function (e) {
          e.preventDefault();
          lookAt(name);
        });
      }
      else {
        console.log('unknown look-at area (#)'.replace('#', name));
      }
    });
    
    // draggable map
    $mapContent.draggable({
      stop: function (e, ui) {
        lookAt({
          'left': $mapView.width()/2-parseInt($mapContent.css('left')),
          'top': $mapView.height()/2-parseInt($mapContent.css('top')),
        });
      }
    });
    
    // overlay groups
    var $mapOverlay = $('<div>');
    $mapOverlay.addClass('map-overlay');
    $mapOverlay.insertBefore($mapImage);
    $mapControls.find("[data-areas]").each(function (groupIndex) {
      var $group = $(this);
      $group.attr('data-group', groupIndex);
      var names = []; // '|' is not allowed in names
      $.each($group.attr('data-areas').split('|'), function (index, name) {
        if (!!areas[name]) {
          names.push(name);
        }
        else {
          console.log("group map area not found (#)".replace('#', name));
        }
      });
      
      // shape
      $group.find('.map-control-shape').each(function () {
        var $control = $(this);
        var shapeClass = $control.attr('data-shape-class');
        $.each(names, function () {
          var name = this;
          var area = areas[name];
          if (area.shape === "circle") {
            var $shape = $('<span>');
            $shape.attr('title', name);
            $shape.attr('data-group', groupIndex);
            $shape.addClass("map-shape map-shape-circle");
            $shape.addClass(shapeClass);
            $shape.css({
              'left': area.left,
              'top': area.top,
              'width': 2 * area.radius + 1,
              'height': 2 * area.radius + 1,
            });
            $shape.appendTo($mapOverlay);
          }
        });
      });
      
      // pin
      $group.find('.map-control-pin').each(function () {
        var $control = $(this);
        var $img = $control.find('img');
        var src = !!$img.attr('data-src') ? $img.attr('data-src') : $img.attr('src');
        $.each(names, function () {
          var name = this;
          var area = areas[name];
          if (area.shape === "circle") {
            var $pin = $('<img>');
            $pin.attr('title', name);
            $pin.attr('src', src);
            $pin.attr('data-group', groupIndex);
            $pin.addClass("map-pin");
            $pin.css({
              'left': area.left,
              'top': area.top,
            });
            $pin.appendTo($mapOverlay);
          }
        });
      });
      
      // toogle group
      var toggleGroup = function (enable) {
        $group.toggleClass("map-control-on", enable);
        $group.toggleClass("map-control-off", !enable);
        $mapOverlay.find('[data-group="' + groupIndex + '"]').toggleClass("map-hidden", !enable);
      };
      $group.find('.map-control-shape,.map-control-pin').click(function (e) {
        e.preventDefault();
        toggleGroup(!!$group.hasClass("map-control-off"));
      });
      toggleGroup(!$group.hasClass("map-control-off"));
    });
    $mapContent.find('area,.map-pin').hover(function (e) {
      var name = $(this).attr('title');
      if (!!name) {
        $mapContent.find('.map-shape[title="'+name.replace('"','\"')+'"]').addClass("map-shape-hover");
      }
    }, function (e) {
      var name = $(this).attr('title');
      if (!!name) {
        $mapContent.find('.map-shape[title="'+name.replace('"','\"')+'"]').removeClass("map-shape-hover");
      }
    });
    $mapOverlay.find('.map-pin').click(function (e) {
      // click the area
      e.preventDefault();
      var name = $(this).attr('title');
      $mapContent.find('area[title="' + name.replace('"','\"') + '"]')
        .click();
    });
  });
});