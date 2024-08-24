/* Button Factory
 * This javascript generates CSS for custom Monaco buttons. 
 * See http://help.wikia.com/wiki/Help:ButtonFactory
*/
$(function() {
$("#buttonFactory").html('<div><label><strong>Color:</strong></label> <input type="text" id="buttonFactory-input" size="12"> <strong>Tipo:</strong> <input type="radio" name="type" id="buttonFactory-type-primary" checked="checked"> Primario <input type="radio" name="type" id="buttonFactory-type-secondary"> Secundario <button onclick="buttonFactory.calculate()" id="buttonFactory-submit">Calcular</button></div><textarea id="buttonFactory-output" style="height: 300px"></textarea>');
});
 
  buttonFactory = {};
  buttonFactory.calculate = function() {
    var color = document.getElementById("buttonFactory-input").value.toLowerCase();
    if (buttonFactory.cssColorNames[color]) {
       color = buttonFactory.cssColorNames[color];
    }
    if (color.length == 3) {
      color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    }
    if (color.length == 6) {
      color = color.toUpperCase();
      var shade = buttonFactory.calculateShade(color);
      var tint = "FFFFFF";
      var stroke = buttonFactory.calculateStroke(color);
      var text = buttonFactory.calculateText(color);
      var textShadow = buttonFactory.calculateTextShadow(text);
      var secondary = (document.getElementById("buttonFactory-type-primary").checked) ? '' : '.secondary';
 
      var css ='';
      css += 'a.wikia-button' + secondary + ',\n'+
      'a.wikia-button' + secondary + ':visited,\n'+
      'span.wikia-button' + secondary + ' a,\n'+
      'span.wikia-button' + secondary + ' a:visited,\n'+
      'input[type="submit"]' + secondary + ',\n'+
      'input[type="reset"]' + secondary + ',\n'+
      'input[type="button"]' + secondary + ',\n'+
      'button' + secondary + ' {\n';
 
        css += '\tbackground-color: #'+ color +';\n'+
          '\tbackground-image: -moz-linear-gradient(top, #'+ color +' 20%, #'+ shade +' 70%);\n'+
          '\tbackground-image: -webkit-gradient(linear, 0% 20%, 0% 70%, from(#'+ color +'), to(#'+ shade +'));\n'+
          '\tborder-color: #'+ tint +';\n'+
          '\tbox-shadow: 0 1px 0 #'+ stroke +', 0 -1px 0 #'+ stroke +', 1px 0 0 #'+ stroke +', -1px 0 0 #'+ stroke +';\n'+
          '\tcolor: #'+ text +';\n'+
          '\t-moz-box-shadow: 0 0 0 1px #'+ stroke +';\n'+
          '\t-webkit-box-shadow: 0 1px 0 #'+ stroke +', 0 -1px 0 #'+ stroke +', 1px 0 0 #'+ stroke +', -1px 0 0 #'+ stroke +';\n'+
 
      '}';
 
      css += '\n\n/* IE Styles */\n';
 
      css += 'a.wikia-button' + secondary +',\n'+
      'span.wikia-button' + secondary + ' a,\n'+
      'input[type="submit"]' + secondary + ',\n'+
      'input[type="reset"]' + secondary + ',\n'+
      'input[type="button"]' + secondary + ',\n'+
      'button' + secondary + ' {\n';
 
          css += '\tfilter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr="#FF' + color + '", EndColorStr="#FF' + shade + '");\n'+
          '\toutline: 1px solid #' + stroke + '\\9;\n'+
 
      '}';
 
      css += '\n\n/* Hover and Active states */\n';
 
      css += 'a.wikia-button' + secondary +':hover,\n'+
      'span.wikia-button' + secondary + ' a:hover,\n'+
      'input[type="submit"]' + secondary + ':hover,\n'+
      'input[type="reset"]' + secondary + ':hover,\n'+
      'input[type="button"]' + secondary + ':hover,\n'+
      'button' + secondary + ':hover {\n';
 
          css += '\ttext-shadow: #' + textShadow + ' 0 1px 1px;\n'+
 
      '}';
 
      css += '\n\na.wikia-button' + secondary +':active,\n'+
      'span.wikia-button' + secondary + ' a:active,\n'+
      'input[type="submit"]' + secondary + ':active,\n'+
      'input[type="reset"]' + secondary + ':active,\n'+
      'input[type="button"]' + secondary + ':active,\n'+
      'button' + secondary + ':active {\n';
 
          css += '\tcolor: #' + text + ';\n'+
          '\tbackground-image: -moz-linear-gradient(top, #' + shade + ' 20%, #' + color + ' 70%);\n'+
          '\tbackground-image: -webkit-gradient(linear, 0% 20%, 0% 70%, from(#' + shade + '), to(#' + color + '));\n'+
 
      '}';
 
      document.getElementById("buttonFactory-output").innerHTML = css;
    } else {
      document.getElementById("buttonFactory-output").innerHTML = "Inserta el valor hexadecimal de un color o el nombre clave de un color (como 'blue')";
    }
  }
  buttonFactory.calculateTextShadow = function(color) {
    if (color == "000000") {
      return "FFFFFF";
    } else {
      return "000000";
    }
  }
  buttonFactory.calculateText = function(color) {
    rgb = buttonFactory.hex2rgb(color);
    var black = 0;
    var white = 0;
    for (var i=0; i<rgb.length; i++) {
      black += rgb[i];
      white += (255 - rgb[i]);
    }
    if (black - white >=0) {
      return "000000";
    } else {
      return "FFFFFF";
    }
  }
  buttonFactory.calculateStroke = function(color) {
    rgb = buttonFactory.hex2rgb(color);
    for(var i=0; i<rgb.length; i++) {
      rgb[i] = Math.floor(rgb[i] * .3);
    }
    return buttonFactory.rgb2hex(rgb);
  }
  buttonFactory.calculateShade = function(color) {
    rgb = buttonFactory.hex2rgb(color);
    for(var i=0; i<rgb.length; i++) {
      rgb[i] = Math.floor(rgb[i] * .8);
    }
    return buttonFactory.rgb2hex(rgb);
  }
  buttonFactory.rgb2hex = function(rgb) {
    var char = "0123456789ABCDEF";
    var hex = "";
    for(var i = 0; i<rgb.length; i++) {
      hex += String(char.charAt(Math.floor(rgb[i] / 16)));
      hex += String(char.charAt(rgb[i] - (Math.floor(rgb[i] / 16) * 16)));
    }
    return hex;
  } 
  buttonFactory.hex2rgb = function(hex) {
    var rgb = [];
    rgb.push(parseInt(hex.substring(0,2), 16));
    rgb.push(parseInt(hex.substring(2,4), 16));
    rgb.push(parseInt(hex.substring(4,6), 16));
    return rgb;
  }
  buttonFactory.cssColorNames = {"aliceblue" : "F0F8FF", "antiquewhite" : "FAEBD7", "aqua" : "00FFFF", "aquamarine" : "7FFFD4", "azure" : "F0FFFF", "beige" : "F5F5DC", "bisque" : "FFE4C4", "black" : "000000", "blanchedalmond" : "FFEBCD", "blue" : "0000FF", "blueviolet" : "8A2BE2", "brown" : "A52A2A", "burlywood" : "DEB887", "cadetblue" : "5F9EA0", "chartreuse" : "7FFF00", "chocolate" : "D2691E", "coral" : "FF7F50", "cornflowerblue" : "6495ED", "cornsilk" : "FFF8DC", "crimson" : "DC143C", "cyan" : "00FFFF", "darkblue" : "00008B", "darkcyan" : "008B8B", "darkgoldenrod" : "B8860B", "darkgray" : "A9A9A9", "darkgreen" : "006400", "darkkhaki" : "BDB76B", "darkmagenta" : "8B008B", "darkolivegreen" : "556B2F", "darkorange" : "FF8C00", "darkorchid" : "9932CC", "darkred" : "8B0000", "darksalmon" : "E9967A", "darkseagreen" : "8FBC8F", "darkslateblue" : "483D8B", "darkslategray" : "2F4F4F", "darkturquoise" : "00CED1", "darkviolet" : "9400D3", "deeppink" : "FF1493", "deepskyblue" : "00BFFF", "dimgray" : "696969", "dodgerblue" : "1E90FF", "firebrick" : "B22222", "floralwhite" : "FFFAF0", "forestgreen" : "228B22", "fuchsia" : "FF00FF", "gainsboro" : "DCDCDC", "ghostwhite" : "F8F8FF", "gold" : "FFD700", "goldenrod" : "DAA520", "gray" : "808080", "green" : "008000", "greenyellow" : "ADFF2F", "honeydew" : "F0FFF0", "hotpink" : "FF69B4", "indianred " : "CD5C5C", "indigo " : "4B0082", "ivory" : "FFFFF0", "khaki" : "F0E68C", "lavender" : "E6E6FA", "lavenderblush" : "FFF0F5", "lawngreen" : "7CFC00", "lemonchiffon" : "FFFACD", "lightblue" : "ADD8E6", "lightcoral" : "F08080", "lightcyan" : "E0FFFF", "lightgoldenrodyellow" : "FAFAD2", "lightgrey" : "D3D3D3", "lightgreen" : "90EE90", "lightpink" : "FFB6C1", "lightsalmon" : "FFA07A", "lightseagreen" : "20B2AA", "lightskyblue" : "87CEFA", "lightslategray" : "778899", "lightsteelblue" : "B0C4DE", "lightyellow" : "FFFFE0", "lime" : "00FF00", "limegreen" : "32CD32", "linen" : "FAF0E6", "magenta" : "FF00FF", "maroon" : "800000", "mediumaquamarine" : "66CDAA", "mediumblue" : "0000CD", "mediumorchid" : "BA55D3", "mediumpurple" : "9370D8", "mediumseagreen" : "3CB371", "mediumslateblue" : "7B68EE", "mediumspringgreen" : "00FA9A", "mediumturquoise" : "48D1CC", "mediumvioletred" : "C71585", "midnightblue" : "191970", "mintcream" : "F5FFFA", "mistyrose" : "FFE4E1", "moccasin" : "FFE4B5", "navajowhite" : "FFDEAD", "navy" : "000080", "oldlace" : "FDF5E6", "olive" : "808000", "olivedrab" : "6B8E23", "orange" : "FFA500", "orangered" : "FF4500", "orchid" : "DA70D6", "palegoldenrod" : "EEE8AA", "palegreen" : "98FB98", "paleturquoise" : "AFEEEE", "palevioletred" : "D87093", "papayawhip" : "FFEFD5", "peachpuff" : "FFDAB9", "peru" : "CD853F", "pink" : "FFC0CB", "plum" : "DDA0DD", "powderblue" : "B0E0E6", "purple" : "800080", "red" : "FF0000", "rosybrown" : "BC8F8F", "royalblue" : "4169E1", "saddlebrown" : "8B4513", "salmon" : "FA8072", "sandybrown" : "F4A460", "seagreen" : "2E8B57", "seashell" : "FFF5EE", "sienna" : "A0522D", "silver" : "C0C0C0", "skyblue" : "87CEEB", "slateblue" : "6A5ACD", "slategray" : "708090", "snow" : "FFFAFA", "springgreen" : "00FF7F", "steelblue" : "4682B4", "tan" : "D2B48C", "teal" : "008080", "thistle" : "D8BFD8", "tomato" : "FF6347", "turquoise" : "40E0D0", "violet" : "EE82EE", "wheat" : "F5DEB3", "white" : "FFFFFF", "whitesmoke" : "F5F5F5", "yellow" : "FFFF00", "yellowgreen" : "9ACD32"};
 
 
 
