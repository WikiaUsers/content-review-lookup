function abbreviate(number) {
	const affixes = ["k", "M", "B", "T", "qd", "Qn", "Sx"];
	let output = number;
	for (let a = 0; a < (affixes.length * 3); a++) {
    	  if (number >= (1000 * (10 ** a)) && number < (10000 * (10 ** a))) {
    	      output = ((Math.floor(number / (10 * (10 ** a)))) / (100 / (10 ** (a % 3)))) + affixes[Math.floor(a/3)];
    	      break;
    	  }
  }
	return output;
}

function generateTable(multi) {
	if (multi == undefined) {
  	multi = 1;
  }
	const titlerowtext = ["Rank", "XP", "XP (analyzer)", "XP (particlizer)"]
	const ranks = ["Newbie", "Beginner", "Average", "Venturer", "Experienced", "Professional", "Expert", "Legend", "Master", "Grand Master", "Overlord", "Dedicated", "Nolife", "Soulless", "Enlightened", "Divine", "Almighty", "Ascendant", "Transcendent", "Reverent", "Omnipotent", "Voxel Venturer", "Supreme Voxel Venturer", "True Voxel Venturer"]
  const xp = [1e+5, 1e+5, 1e+5, 1e+5, 12e+4, 15e+4, 2e+5, 75e+4, 25e+5, 1e+7, 5e+7, 2e+8, 1e+9, 5e+9, 25e+9, 175e+9, 125e+10, 15e+12, 80e+12, 5e+14, 3e+15, 125e+14, 50e+15, 256e+15]
	const tbl = document.createElement("table");
  const titlerow = document.createElement("tr")
  for (let t = 0; t < titlerowtext.length; t++) {
    const title = document.createElement("th")
    const titletext = document.createTextNode(titlerowtext[t])
    title.appendChild(titletext);
    titlerow.appendChild(title);
    tbl.appendChild(titlerow);
  }
  for (let i = 0; i < ranks.length; i++) {
  	const row = document.createElement("tr");
  		const cella = document.createElement("td");
  		const texta = document.createTextNode(ranks[i]);
      const cellb = document.createElement("td");
  		const textb = document.createTextNode(abbreviate(xp[i] * multi));
      const cellc = document.createElement("td");
  		const textc = document.createTextNode(abbreviate((xp[i] * multi) * 1.35));
      const celld = document.createElement("td");
  		const textd = document.createTextNode(abbreviate((xp[i] * multi) / 2));
    	cella.appendChild(texta);
      cellb.appendChild(textb);
      cellc.appendChild(textc);
      celld.appendChild(textd);
  		row.appendChild(cella);
      row.appendChild(cellb);
      row.appendChild(cellc);
      row.appendChild(celld);
  tbl.appendChild(row);
  }
  document.body.appendChild(tbl);
  tbl.setAttribute("border", "2");
  console.log("XP multiplier: x" + multi);
}