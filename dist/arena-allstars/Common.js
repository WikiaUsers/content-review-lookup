/* Any JavaScript here will be loaded for all users on every page load. */

try{
var skillMini = document.getElementById('characterSkillMini');
var skillBig = document.getElementById('characterSkillBig');
var quote = document.getElementById('characterQuote');
var infobox = document.getElementById('characterInfobox');
var qs = document.getElementById('characterQuoteSkill');
var tabs = document.getElementsByClassName('pi-tab-link');
var whole = document.getElementById('character');

var smheight = skillMini.offsetHeight;
var iheight = infobox.offsetHeight;
var qheight = quote.offsetHeight;
var qwidth = whole.offsetWidth - infobox.offsetWidth;
var height = 0;

quote.setAttribute("style","height:100px; display:flex; align-items:center; width: 100%; justify-content:center;");
qs.setAttribute("style","height:min-content; display:block;");
infobox.setAttribute("style","height:min-content; display:block;");

quote.style.width = qwidth+"px";

for(var i = 0; i < tabs.length; i++) {
  (function(index) {
    tabs[index].addEventListener("click", function() {
       changeView();
       setTimeout(function() {changeView();}, 10);
     })
  })(i);
}
}
catch(err){
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


function setSeason(){
    try{
    var seasonid = document.getElementById('season');
    var startDate = new Date('01 Nov 2019 00:00:00 UTC');
    seasonid.innerHTML = monthDiff(startDate,new Date())+1;
    console.log("sucessfully changed season number")
    }catch(err){}
}

jQuery(setSeason());


changeView();

function changeView()
{
    try {
        skillBig.style.display = "none";
        skillMini.style.display = "none";
        iheight = infobox.offsetHeight
        console.log(iheight);
        console.log(qheight + smheight);
        if(iheight > qheight + smheight + 30 ) {
            quote.style.height=(iheight-smheight-20)+'px';
            skillMini.style.display = "block";
        }else{
            quote.style.height=iheight+'px';
            skillBig.style.display = "block";
        }
    }catch(err){
        console.log("failed to change view")
    }
}