/* PIE autoloader & margin fixer 0.2 ~ Call it at the end of your html pages */
// IE version tester
function ie(v) 
{ 
  return(navigator.userAgent.indexOf("MSIE " + v) != -1);
}

// CSS property tester
function css(e, p)
{
  // Test current style
  if(e.currentStyle)
  {
    return e.currentStyle[p];
  }
  // Test computed style
  if(window.getComputedStyle)
  {
    return document.defaultView.getComputedStyle(e, null).getPropertyValue(p);
  }
  return undefined;
}

// CSS class tester
function hasClass(e, c)
{
  return e.className.indexOf(c) != -1;
}

// PIE autoloader
(function()
{
  // Offset to apply to all the elements on IE < 8 in case of margin-top
  offset = 0;
  
  // If PIE is loaded and the browser is IE 6 - 9
  if(window.PIE && (ie(6) || ie(7) || ie(8) || ie(9)))
  {
    for(i = 0; i < document.all.length; i++)
    {
      e = document.all[i];
      if
      (
        // If the class "nopie" is not present
        !hasClass(e, "nopie") &&
        (
          // If the class "pie" is present
          hasClass(e, "pie")

          // If a border-radius or box-shadow is set on IE < 9
          || !ie(9) && (css(e, 'border-radius') != undefined || css(e, 'box-shadow') != undefined)

          // If a -pie-background is set (or pie-background for IE6)
          || (css(e, '-pie-background') != undefined)) || (ie(6) && css(e, 'pie-background') != undefined)

          // If a border-image is set
          || (css(e, 'border-image') != undefined)
      )
      {
        // Attach PIE
        PIE.attach(e);

        // On IE < 8
        if(ie(6) || ie(7))
        {
          // Get margin
          m = e.currentStyle["margin"];

           // If it's defined and doesn't start with a "0" (0px * * *, 0% * * *, 0em * * *, ...)
          if(m != "auto" && m != undefined && m.charAt(0) != '0' && m.charAt(0) != 'a')
          {
            space = m.indexOf(" ");
            mt = m.substr(0, space-2);
            offset += Math.round(mt);
          }
        }
      }

      // Apply offset if > 0 and if it's not a PIE element
      // TODO: apply offset only to elements of the same depth in the DOM
      if(offset.toString().charAt(0) > 0 && e.tagName != "background" && e.tagName != "group1" && e.tagName != "group2" && e.tagName != "shape" && e.tagName != "fill" && e.tagName != "border" && e.tagName != "stroke" && e.tagName != "outset-box-shadow" && e.tagName != "border-image" && e.tagName != "rect" && e.tagName != "imagedata" && e.tagName != "ie6-mask")
      {
        e.style.position = "relative";
        e.style.top = mt + "px";
      }
    }
  }
})();