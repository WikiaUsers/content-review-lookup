/*
    * @description     Adds token simulator form to pages.
    * @author          CA.EXCELSIOR
    * @notes           
        * Works only is there is an element with id='tokenSimulationContainer' where form elements are added
        * Optionaly element with id='tokenSimulationResult' is targeted for output if it exsist, else it is created
        * Best option is to use Template:TokenSimulation created in purpose of using it with this script
*/

const maxNumOfIterations = 1000000; // upper limit preventing unreasonable input
const tokenSpentLimit = 20000; // upper limit preventing unreasonable input i.e. 100% token refund
var simulationRunning = false;
var stopSimulation = false;

function buildTokenSimulationForm() {
    const formContainer = document.getElementById('tokenSimulationContainer');

    // if tokenSimulationContainer doesn't exist than silent return
    if (!formContainer) {
        return;
    }

    console.log('|--> Starting: build token simulation form --->');

    // form element
    const form = document.createElement('form');
    form.setAttribute('id', 'tokenSimulationForm');
    form.setAttribute('action', 'javascript:;');

    // Initial tokens input
    const initialTokensInput = document.createElement('input');
    initialTokensInput.setAttribute('name', 'initialTokens');
    initialTokensInput.setAttribute('id', 'initialTokens');
    initialTokensInput.setAttribute('required', true);
    initialTokensInput.setAttribute('type', 'number');
    initialTokensInput.setAttribute('min', 0);
    initialTokensInput.setAttribute('max', 1000);
    initialTokensInput.setAttribute('placeholder', '10');
    initialTokensInput.setAttribute('value', '10');

    const initialTokensLabel = document.createElement('label');
    initialTokensLabel.setAttribute('for', 'initialTokens');
    initialTokensLabel.textContent = 'Initial tokens:';

    form.appendChild(initialTokensLabel);
    form.appendChild(initialTokensInput);

    // Maximum tokens input
    const maxTokensInput = document.createElement('input');
    maxTokensInput.setAttribute('name', 'maxTokens');
    maxTokensInput.setAttribute('id', 'maxTokens');
    maxTokensInput.setAttribute('required', true);
    maxTokensInput.setAttribute('type', 'number');
    maxTokensInput.setAttribute('min', 0);
    maxTokensInput.setAttribute('max', 1000);
    maxTokensInput.setAttribute('placeholder', '10');
    maxTokensInput.setAttribute('value', '10');

    const maxTokensLabel = document.createElement('label');
    maxTokensLabel.setAttribute('for', 'maxTokens');
    maxTokensLabel.textContent = 'Max tokens:';

    form.appendChild(maxTokensLabel);
    form.appendChild(maxTokensInput);

    // Number of iterations input
    const numOfIterationsInput = document.createElement('input');
    numOfIterationsInput.setAttribute('name', 'numOfIterations');
    numOfIterationsInput.setAttribute('id', 'numOfIterations');
    numOfIterationsInput.setAttribute('required', true);
    numOfIterationsInput.setAttribute('type', 'number');
    numOfIterationsInput.setAttribute('min', 1);
    numOfIterationsInput.setAttribute('max', maxNumOfIterations);
    numOfIterationsInput.setAttribute('placeholder', '20000');
    numOfIterationsInput.setAttribute('value', '20000');

    const numOfIterationsLabel = document.createElement('label');
    numOfIterationsLabel.setAttribute('for', 'numOfIterations');
    numOfIterationsLabel.textContent = 'Number of iterations:';

    form.appendChild(numOfIterationsLabel);
    form.appendChild(numOfIterationsInput);

    // Layla input
    const laylaInput = document.createElement('input');
    laylaInput.setAttribute('name', 'layla');
    laylaInput.setAttribute('id', 'layla');
    laylaInput.setAttribute('required', true);
    laylaInput.setAttribute('type', 'number');
    laylaInput.setAttribute('step', '0.01');
    laylaInput.setAttribute('min', 0);
    laylaInput.setAttribute('max', 200);
    laylaInput.setAttribute('placeholder', '101.04');
    laylaInput.setAttribute('value', '101.04');

    const laylaLabel = document.createElement('label');
    laylaLabel.setAttribute('for', 'layla');
    laylaLabel.textContent = 'Layla:';

    form.appendChild(laylaLabel);
    form.appendChild(laylaInput);

    let spanPercent = document.createElement('span');
    spanPercent.textContent = '%';
    form.appendChild(spanPercent);

    // Monkey King input
    const monkeyKingInput = document.createElement('input');
    monkeyKingInput.setAttribute('name', 'monkeyKing');
    monkeyKingInput.setAttribute('id', 'monkeyKing');
    monkeyKingInput.setAttribute('required', true);
    monkeyKingInput.setAttribute('type', 'number');
    monkeyKingInput.setAttribute('step', '0.01');
    monkeyKingInput.setAttribute('min', 0);
    monkeyKingInput.setAttribute('max', 100);
    monkeyKingInput.setAttribute('placeholder', '0.00');
    monkeyKingInput.setAttribute('value', '20');

    const monkeyKingLabel = document.createElement('label');
    monkeyKingLabel.setAttribute('for', 'monkeyKing');
    monkeyKingLabel.textContent = 'Monkey King:';

    form.appendChild(monkeyKingLabel);
    form.appendChild(monkeyKingInput);

    spanPercent = document.createElement('span');
    spanPercent.textContent = '%';
    form.appendChild(spanPercent);

    // Isla input
    const islaInput = document.createElement('input');
    islaInput.setAttribute('name', 'isla');
    islaInput.setAttribute('id', 'isla');
    islaInput.setAttribute('required', true);
    islaInput.setAttribute('type', 'number');
    islaInput.setAttribute('step', '0.1');
    islaInput.setAttribute('min', 0);
    islaInput.setAttribute('max', 100);
    islaInput.setAttribute('placeholder', '0.0');
    islaInput.setAttribute('value', '16');

    const islaLabel = document.createElement('label');
    islaLabel.setAttribute('for', 'isla');
    islaLabel.textContent = 'Isla:';

    form.appendChild(islaLabel);
    form.appendChild(islaInput);

    spanPercent = document.createElement('span');
    spanPercent.textContent = '%';
    form.appendChild(spanPercent);

    // Wall input
    const wallInput = document.createElement('input');
    wallInput.setAttribute('name', 'wall');
    wallInput.setAttribute('id', 'wall');
    wallInput.setAttribute('required', true);
    wallInput.setAttribute('type', 'number');
    wallInput.setAttribute('step', '1');
    wallInput.setAttribute('min', 0);
    wallInput.setAttribute('max', 100);
    wallInput.setAttribute('placeholder', '18');
    wallInput.setAttribute('value', '18');

    const wallLabel = document.createElement('label');
    wallLabel.setAttribute('for', 'wall');
    wallLabel.textContent = 'Wall:';

    form.appendChild(wallLabel);
    form.appendChild(wallInput);

    spanPercent = document.createElement('span');
    spanPercent.textContent = '%';
    form.appendChild(spanPercent);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Simulate';
    form.appendChild(submitButton);

    // if it doesn't exist create it
    if (!document.getElementById('tokenSimulationResult')) {
        const resultDiv = document.createElement('div');
        resultDiv.setAttribute('id', 'tokenSimulationResult');
        form.appendChild(resultDiv);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (simulationRunning) {
            stopSimulation = true;
            submitButton.textContent = 'Stopping simulation...';
        }
        else {
            simulationRunning = true;
            stopSimulation = false;
            submitButton.textContent = 'Stop simulation';

            simulateTokensChunked(form)
                .then(() => {
                })
                .catch(err => {
                    console.error('Simulation error: ', err);
                })
                .finally(() => {
                    simulationRunning = false;
                    stopSimulation = false;
                    submitButton.textContent = 'Simulate';
                });
        }
    });



    document.body.appendChild(form);

    console.log('---> Finished: build token simulation form -->|');
}
addOnloadHook(buildTokenSimulationForm);

