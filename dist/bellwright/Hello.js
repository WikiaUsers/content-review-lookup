/**
 * MediaWiki:Hello.js
 * * Script for loading and displaying the "Hello world." message
 * within the Template:Hello content block.
 * Uses standard jQuery and Fandom WikiDesignSystem (WDS) classes.
 * * Note: Assumes Template:Hello contains:
 * 1. A clickable element with id="loadButton" (e.g., <span id="loadButton" class="wds-button ...">)
 * 2. An element with id="resultContainer" (where the message appears)
 */
jQuery(function($) {
    // Standard MediaWiki/jQuery wrapper ensures the script runs only after the DOM is ready.
    console.log("MediaWiki:Hello.js script starting...");

    const $loadButton = $('#loadButton');
    const $resultContainer = $('#resultContainer');

    // --- Safety Checks ---

    if ($loadButton.length === 0) {
        console.error("Hello.js Error: Failed to find element with ID 'loadButton'. Check Template:Hello markup.");
        return;
    }

    if ($resultContainer.length === 0) {
        console.error("Hello.js Error: Failed to find element with ID 'resultContainer'. Check Template:Hello markup.");
        return;
    }

    console.log("Event listener attached to '#loadButton'. Script ready.");

    // --- Event Listener ---

    $loadButton.on('click', function() {
        console.log("Button clicked!");

        // Since the button is a <span> (which doesn't have a native 'disabled' property),
        // we check for the WDS disabled class to prevent re-execution.
        if ($loadButton.hasClass('wds-button--disabled')) {
            console.warn("Click ignored: Button is already disabled.");
            return;
        }

        // 1. Add the WDS disabled class to visually disable the button
        //    and prevent further clicks via the CSS 'pointer-events: none;' rule.
        $loadButton.addClass('wds-button--disabled');
        $loadButton.text('Message Loaded');
        
        console.log("Button disabled and text updated.");

        // 2. Load and display the content
        $resultContainer
            .html('Hello world.') // Insert the desired text
            .removeClass('hidden') // Make the result container visible
            .fadeIn(400); // Fade in the message for a smooth effect
            
        console.log("Message displayed successfully.");

        // Optional: Remove the click listener entirely after the first click
        // $loadButton.off('click');
    });
});