//Personal use only//
//Made by Crazybloy2//
//has been made for BrowserConsole User:Crazybloy2/console_log User:Crazybloy2/BrowserConsole(this one until the script's been reviewed)

//Function to run JavaScript code and display in a specific area
function runCode() {
    const inputElement = $('#consoleinput input');
    const outputElement = $('#console-log');

    try {
        // Run the code you entered
        const result = eval(inputElement.val());

        // Display the result in the console
        outputElement.append('<div><strong>Output:</strong> ' + result + '</div>');

        // Delete the input area
        inputElement.val('');
    } catch (error) {
        // Show errors in console
        outputElement.append('<div style="color: red;"><strong>Error:</strong> ' + error.message + '</div>');
    }
}

// Create the input element dynamically with jQuery
const inputElement = $('<input>').attr({
    type: 'text',
    style: 'width: 100%; padding: 5px;',
    placeholder: 'Enter your js commands here'
});

// Add the input element to the div element with ID 'consoleinput'
$('#consoleinput').append(inputElement);

// Add an event listener to execute the code when Enter is pressed
inputElement.on('keyup', function (event) {
    if (event.key === 'Enter') {
        runCode();
    }
});

// Example of using the console
console.log('An example console message');

// Example of running code from the UI
// Run the 'initConsole' function from the previous answer
runCode();