var damageCalculatorDivs,text1,span1,i,div2,div3,div4,div5,div6,div7,div8,br2,yourHealth, enemyHealth,baseDamage, criticalDamage, glancingDamage;
damageCalculatorDivs =  xpath("//div[@class='damagecalculator']");
if (damageCalculatorDivs.snapshotLength > 0) {
createMenu(damageCalculatorDivs.snapshotItem(0),"Your unit","damageyourunit");
text1=document.createTextNode(" VS ");
span1 =document.createElement("span");
span1.appendChild(text1);
damageCalculatorDivs.snapshotItem(0).appendChild(span1);
createMenu(damageCalculatorDivs.snapshotItem(0),"Enemy unit","damageenemyunit");
br2 = document.createElement("br");
div2 =document.createElement("div");
div2.className="damageunit";
div2.id="damageyourunit";
div3 =document.createElement("div");
div3.className="damageunit";
div3.id="damageenemyunit";


div4 =document.createElement("div");
div4.className="damageresult";
div4.id="damageresult";

div5 =document.createElement("div");
div5.className="damageframe";
div5.id="damageyourframe";

div6 =document.createElement("div");
div6.className="damageframe";
div6.id="damageenemyframe";

div7 =document.createElement("div");
div7.className="damagestat";
div7.id="damageyourunitstat";

div8 =document.createElement("div");
div8.className="damagestat";
div8.id="damageenemyunitstat";

damageCalculatorDivs.snapshotItem(0).appendChild(br2);

damageCalculatorDivs.snapshotItem(0).appendChild(div5);
damageCalculatorDivs.snapshotItem(0).appendChild(div6);
div5.appendChild(div2);
div6.appendChild(div3);
div5.appendChild(div7);
div6.appendChild(div8);
damageCalculatorDivs.snapshotItem(0).appendChild(div4);
}

function createMenu(damageCalculatorDiv,title0,divid0){
var j, ul1, li1, text1,  dataSoldiers, healthSoldiers, imgSoldiers,costSoldiers, dataSoldiers, healthArtillery, imgArtillery,costArtillery, dataTank, healthTank, imgTank,costTank, dataFighter, healthFighter, imgFighter,costFighter, dataAirship, healthAirship, imgAirship,costAirship, dataBomber, healthBomber, imgBomber,costBomber, dataGunboat, healthGunboat, imgGunboat,costGunboat, dataCarrier, healthCarrier, imgCarrier,costCarrier, dataBattleship, healthBattleship, imgBattleship,costBattleship, dataSupport, healthSupport, imgSupport,costSupport;


console.log('new damage calc');
  ul1 =document.createElement("ul");
  li1 =document.createElement("li");
  text1=document.createTextNode(title0);
  
  li1.appendChild(text1);
  ul1.appendChild(li1);


dataSoldiers =  xpath("//div[@id='dataall']//ul[li[2]='Soldiers']/li[1]");
imgSoldiers =  xpath("//div[@id='dataall']//ul[li[2]='Soldiers']/li[4]/a[1]");
healthSoldiers =  xpath("//div[@id='dataall']//ul[li[2]='Soldiers']/li[3]");
costSoldiers =  xpath("//div[@id='dataall']//ul[li[2]='Soldiers']/li[6]");

dataArtillery =  xpath("//div[@id='dataall']//ul[li[2]='Artillery']/li[1]");
imgArtillery =  xpath("//div[@id='dataall']//ul[li[2]='Artillery']/li[4]/a[1]");
healthArtillery =  xpath("//div[@id='dataall']//ul[li[2]='Artillery']/li[3]");
costArtillery =  xpath("//div[@id='dataall']//ul[li[2]='Artillery']/li[6]");

dataTank =  xpath("//div[@id='dataall']//ul[li[2]='Tank']/li[1]");
imgTank =  xpath("//div[@id='dataall']//ul[li[2]='Tank']/li[4]/a[1]");
healthTank =  xpath("//div[@id='dataall']//ul[li[2]='Tank']/li[3]");
costTank =  xpath("//div[@id='dataall']//ul[li[2]='Tank']/li[6]");

dataFighter =  xpath("//div[@id='dataall']//ul[li[2]='Fighter']/li[1]");
imgFighter =  xpath("//div[@id='dataall']//ul[li[2]='Fighter']/li[4]/a[1]");
healthFighter =  xpath("//div[@id='dataall']//ul[li[2]='Fighter']/li[3]");
costFighter =  xpath("//div[@id='dataall']//ul[li[2]='Fighter']/li[6]");

dataAirship =  xpath("//div[@id='dataall']//ul[li[2]='Airship']/li[1]");
imgAirship =  xpath("//div[@id='dataall']//ul[li[2]='Airship']/li[4]/a[1]");
healthAirship =  xpath("//div[@id='dataall']//ul[li[2]='Airship']/li[3]");
costAirship =  xpath("//div[@id='dataall']//ul[li[2]='Airship']/li[6]");

dataBomber =  xpath("//div[@id='dataall']//ul[li[2]='Bomber']/li[1]");
imgBomber =  xpath("//div[@id='dataall']//ul[li[2]='Bomber']/li[4]/a[1]");
healthBomber =  xpath("//div[@id='dataall']//ul[li[2]='Bomber']/li[3]");
costBomber =  xpath("//div[@id='dataall']//ul[li[2]='Bomber']/li[6]");

dataGunboat =  xpath("//div[@id='dataall']//ul[li[2]='Gunboat']/li[1]");
imgGunboat =  xpath("//div[@id='dataall']//ul[li[2]='Gunboat']/li[4]/a[1]");
healthGunboat =  xpath("//div[@id='dataall']//ul[li[2]='Gunboat']/li[3]");
costGunboat =  xpath("//div[@id='dataall']//ul[li[2]='Gunboat']/li[6]");

dataCarrier =  xpath("//div[@id='dataall']//ul[li[2]='Carrier']/li[1]");
imgCarrier =  xpath("//div[@id='dataall']//ul[li[2]='Carrier']/li[4]/a[1]");
healthCarrier =  xpath("//div[@id='dataall']//ul[li[2]='Carrier']/li[3]");
costCarrier =  xpath("//div[@id='dataall']//ul[li[2]='Carrier']/li[6]");

dataBattleship =  xpath("//div[@id='dataall']//ul[li[2]='Battleship']/li[1]");
imgBattleship =  xpath("//div[@id='dataall']//ul[li[2]='Battleship']/li[4]/a[1]");
healthBattleship =  xpath("//div[@id='dataall']//ul[li[2]='Battleship']/li[3]");
costBattleship =  xpath("//div[@id='dataall']//ul[li[2]='Battleship']/li[6]");

dataSupport =  xpath("//div[@id='dataall']//ul[li[2]='Support']/li[1]");
imgSupport =  xpath("//div[@id='dataall']//ul[li[2]='Support']/li[4]/a[1]");
healthSupport =  xpath("//div[@id='dataall']//ul[li[2]='Support']/li[3]");
costSupport =  xpath("//div[@id='dataall']//ul[li[2]='Support']/li[6]");

console.log('Soldiers');
  insertMenu(dataSoldiers, imgSoldiers,healthSoldiers,costSoldiers, ul1,"Soldiers",divid0);
console.log('Artillery');
  insertMenu(dataArtillery, imgArtillery,healthArtillery,costArtillery, ul1,"Artillery",divid0);
console.log('Tank');
  insertMenu(dataTank, imgTank,healthTank,costTank, ul1,"Tank",divid0);
console.log('Fighter');
  insertMenu(dataFighter, imgFighter,healthFighter,costFighter, ul1,"Fighter",divid0);
console.log('Airship');
  insertMenu(dataAirship, imgAirship,healthAirship,costAirship, ul1,"Airship",divid0);
console.log('Bomber');
  insertMenu(dataBomber, imgBomber,healthBomber,costBomber, ul1,"Bomber",divid0);
console.log('Gunboat');
  insertMenu(dataGunboat, imgGunboat,healthGunboat,costGunboat, ul1,"Gunboat",divid0);
console.log('Carrier');
  insertMenu(dataCarrier, imgCarrier,healthCarrier,costCarrier, ul1,"Carrier",divid0);
console.log('Battleship');
  insertMenu(dataBattleship, imgBattleship,healthBattleship,costBattleship, ul1,"Battleship",divid0);
console.log('Support');
  insertMenu(dataSupport, imgSupport,healthSupport,costSupport, ul1,"Support",divid0);

console.log('Done init');

  damageCalculatorDiv.appendChild(ul1);

}



