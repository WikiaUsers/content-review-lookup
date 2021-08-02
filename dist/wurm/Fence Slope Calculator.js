var slope_calc = document.createElement('input');
slope_calc.type = "range";
slope_calc.min = 1;
slope_calc.max = 100;
slope_calc.value = 50;
slope_calc.id = "skill_select";
var currentDiv = document.getElementById("abc");
currentDiv.appendChild(slope_calc);
var slider = document.getElementById("skill_select");
var skill = document.getElementById("skill_level");
skill.innerHTML = slider.value;
var slope = document.getElementById("slope");
slope.innerHTML = Math.floor(3 * Math.sqrt(slider.value) + 10);

slider.oninput = function() {
  skill.innerHTML = this.value;
  slope.innerHTML = Math.floor(3 * Math.sqrt(this.value) + 10);
};