function simulateTokensChunked(form) {
    return new Promise((resolve, reject) => {

        console.log('|--> Starting: token simulation --->');

        const resultDiv = document.getElementById('tokenSimulationResult');
        if (!resultDiv) {
            reject("simulationResult div element not found!");
            return;
        }

        const formData = new FormData(form);

        const initialTokens = Number(formData.get('initialTokens'));
        const maxTokens = Number(formData.get('maxTokens'));

        if (initialTokens > maxTokens) {
            resultDiv.textContent = "Initial tokens exceed max tokens, it could be intentional or an error.";
            console.warn("Initial tokens exceed max tokens, it could be intentional or an error.");
        }

        const numOfIterations = Number(formData.get('numOfIterations'));

        if (numOfIterations <= 0) {
            resultDiv.textContent = 'Number of iterations too low (min: 1)!';
            reject('Number of iterations too low low (min: 1)!');
            return;
        } else if (numOfIterations > maxNumOfIterations) {
            resultDiv.textContent = `Number of iterations too high (max: ${maxNumOfIterations})!`;
            reject(`Number of iterations too high (max: ${maxNumOfIterations})!`);
            return;
        }

        const layla = Number(formData.get('layla')) / 100;
        const monkeyKing = (Number(formData.get('monkeyKing')) / 100) * (1 + layla);
        const isla = (Number(formData.get('isla')) / 100) * (1 + layla);
        const wall = (Number(formData.get('wall')) / 100);

        console.log('Token simulation input data:', Object.fromEntries(formData.entries()));

        let tokenLimitReachedCount = 0
        let totalTokensSpent = 0;
        let iterationsCnt = 0;

        resultDiv.textContent = `Simulating for ${numOfIterations} iterations....`
        console.log(`Simulating for ${numOfIterations} iterations....`)
        const startTime = performance.now();

        function runChunk() {
            const chunkSize = 500;
            const end = Math.min(iterationsCnt + chunkSize, numOfIterations);

            for (; iterationsCnt < end; iterationsCnt++) {
                let tokensSpent = 0;
                let tokensCurrent = initialTokens;
                // spend tokens until 0 or tokenSpentLimit reached
                while (tokensSpent < tokenSpentLimit && tokensCurrent > 0) {
                    if (stopSimulation) break;

                    tokensCurrent--; // spent one token
                    if (Math.random() >= (1 - monkeyKing)) tokensCurrent++; // gained token form Monkey King
                    if (Math.random() >= (1 - isla)) tokensCurrent++; // gained token form Isla
                    if (Math.random() >= (1 - wall)) tokensCurrent++; // gained token form Wall Tower
                    tokensCurrent = Math.min(maxTokens, tokensCurrent); // cap tokens

                    tokensSpent++
                }

                if (stopSimulation) break;

                totalTokensSpent += tokensSpent;
                if (tokensSpent >= tokenSpentLimit) tokenLimitReachedCount++;
            }

            resultDiv.textContent = `Progress: ${iterationsCnt} / ${numOfIterations} iterations`;

            if (iterationsCnt < numOfIterations && !stopSimulation) {
                setTimeout(runChunk, 0);
            } else {
                const endTime = performance.now();

                let avgTokens;
                if (iterationsCnt == 0)
                    avgTokens = 0;
                else
                    avgTokens = totalTokensSpent / iterationsCnt;

                let finishedMessage;
                if (stopSimulation)
                    finishedMessage = `Simulation stopped early! It took ${((endTime - startTime) / 1000).toFixed(2)} seconds.`;
                else
                    finishedMessage = `Simulation finished! It took ${((endTime - startTime) / 1000).toFixed(2)} seconds.`;

                if (tokenLimitReachedCount > 0) {
                    let message = `${finishedMessage}\n\nAverage tokens:\n ${avgTokens} (NOTE: might not be accurate because ${tokenLimitReachedCount} out of ${iterationsCnt} iterations reached tokenSpentLimit of ${tokenSpentLimit})`;
                    resultDiv.textContent = message;
                    console.log(message);
                }
                else {
                    let message = `${finishedMessage}\n\nAverage tokens: ${avgTokens}`
                    resultDiv.textContent = message;
                    console.log(message);
                }

                resolve();
            }
        }

        runChunk();

        console.log('---> Finished: token simulation -->|');

    });
}