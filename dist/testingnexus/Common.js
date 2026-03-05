/* Any JavaScript here will be loaded for all users on every page load. */

const coloredTables = new Set(); // Track colored tables

function applyColorsToTableCells() {
	
	const cols = ["UTR", "MOR", "CMP", "LTL", "OTT"];
	const rows = ["PP", "P", "SP", "", "M", "SN", "N", "NN"];
	const default_row = rows.indexOf("");
	
	const row1 = ["#c9daf8", "#a4c2f4", "#6d9eeb", "#3c78d8", "#4a86e8"];
	const row2 = ["#d0e0e3", "#a2c4c9", "#76a5af", "#45818e", "#00ffff"];
	const row3 = ["#d9ead3", "#b6d7a8", "#93c47d", "#6aa84f", "#00ff00"];
	const row4 = ["#fff2cc", "#ffe599", "#ffd966", "#f1c232", "#ffff00"];
	const row5 = ["#fce5cd", "#f9cb9c", "#f6b26b", "#e69138", "#ff9900"];
	const row6 = ["#f4cccc", "#ea9999", "#e06666", "#cc0000", "#ff0000"];
	const row7 = ["#ead1dc", "#d5a6bd", "#c27ba0", "#a64d79", "#ff00ff"];
	const row8 = ["#d9d2e9", "#b4a7d6", "#8e7cc3", "#674ea7", "#9900ff"];
		
	const colorMap = [
		row1,
		row2,
		row3,
		row4,
		row5,
		row6,
		row7,
		row8,
	];
	
	
	// season info
	const playersBySeason = {
        15: ["Indigo", "Spec", "Kai", "Alatus", "Ryan", "Dylan", "Inisra", "Birdie", "Bryce", "George", "Commit", "Dani", "Hanza", "Togepi", "Clover", "Lycan/Oran", "Nina", "Lag", "Mike Guy", "Chezmai", "Etmikarily", "Jojo", "Internet", "Pinguins", "Bagel", "Sylvan", "Conut", "Nate", "Cupid", "Tyson", "Conyycal", "Blixie", "Aqua", "Anev", "Frosty", "Aslan", "Blob", "Myco", "Lesliey", "Phaghotte", "Jay", "Gabe", "Cydr", "Cat", "Raymond", "Kaii", "RJ", "Cookies", "Yodalina", "Aydan", "Tamao", "Pat", "Aquamarine", "Onyx", "Ria", "Uni", "Pluto", "Bubbie", "Darkark", "Vincent", "Raine", "Kinda", "Malt", "Rem"],
	};
	
	const teamsBySeason = {
	    15: ["Wrath", "Pride", "Greed", "Sloth", "Envy", "Gluttony", "Lust", "The Pure", "The Just", "The Good", "The Neutral", "The Wicked", "The Sinful", "The Evil", "Crimson", "Olive", "Forest", "Sky", "Rose", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Crimson", "Teal", "Periwinkle", "Clovers", "Blossoms", "Merge"],
	};
	
	const seasonsInfo = {  // have phases (e.g. swap teams)
	    1: {
	    	// fill later when needed
    	},
	    15: {
	        1: {
                "Wrath": {
                    color: "#e25131",
                    players: [
                        "Aquamarine", "Bubbie", "Cydr", "Frosty", "Kaii", "Lesliey", "Pinguins", "Ria", "Yodalina",
                    ],
                },
                "Pride": {
                    color: "#ffd400",
                    players: [
                        "Birdie", "Blixie", "Bryce", "Hanza", "Malt", "Mike Guy", "Nate", "Togepi", "Vincent"
                    ],
                },
                "Greed": {
                    color: "#6bb971",
                    players: [
                        "Alatus", "Blob", "Cat", "Conyycal", "Indigo", "Internet", "Pluto", "Ryan", "Uni"
                    ],
                },
                "Sloth": {
                    color: "#35a1cd",
                    players: [
                        "Anev", "Aslan", "Bagel", "Chezmai", "George", "Lag", "Myco", "Onyx", "Raymond"
                    ],
                },
                "Envy": {
                    color: "#3641ff",
                    players: [
                        "Cupid", "Dani", "Dylan", "Inisra", "Kai", "Kinda", "Spec", "Tamao", "Tyson"
                    ],
                },
                "Gluttony": {
                    color: "#7210af",
                    players: [
                        "Aydan", "Clover", "Cookies", "Darkark", "Etmikarily", "Jojo", "Phaghotte", "Raine", "Sylvan"
                    ],
                },
                "Lust": {
                    color: "#e036da",
                    players: [
                        "Aqua", "Commit", "Conut", "Gabe", "Jay", "Lycan/Oran", "Nina", "Pat", "RJ"
                    ],
                },
	        },
	        2: {
	            "The Pure": {
                    color: "#a3e0ff",
                    players: [
                        "Commit", "Conut", "Inisra", "Jojo", "Kaii", "Lesliey", "Nate", "Spec"
                    ],
                },
                "The Just": {
                    color: "#eb9aff",
                    players: [
                        "Alatus", "Chezmai", "Clover", "Cydr", "George", "Internet", "Ryan", "Tamao"
                    ],
                },
                "The Good": {
                    color: "#fffaa2",
                    players: [
                        "Aqua", "Cookies", "Lycan/Oran", "Mike Guy", "Pinguins", "RJ", "Togepi", "Tyson"
                    ],
                },
                "The Neutral": {
                    color: "#597295",
                    players: [
                        "Anev", "Birdie", "Bryce", "Indigo", "Jay", "Lag", "Pat", "Phaghotte"
                    ],
                },
                "The Wicked": {
                    color: "#69a18d",
                    players: [
                        "Aydan", "Bagel", "Conyycal", "Dylan", "Hanza", "Kai", "Ramond", "Sylvan"
                    ],
                },
                "The Sinful": {
                    color: "#714b4b",
                    players: [
                        "Aslan", "Blixie", "Blob", "Cat", "Frosty", "Gabe", "Nina", "Yodalina"
                    ],
                },
	        },
	        3: {
	            "The Pure": {
                    color: "#a3e0ff",
                    players: [
                        "Commit", "Inisra", "Kaii", "Lesliey", "Nate", "Spec"
                    ],
                },
                "The Just": {
                    color: "#eb9aff",
                    players: [
                        "Alatus", "Clover", "Cydr", "George", "Internet", "Ryan"
                    ],
                },
                "The Good": {
                    color: "#fffaa2",
                    players: [
                        "Aqua", "Lycan/Oran", "Mike Guy", "Pinguins", "RJ", "Togepi"    
                    ],
                },
                "The Neutral": {
                    color: "#597295",
                    players: [
                        "Anev", "Bryce", "Indigo", "Jay", "Lag", "Phaghotte"
                    ],
                },
                "The Wicked": {
                    color: "#69a18d",
                    players: [
                        "Bagel", "Conyycal", "Dylan", "Hanza", "Raymond", "Sylvan"    
                    ],
                },
                "The Sinful": {
                    color: "#714b4b",
                    players: [
                        "Aslan", "Blixie", "Blob", "Cat", "Frosty", "Nina"    
                    ],
                },
                "The Evil": {
                    color: "#432e7f",
                    players: [
                        "Birdie", "Chezmai", "Gabe", "Jojo", "Kai", "Tyson"
                    ],
                },
	        },
	        4: {
	            "Crimson": {
                    color: "#d20707",
                    players: [
                        "Anev", "Blixie", "Conyycal", "Cupid", "Jojo", "Lesliey", "Mike Guy", "Ryan"    
                    ],
                },
                "Olive": {
                    color: "#7e8e00",
                    players: [
                       "Aslan", "Dani", "Indigo", "Internte", "Kai", "Lycan/Oran", "Nate", "Sylvan"
                    ],
                },
                "Forest": {
                    color: "#00603a",
                    players: [
                        "Chezmai", "Conut", "Dylan", "Hanza", "Nina", "Phaghotte", "Togepi", "Tyson"    
                    ],
                },
                "Sky": {
                    color: "#3e88ff",
                    players: [
                        "Aqua", "Blob", "Bryce", "Clover", "Etmikarily", "Inisra", "Pinguins", "Spec"    
                    ],
                },
                "Rose": {
                    color: "#d92fa0",
                    players: [
                        "Alatus", "Bagel", "Birdie", "Commit", "Frosty", "George", "Lag", "Myco"
                    ],
                },
	        },
	        5: {
	            "Red": {
                    color: "#e51212",
                    players: ["someplayer"],
                },
                "Orange": {
                    color: "#ff9900",
                    players: ["someplayer"],
                },
                "Yellow": {
                    color: "#ffec00",
                    players: ["someplayer"],
                },
                "Green": {
                    color: "#10ff00",
                    players: ["someplayer"],
                },
                "Blue": {
                    color: "#0027ff",
                    players: ["someplayer"],
                },
                "Purple": {
                    color: "#8000ff",
                    players: ["someplayer"],
                },
                "Immune": {
                    color: "#00ffff",
                    players: ["Indigo"],
                },
	        },
	        6: {
	            "Red": {
                    color: "#e51212",
                    players: ["someplayer"],
                },
                "Orange": {
                    color: "#ff9900",
                    players: ["someplayer"],
                },
                "Yellow": {
                    color: "#ffec00",
                    players: ["someplayer"],
                },
                "Green": {
                    color: "#10ff00",
                    players: ["someplayer"],
                },
                "Blue": {
                    color: "#0027ff",
                    players: ["someplayer"],
                },
                "Purple": {
                    color: "#8000ff",
                    players: ["someplayer"],
                },
                "Brown": {
                    color: "#7f3a00",
                    players: ["someplayer"],
                },
                "Immune": {
                    color: "#00ffff",
                    players: ["Chezmai", "Indigo"],
                },
	        },
	        7: {
	            "Marooon": {
                    color: "#7d0000",
                    players: [
                        "Alatus", "Etmikarily", "Dani", "Dylan", "Hanza", "Inisra", "Nina", "Pinguins", "Spec"    
                    ],
                },
                "Teal": {
                    color: "#007676",
                    players: [
                        "Bagel", "Birdie", "Bryce", "Clover", "Indigo", "Internet", "Lycan/Oran", "Mike Guy", "Ryan"
                    ],
                },
                "Periwinkle": {
                    color: "#a098f1",
                    players: [
                        "Chezmai", "Commit", "Conut", "George", "Jojo", "Kai", "Lag", "Sylvan", "Togepi"    
                    ],
                },
	        },
	        8: {
	            "Clovers": {
                    color: "#61ff73",
                    players: [
                        "Alatus", "Birdie", "Bryce", "Chezmai", "Dani", "George", "Hanza", "Indigo", "Kai", "Lag"
                    ],
                },
                "Blossoms": {
                    color: "#ff9dfa",
                    players: [
                        "Clover", "Commit", "Dylan", "Inisra", "Lycan/Oran", "Mike Guy", "Nina", "Ryan", "Spec", "Togepi"
                    ],
                },
	        },
	        9: {
	            "Merge": {
	                color: "#ffb100",
	                players: [
	                    "Alatus", "Birdie", "Bryce", "Clover", "Commit", "Dani", "Dylan", "George", "Hanza", "Indigo", "Inisra", "Kai", "Lycan/Oran", "Ryan", "Spec", "Togepi"    
                    ],
	            }
	        },
	    },
	};
	
	subtables = {
	    15: ["players", "player-summary", "phase-1"],
	};
	
	// player color mapping
	
	$("div.composite-table").each(function() {
	    
	    // get the class name of the composite table to know the season
	    // check that it is a votechart
	    const tableClassName = this.className;
	    const match = tableClassName.match(/votechart-season-(\d+)/);
	    console.log("tableClassName: ", tableClassName);
	    console.log("table matched: ", match);
	        
	    if (match) {
	        
	        // get season #
	        // assume this will be on the second part of the split (e.g. votechart-season-15)
	        
	        const season = parseInt(match[1], 10);
	        const currentSeason = seasonInfo[season];
	        const currentPlayers = playersBySeason[season];
	        var playerInfo = {};
	        
	        const tables = this.querySelectorAll("table.sub-table");
        
            tables.forEach(table => {
                
                // get the class name of the subtable (e.g. players, phase-1) to know what to do
                const subtableClass = subtables[season].find(str => table.className.includes(str));
                if (!subtableClass) return;
                
                const rows = table.querySelectorAll("tr");
                
                console.log("rows: ", rows);
                
                if (rows.length === 0) return;
                
                rows.forEach(row => {
                    
                    const cells = row.querySelectorAll("td");
                    cells.forEach(cell => {
                        // we need to write code for each type of subtable
                        if (subtableClass == "players") {
                            // check if cell has a player
                            const cellText = cell.textContent.trim();
                            if (cellText) {
                                // find players final team
                                const matchedPlayer = currentPlayers.find(player => cellText.includes(player));
                                // get team color
                                if (matchedPlayer) {
                                    if (!playerInfo.keys().contains(matchedPlayer)) {
                                        playerInfo[matchedPlayer] = {};
                                        for (const [phase, teams] of currentSeason) {
                                            for (const [team, teamInfo] of teams) {
                                                teamPlayers = teamInfo.players;
                                                if (teamPlayers.includes(matchedPlayer)) {
                                                    playerInfo[matchedPlayer].finalPhase = phase;
                                                    playerInfo[matchedPlayer].finalTeam = team;
                                                    playerInfo[matchedPlayer].finalColorcolor;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                    });
                    
                    // fill with coloring logic
                    // find cells with player
                    // figure out season and section of composite table
                    // find team for player
                    // get color
                    
                }); 
                
            });
	    }
        
	});
	
	// color code tables from text
	
    $("table").each(function() {
    	
        if (coloredTables.has($(this))) return; // Skip already colored table
     
        $(this).find("tbody tr td").each(function() {
            var text = $(this).text().trim();
            
            if (typeof text !== 'string') {
            	return;
            } // Skip invalid cells
			
			var code = text.split("-");
			
			var col = code[0];
			
			var row_index = -1;
			if (code.length == 2) {
				let matchingRows = rows.filter(row => code[1].includes(row));

	            if (matchingRows.length > 0) {
	                let longestRow = matchingRows.reduce((a, b) => a.length >= b.length ? a : b);
	                row_index = rows.indexOf(longestRow);
	            }
			}

			var col_index = -1;
			let matchingCols = cols.filter(column => col.includes(column));
            if (matchingCols.length > 0) {
                console.log("matchingCols, " + matchingCols);
                let longestCol = matchingCols.reduce((a, b) => a.length >= b.length ? a : b);
                 console.log("col " + longestCol);
                col_index = cols.indexOf(longestCol);
                console.log("col_index " + col_index);
            }
			
			var background_color = -1;
			
			if (col_index != -1 && row_index != -1) {
				background_color = colorMap[row_index][col_index];
			}
			else if (col_index != -1) {
				background_color = colorMap[default_row][col_index];
			}
            if (background_color != -1) {
                console.log("color " + background_color);
                $(this).css({
                	"background-color": background_color,
                	"color": "black", // for contrast
                });
            }
        });
        
        if ($(this).hasClass("placement-table")) {
            
            const rows = this.querySelectorAll("tr");
            
            console.log("rows: ", rows);
            
            if (rows.length === 0) return;
            
            rows.forEach(row => {
                
                if (!row.cells) return;
                
                console.log("cells: " + row.cells);
                
                Array.from(row.cells).forEach((cell, i, cells) => {
                    
                    console.log("cell: " + cell);
                    
                    let nextContent = "";
                    const currentContent = cell.textContent.trim();
                    if (i < cells.length - 1) {
                        nextContent = cells[i+1].textContent.trim();
                    }
                    console.log("currentContent: " + currentContent);
                    console.log("nextContent: " + nextContent);
                    
                    if (currentContent && nextContent.length === 0 && !cell.classList.contains("placement-cell")) {
                        cell.classList.add("placement-cell");
                        console.log("cellClasses: " + cell.classList);
                    }
                    
                });
            });
        }

        coloredTables.add($(this)); // Mark table as colored
    });
    
}

mw.hook("wikipage.content").add(function($content) {
	
    // Apply colors to existing tables
	applyColorsToTableCells();
	
	// Apply Placement Cell Colors
	
});