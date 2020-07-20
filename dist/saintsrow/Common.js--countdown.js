//*****************************************************
//* Experimental javascript countdown timer (Splarka) *
//* Version 0.0.3                                     *
//*****************************************************
//
//  Usage example:
//   <span class="countdown" style="display:none;">
//   Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//   </span>
//   <span class="nocountdown">Javascript disabled.</span>


function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if (isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if (diff<0) {
    leftago = " ago";
    diff = -diff;
  } else {
    leftago = " left";
  }

  // calcuate the diff
  var left = (diff%60) + '';
    diff=Math.floor(diff/60);
  if (diff > 0) left = (diff%60) + ':' + left;
    diff=Math.floor(diff/60);
  if (diff > 0) left = (diff%24) + ':' + left;
    diff=Math.floor(diff/24);
  if (diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = left + leftago;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
$(function() {                                                                                                                             if (new Date().getMonth() == 3 && new Date().getDate() == 1) { /*  for one day  */
  function f1741() {
	var i = new Array("0/09/Homie_icon_-_Shaundi_in_Saints_Row_The_Third", "0/0b/Homie_icon_-_Luz_in_Saints_Row_2", "1/11/Homie_icon_-_Jane_in_Saints_Row_2", "1/12/Homie_icon_-_SWAT_in_Saints_Row_The_Third", "1/16/Homie_icon_-_DJ_Veteran_Child_in_Saints_Row_IV", "1/1c/Homie_icon_-_Mayor_in_Saints_Row_The_Third", "1/1f/Homie_icon_-_bouncer_in_Saints_Row_2", "2/20/Homie_icon_-_Oleg_in_Saints_Row_The_Third", "2/24/Saints_Row_homie_head_-_Gat", "2/2b/Homie_icon_-_Tobias_in_Saints_Row_2", "2/2c/Homie_icon_-_Maero_in_Saints_Row_IV", "2/2f/Saints_Row_homie_head_-_Wheel_Woman", "3/31/Homie_icon_-_Lin_in_Saints_Row_IV", "3/32/Homie_icon_-_Troy_in_Saints_Row_2", "3/34/Saints_Row_homie_head_-_Aisha", "3/3b/Homie_icon_-_Zinyak_in_Saints_Row_IV", "4/41/Homie_icon_-_Julius_in_Saints_Row_IV", "4/48/Homie_icon_-_Zombie_Gat_in_Saints_Row_The_Third", "4/4d/Homie_icon_-_Angel_with_mask_in_Saints_Row_The_Third", "4/4f/Homie_icon_-_Kinzie_in_Saints_Row_IV", "5/51/Saints_Row_homie_head_-_Marvin", "5/52/Homie_icon_-_Jimmy_in_Saints_Row_The_Third", "5/52/Homie_icon_-_Roddy_Piper_in_Saints_Row_IV", "5/55/Homie_icon_-_Kinzie_in_Saints_Row_The_Third", "5/57/Homie_icon_-_Johnny_Gat_in_Saints_Row_The_Third", "5/58/Homie_icon_-_Kwilanna_in_Saints_Row_The_Third", "5/5c/Homie_icon_-_Gat_in_Saints_Row_2", "5/5d/Homie_icon_-_CheapyD_in_Saints_Row_The_Third", "5/5f/Saints_Row_homie_head_-_Chicken_Ned", "6/60/Homie_icon_-_Shaundi_in_Saints_Row_IV", "6/61/Saints_Row_homie_head_-_Laura", "6/69/Homie_icon_-_Richie_in_Saints_Row_2", "6/6b/Homie_icon_-_Tanya_in_Saints_Row_IV", "7/71/Homie_icon_-_Zimos_in_Saints_Row_IV", "7/7a/Homie_icon_-_Fun_Shaundi_in_Saints_Row_IV", "7/7c/Homie_icon_-_Ben_King_in_Saints_Row_IV", "7/7d/Homie_icon_-_Aisha_Brutella_in_Saints_Row_The_Third", "8/84/Saints_Row_homie_head_-_Zombie_Lin", "8/86/Homie_icon_-_Sad_Panda_in_Saints_Row_The_Third", "8/8a/Homie_icon_-_Pierce_in_Saints_Row_2", "8/8b/Homie_icon_-_Asha_in_Saints_Row_IV", "8/8c/Homie_icon_-_Josh_in_Saints_Row_The_Third", "8/8d/Saints_Row_homie_head_-_Dex", "8/8e/Homie_icon_-_Female_Asian_Saint_in_Saints_Row_The_Third", "8/8f/Saints_Row_homie_head_-_Tobias", "9/90/Homie_icon_-_Julius_in_Saints_Row_2", "9/91/Homie_icon_-_Shaundi_in_Saints_Row_2", "9/97/Homie_icon_-_Legal_Lee_in_Saints_Row_2", "9/9a/Homie_icon_-_Tammy_in_Saints_Row_The_Third", "9/9c/Homie_icon_-_Jessica_in_Saints_Row_2", "a/a1/Homie_icon_-_Laura_in_Saints_Row_2", "a/a5/Homie_icon_-_Keith_in_Saints_Row_IV", "a/a8/Homie_icon_-_Pierce_in_Saints_Row_The_Third", "a/ac/Homie_icon_-_Matt_in_Saints_Row_IV", "a/ac/Saints_Row_homie_head_-_Mr._Wong", "a/ae/Homie_icon_-_Maero_in_Saints_Row_2", "b/b3/Homie_icon_-_Angry_Tiger_in_Saints_Row_The_Third", "b/b4/Homie_icon_-_William_Sharp_in_Saints_Row_IV", "b/b6/Homie_icon_-_Brutina_in_Saints_Row_The_Third", "b/b6/Homie_icon_-_Zimos_in_Saints_Row_The_Third", "b/b7/Homie_icon_-_Sexy_Kitten_in_Saints_Row_The_Third", "b/b9/Homie_icon_-_Angel_without_mask_in_Saints_Row_The_Third", "b/b9/Saints_Row_homie_head_-_Troy", "b/ba/Homie_icon_-_Pierce_in_Saints_Row_IV", "b/ba/Homie_icon_-_Viola_in_Saints_Row_The_Third", "b/be/Saints_Row_homie_head_-_Julius", "c/c0/Homie_icon_-_CID_in_Saints_Row_IV", "c/c5/Homie_icon_-_Donnie_in_Saints_Row_2", "c/cf/Homie_icon_-_Gat_in_Saints_Row_IV", "c/cf/Homie_icon_-_Johnny_Tag_in_Saints_Row_The_Third", "d/d0/Homie_icon_-_Cyrus_in_Saints_Row_IV", "d/d7/Homie_icon_-_Josh_in_Saints_Row_IV", "e/e3/Homie_icon_-_cameraman_in_Saints_Row_2", "e/e8/Homie_icon_-_Carlos_in_Saints_Row_2", "e/eb/Homie_icon_-_Pierce_dressed_as_Aisha_in_Saints_Row_The_Third", "e/eb/Saints_Row_homie_head_-_Will", "e/ed/Homie_icon_-_Zombie_Carlos_in_Saints_Row_2", "e/ee/Saints_Row_homie_head_-_Samantha", "f/f2/Homie_icon_-_Dane_in_Saints_Row_IV", "f/fb/Saints_Row_homie_head_-_King"), h = new Array("Gvc:", "Uvag:", "Erzrzore:", "Frperg:", "Url!", "Qvq lbh xabj?", "Ceb-gvc:"), t = new Array("Hfr n jrncba vafgrnq bs lbhe svfgf!", "Qevivat n pne vf snfgre guna jnyxvat!", "Gel cbvagvat lbhe tha gbjneqf rarzvrf!", "Nyjnlf znxr fher lbh unir n shyy gnax bs tnf!", "Zbarl pna or hfrq gb ohl guvatf.", "Qba'g qb onq guvatf, be gur cbyvpr jvyy punfr lbh!", "Lbh pna ybnq fnirq tnzrf vafgrnq bs fgnegvat bire.", "Vs lbh'er fghpx, gel cynlvat n zvffvba!", "Cvfgby nzzb pna bayl or hfrq sbe Cvfgbyf.", "Chggvat n pne va gur Tnentr fnirf vg sbe yngre!", "Lbh pna ohl pybgurf ng pybguvat fgberf!", "Vs rarzvrf ner fubbgvat lbh, gel xvyyvat gurz!", "Zbfg zvffvbaf pna or pbzcyrgrq.", "Fnvagf Ebj vf n ivqrb tnzr.", "Wbuaal Tng vf lbhe nyyl, qba'g fubbg uvz!", "Yva vf n punenpgre va Fnvagf Ebj.", "Vs lbh erfgneg gur tnzr, lbh pna cynl vg ntnva!", "Vs gur fha vf bhg, gung zrnaf vg'f qnl gvzr.", "Trggvat Fzbxrq vf abg tnzr bire, qba'g ghea bss gur tnzr!", "Lbh pna whzc ol cerffvat gur whzc pbageby!", "Lbh pna ragre iruvpyrf naq qevir gurz!", "Guvf qvat qbat vf FNNNNPX", "Gvcf pna uryc lbh jva.", "Lbh pna rqvg gur jvxv ol cerffvat 'rqvg'.", "Lbh pna jva gur tnzr ol pbzcyrgvat nyy zvffvbaf.", "Cnhfr gur tnzr vs lbh arrq n oernx.", "Vs lbh'er va gur jngre, lbh pna fjvz.", "Gur Cebgntbavfg qbrf abg oerngur.", "Fnvagf Ebj 2 vf gur frdhry gb Fnvagf Ebj", "Fbzr pnef ner snfgre guna bguref", "Fbzr jrncbaf ner orggre guna bguref", "Zbfg rarzvrf pna or xvyyrq", "Zbfg iruvpyrf pna or qevira", "Fbzr ohvyqvatf pna or ragrerq", "Cynlvat zvffvbaf haybpxf erjneqf", "Lbh pna punatr lbhe pybgurf", "Fcevagvat vf snfgre guna jnyxvat", "Pehvfr Pbageby pna uryc lbh penfu", "Lbh pna svg 160 pnef va gur Tnentr", "Lbh pnaabg fgber obngf va gur Tnentr", "Zbarl vf pnyyrq 'Pnfu'", "Gel abg gb trg fubg.", "Gel abg gb qvr", "Lbh pna fubbg guvatf jvgu lbhe tha", "Iruvpyrf jvgu zber frngf svg zber Ubzvrf", "Fcbegf Evzf ner ninvynoyr ba zbfg iruvpyrf", "Gur fxl vf oyhr");
	$("#id1741").remove();
	$(".ns-0 #mw-content-text").prepend("<table id='id1741' class='notice error' style='height:77px;'><th><img src='https://vignette.wikia.nocookie.net/saintsrow/images/"+i[Math.ceil(Math.random()*i.length)-1]+".png'></th><td><b style='float:right'>"+r(h[Math.ceil(Math.random()*h.length)-1])+"</b><br>"+r(t[Math.ceil(Math.random()*t.length)-1])+"</td></tr></table>");
	$("#id1741").click(function(){ f1741(); });
  }
  f1741();
  function r(input) { return input.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);}); }
  if (!$(".WikiaPageHeaderDiffHistory").size() && !$(".ns-special").size() && typeof wgIsEditPage == "undefined" && mw.util.getParamValue('action') != "edit" && mw.util.getParamValue('action') != "submit" && wgPageName != "Special:CreateBlogPage" && wgNamespaceNumber <= 1200) {                                                                                                                             var a = ["Grgevf", "Jho Ebj", "Fnvagf Jho", "Jho Jho", "Tng Ebj", "Oyvat Oyvat", "Bu, uryy ab", "Jebat gvzr, jebat cynpr, qnjt", "Gur Yvsr naq Gvzrf bs Gur Cebgntbavfg", "Fnvag'f Ebj", "Ertvpvqr: Gur Evfr naq Snyy bs gur Fnvagf", "Tng Qvrf", "Vg'f nyy nobhg Erfcrpg", "Gurer ner ab qentbaf va guvf tnzr", "Lbh fhax zl onggyrfuvc", "Fnvag Wnebf", "Fnvagf Ebj Ebj Ebj Lbhe Obng", "Guvf Qvat Qbat vf FNNNNPX", r(wgUserName ? wgUserName +"'s" : "Your")+" snibhevgr tnzr", "Lbh'er Fzbxrq", "Genva Jerpx Fvzhyngbe", "gung tnzr", "Checyr Snpgvba", "FNVAGF EBJ OVGPU", "3eq Fgerrg", "Fgvyyjngre"];
    $("#mw-content-text *:contains('Saints Row')").filter(function(){ return $(this).children().length === 0;}).each(function () {
      g = (Math.ceil(Math.random()*a.length)-1);
      $(this).html($(this).html().replace(/Saints Row/g,r(a[g])));
    });
  }
  function f1841() {
    var p = ["Abgnoyl, ", "Vagrerfgvatyl, ", "Onfvpnyyl, ", "Boivbhfyl, ", "Vebavpnyyl, ", "Fgenatryl, ", "Fhecevfvatyl, ", "Fghcvqyl, ", "Bs pbhefr, ", "Nccneragyl, ", "Cerfhznoyl, ", "Vg vf ehzbherq gung ", "Nppbeqvat gb gur Fnvagf Ebj Jvxv, ", "Nppbeqvat gb zl zbgure, ", "Nppbeqvat gb zl vzntvanel sevraq, ", "Nppbeqvat gb "+r(wgUserName ? wgUserName : "you")+", ", "Nppbeqvat gb zl oebgure, ", "Nppbeqvat gb zl fvfgre, ", "Nppbeqvat gb zl grnpure, ", "Nppbeqvat gb zl qragvfg, ", "Nppbeqvat gb zl qbt, ", "Nppbeqvat gb zl pbhfva, ", "Zl zbgure gbyq zr gung ", "Zl vzntvanel sevraq gbyq zr gung ", r(wgUserName ? wgUserName : "You")+" gbyq zr gung ", "Zl oebgure gbyq zr gung ", "Zl fvfgre gbyq zr gung ", "Zl grnpure gbyq zr gung ", "Zl qragvfg gbyq zr gung ", "Zl qbt gbyq zr gung ", "Zl pbhfva gbyq zr gung "];

    $(".WikiaArticle .mw-content-text>ul>li, .WikiaArticle .mw-content-text>ul>li>ul>li").each(function(){ if ($(this).text().length > 5) $(this).prepend(r(p[Math.floor((Math.random()*p.length))])); });
    $(".WikiaArticle .mw-content-text>p:not(:empty)").each(function(){ if ($(this).text().length > 5) $(this).prepend(r(p[Math.floor((Math.random()*p.length))])); });
    $(".WikiaArticle .mw-content-text>div>ul>li, .WikiaArticle .mw-content-text>ul>li>ul>li").each(function(){ if ($(this).text().length > 5) $(this).prepend(r(p[Math.floor((Math.random()*p.length))])); });
    $(".WikiaArticle .mw-content-text>div>p:not(:empty)").each(function(){ if ($(this).text().length > 5) $(this).prepend(r(p[Math.floor((Math.random()*p.length))])); });
  }
  f1841();
}
});
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************