setTimeout(() => {
            // Example data: level -> coins
            const coinsPerLevel = {
                1: 2,
                2: 3,
                3: 5,
                4: 7,
                5: 10,
                // Add up to level 50...
            };

            // Get the main div
            const calculatorDiv = document.getElementById("calculator");

            // Create elements dynamically
            const title = document.createElement("h2");
            title.innerText = "Level Coin Calculator";

            const fromLabel = document.createElement("label");
            fromLabel.innerText = "From Level:";

            const fromInput = document.createElement("input");
            fromInput.type = "number";
            fromInput.id = "fromLevel";
            fromInput.min = 1;
            fromInput.max = 50;

            const toLabel = document.createElement("label");
            toLabel.innerText = "To Level:";

            const toInput = document.createElement("input");
            toInput.type = "number";
            toInput.id = "toLevel";
            toInput.min = 1;
            toInput.max = 50;

            const button = document.createElement("button");
            button.innerText = "Calculate";
            button.onclick = calculateCoins;

            const resultText = document.createElement("h3");
            resultText.innerHTML = 'Result: <span id="result">0</span> coins';

            // Append elements to the div
            calculatorDiv.appendChild(title);
            calculatorDiv.appendChild(fromLabel);
            calculatorDiv.appendChild(fromInput);
            calculatorDiv.appendChild(toLabel);
            calculatorDiv.appendChild(toInput);
            calculatorDiv.appendChild(button);
            calculatorDiv.appendChild(resultText);

            function calculateCoins() {
                let fromLevel = parseInt(fromInput.value);
                let toLevel = parseInt(toInput.value);

                if (isNaN(fromLevel) || isNaN(toLevel) || fromLevel < 1 || toLevel > 50 || fromLevel > toLevel) {
                    document.getElementById("result").innerText = "Invalid input";
                    return;
                }

                let totalCoins = 0;
                for (let i = fromLevel; i <= toLevel; i++) {
                    totalCoins += coinsPerLevel[i] || 0; // Default to 0 if level is missing
                }

                document.getElementById("result").innerText = totalCoins;
            }
        }, 1000); // 1-second delay