// IsleDialog.js made by Cxsnls
// This script replicates the in-game dialogue format.

// Settings
let TYPEWRITER_CHARACTER_DELAY = 35; // Time in milliseconds which the typewriter must wait before writing the next character
let TWEEN_OPACITY_DELAY = 5; // Time in milliseconds which the tween must wait before moving on to the next opacity value

let RANDOM_REGEX = new RegExp("{{RANDOM:(.+)}}", "gm"); // Regular expression used to capture random expressions
let PLACEHOLDERS = { // Dictionary of placeholders
    ["Random"]: RANDOM_REGEX
};

// Variables

let dialogues = []; // Dialogues (number, dialogue node)
let dialogueInfo = {}; // Dialogue info
let dialogueElements = {}; // Dialogue elements (questionContainer, question, next, reset, answerContainer, answer)
let dialogueStatuses = {}; // Dialogue status (current question node)

// Effects

// Write letters to object's innerText one by one
// object (node): target
// string (string): string
function typewriter(object, string) { //
    let currentString = "";
    for (let currentCharacterId = 0; currentCharacterId < string.length; currentCharacterId++) { // For each character in the string,
        setTimeout(function () {
            let currentCharacter = string.charAt(currentCharacterId);
            currentString += currentCharacter;
            object.innerText = currentString;
        }, TYPEWRITER_CHARACTER_DELAY * currentCharacterId);
    }
}

// Tween opacity of an object
// object (node): target
function tweenOpacity(object) {
    for (let currentValue = 0; currentValue <= 100; currentValue++) {
        setTimeout(function () {
            object.style.opacity = currentValue / 100;
        }, TWEEN_OPACITY_DELAY * currentValue);
    }
}

// Utilities

// Clear descendants of an object
// object (node): target
function clearDescendants(object) {
    object.replaceChildren();
}

// Report an error with a dialogue and terminate it
// dialogueID (integer): target ID
// dialogue (node): target
function reportError(error, dialogueID, dialogue) {
    // Report error
    console.error(error);
    console.warn(dialogue);

    // Terminate dialogue
    let elements = dialogueElements[dialogueID];
    let resetElement = elements.reset; // Get reset button
    resetElement.style.display = ""; // Display the reset button, making it possible to restart the dialogue
}

// Processes a string and inserts required elements
// string (string): target
function processString(string) {
    let sectionedString = string.split("|"); // Split the string into sections

    for (let placeholder in PLACEHOLDERS) {
        let placeholderRegex = PLACEHOLDERS[placeholder]; // Get regex for placeholder

        for (let currentSectionID = 0; currentSectionID < sectionedString.length; currentSectionID++) { // For each section
            let currentSection = sectionedString[currentSectionID]; // Get section

            let placeholders = [...currentSection.matchAll(placeholderRegex)]; // Match for placeholder
            for (let currentPlaceholderID = 0; currentPlaceholderID < placeholders.length; currentPlaceholderID++) {
                let currentPlaceholder = placeholders[currentPlaceholderID];
                let newPlaceholder = "";

                switch (placeholder) {
                    case "Random":
                        let placeholderParameters = currentPlaceholder[1].split("$"); // Split placeholder into parameters
                        newPlaceholder = placeholderParameters[Math.floor(Math.random() * placeholderParameters.length)]; // Pick random parameter
                        break;
                }

                currentSection = currentSection.replace(currentPlaceholder[0], newPlaceholder); // Replace it in section
            }

            sectionedString[currentSectionID] = currentSection; // Set section
        }
    }

    return sectionedString;
}

// Execute actions
// dialogueID (integer): dialogue identification number
// dialogue (node): node of class dialogue
// action (dictionary): details about action
function handleActions(dialogueID, dialogue, actions) {
    // Get information about dialogue elements
    let elements = dialogueElements[dialogueID];
    let answerContainerElement = elements.answerContainer;
    let resetElement = elements.reset;

    for (let action of actions) {
        if (action.action == "End") { // If the action is End,
            resetElement.style.display = ""; // Display the reset button, making it possible to restart the dialogue
            clearDescendants(answerContainerElement); // Clear answers to prevent any unintended effects
            return;
        }
        let actionParameter = action.parameter;
        if (action.action == "GoTo" && typeof actionParameter == "string") { // If the action is GoTo,
            dialogueStatuses[dialogueID] = actionParameter; // Change the dialogue status to the action of the button
            clearDescendants(answerContainerElement); // Clear out buttons
            updateDialogue(dialogueID, dialogue); // Update the dialogue
        }
        else if (action.action == "GoToRandom" && Array.isArray(actionParameter)) { // If the action is GoToRandom,
            let chosenQuestion = actionParameter[Math.floor(Math.random() * actionParameter.length)];
            dialogueStatuses[dialogueID] = chosenQuestion; // Change the dialogue status to the action of the button
            clearDescendants(answerContainerElement); // Clear out buttons
            updateDialogue(dialogueID, dialogue); // Update the dialogue
        }
        else { // If the action is invalid,
            reportError(`Action (${action.action}) is not valid or parameter (${actionParameter}) has incorrect type.`, dialogueID, dialogue); // Report an error
        }
    }
}

