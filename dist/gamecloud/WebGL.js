function initCanvas(canvas) {
  // Get A WebGL context
  if (window != window.top) {
    updateCSSIfInIFrame();

    // Make the canvas backing store the size it's displayed.
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  } else {
    var title = document.getElementsByTagName("title")[0].innerText;
    var h1 = document.createElement("h1");
    h1.innerText = title;
    document.body.insertBefore(h1, document.body.children[0]);
  }

  function showLink(str) {
    var container = canvas.parentNode;
    if (container) {
      container.innerHTML = makeFailHTML(str);
    }
  };

  if (!window.WebGLRenderingContext) {
    showLink(GET_A_WEBGL_BROWSER);
    return null;
  }

  var names = ["webgl", "experimental-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], null);
    } catch(e) {}
    if (context) {
      break;
    }
  }
  if (!context) {
    showLink(OTHER_PROBLEM);
  }

  // Setup GLSL program
  var shaderSource = ""
+ "attribute vec2 a_position;"
+ "attribute vec2 a_texCoord;"
+ ""
+ "uniform vec2 u_resolution;"
+ ""
+ "varying vec2 v_texCoord;"
+ ""
+ "void main() {"
   // Convert the rectangle from pixels to 0.0 to 1.0
+ "   vec2 zeroToOne = a_position / u_resolution;"

   // Convert from 0->1 to 0->2
+ "   vec2 zeroToTwo = zeroToOne * 2.0;"

   // Convert from 0->2 to -1->+1 (clipspace)
+ "   vec2 clipSpace = zeroToTwo - 1.0;"

+ "   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);"

   // Pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
+ "   v_texCoord = a_texCoord;"
+ "}";

	vertexShader = loadShader(
		context, shaderSource, context.VERTEX_SHADER, null);

	var shaderSource = ""
+ "precision mediump float;"

// our texture
+ "uniform sampler2D u_image;"

// the texCoords passed in from the vertex shader.
+ "varying vec2 v_texCoord;"

+ "void main() {"
+ "   gl_FragColor = texture2D(u_image, v_texCoord);"
+ "}";

	fragmentShader = loadShader(
		context, shaderSource, context.FRAGMENT_SHADER, null);

	var program = context.createProgram();
	for (var ii = 0; ii < [vertexShader, fragmentShader].length; ++ii) {
		context.attachShader(program, [vertexShader, fragmentShader][ii]);
	}
	context.linkProgram(program);

	// Check the link status
	var linked = context.getProgramParameter(program, context.LINK_STATUS);
	if (!linked) {
		// Something went wrong with the link
		lastError = context.getProgramInfoLog (program);

		context.deleteProgram(program);
		return null;
	}
	context.useProgram(program);
	
	context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
	context.enable(context.BLEND);
	context.disable(context.DEPTH_TEST);
	
	return [context, program];
}

function drawImage(canvas, gl, program, image, x, y) {
  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

  // provide texture coordinates for the rectangle.
  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // Create a texture.
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // lookup uniforms
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

  // set the resolution
  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

  // Create a buffer for the position of the rectangle corners.
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Set a rectangle the same size as the image.
  setRectangle(gl, x, y, image.width, image.height);

  // Draw the rectangle.
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2]), gl.STATIC_DRAW);
}

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    '<td align="center">' +
    '<div style="display: table-cell; vertical-align: middle;">' +
    '<div style="">' + msg + '</div>' +
    '</div>' +
    '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

var updateCSSIfInIFrame = function() {
  if (window != window.top) {
    document.body.className = "iframe";
  }
};

/**
 * Loads a shader.
 * @param {!WebGLContext} gl The WebGLContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
 */
var loadShader = function(gl, shaderSource, shaderType, opt_errorCallback) {
  var errFn = opt_errorCallback;
  // Create the shader object
  var shader = gl.createShader(shaderType);

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    lastError = gl.getShaderInfoLog(shader);
    errFn("*** Error compiling shader '" + shader + "':" + lastError);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/* export functions */
this.updateCSSIfInIFrame = updateCSSIfInIFrame;

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           return window.setTimeout(callback, 1000/60);
         };
})();

/**
 * Provides cancelRequestAnimationFrame in a cross browser way.
 */
window.cancelRequestAnimFrame = (function() {
  return window.cancelCancelRequestAnimationFrame ||
         window.webkitCancelRequestAnimationFrame ||
         window.mozCancelRequestAnimationFrame ||
         window.oCancelRequestAnimationFrame ||
         window.msCancelRequestAnimationFrame ||
         window.clearTimeout;
})();