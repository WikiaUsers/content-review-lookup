$(".submit").live("click", function() {
    var hp = Number($(".hp").val());
    var sp = Number($(".sp").val());
    var ea = Number($(".ea").val());
    var pa = Number($(".pa").val());
    var ed = Number($(".ed").val());
    var pd = Number($(".pd").val());

var hprate="";
var hpnum;
if (hp<106)
  {
  hprate="Weak";
  hpnum=1;
  }
else if (hp<111)
  {
  hprate="Semi-Moderate";
  hpnum=2;
  }
else if (hp<116)
  {
  hprate="Moderate";
  hpnum=3;
  }
else if (hp<121)
  {
  hprate="Semi-Strong";
  hpnum=4;
  }
else if (hp<126)
  {
  hprate="Strong";
  hpnum=5;
  }
else if (hp<131)
  {
  hprate="Semi-Max";
  hpnum=6;
  }
else if (hp<141)
  {
  hprate="Max";
  hpnum=7;
  }
else if (hp<146)
  {
  hprate="Semi-Elite";
  hpnum=8;
  }
else if (hp<156)
  {
  hprate="Elite";
  hpnum=9;
  }
else if (hp<161)
  {
  hprate="Semi-Beast";
  hpnum=10;
  }
else if (hp>161)
  {
  hprate="Beast";
  hpnum=11;
  }
<!-- End of HP, Start of Speed --!>

var sprate="";
var spnum;
if (sp<55)
  {
  sprate="Weak";
  spnum=1;
  }
else if (sp<61)
  {
  sprate="Semi-Moderate";
  spnum=2;
  }
else if (sp<66)
  {
  sprate="Moderate";
  spnum=3;
  }
else if (sp<71)
  {
  sprate="Semi-Strong";
  spnum=4;
  }
else if (sp<76)
  {
  sprate="Strong";
  spnum=5;
  }
else if (sp<81)
  {
  sprate="Semi-Max";
  spnum=6;
  }
else if (sp<86)
  {
  sprate="Max";
  spnum=7;
  }
else if (sp<90)
  {
  sprate="Semi-Elite";
  spnum=8;
  }
else if (sp<96)
  {
  sprate="Elite";
  spnum=9;
  }
else if (sp<101)
  {
  sprate="Semi-Beast";
  spnum=10;
  }
else if (sp>101)
  {
  sprate="Beast";
  spnum=11;
  }

<!-- End of Speed, Start of EA --!>

var earate="";
var eanum;
if (ea<56)
  {
  earate="Weak";
  eanum=1;
  }
else if (ea<61)
  {
  earate="Semi-Moderate";
  eanum=2;
  }
else if (ea<70)
  {
  earate="Moderate";
  eanum=3;
  }
else if (ea<76)
  {
  earate="Semi-Strong";
  eanum=4;
  }
else if (ea<81)
  {
  earate="Strong";
  eanum=5;
  }
else if (ea<86)
  {
  earate="Semi-Max";
  eanum=6;
  }
else if (ea<91)
  {
  earate="Max";
  eanum=7;
  }
else if (ea<96)
  {
  earate="Semi-Elite";
  eanum=8;
  }
else if (ea<131)
  {
  earate="Elite";
  eanum=9;
  }
else if (ea<141)
  {
  earate="Semi-Beast";
  eanum=10;
  }
else if (ea>141)
  {
  earate="Beast";
  eanum=11;
  }














    var print1= "HP is ";
    
    var print2 = "Speed is ";
   
    var print3 = "EA is ";
        
    var print4 = "PA is ";

    var print5 = "ED is ";

    var print6 = "PD is ";

    document.getElementById('result').innerHTML = print1 + hprate + "<br />" + print2 + sprate + "<br />" + print3 + earate + "<br />" + print4 + "<br />" + print5 + "<br />" + print6;

 });