// Functions

// Displays possible answers
// dialogueID (integer): dialogue identification number
// dialogue (node): node of class dialogue
// currentAnswers (list): answers
// answerContainerElement (node): node of class answer-container, which contains the answers
// resetElement (node): node of class reset, which is a button used for resetting the dialogue
function displayAnswers(dialogueID, dialogue, currentAnswers) {
    // Get information about dialogue elements
    let elements = dialogueElements[dialogueID];
    let answerContainerElement = elements.answerContainer;
    let resetElement = elements.reset;

    clearDescendants(answerContainerElement); // Clear answers from previous runs

    if (currentAnswers.length > 0) { // If there is more than one answer,

        for (let answerID = 0; answerID < currentAnswers.length; answerID++) { // Iterate over answers
            let answer = currentAnswers[answerID]; // Get the current answer
            let actions = answer.actions; // Get the current actions

            // Create a div with classname "answer" with the answer as text and append it to the answer container
            let answerButton = document.createElement("div");
            answerButton.className = "answer";
            answerButton.style.opacity = 0;
            answerButton.innerText = processString(answer.answer); // Process the string to replace placeholders

            if ("answerColor" in answer) { // If there is an answer color defined, 
                answerButton.style.color = answer.answerColor; // set it
            }

            answerContainerElement.appendChild(answerButton); // Parent the answerButton to the answerContainer


            answerButton.addEventListener("click", function () { // When the answer button is clicked,
                handleActions(dialogueID, dialogue, actions); // handle actions
            });

            setTimeout(function (answerButton) {
                tweenOpacity(answerButton);
            }, TWEEN_OPACITY_DELAY * 100 * answerID, answerButton);

        }
    }
    else { // If there are no answers,
        resetElement.style.display = ""; // Display the reset button, making it possible to restart the dialogue
    }
}

// Displays the question
// questionElement (node): node containing the question
// question (dictionary): dictionary with information about the question
// currentQuestionSection (string): string containing current question section
function displayQuestion(questionElement, question, currentQuestionSection) {
    questionElement.innerText = ""; // Clear out text before next question

    if ("questionColor" in question) { // If there is a question color defined,
        questionElement.style.color = question.questionColor; // set it
    }
    else { // Otherwise,
        questionElement.style.color = ""; // reset it
    }

    typewriter(questionElement, currentQuestionSection); // Display the corresponding section
}

