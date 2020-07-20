/*memory match*/
/*
document.getElementById("play").addEventListener("click", function() {
var mmstartmessage = document.getElementById("customstartmessage").textContent;
document.getElementById("play").textContent = mmstartmessage;
var mm0 = document.getElementsByClassName("mmtable").item(0);
var mm1 = document.getElementsByClassName("mmtable").item(1);
var mm2 = document.getElementsByClassName("mmtable").item(2);
var mm3 = document.getElementsByClassName("mmtable").item(3);
var mm4 = document.getElementsByClassName("mmtable").item(4);
var mm5 = document.getElementsByClassName("mmtable").item(5);
var mm6 = document.getElementsByClassName("mmtable").item(6);
var mm7 = document.getElementsByClassName("mmtable").item(7);
var mm8 = document.getElementsByClassName("mmtable").item(8);
var mm9 = document.getElementsByClassName("mmtable").item(9);
var mm10 = document.getElementsByClassName("mmtable").item(10);
var mm11 = document.getElementsByClassName("mmtable").item(11);
var mm12 = document.getElementsByClassName("mmtable").item(12);
var mm13 = document.getElementsByClassName("mmtable").item(13);
var mm14 = document.getElementsByClassName("mmtable").item(14);
var mm15 = document.getElementsByClassName("mmtable").item(15);
var mmarray = [mm0, mm1, mm2, mm3, mm4, mm5, mm6, mm7, mm8, mm9, mm10, mm11, mm12, mm13, mm14, mm15];
var matches = 0;
var a1, a2, a3;
  for (a1 = mmarray.length -1; a1 > 0; a1--) {
    a2 = Math.floor(Math.random() * a1);
    a3 = mmarray[a1];
    mmarray[a1] = mmarray[a2];
    mmarray[a2] = a3;
    }
var custom1 = ["https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/7/7b/RJ.png/revision/latest?cb=20200403234452","https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/e/e9/Ticket_symbol.png/revision/latest?cb=20200403234843", "https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/e/ed/Jelly_Beans.png/revision/latest?cb=20200403235007", "https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/7/77/Night_Bell.png/revision/latest?cb=20200403235230", "https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/0/07/CloudVial.png/revision/latest?cb=20200403235225", "https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/b/b9/Red_Extract.png/revision/latest?cb=20200403235013", "https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/4/45/MagicBean.png/revision/latest?cb=20200403235217", "https://vignette.wikia.nocookie.net/bee-swarm-simulator/images/c/ca/Gumdrops-1.png/revision/latest?cb=20191008165937"]
var customtrue = document.getElementById("customrewards").textContent;
if (customtrue == "true") {
var custom = document.getElementById("custom1").textContent;
var custom1 = custom.split(",");
}
mmarray[0].addEventListener("click", function() {
mmarray[0].innerHTML = '<img id="img1" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 0;
document.getElementById("img1").src = custom1[0];
});
mmarray[1].addEventListener("click", function() {
mmarray[1].innerHTML = '<img id="img2" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 1;
document.getElementById("img2").src = custom1[0];
});
mmarray[2].addEventListener("click", function() {
mmarray[2].innerHTML = '<img id="img3" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 2;
document.getElementById("img3").src = custom1[1];
});
mmarray[3].addEventListener("click", function() {
mmarray[3].innerHTML = '<img id="img4" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 3;
document.getElementById("img4").src = custom1[1];
});
mmarray[4].addEventListener("click", function() {
mmarray[4].innerHTML = '<img id="img5" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 4;
document.getElementById("img5").src = custom1[2];
});
mmarray[5].addEventListener("click", function() {
mmarray[5].innerHTML = '<img id="img6" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 5;
document.getElementById("img6").src = custom1[2];
});
mmarray[6].addEventListener("click", function() {
mmarray[6].innerHTML = '<img id="img7" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 6;
document.getElementById("img7").src = custom1[3];
});
mmarray[7].addEventListener("click", function() {
mmarray[7].innerHTML = '<img id="img8" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 7;
document.getElementById("img8").src = custom1[3];
});
mmarray[8].addEventListener("click", function() {
mmarray[8].innerHTML = '<img id="img9" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 8;
document.getElementById("img9").src = custom1[4];
});
mmarray[9].addEventListener("click", function() {
mmarray[9].innerHTML = '<img id="img10" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 9;
document.getElementById("img10").src = custom1[4];
});
mmarray[10].addEventListener("click", function() {
mmarray[10].innerHTML = '<img id="img11" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 10;
document.getElementById("img11").src = custom1[5];
});
mmarray[11].addEventListener("click", function() {
mmarray[11].innerHTML = '<img id="img12" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 11;
document.getElementById("img12").src = custom1[5];
});
mmarray[12].addEventListener("click", function() {
mmarray[12].innerHTML = '<img id="img13" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 12;
document.getElementById("img13").src = custom1[6];
});
mmarray[13].addEventListener("click", function() {
mmarray[13].innerHTML = '<img id="img14" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 13;
document.getElementById("img14").src = custom1[6];
});
mmarray[14].addEventListener("click", function() {
mmarray[14].innerHTML = '<img id="img15" src="" height="50" width="50"/>';
document.getElementById("name1").textContent = 14;
document.getElementById("img15").src = custom1[7];
});
mmarray[15].addEventListener("click", function() {
mmarray[15].innerHTML = '<img id="img16" src="" height="50" width="50"/>';
document.getElementById("name2").textContent = 15;
document.getElementById("img16").src = custom1[7];
});
 
document.getElementById("matchcount").addEventListener("click", function() {
matches++;
if (matches % 2 == 0){
  var match1 = document.getElementById("name1").textContent;
  var match2 = document.getElementById("name2").textContent;
    if (match1 == (match2 - 1)) {
    mmarray[match1] = "";
    mmarray[match2] = "";
}
if (mmarray == ",,,,,,,,,,,,,,,") {
      var winmessage = document.getElementById("custommessage").textContent;
      document.getElementById("winmessage").textContent = winmessage;
}
    else {
      var matchcounter = setTimeout(reset, 500);
      function reset() {
      document.getElementById("name1").textContent = "";
      document.getElementById("name2").textContent = "";
      var i;
      for (i = 0; i < mmarray.length; i++) {
        mmarray[i].innerHTML = "?";
}
}
}
}
});
});

*/