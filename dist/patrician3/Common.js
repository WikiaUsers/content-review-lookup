function crew_wages_calc() {
     var captainwages= Number(document.getElementById('captainwages').value);
     var convoyleadercrew= Number(document.getElementById('convoyleadercrew').value);
     var ship1number= Number(document.getElementById('ship1number').value);
     var ship1crew= Number(document.getElementById('ship1crew').value);
     var ship2number= Number(document.getElementById('ship2number').value);
     var ship2crew= Number(document.getElementById('ship2crew').value);
     var ship3number= Number(document.getElementById('ship3number').value);
     var ship3crew= Number(document.getElementById('ship3crew').value);
     var ship4number= Number(document.getElementById('ship4number').value);
     var ship4crew= Number(document.getElementById('ship4crew').value);

     var wag= [0,28,42,56,70,84,98,112,126,140,154,168,182,196,210,224,238,252,266,280,294,308,322,336,350,364,378,392,406,420,434,448,462,476,490,504,518,532,546,560,574,588,602,616,630,644,658,672,686,700,714,728,742,756,770,784,798,812,826,840,854,868,882,896,910,924,938,952,966,980,994];

     document.getElementById('totalwages').innerHTML = captainwages + wag[convoyleadercrew] + (ship1number * wag[ship1crew]) + (ship2number * wag[ship2crew]) + (ship3number * wag[ship3crew]) + (ship4number * wag[ship4crew]);

     document.getElementById('totalsailors').innerHTML = convoyleadercrew + (ship1number * ship1crew) + (ship2number * ship2crew) + (ship3number * ship3crew) + (ship4number * ship4crew);
}