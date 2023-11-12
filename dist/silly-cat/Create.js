function createForm() {
    // Create a form element
    var form = document.createElement("form");
    form.setAttribute("id", "myForm");

    // Create an input field
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "username");
    input.setAttribute("placeholder", "Enter your username");

    // Create a submit button
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    // Append form elements to the form
    form.appendChild(input);
    form.appendChild(submitButton);

    // Append the form to a div or another container on your wiki page
    var container = document.getElementById("form-container");
    container.appendChild(form);
}

// Call the function to create the form
createForm();