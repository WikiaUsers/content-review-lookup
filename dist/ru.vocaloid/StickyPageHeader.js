// Variable to track whether actions have been added
var actionsAdded = false;
var originalSitenameText = '';

// Function to handle scroll events
function handleScroll() {
    var stickyHeader = document.querySelector('.fandom-sticky-header.is-visible');
    var pageFooter = document.querySelector('.page-footer');

    // Check if the page footer is visible
    var isPageFooterVisible = pageFooter.getBoundingClientRect().top <= 0;

    // If page footer is visible, revert all changes to sticky header
    if (isPageFooterVisible && actionsAdded) {
        var actionsElement = document.querySelector('.fandom-sticky-header__actions');
        if (actionsElement && !actionsElement.classList.contains('fade-out')) {
            actionsElement.classList.add('fade-out');
            // Add a delay before removing the actions element to allow the fade-out animation
            setTimeout(function () {
                // Remove the actions element from the sticky header
                actionsElement.parentNode.removeChild(actionsElement);

                // Reset the flag to false
                actionsAdded = false;
            }, 900); // 1 second animation duration
        }

        // Revert text and link in the sticky header
        var sitenameElement = document.querySelector('.fandom-sticky-header.is-visible a.fandom-sticky-header__sitename');
        sitenameElement.innerText = originalSitenameText; // Revert to the original text
    } else if (!isPageFooterVisible && !actionsAdded) {
        // If page footer is not visible and actions haven't been added yet, modify sticky header
        // Create a new element for actions
        var actionsElement = document.createElement('div');
        actionsElement.className = 'fandom-sticky-header__actions fade-in';
        actionsElement.innerHTML = document.querySelector('.page-header .page-header__actions').innerHTML;

        // Replace text and link in the sticky header
        var sitenameElement = document.querySelector('.fandom-sticky-header.is-visible a.fandom-sticky-header__sitename');
        originalSitenameText = sitenameElement.innerText; // Store the original text
        sitenameElement.innerText = document.querySelector('.page-header__title span').innerText;

        // Add the actions element to the sticky header
        stickyHeader.appendChild(actionsElement);

        // Set the flag to true to indicate that actions have been added
        actionsAdded = true;

        // Remove the animation classes after 1 second
        setTimeout(function () {
            actionsElement.classList.remove('fade-in');
        }, 900);
    }
}

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial call to handleScroll to set up the initial state
handleScroll();