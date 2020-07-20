/* Scripts which are imported via [[MediaWiki:ImportJS]] */
/* Калькулятор для подсчета бонусов от героев в недели Событий */

var allChbx = [],
  out = document.querySelector('.output'),
  arenaDiv = document.querySelector('.output1'),
  scienceDiv = document.querySelector('.output2'),
  scienceSumDiv = document.querySelector('.scienceSum'),
  arenaSumDiv = document.querySelector('.arenaSum'),
  scienceWeekDiv = document.querySelector('.scienceWeek'), 
  arenaWeekDiv = document.querySelector('.arenaWeek'), 
  bossWeekDiv = document.querySelector('.bossWeek');
[].forEach.call(document.querySelectorAll('.science'), 

function(group){
  var main = group.querySelector('.main'),
    chbx = group.querySelectorAll('div[class="child"]:not(.main)');
  allChbx = allChbx.concat([].slice.call(chbx));
  main.onclick = function() {
    if(main.classList.contains("active")) {
      main.classList.remove("active");
      [].forEach.call(chbx, function(el){
        el.classList.remove("active");
      });
      reCalc();
    }
    else {
      main.classList.add("active");
      [].forEach.call(chbx, function(el){
        el.classList.add("active");
      });
      reCalc();
    }
  };
  [].forEach.call(chbx, function(el){
    el.onclick = function() {
      if(el.classList.contains("active")) {
        el.classList.remove("active");
      }
      else
        el.classList.add("active");
      var cnt = [].filter.call(chbx, function(el){
        return el.classList.contains("active");
      }).length;      
      if(cnt > 0){        
        main.classList.add("active");
      }
      else {
        main.classList.remove("active");
      }
      reCalc();
    };
  });
});
function formulas(data, type, sum) {
	var result = 0;
	if(type == "science" && data != 8438 && data != 8437.5) {
  	result = (data/100)*8437.5 + 8437.5;
  } else if(type == "arena" && data != 1000) {
  	result = (data/100)*1000+1000;
  } else if(type == "event" && data != 8438) {  	
  	result = (data/100)*sum+sum;
  } else if(type == "boss" && data != 15000) {
  	result = (data/100)*15000+15000;
  } else
  	result = 0;
  return result;
}
 
 
function reCalc(){
  var total = 0,
  	arena = 0,
  	science = 0,
    constScienceSum = 0,
  	yourDivScienceSUM = 0,
    scienceSum = 0,
    arenaSum = 0,
    scienceWeek = 0,
    bossWeek = 0,
    arenaWeek = 0;
  allChbx.forEach(function(c){
    total += c.classList.contains("active") ? +c.dataset.event : 0;
    arena += c.classList.contains("active") ? +c.dataset.arena : 0;
    science += c.classList.contains("active") ? +c.dataset.science : 0;
  });
  scienceSum = formulas(science, "science");
  arenaSum = formulas(arena, "arena");  
  scienceWeek = formulas(total, "event", scienceSum);
  arenaWeek = formulas(total, "event", arenaSum); 
  console.log(arenaWeek + " arenaWeek");
  bossWeek = formulas(total, "boss");
  out.innerHTML = Math.round(total);
  arenaDiv.innerHTML = Math.round(arena);
  scienceDiv.innerHTML = Math.round(science);
  scienceSumDiv.innerHTML = Math.round(scienceSum);
  arenaSumDiv.innerHTML = Math.round(arenaSum);
  scienceWeekDiv.innerHTML = Math.round(scienceWeek);
  bossWeekDiv.innerHTML = Math.round(bossWeek);
  arenaWeekDiv.innerHTML = Math.round(arenaWeek);
}