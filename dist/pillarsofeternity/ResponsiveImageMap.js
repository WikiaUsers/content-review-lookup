// smartresize jQuery extension method
// Alternative to resize callback, but executes after the resize is complete (not during)
(function($,sr)
{
  // Debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap)
  {
      var timeout;

      return function debounced ()
      {
          var obj = this, args = arguments;
          function delayed ()
          {
              if (!execAsap) func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  
  // smartresize 
  jQuery.fn[sr] = function(fn){ return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

/*
    Used to make "responsive" imagemaps where the coordinates adjust as the size of the image changes.
    Works in combination with res-img CSS in MediaWiki:Common.css. Also see Template:Res-img for more info

    This is mostly in pure JavaScript, with some exceptions

	Author: Macklin (Pillars of Eternity Wiki)
*/
$(document).ready(function(e)
{
    // Get all img elements with usemap attributes
    var imageMaps = document.querySelectorAll(".res-img img[usemap]");

    imageMaps.forEach(function(m)
    {
        fixResImageMapAboutIcon(m);

        // Get original width and height from img
        var originalWidth = m.naturalWidth;
        var originalHeight = m.naturalHeight;

        // Get usemap ID (minus #)
        var id = m.getAttribute("usemap").replace("#", "");

        // Get all area elements under the map with this ID
        var areas = document.querySelectorAll('.res-img map[name="' + id + '"] > area');

        // This map stores the coords for each area, keyed by area
        var coordsAll = new Map();
        
        // Create a percentage coordinate array of all coordinates in each area element
        // This is a value from 0 to 1 (left to right, top to bottom)
        // Coords are in pairs and always alternate from X axis to Y axis
        areas.forEach(function(a)
        {
            var coords = new Object();
            coords.str = a.getAttribute("coords").split(",");
            coords.val = new Array(coords.str.length);

            // Divide the pixel coord by the width or height to get the percentage
            for (var i = 0; i < coords.str.length; i++)
            {
                coords.val[i] = parseInt(coords.str[i]) / (i % 2 == 0 ? originalWidth : originalHeight);
            }

            coordsAll.set(a, coords);
        });

        var lastWidth, lastHeight;

        // Add a resize handler for this imagemap (some JQuery) and actually perform the update of coords
        // Declaring this function inline calls it
        function resizeImageMapAreas()
        {
            // Get current width/height
            var width = m.width;
            var height = m.height;

            // Don't do anything if the size of the img didn't change
            if (width == lastWidth && height == lastHeight)
                return;

            lastWidth = width;
            lastHeight = height;

            // Loop through each area in this map
            areas.forEach(function(a)
            {
                // Get coords from map
                var coords = coordsAll.get(a);

                for (var i = 0; i < coords.val.length; i++)
                {
                    // Multiply the percentage coord by the width or height to get the pixel coord
                    var px = coords.val[i] * (i % 2 == 0 ? width : height);
                    coords.str[i] = Math.round(px).toString();
                }

                // Join the string array and set coords attribute on area
                a.setAttribute("coords", coords.str.join());
            });
        }

        resizeImageMapAreas();
        $(window).smartresize(resizeImageMapAreas);
    });
});

function fixResImageMapAboutIcon(img)
{
    // This is the image nodes parent. It should be the same size as the image
    var noResizeDiv = img.parentNode;
    noResizeDiv.style.position = "relative";

    // From the image node's parent, find the parent div of the a element containing title="About this image"
    var icon = $(noResizeDiv).find('a[title="About this image"]').parent()[0];

    if (icon != undefined)
    {
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        
        // Get margin style properties from the div, and remove them
        var marginTop = parseInt(icon.style.marginTop);
        var marginLeft = parseInt(icon.style.marginLeft);

        // Determine the desc anchor from the margin-top and margin-left style attributes
        var isLeft = marginLeft < (width / 2);
        var isTop = marginTop < -(height / 2);

        // "Fix" the icon to use absolute positioning (relative to parent div) instead of margins
        icon.style.marginTop = "";
        icon.style.marginLeft = "";
        icon.style.textAlign = "";
        icon.style.position = "absolute";

        if (isLeft) icon.style.left = 0;
        else        icon.style.right = 0;
        if (isTop)  icon.style.top = 0;
        else        icon.style.bottom = 0;
    }
}