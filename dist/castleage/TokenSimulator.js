/**
 * @description Adds token simulator form to pages. Depends on: [[MediaWiki:CustomForm.js]] and [[MediaWiki:CustomForm.css]] for styles
 *              Works only if there is an element with id='tokenSimulationContainer' where form elements are added.
 *              Best option is to use [[Template:TokenSimulator]] created in purpose of using it with this script.
 * @author      CA.EXCELSIOR      
*/
'use strict';

const MAX_NUM_OF_ITERATIONS = 1000000; // upper limit preventing unreasonable input
const TOKEN_SPENT_LIMIT = 20000; // upper limit preventing unreasonable input i.e. 100% token refund
const CHUNK_SIZE = 100; // size for running chunked simulation
const IDS = {
    targetContainerId: 'tokenSimulationContainer',
    form: 'tokenSimulationForm',
    numOfIterations: 'numOfIterationsTokenSim',
    initialTokens: 'initialTokensTokenSim',
    tokenCap: 'tokenCapTokenSim',
    layla: 'laylaTokenSim',
    monkeyKing: 'monkeyKingTokenSim',
    isla: 'islaTokenSim',
    wall: 'wallTokenSim',
    progress: 'simProgressTokenSim',
    result: 'resultTokenSim'
};

let simulationRunning = false;
let stopSimulation = false;

// get container
const formContainer = document.getElementById(IDS.targetContainerId);

if (formContainer) {
    // load CustomForm.js file
    importArticles({
        type: "script",
        article: "MediaWiki:CustomForm.js"
    }).then(function () {
        // build form
        buildTokenSimulationForm();
    }).catch(function (error) {
        console.error('Error loading MediaWiki:CustomForm.js: ', error);
    });
}
else {
    console.error("TokenSimulator container missing: element with id='tokenSimulationContainer' does not exist.");
}

// after this only definitions ==============================
// ==========================================================

function buildTokenSimulationForm() {
    // cache customForm namespace
    const cf = window.customForm;

    // form element
    const form = cf.createForm({ id: IDS.form });

    // Number of iterations input
    const numOfIterations = document.createElement('input');
    numOfIterations.id = IDS.numOfIterations;
    numOfIterations.name = numOfIterations.id;
    numOfIterations.type = 'number';
    numOfIterations.required = true;
    numOfIterations.value = 20000;
    numOfIterations.placeholder = '20000';
    numOfIterations.min = 1;
    numOfIterations.max = MAX_NUM_OF_ITERATIONS;

    form.appendChild(cf.createLabelGroupVertical({
        input: numOfIterations,
        label: 'Number of iterations'
    }));

    // Token group
    // Initial tokens input
    const initialTokens = document.createElement('input');
    initialTokens.id = IDS.initialTokens;
    initialTokens.name = initialTokens.id;
    initialTokens.type = 'number';
    initialTokens.required = true;
    initialTokens.value = 10;
    initialTokens.placeholder = '10';
    initialTokens.min = 0;
    initialTokens.max = 1000;

    // Token cap input
    const tokenCap = document.createElement('input');
    tokenCap.id = IDS.tokenCap;
    tokenCap.name = tokenCap.id;
    tokenCap.type = 'number';
    tokenCap.required = true;
    tokenCap.value = 10;
    tokenCap.placeholder = '10';
    tokenCap.min = 1;
    tokenCap.max = 1000;

    form.appendChild(cf.createFormGroupHorizontal({
        elements: [
            cf.createLabelGroupVertical({ input: initialTokens, label: 'Initial tokens' }),
            cf.createLabelGroupVertical({ input: tokenCap, label: 'Token cap' }),
        ]
    }));

    // Refund section
    // Layla input
    const layla = document.createElement('input');
    layla.id = IDS.layla;
    layla.name = layla.id;
    layla.type = 'number';
    layla.value = 101.04;
    layla.placeholder = '0.00';
    layla.min = 0;
    layla.max = 200;
    layla.step = 0.01;

    // Monkey King input
    const monkeyKing = document.createElement('input');
    monkeyKing.id = IDS.monkeyKing;
    monkeyKing.name = monkeyKing.id;
    monkeyKing.type = 'number';
    monkeyKing.value = 20;
    monkeyKing.placeholder = '0.00';
    monkeyKing.min = 0;
    monkeyKing.max = 100;
    monkeyKing.step = 0.01;

    // Isla input
    const isla = document.createElement('input');
    isla.id = IDS.isla;
    isla.name = isla.id;
    isla.type = 'number';
    isla.value = 16;
    isla.placeholder = '0.0';
    isla.min = 0;
    isla.max = 100;
    isla.step = 0.1;

    // Wall input
    const wall = document.createElement('input');
    wall.id = IDS.wall;
    wall.name = wall.id;
    wall.type = 'number';
    wall.value = 18;
    wall.placeholder = '0';
    wall.min = 0;
    wall.max = 100;
    wall.step = 1;

    form.appendChild(cf.createFormGroupHorizontal({
        elements: [
            cf.createLabelGroupVertical({ input: layla, label: 'Layla', suffixes: ['%'] }),
            cf.createLabelGroupVertical({ input: monkeyKing, label: 'Monkey King', suffixes: ['%'] }),
            cf.createLabelGroupVertical({ input: isla, label: 'Isla', suffixes: ['%'] }),
            cf.createLabelGroupVertical({ input: wall, label: 'Wall', suffixes: ['%'] })
        ]
    }));

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Simulate';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    // Progress bar
    const simProgressElement = document.createElement('progress');
    simProgressElement.id = IDS.progress;
    simProgressElement.value = 0;
    simProgressElement.max = 100;
    form.appendChild(simProgressElement);

    // Result textarea
    const resultElement = document.createElement('textarea');
    resultElement.id = IDS.result;
    resultElement.rows = 7;
    resultElement.readonly = true;
    resultElement.placeholder = 'Simulation report...';

    form.appendChild(resultElement);

    // add event listener for submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (simulationRunning) {
            stopSimulation = true;
            submitButton.disabled = true;
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
                    resultElement.textContent = 'Simulation error: ' + err;
                })
                .finally(() => {
                    simulationRunning = false;
                    stopSimulation = false;
                    submitButton.textContent = 'Simulate';
                    submitButton.disabled = false;
                });
        }
    });

    cf.finalizeCustomForm(form);

    formContainer.appendChild(form);
}

