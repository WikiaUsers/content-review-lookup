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

<!-- End of EA, Start of PA --!>

var parate="";
var panum;
if (pa<56)
  {
  parate="Weak";
  panum=1;
  }
else if (pa<61)
  {
  parate="Semi-Moderate";
  panum=2;
  }
else if (pa<70)
  {
  parate="Moderate";
  panum=3;
  }
else if (pa<76)
  {
  parate="Semi-Strong";
  panum=4;
  }
else if (pa<81)
  {
  parate="Strong";
  panum=5;
  }
else if (pa<86)
  {
  parate="Semi-Max";
  panum=6;
  }
else if (pa<91)
  {
  parate="Max";
  panum=7;
  }
else if (pa<96)
  {
  parate="Semi-Elite";
  panum=8;
  }
else if (pa<131)
  {
  parate="Elite";
  panum=9;
  }
else if (pa<141)
  {
  parate="Semi-Beast";
  panum=10;
  }
else if (pa>141)
  {
  parate="Beast";
  panum=11;
  }

<!-- End of PA, Start of ED --!>

var edrate="";
var ednum;
if (ed<61)
  {
  edrate="Weak";
  ednum=1;
  }
else if (ed<70)
  {
  edrate="Semi-Moderate";
  ednum=2;
  }
else if (ed<76)
  {
  edrate="Moderate";
  ednum=3;
  }
else if (ed<81)
  {
  edrate="Semi-Strong";
  ednum=4;
  }
else if (ed<91)
  {
  edrate="Strong";
  ednum=5;
  }
else if (ed<96)
  {
  edrate="Semi-Max";
  ednum=6;
  }
else if (ed<101)
  {
  edrate="Max";
  ednum=7;
  }
else if (ed<106)
  {
  edrate="Semi-Elite";
  ednum=8;
  }
else if (ed<136)
  {
  edrate="Elite";
  ednum=9;
  }
else if (ed<151)
  {
  edrate="Semi-Beast";
  ednum=10;
  }
else if (ed>151)
  {
  edrate="Beast";
  ednum=11;
  }

<!-- End of ED, Start of PD --!>

var pdrate="";
var pdnum;
if (pd<61)
  {
  pdrate="Weak";
  pdnum=1;
  }
else if (pd<70)
  {
  pdrate="Semi-Moderate";
  pdnum=2;
  }
else if (pd<76)
  {
  pdrate="Moderate";
  pdnum=3;
  }
else if (pd<81)
  {
  pdrate="Semi-Strong";
  p=4;
  }
else if (pd<91)
  {
  pdrate="Strong";
  pdnum=5;
  }
else if (pd<96)
  {
  pdrate="Semi-Max";
  pdnum=6;
  }
else if (pd<101)
  {
  pdrate="Max";
  pdnum=7;
  }
else if (pd<106)
  {
  pdrate="Semi-Elite";
  pdnum=8;
  }
else if (pd<136)
  {
  pdrate="Elite";
  pdnum=9;
  }
else if (pd<151)
  {
  pdrate="Semi-Beast";
  pdnum=10;
  }
else if (pd>151)
  {
  pdrate="Beast";
  pdnum=11;
  }

var hier;
if (hpnum>9 && spnum>9 && eanum>9 && panum>9 && ednum>9 && pdnum>9)
  {
  hier = "is a Perfectionist"
  }
else if(hpnum>4 && spnum>4 && eanum>4 && panum>4 && ednum>4 && pdnum>4)
  {
  hier = "is Balanced"
  }
else if(spnum>6 && eanum>7 && panum>7)
  {
  hier = "is a Dual Sniper"
  }
else if (eanum>8 && panum>8)
  {
  hier = "is a Sweeper"
  }
else if (spnum>6 && panum>8)
  {
  hier = "is a PA Sniper"
  }
else if (spnum>6 && eanum>8)
  {
  hier = "is a EA Sniper"
  }
else if (eanum>9)
  {
  hier = "is an EA Nuker"
  }
else if (panum>9)
  {
  hier = "is a PA Nuker"
  }
else
  {
  hier = "does not have a hierarchy"
  }


var hier1;
if (hpnum>8 && ednum>9 && pdnum>9)
  {
  hier1 = "is a Dual Tanker"
  }
else if (hpnum>7 && ednum>9)
  {
  hier1 = "is an ED Tanker"
  }
else if (hpnum>7 && pdnum>9)
  {
  hier1 = "is a PD Tanker"
  }
else if (spnum>6 && eanum>8)
  {
  hier1 = "is a EA Sniper"
  }
else
  {
  hier1 = "does not have a hierarchy"
  }







    var print1= "HP is ";
    
    var print2 = "Speed is ";
   
    var print3 = "EA is ";
        
    var print4 = "PA is ";

    var print5 = "ED is ";

    var print6 = "PD is ";

    document.getElementById('result').innerHTML = print1 + hprate + "<br />" + print2 + sprate + "<br />" + print3 + earate + "<br />" + print4 + parate + "<br />" + print5 + edrate + "<br />" + print6 + pdrate + "<br />" + "This crit's Attack " + hier + " and its Defense " + hier1;

 });