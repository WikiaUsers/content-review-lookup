(function() {
    'use strict';

    const pageName = mw.config.get('wgPageName');

    // Run this script only in the "Colonies" article.
    mw.hook('wikipage.content').add(function() {
        if (pageName === 'Colonies') colonyCostsInit();
    });

    function colonyCostsInit() {
        // Declaring useful stuff that will be used across the script.
        const costsCalculator = document.getElementById('costs-calculator')
            , fullCostListContainer = document.querySelector('.full-costs-list-generator-container')
            , costGeneratorContainer = document.querySelector('.cost-generator-container')
            , abs = Math.abs
            , max = Math.max
            , min = Math.min
            , ceil = Math.ceil
            , floor = Math.floor
            , sqrt = Math.sqrt
            , pow = Math.pow;

        // Initializing calculators.
        fullCostListInit();
        costGeneratorInit();
        costCalculatorInit();

        // List generator - this script takes two numbers from input fields and
        // generates a list whose length is based on the difference between both
        // inputs. 
        function fullCostListInit() {
            // Generating and adding html to the DOM.
            const generatorHTML = '\
            <form class="full-costs-list-generator">\
                <label for="costlist-start">Get distance costs from: </label>\
                <input type="number" id="costlist-start" name="costlist-start" min="0" max="2000" value="0" placeholder="0" required></input>\
                <label for="costlist-end">to: </label>\
                <input type="number" id="costlist-end" name="costlist-end" min="0" max="2000" value="10" placeholder="10" required></input>\
                <input type="submit" class="wds-button full-costs-list-generator-submit" value="Get costs"></input>\
            </form>\
            <p class="full-cost-generator-output">Costs: </p>\
            <ul class="full-costs-list"></ul>';

            fullCostListContainer.insertAdjacentHTML('beforeend', generatorHTML);

            const generator = document.querySelector('.full-costs-list-generator');

            function submitHandler(event) {
                // Prevent page refresh upon clicking the submit button.
                event.preventDefault();

                const list = document.querySelector('.full-costs-list');
                var startValue = document.getElementById('costlist-start').value,
                    endValue = document.getElementById('costlist-end').value,
                    totalItems = abs(startValue - endValue);

                // To prevent huge memory usage from the for loops, limit the amount
                // of list elements that can be generated to 2000. Trying to bypass
                // this limit by modifying the form's HTML will result in a warn
                // being logged in the console and the script not executing.
                if ((startValue || endValue) > 2000) {
                    console.warn('[Colony cost list generator]: Aborted list generation due to attempting to show more than 2000 elements.');
                    return;
                }

                // If the start value is higher than the end value, swap both values to
                // correctly generate the list anyways.
                if (startValue > endValue) [startValue, endValue] = [endValue, startValue];
                list.innerHTML = '';

                // Add a column parameter depending on the amount of list elements generated.
                // We use CSS to determine how the list will render depending on factors such
                // as the screen width and wether or not the right rail is collapsed/expanded.
                if (totalItems >= 500) {
                    list.setAttribute('columns', '4');
                } else if (totalItems >= 200) {
                    list.setAttribute('columns', '3');
                } else if (totalItems >= 50) {
                    list.setAttribute('columns', '2');
                } else {
                    list.removeAttribute('columns');
                }

                // Generate list elements and add them to the DOM.
                for (var i = startValue; i < endValue; i++) {
                    const distance = i
                        , cost = max(66000, ceil((2000 - 0.072 * distance) * distance * 31))
                        , listElementHTML = '\
                        <li>Distance: <b>' + formattedNumber(distance) +'</b>. Cost: <a href="/wiki/Resources" title="Resources"><img alt="Cost" src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png" decoding="async" loading="lazy" width="18" height="14" data-image-name="Icon_costs.png" data-image-key="Icon_costs.png" data-src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png?width=18" class="ls-is-cached lazyloaded"></a><b>' + formattedNumber(cost) + '</b>.</li>';

                    list.insertAdjacentHTML('beforeend', listElementHTML);
                }
            }

            generator.addEventListener('submit', submitHandler);
        }

        // Cost generator - this script has only one input and returns it's in-game
        // cost. This is to quickly know the value of a single distance.
        function costGeneratorInit() {
            // Generate and add HTML to the DOM.
            const generatorHTML = '\
            <form class="cost-generator">\
                <label for="generator-distance">Distance: </label>\
                <input type="number" id="generator-distance" name="generator-distance" min="0" max="27777" required></input>\
                <input type="submit" class="wds-button cost-generator-submit" value="Get cost"></input>\
            </form>\
            <p class="cost-generator-output">Cost: </p>';

            costGeneratorContainer.insertAdjacentHTML('beforeend', generatorHTML);

            const generator = document.querySelector('.cost-generator')
                , input = document.getElementById('generator-distance')
                , output = document.querySelector('.cost-generator-output');

            function submitHandler(event) {
                // Prevent page refresh upon clicking the submit button.
                event.preventDefault();

                // Generate output.
                const distance = input.value
                    , cost = max(66000, ceil((2000 - 0.072 * distance) * distance * 31));

                // Add output to the DOM.
                output.innerHTML = 'Cost: <a href="/wiki/Resources" title="Resources"><img alt="Cost" src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png" decoding="async" loading="lazy" width="18" height="14" data-image-name="Icon_costs.png" data-image-key="Icon_costs.png" data-src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png?width=18" class="ls-is-cached lazyloaded"></a><b>' + formattedNumber(cost) + '</b>.';
            }

            generator.addEventListener('submit', submitHandler);
        }

        // Colonization price calculator - this script takes multiple arguments which
        // are the player's X and Y coordinates of their planet along with the target
        // planet's X and Y coordinates. If the player has colonies, they can also
        // add them to take into account when determining the colonization cost, as it
        // will make a list of all player's coordinates and select the ones closest to
        // the target planet and return the colonization cost.
        function costCalculatorInit() {
            // Generate HTML and add it to the DOM. We also use a number as a variable
            // as to not read the form's HTML every time we have to change it.
            const calculatorHTML = '\
                <fieldset class="colony-cost-calculator-container">\
                    <legend class="colony-cost-calculator-title">Colony cost calculator</legend>\
                    <form class="colony-cost-calculator">\
                        <div class="colony-cost-calculator-actions">\
                            <input type="button" class="wds-button wds-is-secondary colony-add" value="Add colony"></input>\
                            <input type="button" class="wds-button wds-is-secondary wds-is-disabled colony-remove" value="Remove colony"></input>\
                            <input type="submit" class="wds-button colony-coords-submit" value="Calculate"></input>\
                        </div>\
                        <label class="planet-label">Your main planet\'s coordinates<br>\
                            <input type="number" id="planet-X" name="planet-X" min="0" max="2000" placeholder="X" required>\
                            <input type="number" id="planet-Y" name="planet-Y" min="0" max="2000" placeholder="Y" required>\
                        </label>\
                        <label class="target-label">Target planet\'s coordinates<br>\
                            <input type="number" id="target-X" name="target-X" min="0" max="2000" placeholder="X" required>\
                            <input type="number" id="target-Y" name="target-Y" min="0" max="2000" placeholder="Y" required>\
                        </label>\
                    </form>\
                    <p class="colony-cost-output">Cost: <a href="/wiki/Resources" title="Resources"><img alt="Cost" src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png" decoding="async" loading="lazy" width="18" height="14" data-image-name="Icon_costs.png" data-image-key="Icon_costs.png" data-src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png?width=18" class="ls-is-cached lazyloaded"></a></p>\
                </fieldset>';
            var colonyNumber = 0;

            costsCalculator.insertAdjacentHTML('afterend', calculatorHTML);

            const form = document.querySelector('.colony-cost-calculator')
                , colonyAddButton = form.querySelector('.colony-add')
                , colonyRemoveButton = form.querySelector('.colony-remove');

            // When clicking the 'add colony' button, add two extra input fields where the
            // user can type the colony's X and Y coordinates.
            function addColony() {
                if (colonyNumber < 12) colonyNumber++;

                // Disable 'add colony' button when there's 11 colonies in the calculator.
                if (colonyNumber === 12) {
                    if (!form.querySelector('.colony-add').classList.contains('wds-is-disabled')) {
                        form.querySelector('.colony-add').classList.add('wds-is-disabled');
                    }

                    return;
                }

                // Add colony form HTML.
                const targetLabel = form.querySelector('.target-label')
                    , colonyFormHTML = '\
                    <label class="colony-label" id="colony-' + colonyNumber + '-label">Colony ' + colonyNumber + '\'s coordinates<br>\
                        <input type="number" class="colony-x" id="colony-' + colonyNumber + '-X" name="target-' + colonyNumber + '-X" min="0" max="2000" placeholder="X" required>\
                        <input type="number" class="colony-y" id="colony-' + colonyNumber + '-Y" name="target-' + colonyNumber + '-Y" min="0" max="2000" placeholder="Y" required>\
                    </label>';

                targetLabel.insertAdjacentHTML('beforebegin', colonyFormHTML);

                // Re-enable the 'remove colony' button when a new colony has been added.
                if (form.querySelector('.colony-remove').classList.contains('wds-is-disabled')) {
                    form.querySelector('.colony-remove').classList.remove('wds-is-disabled');
                }
            }

            // Remove colonies when clicking the 'remove colony' button.
            function removeColony() {
                // The 'if' check makes sure that there are colonies form(s) in the fieldset.
                // Otherwise this function (and, therefore, the button), won't do anything.
                if (form.querySelector('.colony-label')) {
                    const colonies = form.querySelectorAll('.colony-label')
                        , lastColony = colonies[colonies.length - 1];

                    lastColony.remove();
                    if (colonyNumber > 0) colonyNumber--;

                    // Disable 'remove colony' button when no colony forms are present.
                    if (colonyNumber === 0) {
                        form.querySelector('.colony-remove').classList.add('wds-is-disabled');
                    }

                    // Re-enable 'add colony' button upon removing a colony form.
                    if (colonyNumber < 11) {
                        form.querySelector('.colony-add').classList.remove('wds-is-disabled');
                    }
                }
            }

            function submitHandler(event) {
                // Prevent page refresh upon clicking the submit button.
                event.preventDefault();

                // Get values from input fields and return the coloniztion cost.
                const playerX = document.getElementById('planet-X').value
                    , playerY = document.getElementById('planet-Y').value
                    , targetX = document.getElementById('target-X').value
                    , targetY = document.getElementById('target-Y').value
                    , output = document.querySelector('.colony-cost-output')
                    , colonies = document.querySelector('.colony-label');
                var distance = floor(sqrt(pow(playerX - targetX, 2) + pow(playerY - targetY, 2)));

                // If there are colonies in the fieldset, add some extra steps to take into
                // account these too. Otherwise proceed normally returning the cost of only
                // the first and it's target planet.
                if (colonies) calculateCostWithColonies();

                const cost = max(66000, ceil((2000 - 0.072 * distance) * distance * 31));

                // Update target planet's distance and cost.
                if (output.querySelector('.output-resources') || output.querySelector('.output-distance')) {
                    output.querySelector('.output-resources').innerText = formattedNumber(cost);
                    output.querySelector('.output-distance').innerText = formattedNumber(distance);
                } else {
                    output.insertAdjacentHTML('beforeend', '<b class="output-resources">' + formattedNumber(cost) + '</b>. Distance: <b class="output-distance">' + formattedNumber(distance) + '</b>.');
                }

                // Function executed only when extra colonies are present in the fieldset.
                // This function makes a list of the player's coordinates (planets and colonies
                // alike) and uses the distance of the closest colony to the target planet to
                // get the final distance and cost.
                function calculateCostWithColonies() {
                    const colonies = document.querySelectorAll('.colony-label') 
                        , playerCoords = [[playerX, playerY]]
                        , distances = [];

                    colonies.forEach(function(colony) {
                        const x = colony.querySelector('.colony-x').value
                            , y = colony.querySelector('.colony-y').value;

                        playerCoords.push([x, y]);
                    });

                    playerCoords.forEach(function(coord) {
                        const distance = floor(sqrt(pow(coord[0] - targetX, 2) + pow(coord[1] - targetY, 2)));

                        distances.push(distance);
                    });

                    distance = min.apply(Math, distances);
                }
            }

            colonyAddButton.addEventListener('click', addColony);
            colonyRemoveButton.addEventListener('click', removeColony);
            form.addEventListener('submit', submitHandler);
        }

        // Add commas to numbers with more than 4 digits where it corresponds.
        // Code from Stack Overflow: https://stackoverflow.com/a/2901298/20503138
        function formattedNumber(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}());