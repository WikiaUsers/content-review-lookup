/* dynamic xml swf processor */

/*
	to-do list:
	  1. take care for /Matrix > PlaceObject\d+/ objects that have no Matrix
	     children - this is the problem with furniture sprites' frames and others
*/

// <span id="swfxml"></span>

if ($("span#swfxml").length == 1) {

mw.util.addCSS(
'textarea#swfxml-input, textarea#swfxml-output {\
	width: 100%;\
	height: 100px;\
	resize: none;\
	border: 1px solid #cccccc;\
}'
);

$("span#swfxml").replaceWith(
'<h3>Input</h3>\
<textarea id="swfxml-input"></textarea>\
<h3>Settings Panel</h3>\
Move to right: <input type="text" id="swfxml-move-x" value="1000" /><br />\
Move to bottom: <input type="text" id="swfxml-move-y" value="1000" /><br />\
Multiply shape dimensions by: (recommended: 40): <input type="text" id="swfxml-multiply" value="40" /><br />\
New window size: <input type="text" id="swfxml-windowsize" value="4000" /><br />\
<input type="button" id="swfxml-go" value="go" />\
<h3>Output</h3>\
<textarea id="swfxml-output"></textarea>'
);

function xmlToString(xmlData) { // this function is from http://stackoverflow.com/questions/6507293/convert-xml-to-string-with-jquery#answer-6507766

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}

$("#swfxml-go").click(function() {
	var a = $.parseXML($("#swfxml-input").val()),
		b = $(a).find("Movie").children().filter(function() {
			if (/PlaceObject\d+/.test(this.nodeName)) {
				// PlaceObject2 are the most common, but return others just in case
				if ($(this).children("Matrix").length == 0) {
					// if has no Matrix child, create one
					$(this).append("<Matrix></Matrix>");
				}
				return $(this).children("Matrix");
			}
		}).children("Matrix"),
		c = {"move": {"x": Number($("#swfxml-move-x").val()), "y": Number($("#swfxml-move-y").val())}, "multiply": Number($("#swfxml-multiply").val())};
	// blur scaler
	$(a).find("BlurX, BlurY").each(function() {
		$(this).attr({
			"High": Number($(this).attr("High")) * c.multiply,
			"Low": Number($(this).attr("Low")) * c.multiply
		});
	});
	// line thickness scaler
	$(a).find("LineStyle > BitsField").each(function() {
		$(this).attr({
			NoHScale: "0",
			NoVScale: "0"
		});
	});
	// matrix scaler
	$(b).each(function(i) {
		// create Scale child node if doesn't exist
		if ($(this).children("Scale").length == 0) {
			$(this).append('<Scale ScaleX="1" ScaleY="1" />');
		}
		// create Translate child node if doesn't exist
		if ($(this).children("Translate").length == 0) {
			$(this).append('<Translate TranslateX="0" TranslateY="0" />');
		}
		$(this).find("Translate").attr({
			"TranslateX": (Number($(this).find("Translate").attr("TranslateX")) + c.move.x) *c.multiply,
			"TranslateY": (Number($(this).find("Translate").attr("TranslateY")) + c.move.y) * c.multiply
		});
		if ($(this).children("Scale").length == 1) {
			$(b[i]).find("Scale").attr({
				"ScaleX": Number($(this).find("Scale").attr("ScaleX")) * c.multiply,
				"ScaleY": Number($(this).find("Scale").attr("ScaleY")) * c.multiply
			});
		} else {
			$(b[i]).append(
				'<Scale ScaleX="' + c.multiply + '" ScaleY="' + c.multiply + '" />'
			);
		}
		if ($(this).children("Rotate").length == 1) {
			$(this).find("Rotate").attr({
				"RotateSkew0": Number($(this).find("Rotate").attr("RotateSkew0")) * c.multiply,
				"RotateSkew1": Number($(this).find("Rotate").attr("RotateSkew1")) * c.multiply
			});
		}
		if (i + 1 == b.length) {
			$(a).find("Movie").first().attr({
				"Width": $("#swfxml-windowsize").val(),
				"Height": $("#swfxml-windowsize").val()
			});
			$("#swfxml-output").val(xmlToString(a));
		}
	});
}); 

}