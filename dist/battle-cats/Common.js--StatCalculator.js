$(document).ready(function() { //on document ready

//create input field, class can be used on other stuffs. Priority order is important

  $('div.statcalc .inputfield').attr("contenteditable","true");
  $('div.statcalc .inputparent').on('blur keyup paste', setalllevels);
  $('div.statcalc .inputfield').on('blur keyup paste', formulate);
  $('div.statcalc .stat_calculator').on('focus click blur keyup paste', statcalculate);
    $('div.statcalc .stat_calculator .mw-collapsible-toggle a').on('focus click blur keyup paste', statcalculate);

//update all levels to same 

function setalllevels() {
    var setnormallevel = $(this).parents('.statcalc').find('.parentnaturallevel').text();
    var setpluslevel = $(this).parents('.statcalc').find('.parentpluslevel').text();
    $(this).parents('.statcalc').find('.naturallevel').text(setnormallevel);
    $(this).parents('.statcalc').find('.pluslevel').text(setpluslevel);
}

//Execute command from outside trigger
function statcalculate() {
        $(this).parents('.statcalc').find('.naturallevel').blur();
}

//create variables 
function formulate() {
    //level variable
    var naturallevel = +($(this).parents('.statcalc .stat-container').find('.naturallevel').text());
    var pluslevel = +($(this).parents('.statcalc .stat-container').find('.pluslevel').text());
    var sumlevel = naturallevel + pluslevel;
    //decimals fraction limit
    var fractionlimit = +($(this).closest('.statcalc').find('.fractionlimit').text());
    if (fractionlimit > 19) {
         fractionlimit = 20;
     } 
    //treasure effect
    var treasurehp = +($(this).closest('.statcalc').find('.treasurehp').text());
    var treasureatk = +($(this).closest('.statcalc').find('.treasureattack').text());
    var treasurebuffhp = +($(this).closest('.statcalc').find('.treasurebuffhp').text());
    var treasurebuffatk = +($(this).closest('.statcalc').find('.treasurebuffattack').text());
    var treasurehpeffect = (treasurehp / 100) * (treasurebuffhp / 100);
    var treasureatkeffect = (treasureatk / 100) * (treasurebuffatk / 100);
    //Talent and skill modifier
    var talenthp = +($(this).parents('.statcalc .stat-container').find('.talenthp').text());
    var talentatk = +($(this).parents('.statcalc .stat-container').find('.talentattack').text());
    var individualmodhp = +($(this).parents('.statcalc .stat-container').find('.individualmodhp').text());
    var individualmodatk = +($(this).parents('.statcalc .stat-container').find('.individualmodattack').text());
	//Multi hit ratio
	var multihit1 = +($(this).parents('.statcalc .stat-container').find('.multihit1').text());
	var multihit2 = +($(this).parents('.statcalc .stat-container').find('.multihit2').text());
	var multihit3 = +($(this).parents('.statcalc .stat-container').find('.multihit3').text());
	var multihit4 = +($(this).parents('.statcalc .stat-container').find('.multihit4').text());
	var multihit5 = +($(this).parents('.statcalc .stat-container').find('.multihit5').text());
	var multihit6 = +($(this).parents('.statcalc .stat-container').find('.multihit6').text());
	var sumhitratio = multihit1 + multihit2 + multihit3 + multihit4 + multihit5 + multihit6;
    //Attack speed frames
    var attackspeed = +($(this).parents('.statcalc .stat-container').find('.attackspeed').text());
    //Global stat modifier
    var globalmodhp = +($(this).closest('.statcalc').find('.globalmodhp').text());
    var globalmodatk = +($(this).closest('.statcalc').find('.globalmodattack').text());
    //Grow modifier
    var basegrow = +($(this).closest('.statcalc').find('.basegrow').text());
    var growmoda = +($(this).closest('.statcalc').find('.growmod1').text());
    var growmodb = +($(this).closest('.statcalc').find('.growmod2').text());
    var growmodc = +($(this).closest('.statcalc').find('.growmod3').text());
    var growmodd = +($(this).closest('.statcalc').find('.growmod4').text());
    var growmode = +($(this).closest('.statcalc').find('.growmod5').text());
    var growlevela = +($(this).closest('.statcalc').find('.growlevel1').text());
    var growlevelb = +($(this).closest('.statcalc').find('.growlevel2').text());
    var growlevelc = +($(this).closest('.statcalc').find('.growlevel3').text());
    var growleveld = +($(this).closest('.statcalc').find('.growlevel4').text());
    var growlevele = +($(this).closest('.statcalc').find('.growlevel5').text());
    //call grow multiplier how far have been gone
     var growmultia = 0;
     if (sumlevel < growlevela) {
         growmultia = 0;
     } else { growmultia = sumlevel - growlevela;}
     var growmultib = 0;
     if (sumlevel < growlevelb) {
         growmultib = 0;
     } else { growmultib = sumlevel - growlevelb;}
     var growmultic = 0;
     if (sumlevel < growlevelc) {
         growmultic = 0;
     } else { growmultic = sumlevel - growlevelc;}
     var growmultid = 0;
     if (sumlevel < growleveld) {
         growmultid = 0;
     } else { growmultid = sumlevel - growleveld;}
     var growmultie = 0;
     if (sumlevel < growlevele) {
         growmultie = 0;
     } else { growmultie = sumlevel - growlevele;}
    //call how much penalty from grow multiplier
     var growpliera = basegrow * (growmoda / 100);
     var growplierb = growpliera * (growmodb / 100);
     var growplierc = growplierb * (growmodc / 100);
     var growplierd = growplierc * (growmodd / 100);
     var growpliere = growplierd * (growmode / 100);
     
    // Get initial stats
    var hpinitial = +($(this).parents('.statcalc .stat-container').find('.hp-initial').text().replace(/,/g,''));
    var apinitial = +($(this).parents('.statcalc .stat-container').find('.ap-initial').text().replace(/,/g,''));
    var dpsinitial = +($(this).parents('.statcalc .stat-container').find('.dps-initial').text().replace(/,/g,''));

    //How many HP stats grown Math.round & Math.floor
    var hpgrowninitial =  Math.round(hpinitial + (hpinitial * 
        (sumlevel - 1) * basegrow/100) - ( hpinitial * (growpliera/100) * growmultia) - ( hpinitial * (growplierb/100) * growmultib) - ( hpinitial * (growplierc/100) * growmultic) - ( hpinitial * (growplierd/100) * growmultid) - ( hpinitial * (growpliere/100) * growmultie)) * (1 + treasurehpeffect);
    var hpsuminitial = Math.floor( Math.floor( Math.floor( Math.floor(hpgrowninitial) * ((100 + talenthp)/100)) * ((100 + individualmodhp)/100)) * ((100 + globalmodhp)/100));

//Replace HP with calculated stat
    $(this).parents('.stat-container').find('.hp-calculated').text(hpsuminitial.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));

//AP per hit initial
    var apinitialgrown = apinitial + (apinitial * 
        (sumlevel - 1) * basegrow/100) - ( apinitial * (growpliera/100) * growmultia) - ( apinitial * (growplierb/100) * growmultib) - ( apinitial * (growplierc/100) * growmultic) - ( apinitial * (growplierd/100) * growmultid) - ( apinitial * (growpliere/100) * growmultie);
    var aphit1 = Math.round(apinitialgrown * (multihit1 / sumhitratio));
    var aphit2 = Math.round(apinitialgrown * (multihit2 / sumhitratio));
    var aphit3 = Math.round(apinitialgrown * (multihit3 / sumhitratio));
    var aphit4 = Math.round(apinitialgrown * (multihit4 / sumhitratio));
    var aphit5 = Math.round(apinitialgrown * (multihit5 / sumhitratio));
    var aphit6 = Math.round(apinitialgrown * (multihit6 / sumhitratio));
//How much Attack stats grown
var aphit1c =  Math.floor(Math.floor(Math.floor( Math.floor(aphit1 * (1 + treasureatkeffect)) * ((100 + individualmodatk)/100)) + (talentatk * multihit1)) * ((100 + globalmodatk)/100));
var aphit2c =  Math.floor(Math.floor(Math.floor( Math.floor(aphit2 * (1 + treasureatkeffect)) * ((100 + individualmodatk)/100)) + (talentatk * multihit2)) * ((100 + globalmodatk)/100));
var aphit3c =  Math.floor(Math.floor(Math.floor( Math.floor(aphit3 * (1 + treasureatkeffect)) * ((100 + individualmodatk)/100)) + (talentatk * multihit3)) * ((100 + globalmodatk)/100));
var aphit4c =  Math.floor(Math.floor(Math.floor( Math.floor(aphit4 * (1 + treasureatkeffect)) * ((100 + individualmodatk)/100)) + (talentatk * multihit4)) * ((100 + globalmodatk)/100));
var aphit5c =  Math.floor(Math.floor(Math.floor( Math.floor(aphit5 * (1 + treasureatkeffect)) * ((100 + individualmodatk)/100)) + (talentatk * multihit5)) * ((100 + globalmodatk)/100));
var aphit6c =  Math.floor(Math.floor(Math.floor( Math.floor(aphit6 * (1 + treasureatkeffect)) * ((100 + individualmodatk)/100)) + (talentatk * multihit6)) * ((100 + globalmodatk)/100));

var apsuminitial = aphit1c + aphit2c + aphit3c + aphit4c + aphit5c + aphit6c; 

//Replace Sum Attack with calculated stat
    $(this).parents('.statcalc .stat-container').find('.ap-calculated').text(apsuminitial.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
//Replace Multi Hit attack with calculated stat
$(this).parents('.stat-container').find('.multihit1c').text(aphit1c.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
$(this).parents('.stat-container').find('.multihit2c').text(aphit2c.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
$(this).parents('.stat-container').find('.multihit3c').text(aphit3c.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
$(this).parents('.stat-container').find('.multihit4c').text(aphit4c.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
$(this).parents('.stat-container').find('.multihit5c').text(aphit5c.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
$(this).parents('.stat-container').find('.multihit6c').text(aphit6c.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));

//How much DPS stats grown
//    var dpsgrowninitial = (dpsinitial * treasureatkeffect) + (((dpsinitial * 
//        (sumlevel - 1) * basegrow/100) - ( dpsinitial * (growpliera/100) * growmultia) - ( dpsinitial * (growplierb/100) * growmultib) - ( dpsinitial * (growplierc/100) * growmultic) - ( dpsinitial * (growplierd/100) * growmultid) - ( dpsinitial * (growpliere/100) * growmultie) ) * (1 + treasureatkeffect));
    
    var dpssuminitial = apsuminitial * (30 / attackspeed);

//Replace Attack with calculated stat
    $(this).parents('.stat-container').find('.dps-calculated').text(dpssuminitial.toLocaleString(undefined,{maximumFractionDigits: fractionlimit}));
}

//simple calculations
//Find root value then multiply by percent
  $('div.simplemultipercent .inputfield').on('focus click blur keyup paste', simplecalcmultipercent);
  
function simplecalcmultipercent() {
  var numa = +($(this).closest('.statcalc').find('.numa').text().replace(/,/g,'')); 
  var numb = +($(this).closest('.statcalc').find('.numb').text().replace(/,/g,'')); 
  var numc = +($(this).closest('.statcalc').find('.numc').text().replace(/,/g,'')); 
  var calcresult = numa / (numb / 100) * (numc / 100);
  $(this).closest('.statcalc').find('.result').text(calcresult.toLocaleString());
}

 //end of script
});