// Update a dialogue's state
// dialogueID (integer): dialogue identification number
// dialogue (node): node of class dialogue
function updateDialogue(dialogueID, dialogue) {
    let currentDialogueInfo = dialogueInfo[dialogueID]; // Get dialogue info
    let dialogueStatus = dialogueStatuses[dialogueID]; // Get dialogue status

    // Get information about dialogue elements
    let elements = dialogueElements[dialogueID];
    let questionContainerElement = elements.questionContainer;
    let questionElement = elements.question;
    let altTextElement = elements.altText;
    let nextElement = elements.next;

    if (dialogueStatus in currentDialogueInfo) { // If there is information about the current status,
        // Get information about the current interaction
        let currentInteraction = currentDialogueInfo[dialogueStatus];
        let currentQuestion = currentInteraction.question;
        let currentAnswers = currentInteraction.answers;

        let splitQuestion = processString(currentQuestion); // Split the question into sections
        let currentSection = 0; // Define variable for current section

        if ("altText" in currentInteraction) { // If the current interaction has any alt text,
            altTextElement.innerText = currentInteraction.altText; // change the text
            altTextElement.style.display = ""; // display it
        }
        else { // If the current interaction has no alt text,
            altTextElement.style.display = "none"; // hide it
        }

        if (splitQuestion.length == 1) { // If there is only a single section,
            displayQuestion(questionElement, currentInteraction, splitQuestion[currentSection]); // Write the section via typewriter
            setTimeout(() => {
                if (("actions" in currentInteraction == false || currentInteraction.actions.length == 0)) { // If there are no actions,
                    displayAnswers(dialogueID, dialogue, currentAnswers); // display answers
                }
                else { // If there are actions,
                    nextElement.style.display = ""; // Display the next button

                    let displaySection = function () { // When the next button is clicked,
                        nextElement.style.display = "none"; // Hide the next button
                        handleActions(dialogueID, dialogue, currentInteraction.actions); // Handle actions
                        nextElement.removeEventListener("click", displaySection); // Remove the click event listener from the next button
                        questionContainerElement.removeEventListener("click", displaySection); // Remove the click event listener from the dialogue container
                    }

                    nextElement.addEventListener("click", displaySection); // Display the next section whenever the next button is clicked
                    questionContainerElement.addEventListener("click", displaySection); // Display the next section whenever the dialogue box is clicked
                }
            }, TYPEWRITER_CHARACTER_DELAY * splitQuestion[currentSection].length); // Set timer for when the typewriter effect is complete to display answers
        }
        else if (splitQuestion.length > 1) { // If there is more than one section,

            // Display the correspoding section of the question
            let displaySection = function (isFirst) {
                if (nextElement.style.display == "" || isFirst == true) { // If it is possible to move on to the next section,
                    nextElement.style.display = "none"; // Hide the next button

                    if (currentSection < splitQuestion.length) { // If there are sections remaining,
                        displayQuestion(questionElement, currentInteraction, splitQuestion[currentSection]); // Write the section via typewriter
                    }

                    if (currentSection == splitQuestion.length - 1 && ("actions" in currentInteraction == false || currentInteraction.actions.length == 0)) { // If this is the last section and there are no actions,

                        nextElement.removeEventListener("click", displaySection); // Remove the click event listener from the next button
                        questionContainerElement.removeEventListener("click", displaySection); // Remove the click event listener from the dialogue box
                        setTimeout(() => {
                            displayAnswers(dialogueID, dialogue, currentAnswers); // Display answers
                        }, TYPEWRITER_CHARACTER_DELAY * splitQuestion[currentSection].length); // Set timer for when the typewriter effect is complete to display answers

                    }
                    else if (currentSection > splitQuestion.length - 1) { // If the dialogue is over and it's time for actions,
                        handleActions(dialogueID, dialogue, currentInteraction.actions); // Handle actions
                        nextElement.removeEventListener("click", displaySection); // Remove the click event listener from the next button
                        questionContainerElement.removeEventListener("click", displaySection); // Remove the click event listener from the dialogue box
                    }
                    else {
                        setTimeout(() => {
                            nextElement.style.display = ""; // Show next
                        }, TYPEWRITER_CHARACTER_DELAY * splitQuestion[currentSection].length);
                    }

                    currentSection += 1; // Move on to the next section
                }
            };

            displaySection(true); // Display the first section

            nextElement.addEventListener("click", displaySection); // Display the next section whenever the next button is clicked
            questionContainerElement.addEventListener("click", displaySection); // Display the next section whenever the dialogue box is clicked
        }
    }
    else { // If there is no information about the current status,
        reportError(`There is no information about current dialogue status (${dialogueStatus}).`, dialogueID, dialogue);
    }
}

// Obtain information about dialogue, set it up and cache its elements
// dialogueID (integer): dialogue identification number
// dialogue (node): node of class dialogue
function createDialogue(dialogueID, dialogue) {
    dialogues[dialogueID] = dialogue; // Store dialogue in dialogues
    let dialogueParameters = dialogue.querySelector(".content");
    dialogueInfo[dialogueID] = JSON.parse(dialogueParameters.innerText); // Store dialogue information in dialogueInfo
    dialogueStatuses[dialogueID] = "Start"; // Store dialogue status ("Start") in dialogueStatuses

    // Get elements of dialogue
    let questionContainer = dialogue.querySelector(".question-container");
    let question = questionContainer.querySelector(".question");
    let reset = questionContainer.querySelector(".reset");
    let altText = questionContainer.querySelector(".alt-text");
    let next = questionContainer.querySelector(".next");
    let answerContainer = dialogue.querySelector(".answer-container");
    dialogueElements[dialogueID] = {
        "questionContainer": questionContainer,
        "question": question,
        "reset": reset,
        "altText": altText,
        "next": next,
        "answerContainer": answerContainer
    }; // Store dialogue elements in dialogueElements

    // Check existence of elements
    console.assert(questionContainer, "Question container element is missing.");
    console.assert(question, "Question element is missing.");
    console.assert(reset, "Reset element is missing.");
    console.assert(altText, "Alt text element is missing.");
    console.assert(next, "Next element is missing.")
    console.assert(answerContainer, "Answer container element is missing.")

    reset.addEventListener("click", function () { // When the reset button is clicked,
        reset.style.display = "none"; // Hide it
        dialogueStatuses[dialogueID] = "Start"; // Reset the dialogue status to the beginning
        updateDialogue(dialogueID, dialogue); // Update the dialogue to apply changes
    });

    updateDialogue(dialogueID, dialogue); // Update the dialogue to show initial state
}

// Business Logic
let foundDialogues = document.querySelectorAll(".dialogue"); // Find all dialogues on page

if (foundDialogues.length != 0) { // If there are any dialogues,
    for (let currentDialogueID = 0; currentDialogueID < foundDialogues.length; currentDialogueID++) {
        createDialogue(currentDialogueID, foundDialogues[currentDialogueID]); // create them
    }
}