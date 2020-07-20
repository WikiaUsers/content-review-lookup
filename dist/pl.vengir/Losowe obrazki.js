var tlaOstatniejAktywnosci = {
1: "https://images.wikia.nocookie.net/__cb20140422201822/vengir/pl/images/b/b5/Jesie%C5%84_Placeholder.png",
2: "https://images.wikia.nocookie.net/__cb20140422201811/vengir/pl/images/9/92/Lato_Placeholder.png",
3: "https://images.wikia.nocookie.net/__cb20140422201757/vengir/pl/images/a/ae/Wiosna_Placeholder.png",
4: "https://images.wikia.nocookie.net/__cb20140422210333/vengir/pl/images/thumb/9/97/Baner_FGE.png/212px-Baner_FGE.png",
5: "https://images.wikia.nocookie.net/__cb20140214100043/vengir/pl/images/7/7c/Avatar.png",
6: "https://images.wikia.nocookie.net/__cb20140422104855/vengir/pl/images/thumb/4/4c/250px-My_Little_Pony_G4_logo.svg.png/212px-250px-My_Little_Pony_G4_logo.svg.png",
};

/*$("#WikiaRecentActivity").attr("style")

$("#WikiaRecentActivity").html()!==undefined


var myVar=setInterval(function(){myTimer()},1000);
function myTimer()
{
var d=new Date();
var t=d.toLocaleTimeString();
document.getElementById("demo").innerHTML=t;
}
function myStopFunction()
{
clearInterval(myVar);
}*/

function testObecnosciOA()
{
if ($("#WikiaRecentActivity").html()==undefined) {
  testObecnosciOA();
  }
else {$("#WikiaRecentActivity").attr("style","background-image:url('" + tlaOstatniejAktywnosci[Math.floor((Math.random() * 6) + 1)] + "')");
}
};
/*
function podmianaTlaOA()
{
$("#WikiaRecentActivity").attr("style","background-image:url('" + tlaOstatniejAktywnosci[Math.floor((Math.random() * 6) + 1)] + "')");
}*/