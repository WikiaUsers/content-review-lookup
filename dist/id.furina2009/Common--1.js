

document.getElementById("Furina2009Search").oninput = function(e){state.search=e.target.value;renderPetGrid();};
document.getElementById("Furina2009WeightInput").oninput = function(e){state.weight=parseFloat(e.target.value)||0;document.getElementById("Furina2009WeightSlider").value=state.weight;compute();};
document.getElementById("Furina2009WeightSlider").oninput = function(e){state.weight=parseFloat(e.target.value)||0;document.getElementById("Furina2009WeightInput").value=state.weight;compute();};