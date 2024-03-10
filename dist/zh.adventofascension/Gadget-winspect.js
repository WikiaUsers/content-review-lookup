//W-Inspector.js beta
//Licensed under Apache 2.0 License
//Page at https://github.com/webcirque/mediawiki/blob/master/W-Inspect.js
//This is in the beta cycle, so problems might occur!
//W-Inspector.js beta
//Licensed under Apache 2.0 License
//Page: https://github.com/webcirque/mediawiki/blob/master/W-Inspect.js
var inspectorReg, inspectorUnreg, inspectorRegistered, inspectorHover, inspectorMoveOut, inspectorScan;
var inspectorBox = document.createElement("div");
var inspectorBct = document.getElementById("bodyContent");
try {
 // Webcirque Inspector Info Box
 let wiib = inspectorBox;
 let bct = inspectorBct;
 document.getElementById("bodyContent").prepend(wiib);
 wiib.className = "dev-js-infobox";
 wiib.innerHTML = "W-Inspector.js is now idle.";
 inspectorReg = function (scanOrFetch) {
  inspectorBct.className += " dev-back-enabled";
  inspectorRegistered = true;
  inspectorBox.innerHTML = "W-Inspector.js is now active.";
  Array.from(inspectorBct.children).forEach((e,i) => {
   if (e.className.indexOf("dev-js-infobox") == -1) {
   e.addEventListener("mouseover", inspectorHover, true);
   e.addEventListener("mouseout", inspectorMoveOut, true);
   Array.from(e.children).forEach((e) => {
    e.addEventListener("mouseover", inspectorHover, true);
    e.addEventListener("mouseout", inspectorMoveOut, true);
    Array.from(e.children).forEach((e) => {
     e.addEventListener("mouseover", inspectorHover, true);
     e.addEventListener("mouseout", inspectorMoveOut, true);
     Array.from(e.children).forEach((e) => {
      e.addEventListener("mouseover", inspectorHover, true);
      e.addEventListener("mouseout", inspectorMoveOut, true);
      Array.from(e.children).forEach((e) => {
       e.addEventListener("mouseover", inspectorHover, true);
       e.addEventListener("mouseout", inspectorMoveOut, true);
       Array.from(e.children).forEach((e) => {
        e.addEventListener("mouseover", inspectorHover, true);
        e.addEventListener("mouseout", inspectorMoveOut, true);
        Array.from(e.children).forEach((e) => {
         e.addEventListener("mouseover", inspectorHover, true);
         e.addEventListener("mouseout", inspectorMoveOut, true);
        });
       });
      });
     });
    });
   });
   }
  });
 };
 inspectorUnreg = function () {
  inspectorBct.className = bct.className.replace(" dev-back-enabled", "");
  inspectorRegistered = false;
  inspectorBox.innerHTML = "W-Inspector.js is now idle.";
  Array.from(inspectorBct.children).forEach((e) => {
   e.removeEventListener("mouseover", inspectorHover, true);
   e.removeEventListener("mouseout", inspectorMoveOut, true);
   Array.from(e.children).forEach((e) => {
    e.removeEventListener("mouseover", inspectorHover, true);
    e.removeEventListener("mouseout", inspectorMoveOut, true);
    Array.from(e.children).forEach((e) => {
     e.removeEventListener("mouseover", inspectorHover, true);
     e.removeEventListener("mouseout", inspectorMoveOut, true);
     Array.from(e.children).forEach((e) => {
      e.removeEventListener("mouseover", inspectorHover, true);
      e.removeEventListener("mouseout", inspectorMoveOut, true);
      Array.from(e.children).forEach((e) => {
       e.removeEventListener("mouseover", inspectorHover, true);
       e.removeEventListener("mouseout", inspectorMoveOut, true);
        Array.from(e.children).forEach((e) => {
        e.removeEventListener("mouseover", inspectorHover, true);
        e.removeEventListener("mouseout", inspectorMoveOut, true);
        Array.from(e.children).forEach((e) => {
         e.removeEventListener("mouseover", inspectorHover, true);
         e.removeEventListener("mouseout", inspectorMoveOut, true);
        });
       });
      });
     });
    });
   });
  });
 };
 inspectorHover = function (event) {
  let content = "";
  let cssdec = getComputedStyle(this);
  try {
  content += "Mouse position: client($5,$6) offset($3,$4) page($1,$2)<br/>"
   .replace("$1",event.pageX)
   .replace("$2",event.pageY)
   .replace("$3",event.offsetX)
   .replace("$4",event.offsetY)
   .replace("$5",event.x)
   .replace("$6",event.y);
  content += "Element basic properties: tagname($3) id($1) class($2) tabindex($4) contentEditable($5)<br/>"
   .replace("$1",this.id)
   .replace("$2",this.className.toLowerCase())
   .replace("$3",this.tagName.toLowerCase())
   .replace("$4",this.tabIndex)
   .replace("$5",this.contentEditable);
  content += "Element position properties: size(w:$1 h:$2) position($11 t:$12 r:$13 b:$14 l:$15) margin(t:$3 r:$4 b:$5 l:$6) padding(t:$7 r:$8 b:$9 l:$10)<br/>"
   .replace("$1",cssdec.width)
   .replace("$2",cssdec.height)
   .replace("$3",cssdec.marginTop)
   .replace("$4",cssdec.marginRight)
   .replace("$5",cssdec.marginBottom)
   .replace("$6",cssdec.marginLeft)
   .replace("$7",cssdec.paddingTop)
   .replace("$8",cssdec.paddingRight)
   .replace("$9",cssdec.paddingBottom)
   .replace("$10",cssdec.paddingLeft)
   .replace("$11",cssdec.position)
   .replace("$12",cssdec.top)
   .replace("$13",cssdec.right)
   .replace("$14",cssdec.bottom)
   .replace("$15",cssdec.left);
  if (this.src || this.href) {
   content += "<div class=\"flexbox\"><div class=\"noflex\">Link to this resource: </div><div> $1</div></div>"
   .replace("$1",this.src || this.href);
  }
  } catch (e) {
   alert(e.stack);
  }
  inspectorBox.innerHTML = content;
 };
 inspectorMoveOut = function () {
  inspectorBox.innerHTML = "W-Inspector.js is now active.";
 };
 wiib.addEventListener("click", function () {
  if (window.inspectorRegistered) {
   inspectorUnreg();
  } else {
   inspectorReg();
  };
 });
} catch (err) {
 alert(err.stack);
}