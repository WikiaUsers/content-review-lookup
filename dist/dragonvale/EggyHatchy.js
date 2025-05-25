(function () {
    'use strict';

    var game = {
        config: null,
        dragonsData: null,
        limitedData: null,
        availableLimitedDragonNames: new Set(),
        //api: null,
        state: {
            grid: [], gridSize: 3,
            selectedEgg1: null, selectedEgg2: null,
            previewedMergeResult: null,
            bankedEggs: [], currentScore: 0,
            goals: [],
            undoState: { canUndo: false },
            undoChances: 5,
            isProcessing: false,
            currentScreen: '',
            difficulty: 'Beginner',
            gameOverMessage: '',
            shownNoMergeAlert: false
        },

        initialize: function (gameConfig, dragonsData, limitedData, rootElement) {
            this.config = gameConfig;
            this.dragonsData = this.preprocessDragonsData(dragonsData);
            this.limitedData = this.preprocessLimitedData(limitedData);
            //this.api = new mw.Api();
            this.ui.rootElement = rootElement;

            this.state.difficulty = Object.keys(this.config.difficultySettings)[0];
            const difficultyConf = this.config.difficultySettings[this.state.difficulty];
            this.state.gridSize = difficultyConf.gridSize;
            this.state.undoChances = difficultyConf.maxUndo;
            this.state.shownNoMergeAlert = false;
            this.state.currentScreen = 'difficultySelection';
            this.ui.setupBaseLayout();
            this.showDifficultyScreen();
        },

        showDifficultyScreen: function () {
            this.state.currentScreen = 'difficultySelection';
            this.deselectEggs();
            this.state.grid = [];
            this.state.bankedEggs = [];
            this.state.currentScore = 0;
            this.state.goals = [];

            this.ui.render().catch(e => console.error("Error rendering difficulty screen:", e));
        },

        startGame: function (difficulty) {
            this.state.difficulty = difficulty;
            const difficultyConf = this.config.difficultySettings[this.state.difficulty];
            if (!difficultyConf) {
                console.error("Invalid difficulty selected:", this.state.difficulty);
                this.ui.showAlert("Invalid difficulty. Please select again.");
                this.showDifficultyScreen();
                return;
            }
            this.state.gridSize = difficultyConf.gridSize;
            this.state.undoChances = difficultyConf.maxUndo;
            this.state.currentScreen = 'playing';
            this.state.shownNoMergeAlert = false;

            this.loadNewStage().then(()=>{
                //console.log('stage loaded.');
            });
        },

        handleQuitGame: function () {
            var self = this;
            this.ui.showConfirm("Are you sure you want to quit?").then(function () {
                self.showDifficultyScreen();
            });
        },

        handleRestartGame: function (shouldConfirm) {
            if (this.state.currentScreen === 'playing' || this.state.currentScreen === 'gameOver') {
                let confirmationPromise;

                if (shouldConfirm) {
                    confirmationPromise = this.ui.showConfirm(
                        "Are you sure you want to restart the current stage?"
                    );
                } else {
                    confirmationPromise = Promise.resolve();
                }
                
                var self = this;
                confirmationPromise.then(function () {
                    //self.ui.showAlert("Restarting stage with current difficulty: " + self.state.difficulty);
                    self.state.currentScreen = 'playing';
                    self.state.shownNoMergeAlert = false;
                    self.loadNewStage();
                });                
            } else {
                this.ui.showAlert("No active game to restart. Please select a difficulty.");
                this.showDifficultyScreen();
            }
        },

        preprocessDragonsData: function (dragonsJson) {
            const map = {};
            if (dragonsJson && dragonsJson.dragons) {
                dragonsJson.dragons.forEach(d => map[d.Name] = d);
            } else {
                console.error("Unable to load dragons.");
            }
            return map;
        },

        preprocessLimitedData: function (limitedJson) {
            this.availableLimitedDragonNames.clear();

            if (!limitedJson) {
                console.warn("Limited JSON data is missing or empty.");
                return;
            }

            if (limitedJson.dragons) {
                for (const dragonName in limitedJson.dragons) {
                    if (limitedJson.dragons.hasOwnProperty(dragonName)) {
                        // if (limitedJson.dragons[dragonName].Breedable !== false)
                        this.availableLimitedDragonNames.add(dragonName);
                    }
                }
            }

            if (limitedJson.events) {
                for (const eventName in limitedJson.events) {
                    if (limitedJson.events.hasOwnProperty(eventName)) {
                        const eventData = limitedJson.events[eventName];
                        if (eventData && eventData.dragons) {
                            for (const dragonName in eventData.dragons) {
                                if (eventData.dragons.hasOwnProperty(dragonName)) {
                                    const dragonEventDetails = eventData.dragons[dragonName];

                                    if (dragonEventDetails.Breedable !== false) {
                                        this.availableLimitedDragonNames.add(dragonName);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        getAvailableBreedingDragons: function () {
            if (!this.dragonsData) {
                console.error("Cannot get available breeding dragons.");
                return [];
            }

            const allAvailable = [];
            for (const dragonName in this.dragonsData) {
                if (this.dragonsData.hasOwnProperty(dragonName)) {
                    const dragonDetails = this.dragonsData[dragonName];

                    if (dragonDetails.IsLimited !== true || this.availableLimitedDragonNames.has(dragonName)) {
                        allAvailable.push(dragonDetails);
                    }
                }
            }
            return allAvailable;
        },

        getDragonDetails: function (dragonName) {
            return this.dragonsData[dragonName];
        },

        loadNewStage: function () {
            var self = this;
            return this.generateInitialGrid(this.state.gridSize).then(grid=> {
                self.state.grid = grid;
                self.state.goals = self.generateGoals();
                self.state.currentScore = 0;
                self.state.bankedEggs = [];
                self.deselectEggs();
                self.state.undoState = { canUndo: false };
                self.state.undoChances = self.config.difficultySettings[self.state.difficulty].maxUndo;
                self.ui.render();
            });
        },

        generateInitialGrid: function (size) {
            const difficultyConf = this.config.difficultySettings[this.state.difficulty];
            const rules = difficultyConf.exclusionRules;

            let sourceDragonList;
            if (rules && rules.availability === "available") {
                sourceDragonList = this.getAvailableBreedingDragons();
            } else {
                sourceDragonList = Object.values(this.dragonsData);
            }

            const raritiesToExclude = (rules.rarities && rules.rarities.length > 0)
                ? rules.rarities
                : ["Legendary", "Mythic"];
            const elementsToExclude = rules.elements || [];
            const tagsToExclude = rules.tags || [];
            
            const availableDragonNames = sourceDragonList.filter(details => {
                if (!details) return false;

                if (details.Rarity && raritiesToExclude.includes(details.Rarity)) {
                    return false;
                }
                if (details.Elements && details.Elements.some(function (element) { return elementsToExclude.includes(element); })) {
                    return false;
                }
                if (details.Tags && details.Tags.some(function (tag) { return tagsToExclude.includes(tag); })) {
                    return false;
                }

                return true;
            }).map(function (details) { return details.Name; });

            if (availableDragonNames.length === 0) {
                console.error("No available dragons to populate grid!");
                return Promise.resolve(Array(size).fill(null).map(() => Array(size).fill(null)));
            }

            const randomDragonNames = [];
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const randomDragonName = availableDragonNames[Math.floor(Math.random() * availableDragonNames.length)];
                    randomDragonNames.push(randomDragonName);
                }
            }

            var self = this;
            return ModuleInject.invokeModule('BreedingSandbox', 'EggyHatchyGetEggImageNames', randomDragonNames)
                .then(rawHtmlResponse => {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = rawHtmlResponse;
                    var contentContainer = tempDiv.querySelector('pre');
                    if (!contentContainer) {
                        console.error("Failed to find content response:", rawHtmlResponse);
                        return;
                    }

                    var extractedText = contentContainer.textContent.trim();

                    if (!extractedText) {
                        console.error("Failed to retrieve text:", response);
                        return;
                    }

                    const eggImageNames = JSON.parse(extractedText);

                    const minStartLevel = (difficultyConf.startLevel && typeof difficultyConf.startLevel.min === 'number') ? difficultyConf.startLevel.min : 1;
                    const maxStartLevel = (difficultyConf.startLevel && typeof difficultyConf.startLevel.max === 'number') ? difficultyConf.startLevel.max : 2;

                    const actualMinLevel = Math.min(minStartLevel, maxStartLevel);
                    const actualMaxLevel = Math.max(minStartLevel, maxStartLevel);

                    const grid = Array(size).fill(null).map(() => Array(size).fill(null));
                    let index = 0;
                    for (let r = 0; r < size; r++) {
                        for (let c = 0; c < size; c++) {
                            const dragonName = randomDragonNames[index];
                            const eggName = eggImageNames[index] || `${dragonName}DragonEgg.png`; //todo better fallback

                            const randomLevel = Math.floor(Math.random() * (actualMaxLevel - actualMinLevel + 1)) + actualMinLevel;
                            grid[r][c] = self.createEggObject(
                                dragonName,
                                eggName,
                                randomLevel,
                                Math.random() < (difficultyConf.twinChance || 0.05)
                            );
                            index++;
                        }
                    }

                    return grid;
                })
                .catch(error => {
                    console.error("Error fetching egg image names:", error);
                });
        },

        createEggObject: function (name, image, level, isTwin) {
            const dragonInfo = this.getDragonDetails(name);
            if (!dragonInfo) {
                console.error(`Dragon details not found for ${name}. Cannot create egg.`);
                return null;
            }
            return {
                name: name,
                image: image,
                level: level,
                isTwin: isTwin,
                elements: dragonInfo.Elements || [],
                latentElements: dragonInfo.BreedingElements || [],
                rarity: dragonInfo.Rarity,
                tags: dragonInfo.Tags || [],
                points: this.calculateEggPoints(name, level, isTwin)
            };
        },

        calculateEggPoints: function (name, level, isTwin) {
            const dragonInfo = this.getDragonDetails(name);
            if (!dragonInfo) return 0;

            let points = 0;
            const pointData = this.config.dragonPointData ? this.config.dragonPointData[name] : null;
            const difficultyConf = this.config.difficultySettings[this.state.difficulty];

            if (pointData && typeof pointData.base !== 'undefined' && typeof pointData.perLevel !== 'undefined') {
                points = pointData.base + (level * pointData.perLevel);
            } else {
                let basePoints = (this.config.rarityPoints && this.config.rarityPoints[dragonInfo.Rarity]) || 1;
                points = basePoints + (level * (difficultyConf.levelPointMultiplier || 5));
            }

            if (isTwin) {
                points *= (difficultyConf.twinBonus|| 2);
            }
            return Math.round(points);
        },

        generateGoals: function () {
            const difficultyConf = this.config.difficultySettings[this.state.difficulty];
            
            let goals = [];
            const goalSettings = difficultyConf.goals;
            const allElements = goalSettings.elements || ["Plant", "Fire", "Cold", "Earth", "Water", "Lightning", "Air", "Metal", "Light", "Dark"];

            if (goalSettings.elementLevel && Math.random() < 0.8) {
                const randomElement = allElements[Math.floor(Math.random() * allElements.length)];
                goals.push({
                    type: 'elementLevel', element: randomElement,
                    minLevel: goalSettings.elementLevel.minLevel,
                    targetCount: goalSettings.elementLevel.count, currentCount: 0,
                    description: `Bank ${goalSettings.elementLevel.count} ${randomElement} L${goalSettings.elementLevel.minLevel}+`
                });
            }
            goals.push({
                type: 'totalPoints', targetPoints: goalSettings.totalPoints.target, currentPoints: 0,
                description: `Score ${goalSettings.totalPoints.target} Points`
            });
            return goals;
        },

        handleCellClick: function (r, c) {
            if (this.state.isProcessing) return Promise.resolve();

            const clickedEggData = this.state.grid[r][c];
            const clickedCell = { r, c };

            var actionPromise = Promise.resolve();

            if (this.state.selectedEgg1) {
                const firstSelectedCell = this.state.selectedEgg1.cell;
                if (firstSelectedCell.r === r && firstSelectedCell.c === c) {
                   // if (this.state.selectedEgg2) {
                   //     this.state.isProcessing = true;
                   //     actionPromise = this.performMerge();
                   // } else {
                        this.deselectEggs();
                    //}
                } else if (this.state.selectedEgg2 && this.state.selectedEgg2.cell.r === r && this.state.selectedEgg2.cell.c === c) {
                    this.state.isProcessing = true;
                    actionPromise = this.performMerge();
                } else if (clickedEggData && this.isValidMergeTarget(firstSelectedCell, clickedCell)) {
                    if (this.isMandatoryBank(this.state.selectedEgg1.data)) {
                        this.ui.showAlert(`Selected ${this.state.selectedEgg1.data.name} egg must be banked.`);
                        this.deselectEggs();
                    } else if (this.isMandatoryBank(clickedEggData)) {
                        this.ui.showAlert(`Target ${clickedEggData.name} egg must be banked and cannot be used in merge.`);
                        this.deselectEggs();
                    } else {
                        this.state.selectedEgg2 = { cell: clickedCell, data: clickedEggData };
                        this.state.isProcessing = true;
                        this.previewMerge();
                        actionPromise = Promise.resolve();
                    }
                } else {
                    this.deselectEggs();
                    if (clickedEggData) {
                        this.state.selectedEgg1 = { cell: clickedCell, data: clickedEggData };
                    }
                }
            } else if (clickedEggData) {
                this.state.selectedEgg1 = { cell: clickedCell, data: clickedEggData };
            }
            
            var self = this;
            
            return actionPromise.then(function () {
                self.state.isProcessing = false; 
                return self.ui.render();
            }).catch(function (error) {
                console.error("Error in cell click action:", error);
                self.state.isProcessing = false;
                self.deselectEggs();
                return self.ui.render();
            });
        },

        isMandatoryBank: function (eggData) {
            if (!eggData) return false;

            const difficultyConf = this.config.difficultySettings[this.state.difficulty];

            const rules = difficultyConf.mandatoryBankRules;
            if (rules) {
                const maxLevelForBank = rules.maxLevel || 20;
                if (eggData.level >= maxLevelForBank) {
                    return true;
                }

                if (rules.elements && eggData.elements) {
                    if (eggData.elements.some(function (element) { return rules.elements.includes(element); })) {
                        return true;
                    }
                }
                if (rules.tags && eggData.tags) {
                    if (eggData.tags.some(function (tag) { return rules.tags.includes(tag); })) {
                        return true;
                    }
                }
                if (rules.rarities && eggData.rarity) {
                    if (rules.rarities.includes(eggData.rarity)) {
                        return true;
                    }
                }
            }

            return false;
        },

        deselectEggs: function () {
            this.state.selectedEgg1 = null;
            this.state.selectedEgg2 = null;
            this.state.previewedMergeResult = null;
        },

        isValidMergeTarget: function (cell1, cell2) {
            const egg1 = this.state.grid[cell1.r][cell1.c];
            const egg2 = this.state.grid[cell2.r][cell2.c];
            if (!egg1 || !egg2) return false;

            const dr = Math.abs(cell1.r - cell2.r);
            const dc = Math.abs(cell1.c - cell2.c);
            if (!((dr === 0 && dc > 0) || (dc === 0 && dr > 0))) return false;

           // return (dr === 0 && dc === 1) || (dc === 0 && dr === 1)
            if (dr === 0) {
                for (let c = Math.min(cell1.c, cell2.c) + 1; c < Math.max(cell1.c, cell2.c); c++) {
                    if (this.state.grid[cell1.r][c]) return false;
                }
            } else {
                for (let r = Math.min(cell1.r, cell2.r) + 1; r < Math.max(cell1.r, cell2.r); r++) {
                    if (this.state.grid[r][cell1.c]) return false;
                }
            }
            return true;
        },

        previewMerge: function () {
            if (!this.state.selectedEgg1 || !this.state.selectedEgg2) {
                console.warn("Cannot preview merge: eggs not selected.");
                this.state.previewedMergeResult = { error: "Eggs not selected for preview" };
                return;
            }
            this.saveUndoStateIfNeeded();

            this.state.previewedMergeResult = null;

            const egg1Data = this.state.selectedEgg1.data;
            const egg2Data = this.state.selectedEgg2.data;

            const difficultyConf = this.config.difficultySettings[this.state.difficulty];
            const bankRules = difficultyConf && difficultyConf.mandatoryBankRules ? difficultyConf.mandatoryBankRules : null;
            const maxLevel = (bankRules && bankRules.maxLevel) ? bankRules.maxLevel : 20;

            let resultLevel = Math.min(egg1Data.level + egg2Data.level, maxLevel);
            let resultIsTwin = egg1Data.isTwin || egg2Data.isTwin;
            let resultName, resultImage, resultPoints;

            if (egg1Data.name === egg2Data.name) {
                resultName = egg1Data.name;
                resultImage = egg1Data.image;

                resultLevel = Math.min(resultLevel + (difficultyConf.identicalMergeBonusLevel || 1), maxLevel);
                resultPoints = this.calculateEggPoints(resultName, resultLevel, resultIsTwin);

                this.state.previewedMergeResult = {
                    name: resultName, image: resultImage, level: resultLevel,
                    isTwin: resultIsTwin, points: resultPoints, isPreview: false
                };
            } else {
                let minPoints = 0, maxPoints = 0;
                const genericRange = this.config.pointRangeForUnknownBreed || { min: 50, max: 500 };
                const twinMultiplier = difficultyConf.twinBonus || 2;

                minPoints = Math.round((genericRange.min + resultLevel * 5) * (resultIsTwin ? twinMultiplier : 1));
                maxPoints = Math.round((genericRange.max + resultLevel * 15) * (resultIsTwin ? twinMultiplier : 1));

                this.state.previewedMergeResult = {
                    name: "???",
                    image: this.config.mysteryEggImage || 'EggOfMystery.png',
                    level: resultLevel,
                    isTwin: resultIsTwin,
                    points: 0,
                    minPoints: minPoints,
                    maxPoints: maxPoints,
                    isPreview: true,

                    parent1Name: egg1Data.name,
                    parent2Name: egg2Data.name
                };
            }},

        performMerge: function () {
            if (!this.state.selectedEgg1 || !this.state.selectedEgg2 || !this.state.previewedMergeResult || this.state.previewedMergeResult.error) {
                this.deselectEggs();
                return Promise.reject("Merge prerequisites not met or preview error.");
            }
            this.saveUndoStateIfNeeded();

            const cell1 = this.state.selectedEgg1.cell;
            const cell2 = this.state.selectedEgg2.cell;
            const previewData = this.state.previewedMergeResult;

            const difficultyConf = this.config.difficultySettings[this.state.difficulty];

            var moduleArgs = {}

            if (difficultyConf && difficultyConf.modes && Array.isArray(difficultyConf.modes) && difficultyConf.modes.length > 0) {
                const validModes = difficultyConf.modes.filter(function (modeStr) {
                    return typeof modeStr === 'string' && modeStr.trim() !== '';
                });

                if (validModes.length > 0) {
                    moduleArgs.events = validModes.join(',');
                }
            }

            var actualMergePromise;

            var self = this;

            if (previewData.isPreview) {
                actualMergePromise = ModuleInject.invokeModule(
                    self.config.breedModuleName,
                    self.config.breedFunctionName,
                    [previewData.parent1Name, previewData.parent2Name],
                    moduleArgs
                ).then(function (rawHtmlResponse) {
                    try {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = rawHtmlResponse;
                        var contentContainer = tempDiv.querySelector('pre');
                        if (!contentContainer) {
                            console.error("Failed to find content response:", rawHtmlResponse);
                            return;
                        }

                        var extractedText = contentContainer.textContent.trim();

                        if (!extractedText) {
                            console.error("Failed to retrieve text:", response);
                            return;
                        }

                        const parsedResult = JSON.parse(extractedText);

                        return {
                            name: parsedResult.name,
                            image: parsedResult.image,
                            level: previewData.level,
                            isTwin: previewData.isTwin,
                            points: self.calculateEggPoints(parsedResult.name, previewData.level, previewData.isTwin)
                        };
                    } catch (error) {
                        console.error("Error parsing Lua result in performMerge:", error, "Raw:", rawHtmlResponse, "Extracted:", extractedText);
                        self.ui.showAlert("Failed to determine breed outcome. Merge cancelled.");
                        return Promise.reject("Lua parsing error in performMerge");
                    }
                }).catch(function (moduleError) {
                    console.error("Lua module error in performMerge:", moduleError);
                    self.ui.showAlert("Breeding error. Merge cancelled.");
                    return Promise.reject("Lua module error in performMerge");
                });
            } else {
                actualMergePromise = Promise.resolve(previewData);
            }

            return actualMergePromise.then(function (finalEggSpec) {
                if (!finalEggSpec || !finalEggSpec.name) {
                    self.deselectEggs();
                    return;
                }

                const newEgg = self.createEggObject(finalEggSpec.name, finalEggSpec.image, finalEggSpec.level, finalEggSpec.isTwin);

                if (!newEgg) {
                    console.error("Failed to create new egg from final spec.");
                    self.deselectEggs();
                    return;
                }

                self.state.grid[cell1.r][cell1.c] = null;
                self.state.grid[cell2.r][cell2.c] = newEgg;
                self.state.undoState.canUndo = true;
                self.deselectEggs();

                if (self.isMandatoryBank(newEgg)) {
                    self.ui.showAlert(newEgg.name + ' (L' + newEgg.level + ') was created and must be banked.');
                }
                self.checkGameEndConditions();
            }).catch(function (error) {
                self.deselectEggs();
            });
        },

        handleBankClick: function () {
            if (this.state.isProcessing) return;
            if (!this.state.selectedEgg1 || this.state.selectedEgg2) {
                this.ui.showAlert("Select a single egg on the grid to bank."); return;
            }
            this.saveUndoStateIfNeeded();
            this.state.isProcessing = true;

            const eggToBank = this.state.selectedEgg1.data;
            const cellToBankFrom = this.state.selectedEgg1.cell;

            this.state.grid[cellToBankFrom.r][cellToBankFrom.c] = null;
            this.state.bankedEggs.push(eggToBank);
            this.state.currentScore += eggToBank.points;

            const difficultyConf = this.config.difficultySettings[this.state.difficulty];

            this.state.goals.forEach(goal => {
                if (goal.type === 'totalPoints'){
                    goal.currentPoints = this.state.currentScore;
                } else if (goal.type === 'elementLevel') {
                    const levelSatisfied = eggToBank.level >= goal.minLevel;
                    const elementsSatisfied = eggToBank.elements.includes(goal.element);
                    const latentElementsSatisfied = (difficultyConf.includeLatent || true) && (eggToBank.latentElements || []).includes(goal.element);
                     
                    if (levelSatisfied && (elementsSatisfied || latentElementsSatisfied)) {
                        goal.currentCount++;
                    }
                }
            });

            this.state.undoState.canUndo = true;
            this.deselectEggs();
            this.ui.render();
            this.checkGoalCompletion();
            this.checkGameEndConditions();
            this.state.isProcessing = false;
        },

        handleUndoClick: function () {
            if (this.state.isProcessing) return;
            if (this.state.undoChances > 0 && this.state.undoState && this.state.undoState.grid && this.state.undoState.canUndo) {
                this.state.isProcessing = true;
                this.state.grid = JSON.parse(JSON.stringify(this.state.undoState.grid));
                this.state.bankedEggs = JSON.parse(JSON.stringify(this.state.undoState.bankedEggs));
                this.state.currentScore = this.state.undoState.currentScore;
                this.state.goals = JSON.parse(JSON.stringify(this.state.undoState.goals));

                this.state.undoChances--;
                this.state.undoState.canUndo = false;

                this.deselectEggs();
                this.ui.render();
                this.state.isProcessing = false;
            } else {
                this.ui.showAlert("No action to undo or no undos left.");
            }
        },

        saveUndoStateIfNeeded: function () {
            this.state.undoState = {
                grid: JSON.parse(JSON.stringify(this.state.grid)),
                bankedEggs: JSON.parse(JSON.stringify(this.state.bankedEggs)),
                currentScore: this.state.currentScore,
                goals: JSON.parse(JSON.stringify(this.state.goals)),
                canUndo: false
            };
        },

        checkGoalCompletion: function () {
            if (this.state.currentScreen !== 'playing') return;

            let allGoalsMet = this.state.goals.every(goal => {
                if (goal.type === 'totalPoints') return goal.currentPoints >= goal.targetPoints;
                if (goal.type === 'elementLevel') return goal.currentCount >= goal.targetCount;
                return true;
            });

            if (allGoalsMet && this.state.goals.length > 0) {
                this.state.gameOverMessage = "Stage Cleared! All goals met.";
                this.state.currentScreen = 'gameOver';
                this.ui.render().catch(e => console.error("Error rendering game over screen:", e));
            }
        },

        checkGameEndConditions: function () {
            if (this.state.currentScreen !== 'playing') return;
            
            let possibleMergeMoves = false;
            for (let r = 0; r < this.state.gridSize; r++) {
                for (let c = 0; c < this.state.gridSize; c++) {
                    if (this.state.grid[r][c] && !this.isMandatoryBank(this.state.grid[r][c])) {
                        for (let c2 = 0; c2 < this.state.gridSize; c2++) {
                            if (c !== c2 && this.state.grid[r][c2] && !this.isMandatoryBank(this.state.grid[r][c2]) && this.isValidMergeTarget({ r, c }, { r, c: c2 })) {
                                possibleMergeMoves = true; break;
                            }
                        }
                        if (possibleMergeMoves) break;
                        for (let r2 = 0; r2 < this.state.gridSize; r2++) {
                            if (r !== r2 && this.state.grid[r2][c] && !this.isMandatoryBank(this.state.grid[r2][c]) && this.isValidMergeTarget({ r, c }, { r: r2, c })) {
                                possibleMergeMoves = true; break;
                            }
                        }
                        if (possibleMergeMoves) break;
                    }
                }
                if (possibleMergeMoves) break;
            }

            if (!possibleMergeMoves) {
                let canBank = false;
                for (let r = 0; r < this.state.gridSize; r++) {
                    for (let c = 0; c < this.state.gridSize; c++) {
                        if (this.state.grid[r][c]) {
                            canBank = true; break;
                        }
                    }
                    if (canBank) break;
                }

                if (!canBank) {
                    this.state.gameOverMessage = "No more moves possible. Game Over.";
                    this.state.currentScreen = 'gameOver';
                    this.ui.render().catch(e => console.error("Error rendering game over screen:", e));
                    return;
                } else {
                    //if (!this.state.shownNoMergeAlert){
                    //    this.ui.showAlert("No more merges possible. Try banking eggs.");
                    //}
                    //this.state.shownNoMergeAlert = true;
                }
            }
        },

        ui: {
            rootElement: null,
            titleContainer: null,
            goalsContainer: null, gridContainer: null, bankPanel: null,
            previewContainer: null, undoButton: null,
            controlsContainer: null,
            bankedItemsDiv: null,
            bankedScoreDisplay: null,
            
            difficultyScreenContainer: null,
            playingScreenContainer: null,
            gameOverScreenContainer: null,

            gridCellElements: [],
            previewRenderVersion: 0,
            lastRenderedBankedEggsCount: -1,

            setupBaseLayout: function () {
                this.rootElement.innerHTML = '';
                this.rootElement.style.display = 'flex';
                this.rootElement.style.flexDirection = 'column'
                this.rootElement.style.fontFamily = 'Arial, sans-serif';

                this.titleContainer = document.createElement('div');
                this.titleContainer.style.textAlign = 'center';
                this.titleContainer.style.padding = '20px';

                const title = document.createElement('h1');
                title.textContent = "Eggs!";
                title.style.fontFamily = 'DragonVale';
                title.style.color = '#fdf691';
                title.style.webkitTextFillColor = '#fdf691';
                title.style.webkitTextStroke = '3px black';
                title.style.letterSpacing = '2px';
                this.titleContainer.appendChild(title);
                this.rootElement.appendChild(this.titleContainer);

                this.difficultyScreenContainer = document.createElement('div');
                this.difficultyScreenContainer.id = 'game-difficulty-screen';
                this.rootElement.appendChild(this.difficultyScreenContainer);

                this.gameOverScreenContainer = document.createElement('div');
                this.gameOverScreenContainer.id = 'game-gameover-screen';
                this.rootElement.appendChild(this.gameOverScreenContainer);

                this.playingScreenContainer = document.createElement('div');
                this.playingScreenContainer.id = 'game-playing-screen';

                const topPanels = document.createElement('div');
                topPanels.style.display = 'flex';
                topPanels.style.justifyContent = 'space-around';
                topPanels.style.width = '100%';

                this.goalsContainer = document.createElement('div');
                this.goalsContainer.id = 'game-goals-panel';
                this.goalsContainer.style.padding = '10px';
                this.goalsContainer.style.border = '1px solid #ccc';
                this.goalsContainer.style.margin = '5px';
                this.goalsContainer.style.minWidth = '200px';

                let goalsHeader = document.createElement('h3');
                goalsHeader.textContent = 'Goals';
                this.goalsContainer.appendChild(goalsHeader);

                let goalsList = document.createElement('div');
                goalsList.className = 'goals-list';
                this.goalsContainer.appendChild(goalsList);

                this.controlsContainer = document.createElement('div');
                this.controlsContainer.id = 'game-action-buttons';
                this.controlsContainer.style.display = 'flex';
                this.controlsContainer.style.flexDirection = 'column';
                this.controlsContainer.style.marginTop = '15px';

                const quitButton = new OO.ui.ButtonInputWidget({
                    label: 'Quit to Difficulty Select',
                    icon: 'close',
                    framed: false,
                    flags: ['destructive']
                });
                var quitButtonLabel = quitButton.$element[0].querySelector('.oo-ui-labelElement-label');
                if (quitButtonLabel) {
                    quitButtonLabel.style.fontSize = '16px';
                }

                quitButton.on('click', function () {
                    game.handleQuitGame();
                });

                const restartButton = new OO.ui.ButtonInputWidget({
                    label: 'Restart Stage',
                    icon: 'reload',
                    framed: false,
                    flags: ['destructive']
                });
                var restartButtonLabel = restartButton.$element[0].querySelector('.oo-ui-labelElement-label');
                if (restartButtonLabel) {
                    restartButtonLabel.style.fontSize = '16px';
                }
                restartButton.on('click', function () {
                    game.handleRestartGame(true);
                });

                this.undoButton = new OO.ui.ButtonInputWidget({
                    label: 'Undo',
                    icon: 'undo',
                    framed: false,
                   // flags: ['progressive']
                });
                var undoButtonLabel = this.undoButton.$element[0].querySelector('.oo-ui-labelElement-label');
                if (undoButtonLabel) {
                    undoButtonLabel.style.fontSize = '16px';
                }
                this.undoButton.on('click', function () {
                    game.handleUndoClick();
                });

                this.controlsContainer.appendChild(quitButton.$element[0]);
                this.controlsContainer.appendChild(restartButton.$element[0]);
                this.controlsContainer.appendChild(this.undoButton.$element[0]);

                this.goalsContainer.appendChild(this.controlsContainer);

                this.gridContainer = document.createElement('div');
                this.gridContainer.id = 'game-grid-container';
                this.gridContainer.style.margin = '5px';
                this.gridContainer.style.border = '1px solid #ccc';

                this.bankPanel = document.createElement('div');
                this.bankPanel.id = 'game-bank-panel';
                this.bankPanel.style.padding = '10px';
                this.bankPanel.style.border = '1px solid #ccc';
                this.bankPanel.style.margin = '5px';
                this.bankPanel.style.minWidth = '200px';
                
                const bankTitle = document.createElement('h3');
                bankTitle.textContent = 'Bank';
                this.bankPanel.appendChild(bankTitle);

                this.bankedScoreDisplay = document.createElement('p');
                this.bankedScoreDisplay.textContent = `Total Points: ${game.state.currentScore}`;
                this.bankedScoreDisplay.className = 'banked-score-display';
                this.bankedScoreDisplay.style.fontWeight = 'bold';
                this.bankPanel.appendChild(this.bankedScoreDisplay);

                const bankButton = new OO.ui.ButtonInputWidget({
                    label: 'BANK',
                    flags: ['progressive']
                });
                const bankButtonLabel = bankButton.$element[0].querySelector('.oo-ui-labelElement-label');
                if (bankButtonLabel) {
                    bankButtonLabel.style.fontSize = '24px';
                    //bankButtonLabel.style.fontFamily = 'DragonVale';
                }
                bankButton.on('click', function () {
                    game.handleBankClick();
                });
                this.bankPanel.appendChild(bankButton.$element[0]);

                const bankedItemsTitle = document.createElement('h4');
                bankedItemsTitle.textContent = 'Banked Eggs:';
                bankedItemsTitle.style.marginTop = '15px';
                this.bankPanel.appendChild(bankedItemsTitle);

                this.bankedItemsDiv = document.createElement('div');
                this.bankedItemsDiv.className = 'banked-items-list';
                this.bankedItemsDiv.style.display = 'grid';
                this.bankedItemsDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
                this.bankedItemsDiv.style.gap = '5px';
                this.bankedItemsDiv.style.padding = '5px';
                this.bankedItemsDiv.style.maxHeight = '200px';
                this.bankedItemsDiv.style.overflowY = 'auto';
                this.bankedItemsDiv.style.userSelect = 'none';
                this.bankedItemsDiv.style.scrollbarWidth = 'none';
                this.bankedItemsDiv.style.border = 'dashed';
                this.bankedItemsDiv.style.minHeight = '60px';

                this.bankPanel.appendChild(this.bankedItemsDiv);
                
                topPanels.appendChild(this.goalsContainer);
                topPanels.appendChild(this.gridContainer);
                topPanels.appendChild(this.bankPanel);

                this.playingScreenContainer.appendChild(topPanels);

                this.previewContainer = document.createElement('div');
                this.previewContainer.id = 'game-merge-preview';
                this.previewContainer.style.padding = '10px';
                this.previewContainer.style.border = '1px solid #ccc';
                this.previewContainer.style.margin = '10px auto';
                this.previewContainer.style.minHeight = '100px';
                this.previewContainer.style.width = 'calc(100% - 20px)';
                this.previewContainer.style.maxWidth = '600px';
                this.previewContainer.style.textAlign = 'center';
                this.playingScreenContainer.appendChild(this.previewContainer);

                this.rootElement.appendChild(this.playingScreenContainer);
            },

            render: function () {
                if (!this.rootElement) { console.error("UI Root element not set!"); return Promise.reject("UI Root element not set!"); }

                var self = this;
                this.playingScreenContainer.style.userSelect = null;
                this.playingScreenContainer.style.pointerEvents = null;
                this.playingScreenContainer.style.filter = null;

                if (game.state.currentScreen === 'difficultySelection') {
                    this.difficultyScreenContainer.style.display = 'block';

                    this.playingScreenContainer.style.display = 'none';
                    this.gameOverScreenContainer.style.display = 'none';
                    return self.renderDifficultyScreenContent();
                } else if (game.state.currentScreen === 'gameOver') {
                    this.gameOverScreenContainer.style.display = 'block';

                    this.difficultyScreenContainer.style.display = 'none';
                    this.playingScreenContainer.style.display = 'block';

                    this.playingScreenContainer.style.userSelect = 'none';
                    this.playingScreenContainer.style.pointerEvents = 'none';

                    this.playingScreenContainer.style.filter = "grayscale(100%) blur(1px) opacity(0.5)";
                    return self.renderGameOverScreenContent();
                } else if (game.state.currentScreen === 'playing') {
                    this.playingScreenContainer.style.display = 'block';

                    this.difficultyScreenContainer.style.display = 'none';
                    this.gameOverScreenContainer.style.display = 'none';
                    self.renderGoalsContent();
                    self.renderControlsContent();
                    return Promise.all([
                        self.renderGridContent(),
                        self.renderBankPanelContent(),
                        self.renderMergePreviewContent()
                    ]).then(()=>{
                       // console.log('play stage has rendered.');
                    }).catch(function (error) {
                        console.error("Error during UI rendering:", error);
                    });
                } else {
                    self.rootElement.innerHTML = '<p>Unknown game state.</p>';
                    return Promise.resolve();
                }
            },

            renderDifficultyScreenContent: function () {
                this.difficultyScreenContainer.innerHTML = '';

                const container = document.createElement('div');
                container.style.textAlign = 'center';
                container.style.padding = '20px';

                const title = document.createElement('h2');
                title.textContent = 'Select Difficulty';
                container.appendChild(title);

                const difficulties = Object.keys(game.config.difficultySettings || {});
                if (difficulties.length === 0) {
                    container.innerHTML = '<p>Error: No difficulties configured.</p>';
                    this.rootElement.appendChild(container);
                    return Promise.resolve();
                }

                const buttonsContainer = document.createElement('div');
                buttonsContainer.id = 'difficulty-buttons-container';
                buttonsContainer.style.display = 'flex';
                buttonsContainer.style.flexDirection = 'column';
                buttonsContainer.style.alignItems = 'center';
                buttonsContainer.style.marginTop = '20px';
                buttonsContainer.style.gap = '20px';

                difficulties.forEach(function (diffKey) {
                    const btn = new OO.ui.ButtonInputWidget({
                        label: diffKey,
                        flags: ['progressive']
                    });
                    const label = btn.$element[0].querySelector('.oo-ui-labelElement-label');
                    if (label) {
                        label.style.fontSize = '24px';
                    }
                    btn.on('click', function () {
                        game.startGame(diffKey);
                    });

                    buttonsContainer.appendChild(btn.$element[0]);
                });

                container.appendChild(buttonsContainer);
                this.difficultyScreenContainer.appendChild(container);
                return Promise.resolve();
            },

            renderGameOverScreenContent: function () {
                this.gameOverScreenContainer.innerHTML = '';

                const container = document.createElement('div');
                container.style.textAlign = 'center';
                container.style.padding = '20px';

                const title = document.createElement('h2');
                title.textContent = game.state.gameOverMessage || 'Game Over';
                container.appendChild(title);

                const scoreDisplay = document.createElement('p');
                scoreDisplay.textContent = 'Final Score: ' + game.state.currentScore;
                container.appendChild(scoreDisplay);

                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.gap = '10px';
                buttonContainer.style.justifyContent = 'center';
                buttonContainer.style.alignItems = 'center';
                buttonContainer.classList.add('game-over-button-container');

                var playAgainButton = new OO.ui.ButtonInputWidget({
                    label: 'Play Again',
                    icon: 'heart',
                    framed: false
                });
                playAgainButton.on('click', function () {
                    game.handleRestartGame(false);
                });
                var playAgainLabel = playAgainButton.$element[0].querySelector('.oo-ui-labelElement-label');
                if (playAgainLabel) {
                    playAgainLabel.style.fontSize = '24px';
                }
                buttonContainer.appendChild(playAgainButton.$element[0]);

                var changeDiffButton = new OO.ui.ButtonInputWidget({
                    label: 'Change Difficulty',
                    icon: 'settings',
                    framed: false
                });
                changeDiffButton.on('click', function () {
                    game.showDifficultyScreen();
                });
                var changeDiffLabel = changeDiffButton.$element[0].querySelector('.oo-ui-labelElement-label');
                if (changeDiffLabel) {
                    changeDiffLabel.style.fontSize = '24px';
                }
                buttonContainer.appendChild(changeDiffButton.$element[0]);

                container.appendChild(buttonContainer);
                this.gameOverScreenContainer.appendChild(container);
                return Promise.resolve();
            },

            renderElementWithEggGraphics: function (eggSpec, size = 50, showNameAndPoints = false) {
                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.alignItems = 'center';
                container.style.margin = '5px';

                const eggImageContainer = document.createElement('div');
                eggImageContainer.style.position = 'relative';
                eggImageContainer.style.width = `${size}px`;
                eggImageContainer.style.height = `${size}px`;

                const wikitext = `[[File:${eggSpec.image}|${eggSpec.name}]]`;
                const eggImagePromise = ModuleInject.renderWikitext(wikitext).then(function (html) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    let imgElement = tempDiv.querySelector('img');
                    if (imgElement) {
                        imgElement.style.maxWidth = `${size}px`;
                        imgElement.style.maxHeight = `${size}px`;
                        imgElement.style.objectFit = 'contain';
                        eggImageContainer.appendChild(imgElement);
                    } else {
                        eggImageContainer.textContent = eggSpec.name ? eggSpec.name.substring(0, 1).toUpperCase() : '?';
                        eggImageContainer.style.border = '1px dashed #999';
                        eggImageContainer.style.textAlign = 'center';
                        eggImageContainer.style.lineHeight = `${size}px`;
                    }
                }).catch(function (e) {
                    console.warn("Error rendering wikitext for image:", imageName, e);
                    eggImageContainer.textContent = '?';
                    eggImageContainer.style.border = '1px solid red';
                });
                
                const elementRenderPromises = [];
                
                return eggImagePromise.then(function () {
                    const levelBadge = document.createElement('span');
                    levelBadge.textContent = eggSpec.level;
                    levelBadge.style.position = 'absolute';
                    levelBadge.style.top = '1px'; levelBadge.style.right = '1px';
                    levelBadge.style.backgroundColor = 'rgba(255,255,255,0.8)';
                    levelBadge.style.color = 'black';
                    levelBadge.style.borderRadius = '50%';
                    levelBadge.style.width = '22px'; levelBadge.style.height = '22px';
                    levelBadge.style.textAlign = 'center'; levelBadge.style.lineHeight = '20px';
                    levelBadge.style.fontSize = '15px'; levelBadge.style.border = '1px solid black';
                    eggImageContainer.appendChild(levelBadge);

                    if (eggSpec.isTwin) {
                        eggImageContainer.style.outline = '5px solid cyan';
                        eggImageContainer.style.outlineOffset = '-2px';
                    }
                    container.appendChild(eggImageContainer);

                    let elementsLabel, latentElementsLabel;

                    if (showNameAndPoints) {
                        const nameLabel = document.createElement('div');
                        nameLabel.textContent = eggSpec.name || 'N/A';
                        nameLabel.style.fontSize = '18px';
                        nameLabel.style.marginTop = '2px';
                        container.appendChild(nameLabel);

                        const pointsLabel = document.createElement('div');
                        pointsLabel.textContent = (typeof eggSpec.points !== 'undefined' ? eggSpec.points : '0') + ' pts';
                        pointsLabel.style.fontSize = '16px';
                        pointsLabel.style.color = '#555';
                        container.appendChild(pointsLabel);

                        if (eggSpec.elements && eggSpec.elements.length > 0) {
                            elementsLabel = document.createElement('div');
                            elementsLabel.className = 'egg-elements-primary';
                            elementsLabel.style.marginTop = '3px';
                            elementsLabel.style.display = 'flex';
                            elementsLabel.style.justifyContent = 'center';
                            elementsLabel.style.minHeight = '20px';
                            container.appendChild(elementsLabel);

                            const primaryElementsPromise = ModuleInject.invokeModule(
                                'DvWiki',
                                'Show',
                                [],
                                {
                                    type: 'icon',
                                    elements: eggSpec.elements.join(','),
                                    size: "20px"
                                }
                            ).then(function (html) {
                                elementsLabel.innerHTML = html;
                            }).catch(function (err) {
                                console.warn("Error rendering primary elements for " + eggSpec.name, err);
                                elementsLabel.textContent = "";
                            });
                            elementRenderPromises.push(primaryElementsPromise);
                        }

                        const hasLatent = eggSpec.latentElements && eggSpec.latentElements.length > 0;
                        let latentAreDifferent = false;
                        if (hasLatent && eggSpec.elements) {
                            if (eggSpec.elements.length !== eggSpec.latentElements.length) {
                                latentAreDifferent = true;
                            } else {
                                const sortedElements = eggSpec.elements.slice().sort().join(',');
                                const sortedLatent = eggSpec.latentElements.slice().sort().join(',');
                                if (sortedElements !== sortedLatent) {
                                    latentAreDifferent = true;
                                }
                            }
                        } else if (hasLatent && !eggSpec.elements) {
                            latentAreDifferent = true;
                        }

                        if (hasLatent && latentAreDifferent) {
                            latentElementsLabel = document.createElement('div');
                            latentElementsLabel.className = 'egg-elements-latent';
                            latentElementsLabel.style.marginTop = '3px';
                            latentElementsLabel.style.display = 'flex';
                            latentElementsLabel.style.justifyContent = 'center';
                            latentElementsLabel.style.minHeight = '20px';
                            // const prefix = document.createElement('span'); prefix.textContent = "Latent: "; prefix.style.fontSize = "10px";
                            // latentElementsLabel.appendChild(prefix);
                            container.appendChild(latentElementsLabel);

                            const latentElementsPromise = ModuleInject.invokeModule(
                                'DvWiki',
                                'Show',
                                [],
                                {
                                    type: 'icon',
                                    elements: eggSpec.latentElements.join(','),
                                    size: "18px"
                                }
                            ).then(function (html) {
                                latentElementsLabel.innerHTML = html;
                            }).catch(function (err) {
                                console.warn("Error rendering latent elements for " + eggSpec.name, err);
                                latentElementsLabel.textContent = "";
                            });
                            elementRenderPromises.push(latentElementsPromise);
                        }
                    }
                    return Promise.all(elementRenderPromises);
                }).then(function () {
                    return container;
                });
            },

            renderGridContent: function () {
                const gridSize = game.state.gridSize;

                if (!this.gridContainer) {
                    console.error("gridContainer is not initialized!");
                    return Promise.reject("gridContainer not initialized");
                }

                let needsFullRebuild = false;
                if (!this.gridCellElements || this.gridCellElements.length !== gridSize || (gridSize > 0 && this.gridCellElements[0].length !== gridSize)) {
                    needsFullRebuild = true;
                }

                if (needsFullRebuild) {
                    this.gridContainer.innerHTML = '';
                    this.gridContainer.style.display = 'grid';
                    this.gridContainer.style.gridTemplateColumns = 'repeat(' + gridSize + ', 1fr)';
                    this.gridContainer.style.gap = '3px';
                    const cellSize = Math.min(100, 320 / gridSize);
                    this.gridContainer.style.width = (gridSize * (cellSize + 3)) + 'px';
                    this.gridContainer.style.height = (gridSize * (cellSize + 3)) + 'px';

                    this.gridCellElements = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
                    const allCellPromises = [];

                    for (let r = 0; r < gridSize; r++) {
                        for (let c = 0; c < gridSize; c++) {
                            const cellElement = document.createElement('div');
                            cellElement.className = 'game-cell';
                            cellElement.dataset.r = r;
                            cellElement.dataset.c = c;
                            cellElement.style.border = '1px solid #aaa';
                            cellElement.style.width = `${cellSize}px`; cellElement.style.height = `${cellSize}px`;
                            cellElement.style.display = 'flex';
                            cellElement.style.alignItems = 'center';
                            cellElement.style.justifyContent = 'center';
                            //cellElement.style.backgroundColor = '#f0f0f0';
                            cellElement.style.overflow = 'hidden';
                            cellElement.style.userSelect = 'none';

                            cellElement.addEventListener('click', function () { game.handleCellClick(r, c); });
                            this.gridContainer.appendChild(cellElement);
                            this.gridCellElements[r][c] = cellElement;

                            const eggData = game.state.grid[r][c];
                            const updatePromise = this.updateCellContent(cellElement, eggData, r, c, cellSize);
                            allCellPromises.push(updatePromise);
                        }
                    }
                    return Promise.all(allCellPromises);
                } else {
                    const allCellUpdatePromises = [];
                    for (let r = 0; r < gridSize; r++) {
                        for (let c = 0; c < gridSize; c++) {
                            const cellElement = this.gridCellElements[r][c];
                            const eggData = game.state.grid[r][c];
                            const updatePromise = this.updateCellContent(cellElement, eggData, r, c);
                            allCellUpdatePromises.push(updatePromise);
                        }
                    }
                    return Promise.all(allCellUpdatePromises);
                }
            },

            updateCellContent: function (cellElement, eggData, r, c, cellSizeOverride) {
                // cellSizeOverride is mainly for the initial full rebuild
                // For incremental, cellElement already has its size.
                const cellSize = cellSizeOverride || parseInt(cellElement.style.width, 10) || 60;

                const currentDisplayId = cellElement.dataset.currentEggId || null;
                const newDisplayId = eggData ? (eggData.name + '_' + eggData.level + '_' + eggData.isTwin) : null;

                cellElement.style.borderColor = '#aaa';
                cellElement.style.borderWidth = '1px';
                if (game.state.selectedEgg1 && game.state.selectedEgg1.cell.r === r && game.state.selectedEgg1.cell.c === c) {
                    cellElement.style.borderColor = 'blue'; cellElement.style.borderWidth = '5px';
                }
                if (game.state.selectedEgg2 && game.state.selectedEgg2.cell.r === r && game.state.selectedEgg2.cell.c === c) {
                    cellElement.style.borderColor = 'green'; cellElement.style.borderWidth = '5px';
                }

                cellElement.style.backgroundColor = (eggData && game.isMandatoryBank(eggData)) ? '#ffdddd' : null;

                if (currentDisplayId === newDisplayId) {
                    return Promise.resolve();
                }

                cellElement.innerHTML = '';
                cellElement.dataset.currentEggId = newDisplayId;

                if (eggData) {
                    return this.renderElementWithEggGraphics(eggData, cellSize * 0.85)
                        .then(function (eggElem) {
                            cellElement.appendChild(eggElem);
                        })
                        .catch(function (err) {
                            console.error("Error rendering egg in cell", r, c, err);
                            cellElement.innerHTML = 'ERR';
                        });
                } else {
                    cellElement.innerHTML = '<div style="font-size:' + (cellSize * 0.5) + 'px; color:grey;">🌀</div>';
                    return Promise.resolve();
                }
            },

            renderGoalsContent: function () {
                let goalsListDiv = this.goalsContainer.querySelector('.goals-list');
                goalsListDiv.innerHTML = '';
                game.state.goals.forEach(goal => {
                    const p = document.createElement('p');
                    p.style.margin = '5px 0'; p.style.fontSize = '18px';
                    let progressText = '';
                    if (goal.type === 'totalPoints') progressText = `${goal.currentPoints} / ${goal.targetPoints}`;
                    else if (goal.type === 'elementLevel') progressText = `${goal.currentCount} / ${goal.targetCount}`;
                    p.textContent = `${goal.description}: ${progressText}`;
                    if ((goal.type === 'totalPoints' && goal.currentPoints >= goal.targetPoints) ||
                        (goal.type === 'elementLevel' && goal.currentCount >= goal.targetCount)) {
                        p.style.color = 'green'; p.style.fontWeight = 'bold';
                    }
                    goalsListDiv.appendChild(p);
                });

                const p = document.createElement('p');
                p.style.margin = '5px 0'; p.style.fontSize = '16px';
                p.textContent = 'Difficulty: ' + game.state.difficulty;
                goalsListDiv.appendChild(p);

                if (game.state.currentScreen === 'playing') {
                    this.controlsContainer.display = 'flex';
                } else {
                    this.controlsContainer.display='none';
                }
            },

            renderBankPanelContent: function () {
                const currentBankedEggs = game.state.bankedEggs;
                const currentCount = currentBankedEggs.length;

                this.bankedScoreDisplay.textContent = `Total Points: ${game.state.currentScore}`;

                if (currentCount === this.lastRenderedBankedEggsCount) {
                    return Promise.resolve();
                }
                this.lastRenderedBankedEggsCount = currentCount;
 
                const renderPromises = [];
                for (const egg of currentBankedEggs) {
                    renderPromises.push(this.renderElementWithEggGraphics(egg, 50, false));
                }

                var self = this;
                return Promise.all(renderPromises)
                    .then(function (resolvedEggElements) {
                        self.bankedItemsDiv.innerHTML = '';

                        for (const eggElem of resolvedEggElements) {
                            if (eggElem) {
                                self.bankedItemsDiv.appendChild(eggElem); // todo hover to see pts?
                            }
                        }
                    });
            },

            renderMergePreviewContent: function () {
                this.previewRenderVersion++;
                const currentVersion = this.previewRenderVersion;

                this.previewContainer.innerHTML = '';
                this.previewContainer.style.display = 'flex';
                this.previewContainer.style.alignItems = 'flex-start';
                this.previewContainer.style.flexDirection = 'row';
                this.previewContainer.style.justifyContent = 'center';

                const { selectedEgg1, selectedEgg2, previewedMergeResult } = game.state;
                const P_SIZE = 80;

                var self = this;

                if (selectedEgg1 && selectedEgg2 && previewedMergeResult) {
                    if (previewedMergeResult.error) {
                        this.previewContainer.textContent = `Error: ${previewedMergeResult.error}`;
                        return Promise.resolve();
                    }

                    var resultRenderPromise;
                    if (previewedMergeResult.isPreview) {
                        const mysterySpec = {
                            name: previewedMergeResult.name,
                            image: previewedMergeResult.image,
                            level: previewedMergeResult.level,
                            isTwin: previewedMergeResult.isTwin,
                            points: `(${previewedMergeResult.minPoints} - ${previewedMergeResult.maxPoints})`
                        };
                        resultRenderPromise = self.renderElementWithEggGraphics(mysterySpec, P_SIZE, true);
                    } else {
                        resultRenderPromise = self.renderElementWithEggGraphics(previewedMergeResult, P_SIZE, true);
                    }

                    return Promise.all([
                        this.renderElementWithEggGraphics(selectedEgg1.data, P_SIZE, true),
                        this.renderElementWithEggGraphics(selectedEgg2.data, P_SIZE, true),
                        resultRenderPromise
                    ]).then(function (elements) {
                        if (currentVersion !== self.previewRenderVersion) {
                            console.log("renderMergePreviewContent: Stale render (version " + currentVersion + "), current is " + self.previewRenderVersion);
                            return; // Abort if a newer render has started
                        }

                        const egg1Elem = elements[0];
                        const egg2Elem = elements[1];
                        const resultElem = elements[2];

                        const plus = document.createElement('span'); plus.textContent = '+'; plus.style.margin = '15px 15px 0 15px'; plus.style.fontSize = '24px';
                        const equals = document.createElement('span'); equals.textContent = '='; equals.style.margin = '15px 15px 0 15px'; equals.style.fontSize = '24px';

                        // self.previewContainer.innerHTML = '';
                        self.previewContainer.appendChild(egg1Elem);
                        self.previewContainer.appendChild(plus);
                        self.previewContainer.appendChild(egg2Elem);
                        self.previewContainer.appendChild(equals);
                        self.previewContainer.appendChild(resultElem);
                    }).catch(function (error) {
                        console.error("Error rendering merge preview elements:", error);
                        self.previewContainer.textContent = 'Error displaying preview.';
                    });
                } else if (selectedEgg1) {
                    return self.renderElementWithEggGraphics(selectedEgg1.data, P_SIZE, true).then(function (egg1Elem) {
                        if (currentVersion !== self.previewRenderVersion) {
                            console.log("renderMergePreviewContent: Stale render (version " + currentVersion + "), current is " + self.previewRenderVersion);
                            return; // Abort if a newer render has started
                        }

                        const text = document.createElement('span'); text.textContent = 'Tap another egg to merge or BANK.';
                        text.style.marginLeft = '10px';

                        // self.previewContainer.innerHTML = '';
                        self.previewContainer.appendChild(egg1Elem);
                        self.previewContainer.appendChild(text);
                    }).catch(function (error) {
                        console.error("Error rendering selected egg preview:", error);
                        self.previewContainer.textContent = 'Error displaying selection.';
                    });
                } else {
                    if (currentVersion === self.previewRenderVersion) {
                        self.previewContainer.textContent = 'Select an egg on the grid.';
                    }
                    return Promise.resolve();
                }
            },

            renderControlsContent: function () {
                this.undoButton.setLabel('Redo (' + game.state.undoChances + ')');
                const isDisabled = (game.state.undoChances <= 0 ||
                    !game.state.undoState ||
                    !game.state.undoState.canUndo ||
                    game.state.isProcessing);
                this.undoButton.setDisabled(isDisabled);
            },

            showAlert: function (message, title) {
                OO.ui.alert(message, {
                    title: title || 'Alert',
                    size: 'medium'
                });
            },

            showConfirm: function (message, title) {
                return new Promise(function (resolve, reject) {
                    OO.ui.confirm(message, {
                        title: title || 'Confirm',
                        size: 'medium'
                        // actions: [
                        //    { action: 'accept', label: 'Confirm', flags: ['primary', 'destructive'] },
                        //    { action: 'cancel', label: 'Cancel', flags: 'safe' }
                        // ]
                    }).then(function (confirmed) {
                        if (confirmed === true) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                })
            }
        }
    };

    function initializeGameWithData(gameConfig, dragonsData, limitedData) {
        ModuleInject.waitForElement('#eggy-hatchy-game-container').then(el => {
            game.initialize(gameConfig, dragonsData, limitedData, el);
        }).catch(error => console.error("Failed to find #eggy-hatchy-game-container or initialize game:", error));
    }

    if (mw.config.get('wgUserName') !== null) {
        mw.loader.using([
            'mediawiki.api',
            'oojs-ui-core',
            'oojs-ui-windows',
            //'oojs-ui-widgets',
            //'oojs-ui-toolbars',
            'oojs-ui.styles.icons-interactions',
            'oojs-ui.styles.icons-editing-core'
        ], function () {
            var api = new mw.Api();
            mw.hook('wikipage.content').add(function ($content) {
                Promise.all([
                    ModuleInject.loadJsonData(api, 'Data:EggyHatchyConfig.json'),
                    ModuleInject.loadJsonData(api, 'Data:Dragons.json'),
                    ModuleInject.loadJsonData(api, 'Data:Limited.json')
                ]).then(function (results) {
                    var gameConfig = results[0];
                    var dragons = results[1];
                    var limited = results[2];
                    initializeGameWithData(gameConfig, dragons, limited);
                }).catch(function (error) {
                    console.error("Failed to load game data.", error);
                });
            });
        });
    } else {
        ModuleInject.waitForElement('#eggy-hatchy-game-container').then(el => {
            $(el).html("Please [[Special:UserLogin|login]] to play Eggy Hatchy.");
        });
    }
})();