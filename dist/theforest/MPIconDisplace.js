var containers = $('.displace-container');  // Select all displace-container elements
  var overlayContainers = $('.image-overlay-container');  // Select all image-overlay-container elements
  var images = $('.image-displace-container');  // Select all image-displace-container elements
  
  // Store initial rotation for each image
  images.each(function() {
    var image = $(this)[0]; // Access the DOM element directly for calculations

    // Get the initial rotation value (from inline style)
    var initialRotation = parseInt(image.style.transform.match(/rotate\((\d+)deg\)/) ? image.style.transform.match(/rotate\((\d+)deg\)/)[1] : 0, 10);
    
    // Store the initial rotation and mirroring (scaleX) in data attributes
    var scaleX = image.style.transform.includes('scaleX(-1)') ? -1 : 1;
    $(image).data('initial-rotation', initialRotation);
    $(image).data('initial-scaleX', scaleX);
  });

  // Add hover effect to both the container and the overlay
  overlayContainers.on('mouseenter', function() {
    var overlayContainer = $(this); // Current overlay container in the loop
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
      image.style.transform = 'translate(' + limitedTranslateX + 'px, ' + limitedTranslateY + 'px) rotate(' + angle + 'deg) scaleX(' + scaleX + ')';
    });
  });

  overlayContainers.on('mouseleave', function() {
    var overlayContainer = $(this); // Current overlay container in the loop
    // Reset all images to their initial positions and rotation
    overlayContainer.find('.image-displace-container').each(function() {
      var image = $(this)[0];

      // Get the initial rotation and scaleX stored in data attributes
      var initialRotation = $(image).data('initial-rotation');
      var initialScaleX = $(image).data('initial-scaleX');
      
      // Reset transform to initial position, rotation, and mirroring with smooth transition
      image.style.transform = 'translate(0, 0) rotate(' + initialRotation + 'deg) scaleX(' + initialScaleX + ')';
    });
  });