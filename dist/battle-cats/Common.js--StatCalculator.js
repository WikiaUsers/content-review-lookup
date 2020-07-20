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
    //treasure effect
    var treasurehp = +($(this).closest('.statcalc').find('.treasurehp').text());
    var treasureatk = +($(this).closest('.statcalc').find('.treasureattack').text());
    var treasurebuffhp = +($(this).closest('.statcalc').find('.treasurebuffhp').text());
    var treasurebuffatk = +($(this).closest('.statcalc').find('.treasurebuffattack').text());
    var treasurehpeffect = (treasurehp / 100) * (treasurebuffhp / 100);
    var treasureatkeffect = (treasureatk / 100) * (treasurebuffatk / 100) ;
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
    //How many HP stats grown
    var hpgrowninitial = (hpinitial * treasurehpeffect) + (((hpinitial * 
        (sumlevel - 1) * basegrow/100) - ( hpinitial * (growpliera/100) * growmultia) - ( hpinitial * (growplierb/100) * growmultib) - ( hpinitial * (growplierc/100) * growmultic) - ( hpinitial * (growplierd/100) * growmultid) - ( hpinitial * (growpliere/100) * growmultie) ) * (1 + treasurehpeffect));
    var hpsuminitial = hpgrowninitial + hpinitial;
    
//Replace HP with calculated stat
    $(this).parents('.stat-container').find('.hp-calculated').text(hpsuminitial.toLocaleString(undefined,{maximumFractionDigits: 0}));

//How much Attack stats grown
    var apgrowninitial = (apinitial * treasureatkeffect) + (((apinitial * 
        (sumlevel - 1) * basegrow/100) - ( apinitial * (growpliera/100) * growmultia) - ( apinitial * (growplierb/100) * growmultib) - ( apinitial * (growplierc/100) * growmultic) - ( apinitial * (growplierd/100) * growmultid) - ( apinitial * (growpliere/100) * growmultie) ) * (1 + treasureatkeffect));
    var apsuminitial = apgrowninitial + apinitial;

//Replace Attack with calculated stat
    $(this).parents('.stat-container').find('.ap-calculated').text(apsuminitial.toLocaleString(undefined,{maximumFractionDigits: 0}));

//How much DPS stats grown
    var dpsgrowninitial = (dpsinitial * treasureatkeffect) + (((dpsinitial * 
        (sumlevel - 1) * basegrow/100) - ( dpsinitial * (growpliera/100) * growmultia) - ( dpsinitial * (growplierb/100) * growmultib) - ( dpsinitial * (growplierc/100) * growmultic) - ( dpsinitial * (growplierd/100) * growmultid) - ( dpsinitial * (growpliere/100) * growmultie) ) * (1 + treasureatkeffect));
    var dpssuminitial = dpsgrowninitial + dpsinitial;

//Replace Attack with calculated stat
    $(this).parents('.stat-container').find('.dps-calculated').text(dpssuminitial.toLocaleString(undefined,{maximumFractionDigits: 0}));
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