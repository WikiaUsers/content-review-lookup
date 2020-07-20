/** --------------------------- **/
/** ---- Begin IE bugfixes ---- **/
/** --------------------------- **/

// *******************************
// Fix broken hover logic in IE6
// *******************************

function rewriteHover() {
  var gbh = document.getElementById("hover-global");
  if (gbh === null) return;
  var nodes = getElementsByClass("hoverable", gbh);
 
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].onmouseover = function() {
      this.className += " over";
    };
 
    nodes[i].onmouseout = function() {
      this.className = this.className.replace(RegExp(" over\\b"), "");
    };
  }
}
 
if (/*@cc_on/*@if(@_jscript_version<=5.6)1@else@*/0/*@end@*/) {
      window.attachEvent("load", rewriteHover());
}

// ******************
// Fix margin error 
// ******************

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels, '')
        },
 
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
};
 
function DoubleMargin() {
	$(':regex(css:float, left|right)').css('display', 'inline');
}

// Use expression only evaluated as true in pre-IE9

if ((!+"\v1") ? true : false)
    DoubleMargin();