function simulateTokensChunked(form) {
    return new Promise((resolve, reject) => {

        console.log('----- Starting: token simulation -----');

        const resultElement = document.getElementById(IDS.result);
        if (!resultElement) {
            reject("element with id='resultTokenSim' not found!");
            return;
        }

        resultElement.textContent = '';
        const simProgress = document.getElementById(IDS.progress);

        const formData = new FormData(form);

        const initialTokens = Number(formData.get(IDS.initialTokens));
        const tokenCap = Number(formData.get(IDS.tokenCap));

        if (initialTokens > tokenCap) {
            reject("Initial tokens exceed token cap.");
            return;
        }

        const numOfIterations = Number(formData.get(IDS.numOfIterations));

        if (numOfIterations <= 0) {
            reject('Number of iterations too low (min: 1)!');
            return;
        } else if (numOfIterations > MAX_NUM_OF_ITERATIONS) {
            reject(`Number of iterations too high (max: ${MAX_NUM_OF_ITERATIONS})!`);
            return;
        }

        // get values and modify with Layla
        const layla = (Number(formData.get(IDS.layla) || 0) || 0) / 100;
        const monkeyKing = ((Number(formData.get(IDS.monkeyKing) || 0) || 0) / 100) * (1 + layla);
        const isla = ((Number(formData.get(IDS.isla) || 0) || 0) / 100) * (1 + layla);
        const wall = ((Number(formData.get(IDS.wall) || 0) || 0) / 100);

        // return if 100%
        if (monkeyKing >= 1) {
            reject(`100% refund! Monkey King value modified by Layla: ${monkeyKing * 100}%!`);
            return;
        }
        if (isla >= 1) {
            reject(`100% refund! Isla value modified by Layla: ${isla * 100}%!`);
            return;
        }
        if (wall >= 1) {
            reject(`100% refund! Wall value: ${wall * 100}%!`);
            return;
        }

        let tokenLimitReachedCount = 0
        let totalTokensSpent = 0;
        let minTokensSpent = +Infinity;
        let maxTokensSpent = -Infinity;
        let iterationsCnt = 0;

        resultElement.textContent = `Simulating for ${numOfIterations} iterations...\n`
        const startTime = performance.now();

        function runChunk() {
            const end = Math.min(iterationsCnt + CHUNK_SIZE, numOfIterations);
            for (; iterationsCnt < end; iterationsCnt++) {
                if (stopSimulation) break;

                let tokensSpent = 0;
                let tokensCurrent = initialTokens;

                // spend tokens until 0 or tokenSpentLimit reached - one iteration
                for (; tokensSpent < TOKEN_SPENT_LIMIT && tokensCurrent > 0; tokensSpent++) {
                    if (stopSimulation) break;

                    tokensCurrent--; // spent one token
                    if (Math.random() < monkeyKing) tokensCurrent++; // gained token form Monkey King
                    if (Math.random() < isla) tokensCurrent++; // gained token form Isla
                    if (Math.random() < wall) tokensCurrent++; // gained token form Wall Tower
                    tokensCurrent = Math.min(tokenCap, tokensCurrent); // cap tokens
                }

                totalTokensSpent += tokensSpent;
                if (tokensSpent >= TOKEN_SPENT_LIMIT) tokenLimitReachedCount++;
                minTokensSpent = Math.min(minTokensSpent, tokensSpent);
                maxTokensSpent = Math.max(maxTokensSpent, tokensSpent);
            }

            simProgress.value = 100 * iterationsCnt / numOfIterations;

            if (iterationsCnt < numOfIterations && !stopSimulation) {
                setTimeout(runChunk, 0);
            } else {
                const endTime = performance.now();

                let avgTokens;
                if (iterationsCnt == 0)
                    avgTokens = 0;
                else
                    avgTokens = totalTokensSpent / iterationsCnt;

                let finishedMsg;
                if (stopSimulation)
                    finishedMsg = 'Simulation stopped early!\n';
                else
                    finishedMsg = 'Simulation finished successfully!\n';

                let contextMsg = '';
                if (tokenLimitReachedCount > 0)
                    contextMsg = `* Results might not be accurate because ${tokenLimitReachedCount} out of ${iterationsCnt} iterations reached tokenSpentLimit of ${TOKEN_SPENT_LIMIT}\n`;

                let timeMsg = `Simulation time: ${((endTime - startTime) / 1000).toFixed(2)} seconds\n`
                let minMsg = `Minimum tokens: ${minTokensSpent}\n`;
                let maxMsg = `Maximum tokens: ${maxTokensSpent}\n`;
                let avgMsg = `Average tokens: ${avgTokens}`;

                let message = `${finishedMsg}${contextMsg}${timeMsg}\n${minMsg}${maxMsg}${avgMsg}`;
                resultElement.textContent = message;
                console.log(message);

                console.log('----- Finished: token simulation -----');

                resolve();
            }
        }

        runChunk();
    });
}