/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get("wgPageName") === "Test_Page") {
  // if the page currently loaded on the wiki is named 'Test Page' this code will be ran
  var inputBox = document.createElement("div"); // create the a div element that will store the input box
  var input = document.createElement("input"); // create a input element that will get the input entered
  input.id = "input"; // set the id to the input element to "input"
  input.style.display = "inline-block"; //set the style.display to "inline-block" so it will all be in one line
  var textParagraph = document.createElement("p"); // create a text paragraph
  textParagraph.innerHTML = "times two is: "; // set the default text to the paragraph
  textParagraph.style.display = "inline-block"; // set the style.display to "inline-block" so it will all be in one line
  textParagraph.id = "textParagraph"; // set the id to the textParagraph element to "textParagraph"
  var newLine = document.createElement("br"); // create a br element to start a new line
  var getAnswer = document.createElement("button"); // create the check button
  getAnswer.innerHTML = "Check"; // set the text on the button to "Check"
  getAnswer.addEventListener("click", function() {
    document.getElementById("textParagraph").innerHTML= "times two is: " + document.getElementById("input").value * 2;
  }); //add an event listener to the button that will set the text to the textParagraph element to "times two is: (whatever it is)" when it is clicked 
  inputBox.appendChild(textParagraph.appendChild(input)); // add the input element to the input box
  inputBox.appendChild(textParagraph); // add the textParagraph element to the input box
  inputBox.appendChild(newLine); // add the new line element to the input box
  inputBox.appendChild(getAnswer); // add the getAnswer button element to the input box
  document.getElementById("mw-content-text").appendChild(inputBox); // add the input box to the main page content
}

switch (mw.config.get('wgPageName')) {
    case 'page name':
        // JS here will be applied to "page name"
        break;
    case 'some other page':
        // JS here will be applied to "some other page"
        break;
}