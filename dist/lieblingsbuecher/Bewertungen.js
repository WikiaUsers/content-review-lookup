/* STERNEBEWERTUNG */
 
verbatim = document.getElementsByTagName('div');
for (i=0; i < verbatim.length; i++) {
  if(verbatim[i].classList.contains("Verbatim")){
    switch(verbatim[i].getAttribute("data-Code")){
      case "Stern": Code = '<iframe style="height:50px; width:100%;" id="pageBPbewertung" name="page" src="http://websynthesis.org/tools/stars/iframe.php?quantity=6&color=002060&img1=&img2=&name=BPbewertung" frameborder="0" scrolling="no"></iframe><script type="text/javascript" src="http://websynthesis.org/tools/stars/js.php?id=BPbewertung"></script>'; break;
    }
    verbatim[i].innerHTML = "";
    $(Code).appendTo(verbatim[i]).css({ });
  }
}