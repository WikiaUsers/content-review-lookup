// Lightens a color (allows hex values)
function lightenColor(color, percentage) {
  var r, g, b;

  if (color.charAt(0) === "#") {
    // Convert hex to RGB
    var bigint = parseInt(color.slice(1), 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else if (color.indexOf("rgb") === 0) {
    // Extract RGB values from "rgb(r, g, b)" string
    var rgb = color.match(/\d+/g);
    r = parseInt(rgb[0], 10);
    g = parseInt(rgb[1], 10);
    b = parseInt(rgb[2], 10);
  } else {
    console.error("Unsupported color format: " + color);
    return color;
  }

  // Lighten each channel
  r = Math.min(255, Math.round(r + (255 - r) * (percentage / 100)));
  g = Math.min(255, Math.round(g + (255 - g) * (percentage / 100)));
  b = Math.min(255, Math.round(b + (255 - b) * (percentage / 100)));

  // Convert back to RGB
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Update the link hover colors
function updateHoverColors(selector) {
  var elements = document.querySelectorAll(selector);

  Array.prototype.forEach.call(elements, function (el) {
    var computedStyle = getComputedStyle(el);

    // Check if hover colors are explicitly defined
    var color1Hover = computedStyle.getPropertyValue("--gradient-color1-hover").trim();
    var color2Hover = computedStyle.getPropertyValue("--gradient-color2-hover").trim();

    if (color1Hover === "" || color1Hover === "rgb(255, 255, 255)") {
      // Get the base gradient color
      var color1 = computedStyle.getPropertyValue("--gradient-color1").trim();
      var lighterColor1 = lightenColor(color1, 40); // 40% lighter
      el.style.setProperty("--gradient-color1-hover", lighterColor1);
    }

    if (color2Hover === "" || color2Hover === "rgb(73, 73, 73)") {
      // Get the base gradient color
      var color2 = computedStyle.getPropertyValue("--gradient-color2").trim();
      var lighterColor2 = lightenColor(color2, 40); // 40% lighter
      el.style.setProperty("--gradient-color2-hover", lighterColor2);
    }
  });
}

// Apply the calculated color to these classes
updateHoverColors("a span.gradient, span.gradient-underline");

// Converts a hex into rgba to allow transparency
function hexToRgba(hex) {
  // Remove the hash symbol if present
  hex = hex.replace(/^#/, '');

  // If the hex is shorthand (e.g. #abc), expand it
  if (hex.length === 3) {
    hex = hex.split('').map(function(char) {
      return char + char;
    }).join('');
  }

  // Extract the RGB components
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA string with alpha 0 for transparency
  return 'rgba(' + r + ',' + g + ',' + b + ', 0)';
}

// Apply the transparent version of the color as a variable
function applyTransparentLinkColor() {
  // Get the original color from the link (could be custom or inherited)
  var linkColor = window.getComputedStyle(document.querySelector('span.hover-underline a')).color;

  // Convert hex or rgb to rgba(0) version
  // If it's an rgb color (for example: rgb(52, 152, 219)), extract the hex value
  var rgbaColor = hexToRgba(rgbToHex(linkColor));

  // Set the --transparent-link-color custom property with the new rgba color
  document.documentElement.style.setProperty('--transparent-link-color', rgbaColor);
}

// Convert rgb to hex for cases where the color is in rgb format
function rgbToHex(rgb) {
  var result = rgb.match(/\d+/g);
  var r = parseInt(result[0], 10);
  var g = parseInt(result[1], 10);
  var b = parseInt(result[2], 10);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Set the transparent link color (for the underline)
applyTransparentLinkColor();