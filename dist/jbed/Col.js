<script>
var a;
if(document.currentScript) a = document.currentScript.parentElement;
else {
  a = (document.getElementById("EditPageDialog") || document.getElementById("mw-content-text")).getElementsByClassName("col-container");
  a = a[a.length-1];
}
var colcont = a.getElementsByClassName("col-set")[0];
var pTags = colcont.getElementsByTagName("p");
for(var i = 0; i < pTags.length; i++) {
    if(pTags[i].innerHTML.startsWith("|-|")) {
        var tN = document.createTextNode(pTags[i].innerHTML);
        pTags[i].parentNode.insertBefore(tN, pTags[i]);
        pTags[i].parentNode.removeChild(pTags[i]);
    }
}
var cols = colcont.innerHTML.split("\n|-|");
for(var i = 0; i < cols.length; i++) {
    if(cols[i].trim()=="") {
        cols.splice(i, 1);
        i--;
        continue;
    }
    var colAttr = "";
    if(cols[i].indexOf("|")!= -1) if(cols[i].indexOf("|") < cols[i].indexOf("\n")) {
        cols[i] = cols[i].split("|");
        colAttr = " " + cols[i].shift();
        cols[i] = cols[i].join("|");
    }
    cols[i] = '<div' + colAttr + '>' + cols[i] + '</div>';
}

var c = a.getElementsByClassName("data-pass")[0];
c = {
  start: c.getAttribute("data-start"),
  reversed: c.getAttribute("data-reversed")!= "@NO",
  type: c.getAttribute("data-type")
};

colcont.innerHTML = cols.join("") + '<div style="clear:both"></div>';
colcont.className = "col" + cols.length;
</script>