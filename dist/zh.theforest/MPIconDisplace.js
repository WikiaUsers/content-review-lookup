var containers = $('.displace-container');  // Select all displace-container elements
  var overlayContainers = $('.image-overlay-container');  // Select all image-overlay-container elements
  var enlargeImages = $('.image-enlarge-container img');  // Select all images inside .image-enlarge-container
  var rotateImages = $('.image-rotate-container img');  // Select all images inside .image-rotate-container
  var displaceImages = $('.image-displace-container');  // Select all image-displace-container elements
  
  // Store initial rotation and scale for each image in displace-container
  displaceImages.each(function() {
    var image = $(this)[0]; // Access the DOM element directly for calculations

    // Get the initial rotation value (from inline style)
    var initialRotation = parseInt(image.style.transform.match(/rotate\((\d+)deg\)/) ? image.style.transform.match(/rotate\((\d+)deg\)/)[1] : 0, 10);
    
    // Store the initial rotation and scaleX (mirroring) in data attributes
    var scaleX = image.style.transform.includes('scaleX(-1)') ? -1 : 1;
    $(image).data('initial-rotation', initialRotation);
    $(image).data('initial-scaleX', scaleX);
  });

  // Add hover effect for scaling the image inside the image-enlarge-container
  overlayContainers.on('mouseenter', function() {
    var overlayContainer = $(this); // Current overlay container
    var enlargeContainer = overlayContainer.find('.image-enlarge-container'); // Find the image container inside

    // Enlarge the image by 20% on hover
    enlargeContainer.find('img').css({
      'transform': 'scale(1.2)',  // Apply 20% enlargement
      'transition': 'transform 0.3s ease' // Smooth transition for scaling
    });
  });

  overlayContainers.on('mouseleave', function() {
    var overlayContainer = $(this); // Current overlay container
    var enlargeContainer = overlayContainer.find('.image-enlarge-container'); // Find the image container inside

    // Reset the image back to its original size
    enlargeContainer.find('img').css({
      'transform': 'scale(1)',  // Reset the image size to 100%
      'transition': 'transform 0.3s ease' // Smooth transition for resetting the scale
    });
  });

  // Add hover effect for scaling and continuous rotating the image inside the image-rotate-container
  var currentRotation = 0;  // Variable to keep track of the current rotation angle
  var rotationInterval;  // To hold the interval for continuous rotation
  var isHovered = false;  // To track if the container is hovered or not

  overlayContainers.on('mouseenter', function() {
    var overlayContainer = $(this); // Current overlay container
    var rotateContainer = overlayContainer.find('.image-rotate-container'); // Find the image container inside
    var img = rotateContainer.find('img');

    if (!isHovered) {
      isHovered = true;  // Set hovered flag to true

      // Apply scaling and start rotating
      img.css({
        'transform': 'scale(1.2) rotate(' + currentRotation + 'deg)',  // Apply scaling and current rotation
        'transition': 'transform 0.5s ease'  // Smooth transition for scaling
      });

      // Start the continuous rotation manually
      rotationInterval = setInterval(function() {
        currentRotation += 1;  // Increment the rotation angle slowly
        img.css({
          'transform': 'scale(1.2) rotate(' + currentRotation + 'deg)'  // Apply the updated rotation
        });
      }, 10);  // Adjust the time interval (10ms for smooth effect)
    }
  });

  overlayContainers.on('mouseleave', function() {
    var overlayContainer = $(this); // Current overlay container
    var rotateContainer = overlayContainer.find('.image-rotate-container'); // Find the image container inside
    var img = rotateContainer.find('img');

    if (isHovered) {
      isHovered = false;  // Set hovered flag to false
      // Reset the image back to its original size but retain the rotation
      img.css({
        'transform': 'scale(1) rotate(' + currentRotation + 'deg)',  // Retain current rotation
        'transition': 'transform 0.5s ease'  // Smooth transition for resetting the scale
      });

      // Clear the rotation interval to stop continuous rotation
      clearInterval(rotationInterval);
    }
  });

  // Add hover effect for translation and rotation of images inside displace-container
  overlayContainers.on('mouseenter', function() {
    var overlayContainer = $(this); // Current overlay container
    var container = overlayContainer.siblings('.displace-container'); // Find corresponding displace-container

    // Recalculate container position on hover (to handle window resizing)
    var containerRect = container[0].getBoundingClientRect(); // Updated position

    // Loop through each image container inside this specific overlayContainer
    overlayContainer.find('.image-displace-container').each(function() {
      var image = $(this)[0]; // Access the DOM element directly for calculations

      // Get the position of the image
      var rect = image.getBoundingClientRect();
      var imageCenterX = rect.left + rect.width / 2;
      var imageCenterY = rect.top + rect.height / 2;

      // Calculate the distance from the center of the container
      var centerX = containerRect.left + containerRect.width / 2;
      var centerY = containerRect.top + containerRect.height / 2;

      var distanceX = imageCenterX - centerX;
      var distanceY = imageCenterY - centerY;
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY); // Euclidean distance

      // Calculate movement and rotation based on the distance
      var translateValue = distance / 10; // Adjust for more or less translation
      var angle = distance / 10 + $(image).data('initial-rotation'); // Add the initial rotation to the dynamic angle

      // Get the current scaleX value (to preserve mirroring)
      var scaleX = $(image).data('initial-scaleX');

      // Apply transform with dynamic translation, rotation, and preserved mirroring
      var maxTranslate = 100; // Max translate limit to prevent moving too far
      var limitedTranslateX = Math.min(Math.max(distanceX / 2, -maxTranslate), maxTranslate);
      var limitedTranslateY = Math.min(Math.max(distanceY / 2, -maxTranslate), maxTranslate);

      // Apply the transform with a smooth animation, including the scaleX for mirroring
      image.style.transition = 'transform 0.3s ease'; // Transition for smoothness
      image.style.transform = 'translate(' + limitedTranslateX + 'px, ' + limitedTranslateY + 'px) rotate(' + angle + 'deg) scaleX(' + scaleX + ')';
    });
  });

  overlayContainers.on('mouseleave', function() {
    var overlayContainer = $(this); // Current overlay container
    // Reset all images to their initial positions and rotation
    overlayContainer.find('.image-displace-container').each(function() {
      var image = $(this)[0];

      // Get the initial rotation and scaleX stored in data attributes
      var initialRotation = $(image).data('initial-rotation');
      var initialScaleX = $(image).data('initial-scaleX');
      
      // Reset transform to initial position, rotation, and mirroring with smooth transition
      image.style.transition = 'transform 0.3s ease'; // Transition for smoothness
      image.style.transform = 'translate(0, 0) rotate(' + initialRotation + 'deg) scaleX(' + initialScaleX + ')';
    });
  });