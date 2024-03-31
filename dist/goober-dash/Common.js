function addImage() {
    // Create an img element
    var img = document.createElement('img');
    img.src = 'Bunny-run.webp'; // Replace 'image.jpg' with the URL of your image

    // Set image styles
    img.style.position = 'fixed';
    img.style.top = '10px'; // Adjust the vertical position as needed
    img.style.left = '50%'; // Position in the center horizontally
    img.style.transform = 'translateX(-50%)'; // Adjust to center the image horizontally
    img.style.zIndex = '9999'; // Ensure the image appears above other content

    // Append the image to the body
    document.body.appendChild(img);
}

// Call addImage() to add the image when the script is encountered
addImage();