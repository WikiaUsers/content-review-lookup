function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode == 13){
		calculatecss(document.getElementById("cssForm"));
	} else {
		return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
	}
}
 
function calcExp(ocLev, GlobalAvrg, playerDmg, partyMcNumber, MainChar, DivinityBool, FavorBoon, playerAmt, HighestRank, detailLevel, enemyHP, enemyType,  world){
 isNumberKey();
    var GlobalCalculation;
    var PlayDetail;

 
    GlobalCalculation = (ocLev - GlobalAvrg) * -.5
 
    if (ocLev > GlobalAvrg) {
 
        GlobalCalculation = GlobalCalculation - 0.5
    }
 
    if (GlobalCalculation < 0 || PlayDetail != 1 || PlayDetail != 2)
    {
 
        PlayDetail = .5
    }
    else
    {
        PlayDetail = detailLevel;
    }
    if (PlayDetail == 3)
    {
        PlayDetail = .5
    }
    if (PlayDetail == 2)
    {
        PlayDetail = .12
    }
    if (PlayDetail == 1 || PlayDetail === 0)
    {
        PlayDetail == -.33
    }
    var positiveGlobal
    var percentageLeftover = 1 - (playerDmg/enemyHP) 
    var damageBoon = (playerDmg/enemyHP) * enemyType
    if (GlobalCalculation < 0) {
      positiveGlobal = (GlobalCalculation * -1)
    }
    else
    {
      positiveGlobal = GlobalCalculation
    }
    var BattleExp = (damageBoon + enemyType) * (positiveGlobal)
    var PartyBonus
    var globalCal = percentageLeftover / playerAmt
   if (GlobalCalculation < 0)
   {
     PartyBonus = globalCal - playerAmt
   }
   else
   {
     PartyBonus = globalCal + playerAmt
   }
   partyRanks = (ocLev - HighestRank)
   if (partyRanks >= 0)
   {
    lowRankBoost = 0
   }
   else
   {
     lowRankBoost = 2
   }

   if (MainChar = 1){
     var mcBoon = 1
   }
   else{
     mcBoon = 0
   }
   var mcBoost = mcBoon + partyMcNumber
   var regionBoost
   var divineBoost
   if (FavorBoon = 1){
     regionBoost = 1
   }
   else{
     regionBoost = 0
   }
   if (DivinityBool = 1)
   {
     divineBoost = 1
   }
   else
   {
     divineBoost = 0
   }

   if (MainChar = 1)
   {
     divineBoost = divineBoost + mcBoost 
     regionBoost = regionBoost + mcBoost
   }

    var RPM = GlobalCalculation + PlayDetail;
    var BE = BattleExp;
    var PAM = PartyBonus;
    var GE = lowRankBoost;
    var MC = mcBoost;
    var anyBonus = DivinityBool + FavorBoon;

    var calculatedValue = (((RPM)(BE + PAM))*GE)+(MC * anyBonus)

    return calculatedValue


}