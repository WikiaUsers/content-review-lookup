function calculate() {;
  var hour = document.getElementById("hourInput").value;
  var min = document.getElementById("minInput").value;
  var sec = document.getElementById("secInput").value;

  var distance = document.getElementById("distanceInput").value;
  var growth = document.getElementById("growthInput").value;
  var missions = document.getElementById("missionsInput").value;
  var biomes = document.getElementById("biomesInput").value;

  var enormousKill = document.getElementById("killEnormousInput").value;
  var largeKill = document.getElementById("killLargeInput").value;
  var mediumKill = document.getElementById("killMediumInput").value;
  var smallKill = document.getElementById("killSmallInput").value;
  var tinyKill = document.getElementById("killTinyInput").value;

  var timeTotal = ((hour*3600) + min*60 + sec*1);
  var timePoints = (timeTotal) * 0.00417;
  console.log(timePoints + " " + timeTotal);
  var distancePoints = Math.round(distance * (1 / 5000));
  var growthPoints = Math.round(growth * 7.5);
  var missionPoints = Math.round(missions * 4);
  var biomePoints = Math.round(biomes * 2);

  var tinyPoints = tinyKill * 1;
  var smallPoints = smallKill * 2;
  var mediumPoints = mediumKill * 3;
  var largePoints = largeKill * 5;
  var enormousPoints = enormousKill * 8;
  var totalKillPoints =
    tinyPoints + smallPoints + mediumPoints + largePoints + enormousPoints;

  document.getElementById("timePoints").innerHTML = Math.round(timePoints*100)/100;
  document.getElementById("distancePoints").innerHTML = Math.round(distancePoints* 100)/100;
  document.getElementById("growthPoints").innerHTML = Math.round(growthPoints* 100)/100;
  document.getElementById("missionPoints").innerHTML = Math.round(missionPoints* 100)/100;
  document.getElementById("biomePoints").innerHTML = Math.round(biomePoints* 100)/100;
  document.getElementById("killPoints").innerHTML = Math.round(totalKillPoints* 100)/100;
  document.getElementById("killTinyPoints").innerHTML = Math.round(tinyPoints* 100)/100;
  document.getElementById("killSmallPoints").innerHTML = Math.round(smallPoints* 100)/100;
  document.getElementById("killMediumPoints").innerHTML = Math.round(mediumPoints* 100)/100;
  document.getElementById("killLargePoints").innerHTML = Math.round(largePoints* 100)/100;
  document.getElementById("killEnormousPoints").innerHTML = Math.round(enormousPoints* 100)/100;
  
  const myObj = {
  maximumFractionDigits:2,
  minimumFractionDigits:2
}
  
  document.getElementById("results").innerHTML = (timePoints + distancePoints + growthPoints + missionPoints + biomePoints + totalKillPoints).toLocaleString(undefined, myObj);
  
  hour = 0; min = 0; sec = 0;
  timePoints = 0;
  distancePoints = 0;growthPoints = 0;missionPoints = 0;biomePoints = 0;
  tinyPoints = 0;smallPoints = 0;mediumPoints = 0;largePoints = 0;enormousPoints = 0;
  totalKillPoints = 0;
}

function myFunction() {
  var x, time, hours, minutes, seconds, track;

  x = document.getElementById("numb").value;
  time = (x/5)*2;
  
  seconds = (time*60)%60;
  hours = (time*60)/60;
  minutes = hours%60;
  hours = hours/60;
  
  document.getElementById("demo").innerHTML = "To passively earn " + x + " Shooms, it will take about " + time + " minutes.";
}

$(function () {
  if ($('#shoom-calc').length) {
    document.getElementById('shoom-calc').innerHTML =
      '<p>Please input the desired amount of Shooms:</p>' +
      '<input id="numb" type="number" style="width: 130px">' +
      '<button type="button" onclick="myFunction()">Submit</button>' +
      '<p><p id="demo"></p></p>';
  }
  
  if ($('#deathpoints-calc').length) {
    document.getElementById('deathpoints-calc').innerHTML =
      '<div style="display:inline;">Time Survived:</div><input style="display:inline; width:50px;" placeholder="0" id="hourInput"></input>h <input style="display:inline;width:50px;" placeholder="0" id="minInput"></input>m <input style="display:inline;width:50px;" placeholder="0" id="secInput" ></input>s, = <div id="timePoints" style="display:inline;"></div> <br /> <div style="display:inline;">Distance Traveled:</div><input id="distanceInput" style="display:inline;" placeholder="0"></input> studs, = <div id="distancePoints" style="display:inline;"></div> <br /> <div style="display:inline;" >Growth Stages:</div> <input id="growthInput" style="display:inline;" placeholder="0"></input> = <div id="growthPoints" style="display:inline;"></div> <br /> <div style="display:inline;">Missions Completed:</div><input id="missionsInput" style="display:inline;" placeholder="0"></input> = <div id="missionPoints" style="display:inline;"></div> <br /> <div style="display:inline;">Biomes Visited:</div><input id="biomesInput" style="display:inline;" placeholder="0"></input>= <div id="biomePoints" style="display:inline;"></div> <br /> <div style="display:inline;">Kills: =</div> <div id="killPoints" style="display:inline;"></div> <br /> <div>Tier 1:<input id="killTinyInput" style="display:inline;" placeholder="0"></input> (Tiny) = <div id="killTinyPoints" style="display:inline;"></div> <br /> Tier 2:<input id="killSmallInput" style="display:inline;" placeholder="0"></input> (Small) = <div id="killSmallPoints" style="display:inline;"></div> <br /> Tier 3:<input id="killMediumInput" style="display:inline;" placeholder="0"></input> (Medium) = <div id="killMediumPoints" style="display:inline;"></div> <br /> Tier 4:<input id="killLargeInput" style="display:inline;" placeholder="0"></input> (Large) = <div id="killLargePoints" style="display:inline;"></div> <br /> Tier 5:<input id="killEnormousInput" style="display:inline;" placeholder="0"></input> (Enormous) = <div id="killEnormousPoints" style="display:inline;"></div> <br /> <button onclick="calculate()">CALCULATE POINTS</button> <br /> <span style="color:#0000FF;font-weight:bold;">Calculated Points:</span><div id="results" class="indented" style="display:inline;">??? points</div>';
  }
});