$(function(){
function uniquify(output, id, func) {
  for (var i = 0; i > -1; i++) {
    $("#" + output).attr("id", id + i);
    if ($("#" + id + i).text() != "") {
      parameter = $("#" + id + i).text();
      switch (func) {
      	case "generateTable":
      		($("#" + id + i)).append(generateTable(parameter));
      }
    } else {
      break;
    }
  }
}
uniquify("eltable", "eltableid", "generateTable");
});

function abbreviate(number) {
	const affixes = ["k", "M", "B", "T", "qd", "Qn", "Sx"];
  var output = number;
  for (var a = 0; a < (affixes.length * 3); a++) {
      if (number >= (1000 * Math.pow(10,a)) && number < (10000 * Math.pow(10,a))) {
          output = ((Math.floor(number / (10 * Math.pow(10,a)))) / (100 / Math.pow(10,(a % 3)))) + affixes[Math.floor(a/3)];
          break;
      }
  }
  return output;
}

// automatic generation of the Elusivite XP Table (this will likely not stay for long as the table probably won't show up on mobile but this is to mainly to test the unique ID system)
function generateTable(multi) {
	if (multi == undefined) {
  	multi = 1;
  }
	const titlerowtext = ["Rank", "XP", "XP (analyzer)", "XP (particlizer)"];
	const ranks = ["Newbie", "Beginner", "Average", "Venturer", "Experienced", "Professional", "Expert", "Legend", "Master", "Grand Master", "Overlord", "Dedicated", "Nolife", "Soulless", "Enlightened", "Divine", "Almighty", "Ascendant", "Transc;endent", "Reverent", "Omnipotent", "Voxel Venturer", "Supreme Voxel Venturer", "True Voxel Venturer"];
  const xp = [1e+5, 1e+5, 1e+5, 1e+5, 12e+4, 15e+4, 2e+5, 75e+4, 25e+5, 1e+7, 5e+7, 2e+8, 1e+9, 5e+9, 25e+9, 175e+9, 125e+10, 15e+12, 80e+12, 5e+14, 3e+15, 125e+14, 50e+15, 256e+15];
	const memory = document.createElement("span");
	const tbl = document.createElement("table");
  const titlerow = document.createElement("tr");
  for (var t = 0; t < titlerowtext.length; t++) {
    const title = document.createElement("th");
    const titletext = document.createTextNode(titlerowtext[t]);
    title.appendChild(titletext);
    titlerow.appendChild(title);
    tbl.appendChild(titlerow);
  }
  for (var i = 0; i < ranks.length; i++) {
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
  tbl.setAttribute("border", "2");
    memory.appendChild(tbl);
  return $(memory).html();
}