//<pre>
if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/3/3a/Redirecci%C3%B3n.png",
		"speedTip": "Redirigir",
		"tagOpen": "#REDIRECCIÓN [[",
		"tagClose": "]]",
		"sampleText": "Nombre del artículo"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/2/21/Categoria.png",
		"speedTip": "Categoría",
		"tagOpen": "[[Categoría:",
		"tagClose": "]]",
		"sampleText": "Nombre de la categoría"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/9/92/Destruir.png",
		"speedTip": "Borrar",
		"tagOpen": "{{Destruir|",
		"tagClose": "}}",
		"sampleText": "motivo"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/2/25/Titulo-h2.png",
		"speedTip": "Titulo nivel 2",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Texto de encabezado"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/f/f2/Titulo-h3.png",
		"speedTip": "Titulo nivel 3",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Texto de encabezado"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/0/0f/Titulo-h4.png",
		"speedTip": "Titulo nivel 4",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Texto de encabezado"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/0/06/Titulo-h5.png",
		"speedTip": "Titulo nivel 5",
		"tagOpen": "===== ",
		"tagClose": " =====",
		"sampleText": "Texto de encabezado"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/6/69/Lista-vinetada.png",
		"speedTip": "Lista viñetada",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": "Ítem de lista viñetada"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/9/9f/Lista-numerada.png",
		"speedTip": "Lista numerada",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": "Ítem de lista numerada"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/d/d4/Linea-indentada.png",
		"speedTip": "Linea indentada",
		"tagOpen": ":",
		"tagClose": "",
		"sampleText": "Linea indentada"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/b/b8/Nueva-linea.png",
		"speedTip": "Nueva linea",
		"tagOpen": "<br />\n",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/1/10/Texto-grande.png",
		"speedTip": "Grande",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Texto grande"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/8/81/Texto-peque%C3%B1o.png",
		"speedTip": "Pequeño",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Texto pequeño"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/9/97/Superescrito.png",
		"speedTip": "Superescrito",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": "Texto superescrito"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/jpop/es/images/b/b4/Suscribir.png",
		"speedTip": "Suscribir",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": "Texto suscrito"
	};
}