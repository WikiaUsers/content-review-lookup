document.addEventListener("DOMContentLoaded", function () {
    const dinoValues = {
        "": 0,
	    "Newbiesaurus": 100,
	    "RazorClaw": 100,
	    "Chadalodon": 100,
	    "Chompasaurus": 100,
	    "Beastasaur": 100,
	    "Raptoe": 100,
	    "Tyrugosaur Rex": 100,
	    "Chilladon": 100,
	    "DilophosUGus": 100,
	    "Unkylosaurus": 100,
	    "CryolophosUGus": 100,
	    "PrUGator": 100,
	    "Tuffaluffagus": 100,
	    "Torknash": 100,
	    "Mammathor": 100,
	    "Gertiesaur": 100,
	    "Shelldon": 100,
	    "Grugadon": 100,
	    "UGliesaur": 100,
	    "Aurasaur": 100,
	    "UGuanadon": 100,
	    "Xenodon": 100,
	    "Magmadon": 100,
	    "Triskeletops": 100,
	    "Cryodon": 100,
	    "Crystadon": 100,
	    "Skeledon": 100,
	    "Skellemagmon": 100,
	    "Swoopjaw": 100,
	    "Terrordactyl": 100,
	    "DiemorphUGon": 100,
	    "Dragadon": 100,
	    "Flaptor": 100,
	    "BallrUG": 100,
	    "SpinosUgus": 100,
	    "Hammer HUG": 100,
	    "KronosUGus": 100,
	    "MosasUGus": 100,
	    "Chugadon": 100,
	    "Choomamasaur": 100,
	    "Gertie Rex": 100,
	    "UGlitoe": 100,
	    "SwoopClaw": 100,
	    "SUGnash": 100,
	    "SpinyBeast": 100,
	    "Shelladactyl": 100,
	    "XUGator": 100,
	    "Auraluffagus": 100,
    };

    const yourGrid = document.getElementById("your-dino-grid");
    const theirGrid = document.getElementById("their-dino-grid");
    if (!yourGrid || !theirGrid) return;

    function createDropdowns(container, prefix, borderColor) {
        for (let i = 1; i <= 7; i++) {
            let select = document.createElement("select");
            select.id = `${prefix}-dino-${i}`;
            select.style.cssText = `width: 30%; height: 50px; border-radius: 6px; font-size: 0.8em; font-weight: bold; text-align: center; border: 2px dashed rgba(139,49,3,0.4); background: rgba(0,0,0,0.05); color: rgba(0,0,0,0.5); cursor: pointer; padding: 2px;`;
            
            Object.keys(dinoValues).forEach(dino => {
                let opt = document.createElement("option");
                opt.value = dino;
                opt.textContent = dino === "" ? "+" : dino;
                select.appendChild(opt);
            });

            select.addEventListener("change", function() {
                if (this.value === "") {
                    this.style.background = "rgba(0,0,0,0.05)";
                    this.style.border = `2px dashed ${borderColor}66`;
                    this.style.color = "rgba(0,0,0,0.5)";
                } else {
                    this.style.background = "#fff";
                    this.style.border = `2px solid ${borderColor}`;
                    this.style.color = "#000";
                }
                calculateTrade();
            });

            container.appendChild(select);
        }
    }

    createDropdowns(yourGrid, "your", "#8b3103");
    createDropdowns(theirGrid, "their", "#501b01");

    function calculateTrade() {
        let yourTotal = 0;
        let theirTotal = 0;

        for (let i = 1; i <= 7; i++) {
            yourTotal += dinoValues[document.getElementById(`your-dino-${i}`).value] || 0;
            theirTotal += dinoValues[document.getElementById(`their-dino-${i}`).value] || 0;
        }

        document.getElementById("your-total-value").textContent = yourTotal;
        document.getElementById("their-total-value").textContent = theirTotal;

        const verdictBar = document.getElementById("trade-verdict-bar");
        const verdictText = document.getElementById("trade-verdict-text");

        if (yourTotal === 0 && theirTotal === 0) {
            verdictBar.style.cssText = "margin-top: 15px; padding: 10px; border-radius: 6px; text-align: center; font-weight: bold; font-size: 1.2em; background-color: #fff3cd; color: #856404; border: 2px solid #ffeeba;";
            verdictText.textContent = "🤝 FAIR TRADE (Equal Value)";
        } else if (theirTotal > yourTotal * 1.15) {
            verdictBar.style.cssText = "margin-top: 15px; padding: 10px; border-radius: 6px; text-align: center; font-weight: bold; font-size: 1.2em; background-color: #d4edda; color: #155724; border: 2px solid #c3e6cb;";
            verdictText.textContent = "🎉 BIG WIN (They are overpaying!)";
        } else if (theirTotal < yourTotal * 0.85) {
            verdictBar.style.cssText = "margin-top: 15px; padding: 10px; border-radius: 6px; text-align: center; font-weight: bold; font-size: 1.2em; background-color: #f8d7da; color: #721c24; border: 2px solid #f5c6cb;";
            verdictText.textContent = "❌ BIG LOSS (You are overpaying!)";
        } else {
            verdictBar.style.cssText = "margin-top: 15px; padding: 10px; border-radius: 6px; text-align: center; font-weight: bold; font-size: 1.2em; background-color: #fff3cd; color: #856404; border: 2px solid #ffeeba;";
            verdictText.textContent = "🤝 FAIR TRADE (Equal Value)";
        }
    }
});