function insertMenu(data1,img1, health1, cost1, ul1,text0,divid0){
  var j, li1,li2,li3,text1,ul2,ul3,a1,a2,a3;

 li1 =document.createElement("li");
 a1 =document.createElement("a");

  text1=document.createTextNode(text0);
  a1.appendChild(text1);
 a1.href="#"; 
    a1.onclick= function(){};

  li1.appendChild(a1);
  ul2 =document.createElement("ul");



  for(j=0;j < data1.snapshotLength; j++) {
    li2 =document.createElement("li");
    a2 =document.createElement("a");
    a2.innerHTML = data1.snapshotItem(j).innerHTML;
    a2.href="#"; 
    a2.onclick = function(j,data1,img1,health1,cost1,divid0){return function(){displayUnit(document.getElementById(divid0),data1.snapshotItem(j),img1.snapshotItem(j),health1.snapshotItem(j),cost1.snapshotItem(j));};}(j,data1,img1,health1,cost1,divid0);
  
    li2.appendChild(a2);


    ul3 =document.createElement("ul");
    li3 =document.createElement("li");
    
    a3 =document.createElement("a");
    a3.innerHTML = img1.snapshotItem(j).innerHTML;
     a3.href="#"; 
    a3.onclick = a2.onclick;
    li3.appendChild(a3);
    ul3.appendChild(li3);
    li2.appendChild(ul3);
    ul2.appendChild(li2);
    
  }

 li1.appendChild(ul2);
  ul1.appendChild(li1);

}

function displayUnit(div1,data,img,health,cost){
var stat1;
div1.innerHTML = img.innerHTML;
//div4.innerHTML = health.innerHTML;
if (div1 == div2){
yourHealth = health.innerHTML;
stat1 = div7;
} else {
enemyHealth = health.innerHTML;
stat1 = div8;

}
stat1.innerHTML = "Cost: " + cost.innerHTML +
 "<br />Health: " + health.innerHTML;
 if (yourHealth != null && enemyHealth !=null){

if (yourHealth == enemyHealth){
baseDamage = Math.round(0.25 * enemyHealth);
} else {
baseDamage = Math.ceil(0.25 * enemyHealth * (3.00 * yourHealth + 1.00* enemyHealth) / (3.00 * enemyHealth + 1.00 * yourHealth)); 
}
criticalDamage = Math.round(baseDamage * 1.5)
glancingDamage = Math.ceil(baseDamage * 0.1)

div4.innerHTML = "Your Health: " + yourHealth + "<br />Enemy Health: " + enemyHealth + "<br />----------<br />Glancing Blow Damage Inflicted: " + glancingDamage + "<br />Direct Hit Damage Inflicted: " + baseDamage + "<br />Critical Hit Damage Inflicted: " + criticalDamage;


}


}