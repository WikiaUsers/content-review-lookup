<script>
var a;
if(document.currentScript) a = document.currentScript.parentElement;
else {
  a = (document.getElementById("EditPageDialog") || document.getElementById("mw-content-text")).getElementsByClassName("ol-container");
  a = a[a.length-1];
}
var b = a.getElementsByTagName("ol");
while(b.length > 0) {
  var c = b[b.length-1].children;
  while(c.length > 0) {
    b[b.length-1].parentElement.insertBefore(c[c.length-1], b[b.length-1].nextElementSibling);
  }
  b[b.length-1].remove();
}
var c = a.getElementsByClassName("data-pass")[0];
c = {
  start: c.getAttribute("data-start"),
  reversed: c.getAttribute("data-reversed")!= "@NO",
  type: c.getAttribute("data-type")
};
if(c.type!= "") a.setAttribute("style", "list-style-type: " + c.type);
if(c.reversed) {
  a.setAttribute("reversed", true);
  a.setAttribute("start", (c.start!= ""? parseInt(c.start): 1) + a.getElementsByTagName("li").length-1);
} else {
  if(c.start!= "") a.setAttribute("start", c.start);
}
</script>